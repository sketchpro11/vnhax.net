---
title: "Claude Sonnet 5.5 vs. Sonnet 5: Speed, Context Recall & Coding Benchmarks"
short_title: "Sonnet 5.5 vs Sonnet 5"
slug: claude-sonnet-5-5-vs-sonnet-5-differences
category: "Developer Tools & Models"
reading_time: "7 min read"
tags: [claude-sonnet-5-5, claude-sonnet-5, anthropic-updates, coding-agents, benchmarks]
meta_description: "Detailed architectural comparison between Claude Sonnet 5.5 and Sonnet 5: TTFT latency, 1M context accuracy, MCP protocol improvements, and cost."
---

# Claude Sonnet 5.5 vs. Sonnet 5: Speed, Context Recall & Coding Benchmarks

**Category:** Developer Tools & Models | **Reading time:** 7 min read

Picture this. It's late on a Friday, your agent pipeline has been running happily on Sonnet 5 for three months, and then a changelog lands in your feed: a new Sonnet, same price, faster, better at agentic coding. You swap one string in your config, deploy, and go to dinner.

Then your phone buzzes. Half your tool calls are failing.

That's the most common way people get burned by a "drop-in" model upgrade, and it's the reason I wanted to write this comparison properly instead of just repeating a headline. Sonnet 5.5 really is a meaningful step up from Sonnet 5, but the upgrade is not quite a one-line change. Let me walk you through what actually changed, what the numbers do and don't prove, and how to switch without ruining your weekend.

> **Quick answer:** Claude Sonnet 5.5 is the newer, faster Sonnet. According to Anthropic, it generates output more than 30% faster than Sonnet 5 and can cost up to 30% less per task because it uses fewer tokens and tool calls. List pricing is unchanged at $2 per million input tokens and $10 per million output tokens, and both models share a 1M-token context window. The biggest jump is in agentic coding. Anthropic reports Terminal-Bench 4.0 going from 10.3% on Sonnet 5 to 70.6% on Sonnet 5.5.

## Why Anthropic Shipped Sonnet 5.5 So Rapidly

Sonnet 5 landed roughly three months before Sonnet 5.5, and Sonnet 5.5 arrived on September 28, 2026, only about six days after Opus 5.5. That's a fast cadence, and it makes more sense once you see how Anthropic positions the two models.

Opus 5.5 is the "careful judgment" model for complex, open-ended work. Sonnet 5.5 is pitched as the fast, lower-cost partner for well-scoped everyday jobs: bug fixing, regular coding, documents, slides, and spreadsheets. Anthropic even says Opus 5.5 remains clearly stronger on the hardest open-ended tasks, so this isn't a "Sonnet replaces everything" story.

What I find interesting is the pricing strategy. The sticker price didn't move. Sonnet 5.5 costs the same $2 / $10 per million tokens as Sonnet 5. The savings come from efficiency: the model reaches answers with fewer tokens and fewer tool-call rounds. One customer example in Anthropic's launch material, from Balyasny Asset Management, reports roughly 121K tokens per answer versus about 497K on Sonnet 5. That's a vendor-published customer figure, so treat it as a best-case example rather than a promise for your workload.

If you run agent loops all day, "same price, fewer tokens" is arguably a bigger deal than a headline price cut.

## Architectural Breakdown: Latency, Speculative Caching & Memory

Let me be upfront here: Anthropic doesn't publish the internals of how Sonnet 5.5 is built. Anything you read that describes its architecture in detail, including "speculative" pipelines, is speculation. What we can discuss honestly is the behavior that's been measured and documented.

### Speed: faster, but read the fine print

Anthropic's headline claim is output generation 30%+ faster than Sonnet 5, calling it their fastest Sonnet so far. Independent measurement points the same direction. Artificial Analysis measured Sonnet 5.5 at roughly 85 to 139 output tokens per second across effort levels, versus about 55 to 75 for Sonnet 5. The gap ranges from around 43% faster at High effort to about 86% faster at Medium.

