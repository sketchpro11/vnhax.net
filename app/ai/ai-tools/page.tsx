import type { Metadata } from 'next';
import Link from 'next/link';
import SiteHeader from '@/components/SiteHeader';
import SiteFooter from '@/components/SiteFooter';
import Breadcrumbs from '@/components/Breadcrumbs';
import { getAllBlogs } from '@/lib/blog';
import { getAllRepos } from '@/lib/repos-data';
import { BRAND_CONFIG, getBreadcrumbSchema, getFAQSchema } from '@/lib/seo';

export const metadata: Metadata = {
  title: 'AI Tools & Frameworks Directory',
  description:
    'Curated directory and architectural breakdowns of top AI tools: local LLM runtimes, autonomous coding agents, diffusion interfaces, and orchestration frameworks.',
  alternates: {
    canonical: `${BRAND_CONFIG.siteUrl}/ai/ai-tools`,
  },
  openGraph: {
    title: `AI Tools & Frameworks Directory | ${BRAND_CONFIG.shortName}`,
    description:
      'Curated directory and architectural breakdowns of top AI tools: local LLM runtimes, autonomous coding agents, diffusion interfaces, and orchestration frameworks.',
    url: `${BRAND_CONFIG.siteUrl}/ai/ai-tools`,
    siteName: BRAND_CONFIG.shortName,
    type: 'website',
  },
};

const AI_TOOLS_LIST = [
  {
    name: 'Agent-Reach',
    slug: 'agent-reach',
    category: 'Multi-Platform Agent Retrieval',
    badge: 'Python',
    stars: '90.6k ★',
    desc: 'Gives AI agents direct, zero-API-fee internet access across 13+ platforms—including X/Twitter, Reddit, YouTube, GitHub, and web pages.',
    href: '/repos/agent-reach',
  },
  {
    name: 'Caveman AI',
    slug: 'caveman',
    category: 'Token Optimization & LLM Proxy',
    badge: 'Go / Shell',
    stars: '507 ★',
    desc: 'A high-speed Go proxy and terminal preprocessor that aggressively strips conversational prose from AI coding agents to slash LLM token costs.',
    href: '/repos/caveman',
  },
  {
    name: 'Ponytail',
    slug: 'ponytail',
    category: 'AI Coding Agent Constraints',
    badge: 'JavaScript',
    stars: '1,281 ★',
    desc: 'A runtime constraints and prompt-engineering harness that prevents AI coding agents from writing bloated, over-engineered code by enforcing YAGNI.',
    href: '/repos/ponytail',
  },
  {
    name: 'ECC (Everything Claude Code)',
    slug: 'ecc',
    category: 'Enterprise Agent Harness',
    badge: 'TypeScript / Shell',
    stars: '897 ★',
    desc: 'An enterprise agent-harness optimization system providing 68 specialized persona agents, 293 custom skills, and automated verification loops.',
    href: '/repos/ecc',
  },
  {
    name: 'Impeccable',
    slug: 'impeccable',
    category: 'Frontend & UI Design System',
    badge: 'TypeScript',
    stars: '699 ★',
    desc: 'A dedicated frontend and UI design system harness for AI coding agents featuring 24 design commands and live design auditing.',
    href: '/repos/impeccable',
  },
  {
    name: 'Effect',
    slug: 'effect',
    category: 'Production TypeScript Runtime',
    badge: 'TypeScript',
    stars: '11.4k ★',
    desc: 'The definitive production-grade standard library for enterprise TypeScript, providing typed errors, concurrency, and telemetry for AI agent loops.',
    href: '/repos/effect',
  },
];

