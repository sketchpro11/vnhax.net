---
title: "Meta Muse AI Agent Explained: What It Does, How It Stays Safe, Price and Availability"
description: "Meta Muse is a personal AI agent that sends emails, books travel, fills in forms and buys things for you from its own cloud computer. How it works, the Sentinel and Secure VM safeguards, pricing, availability and sensible guardrails."
date: "2026-10-07"
updatedAt: "2026-10-12"
author: "Umar Hashmi"
category: "Meta & Llama Ecosystem"
tags: ["meta", "meta-muse", "ai-agents", "personal-ai", "whatsapp", "agent-security"]
---

> **Quick answer (checked 12 October 2026):** **Muse** is Meta's personal AI agent, launched on **8 September 2026**. Instead of only answering questions, it can **send emails, book travel, open websites, fill in forms, negotiate and complete purchases** for you, and it keeps working after you close the app. It runs in its own isolated cloud computer (**Muse Secure VM**), a separate system called **Sentinel** checks its planned actions, and payments go through **Link by Stripe** with one-time cards. At launch it is **US-only**, with a **free tier** and paid plans reported at **$20 and $100 a month**.

Muse is Meta's answer to "agent" products like OpenAI's Dots: an assistant you give a goal to, not just a question. It runs on Meta's new Muse Spark model family from Meta Superintelligence Labs. Below is what has been confirmed in Meta's launch and the press coverage (linked at the end), plus my practical advice on using any agent like this safely.

## What Muse can do

According to launch coverage, Muse can:

- **Send emails and messages** on your behalf
- **Book travel** and make reservations
- **Browse websites and fill out forms**
- **Negotiate** (for example, with a seller) and **complete a checkout**
- **Keep working in the background** after you close the app, then report back

You approve critical actions, such as sending an email or making a purchase, before they happen.

## How it works: Secure VM and Sentinel

Meta's design rests on two pieces:

1. **Muse Secure VM:** each user's agent runs in a dedicated cloud virtual machine that holds the agent, your connected data and your credentials in an isolated environment.
2. **Sentinel:** a separate component that reviews the actions Muse wants to take on the internet. It can **block** an action or **ask for your approval** first. Reports say it runs isolated from Muse at the system level.

Meta says Muse can't directly see your passwords or payment information. A planned **Muse Confidential VM**, where the virtual machine and its data are encrypted with a key only you hold, is expected later in 2026.

## Payments: Link by Stripe

Purchases go through **Link**, Stripe's wallet. For agent purchases, Link can generate a **one-time-use card** so your real card number isn't exposed to the website, or to Muse.

## Where you can use Muse and what it costs

- **Availability:** US only at launch, on iOS, Android and the web. Reports differ on WhatsApp: some say you can use Muse inside WhatsApp, others that WhatsApp integration is coming later. Support for Meta's AI glasses is planned without a date.
- **Price:** a **free tier**, plus subscriptions reported at **$20/month and $100/month** for heavier use. Meta's separate Meta One bundles cover higher limits for Meta AI image and video tools; see [Meta One explained](/blog/meta-one-subscription-core-vs-premium-comparison).

Muse isn't available where I live yet, so I haven't been able to use it myself. This is an explainer based on Meta's launch details as reported.

## Guardrails I'd use with any personal agent

Muse's design has sensible safety layers, but an agent that can spend money and send messages in your name still deserves your own rules:

- **Start with low-stakes tasks.** Research, drafting and comparisons before purchases and emails.
- **Keep approvals on** for payments and outgoing messages. Read what you approve; don't tap "OK" on autopilot.
- **Connect only the accounts it needs.** Every connected inbox or app widens what a mistake or a malicious web page could reach.
- **Use spending limits** on the payment method connected to the agent.
- **Watch for prompt injection.** Web pages and emails the agent reads can contain hidden instructions. If Muse suddenly wants to do something you didn't ask for, stop and check.
- **Review the activity log** after background tasks, especially early on.

## Muse vs OpenAI Dots

| | Meta Muse | OpenAI Dots |
|---|---|---|
| **Launched** | 8 September 2026 | 29 September 2026 (DevDay) |
| **Runs on** | Its own cloud VM (Muse Secure VM) | Its own cloud computer and browser |
| **Who gets it** | US consumers; free tier + paid plans | ChatGPT Pro and Business Premium (outside the EEA, UK and Switzerland for Pro) |
| **Safety layer** | Sentinel reviews actions | User sets what each dot may do on its own |

More on Dots: [OpenAI Dots: always-on agents and workflows](/blog/openai-gpt-dots-cloud-agents-workflow-guide).

## Frequently asked questions

### Is Meta Muse free?
There is a free tier. Paid plans have been reported at $20 and $100 a month for more usage.

### Can I use Muse outside the US?
Not at launch. Meta hasn't announced dates for other countries.

### Can Muse see my card number or passwords?
Meta says no. Payments go through Link by Stripe, which can issue a one-time card for each purchase.

## Sources

- Axios: [Meta debuts Muse, its long-planned personal AI agent](https://www.axios.com/2026/09/08/meta-debuts-muse-personal-ai-agent) (8 September 2026)
- The Paypers: [Meta launches personal AI agent with Stripe-powered checkout](https://thepaypers.com/payments/news/meta-launches-personal-ai-agent-with-stripe-powered-checkout)
- PPC Land: [Meta puts an AI agent that buys things inside WhatsApp, US only](https://ppc.land/meta-puts-an-ai-agent-that-buys-things-inside-whatsapp-us-only/)
- YourStory: [Meta's Muse is a personal AI agent that can carry out tasks on a user's behalf](https://yourstory.com/ai-story/meta-muse-personal-ai-agent-can-carry-out-tasks-on-users-behalf)

Related on VNHAX: [Meta One subscriptions explained](/blog/meta-one-subscription-core-vs-premium-comparison) · [Real-time web data for AI agents](/blog/real-time-web-data-for-ai-agents-without-api-bill)
