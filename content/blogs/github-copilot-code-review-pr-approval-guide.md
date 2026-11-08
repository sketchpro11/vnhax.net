---
title: "How to Set Up GitHub Copilot Code Review: Automatic Reviews, Effort Levels and Costs"
description: "Step-by-step guide to GitHub Copilot code review: requesting reviews, automatic reviews with rulesets, Lite vs Balanced vs Max effort, what a review costs, and how Copilot approvals work and when to turn them on."
date: "2026-10-07"
updatedAt: "2026-11-08"
author: "Umar Hashmi"
category: "GitHub & Developer Tools"
tags: ["github", "github-copilot", "code-review", "pull-requests", "rulesets", "devops"]
---

> **Quick answer (checked 8 November 2026):** You can ask Copilot to review any pull request from the **Reviewers** menu, or have it review automatically by adding **"Automatically request Copilot code review"** to a **branch ruleset**. There are three effort levels: **Lite** (about $0.25 per review on average), **Balanced** (the **default**, about $1.50) and **Max** (public preview since 28 October 2026, about $10), plus GitHub Actions minutes. Since 28 October, **Copilot approvals** are generally available: if an admin turns them on, Copilot's approval can count toward required approvals. They are off by default.

Copilot code review is GitHub's AI reviewer for pull requests. It reads the changes, leaves comments on specific lines and can suggest fixes you apply with a click. The feature has changed a lot this year, with effort levels, API support, a new default and now approvals, so here is the current setup, based on GitHub's docs and changelog.

## Who can use it

Copilot code review is available on **Copilot Pro, Pro+, Max, Business and Enterprise**; Copilot Free doesn't include it. On Business and Enterprise, your organization's Copilot policies decide whether it's enabled. Automatic review of your *own* pull requests isn't available for managed user accounts.

## Option 1: Ask for a review on a single PR

1. Open the pull request.
2. In the **Reviewers** section on the right, select **Copilot**.
3. Before requesting, you can pick the **effort level** for this review (Lite, Balanced or Max). The choice applies to this review only.

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

## Lite vs Balanced vs Max: which effort level?

| | Lite | Balanced | Max |
|---|---|---|---|
| **What it does** | Quick feedback on common problems: bugs, security issues, style | Routes the PR to a higher-reasoning model for longer analysis | Several independent review agents on models from different providers; an aggregation agent merges and checks their findings |
| **Best for** | Routine, small changes | Most PRs; larger or riskier changes | High-stakes PRs where a missed bug is expensive |
| **Typical cost per review** | $0.05–$1 (average ~$0.25) | $0.25–$5 (average ~$1.50) | $1.50–$25 (average ~$10) |
| **Status** | Generally available | Generally available, **default** since 28 September 2026 | **Public preview** since 28 October 2026 |

Costs are GitHub's estimates in AI credits and exclude GitHub Actions minutes. You can set the effort level at **enterprise, organization, repository or personal** level; each level overrides the one above it. Admins can also set a **maximum** level, so Max isn't available where they don't want it. Personal: *Copilot settings → Code review → Review effort level*.

**Tip:** if you have lots of small PRs (dependency bumps, copy changes), Balanced on everything gets expensive, and Max on everything far more so. Consider Lite as your repository default, Balanced for normal feature work, and Max only for the few PRs that really need it.

## What a review costs

GitHub explains that a review has two cost parts:

- **AI credits** for the model doing the review (the estimates above).
- **GitHub Actions minutes** for gathering context and running tools. Larger hosted runners cost more per minute, and **self-hosted runners don't use GitHub Actions minutes**.

You can see the Actions minutes used by Copilot code review runs in your usage data. On 8 October 2026 GitHub also added new organization billing options and controls for code review, worth checking if you manage a large org.

## Use the API (new)

Since 2 October 2026 you can request a Copilot review through the **REST and GraphQL APIs**, optionally setting the effort level per request. That lets you trigger reviews from your own scripts or internal tools, for example only for PRs that touch certain folders.

## Copilot approvals: should you turn them on?

Since 28 October 2026, **Copilot approvals are generally available**. Here is how they work, according to GitHub:

- Every Copilot review includes an **approval assessment** in its overview comment: whether Copilot thinks the PR is ready to merge.
- Approvals are **off by default**. While they're off, Copilot's reviews don't count toward required approvals.
- An admin can turn them on at **enterprise, organization or repository** level. Repository admins can choose which **file paths** Copilot may approve.
- When they're on, Copilot can submit an **approving review that satisfies a required-approval rule**, just like a teammate's approval.
- **New commits dismiss the approval**, as they would a human's. Re-request a review to get a fresh one.

A sensible way to use them:

1. **Start with low-risk paths only**, such as documentation, copy changes or test fixtures.
2. **Keep humans required for sensitive areas** using CODEOWNERS, for example auth, billing and database migrations.
3. **Require passing CI checks** (tests, lint, type-check) in the same ruleset, so an approval never bypasses your tests.
4. **Review what Copilot approved** for the first few weeks before widening the allowed paths.

GitHub's own docs warn that Copilot can miss problems or make mistakes, so treat its approval as one signal, not a replacement for human judgement on important changes.

## Getting better reviews

- **Keep PRs small.** Like humans, AI reviewers do better on focused diffs than on 2,000-line changes.
- **Write a real PR description** saying what the change is meant to do, so the reviewer can check intent and not just syntax.
- **Add repository custom instructions** (for example in `.github/copilot-instructions.md`) describing your conventions, such as "all new endpoints need an integration test", so feedback matches your team's standards.


## Frequently asked questions

### Can Copilot approve pull requests?
Yes, if an admin turns on Copilot approvals (off by default, generally available since 28 October 2026). Its approval can then count toward required approvals, limited to the file paths the admin allows. Merging still follows your branch rules.

### What is Copilot code review Max?
The most thorough effort level, in public preview since 28 October 2026. It runs several review agents on models from different providers and merges their findings. GitHub estimates about $10 per review on average, with a typical range of $1.50 to $25.

### How do I make Copilot review every PR automatically?
Create a branch ruleset with **Automatically request Copilot code review** enabled, and optionally **Review new pushes**.

### Why did my Copilot reviews get more expensive?
Since 28 September 2026 the default effort level is **Balanced**, which uses more AI credits than Lite. Explicit Lite selections were kept.

## Sources

- GitHub Docs: [Configuring code review by GitHub Copilot](https://docs.github.com/en/copilot/how-tos/copilot-on-github/set-up-copilot/configure-code-review)
- GitHub Docs: [About GitHub Copilot code review](https://docs.github.com/en/copilot/concepts/agent-capabilities/agent-powered-workflows-and-operations/code-review)
- GitHub Changelog: [Copilot code review: Merge with confidence with Max and approvals (28 October 2026)](https://github.blog/changelog/2026-10-28-copilot-code-review-merge-with-confidence-with-max-and-approvals/)
- GitHub Changelog: [Copilot code review: API support and new default effort level (2 October 2026)](https://github.blog/changelog/2026-10-02-copilot-code-review-api-support-and-new-default-effort-level/)
- GitHub Changelog: [Copilot code review effort levels are generally available (7 August 2026)](https://github.blog/changelog/2026-08-07-copilot-code-review-effort-levels-are-generally-available/)

Related on VNHAX: [Copilot upfront seat billing](/blog/github-copilot-prepaid-seats-upfront-billing-guide) · [GitHub Copilot local sandboxing](/blog/github-copilot-local-sandboxing-explained) · [HydraFusion vs Auto](/blog/github-copilot-project-hydrafusion-explained)
