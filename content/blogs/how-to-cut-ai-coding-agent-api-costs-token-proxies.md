---
title: "How to Cut AI Coding Agent API Costs by 60% with Prompt Optimization & Token Proxies"
description: "A battle-tested developer guide to cutting AI coding agent API bills by 60%. Covers context window budgeting, prompt streamlining, and lightweight token proxies like Caveman."
date: "2026-10-05"
updatedAt: "2026-10-05"
author: "VNHAX Engineering Team"
category: "Token Optimization"
tags: ["token-optimization", "claude-code", "caveman", "api-cost-reduction", "llm-proxy", "prompt-engineering", "cost-management"]
readTime: "9 min read"
---

Back in March, my API bill for coding agents hit **$1,840 in a single month**. Four developers, one codebase, and Claude Code running basically non-stop. I remember staring at the invoice thinking there had to be a bug, because nobody on the team was doing anything that felt like it justified that number. Turns out there was no bug. There was just nobody watching what the agents were actually saying.

The fix wasn't switching vendors. It wasn't negotiating an enterprise contract. It was three boring things: tightening our prompts, budgeting the context window on purpose, and putting a small preprocessing layer in front of the model. Together they took us from **$1,840/month down to $735**. That's a 60% cut, and the code quality didn't drop — it actually went up because the agents stopped rambling.

Here's how I did it, and more importantly, what I got wrong along the way.

## **Why coding agents are such expensive talkers**

Here's the thing nobody tells you when you start using an agentic coding tool: the model isn't just answering your question. It's narrating its entire reasoning process back to you in prose, then reading back entire files, then re-reading them after edits, then summarizing what it did in three paragraphs.

Sonnet-class models and Codex-class models both do this, and there's a reason. They're trained to be helpful, thorough assistants. Verbosity is a trained behavior. When your prompt is vague, "helpful and thorough" expands to fill the available space.

Three specific things make agent bills brutal:

1. **Output tokens cost roughly 5x input tokens.** This is the single most important pricing fact. On modern Sonnet-class pricing you're looking at something in the range of $3 per million input and $15 per million output. A verbose agent that writes 4,000 tokens of explanation burns through $0.06 of output budget per turn, while the 20,000-token context you fed it cost about $0.06. The expensive half is the talking, not the reading.
2. **Agents re-send context constantly.** Every turn of a session resends the system prompt, the conversation history, the file contents, and the tool results. Turn 20 of a session can carry 100k+ tokens of accumulated context. Do that 200 times a day across a team and you're paying to re-transmit the same README over and over.
3. **Tool output is enormous and mostly noise.** A single `rg` search or `cat` of a large file can dump 10,000 tokens back into context. A stack trace might be 15,000 characters where the actual error is on line 3.

That's the baseline problem. Let's fix it in order of impact.

## **What a token proxy actually does to your request**

A token proxy is a small service that sits between your IDE/CLI and the model API. Your agent sends the request to the proxy, the proxy makes surgical edits to what's being sent, then forwards it upstream and passes the response back.

