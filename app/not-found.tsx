import Link from 'next/link';
import SiteHeader from '@/components/SiteHeader';
import SiteFooter from '@/components/SiteFooter';

export default function NotFound() {
  return (
    <>
      <SiteHeader variant="standard" />

      <main className="not-found-wrapper">
        <div className="not-found-card">
          <span className="not-found-code">404</span>
          
          <h1 className="not-found-title">Page not found</h1>
          
          <p className="not-found-desc">
            The page you are looking for doesn’t exist, has been removed, or the link might be broken.
          </p>

          <div className="not-found-actions">
            <Link href="/" className="not-found-btn not-found-btn--primary">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <line x1="19" y1="12" x2="5" y2="12"></line>
                <polyline points="12 19 5 12 12 5"></polyline>
              </svg>
              <span>Back to home</span>
            </Link>
            
            <Link href="/blog" className="not-found-btn not-found-btn--secondary">
              <span>Browse articles</span>
            </Link>
          </div>

          <div className="not-found-divider" />

          <div className="not-found-ecosystems">
            <span className="not-found-ecosystems-label">Or explore ecosystems</span>
            <div className="not-found-ecosystems-grid">
              <Link href="/anthropic" className="not-found-pill">Anthropic</Link>
              <Link href="/openai" className="not-found-pill">OpenAI</Link>
              <Link href="/google" className="not-found-pill">Google</Link>
              <Link href="/github" className="not-found-pill">GitHub</Link>
              <Link href="/xai" className="not-found-pill">xAI</Link>
              <Link href="/meta" className="not-found-pill">Meta</Link>
            </div>
          </div>
        </div>
      </main>

      <SiteFooter />
    </>
  );
}
