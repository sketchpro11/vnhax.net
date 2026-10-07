'use client';

import { useState } from 'react';
import Link from 'next/link';
import type { BlogSummary } from '@/lib/blog';

interface LatestBlogsSectionProps {
  blogs: BlogSummary[];
}

export default function LatestBlogsSection({ blogs }: LatestBlogsSectionProps) {
  const [activeFilter, setActiveFilter] = useState<'all' | 'ai' | 'developer' | 'ui' | 'technology'>('all');
  const [visibleCount, setVisibleCount] = useState<number>(4);

  const handleTabChange = (tab: 'all' | 'ai' | 'developer' | 'ui' | 'technology') => {
    setActiveFilter(tab);
    setVisibleCount(4); // Reset to 4 cards when switching tabs
  };

  // Filter blogs according to active tab
  const filteredBlogs = blogs.filter((blog) => {
    if (activeFilter === 'all') return true;
    return blog.silos.includes(activeFilter);
  });

  // UI Components showcase card (shown when 'ui' tab is active)
  const showUiCard = activeFilter === 'ui';

  // Only take the first `visibleCount` blogs
  const displayedBlogs = filteredBlogs.slice(0, visibleCount);

  // Check if there are more blogs to load
  const hasMore = !showUiCard && visibleCount < filteredBlogs.length;

  const handleLoadMore = () => {
    setVisibleCount((prev) => prev + 4);
  };

  // Counts for tab badges
  const countAll = blogs.length;
  const countAi = blogs.filter((b) => b.silos.includes('ai')).length;
  const countDev = blogs.filter((b) => b.silos.includes('developer')).length;
  const countTech = blogs.filter((b) => b.silos.includes('technology')).length;

  return (
    <section className="content-section" id="editorial-silos">
      <h2 className="section-title">latest blogs</h2>
      <p className="section-subheading">
        Curated deep-dives, developer frameworks, and open-source tooling grouped by topical silo.
      </p>

      {/* Silo Navigation Tabs */}
      <div className="silo-tabs-container">
        <div className="silo-tabs" role="tablist" aria-label="Filter articles by topical silo">
          <button
            className={`silo-tab ${activeFilter === 'all' ? 'active' : ''}`}
            type="button"
            data-filter="all"
            role="tab"
            aria-selected={activeFilter === 'all'}
            onClick={() => handleTabChange('all')}
          >
            All Silos <span className="silo-tab-count">({countAll})</span>
          </button>
          <button
            className={`silo-tab ${activeFilter === 'ai' ? 'active' : ''}`}
            type="button"
            data-filter="ai"
            role="tab"
            aria-selected={activeFilter === 'ai'}
            onClick={() => handleTabChange('ai')}
          >
            AI &amp; Models <span className="silo-tab-count">({countAi})</span>
          </button>
          <button
            className={`silo-tab ${activeFilter === 'developer' ? 'active' : ''}`}
            type="button"
            data-filter="developer"
            role="tab"
            aria-selected={activeFilter === 'developer'}
            onClick={() => handleTabChange('developer')}
          >
            Dev &amp; Repos <span className="silo-tab-count">({countDev})</span>
          </button>
          <button
            className={`silo-tab ${activeFilter === 'ui' ? 'active' : ''}`}
            type="button"
            data-filter="ui"
            role="tab"
            aria-selected={activeFilter === 'ui'}
            onClick={() => handleTabChange('ui')}
          >
            UI Components <span className="silo-tab-count">(1)</span>
          </button>
          <button
            className={`silo-tab ${activeFilter === 'technology' ? 'active' : ''}`}
            type="button"
            data-filter="technology"
            role="tab"
            aria-selected={activeFilter === 'technology'}
            onClick={() => handleTabChange('technology')}
          >
            Tech &amp; News <span className="silo-tab-count">({countTech})</span>
          </button>
        </div>
      </div>

      {/* Cards Grid - strictly 4 per row on desktop */}
      <div
        className="card-grid card-grid--silos"
        style={{
          gridTemplateColumns: 'repeat(auto-fill, minmax(265px, 1fr))',
          display: 'grid',
        }}
      >
        {/* Render UI Hub Card when 'ui' active */}
        {showUiCard && (
          <Link
            className="card card--content"
            href="/ui-components"
            data-silo="ui"
            style={{ textDecoration: 'none' }}
          >
            <div className="card-meta-bar">
              <span className="silo-badge silo-badge--ui">UI Components</span>
              <span className="card-eyebrow">Design Systems</span>
            </div>
            <h3>Production-ready UI component patterns &amp; interactive templates</h3>
            <p>
              Modular interface patterns built with clean semantic HTML, modern CSS, and live interactive state previews.
            </p>
            <div
              style={{
                marginTop: 'auto',
                paddingTop: '20px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                width: '100%',
              }}
            >
              <span style={{ fontSize: '12px', color: '#475569', fontWeight: 500 }}>Component Library</span>
              <span className="card-link" style={{ marginTop: 0, paddingTop: 0 }}>
                Explore UI Hub <span aria-hidden="true">→</span>
              </span>
            </div>
          </Link>
        )}

        {/* Render visible Blog Post Cards (default 4) */}
        {displayedBlogs.map((blog) => (
          <Link
            key={blog.slug}
            className="card card--content"
            href={blog.href}
            data-silo={blog.silos.join(' ')}
            style={{ textDecoration: 'none' }}
          >
            <div className="card-meta-bar">
              <span className={`silo-badge ${blog.badgeClass}`}>{blog.category}</span>
              <span className="card-eyebrow">{blog.readTime}</span>
            </div>
            <h3>{blog.title}</h3>
            <p>{blog.description}</p>
            <div
              style={{
                marginTop: 'auto',
                paddingTop: '20px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                width: '100%',
              }}
            >
              <span style={{ fontSize: '12px', color: '#475569', fontWeight: 500 }}>{blog.formattedDate}</span>
              <span className="card-link" style={{ marginTop: 0, paddingTop: 0 }}>
                Read Guide <span aria-hidden="true">→</span>
              </span>
            </div>
          </Link>
        ))}
      </div>

      {/* Bottom Section: Load More Button & Silo Hub Navigation */}
      <div
        style={{
          marginTop: '36px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '18px',
        }}
      >
        {hasMore ? (
          <button
            type="button"
            onClick={handleLoadMore}
            className="btn btn--dark"
            style={{
              height: '44px',
              padding: '0 32px',
              fontSize: '14px',
              fontWeight: 600,
              borderRadius: '10px',
              cursor: 'pointer',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              border: 'none',
              background: '#0f172a',
              color: '#ffffff',
              boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
              transition: 'all 180ms ease',
            }}
          >
            <span>Load More Blogs</span>
            <svg
              width="15"
              height="15"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <polyline points="6 9 12 15 18 9" />
            </svg>
          </button>
        ) : (
          <Link
            href="/blog"
            className="btn btn--dark"
            style={{
              height: '42px',
              padding: '0 24px',
              fontSize: '14px',
              borderRadius: '10px',
              textDecoration: 'none',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              boxShadow: '0 2px 8px rgba(0, 0, 0, 0.08)',
            }}
          >
            <span>Browse All Guides in Blog Hub</span>
            <span aria-hidden="true">→</span>
          </Link>
        )}
      </div>
    </section>
  );
}
