'use client';

import React, { useState } from 'react';

const SUPPORTED_AGENTS = [
  {
    id: 'claude-code',
    name: 'Claude Code',
    badge: 'Official Plugin',
    category: 'CLI & Desktop',
    type: 'plugin',
    command: `/plugin marketplace add DietrichGebert/ponytail\n/plugin install ponytail@ponytail`,
    note: 'Send as two separate prompts. In the Claude Code Desktop app: type the commands into the prompt box, or click the + button → Plugins → Add plugin.',
  },
  {
    id: 'codex',
    name: 'Codex',
    badge: 'Official Plugin',
    category: 'CLI & IDE',
    type: 'plugin',
    command: `codex plugin marketplace add DietrichGebert/ponytail\ncodex plugin add ponytail@ponytail`,
    note: 'Run codex and open /hooks, review and trust its two lifecycle hooks, then start a new thread. Restarting the Codex desktop app automatically picks up the plugin.',
  },
  {
    id: 'copilot-cli',
    name: 'GitHub Copilot CLI',
    badge: 'Plugin & Slash',
    category: 'Terminal CLI',
    type: 'plugin',
    command: `copilot plugin marketplace add DietrichGebert/ponytail\ncopilot plugin install ponytail@ponytail`,
    note: 'In interactive Copilot CLI sessions, use slash equivalents (/plugin marketplace add...). Commands are namespaced: /ponytail:ponytail ultra, /ponytail:ponytail-review.',
  },
  {
    id: 'pi-agent',
    name: 'Pi agent harness',
    badge: 'Direct Git Install',
    category: 'Agent Harness',
    type: 'cli',
    command: `pi install git:github.com/DietrichGebert/ponytail`,
    note: 'Directly registers ponytail into the Pi agent runtime with full skill execution and hooks.',
  },
  {
    id: 'opencode',
    name: 'OpenCode',
    badge: 'opencode.json',
    category: 'Autonomous Agent',
    type: 'config',
    command: `// Add to opencode.json:\n{\n  "plugins": ["@dietrichgebert/ponytail"]\n}\n\n// Or from local checkout:\n{\n  "plugins": ["./.opencode/plugins"]\n}`,
    note: 'Injects ruleset every turn at active level. OpenCode 2 auto-loads .opencode/plugins/index.js. For OpenCode 1: { "plugin": ["@dietrichgebert/ponytail"] }.',
  },
  {
    id: 'gemini-cli',
    name: 'Gemini CLI',
    badge: 'Google Extension',
    category: 'Terminal CLI',
    type: 'cli',
    command: `gemini extensions install https://github.com/DietrichGebert/ponytail`,
    note: 'Loads the ruleset as always-on context every session and registers the /ponytail commands and bundled skills.',
  },
  {
    id: 'qoder',
    name: 'Qoder',
    badge: 'Rules & Skills',
    category: 'IDE & Agent',
    type: 'config',
    command: `# 1. Qoder auto-loads AGENTS.md from repo root with zero setup\n\n# 2. For per-project rules:\ncp .qoder/rules/ponytail.md <your-project>/.qoder/rules/\n\n# 3. Full plugin tier: Add hooks from hooks/qoder-hooks.json to .qoder/settings.json`,
    note: 'UserPromptSubmit hook activates default mode on first prompt; PreToolUse injects rules into subagents. Mode switches (/ponytail lite|full|ultra|off) work automatically.',
  },
  {
    id: 'antigravity',
    name: 'Antigravity CLI (agy)',
    badge: 'agy Plugin',
    category: 'Next-Gen CLI',
    type: 'cli',
    command: `agy plugin install https://github.com/DietrichGebert/ponytail`,
    note: 'Reuses gemini-extension.json. Antigravity converts /ponytail commands into chat skills (type /ponytail-review into chat). Or drop rules into .agents/rules/.',
  },
  {
    id: 'hermes',
    name: 'Hermes Agent',
    badge: 'Hermes Plugin',
    category: 'Agent Gateway',
    type: 'cli',
    command: `hermes plugins install DietrichGebert/ponytail --enable`,
    note: 'Restart Hermes after installing. Injects active Ponytail mode before each LLM turn, adds ponytail:<skill> commands (/ponytail-review, /ponytail-audit, /ponytail-debt).',
  },
  {
    id: 'codewhale',
    name: 'CodeWhale',
    badge: 'AGENTS.md Zero Setup',
    category: 'Autonomous Agent',
    type: 'config',
    command: `# Copy AGENTS.md to your project root:\ncp AGENTS.md <your-project>/AGENTS.md\n\n# CodeWhale reads AGENTS.md automatically with zero setup!`,
    note: 'Reads AGENTS.md from the project root. Zero extra configuration required.',
  },
  {
    id: 'swival',
    name: 'Swival',
    badge: 'Global Skills',
    category: 'Skill Manager',
    type: 'cli',
    command: `# Stage collection into library:\nswival skills add --global https://github.com/DietrichGebert/ponytail\n\n# Install into project or activate globally:\nswival skills add ponytail\nswival skills add --global ponytail`,
    note: 'On the command line, use $ prefix to explicitly activate skills (e.g. $ponytail-review). Also reads AGENTS.md and ~/.config/swival/AGENTS.md.',
  },
  {
    id: 'devin-cli',
    name: 'Devin CLI',
    badge: 'Devin Plugin',
    category: 'Autonomous CLI',
    type: 'cli',
    command: `devin plugins install DietrichGebert/ponytail`,
    note: 'Installs ponytail as a Devin plugin; skills are available as /ponytail:ponytail, /ponytail:ponytail-review, etc.',
  },
  {
    id: 'grok-build',
    name: 'Grok Build',
    badge: 'xAI Plugin',
    category: 'Build Agent',
    type: 'cli',
    command: `# Install plugin:\ngrok plugin install DietrichGebert/ponytail --trust\n\n# Enable in ~/.grok/config.toml:\n[plugins]\nenabled = ["ponytail"]`,
    note: 'Start a new session. Skills appear as /ponytail, /ponytail-review, /ponytail-audit. Verify with grok inspect.',
  },
  {
    id: 'cursor',
    name: 'Cursor',
    badge: 'Native Lifecycle Hooks',
    category: 'AI Editor',
    type: 'hooks',
    command: `git clone https://github.com/DietrichGebert/ponytail\nnode ponytail/scripts/cursor-hooks.js install\n\n# Or for project-only:\nnode ponytail/scripts/cursor-hooks.js install --project`,
    note: 'Merges hooks into ~/.cursor/hooks.json. Level arrives through sessionStart. Type /ponytail lite|full|ultra|off as a message to toggle. Rule alternative: .cursor/rules/ponytail.mdc.',
  },
  {
    id: 'windsurf',
    name: 'Windsurf',
    badge: 'Ruleset Integration',
    category: 'AI Editor',
    type: 'rules',
    command: `# Copy rules into Windsurf rules directory:\ncp -r .windsurf/rules/ <your-project>/.windsurf/rules/\n\n# Or rely on root AGENTS.md`,
    note: 'Loads the always-on ruleset for Cascade to enforce minimal code and native API preference.',
  },
  {
    id: 'cline',
    name: 'Cline',
    badge: 'clinerules',
    category: 'VS Code Extension',
    type: 'rules',
    command: `# Copy rules to .clinerules:\ncp -r .clinerules/ <your-project>/.clinerules/\n\n# Cline enforces rules on every tool execution`,
    note: 'Injected into system instructions for Cline autonomous code generation turns.',
  },
  {
    id: 'kiro',
    name: 'Kiro',
    badge: 'Steering Document',
    category: 'AI Agent',
    type: 'rules',
    command: `# Global steering:\ncp .kiro/steering/ponytail.md ~/.kiro/steering/\n\n# Or project-level steering:\ncp .kiro/steering/ponytail.md <your-project>/.kiro/steering/`,
    note: 'Kiro reads steering files on each session to prevent over-architecting.',
  },
  {
    id: 'jetbrains-junie',
    name: 'JetBrains Junie',
    badge: 'Guidelines Path',
    category: 'IDE Assistant',
    type: 'config',
    command: `# Point Junie to AGENTS.md in JetBrains Settings:\nSettings → Tools → Junie → Project Settings → Guidelines Path\n# Set path to:\n./AGENTS.md`,
    note: 'Junie reads AGENTS.md directly. Legacy path is .junie/guidelines.md.',
  },
  {
    id: 'vscode-codex',
    name: 'VS Code + Codex extension',
    badge: 'AGENTS.md Zero Setup',
    category: 'VS Code Extension',
    type: 'rules',
    command: `# Works out of the box with repo AGENTS.md:\ncp AGENTS.md <your-project>/AGENTS.md\n\n# For global enforcement across all VS Code Codex projects:\ncp AGENTS.md ~/.codex/AGENTS.md`,
    note: 'Zero setup required when AGENTS.md is present in project root.',
  },
  {
    id: 'openclaw',
    name: 'OpenClaw',
    badge: 'ClawHub Package',
    category: 'Multi-Agent Hub',
    type: 'cli',
    command: `clawhub install ponytail\n\n# Additional skills:\nclawhub install ponytail-review\nclawhub install ponytail-audit\nclawhub install ponytail-debt`,
    note: 'Installs from ClawHub. Without ClawHub, copy .openclaw/skills/ponytail into ~/.openclaw/skills/.',
  },
];

