import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import SiteHeader from '@/components/SiteHeader';
import SiteFooter from '@/components/SiteFooter';
import Breadcrumbs from '@/components/Breadcrumbs';
import { getAllRepos } from '@/lib/repos-data';
import { BRAND_CONFIG, getBreadcrumbSchema } from '@/lib/seo';

export const metadata: Metadata = {
  title: 'Top GitHub Repos for Developers',
  description:
    'A practical starting list of GitHub repositories for local AI, application development, image generation, and developer workflows.',
  alternates: {
    canonical: `${BRAND_CONFIG.siteUrl}/developer-resources/github-repos`,
  },
};

export default function GitHubReposPage() {
  const repos = getAllRepos();

  const breadcrumbs = [
    { name: 'Home', url: '/' },
    { name: 'Developer Resources', url: '/developer-resources' },
    { name: 'GitHub Repositories', url: '/developer-resources/github-repos' },
  ];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'CollectionPage',
            name: 'GitHub Repositories for Developers',
            description:
              'A practical starting list of GitHub repositories for local AI, application development, image generation, and developer workflows.',
            url: `${BRAND_CONFIG.siteUrl}/developer-resources/github-repos`,
            isPartOf: {
              '@type': 'CollectionPage',
              name: 'Developer Resources',
              url: `${BRAND_CONFIG.siteUrl}/developer-resources`,
            },
          }),
        }}
      />

      <SiteHeader activeNav="developer" variant="standard" />

      <main className="hub-page">
        <div className="hub-inner">
          <Breadcrumbs
            items={[
              { label: 'Developer Resources', href: '/developer-resources' },
              { label: 'GitHub Repositories' },
            ]}
          />

          <header className="hub-header">
            <p className="section-kicker">Developer resources</p>
            <h1 className="page-title">github repositories</h1>
            <p className="page-lede">
              A curated starting point for developer-facing open-source projects. Each link leads to
              the project source; evaluate current releases, open issues, compatibility, and terms
              before integrating anything into your stack.
            </p>
          </header>

          <section className="topic-section" aria-labelledby="repositories">
            <h2 id="repositories" className="topic-section-title">
              Explore by use case
            </h2>

            {repos.length === 0 ? (
              <div
                style={{
                  padding: '48px 24px',
                  textAlign: 'center',
                  background: '#f8fafc',
                  border: '1px solid #e2e8f0',
                  borderRadius: '12px',
                  margin: '20px 0',
                }}
              >
                <div
                  style={{
                    width: '48px',
                    height: '48px',
                    borderRadius: '50%',
                    background: '#eff6ff',
                    color: '#2563eb',
                    display: 'grid',
                    placeItems: 'center',
                    margin: '0 auto 16px',
                    fontSize: '20px',
                  }}
                >
                  ⚡
                </div>
                <h3
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: '18px',
                    fontWeight: 700,
                    color: '#0f172a',
                    marginBottom: '8px',
                  }}
                >
                  Repositories Being Updated
                </h3>
                <p style={{ fontSize: '14.5px', color: '#64748b', maxWidth: '540px', margin: '0 auto 20px', lineHeight: 1.6 }}>
                  Our curated GitHub repository index is currently being refreshed with fresh benchmarking metrics and audited releases. Check back soon for updated repository breakdowns.
                </p>
                <Link href="/developer-resources" className="btn btn--dark" style={{ height: '38px', padding: '0 18px', fontSize: '13px' }}>
                  Back to Developer Resources
                </Link>
              </div>
            ) : (
              <div className="repo-grid">
                {repos.map((repo) => (
                  <Link key={repo.slug} className="repo-card" href={`/repos/${repo.slug}`}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
                      <span style={{ fontSize: '11.5px', fontWeight: 600, color: '#2563eb', background: '#eff6ff', padding: '2px 8px', borderRadius: '4px' }}>
                        {repo.language}
                      </span>
                      <span style={{ fontSize: '12px', fontWeight: 650, color: '#92400e', background: '#fef3c7', padding: '2px 8px', borderRadius: '4px' }}>
                        ⭐ {repo.stars}
                      </span>
                    </div>
                    {repo.image && (
                      <div
                        style={{
                          marginBottom: '12px',
                          borderRadius: '8px',
                          overflow: 'hidden',
                          border: '1px solid #e2e8f0',
                          background: '#0a0d16',
                          aspectRatio: '16/10',
                        }}
                      >
                        <Image
                          src={repo.image}
                          alt={`${repo.name} overview`}
                          fill
                          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                          style={{
                            objectFit: 'contain',
                          }}
                        />
                      </div>
                    )}
                    <h3>{repo.name}</h3>
                    <p>{repo.summary}</p>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '12px' }}>
                      <span style={{ fontSize: '11.5px', color: '#64748b' }}>License: {repo.license}</span>
                      <span style={{ color: '#2563eb', fontWeight: 600, fontSize: '13px' }}>
                        Architecture &amp; Breakdown →
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </section>

          <section className="hub-note">
            <h2>Need help choosing?</h2>
            <p>
              Explore our{' '}
              <Link href="/blog">
                engineering guides and technical articles
              </Link>{' '}
              for use-case-first overviews of local models, retrieval frameworks, image tools, and coding assistants.
            </p>
          </section>
        </div>
      </main>

      <SiteFooter />
    </>
  );
}
