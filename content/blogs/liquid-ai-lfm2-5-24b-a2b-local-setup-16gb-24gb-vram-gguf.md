---
title: "Liquid AI LFM2.5-24B-A2B Local Setup: Run 24B MoE on 16GB & 24GB VRAM (Q4_K_M GGUF Guide)"
description: "How to run Liquid AI's LFM2.5-24B-A2B locally with llama.cpp: real GGUF file sizes (Q4_K_M is 14.5 GB), which quant fits 16 GB and 24 GB GPUs, KV cache math, copy-paste llama-server and Docker commands, CPU expert offload for 8–12 GB cards, and how to measure your own tokens per second."
date: "2026-10-18"
updatedAt: "2026-10-18"
author: "Umar Hashmi"
category: "Local AI & Runtimes"
tags: ["liquid-ai", "lfm2-5", "lfm2-5-24b-a2b", "gguf", "llama-cpp", "local-llm", "moe", "vram"]
---

> **Quick answer (checked 18 October 2026):** **LFM2.5-24B-A2B** is a 24B-parameter mixture-of-experts model from Liquid AI (released 13 October 2026) with only **2.45B parameters active per token**. The official GGUF files are **14.53 GB for `Q4_K_M`** and **13.58 GB for the `QAD-Q4_0`** build. On a **16 GB GPU**, the QAD-Q4_0 file is the safer pick; `Q4_K_M` fits only with a modest context. On a **24 GB GPU**, `Q5_K_M` (17.03 GB) or `Q6_K` (19.69 GB) fit with room for long context. Its KV cache is tiny, about **20 KiB per token** in f16, because only 10 of its 40 layers use attention. GPUs with **8–12 GB** can still run it by keeping some experts on the CPU with llama.cpp's `--n-cpu-moe`.

A 24-billion-parameter model that runs like a 2-billion one sounds like marketing. With mixture-of-experts (MoE) models, it's mostly true for **speed**, and mostly false for **memory**. That one distinction decides whether LFM2.5-24B-A2B runs well on your GPU, so it's where this guide starts.

A quick note on where the numbers come from. File sizes are read from Liquid AI's Hugging Face repository. The architecture comes from the model's `config.json`, and the speed figures are Liquid AI's own published measurements. I haven't published my own benchmark runs of this model, and I'm not going to invent a tokens-per-second table for RTX cards. Instead, the last section shows you how to measure your own card in two minutes.

## What LFM2.5-24B-A2B actually is

From Liquid AI's model card and launch post:

| Spec | Value |
|---|---|
| Total parameters | 24.0B |
| Active parameters per token | 2.45B |
| Layers | 40: 30 short-convolution blocks + 10 attention (GQA) blocks |
| Experts | 64 per MoE block, top-4 routing |
| Context window | 131,072 tokens |
| Vocabulary | 128,000 tokens |
| Reasoning | Always thinks before answering (reasoning-only) |
| License | LFM Open License v1.0 |
| Released | 13 October 2026 |

Compared with the earlier LFM2-24B-A2B, Liquid AI says the context grew from 32K to 131K tokens, the vocabulary doubled from 65K to 128K, and pre-training scaled to about 33T tokens. It's also now a pure reasoning model: the chat template opens every answer with a `<think>` tag.

**On licensing**, read the actual license file, not a summary. Section 5 of the LFM Open License v1.0 says commercial use is licensed only for organizations **below $10 million in annual revenue**. Above that, you need a separate agreement with Liquid AI. Hobby, research and small-business use is fine.

## Why "2B active" doesn't mean "2B of memory"

This is the most common confusion with MoE models.

- **Speed** depends on how many parameters are used for each token. Here that's 2.45B, so generation is fast, much closer to a small model than a 24B dense one.
- **Memory** depends on how many parameters must be **loaded**. Different tokens use different experts, so all 64 experts per layer need to sit somewhere the GPU can reach. That's the full 24B.

