'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';

interface StickyArticleBarProps {
  title: string;
  category?: string;
  slug?: string;
}

export default function StickyArticleBar({
  title,
  category = 'AI & Models',
  slug,
}: StickyArticleBarProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [readProgress, setReadProgress] = useState(0);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      const scrollY = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      
      // Calculate scroll progress percentage
      if (docHeight > 0) {
        const percent = Math.min(100, Math.max(0, Math.round((scrollY / docHeight) * 100)));
        setReadProgress((prev) => (Math.abs(prev - percent) >= 1 ? percent : prev));
      }

      // Show sticky bar once user scrolls past the main article header (~260px)
      const visible = scrollY > 260;
      setIsVisible((prev) => (prev !== visible ? visible : prev));
      ticking = false;
    };

    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(handleScroll);
        ticking = true;
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    handleScroll(); // Initial check

    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleCopy = () => {
    if (typeof window === 'undefined') return;
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const scrollToSlides = () => {
    const slideDeck = document.querySelector('.slidedeck-container');
    if (slideDeck) {
      slideDeck.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div
      className={`sticky-article-bar ${isVisible ? 'is-visible' : ''}`}
      aria-hidden={!isVisible}
    >
      {/* Top micro progress line */}
      <div
        className="sticky-progress-line"
        style={{ width: `${readProgress}%` }}
        aria-hidden="true"
      />

      <div className="sticky-bar-inner">
        {/* Left: Platform Navigation Brand & Category */}
        <div className="sticky-bar-left">
          <Link href="/" className="sticky-brand-logo" aria-label="VNHAX Home">
            vnhax
          </Link>
          <span className="sticky-sep">/</span>
          <Link href="/blog" className="sticky-category-link">
            {category}
          </Link>
        </div>

        {/* Center: Truncated Article Title */}
        <div className="sticky-bar-center" onClick={scrollToTop} title="Click to scroll to top">
          <span className="sticky-title-text">{title}</span>
        </div>

        {/* Right: Progress, Slide shortcut, Copy Link */}
        <div className="sticky-bar-right">
          <div className="sticky-progress-badge">
            <span>{readProgress}% read</span>
          </div>

          <button
            type="button"
            onClick={scrollToSlides}
            className="sticky-action-btn slides-shortcut-btn"
            title="Jump to Interactive Slide Deck"
          >
            <span className="shortcut-icon">⚡</span>
            <span>Slides</span>
          </button>

          <button
            type="button"
            onClick={handleCopy}
            className={`sticky-action-btn ${copied ? 'copied' : ''}`}
            title="Copy article link"
          >
            {copied ? (
              <>
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
                <span>Copied</span>
              </>
            ) : (
              <>
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                  <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
                </svg>
                <span>Share</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
