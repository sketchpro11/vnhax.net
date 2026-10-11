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
- 🤖 (User decision 2026-10-12: no local tests) — verify from official sources; no hands-on claims
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
- [x] Day 3 (2026-10-12) — code done: /author/umar-hashmi (Person + ProfilePage schema, articles list), /editorial-policy, bylines link to author page, About links, footer + sitemap. photo (public/images/umar-hashmi.webp) + hardware (Alienware x15 R2, i7-12700H, RTX 3070 Ti 8GB, 16GB, Win11 Pro) added
- [x] Day 4 (2026-10-12) — 56 → 42 posts. Merged: ChatGPT Pro x3 → chatgpt-pro-plans-100-200-500-ultrafast; Copilot routing → HydraFusion; Argon vs Flash → Argon pillar; Dots x2; Grok pricing → Grok 4.7 vs 4.6. Removed (301): grok-5 (speculation), colossus-2, creative-canvas, muse-small-business, copilot-grok-vs-opus, llama-4-enterprise, meta-enterprise-platform (product not found = fabricated), project-astra (invented specs). Rewritten from official sources with Sources sections: xAI roadmap, SpaceXAI(+SpaceXSI), Googlebook, Mythos 5.1, Gemini 3.8 Flash Cyber, Sonnet 4.5 retirement, Opus vs Fable, Anthropic EFS (was wrong concept), OpenAI Private Intelligence, Copilot prepaid seats, Copilot code review, Meta One, Meta Muse. Hub pages: fake "upcoming topics" removed, real intros added. 0 broken internal links; 3 broken external links fixed. Left for Day 5/6: claude-code-cli-multi-repo + gemini-windows (no sources yet), monolithic-prompts + real-time-web-data (1 source each)
- [x] Day 5 (2026-10-12) — user chose NO local downloads/tests: verify from official sources only. Rewrote as honest explainers with Sources: Llama 4 locally (removed fake 'my RTX 4090/5090/Mac Studio' story; Ollama sizes 67/245 GB; FA3 is H100-only), num_ctx (default now 4K<24GB, not 2048; KV table was 2x too low — recomputed from configs; removed wrong num_predict tip), Gemini Windows (official 10 Sep launch facts), Claude Code multi-repo (removed invented .clauderules/--sandbox-mode/--batch/docker image; real --add-dir, CLAUDE.md, /sandbox, -p), shootout (removed fabricated benchmark table; doc-based comparison + test method)
- [ ] Day 6
- [ ] Day 7
