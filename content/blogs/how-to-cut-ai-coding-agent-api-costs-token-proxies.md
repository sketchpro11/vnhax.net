---
title: "How to Cut AI Coding Agent Costs: Prompt Caching, Context Hygiene and Token Proxies"
description: "Practical ways to lower the token bill of coding agents like Claude Code: why output and context dominate cost, prompt caching, /clear and /compact, effort levels, hooks that trim tool output, subagents, and token proxies. Based on official docs and current pricing."
date: "2026-10-05"
updatedAt: "2026-10-12"
author: "Umar Hashmi"
category: "Token Optimization"
tags: ["token-optimization", "claude-code", "prompt-caching", "api-cost-reduction", "llm-proxy", "cost-management"]
---

> **Quick answer (checked 12 October 2026):** Coding agents get expensive because they **resend a growing context on every turn** and **write a lot of output**, and output costs about **5× input** on current Claude models (Sonnet 5.5: $2 in / $10 out per million tokens). The biggest savings come from **keeping context small** (`/clear` between tasks, `/compact` with instructions), **letting prompt caching work** (cache reads cost a small fraction of normal input), **using the cheapest model and effort level that does the job**, and **filtering huge tool output** before the model reads it, with hooks or a token proxy.

This guide collects the cost levers that actually exist in today's tools, with links to the official documentation for each. I've kept the numbers to published prices and documented behaviour. Your own savings depend on how your team uses the agent, so measure first and change one thing at a time.

## Why coding agents are expensive

Three things drive most of the bill:

1. **Output is the expensive side.** On Anthropic's [pricing page](https://platform.claude.com/docs/en/about-claude/pricing), Claude Sonnet 5.5 costs **$2 per million input tokens** and **$10 per million output tokens**, and Opus 5.5 costs $4 / $20. That's 5× for output. Thinking tokens are billed as output too.
2. **Context is resent every turn.** Each new message includes the system prompt, your project instructions, the conversation so far and every tool result in it. A long session carries a lot of tokens on every request.
3. **Tool output is big and mostly noise.** A full test log, a large file read or a broad search can add thousands of tokens, when the useful part is a few lines.

## 1. Measure before you optimize

You can't cut what you can't see. In Claude Code:

