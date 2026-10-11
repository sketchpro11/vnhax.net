---
title: "How to Increase num_ctx in Ollama (Modelfile, API and Env Var) Without Running Out of VRAM"
description: "Three ways to raise Ollama's context window: Modelfile, API options and OLLAMA_CONTEXT_LENGTH. Ollama's current defaults, how to calculate KV cache memory correctly, and how to confirm the model still fits on your GPU."
date: "2026-10-04"
updatedAt: "2026-10-12"
author: "Umar Hashmi"
category: "AI Tools & Runtimes"
tags: ["ollama", "local-llm", "context-window", "num-ctx", "kv-cache", "vram"]
---

> **Quick answer (checked 12 October 2026):** Ollama's default context depends on your VRAM: **4K tokens under 24 GB**, **32K for 24–48 GB**, **256K at 48 GB+**. To raise it, set `PARAMETER num_ctx 32768` in a **Modelfile**, pass `"num_ctx"` in the API `options`, or start the server with **`OLLAMA_CONTEXT_LENGTH=32768`**. A bigger context needs more memory for the KV cache. For Llama 3.1 8B that is about **4 GiB at 32K tokens** (f16), on top of the 4.9 GB model. Check the result with **`ollama ps`**: you want `100% GPU`.

If your local model "forgets" the start of a long document or loses instructions in a long agent session, the context window is usually the reason. Ollama doesn't use a model's full native context by default, because a large window costs a lot of memory. This guide shows how to raise it safely, based on Ollama's documentation and the models' published configurations (sources at the end).

## Ollama's default context window

According to the Ollama docs, the default context length now depends on available VRAM:

| Your VRAM | Default context |
|---|---|
| Less than 24 GiB | 4K tokens |
| 24–48 GiB | 32K tokens |
| 48 GiB or more | 256K tokens |

Older guides (and older versions of Ollama) mention a 2,048-token default. That is outdated. Ollama also notes that agents, coding tools and web search should use **at least 64,000 tokens**, if your hardware allows it.

When your prompt plus conversation history exceeds the window, older content is cut off, which is why long sessions start "forgetting" instructions.

## Method 1: Modelfile (best for a reusable setup)

A Modelfile bakes your context setting into a named model you can reuse.

**1. Create a file called `Modelfile`:**

```dockerfile
FROM deepseek-r1:14b

# 32K-token context window
PARAMETER num_ctx 32768

# DeepSeek recommends a temperature around 0.6 for R1 models
PARAMETER temperature 0.6
PARAMETER top_p 0.95
```

**2. Build it:**

```bash
ollama create deepseek-r1-32k -f ./Modelfile
```

This reuses the weights you already downloaded; it only writes a new model definition.

**3. Run it and check how it loaded:**

```bash
ollama run deepseek-r1-32k "Hello"
ollama ps
```

`ollama ps` shows the **CONTEXT** in use and a **PROCESSOR** column: `100% GPU` is what you want. A split such as `30%/70% CPU/GPU` means part of the model or cache spilled into system RAM and generation will be slower.

## Method 2: Per request through the API

If you call Ollama from code, pass `num_ctx` in `options`:

```bash
curl http://localhost:11434/api/generate -d '{
  "model": "llama3.1:8b",
  "prompt": "Summarize this document...",
  "options": { "num_ctx": 16384 }
}'
```

With the official Python package:

```python
import ollama

response = ollama.generate(
    model="llama3.1:8b",
    prompt="Summarize this document...",
    options={"num_ctx": 16384},
)
print(response["response"])
```

In an interactive `ollama run` session you can also type `/set parameter num_ctx 16384`.

## Method 3: Change the default for everything

To change the default for all models, set the environment variable when starting the server:

```bash
OLLAMA_CONTEXT_LENGTH=32768 ollama serve
```

On Windows, set `OLLAMA_CONTEXT_LENGTH` as a user environment variable and restart Ollama. The Ollama desktop app also has a context-length slider in its settings.

## How much memory a bigger context needs

The KV cache stores keys and values for every token in the window. For models with grouped-query attention, the size per token is:

```text
KV bytes per token = 2 (K and V) × layers × KV heads × head_dim × bytes per value
```

