import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import SiteHeader from '@/components/SiteHeader';
import SiteFooter from '@/components/SiteFooter';
import Breadcrumbs from '@/components/Breadcrumbs';
import { getAllRepos } from '@/lib/repos-data';
import { BRAND_CONFIG, getBreadcrumbSchema } from '@/lib/seo';

export const metadata: Metadata = {
  title: 'Trending GitHub Repos & Toolkits',
  description:
    'Curated open-source runtimes, libraries, and agent frameworks with interactive architecture breakdowns, benchmarks, and integration guides. Star counts refresh from GitHub on every build.',
  alternates: {
    canonical: `${BRAND_CONFIG.siteUrl}/repos`,
  },
  openGraph: {
    title: `Trending GitHub Repos & Toolkits | ${BRAND_CONFIG.shortName}`,
    description:
      'Curated open-source runtimes, libraries, and agent frameworks with interactive architecture breakdowns and benchmarks.',
    url: `${BRAND_CONFIG.siteUrl}/repos`,
    siteName: BRAND_CONFIG.shortName,
    type: 'website',
  },
};

export default function ReposIndexPage() {
  const repos = getAllRepos();

  const collectionSchema = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'GitHub Repositories & Architecture Guides',
    description:
      'Curated open-source runtimes, libraries, and agent frameworks with architectural breakdowns and empirical benchmarks.',
    url: `${BRAND_CONFIG.siteUrl}/repos`,
    publisher: {
      '@type': 'Organization',
      name: BRAND_CONFIG.name,
      url: BRAND_CONFIG.siteUrl,
    },
  };

  const breadcrumbSchema = getBreadcrumbSchema([
    { name: 'Home', url: '/' },
    { name: 'Developer Resources', url: '/developer-resources' },
    { name: 'Repositories', url: '/repos' },
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <SiteHeader variant="standard" />

      <main className="hub-page">
        <div className="hub-inner" style={{ maxWidth: '1200px' }}>
          <Breadcrumbs
            items={[
              { label: 'Developer Resources', href: '/developer-resources' },
              { label: 'Repositories' },
            ]}
          />

          <header className="hub-header" style={{ marginBottom: '32px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
              <span
                style={{
                  fontSize: '11px',
                  fontWeight: 700,
                  textTransform: 'uppercase',
                  letterSpacing: '0.06em',
                  color: '#b45309',
                  background: '#fef3c7',
                  padding: '4px 10px',
                  borderRadius: '99px',
                }}
              >
                🔥 GitHub Trending Leaderboard
              </span>
              <span style={{ fontSize: '12px', color: '#64748b' }}>
                Updated October 4, 2026
              </span>
            </div>
            <h1 className="page-title">github repositories</h1>
            <p className="page-lede">
              In-depth technical architecture breakdowns, empirical benchmarks, and integration patterns for the leading open-source repositories on today\'s GitHub trending leaderboard.
            </p>
          </header>

          {/* Quick Metrics Bar */}
          <section
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
              gap: '12px',
              marginBottom: '36px',
            }}
          >
            <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '12px', padding: '16px' }}>
              <div style={{ fontSize: '11px', textTransform: 'uppercase', color: '#64748b', fontWeight: 700 }}>Reviewed</div>
              <div style={{ fontSize: '24px', fontWeight: 800, color: '#0f172a', marginTop: '4px' }}>{repos.length} Repos</div>
              <div style={{ fontSize: '12px', color: '#94a3b8' }}>Independent write-ups</div>
            </div>
            <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '12px', padding: '16px' }}>
              <div style={{ fontSize: '11px', textTransform: 'uppercase', color: '#64748b', fontWeight: 700 }}>Focus Areas</div>
              <div style={{ fontSize: '24px', fontWeight: 800, color: '#2563eb', marginTop: '4px' }}>AI Agents &amp; TS</div>
              <div style={{ fontSize: '12px', color: '#94a3b8' }}>Token reduction, UI linters, Effect</div>
            </div>
            <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '12px', padding: '16px' }}>
              <div style={{ fontSize: '11px', textTransform: 'uppercase', color: '#64748b', fontWeight: 700 }}>Live Data</div>
              <div style={{ fontSize: '24px', fontWeight: 800, color: '#16a34a', marginTop: '4px' }}>GitHub API</div>
              <div style={{ fontSize: '12px', color: '#94a3b8' }}>Stars, forks &amp; license</div>
            </div>
            <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '12px', padding: '16px' }}>
              <div style={{ fontSize: '11px', textTransform: 'uppercase', color: '#64748b', fontWeight: 700 }}>License</div>
              <div style={{ fontSize: '24px', fontWeight: 800, color: '#9333ea', marginTop: '4px' }}>Open Source</div>
              <div style={{ fontSize: '12px', color: '#94a3b8' }}>Permissive MIT &amp; Apache-2.0</div>
            </div>
          </section>

          {/* Repos Grid */}
          <section className="topic-section" aria-labelledby="repos-heading">
            <h2 id="repos-heading" className="topic-section-title" style={{ marginBottom: '20px' }}>
              Repository Reviews
            </h2>

            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))',
                gap: '20px',
              }}
            >
              {repos.map((repo) => (
                <div
                  key={repo.slug}
                  style={{
                    background: '#ffffff',
                    border: '1px solid #e2e8f0',
                    borderRadius: '16px',
                    padding: '24px',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.03)',
                    transition: 'border-color 0.2s ease, transform 0.2s ease',
                  }}
                >
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '10px' }}>
                      <span
                        style={{
                          fontSize: '11px',
                          fontWeight: 700,
                          textTransform: 'uppercase',
                          letterSpacing: '0.05em',
                          color: '#b45309',
                          background: '#fef3c7',
                          padding: '3px 8px',
                          borderRadius: '99px',
                        }}
                      >
                        {repo.license}
                      </span>
                      <span
                        style={{
                          fontSize: '11px',
                          fontWeight: 600,
                          color: '#065f46',
                          background: '#ecfdf5',
                          padding: '3px 8px',
                          borderRadius: '99px',
                        }}
                      >
                        ⭐ {repo.stars}
                      </span>
                    </div>

                    {repo.image && (
                      <Link
                        href={`/repos/${repo.slug}`}
                        style={{
                          display: 'block',
                          marginBottom: '14px',
                          borderRadius: '10px',
                          overflow: 'hidden',
                          border: '1px solid #e2e8f0',
                          background: '#090d16',
                          aspectRatio: '16/10',
                        }}
                      >
                        <Image
                          src={repo.image}
                          alt={`${repo.name} architecture overview`}
                          fill
                          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                          style={{
                            objectFit: 'contain',
                          }}
                        />
                      </Link>
                    )}

                    <h3 style={{ fontSize: '20px', fontWeight: 700, color: '#0f172a', margin: '0 0 6px' }}>
                      <Link href={`/repos/${repo.slug}`} style={{ color: 'inherit', textDecoration: 'none' }}>
                        {repo.name}
                      </Link>
                    </h3>

                    <div style={{ fontSize: '12px', color: '#64748b', marginBottom: '12px', fontFamily: 'monospace' }}>
                      {repo.repoFullName} · {repo.language}
                    </div>

                    <p style={{ fontSize: '13.5px', color: '#475569', lineHeight: 1.55, margin: '0 0 16px' }}>
                      {repo.summary}
                    </p>

                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '20px' }}>
                      {repo.keyTakeaways.slice(0, 2).map((takeaway, i) => (
                        <span
                          key={i}
                          style={{
                            fontSize: '11.5px',
                            color: '#334155',
                            background: '#f1f5f9',
                            padding: '4px 8px',
                            borderRadius: '6px',
                            lineHeight: 1.4,
                          }}
                        >
                          ✓ {takeaway}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderTop: '1px solid #f1f5f9', paddingTop: '14px' }}>
                    <Link
                      href={`/repos/${repo.slug}`}
                      style={{
                        fontSize: '13.5px',
                        fontWeight: 600,
                        color: '#0f172a',
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '4px',
                      }}
                    >
                      Architecture &amp; Breakdown <span aria-hidden="true">→</span>
                    </Link>

                    <a
                      href={repo.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{ fontSize: '12px', color: '#64748b', textDecoration: 'none' }}
                      title="View on GitHub"
                    >
                      GitHub ↗
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Editorial Analysis: Why Agent Harness Repos Dominate 2026 */}
          <section className="topic-section" aria-labelledby="agent-trends" style={{ marginTop: '48px', marginBottom: '48px' }}>
            <div className="editorial-feature-card">
              <span className="card-eyebrow">Industry Intelligence</span>
              <h2 id="agent-trends" style={{ fontSize: '24px', fontWeight: 700, color: '#0f172a', margin: '8px 0 14px' }}>
                Why Agent Harness &amp; Optimization Tools Dominate GitHub Trending
              </h2>
              <p style={{ fontSize: '15px', lineHeight: 1.65, color: '#334155', marginBottom: '20px' }}>
                The October 2026 trending leaderboard marks a fundamental shift in software engineering: raw LLM foundation models have matured, shifting developer focus entirely toward <strong>agent harness optimization, token efficiency, and deterministic UI quality</strong>.
              </p>
              <div className="editorial-feature-columns">
                <div className="editorial-column-item">
                  <h4>🛑 Anti-Bloat &amp; YAGNI (Ponytail)</h4>
                  <p>
                    Coding agents write 3x more code than necessary when unconstrained. Modern developers are demanding tooling that forces agents to reuse existing code and prefer native runtime APIs.
                  </p>
                </div>
                <div className="editorial-column-item">
                  <h4>🎨 Visual Linters (Impeccable)</h4>
                  <p>
                    AI can write functional React code, but struggles with 8pt spacing and WCAG contrast. Headless browser quality detectors elevate raw AI output to production design systems.
                  </p>
                </div>
                <div className="editorial-column-item">
                  <h4>⚡ Token Compression (Caveman)</h4>
                  <p>
                    Conversational agent fluff consumes up to 45% of context windows. Proxies that strip prose while preserving code ensure engineers stay within token budgets and rate limits.
                  </p>
                </div>
                <div className="editorial-column-item">
                  <h4>🌐 13+ Platform Reach (Agent-Reach)</h4>
                  <p>
                    Live web and social data is walled behind pay-per-use APIs and IP blocks. Unified multi-backend routing gives agents zero-cost real-time retrieval across Twitter, Reddit, and video networks.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Bottom Authority Box */}
          <section className="hub-note">
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '10px' }}>
              <div style={{ width: '32px', height: '32px', borderRadius: '50%', overflow: 'hidden', flexShrink: 0, border: '1.5px solid #2563eb', background: '#0f172a' }}>
                <Image src="/icon.png" alt="VNHAX" width={32} height={32} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>
              <h2 style={{ margin: 0, fontSize: '20px' }}>How We Review Repositories</h2>
            </div>
            <p>
              Each write-up is based on the project&apos;s own README, documentation and source code on GitHub, plus our notes on where it fits in a real workflow. Benchmark figures quoted on these pages come from the project authors unless we say otherwise. VNHAX is not affiliated with any of these projects &mdash; always check the repository itself before adopting it.
            </p>
          </section>
        </div>
      </main>

      <SiteFooter />
    </>
  );
}
