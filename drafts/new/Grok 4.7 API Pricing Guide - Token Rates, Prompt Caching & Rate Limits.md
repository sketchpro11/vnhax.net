---
title: "Grok 4.7 API Pricing Guide: Token Rates, Prompt Caching & Rate Limits"
short_title: "Grok 4.7 API Pricing"
slug: grok-4-7-api-pricing-token-costs-guide
category: "Developer APIs & Pricing"
reading_time: "6 min read"
tags: [grok-api, xai-pricing, token-costs, prompt-caching, api-rate-limits]
meta_description: "Complete breakdown of xAI Grok 4.7 API pricing: cost per 1M input/output tokens, prompt caching discounts, monthly tiers, and comparison with GPT-4.5."
---

# Grok 4.7 API Pricing Guide: Token Rates, Prompt Caching & Rate Limits

*Category: Developer APIs & Pricing | 6 min read*

A few weeks back I wired a small support bot to a new model, ran a quick test with a couple of dozen messages, and felt great about the bill. Then I pushed it to a real audience. By the end of the first week the usage dashboard looked nothing like my back-of-the-envelope math.

The culprit wasn't the model. It was me. I had pasted a long system prompt into every single request and never once thought about what that cost when multiplied by thousands of chats.

That is exactly why I now read the pricing page *before* I write a line of code. So here is a plain-English walkthrough of what Grok 4.7 costs on the xAI API, where the savings hide, and where the surprises are.

> **Quick answer:** Grok 4.7 on the direct xAI API costs **$2.00 per 1M input tokens** and **$6.00 per 1M output tokens** for standard requests. Cached input drops to roughly **$0.50 per 1M tokens** (up to 75% off). Prompts that go past 200K tokens are billed at a higher, roughly doubled rate. The context window is 500K tokens.

---

## xAI's Aggressive API Pricing Strategy

xAI is clearly playing for developer attention. Grok 4.7 is positioned as the flagship of the Grok 4 family, aimed at coding, agent workflows and long-context work, and the price reflects that: a flat $2 in, $6 out for ordinary requests.

Here is what I like about the approach, and what I'd keep an eye on.

**What's good:**

- **Simple headline rates.** One input price, one output price. No confusing "mode" matrix for the basic API.
- **Huge context.** A 500K-token window means you can feed in big codebases or long documents without chunking.
- **Caching is built in.** If your app repeats the same opening text on every call, you're not forced to pay full price for it every time.

**What to watch:**

- **The 200K cliff.** Once a single prompt crosses 200K tokens, the rate roughly doubles (about $4 input / $12 output). That's a big jump for a request that is only slightly larger.
- **Output costs more than input.** Output is three times the input rate here, so chatty answers add up faster than long prompts.
- **Not every route is priced the same.** Third-party gateways and routers often quote different numbers than xAI's direct API, so always check which door you are walking through.

I treat this as the "sticker price." The real price is whatever your traffic pattern makes of it.

---

## Detailed Price Table: Input, Output, and Vision Tokens

Here is the table I keep pinned next to my project notes. All figures are per 1 million tokens on the direct xAI API.

| Token type | Standard (up to 200K prompt) | Long prompt (over 200K) | Notes |
|---|---|---|---|
| Input tokens | $2.00 | ~$4.00 | The text you send, including system prompt and history |
| Cached input tokens | ~$0.50 | Check xAI's current page | Repeated prefix of your prompt |
| Output tokens | $6.00 | ~$12.00 | Everything the model writes back |
| Vision / image tokens | See note | See note | Grok 4.7 is listed as a text model by the trackers I checked |

A quick note on that last row, because it trips people up: I could not find a separate, published vision-token rate for Grok 4.7. If you plan to send images, test with a handful of requests and read the usage numbers xAI returns, rather than assuming a price.

### A real example of the long-prompt trap

Say you send a 300,000-token prompt and get 10,000 tokens back.

- At the long-prompt rate: 0.3M × $4 + 0.01M × $12 = **$1.32**
- If you wrongly use the short rate: 0.3M × $2 + 0.01M × $6 = **$0.66**

Half the real cost, gone from your forecast. That's the kind of mistake that quietly wrecks a budget.

### Two more things I wish I'd known earlier

1. **There is a faster variant, but it isn't for everyone.** xAI describes a "Fast" version at twice the standard rate, and as of the sources I checked it was not offered through the public API.
2. **Regional endpoints can cost extra.** xAI documents a U.S.-regional endpoint that carries a token-usage premium of about 10%. Handy for data-residency needs, not free.