Some customers report bigger gains on their own tasks. Box described it as 2.4x faster, and Zendesk said tickets were processed 20% faster. Those are real-world numbers from specific workloads, not a universal multiplier.

Here's the part people skip. Speed of *generating* tokens is not the same as **TTFT (time to first token)**. A comparison page on OpenRouter showed throughput of about 71 tokens per second for Sonnet 5.5 versus 69 for Sonnet 5, but a higher median latency for 5.5 (about 2.95 seconds versus 1.78 seconds). Those numbers depend on provider routing, effort setting, and load, so I wouldn't treat them as gospel. But they're a good reminder not to assume a "2x faster first token" claim without testing it yourself. Adaptive thinking, which is on by default, can add time before the first visible output on harder prompts.

### Caching and memory

Both models use the same tokenizer, so your token counts carry over cleanly. Caching pricing is also the same: cache reads at $0.20 per million tokens, 5-minute cache writes at $2.50, and 1-hour cache writes at $4.00. One practical difference: the minimum cacheable prompt on Sonnet 5.5 is 512 tokens, down from 1,024 on Sonnet 5. That means shorter system prompts can now benefit from caching.

### Context window and recall

Both Sonnet 5 and Sonnet 5.5 have a 1M-token context window and up to 128K output tokens, with no long-context price surcharge. So the window itself didn't grow. What reportedly improved is how reliably the model finds things inside it.

A third-party write-up from Kunya reported that Sonnet 5.5 holds retrieval accuracy better at long context lengths, while Sonnet 5 started to soften past roughly 100K tokens. I haven't seen an official needle-in-a-haystack percentage from Anthropic, so be wary of any article quoting a precise recall figure like "99.8%". Test your own documents. A quick way: bury a unique fact (a made-up invoice number works well) in the middle of your longest real document and ask for it back at several context sizes.

## Coding Benchmark Comparison: Python, TypeScript & Rust Evaluations

Here's where I need to be careful too. Anthropic has not published language-by-language scores for Python, TypeScript, and Rust. What exists are agentic and coding-style benchmarks, all vendor-reported in the launch post:

| Benchmark | Sonnet 5 | Sonnet 5.5 |
| --- | --- | --- |
| Terminal-Bench 4.0 | 10.3% | 70.6% |
| CursorBench 4.0 | 34.1% | 55.5% |
| Humanity's Last Exam (with tools) | 54.9% | 64.5% |
| GDPval-AA v2.1 (Elo-style score) | 1449 | 1844 |

Sonnet 5.5 also scored 80.1% on OSWorld 2.1 (computer use), close to Opus 5.5's reported 81.8%. On Terminal-Bench 4.0 it even edged past Opus 5.5 (66.4% at Xhigh effort), while sitting a couple of points below it on CursorBench 4.0.

That Terminal-Bench jump from 10.3% to 70.6% is dramatic, and it's exactly the kind of number that deserves a raised eyebrow. Benchmarks measure specific harnesses and settings. They're a signal, not a guarantee.

### What smaller hands-on tests show

Independent testers paint a more mixed picture, which I find reassuring. In one small head-to-head by Kunya, Sonnet 5.5 won a bug-hunting task decisively (quality 7 versus 3) and was cheaper and faster on structured JSON validation and a long-context summary. But Sonnet 5 actually scored higher on a coding refactor (7 versus 6) and a routes audit (5 versus 3). GitHub's early Copilot testing reportedly found Sonnet 5.5 matched Sonnet 5 on coding quality while using fewer steps, tokens, and tool calls.

My takeaway: expect Sonnet 5.5 to be the more efficient agent, not a guaranteed winner on every single prompt.

### Run your own mini-benchmark

If you want per-language numbers, build them from your own code. It takes about an hour:

1. Pick 10 real tasks per language: a Python bug fix, a TypeScript type error, a Rust borrow-checker issue.
2. Run each task on both model IDs, at the same effort level.
3. Record: did it pass your tests, how many tokens it used, how many tool calls, and how long it took.
4. Compare total cost per *completed* task, not cost per call.

