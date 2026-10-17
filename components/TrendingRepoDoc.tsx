'use client';

import React, { useState } from 'react';
import Image from 'next/image';

/**
 * Extended review layout for repositories added from GitHub Trending.
 * Same visual language as the hand-built docs (CavemanExtendedDoc etc.):
 * badges, dark hero card with metrics, light tables, dark install block,
 * an honest-limits box and info cards. All content comes from TRENDING_DOCS.
 */

type Accent = { main: string; soft: string; text: string; muted: string; glow: string };

type Table = { title: string; intro?: string; columns: [string, string]; rows: [string, string][] };

type TrendingDocConfig = {
  accent: Accent;
  badges: string[];
  image: string;
  imageAlt: string;
  kicker: string;
  title: string;
  lead: React.ReactNode;
  metrics: { value: string; label: string; note: string }[];
  flow?: { title: string; intro: string; steps: { name: string; desc: string }[] };
  tables: Table[];
  install: { label: string; title: string; primary: string; note: React.ReactNode; extras: { label: string; cmd: string }[] };
  split?: { title: string; body: string }[];
  honest: { title: string; intro: string; items: [string, string][] };
  cards: { icon: string; title: string; body: React.ReactNode }[];
};

const ACCENTS: Record<string, Accent> = {
  violet: { main: '#7c3aed', soft: '#f5f3ff', text: '#6d28d9', muted: '#ddd6fe', glow: 'rgba(124, 58, 237, 0.25)' },
  emerald: { main: '#059669', soft: '#ecfdf5', text: '#047857', muted: '#a7f3d0', glow: 'rgba(5, 150, 105, 0.25)' },
  amber: { main: '#d97706', soft: '#fffbeb', text: '#b45309', muted: '#fde68a', glow: 'rgba(217, 119, 6, 0.25)' },
};

const code = (s: string) => <code>{s}</code>;

