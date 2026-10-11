---
title: "GitHub Copilot HydraFusion vs Auto: How Multi-Model Routing Works"
description: "HydraFusion is a research preview in GitHub Copilot that orchestrates several models per task. How its Single, Cascade and Critique patterns work, how it differs from Auto, how to enable it, and what it costs."
date: "2026-10-07"
updatedAt: "2026-10-12"
author: "Umar Hashmi"
category: "GitHub & Developer Tools"
tags: ["github", "github-copilot", "hydrafusion", "model-routing", "multi-model-ai", "developer-tools"]
---

> **Quick answer (checked 12 October 2026):** HydraFusion shows up in the GitHub Copilot model picker, but it isn't a model. It is a **runtime orchestrator** that picks an execution pattern for each prompt: **Single** (one model), **Cascade** (a cheap model drafts, a stronger one takes over if needed) or **Critique** (a model from another family reviews the draft). It is a **research preview**, available in Copilot CLI, VS Code 1.140+ and the GitHub Copilot app for Copilot Pro, Pro+, Business and Enterprise. You pay each model's normal rate, so a HydraFusion task can cost more AI credits than a single-model request.

GitHub Copilot now gives you two ways to avoid picking a model yourself: **Auto** and **HydraFusion**. They sound similar, but they solve different problems. This guide explains both, based on GitHub's own documentation and changelog (linked at the end).

## Auto vs HydraFusion in one sentence each

- **Auto** picks **one model** for each request. GitHub recommends it for everyday work, and paid plans get a discount on model costs when using it.
- **HydraFusion** picks an **execution pattern**, which can involve **several models in one turn**, and is meant for substantial, well-scoped coding tasks.

GitHub's docs put it this way: where Auto picks the best model for each request, HydraFusion picks the best execution pattern for the task.

## The three HydraFusion execution patterns

For every prompt, HydraFusion uses capability signals for reasoning, code generation, debugging and tool use to choose the cheapest pattern that still meets its quality bar.

| Pattern | What happens | Time and cost |
|---|---|---|
| **Single** | One model completes the task. | Behaves much like a normal single-model request. |
| **Cascade** | An efficient model drafts a solution; a quality gate accepts it or escalates to a stronger model. | Slower and more expensive only if it escalates. |
| **Critique** | One model drafts, a read-only critic from a **different model family** reviews it, and the first model revises once. | Takes longest, because it adds review passes. |

A few details from the docs are worth knowing:

- The pattern is chosen **per prompt**, so one session can mix Single, Cascade and Critique.
- Choosing the pattern is a lightweight step and doesn't generate any of your response.
- **You can't choose which models HydraFusion uses.** It only uses models that your plan and your organization's model policy allow, and the mix changes as GitHub evaluates new models.
- HydraFusion has no context window of its own. The window shown in the picker is a conservative value based on the smallest model it might use.
- You only see the final answer. Intermediate drafts can be revised or thrown away.

## How to turn on HydraFusion

**VS Code (1.140 or later, or Insiders):**
1. Open Copilot Chat and select **HydraFusion** in the model picker.
2. If it isn't listed, enable the setting `chat.copilot.hydraFusion.enabled`.

**GitHub Copilot app:** update to the latest version, open Settings, search for "HydraFusion", turn it on, then select it in the model picker.

**Copilot CLI:** HydraFusion first launched here and is available in the model picker.

If you get Copilot through **Copilot Business or Enterprise**, an administrator has to allow preview features in the organization or enterprise settings first.

## What HydraFusion costs

There is no separate HydraFusion fee. You are billed for **each model it uses, at that model's standard rate**, and the Auto discount doesn't apply. Because Cascade and Critique can call more than one model, a single task can use more AI credits than it would with one model. GitHub says it keeps your main conversation on the same model where possible, so you still benefit from cached tokens, and helper models such as the reviewer only get the context they need.

## Does it actually help?

GitHub's own research results, reported by [InfoQ](https://infoq.com/news/2026/09/github-hydrafusion/), compared HydraFusion with Claude Opus 5 on TerminalBench 2.1 and reported a **4.9 percentage point improvement in verified task quality** with a **67% reduction in estimated cost**. These are GitHub's controlled evaluations, and GitHub itself notes that results depend on the configuration, so treat them as promising rather than proven for your codebase.

## When I would use which

- **Everyday questions, small edits, explanations:** Auto. It is cheaper and fast.
- **A tricky bug, or a change that touches several files:** HydraFusion is worth trying. The Critique pattern effectively gives you a second opinion from a different model family.
- **Anything production-critical on a deadline:** remember it is a research preview with **no SLA**, and GitHub says it isn't intended for production workloads yet. Keep reviewing diffs yourself.

This is an explainer based on GitHub's documentation. I'll add my own results here once I've used HydraFusion on real projects.

## Frequently asked questions

### Is HydraFusion a new AI model?
No. It is an orchestration system that coordinates existing models, such as a fast drafting model and a reviewer from a different model family.

### Who can use HydraFusion?
Copilot Pro, Pro+, Business and Enterprise users. On Business and Enterprise plans an administrator must enable preview features.

### Can I pick the models HydraFusion uses?
No. It chooses from the models your plan and organization policies allow.

### Is HydraFusion more expensive than Auto?
It can be. Each model call is billed at that model's standard rate, and the Auto discount doesn't apply.

## Sources

- GitHub Changelog: [HydraFusion in VS Code and the GitHub Copilot app (30 September 2026)](https://github.blog/changelog/2026-09-30-hydrafusion-in-vs-code-and-the-github-copilot-app/)
- GitHub Docs: [Using HydraFusion](https://docs.github.com/en/early-access/copilot/hydrafusion)
- InfoQ: [GitHub HydraFusion coverage and benchmark results](https://infoq.com/news/2026/09/github-hydrafusion/)

Related on VNHAX: [GitHub Copilot local sandboxing explained](/blog/github-copilot-local-sandboxing-explained) · [Copilot code review: PR approval guide](/blog/github-copilot-code-review-pr-approval-guide) · [Claude Code vs Antigravity vs Grok Build](/blog/claude-code-vs-antigravity-vs-grok-build-2026-shootout)
