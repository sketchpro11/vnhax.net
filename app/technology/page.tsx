import type { Metadata } from 'next';
import Link from 'next/link';
import SiteHeader from '@/components/SiteHeader';
import SiteFooter from '@/components/SiteFooter';
import Breadcrumbs from '@/components/Breadcrumbs';
import { BRAND_CONFIG, getFAQSchema } from '@/lib/seo';
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
      'Network distance adds round-trip time to every request, so serving from a region close to your users lowers time to first token. How much depends on where your users are and which regions your provider offers; measure from where your users are rather than relying on general figures.',
  },
  {
    question: 'Why are custom inference LPUs (like Groq) faster than standard GPUs for LLMs?',
    answer:
      'Generating tokens one at a time is limited by how fast model weights can be read from memory. Chips like the Groq LPU keep weights in large on-chip SRAM, which has much higher bandwidth than the external memory GPUs use, so single-stream generation can be faster. GPUs remain more flexible and better suited to large batches and training.',
  },
  {
    question: 'When should an engineering team migrate from serverless to dedicated compute?',
    answer:
      'Serverless suits spiky, unpredictable traffic and fast iteration. Once traffic is steady around the clock, compare your monthly serverless bill with the cost of always-on instances for the same load; when the dedicated option is clearly cheaper and your team can run it, moving core services makes sense.',
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

          {/* Platform evaluation checklist (merged from /technology/platforms) */}
          <section className="topic-section" aria-labelledby="platform-checklist">
            <h2 id="platform-checklist" className="topic-section-title">
              Five questions before adopting any platform
            </h2>
            <ol className="hub-checklist" style={{ paddingLeft: '20px', lineHeight: 1.7, color: '#334155', fontSize: '15px' }}>
              <li>
                <strong>Does it fit your current architecture without a big refactor?</strong> Map the network access, data models and identity
                boundaries it needs before a proof of concept turns into a production dependency.
              </li>
              <li>
                <strong>Can you change course if pricing or terms change?</strong> Check data export, API portability and whether your code can run
                on standard containers or another cloud.
              </li>
              <li>
                <strong>Who owns operations?</strong> Count the cost of logging, monitoring, incident response, regional failover and upgrades, not
                just day-one setup.
              </li>
              <li>
                <strong>What enters the vendor&apos;s trust boundary?</strong> Read the data retention and training policies and the compliance
                reports (such as SOC 2) that matter to your customers.
              </li>
              <li>
                <strong>What does success look like at peak load?</strong> Write down latency targets (p95, p99), throughput and a monthly budget
                cap before you move critical workloads.
              </li>
            </ol>
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
                    Explainers on AI hardware, model serving and developer infrastructure.
                  </p>
                </div>
                <Link href="/blog" style={{ fontSize: '13.5px', fontWeight: 600, color: '#2563eb' }}>
                  View All Guides →
                </Link>
              </div>

              <div className="card-grid hub-card-grid">
                {techArticles.slice(0, 9).map((article) => (
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
