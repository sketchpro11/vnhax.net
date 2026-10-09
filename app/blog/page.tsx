import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import SiteHeader from '@/components/SiteHeader';
import SiteFooter from '@/components/SiteFooter';
import Breadcrumbs from '@/components/Breadcrumbs';
import { getAllBlogs } from '@/lib/blog';
import { BRAND_CONFIG, getBreadcrumbSchema } from '@/lib/seo';

export const metadata: Metadata = {
  title: 'AI Articles, Guides & Research',
  description:
    'Deep technical analysis, architectural comparisons, and hands-on guides for open-source AI models, developer tools, and engineering workflows.',
  alternates: {
    canonical: `${BRAND_CONFIG.siteUrl}/blog`,
  },
  openGraph: {
    title: `AI Articles, Guides & Research | ${BRAND_CONFIG.shortName}`,
    description:
      'Deep technical analysis, architectural comparisons, and hands-on guides for open-source AI models and developer tools.',
    url: `${BRAND_CONFIG.siteUrl}/blog`,
    siteName: BRAND_CONFIG.shortName,
    type: 'website',
  },
};

export default async function BlogIndexPage() {
  const posts = await getAllBlogs();

  const breadcrumbs = [
    { name: 'Home', url: '/' },
    { name: 'Blog', url: '/blog' },
  ];

  const collectionSchema = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'VNHAX Articles & Engineering Guides',
    description:
      'Technical analysis and hands-on guides covering open-source AI models, developer infrastructure, and engineering workflows.',
    url: `${BRAND_CONFIG.siteUrl}/blog`,
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

      <SiteHeader activeNav="blog" variant="standard" />

      <main className="container" style={{ maxWidth: '1080px', margin: '0 auto', padding: '40px 20px 80px' }}>
        <Breadcrumbs items={[{ label: 'Articles & Guides' }]} />

        <header style={{ marginBottom: '48px', marginTop: '16px' }}>
          <div className="article-kicker">
            <span className="kicker-tag">Editorial &amp; Research</span>
          </div>
          <h1 className="section-title" style={{ fontSize: 'clamp(28px, 3.5vw, 42px)', marginTop: '8px', marginBottom: '16px' }}>
            Articles &amp; Engineering Guides
          </h1>
          <p style={{ fontSize: '18px', color: '#64748b', maxWidth: '720px', lineHeight: 1.6 }}>
            In-depth guides, architectural teardowns, and practical benchmarks on local AI models, open-source repositories, and developer productivity tools.
          </p>
        </header>

        {posts.length === 0 ? (
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
              ✍️
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
              Articles &amp; Guides Updating
            </h2>
            <p style={{ fontSize: '15px', color: '#64748b', lineHeight: 1.6, marginBottom: '24px' }}>
              Our editorial and engineering research team is currently preparing fresh technical guides and benchmarks. Drop any <code style={{ background: '#e2e8f0', padding: '2px 6px', borderRadius: '4px', fontSize: '13px' }}>.md</code> or <code style={{ background: '#e2e8f0', padding: '2px 6px', borderRadius: '4px', fontSize: '13px' }}>.mdx</code> file into <code style={{ background: '#e2e8f0', padding: '2px 6px', borderRadius: '4px', fontSize: '13px' }}>content/blogs/</code> to publish instantly.
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
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '28px' }}>
            {posts.map((post) => (
              <article
                key={post.slug}
                className="repo-card"
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  borderRadius: '16px',
                  border: '1px solid #e2e8f0',
                  padding: '24px',
                  background: '#ffffff',
                  boxShadow: '0 2px 8px rgba(0, 0, 0, 0.04)',
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                  <span className="repo-tag" style={{ background: '#eff6ff', color: '#2563eb' }}>
                    {post.frontmatter.category || 'Article'}
                  </span>
                  <span style={{ fontSize: '12.5px', color: '#94a3b8' }}>{post.frontmatter.readTime}</span>
                </div>

                <h2 style={{ fontSize: '19px', fontFamily: 'var(--font-display)', fontWeight: 700, lineHeight: 1.35, marginBottom: '10px' }}>
                  <Link href={`/blog/${post.slug}`} style={{ color: '#0f172a', textDecoration: 'none' }}>
                    {post.frontmatter.title}
                  </Link>
                </h2>

                <p style={{ fontSize: '14.5px', color: '#64748b', lineHeight: 1.6, flexGrow: 1, marginBottom: '16px' }}>
                  {post.frontmatter.description}
                </p>

                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
                  <div style={{ width: '22px', height: '22px', borderRadius: '50%', overflow: 'hidden', flexShrink: 0, border: '1px solid #2563eb', background: '#0f172a' }}>
                    <Image
                      src="/icon.png"
                      alt="VNHAX"
                      width={22}
                      height={22}
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                  </div>
                  <span style={{ fontSize: '12.5px', fontWeight: 600, color: '#334155' }}>
                    {post.frontmatter.author || 'VNHAX Engineering Team'}
                  </span>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '14px', borderTop: '1px solid #f1f5f9', fontSize: '13px' }}>
                  <span style={{ color: '#64748b' }}>
                    {new Date(post.frontmatter.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                  </span>
                  <Link
                    href={`/blog/${post.slug}`}
                    style={{ fontWeight: 600, color: '#2563eb', display: 'inline-flex', alignItems: 'center', gap: '4px' }}
                  >
                    Read Guide →
                  </Link>
                </div>
              </article>
            ))}
          </div>
        )}
      </main>

      <SiteFooter />
    </>
  );
}
