async function test() {
  const routes = [
    '/',
    '/about',
    '/contact',
    '/privacy-policy',
    '/terms',
    '/blog',
    '/blog/how-to-increase-num-ctx-in-modelfile',
    '/blog/claude-code-vs-antigravity-vs-grok-build-2026-shootout',
    '/blog/how-to-cut-ai-coding-agent-api-costs-token-proxies',
    '/blog/real-time-web-data-for-ai-agents-without-api-bill',
    '/blog/running-llama-4-locally-vram-requirements-quantization',
    '/blog/why-monolithic-prompts-died-multi-persona-agent-swarms-ecc',
    '/blog/vector-database-cost-optimization-scaling-pinecone-qdrant-chroma',
    '/blog/shadow-ai-governance-auditing-securing-code-assistants',
    '/blog/enterprise-mcp-server-security-hardening-protocol-bridges',
    '/blog/deploying-small-language-models-slms-edge-phi-4-mistral-quantization',
    '/blog/advanced-production-rag-hybrid-search-reranking-evaluation',
    '/repos',
    '/repos/ponytail',
    '/repos/impeccable',
    '/repos/ecc',
    '/repos/effect',
    '/repos/caveman',
    '/repos/agent-reach',
    '/ui-components',
    '/ui-components/component-page-starter',
    '/ui-components/tweet-card',
    '/ui-components/bento-grid',
    '/ui-components/animated-list',
    '/ui-components/dock',
    '/ui-components/sparkles-title',
    '/ui-components/sparkles',
    '/ui-components/image-accordions',
    '/ui-components/pricing-table',
    '/ui-components/hero-section',
    '/ai',
    '/ai/ai-tools',
    '/developer-resources',
    '/developer-resources/github-repos',
    '/technology',
    '/technology/platforms'
  ];

  console.log('--- RUNNING SEO & SCHEMA VERIFICATION ---');
  let passCount = 0;

  for (const route of routes) {
    const url = `http://localhost:3000${route}`;
    const res = await fetch(url);
    if (!res.ok) {
      console.error(`FAIL [${res.status}]: ${url}`);
      continue;
    }
    const html = await res.text();

    const hasCanonical = html.includes('rel="canonical"');
    const hasSchema = html.includes('application/ld+json');
    const hasVNHAX = html.includes('VNHAX');

    // Extract JSON-LD blocks
    const jsonLdMatches = [...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)];
    let jsonValid = true;
    for (const match of jsonLdMatches) {
      try {
        JSON.parse(match[1]);
      } catch (e) {
        jsonValid = false;
        console.error(`JSON-LD Parse Error on ${route}:`, e.message);
      }
    }

    console.log(`✓ ${route} -> Status: ${res.status}, Canonical: ${hasCanonical}, Schema: ${jsonLdMatches.length} block(s), JSON Valid: ${jsonValid}`);
    passCount++;
  }

  // Check 301 redirects
  const redirectRoutes = ['/repo-ollama', '/repo-aider', '/article-ai-tools-github-repos'];
  console.log('\n--- VERIFYING 301 REDIRECTS ---');
  for (const r of redirectRoutes) {
    const res = await fetch(`http://localhost:3000${r}`, { redirect: 'manual' });
    const location = res.headers.get('location');
    console.log(`Redirect ${r} -> Status: ${res.status}, Location: ${location}`);
  }

  console.log(`\nVerification complete. Verified ${passCount}/${routes.length} core pages.`);
}

test();
