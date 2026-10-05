'use client';

import { useState, useEffect, useRef, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export interface SearchItem {
  id: string;
  title: string;
  category: 'Hub' | 'Repository' | 'Article' | 'Legal' | 'UI Component';
  description: string;
  url: string;
  tags?: string[];
}

export const SEARCH_INDEX: SearchItem[] = [
  // Hubs & Core Pages
  {
    id: 'hub-ai',
    title: 'Innovation & AI Hub',
    category: 'Hub',
    description: 'Research hub for local LLMs, model architectures, and open-source AI frameworks.',
    url: '/ai',
    tags: ['ai', 'models', 'llm', 'deep learning'],
  },
  {
    id: 'hub-ai-tools',
    title: 'AI Tools & Directory',
    category: 'Hub',
    description: 'Curated directory of open-source artificial intelligence tools and engines.',
    url: '/ai/ai-tools',
    tags: ['tools', 'directory', 'catalog', 'apps'],
  },
  {
    id: 'hub-dev-resources',
    title: 'Developer Resources Hub',
    category: 'Hub',
    description: 'Essential open-source libraries, CLI runtimes, and engineering workflows.',
    url: '/developer-resources',
    tags: ['developer', 'cli', 'code', 'tools'],
  },
  {
    id: 'hub-github-repos',
    title: 'GitHub Repositories Directory',
    category: 'Hub',
    description: 'Curated list of high-impact GitHub projects with architectural deep dives.',
    url: '/developer-resources/github-repos',
    tags: ['github', 'open source', 'repos', 'code'],
  },
  {
    id: 'hub-ui-components',
    title: 'UI Components Library',
    category: 'Hub',
    description: 'Production-ready, accessible, modular UI component patterns and live previews.',
    url: '/ui-components',
    tags: ['ui', 'components', 'css', 'design system', 'buttons', 'cards'],
  },
  {
    id: 'hub-ui-starter',
    title: 'UI Component Page Starter',
    category: 'Hub',
    description: 'Clean starter blueprint and template for designing accessible UI components.',
    url: '/ui-components/component-page-starter',
    tags: ['template', 'blueprint', 'starter', 'ui'],
  },
  // UI Components
  {
    id: 'comp-tweet-card',
    title: 'Tweet Card Component',
    category: 'UI Component',
    description: 'Verified social testimonial card with live engagement metrics, like counters, and media embed.',
    url: '/ui-components/tweet-card',
    tags: ['tweet', 'card', 'social', 'testimonial', 'magicui', 'twitter'],
  },
  {
    id: 'comp-bento-grid',
    title: 'Bento Grid Component',
    category: 'UI Component',
    description: 'Asymmetric feature showcase grid with ambient radial cursor spotlight and responsive tile spans.',
    url: '/ui-components/bento-grid',
    tags: ['bento', 'grid', 'spotlight', 'layout', 'magicui', 'apple'],
  },
  {
    id: 'comp-animated-list',
    title: 'Animated List Component',
    category: 'UI Component',
    description: 'Dynamic real-time activity stream and notification feed with staggered spring transitions.',
    url: '/ui-components/animated-list',
    tags: ['animated', 'list', 'notification', 'stream', 'feed', 'magicui'],
  },
  {
    id: 'comp-dock',
    title: 'Interactive Dock Component',
    category: 'UI Component',
    description: 'macOS-inspired floating navigation dock with cursor proximity icon magnification and glassmorphism.',
    url: '/ui-components/dock',
    tags: ['dock', 'macos', 'magnification', 'navigation', 'glassmorphism', 'magicui'],
  },
  {
    id: 'comp-sparkles-title',
    title: 'Sparkles Title Component',
    category: 'UI Component',
    description: 'Hero headline with shimmering canvas sparkle particles floating across gradient typography.',
    url: '/ui-components/sparkles-title',
    tags: ['sparkles', 'title', 'headline', 'gradient', 'canvas', 'typography'],
  },
  {
    id: 'comp-sparkles',
    title: 'Sparkles Effect Component',
    category: 'UI Component',
    description: 'Interactive HTML5 Canvas particle background with twinkling stars and mouse repulsion.',
    url: '/ui-components/sparkles',
    tags: ['sparkles', 'effect', 'canvas', 'background', 'particles'],
  },
  {
    id: 'comp-image-accordions',
    title: 'Image Accordions Component',
    category: 'UI Component',
    description: 'Interactive multi-panel image gallery with smooth flex expansion and metadata overlays.',
    url: '/ui-components/image-accordions',
    tags: ['accordion', 'image', 'gallery', 'flex', 'cards', 'ui-layouts'],
  },
  {
    id: 'comp-pricing-table',
    title: 'Modern Pricing Table Component',
    category: 'UI Component',
    description: 'Conversion-optimized SaaS pricing matrix with annual discount toggle and featured tier highlight.',
    url: '/ui-components/pricing-table',
    tags: ['pricing', 'table', 'tier', 'subscription', 'annual', 'monthly', 'matrix'],
  },
  {
    id: 'comp-hero-section',
    title: 'Futuristic Hero Section Component',
    category: 'UI Component',
    description: 'Turnkey landing page hero block with announcement pill, gradient headline, and dual CTAs.',
    url: '/ui-components/hero-section',
    tags: ['hero', 'section', 'landing', 'header', 'marketing', 'cta'],
  },
  // Trending GitHub Repositories
  {
    id: 'repo-ponytail',
    title: 'Ponytail — Anti-Bloat Harness for AI Agents',
    category: 'Repository',
    description: 'Enforces YAGNI and native APIs to stop AI coding agents from over-engineering code.',
    url: '/repos/ponytail',
    tags: ['ponytail', 'yagni', 'ai agents', 'bloat', 'tokens', 'claude code'],
  },
  {
    id: 'repo-impeccable',
    title: 'Impeccable — Frontend Design System for AI Agents',
    category: 'Repository',
    description: '24 design commands and 61 deterministic quality detectors for auditing AI-generated UI.',
    url: '/repos/impeccable',
    tags: ['impeccable', 'design system', 'ui', 'frontend', 'audit', 'accessibility'],
  },
  {
    id: 'repo-ecc',
    title: 'ECC (Everything Claude Code)',
    category: 'Repository',
    description: 'Agent-harness optimization system with 68 persona agents, 293 skills, and persistent memory.',
    url: '/repos/ecc',
    tags: ['ecc', 'claude code', 'skills', 'agents', 'tdd', 'security'],
  },
  {
    id: 'repo-effect',
    title: 'Effect — Production TypeScript Runtime',
    category: 'Repository',
    description: 'Typed errors, structured concurrency, dependency injection, and Effect 4.x LTS.',
    url: '/repos/effect',
    tags: ['effect', 'typescript', 'concurrency', 'fibers', 'typed errors'],
  },
  {
    id: 'repo-caveman',
    title: 'Caveman — Token Usage & Prose Compressor',
    category: 'Repository',
    description: 'Go proxy stripping conversational fluff from AI coding agents to slash token usage by 30-45%.',
    url: '/repos/caveman',
    tags: ['caveman', 'tokens', 'proxy', 'compressor', 'go', 'llm'],
  },
  {
    id: 'repo-agent-reach',
    title: 'Agent-Reach — Multi-Platform Agent Access',
    category: 'Repository',
    description: 'Direct zero-API-fee internet access across 13+ social & web platforms for AI agents with smart failover.',
    url: '/repos/agent-reach',
    tags: ['agent-reach', 'social', 'twitter', 'reddit', 'youtube', 'bilibili', 'xiaohongshu', 'mcp', 'scraping'],
  },
  {
    id: 'hub-tech',
    title: 'Tech Platforms & Infrastructure',
    category: 'Hub',
    description: 'Modern platforms, cloud inference infrastructure, and engineering trends in 2026.',
    url: '/technology',
    tags: ['technology', 'cloud', 'platforms', 'infrastructure'],
  },
  {
    id: 'hub-tech-platforms',
    title: 'Platform Comparison Matrix',
    category: 'Hub',
    description: 'Interactive matrix comparing local inference runtimes, hardware, and APIs.',
    url: '/technology/platforms',
    tags: ['matrix', 'comparison', 'inference', 'hardware'],
  },
  {
    id: 'hub-blog',
    title: 'Articles & Engineering Guides',
    category: 'Hub',
    description: 'Technical analysis, architectural teardowns, and hands-on developer guides.',
    url: '/blog',
    tags: ['blog', 'articles', 'guides', 'tutorials', 'news'],
  },
  {
    id: 'hub-about',
    title: 'About VNHAX',
    category: 'Legal',
    description: 'Mission statement, editorial background, and the engineering team behind VNHAX.',
    url: '/about',
    tags: ['about', 'team', 'mission', 'company'],
  },
  {
    id: 'hub-contact',
    title: 'Contact Us & Newsletter',
    category: 'Legal',
    description: 'Inquiries, technical feedback, newsletter subscriptions, and editorial requests.',
    url: '/contact',
    tags: ['contact', 'email', 'support', 'newsletter'],
  },
  {
    id: 'hub-privacy',
    title: 'Privacy Policy & Cookies',
    category: 'Legal',
    description: 'Complete GDPR, cookie management, advertising compliance, and data policies.',
    url: '/privacy-policy',
    tags: ['privacy', 'cookies', 'gdpr', 'policy', 'adsense'],
  },
  {
    id: 'hub-terms',
    title: 'Terms of Service & Disclaimer',
    category: 'Legal',
    description: 'Website usage terms, code license disclaimers, and intellectual property.',
    url: '/terms',
    tags: ['terms', 'disclaimer', 'license', 'legal'],
  },
];

interface GlobalSearchProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function GlobalSearch({ isOpen, onClose }: GlobalSearchProps) {
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  // Focus input when opened
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
      setQuery('');
      setSelectedIndex(0);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  // Global hotkey Ctrl+K / Cmd+K handled here
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape' && isOpen) {
        e.preventDefault();
        onClose();
      }
    }
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  // Filtered results
  const filteredResults = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) {
      // Default suggestions when no query
      return SEARCH_INDEX.slice(0, 8);
    }
    return SEARCH_INDEX.filter((item) => {
      const matchTitle = item.title.toLowerCase().includes(q);
      const matchDesc = item.description.toLowerCase().includes(q);
      const matchCategory = item.category.toLowerCase().includes(q);
      const matchTags = item.tags?.some((t) => t.toLowerCase().includes(q));
      return matchTitle || matchDesc || matchCategory || matchTags;
    });
  }, [query]);

  // Reset selected index when results change
  useEffect(() => {
    setSelectedIndex(0);
  }, [filteredResults]);

  function handleSelect(item: SearchItem) {
    onClose();
    router.push(item.url);
  }

  function handleInputKeyDown(e: React.KeyboardEvent) {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev < filteredResults.length - 1 ? prev + 1 : 0));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev > 0 ? prev - 1 : filteredResults.length - 1));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (filteredResults[selectedIndex]) {
        handleSelect(filteredResults[selectedIndex]);
      }
    }
  }

  if (!isOpen) return null;

  return (
    <div
      className="search-modal-backdrop"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label="Site Search"
    >
      <div
        className="search-modal-container"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="search-modal-header">
          <div className="search-input-wrapper">
            <svg
              className="search-input-icon"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
            <input
              ref={inputRef}
              type="text"
              className="search-modal-input"
              placeholder="Search guides, AI models, repositories, UI components..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={handleInputKeyDown}
              aria-autocomplete="list"
              aria-controls="search-results-list"
            />
            {query && (
              <button
                type="button"
                className="search-clear-btn"
                onClick={() => setQuery('')}
                aria-label="Clear search input"
              >
                ✕
              </button>
            )}
          </div>
          <button
            type="button"
            className="search-close-btn"
            onClick={onClose}
            aria-label="Close search"
          >
            Esc
          </button>
        </div>

        {/* Quick Suggestion Chips */}
        {!query && (
          <div className="search-quick-tags">
            <span className="quick-tags-label">Popular Searches:</span>
            {['Ollama', 'llama.cpp', 'ComfyUI', 'LangChain', 'UI Components', 'Privacy Policy'].map(
              (term) => (
                <button
                  key={term}
                  type="button"
                  className="quick-tag-chip"
                  onClick={() => setQuery(term)}
                >
                  {term}
                </button>
              )
            )}
          </div>
        )}

        <div className="search-modal-body" id="search-results-list">
          {filteredResults.length === 0 ? (
            <div className="search-no-results">
              <span className="no-results-icon" aria-hidden="true">🔍</span>
              <p className="no-results-title">No matching results found for "{query}"</p>
              <p className="no-results-subtitle">
                Try searching for "Ollama", "GitHub", "UI Components", or check our <Link href="/blog" onClick={onClose} style={{ color: '#2563eb', textDecoration: 'underline' }}>Articles Archive</Link>.
              </p>
            </div>
          ) : (
            <ul className="search-results-list" role="listbox">
              {filteredResults.map((item, index) => {
                const isSelected = index === selectedIndex;
                return (
                  <li
                    key={item.id}
                    id={`search-item-${item.id}`}
                    role="option"
                    aria-selected={isSelected}
                    className={`search-result-item ${isSelected ? 'is-selected' : ''}`}
                    onClick={() => handleSelect(item)}
                    onMouseEnter={() => setSelectedIndex(index)}
                  >
                    <div className="result-category-badge">
                      <span className={`badge-pill badge-pill--${item.category.toLowerCase().replace(/\s+/g, '-')}`}>
                        {item.category}
                      </span>
                    </div>
                    <div className="result-content">
                      <h4 className="result-title">{item.title}</h4>
                      <p className="result-desc">{item.description}</p>
                    </div>
                    <div className="result-action" aria-hidden="true">
                      <span>Jump</span>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <line x1="5" y1="12" x2="19" y2="12" />
                        <polyline points="12 5 19 12 12 19" />
                      </svg>
                    </div>
                  </li>
                );
              })}
            </ul>
          )}
        </div>

        <div className="search-modal-footer">
          <div className="search-shortcuts">
            <span><kbd>↑</kbd> <kbd>↓</kbd> Navigate</span>
            <span><kbd>↵</kbd> Select</span>
            <span><kbd>ESC</kbd> Close</span>
          </div>
          <span className="search-footer-brand">VNHAX Quick Navigator</span>
        </div>
      </div>
    </div>
  );
}
