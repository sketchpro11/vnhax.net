'use client';

import React, { useState, useEffect, useRef } from 'react';

interface Slide {
  id: number;
  badge: string;
  badgeColor: string;
  title: string;
  subtitle: string;
  bullets: string[];
  codeSnippet?: {
    lang: string;
    code: string;
  };
  metrics?: { label: string; value: string; note: string }[];
}

const SLIDES: Slide[] = [
  {
    id: 1,
    badge: 'Architecture Overview',
    badgeColor: '#0ea5e9',
    title: 'Architecting Local LLMs with Ollama',
    subtitle: 'Modelfiles, Context Windows & VRAM Allocation Engineering',
    bullets: [
      'Mastering persistent context window configuration across local inference engines.',
      'Understanding the KV cache lifecycle and eliminating conversational data loss.',
      'Balancing VRAM allocations between weights, context, and GPU offloading.',
    ],
    metrics: [
      { label: 'Default Context', value: '2048 / 4096', note: 'Standard Ollama Baseline' },
      { label: 'Target Context', value: '8K – 64K+', note: 'For Agents & Codebases' },
      { label: 'Optimization', value: '4-bit KV', note: '75% Memory Reduction' },
    ],
  },
  {
    id: 2,
    badge: 'The Root Problem',
    badgeColor: '#ef4444',
    title: 'The "Silent Amnesia" Foot-Gun',
    subtitle: 'Why Local Models Forget System Instructions Without Warning',
    bullets: [
      'Ollama silently truncates conversation history using a FIFO sliding window when tokens exceed num_ctx.',
      'Zero errors or terminal warnings are emitted during truncation.',
      'Initial system prompts, persona guidelines, and uploaded reference files vanish first.',
      'Crucial for multi-turn coding and agentic loops where context accumulates rapidly.',
    ],
    codeSnippet: {
      lang: 'text',
      code: `Token Stream > [ System Prompt ] ... [ Earlier Chat ] ... [ New Prompt ]
                      ▲ (Silently Dropped First When Exceeding num_ctx) ▲`,
    },
  },
  {
    id: 3,
    badge: 'Diagnostics',
    badgeColor: '#8b5cf6',
    title: 'Inspection Toolkit: Ceilings vs. Allocations',
    subtitle: 'Auditing Architectural Limits and Active VRAM Offload',
    bullets: [
      'Architectural Limit: The physical ceiling supported by model weights (e.g. 40k or 128k).',
      'Session Context: The active memory buffer currently instantiated in your GPU.',
      'CPU Offloading: If VRAM runs out, layers drop to system RAM, drastically reducing tokens/sec.',
    ],
    codeSnippet: {
      lang: 'bash',
      code: `# 1. Inspect architectural ceiling:\nollama show llama3.2 --modelfile\n\n# 2. Inspect active runtime VRAM split & context:\nollama ps`,
    },
  },
  {
    id: 4,
    badge: 'Permanent Solution',
    badgeColor: '#10b981',
    title: 'Modelfile Blueprint & Custom Compiles',
    subtitle: 'Eliminating Ephemeral CLI Sessions with ollama create',
    bullets: [
      'Interactive CLI commands (/set parameter num_ctx) expire as soon as the model unloads.',
      'Modelfiles serve as immutable blueprints compiled directly into the local model manifest.',
      'Compilation is instantaneous—it wraps existing weights without redownloading gigabytes.',
    ],
    codeSnippet: {
      lang: 'dockerfile',
      code: `# Modelfile.custom\nFROM llama3.2\nPARAMETER num_ctx 8192\nSYSTEM "You are a senior systems engineer."\n\n# Terminal Compilation Command:\nollama create llama3.2-8k -f Modelfile.custom`,
    },
  },
  {
    id: 5,
    badge: 'Hardware Scaling',
    badgeColor: '#f59e0b',
    title: 'Hardware Allocations & VRAM Safety Matrix',
    subtitle: 'Preventing System Freezes and Out-Of-Memory Crashes',
    bullets: [
      'Ollama pre-allocates memory for the full context window up front upon model load.',
      'Memory consumption grows non-linearly due to multi-head self-attention KV cache storage.',
      'Align your context length with physical hardware capacity to avoid OOM swap thrashing.',
    ],
    metrics: [
      { label: '8 GB RAM/VRAM', value: 'Max 4,096 tokens', note: 'Standard consumer laptops' },
      { label: '16 GB RAM/VRAM', value: 'Comfortable 8,192 tokens', note: 'Mid-range developer rigs' },
      { label: '32 GB+ RAM/VRAM', value: '16,384 – 64,000+ tokens', note: 'Workstations & Unified Memory' },
    ],
  },
  {
    id: 6,
    badge: 'Deep Optimization',
    badgeColor: '#06b6d4',
    title: '4-Bit KV Cache Quantization',
    subtitle: 'Quadrupling Context Without Hardware Upgrades',
    bullets: [
      'Normally, the KV cache stores keys and values in 16-bit floating point precision (f16).',
      'OLLAMA_KV_CACHE_TYPE=q4_0 compresses the KV cache down to 4-bit integer representation.',
      'Shrinks KV cache VRAM footprint by ~75% with virtually indistinguishable perplexity difference.',
    ],
    codeSnippet: {
      lang: 'bash',
      code: `# Launch Ollama daemon with 4-bit KV Cache enabled:\nOLLAMA_KV_CACHE_TYPE=q4_0 ollama serve\n\n# Verification in logs:\n# "kv_cache_type = q4_0, memory_saved = ~75%"`,
    },
  },
  {
    id: 7,
    badge: 'API & Orchestration',
    badgeColor: '#ec4899',
    title: 'Dynamic Overrides & API Integration',
    subtitle: 'Programmatic Context Control for Dev Tools & Agents',
    bullets: [
      'Temporary CLI session: /set parameter num_ctx 8192 (optional /save to persist).',
      'Global server environment override: OLLAMA_CONTEXT_LENGTH=8192 ollama serve.',
      'REST API Integration: Pass num_ctx dynamically in the options JSON payload.',
    ],
    codeSnippet: {
      lang: 'json',
      code: `POST /api/generate\n{\n  "model": "llama3.2",\n  "prompt": "Analyze this entire repo codebase...",\n  "options": {\n    "num_ctx": 16384,\n    "temperature": 0.2\n  }\n}`,
    },
  },
  {
    id: 8,
    badge: 'Summary & Takeaways',
    badgeColor: '#6366f1',
    title: 'Production Architecture Checklist',
    subtitle: 'Rules of Thumb for Reliable Local Inference',
    bullets: [
      '1. Always verify: Run ollama ps to confirm 100% GPU offload with your desired num_ctx.',
      '2. Make it permanent: Use Modelfiles instead of ad-hoc interactive session flags.',
      '3. Protect system memory: Turn on OLLAMA_KV_CACHE_TYPE=q4_0 when pushing past 16k tokens.',
      '4. Benchmark latency: Check eval_count and eval_duration to ensure tokens/sec remain acceptable.',
    ],
    metrics: [
      { label: 'Status', value: 'Production Ready', note: 'Tested across Ollama v0.3+' },
      { label: 'Safety', value: 'Zero Amnesia', note: 'Explicit Context Enforced' },
      { label: 'Tooling', value: 'Modelfile Native', note: 'Standard OCI Artifacts' },
    ],
  },
];

