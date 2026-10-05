'use client';

import React, { useState } from 'react';
import Image from 'next/image';

interface PackageInfo {
  name: string;
  category: 'platform' | 'sql' | 'ai' | 'atom' | 'tooling';
  description: string;
  installCmd: string;
  badge?: string;
}

const PACKAGES: PackageInfo[] = [
  // Platform Abstractions
  { name: 'effect', category: 'platform', description: 'Core runtime, lightweight green-thread fiber system, typed errors, and structured concurrency.', installCmd: 'npm install effect', badge: 'Core' },
  { name: '@effect/platform-browser', category: 'platform', description: 'Web platform abstractions for browser DOM, fetch, storage, and worker communications.', installCmd: 'npm install @effect/platform-browser' },
  { name: '@effect/platform-bun', category: 'platform', description: 'Ultra-fast Bun runtime integration leveraging Bun native APIs.', installCmd: 'npm install @effect/platform-bun' },
  { name: '@effect/platform-deno', category: 'platform', description: 'Deno runtime bindings for file system, streams, and subprocesses.', installCmd: 'npm install @effect/platform-deno' },
  { name: '@effect/platform-node', category: 'platform', description: 'Node.js production runtime with native streams, file system, and HTTP server.', installCmd: 'npm install @effect/platform-node' },
  { name: '@effect/platform-node-shared', category: 'platform', description: 'Shared utility layer for Node-compatible runtimes and toolchains.', installCmd: 'npm install @effect/platform-node-shared' },

  // SQL & Database Connectors
  { name: '@effect/sql-clickhouse', category: 'sql', description: 'High-throughput analytical OLAP database driver with stream decoding.', installCmd: 'npm install @effect/sql-clickhouse' },
  { name: '@effect/sql-d1', category: 'sql', description: 'Cloudflare D1 edge database driver with transaction and batching support.', installCmd: 'npm install @effect/sql-d1' },
  { name: '@effect/sql-libsql', category: 'sql', description: 'Turso and LibSQL distributed edge SQLite client with embedded replicas.', installCmd: 'npm install @effect/sql-libsql' },
  { name: '@effect/sql-mssql', category: 'sql', description: 'Enterprise Microsoft SQL Server client with connection pooling and typed parameters.', installCmd: 'npm install @effect/sql-mssql' },
  { name: '@effect/sql-mysql2', category: 'sql', description: 'MySQL 8 and MariaDB async connection pool with typed statement execution.', installCmd: 'npm install @effect/sql-mysql2' },
  { name: '@effect/sql-pg', category: 'sql', description: 'PostgreSQL connection manager with connection pooling, migrations, and streaming.', installCmd: 'npm install @effect/sql-pg' },
  { name: '@effect/sql-pglite', category: 'sql', description: 'Embedded WASM Postgres in-process driver for Node, browser, and edge testing.', installCmd: 'npm install @effect/sql-pglite' },
  { name: '@effect/sql-sqlite-bun', category: 'sql', description: 'Native Bun SQLite bindings with compiled C++ execution speed.', installCmd: 'npm install @effect/sql-sqlite-bun' },
  { name: '@effect/sql-sqlite-do', category: 'sql', description: 'Cloudflare Durable Objects embedded SQLite storage driver.', installCmd: 'npm install @effect/sql-sqlite-do' },
  { name: '@effect/sql-sqlite-node', category: 'sql', description: 'Node.js SQLite integration using node:sqlite (Requires Node.js 22.16+).', installCmd: 'npm install @effect/sql-sqlite-node', badge: 'Node 22.16+' },
  { name: '@effect/sql-sqlite-react-native', category: 'sql', description: 'Offline-first SQLite persistence driver for React Native iOS and Android apps.', installCmd: 'npm install @effect/sql-sqlite-react-native' },
  { name: '@effect/sql-sqlite-wasm', category: 'sql', description: 'In-memory and IndexedDB-backed SQLite compiled to WebAssembly.', installCmd: 'npm install @effect/sql-sqlite-wasm' },

  // AI & LLM Integrations
  { name: '@effect/ai-anthropic', category: 'ai', description: 'Anthropic Claude 3.5 Sonnet & Opus client with typed streaming and tool calling.', installCmd: 'npm install @effect/ai-anthropic' },
  { name: '@effect/ai-openai', category: 'ai', description: 'OpenAI GPT-4o, o1, and embeddings client with structured JSON output schemas.', installCmd: 'npm install @effect/ai-openai' },
  { name: '@effect/ai-cloudflare', category: 'ai', description: 'Cloudflare Workers AI edge model inferences with zero cold starts.', installCmd: 'npm install @effect/ai-cloudflare' },
  { name: '@effect/ai-typesafe', category: 'ai', description: 'End-to-end typed schema validation for AI agents, prompt outputs, and tool dispatch.', installCmd: 'npm install @effect/ai-typesafe' },
  { name: '@effect/ai-openai-compat', category: 'ai', description: 'Drop-in driver for local models (Ollama, vLLM, LM Studio) and third-party APIs.', installCmd: 'npm install @effect/ai-openai-compat' },
  { name: '@effect/ai-openrouter', category: 'ai', description: 'Unified multi-model API router accessing 200+ frontier and open-weight models.', installCmd: 'npm install @effect/ai-openrouter' },

  // UI State & Reactive Atoms
  { name: '@effect/atom-react', category: 'atom', description: 'Fine-grained reactive state atoms and fiber subscription hooks for React 18 & 19.', installCmd: 'npm install @effect/atom-react' },
  { name: '@effect/atom-solid', category: 'atom', description: 'Solid.js reactive signals powered by Effect concurrent runtime and error channels.', installCmd: 'npm install @effect/atom-solid' },
  { name: '@effect/atom-vue', category: 'atom', description: 'Vue 3 Composition API refs and reactive bindings linked to Effect fibers.', installCmd: 'npm install @effect/atom-vue' },

  // Tooling, Observability & Testing
  { name: '@effect/opentelemetry', category: 'tooling', description: 'Zero-overhead OpenTelemetry tracing, spans, baggage, and metrics propagation.', installCmd: 'npm install @effect/opentelemetry' },
  { name: '@effect/vitest', category: 'tooling', description: 'Vitest integration providing effect-aware it.effect test runners and assertions.', installCmd: 'npm install @effect/vitest' },
  { name: '@effect/docgen', category: 'tooling', description: 'Automated documentation and API website generator from TypeScript docstrings.', installCmd: 'npm install @effect/docgen' },
  { name: '@effect/doctest', category: 'tooling', description: 'Automated test runner that type-checks and verifies code blocks in markdown docs.', installCmd: 'npm install @effect/doctest' },
  { name: '@effect/openapi-generator', category: 'tooling', description: 'Compiles Effect Schema definitions directly into OpenAPI 3.1 specifications.', installCmd: 'npm install @effect/openapi-generator' },
];

