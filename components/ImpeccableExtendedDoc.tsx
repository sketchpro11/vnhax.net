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
    badge: 'Official Plugin',
    installCommand: '/plugin marketplace add pbakaus/impeccable\n# Then open /plugin and install Impeccable\n# Or via direct CLI:\nnpx impeccable install --providers=claude --scope=project',
    configPath: '.claude/skills/impeccable & hooks manifest',
    notes: 'Claude Code automatically runs the native hook manifest on file write. Whenever the agent outputs JSX/HTML, Impeccable validates computed styles against the 61 deterministic design rules.',
    quickAction: '/impeccable init',
  },
  {
    id: 'codex-cli',
    name: 'Codex CLI',
    category: 'CLI Agent',
    badge: 'Hook Native',
    installCommand: 'npx impeccable install --providers=codex --scope=project\n# After install, run in Codex:\n/hooks',
    configPath: '.codex/skills/impeccable & .codex/hooks.json',
    notes: 'Codex tracks trust per hook definition. After installation or updates that modify .codex/hooks.json, open /hooks inside Codex and approve the project hook when prompted.',
    quickAction: '/impeccable audit',
  },
  {
    id: 'cursor',
    name: 'Cursor',
    category: 'IDE / Editor',
    badge: 'Rules & Skills',
    installCommand: 'npx impeccable install --providers=cursor --scope=project\n# Or manual install:\ncp -r dist/cursor/.cursor your-project/',
    configPath: '.cursor/rules/impeccable.mdc & .cursor/skills/',
    notes: 'Cursor skills require setup: 1. Switch to Nightly channel in Cursor Settings -> Beta. 2. Enable Agent Skills in Cursor Settings -> Rules. Installs .cursor/rules/impeccable.mdc.',
    quickAction: '/impeccable craft',
  },
  {
    id: 'github-copilot',
    name: 'GitHub Copilot',
    category: 'IDE / Extension',
    badge: 'VS Code Marketplace',
    installCommand: 'code --install-extension renaissance-geek.impeccable\n# Or via CLI:\nnpx impeccable install --providers=github',
    configPath: 'VS Code Extension (Agent Mode)',
    notes: 'Requires VS Code 1.109.3+, GitHub Copilot Chat access, and a trusted workspace. Open Copilot Chat in Agent mode and invoke commands like @workspace /impeccable polish.',
    quickAction: '@workspace /impeccable polish',
  },
  {
    id: 'opencode',
    name: 'OpenCode',
    category: 'Open Source CLI',
    badge: 'CLI Native',
    installCommand: 'npx impeccable install --providers=opencode --scope=project\n# Or copy manually:\ncp -r dist/opencode/.opencode your-project/',
    configPath: '.opencode/skills/impeccable',
    notes: 'Integrates natively into OpenCode terminal sessions. Persists durable product truth in PRODUCT.md and visual design system in DESIGN.md.',
    quickAction: '/impeccable init',
  },
  {
    id: 'pi',
    name: 'Pi Agent Harness',
    category: 'Agent Harness',
    badge: 'Harness Native',
    installCommand: 'npx impeccable install --providers=pi --scope=project\n# Or link harness:\npi harness add pbakaus/impeccable',
    configPath: '.pi/skills/impeccable',
    notes: 'Pi Agent Harness reads the universal skill package directly. Links individual skill folders from .impeccable/dist/universal/ without altering existing configs.',
    quickAction: '/impeccable audit',
  },
  {
    id: 'gemini-cli',
    name: 'Gemini CLI',
    category: 'CLI Assistant',
    badge: 'Google Ecosystem',
    installCommand: 'npx impeccable install --providers=gemini --scope=project\n# Or via Gemini CLI:\ngemini skill add impeccable',
    configPath: '.gemini/skills/impeccable/SKILL.md',
    notes: 'Provides Gemini CLI with 24 design-directed slash commands and automatic WCAG 2.1 AA color contrast and spatial scale verification.',
    quickAction: '/impeccable critique',
  },
  {
    id: 'deepseek-harness',
    name: 'DeepSeek Harness',
    category: 'Agent Harness',
    badge: 'DSH Support',
    installCommand: '# Project-specific:\nnpx impeccable install --providers=dsh --scope=project\n# Or global setup:\nmkdir -p "${DSH_HOME:-$HOME/.dsh}/skills"\ncp -r dist/dsh/.dsh/skills/* "${DSH_HOME:-$HOME/.dsh}/skills/"',
    configPath: '.dsh/skills/impeccable',
    notes: 'DeepSeek Harness CLI honors DSH_HOME when resolved inside your home directory. Prevents repetitive AI boilerplate and standardizes spatial layouts.',
    quickAction: '/impeccable harden',
  },
  {
    id: 'kiro',
    name: 'Kiro',
    category: 'Steering Engine',
    badge: 'Steering Native',
    installCommand: 'npx impeccable install --providers=kiro --scope=project',
    configPath: '.kiro/steering/impeccable.md',
    notes: 'Kiro registers 61 deterministic quality detectors directly in its steering context. Guides frontend code generation before any file changes are written.',
    quickAction: '/impeccable shape',
  },
  {
    id: 'qoder',
    name: 'Qoder',
    category: 'Agentic IDE',
    badge: 'Full Rules',
    installCommand: 'npx impeccable install --providers=qoder --scope=project',
    configPath: '.qoder/rules/impeccable.md',
    notes: 'Integrates into Qoder’s agentic rules pipeline. Generates PRODUCT.md for persistent context and DESIGN.md to lock typography, spatial scales, and color palettes.',
    quickAction: '/impeccable typeset',
  },
  {
    id: 'trae-cn',
    name: 'Trae China',
    category: 'AI IDE (China)',
    badge: 'CN Localized',
    installCommand: 'npx impeccable install --providers=trae-cn --scope=project',
    configPath: '.trae/skills/impeccable/',
    notes: 'Specifically tailored for domestic network mirrors and prompt engineering with Trae China IDE. Automatically mounts 24 frontend design skills and 61 zero-LLM deterministic detector rules.',
    quickAction: '/impeccable init',
  },
  {
    id: 'trae-intl',
    name: 'Trae International',
    category: 'AI IDE (Global)',
    badge: 'International',
    installCommand: 'npx impeccable install --providers=trae --scope=project',
    configPath: '.trae/skills/impeccable/',
    notes: 'Installs global Trae IDE skill configurations. Provides instant UX/UI design audits and live component shaping directly inside Trae.',
    quickAction: '/impeccable craft',
  },
  {
    id: 'rovo-dev',
    name: 'Rovo Dev',
    category: 'Enterprise Agent',
    badge: 'Atlassian Ecosystem',
    installCommand: 'npx impeccable install --providers=rovo-dev --scope=project',
    configPath: '.rovo/skills/impeccable/',
    notes: 'Tailored for Atlassian Rovo Dev workspaces. Ensures enterprise-grade design consistency, accessibility compliance, and unified design token extraction.',
    quickAction: '/impeccable polish',
  },
  {
    id: 'mistral-vibe',
    name: 'Mistral Vibe',
    category: 'Terminal Agent',
    badge: 'Vibe Harness',
    installCommand: 'npx impeccable install --providers=vibe --scope=project',
    configPath: '~/.vibe/skills/impeccable/',
    notes: 'Integrates with Mistral Vibe terminal agent. Focuses on minimal code aesthetics, distillation of bloated styles, and lean UI craftsmanship.',
    quickAction: '/impeccable distill',
  },
  {
    id: 'grok-build',
    name: 'Grok Build',
    category: 'Build Assistant',
    badge: 'xAI Ecosystem',
    installCommand: 'grok plugin install pbakaus/impeccable#plugin --trust\n# Or CLI installer:\nnpx impeccable install --providers=grok --scope=project',
    configPath: '.grok/skills/ & .grok/hooks/impeccable.json',
    notes: 'Grok Build requires project folder trust (/hooks-trust or launch with --trust) before .grok/hooks/ scripts run. Supports extraordinary UI overdrive effects.',
    quickAction: '/impeccable overdrive',
  },
  {
    id: 'hermes-agent',
    name: 'Hermes Agent',
    category: 'Autonomous Agent',
    badge: 'Hermes Native',
    installCommand: 'npx impeccable install --providers=hermes --scope=project\n# Or native CLI:\nhermes skill add pbakaus/impeccable',
    configPath: '.hermes/skills/impeccable/',
    notes: 'Installs skills into Hermes agent profiles. Enables intentional color harmonies, emotional UX touches, and animated delight micro-interactions.',
    quickAction: '/impeccable colorize',
  },
  {
    id: 'antigravity',
    name: 'Antigravity (AGY)',
    category: 'Agentic Coding IDE',
    badge: 'Google Antigravity',
    installCommand: 'npx impeccable install --providers=antigravity --scope=project\n# Or via agy CLI:\nagy skill add pbakaus/impeccable',
    configPath: '~/.gemini/config/skills/impeccable/ or .agents/skills/',
    notes: 'Full integration with Google Antigravity 2.0 and AGY CLI. Discovered automatically via Workspace Customization Roots (.agents/skills) with zero runtime dependencies.',
    quickAction: '/impeccable polish',
  },
  {
    id: 'veto',
    name: 'Veto',
    category: 'Safety & Guardrail',
    badge: 'Packaged Skill',
    installCommand: 'npx impeccable install --providers=veto --scope=global',
    configPath: '~/.veto/skills/impeccable/',
    notes: 'Veto receives the packaged skill under ~/.veto/skills/ and acts as a pure design critique skill. (Veto does not run native Impeccable edit hooks).',
    quickAction: '/impeccable critique',
  },
];

