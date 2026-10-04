'use client';

import { useState } from 'react';
import Link from 'next/link';

interface ModelSpec {
  name: string;
  badge: string;
  badgeColor: 'blue' | 'green' | 'amber' | 'purple';
  tier: 'edge' | 'workstation' | 'cluster';
  architecture: string;
  contextWindow: string;
  minVramQ4: string;
  idealHardware: string;
  useCase: string;
  recommendedRuntime: string;
  repoLink?: string;
}

const MODELS_DATA: ModelSpec[] = [
  {
    name: 'DeepSeek-R1 (Distill 14B/32B & 671B)',
    badge: 'Reasoning CoT',
    badgeColor: 'purple',
    tier: 'workstation',
    architecture: 'Multi-head Latent Attention (MLA) + MoE',
    contextWindow: '64k tokens',
    minVramQ4: '9GB (14B) / 20GB (32B)',
    idealHardware: 'RTX 4090 (24GB) or Mac M3 Max (36GB+)',
    useCase: 'Complex mathematical logic, algorithm generation & deep reasoning',
    recommendedRuntime: 'Ollama / vLLM',
    repoLink: '/repos/ollama',
  },
  {
    name: 'Llama 3.3 (70B Instruct)',
    badge: 'Flagship Generalist',
    badgeColor: 'blue',
    tier: 'workstation',
    architecture: 'Dense Transformer with Grouped-Query Attention (GQA)',
    contextWindow: '128k tokens',
    minVramQ4: '40GB - 43GB',
    idealHardware: 'Dual RTX 3090 / 4090 or Apple Silicon 64GB+',
    useCase: 'Enterprise instruction following, synthesis & multi-turn dialog',
    recommendedRuntime: 'llama.cpp / Ollama',
    repoLink: '/repos/llamacpp',
  },
  {
    name: 'Qwen 2.5 Coder (7B & 32B)',
    badge: 'SOTA Code LLM',
    badgeColor: 'green',
    tier: 'edge',
    architecture: 'Dense RoPE with Byte-level BPE Tokenizer',
    contextWindow: '128k tokens',
    minVramQ4: '5.5GB (7B) / 20GB (32B)',
    idealHardware: 'Apple Silicon 16GB or RTX 4060/4070',
    useCase: 'Autonomous coding agents, AST refactoring, test generation',
    recommendedRuntime: 'Ollama / Aider / Cline',
    repoLink: '/repos/aider',
  },
  {
    name: 'Mistral Small & NeMo (12B - 24B)',
    badge: 'High-Density Edge',
    badgeColor: 'amber',
    tier: 'edge',
    architecture: 'Tekken Tokenizer + Sliding Window Attention',
    contextWindow: '128k tokens',
    minVramQ4: '7.8GB (12B) / 15GB (24B)',
    idealHardware: 'MacBook Pro 18GB or RTX 4070 12GB',
    useCase: 'Multilingual tasks, edge function agents & fast local completion',
    recommendedRuntime: 'llama.cpp',
    repoLink: '/repos/llamacpp',
  },
  {
    name: 'Flux.1 Schnell & Dev (12B DiT)',
    badge: 'Vision Diffusion',
    badgeColor: 'purple',
    tier: 'workstation',
    architecture: 'Rectified Flow Transformer (MMDiT)',
    contextWindow: 'N/A (Latent)',
    minVramQ4: '12GB - 16GB (NF4/Q4)',
    idealHardware: 'RTX 4080 (16GB) or RTX 4090 (24GB)',
    useCase: 'High-fidelity image generation, typography rendering & LoRAs',
    recommendedRuntime: 'ComfyUI',
    repoLink: '/repos/comfyui',
  },
];

