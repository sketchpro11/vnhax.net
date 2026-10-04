import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import SiteHeader from '@/components/SiteHeader';
import SiteFooter from '@/components/SiteFooter';
import Breadcrumbs from '@/components/Breadcrumbs';
import ComponentPreviewSandbox from '@/components/ComponentPreviewSandbox';
import { BRAND_CONFIG } from '@/lib/seo';
import {
  getAllUIComponents,
  getUIComponentBySlug,
  UIComponent,
} from '@/lib/components-data';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const components = getAllUIComponents();
  return components.map(c => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const comp = getUIComponentBySlug(slug);

  if (!comp) {
    return {
      title: 'Component Not Found | VNHAX',
      description: 'The requested UI component could not be found.',
    };
  }

  const title = `${comp.title} — Accessible React & CSS UI Component`;
  const description = `${comp.subtitle} Complete copy-paste TSX code, Tailwind styling, props reference, and WCAG AA accessibility guide.`;

  return {
    title,
    description,
    alternates: {
      canonical: `${BRAND_CONFIG.siteUrl}/ui-components/${slug}`,
    },
    openGraph: {
      title: `${comp.title} | VNHAX UI Components`,
      description,
      url: `${BRAND_CONFIG.siteUrl}/ui-components/${slug}`,
      siteName: BRAND_CONFIG.shortName,
      type: 'article',
    },
    twitter: {
      card: 'summary_large_image',
      title: `${comp.title} | VNHAX Design System`,
      description,
    },
  };
}

