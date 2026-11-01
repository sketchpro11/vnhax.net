---
title: "Mistral Large 4 Open Weights: 1T-Parameter Specs, Real Hardware Needs and the License Catch"
description: "Mistral Large 4 (Le Chonk) is a 1-trillion-parameter open-weight MoE with about 52B active parameters, a 1M context window and image input. Real download sizes (FP8 ~1.06 TB, Q4_K_M 635 GB, IQ2_XXS 298 GB), what hardware can run it, the Model-as-a-Service license condition, API pricing and benchmarks."
date: "2026-11-02"
updatedAt: "2026-11-02"
author: "Umar Hashmi"
category: "AI & Models"
tags: ["mistral", "mistral-large-4", "open-weights", "moe", "vllm", "llama-cpp", "gguf", "local-llm"]
---

> **Quick answer (checked 2 November 2026):** **Mistral Large 4** ("Le Chonk") is an open-weight **mixture-of-experts** model with about **1 trillion total parameters** and **49B active per token** (52B including embeddings and output layers). It has a **1M-token context window**, takes **text and image input**, and has three reasoning levels (`low`, `medium`, `high`). The official **FP8 weights are about 1.06 TB**, an **NVFP4** version is about **610 GB**, and community GGUFs range from **298 GB (IQ2_XXS)** to **1.12 TB (Q8_0)**. In practice that means a multi-GPU server or a **512 GB unified-memory machine** with a 2-bit quant, not a gaming PC. It's free for commercial use, **unless you run a Model-as-a-Service business**, which needs a separate licence. Through Mistral's API it costs **$0.70 / $2.10 per million input / output tokens**.

Every time a big open-weight model drops, the same question floods developer forums within the hour: "Can I run it on my 4090?"

For Mistral Large 4, the honest answer is no, and it isn't close. But that doesn't make the release less interesting. A trillion-parameter model you can download, inspect, fine-tune and deploy inside your own walls is a big deal for companies that can't send data to someone else's API. And the licence is more permissive than many people assume, with one catch that matters a lot for a specific kind of business.

This guide covers what Mistral actually released, the real file sizes, what hardware can run it, what the licence allows, and when you're better off just using the API. All figures come from Mistral's announcement, the Hugging Face model card and the official GGUF repository, linked at the end. I haven't run the model myself, and I'll keep my own estimates clearly labelled as estimates.

## What Mistral Large 4 is

Mistral calls it "our largest and most capable model to date". The headline specs from the model card:

| Spec | Value |
|---|---|
| Total parameters | ~1 trillion |
| Active parameters per token | 49B (52B including embeddings and output layers) |
| Architecture | Mixture-of-experts: 128 routed experts, 4 active per token, plus 1 shared expert |
| Context window | 1M tokens |
| Input / output | Text and images in, text out |
| Reasoning | `low`, `medium`, `high` (default `high`) |
| Languages | 160+, including every official EU language |
| Training | From scratch on 3,800 NVIDIA Grace Blackwell GPUs in Mistral's own European data centres |
| Licence | Mistral Ecosystem Open-Weight License (modified MIT) |

It's one set of weights for chat, reasoning, coding and agent work, with native function calling, JSON output and strict JSON schema enforcement. Mistral says it's particularly strong on cybersecurity, finance and law, and on visual grounding (pointing at things in images).

The public preview arrived earlier in October through Mistral's API, and the open weights followed in late October.

## Why "52B active" doesn't mean "52B of memory"

This is the most common misunderstanding with MoE models, so it's worth a minute.

For each token, the model routes the work to 4 of its 128 experts plus a shared expert. That's why only about 52B parameters do work per token, and why generation can be much faster than a dense 1T model would be.

But different tokens pick different experts. To answer any prompt, **all** the experts must be loaded somewhere the hardware can reach quickly. So you need memory for roughly a trillion parameters, while getting the per-token compute of a 52B model.

## The real download sizes

Mistral publishes the weights in FP8. The llama.cpp team (ggml-org) publishes GGUF quantizations made from that FP8 checkpoint:

| Version | Size | Notes |
|---|---|---|
| Official FP8 checkpoint | ~1.06 TB | 54 safetensors files |
| Official NVFP4 checkpoint | ~610 GB | Targets NVIDIA Blackwell GPUs; vLLM and SGLang |
| GGUF Q8_0 | 1.12 TB | Near-lossless |
| GGUF Q4_K_M | 635 GB | 4-bit |
| GGUF Q2_K | 381 GB | 2-bit; ggml-org says it fits in 512 GB of unified memory |
| GGUF IQ2_XXS | 298 GB | imatrix-calibrated 2-bit; also fits in 512 GB |
| Vision encoder (mmproj) | 3.4 GB | Needed for image input in llama.cpp |

The ggml-org notes add a useful detail about the IQ2_XXS file: only the routed experts are squeezed to 2-bit. Attention, the shared experts, the first dense layer, the embeddings and the output head stay at 8-bit. That's a sensible trade, because the routed experts are where most of the size is.

