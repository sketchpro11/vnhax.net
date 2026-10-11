---
title: "Running Llama 4 Locally: VRAM Requirements, Flash-Attention 3, and GGUF Quantization on Consumer GPUs"
description: "Complete hardware analysis and VRAM benchmark matrix for running Meta's Llama 4 locally across RTX 4090, RTX 5090, and Apple Silicon M-series hardware."
date: "2026-10-05"
updatedAt: "2026-10-05"
author: "Umar Hashmi"
category: "Local AI & Runtimes"
tags: ["llama-4", "vram-requirements", "quantization", "flash-attention-3", "rtx-4090", "rtx-5090", "local-llm", "llama-cpp"]
---

The first time I tried to run Llama 4 Scout on my RTX 4090, it looked like it should work. 24GB card, roughly 65GB of Q4_K_M weights, a lot of optimism. It didn't work.

What I got instead was a system that took eleven minutes to load, then fell over the moment the context window passed a few thousand tokens. The offloading layer kicked in and started shuffling weights between VRAM and system RAM over PCIe, which is fine for a model you're chatting with once a day and completely useless for anything you actually want to write code with.

That failure is what made me go and actually understand the numbers instead of trusting forum posts. Here's what I learned running Llama 4 locally on an RTX 4090, an RTX 5090, and a Mac Studio. If you are targeting lower-VRAM consumer laptops or mobile hardware, check our companion benchmark on [Deploying Small Language Models (SLMs) on Edge (Phi-4, Ministral)](/blog/deploying-small-language-models-slms-edge-phi-4-mistral-quantization).

## **The part everyone misunderstands about Llama 4**

Llama 4 is a mixture-of-experts (MoE) architecture. Scout has about 109 billion total parameters but only activates roughly 17 billion for any given token. Maverick is around 400 billion total, also activating about 17 billion.

This sounds like it should make everything easy. It doesn't, and this is where most guides go wrong.

**You still need to store all 109 billion parameters in memory.** Every expert lives in VRAM, even though only a subset are queried per token. MoE makes *computation* cheap. It does nothing for *memory capacity*. People read "17B active" and assume Scout fits in a 24GB card like a dense 17B model would.

It doesn't. It needs the full weight footprint, plus KV cache for your context window, plus overhead for activations and the CUDA allocator.

## **The VRAM Matrix**

Here is the empirical storage footprint for quantizations across Llama 4 variants:

| Quantization | Approx. bits/weight | Scout (~109B Total) | Maverick (~400B Total) |
| :--- | :--- | :--- | :--- |
| **Q4_K_M** | ~4.8 bits | ~65 GB | ~240 GB |
| **Q5_K_M** | ~5.7 bits | ~78 GB | ~288 GB |
| **Q6_K** | ~6.6 bits | ~90 GB | ~334 GB |
| **Q8_0** | ~8.5 bits | ~116 GB | ~428 GB |
| **FP8** | ~8.0 bits | ~109 GB | ~400 GB |

### **The KV Cache Surprise**

KV cache scales with context length and attention heads. In testing, Scout at a 16k context added roughly 3–4GB of KV cache in fp16. Push that to 128k and you're looking at **25GB+ just for the KV cache**. At that point the cache is nearly as large as the quantized weights.

### **Hardware Compatibility Breakdown**

- **RTX 4090 (24GB):** Q4_K_M Scout will load with layer offloading to system RAM. You'll get roughly 8k–12k usable context before PCIe bottlenecks degrade generation speed.
- **RTX 5090 (32GB):** Q4_K_M Scout fits with substantial headroom, enabling a stable 16k context buffer with GDDR7 memory speeds.
- **Apple Silicon M4 Max (64GB / 128GB Unified):** Unified memory changes the equation entirely. You can load Q4_K_M Scout comfortably on a 64GB machine with zero PCIe transfer penalties.
- **Apple Silicon M4 Ultra (128GB / 192GB Unified):** Holds Maverick at Q4_K_M entirely in memory on a single desktop workstation.

## **Q4_K_M vs FP8: The Production Tradeoff**

FP8 preserves noticeably more fine-grained reasoning than Q4_K_M, but consumes approximately 68% more memory.

- **Q4_K_M:** Syntax, boilerplate, refactors, and formatting are essentially flawless. Occasional edge-case slips on complex recursive AST transformations.
- **FP8:** Tighter mathematical precision and fewer reasoning hallucinations, but requires dual-GPU or high-spec unified memory setups.

Q4_K_M is a mixed quantization scheme that protects high-importance attention tensors at higher precision and aggressively quantizes feed-forward layers. It is significantly superior to uniform 4-bit schemes.

## **Flash-Attention 3: What It Does and Doesn't**

[FlashAttention 3](https://github.com/Dao-AILab/flash-attention) does not reduce your KV cache size. FlashAttention optimizes memory *bandwidth* during attention matrix multiplications by keeping intermediate values in fast SRAM rather than HBM.

To shrink stored cache memory, you must use **KV Cache Quantization** in [llama.cpp](https://github.com/ggml-org/llama.cpp) (`--cache-type-k q8_0 --cache-type-v q8_0`). This cuts KV cache VRAM by 50% with zero perceptible quality degradation on coding benchmarks. Learn more in our [Local AI Tools & Hardware Hub](/ai/ai-tools).

## **Step 1: Quick Deployment with Ollama**

For turnkey CLI serving, [Ollama](https://ollama.com/) provides instant model management. To expand your context beyond the default 2,048 tokens without out-of-memory errors, follow our step-by-step tutorial on [Increasing num_ctx in Ollama Modelfiles for 32k+ Context Windows](/blog/how-to-increase-num-ctx-in-modelfile):

```bash
# Pull Llama 4 Scout
ollama pull llama4:scout

# Verify VRAM allocation
ollama run llama4:scout "Write a typed TypeScript interface for an agent event bus"

# Inspect local models
ollama list
```

## **Step 2: Full Control & KV Quantization with llama.cpp**

Compile with Blackwell or Ada CUDA kernels:

```bash
git clone https://github.com/ggml-org/llama.cpp
cd llama.cpp
# Use 120 for RTX 50-series (Blackwell) or 89 for RTX 40-series (Ada Lovelace)
cmake -B build -DGGML_CUDA=ON -DCMAKE_CUDA_ARCHITECTURES=120
cmake --build build --config Release -j
```

Serve with 8-bit quantized KV cache:

```bash
./build/bin/llama-server \
  -m ./llama4-scout-Q4_K_M.gguf \
  -ngl 99 \
  --cache-type-k q8_0 \
  --cache-type-v q8_0 \
  -c 16384 \
  --host 127.0.0.1 \
  --port 8080
```

`-ngl 99` offloads all layers to GPU, while `--cache-type-k q8_0 --cache-type-v q8_0` halves context memory footprint.

## **Frequently Asked Questions**

**How much VRAM do I need to run Llama 4 Scout locally?**
At Q4_K_M quantization, Scout requires roughly 65GB of memory. On a dedicated GPU setup, dual 32GB/24GB cards or a 64GB+ Apple Silicon workstation provide comfortable execution with room for a 16k context window.

**Can I run Llama 4 on a single RTX 4090?**
Yes, but with CPU layer offloading. The model weights will split between 24GB of VRAM and system RAM over PCIe. Token generation will be slower (approx 8–15 tokens/sec) compared to fully resident VRAM.

**Does FlashAttention 3 reduce KV cache VRAM?**
No. FlashAttention 3 speeds up computation and reduces bandwidth bottlenecks; it does not shrink the stored KV tensor footprint. To shrink KV cache memory, use 8-bit or 4-bit KV cache quantization.