---

## Prompt Caching: Slashing API Invoices on Long System Prompts

This is the section that would have saved me money on that support bot.

If you run continuous developer chat or multi-turn agent loops, you're sending the same big chunk of text again and again: instructions, tool descriptions, style rules, maybe a knowledge snippet. With caching, that repeated prefix is billed as cached input, about **$0.50 per 1M tokens** instead of $2.00. That's the "up to 75% savings" you'll see quoted.

### Let's do the math on a real-looking setup

Imagine a support assistant with:

- A 3,000-token system prompt (same every time)
- 500 tokens of fresh user text per request
- 400 tokens of output per reply
- 100,000 requests a month

**Without caching**

- Input: 3,500 tokens × 100,000 = 350M tokens × $2.00/M = **$700**
- Output: 400 × 100,000 = 40M tokens × $6.00/M = **$240**
- Total: **$940**

**With caching (assuming the 3,000-token prefix is a cache hit every time)**

- Cached input: 300M tokens × $0.50/M = **$150**
- Fresh input: 50M tokens × $2.00/M = **$100**
- Output: **$240**
- Total: **$490**

That's about a 48% drop in the monthly bill without touching the model or the quality of answers. In real life, not every request will hit the cache, so your savings will land somewhere below that.

### How to actually get cache hits (step by step)

1. **Put the stable stuff first.** System prompt, tool definitions and fixed instructions go at the top. Anything that changes (the user's message, today's date) goes at the end. Caching works on matching prefixes, so one changed word near the top can break it.
2. **Keep it byte-for-byte identical.** I once lost a whole afternoon because a template inserted a timestamp at the start of the system prompt. Every request looked "new."
3. **Use the routing identifier.** xAI recommends passing a cache key so related requests land together: `prompt_cache_key` on the Responses API, or the `x-grok-conv-id` header on Chat Completions. Use the same value for the same conversation.
4. **Check the usage object.** After a few calls, look at the cached-token count in the response. If it's zero, something in your prefix is changing.
5. **Don't cache what shouldn't be cached.** Keep personal user data out of the shared prefix.

### A mistake I see a lot

People bloat the system prompt "just in case" because caching makes it cheaper. It does, but cheaper isn't free, and a giant prompt can still push you toward that 200K line in long agent sessions. Trim anyway.

---

## Rate Limits, TPM (Tokens Per Minute), and Tier Upgrades

Price per token is only half the story. If you hit a rate limit during a launch, nobody cares how cheap the model was.

Here is the tier structure as it was laid out to me, along with the caveat that xAI can change limits and they can differ by account, so confirm the live numbers in your console before you plan around them:

| Tier | Best for | Requests per minute | Spending |
|---|---|---|---|
| Tier 1 (Pay-as-you-go) | Prototypes, side projects | 60 | $100 monthly cap |
| Tier 3 (Production scale) | Live products with real traffic | 2,000 | Custom enterprise credits |

A few practical tips:

- **Think in TPM, not just requests.** Sixty requests a minute sounds fine until each one carries a 40K-token prompt. Your token-per-minute ceiling can bite before the request limit does.
- **Add retries with backoff.** When you get a 429 (too many requests), wait a bit and try again instead of hammering the endpoint.
- **Queue non-urgent work.** Batch-style jobs like summarizing old tickets don't need to run at peak. Note that, according to the sources I checked, `grok-4.7` doesn't support xAI's Batch API, so you'll need to do your own queueing.
- **Request an upgrade early.** Don't wait for launch day. Move up a tier while traffic is still small, then watch your spending against the cap.
- **Set your own alerts.** A $100 monthly cap is a safety net, not a budget plan. I set an internal warning at 70% so I'm never surprised.

---

## Cost Comparison: Grok 4.7 vs. OpenAI vs. Anthropic

You'll see claims floating around that Grok 4.7 is roughly 40% cheaper than comparable models like GPT-4.5 or Claude Opus 5, with noticeably faster responses. That's a fair thing to test, but I'd be careful about treating any single percentage as gospel. Provider price lists change, model names get replaced, and your real cost depends on how much of your traffic is input versus output.

Here's how I compare models without trusting anyone's headline:

