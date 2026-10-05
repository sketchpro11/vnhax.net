---
title: "How to Increase num_ctx in Ollama Modelfiles for 32k+ Context Windows"
description: "A comprehensive developer guide to configuring num_ctx in Ollama Modelfiles, calculating KV cache VRAM overhead, and avoiding out-of-memory errors on local inference setups."
date: "2026-10-04"
updatedAt: "2026-10-05"
author: "VNHAX Engineering Team"
category: "AI Tools & Runtimes"
tags: ["ollama", "local-llm", "context-window", "vram", "deepseek-r1", "llama-3"]
readTime: "7 min read"
---

## Understanding the Default Context Window in Ollama

By default, **Ollama** runs most open-weight models (including Llama 3, DeepSeek-R1, and Mistral) with a conservative context window of **2,048 tokens (`num_ctx 2048`)**. 

While this default ensures models load reliably on entry-level GPUs with only 6GB–8GB of VRAM, it introduces severe limitations when working with:
- Long repository indexing and codebase audits
- Multi-turn conversational history in AI agent loops
- Dense retrieval-augmented generation (RAG) pipelines
- Document summarization of PDFs and technical whitepapers

When your prompts exceed the configured context window, Ollama silently truncates early context or drops previous conversational turns, leading to hallucination and lost instructions.

Fortunately, modern model architectures natively support between 32,768 and 131,072 tokens. You can unlock this capability locally using custom **Modelfiles** or runtime API parameters. For hardware sizing and GPU calculations, see our companion benchmarks on [Running Llama 4 Locally on Consumer GPUs](/blog/running-llama-4-locally-vram-requirements-quantization) and [Deploying Small Language Models (SLMs) on Edge Devices](/blog/deploying-small-language-models-slms-edge-phi-4-mistral-quantization), or explore our [Local AI Tools Hub](/ai/ai-tools).

---

## Method 1: Tuning `num_ctx` via a Custom Modelfile (Recommended)

Creating a customized model artifact via a `Modelfile` is the cleanest approach because it permanently binds your desired context configuration to a reusable model alias.

### Step 1: Create a Modelfile

Create a new file named `Modelfile` in your project directory:

```dockerfile
# Start from your preferred base model
FROM deepseek-r1:14b

# Set the context window to 32,768 tokens (32k)
PARAMETER num_ctx 32768

# Set temperature and top_p for deterministic reasoning
PARAMETER temperature 0.6
PARAMETER top_p 0.95

# Custom system instructions
SYSTEM """
You are an expert software engineer running inside a high-context developer harness.
Provide concise, production-ready code with complete type safety.
"""
```

### Step 2: Build the Custom Model Alias

Compile your customized model into the local Ollama engine:

```bash
ollama create deepseek-r1-32k -f ./Modelfile
```

Ollama copies the base weights and writes the new parameter manifest in seconds without re-downloading model layers.

### Step 3: Verify and Run

Run your customized model with the expanded context window:

```bash
ollama run deepseek-r1-32k
```

You can verify that the expanded context buffer is active by checking the Ollama verbose logs or sending a test request with an extended token payload.

---

## Method 2: Adjusting `num_ctx` Dynamically via REST API

If you are invoking Ollama programmatically from Python, TypeScript, or an autonomous agent framework (like LangChain, LlamaIndex, or AutoGen), you can specify `num_ctx` dynamically inside the request `options` payload without modifying the model artifact:

```json
{
  "model": "deepseek-r1:14b",
  "prompt": "Analyze this entire 20,000-token codebase module...",
  "options": {
    "num_ctx": 32768,
    "temperature": 0.5
  },
  "stream": false
}
```

In Python with the official `ollama` SDK:

```python
import ollama

response = ollama.generate(
    model='deepseek-r1:14b',
    prompt='Review this architecture document...',
    options={
        'num_ctx': 32768,
        'temperature': 0.7
    }
)
print(response['response'])
```

---

## Calculating VRAM Overhead for Large Context Windows

Expanding your context buffer increases memory consumption because the attention mechanism must store **Key-Value (KV) cache** vectors for every active token.

The memory footprint of the KV cache can be calculated with the formula:

$$\text{KV Cache Size (Bytes)} = 2 \times \text{layers} \times \text{heads} \times \text{head\_dim} \times \text{tokens} \times \text{bytes\_per\_element}$$

### Practical Memory Benchmarks (16-bit float KV Cache)

| Model Architecture | Context Size | Weight VRAM (Q4_K_M) | KV Cache VRAM | Total Recommended VRAM |
| :--- | :--- | :--- | :--- | :--- |
| **8B (Llama 3.1)** | 8,192 tokens | ~4.8 GB | ~0.5 GB | **8 GB VRAM** |
| **8B (Llama 3.1)** | 32,768 tokens | ~4.8 GB | ~2.0 GB | **12 GB VRAM** |
| **14B (DeepSeek-R1)**| 16,384 tokens | ~8.9 GB | ~2.2 GB | **16 GB VRAM** |
| **14B (DeepSeek-R1)**| 32,768 tokens | ~8.9 GB | ~4.4 GB | **16 GB–20 GB VRAM** |
| **32B (Qwen 2.5)** | 32,768 tokens | ~19.5 GB | ~7.2 GB | **32 GB–36 GB VRAM** |

> **Pro Tip: Quantized KV Cache in llama.cpp / Ollama**  
> If you are constrained by GPU memory, enable 8-bit or 4-bit KV cache quantization. In Ollama configurations, setting `PARAMETER num_predict` and running `OLLAMA_FLASH_ATTENTION=1` reduces memory bandwidth pressure and lowers KV cache VRAM consumption by up to 50%.

---

## Troubleshooting Common Errors

### Error: `CUDA out of memory` / `model offloaded to CPU`
If the allocated model weights plus the 32k KV cache exceed your physical VRAM capacity:
1. Decrease `num_ctx` in increments (e.g. try `16384` or `8192`).
2. Use a smaller quantization level (e.g., `Q4_K_S` instead of `Q8_0`).
3. Set `OLLAMA_NUM_PARALLEL=1` to ensure multiple concurrent requests do not duplicate the context cache.

---

## Key Takeaways

1. **Default is 2,048 tokens:** Never assume a model will use its full 128k native context out of the box in Ollama.
2. **Use Modelfiles for Persistence:** Binding `PARAMETER num_ctx 32768` creates reproducible, team-wide model targets per the [official Ollama Modelfile documentation](https://github.com/ollama/ollama/blob/main/docs/modelfile.md).
3. **Budget for the KV Cache:** Always allocate an extra 2GB–5GB of headroom on top of base model weights when expanding context beyond 16k tokens, especially on reasoning models like [DeepSeek-R1](https://github.com/deepseek-ai/DeepSeek-R1). Check out our [Open-Source Repositories Hub](/repos) for more agent tooling.
