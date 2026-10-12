---
title: "Deploying Small Language Models on Edge Devices: Phi-4, Ministral 3 and Quantization"
description: "How to run small language models on laptops, phones and edge hardware: which open models fit (Phi-4, Phi-4-mini, Ministral 3, Qwen2.5-Coder), real download sizes, KV cache math, GGUF vs EXL2 vs ONNX Runtime, and mobile pitfalls."
date: "2026-10-05"
updatedAt: "2026-10-12"
author: "Umar Hashmi"
category: "Edge AI & Hardware"
tags: ["slm", "phi-4", "ministral", "edge-ai", "quantization", "gguf", "llama-cpp", "onnx-runtime"]
---

> **Quick answer (checked 12 October 2026):** For on-device AI, pick the smallest open model that handles your task, quantize it (4-bit K-quants such as `Q4_K_M` are the usual starting point), and budget memory for the **weights plus the KV cache**. Real examples from Ollama: **Phi-4 (14B) is 9.1 GB** at Q4_K_M, **Ministral 3 8B is 6.0 GB** and **Ministral 3 3B is 3.0 GB**. Use **llama.cpp/GGUF** for desktops and servers, **EXL2** to fine-tune quality-per-GB on NVIDIA GPUs, and **ONNX Runtime** with CoreML or Qualcomm QNN to reach phone NPUs.

Cloud models are overkill for many tasks: classifying a support ticket, pulling fields out of a form, summarizing a short note. Small language models (SLMs) can do that kind of work on the device itself, which removes per-request API costs, cuts network latency and keeps working offline. This guide covers what fits where, using published model sizes and configurations (sources at the end). Measure on your own hardware before committing.

For desktop GPUs, see also [Running Llama 4 locally](/blog/running-llama-4-locally-vram-requirements-quantization) and [how to increase num_ctx in Ollama](/blog/how-to-increase-num-ctx-in-modelfile).

## Good open models for the edge