## What hardware can actually run it

These are my estimates from the file sizes above. Remember you also need memory for the KV cache and runtime buffers, and that grows with context length.

**Data-centre GPUs (vLLM or SGLang).** Mistral's own vLLM example uses **8 GPUs with tensor parallelism**. At ~1.06 TB for FP8, you need a node with well over a terabyte of GPU memory in total. The NVFP4 version (~610 GB) is designed for Blackwell GPUs and cuts that requirement substantially.

**A 512 GB unified-memory machine (llama.cpp).** This is the most realistic "single box" option. ggml-org says the Q2_K (381 GB) and IQ2_XXS (298 GB) quants fit in 512 GB of unified memory, which today means a top-spec Apple Silicon workstation or a similar large-memory system. Expect it to be usable but slow compared with a GPU server, and expect some quality loss from 2-bit quantization.

**Consumer GPUs.** Not realistic. Even the smallest file (298 GB) is more than ten RTX 4090s' worth of VRAM. You could technically stream experts from system RAM or disk, but generation would be too slow for real work.

If you want a sense of what fits on gaming hardware instead, see my guide to [running Liquid AI's LFM2.5-24B-A2B on 16 GB and 24 GB GPUs](/blog/liquid-ai-lfm2-5-24b-a2b-local-setup-16gb-24gb-vram-gguf) and the [small models for edge devices guide](/blog/deploying-small-language-models-slms-edge-phi-4-mistral-quantization).

## Step by step: serving it with vLLM

Mistral recommends vLLM for production. Their documented setup uses a dedicated Docker image:

```bash
docker pull vllm/vllm-openai:mistral-large-4

docker run --runtime nvidia --gpus all \
  -v ~/.cache/huggingface:/root/.cache/huggingface \
  -p 8000:8000 \
  --ipc=host \
  vllm/vllm-openai:mistral-large-4 \
  --model mistralai/Mistral-Large-4-1T-A52B \
  --tensor-parallel-size 8 \
  --tool-call-parser mistral \
  --reasoning-parser mistral \
  --enable-auto-tool-choice \
  --gpu-memory-utilization 0.85
```

What matters in that command:

- `--tensor-parallel-size 8` splits the model across 8 GPUs.
- `--tool-call-parser mistral` and `--reasoning-parser mistral` are required for tool use and to separate the reasoning from the final answer.
- If you run out of memory, Mistral suggests lowering `--max-model-len` (context length) or `--max-num-seqs` (concurrency).

Then call it like any OpenAI-compatible endpoint at `http://localhost:8000/v1`. One gotcha from the model card: `max_completion_tokens` includes the reasoning tokens as well as the visible answer, so don't set it too low.

## Step by step: llama.cpp on a big unified-memory machine

ggml-org's model page gives a one-line start with their `llama` app:

```bash
llama serve -hf ggml-org/Mistral-Large-4-1T-A52B-GGUF:IQ2_XXS
```

A few practical notes:

1. **Check free disk space first.** The IQ2_XXS download alone is 298 GB.
2. **Use the recommended sampling.** Mistral recommends `temperature 1.0` and `top_p 0.95` for every reasoning level, and these are stored in the GGUF metadata.
3. **Reasoning can't be switched off.** ggml-org notes that reasoning depth is set with `reasoning_effort` (`low`, `medium` or `high`), but it can't be disabled. Use `low` for quick replies.
4. **Add the vision encoder** (`mmproj`, 3.4 GB) if you need image input.

## The licence: free, with one important condition

Mistral released Large 4 under the **Mistral Ecosystem Open-Weight License**, a modified MIT licence. You can use, copy, modify, fine-tune, distribute and sell products built on it, with two conditions:

1. Keep the copyright and permission notice.
2. **If you or an affiliate operate a "Model as a Service" business, you need a separate commercial licence from Mistral before any commercial use.**

The definition matters. "Model as a Service" means giving a third party access to the model for inference or post-training (for example through an API or hosted endpoint) in a way that lets them meaningfully control the inputs, parameters or training data.

The licence explicitly **does not** count:

- **End-user products** where model capabilities are embedded in specific features, for example a writing assistant inside your app.
- **Relaying requests** to models hosted by others.
- **Internal use** that doesn't make the model available to third parties.

In plain terms: a company running it internally, or building it into a product feature, is fine. A cloud provider or AI API reseller offering "Mistral Large 4 as an endpoint" needs to talk to Mistral first. If you're anywhere near that line, ask a lawyer to read the actual licence text.

## Benchmarks, with context

Mistral's published results (vendor-reported):

| Benchmark | Mistral Large 4 |
|---|---|
| Artificial Analysis Coding Agent Index | 48%, "effectively tied" with GLM-5.3, using 47% fewer tokens per task |
| Artificial Analysis Intelligence Index v5 | 26, the highest among Western open-weight models |
| Terminal-Bench 4.0 | 41% (up 13 points from the preview) |
| Cognition FrontierCode 2.0 | 19.7% |
| BrowseComp | 84.5% |
| B3 Agent Security (attack resistance) | 97.1% |

Mistral is candid that the leading Chinese open-weight models score higher on the overall Intelligence Index. Its pitch is efficiency and specific strengths, such as coding with fewer tokens, cybersecurity and visual grounding, rather than topping every chart.

## Self-hosting vs the API

For most teams, the API will be cheaper than buying hardware. Mistral's API pricing is **$0.70 per million input tokens, $0.07 cached, and $2.10 per million output tokens**. It's also on OpenRouter, NVIDIA-hosted endpoints and Microsoft Foundry.

Self-hosting makes sense when:

- your data can't leave your infrastructure (regulated industries, government, defence)
- you need to fine-tune deeply on private data
- you already own large GPU capacity and run very high volumes

Mistral itself adds a practical note on the model card: if local serving is subpar, use the API for best performance.

## Common mistakes to avoid

- **Confusing active and total parameters.** 52B active doesn't mean 52B of memory. Plan for the full ~1T.
- **Forgetting the KV cache.** A 1M context window is a capability, not a free lunch. Long contexts need a lot of extra memory.
- **Downloading 2-bit quants for quality-critical work.** IQ2_XXS is impressive for its size, but 2-bit has real quality costs. Test on your own tasks.
- **Setting `max_completion_tokens` too low.** Reasoning tokens count toward it, so answers can be cut off.
- **Assuming "open weights" means "no conditions".** Read the Model-as-a-Service clause before building a hosted product.
- **Comparing vendor benchmarks as if they were independent.** They're useful signals, not guarantees.

## Final thoughts

Mistral Large 4 isn't for your laptop, and it isn't trying to be. It's for organisations that want frontier-class, multimodal, long-context AI under their own control, with a licence that allows commercial use for almost everyone except AI hosting businesses. For everyone else, the API at $0.70 / $2.10 per million tokens is the sensible way to try it.

If you're comparing it with other large open-weight models, focus on three questions: what hardware you'd need, what the licence lets you do, and how it performs on *your* tasks, measured by you.

## Frequently asked questions

### How many parameters does Mistral Large 4 have?
About 1 trillion in total, with 49B active per token (52B including embeddings and output layers). It's a mixture-of-experts model with 128 routed experts, 4 active per token, plus 1 shared expert.

### Can I run Mistral Large 4 on a single GPU?
No. The smallest GGUF from the llama.cpp team (IQ2_XXS) is 298 GB. Realistic options are a multi-GPU server or a machine with 512 GB of unified memory running a 2-bit quant.

### How big is the Mistral Large 4 download?
The official FP8 checkpoint is about 1.06 TB and the NVFP4 checkpoint about 610 GB. GGUFs are 298 GB (IQ2_XXS), 381 GB (Q2_K), 635 GB (Q4_K_M) and 1.12 TB (Q8_0).

### Is Mistral Large 4 free for commercial use?
Yes, under the Mistral Ecosystem Open-Weight License, except that businesses operating a Model-as-a-Service offering need a separate commercial licence from Mistral. Internal use and product features that embed the model are allowed.

### What is the context window of Mistral Large 4?
1 million tokens.

### How much does the Mistral Large 4 API cost?
$0.70 per million input tokens, $0.07 per million cached input tokens and $2.10 per million output tokens.

### Can Mistral Large 4 understand images?
Yes. It accepts text and image input and returns text, with a vision encoder that handles variable image sizes and aspect ratios.

## Sources

- Mistral AI: [Mistral Large 4 (Le Chonk) is now open weight](https://mistral.ai/news/mistral-large-4-oss/)
- Hugging Face: [mistralai/Mistral-Large-4-1T-A52B model card](https://huggingface.co/mistralai/Mistral-Large-4-1T-A52B) and [LICENSE](https://huggingface.co/mistralai/Mistral-Large-4-1T-A52B/blob/main/LICENSE)
- Hugging Face: [mistralai/Mistral-Large-4-1T-A52B-NVFP4](https://huggingface.co/mistralai/Mistral-Large-4-1T-A52B-NVFP4)
- Hugging Face: [ggml-org/Mistral-Large-4-1T-A52B-GGUF](https://huggingface.co/ggml-org/Mistral-Large-4-1T-A52B-GGUF) (GGUF sizes and notes)
- vLLM: [Mistral Large 4 recipe](https://recipes.vllm.ai/mistralai/Mistral-Large-4-1T-A52B)

Related on VNHAX: [Running Llama 4 locally](/blog/running-llama-4-locally-vram-requirements-quantization) · [LFM2.5-24B-A2B local setup](/blog/liquid-ai-lfm2-5-24b-a2b-local-setup-16gb-24gb-vram-gguf) · [Small language models on edge devices](/blog/deploying-small-language-models-slms-edge-phi-4-mistral-quantization) · [Gemini 4 Argon explained](/blog/gemini-4-argon-features-and-benchmarks)
