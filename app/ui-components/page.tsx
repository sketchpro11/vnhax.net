import type { Metadata } from 'next';
import Link from 'next/link';
import SiteHeader from '@/components/SiteHeader';
import SiteFooter from '@/components/SiteFooter';
import Breadcrumbs from '@/components/Breadcrumbs';
import { BRAND_CONFIG, getBreadcrumbSchema, getFAQSchema } from '@/lib/seo';

export const metadata: Metadata = {
  title: 'UI Components & Design System Library — Free & Accessible',
  description:
    'Free, accessible, production-ready UI components for modern web applications. Semantic HTML, modern CSS tokens, and responsive layout patterns.',
  alternates: {
    canonical: `${BRAND_CONFIG.siteUrl}/ui-components`,
  },
  openGraph: {
    title: 'UI Components & Design System Library | VNHAX',
    description:
      'Free, accessible, production-ready UI components for modern web applications. Semantic HTML, modern CSS tokens, and responsive layout patterns.',
    url: `${BRAND_CONFIG.siteUrl}/ui-components`,
    siteName: BRAND_CONFIG.shortName,
    type: 'website',
  },
};

const UI_FAQS = [
  {
    question: 'Do these UI components require external UI libraries like Tailwind or Radix?',
    answer:
      'No. Every component in this library is engineered with clean, semantic HTML and vanilla CSS tokens. They can be dropped directly into any web framework (Next.js, Vite, Astro, Remix, or vanilla HTML) without installing heavy npm dependencies or CSS preprocessors.',
  },
  {
    question: 'Are the components accessible according to WCAG 2.1 AA standards?',
    answer:
      'Yes. Interactive components feature semantic element tags (<button>, <dialog>, <details>), visible keyboard focus rings, proper ARIA states (aria-expanded, aria-current), and meet color contrast ratios exceeding 4.5:1.',
  },
  {
    question: 'Can I copy and modify these components for commercial client projects?',
    answer:
      'Yes. All component templates and code snippets published on vnhax are licensed under permissive terms for unrestricted commercial and private use.',
  },
  {
    question: 'How do I customize the color tokens to match my brand?',
    answer:
      'All components consume standard CSS custom properties defined in :root (such as --accent, --ink, and --surface). Simply update these variables in your root stylesheet to restyle every component simultaneously.',
  },
];

