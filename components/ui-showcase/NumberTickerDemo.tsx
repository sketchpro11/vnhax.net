'use client';

import React, { useEffect, useRef, useState } from 'react';

const STATS = [
  { label: 'Monthly readers', value: 48250, suffix: '' },
  { label: 'Uptime this year', value: 99.98, suffix: '%', decimals: 2 },
  { label: 'Open-source stars', value: 12400, suffix: '+' },
];

export default function NumberTickerDemo() {
  const [runKey, setRunKey] = useState(0);

  return (
    <div style={{ width: '100%', padding: '24px 16px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '18px', flexWrap: 'wrap', gap: '8px' }}>
        <p style={{ fontSize: '13px', color: '#64748b', margin: 0 }}>Numbers count up once when they scroll into view. Example figures only.</p>
        <button
          type="button"
          onClick={() => setRunKey((k) => k + 1)}
          style={{ background: '#0f172a', color: '#fff', border: 'none', borderRadius: '8px', padding: '6px 12px', fontSize: '12px', fontWeight: 600, cursor: 'pointer' }}
        >
          ↻ Replay
        </button>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: '12px' }}>
        {STATS.map((s) => (
          <div key={s.label} style={{ background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '14px', padding: '18px' }}>
            <div style={{ fontSize: '30px', fontWeight: 800, color: '#0f172a', fontVariantNumeric: 'tabular-nums', letterSpacing: '-0.02em' }}>
              <NumberTicker key={runKey} value={s.value} decimals={s.decimals ?? 0} />
              {s.suffix}
            </div>
            <div style={{ fontSize: '12.5px', color: '#64748b', marginTop: '4px' }}>{s.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

function NumberTicker({ value, decimals = 0, duration = 1400 }: { value: number; decimals?: number; duration?: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [display, setDisplay] = useState(0);
  const format = (n: number) =>
    n.toLocaleString('en-US', { minimumFractionDigits: decimals, maximumFractionDigits: decimals });

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce) {
      setDisplay(value);
      return;
    }
    let frame = 0;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        observer.disconnect();
        const start = performance.now();
        const tick = (now: number) => {
          const t = Math.min((now - start) / duration, 1);
          const eased = 1 - Math.pow(1 - t, 3);
          setDisplay(value * eased);
          if (t < 1) frame = requestAnimationFrame(tick);
        };
        frame = requestAnimationFrame(tick);
      },
      { threshold: 0.4 }
    );
    observer.observe(el);
    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
    };
  }, [value, duration]);

  return (
    <>
      <span ref={ref} aria-hidden="true">{format(display)}</span>
      <span style={{ position: 'absolute', width: 1, height: 1, overflow: 'hidden', clip: 'rect(0 0 0 0)', whiteSpace: 'nowrap' }}>{format(value)}</span>
    </>
  );
}
