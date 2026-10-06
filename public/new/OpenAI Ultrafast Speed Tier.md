---
title: "OpenAI Ultrafast Speed Tier: 300+ Tokens/sec Low-Latency Inference Explained"
short_title: "OpenAI Ultrafast Speed Tier"
slug: openai-ultrafast-speed-tier-explained
category: Developer Infrastructure
reading_time: 6 min read
tags: [openai-ultrafast, speculative-decoding, low-latency-ai, api-performance, realtime-voice]
meta_description: "OpenAI Ultrafast explained: what the speed tier is, how to enable it with service_tier, what it costs, and how to measure real tokens per second and time-to-first-token."
---

# OpenAI Ultrafast Speed Tier: 300+ Tokens/sec Low-Latency Inference Explained

> **Quick answer:** Ultrafast is OpenAI's fastest API service tier. You turn it on by setting `service_tier` to `ultrafast` on a supported model. OpenAI's docs describe it as up to 8x faster than Standard, and its August preview cited up to 14x and 750 output tokens per second for GPT-5.6 Sol, running on Cerebras hardware. It costs more than Standard, so use it only where waiting actually hurts.

Picture a voice assistant demo. You ask a question, and then there is a pause. Maybe two seconds. Nobody says anything, and the whole room quietly decides the product feels broken.

The model's answer was fine. The wait ruined it.

That gap between "smart" and "usable" is exactly what Ultrafast is aimed at. I'll walk through what it is, what is confirmed, what is not, and how to test it yourself before you pay for it.

**A note on sources:** this tier is new and changing quickly. Everything below comes from OpenAI's own announcement and docs plus press coverage, and I've linked them so you can check the current numbers. I have not benchmarked it myself, so where I give a test, it's a method for you to run, not a result I'm claiming.

---

## The Latency Bottleneck in Production AI Systems

Most teams hit the same wall. The prototype works, the quality is great, and then real users show up.

Three things pile up:

- **Time to first token (TTFT):** how long before anything appears on screen.
- **Tokens per second:** how fast the rest of the answer streams.
- **Chained calls:** an agent that makes ten tool calls pays the wait ten times.

That last one is the sneaky one. A single answer that takes eight seconds is annoying. An agent loop that takes eight seconds per step, across fifteen steps, is a coffee break.

Until now the usual fix was to switch to a smaller model. You got speed and gave up some intelligence. OpenAI's pitch for Ultrafast is that you no longer have to pick one: keep the frontier model, change how it is served.

---

## What Is OpenAI Ultrafast? Under the Hood Speculative Decoding

Ultrafast is a **service tier**, not a new model. You are running the same model on a faster serving path and paying more for it.

Here is what OpenAI has said publicly:

- On **August 13**, OpenAI previewed Ultrafast for GPT-5.6 Sol as a limited-access API tier, citing up to **14x** Standard speed and up to **750 output tokens per second**, powered by Cerebras hardware.
- At **DevDay on September 29**, a presenter described Ultrafast as eight times Standard speed and said it would extend to the API, ChatGPT and Codex.
- The current API docs call it the fastest tier, "up to 8x faster" than Standard, broadly available for **GPT-6 Astra** at low rate limits, with preview access for GPT-5.6 Sol.

### About speculative decoding

You'll see speculative decoding mentioned whenever people explain fast inference, so here is the plain version. A small, cheap "draft" model guesses the next several tokens. The big model checks those guesses in one pass and keeps the ones that are right. When the guesses are good, you get several tokens for the price of one big-model step.

It's a real and widely used technique. But I could not find OpenAI saying that speculative decoding is what powers Ultrafast. What OpenAI has attributed the speed to is Cerebras hardware. So treat speculative decoding as background knowledge about how fast inference works in general, not as a confirmed description of this tier.

The same goes for the idea of Blackwell clusters. The public statements point to Cerebras, not Blackwell.

---

## TTFT Benchmarks: Standard Tier vs. Turbo vs. Ultrafast

