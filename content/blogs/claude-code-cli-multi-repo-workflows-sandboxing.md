---
title: "Claude Code Across Multiple Repositories: --add-dir, CLAUDE.md and Sandboxing"
description: "How to use Claude Code on a feature that spans several repositories: --add-dir and /add-dir, how CLAUDE.md files load, the built-in sandbox for Bash, permission modes, and running it headless in CI. Based on Claude Code's official docs."
date: "2026-10-08"
updatedAt: "2026-10-12"
author: "Umar Hashmi"
category: "Anthropic & Claude Models"
tags: ["anthropic", "claude-code", "cli-agents", "developer-tools", "sandboxing", "monorepo"]
---

> **Quick answer (checked 12 October 2026):** Start Claude Code in your main repository and give it access to sibling repos with **`claude --add-dir ../other-repo`** (or **`/add-dir`** during a session). Put project rules in **`CLAUDE.md`**. Note that CLAUDE.md files in added directories are **not loaded by default**; set `CLAUDE_CODE_ADDITIONAL_DIRECTORIES_CLAUDE_MD=1` if you want them. For safety, turn on Claude Code's **built-in sandbox** (`/sandbox`), which limits where Bash commands can write and which domains they can reach. For CI, run it headless with **`claude -p "..."`**.

Real features rarely live in one repository: an API change touches the backend service, the web client and a shared types package. Claude Code can work across all of them in one session, but only if you set it up properly. This guide sticks to features that exist in Claude Code's [official documentation](https://code.claude.com/docs/en/cli-reference) and its CLI help. Many guides online invent config files and flags, so I've checked each one.

## Step 1: Give Claude access to more than one repository

By default Claude Code works inside the directory you start it in. To add sibling repositories:

```bash
# Start in the service you are changing, and allow two related repos
cd ~/code/billing-service
claude --add-dir ../web-frontend ../shared-types
```

Or, in an existing session, type:

```text
/add-dir ../web-frontend
```

For directories you always want available, there is also a `permissions.additionalDirectories` setting in your Claude Code settings file.

There is no special "workspace" file or folder of symbolic links required. `--add-dir` is the supported way to do this.

## Step 2: Put the rules in CLAUDE.md

`CLAUDE.md` is Claude Code's project memory: instructions it reads at the start of every session. According to the [memory docs](https://code.claude.com/docs/en/memory):

- Claude Code loads `CLAUDE.md` (and `CLAUDE.local.md`) from the **current directory and every directory above it** when it starts. Files in subdirectories load when Claude works in them.
- Common locations: `./CLAUDE.md` or `./.claude/CLAUDE.md` for the project (commit it so the team shares it), `~/.claude/CLAUDE.md` for your personal rules, and `./CLAUDE.local.md` for personal project notes you don't commit.
- Run `/context` to see which memory files are loaded.

**The multi-repo catch:** CLAUDE.md files inside directories you add with `--add-dir` are **not loaded by default**. If each repo has important rules, enable them explicitly:

```bash
CLAUDE_CODE_ADDITIONAL_DIRECTORIES_CLAUDE_MD=1 claude --add-dir ../web-frontend ../shared-types
```

Directories added through the `additionalDirectories` setting never load their CLAUDE.md, even with this variable.

A short example `CLAUDE.md` for a billing service:

```markdown
# Billing service

- Never edit files in migrations/ without asking first.
- Changes to the invoice API must stay backward compatible with web-frontend.
- Run `npm test` before saying a task is done.
- Shared request/response types live in ../shared-types; update them there, not locally.
```

## Step 3: Turn on the sandbox

Letting an agent run shell commands on your machine is powerful and risky. Claude Code's built-in **sandboxed Bash tool** adds two layers of isolation ([sandboxing docs](https://code.claude.com/docs/en/sandboxing)):

- **Filesystem isolation:** sandboxed commands can write only to the working directory, a per-user temp directory and any directories you added (with `--add-dir`, `/add-dir` or `additionalDirectories`). They can still **read** the rest of the filesystem, including credential files, so the docs recommend adding `denyRead` rules for sensitive locations like your home-directory credentials.
- **Network isolation:** network access goes through a proxy with an allowlist that **starts empty**, so you decide which domains (your package registry, for example) commands can reach.

