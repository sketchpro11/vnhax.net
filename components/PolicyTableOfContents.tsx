'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';

interface SectionItem {
  id: string;
  number: string;
  title: string;
  shortTitle: string;
}

const SECTIONS: SectionItem[] = [
  { id: 'brand-identification', number: '01', title: 'Brand Identification & Scope', shortTitle: 'Brand & Scope' },
  { id: 'log-files', number: '02', title: 'Web Hosting Log Files & Data', shortTitle: 'Log Files' },
  { id: 'cookies-web-beacons', number: '03', title: 'Cookies & Web Beacons', shortTitle: 'Cookies & Beacons' },
  { id: 'google-dart-cookies', number: '04', title: 'Google DoubleClick DART Cookies', shortTitle: 'Google DART Cookies' },
  { id: 'third-party-ad-networks', number: '05', title: 'Third-Party Advertising Partners', shortTitle: 'Third-Party Ad Networks' },
  { id: 'analytics-telemetry', number: '06', title: 'Analytics & Traffic Measurement', shortTitle: 'Analytics' },
  { id: 'user-rights-gdpr-ccpa', number: '07', title: 'User Rights (GDPR & CCPA/CPRA)', shortTitle: 'GDPR & CCPA Rights' },
  { id: 'childrens-privacy', number: '08', title: "Children's Privacy Protection (COPPA)", shortTitle: "Children's Privacy (COPPA)" },
  { id: 'data-security-retention', number: '09', title: 'Data Security & Retention', shortTitle: 'Security & Retention' },
  { id: 'consent-policy-updates', number: '10', title: 'Consent, Updates & Contact', shortTitle: 'Consent & Contact' },
];

export default function PolicyTableOfContents() {
  const [activeId, setActiveId] = useState<string>('brand-identification');

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      const scrollPosition = window.scrollY + 160;
      
      for (let i = SECTIONS.length - 1; i >= 0; i--) {
        const el = document.getElementById(SECTIONS[i].id);
        if (el && el.offsetTop <= scrollPosition) {
          const newId = SECTIONS[i].id;
          setActiveId((prev) => (prev !== newId ? newId : prev));
          break;
        }
      }
      ticking = false;
    };

    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(handleScroll);
        ticking = true;
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const target = document.getElementById(id);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      setActiveId(id);
      window.history.replaceState(null, '', `#${id}`);
    }
  };

  return (
    <aside className="policy-sidebar" aria-label="Privacy Policy Sidebar">
      <div className="sidebar-sticky">
        {/* Table of Contents Widget */}
        <div className="sidebar-widget policy-toc-widget">
          <div className="sidebar-widget-header">
            <span className="sidebar-kicker">Navigation</span>
            <h3>Table of Contents</h3>
          </div>
          
          <nav aria-label="Table of contents navigation">
            <ol className="policy-toc-list">
              {SECTIONS.map((sec) => (
                <li key={sec.id}>
                  <a
                    href={`#${sec.id}`}
                    onClick={(e) => scrollToSection(e, sec.id)}
                    className={`policy-toc-link ${activeId === sec.id ? 'active' : ''}`}
                    aria-current={activeId === sec.id ? 'true' : undefined}
                  >
                    <span className="policy-toc-number">{sec.number}</span>
                    <span className="policy-toc-text">{sec.title}</span>
                  </a>
                </li>
              ))}
            </ol>
          </nav>
        </div>

        {/* Quick Compliance Snapshot Widget */}
        <div className="sidebar-widget policy-snapshot-widget">
          <div className="sidebar-widget-header">
            <span className="sidebar-kicker">Summary</span>
            <h3>Key Privacy Highlights</h3>
          </div>
          <ul className="policy-snapshot-list">
            <li>
              <span className="snapshot-icon">🛡️</span>
              <div>
                <strong>Zero Data Selling:</strong> We never sell, rent, or trade reader personal data.
              </div>
            </li>
            <li>
              <span className="snapshot-icon">🍪</span>
              <div>
                <strong>Ad Opt-Out:</strong> Links to turn off personalised ads from Google and other vendors.
              </div>
            </li>
            <li>
              <span className="snapshot-icon">⚖️</span>
              <div>
                <strong>Your Rights:</strong> Ask us to access, correct or delete your data.
              </div>
            </li>
            <li>
              <span className="snapshot-icon">👶</span>
              <div>
                <strong>Children:</strong> We do not knowingly collect data from children under 13.
              </div>
            </li>
            <li>
              <span className="snapshot-icon">🔒</span>
              <div>
                <strong>Encrypted:</strong> The whole site is served over HTTPS.
              </div>
            </li>
          </ul>
        </div>

        {/* Official Privacy Officer Contact Widget */}
        <div className="sidebar-widget policy-contact-widget">
          <div className="sidebar-widget-header">
            <span className="sidebar-kicker">Privacy</span>
            <h3>Questions or Data Requests?</h3>
          </div>
          <p className="policy-contact-desc">
            Questions about your data or this policy? Email:
          </p>
          <a href="mailto:privacy@vnhax.net" className="policy-email-btn">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
              <polyline points="22,6 12,13 2,6" />
            </svg>
            <span>privacy@vnhax.net</span>
          </a>
          <div className="policy-secondary-links">
            <Link href="/terms" className="policy-text-link">
              Terms of Service &amp; Disclaimer →
            </Link>
            <Link href="/contact" className="policy-text-link">
              Contact Form →
            </Link>
          </div>
        </div>
      </div>
    </aside>
  );
}
