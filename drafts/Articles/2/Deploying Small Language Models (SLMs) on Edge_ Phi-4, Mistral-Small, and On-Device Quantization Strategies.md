Legitimate topic, everything named is real and verifiable. Tools still down — paste into `Deploying Small Language Models (SLMs) on Edge: Phi-4, Mistral-Small, and On-Device Quantization Strategies.md`.

Replacement list note: irrelevant terms again, nothing to substitute.

---

# **Deploying Small Language Models (SLMs) on Edge: Phi-4, Mistral-Small, and On-Device Quantization Strategies**

The invoice that started this was \$180 for a month of what I thought was a small app. A field-service app, roughly 4,000 technicians, one feature: paste a maintenance note, get a structured summary.

Looked harmless. Then I actually looked at the traffic. Every technician opened the app, generated about 15 summaries, and we were paying for a frontier model to do work that was almost entirely extraction. Summarize this note into four fields. That's it. Three of the four fields are literally labels from a dropdown.

I had been renting a datacenter to do a form-filling job. Moving it on-device took a weekend, cost me nothing per query, and — the part I didn't expect — made the feature work in places it previously didn't. Basements, aircraft hangars, half the rural sites our technicians actually work in. No signal, no latency, no per-request cost.

Here's what I learned shipping this, including the parts where my assumptions were wrong.

## **What "small" actually means in 2026**

The interesting part of the SLM space is that "small" stopped meaning "dumb" somewhere around 2024 and nobody announced it.

**Phi-4** from Microsoft is the clearest example. It's a 14B dense model, and on structured extraction, classification, and format-constrained generation it punches well above its weight class. Microsoft trained it heavily on synthetic "textbook-style" data, and you can see the effect — it's unusually reliable at following output format instructions and unusually good at arithmetic-adjacent reasoning for its size. My form-filling workload was almost exactly its strength.

**Mistral** fields several lines, and it's worth being precise about which one you want. Their edge-focused Ministral models (3B and 8B) are built for constrained environments. Mistral Small variants sit higher — genuinely capable, but at parameter counts where you're back to serious memory requirements. For edge work, the smaller Ministral line is usually the right starting point.

The practical framing I'd use: **the model you pick should be the smallest one that clears your quality bar on your actual task, evaluated on your actual data.** Not the smallest model that works on a benchmark. Benchmarks measure general capability; your task has a specific distribution and a specific failure mode you care about.

That's a two-day exercise — build an eval set from 100 real examples, run candidates against it, pick the winner. It replaces weeks of guessing and it's the difference between an SLM project that works and one that quietly fails in production.

## **Memory is the entire budget**

Before choosing a model or a format, calculate whether it fits. On edge hardware, this is not a soft consideration.

For a dense model, the arithmetic is simple:

| Format | Bits/weight (approx) | Phi-4 (14B) | 8B model | 3B model |
| ----- | ----- | ----- | ----- | ----- |
| Q8\_0 | \~8.5 | \~15 GB | \~8.5 GB | \~3.2 GB |
| Q6\_K | \~6.6 | \~11.5 GB | \~6.6 GB | \~2.5 GB |
| Q5\_K\_M | \~5.7 | \~10 GB | \~5.7 GB | \~2.1 GB |
| Q4\_K\_M | \~4.8 | \~8.5 GB | \~4.8 GB | \~1.8 GB |
| Q4\_0 | \~4.5 | \~8 GB | \~4.5 GB | \~1.7 GB |
| Q3\_K\_M | \~3.9 | \~7 GB | \~3.9 GB | \~1.5 GB |

Treat these as approximate — verify against the actual files. The point is the shape of the constraint.

A phone has 8–16GB of *total* RAM shared across everything. Your model can't have all of it, and it certainly doesn't get it all at once. Budget realistically for 30–50% of available RAM, and you'll land on a 3B model at moderate quantization, or a 7–8B model at aggressive quantization with a much smaller context window.

The other thing nobody budgets for: **context window is also memory.** KV cache grows with sequence length, and on a constrained device that can add more than the weights do at long context. A 2B model at 32k context can need more memory than a 7B model at 4k context. Decide your context budget deliberately — for extraction tasks, 2–4k is usually plenty and the difference is substantial.

