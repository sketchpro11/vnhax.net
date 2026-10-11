---
title: "Grok 4.8, Grok 4.9 and Grok 5: What xAI Has Actually Confirmed"
description: "A no-hype tracker of xAI's next Grok models: what is confirmed about Grok 4.8, what has only been hinted about Grok 4.9, why Grok 5 keeps slipping, and how to prepare your code."
date: "2026-10-08"
updatedAt: "2026-10-12"
author: "Umar Hashmi"
category: "xAI & Grok Models"
tags: ["xai", "spacexai", "grok-4-8", "grok-4-9", "grok-5", "ai-roadmap"]
---

> **Status as of 12 October 2026:** **Grok 4.7** is the current model (released 21 September 2026). **Grok 4.8** has been named by Elon Musk and is widely expected in October 2026, but xAI has not announced a date, price or API details. **Grok 4.9** has only been mentioned in passing. **Grok 5** has no confirmed release date after missing earlier targets. Anything more specific you read elsewhere is a prediction, not a roadmap.

There is a lot of confident-sounding content about upcoming Grok models: exact release days, context windows, "leaked" benchmarks. Almost none of it comes from xAI. This page sticks to what has actually been said publicly, labels everything else clearly, and I'll update it as xAI announces things.

## Where things stand today: Grok 4.7

Grok 4.7 is xAI's current flagship for coding, agents and general use. From xAI's [Grok 4.7 model page](https://docs.x.ai/developers/models/grok-4.7):

- Model ID `grok-4.7`, **500,000-token** context window
- **$2** input / **$0.50** cached input / **$6** output per million tokens, with higher rates for requests over 200K tokens
- Configurable reasoning effort (low to xhigh), function calling and structured outputs

For a full breakdown of what changed from Grok 4.6, see [Grok 4.7 vs Grok 4.6](/blog/grok-4-7-vs-grok-4-6-comparison-benchmarks).

## Grok 4.8: named, expected in October, details unconfirmed

**What is confirmed**
- On 13 September 2026, Elon Musk posted on X that Grok 4.8 is a **2.5-trillion-parameter model** trained with xAI's **new C++ software stack**, and that it would finish training that week and then begin reinforcement learning (as reported by [CellCog](https://cellcog.ai/blog/grok-4-8-release-date/) and others).
- After Grok 4.7, xAI (now SpaceXAI) moved to a roughly **monthly release cadence**, with Grok 4.8 slated for **October 2026**, according to [Wikipedia's Grok article](https://en.wikipedia.org/wiki/Grok_%28chatbot%29), which cites Heise.

**What is not confirmed**
- A release date, pricing, context window or API model ID. Reports say "grok-4.8" has appeared by name in the model picker of xAI's public Grok Build code, but a name in code is not a launch.

## Grok 4.9: one passing comment

The only public hint is a comment from Musk, quoted in coverage of the Grok 4.8 news, that Grok 4.9 would "probably" be in the same class as the current top models from OpenAI and Anthropic. There is **no date, no feature list and no pricing**. Fan accounts on X have predicted "4.9 in November, Grok 5 in December", but that is their guess.

## Grok 5: repeatedly delayed

Grok 5 was originally promised for **Q1 2026** and later pointed at Q2 2026; neither happened. As of today there is no announced release date and no official specifications. Treat any Grok 5 parameter counts, benchmark scores or "release dates" you see as speculation until xAI publishes them.

## Confirmed vs rumoured at a glance

| Model | Status | What is actually known |
|---|---|---|
| Grok 4.7 | **Released** 21 Sep 2026 | 500K context, $2 / $6 per 1M tokens (official docs) |
| Grok 4.8 | **Announced by Musk**, expected Oct 2026 | 2.5T parameters, new C++ training stack. No date, price or API details |
| Grok 4.9 | **Mentioned only** | One comment about expected capability. Nothing else |
| Grok 5 | **No date** | Missed Q1 and Q2 2026 targets. No official specs |

## How to prepare your code for new Grok releases

xAI is shipping fast, so the useful work is making upgrades boring:

1. **Keep the model ID in configuration**, not hard-coded, so you can switch from `grok-4.7` to the next model with one change.
2. **Keep a small evaluation set** of 20–50 real prompts from your app, and run it before switching production traffic.
3. **Watch the price page on launch day.** Grok 4.7 kept 4.6's price but used more tokens on the same tasks, according to reporting cited on Wikipedia, so check cost per task, not just price per token.
4. **Follow the source:** xAI's [models page](https://docs.x.ai/developers/models) is where new IDs and prices appear first.

## Frequently asked questions

### When is Grok 4.8 coming out?
xAI hasn't announced a date. It has been reported as slated for October 2026, in line with xAI's monthly release cadence since Grok 4.7.

### Is Grok 5 out?
No. As of 12 October 2026, Grok 5 has not been released and has no confirmed date.

### How big is Grok 4.8?
Musk said it is a 2.5-trillion-parameter model trained with a new C++ software stack. xAI has not published a model card yet.

## Sources

- xAI Docs: [Grok 4.7 model page](https://docs.x.ai/developers/models/grok-4.7) and [models overview](https://docs.x.ai/developers/models)
- Wikipedia: [Grok (chatbot)](https://en.wikipedia.org/wiki/Grok_%28chatbot%29) (release history and cadence, with citations)
- CellCog: [Grok 4.8 release date coverage of Musk's 13 September post](https://cellcog.ai/blog/grok-4-8-release-date/)

Related on VNHAX: [Grok 4.7 vs Grok 4.6](/blog/grok-4-7-vs-grok-4-6-comparison-benchmarks) · [What is SpaceXAI?](/blog/what-is-spacexai-xai-rebrand-orbital-intelligence) · [How GitHub Copilot routes between models](/blog/github-copilot-project-hydrafusion-explained)
