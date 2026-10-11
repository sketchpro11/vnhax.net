---
title: "What Is Gemini 3.8 Flash Cyber? Google's Vulnerability-Finding Model Explained"
description: "Gemini 3.8 Flash Cyber is Google's cybersecurity variant of Gemini 3.8 Flash, available to trusted defenders through the Fairwind Program. What it does, its benchmark results, who can get it, and how it compares with Claude Mythos 5.1."
date: "2026-10-07"
updatedAt: "2026-10-12"
author: "Umar Hashmi"
category: "Google AI & Research"
tags: ["google", "gemini", "gemini-3-8-flash", "cybersecurity", "fairwind", "vulnerability-detection"]
---

> **Quick answer (checked 12 October 2026):** **Gemini 3.8 Flash Cyber** is the cybersecurity version of Gemini 3.8 Flash, released by Google on **2 September 2026**. Google calls it its most capable cybersecurity model, with frontier-level performance in **vulnerability detection** and **automated patching**. It isn't publicly available: access goes to **trusted defenders through Google's new Fairwind Program**. The regular Gemini 3.8 Flash is available to everyone at **$0.75 / $3.75** per million input/output tokens.

Google released two variants of Gemini 3.8 on the same day: the general **3.8 Flash** and the restricted **3.8 Flash Cyber**. Both are built on the same foundation; the Cyber version is tuned and released for defensive security work. Here is what Google has said about it, with sources at the end.

## What Gemini 3.8 Flash Cyber is for

Google focused the model on two jobs that defenders spend a lot of time on:

1. **Finding vulnerabilities** in large, real codebases.
2. **Fixing them**, by proposing correct patches.

Google says it deliberately prioritized **vulnerability fixing over offensive capabilities like exploitation**, which is also why access is limited to vetted defenders rather than offered as a public API.

## What Google's benchmarks show

All of these are Google's own published results:

- **CyberGym** (the standard benchmark for autonomous vulnerability discovery): Google reports frontier-level performance, beating its earlier 3.5 Flash Cyber and "significantly larger frontier models".
- **Internal multi-language benchmark:** because CyberGym only covers C/C++, Google also tested across complex codebases in **20 programming languages**, where the model's success rate **exceeded 70%**.
- **CWE-Bench** (an external patching benchmark run by Collinear): **47.2% pass@1**, against **47.8%** for a leading frontier model, at a significantly lower cost.

## Real-world use at Google

Google says it already uses 3.8 Flash Cyber to secure its own code. One example from the announcement: the **Chrome Security team** found that it produced **2.6 times more correct vulnerability patches** in Chrome than the best, much larger commercial models. Google also cited early results from the security company Wiz.

## Who can get access: the Fairwind Program

Gemini 3.8 Flash Cyber is available only through **Fairwind**, a new limited-access program for trusted defenders. Coverage of the launch describes it as aimed at governments and trusted security partners. Google hasn't published public eligibility criteria or pricing for the Cyber model. If you work on a security team, the realistic path is to contact Google Cloud about Fairwind.

Fairwind matters beyond this model: Google is also using it as the first access route for **Gemini 4 Argon**, its new flagship. See [Gemini 4 Argon features and benchmarks](/blog/gemini-4-argon-features-and-benchmarks).

## How it compares with Claude Mythos 5.1

Both Google and Anthropic now ship restricted security versions of their models:

| | Gemini 3.8 Flash Cyber | Claude Mythos 5.1 |
|---|---|---|
| **What it is** | Cyber-tuned variant of Gemini 3.8 Flash | Same model as Claude Fable 5.1 with safeguards designed for security and life-sciences work |
| **Access** | Trusted defenders via Fairwind | Verified organizations via Anthropic's trusted access programs |
| **Focus** | Vulnerability discovery and patching, at Flash speed and cost | Security and life-sciences research |

Read more in [What is Claude Mythos 5.1?](/blog/what-is-claude-mythos-5-1-explained)

## What this means if you can't get access

Most teams won't qualify for Fairwind. You can still:

- Use the regular **Gemini 3.8 Flash** for code review and secure-coding questions; Google says it was trained heavily on cybersecurity tasks as part of its shared core.
- Keep a **human in the loop**: treat any AI-proposed patch like a pull request from a new teammate, with tests and review before merging.
- Prioritize findings by **reachability** (can attacker input actually reach the bug?) rather than raw counts, so an AI scanner doesn't flood your backlog.

## Frequently asked questions

### Is Gemini 3.8 Flash Cyber publicly available?
No. Google offers it only to trusted defenders through the Fairwind Program.

### How much does Gemini 3.8 Flash Cyber cost?
Google hasn't published public pricing for the Cyber model. The standard Gemini 3.8 Flash costs $0.75 per million input tokens and $3.75 per million output tokens at its introductory price.

### Can it write exploits?
Google says it prioritized vulnerability fixing over offensive capabilities like exploitation.

## Sources

- Google: [Introducing Gemini 3.8 Flash and 3.8 Flash Cyber](https://blog.google/innovation-and-ai/models-and-research/gemini-models/3-8-flash-and-3-8-flash-cyber/) (2 September 2026)
- Thurrott: [Google releases Gemini 3.8 Flash and Cyber variant](https://www.thurrott.com/?p=340992)

Related on VNHAX: [Enterprise MCP server security](/blog/enterprise-mcp-server-security-hardening-protocol-bridges) · [Shadow AI governance for code assistants](/blog/shadow-ai-governance-auditing-securing-code-assistants)