That last point is the one that matters. A model that costs the same per token but finishes in fewer steps wins on your invoice.

## Model Context Protocol (MCP 2.0) Tool-Calling Reliability

I'll be straightforward again: I couldn't find official Anthropic documentation naming a version called "MCP 2.0" in the Sonnet 5.5 launch material, so I won't pretend to describe one. The [Model Context Protocol](https://modelcontextprotocol.io) itself is an open standard for connecting models to external tools and data, and you should check its official spec for the current version.

What is documented about Sonnet 5.5 and tool use is this:

- Anthropic says the model needs fewer tool calls to finish agentic work, and migration notes describe it as better at batching tool calls.
- **Forced tool use is rejected.** If your code uses `tool_choice` to force a specific tool call, Sonnet 5.5 won't accept it the way Sonnet 5 did. This is the Friday-night surprise from my intro.
- Thinking blocks are tied to the conversation and account, and progress notes between tool calls have moved into thinking blocks.
- A newer computer-use toolset is required on the Claude API and Google Cloud, according to the migration notes.
- It's the first Sonnet with cyber safeguards, and higher-risk cybersecurity requests can fall back to Sonnet 5.

So is tool calling more *reliable*? Anthropic's agentic benchmark numbers and early partner reports suggest yes, but "zero formatting errors" is a claim nobody can honestly make about any model. Log your tool-call failures for a week on both models and compare. If you build with MCP servers, run your three most-used tools through a replay test before you flip any traffic.

## Migration Guide: Upgrading Production API Endpoints in 5 Minutes