export const TRENDING_DOCS: Record<string, TrendingDocConfig> = {
  voicestudio: {
    accent: ACCENTS.violet,
    badges: ['🔥 2,135 STARS IN ONE DAY (18 OCT 2026)', '646 LANGUAGES', 'LOCAL-FIRST', 'MCP + LOCAL API', 'AGPL-3.0 LICENSE'],
    image: '/images/VoiceStudio by vnhax.net.png',
    imageAlt: 'VoiceStudio architecture: reference clip and script go into a local engine for cloning, design, dubbing and dictation',
    kicker: 'debpalash / VoiceStudio — your voice, your workflow',
    title: 'VoiceStudio: Open-Source, Local-First Voice Cloning, Dubbing & Dictation',
    lead: (
      <>
        <strong>An ElevenLabs-style voice studio that runs on your own hardware.</strong>
        <br />
        Clone or design a voice, dub videos with timed speech, dictate with a floating widget, transcribe audio and batch-produce
        audiobooks. The README says local workflows run on your machine, remote services are optional, and analytics need consent.
      </>
    ),
    metrics: [
      { value: '646', label: 'Languages', note: 'As stated in the project README' },
      { value: '3 backends', label: 'CUDA · Metal · CPU', note: 'NVIDIA, Apple Silicon, or no GPU' },
      { value: '4 targets', label: 'macOS · Windows · Linux · Docker', note: 'Plus preview iOS & Android apps' },
    ],
    flow: {
      title: 'Your Voice. Your Workflow.',
      intro: 'The app is organised into three groups of workspaces, according to the README:',
      steps: [
        { name: 'Create', desc: 'Clone a voice from a clean reference recording, or design a new voice. Dictate anywhere with a floating widget.' },
        { name: 'Produce', desc: 'Dub videos with timed speech, and turn scripts into stories, audiobooks and batch jobs.' },
        { name: 'Connect', desc: 'Local API and MCP server for AI agents, reusable recipes, and watch folders for automation.' },
      ],
    },
    tables: [
      {
        title: 'Hardware Support',
        intro: 'What runs where, from the README. Hardware needs also vary by engine; the repo links a performance guide.',
        columns: ['Hardware', 'Support'],
        rows: [
          ['NVIDIA GPU (Windows / Linux)', 'CUDA acceleration'],
          ['Apple Silicon', 'Metal (MPS) acceleration'],
          ['No dedicated GPU (integrated graphics, older PCs)', 'Fully usable on the CPU, slower. Installs the small CPU build of PyTorch (about 5 GB free disk).'],
          ['Windows on ARM (Snapdragon X etc.)', 'Experimental: native ARM64 app, x64 Python backend under emulation, CPU only'],
          ['Intel Mac', 'App UI only; connect to a remote backend'],
        ],
      },
      {
        title: 'Engines, Models & Integrations',
        columns: ['Component', 'What It Does'],
        rows: [
          ['VoiceStudio engine (default)', 'Powered by k2-fsa/OmniVoice. Other engines can be chosen from the feature & engine catalog.'],
          ['Model Manager', 'Downloads models when a workspace needs them and shows versioned model-source notices, evidence links and unresolved licence-review gaps.'],
          ['Local speech API', 'Lets your own scripts and apps generate and transcribe audio locally.'],
          ['MCP server', 'Exposes VoiceStudio as a tool to AI agents that speak the Model Context Protocol.'],
          ['Agent skills', 'npx skills add debpalash/VoiceStudio: "voicestudio" for audio workflows, "voicestudio-maintainer" for repo maintenance.'],
          ['Electron desktop app', 'The only desktop app and web UI. Version 0.5.3 was the final Tauri release; Tauri users must install Electron separately.'],
        ],
      },
    ],
    install: {
      label: 'Setup & Distribution',
      title: 'Install (One Command)',
      primary: 'curl -fsSL https://voicestudio.sh/install | sh',
      note: (
        <>
          macOS and Linux. The installer keeps your settings, projects and models. Then open <strong>Voice cloning</strong>, add a clean
          reference recording, enter your text and generate; the app asks before installing a model.
        </>
      ),
      extras: [
        { label: 'Windows (PowerShell):', cmd: 'irm https://voicestudio.sh/install | iex' },
        { label: 'A specific release (replace X.Y.Z):', cmd: 'curl -fsSL https://voicestudio.sh/install | sh -s -- --version X.Y.Z' },
        { label: 'Run from source (Bun + Python backend):', cmd: 'git clone https://github.com/debpalash/VoiceStudio.git && cd VoiceStudio && bun install && bun run setup:api && bun run dev' },
        { label: 'Uninstall, keeping your data:', cmd: 'curl -fsSL https://voicestudio.sh/install | sh -s -- --uninstall' },
      ],
    },
    split: [
      {
        title: 'Why Local Matters for Voice Work',
        body: 'Voice projects involve sensitive material: unreleased scripts, client recordings, your own voice. Running the models locally keeps that data on your machine and removes per-character cloud fees, which add up fast on audiobooks and long dubs. The trade-off is that you supply the hardware, and quality and speed depend on your GPU and the engine you pick.',
      },
      {
        title: 'Install With a Coding Agent',
        body: 'The README includes a prompt you can paste into Claude Code, Codex or Cursor. The linked agent guide covers hardware detection, reusing existing data, asking before model downloads, and a test generation, so an agent can set the app up and verify it end to end.',
      },
    ],
    honest: {
      title: 'Before You Clone a Voice (Limits & Responsibilities)',
      intro: 'VoiceStudio is powerful, which is exactly why these points matter:',
      items: [
        ['Consent first', 'The project says to clone voices only with permission. Cloning someone without consent can be illegal and harmful.'],
        ['Two licences, not one', 'AGPL-3.0 covers the app. Model weights, tokenizers, voices and generated-output conditions are licensed separately; a paid app licence does not grant those rights.'],
        ['No guarantee on commercial use', 'The Model Manager shows licence notices, but its reviewed-file preview "does not certify commercial permission". Check each model yourself.'],
        ['Platform gaps', 'Intel Macs run the UI only, and Windows on ARM is experimental and CPU-only.'],
      ],
    },
    cards: [
      { icon: '🔒', title: 'Privacy', body: 'Local workflows run on your hardware. Remote services are optional, and usage analytics require consent.' },
      { icon: '⚖️', title: 'License', body: <><strong>AGPL-3.0</strong> for the application, including commercial use under its conditions. Models and voices have their own terms.</> },
      { icon: '🔗', title: 'Links', body: <>Website: voicestudio.sh · Releases: .dmg, .exe, .AppImage, .deb · Docs: engine guides, benchmarks, MCP and local API.</> },
    ],
  },

  'ai-job-search': {
    accent: ACCENTS.emerald,
    badges: ['🔥 1,397 STARS IN ONE DAY (18 OCT 2026)', 'BUILT ON CLAUDE CODE', 'DRAFTER + REVIEWER AGENTS', 'NEVER INVENTS EXPERIENCE', 'MIT LICENSE'],
    image: '/images/AI Job Search by vnhax.net.png',
    imageAlt: 'AI Job Search workflow: a job posting goes through parse, fit, draft and review steps to a tailored CV and cover letter',
    kicker: 'MadsLorentzen / ai-job-search — the job search that runs on your machine',
    title: 'AI Job Search: A Claude Code Framework for Tailored CVs, Cover Letters & Interview Prep',
    lead: (
      <>
        <strong>Fork it, fill in your profile once, and let Claude handle the repetitive parts of applying.</strong>
        <br />
        It scores each posting for fit, drafts a LaTeX CV and cover letter, has a second agent critique them, compiles and checks the
        PDFs, and preps you for interviews. Every claim is checked against your real profile.
      </>
    ),
    metrics: [
      { value: '69 → 20 → 1', label: 'Applications → interviews → contract', note: "The author's own job search (his result, not a guarantee)" },
      { value: '3 + 10', label: 'Core + extra slash commands', note: '/setup, /scrape, /apply, then /rank, /interview…' },
      { value: '2 pages + 1', label: 'CV + cover letter, verified', note: 'Compiled PDFs checked for layout and ATS text' },
    ],
    flow: {
      title: 'How /apply Works (Drafter-Reviewer Pipeline)',
      intro: 'Every application runs through the same eight steps, as described in the README:',
      steps: [
        { name: '1. Parse', desc: 'Read the job posting from a URL, or from pasted text if the site blocks automated access.' },
        { name: '2. Evaluate fit', desc: 'Score skills, experience, culture, location and career alignment against your profile.' },
        { name: '3. Draft', desc: 'Write a tailored CV and cover letter in LaTeX.' },
        { name: '4. Review', desc: 'Spawn a separate reviewer agent with fresh context that researches the company and critiques the drafts.' },
        { name: '5. Revise', desc: "Apply the reviewer's feedback." },
        { name: '6. Compile & inspect', desc: 'lualatex for the CV, xelatex for the letter. Iterate until the CV is exactly 2 pages and the letter 1 page.' },
        { name: '7. ATS check', desc: 'Extract the PDF text layer and verify contact details, reading order and keyword coverage. Gaps stay visible, never stuffed.' },
        { name: '8. Present', desc: 'Show the final output with a verification checklist.' },
      ],
    },
    tables: [
      {
        title: 'Commands: Core Workflow & Extensions',
        columns: ['Command', 'What It Does'],
        rows: [
          ['/setup', 'Builds your profile from a documents folder (CV, LinkedIn export, diplomas), a pasted CV, or an interview.'],
          ['/scrape', 'Searches job portals for matching roles, deduplicates them and sorts by fit.'],
          ['/apply <url>', 'Runs the full drafter-reviewer pipeline above.'],
          ['/rank', 'Batch-scores newly scraped postings with parallel agents and returns a ranked shortlist.'],
          ['/interview', 'Builds a stage-specific prep pack and offers a mock interview. Gaps get honest bridge answers, never invented experience.'],
          ['/outcome', 'Records interviews, offers and rejections, archives what you sent, and drafts follow-ups (drafts only, never sends).'],
          ['/gmail-sync · /notion-sync', 'Reads Gmail for status signals (you approve every change); publishes a read-only pipeline view to Notion.'],
          ['/expand · /upskill', 'Enriches your profile from public sources you linked; maps skill gaps to a learning plan.'],
          ['/html-report', 'Generates an offline HTML dashboard of your applications.'],
          ['/add-template · /add-portal', 'Registers your own CV/letter template (LaTeX, Typst…); generates a search skill for a job board in your country.'],
        ],
      },
      {
        title: 'Prerequisites',
        columns: ['Requirement', 'Notes'],
        rows: [
          ['Claude Code', 'No free tier: needs a Claude Pro, Max or Team plan, or Anthropic API credits.'],
          ['Python 3.10+', 'For the helper tools and salary lookup.'],
          ['Bun', 'Runs the job-portal CLI tools.'],
          ['LaTeX (lualatex + xelatex)', 'TeX Live, MacTeX, TinyTeX or MiKTeX. The CV compiles with lualatex, the cover letter with xelatex.'],
          ['pypdf (optional)', "Enables /apply's ATS parseability check; Poppler's pdftotext is a fallback."],
        ],
      },
    ],
    install: {
      label: 'Setup',
      title: 'Install & First Run',
      primary: 'python3 tools/install_portal_clis.py',
      note: (
        <>
          Run this after cloning, then start {code('claude')} and run {code('/setup')}, {code('/scrape')} and {code('/apply <url>')}. For your
          own search, use a <strong>private</strong> repository with this project as upstream (see the warning below).
        </>
      ),
      extras: [
        { label: 'Fork & clone (only to contribute):', cmd: 'gh repo fork MadsLorentzen/ai-job-search --clone && cd ai-job-search' },
        { label: 'Windows:', cmd: 'python tools\\install_portal_clis.py' },
        { label: 'Apply with pasted text (if a site blocks fetching):', cmd: '/apply <paste the full job description here>' },
        { label: 'Reconfigure only the job search:', cmd: '/setup --section search' },
      ],
    },
    split: [
      {
        title: 'Why the Reviewer Agent Matters',
        body: 'The drafter writes; a second Claude agent with a fresh context researches the company and critiques the drafts before revision. The README says this catches missed keywords, weak framing and generic language that a single pass often leaves in. The reviewer receives drafts inline instead of re-reading files, to save tokens.',
      },
      {
        title: 'Works Outside Denmark Too',
        body: 'The profile, fit scoring and application pipeline are language- and country-agnostic. The shipped portal skills cover Danish job boards plus LinkedIn and freehire.me; /add-portal investigates your local job board and scaffolds a matching search skill, test-running a live query before registering it.',
      },
    ],
    honest: {
      title: 'Read This Before You Start',
      intro: 'Points the README itself stresses:',
      items: [
        ['Forks are public', '/setup writes your name, contact details, history and salary expectations into tracked files. A fork of a public repo is always public, so use a private repo for your own search.'],
        ['It costs money', 'Claude Code has no free tier, and each application runs several agents plus PDF compile loops.'],
        ['Postings are untrusted input', 'The workflow follows no instructions inside postings, but these defences are instruction-level, not a sandbox. Skim what was fetched before you send anything.'],
        ['One success story', "69 applications, 20 interviews and one contract is the author's personal result. Your market and profile will differ."],
      ],
    },
    cards: [
      { icon: '🔒', title: 'Your Data', body: 'Everything lives in files in your own repository. Gmail and Notion sync are optional and propose changes for you to approve.' },
      { icon: '⚖️', title: 'License', body: <><strong>MIT License.</strong> Independent project, not affiliated with or endorsed by Anthropic.</> },
      { icon: '⚠️', title: 'Scam Warning', body: 'The author says the project has no cryptocurrency, token or paid sponsorship program. The only support channels are Ko-fi and GitHub contributions.' },
    ],
  },

  'claude-plugins-official': {
    accent: ACCENTS.amber,
    badges: ['🔥 1,383 STARS IN ONE DAY (18 OCT 2026)', 'MAINTAINED BY ANTHROPIC', '40 ANTHROPIC PLUGINS', '14 PARTNER PLUGINS', 'APACHE-2.0 LICENSE'],
    image: '/images/Claude Plugins Official by vnhax.net.png',
    imageAlt: 'Claude Plugins directory: commands, agents, skills and MCP servers installed into Claude Code from the official marketplace',
    kicker: 'anthropics / claude-plugins-official — the official plugin directory for Claude Code',
    title: 'Claude Plugins Official: Anthropic’s Curated Marketplace for Claude Code',
    lead: (
      <>
        <strong>The default place to find and install Claude Code plugins.</strong>
        <br />
        Plugins bundle slash commands, subagents, skills and MCP servers into one install. This repo holds Anthropic&apos;s own
        plugins plus reviewed plugins from partners and the community.
      </>
    ),
    metrics: [
      { value: '40', label: 'Anthropic-built plugins', note: 'In /plugins, counted 18 Oct 2026' },
      { value: '14', label: 'Partner & community plugins', note: 'In /external_plugins, counted 18 Oct 2026' },
      { value: '1 command', label: 'To install any plugin', note: '/plugin install <name>@claude-plugins-official' },
    ],
    flow: {
      title: 'What Goes Inside a Plugin',
      intro: 'Every plugin follows the same structure, per the README:',
      steps: [
        { name: '.claude-plugin/plugin.json', desc: 'Required. The plugin metadata.' },
        { name: '.mcp.json', desc: 'Optional. MCP server configuration the plugin brings with it.' },
        { name: 'commands/', desc: 'Optional. Slash commands.' },
        { name: 'agents/', desc: 'Optional. Subagent definitions.' },
        { name: 'skills/', desc: 'Optional. Skills (folders with a SKILL.md).' },
        { name: 'README.md', desc: 'Documentation for users.' },
      ],
    },
    tables: [
      {
        title: "What's in the Directory (Selected Plugins)",
        intro: 'A sample of plugin names from the repository folders on 18 October 2026, grouped by us. Check each plugin page for details.',
        columns: ['Group', 'Plugins'],
        rows: [
          ['Language servers (LSP)', 'typescript-lsp, pyright-lsp, rust-analyzer-lsp, gopls-lsp, clangd-lsp, csharp-lsp, jdtls-lsp, kotlin-lsp, swift-lsp, php-lsp, ruby-lsp, lua-lsp'],
          ['Code quality & review', 'code-review, pr-review-toolkit, code-simplifier, code-modernization, security-guidance, claude-security'],
          ['Workflow', 'commit-commands, feature-dev, frontend-design, hookify, ralph-loop, session-report, claude-md-management, claude-code-setup'],
          ['Building extensions', 'plugin-dev, skill-creator, mcp-server-dev, agent-sdk-dev, example-plugin'],
          ['Output styles', 'explanatory-output-style, learning-output-style'],
          ['Partner integrations', 'github, gitlab, linear, asana, playwright, context7, firebase, terraform, serena, laravel-boost, discord, telegram'],
        ],
      },
      {
        title: 'Marketplace Rules Worth Knowing',
        columns: ['Rule', 'What It Means'],
        rows: [
          ['Names are immutable', 'A published plugin name is a permanent slug. Renaming breaks installs with a plugin-not-found error; use displayName to change the label.'],
          ['Renames map', 'If a rename is unavoidable, a renames entry in .claude-plugin/marketplace.json migrates existing installs on the next sync.'],
          ['Skill bundles', 'Repos that ship SKILL.md folders without a plugin.json can be listed with strict: false and an explicit skills array.'],
          ['Skill naming', 'Each bundled skill registers as <plugin-name>:<skill-name> in Claude Code.'],
        ],
      },
    ],
    install: {
      label: 'Install',
      title: 'Install a Plugin From Claude Code',
      primary: '/plugin install code-review@claude-plugins-official',
      note: (
        <>
          Swap {code('code-review')} for any plugin name. Prefer browsing? Run {code('/plugin')} and open the <strong>Discover</strong> tab.
        </>
      ),
      extras: [
        { label: 'Browse interactively:', cmd: '/plugin' },
        { label: 'TypeScript language server:', cmd: '/plugin install typescript-lsp@claude-plugins-official' },
        { label: 'GitHub integration (partner plugin):', cmd: '/plugin install github@claude-plugins-official' },
        { label: 'Build your own (reference):', cmd: 'See /plugins/example-plugin in the repository' },
      ],
    },
    split: [
      {
        title: 'Internal vs External Plugins',
        body: 'Internal plugins in /plugins are developed and maintained by Anthropic team members. External plugins in /external_plugins come from partners and the community and must meet quality and security standards before they are accepted, through a submission form linked in the README.',
      },
      {
        title: 'Why a Curated Marketplace Helps',
        body: 'Without a directory you hunt through random repositories and wire up commands, agents and MCP servers by hand. A marketplace gives one install command, a standard layout, and updates through Claude Code itself, so teams can share the same set of tools.',
      },
    ],
    honest: {
      title: 'Trust Before You Install',
      intro: "The README's own warning, in plain terms:",
      items: [
        ['Anthropic cannot vouch for everything', 'Anthropic does not control what MCP servers, files or other software third-party plugins include, and cannot verify they will work as intended or will not change.'],
        ['Plugins can run code', 'MCP servers and hooks run on your machine. Read a plugin\'s homepage and source before installing, especially for external plugins.'],
        ['Per-plugin licences', 'The repository is Apache-2.0, but the README says to check each linked plugin for its own LICENSE.'],
      ],
    },
    cards: [
      { icon: '🏢', title: 'Maintainer', body: 'Anthropic. Internal plugins are built by Anthropic team members; external ones are reviewed submissions.' },
      { icon: '⚖️', title: 'License', body: <><strong>Apache-2.0</strong> for the repository. Individual plugins may carry their own licences.</> },
      { icon: '📘', title: 'Docs', body: 'Official guide to building plugins: code.claude.com/docs/en/plugins, and plugin marketplaces for the schema.' },
    ],
  },
};

