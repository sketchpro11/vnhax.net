import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import SiteHeader from '@/components/SiteHeader';
import SiteFooter from '@/components/SiteFooter';
import Breadcrumbs from '@/components/Breadcrumbs';
import KeyTakeaways from '@/components/KeyTakeaways';
import { getAllRepos, getRepoBySlug } from '@/lib/repos-data';
import { BRAND_CONFIG, getBreadcrumbSchema } from '@/lib/seo';

interface RepoPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const repos = getAllRepos();
  return repos.map((r) => ({ slug: r.slug }));
}

export async function generateMetadata({ params }: RepoPageProps): Promise<Metadata> {
  const { slug } = await params;
  const repo = getRepoBySlug(slug);

  if (!repo) {
    return {
      title: `Repository Not Found — ${BRAND_CONFIG.name}`,
      robots: { index: false, follow: false },
    };
  }

  const title = `${repo.name} — Architecture, Benchmarks & Deep Dive | VNHAX`;
  const description = repo.metaDescription;
  const url = `${BRAND_CONFIG.siteUrl}/repos/${slug}`;

  return {
    title,
    description,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title: `${repo.name} Architecture & Technical Analysis | VNHAX`,
      description,
      url,
      siteName: BRAND_CONFIG.name,
      type: 'article',
      images: [
        {
          url: `${BRAND_CONFIG.siteUrl}/og-image.png`,
          width: 1200,
          height: 630,
          alt: repo.name,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${repo.name} Technical Architecture | VNHAX`,
      description,
      images: [`${BRAND_CONFIG.siteUrl}/og-image.png`],
    },
  };
}

export default async function RepoDetailPage({ params }: RepoPageProps) {
  const { slug } = await params;
  const repo = getRepoBySlug(slug);

  if (!repo) {
    notFound();
  }

  const allRepos = getAllRepos();
  const relatedRepos = allRepos.filter(r => r.slug !== slug).slice(0, 3);

  const breadcrumbs = [
    { label: 'Developer Resources', href: '/developer-resources' },
    { label: 'Repositories', href: '/repos' },
    { label: repo.name },
  ];

  const softwareSchema = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareSourceCode',
    name: repo.name,
    description: repo.metaDescription,
    codeRepository: repo.githubUrl,
    programmingLanguage: repo.language,
    license: repo.license,
    url: `${BRAND_CONFIG.siteUrl}/repos/${slug}`,
    publisher: {
      '@type': 'Organization',
      name: BRAND_CONFIG.name,
      url: BRAND_CONFIG.siteUrl,
    },
    author: {
      '@type': 'Organization',
      name: 'VNHAX Engineering Desk',
      url: BRAND_CONFIG.siteUrl,
    },
    dateModified: '2026-10-04T00:00:00Z',
  };

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: repo.faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };

  const breadcrumbSchema = getBreadcrumbSchema([
    { name: 'Home', url: '/' },
    { name: 'Developer Resources', url: '/developer-resources' },
    { name: 'Repositories', url: '/repos' },
    { name: repo.name, url: `/repos/${slug}` },
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareSchema) }}
      />
      {repo.faqs && repo.faqs.length > 0 && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      )}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <SiteHeader variant="standard" />

      <main className="hub-page">
        <div className="hub-inner" style={{ maxWidth: '1160px' }}>
          <Breadcrumbs items={breadcrumbs} />

          {/* Header */}
          <header className="hub-header" style={{ marginBottom: '28px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap', marginBottom: '12px' }}>
              <span
                style={{
                  fontSize: '11.5px',
                  fontWeight: 700,
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em',
                  color: '#2563eb',
                  background: '#eff6ff',
                  padding: '4px 10px',
                  borderRadius: '99px',
                }}
              >
                {repo.category}
              </span>
              <span
                style={{
                  fontSize: '11.5px',
                  fontWeight: 600,
                  color: '#92400e',
                  background: '#fef3c7',
                  padding: '4px 10px',
                  borderRadius: '99px',
                }}
              >
                🔥 {repo.trendRanking}
              </span>
              <span style={{ fontSize: '12px', color: '#94a3b8' }}>
                Verified on Oct 4, 2026
              </span>
            </div>

            <h1 className="page-title" style={{ textTransform: 'none', letterSpacing: '-0.03em' }}>
              {repo.name}
            </h1>
            <p className="page-lede" style={{ maxWidth: '780px' }}>
              {repo.summary}
            </p>

            <div
              style={{
                display: 'flex',
                gap: '12px',
                flexWrap: 'wrap',
                marginTop: '20px',
                fontSize: '13px',
                color: '#475569',
              }}
            >
              <span style={{ background: '#f1f5f9', padding: '6px 12px', borderRadius: '8px', fontWeight: 600 }}>
                📁 {repo.repoFullName}
              </span>
              <span style={{ background: '#f1f5f9', padding: '6px 12px', borderRadius: '8px', fontWeight: 600 }}>
                💻 {repo.language}
              </span>
              <span style={{ background: '#f1f5f9', padding: '6px 12px', borderRadius: '8px', fontWeight: 600 }}>
                ⚖️ {repo.license} License
              </span>
              {repo.stars && (
                <span style={{ background: '#ecfdf5', color: '#065f46', padding: '6px 12px', borderRadius: '8px', fontWeight: 700 }}>
                  ⭐ {repo.stars}
                </span>
              )}
            </div>
          </header>

          {/* Key Takeaways */}
          {repo.keyTakeaways && repo.keyTakeaways.length > 0 && (
            <KeyTakeaways items={repo.keyTakeaways} />
          )}

          {/* Deep Architectural Breakdown */}
          <section className="topic-section" aria-labelledby="why-use-heading" style={{ marginTop: '36px', marginBottom: '36px' }}>
            <div className="editorial-feature-card">
              <span className="card-eyebrow">Engineering Rationale</span>
              <h2 id="why-use-heading" style={{ fontSize: '22px', fontWeight: 700, color: '#0f172a', margin: '8px 0 14px' }}>
                Why Developers Should Adopt {repo.name}
              </h2>
              <p style={{ fontSize: '15px', lineHeight: 1.7, color: '#334155', margin: 0 }}>
                {repo.whyUse}
              </p>
            </div>
          </section>

          {/* Architecture & Mechanics */}
          <section className="topic-section" aria-labelledby="arch-heading" style={{ marginBottom: '36px' }}>
            <div style={{ background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '16px', padding: '28px', boxShadow: '0 2px 10px rgba(0,0,0,0.03)' }}>
              <span style={{ fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em', color: '#2563eb' }}>
                Under the Hood
              </span>
              <h2 id="arch-heading" style={{ fontSize: '22px', fontWeight: 700, color: '#0f172a', margin: '8px 0 14px' }}>
                Architecture &amp; Core Mechanics
              </h2>
              <p style={{ fontSize: '15px', lineHeight: 1.7, color: '#334155', marginBottom: '24px' }}>
                {repo.architecture}
              </p>

              {/* Benchmarks Subsection */}
              {repo.benchmarks && (
                <div style={{ background: '#f8fafc', borderLeft: '4px solid #16a34a', padding: '16px 20px', borderRadius: '0 12px 12px 0' }}>
                  <h3 style={{ fontSize: '14px', fontWeight: 700, color: '#166534', margin: '0 0 6px', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                    📊 Empirical Benchmarks &amp; Efficiency Gains
                  </h3>
                  <p style={{ fontSize: '14px', lineHeight: 1.6, color: '#334155', margin: 0 }}>
                    {repo.benchmarks}
                  </p>
                </div>
              )}
            </div>
          </section>

          {/* Quickstart & Installation */}
          {repo.quickstart && (
            <section className="topic-section" aria-labelledby="quickstart-heading" style={{ marginBottom: '40px' }}>
              <h2 id="quickstart-heading" className="topic-section-title">
                Quickstart &amp; Integration Commands
              </h2>
              <p className="topic-section-desc">
                Execute directly in your terminal to initialize and evaluate {repo.name}.
              </p>
              <pre
                style={{
                  background: '#0f172a',
                  color: '#f8fafc',
                  padding: '22px',
                  borderRadius: '14px',
                  overflowX: 'auto',
                  fontSize: '13.5px',
                  lineHeight: 1.6,
                  fontFamily: 'Consolas, Monaco, "Courier New", monospace',
                }}
              >
                <code>{repo.quickstart}</code>
              </pre>
            </section>
          )}

          {/* GitHub Source Link & Verification Box */}
          <section className="hub-note" style={{ marginTop: '20px', marginBottom: '40px' }}>
            <h2>Verified GitHub Upstream Source</h2>
            <p>
              VNHAX maintains independent architectural evaluations of trending developer repositories. Always inspect the current releases, open issues, and test suites on GitHub before deploying dependencies into enterprise production.
            </p>
            <div style={{ marginTop: '20px' }}>
              <a
                className="btn btn--dark"
                href={repo.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  height: '44px',
                  padding: '0 22px',
                  borderRadius: '10px',
                  fontSize: '14px',
                  fontWeight: 600,
                  textDecoration: 'none',
                }}
              >
                View {repo.repoFullName} on GitHub ↗
              </a>
            </div>
          </section>

          {/* Frequently Asked Questions */}
          {repo.faqs && repo.faqs.length > 0 && (
            <section className="faq-section" style={{ marginTop: '48px', paddingTop: '32px', borderTop: '1px solid #e2e8f0', marginBottom: '48px' }}>
              <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '24px', fontWeight: 700, marginBottom: '20px', color: '#0f172a' }}>
                Frequently Asked Questions
              </h2>
              <div className="hub-faq-list">
                {repo.faqs.map((faq, i) => (
                  <details key={i} className="hub-faq-item">
                    <summary className="hub-faq-trigger">
                      <span>{faq.question}</span>
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><polyline points="6 9 12 15 18 9"/></svg>
                    </summary>
                    <div className="hub-faq-content">
                      <p>{faq.answer}</p>
                    </div>
                  </details>
                ))}
              </div>
            </section>
          )}

          {/* Related Trending Repos */}
          <section className="topic-section" aria-labelledby="related-repos-heading" style={{ marginBottom: '60px' }}>
            <h2 id="related-repos-heading" className="topic-section-title">
              More Trending GitHub Repositories
            </h2>
            <div className="topic-grid" style={{ marginTop: '16px' }}>
              {relatedRepos.map(rel => (
                <Link key={rel.slug} href={`/repos/${rel.slug}`} className="topic-card">
                  <span className="card-eyebrow">{rel.category}</span>
                  <h3>{rel.name}</h3>
                  <p>{rel.summary}</p>
                  <span className="card-link">
                    Inspect Architecture <span aria-hidden="true">→</span>
                  </span>
                </Link>
              ))}
            </div>
          </section>
        </div>
      </main>

      <SiteFooter />
    </>
  );
}
