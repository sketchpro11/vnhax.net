---
title: "NVIDIA SoL-Refiner Explained: One-Step 4K Refinement for AI Video"
description: "SoL-Refiner from NVIDIA Research turns low-resolution AI video into high-resolution output with a single denoising step, across generators like WAN, Cosmos-Nano, SANA-Video and MiniMax H3. How it works, the reported speedups, and where to get the code and weights."
date: "2026-10-08"
updatedAt: "2026-10-12"
author: "Umar Hashmi"
category: "Tech Platforms & Infrastructure"
tags: ["nvidia", "sol-refiner", "video-generation", "super-resolution", "diffusion", "open-weights"]
---

> **Quick answer (checked 12 October 2026):** **SoL-Refiner** ("Speed-of-Light One-Step Refinement for High-Resolution Video") is a research model from **NVIDIA Research** (Efficient AI Team and Singapore Lab), published on arXiv on **29 September 2026**. Instead of generating every frame at full resolution, you generate a cheap low-resolution draft with any video model, then SoL-Refiner refines it to high resolution, up to **4K**, in **a single denoising step**. Code is in NVIDIA's Sana repository and weights are on Hugging Face.

High-resolution AI video is slow because cost grows quickly with the number of pixels and frames. A common workaround is "generate small, then upscale", but most refiners need several sampling steps, which creates a second bottleneck. SoL-Refiner's idea is to do that refinement in **one step**. Everything below comes from NVIDIA's project page, paper and code repository (linked at the end). I haven't run it myself; the reported numbers come from NVIDIA's own measurements on data-center GPUs.

## How it works

The pipeline has two stages:

1. **Draft:** a base video generator produces a lower-resolution video. NVIDIA demonstrates **SANA-Video, WAN, Cosmos-Nano and MiniMax H3**.
2. **Refine once:** SoL-Refiner takes that draft and restores detail at the target resolution in a single denoising step.

The refiner is trained in three stages, according to the paper:

- **High-resolution continual training** on aligned pairs of low- and high-quality videos.
- **Frame-based reinforcement-learning post-training** with visual reward feedback to improve perceived quality.
- **One-step distribution-matching distillation**, which compresses a multi-step "teacher" refiner into a one-step "student".

The original paper builds on the **LTX-2.3 Refiner** as its backbone. NVIDIA later released a separate **LTX-2.5-based variant for MiniMax H3**, which the repository notes is outside the paper's experiments. NVIDIA also introduced **Refiner-Bench**, a benchmark of outputs from different video generators, to compare refiners fairly.

## Reported results

All of these are NVIDIA's own measurements, with the hardware they used:

| Setup (NVIDIA's protocol) | Without SoL-Refiner | With draft + one-step refine | Speedup |
|---|---|---|---|
| MiniMax H3, 5-second 1344×768 video at 24 fps, GB200 GPUs | 152.3 s at full resolution | 5.64 s total (4.06 s draft + 1.56 s refine) | **27.03×** |
| WAN, 81 frames at 24 fps, 1× H100 | 272.69 s direct at 1280×720 | 78.71 s at 1280×704 | **3.46×** |
| Cosmos-Nano (35-step), 189 frames at 24 fps, 1× H100 | n/a | n/a | **2.81×** |
| SANA-Video, 81 frames at 16 fps, 1× H100 | 20.04 s direct at 1248×704 | 12.54 s (832×480 + refine) | **1.60×** |

On quality, the paper reports that at about 2K the one-step SoL-Refiner beats all the external refiners it tested on **VBench** and **UniPercept** averages, and that at **3840×2176** it improves both metrics over the three-step **LTX-2.3 Refiner**. With its full acceleration stack, NVIDIA reports an **8.91× speedup in refinement latency** over the same baseline in its 2K setting.

Two cautions. These timings are on **H100 and GB200** data-center GPUs, not consumer cards. And the repository notes that the project-page figures are research results, separate from benchmarks of the released Diffusers implementation.

## Why it matters

- **It works across generators.** The refiner and the base model are separate choices, so a studio could keep its preferred generator and add a refinement stage.
- **Cheaper high-resolution output.** Generating at lower resolution and refining once can cut generation time substantially, according to the measurements above.
- **Open research artefacts.** The code and weights are public, so others can reproduce or build on the results.

## Limitations to keep in mind

- **Refining is not the same as the original.** Any refiner adds detail that wasn't in the low-resolution draft. For creative work that's usually the point; for anything where faithfulness matters, such as product footage or evidence, compare outputs carefully.
- **Heavy hardware.** The published results use data-center GPUs; NVIDIA hasn't published consumer-GPU requirements.
- **Research release.** This is a research project, not a packaged consumer app.

## Where to get it

- **Code:** the `sol-refiner` folder in NVIDIA's [Sana repository](https://github.com/NVlabs/Sana/tree/sol-engine/models/sol-refiner), with separate instructions for the LTX-2.3 paper version and the MiniMax-H3 extension.
- **Weights on Hugging Face:** [SoL-Refiner LTX-2.3 One-Step](https://huggingface.co/Efficient-Large-Model/SoL-Refiner-LTX-2.3-One-Step), [LTX-2.3 Multi-Step](https://huggingface.co/Efficient-Large-Model/SoL-Refiner-LTX-2.3-Multi-Step) and [LTX-2.5 for MiniMax-H3](https://huggingface.co/Efficient-Large-Model/SoL-Refiner-LTX-2.5-for-MiniMax-H3).

Check each model card for its license and requirements before using it in a product.

## Frequently asked questions

### What does SoL stand for?
"Speed-of-Light", from the paper's title: *SoL-Refiner: Speed-of-Light One-Step Refinement for High-Resolution Video*.

### Does SoL-Refiner generate video by itself?
No. It refines a video made by another generator, such as WAN, Cosmos-Nano, SANA-Video or MiniMax H3.

### Can I run it on a gaming GPU?
NVIDIA's published results use H100 and GB200 GPUs and it hasn't published consumer-GPU requirements, so check the repository instructions before trying.

## Sources

- NVIDIA Research: [SoL-Refiner project page](https://nvlabs.github.io/Sana/Sol-Refiner/)
- arXiv: [SoL-Refiner: Speed-of-Light One-Step Refinement for High-Resolution Video (2609.37969)](https://arxiv.org/abs/2609.37969)
- GitHub: [NVlabs/Sana, sol-refiner](https://github.com/NVlabs/Sana/tree/sol-engine/models/sol-refiner)

Related on VNHAX: [ByteDance DMAD: 4-step video generation](/blog/bytedance-dmad-video-generation-distillation) · [ByteDance PDMD explained](/blog/bytedance-pdmd-video-generation-distillation) · [NVIDIA PixelUMM explained](/blog/nvidia-pixelumm-pixel-space-multimodal-model)
