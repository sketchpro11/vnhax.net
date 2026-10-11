import type { Metadata } from 'next';
import Link from 'next/link';
import SiteHeader from '@/components/SiteHeader';
import SiteFooter from '@/components/SiteFooter';
import Breadcrumbs from '@/components/Breadcrumbs';
import { BRAND_CONFIG, getBreadcrumbSchema, getFAQSchema } from '@/lib/seo';
import { getAllUIComponents } from '@/lib/components-data';
import { getBlogsBySilo } from '@/lib/blog';

export const metadata: Metadata = {
  title: 'Free React UI Components Library',
  description:
    'Free, accessible, production-ready UI components for modern web applications. Featuring Tweet Card, Bento Grid, Animated List, Dock, Sparkles Title, Image Accordions, Pricing Matrix, and Hero Sections. Zero npm bloat.',
  alternates: {
    canonical: `${BRAND_CONFIG.siteUrl}/ui-components`,
  },
  openGraph: {
    title: `Free React UI Components Library | ${BRAND_CONFIG.shortName}`,
    description:
      'Explore accessible, high-performance UI components with live interactive previews, full React TSX source code, Tailwind utilities, and WCAG AA accessibility guides.',
    url: `${BRAND_CONFIG.siteUrl}/ui-components`,
    siteName: BRAND_CONFIG.shortName,
    type: 'website',
  },
};

const UI_FAQS = [
  {
    question: 'How do these components compare to MagicUI and UI-Layouts?',
    answer:
      'These components adopt the visual aesthetics and interaction patterns popularized by MagicUI and UI-Layouts, but are engineered to be zero-dependency. They do not require heavy CSS-in-JS runtimes and can be dropped directly into vanilla React 19, Next.js App Router, Vite, or Astro projects with full TypeScript typing.',
  },
  {
    question: 'Are all components fully accessible according to WCAG 2.1 AA standards?',
    answer:
      'Yes. Every component includes semantic HTML5 landmark tags (<article>, <nav>, <header>, <section>), explicit ARIA attributes (aria-label, role="toolbar", aria-live="polite", aria-expanded), visible focus rings for keyboard navigation, and contrast ratios exceeding 4.5:1.',
  },
  {
    question: 'Can I copy and customize these components for commercial client work?',
    answer:
      'Yes. All component source code, CSS tokens, and templates published on VNHAX are licensed under permissive terms for unrestricted private and commercial use with zero attribution requirements.',
  },
  {
    question: 'How do I use these components with Tailwind CSS vs Vanilla CSS?',
    answer:
      'Each component detail page includes three production source tabs: React 19 / TypeScript, Vanilla CSS stylesheet tokens, and standard Tailwind CSS utility class equivalents. You can use whichever matches your frontend stack.',
  },
  {
    question: 'Do these components impact Google Core Web Vitals (INP and CLS)?',
    answer:
      'No. By utilizing GPU-accelerated CSS properties (transform, opacity, backdrop-filter) and static aspect-ratio bounding containers, all components maintain 0.00 CLS (Cumulative Layout Shift) and sub-10ms INP (Interaction to Next Paint).',
  },
];

