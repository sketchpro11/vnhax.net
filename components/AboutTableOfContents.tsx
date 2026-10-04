'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';

interface SectionItem {
  id: string;
  number: string;
  title: string;
}

const SECTIONS: SectionItem[] = [
  { id: 'brand-mission', number: '01', title: 'Brand Definition & Core Mission' },
  { id: 'editorial-pillars', number: '02', title: 'The Three Engineering Pillars' },
  { id: 'hardware-lab', number: '03', title: 'Physical Hardware Testing (E-E-A-T)' },
  { id: 'anti-piracy-standards', number: '04', title: 'Ethical Standards & Anti-Piracy' },
  { id: 'engineering-leadership', number: '05', title: 'Leadership & Author Background' },
  { id: 'core-values', number: '06', title: 'Core Values & Philosophy' },
  { id: 'trademarks-fairuse', number: '07', title: 'Trademarks & Open Licensing' },
  { id: 'editorial-contact', number: '08', title: 'Editorial Desk & Inquiries' },
];

export default function AboutTableOfContents() {
  const [activeId, setActiveId] = useState<string>('brand-mission');

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
    <aside className="policy-sidebar" aria-label="About VNHAX Sidebar">
      <div className="sidebar-sticky">
        {/* Table of Contents Widget */}
        <div className="sidebar-widget policy-toc-widget">
          <div className="sidebar-widget-header">
            <span className="sidebar-kicker">Navigation</span>
            <h3>About VNHAX Sections</h3>
          </div>

          <nav aria-label="About table of contents">
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

        {/* E-E-A-T Standards Snapshot */}
        <div className="sidebar-widget policy-snapshot-widget">
          <div className="sidebar-widget-header">
            <span className="sidebar-kicker">E-E-A-T Standards</span>
            <h3>Publishing Highlights</h3>
          </div>
          <ul className="policy-snapshot-list">
            <li>
              <span className="snapshot-icon">🔬</span>
              <div>
                <strong>Physical Hardware:</strong> 100% of tutorials validated on real GPU &amp; Apple Silicon testbeds.
              </div>
            </li>
            <li>
              <span className="snapshot-icon">🧠</span>
              <div>
                <strong>Deep Tech Focus:</strong> Local LLM runtimes, GGUF quants, and agentic protocols.
              </div>
            </li>
            <li>
              <span className="snapshot-icon">🛡️</span>
              <div>
                <strong>Ethical &amp; Clean:</strong> Zero affiliation with game cracks, warez, or malicious hacks.
              </div>
            </li>
            <li>
              <span className="snapshot-icon">🔓</span>
              <div>
                <strong>Free &amp; Open:</strong> No paywalls, no forced registrations, open developer tools.
              </div>
            </li>
            <li>
              <span className="snapshot-icon">⚖️</span>
              <div>
                <strong>Fully Compliant:</strong> AdSense, GDPR, CCPA, and COPPA compliant documentation.
              </div>
            </li>
          </ul>
        </div>

        {/* Contact Editorial Desk Widget */}
        <div className="sidebar-widget policy-contact-widget">
          <div className="sidebar-widget-header">
            <span className="sidebar-kicker">Editorial Desk</span>
            <h3>Reach Our Engineering Team</h3>
          </div>
          <p className="policy-contact-desc">
            Technical corrections, benchmark feedback, or open-source repo submissions:
          </p>
          <a href="mailto:hello@vnhax.net" className="policy-email-btn">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
              <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
              <polyline points="22,6 12,13 2,6" />
            </svg>
            <span>hello@vnhax.net</span>
          </a>
          <div className="policy-secondary-links">
            <Link href="/contact" className="policy-text-link">
              Interactive Contact Form →
            </Link>
            <Link href="/privacy-policy" className="policy-text-link">
              Privacy Policy &amp; Disclosures →
            </Link>
            <Link href="/terms" className="policy-text-link">
              Terms of Service &amp; Disclaimer →
            </Link>
          </div>
        </div>
      </div>
    </aside>
  );
}