1. **Pull the current price lists.** Check [xAI's pricing page](https://docs.x.ai/developers/pricing), [OpenAI's API pricing](https://openai.com/api/pricing/) and [Anthropic's pricing page](https://www.anthropic.com/pricing).
2. **Write down your own ratio.** For the support bot above, input was roughly nine times output by token count. For a code generator, it might flip.
3. **Calculate the monthly total** for each model using your real numbers, including caching.
4. **Run the same 50 prompts** through each model and judge quality yourself. A model that's cheaper but needs two tries to get the answer right isn't cheaper.
5. **Time it.** Speed claims are easy to make and easy to test. Measure time to first token and total response time on your own network.

If you're also weighing gateways, [OpenRouter](https://openrouter.ai) and similar services list their own per-token rates for Grok 4.7, and these can differ from xAI's direct pricing. Just remember that a lower sticker price on a router might come with different rate limits or latency.

For a deeper look at how I structure these comparisons, see my guide on [choosing an AI API for your project](/choosing-an-ai-api-for-your-project) and the walkthrough on [reducing LLM costs in production](/reduce-llm-api-costs).

---

## Common Mistakes to Avoid

- **Forecasting with the short-prompt rate** when your agent loop keeps growing the context.
- **Ignoring output tokens.** At three times the input price, a verbose model can cost more than the prompt did.
- **Breaking the cache** with timestamps, random IDs or reordered instructions at the top of the prompt.
- **Trusting third-party tables blindly.** Check xAI's own [pricing](https://docs.x.ai/developers/pricing) and [models](https://docs.x.ai/developers/models) pages for the live numbers.
- **Skipping spend alerts.** Set them on day one.

---

## Final Thoughts

Grok 4.7's pricing is easy to like: $2 in, $6 out, a giant context window and a real discount for repeated prompts. The trouble is never the headline number. It's the 200K threshold, the way output tokens stack up, and a cache that quietly stops working.

If you take one action from this article, do this: run 100 real requests, read the token counts in the response, and plug them into the calculation above. Ten minutes of testing will tell you more than any pricing blog, mine included.

Looking for next steps? Read my guide on [setting up an xAI API key safely](/xai-api-key-setup-guide) and my notes on [monitoring API spend](/monitor-api-usage-and-spend).

---

## Frequently Asked Questions (FAQs)

### How much does the Grok 4.7 API cost per 1 million tokens?
On the direct xAI API, standard requests cost $2.00 per 1M input tokens and $6.00 per 1M output tokens.

### Is there a prompt caching discount for Grok 4.7?
Yes. Cached input tokens are billed at about $0.50 per 1M tokens, which is up to 75% cheaper than the standard $2.00 input rate. It helps most in multi-turn chats and agent loops with a long, repeated system prompt.

### How do I get prompt cache hits with the xAI API?
Keep the start of your prompt identical on every call, place changing content at the end, and send a cache key (`prompt_cache_key` for the Responses API or the `x-grok-conv-id` header for Chat Completions).

### What is the context window for Grok 4.7?
Grok 4.7 supports a 500,000-token context window. Requests above 200K tokens are billed at a higher rate, roughly double the standard price.

### What are the Grok API rate limits?
The tiers described here are Tier 1 (pay-as-you-go) with 60 requests per minute and a $100 monthly cap, and Tier 3 (production scale) with 2,000 requests per minute and custom enterprise credits. Limits can vary by account, so confirm them in your xAI console.

### Is Grok 4.7 cheaper than GPT-4.5 or Claude Opus 5?
Some comparisons put Grok 4.7 around 40% cheaper, but the real gap depends on your input/output mix, caching and which price list you use. Calculate it with your own token counts before deciding.

### Are output tokens more expensive than input tokens?
Yes. Output is $6.00 per 1M tokens versus $2.00 for input, so output is three times as expensive.

### Does Grok 4.7 support batch pricing?
According to the sources I checked, `grok-4.7` does not support xAI's Batch API, so batch discounts don't apply to it.

### Does Grok 4.7 have a Fast version?
xAI describes a Fast variant at twice the standard rate, but it was not available through the public API at the time of writing.

### What is the cheapest way to run Grok 4.7?
Use caching for repeated prompts, keep each request under 200K tokens, limit response length, and compare direct pricing with router prices for your use case.

### Where can I check the latest Grok 4.7 pricing?
Always confirm on xAI's official [pricing page](https://docs.x.ai/developers/pricing) and [models page](https://docs.x.ai/developers/models), since prices and limits can change.

---

*Disclaimer: Prices and limits change often. Figures here were gathered in October 2026; verify them on xAI's official documentation before budgeting.*