Let's be straight about what is and isn't published.

| Tier | What OpenAI says publicly |
|---|---|
| Standard | The baseline everything else is compared against |
| Fast | Up to about 2.5x Standard speed on supported API workloads, per OpenAI's Fast mode docs |
| Ultrafast | Up to 8x per the docs; up to 14x and 750 tokens/sec in the GPT-5.6 Sol preview announcement |

I'm not listing a "Turbo" row because I couldn't find a current OpenAI tier by that name. If you've seen it somewhere, check which product it refers to before relying on it.

**On time to first token:** I did not find an official sub-50ms TTFT figure. The published claims are about output speed (tokens per second), not first-token latency. If someone gives you a precise TTFT number for Ultrafast, ask where it came from.

Also worth knowing: the 14x figure is OpenAI measuring against its own Standard tier, and speed depends on conditions. Fast mode docs note that traffic ramping up too quickly may be served at Standard speed instead. Expect variation.

### Measure it yourself

This is the habit I'd push hardest. Run the same prompt on Standard and Ultrafast, a few dozen times, and record two numbers: time to first token and total time. Here's a simple way to do it:

```python
import time
from openai import OpenAI

client = OpenAI()

def timed_run(tier):
    start = time.perf_counter()
    first = None
    chars = 0
    stream = client.responses.create(
        model="gpt-6-astra",
        input="Explain what a mutex is in about 150 words.",
        service_tier=tier,
        stream=True,
    )
    for event in stream:
        if event.type == "response.output_text.delta":
            if first is None:
                first = time.perf_counter() - start
            chars += len(event.delta)
    total = time.perf_counter() - start
    return first, total, chars

for tier in ("default", "ultrafast"):
    print(tier, timed_run(tier))
```

Check the parameter names against the current docs, since they can shift. Run it from the region where your servers live, not your laptop on café Wi-Fi, because network time will otherwise swamp the difference.

---

## How to Enable Ultrafast via the OpenAI Node & Python SDKs

The docs make this pretty simple. Per OpenAI's Ultrafast guide, you set the model to `gpt-6-astra` and `service_tier` to `ultrafast`.

**Step 1: Check your access.** Ultrafast for GPT-6 Astra is available to all API users at low rate limits. GPT-5.6 Sol is preview-only, and you'd go through your OpenAI account team.

**Step 2: Update the SDK.** For WebSockets in Python, the docs say to install `openai[realtime]`:

```bash
pip install --upgrade "openai[realtime]"
```

**Step 3: Make a request.** Ultrafast works over plain HTTP through the SDK:

```python
from openai import OpenAI

client = OpenAI()

response = client.responses.create(
    model="gpt-6-astra",
    input="Summarise this support ticket in two sentences.",
    service_tier="ultrafast",
)
print(response.output_text)
```

**Step 4: Consider WebSockets for agents.** OpenAI strongly recommends WebSockets, especially for agentic apps that fire many tool calls in quick succession. Reusing one connection across turns avoids paying setup cost each time, which matters more when the model itself is fast.

**Step 5: Watch your limits.** Default Ultrafast token limits for GPT-6 Astra are 1,000,000 tokens per minute at API usage Tier 4 and 5,000,000 at Tier 5. Below that, you'll need to ask.

One more constraint: Ultrafast supports **US data residency and global processing only**. If you have regional residency requirements, that may rule it out.

---

## Pricing Tiers & Provisioned Throughput (PTU) Requirements

Two clarifications here, because the heading can mislead.

**Pricing:** Ultrafast costs more than Standard, and OpenAI says to use it "when speed justifies the higher cost." The exact input, cached input, cache write, and output prices are on OpenAI's pricing page, so I won't quote numbers that may be out of date. For reference, a recent report listed Standard GPT-5.6 Sol at $5 per million input tokens and $30 per million output tokens; Ultrafast is priced above that.