export default function TrendingRepoDoc({ slug }: { slug: string }) {
  const doc = TRENDING_DOCS[slug];
  const [copied, setCopied] = useState<string | null>(null);
  if (!doc) return null;
  const a = doc.accent;

  const copy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopied(id);
    setTimeout(() => setCopied(null), 2000);
  };

  const badgeColors = [a.main, '#0f766e', '#2563eb', '#be185d'];

  return (
    <div style={{ maxWidth: '1100px', margin: '0 auto', fontFamily: 'inherit' }}>
      {/* 1. Badges */}
      <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '24px', alignItems: 'center' }}>
        {doc.badges.map((b, i) =>
          i === doc.badges.length - 1 ? (
            <span key={b} style={{ background: '#1e293b', color: '#94a3b8', fontSize: '11px', fontWeight: 600, padding: '4px 10px', borderRadius: '6px', border: '1px solid #334155' }}>
              {b}
            </span>
          ) : (
            <span key={b} style={{ background: badgeColors[i % badgeColors.length], color: '#ffffff', fontSize: '11px', fontWeight: 700, padding: '4px 10px', borderRadius: '6px' }}>
              {b}
            </span>
          )
        )}
      </div>

      {/* 2. Hero */}
      <div
        style={{
          background: 'linear-gradient(135deg, rgba(8, 10, 18, 0.97) 0%, rgba(17, 20, 32, 0.94) 100%)',
          border: `1px solid ${a.glow}`,
          borderRadius: '16px',
          padding: '24px',
          marginBottom: '36px',
          boxShadow: `0 20px 40px -15px ${a.glow}`,
        }}
      >
        <div style={{ borderRadius: '12px', overflow: 'hidden', border: '1px solid rgba(255,255,255,0.1)', marginBottom: '24px', background: '#000' }}>
          <Image src={doc.image} alt={doc.imageAlt} width={640} height={552} priority style={{ width: '100%', maxWidth: '640px', height: 'auto', display: 'block', margin: '0 auto' }} />
        </div>
        <div style={{ color: a.muted, fontSize: '12px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '8px' }}>{doc.kicker}</div>
        <h1 style={{ fontSize: '28px', fontWeight: 800, color: '#ffffff', margin: '0 0 12px 0', lineHeight: 1.2 }}>{doc.title}</h1>
        <p style={{ color: '#cbd5e1', fontSize: '14.5px', lineHeight: 1.6, margin: '0 0 20px 0' }}>{doc.lead}</p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '12px' }}>
          {doc.metrics.map((m) => (
            <div key={m.label} style={{ background: 'rgba(255,255,255,0.05)', border: `1px solid ${a.glow}`, padding: '14px 18px', borderRadius: '10px' }}>
              <div style={{ color: a.muted, fontSize: '22px', fontWeight: 800 }}>{m.value}</div>
              <div style={{ color: '#e2e8f0', fontSize: '12px', fontWeight: 600 }}>{m.label}</div>
              <div style={{ color: '#94a3b8', fontSize: '11px', marginTop: '2px' }}>{m.note}</div>
            </div>
          ))}
        </div>
      </div>

      {/* 3. Flow */}
      {doc.flow && (
        <div style={{ marginBottom: '40px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px', flexWrap: 'wrap' }}>
            <span style={{ background: a.main, color: '#fff', fontSize: '11px', fontWeight: 700, padding: '2px 8px', borderRadius: '4px' }}>HOW IT WORKS</span>
            <h2 style={{ fontSize: '20px', fontWeight: 700, color: '#0f172a', margin: 0 }}>{doc.flow.title}</h2>
          </div>
          <p style={{ color: '#475569', fontSize: '13px', margin: '0 0 16px 0' }}>{doc.flow.intro}</p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(230px, 1fr))', gap: '12px' }}>
            {doc.flow.steps.map((s) => (
              <div key={s.name} style={{ background: a.soft, border: `1px solid ${a.muted}`, borderRadius: '10px', padding: '14px 16px' }}>
                <div style={{ color: a.text, fontWeight: 700, fontSize: '13.5px', marginBottom: '4px', fontFamily: s.name.includes('/') || s.name.includes('.') ? 'monospace' : 'inherit' }}>{s.name}</div>
                <p style={{ color: '#334155', fontSize: '12.5px', lineHeight: 1.55, margin: 0 }}>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 4. Tables */}
      {doc.tables.map((t) => (
        <div key={t.title} style={{ marginBottom: '40px' }}>
          <h2 style={{ fontSize: '20px', fontWeight: 700, color: '#0f172a', margin: '0 0 12px 0' }}>{t.title}</h2>
          {t.intro && <p style={{ color: '#475569', fontSize: '13px', margin: '0 0 16px 0' }}>{t.intro}</p>}
          <div style={{ border: '1px solid #e2e8f0', borderRadius: '10px', overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '12.5px', textAlign: 'left' }}>
              <thead>
                <tr style={{ background: '#f8fafc', borderBottom: '1px solid #e2e8f0', color: '#475569' }}>
                  <th style={{ padding: '10px 14px', width: '230px' }}>{t.columns[0]}</th>
                  <th style={{ padding: '10px 14px' }}>{t.columns[1]}</th>
                </tr>
              </thead>
              <tbody>
                {t.rows.map(([k, v], idx) => (
                  <tr key={k} style={{ borderBottom: idx === t.rows.length - 1 ? 'none' : '1px solid #f1f5f9', background: idx % 2 === 0 ? '#ffffff' : '#fafafa' }}>
                    <td style={{ padding: '10px 14px', fontWeight: 700, color: a.text, fontFamily: k.startsWith('/') ? 'monospace' : 'inherit' }}>{k}</td>
                    <td style={{ padding: '10px 14px', color: '#334155', lineHeight: 1.5 }}>{v}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ))}

      {/* 5. Install */}
      <div style={{ marginBottom: '40px', background: '#020617', border: '1px solid #1e293b', borderRadius: '12px', padding: '24px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px', flexWrap: 'wrap', gap: '8px' }}>
          <div>
            <span style={{ color: a.muted, fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.08em', fontWeight: 700 }}>{doc.install.label}</span>
            <h2 style={{ fontSize: '20px', fontWeight: 700, color: '#f8fafc', margin: '4px 0 0 0' }}>{doc.install.title}</h2>
          </div>
          <button
            type="button"
            onClick={() => copy(doc.install.primary, 'primary')}
            style={{ background: copied === 'primary' ? '#16a34a' : a.main, color: '#ffffff', border: 'none', padding: '6px 14px', borderRadius: '6px', fontSize: '12px', fontWeight: 600, cursor: 'pointer' }}
          >
            {copied === 'primary' ? '✓ Copied' : 'Copy Primary Command'}
          </button>
        </div>
        <pre style={{ background: '#090d16', padding: '14px 18px', borderRadius: '8px', color: '#38bdf8', fontSize: '13px', fontFamily: 'monospace', margin: '0 0 16px 0', border: '1px solid #1e293b', overflowX: 'auto' }}>
          {doc.install.primary}
        </pre>
        <p style={{ color: '#94a3b8', fontSize: '12px', margin: '0 0 16px 0', lineHeight: 1.6 }}>{doc.install.note}</p>
        <div style={{ background: '#0f172a', borderRadius: '8px', padding: '14px', border: '1px solid #1e293b' }}>
          <div style={{ color: '#cbd5e1', fontSize: '12px', fontWeight: 700, marginBottom: '8px' }}>More Commands:</div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '8px' }}>
            {doc.install.extras.map((e) => (
              <div key={e.label} style={{ minWidth: 0 }}>
                <span style={{ color: '#94a3b8', fontSize: '11px' }}>{e.label}</span>
                <pre style={{ background: '#020617', padding: '8px 10px', borderRadius: '4px', color: '#4ade80', fontSize: '11px', margin: '2px 0 0 0', overflowX: 'auto' }}>{e.cmd}</pre>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 6. Split explainer */}
      {doc.split && (
        <div style={{ marginBottom: '40px', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '16px' }}>
          {doc.split.map((s) => (
            <div key={s.title} style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '10px', padding: '18px' }}>
              <h3 style={{ fontSize: '16px', fontWeight: 700, color: '#0f172a', margin: '0 0 8px 0' }}>{s.title}</h3>
              <p style={{ color: '#475569', fontSize: '12.5px', lineHeight: 1.6, margin: 0 }}>{s.body}</p>
            </div>
          ))}
        </div>
      )}

      {/* 7. Honest limits */}
      <div style={{ marginBottom: '40px', background: '#fef2f2', border: '1px solid #fecaca', borderRadius: '12px', padding: '20px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px', flexWrap: 'wrap' }}>
          <span style={{ background: '#ef4444', color: '#ffffff', fontSize: '11px', fontWeight: 700, padding: '2px 8px', borderRadius: '4px' }}>HONEST NOTES</span>
          <h2 style={{ fontSize: '18px', fontWeight: 700, color: '#991b1b', margin: 0 }}>{doc.honest.title}</h2>
        </div>
        <p style={{ color: '#7f1d1d', fontSize: '13px', margin: '0 0 14px 0', lineHeight: 1.6 }}>{doc.honest.intro}</p>
        <ul style={{ margin: 0, paddingLeft: '20px', color: '#7f1d1d', fontSize: '12.5px', lineHeight: 1.7 }}>
          {doc.honest.items.map(([k, v]) => (
            <li key={k}>
              <strong>{k}:</strong> {v}
            </li>
          ))}
        </ul>
      </div>

      {/* 8. Info cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '16px', marginBottom: '32px' }}>
        {doc.cards.map((c) => (
          <div key={c.title} style={{ background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '10px', padding: '18px' }}>
            <div style={{ fontWeight: 700, fontSize: '14px', color: '#0f172a', marginBottom: '6px' }}>
              {c.icon} {c.title}
            </div>
            <p style={{ color: '#475569', fontSize: '12px', lineHeight: 1.5, margin: 0 }}>{c.body}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