interface CommandItem {
  cmd: string;
  category: string;
  summary: string;
  example: string;
}

const COMMANDS: CommandItem[] = [
  { cmd: '/impeccable craft', category: 'Foundation', summary: 'Full shape-then-build flow with visual iteration and live review', example: '/impeccable craft pricing-calculator' },
  { cmd: '/impeccable init', category: 'Foundation', summary: 'One-time setup: gather durable product context and write PRODUCT.md', example: '/impeccable init' },
  { cmd: '/impeccable document', category: 'Foundation', summary: 'Generate root DESIGN.md from existing project code and design tokens', example: '/impeccable document' },
  { cmd: '/impeccable extract', category: 'Foundation', summary: 'Pull reusable components and tokens into the design system', example: '/impeccable extract buttons cards' },
  { cmd: '/impeccable shape', category: 'Foundation', summary: 'Plan UX/UI, wireframes, and interaction flows before writing code', example: '/impeccable shape checkout-modal' },
  { cmd: '/impeccable critique', category: 'Review & Quality', summary: 'UX design review: visual hierarchy, cognitive clarity, emotional resonance', example: '/impeccable critique landing-page' },
  { cmd: '/impeccable audit', category: 'Review & Quality', summary: 'Run technical quality checks (WCAG 2.1 AA a11y, performance, responsive)', example: '/impeccable audit blog' },
  { cmd: '/impeccable polish', category: 'Review & Quality', summary: 'Final pass, design system token alignment, and shipping readiness', example: '/impeccable polish settings-view' },
  { cmd: '/impeccable harden', category: 'Review & Quality', summary: 'Error handling, i18n, long text overflow, edge cases, mobile keyboards', example: '/impeccable harden profile-form' },
  { cmd: '/impeccable bolder', category: 'Tone & Aesthetic', summary: 'Amplify boring, timid, or generic designs with bold contrast and personality', example: '/impeccable bolder hero-headline' },
  { cmd: '/impeccable quieter', category: 'Tone & Aesthetic', summary: 'Tone down overly loud, neon, or chaotic interfaces into subtle calm', example: '/impeccable quieter dashboard-sidebar' },
  { cmd: '/impeccable distill', category: 'Tone & Aesthetic', summary: 'Strip to pure functional essence: remove redundant borders, cards, and noise', example: '/impeccable distill filter-panel' },
  { cmd: '/impeccable delight', category: 'Tone & Aesthetic', summary: 'Add memorable micro-moments of joy, confetti, or playful feedback', example: '/impeccable delight order-success' },
  { cmd: '/impeccable animate', category: 'Visuals & Motion', summary: 'Add purposeful physics-based motion with ease-out curves (no dated bounce)', example: '/impeccable animate modal-dialog' },
  { cmd: '/impeccable colorize', category: 'Visuals & Motion', summary: 'Introduce strategic, harmonious color palettes (no pure black/gray)', example: '/impeccable colorize theme' },
  { cmd: '/impeccable typeset', category: 'Visuals & Motion', summary: 'Fix font choices (no Arial/Inter defaults), hierarchy, and typographic scale', example: '/impeccable typeset article' },
  { cmd: '/impeccable layout', category: 'Visuals & Motion', summary: 'Fix layout, spacing rhythms, and 8pt spatial grid alignments', example: '/impeccable layout nav-header' },
  { cmd: '/impeccable overdrive', category: 'Visuals & Motion', summary: 'Add technically extraordinary visual effects (glass, shaders, 3D tilt)', example: '/impeccable overdrive cta-card' },
  { cmd: '/impeccable onboard', category: 'User Flow', summary: 'Design first-run onboarding flows, empty states, and activation paths', example: '/impeccable onboard workspace' },
  { cmd: '/impeccable clarify', category: 'User Flow', summary: 'Improve confusing UX microcopy, labels, error states, and tooltips', example: '/impeccable clarify billing-faq' },
  { cmd: '/impeccable adapt', category: 'User Flow', summary: 'Adapt interfaces across smartphones, tablets, ultra-wide displays', example: '/impeccable adapt mobile-menu' },
  { cmd: '/impeccable optimize', category: 'Performance', summary: 'Optimize font loading, layout thrashing, DOM nodes, and paint cycles', example: '/impeccable optimize table-view' },
  { cmd: '/impeccable live', category: 'Live Prototyping', summary: 'Visual variant mode: iterate on elements directly in the live browser', example: '/impeccable live header' },
  { cmd: '/impeccable generate', category: 'Live Prototyping', summary: 'Generate 4-6 visual variants of a named element in live browser without manual prompts', example: '/impeccable generate pricing-card' },
];

