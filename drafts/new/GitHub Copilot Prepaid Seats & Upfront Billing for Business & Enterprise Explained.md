---
title: "GitHub Copilot Prepaid Seats & Upfront Billing for Business & Enterprise Explained"
short_title: "Copilot Prepaid Seats & Billing"
slug: github-copilot-prepaid-seats-business-enterprise-billing
category: Enterprise Licensing & Billing
reading_time: 8 min read
tags: [copilot-billing, prepaid-seats, copilot-business, copilot-enterprise, github-licensing]
meta_description: "Verified breakdown of GitHub's official upfront prepaid seat billing policy for Copilot Business ($19/mo) and Enterprise ($39/mo) with pooled AI credits."
---

# GitHub Copilot Prepaid Seats & Upfront Billing for Business & Enterprise Explained

**Reading time:** 8 min read | **Category:** Enterprise Licensing & Billing

Picture this: it's the last week of the month, and you're the person who handles tooling for your engineering team. A developer is leaving on Friday. You open the organization settings, remove their Copilot seat, and feel pretty good about saving the company a few dollars.

Then finance asks why the invoice didn't change.

This is the exact moment a lot of admins run into GitHub's upfront seat billing for the first time. Removing a seat doesn't give the money back. Once you understand why, it becomes easy to plan around, but it does catch people off guard if nobody explained it first.

I'm writing this the way I'd explain it to a colleague over coffee: what the policy actually says, what it means for your budget, and the habits that keep billing boring (which is what you want). Everything about pricing and policy below follows GitHub's official billing documentation, and I'll point you to the sources so you can confirm the current details yourself, because billing rules are exactly the kind of thing that gets updated.

## GitHub's Shift to Upfront Seat Billing: What Changed in 2026

The headline change is simple. For Copilot Business and Copilot Enterprise accounts paying by **credit card or PayPal**, GitHub now uses an **upfront (prepaid) seat model**.

Two things matter here:

- **Seats are billed upfront.** You're charged at the start of the billing cycle, not at the end.
- **Payment comes before access.** To assign a new seat, the payment for that seat has to go through first.

That second point is the one that changes day-to-day admin work. Before, you might assign a seat in the morning and think about billing later. Now the order is reversed: payment first, access second.

In practice, this means onboarding a new developer is no longer a ten-second click that you can forget about. If your card is expired, declined, or hits a limit, the seat simply won't go live. I'd suggest checking the payment method on the account before a big hiring week, not during it.

**A quick checklist before you assign seats:**

1. Confirm the billing payment method is valid and has room on it.
2. Check how many seats you actually need this cycle.
3. Assign the seat and confirm the developer can see Copilot in their editor.

If you want the official wording, GitHub's Copilot plan information lives at [GitHub Copilot plans](https://github.com/features/copilot/plans) and the billing documentation is at [GitHub Docs: Billing](https://docs.github.com/en/billing).

## The "No Prorated Refund" Policy: Why Admin Audits Are Now Critical

This is the part that matters most, so I'll say it plainly.

**If you remove or unassign a seat in the middle of a billing cycle, GitHub does not give a prorated refund.**

Here's what happens instead:

- The developer **keeps Copilot access until the last day of the current billing cycle**.
- The seat **does not renew** in the next cycle.

So the money you already paid isn't lost in terms of access. The person can still use Copilot until the cycle ends. You just can't get a partial refund for the unused days.

### What this means for you

Let's say you have a developer who is moving to a different team on the 3rd of the month. If you remove their seat on the 4th, you're not saving anything this cycle. The savings start next cycle.

That sounds minor until you multiply it. If you manage dozens or hundreds of seats, small timing mistakes add up. The cost of an unused seat isn't about one bad day; it's about carrying a seat you didn't need for a full cycle.

### The monthly audit habit

The fix isn't complicated. It's timing.

Here's a simple routine you can set on a recurring calendar reminder a few days **before** your billing cycle renews:

1. Open your organization's Copilot seat list.
2. Check who's actually using it. Look for people who've left the company, changed roles, or never started.
3. Remove seats you don't want renewed **before** the cycle rolls over, so they don't renew.
4. Note who's coming in next cycle so the new payments are ready.

