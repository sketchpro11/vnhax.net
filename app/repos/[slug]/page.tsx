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

  const title = `${repo.name} Architecture & Deep Dive — ${BRAND_CONFIG.name}`;
  const description = repo.metaDescription;
  const url = `${BRAND_CONFIG.siteUrl}/repos/${slug}`;

  return {
    title,
    description,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title,
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
      title,
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

  const breadcrumbs = [
    { name: 'Home', url: '/' },
    { name: 'Developer Resources', url: '/developer-resources' },
    { name: 'Repositories', url: '/repos' },
    { name: repo.name, url: `/repos/${slug}` },
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

      <SiteHeader variant="standard" />

      <main className="hub-page">
        <div className="hub-inner">
          <Breadcrumbs
            items={[
              { label: 'Developer Resources', href: '/developer-resources' },
              { label: 'Repositories', href: '/repos' },
              { label: repo.name },
            ]}
          />

          <header className="hub-header">
            <p className="section-kicker">Repository Architecture &amp; Analysis</p>
            <h1 className="page-title">{repo.name.toLowerCase()}</h1>
            <p className="page-lede">{repo.summary}</p>

            <div
              style={{
                display: 'flex',
                gap: '12px',
                flexWrap: 'wrap',
                marginTop: '20px',
                fontSize: '13px',
                color: '#64748b',
              }}
            >
              <span style={{ background: '#f1f5f9', padding: '4px 10px', borderRadius: '6px' }}>
                📁 {repo.repoFullName}
              </span>
              <span style={{ background: '#f1f5f9', padding: '4px 10px', borderRadius: '6px' }}>
                💻 {repo.language}
              </span>
              <span style={{ background: '#f1f5f9', padding: '4px 10px', borderRadius: '6px' }}>
                ⚖️ {repo.license}
              </span>
              {repo.stars && (
                <span style={{ background: '#fef3c7', color: '#92400e', padding: '4px 10px', borderRadius: '6px', fontWeight: 600 }}>
                  ⭐ {repo.stars}
                </span>
              )}
            </div>
          </header>

          {repo.keyTakeaways && repo.keyTakeaways.length > 0 && (
            <KeyTakeaways items={repo.keyTakeaways} />
          )}

          <section className="hub-note" style={{ marginTop: '36px' }}>
            <h2>Repository Overview &amp; Verification</h2>
            <p>{repo.metaDescription}</p>
            <div style={{ marginTop: '20px' }}>
              <a
                className="btn btn--dark"
                href={repo.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                style={{ display: 'inline-flex', alignItems: 'center', height: '42px', padding: '0 20px', borderRadius: '8px', fontSize: '13.5px', textDecoration: 'none' }}
              >
                View on GitHub (Source) ↗
              </a>
            </div>
          </section>

          {repo.faqs && repo.faqs.length > 0 && (
            <section className="faq-section" style={{ marginTop: '48px', paddingTop: '32px', borderTop: '1px solid #e2e8f0' }}>
              <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '22px', fontWeight: 700, marginBottom: '20px', color: '#0f172a' }}>
                Frequently Asked Questions
              </h2>
              {repo.faqs.map((faq, i) => (
                <div key={i} className="faq-card" style={{ marginBottom: '14px', border: '1px solid #e2e8f0', borderRadius: '12px', background: '#ffffff' }}>
                  <details>
                    <summary className="faq-summary" style={{ padding: '16px 20px', fontWeight: 600, cursor: 'pointer' }}>
                      {faq.question}
                    </summary>
                    <div className="faq-body" style={{ padding: '16px 20px', borderTop: '1px solid #f1f5f9', color: '#475569', lineHeight: 1.65 }}>
                      <p>{faq.answer}</p>
                    </div>
                  </details>
                </div>
              ))}
            </section>
          )}
        </div>
      </main>

      <SiteFooter />
    </>
  );
}
