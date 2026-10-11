---
title: "ChatGPT Pro 100 vs Pro 200 vs Pro 500: Prices, Limits and Ultrafast Explained"
description: "OpenAI now sells three ChatGPT Pro plans at $100, $200 and $500 a month. What each includes, what changed for Pro 200, how Ultrafast works, and which plan makes sense."
date: "2026-10-12"
updatedAt: "2026-10-12"
author: "Umar Hashmi"
category: "OpenAI & Models"
tags: ["openai", "chatgpt-pro", "chatgpt-pro-500", "ultrafast", "gpt-6-astra", "pricing"]
---

> **Quick answer (checked 12 October 2026):** ChatGPT Pro now comes in three monthly plans: **Pro 100 ($100)**, **Pro 200 ($200)** and **Pro 500 ($500)**. All three include Pro models, Codex, deep research, image creation, memory and file uploads. The difference is how much usage you get, and only **Pro 500 includes Ultrafast**, OpenAI's fastest speed mode for GPT-6 Astra and GPT-6.1 Sol. New Pro 200 subscribers get a smaller allowance than before; eligible existing subscribers keep the old allowance until **29 October 2026**.

OpenAI announced the new Pro lineup at DevDay on 29 September 2026, and the announcement caused a lot of confusion, partly because the $200 plan got cheaper in value on the same day a $500 plan appeared. I went through OpenAI's Help Center, its pricing pages and the developer docs to pin down what is actually confirmed. Everything below links to those sources so you can check it yourself.

## The three Pro plans at a glance

| | Pro 100 | Pro 200 | Pro 500 |
|---|---|---|---|
| **Monthly price (USD)** | $100 | $200 | $500 |
| **Included usage** | Lowest of the three | More than Pro 100 | Highest of the three |
| **Ultrafast** | Not included | Not included | Included |
| **Pro models, Codex, deep research, images, memory, file uploads** | Yes | Yes | Yes |

