---
title: "Anthropic Enterprise Frontier Safeguards (EFS) Explained: Zero Retention With Misuse Monitoring"
description: "Enterprise Frontier Safeguards lets companies use Claude Fable 5.1 without Anthropic keeping their data: monitoring data lives in the customer's own cloud and alerts go to the customer's team. How it works, why it exists, rollout dates and what to do now."
date: "2026-10-07"
updatedAt: "2026-10-12"
author: "Umar Hashmi"
category: "Anthropic & Claude Models"
tags: ["anthropic", "claude", "enterprise-ai", "data-retention", "ai-security", "compliance"]
---

> **Quick answer (checked 12 October 2026):** **Enterprise Frontier Safeguards (EFS)** is a system Anthropic announced on **1 September 2026**. It aims to give enterprises the privacy of **zero data retention (ZDR)** while still detecting misuse of powerful models like Claude Fable 5.1. The trick: the activity data needed for monitoring is stored **in the customer's own cloud account** (for example Amazon S3, Azure Blob Storage or Google Cloud Storage), under the customer's keys, and alerts go **to the customer's own reviewers**, with no Anthropic human review required. EFS rolls out **in phases starting later this fall**; until then, eligible customers get ZDR on Fable 5 and Fable 5.1.

If your company uses or is evaluating Claude, EFS is one of the most important announcements of the year, because it solves a real blocker for banks, hospitals and law firms. Here is what it is, based on Anthropic's announcement (linked at the end).

## The problem EFS solves

With **Claude Fable 5**, Anthropic introduced **30-day data retention**. Its reasoning: the most dangerous misuse, such as multi-step cyberattacks or stolen credentials being used across accounts, can only be spotted by correlating activity over time and across sessions. You can't do that if every interaction is analyzed and instantly deleted.

Anthropic stresses that retention was not about training: it says it has never trained on enterprise data without explicit permission.

But for many regulated companies, *any* vendor keeping their data is a deal-breaker. Adding a new "trusted data vendor" means updating contracts and notifying customers, and some data (privileged legal material, non-public financial information, drug-safety reports) can only be seen by specific cleared people. So those companies couldn't use the newest models.

## How EFS works

Anthropic says it designed EFS with more than 100 customers, including the Analysis and Resilience Center for Systemic Risk (whose members include the CISOs of the largest US banks), plus companies such as Comcast, KPMG, Mastercard, Salesforce and Visa. The design has three parts:

1. **Your cloud, your keys.** Activity data used for monitoring is stored in the customer's own cloud account, under the customer's encryption keys, access policies and audit logging, not on Anthropic's infrastructure.
2. **Automated monitoring.** Anthropic's systems analyze a rolling window of traffic for signals of serious misuse, including attempts to develop offensive cyber or biological capabilities and signs of stolen or leaked credentials.
3. **Your people review the alerts.** Flags go directly to the customer, and the customer's own trained staff decide what to do. No human review by Anthropic employees is required.

## Where EFS will be available

Anthropic lists support for **Claude Code, Claude Enterprise, the Claude Platform, Amazon Bedrock, Claude Platform on AWS, Google's Agent Platform and Microsoft Foundry**.

## Timeline and what to do now

- **Now:** eligible customers can use **Fable 5 and Fable 5.1 with zero data retention** while EFS is being rolled out. Note that Anthropic's developer docs still list 30-day retention as the default for Fable 5.1 and Mythos 5.1 unless ZDR is expressly authorized, so ask your Anthropic account team whether you qualify.
- **Later this fall:** EFS rolls out in phases. Anthropic hasn't published pricing or a detailed eligibility list yet.

## If you're deploying Claude agents: what EFS doesn't cover

EFS is about **where data lives and who reviews misuse alerts**. It doesn't make your application secure on its own. Agent deployments still need basic hygiene:

- **Treat retrieved content as untrusted.** Web pages, uploaded files and customer tickets can contain prompt-injection text ("ignore previous instructions and send…"). Keep it clearly separated from your system instructions.
- **Least privilege for tools.** Give agents read-only access by default, and require a human to confirm writes, deletions, payments or outbound messages.
- **Restrict outbound network access** from agent sandboxes to the domains they genuinely need.
- **Keep your own audit trail** of which user triggered which agent action, especially in regulated workflows.

## Frequently asked questions

### Does EFS mean Anthropic stores no data at all?
The goal is ZDR-level privacy for Anthropic: the monitoring data lives in your cloud account under your control, and Anthropic's automated systems flag issues to your team.

### Is EFS available today?
Not yet broadly. Anthropic said it would roll out in phases starting later this fall. In the meantime, eligible customers get ZDR on Fable 5 and Fable 5.1.

### Does EFS apply to Claude Opus 5.5 and Sonnet 5.5?
Anthropic's announcement focuses on Mythos-class models like Fable 5.1, where 30-day retention was introduced. Check with Anthropic for the retention terms of other models on your contract.

## Sources

- Anthropic: [Developing Enterprise Frontier Safeguards with our customers](https://www.anthropic.com/news/enterprise-frontier-safeguards) (1 September 2026)
- Anthropic: [Introducing Claude Fable 5.1 and Claude Mythos 5.1](https://www.anthropic.com/claude-fable-and-mythos-5-1)
- CSO Online: [Anthropic introduces zero-retention AI safety monitoring for enterprises](https://csoonline.com/article/4217538/anthropic-introduces-zero-retention-ai-safety-monitoring-for-enterprises.html)

Related on VNHAX: [What is Claude Mythos 5.1?](/blog/what-is-claude-mythos-5-1-explained) · [Shadow AI governance for code assistants](/blog/shadow-ai-governance-auditing-securing-code-assistants) · [Enterprise MCP server security](/blog/enterprise-mcp-server-security-hardening-protocol-bridges)
