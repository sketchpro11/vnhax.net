'use client';

import React, { useState } from 'react';

export default function HeroSectionDemo() {
  const [copiedCli, setCopiedCli] = useState(false);

  const copyCommand = () => {
    navigator.clipboard.writeText('npx vnhax-ui add hero-section');
    setCopiedCli(true);
    setTimeout(() => setCopiedCli(false), 2000);
  };

  return (
    <div style={{ width: '100%', padding: '30px 10px' }}>
      <section
        style={{
          maxWidth: '860px',
          margin: '0 auto',
          textAlign: 'center',
          fontFamily: 'var(--font-body, -apple-system, sans-serif)',
        }}
      >
        {/* Announcement Pill */}
        <div style={{ display: 'inline-flex', marginBottom: '20px' }}>
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              background: '#eff6ff',
              border: '1px solid #bfdbfe',
              padding: '6px 14px',
              borderRadius: '99px',
              fontSize: '12.5px',
              fontWeight: 600,
              color: '#1d4ed8',
            }}
          >
            <span style={{ background: '#2563eb', color: '#ffffff', fontSize: '10px', padding: '2px 6px', borderRadius: '99px', textTransform: 'uppercase' }}>
              v2.5
            </span>
            <span>Zero-Dependency UI Component Engine</span>
            <span aria-hidden="true">→</span>
          </div>
        </div>

        {/* Headline */}
        <h1
          style={{
            fontFamily: 'var(--font-display, "Space Grotesk", sans-serif)',
            fontSize: 'clamp(28px, 5vw, 52px)',
            fontWeight: 800,
            lineHeight: 1.12,
            letterSpacing: '-0.03em',
            color: '#0f172a',
            margin: '0 0 16px',
          }}
        >
          High-Speed Interface Patterns for{' '}
          <span
            style={{
              backgroundImage: 'linear-gradient(135deg, #2563eb, #9333ea)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            Modern AI Developers
          </span>
        </h1>

        {/* Subtitle */}
        <p
          style={{
            fontSize: '15px',
            color: '#64748b',
            lineHeight: 1.6,
            maxWidth: '620px',
            margin: '0 auto 28px',
          }}
        >
          Accessible, production-ready React components and design systems. Copy standalone code directly into your Next.js application with zero bundle bloat.
        </p>

        {/* Dual Actions & Interactive CLI Trigger */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '12px',
            flexWrap: 'wrap',
            marginBottom: '36px',
          }}
        >
          <button
            type="button"
            style={{
              height: '44px',
              padding: '0 20px',
              background: '#0f172a',
              color: '#ffffff',
              borderRadius: '10px',
              fontSize: '13.5px',
              fontWeight: 600,
              border: 'none',
              cursor: 'pointer',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              boxShadow: '0 4px 14px rgba(15, 23, 42, 0.15)',
            }}
          >
            Explore Library <span aria-hidden="true">→</span>
          </button>

          <button
            type="button"
            onClick={copyCommand}
            style={{
              height: '44px',
              padding: '0 16px',
              background: '#f8fafc',
              border: '1px solid #cbd5e1',
              borderRadius: '10px',
              fontSize: '13px',
              color: '#334155',
              cursor: 'pointer',
              fontFamily: 'monospace',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
            }}
          >
            <span>$ {copiedCli ? 'Copied to clipboard!' : 'npx vnhax-ui add hero'}</span>
            <span style={{ fontSize: '11px', color: copiedCli ? '#16a34a' : '#64748b' }}>
              {copiedCli ? '✓' : '📋'}
            </span>
          </button>
        </div>

        {/* Metric Badges */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            gap: '24px',
            paddingTop: '24px',
            borderTop: '1px solid #e2e8f0',
            flexWrap: 'wrap',
          }}
        >
          <div>
            <div style={{ fontSize: '20px', fontWeight: 800, color: '#0f172a' }}>100%</div>
            <div style={{ fontSize: '11.5px', color: '#64748b' }}>WCAG 2.1 AA</div>
          </div>
          <div style={{ width: '1px', height: '24px', background: '#e2e8f0' }} />
          <div>
            <div style={{ fontSize: '20px', fontWeight: 800, color: '#16a34a' }}>0 kB</div>
            <div style={{ fontSize: '11.5px', color: '#64748b' }}>Runtime JS Overhead</div>
          </div>
          <div style={{ width: '1px', height: '24px', background: '#e2e8f0' }} />
          <div>
            <div style={{ fontSize: '20px', fontWeight: 800, color: '#2563eb' }}>&lt; 10ms</div>
            <div style={{ fontSize: '11.5px', color: '#64748b' }}>Paint Latency</div>
          </div>
        </div>
      </section>
    </div>
  );
}