Enable it with the `/sandbox` command. A few details from the docs:

- It covers **Bash, PowerShell and Monitor** commands and their child processes. Claude's built-in file tools, MCP servers and hooks still run on the host unless you isolate the whole process.
- On **Linux and WSL2**, it needs `bubblewrap` and `socat` installed.
- For stronger isolation, run the **entire** Claude Code process inside isolation, for example with Anthropic's sandbox runtime (`npx @anthropic-ai/sandbox-runtime claude`) or a dev container.
- If you ever use `--dangerously-skip-permissions`, the docs say to run it only inside a container, VM or the sandbox runtime.

## Step 4: Pick a permission mode

Claude Code asks before editing files or running commands unless you tell it otherwise. The `--permission-mode` flag accepts modes including `manual`, `acceptEdits`, `auto` and `bypassPermissions`, and you can pre-approve specific tools with `--allowedTools`. A sensible setup for multi-repo work:

- **`acceptEdits`** inside the sandbox, so Claude can edit files across the added repos without asking each time, while risky commands still need your approval.
- Keep **`manual`** for repositories with production configuration or infrastructure code.

See the [permissions docs](https://code.claude.com/docs/en/permissions) for allow and deny rules.

## Step 5: Run it headless in CI

For automation, use print mode, which answers and exits ([headless docs](https://code.claude.com/docs/en/headless)):

```bash
claude -p "Run the test suite, find the cause of the failing invoice test, and propose a minimal fix" \
  --output-format json
```

For GitHub workflows, Anthropic maintains the [Claude Code GitHub Action](https://github.com/anthropics/claude-code-action), which can respond to comments on issues and pull requests.

## A practical multi-repo checklist

1. Start in the repo you are changing; `--add-dir` the others.
2. Commit a `CLAUDE.md` in each repo with its rules, and set `CLAUDE_CODE_ADDITIONAL_DIRECTORIES_CLAUDE_MD=1` if you need them all.
3. Turn on `/sandbox` and add `denyRead` rules for credentials.
4. Allow only the network domains you need.
5. Review every diff before committing. Claude Code doesn't replace code review.

## Frequently asked questions

### How do I use Claude Code with multiple repositories?
Start it in one repository and add the others with `claude --add-dir ../repo-a ../repo-b`, or `/add-dir` during a session.

### Does Claude Code read CLAUDE.md from added directories?
Not by default. Set `CLAUDE_CODE_ADDITIONAL_DIRECTORIES_CLAUDE_MD=1` when launching to load them.

### Can Claude Code run in CI?
Yes. Use `claude -p "your task"` for non-interactive runs, optionally with `--output-format json`, or the official GitHub Action.

### Does the sandbox stop Claude from reading my secrets?
Not on its own. By default sandboxed commands can still read most of the filesystem; add `denyRead` rules for credential locations.

## Sources

- Claude Code Docs: [CLI reference](https://code.claude.com/docs/en/cli-reference)
- Claude Code Docs: [How Claude remembers your project (CLAUDE.md)](https://code.claude.com/docs/en/memory)
- Claude Code Docs: [Configure the sandboxed Bash tool](https://code.claude.com/docs/en/sandboxing)
- Claude Code Docs: [Configure permissions](https://code.claude.com/docs/en/permissions)
- Claude Code Docs: [Run Claude Code programmatically](https://code.claude.com/docs/en/headless)
- Claude Code Docs: [Set up Claude Code in a monorepo or large codebase](https://code.claude.com/docs/en/large-codebases)
- GitHub: [anthropics/claude-code-action](https://github.com/anthropics/claude-code-action)

Related on VNHAX: [Claude Code vs Antigravity vs Grok Build](/blog/claude-code-vs-antigravity-vs-grok-build-2026-shootout) · [Multi-persona agent swarms with Everything Claude Code](/blog/why-monolithic-prompts-died-multi-persona-agent-swarms-ecc) · [Hardening enterprise MCP servers](/blog/enterprise-mcp-server-security-hardening-protocol-bridges)
