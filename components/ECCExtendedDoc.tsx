'use client';

import React, { useState } from 'react';
import Image from 'next/image';

interface AgentInfo {
  id: string;
  name: string;
  category: string;
  badge: string;
  installCommand: string;
  configPath: string;
  notes: string;
  quickAction: string;
}

const AGENTS: AgentInfo[] = [
  {
    id: 'claude-code',
    name: 'Claude Code',
    category: 'CLI & Plugin',
    badge: 'Flagship Harness',
    installCommand: '# Recommended: Guided Setup\nnpx ecc-universal@2.2.3 setup\n\n# Or inside Claude Code session:\n/plugin marketplace add https://github.com/affaan-m/ECC\n/plugin install ecc@ecc',
    configPath: '~/.claude/plugins/ecc@ecc & ~/.claude/rules/ecc/',
    notes: 'Primary supported harness. Guided installer lets you pick Global User or Project scope with Standard, Strict, or Minimal hook profiles. Inside Claude, run /ecc:configure-ecc to modify settings.',
    quickAction: '/ecc:configure-ecc',
  },
  {
    id: 'codex',
    name: 'Codex',
    category: 'CLI & IDE',
    badge: 'Native Plugin',
    installCommand: '# Native Marketplace Plugin:\ncodex plugin marketplace add affaan-m/ECC\ncodex plugin add ecc@ecc\n\n# Or multi-harness guided wizard:\nnpx ecc-universal@2.2.3 install --guided --harness codex',
    configPath: '.codex/ & root AGENTS.md',
    notes: 'Installs as a native repo-marketplace plugin into CODEX_HOME. Hooks require explicit user trust approval. Inside Codex session, run $configure-ecc for guided configuration.',
    quickAction: '$configure-ecc',
  },
  {
    id: 'cursor',
    name: 'Cursor',
    category: 'IDE / Editor',
    badge: 'Project Adapter',
    installCommand: './install.sh --profile minimal --target cursor\n# Or via universal runner:\nnpx ecc-universal@2.2.3 install --target cursor --profile minimal',
    configPath: '.cursor/agents/ecc-*.md & .cursor/rules/',
    notes: 'Installs 68 agent personas directly under .cursor/agents/ecc-*.md and rules under .cursor/rules/. Keeps Cursor context scoped without dumping massive unneeded AGENTS.md.',
    quickAction: '@cursor /plan Build feature with TDD',
  },
  {
    id: 'opencode',
    name: 'OpenCode',
    category: 'Open Source CLI',
    badge: 'Full Hook Runtime',
    installCommand: 'git clone https://github.com/affaan-m/ECC.git ~/.ecc\ncd ~/.ecc && npm install && npm run build:opencode\n./install.sh --profile full --target opencode --enable-hooks',
    configPath: '.opencode/skills/ & .opencode/agents/',
    notes: 'Builds dedicated OpenCode plugin payload before installation. Enables full runtime hooks, agent dispatching, and automated test-driven development loops.',
    quickAction: 'opencode run "TDD workflow"',
  },
  {
    id: 'github-copilot',
    name: 'GitHub Copilot',
    category: 'IDE / Extension',
    badge: 'Instruction Prompts',
    installCommand: '# Copy instruction layer & prompt files to project:\nmkdir -p .github/prompts .vscode\ncp .github/copilot-instructions.md your-project/.github/\ncp -r .github/prompts/* your-project/.github/prompts/',
    configPath: '.github/copilot-instructions.md & .github/prompts/',
    notes: 'Requires chat.promptFiles enabled in .vscode/settings.json. Provides reusable /plan, /tdd, /security-review, /build-fix, and /refactor slash prompts in Copilot Chat.',
    quickAction: '/plan Architecture plan',
  },
  {
    id: 'gemini-cli',
    name: 'Gemini CLI',
    category: 'CLI Assistant',
    badge: 'Gemini Adapter',
    installCommand: './install.sh --profile minimal --target gemini\n# Or via universal runner:\nnpx ecc-universal@2.2.3 install --target gemini --profile minimal',
    configPath: '.gemini/skills/ & .gemini/config/',
    notes: 'Installs project-local .gemini/ adapter with lazy-loaded skills. Optimizes Gemini context window by pulling only relevant domain personas on demand.',
    quickAction: 'gemini run "security-review"',
  },
  {
    id: 'zed',
    name: 'Zed Editor',
    category: 'High-Performance IDE',
    badge: 'Zed Adapter',
    installCommand: './install.sh --profile minimal --target zed\n# Or via universal runner:\nnpx ecc-universal@2.2.3 install --target zed --profile minimal',
    configPath: '.zed/prompts/ & .zed/rules/',
    notes: 'Configures Zed assistant panel with structured ECC engineering prompts and TDD enforcement shims.',
    quickAction: '/tdd Implement failing test first',
  },
  {
    id: 'antigravity',
    name: 'Antigravity (AGY)',
    category: 'Agentic Coding IDE',
    badge: 'AGY Guide Native',
    installCommand: '# Project-level setup:\n./install.sh --profile minimal --target antigravity\n\n# Or via agy CLI:\nagy skill add affaan-m/ECC',
    configPath: '.agents/skills/ & ~/.gemini/config/skills/ecc/',
    notes: 'Fully integrated with Google Antigravity 2.0. Discovered automatically via Workspace Customization Roots (.agents/skills) with zero runtime dependencies.',
    quickAction: 'agy run /plan',
  },
  {
    id: 'qwen',
    name: 'Qwen CLI',
    category: 'Alibaba Cloud CLI',
    badge: 'Qwen Optimized',
    installCommand: './install.sh --profile minimal --target qwen\n# Or via universal runner:\nnpx ecc-universal@2.2.3 install --target qwen --profile minimal',
    configPath: '.qwen/skills/ & .qwen/agents/',
    notes: 'Tailored prompt scaffolding for Qwen coding LLMs. Enforces strict architecture boundaries, typing standards, and clean code hygiene.',
    quickAction: 'qwen exec /refactor',
  },
  {
    id: 'hermes-agent',
    name: 'Hermes Agent',
    category: 'Autonomous Agent',
    badge: 'Hermes Native',
    installCommand: './install.sh --profile minimal --target hermes\n# Or via hermes CLI:\nhermes skill add affaan-m/ECC',
    configPath: '.hermes/skills/ & .hermes/profiles/',
    notes: 'Installs into active Hermes agent profile. Connects 68 domain personas and AgentShield safety scanning to autonomous execution loops.',
    quickAction: 'hermes run /security-review',
  },
  {
    id: 'openclaw',
    name: 'OpenClaw',
    category: 'Open Source Agent',
    badge: 'Home Directory',
    installCommand: './install.sh --profile minimal --target openclaw\n# Or manual install:\nmkdir -p ~/.openclaw/skills/ && cp -r skills/* ~/.openclaw/skills/',
    configPath: '~/.openclaw/skills/ecc/',
    notes: 'Installs managed skills into ~/.openclaw/ directory. Works seamlessly across multi-agent swarms with persistent SQLite memory layers.',
    quickAction: 'openclaw agent --skill tdd',
  },
  {
    id: 'kimi-code',
    name: 'Kimi Code',
    category: 'Moonshot AI CLI',
    badge: 'Sponsor Partner',
    installCommand: '# Guided Multi-Harness Setup:\nnpx ecc-universal@2.2.3 install --guided --harness kimi\n\n# Or project adapter:\n./install.sh --profile minimal --target kimi',
    configPath: './.kimi-code/skills/ & ./.kimi-code/agents/',
    notes: 'Official sponsor partner integration. Installs managed project files under ./.kimi-code. Fast context caching ensures minimal token latency with Kimi 2.0.',
    quickAction: 'kimi exec /plan',
  },
  {
    id: 'codebuddy',
    name: 'CodeBuddy',
    category: 'IDE / Extension',
    badge: 'Buddy Adapter',
    installCommand: './install.sh --profile minimal --target codebuddy\n# Or via universal runner:\nnpx ecc-universal@2.2.3 install --target codebuddy --profile minimal',
    configPath: '.codebuddy/skills/ & .codebuddy/agents/',
    notes: 'Adds ECC personas and automated verification tools to CodeBuddy interactive assistant sessions.',
    quickAction: 'codebuddy run /build-fix',
  },
  {
    id: 'joycode',
    name: 'JoyCode',
    category: 'Agent Harness',
    badge: 'JoyCode Native',
    installCommand: './install.sh --profile minimal --target joycode\n# Or via universal runner:\nnpx ecc-universal@2.2.3 install --target joycode --profile minimal',
    configPath: '.joycode/skills/ & .joycode/agents/',
    notes: 'Brings TDD, code review, and build repair capabilities to JoyCode multi-turn terminal sessions.',
    quickAction: 'joycode exec /tdd',
  },
  {
    id: 'kiro',
    name: 'Kiro',
    category: 'Steering Engine',
    badge: 'Steering Native',
    installCommand: '# Project steering setup:\n./install.sh --profile minimal --target kiro\n# Copies rules to:\n.kiro/steering/ecc-workflow.md',
    configPath: '.kiro/steering/ecc-workflow.md',
    notes: 'Integrates ECC core engineering discipline (plan -> test -> implement -> review -> verify) directly into Kiro steering context.',
    quickAction: '/plan Feature roadmap',
  },
  {
    id: 'trae',
    name: 'Trae',
    category: 'AI IDE',
    badge: 'Trae Adapter',
    installCommand: './install.sh --profile minimal --target trae\n# Or via universal runner:\nnpx ecc-universal@2.2.3 install --target trae --profile minimal',
    configPath: '.trae/skills/ & .trae/agents/',
    notes: 'Provides Trae AI IDE with 68 specialized agent personas and 293 lazy-loaded engineering skills.',
    quickAction: 'trae run /audit',
  },
];

