---
title: "Claude Sonnet 4.5 End-of-Life Schedule: Retirement Dates & Migration Alternatives"
short_title: "Sonnet 4.5 Retirement & Alternatives"
slug: claude-sonnet-4-5-retirement-date-and-alternatives
category: Migration Guides & Deprecations
reading_time: 6 min read
tags: [claude-sonnet-4-5, end-of-life, api-migration, claude-sonnet-5-5, deprecation-schedule]
meta_description: "Migration guide for teams on Claude Sonnet 4.5: official retirement date (Nov 30, 2026), breaking changes, and alternatives (Sonnet 5.5, Sonnet 5, Haiku 4.5)."
---

# Claude Sonnet 4.5 End-of-Life Schedule: Retirement Dates & Migration Alternatives

It usually starts with a boring email.

The subject line says a model you use is being retired. You skim it, tell yourself you'll deal with it "next sprint," and move on. Then one morning every request to that model fails, and your support bot, your summarizer, or your content pipeline goes quiet.

Claude Sonnet 4.5 is now at that stage. Anthropic has set a date, and the clock is running. This guide covers what the dates are, what will actually break, and which model to move to. Every date and rule below comes from Anthropic's own documentation, linked at the end of each section. Where I could not verify something, I say so.

## Official Sunset Schedule for Claude Sonnet 4.5

