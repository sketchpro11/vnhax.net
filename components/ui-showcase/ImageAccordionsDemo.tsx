'use client';

import React, { useState } from 'react';

const PANELS = [
  {
    id: 'rag',
    title: 'Local RAG Pipelines',
    subtitle: 'Vector embeddings with LangChain & Ollama',
    tag: 'Architecture',
    image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&auto=format&fit=crop&q=80',
    color: '#38bdf8',
  },
  {
    id: 'cli',
    title: 'Developer Terminal CLI',
    subtitle: 'Sub-5ms interactive command tools',
    tag: 'DevOps',
    image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=800&auto=format&fit=crop&q=80',
    color: '#4ade80',
  },
  {
    id: 'cloud',
    title: 'Edge Runtime Matrix',
    subtitle: 'Global latency comparison across platforms',
    tag: 'Infrastructure',
    image: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=800&auto=format&fit=crop&q=80',
    color: '#a78bfa',
  },
  {
    id: 'ui',
    title: 'Zero-Runtime Design System',
    subtitle: 'Pure CSS custom properties & HTML5 semantics',
    tag: 'Frontend',
    image: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?w=800&auto=format&fit=crop&q=80',
    color: '#f59e0b',
  },
];

export default function ImageAccordionsDemo() {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <div style={{ width: '100%', padding: '20px 10px' }}>
      <p style={{ textAlign: 'center', fontSize: '13px', color: '#64748b', marginBottom: '16px' }}>
        Hover or click any panel to expand its details:
      </p>

      <div
        role="region"
        aria-label="Interactive portfolio accordions"
        style={{
          display: 'flex',
          gap: '12px',
          height: '380px',
          maxWidth: '920px',
          margin: '0 auto',
        }}
      >
        {PANELS.map((panel, idx) => {
          const isActive = activeIndex === idx;
          return (
            <div
              key={panel.id}
              onClick={() => setActiveIndex(idx)}
              onMouseEnter={() => setActiveIndex(idx)}
              tabIndex={0}
              onKeyDown={e => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  setActiveIndex(idx);
                }
              }}
              role="button"
              aria-expanded={isActive}
              aria-label={panel.title}
              style={{
                position: 'relative',
                flex: isActive ? 3.5 : 1,
                borderRadius: '18px',
                overflow: 'hidden',
                cursor: 'pointer',
                transition: 'flex 0.45s cubic-bezier(0.16, 1, 0.3, 1), transform 0.2s ease',
                outline: 'none',
              }}
            >
              {/* Background Image */}
              <img
                src={panel.image}
                alt={panel.title}
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  transform: isActive ? 'scale(1.04)' : 'scale(1)',
                  transition: 'transform 0.6s ease',
                }}
                loading="lazy"
              />

              {/* Gradient Dark Overlay */}
              <div
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  background: 'linear-gradient(180deg, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0.85) 100%)',
                }}
              />

              {/* Text Content */}
              <div
                style={{
                  position: 'absolute',
                  bottom: '20px',
                  left: '20px',
                  right: '20px',
                  color: '#ffffff',
                  zIndex: 2,
                }}
              >
                <span
                  style={{
                    display: 'inline-block',
                    fontSize: '10.5px',
                    fontWeight: 700,
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em',
                    background: 'rgba(255,255,255,0.2)',
                    backdropFilter: 'blur(8px)',
                    padding: '3px 9px',
                    borderRadius: '99px',
                    marginBottom: '8px',
                    color: '#ffffff',
                  }}
                >
                  {panel.tag}
                </span>

                <h3
                  style={{
                    fontSize: isActive ? '19px' : '15px',
                    fontWeight: 700,
                    margin: '0 0 4px',
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    transition: 'font-size 0.3s ease',
                  }}
                >
                  {panel.title}
                </h3>

                {isActive && (
                  <p
                    style={{
                      fontSize: '12.5px',
                      color: '#cbd5e1',
                      margin: '4px 0 0',
                      lineHeight: 1.4,
                      animation: 'accordionFade 0.3s ease forwards',
                    }}
                  >
                    {panel.subtitle}
                  </p>
                )}
              </div>
            </div>
          );
        })}
      </div>

      <style jsx>{`
        @keyframes accordionFade {
          from { opacity: 0; transform: translateY(6px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}
