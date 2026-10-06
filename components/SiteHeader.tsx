'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import GlobalSearch from '@/components/GlobalSearch';

interface SiteHeaderProps {
  activeNav?: 'ai' | 'developer' | 'ui' | 'technology' | 'blog';
  variant?: 'home' | 'standard';
}

const NAV_ITEMS = [
  {
    key: 'ai',
    label: 'Innovation & AI',
    href: '/ai',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/>
      </svg>
    ),
  },
  {
    key: 'developer',
    label: 'Dev Repos',
    href: '/developer-resources',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <polyline points="16 18 22 12 16 6"/>
        <polyline points="8 6 2 12 8 18"/>
      </svg>
    ),
  },
  {
    key: 'ui',
    label: 'UI Components',
    href: '/ui-components',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <rect width="18" height="18" x="3" y="3" rx="2"/>
        <path d="M3 9h18"/>
        <path d="M9 21V9"/>
      </svg>
    ),
  },
  {
    key: 'technology',
    label: 'Tech Platforms',
    href: '/technology',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <rect width="16" height="16" x="4" y="4" rx="2"/>
        <rect width="6" height="6" x="9" y="9" rx="1"/>
        <path d="M15 2v2"/><path d="M15 20v2"/><path d="M2 15h2"/><path d="M2 9h2"/><path d="M20 15h2"/><path d="M20 9h2"/><path d="M9 2v2"/><path d="M9 20v2"/>
      </svg>
    ),
  },
  {
    key: 'blog',
    label: 'Articles & Guides',
    href: '/blog',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1-2.5-2.5Z"/>
        <path d="M6 6h10"/><path d="M6 10h10"/>
      </svg>
    ),
  },
];

