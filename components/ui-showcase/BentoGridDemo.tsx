'use client';

import React, { useRef, useState } from 'react';

export default function BentoGridDemo() {
  const [activeTab, setActiveTab] = useState<'latency' | 'throughput' | 'cache'>('latency');

  return (
    <div style={{ width: '100%', padding: '20px 10px' }}>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '16px',
          maxWidth: '860px',
          margin: '0 auto',
        }}
      >
        {/* Card 1: Wide Feature Card */}
        <BentoCardItem
          title="Hybrid RAG Search Engine"
          badge="High Throughput"
          description="Sub-50ms hybrid vector and lexical retrieval across enterprise document stores."
          style={{ gridColumn: 'span 2' }}
        >
          <div
            style={{
              background: '#0f172a',
              borderRadius: '12px',
              padding: '16px',
              color: '#f8fafc',
              marginTop: '14px',
            }}
          >
            <div style={{ display: 'flex', gap: '8px', marginBottom: '12px' }}>
              {(['latency', 'throughput', 'cache'] as const).map(tab => (
                <button
                  key={tab}
                  type="button"
                  onClick={() => setActiveTab(tab)}
                  style={{
                    background: activeTab === tab ? '#2563eb' : 'rgba(255,255,255,0.08)',
                    border: 'none',
                    borderRadius: '6px',
                    padding: '4px 10px',
                    fontSize: '11px',
                    fontWeight: 600,
                    color: '#ffffff',
                    cursor: 'pointer',
                    textTransform: 'capitalize',
                  }}
                >
                  {tab}
                </button>
              ))}
            </div>

            <div style={{ fontSize: '13px', fontFamily: 'monospace', color: '#38bdf8' }}>
              {activeTab === 'latency' && '> Average Vector Query Latency: 4.2ms [P99: 8.7ms]'}
              {activeTab === 'throughput' && '> Max Ingestion Throughput: 14,200 docs / second'}
              {activeTab === 'cache' && '> In-Memory Cache Hit Ratio: 94.6%'}
            </div>
          </div>
        </BentoCardItem>

        {/* Card 2: Zero-Runtime CSS */}
        <BentoCardItem
          title="0 kB Runtime JavaScript"
          badge="Core Web Vitals"
          description="Built on standard CSS custom properties without CSS-in-JS serialization overhead."
        >
          <div
            style={{
              marginTop: '16px',
              display: 'flex',
              alignItems: 'baseline',
              gap: '6px',
            }}
          >
            <span style={{ fontSize: '42px', fontWeight: 800, color: '#16a34a', letterSpacing: '-0.03em' }}>
              100
            </span>
            <span style={{ fontSize: '13px', color: '#64748b' }}>/ 100 PageSpeed</span>
          </div>
        </BentoCardItem>

        {/* Card 3: Interactive CLI Architecture */}
        <BentoCardItem
          title="Developer First CLI"
          badge="Zero Friction"
          description="Copy, paste, and run standalone components in any modern React or Next.js app."
        >
          <div
            style={{
              marginTop: '14px',
              background: '#f8fafc',
              border: '1px solid #e2e8f0',
              borderRadius: '8px',
              padding: '10px 12px',
              fontFamily: 'monospace',
              fontSize: '12px',
              color: '#0f172a',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <span>npx shadcn@latest add ...</span>
            <span style={{ color: '#2563eb', fontWeight: 600 }}>v2.5</span>
          </div>
        </BentoCardItem>
      </div>
    </div>
  );
}

function BentoCardItem({
  title,
  badge,
  description,
  children,
  style,
}: {
  title: string;
  badge: string;
  description: string;
  children?: React.ReactNode;
  style?: React.CSSProperties;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState({ x: -200, y: -200 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    setPos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      style={{
        position: 'relative',
        background: '#ffffff',
        border: '1px solid #e2e8f0',
        borderRadius: '20px',
        padding: '24px',
        overflow: 'hidden',
        boxShadow: '0 2px 10px rgba(0, 0, 0, 0.03)',
        transition: 'border-color 0.2s ease, transform 0.2s ease',
        ...style,
      }}
    >
      {/* Ambient Spotlight */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: `radial-gradient(350px circle at ${pos.x}px ${pos.y}px, rgba(37, 99, 235, 0.08), transparent 70%)`,
          pointerEvents: 'none',
        }}
      />

      <span
        style={{
          display: 'inline-block',
          fontSize: '11px',
          fontWeight: 700,
          textTransform: 'uppercase',
          letterSpacing: '0.05em',
          color: '#2563eb',
          background: '#eff6ff',
          padding: '3px 10px',
          borderRadius: '99px',
          marginBottom: '10px',
        }}
      >
        {badge}
      </span>
      <h3 style={{ fontSize: '18px', fontWeight: 700, color: '#0f172a', margin: '0 0 6px' }}>{title}</h3>
      <p style={{ fontSize: '13.5px', color: '#64748b', lineHeight: 1.5, margin: 0 }}>{description}</p>
      {children}
    </div>
  );
}
