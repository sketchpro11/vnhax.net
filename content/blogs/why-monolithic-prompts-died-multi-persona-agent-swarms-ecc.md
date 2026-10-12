---
title: "Why One Giant Prompt Fails: Multi-Persona Agent Pipelines With Claude Code Subagents and ECC"
description: "Why a single do-everything prompt breaks down on big coding tasks, and how to split the work across specialist Claude Code subagents (architect, security auditor, coder, QA), with Everything Claude Code (ECC) as a starting point."
date: "2026-10-05"
updatedAt: "2026-10-12"
author: "Umar Hashmi"
category: "Agent Architecture"
tags: ["agent-swarms", "everything-claude-code", "multi-persona", "claude-code", "software-engineering", "ecc", "ai-agents"]
---

> **Quick answer (checked 12 October 2026):** Asking one agent to plan, implement, security-review and verify a large change in a single context tends to fail: instructions compete, long contexts are used unevenly, and "be careful" and "move fast" pull in opposite directions. A more reliable pattern is a small pipeline of **specialist subagents** (architect, security auditor, coder, QA verifier), each with its own prompt, restricted tools and fresh context. Claude Code supports this natively with subagent files in `.claude/agents/`, and the open-source [Everything Claude Code (ECC)](https://github.com/affaan-m/ECC) project offers ready-made agents, skills and hooks to start from.

Picture a typical failure: you hand one agent a refactor that touches dozens of files with a single instruction to "understand the architecture, design the migration, implement it, check for security regressions and make the tests pass." It starts well, then partway through it begins to contradict its own earlier edits, skips a check you asked for, and leaves two versions of the same function behind.

The model isn't necessarily the problem. The structure is: one context window is being asked to do several jobs with different priorities. Splitting those jobs apart is the fix this guide describes. (For how the main coding agents compare, see [Claude Code vs Antigravity vs Grok Build](/blog/claude-code-vs-antigravity-vs-grok-build-2026-shootout).)

## **What's actually happening to your context window**

Three real mechanisms cause degradation in long single-prompt agents:

1. **Instruction dilution:** The more unrelated directives you pack into one prompt, the more they compete. A rule like "keep answers concise" can quietly weaken a security review that needed to be thorough.
2. **Long-context blind spots:** Models don't use long contexts evenly. The well-known "[Lost in the Middle](https://arxiv.org/abs/2307.03172)" study found that information in the middle of a long input was used less reliably than information at the start or end. Newer models have improved, but long sessions still drift.
3. **Role conflict:** Asking one agent to be both a cautious auditor and a fast implementer pulls it in opposite directions, and the result is often inconsistent rather than balanced.

## **The multi-persona architecture**

A common pattern is an orchestrator with narrow specialists, each owning a fresh context:

```
                   ┌─────────────────────┐  
                   │    ORCHESTRATOR      │  
                   │  plans, delegates,   │  
                   │  adjudicates         │  
                   └──────────┬──────────┘  
             ┌────────────────┼────────────────┐  
             ▼                ▼                ▼  
     ┌──────────────┐ ┌─────────────┐ ┌──────────────┐  
     │  ARCHITECT   │ │  SECURITY   │ │     QA       │  
     │  designs     │ │  audits     │ │  verifies    │  
     │  the change  │ │  the diff   │ │  behaviour   │  
     └──────┬───────┘ └──────┬──────┘ └──────┬───────┘  
            │                │               │  
            └────────────────┴───────┬───────┘  
                                     ▼  
                            ┌──────────────┐  
                            │    CODER     │  
                            │  implements  │  
                            │ (only here)  │  
                            └──────────────┘
```

The critical property: **the coder never plans and never audits itself.** Those are separate contexts with separate system prompts. That's what removes persona conflict.

## **The persona pipeline in action**

1. **Architect** reads the codebase, produces a migration plan with explicit ordering and dependencies. Its output is a document, not code.
2. **Security Auditor** reads the plan and the current state of the files it touches. It flags risks before anything is written — auth handling on the new path, secrets that might move, injection surfaces.
3. **Coder** receives the plan, the security constraints, and only the files it needs. It does not implement and audit simultaneously.
4. **QA Verifier** runs against the actual diff: tests, type checks, and a specific checklist derived from the security flags.

The security auditor's findings become **hard constraints in the coder's prompt**. Turning audit output into *input* to implementation, rather than commentary *after* it, removes a common source of agents undoing their own work.

## **Implementing subagents in Claude Code with ECC**

In Claude Code, subagents are markdown files in `.claude/agents/`, each with its own system prompt, tool access, and model selection. Using open-source rule frameworks like [Everything Claude Code (ECC)](https://github.com/affaan-m/ECC) (see our interactive [Everything Claude Code Architecture Deep Dive](/repos/ecc)), you can instantiate production personas in minutes. To ensure third-party tools don't execute unauthorized commands, review our guide on [Hardening Enterprise MCP Server Bridges](/blog/enterprise-mcp-server-security-hardening-protocol-bridges).

### `.claude/agents/security-auditor.md`

```yaml
---
name: security-auditor
description: Reviews a planned change for security regressions before implementation.
tools: Read, Grep, Glob, Bash
model: opus
---

You are a security auditor. You do not write production code.

Your job is to read the proposed change plan and the current state of  
every file it touches, then produce a findings list.

For each finding output:  
- SEVERITY: critical | high | medium | low  
- FILE: path:line  
- ISSUE: one sentence  
- CONSTRAINT: the specific rule the coder must follow to resolve it

Constraints become hard requirements in the coder's prompt.
```

### `.claude/agents/qa-verifier.md`

```yaml
---
name: qa-verifier
description: Verifies an implemented change against its plan and security constraints.
tools: Read, Grep, Glob, Bash
model: sonnet
---

You are a QA verifier. You do not fix things. You report.

1. Run the test suite. Report pass/fail counts verbatim.  
2. Run the type checker. Report errors verbatim.  
3. Check each CONSTRAINT from the security audit against the actual diff.  
4. Check that every file in the plan was actually modified.

Output a verdict table. Do not editorialize.
```

Note the deliberate tool restrictions. The auditor gets `Read`, `Grep`, `Glob` — it cannot write. The verifier can `Bash` to run tests but its prompt says it doesn't fix.

## **Verification loops before commit**

With a Claude Code [hook](https://code.claude.com/docs/en/hooks) (ECC ships several ready-made ones), you can run a check before Bash commands such as `git commit`:

```json
{  
  "hooks": {  
    "PreToolUse": [  
      {  
        "matcher": "Bash",  
        "hooks": [  
          {  
            "type": "command",  
            "command": "./.claude/scripts/gate-commit.sh"  
          }  
        ]  
      }  
    ]  
  }  
}
```

The gate script checks for a verification artifact from the QA pass and refuses the commit if it is missing or shows failures.

## **The real trade-offs: latency and tokens**

- **Latency adds up:** Several sequential specialists take longer than one agent. That's worth it for a large refactor and overkill for a one-line fix.
- **Token consumption increases:** Each specialist gets its own system prompt and reads of relevant files. You pay more total tokens to get substantially higher reasoning reliability. To control these costs across team fleets, deploy caching and compression proxies as explained in our guide on [how to cut AI coding agent costs](/blog/how-to-cut-ai-coding-agent-api-costs-token-proxies).
- **Orchestration is real code:** Coordinating handoffs, verdicts, and failure fallbacks requires deliberate engineering.

## **Frequently Asked Questions**

**Why do long AI agent prompts degrade in quality?**
Instruction dilution, attention drift, and persona conflict compound over long context windows. The model weights directives uniformly and loses focus on earlier instructions when optimizing for both speed and caution in a single thread.

**What is multi-persona AI agent architecture?**
Decomposing one generalist agent into narrow specialists (Architect, Security Auditor, Coder, QA Verifier), each with a dedicated system prompt, restricted tool access, and disposable context, orchestrated via structured handoffs.

**What is Everything Claude Code (ECC)?**
An open-source collection of Claude Code persona configurations, commands, skills, and pre-commit verification hooks designed to standardize multi-agent software engineering pipelines.

**Do multi-agent swarms cost more tokens than a single agent?**
Yes. Each specialist has its own context and system prompt, so total token use goes up. Anthropic's cost docs note that agent teams can use around 7× more tokens than a standard session when teammates run in plan mode. The payoff is less rework on large, risky changes; for small tasks a single agent is cheaper.

## Sources

- Claude Code Docs: [Create custom subagents](https://code.claude.com/docs/en/sub-agents), [Hooks](https://code.claude.com/docs/en/hooks), [Manage costs](https://code.claude.com/docs/en/costs)
- GitHub: [Everything Claude Code (affaan-m/ECC)](https://github.com/affaan-m/ECC)
- Liu et al.: [Lost in the Middle: How Language Models Use Long Contexts](https://arxiv.org/abs/2307.03172)