So you need memory for a 24B model and get the speed of a much smaller one. That's a good trade on a GPU with enough VRAM, and the reason CPU offloading works unusually well for this model, as you'll see below.

## The GGUF files and what fits where

These are the exact files in [LiquidAI/LFM2.5-24B-A2B-GGUF](https://huggingface.co/LiquidAI/LFM2.5-24B-A2B-GGUF). Hugging Face shows sizes in decimal gigabytes; GPU tools usually report binary GiB, so I've listed both:

| File | Size (GB) | Size (GiB) | Good fit |
|---|---|---|---|
| `LFM2.5-24B-A2B-QAD-Q4_0.gguf` | 13.58 | 12.65 | 16 GB GPU, best choice |
| `LFM2.5-24B-A2B-Q4_K_M.gguf` | 14.53 | 13.53 | 16 GB GPU with short context; 24 GB GPU |
| `LFM2.5-24B-A2B-Q5_K_M.gguf` | 17.03 | 15.86 | 24 GB GPU |
| `LFM2.5-24B-A2B-Q6_K.gguf` | 19.69 | 18.34 | 24 GB GPU |
| `LFM2.5-24B-A2B-Q8_0.gguf` | 25.49 | 23.74 | 32 GB+ GPU or Apple Silicon with lots of unified memory |
| BF16 / F16 | 47.96 | 44.67 | Data-centre GPUs, fine-tuning |

**About QAD-Q4_0.** Liquid AI says this checkpoint "was trained to recover the accuracy lost to Q4_0 quantization". In other words, it's a smaller 4-bit file trained to make up for the quality that 4-bit rounding normally costs. On a 16 GB card that extra gigabyte matters a lot, so try this file first. Liquid AI hasn't published a side-by-side quality comparison between QAD-Q4_0 and Q4_K_M, so if quality matters for your task, test both.

## The KV cache is unusually small

Most guides tell you to budget several gigabytes for context. With this model, you mostly don't have to.

The KV cache only exists in attention layers, and LFM2.5-24B-A2B has just **10 attention layers**. The other 30 are short-convolution blocks with a small fixed state. From `config.json`: 8 KV heads, and a head size of 64 (hidden size 2048 ÷ 32 heads).

```text
KV bytes per token = 2 (K and V) × 10 layers × 8 KV heads × 64 × 2 bytes (f16)
                   = 20,480 bytes ≈ 20 KiB per token
```

| Context | f16 KV cache | q8_0 KV cache |
|---|---|---|
| 8K tokens | 0.16 GiB | 0.08 GiB |
| 32K tokens | 0.63 GiB | 0.31 GiB |
| 131K tokens (full) | 2.5 GiB | 1.25 GiB |

For comparison, the dense Phi-4 needs about 200 KiB per token, ten times more. I worked through that in my [guide to small models on edge devices](/blog/deploying-small-language-models-slms-edge-phi-4-mistral-quantization).

You also need some room for llama.cpp's compute buffers, and on a desktop, for whatever Windows or your display is already using on the GPU. Check that in Task Manager or `nvidia-smi` before you load anything.

### What that means for a 16 GB card

With `Q4_K_M` (13.53 GiB) on a 16 GiB card, you have about 2.5 GiB left for the KV cache, compute buffers and the desktop. That works with an 8K–16K context, but it's tight. With `QAD-Q4_0` (12.65 GiB) you get almost another gigabyte of headroom, which makes a 32K context realistic.

### What that means for a 24 GB card

On a 24 GB card such as an RTX 3090 or 4090, `Q5_K_M` leaves plenty of room for long context. `Q6_K` (18.34 GiB) plus the full 131K context in f16 (2.5 GiB) comes to about 20.8 GiB before buffers. That can fit, but with an 8-bit KV cache it's comfortable.

## Step 1: get llama.cpp

You need a recent build, because support for the `lfm2moe` architecture is new. Either download a prebuilt CUDA release from the [llama.cpp releases page](https://github.com/ggml-org/llama.cpp/releases), or build it yourself:

```bash
git clone https://github.com/ggml-org/llama.cpp
cd llama.cpp
cmake -B build -DGGML_CUDA=ON
cmake --build build --config Release -j
```

On a Mac, drop `-DGGML_CUDA=ON`; Metal is enabled by default.

## Step 2: the quickest test

Liquid AI's model card gives this one-liner, which downloads the model from Hugging Face and opens a chat:

```bash
llama-cli -hf LiquidAI/LFM2.5-24B-A2B-GGUF \
    --temp 0.1 --top-k 50 --repeat-penalty 1.05
```

To use the QAD build instead:

```bash
llama-cli -hf LiquidAI/LFM2.5-24B-A2B-GGUF \
    --hf-file LFM2.5-24B-A2B-QAD-Q4_0.gguf \
    --temp 0.1 --top-k 50 --repeat-penalty 1.05
```

Those sampling values (temperature 0.1, top-k 50, repeat penalty 1.05) are Liquid AI's recommended settings. The card notes they're stored in the GGUF metadata, so llama.cpp applies them by default anyway.

## Step 3: a server for your apps (16 GB GPU)

For an OpenAI-compatible endpoint that your scripts and agent tools can call:

```bash
llama-server \
  -hf LiquidAI/LFM2.5-24B-A2B-GGUF \
  --hf-file LFM2.5-24B-A2B-QAD-Q4_0.gguf \
  -ngl 99 \
  -c 32768 \
  -fa on \
  --cache-type-k q8_0 --cache-type-v q8_0 \
  --jinja \
  --host 127.0.0.1 --port 8080
```

What each flag does:

- `-ngl 99` puts every layer on the GPU.
- `-c 32768` sets a 32K context. Lower it to 16K if you run out of memory.
- `-fa on` turns on flash attention, which lets llama.cpp quantize the V cache.
- `--cache-type-k/v q8_0` halves the KV cache.
- `--jinja` uses the model's own chat template, which matters for the `<think>` block and for tool calls.
- `--host 127.0.0.1` keeps the server on your machine only. Don't expose it to your network without authentication.

Test it:

```bash
curl http://127.0.0.1:8080/v1/chat/completions \
  -H "Content-Type: application/json" \
  -d '{"messages":[{"role":"user","content":"List three uses for a local LLM."}]}'
```

## Step 4: 24 GB GPU settings

On an RTX 3090 or 4090, use a bigger quant and more context:

```bash
llama-server \
  -hf LiquidAI/LFM2.5-24B-A2B-GGUF \
  --hf-file LFM2.5-24B-A2B-Q6_K.gguf \
  -ngl 99 \
  -c 131072 \
  -fa on \
  --cache-type-k q8_0 --cache-type-v q8_0 \
  --jinja \
  --host 127.0.0.1 --port 8080
```

If you'd rather keep more free VRAM for other work, use `Q5_K_M` and `-c 65536`.

## Step 5: 8–12 GB GPUs with CPU expert offload

This is where an MoE model really helps. My own laptop has an RTX 3070 Ti with 8 GB, and no 4-bit file of this model fits in that. But llama.cpp can keep the **expert weights** of some layers in system RAM while the rest stays on the GPU:

```bash
llama-server \
  -hf LiquidAI/LFM2.5-24B-A2B-GGUF \
  --hf-file LFM2.5-24B-A2B-QAD-Q4_0.gguf \
  -ngl 99 \
  --n-cpu-moe 20 \
  -c 16384 \
  -fa on \
  --jinja \
  --host 127.0.0.1 --port 8080
```

`--n-cpu-moe 20` keeps the experts of the first 20 layers on the CPU. Raise the number if you run out of VRAM, and lower it if you have room to spare. Because only 4 of 64 experts are used per token, the CPU only has to read a small slice of those weights for each token. That's why this hurts speed much less than offloading a dense model would. You'll still need enough system RAM for the offloaded part, so 32 GB of RAM is a sensible minimum here.

## Step 6: run it in Docker

If you prefer containers, the llama.cpp project publishes official server images. With the NVIDIA Container Toolkit installed:

```bash
docker run --gpus all -p 127.0.0.1:8080:8080 \
  -v "$HOME/models:/models" \
  ghcr.io/ggml-org/llama.cpp:server-cuda \
  -m /models/LFM2.5-24B-A2B-QAD-Q4_0.gguf \
  -ngl 99 -c 32768 -fa on --jinja \
  --host 0.0.0.0 --port 8080
```

Download the `.gguf` file into `~/models` first, from the Hugging Face page. The `127.0.0.1:` in `-p` keeps the port private to your machine, even though the server listens on all interfaces inside the container.

Liquid AI also lists **Docker Model Runner** and **LM Studio** as supported, if you'd rather use a GUI or Docker's own model commands.

## How fast is it?

Liquid AI's published numbers, all with llama.cpp, `Q4_K_M` and a 4K-token input context:

| Hardware (Liquid AI's measurements) | Decode speed |
|---|---|
| Apple M5 Max | 184 tokens/s |
| AMD Ryzen AI Max+ 395 | 114 tokens/s |

It also reports more than 21,000 output tokens per second on a single NVIDIA B300 at high concurrency with SGLang. That's a data-centre serving number, not a desktop one.

Liquid AI hasn't published RTX 3090 or 4090 numbers, so here's how to get your own in two minutes:

```bash
llama-bench -m LFM2.5-24B-A2B-QAD-Q4_0.gguf -ngl 99 -fa 1 -p 512 -n 128
```

`pp512` is prompt processing speed and `tg128` is generation speed, both in tokens per second. Run it twice and keep the second result, since the first run includes warm-up.

**Remember the thinking tokens.** This model always reasons before it answers, so a 100-word reply may come after several hundred tokens of thinking. When you judge "how fast it feels", time the whole response, not just tokens per second.

## Where it's strong, and where it isn't

Liquid AI's own benchmark table is refreshingly honest about weak spots. Compared with Qwen3.6-35B-A3B, a larger MoE:

| Benchmark (Liquid AI's numbers) | LFM2.5-24B-A2B | Qwen3.6-35B-A3B |
|---|---|---|
| LiveClaw (agentic) | **48.09** | 38.19 |
| AutomationBench | **27.69** | 8.72 |
| GPQA Diamond (knowledge) | 74.42 | **83.69** |
| SWE-Bench Verified (coding) | 51.00 | **66.20** |

Liquid AI also reports **65.01 on BFCLv4** and **80.71 on ToolSandbox**, two tool-calling benchmarks, and **96.75 on IFEval** for instruction following.

The pattern: it's built for **agents that call tools and follow instructions**, not for being a walking encyclopedia or your main coding model. Liquid AI itself recommends pairing it with retrieval or web search for knowledge-heavy work. If that's your plan, see my guide to [production RAG with hybrid search](/blog/advanced-production-rag-hybrid-search-reranking-evaluation).

## Tool calling in one paragraph

By default, the model writes **Pythonic function calls** between special tokens, `<|tool_call_start|>` and `<|tool_call_end|>`. Liquid AI says you can prompt it to emit JSON calls instead. When you run `llama-server` with `--jinja`, the chat template handles the format. If your agent framework expects OpenAI-style JSON tool calls and gets confused, the first thing to check is that `--jinja` is on and your llama.cpp build is recent.

## Common mistakes to avoid

- **Picking `Q4_K_M` on a 16 GB card and maxing out context.** Start with QAD-Q4_0 and 16K–32K context, then raise it.
- **Forgetting the desktop's own VRAM use.** Windows and your browser can easily hold 0.5–1 GB of GPU memory.
- **Using an old llama.cpp build.** If you get "unknown model architecture", update llama.cpp.
- **Turning temperature up "for creativity".** Liquid AI recommends 0.1 for this model. Higher values tend to make reasoning models ramble.
- **Exposing the server to your network.** `--host 0.0.0.0` without a firewall or auth lets anyone on your network use it.
- **Assuming the commercial licence is unlimited.** It's limited to organizations under $10M annual revenue.

## Final thoughts

LFM2.5-24B-A2B is a good fit for the "local agent on a gaming PC" job. You pay the memory cost of a 24B model, but the KV cache is tiny and each token is cheap to generate. On 24 GB you can run a high-quality quant with full context. On 16 GB the QAD-Q4_0 build is the sweet spot. On 8–12 GB, expert offloading makes it usable instead of impossible.

Just don't expect it to replace a big coding model or know every fact. Give it tools, give it retrieval, and measure it on your own tasks with `llama-bench` and a handful of real prompts.

## Frequently asked questions

### Can LFM2.5-24B-A2B run on a 16 GB GPU?
Yes. The QAD-Q4_0 GGUF is 13.58 GB and is the best fit, with room for a 16K–32K context. The Q4_K_M file (14.53 GB) also fits, but only with a shorter context.

### How much VRAM does LFM2.5-24B-A2B need at Q4_K_M?
The file is 14.53 GB (13.53 GiB). Add a little for the KV cache (about 0.63 GiB at 32K in f16) and llama.cpp's compute buffers.

### Why is LFM2.5-24B-A2B fast if it has 24B parameters?
It's a mixture-of-experts model: only 2.45B parameters are used per token (4 of 64 experts per layer). All 24B still need to be in memory.

### What is the llama.cpp command for LFM2.5-24B-A2B?
`llama-cli -hf LiquidAI/LFM2.5-24B-A2B-GGUF --temp 0.1 --top-k 50 --repeat-penalty 1.05`. For a server, use `llama-server` with the same `-hf` option plus `-ngl 99`, `-c 32768`, `-fa on` and `--jinja`.

### What is QAD-Q4_0?
A 4-bit checkpoint that Liquid AI trained to recover the accuracy normally lost to Q4_0 quantization. At 13.58 GB it's the smallest official 4-bit file.

### Can I use LFM2.5-24B-A2B commercially?
Under the LFM Open License v1.0, commercial use is licensed for organizations below $10 million in annual revenue. Larger companies need a separate agreement with Liquid AI.

### Does LFM2.5-24B-A2B support tool calling?
Yes. It emits Pythonic function calls between `<|tool_call_start|>` and `<|tool_call_end|>` tokens by default, and can be prompted to output JSON calls.

## Sources

- Liquid AI: [LFM2.5-24B-A2B: Built for Fast On-Device Agents](https://www.liquid.ai/blog/lfm2-5-24b-a2b) (13 October 2026)
- Hugging Face: [LiquidAI/LFM2.5-24B-A2B model card](https://huggingface.co/LiquidAI/LFM2.5-24B-A2B), [config.json](https://huggingface.co/LiquidAI/LFM2.5-24B-A2B/blob/main/config.json) and [LICENSE](https://huggingface.co/LiquidAI/LFM2.5-24B-A2B/blob/main/LICENSE)
- Hugging Face: [LiquidAI/LFM2.5-24B-A2B-GGUF](https://huggingface.co/LiquidAI/LFM2.5-24B-A2B-GGUF) (file sizes)
- Liquid Docs: [llama.cpp inference](https://docs.liquid.ai/deployment/on-device/llama-cpp)
- GitHub: [ggml-org/llama.cpp](https://github.com/ggml-org/llama.cpp)

Related on VNHAX: [Running Llama 4 locally](/blog/running-llama-4-locally-vram-requirements-quantization) · [How to increase num_ctx in Ollama](/blog/how-to-increase-num-ctx-in-modelfile) · [Small language models on edge devices](/blog/deploying-small-language-models-slms-edge-phi-4-mistral-quantization) · [MCP server security hardening](/blog/enterprise-mcp-server-security-hardening-protocol-bridges)
