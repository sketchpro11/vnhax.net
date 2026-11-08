---
title: "xAI Grok Voice 3.0 API Teardown: $0.08/Min Pricing, 120s Voice Cloning & Fixing the -latest Alias Bug"
description: "Grok Voice 3.0 launched on 14 October 2026 at $0.08 per minute, and grok-voice-latest switched to it automatically. Benchmarks vs GPT-Live-1, why time to first audio rose from 0.70s to 0.81s, how to pin the model or set reasoning effort to none, and how custom voices from a 120-second clip work."
date: "2026-10-18"
updatedAt: "2026-10-18"
author: "Umar Hashmi"
category: "xAI & Grok Models"
tags: ["xai", "spacexai", "grok-voice-3", "voice-agent-api", "speech-to-speech", "voice-cloning", "realtime-api"]
---

> **Quick answer (checked 18 October 2026):** **Grok Voice 3.0** launched on **14 October 2026** in xAI's Voice Agent API at **$0.08 per minute ($4.80 per hour)**, the same price as Grok Voice 2.0. Any app using the **`grok-voice-latest`** alias was moved to 3.0 automatically. That's why some voice agents feel slower: on Artificial Analysis, average **time to first audio went from 0.70 s (2.0) to 0.81 s (3.0)**, and 3.0 runs with **reasoning effort `high` by default**. To control it, **pin `grok-voice-3.0`** instead of the alias, and set **`reasoning.effort` to `"none"`** for simple, latency-sensitive flows. Custom voices can be cloned from a reference clip of **up to 120 seconds**.

Here's a situation many voice-agent builders ran into this week. Nothing in your code changed. No deploy went out. But callers say your agent pauses a little longer before it speaks, and your latency dashboard agrees.

If your WebSocket URL ends in `?model=grok-voice-latest`, that's the explanation. On 14 October, xAI (now branded SpaceXSI) released Grok Voice 3.0 and pointed the alias at it. Its launch post says agents on the alias "have already been switched over automatically, with no changes needed".

For most apps that's an upgrade: 3.0 scores higher on almost every benchmark xAI published. But it's a slightly slower and smarter model by default, and an alias that changes under you is a production risk. This guide covers what changed, what it costs, and how to take back control.

A note on sources: everything here comes from xAI's launch post and developer docs and from Artificial Analysis's speech-to-speech leaderboard, all linked at the end. I haven't run my own latency tests on 3.0, so the figures are theirs.

## What Grok Voice 3.0 is

Grok Voice 3.0 is a **speech-to-speech** model. Audio goes in and audio comes out over one real-time connection, with no separate speech-to-text, LLM and text-to-speech steps chained together. It's built for voice agents: support lines, phone bots, in-app assistants.

According to xAI's launch post, it also powers Grok's voice mode, calls in Tesla vehicles and Starlink call centers.

Key facts from the docs:

| Item | Value |
|---|---|
| Model name | `grok-voice-3.0` |
| Alias | `grok-voice-latest` → `grok-voice-3.0` |
| Previous model | `grok-voice-2.0` (deprecated) |
| Endpoint | `wss://api.x.ai/v1/realtime?model=...` |
| Price | $0.08 per minute ($4.80 per hour), same as 2.0 |
| Tools | `web_search`, `x_search`, `file_search`, `mcp`, `function` |
| Reasoning effort | `"high"` (default) or `"none"` |
| API compatibility | Compatible with the OpenAI Realtime API specification |

xAI's docs say 3.0 uses **the same endpoint, session parameters and events** as 2.0. So migration is a one-word change, which is exactly why the automatic alias switch was possible.

## The benchmarks, read carefully

xAI's launch post compares Grok Voice 3.0 with its predecessor, OpenAI's GPT-Live-1 and Google's Gemini 3.8 Live. Most figures come from Artificial Analysis:

| Benchmark | Grok Voice 3.0 | Grok Voice 2.0 | GPT-Live-1 (Astra, Medium) | Gemini 3.8 Live (Ext. Thinking, High) |
|---|---|---|---|---|
| AA Speech-to-Speech Index | **86.9** | 81.3 | 83.2 | 82.6 |
| Big Bench Audio | **98.5%** | 97.2% | 90.1% | 97.7% |
| Speech Agent Arena (Elo) | **1070** | 1011 | 1048 | 990 |
| Task Success Rate | **94.8%** | 94.6% | 87.4% | 89.1% |
| Full Duplex Bench | **97.0%** | 95.1% | 94.9% | 91.9% |
| τ-Voice (agent tasks) | 71.6% | 56.5% | **74.5%** | 68.6% |

Two things stand out:

1. **The biggest jump is on agent tasks.** τ-Voice rose from 56.5% to 71.6%. That benchmark measures whether a voice agent completes real multi-step tasks, which is the thing most builders care about.
2. **It doesn't win everything.** GPT-Live-1 (Astra) still scores higher on τ-Voice, 74.5% vs 71.6%. xAI's argument is that it gets close with much lower latency.

xAI also lists **cost per task on Big Bench Audio**: $0.025 for Grok Voice 3.0, $0.030 for GPT-Live-1 (Astra, Medium) and $0.055 for GPT-Realtime-2.1 (High).

## The latency change: 0.70 s → 0.81 s

Artificial Analysis measures **time to first audio (TTFA)**, the average wait before the model starts speaking, on its Big Bench Audio set:

| Model | AA S2S Index | Time to first audio |
|---|---|---|
| Grok Voice 2.0 | 81.3 | **0.70 s** |
| Grok Voice 3.0 | **86.9** | 0.81 s |
| GPT-Live-1 (Sol, low) | 80.1 | 1.24 s |
| GPT-Live-1 (Astra, medium) | 83.2 | 1.34 s |
| Gemini 3.8 Live | 76.0 | 1.18 s |
| Gemini 3.8 Live Extended Thinking (High) | 82.6 | 1.35 s |

So both of these are true at once:

- Grok Voice 3.0 is **still faster than every OpenAI and Google model on the list**, which is the basis of xAI's "under one second" claim. On τ-Voice, xAI says it has 40% lower latency than GPT-Live-1 (Astra) at comparable accuracy.
- It's **about 0.11 s slower than Grok Voice 2.0** on average. If your agent was tuned around 2.0's timing, for example with tight barge-in or silence thresholds, you might notice.

The likely reason is the default reasoning setting. In the docs, `reasoning.effort` defaults to `"high"` and accepts only `"high"` or `"none"`. A model that thinks before it speaks takes a bit longer to start. xAI hasn't published a TTFA figure for 3.0 with reasoning set to `"none"`, so measure it yourself (step 4 below).

## Fix 1: pin the model version

Aliases are handy in development and risky in production. For anything customer-facing, use the versioned name:

```python
# Before: follows whatever xAI points the alias at
MODEL = "grok-voice-latest"

# After: stays on 3.0 until you decide to change it
MODEL = "grok-voice-3.0"

url = f"wss://api.x.ai/v1/realtime?model={MODEL}"
```

**Should you pin back to `grok-voice-2.0`?** Only as a short emergency measure. The docs mark 2.0 as **deprecated**. xAI hasn't published a shutdown date on the pages I checked, but deprecated models do get removed. Pinning 3.0 and tuning it is the long-term fix.

## Fix 2: turn reasoning off for simple flows

Many voice flows don't need the model to reason: confirming an appointment, reading an order status, routing a call. For those, send a `session.update` with reasoning off:

```json
{
  "type": "session.update",
  "session": {
    "instructions": "You are a short, friendly order-status assistant.",
    "voice": "eve",
    "reasoning": { "effort": "none" },
    "turn_detection": { "type": "server_vad" },
    "audio": {
      "input":  { "format": { "type": "audio/pcm", "rate": 24000 } },
      "output": { "format": { "type": "audio/pcm", "rate": 24000 } }
    }
  }
}
```