The model swap is quick. The checks around it are what keep you safe. Here's the order I'd follow, and you can read the official [Sonnet 5.5 migration guide](https://platform.claude.com/docs/en/models/sonnet-5-5/migration-guide) alongside it.

1. **Search your code for forced tool choice.** Look for `tool_choice` set to a specific tool. Remove or restructure it before anything else.
2. **Change the model ID in staging.** The API model ID is `claude-sonnet-5-5`. Sonnet 5 (`claude-sonnet-5`) is now treated as a legacy option.
3. **Set the effort level on purpose.** Sonnet 5.5 supports low, medium, high, xhigh, and max. The Claude Platform defaults to High, while Claude Code and the Claude apps default to Medium. Don't leave it to chance.
4. **Replay real traffic.** Run 50 to 100 recent production requests through staging and diff the results: pass rate, token counts, tool-call counts.
5. **Watch the cost per task, not just the rate card.** Pricing is identical, so any savings will show up as fewer tokens. If your tokens went *up*, check whether you're running at Max effort, where heavier output can eat into the speed advantage.
6. **Roll out gradually.** Send 10% of traffic first, then 50%, then everything.

### Common mistakes to avoid

- **Treating it as a pure string swap.** Forced tool choice, thinking-block handling, and response-shape changes can break integrations.
- **Trusting a single benchmark.** Terminal-Bench is impressive, but your codebase isn't Terminal-Bench.
- **Assuming "faster" means lower latency everywhere.** Measure TTFT on your own prompts.
- **Ignoring effort settings.** Max effort can trigger more elaborate multi-agent behavior, which Anthropic notes sometimes led to timeouts or out-of-scope edits in one benchmark.
- **Skipping rollback.** Keep the Sonnet 5 model ID available until your metrics look stable.

If you use Claude Code, versions 2.1.284 and later resolve the `sonnet` alias to Sonnet 5.5 on Anthropic's API, so you may already be using it without having changed anything.

## Frequently Asked Questions

### What is the main difference between Claude Sonnet 5.5 and Sonnet 5?

Sonnet 5.5 is faster and more token-efficient. Anthropic reports 30%+ faster output, up to 30% lower cost per task, and much stronger agentic coding results, with the same $2 / $10 per million token price and the same 1M context window.

### Is Claude Sonnet 5.5 cheaper than Sonnet 5?

The list price is the same: $2 per million input tokens and $10 per million output tokens. It can still be cheaper per task, because Anthropic says it needs fewer tokens and tool calls. Actual savings depend on your workload and effort setting.

### How big is the context window in Sonnet 5.5?

Both Sonnet 5.5 and Sonnet 5 offer a 1M-token context window with up to 128K output tokens, and Sonnet 5.5 has no long-context pricing premium. Third-party testing suggests recall at long lengths is better, but Anthropic hasn't published an official needle-in-a-haystack percentage.

### Is Sonnet 5.5 really 2x faster?

Not across the board. Anthropic's claim is 30%+ faster output. Independent measurements show roughly 43% to 86% higher output speed depending on effort level, and some customers report larger gains on their own tasks. Time to first token varies by provider and settings, so test it yourself.

### Does Sonnet 5.5 support MCP and tool calling?

Yes, it supports tool use and is reported to need fewer tool calls on agentic tasks. Note that forced tool choice is rejected on Sonnet 5.5, so code that forces a specific tool must be updated. MCP itself is an open protocol, so check its current spec for version details.

### How do I switch from Sonnet 5 to Sonnet 5.5 in the API?

Change the model ID from `claude-sonnet-5` to `claude-sonnet-5-5`, remove any forced `tool_choice`, set your effort level, and test on staging traffic before a gradual rollout. Anthropic's official migration guide covers the full list of changes.

### Should I use Sonnet 5.5 or Opus 5.5?

Use Sonnet 5.5 for well-scoped, high-volume work like everyday coding, bug fixing, and documents. Use Opus 5.5 for complex, open-ended tasks that need careful judgment. Opus 5.5 costs twice as much at $4 / $20 per million tokens.

### Is Sonnet 5.5 free to use?

Anthropic says anyone can chat with Sonnet 5.5 on the free Claude plan, though usage limits apply. API usage is billed at the rates above.

## Final Thoughts

Sonnet 5.5 is a genuine upgrade, and for most agent and coding workloads I'd move to it. The efficiency gains alone justify the effort, especially if you run long tool loops. Just don't believe the neatest-sounding claims without checking. The 1M window didn't grow, the price didn't drop, and "2x faster" depends on what you measure.

Spend an hour on your own mini-benchmark, fix your forced tool calls, and roll it out in stages. If the numbers look good on *your* code, you'll know it's worth it. If you want more on building reliable agent workflows, see our guides on [choosing the right Claude model for coding agents](/choosing-the-right-claude-model-for-coding-agents), [prompt caching explained for API developers](/prompt-caching-explained-for-api-developers), and [how to benchmark LLMs on your own codebase](/how-to-benchmark-llms-on-your-own-codebase).

## Sources and Further Reading

- [Claude Sonnet 5.5 model overview (Claude Platform Docs)](https://platform.claude.com/docs/en/models/sonnet-5-5/overview)
- [Sonnet 5.5 migration guide (Claude Platform Docs)](https://platform.claude.com/docs/en/models/sonnet-5-5/migration-guide)
- [Anthropic API pricing](https://platform.claude.com/docs/en/about-claude/pricing)
- [Anthropic's Claude Sonnet 5.5 announcement](https://www.anthropic.com/claude-sonnet-5-5)
- [MarkTechPost: Claude Sonnet 5.5 release and benchmarks](https://www.marktechpost.com/2026/09/28/anthropic-releases-claude-sonnet-5-5-70-6-on-terminal-bench-4-0-at-the-same-2-10-price/)
- [Model Context Protocol (official site)](https://modelcontextprotocol.io)
- [OpenRouter: Sonnet 5 vs Sonnet 5.5 comparison](https://openrouter.ai/compare/anthropic/claude-sonnet-5/anthropic/claude-sonnet-5.5)
- [Kunya: Sonnet 5.5 head-to-head tests](https://kunya.ai/blog/claude-sonnet-55-on-kunya-the-complete-guide-benchmarks-and-head-to-head)

*Figures reflect publicly reported information as of October 2026 and may change. Benchmark scores are vendor-reported unless noted. Always confirm pricing and model details on Anthropic's official documentation.*