export default function EffectExtendedDoc() {
  const [selectedPkgTab, setSelectedPkgTab] = useState<'all' | 'platform' | 'sql' | 'ai' | 'atom' | 'tooling'>('all');
  const [pkgSearch, setPkgSearch] = useState<string>('');
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [packageManager, setPackageManager] = useState<'npm' | 'pnpm' | 'yarn' | 'bun'>('npm');
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const getInstallCmd = (pkgName: string) => {
    switch (packageManager) {
      case 'pnpm': return `pnpm add ${pkgName}`;
      case 'yarn': return `yarn add ${pkgName}`;
      case 'bun': return `bun add ${pkgName}`;
      default: return `npm install ${pkgName}`;
    }
  };

  const filteredPackages = PACKAGES.filter((p) => {
    const matchesCategory = selectedPkgTab === 'all' || p.category === selectedPkgTab;
    const matchesSearch = p.name.toLowerCase().includes(pkgSearch.toLowerCase()) || p.description.toLowerCase().includes(pkgSearch.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div style={{ maxWidth: '1100px', margin: '0 auto', fontFamily: 'inherit' }}>
      {/* 1. Top Badges & Status Bar */}
      <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '24px', alignItems: 'center' }}>
        <span style={{ background: '#2563eb', color: '#ffffff', fontSize: '11px', fontWeight: 700, padding: '4px 10px', borderRadius: '6px' }}>
          EFFECT 4.X LTS (ACTIVE)
        </span>
        <span style={{ background: '#059669', color: '#ffffff', fontSize: '11px', fontWeight: 700, padding: '4px 10px', borderRadius: '6px' }}>
          11.4K+ STARS
        </span>
        <span style={{ background: '#3178c6', color: '#ffffff', fontSize: '11px', fontWeight: 700, padding: '4px 10px', borderRadius: '6px' }}>
          TYPESCRIPT 5.9+ / TS 7
        </span>
        <span style={{ background: '#7c3aed', color: '#ffffff', fontSize: '11px', fontWeight: 700, padding: '4px 10px', borderRadius: '6px' }}>
          31 PACKAGES
        </span>
        <span style={{ background: '#1e293b', color: '#94a3b8', fontSize: '11px', fontWeight: 600, padding: '4px 10px', borderRadius: '6px', border: '1px solid #334155' }}>
          LICENSE: MIT
        </span>
      </div>

      {/* 2. Hero Presentation Card */}
      <div
        style={{
          background: 'linear-gradient(135deg, rgba(15, 23, 42, 0.95) 0%, rgba(30, 41, 59, 0.9) 100%)',
          border: '1px solid rgba(59, 130, 246, 0.3)',
          borderRadius: '16px',
          padding: '24px',
          marginBottom: '36px',
          boxShadow: '0 20px 40px -15px rgba(59, 130, 246, 0.2)',
        }}
      >
        <div style={{ borderRadius: '12px', overflow: 'hidden', border: '1px solid rgba(255,255,255,0.1)', marginBottom: '24px' }}>
          <Image
            src="/images/Effect by vnhax.net.png"
            alt="Effect - The Missing Standard Library for TypeScript"
            width={1200}
            height={630}
            priority
            style={{ width: '100%', height: 'auto', display: 'block' }}
          />
        </div>

        <div style={{ display: 'inline-block', color: '#60a5fa', fontSize: '12px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '8px' }}>
          Effect-TS / effect — Production TypeScript Runtime
        </div>
        <h1 style={{ fontSize: '28px', fontWeight: 800, color: '#ffffff', margin: '0 0 12px 0', lineHeight: 1.2 }}>
          Effect: The Standard Library for Production TypeScript
        </h1>
        <p style={{ color: '#cbd5e1', fontSize: '14px', lineHeight: 1.6, margin: '0 0 20px 0' }}>
          Effect is a library for building robust, maintainable, type-safe, and production-grade applications in TypeScript. It helps you handle the hard problems at scale: 
          <strong> typed errors</strong>, <strong>dependency injection</strong>, <strong>structured concurrency</strong>, <strong>scheduling</strong>, <strong>tracing</strong>, and <strong>unified schema validation</strong>.
        </p>

        {/* 4 Quantitative Architecture Highlights */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '12px' }}>
          <div style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', padding: '12px 16px', borderRadius: '8px' }}>
            <div style={{ color: '#38bdf8', fontSize: '20px', fontWeight: 800 }}>Effect&lt;A, E, R&gt;</div>
            <div style={{ color: '#94a3b8', fontSize: '11.5px' }}>Tri-channel Type Signature</div>
          </div>
          <div style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', padding: '12px 16px', borderRadius: '8px' }}>
            <div style={{ color: '#4ade80', fontSize: '20px', fontWeight: 800 }}>Fibers</div>
            <div style={{ color: '#94a3b8', fontSize: '11.5px' }}>Lightweight Green Threads</div>
          </div>
          <div style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', padding: '12px 16px', borderRadius: '8px' }}>
            <div style={{ color: '#a855f7', fontSize: '20px', fontWeight: 800 }}>0 Unhandled</div>
            <div style={{ color: '#94a3b8', fontSize: '11.5px' }}>Guaranteed Type-Safe Errors</div>
          </div>
          <div style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', padding: '12px 16px', borderRadius: '8px' }}>
            <div style={{ color: '#fbbf24', fontSize: '20px', fontWeight: 800 }}>OpenTelemetry</div>
            <div style={{ color: '#94a3b8', fontSize: '11.5px' }}>Built-in Distributed Tracing</div>
          </div>
        </div>
      </div>

      {/* 3. Installation & Package Manager Switcher */}
      <div style={{ marginBottom: '40px', background: '#020617', border: '1px solid #1e293b', borderRadius: '14px', padding: '24px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px', flexWrap: 'wrap', gap: '8px' }}>
          <div>
            <div style={{ color: '#38bdf8', fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.08em', fontWeight: 700 }}>
              Quick Start
            </div>
            <h2 style={{ fontSize: '20px', fontWeight: 700, color: '#f8fafc', margin: '4px 0 0 0' }}>
              Installation
            </h2>
          </div>

          <div style={{ display: 'flex', gap: '6px', background: '#0f172a', padding: '4px', borderRadius: '8px', border: '1px solid #334155' }}>
            {(['npm', 'pnpm', 'yarn', 'bun'] as const).map((mgr) => (
              <button
                key={mgr}
                type="button"
                onClick={() => setPackageManager(mgr)}
                style={{
                  padding: '4px 12px',
                  borderRadius: '6px',
                  fontSize: '11.5px',
                  fontWeight: 600,
                  border: 'none',
                  background: packageManager === mgr ? '#2563eb' : 'transparent',
                  color: packageManager === mgr ? '#ffffff' : '#94a3b8',
                  cursor: 'pointer',
                  transition: 'all 0.15s',
                }}
              >
                {mgr}
              </button>
            ))}
          </div>
        </div>

        <div style={{ position: 'relative', marginBottom: '16px' }}>
          <pre
            style={{
              background: '#090d16',
              padding: '16px 20px',
              borderRadius: '8px',
              color: '#38bdf8',
              fontSize: '14px',
              fontFamily: 'monospace',
              margin: 0,
              border: '1px solid #1e293b',
              overflowX: 'auto',
            }}
          >
            {getInstallCmd('effect')}
          </pre>
          <button
            type="button"
            onClick={() => handleCopy(getInstallCmd('effect'), 'install-core')}
            style={{
              position: 'absolute',
              right: '12px',
              top: '50%',
              transform: 'translateY(-50%)',
              background: copiedId === 'install-core' ? '#16a34a' : 'rgba(255,255,255,0.1)',
              color: '#ffffff',
              border: 'none',
              padding: '4px 12px',
              borderRadius: '6px',
              fontSize: '11.5px',
              cursor: 'pointer',
              fontWeight: 600,
            }}
          >
            {copiedId === 'install-core' ? '✓ Copied' : 'Copy'}
          </button>
        </div>

        {/* Minimal Hello World Example */}
        <div style={{ background: '#090d16', borderRadius: '8px', border: '1px solid #1e293b', overflow: 'hidden' }}>
          <div style={{ padding: '8px 16px', background: '#0f172a', borderBottom: '1px solid #1e293b', color: '#94a3b8', fontSize: '11px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span>index.ts — Idiomatic Effect Program</span>
            <button
              type="button"
              onClick={() => handleCopy(`import { Effect, Console } from "effect";\n\nconst program = Console.log("Hello from Effect 4.x!");\nEffect.runSync(program);`, 'code-hello')}
              style={{ background: 'none', border: 'none', color: copiedId === 'code-hello' ? '#4ade80' : '#94a3b8', cursor: 'pointer', fontSize: '11px' }}
            >
              {copiedId === 'code-hello' ? '✓ Copied' : 'Copy Code'}
            </button>
          </div>
          <pre
            style={{
              padding: '16px',
              margin: 0,
              color: '#f8fafc',
              fontSize: '12.5px',
              fontFamily: 'monospace',
              lineHeight: 1.6,
              overflowX: 'auto',
            }}
          >
            <span style={{ color: '#c084fc' }}>import</span> {'{ Effect, Console }'} <span style={{ color: '#c084fc' }}>from</span> <span style={{ color: '#4ade80' }}>&quot;effect&quot;</span>;<br /><br />
            <span style={{ color: '#94a3b8' }}>// Compose computations declaratively without triggering immediate execution</span><br />
            <span style={{ color: '#c084fc' }}>const</span> program = Console.log(<span style={{ color: '#4ade80' }}>&quot;Hello from Effect 4.x!&quot;</span>);<br /><br />
            <span style={{ color: '#94a3b8' }}>// Execute the effect through the runtime fiber scheduler</span><br />
            Effect.runSync(program);
          </pre>
        </div>
      </div>

      {/* 4. Compiler Requirements & tsconfig.json */}
      <div style={{ marginBottom: '40px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
          <span style={{ background: '#0284c7', color: '#fff', fontSize: '11px', fontWeight: 700, padding: '2px 8px', borderRadius: '4px' }}>
            REQUIREMENTS
          </span>
          <h2 style={{ fontSize: '20px', fontWeight: 700, color: '#0f172a', margin: 0 }}>
            TypeScript &amp; Runtime Requirements
          </h2>
        </div>
        <p style={{ color: '#475569', fontSize: '13px', margin: '0 0 16px 0' }}>
          Effect is engineered to take full advantage of TypeScript&apos;s strongest type inference engine. Verify your project meets these compiler constraints:
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '16px', marginBottom: '20px' }}>
          {/* Card: TypeScript Requirements */}
          <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '10px', padding: '18px' }}>
            <div style={{ color: '#0369a1', fontWeight: 700, fontSize: '14px', marginBottom: '6px' }}>
              📘 TypeScript 5.9 or newer &amp; TypeScript 7
            </div>
            <p style={{ color: '#475569', fontSize: '12.5px', lineHeight: 1.6, margin: 0 }}>
              <strong>TypeScript 5.9+</strong> is the required minimum. <strong>TypeScript 7</strong> is strongly recommended for the best type-checking performance and full compatibility with Effect&apos;s native TypeScript language tooling (<a href="https://github.com/Effect-TS/tsgo" target="_blank" rel="noopener noreferrer" style={{ color: '#0284c7' }}>tsgo</a>).
            </p>
          </div>

          {/* Card: Node.js Requirements */}
          <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '10px', padding: '18px' }}>
            <div style={{ color: '#15803d', fontWeight: 700, fontSize: '14px', marginBottom: '6px' }}>
              🟢 Node.js 18 or newer (Node.js 22.16+ Recommended)
            </div>
            <p style={{ color: '#475569', fontSize: '12.5px', lineHeight: 1.6, margin: 0 }}>
              <strong>Node.js 18+</strong> is the general baseline runtime for running Effect on Node.js. Specific integration packages require newer runtimes; for instance, <code>@effect/sql-sqlite-node</code> requires <strong>Node.js 22.16 or newer</strong> for native SQLite bindings.
            </p>
          </div>
        </div>

        {/* tsconfig.json setup */}
        <div style={{ background: '#020617', border: '1px solid #1e293b', borderRadius: '10px', overflow: 'hidden' }}>
          <div style={{ padding: '10px 16px', background: '#0f172a', borderBottom: '1px solid #1e293b', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ color: '#f8fafc', fontSize: '12px', fontWeight: 600 }}>tsconfig.json — Strict Type-Checking Configuration</span>
            <button
              type="button"
              onClick={() => handleCopy(`{\n  "compilerOptions": {\n    "strict": true,\n    "exactOptionalPropertyTypes": true,\n    "noUncheckedIndexedAccess": true,\n    "target": "ES2022",\n    "module": "NodeNext",\n    "moduleResolution": "NodeNext"\n  }\n}`, 'tsconfig')}
              style={{ background: 'none', border: 'none', color: copiedId === 'tsconfig' ? '#4ade80' : '#94a3b8', cursor: 'pointer', fontSize: '11px', fontWeight: 600 }}
            >
              {copiedId === 'tsconfig' ? '✓ Copied' : 'Copy tsconfig'}
            </button>
          </div>
          <pre style={{ padding: '16px', margin: 0, color: '#38bdf8', fontSize: '12.5px', fontFamily: 'monospace', lineHeight: 1.6, overflowX: 'auto' }}>
{`{
  "compilerOptions": {
    "strict": true,
    "exactOptionalPropertyTypes": true,
    "noUncheckedIndexedAccess": true,
    "target": "ES2022",
    "module": "NodeNext",
    "moduleResolution": "NodeNext"
  }
}`}
          </pre>
        </div>
      </div>

      {/* 5. Complete Packages Ecosystem Matrix (All 31 Packages) */}
      <div style={{ marginBottom: '44px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px', flexWrap: 'wrap', gap: '8px' }}>
          <div>
            <span style={{ background: '#7c3aed', color: '#fff', fontSize: '11px', fontWeight: 700, padding: '2px 8px', borderRadius: '4px', marginRight: '8px' }}>
              ECOSYSTEM
            </span>
            <h2 style={{ fontSize: '20px', fontWeight: 700, color: '#0f172a', display: 'inline' }}>
              Official Effect Packages ({PACKAGES.length})
            </h2>
          </div>

          <input
            type="text"
            placeholder="Search packages..."
            value={pkgSearch}
            onChange={(e) => setPkgSearch(e.target.value)}
            style={{
              padding: '6px 12px',
              borderRadius: '6px',
              border: '1px solid #cbd5e1',
              fontSize: '12px',
              outline: 'none',
              width: '220px',
            }}
          />
        </div>

        {/* Filter categories */}
        <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', marginBottom: '16px' }}>
          {[
            { id: 'all', label: 'All Packages' },
            { id: 'platform', label: 'Platform Runtimes (6)' },
            { id: 'sql', label: 'SQL & DB Drivers (12)' },
            { id: 'ai', label: 'AI & LLM Integrations (6)' },
            { id: 'atom', label: 'UI Reactive Atoms (3)' },
            { id: 'tooling', label: 'Tooling & Testing (5)' },
          ].map((cat) => (
            <button
              key={cat.id}
              type="button"
              onClick={() => setSelectedPkgTab(cat.id as any)}
              style={{
                padding: '4px 10px',
                borderRadius: '6px',
                fontSize: '11.5px',
                fontWeight: 600,
                border: selectedPkgTab === cat.id ? '1px solid #7c3aed' : '1px solid #e2e8f0',
                background: selectedPkgTab === cat.id ? '#7c3aed' : '#ffffff',
                color: selectedPkgTab === cat.id ? '#ffffff' : '#64748b',
                cursor: 'pointer',
              }}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Packages Cards Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '12px' }}>
          {filteredPackages.map((pkg) => (
            <div
              key={pkg.name}
              style={{
                background: '#ffffff',
                border: '1px solid #e2e8f0',
                borderRadius: '8px',
                padding: '14px 16px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                transition: 'border 0.2s',
              }}
            >
              <div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '6px' }}>
                  <code style={{ fontSize: '13px', fontWeight: 700, color: '#7c3aed', fontFamily: 'monospace' }}>
                    {pkg.name}
                  </code>
                  {pkg.badge && (
                    <span style={{ background: '#fef3c7', color: '#b45309', fontSize: '10px', fontWeight: 700, padding: '2px 6px', borderRadius: '4px' }}>
                      {pkg.badge}
                    </span>
                  )}
                </div>
                <p style={{ color: '#475569', fontSize: '12px', lineHeight: 1.5, margin: '0 0 12px 0' }}>
                  {pkg.description}
                </p>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: '#f8fafc', padding: '6px 10px', borderRadius: '6px', border: '1px solid #e2e8f0' }}>
                <code style={{ fontSize: '11px', color: '#334155', fontFamily: 'monospace' }}>
                  {getInstallCmd(pkg.name)}
                </code>
                <button
                  type="button"
                  onClick={() => handleCopy(getInstallCmd(pkg.name), `pkg-${pkg.name}`)}
                  style={{
                    background: 'none',
                    border: 'none',
                    color: copiedId === `pkg-${pkg.name}` ? '#16a34a' : '#94a3b8',
                    cursor: 'pointer',
                    fontSize: '12px',
                    fontWeight: 600,
                  }}
                  title="Copy install command"
                >
                  {copiedId === `pkg-${pkg.name}` ? '✓' : '📋'}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 6. Long-Term Support & Versions */}
      <div style={{ marginBottom: '40px', background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '12px', padding: '20px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
          <span style={{ background: '#059669', color: '#fff', fontSize: '11px', fontWeight: 700, padding: '2px 8px', borderRadius: '4px' }}>
            LTS RELEASES
          </span>
          <h2 style={{ fontSize: '18px', fontWeight: 700, color: '#0f172a', margin: 0 }}>
            Long-Term Support: Effect 4.x &amp; Effect 3.x
          </h2>
        </div>
        <p style={{ color: '#475569', fontSize: '13px', margin: '0 0 16px 0', lineHeight: 1.6 }}>
          Teams depend on Effect for production architectures they expect to run for years. Effect provides clear long-term support (LTS) lifecycle stability:
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '14px' }}>
          <div style={{ background: '#ffffff', border: '1px solid #cbd5e1', borderRadius: '8px', padding: '16px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
              <span style={{ background: '#2563eb', color: '#fff', fontSize: '11px', fontWeight: 700, padding: '2px 6px', borderRadius: '4px' }}>
                LTS
              </span>
              <strong style={{ fontSize: '14px', color: '#0f172a' }}>Effect 4.x</strong>
            </div>
            <p style={{ color: '#64748b', fontSize: '12px', lineHeight: 1.5, margin: 0 }}>
              Active Long-Term Support milestone. Incorporates zero-cost fiber scheduling, unified Schema validation, optimized microtask dispatching, and full TypeScript 7 forward compatibility.
            </p>
          </div>

          <div style={{ background: '#ffffff', border: '1px solid #cbd5e1', borderRadius: '8px', padding: '16px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
              <span style={{ background: '#64748b', color: '#fff', fontSize: '11px', fontWeight: 700, padding: '2px 6px', borderRadius: '4px' }}>
                Maintenance
              </span>
              <strong style={{ fontSize: '14px', color: '#0f172a' }}>Effect 3.x</strong>
            </div>
            <p style={{ color: '#64748b', fontSize: '12px', lineHeight: 1.5, margin: 0 }}>
              The established major release powering thousands of production services. Receives critical security patches and backwards-compatible maintenance updates.
            </p>
          </div>

          <div style={{ background: '#ffffff', border: '1px solid #cbd5e1', borderRadius: '8px', padding: '16px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
              <span style={{ background: '#10b981', color: '#fff', fontSize: '11px', fontWeight: 700, padding: '2px 6px', borderRadius: '4px' }}>
                Guide
              </span>
              <strong style={{ fontSize: '14px', color: '#0f172a' }}>Migration Guide</strong>
            </div>
            <p style={{ color: '#64748b', fontSize: '12px', lineHeight: 1.5, margin: 0 }}>
              Upgrading from Effect 3.x to 4.x is smooth with automated codemods and the comprehensive <a href="https://github.com/Effect-TS/effect/blob/main/MIGRATION.md" target="_blank" rel="noopener noreferrer" style={{ color: '#2563eb', fontWeight: 600 }}>MIGRATION.md</a> guide.
            </p>
          </div>
        </div>
      </div>

      {/* 7. Let's Talk: Production Support & Adoption */}
      <div style={{ marginBottom: '40px', background: 'linear-gradient(135deg, rgba(30, 27, 75, 0.6) 0%, rgba(15, 23, 42, 0.8) 100%)', border: '1px solid rgba(139, 92, 246, 0.3)', borderRadius: '14px', padding: '24px', color: '#f8fafc' }}>
        <div style={{ display: 'inline-block', color: '#c084fc', fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '6px' }}>
          Enterprise &amp; Community Partnership
        </div>
        <h2 style={{ fontSize: '22px', fontWeight: 800, color: '#ffffff', margin: '0 0 10px 0' }}>
          Let&apos;s Talk
        </h2>
        <p style={{ color: '#cbd5e1', fontSize: '13.5px', lineHeight: 1.6, margin: '0 0 20px 0' }}>
          Whether your team is considering Effect, rolling it out, or already running it in high-throughput production, the core team would love to hear from you:
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '14px' }}>
          <div style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', padding: '16px', borderRadius: '8px' }}>
            <strong style={{ color: '#38bdf8', fontSize: '14px', display: 'block', marginBottom: '6px' }}>
              💬 Talk to the Maintainers
            </strong>
            <p style={{ color: '#cbd5e1', fontSize: '12px', lineHeight: 1.5, margin: 0 }}>
              Introduce your team on <a href="https://discord.gg/effect-ts" target="_blank" rel="noopener noreferrer" style={{ color: '#60a5fa' }}>Discord</a> or email <a href="mailto:contact@effectful.co" style={{ color: '#60a5fa' }}>contact@effectful.co</a>. Happy to connect privately on Slack or Discord for feedback and architectural guidance.
            </p>
          </div>

          <div style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', padding: '16px', borderRadius: '8px' }}>
            <strong style={{ color: '#4ade80', fontSize: '14px', display: 'block', marginBottom: '6px' }}>
              🛡️ Production Support
            </strong>
            <p style={{ color: '#cbd5e1', fontSize: '12px', lineHeight: 1.5, margin: 0 }}>
              Exploring dedicated support for mission-critical enterprise systems. If your organization has specific SLA, vulnerability auditing, or private roadmap needs, reach out directly.
            </p>
          </div>

          <div style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', padding: '16px', borderRadius: '8px' }}>
            <strong style={{ color: '#fbbf24', fontSize: '14px', display: 'block', marginBottom: '6px' }}>
              🚀 Adoption Help
            </strong>
            <p style={{ color: '#cbd5e1', fontSize: '12px', lineHeight: 1.5, margin: 0 }}>
              Official <a href="https://effect.website/adoption-partners" target="_blank" rel="noopener noreferrer" style={{ color: '#fde047' }}>Adoption Partners</a> offer hands-on implementation, consulting, team extension, staff training, and commercial support.
            </p>
          </div>
        </div>
      </div>

      {/* 8. Links & Community Directory */}
      <div style={{ marginBottom: '40px' }}>
        <h2 style={{ fontSize: '18px', fontWeight: 700, color: '#0f172a', margin: '0 0 14px 0' }}>
          Official Links &amp; Community Hub
        </h2>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '10px' }}>
          {[
            { title: 'Official Website', subtitle: 'Documentation, guides & news', url: 'https://effect.website', icon: '🌐' },
            { title: 'Discord Community', subtitle: 'Talk to core team & developers', url: 'https://discord.gg/effect-ts', icon: '💬' },
            { title: 'Community Hub', subtitle: 'Meetups, events & workshops', url: 'https://effect.website/community-hub', icon: '👥' },
            { title: 'GitHub Issues', subtitle: 'Bug reports & feature RFCs', url: 'https://github.com/Effect-TS/effect/issues', icon: '🐛' },
            { title: 'Effect Jobs', subtitle: 'Companies hiring Effect engineers', url: 'https://effect.website/effect-jobs', icon: '💼' },
            { title: 'Follow on X (Twitter)', subtitle: '@EffectTS_ announcements', url: 'https://x.com/EffectTS_', icon: '🐦' },
            { title: 'Follow on Bluesky', subtitle: '@effect-ts.bsky.social', url: 'https://bsky.app/profile/effect-ts.bsky.social', icon: '🦋' },
            { title: 'Follow on LinkedIn', subtitle: 'Company news & case studies', url: 'https://www.linkedin.com/company/effect-ts', icon: '👔' },
          ].map((link) => (
            <a
              key={link.title}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                padding: '12px 14px',
                background: '#ffffff',
                border: '1px solid #e2e8f0',
                borderRadius: '8px',
                textDecoration: 'none',
                transition: 'all 0.15s ease',
              }}
            >
              <span style={{ fontSize: '20px' }}>{link.icon}</span>
              <div>
                <div style={{ fontSize: '13px', fontWeight: 700, color: '#0f172a' }}>{link.title}</div>
                <div style={{ fontSize: '11px', color: '#64748b' }}>{link.subtitle}</div>
              </div>
            </a>
          ))}
        </div>
      </div>

      {/* 9. License & Legal Card */}
      <div style={{ marginBottom: '32px', background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '10px', padding: '16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '8px' }}>
        <div>
          <strong style={{ color: '#0f172a', fontSize: '13px' }}>License: MIT License</strong>
          <p style={{ color: '#64748b', fontSize: '12px', margin: '2px 0 0 0' }}>
            Effect is 100% open-source software, free for both personal and enterprise commercial use.
          </p>
        </div>
        <a
          href="https://github.com/Effect-TS/effect/blob/main/LICENSE"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            background: '#ffffff',
            border: '1px solid #cbd5e1',
            padding: '6px 14px',
            borderRadius: '6px',
            fontSize: '12px',
            fontWeight: 600,
            color: '#0f172a',
            textDecoration: 'none',
          }}
        >
          View LICENSE ↗
        </a>
      </div>
    </div>
  );
}
