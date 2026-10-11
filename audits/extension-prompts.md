# Claude Extension (Chrome) ke liye Prompts

Har prompt alag chat me paste karein. Login aap khud karenge — extension ko password kabhi na dein.

---

## Prompt 1 — Zoho Mail (vnhax.net) setup + Cloudflare DNS

```
Task: Set up Zoho Mail for my domain vnhax.net. My DNS is on Cloudflare.

Rules:
- I will log in to Zoho and Cloudflare myself. Never type any password. If a login screen appears, stop and ask me.
- Use ONLY the record values that Zoho shows on screen. Do not guess MX hosts (they differ by region: zoho.com / zoho.in / zoho.eu).
- Do NOT turn on Cloudflare Email Routing (it conflicts with Zoho MX). If it is already on, tell me before changing anything.
- Ask me before deleting any existing DNS record. Do not touch A, AAAA, or CNAME records used by Vercel.
- Before any paid plan or checkout, stop. I want the free "Forever Free" plan.

Steps:
1. Go to https://www.zoho.com/mail/ → sign up for business email with domain vnhax.net on the Forever Free plan (wait for me to log in / sign up).
2. Domain verification: Zoho gives a TXT record (zb...). Add it in Cloudflare → vnhax.net → DNS → Records (Type TXT, Name @, content exactly as shown). Go back to Zoho and click Verify.
3. Create the main mailbox: contact@vnhax.net (Umar Hashmi).
4. Add an email alias privacy@vnhax.net on the same mailbox (aliases are free).
5. Add MX records in Cloudflare exactly as Zoho shows (usually 3 records with priorities 10, 20, 50). Remove any old MX records only after asking me.
6. Add SPF TXT record on @ exactly as Zoho shows (usually: v=spf1 include:zohomail.com ~all). If an SPF record already exists, merge it into one record — there must be only one SPF record. Ask me first.
7. In Zoho Admin Console → Domains → vnhax.net → Email Configuration → DKIM: create a DKIM selector, copy the TXT record to Cloudflare, then click Verify in Zoho.
8. Add a DMARC TXT record in Cloudflare: Name _dmarc, content: v=DMARC1; p=none; rua=mailto:contact@vnhax.net
9. In Zoho, run the MX / SPF / DKIM verification checks until all are green.

When finished, report back:
- Screenshot of Zoho's domain setup page with all checks green
- Screenshot of the Cloudflare DNS records list (MX, TXT)
- Confirm contact@vnhax.net and privacy@vnhax.net both exist
```

Iske baad: kisi aur Gmail se `contact@vnhax.net` aur `privacy@vnhax.net` par test email bhejo, aur Zoho se ek reply bhejo — dono taraf kaam karna chahiye.

---

## Prompt 1B — (FREE alternative) Cloudflare Email Routing + Gmail "Send mail as"

Zoho Forever Free = sirf 1 domain. Agar vnhax.site wale Zoho account me vnhax.net add nahi ho sakta, to ye use karein. Prompt 1 aur 1B me se SIRF EK chalana hai.

```
Task: Make contact@vnhax.net and privacy@vnhax.net work for free using Cloudflare Email Routing (receiving) and Gmail "Send mail as" (sending).

Rules:
- I will log in myself and type every password / app password myself. Never type a password. Stop and ask if a login or password field appears.
- Ask me before deleting any existing DNS record. Do not touch A, AAAA, or CNAME records used by Vercel.
- If any MX records from another mail provider exist on vnhax.net, stop and tell me before changing them.

Part A — Receiving (Cloudflare):
1. Cloudflare dashboard → vnhax.net → Email → Email Routing → Get started / Enable.
2. Destination address: ask me which inbox to use (my Gmail). Add it and wait while I click the verification email.
3. Custom addresses: create contact@vnhax.net → my destination; create privacy@vnhax.net → my destination.
4. Let Cloudflare add its required MX and SPF records automatically (click "Add records and enable").
5. Add a DMARC TXT record: Name _dmarc, content: v=DMARC1; p=none; rua=mailto:contact@vnhax.net

Part B — Sending (Gmail):
6. Tell me to create a Google App Password myself (Google Account → Security → 2-Step Verification must be on → App passwords). Do not open or read it.
7. Gmail → Settings → See all settings → Accounts and Import → "Send mail as" → Add another email address: name "Umar Hashmi (VNHAX)", email contact@vnhax.net, untick "Treat as an alias" is NOT needed (leave default).
8. SMTP server: smtp.gmail.com, port 587, TLS, username = my Gmail address, password = I will type the app password myself.
9. Gmail sends a verification code to contact@vnhax.net — it will arrive in my Gmail through Cloudflare. Let me enter it.
10. In Cloudflare DNS, edit the existing SPF TXT record on @ so it includes Google too. There must be only ONE SPF record, e.g.: v=spf1 include:_spf.mx.cloudflare.net include:_spf.google.com ~all  — show me the final value before saving.

Report back: screenshots of Email Routing (both addresses Active), the DNS records list (MX, SPF, DMARC), and Gmail's "Send mail as" list.
```

Test: doosre email se contact@ aur privacy@ par mail bhejo → Gmail me aaye; phir Gmail se "From: contact@vnhax.net" chun kar reply bhejo.

---

## Prompt 2 — Vercel: www → vnhax.net permanent redirect

```
Task: In Vercel, make www.vnhax.net redirect to vnhax.net with a permanent redirect (308 or 301) instead of the current 307.

Rules:
- I will log in myself. Never type a password. Stop and ask if a login screen appears.
- Do not remove any domain, do not change DNS, do not change any other project settings.
- Do not create or show any access token.

Steps:
1. Open https://vercel.com/dashboard → find the project that serves vnhax.net.
2. Go to Settings → Domains.
3. Confirm vnhax.net is the primary domain (no redirect on it).
4. Click Edit on www.vnhax.net → set "Redirect to" = vnhax.net and choose status code 308 Permanent Redirect (or 301 if 308 is not offered). Save.
5. Report back with a screenshot of the Domains list showing the redirect and its status code.
```

Aap ke batane par main `curl` se check karunga ke 308/301 aa raha hai.

---

## Prompt 3 — Google Search Console health check (sirf dekhna, kuch change nahi)

```
Task: Check the health of vnhax.net in Google Search Console and report. READ-ONLY — do not change, submit, remove, or disavow anything.

Rules:
- I will log in myself. Never type a password. Stop and ask if a login screen appears.
- Do not click Submit / Request / Remove / Disavow / Validate fix buttons. Only read and screenshot.

Steps:
1. Open https://search.google.com/search-console and select the vnhax.net property (Domain property preferred; otherwise https://vnhax.net/). If no property exists, stop and tell me.
2. Security & Manual Actions → Manual actions: screenshot. Report exactly what it says.
3. Security & Manual Actions → Security issues: screenshot. Report exactly what it says.
4. Links → "Top linking sites" (click More) and "Top linked pages": screenshot both. List every linking site that looks like gaming cheats, hacks, PUBG, bypass, warez, or Vietnamese cheat forums.
5. Indexing → Pages: screenshot. Report the number of Indexed vs Not indexed pages, and the top reasons for "Not indexed".
6. Indexing → Sitemaps: report whether https://vnhax.net/sitemap.xml is submitted, its status, and discovered URL count.
7. Performance (last 3 months): report total clicks and impressions, and the top 10 queries. Flag any queries about hacks, cheats, or PUBG.

Final report: a short summary list of every finding + all screenshots.
```

Report + screenshots mujhe chat me bhejna; disavow file main bana dunga (zaroorat hui to).