const VRAM_CALC_DATA: Record<string, Record<string, { vram: string; hw: string; speed: string }>> = {
  '8B': {
    FP16: { vram: '~16.0 GB', hw: 'RTX 4080 (16GB) / Mac 18GB', speed: '45-65 t/s' },
    Q8_0: { vram: '~8.9 GB', hw: 'RTX 4060 (12GB) / Mac 16GB', speed: '70-95 t/s' },
    Q4_K_M: { vram: '~5.5 GB', hw: 'RTX 3060 (8GB) / Mac 8GB', speed: '90-120 t/s' },
    Q3_K: { vram: '~4.2 GB', hw: 'Standard Laptop with 8GB RAM', speed: '100-135 t/s' },
  },
  '14B': {
    FP16: { vram: '~28.0 GB', hw: 'Dual RTX 4070 or Mac 36GB+', speed: '30-45 t/s' },
    Q8_0: { vram: '~15.5 GB', hw: 'RTX 4080 (16GB) / Mac 18GB', speed: '45-60 t/s' },
    Q4_K_M: { vram: '~9.2 GB', hw: 'RTX 3060 (12GB) / Mac 16GB', speed: '55-80 t/s' },
    Q3_K: { vram: '~7.3 GB', hw: 'RTX 4060 (8GB) / Mac 8GB', speed: '65-90 t/s' },
  },
  '32B': {
    FP16: { vram: '~64.0 GB', hw: 'Workstation 2x RTX 3090 / Mac 64GB', speed: '20-30 t/s' },
    Q8_0: { vram: '~34.5 GB', hw: 'Apple Silicon 48GB+ or 2x RTX 3090', speed: '30-45 t/s' },
    Q4_K_M: { vram: '~20.5 GB', hw: 'Single RTX 4090 (24GB) / Mac 36GB', speed: '38-55 t/s' },
    Q3_K: { vram: '~16.2 GB', hw: 'RTX 4080 (16GB) / Mac 18GB', speed: '45-65 t/s' },
  },
  '70B': {
    FP16: { vram: '~140.0 GB', hw: 'Enterprise Cluster (2x A100/H100)', speed: '15-22 t/s' },
    Q8_0: { vram: '~75.0 GB', hw: 'Apple Silicon M3 Max 96GB/128GB', speed: '20-28 t/s' },
    Q4_K_M: { vram: '~43.0 GB', hw: 'Dual RTX 3090 (48GB) / Mac 64GB', speed: '25-38 t/s' },
    Q3_K: { vram: '~34.0 GB', hw: 'Mac M3 Max 48GB / Dual RTX 4070', speed: '30-42 t/s' },
  },
};

