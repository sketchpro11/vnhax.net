---
title: "Running Llama 4 Locally: Real VRAM Requirements, Quantization and What Fits on Your GPU"
description: "How much memory Llama 4 Scout and Maverick really need, using Meta's specs and Ollama's published model sizes. Why 17B active doesn't mean 17B of VRAM, how KV cache quantization helps, and what to run on an 8 GB laptop instead."
date: "2026-10-05"
updatedAt: "2026-10-12"
author: "Umar Hashmi"
category: "Local AI & Runtimes"
tags: ["llama-4", "vram-requirements", "quantization", "ollama", "llama-cpp", "local-llm"]
---

> **Quick answer (checked 12 October 2026):** Llama 4 is a mixture-of-experts family. **Scout** has **109B total parameters** (17B active, 16 experts) and **Maverick** has **400B total** (17B active, 128 experts). Because *all* experts must sit in memory, Ollama's 4-bit downloads are **67 GB for Scout** and **245 GB for Maverick**. No single consumer GPU holds either one fully. A 24 GB card can only run Scout by offloading most of it to system RAM, and an 8 GB laptop GPU like mine shouldn't try.

"17B active parameters" is the most misleading number in local AI right now. It makes Llama 4 sound like it should run anywhere a 17B model does. It doesn't, and this guide explains why using Meta's own specs and the actual file sizes Ollama publishes (sources at the end). I haven't run Scout myself: my laptop has an 8 GB RTX 3070 Ti, which is exactly the kind of machine this model doesn't fit on. The last section covers what to run instead.

## Why "17B active" doesn't mean 17B of memory

Meta describes the two released models like this:

| Model | Active params | Experts | Total params | Context window |
|---|---|---|---|---|
| **Llama 4 Scout** | 17B | 16 | 109B | Up to 10M tokens |
| **Llama 4 Maverick** | 17B | 128 | 400B | Up to 1M tokens |

In a mixture-of-experts model, each token only goes through a few experts, so **compute** per token is like a 17B model. But the runtime doesn't know in advance which experts the next token needs, so **every expert has to be loaded**. Memory follows the **total** parameter count, not the active one.

Meta itself says Scout fits on a **single NVIDIA H100** (an 80 GB data-center GPU) **with Int4 quantization**, and Maverick fits on a **single H100 host** (a multi-GPU server). That tells you the scale.

## Actual download sizes (Ollama)

These are the model sizes listed on Ollama's [llama4 tags page](https://ollama.com/library/llama4/tags):

| Ollama tag | Quantization | Size |
|---|---|---|
| `llama4:scout` (default) | Q4_K_M | **67 GB** |
| `llama4:17b-scout-16e-instruct-q8_0` | Q8_0 | 117 GB |
| `llama4:17b-scout-16e-instruct-fp16` | FP16 | 217 GB |
| `llama4:maverick` | Q4_K_M | **245 GB** |
| `llama4:17b-maverick-128e-instruct-q8_0` | Q8_0 | 428 GB |
| `llama4:17b-maverick-128e-instruct-fp16` | FP16 | 803 GB |

On top of the weights you need room for the **KV cache** (it grows with the context length you use) and some runtime overhead. So "fits" really means *weights + KV cache + a few GB of headroom*.

## What that means for common hardware

This is arithmetic from the sizes above, not a benchmark:

- **8–16 GB GPUs (most laptops, RTX 3060/4060/3070 class):** Scout's 67 GB won't fit. With enough system RAM it might technically run almost entirely on the CPU, but it will be far too slow to be practical. Use a smaller model (see the last section).
- **24 GB GPUs (RTX 3090/4090):** about a third of Scout's Q4 weights fit in VRAM; the rest is offloaded to system RAM. Expect it to work but slowly, and you'll need 64 GB+ of system RAM.
- **32 GB GPUs (RTX 5090):** still less than half of Scout Q4. Better than 24 GB, still heavily offloaded.
- **Two or more large GPUs, or a Mac with lots of unified memory (96–128 GB+):** this is where Scout Q4 becomes comfortable. Apple Silicon's unified memory lets the GPU use most of system RAM.
- **Maverick:** realistically a multi-GPU server or a very high-memory workstation.

You can check how a model actually loaded with `ollama ps`. The **PROCESSOR** column shows `100% GPU`, `100% CPU`, or a split such as `48%/52% CPU/GPU`. Any CPU share means slower generation.

## KV cache: the hidden memory cost

The KV cache stores attention data for every token in your context, so it grows as the context grows. Two things help:

- **Use only the context you need.** Ollama sets the default context by VRAM: **4K tokens under 24 GB**, **32K for 24–48 GB**, **256K at 48 GB+** ([Ollama docs](https://docs.ollama.com/context-length)). Bigger windows cost more memory.
- **Quantize the KV cache.** In Ollama, set `OLLAMA_KV_CACHE_TYPE=q8_0`, which Ollama says uses about **half the memory of f16** with a very small precision loss; `q4_0` saves more at a bigger quality cost. This works when Flash Attention is enabled, which Ollama turns on automatically where supported (force it with `OLLAMA_FLASH_ATTENTION=1`).

In **llama.cpp**, the equivalent flags are `--cache-type-k q8_0 --cache-type-v q8_0` (short forms `-ctk` / `-ctv`), with Flash Attention on (`-fa on`).

## A note on "FlashAttention-3"

You'll see FlashAttention-3 mentioned in many local-LLM guides. The [FlashAttention repository](https://github.com/Dao-AILab/flash-attention) says FlashAttention-3 is a beta **optimized for Hopper GPUs (e.g. H100)** and requires an **H100/H800 with CUDA 12.3+**. It isn't what makes Llama 4 run on an RTX card. On consumer GPUs, the flash-attention support in llama.cpp and Ollama is what matters, and it reduces memory traffic; it doesn't shrink the model weights.

## Running it (if you have the hardware)

**Ollama:**

```bash
# Pull the default Scout build (Q4_K_M, about 67 GB)
ollama pull llama4:scout

# Run it, then check how it was split between GPU and CPU
ollama run llama4:scout "Summarize the trade-offs of mixture-of-experts models in 3 bullets"
ollama ps
```

To raise the context window, set `OLLAMA_CONTEXT_LENGTH` when starting the server, or use a Modelfile. See [how to increase num_ctx in Ollama](/blog/how-to-increase-num-ctx-in-modelfile).

**llama.cpp server** with a quantized KV cache:

```bash
./build/bin/llama-server \
  -m ./llama4-scout-Q4_K_M.gguf \
  -ngl 99 \
  -fa on \
  --cache-type-k q8_0 \
  --cache-type-v q8_0 \
  -c 16384 \
  --host 127.0.0.1 --port 8080
```

`-ngl 99` asks llama.cpp to put as many layers as possible on the GPU; on a card smaller than the model, the rest stays on the CPU.

## What I'd run on an 8 GB laptop instead

On an 8 GB GPU, pick a model whose 4-bit file is roughly **5–6 GB or smaller**, so the whole model plus a 4K–8K context stays on the GPU. Dense models in the 7B–9B range at Q4 fit that budget, and small language models fit easily. Our guide to [small language models on edge devices](/blog/deploying-small-language-models-slms-edge-phi-4-mistral-quantization) covers good options. Check the size on each model's Ollama page before downloading, then confirm `100% GPU` with `ollama ps`.

## Frequently asked questions

### How much VRAM does Llama 4 Scout need?
Ollama's default 4-bit Scout download is 67 GB, plus memory for the KV cache. Meta says it fits on a single 80 GB H100 with Int4 quantization.

### Can I run Llama 4 on a single RTX 4090?
Only with most of the model offloaded to system RAM, which makes it slow. The 4090's 24 GB holds roughly a third of Scout's 4-bit weights.

### Does FlashAttention-3 help on RTX GPUs?
FlashAttention-3 targets Hopper GPUs such as the H100. On RTX cards, use the flash-attention support built into llama.cpp and Ollama, plus KV cache quantization, to save memory.

## Sources

- Meta AI: [The Llama 4 herd](https://ai.meta.com/blog/llama-4-multimodal-intelligence/) (parameters, experts, context windows, H100 fit)
- Ollama: [llama4 model tags and sizes](https://ollama.com/library/llama4/tags)
- Ollama Docs: [Context length](https://docs.ollama.com/context-length) and [FAQ: KV cache quantization, Flash Attention, ollama ps](https://docs.ollama.com/faq)
- llama.cpp: [server options](https://github.com/ggml-org/llama.cpp/blob/master/tools/server/README.md)
- Dao-AILab: [FlashAttention repository](https://github.com/Dao-AILab/flash-attention)

Related on VNHAX: [How to increase num_ctx in Ollama](/blog/how-to-increase-num-ctx-in-modelfile) · [Small language models on edge devices](/blog/deploying-small-language-models-slms-edge-phi-4-mistral-quantization) · [Open-source AI tools we reviewed](/ai/ai-tools)
