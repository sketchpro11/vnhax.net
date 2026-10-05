'use client';

import { useState } from 'react';
import Link from 'next/link';
import SiteHeader from '@/components/SiteHeader';
import SiteFooter from '@/components/SiteFooter';
import GlobalSearch from '@/components/GlobalSearch';
import { getAllRepos } from '@/lib/repos-data';

const SILO_CARDS = [
  {
    silo: 'ai',
    badgeClass: 'silo-badge--ai',
    badgeText: 'AI & Models',
    eyebrow: 'Research Hub',
    title: 'Local LLMs, model architectures & open-source AI frameworks',
    desc: 'Technical analysis and benchmarking of local runtimes, quantization, and agentic workflows.',
    linkText: 'Explore in AI Hub',
    href: '/ai/ai-tools',
  },
  {
    silo: 'developer',
    badgeClass: 'silo-badge--dev',
    badgeText: 'Developer Repos',
    eyebrow: 'Curated List',
    title: 'Top open-source developer repositories & high-impact GitHub projects',
    desc: 'Essential open-source libraries, CLI runtimes, developer environments, and architectural patterns.',
    linkText: 'Explore Developer Hub',
    href: '/developer-resources/github-repos',
  },
  {
    silo: 'ui',
    badgeClass: 'silo-badge--ui',
    badgeText: 'UI Components',
    eyebrow: 'Design Systems',
    title: 'Production-ready UI component patterns & interactive templates',
    desc: 'Modular interface patterns built with clean HTML/CSS and semantic accessibility in mind.',
    linkText: 'Explore UI Hub',
    href: '/ui-components',
  },
  {
    silo: 'technology',
    badgeClass: 'silo-badge--tech',
    badgeText: 'Tech & Platforms',
    eyebrow: 'Analysis',
    title: 'Modern platforms, inference infrastructure & engineering trends',
    desc: 'Architectural shifts in cloud inference, silicon accelerators, and software development platforms in 2026.',
    linkText: 'Explore Tech Hub',
    href: '/technology/platforms',
  },
];

