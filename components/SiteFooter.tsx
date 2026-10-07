'use client';

import Link from 'next/link';
import Image from 'next/image';
import { BRAND_CONFIG } from '@/lib/seo';

export default function SiteFooter() {
  function scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  return (
    <footer className="site-footer" role="contentinfo">
      <div className="footer-container">
        {/* Main 4-Column Grid */}
        <div className="footer-grid">
          {/* Column 1: Brand & Identity */}
          <div className="footer-col footer-col--brand">
            <Link href="/" className="footer-logo" aria-label="VNHAX Home">
              <Image
                src="/logo.png"
                alt=""
                width={105}
                height={41}
                className="footer-logo-img"
              />
            </Link>
            <p className="footer-acronym">{BRAND_CONFIG.acronymExplanation}</p>
            <p className="footer-bio">
              Independent engineering field guides, deep technical architecture reviews,
              and production-ready open-source AI tooling for developers and researchers.
            </p>
            <div className="footer-social-links" aria-label="Social Profiles">
              <a
                href="https://github.com/vnhax"
                target="_blank"
                rel="noopener noreferrer"
                className="social-icon-btn"
                aria-label="VNHAX GitHub"
              >
                <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
                </svg>
              </a>
              <a
                href="https://x.com/vnhax"
                target="_blank"
                rel="noopener noreferrer"
                className="social-icon-btn"
                aria-label="VNHAX on X"
              >
                <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>
              <a
                href="https://linkedin.com/company/vnhax"
                target="_blank"
                rel="noopener noreferrer"
                className="social-icon-btn"
                aria-label="VNHAX LinkedIn"
              >
                <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Column 2: Architecture Hubs */}
          <div className="footer-col">
            <h3 className="footer-col-title">Architecture Hubs</h3>
            <ul className="footer-links-list">
              <li>
                <Link href="/ai">Innovation &amp; AI Hub</Link>
              </li>
              <li>
                <Link href="/ai/ai-tools">AI Tools &amp; Models</Link>
              </li>
              <li>
                <Link href="/developer-resources">Developer Resources</Link>
              </li>
              <li>
                <Link href="/developer-resources/github-repos">GitHub Repositories</Link>
              </li>
              <li>
                <Link href="/ui-components">UI Components Library</Link>
              </li>
              <li>
                <Link href="/technology">Tech Platforms</Link>
              </li>
              <li>
                <Link href="/blog">Articles &amp; Guides</Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Resources & Catalogs */}
          <div className="footer-col">
            <h3 className="footer-col-title">Resources &amp; Catalogs</h3>
            <ul className="footer-links-list">
              <li>
                <Link href="/repos">Repositories Catalog</Link>
              </li>
              <li>
                <Link href="/blog">Articles &amp; Research</Link>
              </li>
              <li>
                <Link href="/ai/ai-tools">AI Tools Directory</Link>
              </li>
              <li>
                <Link href="/developer-resources/github-repos">GitHub Repositories Hub</Link>
              </li>
              <li>
                <Link href="/ui-components">UI Components Library</Link>
              </li>
              <li>
                <Link href="/technology/platforms">Platform Evaluation Matrix</Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Compliance & Legal */}
          <div className="footer-col">
            <h3 className="footer-col-title">Company &amp; Legal</h3>
            <ul className="footer-links-list">
              <li>
                <Link href="/privacy-policy">Privacy Policy</Link>
              </li>
              <li>
                <Link href="/terms">Terms and Conditions</Link>
              </li>
              <li>
                <Link href="/about">About Us</Link>
              </li>
              <li>
                <Link href="/contact">Contact Us</Link>
              </li>
              <li>
                <Link href="/disclaimer">Disclaimer</Link>
              </li>
              <li>
                <Link href="/sitemap.xml" target="_blank">XML Sitemap</Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Minimal Footer Bottom Bar */}
        <div className="footer-bottom">
          <div className="footer-bottom-info">
            <span className="footer-copy">
              © {new Date().getFullYear()} {BRAND_CONFIG.legalName}. All rights reserved.
            </span>
            <p className="footer-credits">
              Developed by{' '}
              <a
                href="https://udesigner.net"
                target="_blank"
                rel="noopener noreferrer"
                className="footer-credit-link"
              >
                U DESIGNER
              </a>
            </p>
            <p className="footer-legal-notice">
              Independent technical research, hardware benchmarks, and open-source documentation. All product names, logos, and brands belong to their respective owners.
            </p>
          </div>
          <button
            type="button"
            className="footer-back-to-top"
            onClick={scrollToTop}
            aria-label="Scroll back to top"
          >
            <span>Back to top</span>
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="m18 15-6-6-6 6" />
            </svg>
          </button>
        </div>
      </div>
    </footer>
  );
}