export default function PonytailExtendedDoc() {
  const [selectedAgentId, setSelectedAgentId] = useState('claude-code');
  const [copiedCommand, setCopiedCommand] = useState(false);
  const [activeTab, setActiveTab] = useState<'all' | 'cli' | 'editor' | 'rules'>('all');
  const [selectedMode, setSelectedMode] = useState<'lite' | 'full' | 'ultra' | 'off'>('full');

  const selectedAgent = SUPPORTED_AGENTS.find((a) => a.id === selectedAgentId) || SUPPORTED_AGENTS[0];

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedCommand(true);
    setTimeout(() => setCopiedCommand(false), 2000);
  };

  const filteredAgents = SUPPORTED_AGENTS.filter((agent) => {
    if (activeTab === 'all') return true;
    if (activeTab === 'cli') return ['plugin', 'cli'].includes(agent.type);
    if (activeTab === 'editor') return ['hooks', 'config'].includes(agent.type);
    if (activeTab === 'rules') return agent.type === 'rules';
    return true;
  });

  return (
    <div style={{ color: '#1f2328', lineHeight: 1.65, fontSize: '14.5px' }}>
      {/* 1. Official Trendshift & GitHub Badges Bar */}
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '8px',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '16px 0',
          borderBottom: '1px solid #e1e4e8',
          marginBottom: '24px',
        }}
      >
        <a href="https://trendshift.io/repositories/50668" target="_blank" rel="noopener noreferrer">
          <img src="/Ponytail/trendshift-main.svg" alt="Trendshift Repository Ranking" style={{ height: '40px' }} />
        </a>
        <a href="https://trendshift.io/repositories/50668" target="_blank" rel="noopener noreferrer">
          <img src="/Ponytail/trendshift-daily.svg" alt="Trendshift Daily #1" style={{ height: '40px' }} />
        </a>
        <a href="https://trendshift.io/repositories/50668" target="_blank" rel="noopener noreferrer">
          <img src="/Ponytail/trendshift-weekly.svg" alt="Trendshift Weekly Ranking" style={{ height: '40px' }} />
        </a>
        <a href="https://trendshift.io/repositories/50668" target="_blank" rel="noopener noreferrer">
          <img src="/Ponytail/trendshift-monthly.svg" alt="Trendshift Monthly JavaScript Ranking" style={{ height: '40px' }} />
        </a>
      </div>

      {/* 2. Hero Headline & Motto */}
      <div style={{ textAlign: 'center', marginBottom: '24px' }}>
        <h1 style={{ fontSize: '32px', fontWeight: 800, color: '#0f172a', margin: '0 0 6px', letterSpacing: '-0.02em' }}>
          Ponytail
        </h1>
        <p style={{ fontSize: '18px', fontStyle: 'italic', color: '#475569', margin: '0 0 12px' }}>
          &ldquo;He says nothing. He writes one line. It works.&rdquo;
        </p>
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            background: '#f1f5f9',
            border: '1px solid #cbd5e1',
            padding: '6px 14px',
            borderRadius: '99px',
            fontSize: '13px',
            fontWeight: 700,
            color: '#0f172a',
          }}
        >
          <span>📉 ~54% less code (up to 94%)</span>
          <span>·</span>
          <span>💰 ~20% cheaper</span>
          <span>·</span>
          <span>⚡ ~27% faster</span>
          <span>·</span>
          <span style={{ color: '#16a34a' }}>🛡️ 100% safe</span>
        </div>
      </div>

      {/* 3. Hero Visual Infographic */}
      <div
        style={{
          borderRadius: '12px',
          overflow: 'hidden',
          border: '1px solid #d0d7de',
          background: '#000000',
          textAlign: 'center',
          boxShadow: '0 8px 24px rgba(0, 0, 0, 0.12)',
          marginBottom: '28px',
        }}
      >
        <img
          src="/images/ponytail By Vnhax.net.png"
          alt="Ponytail Architecture — Too Much Code vs One Simple Line"
          style={{ width: '100%', maxHeight: '520px', objectFit: 'contain', display: 'block', margin: '0 auto' }}
        />
      </div>

      {/* 4. The Senior Dev Narrative */}
      <blockquote
        style={{
          margin: '0 0 32px',
          padding: '16px 20px',
          background: '#f8fafc',
          borderLeft: '4px solid #2563eb',
          borderRadius: '0 8px 8px 0',
          fontSize: '15px',
          lineHeight: 1.6,
          color: '#334155',
        }}
      >
        You know him. Long ponytail. Oval glasses. Has been at the company longer than the version control. You show him fifty lines; he looks at them, says nothing, and replaces them with one.
        <br />
        <strong>Ponytail puts him inside your AI agent.</strong>
      </blockquote>

      {/* 5. Section: Before / After */}
      <section style={{ marginBottom: '40px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', borderBottom: '2px solid #e2e8f0', paddingBottom: '8px', marginBottom: '18px' }}>
          <span style={{ fontSize: '20px' }}>⚖️</span>
          <h2 style={{ fontSize: '22px', fontWeight: 800, color: '#0f172a', margin: 0 }}>
            Before / After
          </h2>
        </div>

        <p style={{ color: '#475569', marginBottom: '16px' }}>
          You ask for a date picker. Your unconstrained coding agent installs <code>flatpickr</code>, writes an unwieldy wrapper component, adds a redundant stylesheet, and starts an unprompted lecture about timezones:
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px', marginBottom: '16px' }}>
          {/* Before Box */}
          <div style={{ background: '#fef2f2', border: '1px solid #fecaca', borderRadius: '8px', padding: '16px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#b91c1c', fontWeight: 700, fontSize: '13px', marginBottom: '8px' }}>
              <span>❌ Without Ponytail (Over-Engineered)</span>
            </div>
            <pre style={{ margin: 0, background: '#450a0a', color: '#fecaca', padding: '12px', borderRadius: '6px', fontSize: '12px', overflowX: 'auto', lineHeight: 1.5 }}>
              <code>{`npm install flatpickr @types/flatpickr\n\nimport flatpickr from 'flatpickr';\nimport 'flatpickr/dist/flatpickr.css';\n\nexport const DatePickerWrapper = ({ onChange }) => {\n  const ref = useRef(null);\n  useEffect(() => {\n    const fp = flatpickr(ref.current, { onChange });\n    return () => fp.destroy();\n  }, []);\n  return <input ref={ref} className="custom-fp" />;\n};`}</code>
            </pre>
            <div style={{ fontSize: '11.5px', color: '#991b1b', marginTop: '8px' }}>
              404 lines of code, external npm bloat, potential security & bundle penalties.
            </div>
          </div>

          {/* After Box */}
          <div style={{ background: '#f0fdf4', border: '1px solid #bbf7d0', borderRadius: '8px', padding: '16px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#15803d', fontWeight: 700, fontSize: '13px', marginBottom: '8px' }}>
              <span>✅ With Ponytail (Senior Dev Minimal)</span>
            </div>
            <pre style={{ margin: 0, background: '#052e16', color: '#bbf7d0', padding: '12px', borderRadius: '6px', fontSize: '13px', overflowX: 'auto', lineHeight: 1.5 }}>
              <code>{`<!-- ponytail: browser has one -->\n<input type="date">`}</code>
            </pre>
            <div style={{ fontSize: '11.5px', color: '#166534', marginTop: '8px' }}>
              1 simple line. Native browser API. 0 dependencies. 100% accessible.
            </div>
          </div>
        </div>
      </section>

      {/* 6. Section: Numbers & Empirical Benchmarks */}
      <section style={{ marginBottom: '40px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', borderBottom: '2px solid #e2e8f0', paddingBottom: '8px', marginBottom: '18px' }}>
          <span style={{ fontSize: '20px' }}>📊</span>
          <h2 style={{ fontSize: '22px', fontWeight: 800, color: '#0f172a', margin: 0 }}>
            Numbers &amp; Empirical Benchmarks
          </h2>
        </div>

        <p style={{ color: '#475569', marginBottom: '16px' }}>
          The honest measurement is a real agent doing real work: a headless <strong>Claude Code session editing FastAPI + React (tiangolo&apos;s full-stack-fastapi-template)</strong>, scored strictly on the <code>git diff</code> it produces across 12 feature tickets (Haiku 4.5, n=4).
        </p>

        {/* Benchmark SVG Chart */}
        <div
          style={{
            background: '#0d1117',
            border: '1px solid #30363d',
            borderRadius: '10px',
            padding: '16px',
            textAlign: 'center',
            marginBottom: '20px',
            boxShadow: '0 4px 16px rgba(0,0,0,0.2)',
          }}
        >
          <img
            src="/Ponytail/benchmark-agentic.svg"
            alt="Each arm vs baseline across LOC, tokens, cost, time, and safety"
            style={{ width: '100%', maxWidth: '820px', height: 'auto', display: 'block', margin: '0 auto' }}
          />
        </div>

        {/* Numbers Comparison Table */}
        <div style={{ overflowX: 'auto', marginBottom: '16px' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13.5px', textAlign: 'left' }}>
            <thead>
              <tr style={{ background: '#f6f8fa', borderBottom: '2px solid #d0d7de' }}>
                <th style={{ padding: '10px 14px' }}>vs no-skill baseline</th>
                <th style={{ padding: '10px 14px', textAlign: 'right' }}>LOC</th>
                <th style={{ padding: '10px 14px', textAlign: 'right' }}>Tokens</th>
                <th style={{ padding: '10px 14px', textAlign: 'right' }}>Cost</th>
                <th style={{ padding: '10px 14px', textAlign: 'right' }}>Time</th>
                <th style={{ padding: '10px 14px', textAlign: 'right' }}>Safety Guard</th>
              </tr>
            </thead>
            <tbody>
              <tr style={{ borderBottom: '1px solid #d0d7de', background: '#ecfdf5', fontWeight: 700 }}>
                <td style={{ padding: '10px 14px', color: '#166534' }}>⚡ ponytail</td>
                <td style={{ padding: '10px 14px', textAlign: 'right', color: '#166534' }}>-54%</td>
                <td style={{ padding: '10px 14px', textAlign: 'right', color: '#166534' }}>-22%</td>
                <td style={{ padding: '10px 14px', textAlign: 'right', color: '#166534' }}>-20%</td>
                <td style={{ padding: '10px 14px', textAlign: 'right', color: '#166534' }}>-27%</td>
                <td style={{ padding: '10px 14px', textAlign: 'right', color: '#166534' }}>100%</td>
              </tr>
              <tr style={{ borderBottom: '1px solid #d0d7de' }}>
                <td style={{ padding: '10px 14px' }}>caveman (terse-prose control)</td>
                <td style={{ padding: '10px 14px', textAlign: 'right' }}>-20%</td>
                <td style={{ padding: '10px 14px', textAlign: 'right', color: '#b91c1c' }}>+7%</td>
                <td style={{ padding: '10px 14px', textAlign: 'right', color: '#b91c1c' }}>+3%</td>
                <td style={{ padding: '10px 14px', textAlign: 'right', color: '#b91c1c' }}>+2%</td>
                <td style={{ padding: '10px 14px', textAlign: 'right' }}>100%</td>
              </tr>
              <tr style={{ borderBottom: '1px solid #d0d7de' }}>
                <td style={{ padding: '10px 14px' }}>&ldquo;YAGNI + one-liners&rdquo; prompt</td>
                <td style={{ padding: '10px 14px', textAlign: 'right' }}>-33%</td>
                <td style={{ padding: '10px 14px', textAlign: 'right' }}>-14%</td>
                <td style={{ padding: '10px 14px', textAlign: 'right' }}>-21%</td>
                <td style={{ padding: '10px 14px', textAlign: 'right' }}>-30%</td>
                <td style={{ padding: '10px 14px', textAlign: 'right', color: '#b91c1c' }}>95% (Failed 1)</td>
              </tr>
            </tbody>
          </table>
        </div>

        <p style={{ fontSize: '13px', color: '#64748b' }}>
          <strong>Key Takeaway:</strong> Ponytail is the only arm that cuts every single metric while maintaining <strong>100% security and safety compliance</strong>. The cut is largest where over-building is common (date picker 404 → 23 lines; color picker 287 → 23 lines) by reaching for native browser elements.
        </p>
      </section>

      {/* 7. Section: How It Works (The 7-Rung Ladder) */}
      <section style={{ marginBottom: '40px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', borderBottom: '2px solid #e2e8f0', paddingBottom: '8px', marginBottom: '18px' }}>
          <span style={{ fontSize: '20px' }}>🪜</span>
          <h2 style={{ fontSize: '22px', fontWeight: 800, color: '#0f172a', margin: 0 }}>
            How It Works (The 7-Rung Decision Ladder)
          </h2>
        </div>

        <p style={{ color: '#475569', marginBottom: '16px' }}>
          Before generating code diffs, the agent stops at the <strong>first rung that holds</strong>:
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '20px' }}>
          {[
            { step: '1', question: 'Does this need to exist?', action: 'no: skip it (YAGNI)' },
            { step: '2', question: 'Already in this codebase?', action: "reuse it, don't rewrite" },
            { step: '3', question: 'Stdlib does it?', action: 'use it' },
            { step: '4', question: 'Native platform feature?', action: 'use it (native APIs, <input>)' },
            { step: '5', question: 'Installed dependency?', action: 'use it from existing package.json' },
            { step: '6', question: 'One line?', action: 'one line' },
            { step: '7', question: 'Only then:', action: 'the minimum that works' },
          ].map((rung) => (
            <div
              key={rung.step}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '10px 16px',
                background: '#f8fafc',
                border: '1px solid #e2e8f0',
                borderRadius: '8px',
                fontSize: '13.5px',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <span style={{ width: '24px', height: '24px', borderRadius: '50%', background: '#0f172a', color: '#ffffff', display: 'grid', placeItems: 'center', fontSize: '11px', fontWeight: 700 }}>
                  {rung.step}
                </span>
                <span style={{ fontWeight: 600, color: '#1e293b' }}>{rung.question}</span>
              </div>
              <span style={{ fontFamily: 'monospace', color: '#2563eb', fontWeight: 600 }}>
                → {rung.action}
              </span>
            </div>
          ))}
        </div>

        <div style={{ background: '#f8fafc', padding: '14px 18px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '13px', color: '#475569' }}>
          🛡️ <strong>Lazy, not negligent:</strong> Trust-boundary validation, data-loss handling, defensive security audits, and WCAG accessibility standards are <strong>never</strong> on the chopping block.
        </div>
      </section>

      {/* 8. Section: Install Guide for ALL 20 AGENTS */}
      <section style={{ marginBottom: '40px' }} id="install-guide">
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px', borderBottom: '2px solid #e2e8f0', paddingBottom: '8px', marginBottom: '18px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ fontSize: '20px' }}>🚀</span>
            <h2 style={{ fontSize: '22px', fontWeight: 800, color: '#0f172a', margin: 0 }}>
              Install &amp; Setup for All 20 Coding Agents
            </h2>
          </div>
          <span style={{ fontSize: '12px', color: '#2563eb', background: '#eff6ff', padding: '3px 10px', borderRadius: '99px', fontWeight: 600 }}>
            Works with 20 Agents
          </span>
        </div>

        <p style={{ color: '#475569', marginBottom: '16px' }}>
          Select your active environment below to get instant copy-paste installation commands and lifecycle hook configurations:
        </p>

        {/* Filter Pills */}
        <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', marginBottom: '16px' }}>
          {[
            { id: 'all', label: 'All 20 Agents' },
            { id: 'cli', label: 'CLI & Terminal Harnesses' },
            { id: 'editor', label: 'IDEs & Extensions' },
            { id: 'rules', label: 'Rules & Steering' },
          ].map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id as any)}
              style={{
                fontSize: '12px',
                fontWeight: activeTab === tab.id ? 700 : 500,
                color: activeTab === tab.id ? '#ffffff' : '#475569',
                background: activeTab === tab.id ? '#0f172a' : '#f1f5f9',
                border: '1px solid',
                borderColor: activeTab === tab.id ? '#0f172a' : '#e2e8f0',
                padding: '4px 12px',
                borderRadius: '6px',
                cursor: 'pointer',
              }}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Agent Cards Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(170px, 1fr))',
            gap: '8px',
            marginBottom: '20px',
            maxHeight: '260px',
            overflowY: 'auto',
            padding: '4px',
            background: '#f8fafc',
            border: '1px solid #e2e8f0',
            borderRadius: '8px',
          }}
        >
          {filteredAgents.map((agent) => {
            const isSelected = agent.id === selectedAgentId;
            return (
              <button
                key={agent.id}
                type="button"
                onClick={() => setSelectedAgentId(agent.id)}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'flex-start',
                  textAlign: 'left',
                  padding: '8px 12px',
                  borderRadius: '6px',
                  border: isSelected ? '2px solid #2563eb' : '1px solid #e2e8f0',
                  background: isSelected ? '#ffffff' : '#ffffff',
                  boxShadow: isSelected ? '0 2px 8px rgba(37, 99, 235, 0.15)' : 'none',
                  cursor: 'pointer',
                  transition: 'all 0.15s ease',
                }}
              >
                <span style={{ fontSize: '13px', fontWeight: isSelected ? 700 : 600, color: isSelected ? '#2563eb' : '#0f172a' }}>
                  {agent.name}
                </span>
                <span style={{ fontSize: '10.5px', color: '#64748b' }}>{agent.category}</span>
              </button>
            );
          })}
        </div>

        {/* Active Selected Agent Detail Box */}
        <div
          style={{
            border: '1px solid #cbd5e1',
            borderRadius: '10px',
            background: '#ffffff',
            padding: '20px',
            boxShadow: '0 4px 12px rgba(0,0,0,0.03)',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <h3 style={{ fontSize: '18px', fontWeight: 800, margin: 0, color: '#0f172a' }}>
                {selectedAgent.name}
              </h3>
              <span style={{ fontSize: '11px', fontWeight: 600, color: '#2563eb', background: '#eff6ff', padding: '2px 8px', borderRadius: '4px' }}>
                {selectedAgent.badge}
              </span>
            </div>

            <button
              type="button"
              onClick={() => handleCopy(selectedAgent.command)}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                fontSize: '12px',
                fontWeight: 600,
                color: copiedCommand ? '#166534' : '#0f172a',
                background: copiedCommand ? '#dcfce7' : '#f1f5f9',
                border: '1px solid #cbd5e1',
                padding: '4px 10px',
                borderRadius: '6px',
                cursor: 'pointer',
              }}
            >
              {copiedCommand ? '✓ Copied' : 'Copy Commands'}
            </button>
          </div>

          <pre
            style={{
              background: '#0f172a',
              color: '#f8fafc',
              padding: '14px',
              borderRadius: '8px',
              fontSize: '13px',
              fontFamily: 'ui-monospace, SFMono-Regular, Menlo, monospace',
              overflowX: 'auto',
              margin: '0 0 12px',
              lineHeight: 1.5,
            }}
          >
            <code>{selectedAgent.command}</code>
          </pre>

          <p style={{ fontSize: '13px', color: '#475569', margin: 0, lineHeight: 1.6 }}>
            💡 <strong>Integration Note:</strong> {selectedAgent.note}
          </p>
        </div>
      </section>

      {/* 9. Section: Interactive Commands & Intensity Modes */}
      <section style={{ marginBottom: '40px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', borderBottom: '2px solid #e2e8f0', paddingBottom: '8px', marginBottom: '18px' }}>
          <span style={{ fontSize: '20px' }}>⚡</span>
          <h2 style={{ fontSize: '22px', fontWeight: 800, color: '#0f172a', margin: 0 }}>
            Interactive Commands &amp; Modes
          </h2>
        </div>

        {/* Mode Switcher Preview */}
        <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '8px', padding: '16px', marginBottom: '18px' }}>
          <div style={{ fontSize: '13px', fontWeight: 700, color: '#334155', marginBottom: '8px' }}>
            Ponytail Intensity Level Switcher:
          </div>
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
            {[
              { id: 'lite', label: '/ponytail lite', desc: 'Gentle nudges; flags obvious duplicate utilities' },
              { id: 'full', label: '/ponytail full (Default)', desc: 'Standard senior dev rigor; forces stdlib and native APIs' },
              { id: 'ultra', label: '/ponytail ultra', desc: 'Maximum aggression; for when the codebase has wronged you personally' },
              { id: 'off', label: '/ponytail off', desc: 'Temporarily disable poncho interceptors' },
            ].map((m) => (
              <button
                key={m.id}
                type="button"
                onClick={() => setSelectedMode(m.id as any)}
                style={{
                  fontSize: '12px',
                  fontWeight: selectedMode === m.id ? 700 : 500,
                  color: selectedMode === m.id ? '#ffffff' : '#334155',
                  background: selectedMode === m.id ? '#2563eb' : '#ffffff',
                  border: '1px solid',
                  borderColor: selectedMode === m.id ? '#2563eb' : '#cbd5e1',
                  padding: '6px 12px',
                  borderRadius: '6px',
                  cursor: 'pointer',
                }}
              >
                {m.label}
              </button>
            ))}
          </div>
        </div>

        {/* Commands Table */}
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13.5px' }}>
            <thead>
              <tr style={{ background: '#f6f8fa', borderBottom: '2px solid #d0d7de', textAlign: 'left' }}>
                <th style={{ padding: '10px 14px' }}>Command</th>
                <th style={{ padding: '10px 14px' }}>Description &amp; Action</th>
              </tr>
            </thead>
            <tbody>
              <tr style={{ borderBottom: '1px solid #d0d7de' }}>
                <td style={{ padding: '10px 14px', fontFamily: 'monospace', color: '#2563eb', fontWeight: 600 }}>/ponytail [mode]</td>
                <td style={{ padding: '10px 14px' }}>Set intensity (lite | full | ultra | off), or view current active level.</td>
              </tr>
              <tr style={{ borderBottom: '1px solid #d0d7de' }}>
                <td style={{ padding: '10px 14px', fontFamily: 'monospace', color: '#2563eb', fontWeight: 600 }}>/ponytail-review</td>
                <td style={{ padding: '10px 14px' }}>Review the proposed git diff for over-engineering, hand back a precise delete list.</td>
              </tr>
              <tr style={{ borderBottom: '1px solid #d0d7de' }}>
                <td style={{ padding: '10px 14px', fontFamily: 'monospace', color: '#2563eb', fontWeight: 600 }}>/ponytail-audit</td>
                <td style={{ padding: '10px 14px' }}>Audit the whole repository for bloated abstractions and duplicate helper libraries.</td>
              </tr>
              <tr style={{ borderBottom: '1px solid #d0d7de' }}>
                <td style={{ padding: '10px 14px', fontFamily: 'monospace', color: '#2563eb', fontWeight: 600 }}>/ponytail-debt</td>
                <td style={{ padding: '10px 14px' }}>Harvest deferred <code>ponytail:</code> shortcuts into an actionable technical debt ledger.</td>
              </tr>
              <tr style={{ borderBottom: '1px solid #d0d7de' }}>
                <td style={{ padding: '10px 14px', fontFamily: 'monospace', color: '#2563eb', fontWeight: 600 }}>/ponytail-gain</td>
                <td style={{ padding: '10px 14px' }}>Show measured session scoreboard (lines cut, tokens conserved, latency saved).</td>
              </tr>
              <tr style={{ borderBottom: '1px solid #d0d7de' }}>
                <td style={{ padding: '10px 14px', fontFamily: 'monospace', color: '#2563eb', fontWeight: 600 }}>/ponytail-help</td>
                <td style={{ padding: '10px 14px' }}>Display quick reference guide for all commands and active lifecycle hooks.</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* 10. Section: Star History */}
      <section style={{ marginBottom: '40px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', borderBottom: '2px solid #e2e8f0', paddingBottom: '8px', marginBottom: '18px' }}>
          <span style={{ fontSize: '20px' }}>⭐</span>
          <h2 style={{ fontSize: '22px', fontWeight: 800, color: '#0f172a', margin: 0 }}>
            GitHub Star Velocity &amp; History
          </h2>
        </div>

        <div
          style={{
            background: '#0d1117',
            border: '1px solid #30363d',
            borderRadius: '10px',
            padding: '16px',
            textAlign: 'center',
            boxShadow: '0 4px 16px rgba(0,0,0,0.2)',
          }}
        >
          <img
            src="/Ponytail/star-history-dark.svg"
            alt="Ponytail GitHub Star History Chart"
            style={{ width: '100%', maxWidth: '800px', height: 'auto', display: 'block', margin: '0 auto' }}
          />
        </div>
      </section>

      {/* 11. Section: FAQ */}
      <section style={{ marginBottom: '40px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', borderBottom: '2px solid #e2e8f0', paddingBottom: '8px', marginBottom: '18px' }}>
          <span style={{ fontSize: '20px' }}>❓</span>
          <h2 style={{ fontSize: '22px', fontWeight: 800, color: '#0f172a', margin: 0 }}>
            Frequently Asked Questions
          </h2>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {[
            {
              q: 'Can I use it with Caveman?',
              a: 'Yes, and you should. Caveman shrinks what the agent says; ponytail shrinks what it builds. Different halves, no overlap: caveman leaves code byte-for-byte exact, ponytail stays out of the prose. Terse talk about minimal code.',
            },
            {
              q: 'Does it need a config file?',
              a: 'No. An optional ~/.config/ponytail/config.json or PONYTAIL_DEFAULT_MODE env var can set the default level, but nothing is required.',
            },
            {
              q: 'What if I really need the 120-line cache class?',
              a: "You don't. Insist anyway and he'll build it. Slowly. Correctly. While looking at you.",
            },
            {
              q: 'Does it scale?',
              a: 'The code you never wrote scales infinitely. Zero bugs, zero CVEs, 100% uptime since forever.',
            },
            {
              q: 'Why "ponytail"?',
              a: 'You know exactly why.',
            },
          ].map((faq, idx) => (
            <details
              key={idx}
              style={{
                border: '1px solid #d0d7de',
                borderRadius: '8px',
                padding: '14px 18px',
                background: '#ffffff',
              }}
            >
              <summary style={{ fontWeight: 700, fontSize: '14.5px', cursor: 'pointer', color: '#1f2328' }}>
                {faq.q}
              </summary>
              <p style={{ fontSize: '13.5px', color: '#475569', margin: '10px 0 0', lineHeight: 1.6 }}>
                {faq.a}
              </p>
            </details>
          ))}
        </div>
      </section>
    </div>
  );
}
