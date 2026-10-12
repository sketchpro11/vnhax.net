---
title: "How to Set Up GitHub Copilot Code Review: Automatic Reviews, Effort Levels and Costs"
description: "Step-by-step guide to GitHub Copilot code review in 2026: requesting reviews, turning on automatic reviews with rulesets, Lite vs Balanced effort, what a review costs, and how to keep humans in charge of approvals."
date: "2026-10-07"
updatedAt: "2026-10-12"
author: "Umar Hashmi"
category: "GitHub & Developer Tools"
tags: ["github", "github-copilot", "code-review", "pull-requests", "rulesets", "devops"]
---

> **Quick answer (checked 12 October 2026):** You can ask Copilot to review any pull request from the **Reviewers** menu, or have it review automatically by adding **"Automatically request Copilot code review"** to a **branch ruleset**. Reviews come in two effort levels: **Lite** (quick, routine changes) and **Balanced** (deeper analysis, now the **default** since 28 September 2026). GitHub estimates a review costs about **$0.05–$1 in AI credits on Lite** and **$0.25–$5 on Balanced**, plus GitHub Actions minutes. Copilot comments; it doesn't replace a human approval.

Copilot code review is GitHub's AI reviewer for pull requests. It reads the changes, leaves comments on specific lines and can suggest fixes you apply with a click. The feature has changed a lot this year, with effort levels, API support and a new default, so here is the current setup, based on GitHub's docs and changelog.

## Who can use it

Copilot code review is available on **Copilot Pro, Pro+, Max, Business and Enterprise**. On Business and Enterprise, your organization's Copilot policies decide whether it's enabled. Automatic review of your *own* pull requests isn't available for managed user accounts.

## Option 1: Ask for a review on a single PR

1. Open the pull request.
2. In the **Reviewers** section on the right, select **Copilot**.
3. Before requesting, you can pick the **effort level** for this review (Lite or Balanced). The choice applies to this review only.

Copilot posts a review with comments on the changed lines. Treat its suggestions like any reviewer's: read them, apply the good ones, dismiss the rest.

## Option 2: Automatic reviews for a repository (rulesets)

This is the setup most teams want: every new PR gets a Copilot review without anyone remembering to ask.

1. Go to the repository's **Settings → Rules → Rulesets**.
2. Click **New ruleset → New branch ruleset**, give it a name and set **Enforcement status** to **Active**.
3. Under **Target branches**, add your default branch (or all branches).
4. Under **Branch rules**, select **Automatically request Copilot code review**.
5. Optional: enable **Review new pushes** so Copilot re-reviews each push (otherwise it reviews once), and **Review draft pull requests** to get feedback before you ask a human.
6. Click **Create**.

Organizations can set the same rule at organization level so it applies across repositories.

## Option 3: Automatic reviews of your own PRs

If you want Copilot to review the pull requests **you** open, in any repository where it's available: **profile picture → Copilot settings → Code review**, then enable **Automatic Copilot code review** (and optionally *Review new pushes* and *Review draft pull requests*).

A PR can qualify through your personal setting, a repository ruleset or an organization ruleset. If several apply, Copilot still posts one review.

## Lite vs Balanced: which effort level?

| | Lite | Balanced |
|---|---|---|
| **What it does** | Quick, targeted feedback on common problems: bugs, security issues, style | Uses a higher-reasoning model for complex logic, security-sensitive code and cross-service changes |
| **Best for** | Routine, small changes | Larger, risky or sensitive changes |
| **Estimated AI credits per review** | ~$0.05–$1 | ~$0.25–$5 |
| **Default?** | No | **Yes**, since 28 September 2026 |

A third level, **Max**, shows as "coming soon" in settings. You can set the effort level at **enterprise, organization, repository or personal** level; each level overrides the one above it. Personal: *Copilot settings → Code review → Review effort level*.

**Tip:** if you have lots of small PRs (dependency bumps, copy changes), Balanced on everything gets expensive. Consider Lite as your repository default and switch to Balanced manually for risky PRs.

## What a review costs

GitHub explains that a review has two cost parts:

- **AI credits** for the model doing the review (the estimates above).
- **GitHub Actions minutes** for gathering context and running tools. Larger hosted runners cost more per minute, and **self-hosted runners don't use GitHub Actions minutes**.

You can see the Actions minutes used by Copilot code review runs in your usage data. On 8 October 2026 GitHub also added new organization billing options and controls for code review, worth checking if you manage a large org.

## Use the API (new)

Since 2 October 2026 you can request a Copilot review through the **REST and GraphQL APIs**, optionally setting the effort level per request. That lets you trigger reviews from your own scripts or internal tools, for example only for PRs that touch certain folders.

## Keep humans in charge of approvals

Copilot reviews don't count as an approving review, and they shouldn't. A setup that works well:

- **Require passing CI checks** (tests, lint, type-check) in the same ruleset.
- **Require at least one human approval**, and use **CODEOWNERS** so changes to sensitive paths (auth, billing, database migrations) need the right owner.
- Use Copilot as the **first reviewer**: it catches the obvious issues so human reviewers can focus on design and intent.

## Getting better reviews

- **Keep PRs small.** Like humans, AI reviewers do better on focused diffs than on 2,000-line changes.
- **Write a real PR description** saying what the change is meant to do, so the reviewer can check intent and not just syntax.
- **Add repository custom instructions** (for example in `.github/copilot-instructions.md`) describing your conventions, such as "all new endpoints need an integration test", so feedback matches your team's standards.


## Frequently asked questions

### Can Copilot approve and merge pull requests?
No. It leaves review comments and suggestions. Approvals and merges stay with your team and branch rules.

### How do I make Copilot review every PR automatically?
Create a branch ruleset with **Automatically request Copilot code review** enabled, and optionally **Review new pushes**.

### Why did my Copilot reviews get more expensive?
Since 28 September 2026 the default effort level is **Balanced**, which uses more AI credits than Lite. Explicit Lite selections were kept.

## Sources

- GitHub Docs: [Configuring code review by GitHub Copilot](https://docs.github.com/en/copilot/how-tos/copilot-on-github/set-up-copilot/configure-code-review)
- GitHub Docs: [About GitHub Copilot code review](https://docs.github.com/en/copilot/concepts/agents/code-review)
- GitHub Changelog: [Copilot code review: API support and new default effort level (2 October 2026)](https://github.blog/changelog/2026-10-02-copilot-code-review-api-support-and-new-default-effort-level/)
- GitHub Changelog: [Copilot code review effort levels are generally available (7 August 2026)](https://github.blog/changelog/2026-08-07-copilot-code-review-effort-levels-are-generally-available/)

Related on VNHAX: [Copilot upfront seat billing](/blog/github-copilot-prepaid-seats-upfront-billing-guide) · [GitHub Copilot local sandboxing](/blog/github-copilot-local-sandboxing-explained) · [HydraFusion vs Auto](/blog/github-copilot-project-hydrafusion-explained)