export default async function UIComponentsPage() {
  const components = getAllUIComponents();
  const uiArticles = await getBlogsBySilo('ui');

  const collectionSchema = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'UI Components & Design System Library',
    description:
      'Curated directory of production-ready UI components featuring Tweet Card, Bento Grid, Animated List, Dock, Sparkles, Image Accordions, Pricing Matrix, and Hero Sections.',
    url: `${BRAND_CONFIG.siteUrl}/ui-components`,
    publisher: {
      '@type': 'Organization',
      name: BRAND_CONFIG.name,
      url: BRAND_CONFIG.siteUrl,
    },
  };

  const faqSchema = getFAQSchema(UI_FAQS);
  const breadcrumbSchema = getBreadcrumbSchema([
    { name: 'Home', url: '/' },
    { name: 'UI Components', url: '/ui-components' },
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <SiteHeader activeNav="ui" variant="standard" />

      <main className="hub-page">
        <div className="hub-inner" style={{ maxWidth: '1200px' }}>
          <Breadcrumbs items={[{ label: 'UI Components' }]} />

          {/* Editorial Hub Header */}
          <header className="hub-header" style={{ marginBottom: '36px' }}>
            <p className="section-kicker">Design system &amp; interface patterns</p>
            <h1 className="page-title">ui components &amp; interface design</h1>
            <p className="page-lede">
              Zero-dependency, accessible, production-ready interface components engineered with semantic HTML, fluid CSS tokens, and React 19. Complete copy-paste source code, live previews, and installation guides.
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
              <div style={{ fontSize: '11px', textTransform: 'uppercase', color: '#64748b', fontWeight: 700 }}>Components</div>
              <div style={{ fontSize: '24px', fontWeight: 800, color: '#0f172a', marginTop: '4px' }}>9 Patterns</div>
              <div style={{ fontSize: '12px', color: '#94a3b8' }}>MagicUI &amp; UI-Layouts</div>
            </div>
            <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '12px', padding: '16px' }}>
              <div style={{ fontSize: '11px', textTransform: 'uppercase', color: '#64748b', fontWeight: 700 }}>Bundle Overhead</div>
              <div style={{ fontSize: '24px', fontWeight: 800, color: '#16a34a', marginTop: '4px' }}>0 kB JS</div>
              <div style={{ fontSize: '12px', color: '#94a3b8' }}>Zero runtime bloat</div>
            </div>
            <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '12px', padding: '16px' }}>
              <div style={{ fontSize: '11px', textTransform: 'uppercase', color: '#64748b', fontWeight: 700 }}>Accessibility</div>
              <div style={{ fontSize: '24px', fontWeight: 800, color: '#2563eb', marginTop: '4px' }}>WCAG 2.1 AA</div>
              <div style={{ fontSize: '12px', color: '#94a3b8' }}>Keyboard &amp; ARIA ready</div>
            </div>
            <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '12px', padding: '16px' }}>
              <div style={{ fontSize: '11px', textTransform: 'uppercase', color: '#64748b', fontWeight: 700 }}>Core Web Vitals</div>
              <div style={{ fontSize: '24px', fontWeight: 800, color: '#9333ea', marginTop: '4px' }}>0.00 CLS</div>
              <div style={{ fontSize: '12px', color: '#94a3b8' }}>Zero layout shifts</div>
            </div>
          </section>

          {/* Component Catalog Grid */}
          <section className="topic-section" aria-labelledby="catalog-heading" style={{ marginBottom: '48px' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px', flexWrap: 'wrap', gap: '12px' }}>
              <div>
                <h2 id="catalog-heading" className="topic-section-title" style={{ margin: 0 }}>
                  Component Directory
                </h2>
                <p style={{ fontSize: '14px', color: '#64748b', margin: '4px 0 0' }}>
                  Select any component to inspect full source code, installation steps, and live interactive sandbox.
                </p>
              </div>
            </div>

            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
                gap: '20px',
              }}
            >
              {components.map(comp => (
                <div
                  key={comp.slug}
                  style={{
                    background: '#ffffff',
                    border: '1px solid #e2e8f0',
                    borderRadius: '16px',
                    padding: '24px',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    boxShadow: '0 2px 10px rgba(0, 0, 0, 0.03)',
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
                          color: '#2563eb',
                          background: '#eff6ff',
                          padding: '3px 8px',
                          borderRadius: '99px',
                        }}
                      >
                        {comp.category}
                      </span>
                      <span
                        style={{
                          fontSize: '11px',
                          fontWeight: 600,
                          color: '#64748b',
                          background: '#f8fafc',
                          padding: '3px 8px',
                          borderRadius: '99px',
                          border: '1px solid #e2e8f0',
                        }}
                      >
                        {comp.badge}
                      </span>
                    </div>

                    <h3 style={{ fontSize: '19px', fontWeight: 700, color: '#0f172a', margin: '0 0 8px' }}>
                      <Link href={`/ui-components/${comp.slug}`} style={{ color: 'inherit', textDecoration: 'none' }}>
                        {comp.title}
                      </Link>
                    </h3>

                    <p style={{ fontSize: '13.5px', color: '#64748b', lineHeight: 1.5, margin: '0 0 16px' }}>
                      {comp.subtitle}
                    </p>

                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '20px' }}>
                      {comp.features.slice(0, 2).map((feat, i) => (
                        <span
                          key={i}
                          style={{
                            fontSize: '11.5px',
                            color: '#334155',
                            background: '#f1f5f9',
                            padding: '3px 8px',
                            borderRadius: '6px',
                          }}
                        >
                          ✓ {feat}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderTop: '1px solid #f1f5f9', paddingTop: '14px' }}>
                    <Link
                      href={`/ui-components/${comp.slug}`}
                      style={{
                        fontSize: '13.5px',
                        fontWeight: 600,
                        color: '#0f172a',
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '4px',
                      }}
                    >
                      View Code &amp; Preview <span aria-hidden="true">→</span>
                    </Link>

                    <span style={{ fontSize: '11.5px', color: '#94a3b8' }}>
                      React 19 · TSX
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Featured UI Design & Canvas Architecture Guides */}
          {uiArticles.length > 0 && (
            <section className="topic-section" aria-labelledby="ui-articles-heading" style={{ marginBottom: '48px' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px', flexWrap: 'wrap', gap: '12px' }}>
                <div>
                  <h2 id="ui-articles-heading" className="topic-section-title" style={{ margin: 0 }}>
                    UI Design &amp; Canvas Architecture Guides
                  </h2>
                  <p style={{ fontSize: '14.5px', color: '#64748b', margin: '4px 0 0' }}>
                    Hands-on teardowns on visual composition, canvas bounding boxes, layout manipulation, and generative UI controls.
                  </p>
                </div>
                <Link href="/blog" style={{ fontSize: '13.5px', fontWeight: 600, color: '#2563eb' }}>
                  View All Guides →
                </Link>
              </div>

              <div className="card-grid hub-card-grid">
                {uiArticles.map((article) => (
                  <Link
                    key={article.slug}
                    className="card card--content"
                    href={`/blog/${article.slug}`}
                    style={{ textDecoration: 'none' }}
                  >
                    <span className="card-eyebrow">
                      {article.frontmatter.category || 'UI Components'} · {article.frontmatter.readTime || '8 min read'}
                    </span>
                    <h3>{article.frontmatter.title}</h3>
                    <p>{article.frontmatter.description}</p>
                    <span className="card-link">
                      Read Guide <span aria-hidden="true">→</span>
                    </span>
                  </Link>
                ))}
              </div>
            </section>
          )}

          {/* Editorial Analysis: Why Zero-Dependency CSS Wins */}
          <section className="topic-section" aria-labelledby="zero-css-article" style={{ marginBottom: '48px' }}>
            <div className="editorial-feature-card">
              <span className="card-eyebrow">Engineering Architecture</span>
              <h2 id="zero-css-article" style={{ fontSize: '24px', fontWeight: 700, color: '#0f172a', margin: '8px 0 12px' }}>
                Why Zero-Dependency UI Architecture Wins
              </h2>
              <p style={{ fontSize: '15px', lineHeight: 1.65, color: '#334155', marginBottom: '20px' }}>
                Modern web applications frequently suffer from bundle bloat caused by installing monolithic component packages. When you install heavy third-party UI libraries, your bundle imports hundreds of kilobytes of runtime CSS-in-JS compilers, non-treeshakable iconography, and duplicate state listeners.
              </p>
              <div className="editorial-feature-columns">
                <div className="editorial-column-item">
                  <h4>⚡ Sub-Millisecond Paint Times</h4>
                  <p>
                    Native CSS custom properties load without JavaScript execution cost. The browser renders layout elements immediately on HTML receipt, eliminating FCP delays.
                  </p>
                </div>
                <div className="editorial-column-item">
                  <h4>📐 Fluid Clamp Typography</h4>
                  <p>
                    By combining <code>clamp()</code> with viewport units, headings scale smoothly between mobile viewports and 4K displays without cluttered media query breakpoints.
                  </p>
                </div>
                <div className="editorial-column-item">
                  <h4>♿ WCAG AA Contrast</h4>
                  <p>
                    All semantic surfaces and text tokens are pre-calculated to exceed WCAG 2.1 AA 4.5:1 contrast requirements, ensuring full legibility across light and dark modes.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Frequently Asked Questions */}
          <section className="topic-section" aria-labelledby="ui-faq-heading" style={{ marginBottom: '48px' }}>
            <h2 id="ui-faq-heading" className="topic-section-title">
              Frequently Asked Questions
            </h2>
            <p className="topic-section-desc">
              Answers regarding design tokens, accessibility compliance, and framework integration.
            </p>
            <div className="hub-faq-list">
              {UI_FAQS.map((faq, i) => (
                <details key={i} className="hub-faq-item">
                  <summary className="hub-faq-trigger">
                    <span>{faq.question}</span>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><polyline points="6 9 12 15 18 9"/></svg>
                  </summary>
                  <div className="hub-faq-content">
                    {faq.answer}
                  </div>
                </details>
              ))}
            </div>
          </section>

          {/* Bottom Authority Box */}
          <section className="hub-note">
            <h2>Build for the interface around it</h2>
            <p>
              A reusable component earns its place by being clear, accessible, and adaptable. Document keyboard behavior, focus states, visual states, and dependencies beside the code so implementation teams do not need to reverse-engineer design decisions.
            </p>
          </section>
        </div>
      </main>

      <SiteFooter />
    </>
  );
}
