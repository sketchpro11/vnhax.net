---
title: "How to Increase num_ctx in Ollama Modelfile: Complete VRAM & Context Guide"
description: "A comprehensive developer guide to configuring PARAMETER num_ctx in Ollama Modelfiles, preventing silent context truncation, and optimizing VRAM with KV cache quantization."
date: "2026-09-27"
author: "VNHAX Editorial"
category: "AI & Models"
tags: ["Ollama", "LLMs", "Modelfile", "VRAM Optimization", "Local AI"]
readTime: "8 min read"
image: "/og-image.png"
---

Did you know that when your local Ollama session exceeds its token limit, it silently discards your earliest messages? This creates an insidious problem known as **"silent amnesia"**, where the model quietly forgets its initial system prompt, persona rules, or earlier reference files without ever warning you.

By default, Ollama restricts context lengths to conserve system resources. However, modern developer workflows—such as autonomous coding agents, multi-turn technical chats, and document analysis—require substantially wider context windows.

In this guide, you will learn how to configure `num_ctx` permanently using Modelfiles, inspect active allocations, and optimize VRAM with KV cache compression to prevent out-of-memory system freezes.

> **Key Architecture Takeaways**
> * **Permanent Configuration:** Defining `PARAMETER num_ctx <tokens>` inside an Ollama `Modelfile` and running `ollama create` compiles a permanent custom model without redownloading model weights.
> * **Hardware Defaults:** Ollama automatically sets baseline context sizes based on GPU VRAM: `< 24 GiB` defaults to 4,096 tokens, `24–48 GiB` defaults to 32,768 tokens, and `≥ 48 GiB` scales to 256,000 tokens.
> * **VRAM Pre-Allocation:** Ollama pre-allocates memory for the full Key-Value (KV) cache upfront. If the combined model weights and KV cache exceed GPU memory, layers offload to system RAM and CPU, significantly reducing inference tokens-per-second.
> * **KV Cache Quantization:** Running `OLLAMA_KV_CACHE_TYPE=q4_0 ollama serve` compresses the KV cache to 4-bit precision, reducing its VRAM footprint to roughly 1/4 with negligible degradation in generation quality.

---

## Interactive Presentation: Architecting Local LLMs with Ollama

Browse through the complete 8-slide architecture deck below. You can navigate using the interactive buttons (`← Prev` / `Next →`), keyboard arrow keys, auto-play, or view in fullscreen. You can also launch the original live artifact directly in Google NotebookLM.

<!-- SLIDE_DECK_EMBED -->

---

## What is the Context Window and Why Does "Silent Amnesia" Occur?

Context length represents the maximum number of tokens a model can hold in working memory simultaneously while generating a response. This limit encompasses both the input tokens (system prompt, conversation history, retrieved documents) and the output generation tokens.

When an ongoing conversation exceeds Ollama's active `num_ctx` limit, the runtime does not throw an error or halt execution. Instead, it drops the earliest conversation turns using a sliding window. In agentic workflows or code review sessions, this leads to unexpected behavior:

* The model forgets its original role-playing instructions or output formatting constraints.
* Core repository files pasted at the beginning of the session vanish from working memory.
* Multi-step reasoning chains lose track of earlier constraints.

Standard development tasks like coding assistants and deep web research require a context window of at least 64,000 tokens. To achieve this reliability, developers must deliberately configure context length.

---

## How to Inspect Model Limits and Hardware Allocations

Before modifying parameters, inspect what your system is currently running. Ollama exposes two distinct context measurements:

### 1. Model Architectural Ceiling
To verify the physical maximum context supported by the base model architecture, run:

```bash
ollama show llama3.2 --modelfile
```

Look for the model parameter metadata in the output. For example, modern architectures like Qwen and Llama often support architectural limits of 40,960 or 131,072 tokens.

### 2. Active Session Context & GPU Offloading
To inspect how much memory is actively allocated to a running model, execute:

```bash
ollama ps
```

Under the **PROCESSOR** column, Ollama displays the compute allocation split:
* **`100% GPU`**: The model weights and KV cache fit entirely within VRAM, delivering maximum generation throughput.
* **`48%/52% CPU/GPU` (or similar split)**: Available VRAM was exhausted. Ollama offloaded the excess layers to system RAM and CPU, avoiding a crash but introducing significant latency.