export default async function ComponentDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const comp = getUIComponentBySlug(slug);

  if (!comp) {
    notFound();
  }

  const allComponents = getAllUIComponents();
  const related = allComponents.filter(c => c.slug !== slug).slice(0, 3);

  const breadcrumbs = [
    { label: 'UI Components', href: '/ui-components' },
    { label: comp.title },
  ];

  const techArticleSchema = {
    '@context': 'https://schema.org',
    '@type': 'TechArticle',
    headline: `${comp.title} — Accessible UI Component Specification`,
    description: comp.description,
    url: `${BRAND_CONFIG.siteUrl}/ui-components/${slug}`,
    inLanguage: 'en-US',
    publisher: {
      '@type': 'Organization',
      name: BRAND_CONFIG.name,
      url: BRAND_CONFIG.siteUrl,
    },
    author: {
      '@type': 'Organization',
      name: 'VNHAX Engineering Core',
      url: BRAND_CONFIG.siteUrl,
    },
    datePublished: '2026-09-28T00:00:00Z',
    dateModified: '2026-10-04T00:00:00Z',
    about: {
      '@type': 'SoftwareSourceCode',
      programmingLanguage: 'TypeScript',
      runtimePlatform: 'React 19 / Next.js 16',
    },
  };

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: BRAND_CONFIG.siteUrl,
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'UI Components',
        item: `${BRAND_CONFIG.siteUrl}/ui-components`,
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: comp.title,
        item: `${BRAND_CONFIG.siteUrl}/ui-components/${slug}`,
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(techArticleSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <SiteHeader activeNav="ui" variant="standard" />

      <main className="hub-page">
        <div className="hub-inner" style={{ maxWidth: '1180px' }}>
          <Breadcrumbs items={breadcrumbs} />

          {/* Component Hero Header */}
          <header className="hub-header" style={{ marginBottom: '28px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap', marginBottom: '8px' }}>
              <span
                style={{
                  fontSize: '11px',
                  fontWeight: 700,
                  textTransform: 'uppercase',
                  letterSpacing: '0.06em',
                  color: '#2563eb',
                  background: '#eff6ff',
                  padding: '4px 10px',
                  borderRadius: '99px',
                }}
              >
                {comp.category}
              </span>
              <span
                style={{
                  fontSize: '11px',
                  fontWeight: 600,
                  color: '#475569',
                  background: '#f1f5f9',
                  padding: '4px 10px',
                  borderRadius: '99px',
                }}
              >
                {comp.badge}
              </span>
              <span style={{ fontSize: '12px', color: '#94a3b8' }}>
                WCAG 2.1 AA Compliant · Zero-Dependency
              </span>
            </div>

            <h1 className="page-title" style={{ textTransform: 'none', letterSpacing: '-0.03em' }}>
              {comp.title}
            </h1>
            <p className="page-lede" style={{ maxWidth: '780px' }}>
              {comp.subtitle}
            </p>
          </header>

          {/* Interactive Live Sandbox Preview */}
          <section aria-labelledby="live-preview-heading" style={{ marginBottom: '40px' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px', flexWrap: 'wrap', gap: '8px' }}>
              <h2 id="live-preview-heading" style={{ fontSize: '18px', fontWeight: 700, color: '#0f172a', margin: 0 }}>
                Interactive Live Preview
              </h2>
              <span style={{ fontSize: '13px', color: '#64748b' }}>
                Test responsive viewport scaling &amp; interactions live
              </span>
            </div>

            <ComponentPreviewSandbox slug={comp.slug} codeReact={comp.codeReact} />
          </section>

          {/* Architectural Overview & Highlights */}
          <section className="topic-section" aria-labelledby="architecture-overview" style={{ marginBottom: '40px' }}>
            <div className="editorial-feature-card">
              <span className="card-eyebrow">Engineering Specification</span>
              <h2 id="architecture-overview" style={{ fontSize: '22px', fontWeight: 700, color: '#0f172a', margin: '8px 0 12px' }}>
                Component Architecture &amp; Rationale
              </h2>
              <p style={{ fontSize: '15px', lineHeight: 1.65, color: '#334155', marginBottom: '18px' }}>
                {comp.description}
              </p>
              <p style={{ fontSize: '14.5px', lineHeight: 1.6, color: '#475569', marginBottom: '24px' }}>
                {comp.architecturalOverview}
              </p>

              <h3 style={{ fontSize: '16px', fontWeight: 700, color: '#0f172a', marginBottom: '12px' }}>
                Key Technical Features
              </h3>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '10px' }}>
                {comp.features.map((feat, idx) => (
                  <li
                    key={idx}
                    style={{
                      display: 'flex',
                      alignItems: 'baseline',
                      gap: '8px',
                      fontSize: '13.5px',
                      color: '#1e293b',
                      background: '#ffffff',
                      border: '1px solid #e2e8f0',
                      borderRadius: '10px',
                      padding: '10px 14px',
                    }}
                  >
                    <span style={{ color: '#16a34a', fontWeight: 700 }}>✓</span>
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
            </div>
          </section>

          {/* Complete Source Code Section (React, Tailwind, CSS) */}
          <section className="topic-section" aria-labelledby="code-section" style={{ marginBottom: '48px' }}>
            <h2 id="code-section" className="topic-section-title">
              Complete Production Source Code
            </h2>
            <p className="topic-section-desc">
              Standalone, dependency-free implementation. Drop directly into your project.
            </p>

            {/* React TSX */}
            <div style={{ marginBottom: '28px' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
                <h3 style={{ fontSize: '15px', fontWeight: 700, color: '#0f172a', margin: 0 }}>
                  1. React 19 / TypeScript Component (<span style={{ fontFamily: 'monospace' }}>{comp.title.replace(/\s+/g, '')}.tsx</span>)
                </h3>
                <span style={{ fontSize: '12px', color: '#64748b' }}>TypeScript + Semantic JSX</span>
              </div>
              <pre
                style={{
                  background: '#0f172a',
                  color: '#f8fafc',
                  padding: '20px',
                  borderRadius: '14px',
                  overflowX: 'auto',
                  fontSize: '13px',
                  lineHeight: 1.6,
                  fontFamily: 'Consolas, Monaco, "Courier New", monospace',
                }}
              >
                <code>{comp.codeReact}</code>
              </pre>
            </div>

            {/* Vanilla CSS Stylesheet */}
            <div style={{ marginBottom: '28px' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
                <h3 style={{ fontSize: '15px', fontWeight: 700, color: '#0f172a', margin: 0 }}>
                  2. Vanilla CSS Stylesheet (Zero-Dependency)
                </h3>
                <span style={{ fontSize: '12px', color: '#64748b' }}>Native CSS Tokens &amp; Transitions</span>
              </div>
              <pre
                style={{
                  background: '#0f172a',
                  color: '#f8fafc',
                  padding: '20px',
                  borderRadius: '14px',
                  overflowX: 'auto',
                  fontSize: '13px',
                  lineHeight: 1.6,
                  fontFamily: 'Consolas, Monaco, "Courier New", monospace',
                }}
              >
                <code>{comp.codeVanillaCSS}</code>
              </pre>
            </div>

            {/* Tailwind CSS Variant */}
            <div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
                <h3 style={{ fontSize: '15px', fontWeight: 700, color: '#0f172a', margin: 0 }}>
                  3. Tailwind CSS Classes Variant
                </h3>
                <span style={{ fontSize: '12px', color: '#64748b' }}>Tailwind v3 &amp; v4 Utility Equivalents</span>
              </div>
              <pre
                style={{
                  background: '#0f172a',
                  color: '#f8fafc',
                  padding: '20px',
                  borderRadius: '14px',
                  overflowX: 'auto',
                  fontSize: '13px',
                  lineHeight: 1.6,
                  fontFamily: 'Consolas, Monaco, "Courier New", monospace',
                }}
              >
                <code>{comp.codeTailwind}</code>
              </pre>
            </div>
          </section>

          {/* Installation & Setup Guide */}
          <section className="topic-section" aria-labelledby="install-heading" style={{ marginBottom: '44px' }}>
            <h2 id="install-heading" className="topic-section-title">
              Installation &amp; Integration Guide
            </h2>
            <p className="topic-section-desc">
              Steps to add this component to Next.js (App Router), Vite, or Astro projects.
            </p>

            <div
              style={{
                background: '#f8fafc',
                border: '1px solid #e2e8f0',
                borderRadius: '14px',
                padding: '20px',
                marginBottom: '20px',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
                <span style={{ fontSize: '12px', fontWeight: 700, textTransform: 'uppercase', color: '#64748b' }}>
                  CLI Installation Command
                </span>
                <span style={{ fontSize: '11px', color: '#2563eb', fontWeight: 600 }}>Shadcn / MagicUI Compatible</span>
              </div>
              <div
                style={{
                  background: '#0f172a',
                  borderRadius: '10px',
                  padding: '12px 16px',
                  color: '#38bdf8',
                  fontFamily: 'monospace',
                  fontSize: '13px',
                }}
              >
                {comp.installGuide.cliCommand}
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {comp.installGuide.steps.map((st, i) => (
                <div
                  key={i}
                  style={{
                    background: '#ffffff',
                    border: '1px solid #e2e8f0',
                    borderRadius: '14px',
                    padding: '18px',
                  }}
                >
                  <h3 style={{ fontSize: '15px', fontWeight: 700, color: '#0f172a', margin: '0 0 10px' }}>
                    {st.title}
                  </h3>
                  {st.notes && (
                    <p style={{ fontSize: '13px', color: '#64748b', margin: '0 0 12px' }}>
                      {st.notes}
                    </p>
                  )}
                  <pre
                    style={{
                      background: '#0f172a',
                      color: '#f8fafc',
                      padding: '14px',
                      borderRadius: '8px',
                      overflowX: 'auto',
                      fontSize: '12.5px',
                      fontFamily: 'monospace',
                      margin: 0,
                    }}
                  >
                    <code>{st.code}</code>
                  </pre>
                </div>
              ))}
            </div>
          </section>

          {/* Component Props & API Reference Table */}
          <section className="topic-section" aria-labelledby="props-heading" style={{ marginBottom: '44px' }}>
            <h2 id="props-heading" className="topic-section-title">
              Props &amp; API Reference
            </h2>
            <p className="topic-section-desc">
              TypeScript interfaces, default values, and runtime behavior.
            </p>

            <div style={{ overflowX: 'auto', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '13.5px' }}>
                <thead>
                  <tr style={{ background: '#f8fafc', borderBottom: '1px solid #e2e8f0' }}>
                    <th style={{ padding: '12px 16px', fontWeight: 700, color: '#0f172a' }}>Prop</th>
                    <th style={{ padding: '12px 16px', fontWeight: 700, color: '#0f172a' }}>Type</th>
                    <th style={{ padding: '12px 16px', fontWeight: 700, color: '#0f172a' }}>Default</th>
                    <th style={{ padding: '12px 16px', fontWeight: 700, color: '#0f172a' }}>Description</th>
                  </tr>
                </thead>
                <tbody>
                  {comp.props.map((p, idx) => (
                    <tr key={idx} style={{ borderBottom: idx < comp.props.length - 1 ? '1px solid #f1f5f9' : 'none' }}>
                      <td style={{ padding: '12px 16px', fontFamily: 'monospace', color: '#2563eb', fontWeight: 600 }}>
                        {p.prop}
                      </td>
                      <td style={{ padding: '12px 16px', fontFamily: 'monospace', color: '#64748b' }}>
                        {p.type}
                      </td>
                      <td style={{ padding: '12px 16px', color: '#475569' }}>
                        {p.default}
                      </td>
                      <td style={{ padding: '12px 16px', color: '#334155' }}>
                        {p.description}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          {/* Accessibility & Performance Audit */}
          <section className="topic-section" aria-labelledby="a11y-heading" style={{ marginBottom: '48px' }}>
            <h2 id="a11y-heading" className="topic-section-title">
              Accessibility &amp; Core Web Vitals Audit
            </h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px', marginTop: '16px' }}>
              {/* Accessibility Card */}
              <div
                style={{
                  background: '#ffffff',
                  border: '1px solid #e2e8f0',
                  borderRadius: '16px',
                  padding: '24px',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
                  <span style={{ fontSize: '20px' }}>♿</span>
                  <h3 style={{ fontSize: '17px', fontWeight: 700, color: '#0f172a', margin: 0 }}>
                    {comp.accessibility.wcagCriteria}
                  </h3>
                </div>
                <h4 style={{ fontSize: '13px', textTransform: 'uppercase', color: '#64748b', margin: '14px 0 8px' }}>
                  ARIA Semantic Annotations
                </h4>
                <ul style={{ listStyle: 'disc', paddingLeft: '20px', fontSize: '13px', color: '#334155', lineHeight: 1.6 }}>
                  {comp.accessibility.ariaNotes.map((note, i) => (
                    <li key={i}>{note}</li>
                  ))}
                </ul>

                <h4 style={{ fontSize: '13px', textTransform: 'uppercase', color: '#64748b', margin: '14px 0 8px' }}>
                  Keyboard Navigation
                </h4>
                <ul style={{ listStyle: 'disc', paddingLeft: '20px', fontSize: '13px', color: '#334155', lineHeight: 1.6 }}>
                  {comp.accessibility.keyboardSupport.map((kb, i) => (
                    <li key={i}>{kb}</li>
                  ))}
                </ul>
              </div>

              {/* Core Web Vitals Card */}
              <div
                style={{
                  background: '#ffffff',
                  border: '1px solid #e2e8f0',
                  borderRadius: '16px',
                  padding: '24px',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
                  <span style={{ fontSize: '20px' }}>⚡</span>
                  <h3 style={{ fontSize: '17px', fontWeight: 700, color: '#0f172a', margin: 0 }}>
                    Core Web Vitals Impact
                  </h3>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', margin: '16px 0' }}>
                  <div style={{ background: '#f8fafc', padding: '12px', borderRadius: '10px', border: '1px solid #e2e8f0' }}>
                    <div style={{ fontSize: '11px', textTransform: 'uppercase', color: '#64748b' }}>Cumulative Layout Shift</div>
                    <div style={{ fontSize: '18px', fontWeight: 800, color: '#16a34a', marginTop: '4px' }}>
                      {comp.coreWebVitals.clsScore}
                    </div>
                  </div>
                  <div style={{ background: '#f8fafc', padding: '12px', borderRadius: '10px', border: '1px solid #e2e8f0' }}>
                    <div style={{ fontSize: '11px', textTransform: 'uppercase', color: '#64748b' }}>Interaction to Next Paint</div>
                    <div style={{ fontSize: '18px', fontWeight: 800, color: '#2563eb', marginTop: '4px' }}>
                      {comp.coreWebVitals.inpScore}
                    </div>
                  </div>
                </div>

                <p style={{ fontSize: '13px', color: '#475569', lineHeight: 1.6, margin: 0 }}>
                  <strong>Engineering Tip:</strong> {comp.coreWebVitals.performanceTips}
                </p>
              </div>
            </div>
          </section>

          {/* Related Components */}
          <section className="topic-section" aria-labelledby="related-heading" style={{ marginBottom: '60px' }}>
            <h2 id="related-heading" className="topic-section-title">
              More UI Components &amp; Patterns
            </h2>
            <div className="topic-grid" style={{ marginTop: '16px' }}>
              {related.map(rel => (
                <Link key={rel.slug} href={`/ui-components/${rel.slug}`} className="topic-card">
                  <span className="card-eyebrow">{rel.category}</span>
                  <h3>{rel.title}</h3>
                  <p>{rel.subtitle}</p>
                  <span className="card-link">
                    Inspect Component <span aria-hidden="true">→</span>
                  </span>
                </Link>
              ))}
            </div>
          </section>

          {/* Authority Box */}
          <section className="hub-note">
            <h2>High-Quality Interface Engineering</h2>
            <p>
              Every pattern in the VNHAX component directory is designed for longevity. By eliminating heavy JavaScript styling runtimes and adhering strictly to semantic HTML, your application maintains zero-shift Core Web Vitals and frictionless accessibility compliance.
            </p>
          </section>
        </div>
      </main>

      <SiteFooter />
    </>
  );
}
