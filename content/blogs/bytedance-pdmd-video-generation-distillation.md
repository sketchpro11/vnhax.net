---
title: "ByteDance PDMD: Projected Distribution Matching Distillation for Fast 4-Step Video AI"
description: "PDMD from ByteDance and UC San Diego cuts video generation from 50 steps to 4 with a one-line math projection that removes critic errors. Teardown and benchmarks."
date: "2026-10-08"
updatedAt: "2026-10-08"
author: "Umar Hashmi"
category: "AI & Models"
tags: ["bytedance", "pdmd", "video-generation", "diffusion-distillation", "ai-models", "open-source"]
---

**Quick answer:** PDMD (Projected Distribution Matching Distillation) is a new method from ByteDance and UC San Diego that lets a video model generate in 4 steps instead of the usual 50. It works by adding one line of math that removes the "critic's mistakes" from the training signal. On the team's own tests, the 4-step model scored higher than other 4-step methods, and even higher than the 50-step teacher on the overall video score.

---

If you have ever waited minutes for a short AI video clip, you know the feeling. You type a prompt, hit generate, go make tea, come back, and the clip is almost right but the hand looks strange. So you change a word and wait again.

That waiting is the real cost of video models. Not the price of the GPU, but the number of tries you can afford in one evening.

So when I saw a new ByteDance release that cuts video generation down to 4 steps, I did not just read the headline. I went to the project page, opened the benchmark table, and read the numbers line by line.

One honest note before we start. **I have not run PDMD on my own machine.** Everything below comes from the official project page, plus a video walkthrough of the release. Where something comes from the walkthrough and I could not confirm it on the official page, I will tell you. I think you deserve that more than a fake "I tested this for a week" story.