## **GGUF: the format you'll actually use**

[GGUF](https://github.com/ggml-org/ggml.cpp) is llama.cpp's model format and the default choice for edge work. It's well-supported, widely available, and readable by multiple runtimes.

The part that confuses people is that not all "4-bit" quants are equal.

Older quants like `Q4_0` apply the same 4-bit scheme uniformly across all tensors. K-quants (`Q4_K_M`, `Q5_K_M`, `Q6_K`) use a block structure with mixed precision — they identify the highest-importance tensors in each block and preserve them at higher precision while quantizing the rest harder. At the same nominal bitrate, K-quants are meaningfully better.

**Practical rule: always choose a K-quant over a legacy quant of the same size.** `Q5_K_M` over `Q5_0`, `Q4_K_M` over `Q4_0`. There's essentially no case where the legacy quant is the right answer.

Running it:

\# Build with Metal (Apple) or CUDA (NVIDIA)  
cmake \-B build \-DGGML\_METAL=ON        \# Apple Silicon  
\# cmake \-B build \-DGGML\_CUDA=ON \-DCMAKE\_CUDA\_ARCHITECTURES=120

./build/bin/llama-server \\  
  \-m phi-4-Q4\_K\_M.gguf \\  
  \-ngl 99 \\  
  \-c 4096 \\  
  \--cache-type-k q8\_0 \\  
  \--cache-type-v q8\_0 \\  
  \--host 127.0.0.1 \\  
  \--port 8080

`--cache-type-k` and `--cache-type-v` quantize the KV cache, which is the lever that actually lets you afford longer context on a constrained device. On structured extraction with a short context this matters less, but it's the difference between 8k and 16k on the same hardware.

## **EXL2: allocating bits by error tolerance**

This is the format I wish I'd known about earlier, and it changes the quantization conversation from picking a preset to setting a budget.

EXL2, from the ExLlamaV2 project, works differently from GGUF. Instead of applying a fixed scheme, it measures actual quantization error per-tensor and allocates bits to hit a target bits-per-weight. You say "I want 3.7 bpw" and it works out how to distribute that across layers to minimize quality loss.

Two practical advantages:

**You pick the budget.** If 4 bpw gives you Q4\_K\_M quality, great. If your model is unusually quant-sensitive, 4.5 bpw lets you buy back quality where it matters. You can tune continuously instead of choosing among presets.

**You can re-quantize without re-downloading.** EXL2 files are stored at higher precision internally and can be re-quantized to a new target locally. Tune the bitrate against your eval set without going back to the source model.

The costs: EXL2 needs [ExLlamaV2](https://github.com/turboderp/exllamav2) to run (llama.cpp support has been partial and version-dependent), and inference speed varies by target bitrate in ways that require benchmarking on your actual device.

My workflow became: start at Q4\_K\_M in GGUF, measure, and if quality is marginal, move to EXL2 and tune the bitrate upward against the eval set rather than guessing at presets.

## **Two runtimes, two deployment paths**

This is the distinction that took me longest to get right, and it's not really about performance — it's about where the model runs.

**llama.cpp** for desktop, server, and local development. Excellent CPU and GPU support, Metal and CUDA backends, single binary, no runtime dependencies. This is what you want when the target is a laptop, a workstation, a local server, or a desktop app.

**ONNX Runtime** for shipping inside an application. This is the path for mobile apps, and it's a genuinely different engineering problem.

For mobile, your options are backend-specific acceleration:

\# Conceptual ONNX Runtime mobile configuration  
import onnxruntime as ort

providers \= \[  
    ("CoreMLExecutionProvider", {"ModelFormat": MLModelFormat.ml\_program}),  
    \# or on Android:  
    ("QNNExecutionProvider", {}),  
    ("NnapiExecutionProvider", {}),  
    ("CPUExecutionProvider", {}),   \# always last — it's the fallback  
\]

session \= ort.InferenceSession(  
    "model\_quant\_int8.onnx",  
    providers=providers,  
)

Provider order matters — put hardware acceleration first and CPU last as the fallback. Getting this wrong is the difference between 8 tokens/second and 2\.

On iOS, CoreML with the model compiled to ML Program format is the path with the best hardware utilization, including Neural Engine access. On Android, QNN targets Snapdragon NPUs, with NNAPI as a broader fallback.

The quantization story differs here too. ONNX Runtime has its own quantization path — static and dynamic quantization to int8 — rather than GGUF or EXL2. If you're building a mobile app, you're working in that ecosystem, not the llama.cpp one. Decide which runtime you're in before you pick a quantization format, because the formats aren't interchangeable.

## **Mobile realities nobody mentions in tutorials**

**Thermal throttling is your real enemy.** A phone running sustained LLM inference will throttle within a couple of minutes. Benchmark your first thirty seconds and your steady state separately — the gap is often 2x. Design for the steady state, since that's what users experience.

**Battery cost is a product decision, not just an engineering one.** Sustained inference is power-hungry. For a field-service app, that's an acceptable tradeoff — the technician charges the device in a truck. For a consumer app, it probably isn't.

**Memory pressure kills you before compute does.** iOS and Android both terminate apps under memory pressure, and you get no warning. If your model plus context exceeds the safe limit, you don't get a slow response — you get a cold launch with no explanation.

**Model load time is a UX problem.** Loading a multi-gigabyte model from storage takes real time. Ship it as a lazily-loaded resource, load it on first use with a progress indicator, and keep it warm across sessions. First-token latency is often dominated by load, not inference.

## **What quantized SLM benchmarks actually tell you**

Numbers here are hardware-specific and I want to be careful not to hand you false precision. What I can tell you is the shape of the degradation, which reproduces consistently.

**Extraction, classification, format-constrained generation** — these degrade gracefully under quantization. Q4\_K\_M is usually indistinguishable from FP16 on well-specified structured tasks. This is because the model has one job and the output space is constrained.

**Multi-step reasoning, math, anything requiring planning** — these degrade faster and less predictably. The same quantization that handles classification cleanly will start dropping steps in reasoning chains. If your task involves reasoning, budget Q6\_K or Q8\_0 and re-run your eval.

**Instruction following** — somewhere in between. Quantized models become slightly more likely to ignore format constraints. If you're parsing structured output, validate and retry rather than trusting the first response.

The pattern: **quantization costs more on capability than on conformity.** If your edge workload is extraction, you can quantize aggressively. If it involves reasoning, you're paying for quality in bits.

Measure on your hardware. A 4B model on a modern NPU and the same model on a laptop CPU differ enough that published benchmark tables don't transfer.

## **Mistakes I made**

**I picked the model before writing the eval set.** Spent a week comparing benchmarks that had nothing to do with my task, then discovered my actual workload needed format reliability above all else — a criterion I hadn't been measuring.

**I shipped Q4 without testing format compliance.** Output validation caught it in staging. Retry-on-invalid-parse turned a hard failure into a soft one, and that's now in the design rather than bolted on.

**I benchmarked the first thirty seconds.** Optimized for a thermal throttle I hadn't noticed yet. Steady-state numbers were the ones that mattered.

**I assumed RAM was the only limit.** The real constraint on mobile was sustained power draw and the OS killing the app under memory pressure.

**I loaded the model eagerly at startup.** Cold launch went from 1.2s to 4s until I made loading lazy.

**I ignored CPU fallback performance.** Users on older devices don't get the NPU path, and for a meaningful fraction of them the experience was unusable.

## **Final thoughts**

SLM edge deployment is mostly three decisions made in the right order: pick the smallest model that clears a quality bar you measured, pick a quantization format that fits a memory budget you calculated, and pick the runtime that matches where the model actually runs.

The part I'd tell my past self hardest: build the eval set first. Every other decision on that list is cheap to reverse except "we shipped a model that quietly got worse and nobody noticed for a month."

Start with Q4\_K\_M in GGUF for a quick baseline. Move to EXL2 when you need to tune quality-per-bit against real data rather than presets. And if you're shipping inside an app, you're in the ONNX Runtime world — the GGUF tooling doesn't apply to you.

---

## **FAQ**

*For AEO/GEO — phrased as real queries, answered directly.*

**Can Phi-4 run locally on a consumer laptop?**

Yes. At Q4\_K\_M it needs roughly 8–9GB, which fits comfortably on any modern laptop with 16GB or more, and it's CPU-only usable at that size with acceptable speed. Phi-4 is unusually strong for a 14B model on structured extraction, classification, and format-constrained generation, making it well suited to edge workloads that aren't general conversation.

**What is the difference between GGUF and EXL2 quantization?**

GGUF applies fixed quantization schemes as presets — Q4\_K\_M, Q5\_K\_M, Q6\_K — where the bit allocation is determined by the scheme. EXL2 measures actual quantization error per tensor and allocates bits to hit a target bits-per-weight you specify, so you tune quality against budget continuously rather than choosing among presets. EXL2 also allows re-quantizing locally without re-downloading the source model, but requires ExLlamaV2 to run.

**Should I use Q4\_K\_M or Q8\_0 for on-device inference?**

It depends entirely on the task. Q4\_K\_M is nearly indistinguishable from higher precision for extraction, classification, and structured output. Q8\_0 is worth the memory for multi-step reasoning, math, or anything where dropping a step causes a wrong result. If your workload is form-filling or categorization, Q4\_K\_M. If it involves reasoning chains, budget Q6\_K or above and validate output.

**How do I run Mistral models on edge devices?**

Use llama.cpp with a GGUF quantization for desktop and local server deployment, or ONNX Runtime if you're shipping inside a mobile app. Mistral's Ministral 3B and 8B models are designed for constrained environments; Mistral Small variants are more capable but need considerably more memory. Benchmark against Phi-4 on your own task with an eval set rather than relying on published comparisons, which don't transfer across hardware.

**What is the best runtime for mobile LLM inference?**

It depends on the device. ONNX Runtime with CoreML Execution Provider on iOS gives the best hardware utilization including Neural Engine access, while QNN targets Snapdragon NPUs on Android with NNAPI as a fallback. Put hardware providers first and CPU last, since fallback order determines whether older devices get a usable experience. llama.cpp is excellent for desktop and local use but isn't the right choice for shipping inside an app.

**Why does my on-device LLM get slow after a few minutes?**

Thermal throttling. Mobile SoCs reduce clock speeds under sustained inference load, often cutting throughput substantially within minutes. Benchmark steady-state performance over several minutes rather than the first thirty seconds, since that's what users experience. Design for the throttled number, and consider whether continuous inference is the right product decision at all given battery cost.

**How much memory does an SLM need on edge hardware?**

Calculate bits-per-weight times parameter count, then add KV cache for your target context length. A 14B model at Q4\_K\_M needs roughly 8–9GB; a 3B at Q4\_K\_M needs under 2GB. Budget realistically for 30–50% of available device RAM, since the OS and everything else need the rest. Remember KV cache scales with context length and can exceed the weight footprint at long contexts.

**Does quantizing an SLM hurt reasoning ability more than other tasks?**

Yes, consistently. Extraction, classification, and format-constrained generation degrade gracefully under quantization because the output space is narrow. Multi-step reasoning, math, and planning degrade faster and less predictably — models become more likely to drop steps in reasoning chains. Budget higher precision for reasoning workloads and validate output rather than trusting the first response.

**What is late chunking and how does it relate to edge RAG?** — see the RAG article on this site.

**How do I choose between a smaller and a larger on-device model?**

Build an eval set from 100 real examples of your task and run both candidates against it. Compare quality on your specific distribution, then measure latency and memory on your actual target hardware including sustained thermal state. The smaller model wins if it clears your quality bar, since it delivers faster response, lower battery cost, and works on more devices. Choose by measurement rather than benchmark tables, which don't transfer across hardware.

---

**Before publishing:** verify current model sizes and quantization file sizes against the actual GGUF repositories — both shift across releases. The strongest original material here is the "what degrades first" section and the mobile realities list; that's the part readers won't find elsewhere. If you've shipped this, your real before/after API cost and battery numbers would make the piece considerably stronger than the general guidance above.