Keep `"high"` for flows where the agent has to work something out, such as troubleshooting, multi-step booking or anything with several tool calls. That's where 3.0's τ-Voice gain lives.

A practical pattern is to **decide per agent, not per app**. Your "reception" agent that routes calls can run with reasoning off, while your "support" agent keeps it on.

## Fix 3: retune your turn-taking

If you tuned silence and interruption timing for 2.0, revisit it:

- **`turn_detection.type: "server_vad"`** lets the server detect when the caller stops talking. Set it to `null` only if you manage turns yourself.
- **`turn_detection.idle_timeout_ms`** controls how long a session waits on silence (default `null`).
- **`audio.output.speed`** ranges from 0.7 to 1.5 (default 1.0). Slightly faster speech can make the whole exchange feel snappier, even when TTFA is unchanged.

## Step 4: measure your own latency

Don't rely on leaderboard averages. Your prompts, tools and network decide your real numbers. A minimal approach:

1. Record the time when the caller's turn ends (when VAD reports speech stopped, or when you commit the audio buffer).
2. Record the time when the first audio chunk of the response arrives.
3. The difference is your time to first audio. Log it per session with the model name and reasoning setting.
4. Run 50 calls with `reasoning.effort: "high"` and 50 with `"none"` on the same script, and compare the medians and the slowest 10%.
5. Check task success too. A faster agent that gets more answers wrong isn't an improvement.

## The pricing, worked out

At **$0.08 per minute**, the maths is simple:

| Usage | Cost |
|---|---|
| One 3-minute support call | $0.24 |
| 1,000 three-minute calls a day | $240 a day |
| One hour of continuous talk | $4.80 |

Because the price didn't change from 2.0, the upgrade doesn't change your bill directly. What can change it is **call length**: if 3.0 resolves tasks more often on the first try, calls get shorter and you pay less. If it talks longer, you pay more. Track average minutes per resolved call before and after.

## Custom voices from a 120-second clip

xAI's Custom Voices API lets you clone a voice from a reference recording and use it in the Voice Agent API by passing the returned `voice_id` as the `voice` value. The rules, from the docs:

- **Clip length:** up to **120 seconds**. Longer clips are rejected with a `400`. xAI recommends **90–120 seconds**.
- **Best format:** WAV (uncompressed PCM), 24 kHz, 16-bit, mono. MP3, FLAC, OGG, Opus, M4A, AAC, MKV and MP4 are accepted, but lossy formats can add artefacts.
- **Endpoint:** `POST /v1/custom-voices` as `multipart/form-data`, with the audio as `file`. There are matching list, get, update, download and delete endpoints.
- **Who can use the API:** creating voices through the API is limited to **Enterprise plans**. Other teams get a `403` and can create voices in the **console** instead, up to **30 free custom voices** per team.
- **Region:** Custom Voices is currently **only available in the United States, except Illinois**.

**Only clone voices you have the right to use.** That means your own, a voice actor's under contract, or a brand voice your company owns. Cloning someone's voice without their consent can break the law in many places, and it's an easy way to lose a customer's trust.

Tips for a good reference clip:

1. Record in a quiet room with a decent USB microphone, not a laptop mic.
2. Speak naturally, in the tone the agent will use: calm for support, upbeat for sales.
3. Avoid background music and long pauses.
4. Export as WAV, mono, 24 kHz.

## Keep your API key off the client

Browsers can't set WebSocket headers, and you should never ship your API key in front-end code anyway. xAI's answer is **ephemeral tokens**:

1. Your server calls `POST https://api.x.ai/v1/realtime/client_secrets` with your API key and a short expiry, for example `{"expires_after": {"seconds": 300}}`.
2. It passes the short-lived token to the browser or app.
3. The client connects with the token in the WebSocket protocol as `xai-client-secret.<token>`.

If the token leaks, it expires on its own in minutes.

## Migrating from OpenAI's Realtime API