export default function SiteHeader({ activeNav, variant = 'standard' }: SiteHeaderProps) {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [hoverX, setHoverX] = useState<number | null>(null);

  const dockRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<(HTMLAnchorElement | null)[]>([]);

  // Proximity dock mouse physics
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    setHoverX(e.clientX);
  };

  const handleMouseLeave = () => {
    setHoverX(null);
  };

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

  // Lock body scroll when mobile menu is open
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
      <header className="atd-modern-header-wrap">
        <div className="atd-modern-bar">
          {/* Left: Brand Inset */}
          <Link className="atd-modern__brand" href="/" aria-label="VNHAX Home">
            <div className="atd-modern__mark">
              <Image
                src="/icon.png"
                alt="VNHAX"
                width={20}
                height={20}
                style={{ width: '20px', height: '20px', objectFit: 'contain' }}
                priority
              />
            </div>
            <span className="atd-modern__word">vnhax</span>
          </Link>

          {/* Center: Proximity Animated Dock */}
          <nav
            ref={dockRef}
            className="atd-modern__dock"
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            aria-label="Primary Navigation"
          >
            {NAV_ITEMS.map((item, idx) => {
              const isActive = activeNav === item.key;
              let scale = 1;

              if (hoverX !== null) {
                const el = itemRefs.current[idx];
                if (el) {
                  const rect = el.getBoundingClientRect();
                  const itemCenter = rect.left + rect.width / 2;
                  const distance = Math.abs(hoverX - itemCenter);
                  const radius = 120; // Proximity threshold in pixels
                  if (distance < radius) {
                    const factor = (1 + Math.cos((distance / radius) * Math.PI)) / 2;
                    scale = 1 + factor * 0.12; // smoothly scales up to ~1.12x
                  }
                }
              }

              return (
                <Link
                  key={item.key}
                  ref={(el) => {
                    itemRefs.current[idx] = el;
                  }}
                  href={item.href}
                  className={`atd-modern__item ${isActive ? 'is-active' : ''}`}
                  aria-current={isActive ? 'page' : undefined}
                  style={{
                    transform: `scale(${scale})`,
                    transition:
                      hoverX === null
                        ? 'transform 0.25s cubic-bezier(0.2, 0, 0, 1), background 0.15s ease, color 0.15s ease'
                        : 'transform 0.08s ease-out, background 0.15s ease, color 0.15s ease',
                  }}
                >
                  <span className="atd-modern__icon">{item.icon}</span>
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>

          {/* Right: Actions */}
          <div className="atd-modern__actions">
            {/* Quick Search Trigger */}
            <button
              type="button"
              className="atd-modern__ghost"
              onClick={() => setIsSearchOpen(true)}
              aria-label="Search guides & tools (Ctrl+K)"
              title="Search (Ctrl+K)"
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <circle cx="11" cy="11" r="8" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
              <span className="atd-modern__kbd">⌘K</span>
            </button>

            {/* CTA Action Button */}
            <Link
              href="/developer-resources/github-repos"
              className="atd-modern__cta"
              aria-label="Explore GitHub repositories"
            >
              <span>Explore Repos</span>
              <div className="atd-modern__cta-arrow">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <line x1="5" y1="12" x2="19" y2="12" />
                  <polyline points="12 5 19 12 12 19" />
                </svg>
              </div>
            </Link>

            {/* Mobile Hamburger Toggle */}
            <button
              className="atd-modern__mobile-toggle"
              type="button"
              onClick={() => setMobileMenuOpen((prev) => !prev)}
              aria-expanded={mobileMenuOpen}
              aria-label="Toggle navigation menu"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                <line x1="3" y1="12" x2="21" y2="12" />
                <line x1="3" y1="6" x2="21" y2="6" />
                <line x1="3" y1="18" x2="21" y2="18" />
              </svg>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Navigation Drawer & Overlay */}
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
              <Link className="mobile-drawer-brand" href="/" onClick={() => setMobileMenuOpen(false)} aria-label="VNHAX Home">
                <Image
                  src="/logo.png"
                  alt="VNHAX"
                  width={96}
                  height={34}
                  style={{ height: '26px', width: 'auto' }}
                  priority
                />
              </Link>
              <button
                className="mobile-drawer-close"
                type="button"
                onClick={() => setMobileMenuOpen(false)}
                aria-label="Close menu"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            </div>

            {/* Drawer Body */}
            <div className="mobile-drawer-body">
              <button
                type="button"
                className="mobile-search-trigger"
                onClick={() => {
                  setMobileMenuOpen(false);
                  setIsSearchOpen(true);
                }}
                aria-label="Quick Search"
              >
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <circle cx="11" cy="11" r="8" />
                  <line x1="21" y1="21" x2="16.65" y2="16.65" />
                </svg>
                <span>Search guides, repos, tools...</span>
                <span className="mobile-search-badge">⌘K</span>
              </button>

              <nav className="mobile-links-list" aria-label="Mobile Primary Navigation">
                {NAV_ITEMS.map((item) => {
                  const isActive = activeNav === item.key;
                  return (
                    <Link
                      key={item.key}
                      href={item.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className={`mobile-nav-link ${isActive ? 'is-active' : ''}`}
                      aria-current={isActive ? 'page' : undefined}
                    >
                      <div className="mobile-nav-link__content">
                        <span className="mobile-nav-link__icon">{item.icon}</span>
                        <span>{item.label}</span>
                      </div>
                      <svg className="mobile-nav-link__chevron" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="9 18 15 12 9 6" />
                      </svg>
                    </Link>
                  );
                })}
              </nav>

              <div className="mobile-divider" />

              <span className="mobile-section-label">Company &amp; Legal</span>
              <nav className="mobile-links-list mobile-links-list--secondary" aria-label="Legal and Trust Navigation">
                <Link href="/privacy-policy" onClick={() => setMobileMenuOpen(false)} className="mobile-sublink">
                  Privacy Policy
                </Link>
                <Link href="/terms" onClick={() => setMobileMenuOpen(false)} className="mobile-sublink">
                  Terms and Conditions
                </Link>
                <Link href="/about" onClick={() => setMobileMenuOpen(false)} className="mobile-sublink">
                  About Us
                </Link>
                <Link href="/contact" onClick={() => setMobileMenuOpen(false)} className="mobile-sublink">
                  Contact Us
                </Link>
                <Link href="/disclaimer" onClick={() => setMobileMenuOpen(false)} className="mobile-sublink">
                  Disclaimer
                </Link>
              </nav>
            </div>

            {/* Drawer Footer CTA */}
            <div className="mobile-drawer-footer">
              <Link
                href="/developer-resources/github-repos"
                className="mobile-cta-btn"
                onClick={() => setMobileMenuOpen(false)}
              >
                <span>Explore GitHub Repos</span>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="5" y1="12" x2="19" y2="12" />
                  <polyline points="12 5 19 12 12 19" />
                </svg>
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
