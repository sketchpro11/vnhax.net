'use client';

import React, { useState } from 'react';
import Image from 'next/image';

export default function CavemanExtendedDoc() {
  const [selectedVoice, setSelectedVoice] = useState<'caveman' | 'ultracave' | 'megacave'>('caveman');
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div style={{ maxWidth: '1100px', margin: '0 auto', fontFamily: 'inherit' }}>
      {/* 1. Top Badges & Accolades */}
      <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '24px', alignItems: 'center' }}>
        <span style={{ background: '#ea580c', color: '#ffffff', fontSize: '11px', fontWeight: 700, padding: '4px 10px', borderRadius: '6px' }}>
          🪨 #1 GITHUB TRENDING (JUL 2026)
        </span>
        <span style={{ background: '#d97706', color: '#ffffff', fontSize: '11px', fontWeight: 700, padding: '4px 10px', borderRadius: '6px' }}>
          #1 ON HACKER NEWS (904 PTS)
        </span>
        <span style={{ background: '#059669', color: '#ffffff', fontSize: '11px', fontWeight: 700, padding: '4px 10px', borderRadius: '6px' }}>
          33.2% FEWER INPUT TOKENS
        </span>
        <span style={{ background: '#7c3aed', color: '#ffffff', fontSize: '11px', fontWeight: 700, padding: '4px 10px', borderRadius: '6px' }}>
          CITED BY ADOBE RESEARCH
        </span>
        <span style={{ background: '#1e293b', color: '#94a3b8', fontSize: '11px', fontWeight: 600, padding: '4px 10px', borderRadius: '6px', border: '1px solid #334155' }}>
          APACHE-2.0 LICENSE
        </span>
      </div>

      {/* 2. Hero Presentation Card */}
      <div
        style={{
          background: 'linear-gradient(135deg, rgba(20, 14, 4, 0.95) 0%, rgba(30, 20, 10, 0.9) 100%)',
          border: '1px solid rgba(234, 88, 12, 0.35)',
          borderRadius: '16px',
          padding: '24px',
          marginBottom: '36px',
          boxShadow: '0 20px 40px -15px rgba(234, 88, 12, 0.2)',
        }}
      >
        <div style={{ borderRadius: '12px', overflow: 'hidden', border: '1px solid rgba(255,255,255,0.1)', marginBottom: '24px' }}>
          <Image
            src="/images/Caveman AI by vnhax.net.png"
            alt="Caveman - why many token when few do trick"
            width={1200}
            height={630}
            priority
            style={{ width: '100%', height: 'auto', display: 'block' }}
          />
        </div>

        <div style={{ display: 'inline-block', color: '#fb923c', fontSize: '12px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '8px' }}>
          JuliusBrussee / caveman — why many token when few do trick
        </div>
        <h1 style={{ fontSize: '28px', fontWeight: 800, color: '#ffffff', margin: '0 0 12px 0', lineHeight: 1.2 }}>
          Caveman: Token Optimization Proxy &amp; Terse Voice Harness
        </h1>
        <p style={{ color: '#fed7aa', fontSize: '14.5px', lineHeight: 1.6, margin: '0 0 20px 0' }}>
          <strong>Caveman make your AI agent say less and read less. Code stay exact. Brain still big.</strong><br />
          The skill shrinks what the agent <em>says</em> by stripping conversational filler. The local proxy shrinks what it <em>reads</em> (logs, test runs, JSON dumps, web pages) by up to 99%.
        </p>

        {/* 3 Metric Summary Boxes */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '12px' }}>
          <div style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(249, 115, 22, 0.25)', padding: '14px 18px', borderRadius: '10px' }}>
            <div style={{ color: '#fb923c', fontSize: '22px', fontWeight: 800 }}>33.2% fewer</div>
            <div style={{ color: '#fed7aa', fontSize: '12px', fontWeight: 600 }}>Input tokens through proxy</div>
            <div style={{ color: '#9a3412', fontSize: '11px', marginTop: '2px' }}>54 Claude Code runs, 18/18 right</div>
          </div>
          <div style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(249, 115, 22, 0.25)', padding: '14px 18px', borderRadius: '10px' }}>
            <div style={{ color: '#f97316', fontSize: '22px', fontWeight: 800 }}>129.8× smaller</div>
            <div style={{ color: '#fed7aa', fontSize: '12px', fontWeight: 600 }}>Web pages for the agent</div>
            <div style={{ color: '#9a3412', fontSize: '11px', marginTop: '2px' }}>caveman browse vs Playwright</div>
          </div>
          <div style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(249, 115, 22, 0.25)', padding: '14px 18px', borderRadius: '10px' }}>
            <div style={{ color: '#fdba74', fontSize: '22px', fontWeight: 800 }}>1.4× to 2.4×</div>
            <div style={{ color: '#fed7aa', fontSize: '12px', fontWeight: 600 }}>Cheaper execution cost</div>
            <div style={{ color: '#9a3412', fontSize: '11px', marginTop: '2px' }}>Adobe Research (8 frontier models)</div>
          </div>
        </div>
      </div>

      {/* 3. Before vs After: Token Comparison */}
      <div style={{ marginBottom: '40px' }}>
        <h2 style={{ fontSize: '20px', fontWeight: 700, color: '#0f172a', margin: '0 0 14px 0' }}>
          Same Answer. 63 Tokens Become 20. Brain Still Big.
        </h2>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '16px', marginBottom: '16px' }}>
          <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '10px', padding: '18px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
              <span style={{ fontWeight: 700, color: '#64748b', fontSize: '13px' }}>Normal Agent</span>
              <span style={{ background: '#f1f5f9', color: '#475569', fontSize: '11px', fontWeight: 700, padding: '2px 8px', borderRadius: '4px' }}>63 tokens</span>
            </div>
            <blockquote style={{ margin: 0, color: '#475569', fontSize: '13px', lineHeight: 1.6, fontStyle: 'italic', borderLeft: '3px solid #cbd5e1', paddingLeft: '12px' }}>
              &ldquo;The reason your React component is re-rendering is likely because you&apos;re creating a new object reference on each render cycle. When you pass an inline object as a prop, React&apos;s shallow comparison sees it as a different object every time, which triggers a re-render. I&apos;d recommend using useMemo to memoize the object.&rdquo;
            </blockquote>
          </div>

          <div style={{ background: '#fff7ed', border: '1px solid #fed7aa', borderRadius: '10px', padding: '18px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
              <span style={{ fontWeight: 700, color: '#c2410c', fontSize: '13px' }}>🪨 Caveman Agent</span>
              <span style={{ background: '#ffedd5', color: '#9a3412', fontSize: '11px', fontWeight: 700, padding: '2px 8px', borderRadius: '4px' }}>20 tokens (-68%)</span>
            </div>
            <blockquote style={{ margin: 0, color: '#9a3412', fontSize: '13.5px', lineHeight: 1.6, fontWeight: 600, borderLeft: '3px solid #ea580c', paddingLeft: '12px' }}>
              &ldquo;New object ref each render, so React re-renders. Wrap the prop in <code>useMemo</code>.&rdquo;
            </blockquote>
          </div>
        </div>

        {/* The 3 Voice Dial Modes */}
        <div style={{ background: '#020617', border: '1px solid #1e293b', borderRadius: '10px', padding: '16px' }}>
          <div style={{ color: '#94a3b8', fontSize: '11.5px', marginBottom: '10px', fontWeight: 600 }}>
            PICK YOUR CLUB: THREE TERSE INTENSITY MODES
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '10px' }}>
            <div style={{ background: '#0f172a', padding: '12px', borderRadius: '8px', border: '1px solid #334155' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
                <code style={{ color: '#fb923c', fontWeight: 700, fontSize: '13px' }}>/caveman</code>
                <span style={{ color: '#4ade80', fontSize: '11px', fontWeight: 700 }}>20 tokens</span>
              </div>
              <p style={{ color: '#cbd5e1', fontSize: '12px', margin: 0 }}>
                &ldquo;New object ref each render, so React re-renders. Wrap the prop in <code>useMemo</code>.&rdquo;
              </p>
            </div>

            <div style={{ background: '#0f172a', padding: '12px', borderRadius: '8px', border: '1px solid #334155' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
                <code style={{ color: '#f97316', fontWeight: 700, fontSize: '13px' }}>/ultracave</code>
                <span style={{ color: '#4ade80', fontSize: '11px', fontWeight: 700 }}>14 tokens</span>
              </div>
              <p style={{ color: '#cbd5e1', fontSize: '12px', margin: 0 }}>
                &ldquo;Inline object prop, new ref, re-render. <code>useMemo</code>.&rdquo;
              </p>
            </div>

            <div style={{ background: '#0f172a', padding: '12px', borderRadius: '8px', border: '1px solid #334155' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
                <code style={{ color: '#ea580c', fontWeight: 700, fontSize: '13px' }}>/megacave</code>
                <span style={{ color: '#4ade80', fontSize: '11px', fontWeight: 700 }}>13 tokens</span>
              </div>
              <p style={{ color: '#cbd5e1', fontSize: '12px', margin: 0 }}>
                &ldquo;New ref triggers re-render. <code>useMemo</code>.&rdquo;
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* 4. How caveman talks */}
      <div style={{ marginBottom: '40px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
          <span style={{ background: '#ea580c', color: '#fff', fontSize: '11px', fontWeight: 700, padding: '2px 8px', borderRadius: '4px' }}>
            THE VOICE
          </span>
          <h2 style={{ fontSize: '20px', fontWeight: 700, color: '#0f172a', margin: 0 }}>
            How Caveman Talks (Rules of Grammar &amp; Silence)
          </h2>
        </div>
        <p style={{ color: '#475569', fontSize: '13px', margin: '0 0 16px 0' }}>
          Caveman is a disciplined voice, not broken grammar. Every reply follows strict linguistic rules:
        </p>

        <div style={{ border: '1px solid #e2e8f0', borderRadius: '10px', overflow: 'hidden' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '12.5px', textAlign: 'left' }}>
            <thead>
              <tr style={{ background: '#f8fafc', borderBottom: '1px solid #e2e8f0', color: '#475569' }}>
                <th style={{ padding: '10px 14px', width: '200px' }}>Rule</th>
                <th style={{ padding: '10px 14px' }}>What It Means</th>
              </tr>
            </thead>
            <tbody>
              {[
                { rule: 'Answer first', desc: '[thing] [action] [reason]. [next step]. No greeting, no "let me", no recap, no "hope this helps".' },
                { rule: 'One idea per sentence', desc: 'Built on ASD-STE100 (controlled English for aircraft maintenance): 20 words max, active voice, one term per thing.' },
                { rule: 'Meaning never dropped', desc: 'Articles can go. "not", "never", "no", "only" never go. Numbers and units stay exact.' },
                { rule: 'Payload verbatim', desc: 'Code snippets, shell commands, file paths, and error messages are untouched character-for-character.' },
                { rule: 'Quiet tool runs', desc: 'No conversational chatter between tool calls. One line per phase, one line with the result.' },
                { rule: 'Knows when to stop', desc: 'Security warnings, irreversible actions, multi-step ordering, and confused users get full sentences. Then grunt resumes.' },
                { rule: 'Never performs', desc: 'No cartoonish "me think", no caveman prefix. If caveman phrasing is not shorter, plain English wins.' },
                { rule: 'Your prompts stay yours', desc: 'User prompts are never rewritten. Research shows compressing user prompts backfires and hurts answer accuracy.' },
              ].map((row, idx) => (
                <tr key={row.rule} style={{ borderBottom: idx === 7 ? 'none' : '1px solid #f1f5f9', background: idx % 2 === 0 ? '#ffffff' : '#fafafa' }}>
                  <td style={{ padding: '10px 14px', fontWeight: 700, color: '#c2410c' }}>{row.rule}</td>
                  <td style={{ padding: '10px 14px', color: '#334155', lineHeight: 1.5 }}>{row.desc}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* 5. Install */}
      <div style={{ marginBottom: '40px', background: '#020617', border: '1px solid #1e293b', borderRadius: '12px', padding: '24px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px', flexWrap: 'wrap', gap: '8px' }}>
          <div>
            <span style={{ color: '#fb923c', fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.08em', fontWeight: 700 }}>
              Setup &amp; Harness Distribution
            </span>
            <h2 style={{ fontSize: '20px', fontWeight: 700, color: '#f8fafc', margin: '4px 0 0 0' }}>
              Install (Works With 30+ Agents)
            </h2>
          </div>
          <button
            type="button"
            onClick={() => handleCopy('npx skills add JuliusBrussee/caveman -g', 'install-skills')}
            style={{
              background: copiedId === 'install-skills' ? '#16a34a' : '#ea580c',
              color: '#ffffff',
              border: 'none',
              padding: '6px 14px',
              borderRadius: '6px',
              fontSize: '12px',
              fontWeight: 600,
              cursor: 'pointer',
            }}
          >
            {copiedId === 'install-skills' ? '✓ Copied' : 'Copy Primary Command'}
          </button>
        </div>

        <pre style={{ background: '#090d16', padding: '14px 18px', borderRadius: '8px', color: '#38bdf8', fontSize: '13px', fontFamily: 'monospace', margin: '0 0 16px 0', border: '1px solid #1e293b', overflowX: 'auto' }}>
npx skills add JuliusBrussee/caveman -g
        </pre>
        <p style={{ color: '#94a3b8', fontSize: '12px', margin: '0 0 16px 0' }}>
          Works immediately in Claude Code, Codex, Gemini CLI, Cursor, Windsurf, Cline, Copilot, and 30+ more. Type <code>/caveman</code> to start. Say <code>stop caveman</code> to exit.
        </p>

        {/* Other install ways accordion */}
        <div style={{ background: '#0f172a', borderRadius: '8px', padding: '14px', border: '1px solid #1e293b' }}>
          <div style={{ color: '#cbd5e1', fontSize: '12px', fontWeight: 700, marginBottom: '8px' }}>
            Harness-Specific Install Commands:
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '8px' }}>
            <div>
              <span style={{ color: '#94a3b8', fontSize: '11px' }}>Claude Code Plugin:</span>
              <pre style={{ background: '#020617', padding: '8px 10px', borderRadius: '4px', color: '#4ade80', fontSize: '11px', margin: '2px 0 0 0', overflowX: 'auto' }}>
claude plugin marketplace add JuliusBrussee/caveman && claude plugin install caveman@caveman
              </pre>
            </div>
            <div>
              <span style={{ color: '#94a3b8', fontSize: '11px' }}>Gemini CLI:</span>
              <pre style={{ background: '#020617', padding: '8px 10px', borderRadius: '4px', color: '#4ade80', fontSize: '11px', margin: '2px 0 0 0', overflowX: 'auto' }}>
gemini extensions install https://github.com/JuliusBrussee/caveman
              </pre>
            </div>
            <div>
              <span style={{ color: '#94a3b8', fontSize: '11px' }}>All agents on machine at once (macOS / Linux):</span>
              <pre style={{ background: '#020617', padding: '8px 10px', borderRadius: '4px', color: '#4ade80', fontSize: '11px', margin: '2px 0 0 0', overflowX: 'auto' }}>
curl -fsSL https://raw.githubusercontent.com/JuliusBrussee/caveman/v3.1.0/install.sh | bash
              </pre>
            </div>
            <div>
              <span style={{ color: '#94a3b8', fontSize: '11px' }}>Windows (PowerShell 5.1+):</span>
              <pre style={{ background: '#020617', padding: '8px 10px', borderRadius: '4px', color: '#4ade80', fontSize: '11px', margin: '2px 0 0 0', overflowX: 'auto' }}>
irm https://raw.githubusercontent.com/JuliusBrussee/caveman/v3.1.0/install.ps1 | iex
              </pre>
            </div>
          </div>
        </div>
      </div>

      {/* 6. The numbers & Empirical Benchmarks */}
      <div style={{ marginBottom: '40px' }}>
        <h2 style={{ fontSize: '20px', fontWeight: 700, color: '#0f172a', margin: '0 0 12px 0' }}>
          The Numbers (Empirical Benchmarks from Independent Labs)
        </h2>
        <p style={{ color: '#475569', fontSize: '13px', margin: '0 0 16px 0' }}>
          Outside research labs first, then ours. Nothing rounded up:
        </p>

        <div style={{ border: '1px solid #e2e8f0', borderRadius: '10px', overflow: 'hidden', marginBottom: '20px' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '12.5px', textAlign: 'left' }}>
            <thead>
              <tr style={{ background: '#f8fafc', borderBottom: '1px solid #e2e8f0', color: '#475569' }}>
                <th style={{ padding: '10px 14px' }}>Who</th>
                <th style={{ padding: '10px 14px' }}>Setup</th>
                <th style={{ padding: '10px 14px' }}>Result</th>
              </tr>
            </thead>
            <tbody>
              <tr style={{ borderBottom: '1px solid #f1f5f9' }}>
                <td style={{ padding: '10px 14px', fontWeight: 700, color: '#0f172a' }}>Adobe Research (CAVEWOMAN paper)</td>
                <td style={{ padding: '10px 14px', color: '#475569' }}>Caveman-style output, 8 frontier models, 5 datasets</td>
                <td style={{ padding: '10px 14px', fontWeight: 700, color: '#16a34a' }}>Cost cut 1.4× to 2.4× per model, up to 3×</td>
              </tr>
              <tr style={{ borderBottom: '1px solid #f1f5f9' }}>
                <td style={{ padding: '10px 14px', fontWeight: 700, color: '#0f172a' }}>Elastic (Elasticsearch Labs)</td>
                <td style={{ padding: '10px 14px', color: '#475569' }}>Caveman mode for Elasticsearch, 8 live MCP scenarios</td>
                <td style={{ padding: '10px 14px', fontWeight: 700, color: '#16a34a' }}>63.6% fewer response tokens (&ldquo;Zero information loss&rdquo;)</td>
              </tr>
              <tr>
                <td style={{ padding: '10px 14px', fontWeight: 700, color: '#0f172a' }}>JetBrains Research</td>
                <td style={{ padding: '10px 14px', color: '#475569' }}>86 real coding tasks, paired A/B evaluation</td>
                <td style={{ padding: '10px 14px', fontWeight: 700, color: '#16a34a' }}>No measurable quality loss (p = 0.82), 8.5% fewer output tokens</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Per-File Proxy Compression Table */}
        <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '10px', padding: '18px' }}>
          <h3 style={{ fontSize: '15px', fontWeight: 700, color: '#0f172a', margin: '0 0 10px 0' }}>
            The Proxy: 33.2% Fewer Input Tokens Across Whole Agent Sessions
          </h3>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '12px', textAlign: 'left' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid #cbd5e1', color: '#475569' }}>
                  <th style={{ padding: '8px' }}>File Type</th>
                  <th style={{ padding: '8px' }}>File Through Caveman</th>
                  <th style={{ padding: '8px' }}>File Saved</th>
                  <th style={{ padding: '8px' }}>Whole Session (3 runs)</th>
                  <th style={{ padding: '8px' }}>Session Saved</th>
                </tr>
              </thead>
              <tbody>
                <tr><td style={{ padding: '8px', fontWeight: 600 }}>CSV</td><td style={{ padding: '8px' }}>28,041 → 314</td><td style={{ padding: '8px', color: '#16a34a', fontWeight: 700 }}>98.9%</td><td style={{ padding: '8px' }}>165,823 → 74,484</td><td style={{ padding: '8px', color: '#16a34a', fontWeight: 700 }}>55.1%</td></tr>
                <tr><td style={{ padding: '8px', fontWeight: 600 }}>Logs</td><td style={{ padding: '8px' }}>22,810 → 348</td><td style={{ padding: '8px', color: '#16a34a', fontWeight: 700 }}>98.5%</td><td style={{ padding: '8px' }}>148,807 → 74,068</td><td style={{ padding: '8px', color: '#16a34a', fontWeight: 700 }}>50.2%</td></tr>
                <tr><td style={{ padding: '8px', fontWeight: 600 }}>YAML</td><td style={{ padding: '8px' }}>20,447 → 178</td><td style={{ padding: '8px', color: '#16a34a', fontWeight: 700 }}>99.1%</td><td style={{ padding: '8px' }}>132,124 → 71,027</td><td style={{ padding: '8px', color: '#16a34a', fontWeight: 700 }}>46.2%</td></tr>
                <tr><td style={{ padding: '8px', fontWeight: 600 }}>Test Output</td><td style={{ padding: '8px' }}>18,806 → 203</td><td style={{ padding: '8px', color: '#16a34a', fontWeight: 700 }}>98.9%</td><td style={{ padding: '8px' }}>150,377 → 108,514</td><td style={{ padding: '8px', color: '#16a34a', fontWeight: 700 }}>27.8%</td></tr>
                <tr><td style={{ padding: '8px', fontWeight: 600 }}>JSON</td><td style={{ padding: '8px' }}>18,837 → 281</td><td style={{ padding: '8px', color: '#16a34a', fontWeight: 700 }}>98.5%</td><td style={{ padding: '8px' }}>147,975 → 108,939</td><td style={{ padding: '8px', color: '#16a34a', fontWeight: 700 }}>26.4%</td></tr>
                <tr style={{ borderTop: '2px solid #94a3b8', fontWeight: 700 }}><td style={{ padding: '8px' }}>All 6 Types</td><td style={{ padding: '8px' }}>130,611 → 22,994</td><td style={{ padding: '8px', color: '#16a34a' }}>82.4%</td><td style={{ padding: '8px' }}>885,793 → 591,673</td><td style={{ padding: '8px', color: '#16a34a' }}>33.2%</td></tr>
              </tbody>
            </table>
          </div>
          <div style={{ marginTop: '10px', fontSize: '11px', color: '#64748b' }}>
            * 18 of 18 test answers right across all tasks.
          </div>
        </div>
      </div>

      {/* 7. The proxy */}
      <div style={{ marginBottom: '40px', background: '#020617', border: '1px solid #1e293b', borderRadius: '12px', padding: '24px' }}>
        <h2 style={{ fontSize: '20px', fontWeight: 700, color: '#f8fafc', margin: '0 0 10px 0' }}>
          Big Rock: The Proxy
        </h2>
        <p style={{ color: '#cbd5e1', fontSize: '13px', lineHeight: 1.6, margin: '0 0 16px 0' }}>
          The skill shrinks what the agent <strong>says</strong>. The proxy shrinks what it <strong>reads</strong>: logs, test output, JSON dumps, git diffs, web pages. It runs locally on your machine with your own credentials:
        </p>

        <pre style={{ background: '#090d16', padding: '14px 18px', borderRadius: '8px', color: '#38bdf8', fontSize: '13px', fontFamily: 'monospace', margin: '0 0 14px 0', border: '1px solid #1e293b' }}>
npm install -g @caveman-ai/cli && caveman setup --install
caveman claude        # or codex · gemini · aider · kilo · qwen · opencode · hermes · openclaw · pi
        </pre>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '8px' }}>
          <div style={{ background: '#0f172a', padding: '10px 14px', borderRadius: '6px', border: '1px solid #1e293b' }}>
            <code style={{ color: '#4ade80', fontSize: '12px' }}>caveman learn</code>
            <p style={{ color: '#94a3b8', fontSize: '11.5px', margin: '2px 0 0 0' }}>Ranks where tokens go from agent history on disk</p>
          </div>
          <div style={{ background: '#0f172a', padding: '10px 14px', borderRadius: '6px', border: '1px solid #1e293b' }}>
            <code style={{ color: '#4ade80', fontSize: '12px' }}>caveman shrink -- pnpm test</code>
            <p style={{ color: '#94a3b8', fontSize: '11.5px', margin: '2px 0 0 0' }}>Compresses noisy command outputs on the fly</p>
          </div>
          <div style={{ background: '#0f172a', padding: '10px 14px', borderRadius: '6px', border: '1px solid #1e293b' }}>
            <code style={{ color: '#4ade80', fontSize: '12px' }}>caveman browse &lt;url&gt;</code>
            <p style={{ color: '#94a3b8', fontSize: '11.5px', margin: '2px 0 0 0' }}>121 tokens instead of a 15,000-token web dump</p>
          </div>
          <div style={{ background: '#0f172a', padding: '10px 14px', borderRadius: '6px', border: '1px solid #1e293b' }}>
            <code style={{ color: '#4ade80', fontSize: '12px' }}>caveman stats</code>
            <p style={{ color: '#94a3b8', fontSize: '11.5px', margin: '2px 0 0 0' }}>Real token usage &amp; savings audit across sessions</p>
          </div>
        </div>
      </div>

      {/* 8. What you get */}
      <div style={{ marginBottom: '40px' }}>
        <h2 style={{ fontSize: '20px', fontWeight: 700, color: '#0f172a', margin: '0 0 12px 0' }}>
          What You Get: Commands, Subagents &amp; Work Patterns
        </h2>

        <div style={{ border: '1px solid #e2e8f0', borderRadius: '10px', overflow: 'hidden' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '12px', textAlign: 'left' }}>
            <thead>
              <tr style={{ background: '#f8fafc', borderBottom: '1px solid #e2e8f0', color: '#475569' }}>
                <th style={{ padding: '10px 14px', width: '220px' }}>Command / Component</th>
                <th style={{ padding: '10px 14px' }}>What It Does</th>
              </tr>
            </thead>
            <tbody>
              {[
                { cmd: '/caveman · /ultracave · /megacave', desc: 'The voice, the grunt, the classical concise mode. /caveman status shows mode, /caveman off stops it.' },
                { cmd: '/caveman-commit', desc: 'Generates ultra-terse, high-signal one-line Conventional Commit messages.' },
                { cmd: '/caveman-review', desc: 'One finding per line: "L42: 🔴 null deref. Guard it." Zero prose filler.' },
                { cmd: '/caveman-compress <file>', desc: 'Shrinks memory files (e.g. CLAUDE.md) by 46% and backs up the original.' },
                { cmd: '/caveman-stats', desc: 'Reads session logs and computes real token metrics for this coding session.' },
                { cmd: 'cavecrew', desc: 'Specialized subagents that find, edit, and review code, then report back in caveman voice.' },
                { cmd: 'investigate-first · surgical-patch · safe-refactor · verify-and-stop', desc: 'Built-in work patterns that write less code and minimize context turnover.' },
              ].map((item, idx) => (
                <tr key={item.cmd} style={{ borderBottom: idx === 6 ? 'none' : '1px solid #f1f5f9', background: idx % 2 === 0 ? '#ffffff' : '#fafafa' }}>
                  <td style={{ padding: '10px 14px', fontWeight: 700, color: '#c2410c', fontFamily: 'monospace' }}>{item.cmd}</td>
                  <td style={{ padding: '10px 14px', color: '#334155', lineHeight: 1.5 }}>{item.desc}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* 9. The skill, unpacked & The proxy, unpacked */}
      <div style={{ marginBottom: '40px', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '16px' }}>
        <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '10px', padding: '18px' }}>
          <h3 style={{ fontSize: '16px', fontWeight: 700, color: '#0f172a', margin: '0 0 8px 0' }}>
            The Skill, Unpacked (Output Compression)
          </h3>
          <p style={{ color: '#475569', fontSize: '12.5px', lineHeight: 1.6, margin: 0 }}>
            The skill acts on the model&apos;s output generation loop. It suppresses redundant greetings, explanations of obvious code, and conversational sign-offs. It never compresses user inputs or prompts. Code blocks, terminal commands, identifiers, and file paths are emitted 100% verbatim.
          </p>
        </div>

        <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '10px', padding: '18px' }}>
          <h3 style={{ fontSize: '16px', fontWeight: 700, color: '#0f172a', margin: '0 0 8px 0' }}>
            The Proxy, Unpacked (Context &amp; Input Compression)
          </h3>
          <p style={{ color: '#475569', fontSize: '12.5px', lineHeight: 1.6, margin: 0 }}>
            The local proxy acts on model input context. When agents ingest 20,000-token JSON dumps or test outputs, Caveman stores the exact original in Caveman Context Recovery (CCR) on disk, provides a compact representation to the model, and passes through a retrieval handle if the agent needs the raw bytes.
          </p>
        </div>
      </div>

      {/* 10. How to wrap an agent & In your own code */}
      <div style={{ marginBottom: '40px', background: '#020617', border: '1px solid #1e293b', borderRadius: '12px', padding: '24px' }}>
        <h2 style={{ fontSize: '20px', fontWeight: 700, color: '#f8fafc', margin: '0 0 12px 0' }}>
          How to Wrap an Agent &amp; In Your Own Code
        </h2>
        <p style={{ color: '#cbd5e1', fontSize: '13px', margin: '0 0 16px 0', lineHeight: 1.6 }}>
          You can wrap an installed coding agent directly, or import Caveman middleware into your own application code:
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '14px' }}>
          {/* Agent wrapping */}
          <div style={{ background: '#0f172a', border: '1px solid #334155', borderRadius: '8px', padding: '16px' }}>
            <div style={{ color: '#38bdf8', fontWeight: 700, fontSize: '13px', marginBottom: '6px' }}>Wrap Any Coding Agent</div>
            <pre style={{ background: '#020617', padding: '10px', borderRadius: '6px', color: '#fb923c', fontSize: '11.5px', margin: '0 0 8px 0', overflowX: 'auto' }}>