export default function UIComponentsPage() {
  const breadcrumbs = [
    { name: 'Home', url: '/' },
    { name: 'UI Components', url: '/ui-components' },
  ];

  const collectionSchema = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'UI Components & Design System Library',
    description:
      'Free UI component examples, implementation notes, and practical design-system references for developer-built interfaces.',
    url: `${BRAND_CONFIG.siteUrl}/ui-components`,
    publisher: {
      '@type': 'Organization',
      name: BRAND_CONFIG.name,
      url: BRAND_CONFIG.siteUrl,
    },
  };

  const faqSchema = getFAQSchema(UI_FAQS);

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

      <SiteHeader activeNav="ui" variant="standard" />

      <main className="hub-page">
        <div className="hub-inner">
          <Breadcrumbs items={[{ label: 'UI Components' }]} />

          {/* Editorial Header */}
          <header className="hub-header">
            <p className="section-kicker">Design system &amp; patterns</p>
            <h1 className="page-title">ui components &amp; interface design</h1>
            <p className="page-lede">
              Zero-dependency, accessible, production-ready interface patterns engineered with semantic HTML and modern CSS custom properties. Drop them into any framework without npm bloat.
            </p>
          </header>

          {/* Component Silos Grid */}
          <section className="topic-section" aria-labelledby="ui-topics">
            <h2 id="ui-topics" className="topic-section-title">
              Design System Pillars
            </h2>
            <div className="topic-grid">
              <Link className="topic-card" href="/ui-components/component-page-starter">
                <span className="card-eyebrow">Full Layout</span>
                <h3>Component Page Starter</h3>
                <p>
                  A complete, responsive page starter layout featuring navigation header, responsive sidebar, cards grid, and footer.
                </p>
                <span className="card-link">
                  Open Starter <span aria-hidden="true">→</span>
                </span>
              </Link>

              <div className="topic-card">
                <span className="card-eyebrow">Zero JS</span>
                <h3>Accessible HTML Semantics</h3>
                <p>
                  Interactive accordions, dialogs, and navigation built using native HTML5 elements without heavy client JavaScript.
                </p>
                <span className="card-link">
                  WCAG 2.1 AA Compliant
                </span>
              </div>

              <div className="topic-card">
                <span className="card-eyebrow">Design Tokens</span>
                <h3>CSS Custom Properties</h3>
                <p>
                  Centralized color tokens, fluid clamp typography, elevation shadows, and dark mode surfaces in pure CSS.
                </p>
                <span className="card-link">
                  Pure Vanilla CSS
                </span>
              </div>
            </div>
          </section>

          {/* Featured Live Component Gallery */}
          <section className="topic-section" aria-labelledby="live-gallery">
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px', marginBottom: '24px' }}>
              <div>
                <h2 id="live-gallery" className="topic-section-title" style={{ margin: 0 }}>
                  Featured Component Patterns
                </h2>
                <p style={{ fontSize: '14.5px', color: '#64748b', margin: '4px 0 0' }}>
                  Live rendered components built with zero external dependencies.
                </p>
              </div>
              <Link
                href="/ui-components/component-page-starter"
                style={{ fontSize: '13.5px', fontWeight: 600, color: '#2563eb' }}
              >
                Inspect Page Starter →
              </Link>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '22px' }}>
              {/* Pattern 1: Liquid Mesh Card Preview */}
              <div style={{ background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '16px', padding: '24px', display: 'flex', flexDirection: 'column' }}>
                <span className="card-eyebrow" style={{ marginBottom: '8px' }}>Pattern 01</span>
                <h3 style={{ fontFamily: 'var(--font-ui)', fontSize: '17px', fontWeight: 600, color: '#0f172a', margin: '0 0 6px' }}>
                  Liquid Glass Mesh Card
                </h3>
                <p style={{ fontSize: '13px', color: '#64748b', margin: '0 0 16px' }}>
                  Fluid backdrop gradients with dark macOS terminal preview and hover lift.
                </p>
                <div style={{ marginTop: 'auto', background: '#090a0f', borderRadius: '12px', padding: '16px', position: 'relative', overflow: 'hidden' }}>
                  <div className="liquid-mesh liquid-mesh--ollama" style={{ position: 'absolute', inset: 0, opacity: 0.85 }} />
                  <div style={{ position: 'relative', zIndex: 2 }}>
                    <div style={{ display: 'flex', gap: '5px', marginBottom: '10px' }}>
                      <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#ff5f56' }} />
                      <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#ffbd2e' }} />
                      <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#27c93f' }} />
                    </div>
                    <code style={{ fontSize: '12px', color: '#f8fafc', fontFamily: 'monospace' }}>$ ollama run llama3:8b</code>
                    <div style={{ marginTop: '8px', fontSize: '11px', color: '#38bdf8' }}>API :11434 • Online</div>
                  </div>
                </div>
              </div>

              {/* Pattern 2: macOS Monospace Code Card */}
              <div style={{ background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '16px', padding: '24px', display: 'flex', flexDirection: 'column' }}>
                <span className="card-eyebrow" style={{ marginBottom: '8px' }}>Pattern 02</span>
                <h3 style={{ fontFamily: 'var(--font-ui)', fontSize: '17px', fontWeight: 600, color: '#0f172a', margin: '0 0 6px' }}>
                  macOS Monospace Terminal Window
                </h3>
                <p style={{ fontSize: '13px', color: '#64748b', margin: '0 0 16px' }}>
                  Accessible dark container with header buttons and syntax styling.
                </p>
                <div style={{ marginTop: 'auto', background: '#0f172a', borderRadius: '12px', padding: '16px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '8px', marginBottom: '10px' }}>
                    <div style={{ display: 'flex', gap: '5px' }}>
                      <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#ff5f56' }} />
                      <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#ffbd2e' }} />
                      <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#27c93f' }} />
                    </div>
                    <span style={{ fontSize: '11px', color: '#94a3b8', fontFamily: 'monospace' }}>deploy.sh</span>
                  </div>
                  <pre style={{ margin: 0, fontSize: '12px', color: '#38bdf8', fontFamily: 'monospace', lineHeight: 1.5 }}>
{`docker run -d \\
  --gpus all \\
  -p 11434:11434 \\
  ollama/ollama`}
                  </pre>
                </div>
              </div>

              {/* Pattern 3: Minimalist Command Search Bar */}
              <div style={{ background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '16px', padding: '24px', display: 'flex', flexDirection: 'column' }}>
                <span className="card-eyebrow" style={{ marginBottom: '8px' }}>Pattern 03</span>
                <h3 style={{ fontFamily: 'var(--font-ui)', fontSize: '17px', fontWeight: 600, color: '#0f172a', margin: '0 0 6px' }}>
                  Command Palette &amp; Search Input
                </h3>
                <p style={{ fontSize: '13px', color: '#64748b', margin: '0 0 16px' }}>
                  Pill search bar with keyboard shortcut badge and focus ring.
                </p>
                <div style={{ marginTop: 'auto', background: '#f8fafc', borderRadius: '12px', padding: '16px', border: '1px solid #e2e8f0' }}>
                  <div style={{ display: 'flex', alignItems: 'center', background: '#ffffff', border: '1.5px solid #0a0a0a', borderRadius: '999px', padding: '8px 16px', gap: '10px' }}>
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>
                    <span style={{ fontSize: '13px', color: '#64748b', flexGrow: 1 }}>Search documentation...</span>
                    <kbd style={{ background: '#f1f5f9', border: '1px solid #cbd5e1', borderRadius: '4px', padding: '2px 6px', fontSize: '10.5px', fontFamily: 'monospace', color: '#475569' }}>⌘K</kbd>
                  </div>
                </div>
              </div>

              {/* Pattern 4: Accessible Details Disclosure */}
              <div style={{ background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '16px', padding: '24px', display: 'flex', flexDirection: 'column' }}>
                <span className="card-eyebrow" style={{ marginBottom: '8px' }}>Pattern 04</span>
                <h3 style={{ fontFamily: 'var(--font-ui)', fontSize: '17px', fontWeight: 600, color: '#0f172a', margin: '0 0 6px' }}>
                  Semantic Details Accordion
                </h3>
                <p style={{ fontSize: '13px', color: '#64748b', margin: '0 0 16px' }}>
                  Zero-JS collapsible disclosure using native HTML5 details and summary.
                </p>
                <div style={{ marginTop: 'auto', background: '#f8fafc', borderRadius: '12px', padding: '16px', border: '1px solid #e2e8f0' }}>
                  <details style={{ background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '8px', padding: '10px 14px' }}>
                    <summary style={{ fontSize: '13px', fontWeight: 600, color: '#0f172a', cursor: 'pointer' }}>
                      How are CSS tokens structured?
                    </summary>
                    <p style={{ fontSize: '12px', color: '#475569', margin: '8px 0 0', lineHeight: 1.5 }}>
                      Variables are defined in :root and consume HSL color values and clamp() fluid typography.
                    </p>
                  </details>
                </div>
              </div>
            </div>
          </section>

          {/* Editorial Analysis: Why Zero-Dependency CSS Wins */}
          <section className="topic-section" aria-labelledby="zero-css-article">
            <div className="editorial-feature-card">
              <span className="card-eyebrow">Architecture Guide</span>
              <h3 id="zero-css-article">Why Zero-Dependency CSS Wins in Modern Web Applications</h3>
              <p>
                In the era of rapid frontend framework churn, building user interfaces on top of standard CSS custom properties provides long-term maintainability, zero bundle bloat, and sub-millisecond initial paint times.
              </p>
              <div className="editorial-feature-columns">
                <div className="editorial-column-item">
                  <h4>⚡ 0 kB Runtime JavaScript</h4>
                  <p>
                    CSS-in-JS runtimes require serializing styles and mounting context providers in client bundles. Native CSS variables load with zero JavaScript execution cost.
                  </p>
                </div>
                <div className="editorial-column-item">
                  <h4>📐 Fluid Clamp Typography</h4>
                  <p>
                    By combining <code>clamp()</code> with viewport units, headings scale smoothly between mobile viewports and 4K displays without cluttered media query breakpoints.
                  </p>
                </div>
                <div className="editorial-column-item">
                  <h4>♿ Accessible Color Contrast</h4>
                  <p>
                    All semantic surfaces and text tokens are pre-calculated to exceed WCAG 2.1 AA 4.5:1 contrast requirements, ensuring full legibility across light and dark modes.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Frequently Asked Questions */}
          <section className="topic-section" aria-labelledby="ui-faq-heading">
            <h2 id="ui-faq-heading" className="topic-section-title">
              Frequently asked questions
            </h2>
            <p className="topic-section-desc">
              Answers regarding design tokens, accessibility compliance, and framework integration.
            </p>
            <div className="hub-faq-list">
              {UI_FAQS.map((faq, i) => (
                <details key={i} className="hub-faq-item">
                  <summary className="hub-faq-trigger">
                    <span>{faq.question}</span>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline points="6 9 12 15 18 9"/></svg>
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
              A reusable component earns its place by being clear, accessible, and adaptable. Document keyboard behavior, focus states, visual states, and dependencies beside the code so implementation teams do not need to reverse-engineer the decisions.
            </p>
          </section>
        </div>
      </main>

      <SiteFooter />
    </>
  );
}
