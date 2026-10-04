'use client';

import { useState, useEffect, useRef, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export interface SearchItem {
  id: string;
  title: string;
  category: 'Hub' | 'Repository' | 'Article' | 'Legal';
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

  // Repositories
  {
    id: 'repo-ollama',
    title: 'Ollama — Local LLM Inference',
    category: 'Repository',
    description: 'Run Llama 3.3, DeepSeek-R1, and Mistral locally with a unified CLI and OpenAI API.',
    url: '/repos/ollama',
    tags: ['ollama', 'local llm', 'modelfile', 'cli', 'deepseek'],
  },
  {
    id: 'repo-llamacpp',
    title: 'llama.cpp — C/C++ Inference Engine',
    category: 'Repository',
    description: 'Zero-dependency C/C++ LLM runtime with GGUF quantization and GPU offloading.',
    url: '/repos/llamacpp',
    tags: ['llamacpp', 'gguf', 'c++', 'quantization', 'cuda'],
  },
  {
    id: 'repo-comfyui',
    title: 'ComfyUI — Generative Vision Node Graph',
    category: 'Repository',
    description: 'Modular visual diffusion backend supporting SDXL, Flux.1, and custom API pipelines.',
    url: '/repos/comfyui',
    tags: ['comfyui', 'diffusion', 'flux', 'sdxl', 'image generation'],
  },
  {
    id: 'repo-langchain',
    title: 'LangChain — Agent Orchestration & RAG',
    category: 'Repository',
    description: 'Framework for developing context-aware AI applications, LCEL, and LangGraph loops.',
    url: '/repos/langchain',
    tags: ['langchain', 'rag', 'agents', 'langgraph', 'vector db'],
  },
  {
    id: 'repo-cline',
    title: 'Cline — Autonomous VS Code Coding Agent',
    category: 'Repository',
    description: 'In-editor coding agent with multi-file AST edits, terminal tools, and human review.',
    url: '/repos/cline',
    tags: ['cline', 'coding agent', 'vs code', 'copilot', 'pair programming'],
  },
  {
    id: 'repo-aider',
    title: 'Aider — CLI AI Pair Programmer',
    category: 'Repository',
    description: 'Terminal AI coding assistant with Tree-Sitter repo mapping and atomic Git commits.',
    url: '/repos/aider',
    tags: ['aider', 'cli', 'git', 'coding', 'pair programming'],
  },

  // Blog Posts & Guides
  {
    id: 'article-num-ctx',
    title: 'How to Increase num_ctx in Ollama Modelfile',
    category: 'Article',
    description: 'Extend Ollama context window, prevent silent truncation, and manage KV cache VRAM.',
    url: '/blog/how-to-increase-num-ctx-in-modelfile',
    tags: ['num_ctx', 'ollama', 'modelfile', 'vram', 'context window'],
  },
  {
    id: 'article-ai-tools',
    title: 'Open-Source AI Tools and GitHub Repos Worth Evaluating',
    category: 'Article',
    description: 'Practical guide to local LLMs, retrieval engines, image generation, and coding agents.',
    url: '/blog/open-source-ai-tools-github-repos',
    tags: ['ai tools', 'github repos', 'open source', 'developer guide'],
  },
  {
    id: 'article-local-llm-comparison',
    title: 'Local LLM Deployment Guide: Ollama vs llama.cpp',
    category: 'Article',
    description: 'In-depth architectural comparison, performance benchmarks, and deployment guide.',
    url: '/blog/local-llm-guide-ollama-llama-cpp',
    tags: ['ollama vs llamacpp', 'benchmarks', 'gguf', 'local llm'],
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
                      <span className={`badge-pill badge-pill--${item.category.toLowerCase()}`}>
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