# Wrap Claude Code
caveman claude

# Wrap Codex, Gemini, Aider, OpenClaw
caveman codex
caveman gemini
caveman openclaw
            </pre>
            <p style={{ color: '#94a3b8', fontSize: '11px', margin: 0 }}>
              Rewrites provider loopback endpoint for the child process without modifying the agent core loop.
            </p>
          </div>

          {/* In your own code */}
          <div style={{ background: '#0f172a', border: '1px solid #334155', borderRadius: '8px', padding: '16px' }}>
            <div style={{ color: '#4ade80', fontWeight: 700, fontSize: '13px', marginBottom: '6px' }}>In Your Own Code (SDK &amp; Middleware)</div>
            <pre style={{ background: '#020617', padding: '10px', borderRadius: '6px', color: '#4ade80', fontSize: '11.5px', margin: '0 0 8px 0', overflowX: 'auto' }}>
# TypeScript / Node.js
npm install @caveman-ai/middleware @caveman-ai/sdk

# Python (LangChain, OpenAI, LiteLLM)
pip install &apos;caveman-middleware[langchain]&apos; caveman-sdk
            </pre>
            <p style={{ color: '#94a3b8', fontSize: '11px', margin: 0 }}>
              Drop-in middleware for Vercel AI SDK, LangChain, CrewAI, Pydantic AI, and raw HTTP calls.
            </p>
          </div>
        </div>
      </div>

      {/* 11. When NOT to use caveman (Honest Numbers) */}
      <div style={{ marginBottom: '40px', background: '#fef2f2', border: '1px solid #fecaca', borderRadius: '12px', padding: '20px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
          <span style={{ background: '#ef4444', color: '#ffffff', fontSize: '11px', fontWeight: 700, padding: '2px 8px', borderRadius: '4px' }}>
            HONEST NUMBERS
          </span>
          <h2 style={{ fontSize: '18px', fontWeight: 700, color: '#991b1b', margin: 0 }}>
            When NOT to Use Caveman (Net-Negative Cases)
          </h2>
        </div>
        <p style={{ color: '#7f1d1d', fontSize: '13px', margin: '0 0 14px 0', lineHeight: 1.6 }}>
          Caveman saves tokens sometimes, but can cost tokens if misapplied. Turn it off if your workload hits these conditions:
        </p>

        <ul style={{ margin: 0, paddingLeft: '20px', color: '#7f1d1d', fontSize: '12.5px', lineHeight: 1.7 }}>
          <li><strong>Terse Coding Q&amp;A:</strong> If asking 1-sentence questions, injecting the 1,000-token Caveman rule sheet into context will cost more tokens than the short answer saves.</li>
          <li><strong>Per-Request Pricing:</strong> If using models billed per request rather than per token (e.g., GitHub Copilot premium requests), shorter answers do not reduce billed cost.</li>
          <li><strong>Over-Aggressive Context Re-Injection:</strong> If tool-side harnesses repeatedly re-inject system prompts on retries, input token costs can overwhelm output savings.</li>
          <li><strong>Rule of Thumb:</strong> Always run an A/B test with <code>caveman trial</code>. If Caveman increases billed costs on your specific tasks, turn it off.</li>
        </ul>
      </div>

      {/* 12. Privacy, License, Cite */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px', marginBottom: '32px' }}>
        {/* Privacy */}
        <div style={{ background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '10px', padding: '18px' }}>
          <div style={{ fontWeight: 700, fontSize: '14px', color: '#0f172a', marginBottom: '6px' }}>🔒 Privacy</div>
          <p style={{ color: '#475569', fontSize: '12px', lineHeight: 1.5, margin: 0 }}>
            The skill runs 100% locally on your machine and sends nothing. The CLI collects anonymous aggregate counts by default (never your code, prompts, or paths). Disable permanently via <code>caveman telemetry off</code> or <code>DO_NOT_TRACK=1</code>.
          </p>
        </div>

        {/* License */}
        <div style={{ background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '10px', padding: '18px' }}>
          <div style={{ fontWeight: 700, fontSize: '14px', color: '#0f172a', marginBottom: '6px' }}>⚖️ License</div>
          <p style={{ color: '#475569', fontSize: '12px', lineHeight: 1.5, margin: 0 }}>
            <strong>Apache-2.0 License</strong> across the entire repository. Read it, fork it, ship it, host it. Free like mammoth on open plain.
          </p>
        </div>

        {/* Cite */}
        <div style={{ background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '10px', padding: '18px' }}>
          <div style={{ fontWeight: 700, fontSize: '14px', color: '#0f172a', marginBottom: '6px' }}>📚 Academic Citation</div>
          <pre style={{ background: '#f8fafc', padding: '8px', borderRadius: '4px', fontSize: '10.5px', color: '#334155', margin: 0, fontFamily: 'monospace', overflowX: 'auto' }}>
{`@software{brussee2026caveman,
  author = {Brussee, Julius},
  title  = {Caveman},
  year   = {2026},
  url    = {https://github.com/JuliusBrussee/caveman}
}`}
          </pre>
        </div>
      </div>
    </div>
  );
}
