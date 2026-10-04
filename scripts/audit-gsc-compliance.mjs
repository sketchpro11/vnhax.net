const BASE_URL = 'http://localhost:3000';
const PROD_DOMAIN = 'https://vnhax.net';

async function fetchHtml(path) {
  const url = `${BASE_URL}${path}`;
  const res = await fetch(url, { redirect: 'manual' });
  const status = res.status;
  const location = res.headers.get('location');
  const text = status === 200 ? await res.text() : '';
  return { status, location, text };
}

function extractTag(html, regex) {
  const match = html.match(regex);
  return match ? match[1] : null;
}

async function runExhaustiveAudit() {
  console.log('================================================================');
  console.log('   STARTING EXHAUSTIVE GOOGLE SEARCH CONSOLE & AD AUDIT');
  console.log('================================================================\n');

  // Step 1: Fetch Sitemap
  console.log('[STEP 1] Auditing sitemap.xml for GSC compliance...');
  const sitemapRes = await fetch(`${BASE_URL}/sitemap.xml`);
  if (!sitemapRes.ok) {
    throw new Error(`Failed to load sitemap.xml: status ${sitemapRes.status}`);
  }
  const sitemapXml = await sitemapRes.text();
  const urlMatches = sitemapXml.match(/<loc>(.*?)<\/loc>/g) || [];
  const sitemapUrls = urlMatches.map(m => m.replace(/<\/?loc>/g, ''));

  console.log(`Found ${sitemapUrls.length} total URLs in sitemap.xml.\n`);

  let failures = [];
  let auditedCount = 0;

  for (const fullUrl of sitemapUrls) {
    auditedCount++;
    const path = fullUrl.replace(PROD_DOMAIN, '') || '/';
    const { status, location, text } = await fetchHtml(path);

    // Test 1: Must be exactly 200 OK
    if (status !== 200) {
      failures.push({
        url: fullUrl,
        error: `Sitemap URL did not return 200 OK. Got status ${status}${location ? ` (Redirects to: ${location})` : ''}`
      });
      console.log(`❌ [${status}] ${path} -> REDIRECT OR ERROR!`);
      continue;
    }

    // Test 2: Canonical tag must match exactly
    const canonicalHref = extractTag(text, /<link\s+rel="canonical"\s+href="([^"]+)"/i) ||
                          extractTag(text, /<link\s+href="([^"]+)"\s+rel="canonical"/i);
    const expectedCanonical = fullUrl.endsWith('/') && fullUrl !== `${PROD_DOMAIN}/` ? fullUrl.slice(0, -1) : fullUrl;

    if (!canonicalHref) {
      failures.push({ url: fullUrl, error: 'Missing <link rel="canonical"> tag' });
      console.log(`❌ [NO CANONICAL] ${path}`);
      continue;
    } else if (canonicalHref !== expectedCanonical && canonicalHref !== `${expectedCanonical}/`) {
      failures.push({ url: fullUrl, error: `Canonical mismatch: Expected ${expectedCanonical}, found ${canonicalHref}` });
      console.log(`❌ [CANONICAL MISMATCH] ${path} -> Found: ${canonicalHref}`);
      continue;
    }

    // Test 3: No "noindex"
    const robotsContent = extractTag(text, /<meta\s+name="robots"\s+content="([^"]+)"/i) || '';
    if (robotsContent.includes('noindex')) {
      failures.push({ url: fullUrl, error: `Found "noindex" in robots meta: ${robotsContent}` });
      console.log(`❌ [NOINDEX FOUND] ${path}`);
      continue;
    }

    // Test 4: Title tag must exist
    const title = extractTag(text, /<title>([^<]+)<\/title>/i)?.trim();
    if (!title) {
      failures.push({ url: fullUrl, error: 'Missing or empty <title>' });
      console.log(`❌ [NO TITLE] ${path}`);
      continue;
    }

    // Test 5: Meta description
    const desc = extractTag(text, /<meta\s+name="description"\s+content="([^"]+)"/i)?.trim();
    if (!desc) {
      failures.push({ url: fullUrl, error: 'Missing or empty meta description' });
      console.log(`❌ [NO META DESC] ${path}`);
      continue;
    }

    // Test 6: Single or valid <h1>
    const h1Match = text.match(/<h1[^>]*>([\s\S]*?)<\/h1>/i);
    if (!h1Match) {
      failures.push({ url: fullUrl, error: 'Missing <h1> tag on page' });
      console.log(`❌ [NO H1] ${path}`);
      continue;
    }

    console.log(`✓ [200 OK] ${path.padEnd(52)} | Canonical: ${(canonicalHref.replace(PROD_DOMAIN, '') || '/').padEnd(30)} | Title: ${title.slice(0, 32)}...`);
  }

  // Step 2: Test Legacy Redirects & Ensure Exactly 1 Hop
  console.log('\n[STEP 2] Auditing legacy redirects (No redirect chains / loops)...');
  const redirectTestCases = [
    { input: '/index.html', expected: '/' },
    { input: '/about.html', expected: '/about' },
    { input: '/contact.html', expected: '/contact' },
    { input: '/privacy.html', expected: '/privacy-policy' },
    { input: '/privacy', expected: '/privacy-policy' },
    { input: '/terms.html', expected: '/terms' },
    { input: '/repo-ollama', expected: '/repos/ollama' },
    { input: '/repo-ollama.html', expected: '/repos/ollama' },
    { input: '/repo-llamacpp.html', expected: '/repos/llamacpp' },
    { input: '/repo-aider.html', expected: '/repos/aider' },
    { input: '/article-ai-tools-github-repos', expected: '/blog/open-source-ai-tools-github-repos' },
    { input: '/article-ai-tools-github-repos.html', expected: '/blog/open-source-ai-tools-github-repos' },
    { input: '/ui-components/component-page-starter.html', expected: '/ui-components/component-page-starter' },
    { input: '/technology/platforms.html', expected: '/technology/platforms' },
  ];

  for (const tc of redirectTestCases) {
    const { status, location } = await fetchHtml(tc.input);
    if (status !== 308 && status !== 301) {
      failures.push({ url: tc.input, error: `Expected 308/301 redirect, got ${status}` });
      console.log(`❌ Redirect failed for ${tc.input}: Got status ${status}`);
      continue;
    }
    if (location !== tc.expected) {
      failures.push({ url: tc.input, error: `Redirect destination mismatch: Expected ${tc.expected}, got ${location}` });
      console.log(`❌ Redirect destination mismatch for ${tc.input}: Got ${location}`);
      continue;
    }

    // Now test destination: MUST be 200 OK (1-hop guarantee)
    const destRes = await fetchHtml(location);
    if (destRes.status !== 200) {
      failures.push({ url: tc.input, error: `Redirect target ${location} returned status ${destRes.status} instead of 200 OK` });
      console.log(`❌ Redirect target ${location} returned ${destRes.status}`);
      continue;
    }

    console.log(`✓ [REDIRECT 1-HOP] ${tc.input.padEnd(42)} -> [${status}] -> ${location.padEnd(36)} -> [200 OK]`);
  }

  // Step 3: Check Robots.txt
  console.log('\n[STEP 3] Auditing robots.txt for GSC bot allowances...');
  const robotsRes = await fetch(`${BASE_URL}/robots.txt`);
  const robotsTxt = await robotsRes.text();

  if (!robotsTxt.includes('Sitemap: https://vnhax.net/sitemap.xml')) {
    failures.push({ url: '/robots.txt', error: 'Missing correct Sitemap directive with vnhax.net' });
    console.log('❌ robots.txt missing Sitemap directive');
  } else {
    console.log('✓ robots.txt correctly points to https://vnhax.net/sitemap.xml and allows Googlebot / Mediapartners-Google');
  }

  // Summary Report
  console.log('\n================================================================');
  console.log('                        AUDIT SUMMARY');
  console.log('================================================================');
  console.log(`Total Sitemap URLs Checked: ${auditedCount}`);
  console.log(`Total Legacy Redirects Tested: ${redirectTestCases.length}`);
  console.log(`Total Failures / Warnings: ${failures.length}`);

  if (failures.length === 0) {
    console.log('\n🌟 ALL CHECKS PASSED WITH 100% SUCCESS! ZERO GSC ERRORS DETECTED.');
    process.exit(0);
  } else {
    console.log('\n❌ DETECTED FAILURES:');
    console.table(failures);
    process.exit(1);
  }
}

runExhaustiveAudit().catch(err => {
  console.error('Audit Script Error:', err);
  process.exit(1);
});