---

## Step-by-Step Guide: Creating a Custom Model with PARAMETER num_ctx

While temporary CLI adjustments can be made during interactive sessions, creating a dedicated `Modelfile` provides a reproducible, permanent model profile.

### Step 1: Export or Create a Modelfile
You can inspect the existing base configuration using:

```bash
ollama show llama3.2 --modelfile > Modelfile.custom
```

Alternatively, create a clean `Modelfile` in your project directory:

```dockerfile
# Specify the base model
FROM llama3.2

# Set persistent context window size (e.g., 8192 tokens)
PARAMETER num_ctx 8192

# Optional: Add customized system instructions
SYSTEM "You are a senior software architect specializing in distributed systems and clean code."
```

### Step 2: Compile the Custom Model
Run `ollama create` pointing to your blueprint:

```bash
ollama create llama3.2-8k -f ./Modelfile
```

Ollama compiles this immediately. It does not redownload gigabytes of weights; it applies your parameter overrides as a lightweight metadata layer on top of the cached base model.

### Step 3: Run the Compiled Model
Launch your custom model with the expanded context window:

```bash
ollama run llama3.2-8k
```

Verify the active allocation by running `ollama ps` in a secondary terminal window.

---

## Modelfile Instruction Reference

According to official Ollama documentation, the following directives are supported in a Modelfile:

| Directive | Requirement | Purpose |
| :--- | :--- | :--- |
| `FROM` | Required | Defines the base model name, local path, or GGUF file. |
| `PARAMETER` | Optional | Configures runtime flags (`num_ctx`, `temperature`, `top_p`, `top_k`, `stop`). |
| `SYSTEM` | Optional | Specifies the persistent system prompt instructing model behavior. |
| `TEMPLATE` | Optional | Configures the prompt template format passed to the tokenizer. |
| `MESSAGE` | Optional | Pre-populates conversation turn history for few-shot prompting. |
| `ADAPTER` | Optional | Specifies fine-tuned LoRA adapters to load over the base model. |
| `LICENSE` | Optional | Sets legal terms and licensing parameters. |

---

## Hardware Allocations & VRAM Impact (The KV Cache Footprint)

Increasing `num_ctx` directly increases system memory consumption. Ollama stores conversational attention tokens in the **Key-Value (KV) Cache**, which is pre-allocated in VRAM when the model loads.

As context length increases, the memory required for the KV cache scales proportionally. For example, testing with quantized models demonstrates the following VRAM requirements:

* **2,048 tokens:** ~16.1 GB total VRAM
* **8,192 tokens:** ~16.5 GB total VRAM
* **32,768 tokens:** ~17.9 GB total VRAM
* **131,072 tokens:** ~23.5 GB total VRAM

### Recommended RAM & VRAM Safety Guidelines

| System RAM | Recommended Max Context | Hardware Feasibility |
| :--- | :--- | :--- |
| **8 GB RAM** | Up to 4,096 tokens | General baseline; higher context risks system freezing. |
| **16 GB RAM** | 8,192 tokens | Suitable for code reviews and document analysis. |
| **32 GB+ RAM** | 16,384 – 32,768 tokens | Enables multi-file coding workflows and agent loops. |
| **64 GB+ RAM** | 64,000+ tokens | Suitable for entire codebase ingestion and large RAG workflows. |

### Enabling KV Cache Quantization
If your GPU VRAM is constrained, you can reduce memory consumption by enabling 4-bit KV cache quantization:

```bash
# Launch Ollama with quantized KV cache compression
OLLAMA_KV_CACHE_TYPE=q4_0 ollama serve
```

This cuts the memory footprint of the KV cache by roughly 75% (1/4 of its normal footprint), allowing developers to double or quadruple their context length without upgrading hardware.

---

## Context Window vs Memory Benchmark Table

The following benchmark comparison outlines memory requirements, use cases, and configuration methods across token tiers:

| Context Length (Tokens) | Recommended Application | Memory Impact (VRAM / RAM) | Configuration Method | Persistence Level |
| :--- | :--- | :--- | :--- | :--- |
| **2,048** | Short-form Q&A, basic conversation | Standard baseline (~16.1 GB for 34B 4-bit) | Built-in default | Permanent (Base) |
| **4,096** | Technical discussion, code review | ~6.5 GB for 8B models (100% GPU) | `PARAMETER num_ctx 4096` | Permanent (Modelfile) |
| **8,192** | Document summarization, coding assistants | ~7.5 GB for 8B; ~16.5 GB for 34B | `PARAMETER num_ctx 8192` | Permanent (Modelfile) |
| **16,384** | Deep document retrieval, multi-file refactoring | Pushes usage over 8 GB on small models | `PARAMETER num_ctx 16384` | Permanent (Modelfile) |
| **32,768 (32k)** | Large codebases, complex multi-step reasoning | ~17.9 GB VRAM for 34B models | Modelfile or CLI override | Permanent (Modelfile) |
| **64,000 – 80,000** | Full codebase ingestion, web search agents | High memory pressure; potential CPU offload | `OLLAMA_CONTEXT_LENGTH=64000` | Session / Global Env |
| **131,072 (128k)** | High-capacity data processing, autonomous agents | ~23.5 GB (4-bit) to ~94 GB (16-bit) | Modelfile or API payload | Variable |
| **1,000,000 (1M)** | Extreme long-context research libraries | Extreme KV cache; requires quantization | `OLLAMA_KV_CACHE_TYPE=q4_0` | Global Server Flag |

---

## Alternative Configuration Methods: CLI, Env Vars & REST API

In addition to custom Modelfiles, Ollama allows adjusting context sizes dynamically:

### Method 1: Interactive CLI Session
During an active CLI session, adjust the context window directly in the terminal:

```bash
# Set context length dynamically
/set parameter num_ctx 8192

# Optionally save to a new permanent model profile
/save llama3.2-custom
```

### Method 2: Global Server Environment Variable
Set the default context size for all models served by the Ollama daemon:

```bash
# Set global context length on Linux / macOS
OLLAMA_CONTEXT_LENGTH=8192 ollama serve
```

For Windows PowerShell:

```powershell
$env:OLLAMA_CONTEXT_LENGTH="8192"
ollama serve
```

### Method 3: REST API Options Payload
When invoking Ollama programmatically via its OpenAI-compatible HTTP API, include `num_ctx` in the `options` object:

```json
{
  "model": "llama3.2",
  "prompt": "Analyze the following system architecture and summarize performance bottlenecks...",
  "options": {
    "num_ctx": 8192,
    "temperature": 0.2
  }
}
```

---

## Frequently Asked Questions (FAQ)

### What happens when an Ollama session exceeds its context window?
Ollama uses a sliding-window mechanism that silently drops the earliest tokens in the chat history. It does not throw an error; instead, the model will fail to recall initial constraints, system instructions, or code snippets provided at the beginning of the conversation.

### Does increasing num_ctx redownload the model weights?
No. When you create a custom model via `ollama create -f Modelfile`, Ollama reuses the cached model weights from disk. It creates an overlay configuration layer with your custom context parameters, completing the build process in just a few seconds.

### Why does generation speed drop after increasing context size?
If the combined size of the model weights and the expanded KV cache exceeds your GPU's dedicated VRAM, Ollama automatically offloads layers to system RAM and uses the CPU. Because CPU memory bandwidth is significantly lower than GPU VRAM, token generation speed slows down considerably.

### What is the most memory-efficient way to run large context models?
Enable KV cache quantization by launching your Ollama server with `OLLAMA_KV_CACHE_TYPE=q4_0 ollama serve`. This compresses the cache to 4-bit representation, saving up to 75% of cache VRAM while preserving full model reasoning fidelity.

---

## Summary & Best Practices

1. **Audit your base models:** Run `ollama show <model>` to check the maximum supported context before configuring overrides.
2. **Standardize on Modelfiles:** Use `PARAMETER num_ctx` inside a Modelfile and run `ollama create` for reliable, reproducible development environments.
3. **Monitor hardware offloading:** Always execute `ollama ps` to ensure your model runs at `100% GPU`. If CPU offloading occurs, reduce `num_ctx` or enable `q4_0` cache quantization.
4. **Leverage KV cache quantization:** Use `OLLAMA_KV_CACHE_TYPE=q4_0` to run 32k or 64k context windows on consumer hardware without buying costly enterprise GPUs.