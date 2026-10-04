'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import GlobalSearch from '@/components/GlobalSearch';

interface SiteHeaderProps {
  activeNav?: 'ai' | 'developer' | 'ui' | 'technology' | 'blog';
  variant?: 'home' | 'standard';
}

export default function SiteHeader({ activeNav, variant = 'standard' }: SiteHeaderProps) {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Global hotkey Ctrl+K / Cmd+K listener
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setIsSearchOpen((prev) => !prev);
      }
      if (e.key === 'Escape') {
        setMobileMenuOpen(false);
      }
    }
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Lock body scroll when mobile menu is open to prevent background bleed-through
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  return (
    <>
      <header className={`site-header site-header--${variant}`}>
        <div className="header-inner">
          <Link className="site-logo" href="/" aria-label="VNHAX Home">
            <Image
              src="/logo.png"
              alt="VNHAX"
              width={112}
              height={44}
              className="site-logo-img"
              priority
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="main-nav" aria-label="Primary Navigation">
            <Link
              href="/ai"
              className={`nav-link ${activeNav === 'ai' ? 'is-active' : ''}`}
              aria-current={activeNav === 'ai' ? 'page' : undefined}
            >
              Innovation &amp; AI
            </Link>
            <Link
              href="/developer-resources"
              className={`nav-link ${activeNav === 'developer' ? 'is-active' : ''}`}
              aria-current={activeNav === 'developer' ? 'page' : undefined}
            >
              Developer Resources
            </Link>
            <Link
              href="/ui-components"
              className={`nav-link ${activeNav === 'ui' ? 'is-active' : ''}`}
              aria-current={activeNav === 'ui' ? 'page' : undefined}
            >
              UI Components
            </Link>
            <Link
              href="/technology"
              className={`nav-link ${activeNav === 'technology' ? 'is-active' : ''}`}
              aria-current={activeNav === 'technology' ? 'page' : undefined}
            >
              Tech Platforms
            </Link>
            <Link
              href="/blog"
              className={`nav-link ${activeNav === 'blog' ? 'is-active' : ''}`}
              aria-current={activeNav === 'blog' ? 'page' : undefined}
            >
              Articles &amp; Guides
            </Link>
          </nav>

          {/* Action buttons */}
          <div className="header-actions">
            {/* Quick Search Trigger */}
            <button
              className="header-search-btn"
              type="button"
              onClick={() => setIsSearchOpen(true)}
              aria-label="Open Search (Ctrl+K)"
              title="Search guides, repos, components (Ctrl+K)"
            >
              <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <circle cx="11" cy="11" r="8" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
              <span className="search-btn-label">Search</span>
              <kbd className="search-btn-shortcut">⌘K</kbd>
            </button>

            {/* Desktop Newsletter Button */}
            <Link className="newsletter-button desktop-only-btn" href="/contact">
              Newsletter
            </Link>

            {/* Mobile Hamburger Button */}
            <button
              className="mobile-nav-toggle"
              type="button"
              onClick={() => setMobileMenuOpen((prev) => !prev)}
              aria-expanded={mobileMenuOpen}
              aria-label="Toggle navigation menu"
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                <line x1="3" y1="12" x2="21" y2="12" />
                <line x1="3" y1="6" x2="21" y2="6" />
                <line x1="3" y1="18" x2="21" y2="18" />
              </svg>
            </button>
          </div>
        </div>
      </header>

      {/* Google AdSense Compliant Mobile Navigation Drawer & Overlay */}
      {mobileMenuOpen && (
        <div
          className="mobile-nav-overlay"
          onClick={() => setMobileMenuOpen(false)}
          role="dialog"
          aria-modal="true"
          aria-label="Mobile Navigation"
        >
          <div
            className="mobile-nav-drawer"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Drawer Top Bar */}
            <div className="mobile-drawer-header">
              <Link className="site-logo" href="/" onClick={() => setMobileMenuOpen(false)} aria-label="VNHAX Home">
                <Image
                  src="/logo.png"
                  alt="VNHAX"
                  width={104}
                  height={40}
                  className="site-logo-img"
                />
              </Link>
              <button
                type="button"
                className="mobile-drawer-close"
                onClick={() => setMobileMenuOpen(false)}
                aria-label="Close navigation menu"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            </div>

            {/* Drawer Search Trigger */}
            <div
              className="mobile-search-trigger"
              onClick={() => {
                setMobileMenuOpen(false);
                setIsSearchOpen(true);
              }}
              role="button"
              tabIndex={0}
              aria-label="Search site"
            >
              <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" aria-hidden="true">
                <circle cx="11" cy="11" r="8" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
              <span>Search articles, models, repos...</span>
              <span className="mobile-search-badge">Search</span>
            </div>

            {/* Drawer Body with Clean Categorized Navigation */}
            <div className="mobile-drawer-body">
              <span className="mobile-section-label">Architecture Hubs</span>
              <nav className="mobile-links-list" aria-label="Mobile Main Navigation">
                <Link
                  href="/ai"
                  onClick={() => setMobileMenuOpen(false)}
                  className={`mobile-nav-link ${activeNav === 'ai' ? 'is-active' : ''}`}
                >
                  <span className="mobile-link-icon" aria-hidden="true">⚡</span>
                  <span className="mobile-link-text">Innovation &amp; AI</span>
                  <span className="mobile-link-arrow" aria-hidden="true">→</span>
                </Link>

                <Link
                  href="/developer-resources"
                  onClick={() => setMobileMenuOpen(false)}
                  className={`mobile-nav-link ${activeNav === 'developer' ? 'is-active' : ''}`}
                >
                  <span className="mobile-link-icon" aria-hidden="true">💻</span>
                  <span className="mobile-link-text">Developer Resources</span>
                  <span className="mobile-link-arrow" aria-hidden="true">→</span>
                </Link>

                <Link
                  href="/ui-components"
                  onClick={() => setMobileMenuOpen(false)}
                  className={`mobile-nav-link ${activeNav === 'ui' ? 'is-active' : ''}`}
                >
                  <span className="mobile-link-icon" aria-hidden="true">🎨</span>
                  <span className="mobile-link-text">UI Components</span>
                  <span className="mobile-link-arrow" aria-hidden="true">→</span>
                </Link>

                <Link
                  href="/technology"
                  onClick={() => setMobileMenuOpen(false)}
                  className={`mobile-nav-link ${activeNav === 'technology' ? 'is-active' : ''}`}
                >
                  <span className="mobile-link-icon" aria-hidden="true">🌐</span>
                  <span className="mobile-link-text">Tech Platforms</span>
                  <span className="mobile-link-arrow" aria-hidden="true">→</span>
                </Link>

                <Link
                  href="/blog"
                  onClick={() => setMobileMenuOpen(false)}
                  className={`mobile-nav-link ${activeNav === 'blog' ? 'is-active' : ''}`}
                >
                  <span className="mobile-link-icon" aria-hidden="true">📝</span>
                  <span className="mobile-link-text">Articles &amp; Guides</span>
                  <span className="mobile-link-arrow" aria-hidden="true">→</span>
                </Link>
              </nav>

              <div className="mobile-divider" />

              <span className="mobile-section-label">Trust &amp; Legal Policies</span>
              <nav className="mobile-links-list mobile-links-list--secondary" aria-label="Legal and Trust Navigation">
                <Link href="/about" onClick={() => setMobileMenuOpen(false)} className="mobile-sublink">
                  <span>About Us &amp; Editorial Mission</span>
                  <span className="mobile-sublink-arrow">›</span>
                </Link>
                <Link href="/contact" onClick={() => setMobileMenuOpen(false)} className="mobile-sublink">
                  <span>Contact Desk &amp; Inquiries</span>
                  <span className="mobile-sublink-arrow">›</span>
                </Link>
                <Link href="/privacy-policy" onClick={() => setMobileMenuOpen(false)} className="mobile-sublink">
                  <span>Privacy Policy &amp; Cookie Disclosure</span>
                  <span className="mobile-sublink-arrow">›</span>
                </Link>
                <Link href="/terms" onClick={() => setMobileMenuOpen(false)} className="mobile-sublink">
                  <span>Terms of Service &amp; Disclaimer</span>
                  <span className="mobile-sublink-arrow">›</span>
                </Link>
              </nav>
            </div>

            {/* Drawer Footer CTA */}
            <div className="mobile-drawer-footer">
              <Link
                href="/contact"
                className="mobile-cta-btn"
                onClick={() => setMobileMenuOpen(false)}
              >
                Join Free Engineering Newsletter →
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* Global Interactive Search Modal */}
      <GlobalSearch isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </>
  );
}
