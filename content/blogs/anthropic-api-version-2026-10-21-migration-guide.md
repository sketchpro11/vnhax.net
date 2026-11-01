---
title: "Anthropic API Version 2026-10-21: What Breaks and How to Migrate Safely"
description: "Anthropic's new API version 2026-10-21 and the new SDK majors (Python 2.0.0, TypeScript 1.0.0 and more) remove temperature, top_p and top_k, change how API keys are sent, and split MessageParam by role. What breaks, who is affected, and a step-by-step upgrade plan."
date: "2026-11-02"
updatedAt: "2026-11-02"
author: "Umar Hashmi"
category: "Anthropic & Claude Models"
tags: ["anthropic", "claude-api", "api-migration", "anthropic-sdk", "python", "typescript", "breaking-changes"]
---

> **Quick answer (checked 2 November 2026):** On **21 October 2026** Anthropic released **API version `2026-10-21`** and new SDK major versions that send it by default: **Python 2.0.0, TypeScript 1.0.0, C# 13.0.0, Go 2.0.0, Java 3.0.0, PHP 1.0.0, Ruby 2.0.0** and the **`ant` CLI 2.0.0**. The biggest API change: **`temperature`, `top_p` and `top_k` are removed**, and sending any of them returns a **400 error**. The SDKs also now send your key as **`Authorization: Bearer`** instead of `X-Api-Key`, which can break proxies. Your existing code keeps working as long as you **stay on your current SDK major version**, so upgrade on purpose, not by accident.

Here's the kind of morning this release can cause. Your Claude integration has worked for months. Someone on the team runs a routine dependency update, the `anthropic` package jumps to 2.0.0, and suddenly a batch job fails with 400 errors on every request. Nothing in your code changed. The SDK did.

The cause is almost always one line: a `temperature=0.2` someone added a year ago for "more consistent output". Under the new API version, that parameter no longer exists.

This guide walks through what changed, who is actually affected, and a safe order to upgrade. Everything is based on Anthropic's release notes and migration guide, linked at the end. I'll quote the docs where precision matters, because migration details are exactly where a paraphrase can mislead you.

## What Anthropic released on 21 October

Two related things shipped together:

1. **A new API version, `2026-10-21`.** You choose it with the `anthropic-version` request header. The previous version, `2023-06-01`, has been the default for over three years.
2. **New major versions of every official SDK**, plus the `ant` CLI. These send `2026-10-21` by default, and they also include **SDK-only breaking changes** that have nothing to do with the API version.

| SDK / tool | First version that sends `2026-10-21` |
|---|---|
| Python (`anthropic`) | 2.0.0 |
| TypeScript (`@anthropic-ai/sdk`) | 1.0.0 |
| C# (`Anthropic`) | 13.0.0 |
| Go | 2.0.0 (module path ends in `/v2`) |
| Java | 3.0.0 |
| PHP | 1.0.0 |
| Ruby | 2.0.0 |
| `ant` CLI | 2.0.0 |

One more detail worth noting for compliance teams: the new SDK and CLI versions are licensed under **Apache 2.0** instead of MIT. No code changes are needed for that, but update your dependency licence records.

**Will my current code stop working?** Not by itself. Anthropic's versioning page says that for a given API version it preserves existing input and output parameters. Earlier SDK versions keep sending `2023-06-01`. The migration guide doesn't announce a shutdown date for `2023-06-01`. The risk is an **unplanned upgrade**: a lockfile refresh, a new project scaffold, or a CI image that installs "latest".

## The API-level breaking changes

These apply to the Messages API, token counting, and every request in a Message Batch created with `2026-10-21`.

### 1. `temperature`, `top_p` and `top_k` are removed

This is the one most people will hit. In Anthropic's words, a request that sends any of them "returns a 400 error, even at the parameter's default value."

So even `temperature=1.0`, which is the default, now fails. You have to delete the parameter, not just change it.

What does that mean for output quality? It depends on the model:

- **Claude 4.7 and later models** already accept only the defaults, so they sample exactly as before.
- **Older models that accept other values**, such as Claude Sonnet 4.6, lose the effect of a lowered temperature. Anthropic notes plainly: "No other setting replaces it."

If a workflow genuinely depends on a low temperature with an older model, the docs give you two options: stop sending the parameter and accept default sampling, or keep that particular request on `2023-06-01`.

### 2. `document` blocks in assistant messages return an error

If you place a `document` block **directly** in an `assistant` message, `2026-10-21` returns a 400. Move documents to `user` messages. A document nested inside another block, such as a web fetch tool result that Claude returned, is still accepted.

### 3. Citations in user messages return an error

