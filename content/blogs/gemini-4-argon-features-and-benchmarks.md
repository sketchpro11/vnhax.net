---
title: "Gemini 4 Argon Explained: DeepMind's Frontier Features & Benchmark Breakdown"
description: "Gemini 4 Argon is now generally available: where you can use it, the $2/$10 intro price that doubles on 1 December, the 1M input-output token limit, benchmarks vs GPT-6 Astra and Claude Opus 5.5, and how to budget for it."
date: "2026-10-07"
updatedAt: "2026-11-08"
author: "Umar Hashmi"
category: "Google AI & Research"
tags: ["google", "google-deepmind", "gemini-4-argon", "benchmarks", "multimodal-ai", "gemini-api"]
---

> **Quick answer (checked 8 November 2026):** **Gemini 4 Argon** is Google DeepMind's flagship model. It was announced on **30 September 2026** for cyber defenders first, and became **generally available on 13 October 2026** in the Gemini API (paid tier), Google AI Studio and Google Cloud. It costs **$2 per million input tokens and $10 per million output tokens until 30 November**, then **$4 / $20 from 1 December 2026**, with cached input 95% cheaper. It has a **1,048,576-token limit shared between input and output**. Google's own benchmarks put it ahead on knowledge work, long context and long video, while Claude Opus 5.5 and GPT-6 Astra still lead some terminal-heavy coding tests.

When Google first announced Argon on 30 September, almost nobody could use it. Only vetted security teams in Google's Fairwind Program got access, and developers who tried the model ID got errors. That changed two weeks later. On 13 October Google opened Argon to everyone on the paid Gemini API and Google Cloud, and to Google AI Pro and Ultra subscribers in the Gemini app.

So the question is no longer "when can I use it?" It's "is it worth the price for my work, especially once the price doubles on 1 December?" This guide covers what Argon is, what it costs, where it's strong and weak according to the published numbers, and how to decide.

A note on sources: I haven't run my own benchmark suite on Argon. Everything below comes from Google's announcements and documentation, Artificial Analysis and GitHub's changelog, all linked at the end. Where a number is Google's own, I say so.

## What Gemini 4 Argon is for

Google pitches Argon for **long, multi-step work** rather than quick chat:

1. Real-world software engineering
2. Enterprise knowledge work, such as legal, finance and tax tasks
3. Defensive cybersecurity

