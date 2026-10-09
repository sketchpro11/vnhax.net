import type { Metadata } from 'next';
import Link from 'next/link';
import SiteHeader from '@/components/SiteHeader';
import SiteFooter from '@/components/SiteFooter';
import Breadcrumbs from '@/components/Breadcrumbs';
import { BRAND_CONFIG } from '@/lib/seo';

export const metadata: Metadata = {
  title: 'Component Page Starter Template',
  description:
    'Free UI component starter pattern: full-width live preview, copy-ready semantic code blocks, accessibility notes, and design-system integration.',
  alternates: {
    canonical: `${BRAND_CONFIG.siteUrl}/ui-components/component-page-starter`,
  },
};

export default function ComponentPageStarter() {
  return (
    <>
      <SiteHeader activeNav="ui" variant="standard" />

      <main>
        <section className="component-layout" style={{ maxWidth: '1080px', margin: '0 auto', padding: '36px 24px 80px' }}>
          <Breadcrumbs
            items={[
              { label: 'UI Components', href: '/ui-components' },
              { label: 'Component Page Starter' },
            ]}
          />

          <h1 className="page-title" style={{ textAlign: 'left', marginBottom: '12px' }}>
            component page starter
          </h1>
          <p className="page-lede" style={{ textAlign: 'left', marginLeft: 0, marginBottom: '28px' }}>
            A full-width component detail pattern with a live preview, primary action buttons, code blocks, and implementation notes. Built to inspect before you copy.
          </p>

          {/* 1. Live preview box */}
          <div
            className="preview-box"
            style={{
              padding: '48px 24px',
              background: '#f8fafc',
              border: '1px solid #e2e8f0',
              borderRadius: '16px',
              textAlign: 'center',
              marginBottom: '24px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              minHeight: '200px',
            }}
          >
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '10px 22px',
                borderRadius: '999px',
                background: '#0f172a',
                color: '#ffffff',
                fontWeight: 600,
                fontSize: '14px',
                boxShadow: '0 4px 14px rgba(15, 23, 42, 0.25)',
              }}
            >
              <span>Interactive Action Button</span>
              <span>→</span>
            </div>
            <span style={{ color: '#94a3b8', fontSize: '12px', marginTop: '14px', letterSpacing: '0.06em', textTransform: 'uppercase' }}>
              Live Interactive Preview
            </span>
          </div>

          {/* 2. Primary actions */}
          <div className="component-actions" style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', marginBottom: '32px' }}>
            <button className="btn" type="button">
              Copy HTML
            </button>
            <button className="btn btn--dark" type="button">
              Copy CSS
            </button>
            <Link className="btn btn--outline" href="/ui-components">
              Back to Component Gallery
            </Link>
          </div>

          {/* 3. Code blocks */}
          <div className="code-block" style={{ marginBottom: '20px', border: '1px solid #e2e8f0', borderRadius: '12px', overflow: 'hidden' }}>
            <div
              className="code-head"
              style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 16px', background: '#f8fafc', borderBottom: '1px solid #e2e8f0', fontWeight: 600, fontSize: '13px' }}
            >
              <span>HTML</span>
            </div>
            <pre style={{ margin: 0, padding: '16px', background: '#ffffff', fontFamily: 'ui-monospace, monospace', fontSize: '13px' }}>
              <code>{`<button class="btn-primary" type="button">
  <span>Interactive Action Button</span>
  <span aria-hidden="true">&rarr;</span>
</button>`}</code>
            </pre>
          </div>

          <div className="code-block" style={{ marginBottom: '28px', border: '1px solid #e2e8f0', borderRadius: '12px', overflow: 'hidden' }}>
            <div
              className="code-head"
              style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 16px', background: '#f8fafc', borderBottom: '1px solid #e2e8f0', fontWeight: 600, fontSize: '13px' }}
            >
              <span>CSS</span>
            </div>
            <pre style={{ margin: 0, padding: '16px', background: '#ffffff', fontFamily: 'ui-monospace, monospace', fontSize: '13px' }}>
              <code>{`.btn-primary {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 10px 22px;
  border-radius: 999px;
  background: var(--ink, #0f172a);
  color: #ffffff;
  font-weight: 600;
  font-size: 14px;
  border: none;
  cursor: pointer;
  transition: transform 160ms ease, box-shadow 160ms ease;
}
.btn-primary:hover {
  transform: translateY(-1px);
  box-shadow: 0 4px 14px rgba(15, 23, 42, 0.25);
}`}</code>
            </pre>
          </div>

          {/* 4. Usage notes and license */}
          <div className="prose" style={{ borderTop: '1px solid #e2e8f0', paddingTop: '28px' }}>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '20px', fontWeight: 700, marginBottom: '14px', color: '#0f172a' }}>
              Usage Notes &amp; Accessibility
            </h2>
            <ul style={{ paddingLeft: '20px', lineHeight: 1.7, color: '#475569', fontSize: '14px' }}>
              <li>
                <strong>Keyboard Support:</strong> Standard button elements receive native tab index and trigger on Enter / Space.
              </li>
              <li>
                <strong>Contrast:</strong> Pure white text (#ffffff) on ink black (#0f172a) yields a contrast ratio of 18.2:1, far exceeding WCAG AAA.
              </li>
              <li>
                <strong>Tokens:</strong> Uses <code>var(--ink)</code> for automatic synchronization with your theme.
              </li>
            </ul>
          </div>
        </section>
      </main>

      <SiteFooter />
    </>
  );
}
