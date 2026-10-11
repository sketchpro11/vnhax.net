---
title: "GitHub Copilot Upfront Seat Billing for Business & Enterprise: What Changed on October 1"
description: "Since 1 October 2026, Copilot Business and Enterprise customers who pay by card or PayPal are charged for seats upfront. What changed, what didn't, how proration and refunds work, and how admins should adjust."
date: "2026-10-08"
updatedAt: "2026-10-12"
author: "Umar Hashmi"
category: "GitHub & Developer Tools"
tags: ["github", "github-copilot", "copilot-billing", "copilot-business", "copilot-enterprise", "developer-tools"]
---

> **Quick answer (checked 12 October 2026):** If your organization pays for **Copilot Business or Copilot Enterprise by credit card or PayPal**, GitHub now charges for seats **upfront**. New seat assignments must be **paid for before the user gets access**, and from **1 October 2026** existing customers see an **upfront charge for all assigned seats at the start of each billing cycle**. **Removing a seat gives no prorated refund**, while **seats added mid-cycle are still prorated**. Prices didn't change. Customers billed by invoice or through Microsoft/Azure agreements aren't covered by this card/PayPal change.

GitHub announced the change on 28 August 2026, alongside reopening Copilot Business and Enterprise sign-ups for card and PayPal customers. GitHub says the goal is stronger account vetting and more reliable service. Here is what it means in practice, based on GitHub's changelog and docs.

## What changed

- **Pay before access:** every new Copilot Business or Enterprise seat assignment requires payment for that seat **before** the user can use Copilot.
- **Upfront cycle charge:** at the start of each billing cycle, **all assigned seats are charged upfront**. For existing card and PayPal customers this started **1 October 2026**.
- **Overage may need payment:** if your organization goes beyond its included usage, additional payment may be required for users to keep using Copilot.
- **Included usage may be prorated** across the month to match seat proration.
- **Vetting on return:** fully cancelling Copilot and coming back later may trigger the updated account vetting and billing behaviour.

## What did not change

- **Prices** for Copilot Business and Copilot Enterprise.
- **No prorated refunds when you remove a seat.** The removal shows up in your next monthly cycle.
- **Mid-cycle additions are prorated** from the assignment date to the end of the cycle (and with card/PayPal, you pay that prorated amount upfront).
- **Spend controls, usage tracking and buying extra AI credits** are all still available.

Copilot Business is listed at **$19 per user per month** in GitHub's docs. Enterprise pricing is shown on GitHub's pricing page and depends on your agreement.

## A worked example

Say your team has 20 Business seats and a cycle starting on the 1st:

- **1st of the month:** you're charged upfront for 20 seats.
- **10th:** you add 2 developers. You pay a prorated amount for those 2 seats (from the 10th to the end of the cycle) before they get access.
- **20th:** a developer leaves and you remove their seat. **No refund** for the remaining days; the seat simply isn't billed next cycle.

## What admins should do now

1. **Audit seats before renewal.** Since removals aren't refunded, the useful moment to remove inactive users is a few days **before** the next cycle starts, not after.
2. **Check your payment method limits.** Upfront charges for the whole team land on one day; make sure the card won't be declined, or new assignments will stall.
3. **Set spend controls** for usage beyond the included allowance, so overages don't block developers unexpectedly.
4. **Consider invoiced billing** if you're a larger organization. These card/PayPal rules don't describe invoiced or Azure-billed accounts, so ask GitHub sales whether that suits you better.

## Related change: Copilot code review now defaults to "Balanced"

In the same announcement, GitHub said the default Copilot code review effort level changes from **Lite** to **Balanced** for existing and new repositories and organizations. If review costs matter, check the effort level at organization and repository level. See our [Copilot code review guide](/blog/github-copilot-code-review-pr-approval-guide).

## Frequently asked questions

### Do I get a refund if I remove a Copilot seat mid-month?
No. Revoking a seat doesn't produce a prorated refund; the change takes effect in your next billing cycle.

### Are seats added mid-cycle prorated?
Yes, from the date of assignment to the end of the cycle. Card and PayPal customers pay that amount upfront.

### Did Copilot Business or Enterprise get more expensive?
No. GitHub says prices are not changing. What changed is when and how card and PayPal customers pay.

## Sources

- GitHub Changelog: [Upcoming changes to GitHub Copilot policies and billing (28 August 2026)](https://github.blog/changelog/2026-08-28-upcoming-changes-to-github-copilot-policies-and-billing/)
- GitHub Changelog: [Reopening Copilot Business and Enterprise signups (3 September 2026)](https://github.blog/changelog/2026-09-03-reopening-copilot-business-and-enterprise-signups/)
- GitHub Docs: [GitHub Copilot licenses](https://docs.github.com/en/billing/concepts/product-billing/github-copilot-licenses)
- GitHub Docs: [Copilot seats and billing cycles for organizations and enterprises](https://docs.github.com/en/copilot/concepts/billing-and-usage/organizations-and-enterprises/seats-and-billing-cycles)

Related on VNHAX: [GitHub Copilot HydraFusion vs Auto](/blog/github-copilot-project-hydrafusion-explained) · [GitHub Copilot local sandboxing explained](/blog/github-copilot-local-sandboxing-explained)