export default function ImpeccableExtendedDoc() {
  const [selectedAgent, setSelectedAgent] = useState<string>('claude-code');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  const activeAgentData = AGENTS.find((a) => a.id === selectedAgent) || AGENTS[0];

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const categories = ['All', 'Foundation', 'Review & Quality', 'Tone & Aesthetic', 'Visuals & Motion', 'User Flow', 'Live Prototyping'];
  const filteredCommands = selectedCategory === 'All' 
    ? COMMANDS 
    : COMMANDS.filter(c => c.category === selectedCategory);

  return (
    <div style={{ maxWidth: '1100px', margin: '0 auto', fontFamily: 'inherit' }}>
      {/* Top Badges Bar */}
      <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '24px', alignItems: 'center' }}>
        <span style={{ background: '#7c3aed', color: '#ffffff', fontSize: '11px', fontWeight: 700, padding: '4px 10px', borderRadius: '6px', letterSpacing: '0.04em' }}>
          FRONTEND DESIGN
        </span>
        <span style={{ background: '#0284c7', color: '#ffffff', fontSize: '11px', fontWeight: 600, padding: '4px 10px', borderRadius: '6px' }}>
          61 DETECTORS
        </span>
        <span style={{ background: '#059669', color: '#ffffff', fontSize: '11px', fontWeight: 600, padding: '4px 10px', borderRadius: '6px' }}>
          24 COMMANDS
        </span>
        <span style={{ background: '#f59e0b', color: '#ffffff', fontSize: '11px', fontWeight: 600, padding: '4px 10px', borderRadius: '6px' }}>
          ZERO LLM COST LINTING
        </span>
        <span style={{ background: '#1e293b', color: '#94a3b8', fontSize: '11px', fontWeight: 600, padding: '4px 10px', borderRadius: '6px', border: '1px solid #334155' }}>
          AUTHOR: PAUL BAKAUS
        </span>
      </div>

      {/* Hero Presentation Card */}
      <div
        style={{
          background: 'linear-gradient(135deg, rgba(30, 27, 75, 0.7) 0%, rgba(15, 23, 42, 0.9) 100%)',
          border: '1px solid rgba(139, 92, 246, 0.3)',
          borderRadius: '16px',
          padding: '28px',
          marginBottom: '36px',
          boxShadow: '0 20px 40px -15px rgba(124, 58, 237, 0.15)',
        }}
      >
        <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '24px', alignItems: 'center' }}>
          <div>
            <div style={{ display: 'inline-block', color: '#c084fc', fontSize: '12px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '8px' }}>
              pbakaus / impeccable — The AI Agent Design System
            </div>
            <h1 style={{ fontSize: '26px', fontWeight: 800, color: '#ffffff', margin: '0 0 12px 0', lineHeight: 1.25 }}>
              Design Guidance & Visual Architecture for AI Coding Agents
            </h1>
            <p style={{ color: '#cbd5e1', fontSize: '14px', lineHeight: 1.6, margin: '0 0 16px 0' }}>
              Standard LLMs default to generic SaaS clichés: Inter typography everywhere, monotonous purple-to-blue gradients, cards arbitrarily nested inside cards, and gray text with illegal contrast. 
              <strong> Impeccable</strong> equips your AI coding agent with a shared 24-command design vocabulary, durable context preservation (`PRODUCT.md`), and 61 deterministic design detectors that run at <strong>0 LLM API token cost</strong>.
            </p>

            <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
              <div style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)', padding: '10px 16px', borderRadius: '8px' }}>
                <div style={{ color: '#38bdf8', fontSize: '18px', fontWeight: 800 }}>61 Rules</div>
                <div style={{ color: '#94a3b8', fontSize: '11px' }}>Deterministic Quality Detectors</div>
              </div>
              <div style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)', padding: '10px 16px', borderRadius: '8px' }}>
                <div style={{ color: '#a855f7', fontSize: '18px', fontWeight: 800 }}>24 Slash Cmds</div>
                <div style={{ color: '#94a3b8', fontSize: '11px' }}>Shared Design Vocabulary</div>
              </div>
              <div style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)', padding: '10px 16px', borderRadius: '8px' }}>
                <div style={{ color: '#4ade80', fontSize: '18px', fontWeight: 800 }}>18 Harnesses</div>
                <div style={{ color: '#94a3b8', fontSize: '11px' }}>Supported AI Coding Agents</div>
              </div>
              <div style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)', padding: '10px 16px', borderRadius: '8px' }}>
                <div style={{ color: '#fbbf24', fontSize: '18px', fontWeight: 800 }}>0 Cost</div>
                <div style={{ color: '#94a3b8', fontSize: '11px' }}>Instant Native CLI Binary</div>
              </div>
            </div>
          </div>
        </div>

        {/* Hero Artwork Image */}
        <div style={{ marginTop: '24px', borderRadius: '12px', overflow: 'hidden', border: '1px solid rgba(255,255,255,0.1)' }}>
          <Image
            src="/images/impeccable by vnhax.net.png"
            alt="Impeccable AI Agent Frontend Design System"
            width={1200}
            height={630}
            style={{ width: '100%', height: 'auto', display: 'block' }}
          />
        </div>
      </div>

      {/* 2. Before & After: The Anti-Slop Visual Comparison */}
      <div style={{ marginBottom: '40px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
          <span style={{ background: '#ef4444', color: '#fff', fontSize: '11px', fontWeight: 700, padding: '2px 8px', borderRadius: '4px' }}>
            BEFORE VS AFTER
          </span>
          <h2 style={{ fontSize: '20px', fontWeight: 700, color: '#0f172a', margin: 0 }}>
            Eliminating The "AI Slop" Tells
          </h2>
        </div>
        <p style={{ color: '#475569', fontSize: '13px', margin: '0 0 16px 0' }}>
          Without Impeccable, AI agents rely on average web scraped training data. With Impeccable, agents follow strict typographic, spatial, and color laws.
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '16px' }}>
          {/* Card: Without Impeccable */}
          <div
            style={{
              background: '#fef2f2',
              border: '1px solid #fecaca',
              borderRadius: '12px',
              padding: '20px',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
              <span style={{ color: '#b91c1c', fontWeight: 700, fontSize: '13px' }}>❌ Standard AI Output (AI Slop)</span>
              <span style={{ background: '#fee2e2', color: '#991b1b', fontSize: '11px', padding: '2px 6px', borderRadius: '4px' }}>Untrained Agent</span>
            </div>
            <ul style={{ margin: 0, paddingLeft: '18px', color: '#7f1d1d', fontSize: '12.5px', lineHeight: 1.7 }}>
              <li><strong>Default Font:</strong> Always Inter, Arial, or browser sans-serif with no brand personality.</li>
              <li><strong>Color Palette:</strong> Monotonous purple-to-blue linear gradients on buttons and hero text.</li>
              <li><strong>Layout Clutter:</strong> Cards arbitrarily nested inside outer cards, creating box inception.</li>
              <li><strong>Contrast Violations:</strong> Low-contrast gray text on tinted cards (fails WCAG AA 4.5:1).</li>
              <li><strong>Icon Cliché:</strong> A rounded-square icon tile positioned redundantly above every heading.</li>
              <li><strong>Elastic Easing:</strong> Bouncy, jittery CSS transitions that feel dated and sluggish.</li>
              <li><strong>Blacks & Shadows:</strong> Pure pitch black (#000000) surfaces without natural ambient light tinting.</li>
            </ul>
          </div>

          {/* Card: With Impeccable */}
          <div
            style={{
              background: '#f0fdf4',
              border: '1px solid #bbf7d0',
              borderRadius: '12px',
              padding: '20px',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
              <span style={{ color: '#15803d', fontWeight: 700, fontSize: '13px' }}>✅ Impeccable Guided Output</span>
              <span style={{ background: '#dcfce7', color: '#166534', fontSize: '11px', padding: '2px 6px', borderRadius: '4px' }}>Production-Ready</span>
            </div>
            <ul style={{ margin: 0, paddingLeft: '18px', color: '#14532d', fontSize: '12.5px', lineHeight: 1.7 }}>
              <li><strong>Curated Typography:</strong> Expressive pairings (e.g. Outfit, Fraunces, Space Grotesk) with 1.25 modular scale.</li>
              <li><strong>Strategic Color:</strong> Single calibrated hero accent, warm/cool tinted surfaces, zero pure gray.</li>
              <li><strong>Clean Space:</strong> Strict 8pt spatial grid rhythm (8px, 16px, 24px, 32px) without unnecessary card wrappers.</li>
              <li><strong>100% WCAG 2.1 AA:</strong> Computed mathematical contrast verification (minimum 4.5:1 for body copy).</li>
              <li><strong>Touch & A11y Targets:</strong> Minimum 44x44px interactive tap area with visible focus-visible rings.</li>
              <li><strong>Purposeful Motion:</strong> Physics-based micro-interactions with cubic-bezier ease-out timing.</li>
              <li><strong>Durable Truth:</strong> Architectural direction locked into `PRODUCT.md` and `DESIGN.md`.</li>
            </ul>
          </div>
        </div>
      </div>

      {/* 3. The Two Core Artifacts: PRODUCT.md and DESIGN.md */}
      <div style={{ marginBottom: '40px', background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '12px', padding: '20px' }}>
        <h2 style={{ fontSize: '18px', fontWeight: 700, color: '#0f172a', margin: '0 0 10px 0' }}>
          🧠 The Two Durable Anchors: How Impeccable Stops Drift
        </h2>
        <p style={{ color: '#475569', fontSize: '13px', margin: '0 0 16px 0', lineHeight: 1.6 }}>
          AI agents forget context between sessions or overwrite established designs when generating new pages. Impeccable solves this by splitting product purpose from visual direction into two durable Markdown files:
        </p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px' }}>
          <div style={{ background: '#ffffff', border: '1px solid #cbd5e1', borderRadius: '8px', padding: '16px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
              <span style={{ background: '#3b82f6', color: '#fff', fontSize: '11px', fontWeight: 700, padding: '2px 6px', borderRadius: '4px' }}>
                /impeccable init
              </span>
              <strong style={{ fontSize: '14px', color: '#0f172a' }}>PRODUCT.md</strong>
            </div>
            <p style={{ color: '#64748b', fontSize: '12px', lineHeight: 1.5, margin: 0 }}>
              Gathers durable product reality: target audience, core job-to-be-done, operating constraints, voice & tone, and customer evidence. Prevents the AI from asking redundant questions or misunderstanding who the software is built for.
            </p>
          </div>

          <div style={{ background: '#ffffff', border: '1px solid #cbd5e1', borderRadius: '8px', padding: '16px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
              <span style={{ background: '#8b5cf6', color: '#fff', fontSize: '11px', fontWeight: 700, padding: '2px 6px', borderRadius: '4px' }}>
                /impeccable document
              </span>
              <strong style={{ fontSize: '14px', color: '#0f172a' }}>DESIGN.md</strong>
            </div>
            <p style={{ color: '#64748b', fontSize: '12px', lineHeight: 1.5, margin: 0 }}>
              Records your visual design system: designated font families, fluid typography scales, spatial spacing tokens (4px/8px), color palette hex codes, surface elevations, and motion curves.
            </p>
          </div>
        </div>
      </div>

      {/* 4. Complete 18-Agent Installation Matrix */}
      <div style={{ marginBottom: '44px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
          <span style={{ background: '#2563eb', color: '#fff', fontSize: '11px', fontWeight: 700, padding: '2px 8px', borderRadius: '4px' }}>
            ALL 18 AGENTS
          </span>
          <h2 style={{ fontSize: '20px', fontWeight: 700, color: '#0f172a', margin: 0 }}>
            Harness Setup & Installation Hub
          </h2>
        </div>
        <p style={{ color: '#475569', fontSize: '13px', margin: '0 0 16px 0' }}>
          Select your coding harness below to view exact CLI commands, config files, trust steps, and quick slash commands.
        </p>

        {/* Agent Selectors Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(135px, 1fr))',
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
              Configuration Target & Hook Path
            </div>
            <code style={{ color: '#f1f5f9', background: '#1e293b', padding: '4px 10px', borderRadius: '4px', fontSize: '12px', display: 'inline-block' }}>
              {activeAgentData.configPath}
            </code>
          </div>

          <div style={{ marginBottom: '16px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
              <span style={{ color: '#94a3b8', fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                Installation & Shell Command
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
              <strong>Harness Note:</strong> {activeAgentData.notes}
            </div>
          </div>
        </div>
      </div>

      {/* 5. 24 Commands Directory */}
      <div style={{ marginBottom: '44px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px', flexWrap: 'wrap', gap: '8px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ background: '#7c3aed', color: '#fff', fontSize: '11px', fontWeight: 700, padding: '2px 8px', borderRadius: '4px' }}>
              VOCABULARY
            </span>
            <h2 style={{ fontSize: '20px', fontWeight: 700, color: '#0f172a', margin: 0 }}>
              The 24 Design Slash Commands
            </h2>
          </div>
          <span style={{ color: '#64748b', fontSize: '12px' }}>
            Tip: Use <code>/impeccable pin &lt;cmd&gt;</code> to create standalone shortcuts (e.g. <code>/audit</code>)
          </span>
        </div>

        {/* Filter categories */}
        <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', marginBottom: '14px' }}>
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setSelectedCategory(cat)}
              style={{
                padding: '4px 10px',
                borderRadius: '6px',
                fontSize: '11px',
                fontWeight: 600,
                border: selectedCategory === cat ? '1px solid #7c3aed' : '1px solid #e2e8f0',
                background: selectedCategory === cat ? '#7c3aed' : '#ffffff',
                color: selectedCategory === cat ? '#ffffff' : '#64748b',
                cursor: 'pointer',
              }}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Commands Table */}
        <div style={{ border: '1px solid #e2e8f0', borderRadius: '10px', overflow: 'hidden' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '12px', textAlign: 'left' }}>
            <thead>
              <tr style={{ background: '#f8fafc', borderBottom: '1px solid #e2e8f0', color: '#475569' }}>
                <th style={{ padding: '10px 14px', width: '220px' }}>Slash Command</th>
                <th style={{ padding: '10px 14px', width: '130px' }}>Category</th>
                <th style={{ padding: '10px 14px' }}>What It Does</th>
                <th style={{ padding: '10px 14px', width: '250px' }}>Interactive Usage</th>
              </tr>
            </thead>
            <tbody>
              {filteredCommands.map((item, idx) => (
                <tr
                  key={item.cmd}
                  style={{
                    borderBottom: idx === filteredCommands.length - 1 ? 'none' : '1px solid #f1f5f9',
                    background: idx % 2 === 0 ? '#ffffff' : '#fafafa',
                  }}
                >
                  <td style={{ padding: '10px 14px', fontWeight: 700, color: '#7c3aed', fontFamily: 'monospace' }}>
                    {item.cmd}
                  </td>
                  <td style={{ padding: '10px 14px' }}>
                    <span style={{ background: '#f1f5f9', color: '#475569', padding: '2px 6px', borderRadius: '4px', fontSize: '10.5px' }}>
                      {item.category}
                    </span>
                  </td>
                  <td style={{ padding: '10px 14px', color: '#334155', lineHeight: 1.45 }}>
                    {item.summary}
                  </td>
                  <td style={{ padding: '10px 14px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <code style={{ background: '#f1f5f9', color: '#0f172a', padding: '2px 6px', borderRadius: '4px', fontSize: '11px', fontFamily: 'monospace' }}>
                        {item.example}
                      </code>
                      <button
                        type="button"
                        onClick={() => handleCopy(item.example, `cmd-${item.cmd}`)}
                        style={{
                          background: 'none',
                          border: 'none',
                          cursor: 'pointer',
                          color: copiedId === `cmd-${item.cmd}` ? '#16a34a' : '#94a3b8',
                          fontSize: '11px',
                        }}
                        title="Copy example"
                      >
                        {copiedId === `cmd-${item.cmd}` ? '✓' : '📋'}
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* 6. The 61 Deterministic Detectors */}
      <div style={{ marginBottom: '44px', background: '#020617', border: '1px solid #1e293b', borderRadius: '14px', padding: '24px', color: '#f8fafc' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
          <span style={{ background: '#059669', color: '#fff', fontSize: '11px', fontWeight: 700, padding: '2px 8px', borderRadius: '4px' }}>
            ENGINE
          </span>
          <h2 style={{ fontSize: '20px', fontWeight: 700, color: '#f8fafc', margin: 0 }}>
            61 Deterministic Design Detectors (0 API Token Cost)
          </h2>
        </div>
        <p style={{ color: '#94a3b8', fontSize: '13px', margin: '0 0 20px 0', lineHeight: 1.5 }}>
          Traditional AI code reviews call expensive LLM APIs that hallucinate and take 15 seconds. Impeccable includes a compiled, self-contained binary running 61 deterministic math checks in sub-milliseconds without calling an LLM:
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '14px' }}>
          <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid #1e293b', padding: '14px', borderRadius: '8px' }}>
            <div style={{ color: '#38bdf8', fontWeight: 700, fontSize: '13px', marginBottom: '4px' }}>1. Contrast & A11y (WCAG 2.1 AA)</div>
            <div style={{ color: '#94a3b8', fontSize: '11.5px', lineHeight: 1.45 }}>Calculates actual relative luminance against dynamic background layers. Flags any copy below 4.5:1 ratio or UI controls below 3:1.</div>
          </div>

          <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid #1e293b', padding: '14px', borderRadius: '8px' }}>
            <div style={{ color: '#a855f7', fontWeight: 700, fontSize: '13px', marginBottom: '4px' }}>2. Spatial 8pt Grid Harmony</div>
            <div style={{ color: '#94a3b8', fontSize: '11.5px', lineHeight: 1.45 }}>Detects arbitrary spacing numbers (e.g. 13px, 27px, 39px) and enforces 4px/8px design system spatial scales.</div>
          </div>

          <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid #1e293b', padding: '14px', borderRadius: '8px' }}>
            <div style={{ color: '#4ade80', fontWeight: 700, fontSize: '13px', marginBottom: '4px' }}>3. Touch Target Safeguards</div>
            <div style={{ color: '#94a3b8', fontSize: '11.5px', lineHeight: 1.45 }}>Guarantees minimum 44x44px clickable bounding box for mobile touchscreen targets and prevents button overlaps.</div>
          </div>

          <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid #1e293b', padding: '14px', borderRadius: '8px' }}>
            <div style={{ color: '#fbbf24', fontWeight: 700, fontSize: '13px', marginBottom: '4px' }}>4. Mobile Horizontal Overflow</div>
            <div style={{ color: '#94a3b8', fontSize: '11.5px', lineHeight: 1.45 }}>Inspects rendered DOM box model from 320px to 480px viewports to eliminate unwanted horizontal scrollbars.</div>
          </div>

          <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid #1e293b', padding: '14px', borderRadius: '8px' }}>
            <div style={{ color: '#f43f5e', fontWeight: 700, fontSize: '13px', marginBottom: '4px' }}>5. AI Anti-Slop Checkers</div>
            <div style={{ color: '#94a3b8', fontSize: '11.5px', lineHeight: 1.45 }}>Flags generic purple gradients, Inter-for-everything defaults, nested card wrappers, and pure #000000 blacks.</div>
          </div>

          <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid #1e293b', padding: '14px', borderRadius: '8px' }}>
            <div style={{ color: '#2dd4bf', fontWeight: 700, fontSize: '13px', marginBottom: '4px' }}>6. Focus & Keyboard States</div>
            <div style={{ color: '#94a3b8', fontSize: '11.5px', lineHeight: 1.45 }}>Ensures buttons, links, and form fields retain high-contrast :focus-visible outlines without breaking aesthetic flow.</div>
          </div>
        </div>
      </div>

      {/* 7. Live Browser Prototyping (/impeccable live & generate) */}
      <div style={{ marginBottom: '40px', background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '12px', padding: '20px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
          <span style={{ background: '#0284c7', color: '#fff', fontSize: '11px', fontWeight: 700, padding: '2px 8px', borderRadius: '4px' }}>
            LIVE BROWSER
          </span>
          <h2 style={{ fontSize: '18px', fontWeight: 700, color: '#0f172a', margin: 0 }}>
            In-Browser Prototyping: <code>/impeccable live</code> &amp; <code>generate</code>
          </h2>
        </div>
        <p style={{ color: '#475569', fontSize: '13px', margin: '0 0 14px 0', lineHeight: 1.5 }}>
          Instead of modifying raw source files blindly, Impeccable can spin up a live browser iteration session. 
          Use <code>/impeccable live</code> to test styling variants on live elements, or <code>/impeccable generate</code> to spawn 4-6 fully formed design variations (e.g. Minimal, High-Contrast, Glassmorphic, Dense) directly on your running dev server.
        </p>

        <div style={{ background: '#020617', color: '#f8fafc', padding: '12px 16px', borderRadius: '8px', fontFamily: 'monospace', fontSize: '12px' }}>
          <span style={{ color: '#94a3b8' }}># Generate 4 visual variants for hero pricing in live browser:</span><br />
          <span style={{ color: '#4ade80' }}>/impeccable generate pricing-card</span><br /><br />
          <span style={{ color: '#94a3b8' }}># Open real-time visual adjustment session:</span><br />
          <span style={{ color: '#38bdf8' }}>/impeccable live navbar</span>
        </div>
      </div>

      {/* 8. Comprehensive FAQ Accordion */}
      <div style={{ marginBottom: '32px' }}>
        <h2 style={{ fontSize: '18px', fontWeight: 700, color: '#0f172a', margin: '0 0 12px 0' }}>
          Frequently Asked Questions (FAQ)
        </h2>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          {[
            {
              q: 'Does Impeccable consume LLM tokens when running its 61 quality checks?',
              a: 'No. The 61 deterministic detector rules are compiled into a standalone local binary. They calculate DOM bounding boxes, computed styles, and WCAG math locally with zero API calls and zero latency. Only explicit conversational commands (e.g. /impeccable critique) interact with your active agent.',
            },
            {
              q: 'How does Impeccable differ from ESLint, Stylelint, or Tailwind CSS?',
              a: 'Stylelint and ESLint only parse static strings of code. They do not know what the component actually looks like rendered in a browser. Impeccable evaluates computed layout geometry, dynamic background contrast layers, and mobile viewport collisions.',
            },
            {
              q: 'Can I pin my most used commands to short slash commands?',
              a: 'Yes! Run `/impeccable pin <command>`. For example, running `/impeccable pin audit` registers `/audit` as a standalone command in Claude Code, Cursor, Codex, and other supported harnesses.',
            },
            {
              q: 'Why does Impeccable flag pure #000000 black as an anti-pattern?',
              a: 'In natural physical lighting, pure #000000 does not exist; dark surfaces absorb light and reflect ambient temperature. AI models frequently output unnatural, harsh #000000 interfaces. Impeccable guides the AI to use warm (e.g. #09090b) or cool tinted dark surfaces (e.g. #020617) for depth and visual richness.',
            },
            {
              q: 'How do project hooks keep the codebase consistent over time?',
              a: 'When installed with provider hooks (such as Claude Code, Codex, or Grok), Impeccable automatically intercepts file write events. If an agent tries to commit poor contrast or broken mobile layouts, Impeccable provides instant deterministic feedback before changes are merged.',
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