| Model | Size | License | Notes |
|---|---|---|---|
| **[Phi-4](https://huggingface.co/microsoft/phi-4)** (Microsoft) | 14B, dense | MIT | Strong reasoning for its size; 16K context |
| **[Phi-4-mini-instruct](https://huggingface.co/microsoft/Phi-4-mini-instruct)** (Microsoft) | 3.8B | MIT | 128K context; official ONNX version available |
| **[Ministral 3](https://huggingface.co/mistralai/Ministral-3-3B-Instruct-2512)** (Mistral AI) | 3B / 8B / 14B | Apache 2.0 | Built for edge; text and image input; 256K context on Ollama |
| **Qwen2.5-Coder 7B** (Alibaba) | 7B | Apache 2.0 | Code-focused |

A few useful details from the model cards:

- Microsoft's Phi-4-mini card stresses that a 3.8B model can't store much factual knowledge, and recommends pairing it with search or retrieval (RAG) where facts matter.
- Mistral says Ministral 3 3B can fit in **8 GB of VRAM in FP8**, and less when quantized further.

## Memory: weights plus KV cache

On phones and laptops, the model shares memory with the operating system and other apps. If your app goes over its limit, iOS and Android can terminate it without warning. So plan both parts of the budget.

**1. Weights.** Published 4-bit sizes from Ollama:

| Ollama model | Quantization | Download size |
|---|---|---|
| `phi4:14b` | Q4_K_M | 9.1 GB |
| `phi4:14b-q8_0` | Q8_0 | 16 GB |
| `ministral-3:8b` | default | 6.0 GB |
| `ministral-3:3b` | default | 3.0 GB |

As a rule of thumb, an 8-bit model is roughly 1 GB per billion parameters, and a 4-bit K-quant is a bit over half that.

**2. KV cache.** This grows with the context you actually use:

```text
KV bytes per token = 2 × layers × KV heads × head_dim × bytes per value
```

Use the model's **KV heads** (`num_key_value_heads` in `config.json`). For **Phi-4** (40 layers, 10 KV heads, head_dim 128) with an f16 cache, that's **200 KiB per token**: about **0.8 GiB at 4K tokens** and **3.1 GiB at its full 16K**. Short tasks like field extraction rarely need more than 2–4K tokens, so cap the context to save memory.

## llama.cpp and GGUF

[llama.cpp](https://github.com/ggml-org/llama.cpp) and its GGUF format are the default for local inference on desktops, servers and Macs. K-quants (`Q4_K_M`, `Q5_K_M`, `Q6_K`) mix precisions within the model and usually keep quality better than the older uniform `Q4_0` at a similar size.

Serving Phi-4 with a 4K context and an 8-bit KV cache:

```bash
# Build with Metal (Mac) or swap for -DGGML_CUDA=ON on NVIDIA
cmake -B build -DGGML_METAL=ON
cmake --build build --config Release

./build/bin/llama-server \
  -m models/phi-4-Q4_K_M.gguf \
  -ngl 99 \
  -c 4096 \
  -fa on \
  --cache-type-k q8_0 \
  --cache-type-v q8_0 \
  --host 127.0.0.1 --port 8080
```

An 8-bit KV cache uses about half the memory of f16; with Phi-4 at 4K that's roughly 0.4 GiB instead of 0.8 GiB.

## EXL2 on NVIDIA GPUs

[ExLlamaV2](https://github.com/turboderp/exllamav2)'s EXL2 format lets you choose an exact average bitrate (for example 4.25 bits per weight) and spends more bits on the layers where quantization error matters most. That makes it useful when you need to squeeze the best possible model into a fixed amount of VRAM on an NVIDIA card. It's a desktop and server option, not a mobile one.

## Phones: ONNX Runtime and NPUs

For native iOS and Android apps, [ONNX Runtime](https://onnxruntime.ai/) can hand work to the phone's neural hardware through execution providers, with the CPU as a fallback:

```python
import onnxruntime as ort

providers = [
    ("CoreMLExecutionProvider", {"ModelFormat": "MLProgram"}),  # Apple devices (Core ML)
    ("QNNExecutionProvider", {}),                               # Qualcomm Snapdragon NPU
    ("CPUExecutionProvider", {}),                                # fallback
]

session = ort.InferenceSession("model.onnx", providers=providers)
```

- **Apple:** the [CoreML execution provider](https://onnxruntime.ai/docs/reference/execution-providers/CoreML-ExecutionProvider.html) can compile to Core ML's ML Program format.
- **Android on Snapdragon:** the [QNN execution provider](https://onnxruntime.ai/docs/execution-providers/QNN-ExecutionProvider.html) targets Qualcomm's NPU.
- **Ready-made models:** Microsoft publishes an [ONNX build of Phi-4-mini-instruct](https://huggingface.co/microsoft/Phi-4-mini-instruct-onnx), which is a simpler starting point than converting a model yourself.

## Practical pitfalls on mobile

- **Heat.** Phones are passively cooled, so sustained generation can throttle the chip and slow output. Test performance after a few minutes of continuous use, not just the first few seconds.
- **Load time.** Reading a multi-gigabyte model from storage takes noticeable time. Load it in the background after launch and keep the session in memory instead of loading on every request.
- **Quantization hurts some tasks more than others.** Structured extraction and formatting usually hold up well at 4-bit; long multi-step reasoning is more sensitive. If quality drops, try a higher quant (Q5/Q6) or a slightly bigger model before giving up.
- **Measure on the target device.** Desktop speed tells you little about a mid-range phone.

## Frequently asked questions

### Can Phi-4 run on a 16 GB laptop?
Usually, yes. The Q4_K_M build is 9.1 GB, which leaves room for a few thousand tokens of context and the operating system. Speed depends heavily on whether it runs on a GPU, Apple Silicon or the CPU.

### What's the smallest useful model for a phone?
Models around 3–4B parameters, such as Ministral 3 3B (3.0 GB on Ollama) or Phi-4-mini (3.8B), are the usual starting point. Test on your target phone, since RAM available to apps varies a lot.

### Q4_0 or Q4_K_M?
Prefer `Q4_K_M`. K-quants use mixed precision and generally preserve quality better at a similar file size.

## Sources

- Microsoft: [Phi-4 model card and config](https://huggingface.co/microsoft/phi-4), [Phi-4-mini-instruct](https://huggingface.co/microsoft/Phi-4-mini-instruct), [Phi-4-mini-instruct ONNX](https://huggingface.co/microsoft/Phi-4-mini-instruct-onnx)
- Mistral AI: [Ministral 3 3B model card](https://huggingface.co/mistralai/Ministral-3-3B-Instruct-2512)
- Ollama: [phi4](https://ollama.com/library/phi4/tags) and [ministral-3](https://ollama.com/library/ministral-3/tags) model sizes
- ONNX Runtime: [CoreML execution provider](https://onnxruntime.ai/docs/reference/execution-providers/CoreML-ExecutionProvider.html), [QNN execution provider](https://onnxruntime.ai/docs/execution-providers/QNN-ExecutionProvider.html)
- [llama.cpp](https://github.com/ggml-org/llama.cpp) and [ExLlamaV2](https://github.com/turboderp/exllamav2)

Related on VNHAX: [How to cut AI coding agent costs](/blog/how-to-cut-ai-coding-agent-api-costs-token-proxies) · [Open-source AI tools we reviewed](/ai/ai-tools)
