import type { Metadata } from 'next';
import Link from 'next/link';
import SiteHeader from '@/components/SiteHeader';
import SiteFooter from '@/components/SiteFooter';
import Breadcrumbs from '@/components/Breadcrumbs';
import { BRAND_CONFIG, getBreadcrumbSchema, getFAQSchema } from '@/lib/seo';
import { getBlogsBySilo } from '@/lib/blog';

export const metadata: Metadata = {
  title: 'Cloud Infrastructure & AI Runtimes Hub',
  description:
    'Architectural evaluation of cloud platforms, AI inference clusters, serverless edge runtimes, and database infrastructure. Evaluate latency, portability, and lock-in risk.',
  alternates: {
    canonical: `${BRAND_CONFIG.siteUrl}/technology`,
  },
  openGraph: {
    title: `Cloud Infrastructure & AI Runtimes | ${BRAND_CONFIG.shortName}`,
    description:
      'Architectural evaluation of cloud platforms, AI inference clusters, serverless edge runtimes, and database infrastructure. Evaluate latency, portability, and lock-in risk.',
    url: `${BRAND_CONFIG.siteUrl}/technology`,
    siteName: BRAND_CONFIG.shortName,
    type: 'website',
  },
};

const PLATFORM_FAQS = [
  {
    question: 'How do I avoid cloud vendor lock-in when building modern web applications?',
    answer:
      'Standardize on open container formats (Docker/OCI) and runtime-agnostic protocols like standard Web APIs (fetch, Request, Response). Avoid building deep dependencies on proprietary cloud vendor APIs when standard open-source equivalents (e.g. PostgreSQL over proprietary document stores) exist.',
  },
  {
    question: 'What is the latency difference between edge inference and centralized GPU clusters?',
    answer:
      'Centralized GPU clusters (like AWS us-east-1) typically introduce 70ms-150ms of network transit latency depending on client location. Edge inference runs models within 10ms-30ms of users at global points of presence, dramatically improving Time-to-First-Token for interactive user experiences.',
  },
  {
    question: 'Why are custom inference LPUs (like Groq) faster than standard GPUs for LLMs?',
    answer:
      'Standard GPUs are optimized for parallel graphics and matrix batching with high memory latency. Language Processing Units (LPUs) utilize on-chip SRAM with instantaneous memory bandwidth, eliminating memory bus bottlenecks for sequential autoregressive token generation.',
  },
  {
    question: 'When should an engineering team migrate from serverless to dedicated compute?',
    answer:
      'Serverless is ideal for spiky, unpredictable traffic and rapid iteration. When baseline request concurrency becomes continuous and monthly cloud bills exceed the cost of dedicated instances (often around $2,000-$5,000/month in serverless execution and egress), migrating core services to dedicated containers or Kubernetes yields significant margin savings.',
  },
];

