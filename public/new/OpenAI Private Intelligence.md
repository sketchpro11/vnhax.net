---
title: "OpenAI Private Intelligence: Sovereign AI, Air-Gapped Enclaves & Zero Retention"
short_title: "OpenAI Private Intelligence"
slug: openai-private-intelligence-guide
category: AI Security & Enterprise
reading_time: 8 min read
tags: [private-intelligence, sovereign-ai, confidential-computing, zero-data-retention, enterprise-security]
meta_description: "What OpenAI Private Intelligence actually includes: Zero Data Retention with Private Safety Processing today, Private Inference in preview, and how to check compliance claims."
---

# OpenAI Private Intelligence: Sovereign AI, Air-Gapped Enclaves & Zero Retention

> **Quick answer:** OpenAI Private Intelligence, announced at DevDay on September 29, 2026, is an umbrella for two things: Zero Data Retention with Private Safety Processing (available now) and Private Inference, a confidential-computing preview planned for fall 2026. It is about limiting who can see your data. Public details on certifications, customer-held keys, and air-gapped deployment are thin, so verify them before you rely on them.

Here's a meeting I think plenty of people have sat through. The AI pilot is going well. Developers love it. Then someone from legal asks one question: "Who can actually see what we send it?"

And the room goes quiet, because the honest answer is usually "it depends, let me check the policy."

That question is what Private Intelligence tries to answer. I'll go through what has been announced, what hasn't, and how to evaluate it without getting carried away by marketing words.

**A note on sources:** this is brand-new and partly still in preview. I'm working from OpenAI's announcement coverage and trade reporting, not from deploying it. I've flagged what is confirmed and what is not, and you should confirm anything compliance-critical with OpenAI directly.

---

## The Enterprise Privacy Dilemma: Cloud Intelligence vs. Data Sovereignty

Regulated teams face a trade-off that sounds simple and isn't.

- The best models live in a vendor's cloud.
- Your data (patient notes, contracts, trading data) can't casually leave your control.

So teams end up with one of three bad options: use a weaker model they can host themselves, use the strong model and accept the risk, or don't use AI at all.

There is a second, quieter problem. Even with a "no retention" promise, providers often keep some data for **safety monitoring**, checking for abuse. That means a human or system at the vendor may touch your content. For a bank or hospital, that's exactly the thing that stalls approval.

Private Intelligence is OpenAI's attempt to remove that objection without making you give up frontier models.

---

## What Is OpenAI Private Intelligence? Technical Architecture

According to reporting on the DevDay announcement, Private Intelligence has two parts:

1. **Zero Data Retention (ZDR) with Private Safety Processing (PSP)** is available now.
2. **Private Inference** is in preview, expected in fall 2026.

### Part one: ZDR with Private Safety Processing

PSP is built to keep OpenAI's Zero Data Retention commitments for API and enterprise customers while still running safety checks.

As reported, the idea is:

- Safety review is **automated** and runs inside a **hardware-attested runtime**.
- The encrypted safety records are held in **customer-controlled storage**, not OpenAI's.
- Only **limited safety signals** are sent back to OpenAI, while the content itself stays opaque to the company.

One detail I'd highlight, because it keeps expectations honest: reporting says OpenAI keeps an index with operational metadata and a reference to the encrypted record, but not a plaintext copy. So "zero data" doesn't literally mean "no records anywhere." It means no readable copy of your content is retained by OpenAI.

### Part two: Private Inference

This is the more ambitious piece: confidential computing during inference itself, with verifiable controls. OpenAI has revealed little about the implementation so far. One analysis suggested waiting until the preview publishes its hardware, threat model and latency numbers before judging it. I agree with that advice.

---

## Confidential Computing: How Hardware Enclaves Protect Model Inferences

Since Private Inference leans on this idea, let me explain it in plain terms.

Normally, data is encrypted when stored and when traveling over the network, but it's **readable while being processed**. Confidential computing closes that last gap. The processing happens inside a hardware-isolated environment (often called a trusted execution environment or enclave), where even the machine's operator is meant to be locked out.

The other key ingredient is **attestation**. The hardware can produce a signed proof of what code is running inside. You, as the customer, can check that proof before sending anything sensitive. That's the difference between "trust us" and "verify it."

OpenAI's careers page for its Private Computing team confirms the direction: they describe using confidential computing, trusted execution environments and end-to-end encryption so private data stays private, even from OpenAI.

**What I could not confirm:** which specific hardware (for example, particular AMD or Intel enclave technologies) Private Inference will use. Don't assume a specific chip until OpenAI documents it.

---

## Customer-Managed Keys (CMEK) and Zero Data Retention Guarantees

This heading combines two ideas, and they have different status.

**Zero Data Retention:** shipping now through ZDR with PSP, as described above. Note that ZDR has long been something you have to be approved or set up for on the account side, so check how it's enabled for your organisation rather than assuming it's on.

**Customer-managed encryption keys:** the reporting I found says encrypted safety records sit in storage the customer controls. It does **not** clearly say that you hold the encryption keys in your own cloud key management service, or that OpenAI can never decrypt anything. Those are stronger claims, and I'd ask OpenAI to put them in writing before you design around them.