According to [Artificial Analysis](https://artificialanalysis.ai/articles/gemini-4-argon-google-top-three-labs), Argon is the first Gemini above the Flash class in more than seven months, so it's also Google's answer to GPT-6 Astra and Claude Opus 5.5.

Google also describes how it uses Argon internally. Argon-powered agents helped free over 300 TiB of memory across its data centres and migrate C and C++ code to Rust, including up to 800K+ lines for the Fuchsia Zircon kernel. These are Google's claims about its own systems, so treat them as promising rather than independently verified.

## Where you can use it (since 13 October 2026)

| Where | Who |
|---|---|
| Gemini API (paid tier), Google AI Studio, Android Studio | Developers worldwide; there's **no free tier** for Argon |
| Google Cloud (Gemini Enterprise Agent Platform, formerly Vertex AI) | Enterprises; model ID `gemini-4-argon`, GA |
| Gemini app and AI Mode in Search | Google AI Pro and Ultra subscribers |
| Google Antigravity | Google AI Ultra subscribers |
| GitHub Copilot | Copilot Pro+, Max, Business and Enterprise (per GitHub's changelog) |
| Fairwind Program | Vetted cyber defenders get access without cyber guardrails, on a rolling basis |

The model ID is the same everywhere: `gemini-4-argon`.

## Specs that matter for developers

From Google Cloud's model page:

| Spec | Value |
|---|---|
| Token limit | 1,048,576, shared between input and output |
| Output in one segment | Up to 65,536 tokens when streaming, 32,768 when not streaming |
| Very long answers | Up to the full limit using "long decodes" over follow-up calls |
| Input | Text, images, audio, video |
| Output | Text |
| Thinking levels | `LOW`, `MEDIUM` (default), `HIGH` |
| Caching | Implicit caching only (4,096-token minimum); explicit caching isn't supported |
| Also supports | Batch, function calling, structured output, code execution, Google Search grounding, URL context, computer use |
| Not supported | Tuning, RAG Engine, the Live API |

The "1M output" headline needs a careful reading. The 1M figure is a **unified** limit for input plus output. A single response segment is capped at 65,536 tokens when streaming. Longer answers continue through follow-up calls, which Google calls long decodes. That's still a big deal for jobs like generating a full manual or a large code migration in one run, but plan your code around segments, not one giant response.

## What it costs

| Per 1M tokens | Until 30 Nov 2026 | From 1 Dec 2026 |
|---|---|---|
| Input | $2.00 | $4.00 |
| Output (including thinking tokens) | $10.00 | $20.00 |
| Cached input | $0.10 | $0.20 |
| Batch input / output | $1.00 / $5.00 | $2.00 / $10.00 |

Source: Google's Gemini API pricing page.

A quick worked example: a task that reads 200K tokens and writes 60K tokens costs about **$1.00** at the introductory price ($0.40 input + $0.60 output) and about **$2.00** from 1 December. Run it 1,000 times a month and the price change adds roughly $1,000.

Two things push real costs up:

- **Argon is wordy.** Artificial Analysis recorded about 62K output tokens per task on average, versus 27K for GPT-6 Astra. Output is the expensive side.
- **Thinking tokens are billed as output.** Use the `LOW` thinking level for simpler work.

**My advice:** budget with the $4 / $20 prices, not the introductory ones.

## Benchmarks: Argon vs GPT-6 Astra vs Claude Opus 5.5

These are Google's published numbers from its [model page](https://deepmind.google/models/gemini/):

| Benchmark | Area | Gemini 4 Argon | GPT-6 Astra | Claude Opus 5.5 |
|---|---|---|---|---|
| Vals Index | Knowledge work | 68.9% | 63.1% | 67.0% |
| Vals Finance Agent v2 | Finance | 65.4% | 53.5% | 58.6% |
| DeepSWE v1.1 | Agentic coding | 77.9% | 74.1% | 74.2% |
| Terminal-Bench 4.0 | Agentic coding | 57.4% | 58.2% | 66.4% |
| FrontierSWE v2 | Agentic coding | 55.0% | 65.5% | 62.3% |
| LVBench | Long video | 91.7% | 87.5% | 83.7% |
| CWE-bench v1 | Cybersecurity | 68.0% | 68.0% | 67.0% |
| GraphWalks, 256K–1M | Long-context retrieval | 84.2% | 71.8% | 66.8% |

**Where Argon looks strongest:** knowledge work, very long context and long-video understanding.

**Where it trails:** terminal-heavy coding. Claude Opus 5.5 leads Terminal-Bench 4.0 by about nine points, and GPT-6 Astra leads FrontierSWE by about ten.

### Read the fine print

1. **These are vendor-reported.** Google's methodology notes say it ran its own DeepSWE score with its own harness, while competitor numbers came from public leaderboards and system cards.
2. **Independent results are more modest.** Artificial Analysis scored Argon 53 on its Intelligence Index, level with GPT-6 Astra at maximum effort. It measured a 15% hallucination rate on AA-Omniscience, the lowest among models scoring 45 or above, versus 51% for GPT-6 Astra. Raw accuracy was lower, though, so Argon seems to win partly by saying "I don't know" more often.
3. **Prompt injection resistance.** On Gray Swan's indirect prompt injection benchmark, Google reports 0.7% attack success for Argon versus 1.0% for Claude Opus 5.5 and 8.5% for GPT-6 Astra. That's useful if your agents read emails, tickets or web pages.

## Argon vs Gemini 3.8 Flash

| | Gemini 4 Argon | Gemini 3.8 Flash |
|---|---|---|
| Role | Flagship for long, hard coding, enterprise and security work | Google's fast "workhorse" model |
| Price per 1M tokens | $2 / $10 until 30 Nov, then $4 / $20 | $0.75 / $3.75 (introductory) |
| Free tier | No | See Google's pricing page |

**Practical rule:** use 3.8 Flash for chat, classification, extraction and RAG, where speed and cost matter most. Send only the hard, multi-step tasks to Argon. At the December price, Argon costs more than 5x Flash per token.

## How to try Argon, step by step

1. **Get a paid Gemini API key** in Google AI Studio. There's no free tier for Argon.
2. **Call `gemini-4-argon`** with a small test prompt to confirm access.
3. **Pick a thinking level.** Start with the default `MEDIUM`; use `LOW` for simpler tasks and `HIGH` only when quality clearly improves.
4. **Stream long answers** and handle continuation if you expect more than 65,536 output tokens.
5. **Build a 20–30 task test set** from your real work and run it on Argon and your current model. Compare quality, output tokens and cost per task.
6. **Move only the tasks where Argon wins**, and budget at $4 / $20.

## Common mistakes to avoid

- **Budgeting on the introductory price.** It ends on 30 November.
- **Expecting one 1M-token response.** Single segments are capped; long outputs come in continuations.
- **Ignoring output length.** A wordy model can cost more per task even at the same token price.
- **Using Argon for everything.** Route simple work to Flash.
- **Trusting launch charts blindly.** Test on your own tasks.
- **Assuming a big context means perfect recall.** Test retrieval on your own documents.

## Final thoughts

Argon is a real step up for Google, especially for long-context work, knowledge tasks and low hallucination, and it's now open to anyone with a paid API key. The two things to plan around are the price, which doubles on 1 December, and its wordiness, which shows up in your bill.

If your work is long documents, finance or legal analysis, or video understanding, it's worth testing now. If your agents live in a terminal, compare it carefully with Claude Opus 5.5 and GPT-6 Astra first. For related reading, see the [GPT-6 Astra vs Sol vs Luna guide](/blog/gpt-6-astra-vs-sol-vs-luna-comparison) and the [Google AI hub](/google).

## Frequently Asked Questions

### Is Gemini 4 Argon available now?
Yes. It became generally available on 13 October 2026 in the paid Gemini API, Google AI Studio and Google Cloud, and in the Gemini app for Google AI Pro and Ultra subscribers.

### How much does Gemini 4 Argon cost?
$2 per million input tokens and $10 per million output tokens until 30 November 2026, then $4 and $20 from 1 December 2026. Cached input is $0.10, rising to $0.20.

### Does Gemini 4 Argon have a free tier?
No. Argon is only available on the paid tier of the Gemini API.

### What is Gemini 4 Argon's token limit?
1,048,576 tokens, shared between input and output. A single streamed response segment is capped at 65,536 tokens, and longer outputs continue through follow-up calls.

### Is Gemini 4 Argon better than Claude Opus 5.5?
Not across the board. In Google's own table, Claude Opus 5.5 leads Terminal-Bench 4.0 (66.4% vs 57.4%), while Argon leads on the Vals Index, long-context retrieval and long-video understanding.

### Is Gemini 4 Argon in GitHub Copilot?
Yes. GitHub's changelog lists it for Copilot Pro+, Max, Business and Enterprise plans.

### Does Gemini 4 Argon hallucinate less than other models?
In Artificial Analysis's test, yes: a 15% hallucination rate versus 51% for GPT-6 Astra. Its raw accuracy is lower, which suggests it declines to answer more often instead of guessing.

## Sources

- Google: [Gemini 4 Argon is now available for everyone](https://blog.google/innovation-and-ai/models-and-research/gemini-models/introducing-gemini-4-argon/) (13 October 2026)
- Google: [Introducing Gemini 4 Argon](https://blog.google/innovation-and-ai/models-and-research/gemini-models/gemini-4-argon/) (30 September 2026)
- Google Cloud: [Gemini 4 Argon model documentation](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/gemini/4-argon)
- Google AI for Developers: [Gemini API pricing](https://ai.google.dev/gemini-api/docs/pricing)
- Google DeepMind: [Gemini models and evaluations](https://deepmind.google/models/gemini/)
- GitHub Changelog: [Gemini 4 Argon in GitHub Copilot](https://github.blog/changelog/2026-10-13-gemini-4-argon-in-github-copilot/)
- Artificial Analysis: [Gemini 4 Argon returns Google to the top three labs](https://artificialanalysis.ai/articles/gemini-4-argon-google-top-three-labs)

Related on VNHAX: [Claude Haiku 5.5 vs GPT-6.1 Sol](/blog/claude-haiku-5-5-vs-gpt-6-1-sol-token-cost-coding-agents) · [Gemini 3.8 Flash Cyber explained](/blog/what-is-gemini-3-8-flash-cyber-explained) · [Gemini app for Windows](/blog/how-to-download-install-google-gemini-windows-guide)