export default async function TechnologyPage() {
  const techArticles = await getBlogsBySilo('technology');
  const breadcrumbs = [
    { name: 'Home', url: '/' },
    { name: 'Tech Platforms', url: '/technology' },
  ];

  const collectionSchema = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'Tech Platforms Hub',
    description:
      'Architectural analysis of modern cloud platforms, AI inference clusters, serverless edge runtimes, and distributed systems.',
    url: `${BRAND_CONFIG.siteUrl}/technology`,
    publisher: {
      '@type': 'Organization',
      name: BRAND_CONFIG.name,
      url: BRAND_CONFIG.siteUrl,
    },
  };

  const faqSchema = getFAQSchema(PLATFORM_FAQS);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <SiteHeader activeNav="technology" variant="standard" />

      <main className="hub-page">
        <div className="hub-inner">
          <Breadcrumbs items={[{ label: 'Tech Platforms' }]} />

          <header className="hub-header">
            <p className="section-kicker">Systems &amp; infrastructure</p>
            <h1 className="page-title">tech platforms &amp; systems architecture</h1>
            <p className="page-lede">
              Architectural evaluation of modern cloud platforms, AI inference clusters, serverless edge runtimes, and distributed systems. Evaluate latency, portability, unit economics, and lock-in risks before you build.
            </p>
          </header>

          {/* Core Platform Pillars */}
          <section className="topic-section" aria-labelledby="platform-pillars">
            <h2 id="platform-pillars" className="topic-section-title">
              Infrastructure Pillars
            </h2>
            <div className="topic-grid">
              <Link className="topic-card" href="/technology/platforms">
                <span className="card-eyebrow">Cloud Platforms</span>
                <h3>Platform Adoption Guide</h3>
                <p>
                  Comprehensive architectural evaluation across serverless edge runtimes, GPU clusters, and modern cloud deployment models.
                </p>
                <span className="card-link">
                  Read guide <span aria-hidden="true">→</span>
                </span>
              </Link>

              <div className="topic-card">
                <span className="card-eyebrow">Silicon Clusters</span>
                <h3>AI Inference Hardware</h3>
                <p>
                  Profiling LPUs, unified-memory clusters, and GPU tensor parallelism for low-latency autoregressive token generation.
                </p>
                <span className="card-link">
                  Hardware Benchmarks
                </span>
              </div>

              <div className="topic-card">
                <span className="card-eyebrow">Edge Computing</span>
                <h3>V8 Isolates &amp; MicroVMs</h3>
                <p>
                  Comparing lightweight JavaScript isolate execution models with Firecracker micro-virtual machines for multi-tenant code isolation.
                </p>
                <span className="card-link">
                  Systems Analysis
                </span>
              </div>
            </div>
          </section>

          {/* In-Depth Editorial Architectural Guide */}
          <section className="topic-section" aria-labelledby="platform-audit">
            <div className="editorial-feature-card">
              <span className="card-eyebrow">Architectural Evaluation</span>
              <h3 id="platform-audit">Five Hard Questions Before Choosing a Cloud or Inference Platform</h3>
              <p>
                A platform tier is more than marketing claims and initial free credits. Before building your engineering infrastructure on any provider, evaluate these foundational operational boundaries:
              </p>
              <div className="editorial-feature-columns">
                <div className="editorial-column-item">
                  <h4>⚡ Latency vs. Throughput Curves</h4>
                  <p>
                    Profile cold-start behavior, Time-To-First-Token under high concurrency, global points of presence, and HTTP/2 Server-Sent Events (SSE) streaming stability.
                  </p>
                </div>
                <div className="editorial-column-item">
                  <h4>🔓 Vendor Lock-In Defense</h4>
                  <p>
                    Quantify the migration effort. Prioritize providers running standard OCI Docker containers over proprietary edge isolates with closed database bindings.
                  </p>
                </div>
                <div className="editorial-column-item">
                  <h4>💸 Egress &amp; Unit Economics</h4>
                  <p>
                    Audit network bandwidth egress penalties, per-token billing multipliers, and cost curves when request traffic scales by an order of magnitude.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Curated Platform Deep-Dives */}
          <section className="topic-section" aria-labelledby="systems-radar">
            <h2 id="systems-radar" className="topic-section-title">
              2026 Systems Architecture Deep-Dives
            </h2>
            <p className="topic-section-desc">
              Analysis of production platform choices, silicon shifts, and state management patterns.
            </p>
            <div className="card-grid hub-card-grid" style={{ marginTop: '20px' }}>
              <div className="card card--content">
                <span className="card-eyebrow">Silicon Innovation</span>
                <h3>Custom LPUs &amp; SRAM Processing</h3>
                <p>
                  Architectures shifting from high-latency HBM memory to on-chip SRAM LPUs like Groq, enabling sub-20ms generation speeds for conversational AI.
                </p>
                <span className="card-link">Explore Silicon Analysis <span aria-hidden="true">→</span></span>
              </div>

              <div className="card card--content">
                <span className="card-eyebrow">Distributed Compute</span>
                <h3>Edge WebAssembly Micro-Runtimes</h3>
                <p>
                  WASM and WebGPU bringing lightweight, zero-cold-start sandboxed compute directly to distributed points of presence worldwide.
                </p>
                <span className="card-link">Explore Edge Runtimes <span aria-hidden="true">→</span></span>
              </div>

              <div className="card card--content">
                <span className="card-eyebrow">State Management</span>
                <h3>Embedded SQLite &amp; Vector Storage</h3>
                <p>
                  Why relational databases with pgvector and embedded SQLite (Turso libSQL) frequently outperform complex standalone vector databases in production.
                </p>
                <span className="card-link">Explore Data Storage <span aria-hidden="true">→</span></span>
              </div>

              <div className="card card--content">
                <span className="card-eyebrow">Agent Isolation</span>
                <h3>Firecracker MicroVM Sandboxing</h3>
                <p>
                  Sub-5ms ephemeral virtual machine provisioning on Fly.io and AWS for safe execution of untrusted code and autonomous agent tool loops.
                </p>
                <span className="card-link">Explore Sandboxing <span aria-hidden="true">→</span></span>
              </div>
            </div>
          </section>

          {/* Featured Platform Architecture & Acceleration Guides */}
          {techArticles.length > 0 && (
            <section className="topic-section" aria-labelledby="tech-articles-heading">
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px', flexWrap: 'wrap', gap: '12px' }}>
                <div>
                  <h2 id="tech-articles-heading" className="topic-section-title" style={{ margin: 0 }}>
                    Platform Architecture &amp; Acceleration Guides
                  </h2>
                  <p style={{ fontSize: '14.5px', color: '#64748b', margin: '4px 0 0' }}>
                    Hardware benchmarks, GPU compute scaling, and distributed model serving infrastructure.
                  </p>
                </div>
                <Link href="/blog" style={{ fontSize: '13.5px', fontWeight: 600, color: '#2563eb' }}>
                  View All Guides →
                </Link>
              </div>

              <div className="card-grid hub-card-grid">
                {techArticles.map((article) => (
                  <Link
                    key={article.slug}
                    className="card card--content"
                    href={`/blog/${article.slug}`}
                    style={{ textDecoration: 'none' }}
                  >
                    <span className="card-eyebrow">
                      {article.frontmatter.category || 'Tech Platforms'} · {article.frontmatter.readTime || '8 min read'}
                    </span>
                    <h3>{article.frontmatter.title}</h3>
                    <p>{article.frontmatter.description}</p>
                    <span className="card-link">
                      Read Guide <span aria-hidden="true">→</span>
                    </span>
                  </Link>
                ))}
              </div>
            </section>
          )}

          {/* Frequently Asked Questions */}
          <section className="topic-section" aria-labelledby="plat-faq-heading">
            <h2 id="plat-faq-heading" className="topic-section-title">
              Frequently asked questions
            </h2>
            <p className="topic-section-desc">
              Architectural decisions on cloud lock-in, serverless tradeoffs, and inference costs.
            </p>
            <div className="hub-faq-list">
              {PLATFORM_FAQS.map((faq, i) => (
                <details key={i} className="hub-faq-item">
                  <summary className="hub-faq-trigger">
                    <span>{faq.question}</span>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><polyline points="6 9 12 15 18 9"/></svg>
                  </summary>
                  <div className="hub-faq-content">
                    {faq.answer}
                  </div>
                </details>
              ))}
            </div>
          </section>

          {/* Bottom Note */}
          <section className="hub-note">
            <h2>Systems are decisions, not checklists</h2>
            <p>
              A platform is more than a marketing tier. The crucial question is whether it can carry your operational workload safely, predictably, and without creating an insurmountable maintenance or billing debt your team cannot afford.
            </p>
          </section>
        </div>
      </main>

      <SiteFooter />
    </>
  );
}
