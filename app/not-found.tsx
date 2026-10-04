'use client';

import Link from 'next/link';
import SiteHeader from '@/components/SiteHeader';
import SiteFooter from '@/components/SiteFooter';
import Breadcrumbs from '@/components/Breadcrumbs';

export default function NotFound() {
  return (
    <>
      <SiteHeader />

      <main className="container" style={{ maxWidth: '880px', margin: '0 auto', padding: '40px 20px 80px', textAlign: 'center' }}>
        <Breadcrumbs items={[{ label: '404 — Page Not Found' }]} />

        <div style={{ marginTop: '48px', marginBottom: '64px' }}>
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '80px',
              height: '80px',
              borderRadius: '24px',
              background: '#eff6ff',
              color: '#2563eb',
              fontSize: '32px',
              fontWeight: 800,
              fontFamily: 'var(--font-display)',
              marginBottom: '24px',
              boxShadow: '0 4px 14px rgba(37, 99, 235, 0.15)',
            }}
          >
            404
          </div>

          <h1
            style={{
              fontSize: 'clamp(32px, 4.5vw, 48px)',
              fontFamily: 'var(--font-display)',
              fontWeight: 700,
              color: '#0f172a',
              letterSpacing: '-0.02em',
              marginBottom: '16px',
            }}
          >
            Page Not Found
          </h1>

          <p
            style={{
              fontSize: '17px',
              color: '#64748b',
              maxWidth: '560px',
              margin: '0 auto 36px',
              lineHeight: 1.6,
            }}
          >
            The page or resource you requested may have moved, been renamed, or is temporarily unavailable.
            Use the links below or press <kbd style={{ padding: '2px 6px', background: '#f1f5f9', border: '1px solid #cbd5e1', borderRadius: '4px', fontSize: '13px', fontWeight: 600 }}>Ctrl+K</kbd> to search all articles and tools.
          </p>

          <div style={{ display: 'flex', gap: '14px', justifyContent: 'center', flexWrap: 'wrap', marginBottom: '56px' }}>
            <Link
              href="/"
              className="btn btn--dark"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                height: '46px',
                padding: '0 24px',
                borderRadius: '8px',
                fontSize: '14.5px',
                fontWeight: 600,
                textDecoration: 'none',
              }}
            >
              <span>← Back to Homepage</span>
            </Link>
            <Link
              href="/blog"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                height: '46px',
                padding: '0 24px',
                borderRadius: '8px',
                fontSize: '14.5px',
                fontWeight: 600,
                background: '#f8fafc',
                color: '#0f172a',
                border: '1px solid #e2e8f0',
                textDecoration: 'none',
              }}
            >
              Browse Articles &amp; Guides
            </Link>
          </div>

          {/* Quick Hub Navigation Grid */}
          <div style={{ textAlign: 'left', background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '16px', padding: '32px' }}>
            <h2 style={{ fontSize: '16px', fontWeight: 700, color: '#334155', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '20px' }}>
              Explore Popular Hubs &amp; Categories
            </h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '16px' }}>
              <Link
                href="/ai"
                style={{
                  background: '#ffffff',
                  border: '1px solid #e2e8f0',
                  borderRadius: '12px',
                  padding: '16px 20px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '6px',
                  textDecoration: 'none',
                }}
              >
                <span style={{ fontSize: '15px', fontWeight: 700, color: '#0f172a' }}>Innovation &amp; AI Hub →</span>
                <span style={{ fontSize: '13px', color: '#64748b' }}>Local models, runtimes, and machine learning.</span>
              </Link>

              <Link
                href="/developer-resources/github-repos"
                style={{
                  background: '#ffffff',
                  border: '1px solid #e2e8f0',
                  borderRadius: '12px',
                  padding: '16px 20px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '6px',
                  textDecoration: 'none',
                }}
              >
                <span style={{ fontSize: '15px', fontWeight: 700, color: '#0f172a' }}>GitHub Repositories →</span>
                <span style={{ fontSize: '13px', color: '#64748b' }}>Ollama, llama.cpp, ComfyUI, and LangChain reviews.</span>
              </Link>

              <Link
                href="/ui-components"
                style={{
                  background: '#ffffff',
                  border: '1px solid #e2e8f0',
                  borderRadius: '12px',
                  padding: '16px 20px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '6px',
                  textDecoration: 'none',
                }}
              >
                <span style={{ fontSize: '15px', fontWeight: 700, color: '#0f172a' }}>UI Components →</span>
                <span style={{ fontSize: '13px', color: '#64748b' }}>Production-ready accessible interface components.</span>
              </Link>

              <Link
                href="/contact"
                style={{
                  background: '#ffffff',
                  border: '1px solid #e2e8f0',
                  borderRadius: '12px',
                  padding: '16px 20px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '6px',
                  textDecoration: 'none',
                }}
              >
                <span style={{ fontSize: '15px', fontWeight: 700, color: '#0f172a' }}>Contact &amp; Support →</span>
                <span style={{ fontSize: '13px', color: '#64748b' }}>Reach out to the editorial team directly.</span>
              </Link>
            </div>
          </div>
        </div>
      </main>

      <SiteFooter />
    </>
  );
}