export default function ECCExtendedDoc() {
  const [selectedAgent, setSelectedAgent] = useState<string>('claude-code');
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [activeGuideTab, setActiveGuideTab] = useState<'shorthand' | 'longform' | 'security'>('shorthand');
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  const activeAgentData = AGENTS.find((a) => a.id === selectedAgent) || AGENTS[0];

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div style={{ maxWidth: '1100px', margin: '0 auto', fontFamily: 'inherit' }}>
      {/* 1. Top Badges Bar with Real SVG Assets */}
      <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', marginBottom: '24px', alignItems: 'center' }}>
        <a href="https://github.com/affaan-m/ECC" target="_blank" rel="noopener noreferrer" style={{ display: 'inline-flex' }}>
          <Image
            src="/ECC/star-history-trending.svg"
            alt="GitHub Trending Repository of the Day"
            width={180}
            height={46}
            style={{ height: '38px', width: 'auto' }}
          />
        </a>
        <a href="https://github.com/affaan-m/ECC" target="_blank" rel="noopener noreferrer" style={{ display: 'inline-flex' }}>
          <Image
            src="/ECC/star-history-rank.svg"
            alt="Star History Global Rank"
            width={180}
            height={46}
            style={{ height: '38px', width: 'auto' }}
          />
        </a>

        <span style={{ background: '#3b82f6', color: '#ffffff', fontSize: '11px', fontWeight: 700, padding: '5px 10px', borderRadius: '6px' }}>
          68 AGENTS
        </span>
        <span style={{ background: '#10b981', color: '#ffffff', fontSize: '11px', fontWeight: 700, padding: '5px 10px', borderRadius: '6px' }}>
          293 SKILLS
        </span>
        <span style={{ background: '#8b5cf6', color: '#ffffff', fontSize: '11px', fontWeight: 700, padding: '5px 10px', borderRadius: '6px' }}>
          94 COMMANDS
        </span>
        <span style={{ background: '#f59e0b', color: '#ffffff', fontSize: '11px', fontWeight: 700, padding: '5px 10px', borderRadius: '6px' }}>
          AGENTSHIELD VERIFIED
        </span>
        <span style={{ background: '#1e293b', color: '#94a3b8', fontSize: '11px', fontWeight: 600, padding: '5px 10px', borderRadius: '6px', border: '1px solid #334155' }}>
          MIT LICENSE
        </span>
      </div>

      {/* 2. Hero Presentation Banner Card */}
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
        {/* Real Hero Banner Image from public/ECC/hero.png */}
        <div style={{ borderRadius: '12px', overflow: 'hidden', border: '1px solid rgba(255,255,255,0.1)', marginBottom: '24px' }}>
          <Image
            src="/ECC/hero.png"
            alt="ECC - The Agent Harness Operating System"
            width={1200}
            height={480}
            priority
            style={{ width: '100%', height: 'auto', display: 'block' }}
          />
        </div>

        <div style={{ display: 'inline-block', color: '#60a5fa', fontSize: '12px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '8px' }}>
          affaan-m / ECC — The Agent Harness Operating System
        </div>
        <h1 style={{ fontSize: '26px', fontWeight: 800, color: '#ffffff', margin: '0 0 12px 0', lineHeight: 1.25 }}>
          Everything Claude Code: Coordinated Engineering Squad for Coding Agents
        </h1>
        <p style={{ color: '#cbd5e1', fontSize: '14px', lineHeight: 1.6, margin: '0 0 16px 0' }}>
          Your AI coding agent can write code, but <strong>ECC</strong> gives it a coordinated engineering system and disciplined toolbox: it plans before it builds, verifies changes with tests, reviews its own work from fresh context, remembers what matters across terminal sessions, and turns repeated wins into reusable workflows.
        </p>

        {/* The 7-Step Core Engineering Loop */}
        <div
          style={{
            background: 'rgba(2, 6, 23, 0.8)',
            border: '1px solid rgba(59, 130, 246, 0.4)',
            borderRadius: '10px',
            padding: '14px 18px',
            marginBottom: '20px',
          }}
        >
          <div style={{ color: '#94a3b8', fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '6px', fontWeight: 700 }}>
            Core Engineering Discipline Loop:
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap', fontFamily: 'monospace', fontSize: '13px', fontWeight: 700 }}>
            <span style={{ color: '#38bdf8' }}>plan</span>
            <span style={{ color: '#64748b' }}>➔</span>
            <span style={{ color: '#4ade80' }}>test</span>
            <span style={{ color: '#64748b' }}>➔</span>
            <span style={{ color: '#fbbf24' }}>implement</span>
            <span style={{ color: '#64748b' }}>➔</span>
            <span style={{ color: '#a855f7' }}>review</span>
            <span style={{ color: '#64748b' }}>➔</span>
            <span style={{ color: '#34d399' }}>verify</span>
            <span style={{ color: '#64748b' }}>➔</span>
            <span style={{ color: '#f43f5e' }}>remember</span>
            <span style={{ color: '#64748b' }}>➔</span>
            <span style={{ color: '#60a5fa' }}>improve</span>
          </div>
        </div>

        {/* 4 Core Quantitative Pillars */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '12px' }}>
          <div style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', padding: '12px 16px', borderRadius: '8px' }}>
            <div style={{ color: '#38bdf8', fontSize: '20px', fontWeight: 800 }}>68 Agents</div>
            <div style={{ color: '#94a3b8', fontSize: '11.5px' }}>Domain Persona Specialists</div>
          </div>
          <div style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', padding: '12px 16px', borderRadius: '8px' }}>
            <div style={{ color: '#4ade80', fontSize: '20px', fontWeight: 800 }}>293 Skills</div>
            <div style={{ color: '#94a3b8', fontSize: '11.5px' }}>Lazy-Loaded Engineering Modules</div>
          </div>
          <div style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', padding: '12px 16px', borderRadius: '8px' }}>
            <div style={{ color: '#a855f7', fontSize: '20px', fontWeight: 800 }}>94 Commands</div>
            <div style={{ color: '#94a3b8', fontSize: '11.5px' }}>Interactive Workflow Shims</div>
          </div>
          <div style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', padding: '12px 16px', borderRadius: '8px' }}>
            <div style={{ color: '#fbbf24', fontSize: '20px', fontWeight: 800 }}>0 Bloat</div>
            <div style={{ color: '#94a3b8', fontSize: '11.5px' }}>On-Demand Context Loading</div>
          </div>
        </div>
      </div>

      {/* 3. Interactive 16-Agent Harness Installation Matrix */}
      <div style={{ marginBottom: '44px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
          <span style={{ background: '#2563eb', color: '#fff', fontSize: '11px', fontWeight: 700, padding: '2px 8px', borderRadius: '4px' }}>
            ALL 16 AGENTS
          </span>
          <h2 style={{ fontSize: '20px', fontWeight: 700, color: '#0f172a', margin: 0 }}>
            Universal Coding Agent Installation Hub
          </h2>
        </div>
        <p style={{ color: '#475569', fontSize: '13px', margin: '0 0 16px 0' }}>
          Select your coding harness below to view exact CLI commands, config paths, trust notes, and quick action prompts.
        </p>

        {/* Agent Buttons Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(130px, 1fr))',
            gap: '6px',
            marginBottom: '16px',
          }}
        >
          {AGENTS.map((agent) => {
            const isSelected = selectedAgent === agent.id;
            return (
              <button
                key={agent.id}
                type="button"
                onClick={() => setSelectedAgent(agent.id)}
                style={{
                  padding: '8px 10px',
                  borderRadius: '6px',
                  border: isSelected ? '2px solid #2563eb' : '1px solid #d1d5db',
                  background: isSelected ? '#eff6ff' : '#ffffff',
                  color: isSelected ? '#1e40af' : '#374151',
                  fontWeight: isSelected ? 700 : 500,
                  fontSize: '11.5px',
                  textAlign: 'left',
                  cursor: 'pointer',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '2px',
                  transition: 'all 0.15s ease',
                }}
              >
                <span>{agent.name}</span>
                <span style={{ fontSize: '9.5px', color: isSelected ? '#3b82f6' : '#9ca3af' }}>{agent.category}</span>
              </button>
            );
          })}
        </div>

        {/* Selected Agent Details Box */}
        <div
          style={{
            background: '#0f172a',
            borderRadius: '12px',
            padding: '24px',
            border: '1px solid #1e293b',
            boxShadow: '0 10px 25px -5px rgba(0,0,0,0.3)',
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px', flexWrap: 'wrap', gap: '8px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <span style={{ color: '#38bdf8', fontSize: '18px', fontWeight: 800 }}>{activeAgentData.name}</span>
              <span style={{ background: 'rgba(56, 189, 248, 0.15)', color: '#38bdf8', fontSize: '11px', fontWeight: 600, padding: '2px 8px', borderRadius: '4px', border: '1px solid rgba(56, 189, 248, 0.3)' }}>
                {activeAgentData.badge}
              </span>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ color: '#94a3b8', fontSize: '11px' }}>Quick Start:</span>
              <code style={{ background: '#1e293b', color: '#4ade80', padding: '3px 8px', borderRadius: '4px', fontSize: '11px', fontFamily: 'monospace' }}>
                {activeAgentData.quickAction}
              </code>
            </div>
          </div>

          <div style={{ marginBottom: '14px' }}>
            <div style={{ color: '#94a3b8', fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '6px' }}>
              Target Config / Manifest Path
            </div>
            <code style={{ color: '#f1f5f9', background: '#1e293b', padding: '4px 10px', borderRadius: '4px', fontSize: '12px', display: 'inline-block' }}>
              {activeAgentData.configPath}
            </code>
          </div>

          <div style={{ marginBottom: '16px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
              <span style={{ color: '#94a3b8', fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                Installation & Setup Command
              </span>
              <button
                type="button"
                onClick={() => handleCopy(activeAgentData.installCommand, activeAgentData.id)}
                style={{
                  background: copiedId === activeAgentData.id ? '#16a34a' : 'rgba(255,255,255,0.1)',
                  color: '#ffffff',
                  border: 'none',
                  padding: '3px 10px',
                  borderRadius: '4px',
                  fontSize: '11px',
                  cursor: 'pointer',
                  fontWeight: 600,
                  transition: 'background 0.2s',
                }}
              >
                {copiedId === activeAgentData.id ? '✓ Copied' : 'Copy Command'}
              </button>
            </div>
            <pre
              style={{
                background: '#020617',
                padding: '14px 16px',
                borderRadius: '8px',
                color: '#38bdf8',
                fontSize: '12px',
                lineHeight: 1.5,
                margin: 0,
                overflowX: 'auto',
                fontFamily: 'monospace',
                border: '1px solid #1e293b',
              }}
            >
              {activeAgentData.installCommand}
            </pre>
          </div>

          <div style={{ background: 'rgba(255,255,255,0.04)', borderRadius: '8px', padding: '12px 16px', borderLeft: '3px solid #38bdf8' }}>
            <div style={{ color: '#e2e8f0', fontSize: '12px', lineHeight: 1.6 }}>
              <strong>Harness Guidance:</strong> {activeAgentData.notes}
            </div>
          </div>
        </div>
      </div>

      {/* 4. Visual Guides & Reference Cards Gallery */}
      <div style={{ marginBottom: '44px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px', flexWrap: 'wrap', gap: '8px' }}>
          <div>
            <span style={{ background: '#7c3aed', color: '#fff', fontSize: '11px', fontWeight: 700, padding: '2px 8px', borderRadius: '4px', marginRight: '8px' }}>
              WORKFLOW GUIDES
            </span>
            <h2 style={{ fontSize: '20px', fontWeight: 700, color: '#0f172a', display: 'inline' }}>
              Architecture & Reference Cards
            </h2>
          </div>

          <div style={{ display: 'flex', gap: '6px' }}>
            <button
              type="button"
              onClick={() => setActiveGuideTab('shorthand')}
              style={{
                padding: '4px 12px',
                borderRadius: '6px',
                fontSize: '11.5px',
                fontWeight: 600,
                border: activeGuideTab === 'shorthand' ? '1px solid #7c3aed' : '1px solid #e2e8f0',
                background: activeGuideTab === 'shorthand' ? '#7c3aed' : '#ffffff',
                color: activeGuideTab === 'shorthand' ? '#ffffff' : '#64748b',
                cursor: 'pointer',
              }}
            >
              Shorthand Guide
            </button>
            <button
              type="button"
              onClick={() => setActiveGuideTab('longform')}
              style={{
                padding: '4px 12px',
                borderRadius: '6px',
                fontSize: '11.5px',
                fontWeight: 600,
                border: activeGuideTab === 'longform' ? '1px solid #7c3aed' : '1px solid #e2e8f0',
                background: activeGuideTab === 'longform' ? '#7c3aed' : '#ffffff',
                color: activeGuideTab === 'longform' ? '#ffffff' : '#64748b',
                cursor: 'pointer',
              }}
            >
              Longform Guide
            </button>
            <button
              type="button"
              onClick={() => setActiveGuideTab('security')}
              style={{
                padding: '4px 12px',
                borderRadius: '6px',
                fontSize: '11.5px',
                fontWeight: 600,
                border: activeGuideTab === 'security' ? '1px solid #7c3aed' : '1px solid #e2e8f0',
                background: activeGuideTab === 'security' ? '#7c3aed' : '#ffffff',
                color: activeGuideTab === 'security' ? '#ffffff' : '#64748b',
                cursor: 'pointer',
              }}
            >
              AgentShield Security
            </button>
          </div>
        </div>

        {/* Selected Guide Image Display */}
        <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '12px', padding: '16px' }}>
          {activeGuideTab === 'shorthand' && (
            <div>
              <p style={{ color: '#475569', fontSize: '13px', margin: '0 0 12px 0' }}>
                <strong>Shorthand Guide:</strong> Fast interactive entry points for instant TDD cycles, security audits, build repairs, and code refactors.
              </p>
              <div style={{ borderRadius: '8px', overflow: 'hidden', border: '1px solid #cbd5e1' }}>
                <Image
                  src="/ECC/shorthand-guide.png"
                  alt="ECC Shorthand Reference Guide"
                  width={1200}
                  height={600}
                  style={{ width: '100%', height: 'auto', display: 'block' }}
                />
              </div>
            </div>
          )}

          {activeGuideTab === 'longform' && (
            <div>
              <p style={{ color: '#475569', fontSize: '13px', margin: '0 0 12px 0' }}>
                <strong>Longform Guide:</strong> Full architectural lifecycle from initial system design, persona dispatching, multi-step migrations, and automated post-merge verification.
              </p>
              <div style={{ borderRadius: '8px', overflow: 'hidden', border: '1px solid #cbd5e1' }}>
                <Image
                  src="/ECC/longform-guide.png"
                  alt="ECC Longform Architecture Guide"
                  width={1200}
                  height={600}
                  style={{ width: '100%', height: 'auto', display: 'block' }}
                />
              </div>
            </div>
          )}

          {activeGuideTab === 'security' && (
            <div>
              <p style={{ color: '#475569', fontSize: '13px', margin: '0 0 12px 0' }}>
                <strong>AgentShield Security Guide:</strong> Enterprise guardrails that scan prompts, hook scripts, MCP server parameters, environment secrets, and proposed AST edits before execution.
              </p>
              <div style={{ borderRadius: '8px', overflow: 'hidden', border: '1px solid #cbd5e1' }}>
                <Image
                  src="/ECC/security-guide.png"
                  alt="AgentShield Security Architecture"
                  width={1200}
                  height={600}
                  style={{ width: '100%', height: 'auto', display: 'block' }}
                />
              </div>
            </div>
          )}
        </div>
      </div>

      {/* 5. Star History Curve (from public/ECC/star-history.svg) */}
      <div style={{ marginBottom: '44px', background: '#020617', border: '1px solid #1e293b', borderRadius: '12px', padding: '24px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px', flexWrap: 'wrap', gap: '8px' }}>
          <div>
            <div style={{ color: '#38bdf8', fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.08em', fontWeight: 700 }}>
              Live Adoption Velocity
            </div>
            <h2 style={{ fontSize: '18px', fontWeight: 700, color: '#f8fafc', margin: '4px 0 0 0' }}>
              GitHub Star Growth &amp; Community Trajectory
            </h2>
          </div>
          <a
            href="https://www.star-history.com/affaan-m/ecc"
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: '#60a5fa', fontSize: '12px', textDecoration: 'none', fontWeight: 600 }}
          >
            View live on star-history.com ↗
          </a>
        </div>

        <div style={{ borderRadius: '8px', overflow: 'hidden' }}>
          <Image
            src="/ECC/star-history.svg"
            alt="Live star history chart for affaan-m/ECC"
            width={1000}
            height={400}
            style={{ width: '100%', height: 'auto', display: 'block' }}
          />
        </div>
      </div>

      {/* 6. Comprehensive FAQ Accordion */}
      <div style={{ marginBottom: '32px' }}>
        <h2 style={{ fontSize: '18px', fontWeight: 700, color: '#0f172a', margin: '0 0 12px 0' }}>
          Frequently Asked Questions (FAQ)
        </h2>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          {[
            {
              q: 'What is the fundamental difference between an ECC Agent and an ECC Skill?',
              a: 'An ECC Agent is a specialized persona definition with custom system prompts, focus areas, and decision guidelines (e.g. a Database Migration Engineer or Cloud Security Auditor). An ECC Skill is an on-demand, executable package with scripts and reference documentation that is loaded into the context window only when invoked, keeping context overhead near zero.',
            },
            {
              q: 'How does lazy loading prevent context window bloat?',
              a: 'Out of the box, AI agents often load massive instruction sheets into every prompt. ECC indexes all 293 skills using lightweight YAML frontmatter metadata. The agent reads only the 2-line title and summary; full instruction markdown and helper scripts are injected into context only when the agent explicitly decides to execute that task.',
            },
            {
              q: 'Can I use ECC with multiple coding agents simultaneously?',
              a: 'Yes! ECC 2.2 supports multi-harness installations (e.g. Claude Code plugin + Codex native plugin). The installer ensures that each harness receives its own isolated adapter and config path without cross-contaminating hooks or duplicating files.',
            },
            {
              q: 'How does AgentShield verify agent safety?',
              a: 'AgentShield runs static analysis on MCP server configurations, environment variables, hook definitions, and proposed source file edits. It blocks unverified network connections, hardcoded secret leaks, and arbitrary shell execution attempts before they reach your system.',
            },
            {
              q: 'What is the persistent memory layer in ECC?',
              a: 'ECC uses a structured cross-session memory store that records architectural decisions, API contracts, user preferences, and discovered codebase patterns. When you launch a new terminal session tomorrow, your agent immediately recalls past engineering decisions without needing to be re-prompted.',
            },
          ].map((faq, index) => {
            const isOpen = activeFaq === index;
            return (
              <div
                key={faq.q}
                style={{
                  border: '1px solid #e2e8f0',
                  borderRadius: '8px',
                  overflow: 'hidden',
                  background: '#ffffff',
                }}
              >
                <button
                  type="button"
                  onClick={() => setActiveFaq(isOpen ? null : index)}
                  style={{
                    width: '100%',
                    padding: '12px 16px',
                    textAlign: 'left',
                    background: 'none',
                    border: 'none',
                    fontWeight: 600,
                    fontSize: '13px',
                    color: '#0f172a',
                    cursor: 'pointer',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}
                >
                  <span>{faq.q}</span>
                  <span style={{ fontSize: '16px', color: '#64748b' }}>{isOpen ? '−' : '+'}</span>
                </button>
                {isOpen && (
                  <div style={{ padding: '0 16px 14px 16px', color: '#475569', fontSize: '12.5px', lineHeight: 1.6 }}>
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
