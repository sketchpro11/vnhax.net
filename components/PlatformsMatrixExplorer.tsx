'use client';

import { useState } from 'react';

interface PlatformItem {
  name: string;
  category: 'inference' | 'edge' | 'data';
  categoryLabel: string;
  badge: string;
  badgeColor: 'blue' | 'green' | 'amber' | 'purple';
  strengths: string[];
  tradeoffs: string[];
  portability: 'High' | 'Medium' | 'Low';
  pricing: string;
  bestFor: string;
}

const PLATFORMS: PlatformItem[] = [
  {
    name: 'Groq (Language Processing Unit)',
    category: 'inference',
    categoryLabel: 'AI Inference Cloud',
    badge: 'LPU Silicon',
    badgeColor: 'purple',
    strengths: [
      'Industry-leading token generation speed (300-500+ tok/s on Llama 3.3).',
      'Ultra-deterministic latency with tensor streaming architecture.',
      'Drop-in OpenAI-compatible API format.',
    ],
    tradeoffs: [
      'Limited to supported open-weight models loaded onto physical LPUs.',
      'Per-minute rate limits on free and lower-tier developer accounts.',
    ],
    portability: 'High',
    pricing: 'Per-million tokens ($0.05 - $0.59)',
    bestFor: 'Real-time conversational agents, voice synthesis pipelines & interactive assistants.',
  },
  {
    name: 'Cloudflare Workers & Workers AI',
    category: 'edge',
    categoryLabel: 'Developer & Edge Cloud',
    badge: 'V8 Isolate Edge',
    badgeColor: 'blue',
    strengths: [
      'Zero cold starts across 330+ global data centers.',
      'Ultra-low bandwidth egress fees and integrated D1 SQLite / Vectorize.',
      'Unified edge execution combining HTTP logic and model inference.',
    ],
    tradeoffs: [
      'Proprietary Workers API (not full Node.js runtime environment).',
      'Execution CPU time limits on free/standard plans (50ms - 30s).',
    ],
    portability: 'Medium',
    pricing: 'Per-request + inference neuron units',
    bestFor: 'Global edge microservices, geo-routing, and ultra-low latency AI proxy layers.',
  },
  {
    name: 'Vercel (Frontend & Serverless Edge)',
    category: 'edge',
    categoryLabel: 'Developer & Edge Cloud',
    badge: 'Next.js Native',
    badgeColor: 'blue',
    strengths: [
      'Best-in-class developer experience for Next.js App Router and React.',
      'Instant preview deployments, branch aliases, and built-in edge middleware.',
      'Integrated AI SDK with unified streaming primitives.',
    ],
    tradeoffs: [
      'Steep egress and bandwidth markup when exceeding included allowances.',
      'Execution timeout limits on standard serverless functions (15s - 60s).',
    ],
    portability: 'Medium',
    pricing: 'Per-seat + compute execution usage',
    bestFor: 'Modern full-stack web applications, marketing sites, and dynamic dashboards.',
  },
  {
    name: 'PostgreSQL + pgvector',
    category: 'data',
    categoryLabel: 'Data & Vector Storage',
    badge: 'ACID Relational',
    badgeColor: 'green',
    strengths: [
      'Unified storage: query embeddings, relational data, and JSONB in a single SQL query.',
      '100% portable: runs on AWS RDS, Supabase, self-hosted Docker, or bare metal.',
      'HNSW and IVFFlat index support for sub-10ms approximate nearest neighbor search.',
    ],
    tradeoffs: [
      'Requires memory tuning (maintenance_work_mem) when indexing over 10M vectors.',
      'Scaling horizontally requires sharding or read replica topologies.',
    ],
    portability: 'High',
    pricing: 'Open-source / Cloud compute tier',
    bestFor: 'Enterprise RAG applications requiring relational integrity alongside vector search.',
  },
  {
    name: 'Together AI & Fireworks',
    category: 'inference',
    categoryLabel: 'AI Inference Cloud',
    badge: 'GPU Cluster',
    badgeColor: 'purple',
    strengths: [
      'Extensive library of open models (DeepSeek, Llama, Qwen, Flux).',
      'Support for custom LoRA weight hot-swapping at inference time.',
      'Competitive per-token pricing compared to proprietary model APIs.',
    ],
    tradeoffs: [
      'Variable time-to-first-token during regional traffic spikes.',
      'Requires fallback architecture for guaranteed 99.99% enterprise SLA.',
    ],
    portability: 'High',
    pricing: 'Per-million tokens ($0.18 - $0.90)',
    bestFor: 'Fine-tuned model hosting, open-source LLM experimentation & image generation.',
  },
  {
    name: 'Fly.io & Railway',
    category: 'edge',
    categoryLabel: 'Developer & Edge Cloud',
    badge: 'MicroVM Container',
    badgeColor: 'amber',
    strengths: [
      'Standard Docker container portability with zero proprietary API locking.',
      'Global distribution close to users via Firecracker microVMs.',
      'Persistent volume storage and private WireGuard mesh networking.',
    ],
    tradeoffs: [
      'Requires managing container lifecycles, health checks, and Dockerfiles.',
      'Smaller managed service ecosystem compared to AWS or Google Cloud.',
    ],
    portability: 'High',
    pricing: 'Compute-second (RAM/CPU/Storage)',
    bestFor: 'Long-running background daemons, WebSockets, background workers, and MCP servers.',
  },
];