The point of the audit is to catch the seat *before* it renews, because once the next cycle starts, you've already paid for it.

**Common mistake:** waiting until someone complains about the invoice. By then the cycle has already started and the charge is already in.

## Copilot Business ($19) vs. Enterprise ($39): Cost & Pooled AI Credits

Now the numbers. Here's how the two plans compare under the current billing policy:

| Plan | Price | Pooled GitHub AI credits |
|---|---|---|
| **Copilot Business** | $19 per user per month | 1,900 pooled credits per seat per month |
| **Copilot Enterprise** | $39 per user per month | 3,900 pooled credits per seat per month |

The word that does the heavy lifting there is **pooled**.

### What "pooled" actually means

Credits aren't locked to one person. They're pooled at the **organization level**. Every seat adds to a shared bucket, and the team draws from it.

Think of it like a shared family data plan. If one person barely uses their share, someone else can use more of it. That's good for teams where usage is uneven, which is almost every team. You'll always have a couple of heavy users and a few people who only open Copilot occasionally.

For example, if an organization has 10 Business seats, the pool works out to 19,000 credits for the month (10 × 1,900). Those 19,000 credits are shared across the whole group, not capped at 1,900 each.

### What happens when the pool runs out

If your pooled limit is used up, **additional credits are billed**. That's the part to pay attention to, because it's the one that can surprise you on an invoice.

The good news is that budget controls can be set, so you decide how much additional spending is allowed rather than finding out afterward.

### Which plan fits which team?

I wouldn't pick based on price alone. A few honest questions help:

- **How heavy is your team's usage?** If people use Copilot constantly, a bigger pool per seat may make sense.
- **How much governance do you need?** Larger organizations usually care more about central control and reporting.
- **How uneven is usage?** Pooling helps most when a few people use a lot and others use a little.

If you're unsure, start by looking at your real usage for a cycle or two before committing everyone to the higher plan. The pricing difference per seat looks small, but across a big team it becomes a real number.

