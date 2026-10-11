import type { Metadata } from 'next';
import Link from 'next/link';
import SiteHeader from '@/components/SiteHeader';
import SiteFooter from '@/components/SiteFooter';
import Breadcrumbs from '@/components/Breadcrumbs';
import AuthorAvatar from '@/components/AuthorAvatar';
import { getAllBlogs } from '@/lib/blog';
import { AUTHOR, AUTHOR_PAGE_PATH, getAuthorSchema } from '@/lib/author';
import { BRAND_CONFIG, CONTACT_EMAIL, getBreadcrumbSchema } from '@/lib/seo';

export const metadata: Metadata = {
  title: `${AUTHOR.name} — Author`,
  description: `${AUTHOR.name} is the founder and editor of VNHAX: a full-stack web developer since 2018 who writes about AI models, developer tools and open-source projects.`,
  alternates: {
    canonical: `${BRAND_CONFIG.siteUrl}${AUTHOR_PAGE_PATH}`,
  },
  openGraph: {
    title: `${AUTHOR.name} | ${BRAND_CONFIG.shortName}`,
    description: AUTHOR.shortBio,
    url: `${BRAND_CONFIG.siteUrl}${AUTHOR_PAGE_PATH}`,
    siteName: BRAND_CONFIG.shortName,
    type: 'profile',
  },
};

export default async function AuthorPage() {
  const posts = (await getAllBlogs()).filter((p) => (p.frontmatter.author || AUTHOR.name) === AUTHOR.name);

  const profileSchema = {
    '@context': 'https://schema.org',
    '@type': 'ProfilePage',
    url: `${BRAND_CONFIG.siteUrl}${AUTHOR_PAGE_PATH}`,
    mainEntity: getAuthorSchema(BRAND_CONFIG.siteUrl),
  };

  const breadcrumbSchema = getBreadcrumbSchema([
    { name: 'Home', url: '/' },
    { name: 'About', url: '/about' },
    { name: AUTHOR.name, url: AUTHOR_PAGE_PATH },
  ]);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(profileSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      <SiteHeader variant="home" />

      <main className="policy-page">
        <div style={{ maxWidth: '920px', margin: '0 auto', padding: '0 16px' }}>
          <Breadcrumbs items={[{ label: 'About', href: '/about' }, { label: AUTHOR.name }]} />

          <header style={{ display: 'flex', gap: '24px', alignItems: 'center', flexWrap: 'wrap', margin: '24px 0 32px' }}>
            <AuthorAvatar size={112} />
            <div style={{ minWidth: 0, flex: '1 1 280px' }}>
              <h1 className="policy-title" style={{ margin: '0 0 6px' }}>{AUTHOR.name}</h1>
              <p style={{ margin: '0 0 12px', color: '#475569', fontWeight: 600 }}>
                {AUTHOR.role} · {AUTHOR.jobTitle}
              </p>
              <p style={{ margin: 0, display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                {AUTHOR.links.map((link) => (
                  <a
                    key={link.url}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer me"
                    className="btn btn--outline"
                    style={{ fontSize: '12.5px', height: '34px', padding: '0 12px' }}
                  >
                    {link.label}
                  </a>
                ))}
              </p>
            </div>
          </header>

          <div className="policy-content">
            <section className="policy-section" id="about-me">
              <h2 className="policy-section-title">About Me</h2>
              {AUTHOR.bio.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
              <div className="about-team-tags" style={{ marginTop: '12px' }}>
                {AUTHOR.expertise.map((skill) => (
                  <span key={skill} className="about-team-tag">
                    {skill}
                  </span>
                ))}
              </div>
            </section>

            {AUTHOR.hardware.length > 0 && (
              <section className="policy-section" id="my-setup">
                <h2 className="policy-section-title">My Setup</h2>
                <p>When an article says I tested something myself, it was on this hardware:</p>
                <ul>
                  {AUTHOR.hardware.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </section>
            )}

            <section className="policy-section" id="how-i-write">
              <h2 className="policy-section-title">How I Write</h2>
              <p>
                I base articles on official announcements, documentation and pricing pages, and link to them so you can
                check the details. When I have tried something myself I say so; when I haven&apos;t, the article is an
                explainer. I use AI tools for research and drafting, and I review and edit everything before it is
                published. Read the full <Link href="/editorial-policy">Editorial Policy</Link>.
              </p>
              <p>
                Found a mistake? Email <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a> and I&apos;ll fix it.
              </p>
            </section>

            <section className="policy-section" id="articles">
              <h2 className="policy-section-title">Articles by {AUTHOR.name} ({posts.length})</h2>
              <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {posts.map((post) => (
                  <li key={post.slug} style={{ borderBottom: '1px solid #f1f5f9', paddingBottom: '12px' }}>
                    <Link href={`/blog/${post.slug}`} style={{ fontWeight: 600, color: '#0f172a' }}>
                      {post.frontmatter.title}
                    </Link>
                    <div style={{ fontSize: '12.5px', color: '#94a3b8', marginTop: '2px' }}>
                      {new Date(post.frontmatter.updatedAt || post.frontmatter.date).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric',
                      })}
                      {' · '}
                      {post.frontmatter.category}
                    </div>
                  </li>
                ))}
              </ul>
            </section>
          </div>
        </div>
      </main>

      <SiteFooter />
    </>
  );
}
