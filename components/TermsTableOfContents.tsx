'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';

interface SectionItem {
  id: string;
  number: string;
  title: string;
}

const SECTIONS: SectionItem[] = [
  { id: 'agreement-to-terms', number: '01', title: 'Agreement & Acceptance of Terms' },
  { id: 'intellectual-property', number: '02', title: 'IP & Educational Licensing' },
  { id: 'as-is-disclaimer', number: '03', title: '"As-Is" Engineering Disclaimer' },
  { id: 'hardware-model-risks', number: '04', title: 'Hardware, GPU & Model Execution Risks' },
  { id: 'outbound-links', number: '05', title: 'Third-Party Repositories & External Links' },
  { id: 'prohibited-conduct', number: '06', title: 'Prohibited Activities & Scraping' },
  { id: 'limitation-liability', number: '07', title: 'Comprehensive Limitation of Liability' },
  { id: 'indemnification', number: '08', title: 'User Indemnification' },
  { id: 'governing-law', number: '09', title: 'Governing Law & Amendments' },
  { id: 'contact-legal', number: '10', title: 'Legal Contact & Notice Desk' },
];

export default function TermsTableOfContents() {
  const [activeId, setActiveId] = useState<string>('agreement-to-terms');

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
    <aside className="policy-sidebar" aria-label="Terms of Service Sidebar">
      <div className="sidebar-sticky">
        {/* Table of Contents Widget */}
        <div className="sidebar-widget policy-toc-widget">
          <div className="sidebar-widget-header">
            <span className="sidebar-kicker">Navigation</span>
            <h3>Terms of Service Sections</h3>
          </div>

          <nav aria-label="Terms table of contents">
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

        {/* Legal Terms Snapshot */}
        <div className="sidebar-widget policy-snapshot-widget">
          <div className="sidebar-widget-header">
            <span className="sidebar-kicker">Legal Summary</span>
            <h3>Key Terms Snapshot</h3>
          </div>
          <ul className="policy-snapshot-list">
            <li>
              <span className="snapshot-icon">💻</span>
              <div>
                <strong>&quot;As-Is&quot; Code:</strong> All scripts and terminal commands are provided without warranty.
              </div>
            </li>
            <li>
              <span className="snapshot-icon">🔬</span>
              <div>
                <strong>Sandbox First:</strong> Users execute model workflows on hardware at their own discretion.
              </div>
            </li>
            <li>
              <span className="snapshot-icon">🔗</span>
              <div>
                <strong>External Repos:</strong> Upstream GitHub tools remain subject to their author licenses.
              </div>
            </li>
            <li>
              <span className="snapshot-icon">🛡️</span>
              <div>
                <strong>Anti-Scraping:</strong> Automated extraction or DDoS attacks strictly prohibited.
              </div>
            </li>
            <li>
              <span className="snapshot-icon">⚖️</span>
              <div>
                <strong>Limited Liability:</strong> Zero financial or downtime liability for code execution.
              </div>
            </li>
          </ul>
        </div>

        {/* Legal Inquiries Contact Card */}
        <div className="sidebar-widget policy-contact-widget">
          <div className="sidebar-widget-header">
            <span className="sidebar-kicker">Contact</span>
            <h3>Questions Regarding Terms?</h3>
          </div>
          <p className="policy-contact-desc">
            Questions about these terms, licensing or copyright? Email:
          </p>
          <a href="mailto:contact@vnhax.net" className="policy-email-btn">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
              <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
              <polyline points="22,6 12,13 2,6" />
            </svg>
            <span>contact@vnhax.net</span>
          </a>
          <div className="policy-secondary-links">
            <Link href="/privacy-policy" className="policy-text-link">
              Privacy Policy →
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
