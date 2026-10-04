'use client';

import React, { useState } from 'react';
import TweetCardDemo from './ui-showcase/TweetCardDemo';
import BentoGridDemo from './ui-showcase/BentoGridDemo';
import AnimatedListDemo from './ui-showcase/AnimatedListDemo';
import DockDemo from './ui-showcase/DockDemo';
import SparklesTitleDemo from './ui-showcase/SparklesTitleDemo';
import SparklesFieldDemo from './ui-showcase/SparklesFieldDemo';
import ImageAccordionsDemo from './ui-showcase/ImageAccordionsDemo';
import PricingTableDemo from './ui-showcase/PricingTableDemo';
import HeroSectionDemo from './ui-showcase/HeroSectionDemo';

interface ComponentPreviewSandboxProps {
  slug: string;
  codeReact: string;
}

export default function ComponentPreviewSandbox({ slug, codeReact }: ComponentPreviewSandboxProps) {
  const [viewport, setViewport] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [copied, setCopied] = useState(false);

  const copyCode = () => {
    navigator.clipboard.writeText(codeReact);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const renderComponent = () => {
    switch (slug) {
      case 'tweet-card':
        return <TweetCardDemo />;
      case 'bento-grid':
        return <BentoGridDemo />;
      case 'animated-list':
        return <AnimatedListDemo />;
      case 'dock':
        return <DockDemo />;
      case 'sparkles-title':
        return <SparklesTitleDemo />;
      case 'sparkles':
        return <SparklesFieldDemo />;
      case 'image-accordions':
        return <ImageAccordionsDemo />;
      case 'pricing-table':
        return <PricingTableDemo />;
      case 'hero-section':
        return <HeroSectionDemo />;
      default:
        return (
          <div style={{ padding: '40px', textAlign: 'center', color: '#64748b' }}>
            Component preview loaded.
          </div>
        );
    }
  };

  const getViewportWidth = () => {
    switch (viewport) {
      case 'mobile':
        return '375px';
      case 'tablet':
        return '768px';
      case 'desktop':
      default:
        return '100%';
    }
  };

  return (
    <div
      style={{
        border: '1px solid #e2e8f0',
        borderRadius: '16px',
        overflow: 'hidden',
        background: '#ffffff',
        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.04)',
      }}
    >
      {/* Top Toolbar */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '10px 16px',
          background: '#f8fafc',
          borderBottom: '1px solid #e2e8f0',
          flexWrap: 'wrap',
          gap: '8px',
        }}
      >
        {/* Device Viewport Toggle */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '4px', background: '#e2e8f0', padding: '3px', borderRadius: '8px' }}>
          <button
            type="button"
            onClick={() => setViewport('desktop')}
            style={{
              background: viewport === 'desktop' ? '#ffffff' : 'none',
              border: 'none',
              padding: '4px 10px',
              borderRadius: '6px',
              fontSize: '11.5px',
              fontWeight: 600,
              color: viewport === 'desktop' ? '#0f172a' : '#64748b',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '4px',
              boxShadow: viewport === 'desktop' ? '0 1px 3px rgba(0,0,0,0.06)' : 'none',
            }}
          >
            🖥️ Desktop
          </button>
          <button
            type="button"
            onClick={() => setViewport('tablet')}
            style={{
              background: viewport === 'tablet' ? '#ffffff' : 'none',
              border: 'none',
              padding: '4px 10px',
              borderRadius: '6px',
              fontSize: '11.5px',
              fontWeight: 600,
              color: viewport === 'tablet' ? '#0f172a' : '#64748b',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '4px',
              boxShadow: viewport === 'tablet' ? '0 1px 3px rgba(0,0,0,0.06)' : 'none',
            }}
          >
            📱 Tablet (768px)
          </button>
          <button
            type="button"
            onClick={() => setViewport('mobile')}
            style={{
              background: viewport === 'mobile' ? '#ffffff' : 'none',
              border: 'none',
              padding: '4px 10px',
              borderRadius: '6px',
              fontSize: '11.5px',
              fontWeight: 600,
              color: viewport === 'mobile' ? '#0f172a' : '#64748b',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '4px',
              boxShadow: viewport === 'mobile' ? '0 1px 3px rgba(0,0,0,0.06)' : 'none',
            }}
          >
            📲 Mobile (375px)
          </button>
        </div>

        {/* Surface Theme & Actions */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <button
            type="button"
            onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
            style={{
              background: '#ffffff',
              border: '1px solid #cbd5e1',
              borderRadius: '6px',
              padding: '4px 10px',
              fontSize: '12px',
              color: '#334155',
              cursor: 'pointer',
              fontWeight: 500,
            }}
            title="Toggle preview theme"
          >
            {theme === 'light' ? '🌙 Dark Canvas' : '☀️ Light Canvas'}
          </button>

          <button
            type="button"
            onClick={copyCode}
            style={{
              background: '#0f172a',
              color: '#ffffff',
              border: 'none',
              borderRadius: '6px',
              padding: '4px 12px',
              fontSize: '12px',
              cursor: 'pointer',
              fontWeight: 600,
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
            }}
          >
            {copied ? '✓ Copied TSX' : '📋 Copy TSX'}
          </button>
        </div>
      </div>

      {/* Interactive Sandbox Container */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: '440px',
          background: theme === 'dark' ? '#090d16' : '#f8fafc',
          padding: '24px 12px',
          transition: 'background 0.2s ease',
          overflowX: 'auto',
        }}
      >
        <div
          style={{
            width: getViewportWidth(),
            maxWidth: '100%',
            background: theme === 'dark' ? '#0f172a' : '#ffffff',
            borderRadius: viewport !== 'desktop' ? '20px' : '12px',
            border: viewport !== 'desktop' ? '3px solid #334155' : '1px solid #e2e8f0',
            boxShadow: viewport !== 'desktop' ? '0 12px 36px rgba(0,0,0,0.15)' : 'none',
            overflow: 'hidden',
            transition: 'width 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
          }}
        >
          {viewport !== 'desktop' && (
            <div
              style={{
                background: '#1e293b',
                padding: '6px',
                textAlign: 'center',
                color: '#94a3b8',
                fontSize: '10.5px',
                fontWeight: 600,
                letterSpacing: '0.04em',
                borderBottom: '1px solid #334155',
              }}
            >
              SIMULATED {viewport.toUpperCase()} VIEWPORT
            </div>
          )}
          {renderComponent()}
        </div>
      </div>
    </div>
  );
}