export default async function AIToolsPage() {
  const posts = await getAllBlogs();
  const repos = getAllRepos();

  const breadcrumbs = [
    { name: 'Home', url: '/' },
    { name: 'Innovation & AI', url: '/ai' },
    { name: 'AI Tools & Frameworks', url: '/ai/ai-tools' },
  ];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'CollectionPage',
            name: 'AI Tools & Frameworks Directory',
            description:
              'Curated directory and architectural breakdowns of top AI tools: local LLM runtimes, autonomous coding agents, diffusion interfaces, and orchestration frameworks.',
            url: `${BRAND_CONFIG.siteUrl}/ai/ai-tools`,
            isPartOf: {
              '@type': 'CollectionPage',
              name: 'Innovation & AI',
              url: `${BRAND_CONFIG.siteUrl}/ai`,
            },
          }),
        }}
      />

      <SiteHeader activeNav="ai" variant="standard" />

      <main className="hub-page">
        <div className="hub-inner">
          <Breadcrumbs
            items={[
              { label: 'Innovation & AI', href: '/ai' },
              { label: 'AI Tools & Frameworks' },
            ]}
          />

          <header className="hub-header">
            <p className="section-kicker">Curated Directory &amp; Architecture</p>
            <h1 className="page-title">ai tools &amp; frameworks</h1>
            <p className="page-lede">
              A vetted index of open-source runtimes, agent frameworks, and image pipelines. Inspect architecture breakdowns, hardware constraints, and production benchmarks.
            </p>
          </header>

          {/* Tools Grid */}
          <section className="topic-section" aria-labelledby="tools-directory-heading">
            <h2 id="tools-directory-heading" className="topic-section-title">
              Verified Open-Source AI Tools
            </h2>
            <div className="card-grid hub-card-grid">
              {AI_TOOLS_LIST.map((tool) => (
                <Link key={tool.slug} className="card card--content" href={tool.href}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
                    <span className="card-eyebrow" style={{ margin: 0 }}>
                      {tool.category}
                    </span>
                    <span style={{ fontSize: '11px', fontWeight: 650, color: '#16a34a', background: '#dcfce7', padding: '2px 8px', borderRadius: '4px' }}>
                      {tool.stars}
                    </span>
                  </div>
                  <h3>{tool.name}</h3>
                  <p>{tool.desc}</p>
                  <span className="card-link">
                    Architecture &amp; Breakdown <span aria-hidden="true">→</span>
                  </span>
                </Link>
              ))}
            </div>
          </section>

          {/* Guides Section */}
          {posts.length > 0 && (
            <section className="topic-section" aria-labelledby="ai-guides-heading" style={{ marginTop: '36px' }}>
              <h2 id="ai-guides-heading" className="topic-section-title">
                Implementation Guides &amp; Tutorials
              </h2>
              <div className="card-grid hub-card-grid">
                {posts.map((post) => (
                  <Link key={post.slug} className="card card--content" href={`/blog/${post.slug}`}>
                    <span className="card-eyebrow">
                      {post.frontmatter.category || 'Guide'} · {post.frontmatter.readTime || '6 min read'}
                    </span>
                    <h3>{post.frontmatter.title}</h3>
                    <p>{post.frontmatter.description}</p>
                    <span className="card-link">
                      Read Guide <span aria-hidden="true">→</span>
                    </span>
                  </Link>
                ))}
              </div>
            </section>
          )}

          {/* Evaluation Guidelines */}
          <section className="hub-note" style={{ marginTop: '40px' }}>
            <h2>Five Criteria for Evaluating an AI Tool</h2>
            <p>
              1. <strong>Hardware Efficiency:</strong> Check minimum VRAM requirements and quantization degradation thresholds.<br />
              2. <strong>Zero-Telemetry Privacy:</strong> Ensure prompts and source code remain within your local execution boundary.<br />
              3. <strong>OpenAI-API Compatibility:</strong> Favor runtimes that allow drop-in swapping without changing client SDK code.<br />
              4. <strong>Active Maintenance:</strong> Review recent commit velocity, issue response times, and model family support.<br />
              5. <strong>Commercial Licensing:</strong> Confirm permissive Apache-2.0 or MIT licensing for production deployment.
            </p>
          </section>
        </div>
      </main>

      <SiteFooter />
    </>
  );
}
