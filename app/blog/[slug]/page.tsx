import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import SiteHeader from '@/components/SiteHeader';
import SiteFooter from '@/components/SiteFooter';
import Breadcrumbs from '@/components/Breadcrumbs';
import ArticleActions from '@/components/ArticleActions';
import CodeBlockEnhancer from '@/components/CodeBlockEnhancer';
import ReadingProgressBar from '@/components/ReadingProgressBar';
import SlideDeck from '@/components/SlideDeck';
import StickyArticleBar from '@/components/StickyArticleBar';
import { getBlogPost, getAllBlogSlugs, getAllBlogs } from '@/lib/blog';
import { BRAND_CONFIG, getBreadcrumbSchema } from '@/lib/seo';

interface BlogPostPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const slugs = getAllBlogSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getBlogPost(slug);

  if (!post) {
    return {
      title: `Article Not Found — ${BRAND_CONFIG.name}`,
      robots: { index: false, follow: false },
    };
  }

  const title = post.frontmatter.title;
  const description = post.frontmatter.description;
  const url = `${BRAND_CONFIG.siteUrl}/blog/${slug}`;

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
      publishedTime: post.frontmatter.date,
      modifiedTime: post.frontmatter.updatedAt || post.frontmatter.date,
      authors: [post.frontmatter.author || 'VNHAX Editorial'],
      tags: post.frontmatter.tags,
      images: [
        {
          url: `${BRAND_CONFIG.siteUrl}/og-image.png`,
          width: 1200,
          height: 630,
          alt: post.frontmatter.title,
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

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = await getBlogPost(slug);

  if (!post) {
    notFound();
  }

  const allPosts = await getAllBlogs();
  const relatedPosts = allPosts.filter((p) => p.slug !== slug).slice(0, 4);

  const breadcrumbs = [
    { name: 'Home', url: '/' },
    { name: 'AI & Machine Learning', url: '/ai' },
    { name: 'Blog', url: '/blog' },
    { name: post.frontmatter.title, url: `/blog/${slug}` },
  ];

  const techArticleSchema = {
    '@context': 'https://schema.org',
    '@type': 'TechArticle',
    headline: post.frontmatter.title,
    description: post.frontmatter.description,
    datePublished: post.frontmatter.date,
    dateModified: post.frontmatter.updatedAt || post.frontmatter.date,
    author: {
      '@type': 'Organization',
      name: post.frontmatter.author || BRAND_CONFIG.name,
      url: BRAND_CONFIG.siteUrl,
    },
    publisher: {
      '@type': 'Organization',
      name: BRAND_CONFIG.name,
      url: BRAND_CONFIG.siteUrl,
      logo: {
        '@type': 'ImageObject',
        url: `${BRAND_CONFIG.siteUrl}/og-image.png`,
      },
    },
    mainEntityOfPage: `${BRAND_CONFIG.siteUrl}/blog/${slug}`,
    keywords: post.frontmatter.tags?.join(', '),
    articleSection: post.frontmatter.category || 'Technology',
  };

  const formattedDate = new Date(post.frontmatter.date).toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(techArticleSchema) }}
      />

      <ReadingProgressBar />
      <StickyArticleBar
        title={post.frontmatter.title}
        category={post.frontmatter.category}
        slug={slug}
      />
      <SiteHeader activeNav="blog" variant="standard" />
      <CodeBlockEnhancer />

      <main>
        <article className="post-layout">
          <div className="post-main">
            <Breadcrumbs
              items={[
                { label: 'Articles & Guides', href: '/blog' },
                { label: post.frontmatter.title },
              ]}
            />

            <header className="article-header">
              <div className="article-kicker">
                <span className="kicker-tag">{post.frontmatter.category || 'Editorial Guide'}</span>
              </div>
              <h1 className="post-title">{post.frontmatter.title}</h1>
              
              <div className="post-meta-bar">
                <div className="author-chip">
                  <div className="author-avatar" aria-hidden="true">
                    {(post.frontmatter.author || 'V')[0]}
                  </div>
                  <div className="author-info">
                    <span className="author-name">{post.frontmatter.author || 'VNHAX Editorial'}</span>
                    <div className="author-meta">
                      <time dateTime={post.frontmatter.date}>{formattedDate}</time>
                      <span>•</span>
                      <span>{post.frontmatter.readTime}</span>
                    </div>
                  </div>
                </div>

                <ArticleActions />
              </div>
            </header>

            {/* Render Markdown Content as Semantic HTML with interactive embeds */}
            {post.html.includes('<!-- SLIDE_DECK_EMBED -->') ? (
              (() => {
                const [before, after] = post.html.split('<!-- SLIDE_DECK_EMBED -->');
                return (
                  <>
                    <div className="prose post-body" dangerouslySetInnerHTML={{ __html: before }} />
                    <SlideDeck />
                    <div className="prose post-body" dangerouslySetInnerHTML={{ __html: after }} />
                  </>
                );
              })()
            ) : (
              <div
                className="prose post-body"
                dangerouslySetInnerHTML={{ __html: post.html }}
              />
            )}

            {post.frontmatter.tags && post.frontmatter.tags.length > 0 && (
              <div className="article-tags-wrap" style={{ marginTop: '48px', paddingTop: '24px', borderTop: '1px solid #e2e8f0' }}>
                <span style={{ fontSize: '13px', fontWeight: 600, color: '#64748b', marginRight: '12px' }}>Tags:</span>
                <div style={{ display: 'inline-flex', flexWrap: 'wrap', gap: '8px' }}>
                  {post.frontmatter.tags.map((tag) => (
                    <span
                      key={tag}
                      style={{
                        fontSize: '12px',
                        padding: '4px 10px',
                        borderRadius: '6px',
                        background: '#f1f5f9',
                        color: '#334155',
                        fontWeight: 500,
                      }}
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>

          <aside className="post-sidebar">
            <div className="sidebar-sticky">
              {/* Animated Quick Cheat Sheet Card */}
              <div className="quick-cheatsheet-card">
                <div className="cheatsheet-header">
                  <div className="cheatsheet-badge-icon" aria-hidden="true">⚡</div>
                  <span className="cheatsheet-title">Quick Cheat Sheet</span>
                </div>
                <div className="cheatsheet-items">
                  <div className="cheatsheet-item">
                    <span className="cheatsheet-item-label">Compile Persistent Model:</span>
                    <div className="cheatsheet-code-wrap">
                      <code>ollama create -f Modelfile</code>
                    </div>
                  </div>
                  <div className="cheatsheet-item">
                    <span className="cheatsheet-item-label">Check VRAM &amp; Offloading:</span>
                    <div className="cheatsheet-code-wrap">
                      <code>ollama ps</code>
                    </div>
                  </div>
                  <div className="cheatsheet-item">
                    <span className="cheatsheet-item-label">4-bit KV Compression:</span>
                    <div className="cheatsheet-code-wrap">
                      <code>OLLAMA_KV_CACHE_TYPE=q4_0</code>
                    </div>
                  </div>
                </div>
              </div>

              {/* Animated Sticky Platform Navigation */}
              <div className="sidebar-platform-nav-widget">
                <div className="platform-nav-header">
                  <div className="platform-nav-badge-icon" aria-hidden="true">🌐</div>
                  <span className="platform-nav-title">Platform Navigation</span>
                </div>
                <ul className="platform-nav-list">
                  <li>
                    <Link href="/blog" className="platform-nav-link">
                      <span>Editorial Guides</span>
                      <span className="arrow-indicator">→</span>
                    </Link>
                  </li>
                  <li>
                    <Link href="/ai/ai-tools" className="platform-nav-link">
                      <span>AI Tools &amp; Local LLMs</span>
                      <span className="arrow-indicator">→</span>
                    </Link>
                  </li>
                  <li>
                    <Link href="/repos" className="platform-nav-link">
                      <span>Open-Source Repositories</span>
                      <span className="arrow-indicator">→</span>
                    </Link>
                  </li>
                  <li>
                    <Link href="/ui-components" className="platform-nav-link">
                      <span>Modern UI Components</span>
                      <span className="arrow-indicator">→</span>
                    </Link>
                  </li>
                  <li>
                    <Link href="/developer-resources" className="platform-nav-link">
                      <span>Developer Resources</span>
                      <span className="arrow-indicator">→</span>
                    </Link>
                  </li>
                </ul>
              </div>

              {relatedPosts.length > 0 && (
                <div className="sidebar-widget">
                  <h2>Related Articles</h2>
                  <ol className="trending-list">
                    {relatedPosts.map((related) => (
                      <li key={related.slug}>
                        <Link href={`/blog/${related.slug}`}>
                          {related.frontmatter.title}
                        </Link>
                      </li>
                    ))}
                  </ol>
                </div>
              )}
            </div>
          </aside>
        </article>
      </main>

      <SiteFooter />
    </>
  );
}
