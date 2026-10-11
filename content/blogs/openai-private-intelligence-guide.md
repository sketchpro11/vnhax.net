---
title: "OpenAI Private Intelligence Explained: ZDR With Private Safety Processing"
description: "OpenAI's Private Intelligence lets API customers keep Zero Data Retention while OpenAI still detects misuse across interactions. How Private Safety Processing works, what customers must set up, Private Inference, and how it compares with Anthropic EFS."
date: "2026-10-07"
updatedAt: "2026-10-12"
author: "Umar Hashmi"
category: "OpenAI & Models"
tags: ["openai", "private-intelligence", "zero-data-retention", "private-safety-processing", "enterprise-security", "compliance"]
---

> **Quick answer (checked 12 October 2026):** **Private Intelligence** is OpenAI's umbrella name for privacy options aimed at businesses. Its main live piece is **Zero Data Retention (ZDR) with Private Safety Processing (PSP)**, which OpenAI began rolling out to API customers on **22 September 2026**. OpenAI keeps no copy of your prompts or responses; instead, selected interactions are **encrypted and stored in your own cloud storage for 30 days**, where an automated, hardware-attested review system with **no human access** checks them for misuse across interactions. A second piece, **Private Inference**, which applies confidential computing to inference itself, is in **preview**.

Both OpenAI and Anthropic hit the same wall this year: their newest models are capable enough that some misuse only shows up across many interactions, but big customers refuse to let the AI provider keep their data. Both came up with a similar answer: keep the data in the customer's cloud and let automated systems do the review. This article covers OpenAI's version, based on its own announcement and developer guide.

## Why OpenAI built it

Classic ZDR means OpenAI doesn't retain prompts or responses after a request. That works when safety checks look at each request on its own. OpenAI says that as models take on longer tasks, serious risks can appear only **across multiple interactions**: someone repeatedly probing safeguards, coordinating across accounts, or an agent continuing to act after being told to stop. PSP is designed to catch those patterns **without** OpenAI staff seeing the content, so OpenAI can keep offering ZDR for frontier models.

## How ZDR with Private Safety Processing works

From OpenAI's developer guide:

1. **Selection:** an interaction (prompt plus response) is selected by a safety classifier referral or an approved sampling policy. OpenAI notes that a referral does **not** mean a policy violation.
2. **Encrypt and store in your cloud:** the record is encrypted and written to **your regional cloud storage** with a **30-day expiry**. OpenAI keeps only an index with metadata and a storage reference, not the content. This happens asynchronously, so it doesn't slow inference.
3. **Double encryption:** an inner layer (OpenAI-managed HPKE) means only the approved safety runtime can decrypt; an optional outer layer uses **your own key management (EKM)**. With EKM on, OpenAI's key alone can't decrypt a record, and revoking your key authorization blocks decryption.
4. **Automated review with no human access:** a **hardware-attested Safety Review Runtime**, which disables human access, decrypts and reviews records using an approved prompt and output format. Only bounded safety signals and operational metadata leave the runtime in plain text.
5. **What OpenAI sees:** a narrowly defined signal about the type of activity involved, not the content, even when something is flagged. You can choose to share details if you want to appeal or help an investigation.

## What customers must do

PSP is not a switch you flip. According to OpenAI, customers must:

- **Register and validate storage buckets** through OpenAI's admin API for each PSP-enabled project and data-residency region.
- **Keep encrypted records for at least 30 days**: storage lifecycle rules must not delete them early.
- **Maintain storage permissions and key access**, and fix configuration problems when OpenAI notifies you.
- **Respond to safety notices** and work with OpenAI to investigate.

OpenAI's help center has a getting-started article, and access is expanding in phases.

## Private Inference (preview)

The second part of Private Intelligence, **Private Inference**, combines confidential computing with "strict, verifiable controls" for the inference itself. OpenAI has only described it at a high level so far and is taking registrations of interest. OpenAI also says it is developing an option where content is stored on OpenAI infrastructure but encrypted with keys controlled by the customer.

## OpenAI PSP vs Anthropic EFS

| | OpenAI ZDR with PSP | Anthropic Enterprise Frontier Safeguards |
|---|---|---|
| **Announced** | Previewed 19 Aug 2026; rollout from 22 Sep 2026 | 1 Sep 2026; phased rollout from late 2026 |
| **Where monitoring data lives** | Customer-controlled cloud storage (30-day TTL) | Customer's own cloud account |
| **Who reviews flags** | Automated runtime; OpenAI gets bounded signals | Automated systems; alerts go to the customer's own reviewers |
| **Human review by the vendor** | No access to content | Not required |

The designs are strikingly similar. The practical differences will be in setup effort, which models and endpoints are covered, and contract terms, so compare the actual paperwork for your use case. See [Anthropic EFS explained](/blog/anthropic-enterprise-frontier-safeguards-explained).

## Practical advice for compliance teams

- **Get ZDR in your contract,** not just as a dashboard setting.
- **Budget engineering time** for bucket setup, key management and lifecycle rules. Treat it like any other security integration.
- **Keep doing client-side redaction** of obviously sensitive fields (card numbers, national IDs) where you can. Defense in depth still applies.
- **Check endpoint coverage:** OpenAI notes that endpoint and feature limitations in its data controls documentation still apply.

## Frequently asked questions

### Does ZDR with PSP mean nothing is stored?
OpenAI doesn't keep your prompts or responses. Selected interactions are stored encrypted in **your** cloud storage for 30 days so automated safety review can run.

### Can OpenAI employees read my flagged prompts?
OpenAI says no: decryption happens only inside a hardware-attested runtime that disables human access, and OpenAI receives only a limited safety signal.

### Is Private Inference available?
It is in preview. OpenAI is collecting registrations of interest.

## Sources

- OpenAI: [Offering Zero Data Retention for frontier models](https://openai.com/index/offering-zero-data-retention-for-frontier-models/) (19 August 2026, updated 22 September 2026)
- OpenAI Developers: [ZDR with Private Safety Processing](https://developers.openai.com/api/docs/guides/private-safety-processing)
- OpenAI Help Center: [Getting started with ZDR with Private Safety Processing](https://help.openai.com/en/articles/20001595-getting-started-with-zdr-with-private-safety-processing)
- OpenAI: [Register interest in OpenAI Private Intelligence](https://openai.com/form/private-intelligence-interest/)

Related on VNHAX: [ChatGPT Pro plans and Ultrafast](/blog/chatgpt-pro-plans-100-200-500-ultrafast) · [Shadow AI governance](/blog/shadow-ai-governance-auditing-securing-code-assistants)