xAI says the Voice Agent API is **compatible with the OpenAI Realtime API specification**, and its docs include migration examples for OpenAI SDK users. In practice, the main changes are the endpoint URL, the API key and the model name. Test tool calls and voice names carefully, though, since each provider has its own voices and tool options (`x_search` is xAI-specific, for example).

## Common mistakes to avoid

- **Running production on `-latest`.** Use `grok-voice-3.0` and upgrade on purpose.
- **Pinning `grok-voice-2.0` and forgetting.** It's deprecated. Treat it as a stopgap.
- **Leaving reasoning on everywhere.** Simple flows rarely need it, and it costs latency.
- **Judging the model on TTFA alone.** Check task success and call length too.
- **Uploading a noisy clip for a custom voice.** Garbage in, garbage voice out.
- **Putting the API key in the browser.** Use ephemeral tokens.
- **Cloning a voice without consent.** Get written permission first.

## Final thoughts

Grok Voice 3.0 is a real upgrade, especially for agents that have to finish tasks, and it costs the same as 2.0. The 0.11-second slowdown is small, and still well ahead of OpenAI's and Google's voice models on Artificial Analysis's numbers. What actually hurt some teams this week wasn't the model. It was finding out from their users that the alias had moved.

So pin your model, decide reasoning per agent, and measure your own latency. Then you choose when to upgrade, not the alias.

## Frequently asked questions

### How much does Grok Voice 3.0 cost?
$0.08 per minute ($4.80 per hour) in xAI's Voice Agent API, the same as Grok Voice 2.0.

### Why did my Grok voice agent get slower?
If you use `grok-voice-latest`, it moved to Grok Voice 3.0 on 14 October 2026. Artificial Analysis measures average time to first audio at 0.81 s for 3.0 vs 0.70 s for 2.0, and 3.0 defaults to high reasoning effort.

### How do I reduce Grok Voice 3.0 latency?
Set `reasoning.effort` to `"none"` in `session.update` for simple flows, pin `grok-voice-3.0`, and retune your turn detection. Measure time to first audio before and after.

### Is Grok Voice 3.0 better than GPT-Live-1?
On xAI's published numbers it scores higher on the AA Speech-to-Speech Index (86.9 vs 83.2), Big Bench Audio and task success, and starts speaking faster. GPT-Live-1 (Astra) scores higher on τ-Voice (74.5% vs 71.6%).

### How long can a Grok custom voice reference clip be?
Up to 120 seconds; xAI recommends 90–120 seconds of clean WAV audio at 24 kHz mono. Longer clips are rejected.

### Can I still use Grok Voice 2.0?
It's still listed but marked deprecated. Pin it only briefly while you test 3.0.

### Is the Grok Voice Agent API compatible with OpenAI's Realtime API?
xAI says it's compatible with the OpenAI Realtime API specification, and its docs include migration examples for OpenAI SDK users.

## Sources

- SpaceXSI (xAI): [Introducing Grok Voice 3.0](https://x.ai/news/grok-voice-3) (14 October 2026)
- xAI Docs: [Speech to Speech / Voice Agent API](https://docs.x.ai/developers/model-capabilities/audio/speech-to-speech)
- xAI Docs: [Custom Voices](https://docs.x.ai/developers/model-capabilities/audio/custom-voices)
- xAI Docs: [Ephemeral tokens](https://docs.x.ai/developers/model-capabilities/audio/ephemeral-tokens)
- Artificial Analysis: [Speech-to-Speech leaderboard](https://artificialanalysis.ai/speech-to-speech) (time to first audio)

Related on VNHAX: [What is SpaceXAI?](/blog/what-is-spacexai-xai-rebrand-orbital-intelligence) · [xAI roadmap: Grok 4.8 and 4.9](/blog/xai-roadmap-grok-4-8-grok-4-9-release-schedule) · [Grok 4.7 vs Grok 4.6](/blog/grok-4-7-vs-grok-4-6-comparison-benchmarks) · [ElevenLabs v4 emotive voice guide](/blog/elevenlabs-v4-emotive-voice-meta-tags-guide)
