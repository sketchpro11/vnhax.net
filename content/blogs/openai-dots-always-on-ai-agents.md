---
title: "OpenAI Dots Explained: What Are Always-On ChatGPT Agents and How to Use Them"
description: "OpenAI launched dots, always-on AI agents inside ChatGPT powered by GPT-6 Astra. Learn what they do, who can use them, app integrations, and architecture."
date: "2026-10-08"
updatedAt: "2026-10-08"
author: "Umar Hashmi"
category: "OpenAI & Models"
tags: ["openai", "openai-dots", "chatgpt", "gpt-6-astra", "always-on-agents", "developer-tools"]
---

> **Executive summary:** **OpenAI dots** are persistent, autonomous AI agents hosted natively inside ChatGPT. Unveiled at OpenAI DevDay on 29 September 2026, dots operate around the clock with dedicated cloud compute and browser sandboxes, executing multi-step goals, connecting with enterprise tools like Slack and Teams, and collaborating in multi-agent swarms.

At OpenAI DevDay 2026, OpenAI introduced **dots**: autonomous, persistent agents designed to bridge the gap between reactive conversational chatbots and proactive background coworkers. Instead of waiting for users to issue prompts, an OpenAI dot works continuously toward predefined objectives in its own sandboxed environment.

Here is an architectural teardown of how OpenAI dots function, who has access, and how developers and enterprise teams can configure them.

## What Are OpenAI Dots?

Traditionally, AI assistants operate strictly on request-response cycles: a user submits a query, the model generates an answer, and the session halts. OpenAI dots break this paradigm by introducing stateful persistence.

### Always-On Agents Inside ChatGPT
Each dot functions as an asynchronous background worker assigned to a specific goal. Rather than closing out when you close the tab, the agent continues evaluating inputs, monitoring external data streams, and running verification loops continuously.

### Powered by GPT-6 Astra
Dots are powered by **GPT-6 Astra**, OpenAI's high-efficiency flagship reasoning architecture. Astra provides the high-throughput planning, tool invocation, and self-correction necessary to sustain autonomous execution chains without hallucinating or drifting off-task over extended intervals.

## How Dots Work: Cloud Sandboxes and Tool Invocation

Each OpenAI dot is provisioned with a secure, ephemeral execution environment:

1. **Dedicated Cloud Computer and Headless Browser:** Every dot runs within an isolated microVM equipped with a secured web browser. This allows the dot to navigate web portals, interact with dynamic interfaces, verify rendered content, and retrieve information just as a human engineer or analyst would.
2. **Persistent Goal Tracking:** The agent maintains a persistent task tree. When a multi-step objective is assigned, the dot breaks it into discrete subtasks, verifies completion against expected test assertions, and resumes from checkpoints if an external API encounters rate limits.
3. **Continuous Background Execution:** A developer can assign a dot to monitor customer bug reports in GitHub, clone repositories, reproduce stack traces in sandboxes, and submit draft pull requests while the engineering team sleeps.

## Where You Can Use Dots

OpenAI has designed dots to meet users across their everyday desktop and workplace workflows:

- **ChatGPT Desktop, Mobile, and Web:** Directly inspect the real-time execution canvas, see subtask execution histories, and steer your dot in real time.
- **Enterprise Collaboration (Slack & Microsoft Teams):** Dots can be summoned into channels, tagged in threads, and granted permission to read tickets or summarize cross-functional incident updates.
- **Voice Calls & Unified Comms:** Users can call their dot directly via ChatGPT Voice to assign new goals or receive verbal progress briefings on ongoing long-running research tasks. Text-based SMS and webhook notifications are rolling out in subsequent updates.

## Apps and Enterprise Integrations

OpenAI dots connect natively to over 4,000 external enterprise and cloud applications via standardized API connectors:

| Integration Domain | Supported Platforms | Common Autonomous Workflows |
|---|---|---|
| **Issue Tracking & Code** | GitHub, GitLab, Jira | Triaging bugs, reproducing errors, generating candidate PRs |
| **Enterprise Chat** | Slack, Microsoft Teams | Providing status alerts, summarizing threads, answering team queries |
| **Productivity & Docs** | Google Workspace, Microsoft 365, Notion | Compiling daily briefs, syncing tables, verifying references |
| **Data & CRM** | Salesforce, HubSpot, Snowflake | Enriching leads, detecting pipeline anomalies, verifying metrics |

OpenAI is actively collaborating with Microsoft to integrate security guardrails directly with **Agent 365** governance controls, ensuring IT administrators maintain granular data-loss prevention (DLP) and audit logs over agent actions.

## Who Can Use OpenAI Dots Right Now?

OpenAI dots launched initially for **ChatGPT Pro** and **Business Premium** accounts in eligible geographic markets. Organizations with strict enterprise security policies can configure explicit OAuth scopes, restricting which internal tools individual dots may access.

Users begin with a primary named dot. Over time, OpenAI envisions organizations orchestrating coordinated **teams of dots**, where specialized agents for research, QA, and deployment communicate through structured message-passing protocols.

## Dots vs. Other AI Agents: Quick Landscape Comparison

| Feature | OpenAI Dots | Meta Muse | Google Gemini Spark |
|---|---|---|---|
| **Primary Strength** | Autonomous tool pipelines & code workflows | Social commerce, WhatsApp & Instagram ads | Collaborative documents & Google Workspace |
| **Execution Environment** | Sandboxed cloud VM + headless browser | Meta Graph API & messaging connectors | Google Cloud Run & Workspace backends |
| **Model Engine** | GPT-6 Astra | Llama 4 Commercial | Gemini 4 Argon |
| **Availability** | ChatGPT Pro & Business Premium | WhatsApp Business & Meta Suite | Google Workspace Enterprise |

## Frequently Asked Questions

### What is an OpenAI dot?
An OpenAI dot is an always-on, persistent AI agent within ChatGPT powered by GPT-6 Astra that works autonomously toward user goals in its own cloud computer and browser sandbox.

### Which ChatGPT plans have access to dots?
Dots are available to subscribers on ChatGPT Pro ($200 and Pro 500 tiers) and Business Premium enterprise accounts in supported regions.

### Can dots work inside Slack and Microsoft Teams?
Yes. Dots integrate with Slack and Microsoft Teams, allowing team members to mention the agent, assign tasks, and receive automated progress notifications.

## Conclusion

OpenAI dots represent a decisive architectural step from reactive generative text to autonomous, goal-directed agency. By equipping GPT-6 Astra with persistent memory, cloud execution sandboxes, and enterprise tool integration, dots transform ChatGPT from an occasional assistant into a continuous digital workforce.