### A practical checklist to ask OpenAI

Before you sign anything, get written answers to these:

1. Exactly which endpoints and models are covered by ZDR with PSP?
2. What metadata does OpenAI retain, and for how long?
3. Who holds the keys for the encrypted safety records, and who can decrypt them?
4. What is the escalation process if a safety flag fires?
5. When Private Inference ships, what hardware and attestation will be offered, and can we verify it ourselves?
6. What data residency options exist?

If an answer is vague, treat it as "no" until proven otherwise.

---

## Compliance Breakdown: HIPAA, GDPR Sovereignty, and FedRAMP High

This is where I'd slow down the most, because a privacy feature is not the same as a compliance certification.

**HIPAA.** In the US, using a vendor with patient data generally requires a signed Business Associate Agreement and appropriate safeguards. Private Intelligence may help your risk story, but it doesn't replace the agreement. Ask your counsel and OpenAI what's covered.

**GDPR.** Privacy-by-design features help, but GDPR is about your lawful basis, your processor agreements, transfers, and your data protection assessment. Data location matters too. Note that the separate Ultrafast tier supports only US data residency and global processing, a reminder to check residency per feature, not per vendor.

**FedRAMP High.** This is a formal US government authorization for specific cloud services. I did not find any statement that Private Intelligence holds it. Don't tell a government client it does without proof.

**"Sovereign" and "air-gapped."** These words appear in a lot of enterprise AI marketing. In the Private Intelligence coverage I found, there was no confirmation of fully air-gapped deployment. If isolation from the internet is a requirement for you, ask directly.

In short: treat Private Intelligence as a strong building block, not a compliance certificate.

---

## A Simple Way to Evaluate It

Here's the process I'd follow for a pilot:

**Step 1: Classify your data.** Public, internal, confidential, regulated. Only the last two need this level of protection.

**Step 2: Start with ZDR with PSP.** It's available now, so you can test real workflows today.

**Step 3: Run a safety-flow test.** Send test content that should trigger a safety flag and confirm what your team can and cannot see afterwards.

**Step 4: Review contracts.** Get the data processing terms, retention language and any BAA in writing.

**Step 5: Wait on Private Inference.** Evaluate it once documentation, attestation details and performance figures are public.

---

## Common Mistakes to Avoid

**Reading "zero retention" as "zero records."** Metadata and encrypted references may still exist.

**Assuming a feature equals a certification.** HIPAA, GDPR and FedRAMP are about your whole setup, not one product switch.

**Building on a preview.** Private Inference isn't released yet. Don't put a regulated production workload on it before the details are out.

**Skipping the internal conversation.** Security, legal and engineering need to agree on the data classification before the tool gets near real records.

**Forgetting speed and cost trade-offs.** Extra isolation can change latency. Test it. If low latency matters too, read [OpenAI Ultrafast Speed Tier](/openai-ultrafast-speed-tier-explained) and check whether the two features can be combined for your use case.

---

## Final Thoughts

The most useful thing about Private Intelligence isn't a single feature. It's that the question legal teams keep asking ("who can see this?") is now being answered with architecture instead of a policy page.

Still, the honest state of play is that one half is shipping and the other half is a preview with few published details. Use what's available, ask hard questions about the rest, and get everything important in writing.

For the primary sources, start with OpenAI's own announcement materials and documentation, and read OpenAI's [Private Computing team page](https://openai.com/careers/software-engineer-private-computing-san-francisco/) for a look at the engineering direction.

---

## FAQs

### What is OpenAI Private Intelligence?
It's an umbrella initiative announced at OpenAI's DevDay on September 29, 2026. It combines Zero Data Retention with Private Safety Processing and a preview of Private Inference.

### What is Private Safety Processing?
It's a system that runs automated safety reviews without OpenAI personnel viewing the underlying content. Reporting says encrypted records stay in customer-controlled storage and only limited safety signals are sent to OpenAI.

### What is Private Inference?
It's a planned feature that uses confidential computing during model inference, with verifiable controls. It's in preview for fall 2026, and implementation details have not been widely published.

### Does zero data retention mean OpenAI stores nothing?
Not literally. Reporting says OpenAI keeps operational metadata and a reference to an encrypted record, but not a plaintext copy of your content.

### Is Private Intelligence available now?
Partly. Zero Data Retention with Private Safety Processing is available now. Private Inference is a preview.

### Can OpenAI engineers see my prompts?
The stated goal is that content stays opaque to OpenAI during safety processing. For specifics about access controls, ask OpenAI for written documentation.

### Does Private Intelligence make me HIPAA, GDPR or FedRAMP compliant?
No product feature does that alone. HIPAA typically involves a signed agreement, GDPR depends on your processing arrangements, and FedRAMP is a formal authorization I found no evidence Private Intelligence holds.

### Is it air-gapped?
I found no confirmation of fully air-gapped deployment. Ask OpenAI if you need it.

### Can I hold my own encryption keys?
Reports say safety records are held in customer-controlled storage. Whether you hold the keys in your own key management service wasn't clearly stated, so confirm it in writing.

### Should regulated companies use it today?
Start with ZDR with PSP in a pilot, review the contracts, and wait for Private Inference documentation before depending on it.