Official project page: [pdmd2026.github.io](https://pdmd2026.github.io/)

## First, what is "distillation"? (Simple version)

Video models like MiniMax-H3 create a clip by cleaning up noise, step by step. Each step is one "network evaluation". The project page calls this NFE. The teacher model in the tests uses **50 steps**.

More steps usually means better quality, but also more waiting.

Distillation is a trick where a smaller, faster "student" learns from the slow "teacher". The goal is simple: the student should give nearly the same result in 4 steps.

Think of it like a student who copies a teacher's finished homework until they can do it in a quarter of the time.

## The problem PDMD says it fixes

Most distillation methods use a "critic" (some people call it a discriminator). The critic compares what the teacher makes with what the student makes, then tells the student what to fix.

Here is the catch: **the critic is not perfect.** It makes its own mistakes. And those mistakes get passed down to the student as if they were correct advice.

The result, in plain words: the student learns some bad habits from a critic that was wrong.

According to the video walkthrough, PDMD finds the part of the training signal that comes from the critic's mistakes and removes it. The student gets a cleaner lesson.

## How PDMD does it (and why it is surprisingly small)

This is the part I liked most. The project page says PDMD is basically a **one-line change** to an older method called DMD (Distribution Matching Distillation).

Here is the actual line shown on the page:

```
# r = x0_critic - x0_student
d = d - (d * r).sum() / r.pow(2).sum() * r
```

You do not need to be a math person to get the idea:

- `d` is the direction the student is told to move.
- `r` is the gap between what the critic expects and what the student produces. The authors treat it as an estimate of the critic's error.
- The line takes the part of `d` that points the same way as `r` and subtracts it.

So the student only follows the part of the advice that does **not** line up with the critic's likely mistake.

The page also says what PDMD does *not* add:

- no extra loss
- no additional network
- no extra model pass

That matters in real life. Many "better training" tricks cost you more memory or more training time. A one-line change that costs nothing extra is easy for other teams to try.

> **Naming note:** the video walkthrough calls the older method "DMAD." The official project page calls it **DMD** (Distribution Matching Distillation). I am using the name from the official page.

## What the benchmark table actually shows

Numbers are where hype usually falls apart, so let's look at them. These are from the project page, tested on MiniMax-H3-33B using 387 prompts at 544p with the same seed for every method.

| Method | Steps | Total video score | Dynamic (motion) |
|---|---|---|---|
| MiniMax-H3-33B (teacher) | 50 | 82.41 | 66.67 |
| MiniMax-H3-33B (plain 4-step) | 4 | 79.48 | 44.44 |
| H3 Turbo LoRA | 4 | 81.57 | 54.78 |
| DMD2 | 4 | 82.27 | 59.95 |
| DMD | 4 | 82.76 | 61.76 |
| rCM | 4 | 81.18 | 58.40 |
| AnyFlow | 4 | 81.97 | 64.60 |
| **PDMD** | **4** | **83.17** | **71.83** |

A few things stand out:

- **Motion is where PDMD wins big.** The "Dynamic" score jumps from 61.76 (DMD) to 71.83. That is the same method with and without the projection, so it is a fair comparison.
- **The plain 4-step model is weak.** Just cutting steps with no distillation drops motion to 44.44. This is why distillation exists.
- **PDMD beats the 50-step teacher on the total score** (83.17 vs 82.41) in this table.

That last point sounds too good, so here is the reality check.

## Where I would stay careful

Good numbers still need good questions. Here is what I would keep in mind:

- **These are the authors' own tests.** The page says methods marked with a dagger (†) were *reimplemented by the authors* under a shared setup, each using its best checkpoint. That is a normal research practice, but it is not the same as an independent lab testing everything.
- **PDMD does not win every column.** On the semantic score (how well the video matches the prompt), DMD scores 83.05 and PDMD scores 82.86. Small gap, but it is there.
- **The teacher still wins on audio.** For example, the teacher's audio scores are 6.567 (PQ), 4.188 (CE), 6.213 (CU) and 5.15 (IS). PDMD gets 6.530, 4.062, 6.180 and 4.98. Close, but lower.
- **A higher benchmark score is not the same as a clip you will like.** Benchmarks measure averages. Your prompt might be the weird one.

So the fair summary is: *PDMD is the best 4-step result in this table, and it gets very close to, or beats, the teacher on most video numbers.* It is not magic.

The page also reports a **user study** (people comparing PDMD against the other methods), and a second test on Wan2.1 using VBench. If you are writing about this or deciding to use it, open those sections and read the exact percentages yourself.

## Even fewer steps: the 2-step gallery

The project page also has a gallery made with just **2 network evaluations**. Clips are 1344×768, 345 frames at 24 fps (about 14 seconds), generated from MiniMax-H3-33B with seed 42.

The 4-step gallery uses the same resolution and length. The page says every clip on it is 4 steps or fewer.

I would treat the 2-step gallery as a demo of what is possible, not as the default setting you should use for finished work.

## What you can download

According to the project page, ByteDance released:

- **Paper:** [arXiv](https://arxiv.org/abs/2609.35768)
- **Code:** [GitHub – ZeamoxWang/pdmd](https://github.com/ZeamoxWang/pdmd)
- **Weights:** [Hugging Face – pdmd_4NFE_full](https://huggingface.co/pdmd2026/pdmd_4NFE_full)

The video walkthrough adds two details:

1. A modified full base model, about **66 GB**, that runs the model in 4 steps.
2. A small LoRA, about **1.44 GB**, meant to sit on top of a smaller, quantized version of the model.

The 66 GB number makes sense, since a 33-billion-parameter model in 16-bit format lands around that size. But **I could not confirm the 1.44 GB LoRA on the official page**, so check the Hugging Face and GitHub pages for the exact file names and sizes before you plan your storage around it.

If the small LoRA is real and works as described, it matters a lot for people without big GPUs. A 1.44 GB file is something you can actually download on a normal connection and try.

## A practical checklist before you try it

I have not run this, so I am not going to hand you a fake "here is exactly what happened to me" tutorial. What I can give you is the checklist I would follow, based on the released materials.

**Step 1: Check your hardware honestly.**
A 66 GB model is not a "try it on my laptop" file. Look at how much memory your GPU has, and whether you would be using the full model or a quantized version with a LoRA.

**Step 2: Read the GitHub README first.**
Look for the exact install steps, the Python and library versions, and which checkpoint matches which model.

**Step 3: Download the correct weights.**
Start from the Hugging Face page linked above. Do not grab random re-uploads. Third-party copies can be outdated or changed.

**Step 4: Start with the 4-step setting.**
That is the setting the benchmark table is based on. Move to 2 steps only after you know what normal results look like on your own prompts.

**Step 5: Keep the seed fixed while you compare.**
The authors used seed 42 for every method. If you test your own prompts, change one thing at a time, otherwise you will not know why a clip looks different.

**Step 6: Compare against what you use today.**
Run the same prompt on your current setup and on PDMD. Look at motion, fine details, and whether the subject stays consistent from the first frame to the last.

## Mistakes to avoid

- **Trusting the headline instead of the table.** "4 steps" sounds like a free lunch. Check the columns.
- **Mixing up the names.** PDMD is the new method. DMD is the older one it improves. DMD2, rCM and AnyFlow are other methods in the comparison.
- **Expecting the same result on every model.** The main results are for MiniMax-H3-33B. The page also reports Wan2.1, but your own model may behave differently.
- **Using a random mirror of the weights.** Stick to the official links.
- **Judging by one clip.** Video models vary a lot between prompts. Test several.

## Why this matters for regular creators

Even if you never train a model yourself, this kind of work changes what you can do:

- **Faster tries.** Fewer steps means more attempts per hour.
- **Lower cost.** Less compute per clip, especially if you pay for cloud GPUs by the hour.
- **More people can experiment.** A small add-on file is easier to share than a giant model.

And for researchers, the idea is simple enough to test on other models. That is probably the most interesting thing about it.

## Final thoughts

What I like about PDMD is not the 4-step headline. Lots of methods promise speed. I like the *reason* it works: it admits the critic is flawed and removes that flaw from the lesson. And it does it with one line.

What I would still want to see is independent testing from people outside the project. Until then, treat the results as strong and promising, not final.

If you do try it, test it on your own prompts, keep your seed fixed, and write down what you see. That will teach you more than any table.

---

## Related reading on this site

- [ByteDance DMAD: 4-Step Video Generation Distillation](/blog/bytedance-dmad-video-generation-distillation)
- [NVIDIA Soul Refiner: Single-Step 4K Video Upscaling Guide](/blog/nvidia-soul-refiner-single-step-4k-video-upscaling)
- [Cloud Infrastructure & AI Runtimes Hub](/technology)

## Sources

- [PDMD official project page](https://pdmd2026.github.io/)
- [PDMD paper on arXiv](https://arxiv.org/abs/2609.35768)
- [PDMD code on GitHub](https://github.com/ZeamoxWang/pdmd)
- [PDMD weights on Hugging Face](https://huggingface.co/pdmd2026/pdmd_4NFE_full)
- [Creative Commons BY 4.0 license (music credit on project page)](https://creativecommons.org/licenses/by/4.0/)

---

## Frequently Asked Questions

### What is PDMD?
PDMD stands for Projected Distribution Matching Distillation. It is a method from ByteDance and UC San Diego that trains a fast "student" video model to generate in 4 steps by learning from a slower "teacher" model.

### What does PDMD change compared to DMD?
It adds one line that removes the part of the training signal pointing the same way as the estimated critic error. The project page says it adds no extra loss, network or model pass.

### How many steps does PDMD need?
Four network evaluations for the main results. The project page also shows a gallery generated with two.

### How many steps does the teacher model use?
In the benchmark table on the project page, the MiniMax-H3-33B teacher uses 50 steps.

### Does PDMD beat other distillation methods?
On the project page's H3 benchmark, PDMD has the highest total video score (83.17) and the highest motion score (71.83) among the 4-step methods. It does not win every column. For example, DMD is slightly higher on the semantic score.

### Does PDMD beat the original 50-step model?
On the total video score in that table, yes (83.17 vs 82.41). On the audio scores listed, the teacher is still slightly higher.

### Which model was PDMD tested on?
MiniMax-H3-33B is the main model. The project page also reports results on Wan2.1 using VBench.

### What is a "critic" in distillation?
A critic (or discriminator) is a component that compares the teacher's output with the student's and tells the student what to fix. It can be wrong, and PDMD is designed to reduce the effect of those errors.

### What does NFE mean?
NFE stands for number of function evaluations. Here it simply means the number of times the network runs to make one video. Fewer is faster.

### Is PDMD open source?
The project page links to a GitHub repository and Hugging Face weights. Check the repository for the exact license terms before using it commercially.

### How big are the PDMD files?
A video walkthrough describes a full model of about 66 GB and a LoRA of about 1.44 GB. The official page does not state these sizes, so confirm them on Hugging Face and GitHub.

### Can I run PDMD on a normal home computer?
The full model is very large. A smaller LoRA on top of a quantized model, if available as described, would be the more realistic route. Check the repository for hardware requirements.

### Are these results independently verified?
The numbers on the project page come from the authors, including their own reimplementations of competing methods. Independent testing would give a firmer picture.

### Where can I read the paper?
On arXiv, linked in the Sources section above and on the official project page.

