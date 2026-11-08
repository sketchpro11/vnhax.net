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
    url: '/repos',
    tags: ['github', 'open source', 'repos', 'code'],
  },
  {
    id: 'hub-ui-components',
    title: 'UI Components Library',
    category: 'Hub',
    description: 'React UI component patterns with live previews and copy-paste code.',
    url: '/ui-components',
    tags: ['ui', 'components', 'css', 'design system', 'buttons', 'cards'],
  },
  // UI Components
  {
    id: 'comp-tweet-card',
    title: 'Tweet Card Component',
    category: 'UI Component',
    description: 'Social post card for testimonials, with a verified badge, engagement counts, media embed and light or dark themes.',
    url: '/ui-components/tweet-card',
    tags: ['tweet', 'card', 'ui', 'react', 'component'],
  },
  {
    id: 'comp-bento-grid',
    title: 'Bento Grid Component',
    category: 'UI Component',
    description: 'Asymmetric feature showcase grid with ambient radial spotlight, badge headers, and interactive hover states.',
    url: '/ui-components/bento-grid',
    tags: ['bento', 'grid', 'ui', 'react', 'component'],
  },
  {
    id: 'comp-animated-list',
    title: 'Animated List Component',
    category: 'UI Component',
    description: 'Dynamic notification and activity feed with staggered entrance transitions, auto-flow, and pause controls.',
    url: '/ui-components/animated-list',
    tags: ['animated', 'list', 'ui', 'react', 'component'],
  },
  {
    id: 'comp-dock',
    title: 'Interactive Dock Component',
    category: 'UI Component',
    description: 'macOS-inspired floating navigation bar with proximity-based icon magnification and dark glassmorphism.',
    url: '/ui-components/dock',
    tags: ['dock', 'ui', 'react', 'component'],
  },
  {
    id: 'comp-sparkles-title',
    title: 'Sparkles Title Component',
    category: 'UI Component',
    description: 'Hero headline with shimmering canvas sparkle particles floating across gradient typography.',
    url: '/ui-components/sparkles-title',
    tags: ['sparkles', 'title', 'ui', 'react', 'component'],
  },
  {
    id: 'comp-sparkles',
    title: 'Sparkles Effect Component',
    category: 'UI Component',
    description: 'Interactive HTML5 Canvas particle background with twinkling stars, cursor attraction, and customizable density.',
    url: '/ui-components/sparkles',
    tags: ['sparkles', 'ui', 'react', 'component'],
  },
  {
    id: 'comp-image-accordions',
    title: 'Image Accordions Component',
    category: 'UI Component',
    description: 'Interactive multi-panel gallery with smooth flex expansion, title overlays, and active card state.',
    url: '/ui-components/image-accordions',
    tags: ['image', 'accordions', 'ui', 'react', 'component'],
  },
  {
    id: 'comp-pricing-table',
    title: 'Modern Pricing Table Component',
    category: 'UI Component',
    description: 'SaaS pricing table with annual discount toggle, featured tier spotlight, and feature checklist.',
    url: '/ui-components/pricing-table',
    tags: ['pricing', 'table', 'ui', 'react', 'component'],
  },
  {
    id: 'comp-hero-section',
    title: 'Futuristic Hero Section Component',
    category: 'UI Component',
    description: 'SaaS landing page hero block with glowing announcement pill, gradient headline, dual CTAs, and interactive preview.',
    url: '/ui-components/hero-section',
    tags: ['hero', 'section', 'ui', 'react', 'component'],
  },
  {
    id: 'comp-marquee',
    title: 'Infinite Marquee Component',
    category: 'UI Component',
    description: 'Seamless scrolling strip for logos, tools or testimonials, built with pure CSS, pause on hover and reduced-motion support.',
    url: '/ui-components/marquee',
    tags: ['marquee', 'ui', 'react', 'component'],
  },
  {
    id: 'comp-number-ticker',
    title: 'Number Ticker Component',
    category: 'UI Component',
    description: 'Animated count-up for stats and KPIs that starts when visible, keeps width stable and reads the final value to screen readers.',
    url: '/ui-components/number-ticker',
    tags: ['number', 'ticker', 'ui', 'react', 'component'],
  },
  // Open-source repository reviews
  {
    id: 'repo-ponytail',
    title: 'Ponytail',
    category: 'Repository',
    description: 'A skill for Claude Code, Codex and other coding agents that makes them write only the code a task needs.',
    url: '/repos/ponytail',
    tags: ['ponytail', 'ai-agents', 'claude-code', 'codex', 'yagni', 'code-review', 'prompt-engineering'],
  },
  {
    id: 'repo-impeccable',
    title: 'Impeccable',
    category: 'Repository',
    description: 'A design vocabulary for coding agents.',
    url: '/repos/impeccable',
    tags: ['impeccable', 'design', 'frontend', 'ai-agents', 'claude-code', 'accessibility', 'ui-review'],
  },
  {
    id: 'repo-ecc',
    title: 'ECC (Everything Claude Code)',
    category: 'Repository',
    description: 'An open-source engineering system for coding agents.',
    url: '/repos/ecc',
    tags: ['ecc', 'claude-code', 'agents', 'skills', 'hooks', 'tdd', 'security'],
  },
  {
    id: 'repo-effect',
    title: 'Effect',
    category: 'Repository',
    description: 'A TypeScript library for building robust, type-safe applications, with typed errors, dependency injection, structured concurrency, scheduling and…',
    url: '/repos/effect',
    tags: ['effect', 'typescript', 'functional-programming', 'concurrency', 'typed-errors', 'dependency-injection', 'lts'],
  },
  {
    id: 'repo-caveman',
    title: 'Caveman',
    category: 'Repository',
    description: 'A toolkit that makes AI coding agents say less and read less.',
    url: '/repos/caveman',
    tags: ['caveman', 'token-optimization', 'claude-code', 'codex', 'ai-agents', 'cli', 'developer-tools'],
  },
  {
    id: 'repo-agent-reach',
    title: 'Agent-Reach',
    category: 'Repository',
    description: 'A read-only tool that lets AI agents search and read platforms they normally cannot reach, such as YouTube transcripts, Reddit, X, Bilibili…',
    url: '/repos/agent-reach',
    tags: ['agent-reach', 'ai-agents', 'web-search', 'youtube', 'reddit', 'bilibili', 'cli'],
  },
  {
    id: 'repo-voicestudio',
    title: 'VoiceStudio',
    category: 'Repository',
    description: 'An open-source, local-first desktop app for voice cloning, voice design, video dubbing, dictation, transcription and audiobook creation, with a local…',
    url: '/repos/voicestudio',
    tags: ['voicestudio', 'voice-cloning', 'text-to-speech', 'dubbing', 'transcription', 'local-first', 'elevenlabs-alternative'],
  },
  {
    id: 'repo-ai-job-search',
    title: 'AI Job Search',
    category: 'Repository',
    description: 'A Claude Code framework that evaluates job postings against your profile, drafts a tailored LaTeX CV and cover letter, has a second agent review…',
    url: '/repos/ai-job-search',
    tags: ['ai-job-search', 'claude-code', 'ai-agents', 'job-search', 'resume', 'cover-letter', 'latex'],
  },
  {
    id: 'repo-claude-plugins-official',
    title: 'Claude Plugins Official',
    category: 'Repository',
    description: 'Anthropic\'s official, curated directory of Claude Code plugins.',
    url: '/repos/claude-plugins-official',
    tags: ['claude-plugins-official', 'claude-code', 'plugins', 'mcp', 'skills', 'marketplace', 'anthropic'],
  },
  {
    id: 'repo-t3code',
    title: 'T3 Code',
    category: 'Repository',
    description: 'An open-source control surface for the coding agents already on your machine (Claude Code, Codex, Cursor, Grok Build, OpenCode, Antigravity and fx)…',
    url: '/repos/t3code',
    tags: ['t3code', 'coding-agents', 'claude-code', 'codex', 'remote-development', 'electron', 'mobile'],
  },
  {
    id: 'repo-claude-mem',
    title: 'Claude-Mem',
    category: 'Repository',
    description: 'A persistent memory plugin for Claude Code and other coding agents.',
    url: '/repos/claude-mem',
    tags: ['claude-mem', 'claude-code', 'ai-memory', 'long-term-memory', 'mcp', 'sqlite', 'chromadb'],
  },
  {
    id: 'repo-lightpanda',
    title: 'Lightpanda',
    category: 'Repository',
    description: 'A headless browser written from scratch in Zig for AI agents and automation.',
    url: '/repos/lightpanda',
    tags: ['lightpanda', 'headless-browser', 'zig', 'cdp', 'playwright', 'puppeteer', 'mcp'],
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
    id: 'hub-blog',
    title: 'Articles & Engineering Guides',
    category: 'Hub',
    description: 'Explainers and developer guides based on official sources.',
    url: '/blog',
    tags: ['blog', 'articles', 'guides', 'tutorials', 'news'],
  },
  {
    id: 'hub-about',
    title: 'About VNHAX',
    category: 'Legal',
    description: 'Who runs VNHAX, how articles are researched, and how to send corrections.',
    url: '/about',
    tags: ['about', 'author', 'mission', 'editorial'],
  },
  {
    id: 'hub-contact',
    title: 'Contact Us',
    category: 'Legal',
    description: 'Corrections, feedback, repository suggestions, privacy requests and copyright notices.',
    url: '/contact',
    tags: ['contact', 'email', 'support', 'corrections'],
  },
  {
    id: 'hub-privacy',
    title: 'Privacy Policy & Cookies',
    category: 'Legal',
    description: 'How cookies, analytics, advertising and contact messages are handled, and your privacy rights.',
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