export default function AIInteractiveExplorer() {
  const [activeTier, setActiveTier] = useState<'all' | 'edge' | 'workstation'>('all');
  const [selectedSize, setSelectedSize] = useState<string>('14B');
  const [selectedQuant, setSelectedQuant] = useState<string>('Q4_K_M');

  const filteredModels = MODELS_DATA.filter((m) => {
    if (activeTier === 'all') return true;
    return m.tier === activeTier;
  });

  const calcResult = VRAM_CALC_DATA[selectedSize]?.[selectedQuant] || {
    vram: 'Varies',
    hw: 'Check GPU specs',
    speed: 'Estimated',
  };

  return (
    <div>
      {/* 1. Interactive Model Architecture Matrix */}
      <section className="topic-section" aria-labelledby="model-matrix-heading" style={{ marginTop: '20px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '16px', marginBottom: '16px' }}>
          <div>
            <h2 id="model-matrix-heading" className="topic-section-title" style={{ margin: 0 }}>
              Flagship Open-Weight Architecture Matrix
            </h2>
            <p style={{ fontSize: '14px', color: '#64748b', margin: '4px 0 0' }}>
              Comparison of verified model runtimes, context lengths, and VRAM memory requirements.
            </p>
          </div>

          <div className="filter-pills-wrap" style={{ margin: 0 }}>
            <button
              type="button"
              className={`filter-pill ${activeTier === 'all' ? 'active' : ''}`}
              onClick={() => setActiveTier('all')}
            >
              All Architectures
            </button>
            <button
              type="button"
              className={`filter-pill ${activeTier === 'edge' ? 'active' : ''}`}
              onClick={() => setActiveTier('edge')}
            >
              Edge / Laptop (≤16GB)
            </button>
            <button
              type="button"
              className={`filter-pill ${activeTier === 'workstation' ? 'active' : ''}`}
              onClick={() => setActiveTier('workstation')}
            >
              Workstation (24GB - 48GB)
            </button>
          </div>
        </div>

        <div className="hub-table-wrap">
          <table className="hub-matrix-table">
            <thead>
              <tr>
                <th>Model &amp; Family</th>
                <th>Architecture</th>
                <th>Context Window</th>
                <th>Min VRAM (Q4_K_M)</th>
                <th>Recommended Hardware</th>
                <th>Recommended Runtime</th>
              </tr>
            </thead>
            <tbody>
              {filteredModels.map((m) => (
                <tr key={m.name}>
                  <td>
                    <div style={{ fontWeight: 650, color: '#0f172a', marginBottom: '4px' }}>{m.name}</div>
                    <span className={`hub-tag hub-tag--${m.badgeColor}`}>{m.badge}</span>
                  </td>
                  <td style={{ fontSize: '13px' }}>{m.architecture}</td>
                  <td>
                    <span style={{ fontWeight: 600, color: '#0f172a' }}>{m.contextWindow}</span>
                  </td>
                  <td>
                    <span style={{ fontFamily: 'ui-monospace, monospace', fontWeight: 600, color: '#2563eb' }}>
                      {m.minVramQ4}
                    </span>
                  </td>
                  <td style={{ fontSize: '13px', color: '#475569' }}>{m.idealHardware}</td>
                  <td>
                    {m.repoLink ? (
                      <Link
                        href={m.repoLink}
                        style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '4px',
                          color: '#2563eb',
                          fontWeight: 600,
                          fontSize: '13px',
                          textDecoration: 'none',
                        }}
                      >
                        {m.recommendedRuntime} ↗
                      </Link>
                    ) : (
                      <span style={{ fontWeight: 550, color: '#334155' }}>{m.recommendedRuntime}</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* 2. Interactive VRAM & Hardware Sizing Calculator */}
      <section className="calc-box" aria-labelledby="vram-calc-heading">
        <div className="calc-header">
          <div>
            <h3 id="vram-calc-heading" className="calc-title">
              <span>⚡</span> Interactive Hardware &amp; VRAM Sizing Calculator
            </h3>
            <p className="calc-subtitle">
              Calculate exact memory footings, recommend GPU/Apple Silicon configurations, and estimate local tokens/second.
            </p>
          </div>
          <div style={{ fontSize: '12px', background: 'rgba(59, 130, 246, 0.15)', color: '#93c5fd', padding: '4px 12px', borderRadius: '999px', border: '1px solid rgba(59, 130, 246, 0.3)' }}>
            2026 Silicon Benchmarked
          </div>
        </div>

        <div className="calc-controls-grid">
          <div className="calc-control-group">
            <label>1. Model Parameter Size</label>
            <div className="calc-options-row">
              {['8B', '14B', '32B', '70B'].map((sz) => (
                <button
                  key={sz}
                  type="button"
                  className={`calc-opt-btn ${selectedSize === sz ? 'active' : ''}`}
                  onClick={() => setSelectedSize(sz)}
                >
                  {sz} Parameters
                </button>
              ))}
            </div>
          </div>

          <div className="calc-control-group">
            <label>2. Quantization Format (GGUF / AWQ)</label>
            <div className="calc-options-row">
              {[
                { id: 'FP16', label: 'FP16 (Uncompressed)' },
                { id: 'Q8_0', label: 'Q8_0 (Near Lossless)' },
                { id: 'Q4_K_M', label: 'Q4_K_M (Recommended)' },
                { id: 'Q3_K', label: 'Q3_K (Max Memory Save)' },
              ].map((q) => (
                <button
                  key={q.id}
                  type="button"
                  className={`calc-opt-btn ${selectedQuant === q.id ? 'active' : ''}`}
                  onClick={() => setSelectedQuant(q.id)}
                >
                  {q.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="calc-result-panel">
          <div className="calc-res-item">
            <span className="calc-res-label">Estimated Memory Required</span>
            <span className="calc-res-val">{calcResult.vram}</span>
          </div>
          <div className="calc-res-item">
            <span className="calc-res-label">Recommended Hardware Setup</span>
            <span className="calc-res-val" style={{ fontSize: '17px', color: '#ffffff' }}>
              {calcResult.hw}
            </span>
          </div>
          <div className="calc-res-item">
            <span className="calc-res-label">Expected Generation Throughput</span>
            <span className="calc-res-val" style={{ color: '#34d399' }}>
              {calcResult.speed}
            </span>
          </div>
        </div>
      </section>
    </div>
  );
}
