import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import SiteHeader from '@/components/SiteHeader';
import SiteFooter from '@/components/SiteFooter';
import HeroSearch from '@/components/HeroSearch';
import LatestBlogsSection from '@/components/LatestBlogsSection';
import { getLatestBlogSummaries } from '@/lib/blog';
import { getAllRepos } from '@/lib/repos-data';
import { BRAND_CONFIG } from '@/lib/seo';

export const metadata: Metadata = {
  title: 'vnhax — Tech News, AI Trends & Developer Hub',
  description:
    'Explore the latest tech news, AI trends, helpful education guides, free UI components, developer designs, and top GitHub repos all in one place.',
  alternates: {
    canonical: BRAND_CONFIG.siteUrl,
  },
  openGraph: {
    title: 'vnhax — Tech News, AI Trends, Education Guides & Developer Repos',
    description:
      'Explore the latest tech news, AI trends, helpful education guides, free UI components, developer designs, and top GitHub repos all in one place.',
    url: BRAND_CONFIG.siteUrl,
    siteName: BRAND_CONFIG.name,
    type: 'website',
  },
};

export default function HomePage() {
  const blogs = getLatestBlogSummaries();
  const repos = getAllRepos();

  return (
    <>
      <SiteHeader variant="home" />

      <main>
        <section className="hero">
          <h1 className="wordmark">
            vnhax
            <span style={{ position: 'absolute', width: '1px', height: '1px', padding: 0, margin: '-1px', overflow: 'hidden', clip: 'rect(0, 0, 0, 0)', whiteSpace: 'nowrap', border: 0 }}>
              {' '}— Tech News, AI Trends, Education Guides &amp; Developer Tools
            </span>
          </h1>

          <p className="hero-description">
            Explore the latest tech news, AI trends, helpful education guides, free UI
            components, developer designs, and top GitHub repos all in one place.
          </p>

          <svg className="hero-scribble" viewBox="0 0 240 44" fill="none" aria-hidden="true">
            <path
              d="M5 34C52 13 128 6 235 19"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinecap="round"
              opacity="0.85"
            />
            <path
              d="M36 40C88 24 156 20 206 27"
              stroke="currentColor"
              strokeWidth="1.2"
              strokeLinecap="round"
              opacity="0.45"
            />
          </svg>

          <HeroSearch />

          <div className="brands" aria-label="Browse by company">
            <Link className="brand" href="/openai" aria-label="OpenAI tools, models and guides">
              <svg
                className="brand-icon"
                width={26}
                height={26}
                viewBox="0 0 24 24"
                fill="currentColor"
                aria-hidden="true"
              >
                <path d="M22.2819 9.8211a5.9847 5.9847 0 0 0-.5157-4.9108 6.0462 6.0462 0 0 0-6.5098-2.9A6.0651 6.0651 0 0 0 4.9807 4.1818a5.9847 5.9847 0 0 0-3.9977 2.9 6.0462 6.0462 0 0 0 .7427 7.0966 5.98 5.98 0 0 0 .511 4.9107 6.051 6.051 0 0 0 6.5146 2.9001A5.9847 5.9847 0 0 0 13.2599 24a6.0557 6.0557 0 0 0 5.7718-4.2058 5.9894 5.9894 0 0 0 3.9977-2.9001 6.0557 6.0557 0 0 0-.7475-7.0729zm-9.022 12.6081a4.4755 4.4755 0 0 1-2.8764-1.0408l.1419-.0804 4.7783-2.7582a.7948.7948 0 0 0 .3927-.6813v-6.7369l2.02 1.1686a.071.071 0 0 1 .038.052v5.5826a4.504 4.504 0 0 1-4.4945 4.4944zm-9.6607-4.1254a4.4708 4.4708 0 0 1-.5346-3.0137l.142.0852 4.783 2.7582a.7712.7712 0 0 0 .7806 0l5.8428-3.3685v2.3324a.0804.0804 0 0 1-.0332.0615L9.74 19.9502a4.4992 4.4992 0 0 1-6.1408-1.6464zM2.3408 7.8956a4.485 4.485 0 0 1 2.3655-1.9728V11.6a.7664.7664 0 0 0 .3879.6765l5.8144 3.3543-2.0201 1.1685a.0757.0757 0 0 1-.071 0l-4.8303-2.7865A4.504 4.504 0 0 1 2.3408 7.872zm16.5963 3.8558L13.1038 8.364 15.1192 7.2a.0757.0757 0 0 1 .071 0l4.8303 2.7913a4.4944 4.4944 0 0 1-.6765 8.1042v-5.6772a.79.79 0 0 0-.407-.667zm2.0107-3.0231l-.142-.0852-4.7735-2.7818a.7759.7759 0 0 0-.7854 0L9.409 9.2297V6.8974a.0662.0662 0 0 1 .0284-.0615l4.8303-2.7866a4.4992 4.4992 0 0 1 6.6802 4.66zM8.3065 12.863l-2.02-1.1638a.0804.0804 0 0 1-.038-.0567V6.0742a4.4992 4.4992 0 0 1 7.3757-3.4537l-.142.0805L8.704 5.459a.7948.7948 0 0 0-.3927.6813zm1.0976-2.3654l2.602-1.4998 2.6069 1.4998v2.9994l-2.5974 1.4997-2.6067-1.4997Z" />
              </svg>
              <span className="brand-name">OpenAI</span>
            </Link>
            <Link className="brand" href="/anthropic" aria-label="Anthropic Claude resources">
              <svg
                className="brand-icon"
                width={26}
                height={26}
                viewBox="0 0 24 24"
                fill="currentColor"
                aria-hidden="true"
              >
                <path d="M17.3041 3.541h-3.6718l6.696 16.918H24Zm-10.6082 0L0 20.459h3.7442l1.3693-3.5527h7.0052l1.3693 3.5528h3.7442L10.5363 3.5409Zm-.3712 10.2232 2.2914-5.9456 2.2914 5.9456Z" />
              </svg>
              <span className="brand-name">Anthropic</span>
            </Link>
            <Link className="brand" href="/google" aria-label="Google AI tools and models">
              <svg
                className="brand-icon"
                width={26}
                height={26}
                viewBox="0 0 24 24"
                fill="currentColor"
                aria-hidden="true"
              >
                <path d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z" />
              </svg>
              <span className="brand-name">Google</span>
            </Link>
            <Link className="brand" href="/github" aria-label="GitHub developer repositories">
              <svg
                className="brand-icon"
                width={26}
                height={26}
                viewBox="0 0 24 24"
                fill="currentColor"
                aria-hidden="true"
              >
                <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
              </svg>
              <span className="brand-name">GitHub</span>
            </Link>
            <Link className="brand" href="/xai" aria-label="xAI models and tools">
              <svg
                className="brand-icon"
                width={26}
                height={26}
                viewBox="0 0 24 24"
                fill="currentColor"
                aria-hidden="true"
              >
                <path d="M2.6 2h5.1l4.3 5.9L16.3 2h5.1l-7 9.2 7.3 10.8h-5.1l-4.6-6.7-4.6 6.7H2.3l7.4-10.7L2.6 2z" />
              </svg>
              <span className="brand-name">xAI</span>
            </Link>
            <Link className="brand" href="/meta" aria-label="Meta open source models">
              <svg
                className="brand-icon"
                width={26}
                height={26}
                viewBox="0 0 24 24"
                fill="currentColor"
                aria-hidden="true"
              >
                <path d="M6.915 4.03c-1.968 0-3.683 1.28-4.871 3.113C.704 9.208 0 11.883 0 14.449c0 .706.07 1.369.21 1.973a6.624 6.624 0 0 0 .265.86 5.297 5.297 0 0 0 .371.761c.696 1.159 1.818 1.927 3.593 1.927 1.497 0 2.633-.671 3.965-2.444.76-1.012 1.144-1.626 2.663-4.32l.756-1.339.186-.325c.061.1.121.196.183.3l2.152 3.595c.724 1.21 1.665 2.556 2.47 3.314 1.046.987 1.992 1.22 3.06 1.22 1.075 0 1.876-.355 2.455-.843a3.743 3.743 0 0 0 .81-.973c.542-.939.861-2.127.861-3.745 0-2.72-.681-5.357-2.084-7.45-1.282-1.912-2.957-2.93-4.716-2.93-1.047 0-2.088.467-3.053 1.308-.652.57-1.257 1.29-1.82 2.05-.69-.875-1.335-1.547-1.958-2.056-1.182-.966-2.315-1.303-3.454-1.303zm10.16 2.053c1.147 0 2.188.758 2.992 1.999 1.132 1.748 1.647 4.195 1.647 6.4 0 1.548-.368 2.9-1.839 2.9-.58 0-1.027-.23-1.664-1.004-.496-.601-1.343-1.878-2.832-4.358l-.617-1.028a44.908 44.908 0 0 0-1.255-1.98c.07-.109.141-.224.211-.327 1.12-1.667 2.118-2.602 3.358-2.602zm-10.201.553c1.265 0 2.058.791 2.675 1.446.307.327.737.871 1.234 1.579l-1.02 1.566c-.757 1.163-1.882 3.017-2.837 4.338-1.191 1.649-1.81 1.817-2.486 1.817-.524 0-1.038-.237-1.383-.794-.263-.426-.464-1.13-.464-2.046 0-2.221.63-4.535 1.66-6.088.454-.687.964-1.226 1.533-1.533a2.264 2.264 0 0 1 1.088-.285z" />
              </svg>
              <span className="brand-name">Meta</span>
            </Link>
          </div>
        </section>

        {/* Latest Blogs Section with dynamic tabs & real articles */}
        <LatestBlogsSection blogs={blogs} />

        <section className="content-section repo-section">
          <h2 className="section-title">github repos</h2>
          <p className="section-subheading">
            Curated open-source runtimes, libraries, and agent frameworks with interactive architecture breakdowns.
          </p>

          {repos.length === 0 ? (
            <div
              style={{
                padding: '48px 24px',
                textAlign: 'center',
                background: '#f8fafc',
                border: '1px solid #e2e8f0',
                borderRadius: '16px',
                maxWidth: '680px',
                margin: '24px auto',
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
                  fontSize: '20px',
                  fontWeight: 700,
                  color: '#0f172a',
                  marginBottom: '8px',
                }}
              >
                Repository Intelligence Updating
              </h3>
              <p style={{ fontSize: '14.5px', color: '#64748b', lineHeight: 1.6, marginBottom: '20px' }}>
                New repository reviews are on the way. In the meantime, browse our developer resources.
              </p>
              <Link href="/developer-resources/github-repos" className="btn btn--dark" style={{ height: '38px', padding: '0 18px', fontSize: '13px', textDecoration: 'none' }}>
                Explore Developer Resources
              </Link>
            </div>
          ) : (
            <div className="repo-liquid-grid">
              {repos.map((repo) => (
                <Link key={repo.slug} className="liquid-card" href={`/repos/${repo.slug}`}>
                  <div className="liquid-card-inner">
                    {repo.image ? (
                      <div className="liquid-card-media">
                        <Image
                          src={repo.image}
                          alt={`${repo.name} architecture overview`}
                          fill
                          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                          className="liquid-card-img"
                        />
                        <div className="liquid-card-overlay" />
                      </div>
                    ) : (
                      <div className="liquid-mesh" />
                    )}
                    <div className="liquid-card-badges">
                      <span className="liquid-badge">{repo.category}</span>
                      {repo.stars && <span className="liquid-badge liquid-badge--star">⭐ {repo.stars}</span>}
                    </div>
                    <div className="liquid-card-content">
                      <h3 className="liquid-card-title">{repo.name}</h3>
                      <p className="liquid-card-desc">{repo.summary}</p>
                      <div className="liquid-card-btn">
                        <span>Explore Architecture</span>
                        <span aria-hidden="true">→</span>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </section>
      </main>

      <SiteFooter />
    </>
  );
}