- **`/usage`** shows the current session's token usage and cost estimate ([costs docs](https://code.claude.com/docs/en/costs)).
- **Headless runs** with `--output-format json` include **`total_cost_usd`** and a per-model breakdown, so scripts can log spend per task ([headless docs](https://code.claude.com/docs/en/headless)). Anthropic notes these are client-side estimates that can differ from your actual bill.

A minimal logger for scripted runs:

```bash
#!/usr/bin/env bash
# Run one headless Claude Code task and append its estimated cost to a log
task="$1"
result=$(claude -p "$task" --output-format json)
echo "$result" | jq -r '.result'
echo "$result" | jq -c --arg task "$task" \
  '{ts: (now | todate), task: $task, cost_usd: .total_cost_usd}' >> ~/.agent-costs.jsonl
```

After a week, sort `~/.agent-costs.jsonl` by cost and look at the most expensive task types first. That's usually where the easy savings are.

## 2. Keep the context small

Claude Code already uses prompt caching and **auto-compaction** (it summarizes history as you approach the context limit). You can do better with a few habits from Anthropic's [cost guide](https://code.claude.com/docs/en/costs):

- **`/clear` between unrelated tasks.** Stale context is paid for on every later message. Use `/rename` first so you can `/resume` the session later.
- **`/compact` with instructions**, for example `/compact Focus on code samples and API usage`, so the summary keeps what matters. You can also put compaction instructions in `CLAUDE.md`.
- **Keep `CLAUDE.md` short.** It loads at the start of every session. Move workflow-specific instructions (PR reviews, migrations) into **skills**, which only load when used.
- **Trim MCP servers.** Run `/context` to see what fills the window, and `/mcp` to disable servers you aren't using. CLI tools like `gh` are cheaper than MCP servers because they add no tool listings.

## 3. Let prompt caching do its job

Prompt caching lets the API reuse a stable prefix (system prompt, project instructions, reference files) at a much lower price. On Anthropic's pricing page, a cache **hit** for Sonnet 5.5 costs **$0.10 per million tokens**, versus $2 for normal input. Writing to the cache costs a bit more than normal input ($2.50 per million for a 5-minute cache).

The rule that matters if you build your own agent on the API: **put stable content first and changing content last.** If something that changes every turn (a diff, a timestamp) sits before your instructions, the cached prefix breaks and you pay full price. Claude Code handles caching for you; this matters most for custom agents.

## 4. Use the cheapest model and effort that works

- **Pick the model per task.** Anthropic's guide says Sonnet handles most coding tasks and costs less than Opus; save Opus for complex architecture and multi-step reasoning. Switch with `/model`. For simple subagent work, a Haiku model is cheaper still.
- **Lower the effort level** for routine work with `/effort` or in `/model`. Thinking tokens are billed as output, and the docs note the thinking budget can be tens of thousands of tokens per request on default settings. (On the newest Claude models thinking can't be switched off, but lower effort uses less.)

## 5. Stop huge tool output from reaching the model

This is where **hooks** and **token proxies** help.

**Hooks.** A Claude Code `PreToolUse` hook can rewrite a command before it runs. Anthropic's docs show a hook that pipes test runs through a filter so only failures reach Claude, turning tens of thousands of tokens of test output into a few hundred. The same idea works for log files: return the matching `ERROR` lines, not the whole log.

**Subagents.** Delegate noisy jobs (running the full test suite, reading long docs) to a subagent. The verbose output stays in the subagent's context and only a summary comes back. The subagent still costs tokens, so give it a smaller model.

**Token proxies.** A proxy sits between your agent and the API and trims what's sent. For example, it can cut oversized tool results, collapse whitespace and drop repeated boilerplate. If you write your own trimming step, keep the **end** of long output too, because stack traces put the actual error at the bottom:

```python
MAX_CHARS = 2400
KEEP_HEAD = 1400
KEEP_TAIL = 600

def trim(payload: str) -> str:
    """Shrink an oversized tool result, keeping its start and its end."""
    if len(payload) <= MAX_CHARS:
        return payload
    dropped = len(payload) - KEEP_HEAD - KEEP_TAIL
    return payload[:KEEP_HEAD] + f"\n\n[...{dropped} characters truncated...]\n\n" + payload[-KEEP_TAIL:]
```

An open-source example is [Caveman](/repos/caveman) ([GitHub](https://github.com/JuliusBrussee/caveman)), which combines a local proxy with terse output rules. Its README reports **33.2% fewer input tokens** across sessions from the proxy; treat that as the project's own figure and measure on your workload. If you run a proxy, make sure it **streams responses through** rather than buffering them, or the agent will feel slow.

## 6. Write specific prompts and plan first

Vague requests ("improve this codebase") make the agent read widely. Specific ones ("add input validation to the login function in auth.ts") keep reads small. For bigger tasks, use **plan mode** (Shift+Tab in Claude Code) so the agent proposes an approach before writing code, and press **Escape** early if it heads the wrong way. Redoing work is the most expensive outcome of all.

## A simple order to work through

1. Measure with `/usage` or `total_cost_usd` for a week.
2. Add `/clear` and `/compact` habits; shorten `CLAUDE.md`.
3. Match the model and effort level to the task.
4. Filter test and log output with a hook, or add a proxy.
5. Re-measure, and keep only the changes that saved money without hurting results.

## Frequently asked questions

### Why are output tokens so expensive?
Generating tokens costs providers more than reading them, so output is priced higher, 5× input on current Claude Sonnet and Opus models.

### Does Claude Code use prompt caching automatically?
Yes. Anthropic's docs say Claude Code automatically uses prompt caching and auto-compaction.

### What is a token proxy?
A small service between your agent and the model API that reduces what is sent, for example by trimming large tool outputs, before forwarding the request.

## Sources

- Claude Code Docs: [Manage costs effectively](https://code.claude.com/docs/en/costs)
- Claude Code Docs: [Run Claude Code programmatically](https://code.claude.com/docs/en/headless) (`--output-format json`, `total_cost_usd`)
- Anthropic: [Pricing](https://platform.claude.com/docs/en/about-claude/pricing)
- GitHub: [JuliusBrussee/caveman](https://github.com/JuliusBrussee/caveman)

Related on VNHAX: [Caveman repository review](/repos/caveman) · [Claude Code across multiple repositories](/blog/claude-code-cli-multi-repo-workflows-sandboxing) · [ChatGPT Pro plans and Ultrafast](/blog/chatgpt-pro-plans-100-200-500-ultrafast) · [Vector database cost optimization](/blog/vector-database-cost-optimization-scaling-pinecone-qdrant-chroma)
