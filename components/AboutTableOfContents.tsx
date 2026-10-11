'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';

interface SectionItem {
  id: string;
  number: string;
  title: string;
}

const SECTIONS: SectionItem[] = [
  { id: 'who-runs-vnhax', number: '01', title: 'Who Runs VNHAX' },
  { id: 'what-we-publish', number: '02', title: "What You'll Find Here" },
  { id: 'how-articles-are-made', number: '03', title: 'How Articles Are Researched' },
  { id: 'use-of-ai', number: '04', title: 'How AI Tools Are Used' },
  { id: 'corrections', number: '05', title: 'Corrections & Updates' },
  { id: 'independence', number: '06', title: 'Independence & Advertising' },
  { id: 'the-name', number: '07', title: 'About the Name' },
  { id: 'contact', number: '08', title: 'Get in Touch' },
];

export default function AboutTableOfContents() {
  const [activeId, setActiveId] = useState<string>('who-runs-vnhax');

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


        {/* Contact Editorial Desk Widget */}
        <div className="sidebar-widget policy-contact-widget">
          <div className="sidebar-widget-header">
            <span className="sidebar-kicker">Contact</span>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '6px' }}>
              <div style={{ width: '22px', height: '22px', borderRadius: '50%', overflow: 'hidden', flexShrink: 0, border: '1px solid #2563eb', background: '#0f172a' }}>
                <Image src="/icon.png" alt="VNHAX" width={22} height={22} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>
              <h3 style={{ margin: 0 }}>Questions or Corrections?</h3>
            </div>
          </div>
          <p className="policy-contact-desc">
            Spotted a mistake or have a suggestion? Email me:
          </p>
          <a href="mailto:contact@vnhax.net" className="policy-email-btn">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
              <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
              <polyline points="22,6 12,13 2,6" />
            </svg>
            <span>contact@vnhax.net</span>
          </a>
          <div className="policy-secondary-links">
            <Link href="/contact" className="policy-text-link">
              Contact Form →
            </Link>
            <Link href="/privacy-policy" className="policy-text-link">
              Privacy Policy →
            </Link>
            <Link href="/terms" className="policy-text-link">
              Terms of Service →
            </Link>
          </div>
        </div>
      </div>
    </aside>
  );
}