export default function PlatformsMatrixExplorer() {
  const [activeCategory, setActiveCategory] = useState<string>('all');

  const filteredPlatforms = PLATFORMS.filter((p) => {
    if (activeCategory === 'all') return true;
    return p.category === activeCategory;
  });

  return (
    <div>
      {/* Category Filter Pills */}
      <div className="filter-pills-wrap">
        {[
          { id: 'all', label: 'All Platforms (6)' },
          { id: 'inference', label: 'AI Inference & GPU Cloud' },
          { id: 'edge', label: 'Developer & Edge Cloud' },
          { id: 'data', label: 'Data & Vector Storage' },
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

      {/* Comparison Grid */}
      <div className="platform-grid">
        {filteredPlatforms.map((plat) => (
          <div key={plat.name} className="platform-eval-card">
            <div className="platform-card-header">
              <div>
                <h3 className="platform-card-title">{plat.name}</h3>
                <span className="platform-card-category">{plat.categoryLabel}</span>
              </div>
              <span className={`hub-tag hub-tag--${plat.badgeColor}`}>{plat.badge}</span>
            </div>

            <p className="platform-card-desc">{plat.bestFor}</p>

            <ul className="platform-spec-list">
              <li className="platform-spec-item">
                <span className="platform-spec-label">Portability Score</span>
                <span
                  className="platform-spec-val"
                  style={{
                    color: plat.portability === 'High' ? '#15803d' : plat.portability === 'Medium' ? '#2563eb' : '#b45309',
                  }}
                >
                  {plat.portability} Portability
                </span>
              </li>
              <li className="platform-spec-item">
                <span className="platform-spec-label">Pricing Model</span>
                <span className="platform-spec-val" style={{ fontSize: '12px' }}>
                  {plat.pricing}
                </span>
              </li>
            </ul>

            <div style={{ marginTop: 'auto', paddingTop: '12px', borderTop: '1px solid #f1f5f9' }}>
              <div style={{ fontSize: '11.5px', fontWeight: 700, color: '#15803d', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '6px' }}>
                Key Strengths
              </div>
              <ul style={{ paddingLeft: '16px', margin: '0 0 10px', fontSize: '12.5px', color: '#334155', lineHeight: 1.5 }}>
                {plat.strengths.slice(0, 2).map((s, i) => (
                  <li key={i}>{s}</li>
                ))}
              </ul>

              <div style={{ fontSize: '11.5px', fontWeight: 700, color: '#b45309', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '6px' }}>
                Constraints &amp; Tradeoffs
              </div>
              <ul style={{ paddingLeft: '16px', margin: 0, fontSize: '12.5px', color: '#64748b', lineHeight: 1.5 }}>
                {plat.tradeoffs.slice(0, 1).map((t, i) => (
                  <li key={i}>{t}</li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
