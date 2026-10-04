import type { Metadata } from 'next';
import Link from 'next/link';
import SiteHeader from '@/components/SiteHeader';
import SiteFooter from '@/components/SiteFooter';
import Breadcrumbs from '@/components/Breadcrumbs';
import { getAllRepos } from '@/lib/repos-data';
import { BRAND_CONFIG } from '@/lib/seo';

export const metadata: Metadata = {
  title: `GitHub Repositories & Architecture Guides — ${BRAND_CONFIG.name}`,
  description:
    'Curated open-source runtimes, libraries, and agent frameworks with interactive architecture breakdowns and benchmarking.',
  alternates: {
    canonical: `${BRAND_CONFIG.siteUrl}/repos`,
  },
  openGraph: {
    title: `GitHub Repositories — ${BRAND_CONFIG.name}`,
    description:
      'Curated open-source runtimes, libraries, and agent frameworks with interactive architecture breakdowns.',
    url: `${BRAND_CONFIG.siteUrl}/repos`,
    siteName: BRAND_CONFIG.name,
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
      'Curated open-source runtimes, libraries, and agent frameworks with architectural breakdowns.',
    url: `${BRAND_CONFIG.siteUrl}/repos`,
    publisher: {
      '@type': 'Organization',
      name: BRAND_CONFIG.name,
      url: BRAND_CONFIG.siteUrl,
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionSchema) }}
      />

      <SiteHeader variant="standard" />

      <main className="hub-page">
        <div className="hub-inner">
          <Breadcrumbs
            items={[
              { label: 'Developer Resources', href: '/developer-resources' },
              { label: 'Repositories' },
            ]}
          />

          <header className="hub-header">
            <p className="section-kicker">Developer Intelligence</p>
            <h1 className="page-title">github repositories</h1>
            <p className="page-lede">
              In-depth technical architecture breakdowns, hardware requirements, and integration patterns for leading open-source projects.
            </p>
          </header>

          {repos.length === 0 ? (
            <div
              style={{
                padding: '64px 32px',
                textAlign: 'center',
                background: '#f8fafc',
                border: '1px solid #e2e8f0',
                borderRadius: '16px',
                maxWidth: '680px',
                margin: '20px auto 40px',
              }}
            >
              <div
                style={{
                  width: '56px',
                  height: '56px',
                  borderRadius: '50%',
                  background: '#eff6ff',
                  color: '#2563eb',
                  display: 'grid',
                  placeItems: 'center',
                  margin: '0 auto 20px',
                  fontSize: '24px',
                }}
              >
                ⚡
              </div>
              <h2
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '22px',
                  fontWeight: 700,
                  color: '#0f172a',
                  marginBottom: '10px',
                }}
              >
                Repository Intelligence Updating
              </h2>
              <p style={{ fontSize: '15px', color: '#64748b', lineHeight: 1.6, marginBottom: '24px' }}>
                Our engineering team is currently vetting, benchmarking, and auditing new open-source repositories. Verified repositories with deep architecture teardowns will be published here shortly.
              </p>
              <Link
                href="/"
                className="btn btn--dark"
                style={{ display: 'inline-flex', alignItems: 'center', height: '42px', padding: '0 20px', borderRadius: '8px', fontSize: '14px', textDecoration: 'none' }}
              >
                Return to Homepage
              </Link>
            </div>
          ) : (
            <section className="topic-section">
              <div className="repo-grid">
                {repos.map((repo) => (
                  <Link key={repo.slug} className="repo-card" href={`/repos/${repo.slug}`}>
                    <h3>{repo.name}</h3>
                    <p>{repo.summary}</p>
                    <span>Architecture &amp; Breakdown →</span>
                  </Link>
                ))}
              </div>
            </section>
          )}
        </div>
      </main>

      <SiteFooter />
    </>
  );
}