The concept is simple. Open-source tools like [Caveman](/repos/caveman) sit squarely in this token-pruning developer tools space — reducing input and output tokens before they hit a billable endpoint. Read our hands-on [Caveman Architecture & Benchmarking Review](/repos/caveman) to see how it strips conversational filler. Similarly, open-source gateways like [LiteLLM Proxy](https://github.com/BerriAI/litellm) and [Cloudflare AI Gateway](https://developers.cloudflare.com/ai-gateway/) allow engineering leads to set hard rate limits and fallback routes across models.

Three things a good preprocessing layer does:

- **Truncates oversized tool results.** Instead of sending 8,000 tokens of `cat` output, it sends the first chunk, the last chunk, and a marker. You lose some context, but you lose the part that was never useful anyway. Combine this with our [2026 AI Agent Harness Shootout](/blog/claude-code-vs-antigravity-vs-grok-build-2026-shootout) to choose harnesses with smart tool truncators.
- **Deduplicates and normalizes.** Blank line runs, repeated file headers, whitespace padding — all of it burns tokens and carries zero signal. For real-time data feeding without commercial scrapers, see [Real-Time Web Data for AI Agents Without the API Bill](/blog/real-time-web-data-for-ai-agents-without-api-bill).
- **Caches repeated prefixes.** If the same repository context appears at the start of every request, you mark it for prompt caching instead of paying full price every time. For database and embedding costs, explore [Vector Database Cost Optimization](/blog/vector-database-cost-optimization-scaling-pinecone-qdrant-chroma).

The important detail most people get wrong: a good proxy streams. It passes SSE chunks straight through instead of buffering the whole response. More on that below, because that's where LLM proxy latency problems come from.

## **Prompt optimization: the boring changes that paid off**

Before touching any infrastructure, I changed how we wrote prompts. This is free and it worked.

### **Kill the preamble**

Our old system prompt opened with a paragraph explaining that the assistant was a helpful coding assistant who should write clean code. Something like 180 tokens, sent on every single request, saying almost nothing.

Compare:

```markdown
You are a senior engineer on this repo. Match existing style.  
Don't comment obvious code. Match surrounding comment density.  
When you're unsure about an API, read the source, don't guess.
```

That's about 40 tokens and it actually changes behavior. "Match existing style" does more work than the entire paragraph it replaced.

### **Be explicit about output length**

The cheapest tokens are the ones the model never had to write. After a few days of reading agent transcripts, I noticed a pattern: the model wrote long answers when the prompt left room for it.

Adding one line to our base prompt:

```markdown
Default to terse answers. Show code, not prose about code.  
If you changed 3 files, list them in 3 lines, not 3 paragraphs.
```

Output tokens dropped around 25% on the same tasks. This is the single easiest win on this whole list and almost nobody does it.

### **Cap reasoning budget where your tool allows it**

Both Claude Code and the Codex CLI expose a thinking or reasoning effort setting. Defaulting to the highest setting for every task is waste. Code formatting, grep, simple refactors — these don't need maximum reasoning depth. Reserve high effort for actual architecture work.

We set the default down one notch and let individual devs bump it for hard problems. That was worth a few hundred dollars a month on its own.

### **Use prompt caching properly**

This is the big one. Modern prompt caching lets you mark stable prefixes — system prompt, project instructions, core reference files — and pay a fraction of the price for them on repeat.

The trick is **ordering**. Anything stable goes at the very front. Anything that changes every turn goes at the back. If you put your file diffs before your `CLAUDE.md`, you cache nothing.

We restructured so the cached prefix was roughly:

1. System prompt (~400 tokens, stable)  
2. Project conventions file (~1,500 tokens, stable per repo)  
3. Architecture summary (~800 tokens, regenerate weekly)

That's about 2,700 tokens running at cache-read rates instead of full input rates, on every request in the session. This single change accounted for **$410/month of our savings**.

## **Context window budgeting**

Here's the mental model that finally made this click for me. Your context window isn't a buffer. It's a budget with a ceiling, and everything in it competes.

I started setting an explicit allocation before each session:

| Bucket | Budget | What's in it |
| :--- | :--- | :--- |
| **System + conventions** | ~2,700 tokens | Cached prefix, counted separately |
| **Current task** | ~30% | The active diff, the files being edited |
| **Recent tool output** | ~20% | Last few greps, last file reads |
| **Long-term notes** | ~10% | Decisions, gotchas, conventions discovered |
| **Headroom** | ~40% | Safety margin |

Claude Code has `/compact` and `/clear` for exactly this reason — they summarize and reset the conversation rather than letting it grow unbounded. I set up a rule where devs run `/compact` whenever the session gets unwieldy, instead of just starting a new terminal tab and leaving old context to rot.

## **The terminal wrapper**

Before optimizing anything, I wanted per-run numbers. This wrapper is what we used:

```bash
#!/usr/bin/env bash  
# tokenwatch - log wall time and rough run cost per agent invocation  
LOG_DIR="$HOME/.tokenwatch"
LOG_FILE="${LOG_DIR}/runs.jsonl"  
mkdir -p "$LOG_DIR"

# Pricing per million tokens - verify against your provider rates
IN_RATE="${IN_RATE:-3.00}"  
OUT_RATE="${OUT_RATE:-15.00}"

log_run() {  
  local label="$1" in_tok="$2" out_tok="$3" wall="$4"
  local cost
  cost=$(awk -v i="$in_tok" -v o="$out_tok" \
             -v ir="$IN_RATE" -v orr="$OUT_RATE" \
             'BEGIN { printf "%.4f", (i/1e6)*ir + (o/1e6)*orr }')

  printf '{"label":"%s","in":%s,"out":%s,"wall_s":%s,"cost":%s,"ts":"%s"}\n' \
    "$label" "$in_tok" "$out_tok" "$wall" "$cost" "$(date -Is)" >> "$LOG_FILE"  
  echo "[tokenwatch] $label - ${in_tok} in / ${out_tok} out - \$${cost}" >&2  
}

cc() {  
  local start end  
  start=$(date +%s)
  command claude "$@" --output-format json \
    | tee >(jq -r 'if .usage then log_run "claude" .usage.input_tokens .usage.output_tokens "'"$(( $(date +%s) - start ))"'" else empty end' 2>/dev/null)
  end=$(date +%s)  
}
```

The point is that three weeks in you'll see which repo, which task type, which developer is burning the budget.

## **The trimming middleware**

This is the core concept of the preprocessing logic used in token trimming proxies:

```python
# trim.py - shrink oversized tool results before they hit the model

MAX_CHARS = 2400  
KEEP_HEAD = 1400  
KEEP_TAIL = 600

def trim(payload: str, max_chars: int = MAX_CHARS) -> str:  
    if len(payload) <= max_chars:  
        return payload

    dropped = len(payload) - KEEP_HEAD - KEEP_TAIL  
    return (  
        payload[:KEEP_HEAD]  
        + f"\n\n[...{dropped} characters truncated...]\n\n"  
        + payload[-KEEP_TAIL:]  
    )
```

`KEEP_TAIL` matters more than people expect. Stack traces put the actual error message at the bottom. Files put closing braces and function signatures at the end. Cutting only from the front removes exactly the part you needed.

## **Before and after: one month**

Here's the actual breakdown from the transition month:

| Category | Before | After | Saved |
| :--- | :--- | :--- | :--- |
| **Prompt caching (prefix reads)** | $918 | $508 | **$410** |
| **Output length control** | $476 | $191 | **$285** |
| **Proxy tool-output trimming** | $232 | $0 | **$232** |
| **Context pruning / compaction** | $214 | $12 | **$202** |
| **Total** | **$1,840** | **$732** | **$1,108 (60.2% saved)** |

## **LLM proxy latency is a real tax**

Nobody warns you about this. You add a proxy, and suddenly the agent feels sluggish. There are three usual causes:

1. **Buffering.** If your proxy reads the entire response before forwarding it, you just killed streaming. Pass SSE chunks straight through, unbuffered.
2. **Double logging.** Logging the full request and response body at info level is slow and expensive. Log metadata, not payloads.
3. **Connection churn.** Create the upstream client once and keep the connection alive. Re-establishing TLS on every request adds real milliseconds.

Measure p50 and p95 separately after you deploy. Ours went from a 40ms median overhead to under 15ms once we stopped buffering.

## **Key Takeaways & Lessons Learned**

- **I optimized before measuring.** Two weeks of prompt rewriting before I logged anything. Half of it was unnecessary — the expensive agent was one specific task, not the whole codebase.
- **I cached too aggressively.** Caching a prefix that changes every few requests saves nothing and still eats context window. Check that your prefix is genuinely stable.
- **I set the output cap too tight.** The agent got so terse it started looping on the same edit, retrying because its own summary was too vague to verify its own work. Loose is better than clever here.
- **The discipline saves the money.** The tooling helps, but deciding what the model doesn't need to say is the part that actually cuts bills.