Use the number of **KV heads** (`num_key_value_heads` in the model's `config.json`), not the total attention heads. That mistake is common and inflates or deflates estimates a lot. With an f16 cache (2 bytes per value), the published configurations give:

| Model (Ollama Q4 size) | Layers / KV heads / head_dim | KV per token | 8K ctx | 16K ctx | 32K ctx |
|---|---|---|---|---|---|
| Llama 3.1 8B (4.9 GB) | 32 / 8 / 128 | 128 KiB | 1 GiB | 2 GiB | 4 GiB |
| DeepSeek-R1 14B (9.0 GB) | 48 / 8 / 128 | 192 KiB | 1.5 GiB | 3 GiB | 6 GiB |
| Qwen2.5 32B (20 GB) | 64 / 8 / 128 | 256 KiB | 2 GiB | 4 GiB | 8 GiB |

Add a bit of overhead for the runtime on top of *model size + KV cache*. So, roughly:

- **Llama 3.1 8B at 32K** needs about 4.9 + 4 ≈ 9 GB, which is too much for an 8 GB GPU but fine on 12 GB+. At **8K** (about 6 GB) it fits an 8 GB card.
- **DeepSeek-R1 14B at 32K** needs about 9 + 6 ≈ 15 GB, so a 16 GB card is tight and 24 GB is comfortable.
- **Qwen2.5 32B at 32K** needs about 20 + 8 ≈ 28 GB, more than a single 24 GB card.

These are calculations, not measurements. Always confirm with `ollama ps`.

## Halve the KV cache with quantization

Ollama can store the KV cache in 8-bit instead of 16-bit. Set this before starting the server:

```bash
OLLAMA_KV_CACHE_TYPE=q8_0 ollama serve
```

Ollama says `q8_0` uses about **half the memory of f16** with a very small loss in precision, and `q4_0` saves more with a noticeable quality cost. It's a global setting for all models, and it works when Flash Attention is enabled. Ollama enables Flash Attention automatically where supported; force it with `OLLAMA_FLASH_ATTENTION=1`. With `q8_0`, the 32K column in the table above roughly halves (Llama 3.1 8B: about 2 GiB instead of 4).

## Troubleshooting

**The model got slow after raising num_ctx.** Run `ollama ps`. If PROCESSOR shows a CPU share, the cache pushed part of the model off the GPU. Lower `num_ctx`, enable `OLLAMA_KV_CACHE_TYPE=q8_0`, or use a smaller model.

**Out-of-memory errors.** Step `num_ctx` down (32768 → 16384 → 8192) until the model loads at `100% GPU`.

**Memory use doubled with several apps connected.** Parallel requests can each need their own context. Set `OLLAMA_NUM_PARALLEL=1` if you only need one request at a time.

## Key takeaways

1. Ollama's default is **4K tokens on GPUs under 24 GB**, not the model's full native context.
2. Use a **Modelfile** for a permanent setting, **API options** per request, or **`OLLAMA_CONTEXT_LENGTH`** to change the default.
3. Budget memory as **model size + KV cache**, calculated with **KV heads**, and confirm with **`ollama ps`**.
4. **`OLLAMA_KV_CACHE_TYPE=q8_0`** is the easiest way to fit a longer context into the same GPU.

## Sources

- Ollama Docs: [Context length](https://docs.ollama.com/context-length) (defaults by VRAM, OLLAMA_CONTEXT_LENGTH, ollama ps)
- Ollama Docs: [FAQ](https://docs.ollama.com/faq) (num_ctx via API and /set, KV cache quantization, Flash Attention)
- Ollama Docs: [Modelfile reference](https://docs.ollama.com/modelfile)
- Model configurations on Hugging Face: [Llama 3.1 8B](https://huggingface.co/unsloth/Meta-Llama-3.1-8B-Instruct/blob/main/config.json), [Qwen2.5 14B](https://huggingface.co/Qwen/Qwen2.5-14B-Instruct/blob/main/config.json) (the base of DeepSeek-R1 14B), [Qwen2.5 32B](https://huggingface.co/Qwen/Qwen2.5-32B-Instruct/blob/main/config.json)
- Ollama model pages: [llama3.1](https://ollama.com/library/llama3.1/tags), [deepseek-r1](https://ollama.com/library/deepseek-r1/tags), [qwen2.5](https://ollama.com/library/qwen2.5/tags)

Related on VNHAX: [Running Llama 4 locally: VRAM requirements](/blog/running-llama-4-locally-vram-requirements-quantization) · [Small language models on edge devices](/blog/deploying-small-language-models-slms-edge-phi-4-mistral-quantization)