For the up-to-date feature comparison, check the official [GitHub Copilot documentation](https://docs.github.com/en/copilot).

## Setting Up Budget Caps and Cost Centers to Prevent Overage Spikes

Since additional credits are billed once the pool runs out, this section is the one that protects your wallet.

### Step-by-step: build a safety net

Exact menu names can change, so treat these as the general flow and confirm in your billing settings:

1. **Go to your organization or enterprise billing settings** on GitHub.
2. **Find the budget controls** related to Copilot and AI credits.
3. **Set a spending limit** for additional credits, so overage can't keep climbing without anyone noticing.
4. **Turn on alerts**, if available, so you hear about it before you hit the cap rather than after.
5. **Review usage regularly**, at least once per cycle at first, until you know what normal looks like.

### Use cost centers to keep teams honest

If you have several departments using Copilot, cost centers help you see who is using what. Without that, the invoice is just one big number and nobody feels responsible for it.

With cost centers, you can:

- See which teams are driving usage.
- Charge costs back to the right department.
- Have a calm conversation with a team lead using real numbers instead of guesses.

### A realistic scenario

Imagine a team starts experimenting with heavier AI workflows for a big migration project. Usage jumps. Nobody changed anything in billing, so the pool drains faster than usual, and the extra credits start getting billed.

With a budget cap, that story ends with an alert and a quick conversation. Without one, it ends with a surprise line item. I'd much rather have the first version.

**Common mistakes to avoid:**

- Setting a budget once and never looking at it again.
- Assuming "pooled" means "unlimited."
- Not telling team leads that additional credits cost extra.

## Managing Enterprise Volume Licensing via Microsoft Azure Subscriptions

Not everyone pays by card. Large organizations often have a different setup.

If your company has a **Microsoft Enterprise Agreement (EA)**, you can manage your seats and billing through **Azure subscriptions** or **commercial volume licensing**, rather than the credit card or PayPal route.

That matters because the upfront prepaid seat model described earlier is specifically for accounts paid by credit card or PayPal. If you're on an Enterprise Agreement, billing is handled through your Microsoft commercial arrangement, so you'd work with your Microsoft account team and your Azure billing setup for the details.

### Why enterprises like this route

- **One place for spend:** GitHub costs sit alongside other Azure and Microsoft costs.
- **Procurement-friendly:** volume licensing fits existing purchasing processes.
- **Easier internal approvals:** finance teams already know how to manage Azure.

### A practical tip

If you're not sure which billing path your organization is on, ask before assuming. A quick message to whoever manages your Microsoft agreement can save you from planning around the wrong policy. For Azure-specific guidance, start with the [Microsoft Azure documentation](https://learn.microsoft.com/en-us/azure/).

## Common Mistakes to Avoid (Quick Recap List)

- **Removing a seat mid-cycle and expecting money back.** There's no prorated refund.
- **Forgetting to remove seats before renewal.** The seat renews and you pay for another cycle.
- **Not checking the payment method.** Payment must clear before a new seat gets access.
- **Treating pooled credits as unlimited.** When the pool runs out, additional credits are billed.
- **Skipping budget controls.** They exist to stop surprise overage.
- **Mixing up billing paths.** Card/PayPal and Enterprise Agreement accounts are handled differently.

## Frequently Asked Questions (FAQs)

### What is GitHub Copilot's upfront (prepaid) seat billing?
It's a billing model for Copilot Business and Enterprise accounts paid by credit card or PayPal. Seats are charged at the start of the billing cycle, and payment must be completed before a new seat can be assigned.

### Does GitHub give a refund if I remove a Copilot seat mid-cycle?
No. GitHub doesn't give prorated refunds for removed or unassigned seats. The user keeps access until the last day of the current billing cycle, and the seat doesn't renew in the next cycle.

### How much does GitHub Copilot Business cost?
Copilot Business is $19 per user per month and includes 1,900 pooled GitHub AI credits per seat per month.

### How much does GitHub Copilot Enterprise cost?
Copilot Enterprise is $39 per user per month and includes 3,900 pooled GitHub AI credits per seat per month.

### What are pooled GitHub AI credits?
Pooled credits are shared at the organization level instead of being limited to a single user. Each seat adds credits to a common pool that the whole team draws from.

### What happens if my organization uses all its pooled credits?
Additional credits are billed once the pooled limit is used up. You can set budget controls to manage how much extra spending is allowed.

### Can I set a spending limit for Copilot?
Yes, budget controls can be configured to limit additional credit spending. Check your GitHub billing settings for the current options.

### Does the prepaid seat model apply to Microsoft Enterprise Agreement customers?
The upfront model is described for credit card and PayPal accounts. Enterprise customers with a Microsoft Enterprise Agreement can manage seats and billing through Azure subscriptions or commercial volume licensing.

### When should I remove a Copilot seat so it doesn't renew?
Before your billing cycle renews. Since there are no prorated refunds, removing the seat ahead of renewal is what prevents the next cycle's charge.

### Why do I need to pay before assigning a new Copilot seat?
Under the prepaid model, payment for the seat must be completed first, and only then is access granted.

## Final Thoughts

Upfront seat billing isn't scary. It just rewards a little planning. Keep your payment method healthy, audit seats **before** the renewal date, set budget caps so overage never sneaks up on you, and know which billing path your company is on.

If you only do one thing after reading this, make it a recurring calendar reminder a few days before your billing cycle ends. That tiny habit is what separates a smooth invoice from an awkward chat with finance.

*Billing policies can change, so always confirm the latest details in GitHub's official documentation before making purchasing decisions.*

---

### Related Reading (Internal Links)

- [Copilot Business vs. Enterprise: Which Plan Fits Your Team?](/copilot-business-vs-enterprise)
- [How to Audit Developer Licenses Before Renewal](/audit-developer-licenses)
- [Setting Budgets and Cost Controls for AI Tools](/ai-tools-budget-controls)

### Sources & Further Reading (External Links)

- [GitHub Copilot plans](https://github.com/features/copilot/plans)
- [GitHub Docs: Copilot](https://docs.github.com/en/copilot)
- [GitHub Docs: Billing](https://docs.github.com/en/billing)
- [Microsoft Azure documentation](https://learn.microsoft.com/en-us/azure/)
