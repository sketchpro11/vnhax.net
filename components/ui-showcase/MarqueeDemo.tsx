'use client';

import React, { useState } from 'react';

const ROW_ONE = ['Next.js', 'React', 'TypeScript', 'Tailwind CSS', 'Vercel', 'Supabase', 'Prisma', 'Vite'];
const ROW_TWO = ['Claude Code', 'Codex', 'Ollama', 'llama.cpp', 'vLLM', 'LangChain', 'Hugging Face', 'MCP'];

export default function MarqueeDemo() {
  const [paused, setPaused] = useState(false);

  return (
    <div style={{ width: '100%', padding: '24px 0', display: 'flex', flexDirection: 'column', gap: '14px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0 16px', flexWrap: 'wrap', gap: '8px' }}>
        <p style={{ fontSize: '13px', color: '#64748b', margin: 0 }}>Hover a row to pause it, or use the button. Motion stops automatically if your system asks for reduced motion.</p>
        <button
          type="button"
          onClick={() => setPaused((p) => !p)}
          aria-pressed={paused}
          style={{ background: '#0f172a', color: '#fff', border: 'none', borderRadius: '8px', padding: '6px 12px', fontSize: '12px', fontWeight: 600, cursor: 'pointer' }}
        >
          {paused ? '▶ Play' : '⏸ Pause'}
        </button>
      </div>

      <MarqueeRow items={ROW_ONE} paused={paused} />
      <MarqueeRow items={ROW_TWO} paused={paused} reverse />

      <style>{`
        @keyframes vnx-marquee { from { transform: translateX(0); } to { transform: translateX(calc(-50% - 6px)); } }
        .vnx-marquee { overflow: hidden; -webkit-mask-image: linear-gradient(90deg, transparent, #000 10%, #000 90%, transparent); mask-image: linear-gradient(90deg, transparent, #000 10%, #000 90%, transparent); }
        .vnx-marquee-track { display: flex; gap: 12px; width: max-content; animation: vnx-marquee 28s linear infinite; }
        .vnx-marquee-reverse .vnx-marquee-track { animation-direction: reverse; }
        .vnx-marquee:hover .vnx-marquee-track, .vnx-marquee-paused .vnx-marquee-track { animation-play-state: paused; }
        @media (prefers-reduced-motion: reduce) { .vnx-marquee-track { animation: none; flex-wrap: wrap; width: auto; } }
      `}</style>
    </div>
  );
}

function MarqueeRow({ items, paused, reverse = false }: { items: string[]; paused: boolean; reverse?: boolean }) {
  return (
    <div className={`vnx-marquee ${reverse ? 'vnx-marquee-reverse' : ''} ${paused ? 'vnx-marquee-paused' : ''}`} role="region" aria-label={reverse ? 'AI tools' : 'Web frameworks'}>
      <ul className="vnx-marquee-track" style={{ listStyle: 'none', margin: 0, padding: 0 }}>
        {[...items, ...items].map((name, i) => (
          <li
            key={`${name}-${i}`}
            aria-hidden={i >= items.length}
            style={{
              flexShrink: 0,
              padding: '10px 18px',
              borderRadius: '999px',
              border: '1px solid #e2e8f0',
              background: '#ffffff',
              fontSize: '13.5px',
              fontWeight: 600,
              color: '#0f172a',
              boxShadow: '0 1px 2px rgba(15, 23, 42, 0.04)',
            }}
          >
            {name}
          </li>
        ))}
      </ul>
    </div>
  );
}