interface SlideDeckProps {
  notebookUrl?: string;
}

export default function SlideDeck({
  notebookUrl = 'https://notebook.google.com/notebook/e3ad31f4-066c-436d-8379-b90bb5d56345/artifact/e3d00274-b83c-4f33-85c7-6e6f8a9f1c13?utm_source=nlm_web_share&utm_medium=google_oo&utm_campaign=art_share_1&utm_content=&utm_smc=nlm_web_share_google_oo_art_share_1_',
}: SlideDeckProps) {
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const totalSlides = SLIDES.length;
  const currentSlide = SLIDES[currentSlideIndex];

  const nextSlide = () => {
    setCurrentSlideIndex((prev) => (prev + 1) % totalSlides);
  };

  const prevSlide = () => {
    setCurrentSlideIndex((prev) => (prev - 1 + totalSlides) % totalSlides);
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // only trigger if slide deck is in viewport or fullscreen
      if (e.key === 'ArrowRight') {
        nextSlide();
      } else if (e.key === 'ArrowLeft') {
        prevSlide();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Auto-play timer
  useEffect(() => {
    if (!isPlaying) return;
    const timer = setInterval(() => {
      nextSlide();
    }, 6000);
    return () => clearInterval(timer);
  }, [isPlaying, currentSlideIndex]);

  const toggleFullscreen = () => {
    if (!containerRef.current) return;

    if (!document.fullscreenElement) {
      containerRef.current.requestFullscreen().catch((err) => {
        console.error('Fullscreen error:', err);
      });
      setIsFullscreen(true);
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  };

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, []);

  return (
    <section
      ref={containerRef}
      className={`slidedeck-container ${isFullscreen ? 'slidedeck-fullscreen' : ''}`}
      aria-label="Interactive Presentation Slide Deck"
    >
      {/* Top Header Bar */}
      <div className="slidedeck-header">
        <div className="slidedeck-meta-left">
          <div className="slidedeck-indicator-badge">
            <span className="live-dot" />
            <span>Interactive Slide Deck</span>
          </div>
          <span className="slidedeck-topic">Ollama Modelfile Engineering</span>
        </div>

        <div className="slidedeck-meta-right">
          <span className="slide-counter">
            Slide <strong>{currentSlideIndex + 1}</strong> of {totalSlides}
          </span>
          {notebookUrl && (
            <a
              href={notebookUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="notebooklm-launch-btn"
              title="Open full artifact in Google NotebookLM"
            >
              <span>NotebookLM</span>
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                <polyline points="15 3 21 3 21 9" />
                <line x1="10" y1="14" x2="21" y2="3" />
              </svg>
            </a>
          )}
        </div>
      </div>

      {/* Main Slide Stage */}
      <div className="slidedeck-stage">
        <div key={currentSlide.id} className="slide-content-fade">
          <div className="slide-top-row">
            <span
              className="slide-category-pill"
              style={{
                backgroundColor: `${currentSlide.badgeColor}18`,
                color: currentSlide.badgeColor,
                borderColor: `${currentSlide.badgeColor}40`,
              }}
            >
              {currentSlide.badge}
            </span>
            <span className="slide-id-tag">SLIDE #{currentSlide.id}</span>
          </div>

          <h2 className="slide-title">{currentSlide.title}</h2>
          <p className="slide-subtitle">{currentSlide.subtitle}</p>

          <div className="slide-body-grid">
            <div className="slide-bullets-wrap">
              <ul className="slide-bullets-list">
                {currentSlide.bullets.map((bullet, idx) => (
                  <li key={idx} className="slide-bullet-item">
                    <span className="bullet-marker" style={{ backgroundColor: currentSlide.badgeColor }} />
                    <span className="bullet-text">{bullet}</span>
                  </li>
                ))}
              </ul>
            </div>

            {currentSlide.codeSnippet && (
              <div className="slide-code-card">
                <div className="slide-code-header">
                  <span className="slide-code-lang">{currentSlide.codeSnippet.lang.toUpperCase()}</span>
                  <span className="slide-code-dots">
                    <span />
                    <span />
                    <span />
                  </span>
                </div>
                <pre className="slide-code-block">
                  <code>{currentSlide.codeSnippet.code}</code>
                </pre>
              </div>
            )}

            {currentSlide.metrics && (
              <div className="slide-metrics-grid">
                {currentSlide.metrics.map((m, idx) => (
                  <div key={idx} className="slide-metric-card">
                    <span className="metric-label">{m.label}</span>
                    <span className="metric-value" style={{ color: currentSlide.badgeColor }}>
                      {m.value}
                    </span>
                    <span className="metric-note">{m.note}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Bottom Controls Bar */}
      <div className="slidedeck-controls">
        <div className="controls-left">
          <button
            type="button"
            onClick={prevSlide}
            className="deck-nav-btn"
            aria-label="Previous slide"
            title="Previous (Left arrow)"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <polyline points="15 18 9 12 15 6" />
            </svg>
            <span>Prev</span>
          </button>

          <button
            type="button"
            onClick={nextSlide}
            className="deck-nav-btn primary"
            aria-label="Next slide"
            title="Next (Right arrow)"
          >
            <span>Next</span>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </button>

          <button
            type="button"
            onClick={() => setIsPlaying(!isPlaying)}
            className={`deck-tool-btn ${isPlaying ? 'active' : ''}`}
            title={isPlaying ? 'Pause slideshow' : 'Play slideshow (auto-advance every 6s)'}
          >
            {isPlaying ? (
              <>
                <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
                  <rect x="6" y="4" width="4" height="16" />
                  <rect x="14" y="4" width="4" height="16" />
                </svg>
                <span>Pause</span>
              </>
            ) : (
              <>
                <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
                  <polygon points="5 3 19 12 5 21 5 3" />
                </svg>
                <span>Auto</span>
              </>
            )}
          </button>
        </div>

        {/* Slide Progress Dots */}
        <div className="controls-dots" role="tablist" aria-label="Slide list">
          {SLIDES.map((s, idx) => (
            <button
              key={s.id}
              role="tab"
              aria-selected={idx === currentSlideIndex}
              aria-label={`Go to slide ${idx + 1}`}
              onClick={() => setCurrentSlideIndex(idx)}
              className={`deck-dot-btn ${idx === currentSlideIndex ? 'active' : ''}`}
              style={{
                backgroundColor: idx === currentSlideIndex ? currentSlide.badgeColor : undefined,
              }}
            />
          ))}
        </div>

        <div className="controls-right">
          <button
            type="button"
            onClick={toggleFullscreen}
            className="deck-tool-btn"
            title={isFullscreen ? 'Exit Fullscreen' : 'View Fullscreen'}
            aria-label={isFullscreen ? 'Exit Fullscreen' : 'View Fullscreen'}
          >
            {isFullscreen ? (
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M8 3v3a2 2 0 0 1-2 2H3m18 0h-3a2 2 0 0 1-2-2V3m0 18v-3a2 2 0 0 1 2-2h3M3 16h3a2 2 0 0 1 2 2v3" />
              </svg>
            ) : (
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3" />
              </svg>
            )}
            <span>{isFullscreen ? 'Exit' : 'Fullscreen'}</span>
          </button>
        </div>
      </div>
    </section>
  );
}
