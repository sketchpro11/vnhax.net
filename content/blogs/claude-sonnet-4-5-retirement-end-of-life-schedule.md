---
title: "Claude Sonnet 4.5 End-of-Life Schedule: Retirement Dates & Migration Alternatives"
description: "Migration guide for engineering teams on Claude Sonnet 4.5: official retirement date (Nov 30, 2026), breaking changes, and alternatives (Sonnet 5.5, Sonnet 5, Haiku 4.5)."
date: "2026-10-08"
updatedAt: "2026-10-12"
author: "Umar Hashmi"
category: "Anthropic & Claude Models"
tags: ["anthropic", "claude", "claude-sonnet-4-5", "end-of-life", "api-migration", "claude-sonnet-5-5"]
---

> **Executive summary:** Anthropic has set the official retirement deadline for **Claude Sonnet 4.5** on **November 30, 2026**. After this sunset date, all API requests to `claude-sonnet-4-5-20250929` will fail. Upgrading to the recommended replacement, **Claude Sonnet 5.5**, requires code adjustments for adaptive thinking parameters, tokenizer changes, and removed assistant prefill.

It usually starts with an routine notification email. The subject line states a model your production systems rely on is being retired. You skim it, intend to handle it during next sprint, and move forward. Then one morning, every production request fails silently, stalling support bots, summarization pipelines, or code agents.

Claude Sonnet 4.5 is now in its sunset cycle. Anthropic has published firm dates, and the deprecation countdown has begun. Below is a comprehensive migration guide detailing the official schedule, breaking changes, and replacement models.

## Official Sunset Schedule for Claude Sonnet 4.5

According to Anthropic's official model deprecation schedule:

| Milestone | Date | Status / Impact |
|---|---|---|
| **Deprecation Notice** | September 30, 2026 | Deprecated in developer console |
| **Retirement (Claude API)** | November 30, 2026 | Hard stop: all API requests fail |
| **Affected Model ID** | `claude-sonnet-4-5-20250929` | Deprecated version |
| **Recommended Replacement** | `claude-sonnet-5-5` | Primary GA successor |

### Key Logistics to Consider:
1. **Platform Variations:** Anthropic's retirement date directly impacts Anthropic-hosted endpoints (the Claude API, Claude Platform on AWS, and Microsoft Foundry). Cloud hyperscalers like Amazon Bedrock and Google Cloud Vertex AI maintain independent deprecation timetables.
2. **Standard 60-Day Notice:** Anthropic adheres to a minimum 60-day deprecation policy for GA models. Teams must audit their infrastructure promptly to prevent service disruptions.
3. **Auditing Active Callers:** Developers should export API usage logs from the Claude Console and perform repository-wide searches for `claude-sonnet-4-5` across staging, serverless lambdas, and background cron jobs.

## Pricing and Cost Dynamics: Sonnet 4.5 vs. Sonnet 5.5

On paper, list prices show a significant per-token reduction:

| Model | Input (per MTok) | Output (per MTok) |
|---|---|---|
| **Claude Sonnet 4.5** | $3.00 | $15.00 |
| **Claude Sonnet 5.5** | $2.00 | $10.00 |

### Tokenizer Expansion Factor
While list rates are approximately 33% cheaper, Claude Sonnet 5.5 employs an enhanced tokenizer. For identical code and English prose, the new tokenizer produces approximately **30% more tokens**. Factoring in this token density difference:
- Output at $10/MTok with 30% more tokens effectively balances to ~$13 per legacy-equivalent million tokens.
- Real-world bill reductions hover around 12% to 15% rather than a full 33%, depending on formatting and thinking depth.

Additionally, **thinking tokens** generated during reasoning passes are billed at standard output rates, and high-resolution image inputs incur higher token costs.

## Replacement Options: Sonnet 5.5 vs. Sonnet 5 vs. Haiku 5.5

