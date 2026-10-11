# vnhax.net — 7 Din ka AdSense Fix Plan

Full audit: [adsense-audit-2026-10-11.md](adsense-audit-2026-10-11.md)
Shuru: Day 1 jab user bole. Har din ke end par yahan ✅ lagana hai.

**Imandari note:** 100% approval ki guarantee koi nahi de sakta (Google ka faisla hai). Domain 3 mahine purana hai aur iska hack-site history hai — ye 7 din me nahi badal sakta. Plan ka goal: har woh cheez fix karna jo hamare control me hai.

Legend: 🤖 = Claude karega (code/content) · 👤 = User karega (accounts/photo/screenshots)

---

## Day 1 — Jhooti claims hatana + safai
- 🤖 Saare fake badges hatao: "AdSense Verified/Compliant", "E-E-A-T Verified", "COPPA Certified", "AdSense Transparency Standard"
- 🤖 Homepage "Numbers that matter" (120K+, 98% etc.) hatao
- 🤖 About/Disclaimer se "100% hardware tested / laboratory / Engineering Team / 24–48h SLA guarantee" hatao
- 🤖 "Effective Jan 15, 2025" → asli launch date
- 🤖 About me AdSense reviewers ko address karne wala paragraph hatao
- 🤖 Repo star counts build time par GitHub API se live
- 🤖 readTime word count se auto calculate
- 🤖 Dead X/Twitter link `lib/seo.ts` aur footer se hatao
- 🤖 `public/*.csv` audit files delete, `component-page-starter` noindex/delete
- ✅ Email: contact@ + privacy@vnhax.net (Cloudflare Routing + Gmail Send-as) — done 2026-10-11
- 👤 Vercel www → apex 308 redirect — extension Prompt 2

## Day 2 — Contact + Privacy + Consent
- 🤖 Contact form asli bhejne wala (Web3Forms ya Resend)
- 🤖 Poori site par sirf 2 emails: contact@ aur privacy@
- 🤖 Cookie banner + GA Consent Mode v2 (decline par GA tracking band)
- 🤖 Privacy Policy update: Vercel Analytics add, Google ki current ad-cookie wording, GPC / "unconditionally agree" lines hatao
- 🤖 Disclaimer: "displays ads" → "may display ads"
- 👤 Web3Forms free access key (ya Resend API key) banao — chat me paste mat karna, `.env.local` / Vercel env me daalna
- 👤 Search Console read-only check — extension Prompt 3, report + screenshots bhejo
- 👤 Form test karo: message Zoho inbox (contact@) me aaya?

## Day 3 — Author identity (E-E-A-T)
- 🤖 `/author/umar-hashmi` page + har post par byline (photo + naam) + Article schema me Person author
- 🤖 About page dobara likho: chhota, sach, personal (400–700 words)
- 🤖 Editorial Policy page: research kaise, AI kaise use hota hai, corrections, updates
- 🤖 Footer/nav me Author + Editorial Policy links
- 🤖 Bio/links umarhashmi.dev se (GitHub/LinkedIn/X). 👤 Sirf asli photo + hardware list (laptop/GPU/RAM) dena hai — woh site par nahi hain

## Day 4 — Content cleanup (merge/remove/link)
- 🤖 Merge + 301 redirects:
  - #6 + #7 + #46 → "ChatGPT Pro Plans 2026 (100/200/500)" pillar
  - #23 + #25 → HydraFusion & multi-model routing pillar
  - #19 → #18 (Gemini 4 Argon)
  - #43 → #44 (Dots)
  - #29 → #30 (Grok 4.7)
- 🤖 #31 Grok 5 remove → 301 to #56; #56 me confirmed vs rumour clearly alag
- 🤖 Weak posts noindex/remove: #13 Colossus, #54 SpaceXAI (agar sources se strong na ho sakein)
- 🤖 Har post me 2–4 internal links
- 🤖 Har news post me "Sources" section (official links) + price/date ke saath "as of" date
- 🤖 Company hub pages (/openai, /anthropic, …) par 300–500 words original intro
- 🤖 Googlebook ke unverified specs fix, Mythos ke unlinked claims fix/remove

## Day 5 — Top 5 posts me asli experience (Part 1)
Posts: #49 Llama 4 locally, #34 num_ctx, #33 Gemini Windows install, #8 Claude Code multi-repo, #9 Shootout
- 👤 Commands chalao (main exact list dunga), screenshots + numbers (VRAM, tok/s, time, errors) bhejo
- 🤖 Screenshots optimize karke posts me lagao, "Maine kya try kiya / kya galat hua" section, measured-numbers table, buzzwords hatao
- 🤖 Shootout (#9) ke liye test repo/results table

## Day 6 — Experience Part 2 + baqi thin posts
Posts: #3 Flux 3, #35 Ideogram, #16 ElevenLabs, #15 SLMs edge, #32 API costs
- 👤 Jo tools free/available hain unke apne outputs (images/audio/screenshots) — jo nahi ho sakte woh batao, hum honestly explainer rakhenge
- 🤖 Baqi IMPROVE wali news posts: sources + "Meri raaye: kya aapko switch karna chahiye?" section, kam se kam ~900 words (padding nahi)
- 🤖 Fake-experience lines hatao (Soul Refiner "over chai" waghera) jahan test nahi hua

## Day 7 — Final QA + Apply
- 🤖 `next build`, broken links, H1/titles scripts, sitemap check, mobile check
- 🤖 Poori site par last sweep: koi jhooti claim, placeholder, ya dead link na bache
- 👤 Search Console me sitemap resubmit + top 10 URLs "Request indexing"
- 👤 AdSense account banao / site add karo → publisher ID (`pub-…`) do
- 🤖 AdSense verification snippet/meta tag layout me + `ads.txt` me asli pub ID
- 👤 Apply karo
- Imandari: Day 7 ke baad bhi 3–4 posts/week publish karte raho; review 2–4 hafte le sakta hai aur reviewer naye posts bhi dekhta hai.

---

## Progress
- [x] Day 1 (2026-10-11) — code done; 👤 Vercel 308 redirect pending. Extra fixed: fake GitHub clone UI on repo pages (fake issues/PRs/commits) → honest RepoReview; fake phone in schema; old github.com/vnhax (not ours) → founder profiles; About rewritten honestly; contact form now opens mailto (real backend on Day 2)
- [x] Day 2 (2026-10-11) — code done: Web3Forms form (mailto fallback), Consent Mode v2 + Cookie Settings, new Privacy Policy. 👤 pending: Prompt 4 (Web3Forms key), Prompt 3 (Search Console), form test
- [ ] Day 3
- [ ] Day 4
- [ ] Day 5
- [ ] Day 6
- [ ] Day 7