That is exactly how OpenAI describes the plans on its [About ChatGPT Pro tiers](https://help.openai.com/en/articles/9793128-about-chatgpt-pro-tiers) help page. Notice what is missing: OpenAI does **not** publish exact message or token counts for any Pro plan.

### What about "25x Plus" and "10x Plus"?

You will see multiples like "Pro 500 = 25x Plus" and "Pro 200 cut from 20x to 10x Plus" in news coverage of DevDay. Those figures come from press reports of the launch, not from OpenAI's help documentation, which only says that each plan includes more usage than the one below it. Treat them as a rough guide, and check the usage meter in **Settings → Usage** once you subscribe.

## What changed for Pro 200

This is the part that matters if you already pay $200 a month.

- **Pro 200 is open to new subscribers again**, still at $200 a month.
- **New subscriptions get a lower usage allowance** than Pro 200 used to include. OpenAI says this reflects its "increasingly efficient models".
- **Grandfathering:** if you had an active Pro 200 subscription at any time from **22 September 2026 to 10 a.m. Pacific on 29 September 2026**, you keep the previous allowance **until 29 October 2026**, as long as your subscription stays active. After that, it moves to the new, lower allowance. The price stays the same.
- Keeping the old allowance does **not** give you Ultrafast. You are still on Pro 200.

All of this is from the [OpenAI Help Center](https://help.openai.com/en/articles/9793128-about-chatgpt-pro-tiers). If you are affected, OpenAI says you will get an email.

## What Ultrafast actually is

Ultrafast is a speed mode, not a different model. You get the same GPT-6 Astra or GPT-6.1 Sol, but tokens are generated much faster, and that speed costs a lot more usage.

- **How much faster:** OpenAI's [Codex speed documentation](https://developers.openai.com/codex/speed) says GPT-6 Astra Ultrafast "generates tokens up to 8x faster" than Astra in Standard mode in Codex. Launch coverage quoted OpenAI's figure of roughly 300 tokens per second in Codex. Both are "up to" numbers, not guarantees.
- **Where you can use it:** in ChatGPT Work and Codex, Ultrafast is available on **Pro 500** and eligible Enterprise and Edu plans. On Pro 100 and Pro 200, buying extra credits does **not** unlock it.
- **What it costs in usage:** on Pro 500, Ultrafast uses your included allowance at **8x the Standard rate** for the selected model, then draws from purchased credits at **6x** the Standard credit rate. For comparison, Fast mode uses the allowance at 2.5x.

That 8x figure is the catch. Ultrafast burns through even the biggest plan's allowance quickly, so it makes sense for short, interactive sessions where waiting is the bottleneck, not for long background jobs.

## Ultrafast in the API (for developers)

Ultrafast is also an API service tier, open to all API users for `gpt-6-astra` and `gpt-6.1-sol`. You enable it per request with `service_tier: "ultrafast"` in the **Responses API**:

```python
from openai import OpenAI

client = OpenAI()

response = client.responses.create(
    model="gpt-6-astra",
    input="Explain why the sky is blue in one sentence.",
    service_tier="ultrafast",
)

print(response.output_text)
```

This example follows OpenAI's [Ultrafast mode guide](https://developers.openai.com/api/docs/guides/ultrafast-mode), which also recommends a persistent WebSocket connection for agent loops with many tool calls. Ultrafast has its own rate limits, separate from Standard and Fast.

API prices per 1 million tokens (short context), from OpenAI's [API pricing page](https://developers.openai.com/api/docs/pricing):

| Model | Standard input / output | Ultrafast input / output |
|---|---|---|
| gpt-6-astra | $10 / $50 | $60 / $300 |
| gpt-6.1-sol | $2 / $10 | $12 / $60 |

So in the API, Ultrafast costs **6x** the Standard token price. One more limitation: GPT-6 Astra Ultrafast supports US data residency and global processing only, while GPT-6.1 Sol Ultrafast also supports EU residency.

## Which plan should you pick?

My take, based on what OpenAI has published:

- **Stay on Plus ($20)** if you mostly chat, write and ask the occasional coding question, and you rarely hit limits.
- **Pro 100** is the sensible first step if you hit Plus limits regularly, especially in Codex.
- **Pro 200** is worth it if you run Codex or deep research for hours most days. If you are grandfathered, enjoy the old allowance until 29 October, then watch your usage meter to see whether the new allowance is still enough.
- **Pro 500** only makes sense if you specifically need Ultrafast in ChatGPT or Codex, or you consistently max out Pro 200. Remember that Ultrafast uses your allowance 8x faster.
- **Developers** who only need speed for a specific feature may be better off with Ultrafast in the API, where you pay per token instead of $500 a month.

I don't subscribe to Pro 500 myself, so this is an explainer based on OpenAI's documentation, not a hands-on test of the plan.

## Frequently asked questions

### Is the $200 Pro plan being discontinued?
No. Pro 200 is still sold at $200 a month and is open to new subscribers again, but new subscriptions include a lower usage allowance.

### Do I keep my old Pro 200 limits?
If you had an active Pro 200 subscription between 22 September and 10 a.m. PT on 29 September 2026, you keep the previous allowance until 29 October 2026 while your subscription stays active.

### Can I get Ultrafast on Pro 100 or Pro 200 by buying credits?
No. At launch, Ultrafast in ChatGPT and Codex is limited to Pro 500 and eligible Enterprise and Edu plans.

### Is Ultrafast a smarter model?
No. It is the same model running in a faster service tier. You pay for speed, not extra intelligence.

## Sources

- OpenAI Help Center: [About ChatGPT Pro tiers](https://help.openai.com/en/articles/9793128-about-chatgpt-pro-tiers)
- OpenAI Developers: [Codex speed: Fast and Ultrafast modes](https://developers.openai.com/codex/speed)
- OpenAI Developers: [Ultrafast mode (API guide)](https://developers.openai.com/api/docs/guides/ultrafast-mode)
- OpenAI Developers: [API pricing](https://developers.openai.com/api/docs/pricing)

Related on VNHAX: [GPT-6 Astra vs Sol vs Luna](/blog/gpt-6-astra-vs-sol-vs-luna-comparison) · [OpenAI Dots: always-on agents explained](/blog/openai-gpt-dots-cloud-agents-workflow-guide) · [How to cut AI coding agent API costs](/blog/how-to-cut-ai-coding-agent-api-costs-token-proxies)