Here is the schedule as listed on [Anthropic's model deprecations page](https://platform.claude.com/docs/en/about-claude/model-deprecations):

| Event | Date |
| --- | --- |
| Deprecation notice | September 30, 2026 |
| Retirement (Claude API) | November 30, 2026 |
| Affected model ID | `claude-sonnet-4-5-20250929` |
| Recommended replacement | `claude-sonnet-5-5` |

After the retirement date, requests to the model fail. Anthropic's page says this plainly. You may see articles claiming a specific "410 Gone" error. I could not find that in the official docs, so don't build your error handling around one status code. Just treat any failure on the old model ID as a hard stop.

Three details people miss:

- **The date depends on where you call the model.** Anthropic says its dates apply to Anthropic-operated platforms: the Claude API, Claude Platform on AWS, and Microsoft Foundry. Amazon Bedrock and Google Cloud set their own schedules. Both mark Sonnet 4.5 as deprecated, but I found no retirement date for them in Anthropic's tables. Check your cloud's own model page.
- **Some developers report an earlier date.** A few public developer threads quote a customer email saying November 24, with availability possibly dropping from October 30. The docs page says November 30. I can't see your email, so check your own notice and plan around the earlier date.
- **You did get a normal notice window.** Anthropic's policy is at least 60 days' notice for publicly released models. September 30 to November 30 fits that.

Today is October 6, so you have roughly 55 days to the official date. That sounds like a lot until you add testing, review, and a staged rollout.

**First job: find every caller.** Open the Claude Console, go to the Usage page, and export the CSV. It breaks usage down by API key and model. Then search your code, configs, and environment variables for `claude-sonnet-4-5`. The model name hides in more places than you'd expect: old cron jobs, no-code automations, and staging configs nobody has touched in months.

## Why Upgrading Is Urgent: Performance Gap & Cost Savings

The deadline is the main reason. The second reason is that waiting does not make the migration smaller. Each month the gap between your code and the current API grows.

Now the money. List prices per million tokens (input / output):

| Model | Input | Output |
| --- | --- | --- |
| Claude Sonnet 4.5 | $3 | $15 |
| Claude Sonnet 5.5 | $2 | $10 |

On paper that is about one-third cheaper. But there is a catch that the "35% cheaper" headlines skip: Sonnet 5.5 uses a newer tokenizer, and Anthropic says the same text produces about 30% more tokens than on Sonnet 4.5, depending on content.

Rough math, using my own calculation: output at $10 with 30% more tokens behaves like $13 per "old-sized" million. That is about 13% cheaper than $15, not 33%. Real savings will vary with your content, effort setting, and how much thinking the model does.

Two more cost traps:

- **Thinking is on by default.** A request with no `thinking` field now runs with adaptive thinking, and thinking tokens are billed as output tokens.
- **Images cost more.** Sonnet 5.5 uses a high-resolution image tier. Anthropic's example: a 2000×1500 image costs about 2.5 times as many tokens as on Sonnet 4.5.

On speed and quality: Anthropic positions its Sonnet line as the best mix of speed and intelligence. I could not verify a "2x faster" claim from any official source, so I won't repeat it. Test on your own prompts and measure latency and quality yourself.

Related reading: [how to cut your Claude API bill](/reduce-claude-api-costs) and [Claude API pricing explained](/claude-api-pricing-guide). Official numbers live on [Anthropic's pricing page](https://platform.claude.com/docs/en/about-claude/pricing).

## Replacement Breakdown: Sonnet 5.5 vs. Sonnet 5 vs. Haiku 4.5

You have three realistic targets. I'm using Anthropic's current model docs here, and one correction to common advice: I found no "Haiku 5" in the docs. The current Haiku is **Claude Haiku 4.5** (`claude-haiku-4-5-20251001`).

| | Sonnet 5.5 | Sonnet 5 | Haiku 4.5 |
| --- | --- | --- | --- |
| Model ID | `claude-sonnet-5-5` | `claude-sonnet-5` | `claude-haiku-4-5-20251001` |
| Status | Current Sonnet | Legacy, still available | Current Haiku |
| Price | $2 / $10 per MTok | $2 / $10 per MTok | Lower per token than Sonnet 5.5 |
| Best for | Coding, agents, reasoning, general work | Teams that need more time | Simple, high-volume, low-latency tasks |

**Sonnet 5.5** is the model Anthropic names as the replacement. It is the safest long-term pick, with a retirement date listed as not sooner than September 28, 2027 in third-party summaries of the docs. But it is not a drop-in swap. More on that below.

**Sonnet 5** buys time, not simplicity. It is marked legacy, with a "not sooner than" retirement date of June 30, 2027 in a public developer issue that quotes Anthropic's table. It is sometimes called a "stable LTS" option. Anthropic doesn't use that term, and coming from Sonnet 4.5 you still hit breaking changes: no assistant prefill, no thinking budgets, no sampling parameters. You would migrate twice, once now and once later.

**Haiku 4.5** makes sense for simple jobs: classification, data extraction, and quick support replies. It behaves like Sonnet 4.5 on thinking settings, so the code change is smaller. The catch is capability. Don't move a hard reasoning workload to a smaller model just to avoid work. Also check Haiku 4.5's own retirement date on the deprecations page before you commit.

My advice: send complex or customer-facing work to Sonnet 5.5, and test whether the cheap, simple tasks can drop to Haiku 4.5. Split them by task, not by habit. For a deeper comparison, see [Sonnet vs. Haiku: which Claude model should you use](/claude-sonnet-vs-haiku).

## Step-by-Step API Migration Code Examples (Python & Node.js)

Anthropic's own [Sonnet 5.5 migration guide](https://platform.claude.com/docs/en/models/sonnet-5-5/migration-guide) is the source for everything here. Work through it in this order.

**Step 1: Update your SDK.** Install the latest version of the official SDK (`pip install -U anthropic` or `npm install @anthropic-ai/sdk@latest`). Older versions may not know the newer parameters. I could not confirm a specific minimum version number, so go with the latest.

**Step 2: Swap the model ID.** Change `claude-sonnet-4-5-20250929` to `claude-sonnet-5-5`. Note there is no date suffix.

**Step 3: Remove sampling parameters.** On Sonnet 5.5, a non-default `temperature`, `top_p`, or `top_k` returns a 400 error.

**Step 4: Replace thinking budgets with effort.** `thinking: {"type": "enabled", "budget_tokens": N}` also returns a 400. Use adaptive thinking and an effort level instead.

**Step 5: Remove assistant prefill.** A prefilled last assistant message returns a 400.

**Step 6: Fix forced tool choice.** `tool_choice` of type `any` or `tool` returns a 400. Use `auto` and mark the tool `strict`.

A working Python request, adapted from Anthropic's guide:

```python
import anthropic

client = anthropic.Anthropic()

response = client.messages.create(
    model="claude-sonnet-5-5",
    max_tokens=4096,
    messages=[
        {"role": "user", "content": "Summarize this support ticket in two lines."}
    ],
    output_config={"effort": "medium"},
)

# Read blocks by type. A response can start with a thinking block.
for block in response.content:
    if block.type == "text":
        print(block.text)
```

The same request in Node.js (I adapted this from the official Python example, so test it against your SDK version):

```javascript
import Anthropic from "@anthropic-ai/sdk";

const client = new Anthropic();

const response = await client.messages.create({
  model: "claude-sonnet-5-5",
  max_tokens: 4096,
  messages: [
    { role: "user", content: "Summarize this support ticket in two lines." },
  ],
  output_config: { effort: "medium" },
});

// Read blocks by type, never response.content[0].text
for (const block of response.content) {
  if (block.type === "text") console.log(block.text);
}
```

And the thinking-budget change, which trips up a lot of people:

```python
# Before (Sonnet 4.5): returns a 400 on Sonnet 5.5
thinking={"type": "enabled", "budget_tokens": 10000}

# After (Sonnet 5.5)
thinking={"type": "adaptive"},
output_config={"effort": "high"},
```

Anthropic notes there is no fixed mapping from a budget to an effort level. Run your tests at two or three levels.

If you use Claude Code, there is a shortcut. Running `/claude-api migrate this project to claude-sonnet-5-5` applies the model swap and the parameter changes, then gives you a checklist to verify by hand. Still review the diff.

## Handling Legacy Prompt Drifts and Token Format Changes

Getting a 200 response does not mean the migration worked. The sneaky changes are the ones that don't throw errors.

**Tokens grow.** About 30% more tokens for the same text. Re-run [token counting](https://platform.claude.com/docs/en/build-with-claude/token-counting), then revisit `max_tokens` and your cost estimates. A `max_tokens` value that was fine before can now cut answers short, because it covers thinking plus text.

**Thinking runs by default.** If you never set a `thinking` field before, the model now thinks anyway. To run without up-front thinking, Sonnet 5.5 uses `thinking: {"type": "between_tools"}`. Don't use `{"type": "disabled"}`; that returns a 400 on this model.

**Thinking text is hidden by default.** Blocks arrive with an empty `thinking` field and a signature. If your app shows reasoning, set `display: "summarized"`.

**Notes between tool calls move.** Longer notes the model writes between tool calls now come back as `thinking` blocks, not `text`. Nothing fails, but a chat interface that displayed those notes goes quiet.

**Tool inputs can be escaped differently.** Parse tool input with a standard JSON parser, not string tricks.

**Keep conversations append-only.** On newer accounts, replaying a thinking block after editing earlier history returns a 400.

**Refusals are broader.** Sonnet 5.5 declines in more categories. Handle `stop_reason: "refusal"` in your code, especially if your product touches security topics.

**Caching changes.** The minimum cacheable prompt drops to 512 tokens, so short prompts may now cache.

### Common mistakes to avoid

- **Swapping the model ID and shipping.** This is the big one. Five settings return 400 errors, and several other changes fail silently.
- **Reading `content[0].text`.** The first block can be thinking now.
- **Trusting the 200 status.** Compare outputs, not status codes.
- **Moving everything to one model.** Simple tasks may not need Sonnet at all.
- **Waiting for the deadline week.** If your tests fail, you'll want days, not hours.
- **Ignoring Bedrock or Google Cloud.** Their dates and model IDs differ.

### A simple regression test

Pull 30 to 50 real prompts from your logs. Run them on both models. Compare output format first (does your JSON still parse?), then quality, then cost and latency. Fix prompts that relied on old habits, such as ones built around prefill. Then roll out to a small slice of traffic before switching everything.

## FAQs

### When is Claude Sonnet 4.5 being retired?

Anthropic deprecated Claude Sonnet 4.5 on September 30, 2026, and retires it on the Claude API on November 30, 2026. Some developers report a notice email with November 24, so check your own notice.

### What happens when Claude Sonnet 4.5 is retired?

Requests to the retired model fail. I could not verify a specific error code such as 410, so handle any failure on the old model ID.

### What replaces Claude Sonnet 4.5?

Anthropic recommends Claude Sonnet 5.5 (`claude-sonnet-5-5`). Claude Sonnet 5 and Claude Haiku 4.5 are other options depending on your workload.

### Is Claude Sonnet 5.5 a drop-in replacement for Sonnet 4.5?

No. A model ID swap is not enough. Sonnet 5.5 returns 400 errors for thinking budgets, sampling parameters, assistant prefill, forced tool choice, and `thinking: {"type": "disabled"}`.

### Is Claude Sonnet 5.5 cheaper than Sonnet 4.5?

List price is lower ($2 / $10 versus $3 / $15 per million tokens). But Sonnet 5.5 produces about 30% more tokens for the same text, so real savings are smaller. By my math, around 13% on output for the same text, and it varies by workload.

### Is there a Claude Haiku 5?

I found no Haiku 5 in Anthropic's documentation. The current Haiku model is Claude Haiku 4.5 (`claude-haiku-4-5-20251001`).

### Does the November 30 date apply on Amazon Bedrock and Google Cloud?

Not necessarily. Anthropic says those platforms set their own retirement schedules. Check their model tables.

## One last thing

Block an hour this week, export your usage, and find out what still calls `claude-sonnet-4-5`. Everything else in this guide gets easier once you know that list.

If you want more migration notes like this, browse our [Migration Guides & Deprecations](/category/migration-guides-deprecations) section.

<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {"@type": "Question", "name": "When is Claude Sonnet 4.5 being retired?", "acceptedAnswer": {"@type": "Answer", "text": "Anthropic deprecated Claude Sonnet 4.5 on September 30, 2026, and retires it on the Claude API on November 30, 2026. Some developers report a notice email with November 24, so check your own notice."}},
    {"@type": "Question", "name": "What happens when Claude Sonnet 4.5 is retired?", "acceptedAnswer": {"@type": "Answer", "text": "Requests to the retired model fail. A specific error code such as 410 could not be verified, so handle any failure on the old model ID."}},
    {"@type": "Question", "name": "What replaces Claude Sonnet 4.5?", "acceptedAnswer": {"@type": "Answer", "text": "Anthropic recommends Claude Sonnet 5.5 (claude-sonnet-5-5). Claude Sonnet 5 and Claude Haiku 4.5 are other options depending on your workload."}},
    {"@type": "Question", "name": "Is Claude Sonnet 5.5 a drop-in replacement for Sonnet 4.5?", "acceptedAnswer": {"@type": "Answer", "text": "No. Sonnet 5.5 returns 400 errors for thinking budgets, sampling parameters, assistant prefill, forced tool choice, and thinking disabled."}},
    {"@type": "Question", "name": "Is Claude Sonnet 5.5 cheaper than Sonnet 4.5?", "acceptedAnswer": {"@type": "Answer", "text": "List price is lower ($2/$10 versus $3/$15 per million tokens), but Sonnet 5.5 produces about 30% more tokens for the same text, so real savings are smaller and vary by workload."}},
    {"@type": "Question", "name": "Is there a Claude Haiku 5?", "acceptedAnswer": {"@type": "Answer", "text": "No Haiku 5 appears in Anthropic's documentation. The current Haiku model is Claude Haiku 4.5 (claude-haiku-4-5-20251001)."}},
    {"@type": "Question", "name": "Does the November 30 date apply on Amazon Bedrock and Google Cloud?", "acceptedAnswer": {"@type": "Answer", "text": "Not necessarily. Anthropic says those platforms set their own retirement schedules, so check their model tables."}}
  ]
}
</script>

---

**Sources and further reading**

- [Anthropic: Model deprecations](https://platform.claude.com/docs/en/about-claude/model-deprecations)
- [Anthropic: Migrating to Claude Sonnet 5.5](https://platform.claude.com/docs/en/models/sonnet-5-5/migration-guide)
- [Anthropic: Claude pricing](https://platform.claude.com/docs/en/about-claude/pricing)
- [Anthropic: Token counting](https://platform.claude.com/docs/en/build-with-claude/token-counting)