export default function HomePage() {
  const [activeFilter, setActiveFilter] = useState('all');
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const repos = getAllRepos();

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'WebSite',
            name: 'vnhax',
            url: 'https://vnhax.net/',
            description:
              'Tech news, AI trends, education guides, free UI components, developer designs, and top GitHub repos.',
          }),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Organization',
            name: 'vnhax',
            url: 'https://vnhax.net/',
            sameAs: [
              'https://github.com/vnhax',
              'https://x.com/vnhax',
              'https://www.linkedin.com/company/vnhax',
            ],
          }),
        }}
      />

      <SiteHeader variant="home" />

      <main>
        <section className="hero">
          <h1 className="wordmark">vnhax</h1>

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

          <form
            className="search"
            role="search"
            onSubmit={(e) => {
              e.preventDefault();
              setIsSearchOpen(true);
            }}
          >
            <input
              className="search-input"
              type="search"
              name="q"
              placeholder="Search guides, AI models, repositories, UI components..."
              aria-label="Search vnhax"
              autoComplete="off"
              onClick={() => setIsSearchOpen(true)}
              onFocus={() => setIsSearchOpen(true)}
              readOnly
            />
            <button
              className="search-submit"
              type="button"
              onClick={() => setIsSearchOpen(true)}
              aria-label="Submit search"
            >
              <svg width="19" height="19" viewBox="0 0 17 17" fill="none" aria-hidden="true">
                <circle cx="7.5" cy="7.5" r="6.1" stroke="currentColor" strokeWidth="1.6" />
                <path
                  d="M12.4 12.4 16 16"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                />
              </svg>
            </button>
          </form>

          <GlobalSearch isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />

          <div className="brands" aria-label="Browse by company">
            <a className="brand" href="/ai/ai-tools" aria-label="OpenAI tools and models">
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
            </a>
            <a className="brand" href="/ai/ai-tools" aria-label="Anthropic Claude resources">
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
            </a>
            <a className="brand" href="/ai/ai-tools" aria-label="Google AI tools and models">
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
            </a>
            <a className="brand" href="/developer-resources/github-repos" aria-label="GitHub developer repositories">
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
            </a>
            <a className="brand" href="/ai/ai-tools" aria-label="xAI models and tools">
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
            </a>
            <a className="brand" href="/ai/ai-tools" aria-label="Meta open source models">
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
            </a>
          </div>
        </section>

        <section className="content-section" id="editorial-silos">
          <h2 className="section-title">latest blogs</h2>
          <p className="section-subheading">
            Curated deep-dives, developer frameworks, and open-source tooling grouped by topical silo.
          </p>

          <div className="silo-tabs-container">
            <div className="silo-tabs" role="tablist" aria-label="Filter articles by topical silo">
              <button
                className={`silo-tab ${activeFilter === 'all' ? 'active' : ''}`}
                type="button"
                data-filter="all"
                role="tab"
                aria-selected={activeFilter === 'all'}
                onClick={() => setActiveFilter('all')}
              >
                All Silos
              </button>
              <button
                className={`silo-tab ${activeFilter === 'ai' ? 'active' : ''}`}
                type="button"
                data-filter="ai"
                role="tab"
                aria-selected={activeFilter === 'ai'}
                onClick={() => setActiveFilter('ai')}
              >
                AI &amp; Models
              </button>
              <button
                className={`silo-tab ${activeFilter === 'developer' ? 'active' : ''}`}
                type="button"
                data-filter="developer"
                role="tab"
                aria-selected={activeFilter === 'developer'}
                onClick={() => setActiveFilter('developer')}
              >
                Dev &amp; Repos
              </button>
              <button
                className={`silo-tab ${activeFilter === 'ui' ? 'active' : ''}`}
                type="button"
                data-filter="ui"
                role="tab"
                aria-selected={activeFilter === 'ui'}
                onClick={() => setActiveFilter('ui')}
              >
                UI Components
              </button>
              <button
                className={`silo-tab ${activeFilter === 'technology' ? 'active' : ''}`}
                type="button"
                data-filter="technology"
                role="tab"
                aria-selected={activeFilter === 'technology'}
                onClick={() => setActiveFilter('technology')}
              >
                Tech &amp; News
              </button>
            </div>
          </div>

          <div className="card-grid card-grid--silos">
            {SILO_CARDS.map((card) => {
              const isHidden = activeFilter !== 'all' && card.silo !== activeFilter;
              return (
                <Link
                  key={card.silo}
                  className={`card card--content ${isHidden ? 'is-hidden' : ''}`}
                  href={card.href}
                  data-silo={card.silo}
                >
                  <div className="card-meta-bar">
                    <span className={`silo-badge ${card.badgeClass}`}>{card.badgeText}</span>
                    <span className="card-eyebrow">{card.eyebrow}</span>
                  </div>
                  <h3>{card.title}</h3>
                  <p>{card.desc}</p>
                  <span className="card-link">
                    {card.linkText} <span aria-hidden="true">→</span>
                  </span>
                </Link>
              );
            })}
          </div>
        </section>

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
                Our team is currently vetting and benchmarking fresh open-source models, developer tools, and agent frameworks. Verified repositories will appear here with deep architectural breakdowns.
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
                        <img
                          src={repo.image}
                          alt={`${repo.name} architecture overview`}
                          loading="lazy"
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

        {/* Liquid Glass Filter SVG Def */}
        <svg
          className="liquid-glass-svg-def"
          aria-hidden="true"
          style={{ position: 'absolute', width: 0, height: 0, pointerEvents: 'none', overflow: 'hidden' }}
        >
          <defs>
            <filter id="container-glass" x="0%" y="0%" width="100%" height="100%" colorInterpolationFilters="sRGB">
              <feTurbulence type="fractalNoise" baseFrequency="0.02 0.02" numOctaves={1} seed={1} result="turbulence" />
              <feGaussianBlur in="turbulence" stdDeviation="2" result="blurredNoise" />
              <feDisplacementMap in="SourceGraphic" in2="blurredNoise" scale={120} xChannelSelector="R" yChannelSelector="B" result="displaced" />
              <feGaussianBlur in="displaced" stdDeviation="4" result="finalBlur" />
              <feComposite in="finalBlur" in2="finalBlur" operator="over" />
            </filter>
          </defs>
        </svg>

        {/* Numbers That Matter Bento Section */}
        <div className="stats-container-wrap">
          <section className="stats-section" aria-labelledby="stats-heading">
            <div className="stats-header">
              <h2 id="stats-heading" className="stats-title">Numbers that matter</h2>
              <p className="stats-subtitle">
                A quick look at the impact, reach, and adoption of vnhax developer resources &amp; open-source breakdowns
              </p>
            </div>

            <div className="stats-bento-grid">
              {/* Card 1: Blue */}
              <div className="stats-card stats-card--blue">
                <svg
                  className="stats-card-icon"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.75"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="M18 8V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v7a2 2 0 0 0 2 2h8" />
                  <path d="M10 19v-3.96 3.15" />
                  <path d="M7 19h5" />
                  <rect width="6" height="10" x="16" y="12" rx="2" />
                </svg>
                <span className="stats-card-num">70%</span>
                <p className="stats-card-label">Faster local AI &amp; model setup</p>
              </div>

              {/* Card 2: Green */}
              <div className="stats-card stats-card--green">
                <svg
                  className="stats-card-icon"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.75"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <polygon points="13 19 22 12 13 5 13 19" />
                  <polygon points="2 19 11 12 2 5 2 19" />
                </svg>
                <span className="stats-card-num">5x</span>
                <p className="stats-card-label">Inference speedup with GGUF &amp; quantizations</p>
              </div>

              {/* Card 3: Red/Coral Featured Tall (Row-Span 2) */}
              <div className="stats-card stats-card--featured">
                <svg
                  className="stats-card-icon"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.75"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
                  <path d="M12 5 9.04 7.96a2.17 2.17 0 0 0 0 3.08v0c.82.82 2.13.85 3 .07l2.07-1.9a2.82 2.82 0 0 1 3.79 0l2.96 2.66" />
                  <path d="m18 15-2-2" />
                  <path d="m15 18-2-2" />
                </svg>
                <span className="stats-card-num">98%</span>
                <p className="stats-card-label">Developer satisfaction &amp; verified code</p>
                <svg
                  className="stats-card-illustration"
                  viewBox="0 0 500 500"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                >
                  <g id="freepik--background-complete--inject-152">
                    <path
                      d="M457.23,229.29s-.42-.11-1.17-.26a9.63,9.63,0,0,0-3.23-.09,8.77,8.77,0,0,0-4.31,1.89,9,9,0,0,0-3,4.85l0,0-.18.72-.28-.68a9.68,9.68,0,0,0-3.64-4.42,9.4,9.4,0,0,0-4.46-1.51,12.55,12.55,0,0,0-4.37.55,3.94,3.94,0,0,1,1.11-.48,9.21,9.21,0,0,1,3.28-.41A9.44,9.44,0,0,1,441.6,231a9.88,9.88,0,0,1,3.85,4.61l-.46,0,0-.05a9.26,9.26,0,0,1,3.23-5.08,9,9,0,0,1,7.86-1.64A3.69,3.69,0,0,1,457.23,229.29Z"
                      style={{ fill: '#e0e0e0' }}
                    />
                    <path
                      d="M84.61,170.39s-.42-.11-1.17-.26a9.63,9.63,0,0,0-3.23-.09,8.68,8.68,0,0,0-4.31,1.89,9,9,0,0,0-3,4.85l0,.05-.18.72-.28-.68a9.68,9.68,0,0,0-3.64-4.42,9.4,9.4,0,0,0-4.46-1.51,12.55,12.55,0,0,0-4.37.55A3.76,3.76,0,0,1,61,171a9.21,9.21,0,0,1,3.28-.41A9.44,9.44,0,0,1,69,172.08a9.94,9.94,0,0,1,3.85,4.61l-.46,0,0-.05a9.26,9.26,0,0,1,3.23-5.08A8.88,8.88,0,0,1,83.48,170,3.69,3.69,0,0,1,84.61,170.39Z"
                      style={{ fill: '#e0e0e0' }}
                    />
                    <path
                      d="M343.3,149.74a13.43,13.43,0,0,1-1.07,1.23,26.81,26.81,0,0,0-2.62,3.57,25.88,25.88,0,0,0-3.9,13.83v.17l-.48,0a23.24,23.24,0,0,0-6.37-12.69,31.84,31.84,0,0,0-4.66-3.77s.14,0,.39.17.6.31,1,.6a20.88,20.88,0,0,1,3.47,2.76,22.83,22.83,0,0,1,6.6,12.86l-.48,0v-.17a25.41,25.41,0,0,1,4.1-14,22.69,22.69,0,0,1,2.77-3.5c.36-.39.68-.66.88-.85A1.45,1.45,0,0,1,343.3,149.74Z"
                      style={{ fill: '#e0e0e0' }}
                    />
                    <path
                      fill="rgba(248, 113, 113, 0.2)"
                      d="M378.15,389.37C362.4,393.1,350.38,408.8,350.88,425c-10.09-11.12-28.54-13.39-41-5s-17.43,26.27-11,39.84c-14.91-11.64-39.16-8.41-50.51,6.72a31.53,31.53,0,0,0-47.51-18.25c-2.69-16.87-16.31-31.47-33-35.33s-35.29,3.28-45.12,17.25A38,38,0,0,0,63,438.85l10.11,3.26a55.43,55.43,0,0,1,41.18,34.57,43,43,0,0,1,69.85,9.12l77.85,0c19.38-.16,34.17.88,52.09,0,7.08-24.93,39.67-47.09,64.16-38.63a54.67,54.67,0,0,1,40-38.68C411.3,394.07,393.73,385.67,378.15,389.37Z"
                    />
                    <path fill="rgba(248, 113, 113, 0.2)" d="M418.91,408.31l-.63.14c.08.16.17.32.24.48Z" />
                    <path
                      fill="rgba(248, 113, 113, 0.2)"
                      d="M217.7,362.07c.6-4.33-5.52-7.9-10.11-8.27-2.2-.17-4.47.16-6.55-.56-4.5-1.57-6.29-7.38-10.68-9.23-3.28-1.39-7.06-.15-10.24,1.45s-6.32,3.61-9.88,3.84c-3.09.2-6.45-.95-9.15.56-2,1.13-3.07,3.45-4.93,4.82s-4.19,1.62-6.44,1.75-4.59.14-6.64,1.08-3.75,3.11-3.33,5.33Z"
                    />
                    <path
                      fill="rgba(248, 113, 113, 0.2)"
                      d="M436.07,118.35c.71-5.16-6.56-9.39-12-9.83-2.61-.21-5.32.18-7.78-.68-5.35-1.86-7.49-8.77-12.71-11-3.9-1.65-8.39-.18-12.17,1.72s-7.53,4.3-11.75,4.57c-3.68.24-7.67-1.13-10.89.67-2.39,1.34-3.65,4.1-5.86,5.73s-5,1.93-7.66,2.07-5.46.18-7.9,1.3-4.46,3.69-3.95,6.33Z"
                    />
                    <path
                      fill="rgba(248, 113, 113, 0.2)"
                      d="M151.33,91.44c.75-5.43-6.91-9.9-12.67-10.37-2.75-.22-5.61.2-8.21-.7-5.64-2-7.89-9.25-13.39-11.57-4.11-1.74-8.85-.19-12.83,1.81s-7.93,4.53-12.39,4.82c-3.87.25-8.08-1.19-11.47.7-2.53,1.41-3.85,4.33-6.18,6s-5.25,2-8.07,2.19-5.76.18-8.33,1.36-4.7,3.9-4.17,6.68Z"
                    />
                    <path
                      fill="rgba(248, 113, 113, 0.2)"
                      d="M454.46,298.2c1-7.32-9.32-13.34-17.08-14-3.71-.3-7.55.27-11.06-1-7.6-2.64-10.63-12.46-18.05-15.59-5.54-2.34-11.92-.26-17.3,2.45s-10.68,6.11-16.69,6.49c-5.22.34-10.89-1.6-15.46.95-3.4,1.9-5.19,5.83-8.33,8.14s-7.07,2.74-10.88,3-7.75.25-11.22,1.84-6.34,5.25-5.62,9Z"
                    />
                    <path
                      fill="rgba(248, 113, 113, 0.2)"
                      d="M163.49,246.18c.92-6.63-8.44-12.08-15.46-12.64-3.36-.27-6.84.24-10-.87-6.88-2.4-9.63-11.28-16.34-14.12-5-2.11-10.8-.23-15.66,2.22s-9.68,5.53-15.11,5.88c-4.73.3-9.86-1.45-14,.86-3.08,1.72-4.7,5.27-7.54,7.37s-6.4,2.48-9.85,2.67-7,.22-10.16,1.66-5.74,4.76-5.09,8.15Z"
                    />
                  </g>
                  <g id="freepik--Clouds--inject-152">
                    <path
                      fill="#f87171"
                      d="M473,427.27s-.5-.54-1.43-1.61c-.47-.53-1-1.22-1.79-1.94l-1.2-1.19a16.92,16.92,0,0,0-1.43-1.32l-1.65-1.42c-.57-.51-1.25-1-1.91-1.48-1.33-1.05-2.91-2-4.58-3.09a57.06,57.06,0,0,0-12.53-5.51,53.18,53.18,0,0,0-16.81-2.33l-2.35.07-2.39.24-1.21.12-1.21.21-2.45.44a54,54,0,0,0-9.88,3.24,55.9,55.9,0,0,0-9.62,5.52,59,59,0,0,0-8.78,7.84,53.83,53.83,0,0,0-12.1,22.09l-.06.23-.22-.08a37.13,37.13,0,0,0-18.72-1.1,56,56,0,0,0-18.57,7.22,66.13,66.13,0,0,0-16,13.48,51.36,51.36,0,0,0-10.57,18.9l-.05.17h-.18c-9.86.5-20,.39-30.43.19-5.19-.09-10.44-.18-15.74-.2l-16,0-67.77,0h-.15l-.07-.14a43.15,43.15,0,0,0-14.69-16,42.43,42.43,0,0,0-19.68-6.83,43.65,43.65,0,0,0-35.09,13.74l-.24.25-.12-.32A54.7,54.7,0,0,0,102,456.67a59.83,59.83,0,0,0-8.82-6.92A56.42,56.42,0,0,0,83.78,445a54.66,54.66,0,0,0-9.51-2.74l-2.35-.35-1.15-.16-1.16-.09-2.27-.18-2.24,0a53.65,53.65,0,0,0-16,2.32,57.51,57.51,0,0,0-12,5.09c-1.61,1-3.13,1.87-4.41,2.84a43,43,0,0,0-3.46,2.65c-1,.79-1.82,1.63-2.57,2.29A24.12,24.12,0,0,0,25,458.37c-.93,1-1.42,1.47-1.42,1.47s.46-.52,1.37-1.51a23.09,23.09,0,0,1,1.74-1.79c.74-.67,1.52-1.52,2.56-2.32a43.14,43.14,0,0,1,3.45-2.68c1.28-1,2.79-1.87,4.4-2.87a57.5,57.5,0,0,1,12-5.17,54,54,0,0,1,16-2.38l2.24,0,2.29.18,1.16.09,1.16.16,2.36.35a55,55,0,0,1,9.58,2.72,57.24,57.24,0,0,1,9.5,4.8,59.91,59.91,0,0,1,8.89,6.95,55.25,55.25,0,0,1,13.42,20.18l-.36-.07a44.17,44.17,0,0,1,35.45-13.92,42.88,42.88,0,0,1,19.91,6.89,43.68,43.68,0,0,1,14.87,16.18l-.23-.14,67.76,0,16,0c5.31,0,10.56.11,15.75.21,10.39.2,20.55.31,30.39-.19l-.23.19a51.83,51.83,0,0,1,10.69-19.08A66.47,66.47,0,0,1,341.86,453a56.2,56.2,0,0,1,18.73-7.26,37.43,37.43,0,0,1,18.94,1.14l-.28.15a54.25,54.25,0,0,1,12.23-22.25,59.71,59.71,0,0,1,8.85-7.87,56.08,56.08,0,0,1,9.7-5.55,55.46,55.46,0,0,1,10-3.24l2.47-.43,1.22-.21,1.22-.12,2.4-.23,2.36-.07a53.26,53.26,0,0,1,16.89,2.4,57.56,57.56,0,0,1,12.56,5.58c1.67,1.1,3.25,2.07,4.57,3.13.67.53,1.34,1,1.91,1.5l1.65,1.44a15.3,15.3,0,0,1,1.42,1.33l1.19,1.2a22.55,22.55,0,0,1,1.77,2C472.53,426.7,473,427.27,473,427.27Z"
                    />
                  </g>
                  <g id="freepik--Stars--inject-152">
                    <path
                      d="M248,50.83l5.22,10.6a2.58,2.58,0,0,0,1.93,1.39l11.69,1.7a2.56,2.56,0,0,1,1.41,4.36l-8.45,8.25a2.53,2.53,0,0,0-.74,2.26L261,91a2.56,2.56,0,0,1-3.71,2.7l-10.46-5.5a2.57,2.57,0,0,0-2.38,0L234,93.73a2.56,2.56,0,0,1-3.71-2.7l2-11.64a2.56,2.56,0,0,0-.74-2.26l-8.46-8.25a2.56,2.56,0,0,1,1.42-4.36l11.69-1.7a2.55,2.55,0,0,0,1.92-1.39l5.23-10.6A2.56,2.56,0,0,1,248,50.83Z"
                      style={{ fill: '#FF725E' }}
                    />
                    <path
                      d="M228,57.83c-.09.1-6.73-6.06-14.81-13.76s-14.56-14-14.46-14.13S205.5,36,213.59,43.7,228.14,57.73,228,57.83Z"
                      style={{ fill: '#FF725E' }}
                    />
                    <path
                      d="M214.18,64.35c0,.14-5.71-.09-12.72-.51s-12.7-.89-12.7-1,5.71.08,12.73.51S214.18,64.21,214.18,64.35Z"
                      style={{ fill: '#FF725E' }}
                    />
                    <path
                      d="M235.8,45.37a69.59,69.59,0,0,1-3.67-7.62,70.42,70.42,0,0,1-3.21-7.83,66.45,66.45,0,0,1,3.68,7.62A68.25,68.25,0,0,1,235.8,45.37Z"
                      style={{ fill: '#FF725E' }}
                    />
                    <path
                      d="M244.65,11.4c.14,0,.26,7,.26,15.56s-.12,15.57-.26,15.57-.26-7-.26-15.57S244.51,11.4,244.65,11.4Z"
                      style={{ fill: '#FF725E' }}
                    />
                    <path
                      d="M262.33,30.21a66.16,66.16,0,0,1-3.3,7.55,66.45,66.45,0,0,1-3.78,7.32,65.27,65.27,0,0,1,3.31-7.55A65.46,65.46,0,0,1,262.33,30.21Z"
                      style={{ fill: '#FF725E' }}
                    />
                    <path
                      d="M290.9,35.3c.08.12-7.55,5.58-17,12.2s-17.25,11.9-17.33,11.78,7.54-5.58,17-12.21S290.81,35.18,290.9,35.3Z"
                      style={{ fill: '#FF725E' }}
                    />
                    <path
                      d="M291.65,57.42A82.44,82.44,0,0,1,283.22,61,77.73,77.73,0,0,1,274.6,64,82.44,82.44,0,0,1,283,60.48,77.73,77.73,0,0,1,291.65,57.42Z"
                      style={{ fill: '#FF725E' }}
                    />
                    <path
                      d="M225.15,78.73c0,.13-9.87,3.67-22.15,7.89S180.72,94.16,180.68,94s9.87-3.67,22.15-7.9S225.11,78.59,225.15,78.73Z"
                      style={{ fill: '#FF725E' }}
                    />
                    <path
                      d="M303.32,89.63c0,.14-8.76-2.19-19.49-5.2s-19.4-5.56-19.36-5.7,8.77,2.19,19.5,5.2S303.36,89.49,303.32,89.63Z"
                      style={{ fill: '#FF725E' }}
                    />
                    <path
                      d="M217,107.7a64.65,64.65,0,0,1,5.91-5.48,60.61,60.61,0,0,1,6.26-5.1,63.23,63.23,0,0,1-5.92,5.49A63.15,63.15,0,0,1,217,107.7Z"
                      style={{ fill: '#FF725E' }}
                    />
                    <path
                      d="M245.48,132.19c-.14,0-.21-8.55-.16-19.08s.22-19.09.36-19.08.22,8.54.16,19.08S245.62,132.19,245.48,132.19Z"
                      style={{ fill: '#FF725E' }}
                    />
                    <path
                      d="M275,109.84a64.87,64.87,0,0,1-6.14-5.44A63.32,63.32,0,0,1,263,98.58a64.87,64.87,0,0,1,6.14,5.44A63.32,63.32,0,0,1,275,109.84Z"
                      style={{ fill: '#FF725E' }}
                    />
                  </g>
                  <g id="freepik--Birds--inject-152">
                    <path
                      d="M81.11,283.83s-.42-.11-1.18-.26a9.33,9.33,0,0,0-3.22-.09,8.71,8.71,0,0,0-4.32,1.89,9.07,9.07,0,0,0-3,4.84v.06l-.19.71-.27-.68a9.67,9.67,0,0,0-3.65-4.41,9.5,9.5,0,0,0-4.46-1.52,12.44,12.44,0,0,0-4.37.56,3.94,3.94,0,0,1,1.11-.48,9.44,9.44,0,0,1,3.28-.42,9.65,9.65,0,0,1,4.68,1.48,10,10,0,0,1,3.86,4.61l-.46,0v-.06A9.3,9.3,0,0,1,72.11,285,9,9,0,0,1,80,283.38,3.66,3.66,0,0,1,81.11,283.83Z"
                      style={{ fill: '#263238' }}
                    />
                    <path
                      d="M129.51,280a18.76,18.76,0,0,1-1.51,1.75,38.11,38.11,0,0,0-3.72,5.05,36.73,36.73,0,0,0-5.52,19.59v.25l-.69.06a32.9,32.9,0,0,0-9-18,45.21,45.21,0,0,0-6.59-5.34,1.75,1.75,0,0,1,.54.25,14.6,14.6,0,0,1,1.48.85,28.79,28.79,0,0,1,4.91,3.9,32.3,32.3,0,0,1,9.36,18.23l-.68.05v-.25a36,36,0,0,1,5.8-19.86,32.17,32.17,0,0,1,3.93-5c.51-.55,1-.92,1.24-1.19S129.5,280,129.51,280Z"
                      style={{ fill: '#263238' }}
                    />
                    <path
                      d="M376.88,220.56c0,.05-.84-.29-2.39-.63a19,19,0,0,0-6.65-.26,18,18,0,0,0-9,3.87,18.6,18.6,0,0,0-6.32,10.05l0,.11-.19.72-.27-.68a19.94,19.94,0,0,0-7.58-9.15,19.29,19.29,0,0,0-9.25-3.09,20.54,20.54,0,0,0-6.61.61c-1.53.4-2.33.75-2.35.71a2.74,2.74,0,0,1,.57-.28,14.47,14.47,0,0,1,1.73-.61,19.72,19.72,0,0,1,16.15,2.28,20.31,20.31,0,0,1,7.79,9.34l-.46,0,0-.11a18.89,18.89,0,0,1,6.51-10.29,18.41,18.41,0,0,1,16-3.44,12.86,12.86,0,0,1,1.75.55A5.3,5.3,0,0,1,376.88,220.56Z"
                      style={{ fill: '#263238' }}
                    />
                    <path
                      d="M443.39,184.06s-.47-.13-1.32-.3a10.39,10.39,0,0,0-3.64-.11,9.73,9.73,0,0,0-4.87,2.13,10.07,10.07,0,0,0-3.44,5.47l0,.06-.18.72-.28-.68a10.86,10.86,0,0,0-4.12-5,10.54,10.54,0,0,0-5-1.7,11.6,11.6,0,0,0-3.62.29c-.84.21-1.29.39-1.3.35a1.17,1.17,0,0,1,.31-.17,7,7,0,0,1,.94-.36,10.86,10.86,0,0,1,8.95,1.22,11.12,11.12,0,0,1,4.33,5.18l-.46,0,0-.06a10.43,10.43,0,0,1,3.62-5.71,10.14,10.14,0,0,1,8.85-1.86,6.81,6.81,0,0,1,1,.33A1,1,0,0,1,443.39,184.06Z"
                      style={{ fill: '#263238' }}
                    />
                  </g>
                  <g id="freepik--Character--inject-152">
                    <path d="M204.31,197.33H288c3.22,0,3.22-5,0-5H204.31c-3.22,0-3.23,5,0,5Z" style={{ fill: '#455a64' }} />
                    <rect height="383.98" style={{ fill: '#455a64' }} width="6" x="201.2" y="101.75" />
                    <path d="M206.89,485.73c-.14,0-.26-85.91-.26-191.86s.12-191.87.26-191.87.26,85.89.26,191.87S207,485.73,206.89,485.73Z" style={{ fill: '#263238' }} />
                    <path d="M204.31,158.48H288c3.22,0,3.22-5,0-5H204.31c-3.22,0-3.23,5,0,5Z" style={{ fill: '#455a64' }} />
                    <rect height="383.19" style={{ fill: '#455a64' }} width="6" x="284.94" y="102.53" />
                    <path d="M285.09,437.45c-.15,0-.26-74.83-.26-167.12s.11-167.14.26-167.14.26,74.82.26,167.14S285.23,437.45,285.09,437.45Z" style={{ fill: '#263238' }} />
                    <path d="M204.2,453.26h83.74c3.21,0,3.22-5,0-5H204.2c-3.21,0-3.22,5,0,5Z" style={{ fill: '#455a64' }} />
                    <path d="M206,375.75h78.67c3.22,0,3.22-5,0-5H206c-3.22,0-3.23,5,0,5Z" style={{ fill: '#455a64' }} />
                    <path d="M204.2,321.58h83.74c3.21,0,3.22-5,0-5H204.2c-3.21,0-3.22,5,0,5Z" style={{ fill: '#455a64' }} />
                    <path d="M204.2,278.85h83.74c3.21,0,3.22-5,0-5H204.2c-3.21,0-3.22,5,0,5Z" style={{ fill: '#455a64' }} />
                    <path d="M204.2,237.13h83.74c3.21,0,3.22-5,0-5H204.2c-3.21,0-3.22,5,0,5Z" style={{ fill: '#455a64' }} />
                    <path d="M205,415.69h79.59c3.22,0,3.22-5,0-5H205c-3.22,0-3.22,5,0,5Z" style={{ fill: '#455a64' }} />
                    <polygon points="270.5 423.46 270.28 452.5 254.61 452.69 254.77 423.6 270.5 423.46" style={{ fill: '#FF725E' }} />
                    <polygon points="237.63 348.11 237.42 375.97 222.39 376.16 222.54 348.24 237.63 348.11" style={{ fill: '#FF725E' }} />
                    <path d="M252.09,211.14l-18.72-.24,2.09-16s-1.28-.28-1.36-7.22-.41-18.75-.41-18.75h0A24.1,24.1,0,0,1,257.91,172l1,.79Z" style={{ fill: '#ffbe9d' }} />
                    <path d="M258.3,180.83c-.7,4-.56,6.06-1.22,8.72-1,4.21-3.12,7.43-6.91,9.53s-8.9,2.06-12.14-.8a11.06,11.06,0,0,1-4.19-7.21c-.34-3-1.22-8.6-1.24-11.6,0-5.42.15-10.28.15-10.28l15.46-2.81,8.8,5.24Z" style={{ fill: '#263238' }} />
                    <path d="M293.94,192.07c-1.29-4-17.46-27.35-17.46-27.35-6,0-11.78,7.23-11.78,7.23l11.49,24.2-12.08,11.12,13.64,16.11s8.61-10.77,11.19-14.67C294.69,200,295.22,196.09,293.94,192.07Z" style={{ fill: '#FF725E' }} />
                    <path d="M274,271.81c-.57-3.18-1.3-4.79-1.44-6.71-.43-5.73-.4-19.47,0-21.23.51-2.31,5.18-20.49,5.18-20.49l-1.59-14.08L256.31,206l-1.39-3.2s-13.24-3.43-21.61,1.07h0l-1.45,3.42-5.17,1.3c-.78.31-4.83,1.44-7.9,2.27a12,12,0,0,0-7.78,6.5,34.32,34.32,0,0,0-1.39,3.53c-1.37,4.06-9.25,26.5-9.6,33.34-.41,8,6.67,8.27,11,7.25s9.07-10.7,9.07-10.7l2.72,18.94a43.09,43.09,0,0,1-1.89,7.6c-2.64,7.2-6.44,21.13-6.44,21.13,1.48,4.64,6.86,12,9.68,13s21.67.19,21.67.19l5.56-14.75,5.13,15.51,26.75-4.17Z" style={{ fill: '#FF725E' }} />
                  </g>
                </svg>
              </div>

              {/* Card 4: Amber */}
              <div className="stats-card stats-card--amber">
                <svg
                  className="stats-card-icon"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.75"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <polyline points="22 7 13.5 15.5 8.5 10.5 2 17" />
                  <polyline points="16 7 22 7 22 13" />
                </svg>
                <span className="stats-card-num">350K+</span>
                <p className="stats-card-label">GitHub stars across featured repositories</p>
              </div>

              {/* Card 5: Purple */}
              <div className="stats-card stats-card--purple">
                <svg
                  className="stats-card-icon"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.75"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                  <circle cx="9" cy="7" r="4" />
                  <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
                  <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                </svg>
                <span className="stats-card-num">120K+</span>
                <p className="stats-card-label">Monthly active engineers &amp; researchers</p>
              </div>
            </div>
          </section>
        </div>
      </main>

      <SiteFooter />
    </>
  );
}
