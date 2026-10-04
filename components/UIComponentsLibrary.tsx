'use client';

import { useState } from 'react';

interface ComponentItem {
  id: string;
  name: string;
  category: 'cards' | 'buttons' | 'code' | 'metrics' | 'nav';
  description: string;
  html: string;
  css: string;
  tsx: string;
  renderPreview: (copiedMap: Record<string, boolean>, onCopy: (key: string, text: string) => void) => React.ReactNode;
}

export default function UIComponentsLibrary() {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [activeTabs, setActiveTabs] = useState<Record<string, 'preview' | 'html' | 'css' | 'tsx'>>({
    'glass-card': 'preview',
    'code-block': 'preview',
    'pill-badges': 'preview',
    'faq-accordion': 'preview',
    'metric-card': 'preview',
    'command-bar': 'preview',
  });
  const [copiedCodes, setCopiedCodes] = useState<Record<string, boolean>>({});
  const [accordionOpen, setAccordionOpen] = useState<boolean>(true);

  const handleCopyCode = (componentId: string, codeText: string) => {
    navigator.clipboard.writeText(codeText);
    setCopiedCodes((prev) => ({ ...prev, [componentId]: true }));
    setTimeout(() => {
      setCopiedCodes((prev) => ({ ...prev, [componentId]: false }));
    }, 2000);
  };

  const setTab = (compKey: string, tab: 'preview' | 'html' | 'css' | 'tsx') => {
    setActiveTabs((prev) => ({ ...prev, [compKey]: tab }));
  };

  const components: ComponentItem[] = [
    {
      id: 'glass-card',
      name: 'Glassmorphic Feature Card',
      category: 'cards',
      description: 'Sleek content card with subtle backdrop blur, hover lift, and directional action arrow.',
      renderPreview: () => (
        <div
          style={{
            maxWidth: '380px',
            width: '100%',
            background: 'linear-gradient(145deg, #ffffff, #f8fafc)',
            border: '1px solid #e2e8f0',
            borderRadius: '16px',
            padding: '24px',
            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.04)',
            transition: 'transform 200ms ease, box-shadow 200ms ease',
            cursor: 'pointer',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateY(-3px)';
            e.currentTarget.style.boxShadow = '0 12px 30px rgba(37, 99, 235, 0.1)';
            e.currentTarget.style.borderColor = '#93c5fd';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.04)';
            e.currentTarget.style.borderColor = '#e2e8f0';
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
            <div
              style={{
                width: '40px',
                height: '40px',
                borderRadius: '10px',
                background: '#eff6ff',
                color: '#2563eb',
                display: 'grid',
                placeItems: 'center',
                fontSize: '18px',
              }}
            >
              ⚡
            </div>
            <span
              style={{
                fontSize: '11px',
                fontWeight: 700,
                color: '#1d4ed8',
                background: '#dbeafe',
                padding: '3px 8px',
                borderRadius: '999px',
                textTransform: 'uppercase',
                letterSpacing: '0.06em',
              }}
            >
              Architecture
            </span>
          </div>
          <h4 style={{ fontFamily: 'var(--font-display)', fontSize: '17px', fontWeight: 700, color: '#0f172a', margin: '0 0 8px' }}>
            Local LLM Graph Runtime
          </h4>
          <p style={{ fontSize: '13.5px', color: '#64748b', lineHeight: 1.6, margin: '0 0 16px' }}>
            Zero-latency inference execution layer with dynamic KV cache paging and multi-GPU tensor splitting.
          </p>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '13px', fontWeight: 600, color: '#2563eb' }}>
            <span>Explore Blueprint</span>
            <span>→</span>
          </div>
        </div>
      ),
      html: `<div class="feature-card">
  <div class="card-head">
    <div class="icon-wrap">⚡</div>
    <span class="badge">Architecture</span>
  </div>
  <h4>Local LLM Graph Runtime</h4>
  <p>Zero-latency inference execution layer with dynamic KV cache paging and multi-GPU tensor splitting.</p>
  <a href="/repos/ollama" class="card-cta">Explore Blueprint &rarr;</a>
</div>`,
      css: `.feature-card {
  max-width: 380px;
  background: linear-gradient(145deg, #ffffff, #f8fafc);
  border: 1px solid #e2e8f0;
  border-radius: 16px;
  padding: 24px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.04);
  transition: transform 200ms ease, box-shadow 200ms ease, border-color 200ms ease;
}
.feature-card:hover {
  transform: translateY(-3px);
  box-shadow: 0 12px 30px rgba(37, 99, 235, 0.1);
  border-color: #93c5fd;
}
.card-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 16px;
}
.icon-wrap {
  width: 40px;
  height: 40px;
  border-radius: 10px;
  background: #eff6ff;
  color: #2563eb;
  display: grid;
  place-items: center;
}
.badge {
  font-size: 11px;
  font-weight: 700;
  color: #1d4ed8;
  background: #dbeafe;
  padding: 3px 8px;
  border-radius: 999px;
  text-transform: uppercase;
}
.card-cta {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-size: 13px;
  font-weight: 600;
  color: #2563eb;
  text-decoration: none;
}`,
      tsx: `export function FeatureCard({ title, desc, tag, href }: { title: string; desc: string; tag: string; href: string }) {
  return (
    <div className="feature-card">
      <div className="card-head">
        <div className="icon-wrap">⚡</div>
        <span className="badge">{tag}</span>
      </div>
      <h4>{title}</h4>
      <p>{desc}</p>
      <a href={href} className="card-cta">Explore Blueprint &rarr;</a>
    </div>
  );
}`,
    },
    {
      id: 'code-block',
      name: 'Interactive Code Card with Language Badge & Copy',
      category: 'code',
      description: 'Production code container featuring dark syntax styling, language pill, and 1-click clipboard integration.',
      renderPreview: (copiedMap, onCopy) => {
        const isCopied = copiedMap['code-demo'];
        const sampleCode = `import { Ollama } from 'ollama';\n\nconst ollama = new Ollama({ host: 'http://127.0.0.1:11434' });\nconst response = await ollama.chat({\n  model: 'deepseek-r1:14b',\n  messages: [{ role: 'user', content: 'Explain GGUF quants' }],\n});`;

        return (
          <div
            style={{
              width: '100%',
              maxWidth: '520px',
              background: '#0f172a',
              borderRadius: '14px',
              border: '1px solid #1e293b',
              overflow: 'hidden',
              boxShadow: '0 8px 30px rgba(0, 0, 0, 0.25)',
            }}
          >
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '10px 16px',
                background: '#090d16',
                borderBottom: '1px solid #1e293b',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#ef4444' }} />
                <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#f59e0b' }} />
                <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#10b981' }} />
                <span style={{ fontFamily: 'ui-monospace, monospace', fontSize: '11.5px', color: '#94a3b8', marginLeft: '6px' }}>
                  ollama-client.ts
                </span>
              </div>
              <button
                type="button"
                onClick={() => onCopy('code-demo', sampleCode)}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '5px',
                  background: isCopied ? '#15803d' : 'rgba(255, 255, 255, 0.1)',
                  border: '1px solid rgba(255, 255, 255, 0.15)',
                  borderRadius: '6px',
                  padding: '4px 10px',
                  color: '#ffffff',
                  fontSize: '11px',
                  cursor: 'pointer',
                  transition: 'background 150ms ease',
                }}
              >
                {isCopied ? '✓ Copied' : 'Copy Code'}
              </button>
            </div>
            <pre
              style={{
                margin: 0,
                padding: '16px 20px',
                fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace',
                fontSize: '12.5px',
                lineHeight: 1.65,
                color: '#e2e8f0',
                overflowX: 'auto',
              }}
            >
              <code>{sampleCode}</code>
            </pre>
          </div>
        );
      },
      html: `<div class="code-card">
  <div class="code-head">
    <span class="file-name">ollama-client.ts</span>
    <button class="copy-btn" type="button">Copy Code</button>
  </div>
  <pre><code>import { Ollama } from 'ollama';

const ollama = new Ollama({ host: 'http://127.0.0.1:11434' });
const res = await ollama.chat({ model: 'deepseek-r1:14b', messages: [...] });</code></pre>
</div>`,
      css: `.code-card {
  background: #0f172a;
  border-radius: 14px;
  border: 1px solid #1e293b;
  overflow: hidden;
}
.code-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 16px;
  background: #090d16;
  border-bottom: 1px solid #1e293b;
}
.copy-btn {
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.15);
  border-radius: 6px;
  padding: 4px 10px;
  color: #fff;
  font-size: 11px;
  cursor: pointer;
}`,
      tsx: `'use client';
import { useState } from 'react';

export function CodeBlock({ code, filename }: { code: string; filename: string }) {
  const [copied, setCopied] = useState(false);
  return (
    <div className="code-card">
      <div className="code-head">
        <span className="file-name">{filename}</span>
        <button onClick={() => { navigator.clipboard.writeText(code); setCopied(true); setTimeout(() => setCopied(false), 2000); }}>
          {copied ? '✓ Copied' : 'Copy Code'}
        </button>
      </div>
      <pre><code>{code}</code></pre>
    </div>
  );
}`,
    },
    {
      id: 'pill-badges',
      name: 'Status Badges & Interactive Pill Buttons',
      category: 'buttons',
      description: 'Animated live pulse status indicator, verified tags, and micro-interactive pill controls.',
      renderPreview: () => (
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px', flexWrap: 'wrap', justifyContent: 'center' }}>
          {/* Live Pulse Indicator */}
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              padding: '6px 14px',
              borderRadius: '999px',
              background: '#f0fdf4',
              border: '1px solid #bbf7d0',
              fontSize: '12.5px',
              fontWeight: 600,
              color: '#15803d',
            }}
          >
            <span
              style={{
                width: '8px',
                height: '8px',
                borderRadius: '50%',
                background: '#22c55e',
                boxShadow: '0 0 8px #22c55e',
              }}
            />
            Ollama Daemon Online
          </div>

          {/* Verified Badge */}
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              padding: '6px 14px',
              borderRadius: '999px',
              background: '#eff6ff',
              border: '1px solid #bfdbfe',
              fontSize: '12.5px',
              fontWeight: 600,
              color: '#1d4ed8',
            }}
          >
            <span>✓</span> Verified Apache 2.0
          </div>

          {/* Action Glow Button */}
          <button
            type="button"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              padding: '8px 20px',
              borderRadius: '999px',
              background: '#0f172a',
              color: '#ffffff',
              border: 'none',
              fontSize: '13px',
              fontWeight: 600,
              cursor: 'pointer',
              boxShadow: '0 2px 10px rgba(15, 23, 42, 0.2)',
            }}
          >
            <span>Deploy Model</span>
            <span>↗</span>
          </button>
        </div>
      ),
      html: `<!-- Live Pulse Pill -->
<span class="status-pill status-pill--live">
  <span class="pulse-dot"></span>
  Ollama Daemon Online
</span>

<!-- Verified Badge -->
<span class="status-pill status-pill--verified">
  ✓ Verified Apache 2.0
</span>

<!-- Dark Action Button -->
<button class="pill-btn" type="button">Deploy Model &rarr;</button>`,
      css: `.status-pill {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 6px 14px;
  border-radius: 999px;
  font-size: 12.5px;
  font-weight: 600;
}
.status-pill--live {
  background: #f0fdf4;
  border: 1px solid #bbf7d0;
  color: #15803d;
}
.pulse-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: #22c55e;
  box-shadow: 0 0 8px #22c55e;
}
.pill-btn {
  padding: 8px 20px;
  border-radius: 999px;
  background: #0f172a;
  color: #ffffff;
  border: none;
  font-weight: 600;
  cursor: pointer;
}`,
      tsx: `export function StatusPill({ status, label }: { status: 'live' | 'verified'; label: string }) {
  return (
    <span className={\`status-pill status-pill--\${status}\`}>
      {status === 'live' && <span className="pulse-dot" />}
      {label}
    </span>
  );
}`,
    },
    {
      id: 'faq-accordion',
      name: 'Accessible Animated FAQ Disclosure Accordion',
      category: 'nav',
      description: 'Keyboard-navigable accordion item with smooth CSS chevron rotation and accessible ARIA attributes.',
      renderPreview: () => (
        <div
          style={{
            maxWidth: '540px',
            width: '100%',
            background: '#ffffff',
            border: '1px solid #e2e8f0',
            borderRadius: '12px',
            overflow: 'hidden',
          }}
        >
          <button
            type="button"
            onClick={() => setAccordionOpen(!accordionOpen)}
            style={{
              width: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '16px 20px',
              background: '#ffffff',
              border: 'none',
              fontFamily: 'var(--font-display)',
              fontSize: '15px',
              fontWeight: 700,
              color: '#0f172a',
              cursor: 'pointer',
              textAlign: 'left',
            }}
          >
            <span>How does KV cache paging reduce VRAM fragmentation?</span>
            <span
              style={{
                transform: accordionOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                transition: 'transform 200ms ease',
                color: '#64748b',
                fontSize: '16px',
              }}
            >
              ▼
            </span>
          </button>
          {accordionOpen && (
            <div
              style={{
                padding: '0 20px 18px',
                fontSize: '13.5px',
                color: '#475569',
                lineHeight: 1.65,
                borderTop: '1px solid #f1f5f9',
                paddingTop: '14px',
              }}
            >
              PagedAttention allocates key-value cache memory in non-contiguous virtual blocks similar to OS memory pages. This eliminates internal and external memory fragmentation, allowing 2x-4x higher concurrency without running out of GPU memory.
            </div>
          )}
        </div>
      ),
      html: `<div class="accordion-item">
  <button class="accordion-trigger" aria-expanded="true">
    <span>How does KV cache paging reduce VRAM fragmentation?</span>
    <span class="chevron">&#9660;</span>
  </button>
  <div class="accordion-content">
    <p>PagedAttention allocates key-value cache memory in non-contiguous virtual blocks...</p>
  </div>
</div>`,
      css: `.accordion-item {
  border: 1px solid #e2e8f0;
  border-radius: 12px;
  overflow: hidden;
  background: #ffffff;
}
.accordion-trigger {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px 20px;
  background: none;
  border: none;
  font-weight: 700;
  cursor: pointer;
}
.chevron {
  transition: transform 200ms ease;
}
.accordion-content {
  padding: 14px 20px 18px;
  border-top: 1px solid #f1f5f9;
  color: #475569;
}`,
      tsx: `'use client';
import { useState } from 'react';

export function Accordion({ question, answer }: { question: string; answer: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="accordion-item">
      <button className="accordion-trigger" onClick={() => setOpen(!open)} aria-expanded={open}>
        <span>{question}</span>
        <span className="chevron" style={{ transform: open ? 'rotate(180deg)' : 'none' }}>▼</span>
      </button>
      {open && <div className="accordion-content"><p>{answer}</p></div>}
    </div>
  );
}`,
    },
    {
      id: 'metric-card',
      name: 'Stats KPI Metric Counter Card',
      category: 'metrics',
      description: 'High-impact stat counter card with bold typography, trend pill indicator, and subtitle.',
      renderPreview: () => (
        <div
          style={{
            maxWidth: '300px',
            width: '100%',
            background: '#ffffff',
            border: '1px solid #e2e8f0',
            borderRadius: '16px',
            padding: '22px 24px',
            boxShadow: '0 4px 16px rgba(0, 0, 0, 0.03)',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
            <span style={{ fontSize: '12px', fontWeight: 600, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              Inference Throughput
            </span>
            <span
              style={{
                fontSize: '11px',
                fontWeight: 700,
                color: '#15803d',
                background: '#dcfce7',
                padding: '2px 8px',
                borderRadius: '6px',
              }}
            >
              +38.4%
            </span>
          </div>
          <div style={{ fontFamily: 'var(--font-display)', fontSize: '32px', fontWeight: 700, color: '#0f172a', letterSpacing: '-0.02em', margin: '4px 0 6px' }}>
            115 tok/s
          </div>
          <p style={{ fontSize: '12.5px', color: '#64748b', margin: 0 }}>
            Benchmarked on local RTX 4090 with DeepSeek-R1 (14B Q4_K_M)
          </p>
        </div>
      ),
      html: `<div class="kpi-card">
  <div class="kpi-header">
    <span class="kpi-label">Inference Throughput</span>
    <span class="kpi-trend">+38.4%</span>
  </div>
  <div class="kpi-value">115 tok/s</div>
  <p class="kpi-desc">Benchmarked on local RTX 4090 with DeepSeek-R1 (14B Q4_K_M)</p>
</div>`,
      css: `.kpi-card {
  background: #ffffff;
  border: 1px solid #e2e8f0;
  border-radius: 16px;
  padding: 22px 24px;
}
.kpi-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.kpi-trend {
  font-size: 11px;
  font-weight: 700;
  color: #15803d;
  background: #dcfce7;
  padding: 2px 8px;
  border-radius: 6px;
}
.kpi-value {
  font-size: 32px;
  font-weight: 700;
  color: #0f172a;
  letter-spacing: -0.02em;
}`,
      tsx: `export function KPICard({ label, value, trend, desc }: { label: string; value: string; trend: string; desc: string }) {
  return (
    <div className="kpi-card">
      <div className="kpi-header">
        <span className="kpi-label">{label}</span>
        <span className="kpi-trend">{trend}</span>
      </div>
      <div className="kpi-value">{value}</div>
      <p className="kpi-desc">{desc}</p>
    </div>
  );
}`,
    },
    {
      id: 'command-bar',
      name: 'Command Palette Quick Trigger Bar (⌘K)',
      category: 'nav',
      description: 'Minimalist search input container with keyboard hint chip and smooth active focus ring.',
      renderPreview: () => (
        <div
          style={{
            maxWidth: '440px',
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            background: '#ffffff',
            border: '1.5px solid #cbd5e1',
            borderRadius: '12px',
            padding: '10px 16px',
            boxShadow: '0 2px 8px rgba(0, 0, 0, 0.04)',
            cursor: 'pointer',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#64748b" strokeWidth="2.2">
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
            <span style={{ fontSize: '13.5px', color: '#64748b' }}>Search models, repos, components...</span>
          </div>
          <kbd
            style={{
              fontFamily: 'ui-monospace, monospace',
              fontSize: '11px',
              fontWeight: 700,
              background: '#f1f5f9',
              border: '1px solid #cbd5e1',
              borderRadius: '5px',
              padding: '2px 7px',
              color: '#475569',
            }}
          >
            ⌘K
          </kbd>
        </div>
      ),
      html: `<div class="command-trigger">
  <div class="search-info">
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor">...</svg>
    <span>Search models, repos, components...</span>
  </div>
  <kbd class="shortcut-key">⌘K</kbd>
</div>`,
      css: `.command-trigger {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: #ffffff;
  border: 1.5px solid #cbd5e1;
  border-radius: 12px;
  padding: 10px 16px;
  cursor: pointer;
}
.command-trigger:focus-within,
.command-trigger:hover {
  border-color: #2563eb;
  box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.12);
}
.shortcut-key {
  font-family: ui-monospace, monospace;
  font-size: 11px;
  background: #f1f5f9;
  border: 1px solid #cbd5e1;
  border-radius: 5px;
  padding: 2px 7px;
}`,
      tsx: `export function CommandTrigger({ onOpen }: { onOpen?: () => void }) {
  return (
    <div className="command-trigger" onClick={onOpen} role="button" tabIndex={0}>
      <div className="search-info">
        <span>Search models, repos, components...</span>
      </div>
      <kbd className="shortcut-key">⌘K</kbd>
    </div>
  );
}`,
    },
  ];

  const filteredComponents = components.filter((c) => {
    if (activeCategory === 'all') return true;
    return c.category === activeCategory;
  });

  return (
    <div>
      {/* Category Filter Pills */}
      <div className="filter-pills-wrap">
        {[
          { id: 'all', label: 'All Components (6)' },
          { id: 'cards', label: 'Cards & Containers' },
          { id: 'code', label: 'Code & Terminal' },
          { id: 'buttons', label: 'Buttons & Badges' },
          { id: 'metrics', label: 'Data & Metrics' },
          { id: 'nav', label: 'Navigation & Disclosure' },
        ].map((cat) => (
          <button
            key={cat.id}
            type="button"
            className={`filter-pill ${activeCategory === cat.id ? 'active' : ''}`}
            onClick={() => setActiveCategory(cat.id)}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Component Showcases Grid (Balanced 2-Column Library) */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 520px), 1fr))', gap: '24px', marginTop: '20px' }}>
        {filteredComponents.map((comp) => {
          const currentTab = activeTabs[comp.id] || 'preview';
          let codeContent = comp.html;
          if (currentTab === 'css') codeContent = comp.css;
          if (currentTab === 'tsx') codeContent = comp.tsx;

          const isCopied = copiedCodes[comp.id];

          return (
            <div key={comp.id} className="component-showcase" style={{ margin: 0, display: 'flex', flexDirection: 'column' }}>
              <div className="showcase-header">
                <div className="showcase-title-area">
                  <h3>{comp.name}</h3>
                  <p>{comp.description}</p>
                </div>
                <div className="showcase-nav">
                  {(['preview', 'html', 'css', 'tsx'] as const).map((tabKey) => (
                    <button
                      key={tabKey}
                      type="button"
                      className={`showcase-tab-btn ${currentTab === tabKey ? 'active' : ''}`}
                      onClick={() => setTab(comp.id, tabKey)}
                    >
                      {tabKey.toUpperCase()}
                    </button>
                  ))}
                </div>
              </div>

              {currentTab === 'preview' ? (
                <div className="showcase-preview-area" style={{ flexGrow: 1, padding: '32px 20px', minHeight: '160px' }}>
                  {comp.renderPreview(copiedCodes, handleCopyCode)}
                </div>
              ) : (
                <div className="showcase-code-area" style={{ flexGrow: 1, minHeight: '160px' }}>
                  <button
                    type="button"
                    className="showcase-code-copy-floating"
                    onClick={() => handleCopyCode(comp.id, codeContent)}
                  >
                    {isCopied ? '✓ Copied!' : 'Copy Code'}
                  </button>
                  <pre>
                    <code>{codeContent}</code>
                  </pre>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Design System Tokens Guide */}
      <section className="topic-section" aria-labelledby="tokens-heading" style={{ marginTop: '48px' }}>
        <h2 id="tokens-heading" className="topic-section-title">
          Design System Tokens
        </h2>
        <p style={{ fontSize: '14px', color: '#64748b', margin: '4px 0 20px' }}>
          Calibrated color tokens and typographic scales used across vnhax components.
        </p>

        <div className="tokens-grid">
          {[
            { name: 'Ink Black', value: '#0a0a0a', hex: '#0a0a0a' },
            { name: 'Accent Blue', value: '#1a73e8', hex: '#1a73e8' },
            { name: 'Emerald', value: '#10b981', hex: '#10b981' },
            { name: 'Violet', value: '#8b5cf6', hex: '#8b5cf6' },
            { name: 'Surface Gray', value: '#f8fafc', hex: '#f8fafc' },
            { name: 'Border Slate', value: '#e2e8f0', hex: '#e2e8f0' },
          ].map((tok) => (
            <div key={tok.name} className="token-card">
              <div className="token-swatch" style={{ background: tok.hex }} />
              <div className="token-meta">
                <div className="token-name">{tok.name}</div>
                <div className="token-value">{tok.value}</div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