**PTU:** "Provisioned Throughput Units" is terminology you'll mostly see on other platforms. In the OpenAI docs I found, Ultrafast access is governed by **usage tier and rate limits**, not a PTU purchase. If you need guaranteed capacity beyond those limits, that's a conversation with your OpenAI account team.

A rough way to decide whether it's worth it:

1. Find the step where users wait the most.
2. Put a dollar or conversion value on shaving that wait.
3. Run Ultrafast only on that path, and leave everything else on Standard.

---

## Where Ultrafast Makes Sense (and Where It Doesn't)

**Good fits:**

- **Voice assistants.** Pauses feel unnatural, and speech pipelines have several steps that each add delay.
- **In-IDE suggestions.** If the suggestion arrives after you've moved on, it's worthless.
- **Incident response and security triage.** OpenAI says staff using it dropped some security investigations from hours to about ten minutes.
- **Finance and support workflows.** OpenAI named Jane Street, Podium, Basis and Rogo among early testers.

**Weak fits:**

- Overnight batch jobs. Nobody is waiting, so don't pay for speed.
- Long-running research where answer quality matters far more than latency.
- Anything with strict non-US data residency.

---

## Common Mistakes to Avoid

**Switching it on everywhere.** The cost adds up fast. Route only latency-critical calls.

**Trusting headline multipliers.** "14x" and "8x" are best-case figures from the vendor. Measure your own prompts.

**Ignoring the network.** If your app is far from the API region, the extra speed gets eaten by round trips.

**Forgetting rate limits.** Ultrafast limits are separate and lower to start. A launch-day traffic spike can push you back to slower service or errors.

**Skipping streaming.** Even a fast model feels slow if you wait for the whole answer before showing anything.

---

## Final Thoughts

The interesting part of Ultrafast isn't the number. It's that speed is becoming something you choose per request, the way you'd choose a shipping option. Fast and cheap for background work, fast and expensive for the one moment a human is staring at the screen.

Test it on your hardest latency problem first. If the improvement is noticeable to users, keep it there. If it isn't, you've saved yourself a bill.

For the privacy side of the same DevDay announcements, see [OpenAI Private Intelligence](/openai-private-intelligence-guide). For the primary sources, read OpenAI's [Ultrafast mode guide](https://developers.openai.com/api/docs/guides/ultrafast-mode) and the [original preview announcement](https://openai.com/index/previewing-ultrafast/).

---

## FAQs

### What is OpenAI Ultrafast?
Ultrafast is OpenAI's fastest API service tier. It serves a supported model on a faster path, so you get the same model with quicker output at a higher price.

### How fast is OpenAI Ultrafast?
OpenAI's docs say up to 8x faster than Standard. The August preview for GPT-5.6 Sol cited up to 14x and up to 750 output tokens per second. Real speed varies with load and your setup.

### How do I turn on Ultrafast?
Set `service_tier` to `ultrafast` and use a supported model such as `gpt-6-astra`. It works over HTTP through the SDK, and OpenAI recommends WebSockets for agent workloads.

### Which models support Ultrafast?
GPT-6 Astra is broadly available at low rate limits. GPT-5.6 Sol is in preview access through OpenAI account teams.

### What hardware powers Ultrafast?
OpenAI and Cerebras say Cerebras hardware powers the tier.

### Does Ultrafast guarantee sub-50ms time to first token?
No such guarantee appears in the public materials I found. The published claims focus on output tokens per second, so measure TTFT yourself.

### Does Ultrafast use speculative decoding?
OpenAI hasn't said so publicly. Speculative decoding is a general fast-inference technique, but it isn't confirmed as part of this tier.

### Is Ultrafast more expensive than Standard?
Yes. OpenAI says to use it when speed justifies the higher cost. Check the pricing page for current rates.

### Are there regional limits?
Yes. Ultrafast supports US data residency and global processing only.

### Do I need Provisioned Throughput Units (PTU)?
Not according to the OpenAI docs I found. Access is governed by usage tier and rate limits.