| | Claude Sonnet 5.5 | Claude Sonnet 5 | Claude Haiku 5.5 |
|---|---|---|---|
| **Model ID** | `claude-sonnet-5-5` | `claude-sonnet-5` | see the [models overview](https://platform.claude.com/docs/en/about-claude/models/overview) |
| **Role** | Anthropic's recommended replacement | Previous Sonnet generation | High-volume, latency-sensitive tasks |
| **Price (in / out per MTok)** | $2 / $10 | $2 / $10 | $0.10 / $0.50 (prompts up to 100K tokens) |
| **Best for** | Coding agents, reasoning, tool use | Short-term bridge if you are already on it | Classification, extraction, routing |

Prices from Anthropic's [pricing page](https://platform.claude.com/docs/en/about-claude/pricing), checked 12 October 2026. Sonnet 5.5 has the same token prices as Sonnet 5 but cheaper prompt cache reads ($0.10 vs $0.20 per MTok).

**Recommendation:** move coding agents and reasoning pipelines to **Sonnet 5.5**, which is what Anthropic recommends. High-volume classification or extraction that used Sonnet 4.5 only because it was "good enough" may be far cheaper on **Haiku 5.5**. Test it on a sample of real requests first.

## Step-by-Step API Migration Code Example

```python
import anthropic

client = anthropic.Anthropic()

# Updated Sonnet 5.5 invocation
response = client.messages.create(
    model="claude-sonnet-5-5",
    max_tokens=4096,
    messages=[
        {"role": "user", "content": "Analyze the stack trace and generate a fix patch."}
    ],
    output_config={"effort": "medium"}  # Replaces legacy budget_tokens
)

# Parse content blocks safely
for block in response.content:
    if block.type == "text":
        print(block.text)
```

### Breaking API Changes to Address

According to Anthropic's [Sonnet 5.5 migration guide](https://platform.claude.com/docs/en/models/sonnet-5-5/migration-guide), five settings that worked on Sonnet 4.5 now return a **400 error** on Sonnet 5.5:

- **Thinking budgets:** replace `thinking: {"type": "enabled", "budget_tokens": ...}` with an effort level, e.g. `output_config: {"effort": "medium"}`.
- **Sampling parameters:** remove non-default `temperature`, `top_p` and `top_k`.
- **Assistant prefill:** you can no longer pre-fill the start of Claude's answer.
- **Forced tool choice:** forcing a specific tool returns an error; let the model choose.
- **`thinking: {"type": "disabled"}`:** to run without up-front thinking, send `thinking: {"type": "between_tools"}` instead.

Two behaviour changes also matter:

- **Thinking is on by default.** A request with no `thinking` field runs with adaptive thinking on Sonnet 5.5, while on Sonnet 4.5 it ran without thinking. Responses can start with thinking blocks, so don't read `content[0].text` blindly; loop over blocks by type, as in the example above.
- **Revisit `max_tokens`.** It now covers thinking plus text, and thinking tokens are billed as output tokens.

## Frequently Asked Questions

### When does Claude Sonnet 4.5 officially stop working?
The Claude API retires Claude Sonnet 4.5 on November 30, 2026. Subsequent calls will return API errors.

### Is Claude Sonnet 5.5 a drop-in parameter swap?
No. While swapping the model ID is simple, legacy thinking budgets, temperature overrides, and assistant message prefills must be removed to avoid 400 validation failures.

### Can Claude Code CLI assist with migration?
Yes. Developers using the Claude Code terminal harness can run `/claude-api migrate this project to claude-sonnet-5-5` to automatically refactor SDK calls.

## Conclusion

Migrating away from Claude Sonnet 4.5 before November 30, 2026 ensures continuous uptime and unlocks the superior reasoning and coding performance of Sonnet 5.5. Engineering teams should audit their codebases now, conduct regression benchmarks, and deploy updated client SDKs well ahead of the deadline.

## Sources

- Anthropic: [Model deprecations](https://platform.claude.com/docs/en/about-claude/model-deprecations) (Sonnet 4.5 retirement notice, 30 September 2026)
- Anthropic: [Claude Sonnet 5.5 migration guide](https://platform.claude.com/docs/en/models/sonnet-5-5/migration-guide)
- Anthropic: [Pricing](https://platform.claude.com/docs/en/about-claude/pricing) (prices and the newer tokenizer note)

Related on VNHAX: [Claude Sonnet 5.5 vs Sonnet 5: what changed](/blog/claude-sonnet-5-5-vs-sonnet-5-differences) · [Claude Opus 5.5 vs Claude Fable 5.1](/blog/claude-opus-5-5-vs-claude-fable-5-1-comparison) · [How to cut AI coding agent API costs](/blog/how-to-cut-ai-coding-agent-api-costs-token-proxies)