If you send a `text` block with a non-empty `citations` array in a **`user`** message, including inside `search_result` blocks, you get a 400. Remove `citations` from those blocks. Citations in **assistant** messages (Claude's earlier replies you send back) are still fine, and so is `"citations": {"enabled": true}` on documents and search results.

### 4. Admin and Analytics API field renames

If you read Admin API or Claude Enterprise Analytics API responses, the old field names are gone:

| Endpoint | Old field | New field |
|---|---|---|
| RBAC groups | `roles` | `role_ids` |
| RBAC group members | `group_id` | `rbac_group_id` |
| RBAC roles | `name` | `display_name` |
| Org and workspace rate limits | `group_type` | `group.type` |
| API keys | `workspace_id` | `scope` (see below) |
| Per-user usage and cost reports | `actor.email` | `actor.email_address` |
| Activity summaries | `summaries` | `data` |

The API key change is subtle. Under `2023-06-01`, `workspace_id` was `null` both for keys in the Default Workspace and for all-workspaces keys. Under `2026-10-21`, read `scope`: a workspace-bound key (including the Default Workspace) has `scope.workspace_id` set to the real ID, and an all-workspaces key has `{"type": "organization"}`. If your code treated `null` as "Default Workspace", it needs an update.

## The SDK changes that bite even without the API change

These come with the new SDK majors regardless of API version.

### Your API key now goes in `Authorization: Bearer`

The SDKs and CLI now send your key as `Authorization: Bearer <key>` instead of `X-Api-Key`. The Claude API accepts either, so direct calls keep working. What breaks is anything **in between**:

- an internal LLM gateway or proxy that reads `X-Api-Key`
- middleware that redacts or logs `X-Api-Key`
- test stubs that assert on that header

This is the change I'd check first in any company setup, because the failure shows up in infrastructure you might not own. Anthropic's guide shows how to move the key back to `X-Api-Key` if you must. In TypeScript, for example:

```typescript
const client = new Anthropic({
  apiKey,
  defaultHeaders: { "X-Api-Key": apiKey, Authorization: null },
});
```

The better long-term fix is to update the gateway to read `Authorization`.

### One credential per client

A client now holds **one** credential. In Python, passing two of `api_key`, `auth_token`, `credentials`, `config` or `profile` raises a `ValueError`. In TypeScript it throws a `TypeError`. If you relied on sending a gateway token plus an API key, the docs suggest passing the token as the auth credential and setting `X-Api-Key` in default headers, then having the gateway strip its `Authorization` header before forwarding.

### `MessageParam` is split by role

`MessageParam` is now a union of `UserMessageParam`, `AssistantMessageParam` and `SystemMessageParam`. Most code needs no change, because a dict or object literal with a fixed role still type-checks. Two patterns do break:

**Python:** calling `MessageParam(...)` like a constructor now raises a `TypeError`. Write a dict instead:

```python
# Before
message = MessageParam(role="user", content="Hello")

# After
message: MessageParam = {"role": "user", "content": "Hello"}
```

**TypeScript:** an interface can't extend a union any more:

```typescript
// Before
interface StoredMessage extends Anthropic.MessageParam { id: string }

// After
type StoredMessage = Anthropic.MessageParam & { id: string };
```

### Smaller removals

- **Text Completions** is removed from the TypeScript, Go, Java and Ruby SDKs and the CLI. Use the Messages API.
- **`betas` on non-beta Models methods** is gone. Call `client.beta.models.list(betas=[...])` instead.
- **TypeScript and Ruby:** client-side compaction is removed from the tool runner, in favour of server-side compaction.
- **CLI:** `--api-key` and `--auth-token` flags are removed. Use `ANTHROPIC_API_KEY`, `--api-key-stdin` or `ant auth login`.
- **Go:** version 1.25 or later is required, and the module path ends in `/v2`.

## A safe upgrade plan, step by step

Here's the order I'd follow for a production service.

**Step 1: Pin your current version today.** Before anything else, make sure no one upgrades by accident. In `requirements.txt` use `anthropic<2`, and in `package.json` use `"@anthropic-ai/sdk": "<1.0.0"`. Commit your lockfile too. This buys you time.

**Step 2: Search your code for the removed parameters.**

```bash
grep -rnE "temperature|top_p|top_k" --include=*.py --include=*.ts --include=*.js .
```

Note every hit and which model it's used with. If it's Claude 4.7 or later, removing it changes nothing about the output.

**Step 3: Check everything between your app and the API.** Ask whoever owns your proxy, gateway or logging middleware whether it reads `X-Api-Key`. Fix it to accept `Authorization: Bearer` before you upgrade.

**Step 4: Search for the other patterns.** Look for `MessageParam(` calls in Python, interfaces extending `MessageParam` in TypeScript, `document` blocks in assistant turns, `citations` in user turns, and any Admin API field names from the table above.

**Step 5: Upgrade in a branch and run your tests.** Install the new major version, fix type errors, and run your full test suite against the real API in a staging environment.

**Step 6: Compare outputs on a sample.** For prompts where you removed a non-default `temperature` on an older model, run 20–30 real inputs through old and new and compare. If quality drops, keep that request on `2023-06-01` for now and plan a move to a newer model.

**Step 7: Roll out gradually.** Deploy to a small share of traffic first and watch 400 errors in your logs before going to 100%.

## Real examples: who is affected and who isn't

- **A chatbot on Claude Sonnet 5.5 with no sampling parameters:** almost certainly fine. Upgrade the SDK, run tests, done.
- **A data-extraction pipeline that sets `temperature=0`:** affected. Remove the parameter. On Claude 4.7 and later, output behaviour doesn't change, because those models already only accept the default.
- **A company using an internal LLM gateway:** check the gateway first. The `Authorization: Bearer` change is the most likely surprise.
- **An admin dashboard reading API key `workspace_id`:** affected by the `scope` change.
- **A team on a raw HTTP client that never sets `anthropic-version: 2026-10-21`:** unaffected until you change the header.

## Common mistakes to avoid

- **Letting CI install "latest".** Pin major versions so a release can't change behaviour overnight.
- **Changing `temperature` to `1.0` instead of deleting it.** Even the default value returns a 400 under `2026-10-21`.
- **Forgetting the platform packages.** In TypeScript, `@anthropic-ai/bedrock-sdk`, `vertex-sdk`, `foundry-sdk`, `aws-sdk` and `google-cloud-sdk` v1 need `@anthropic-ai/sdk` v1. Upgrade them together, or you'll end up with two copies of the core SDK.
- **Using the old Go install path.** Without `/v2`, `go install` quietly keeps installing the latest v1 CLI.
- **Assuming the proxy is fine because direct calls work.** The API accepts both headers; your gateway might not.
- **Skipping the output comparison.** If you removed a non-default temperature on an older model, check that the results are still good enough.

## Final thoughts

This is a cleanup release, not a crisis. Most modern Claude code, on recent models with default sampling, will upgrade with little more than a version bump. The pain is concentrated in three places: old `temperature` settings, proxies that read `X-Api-Key`, and code that treats `MessageParam` as a class.

Pin your versions now, check those three things, and upgrade in a branch with tests. If you're also tidying up costs while you're in there, see [how to cut AI coding agent costs](/blog/how-to-cut-ai-coding-agent-api-costs-token-proxies) and the [Claude Haiku 5.5 vs GPT-6.1 Sol cost comparison](/blog/claude-haiku-5-5-vs-gpt-6-1-sol-token-cost-coding-agents).

## Frequently asked questions

### What changed in Anthropic API version 2026-10-21?
The Messages API removes `temperature`, `top_p` and `top_k` (any of them returns a 400), rejects `document` blocks directly in assistant messages and `citations` in user messages, and several Admin and Analytics API fields are renamed.

### Will my existing Claude integration break?
Not unless you upgrade. Earlier SDK versions keep sending `2023-06-01`. The new majors (Python 2.0.0, TypeScript 1.0.0 and others) send `2026-10-21` by default.

### How do I keep using temperature with Claude?
Under `2026-10-21` you can't. Requests that need a non-default temperature can stay on `2023-06-01`. On Claude 4.7 and later models, only the default sampling is accepted anyway, so removing the parameter changes nothing.

### Why does my proxy reject requests after upgrading the Anthropic SDK?
The new SDKs send the API key as `Authorization: Bearer <key>` instead of `X-Api-Key`. Update the proxy to read `Authorization`, or set `X-Api-Key` yourself in the client's default headers.

### Which Anthropic SDK versions use the new API version?
Python 2.0.0, TypeScript 1.0.0, C# 13.0.0, Go 2.0.0, Java 3.0.0, PHP 1.0.0, Ruby 2.0.0 and the `ant` CLI 2.0.0.

### How do I set the API version without an SDK?
Send the header `anthropic-version: 2026-10-21` with each request.

### Did the Anthropic SDK license change?
Yes. The new major versions are licensed under Apache 2.0; earlier versions remain under MIT.

## Sources

- Claude Platform Docs: [Migrating to API version 2026-10-21](https://platform.claude.com/docs/en/api/migration-2026-10-21)
- Claude Platform Docs: [Release notes](https://platform.claude.com/docs/en/release-notes/overview) (21 October 2026)
- Claude Platform Docs: [API versions](https://platform.claude.com/docs/en/api/versioning)

Related on VNHAX: [Claude Haiku 5.5 vs GPT-6.1 Sol](/blog/claude-haiku-5-5-vs-gpt-6-1-sol-token-cost-coding-agents) · [Claude Sonnet 4.5 retirement schedule](/blog/claude-sonnet-4-5-retirement-end-of-life-schedule) · [Claude Opus 5.5 vs Claude Fable 5.1](/blog/claude-opus-5-5-vs-claude-fable-5-1-comparison) · [Anthropic hub](/anthropic)
