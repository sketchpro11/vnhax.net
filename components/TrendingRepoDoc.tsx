import React from 'react';
import Image from 'next/image';
import CopyCommandButton from '@/components/CopyCommandButton';

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
  sky: { main: '#0284c7', soft: '#f0f9ff', text: '#0369a1', muted: '#bae6fd', glow: 'rgba(2, 132, 199, 0.25)' },
  rose: { main: '#e11d48', soft: '#fff1f2', text: '#be123c', muted: '#fecdd3', glow: 'rgba(225, 29, 72, 0.25)' },
  teal: { main: '#0d9488', soft: '#f0fdfa', text: '#0f766e', muted: '#99f6e4', glow: 'rgba(13, 148, 136, 0.25)' },
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
    kicker: 'ai-job-search-dev / ai-job-search — the job search that runs on your machine',
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
        { label: 'Fork & clone (only to contribute):', cmd: 'gh repo fork ai-job-search-dev/ai-job-search --clone && cd ai-job-search' },
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

  t3code: {
    accent: ACCENTS.sky,
    badges: ['🔥 3,100 STARS IN ONE DAY (2 NOV 2026)', '7 AGENT PROVIDERS', 'DESKTOP · WEB · iOS · ANDROID', 'USES YOUR OWN SUBSCRIPTIONS', 'MIT LICENSE'],
    image: '/images/T3 Code by vnhax.net.png',
    imageAlt: 'T3 Code architecture: desktop, web and phone apps controlling Claude Code, Codex and other agents through a local server',
    kicker: 'pingdotgg / t3code — an agent harness control surface',
    title: 'T3 Code: One App to Run Claude Code, Codex, Cursor & More From Desktop or Phone',
    lead: (
      <>
        <strong>T3 Code doesn&apos;t replace your coding agent. It gives all of them one home.</strong>
        <br />
        If Claude Code, Codex or Cursor are set up on your computer, T3 Code can control them from a desktop app, a web app, or
        your phone, using the subscriptions you already pay for.
      </>
    ),
    metrics: [
      { value: '7', label: 'Agent providers supported', note: 'Codex, Claude, Cursor, Grok Build, OpenCode, Antigravity, fx' },
      { value: '4 apps', label: 'Desktop · Web · iOS · Android', note: 'Phone apps connect to your machine remotely' },
      { value: '$0', label: 'For T3 Code itself', note: 'MIT licensed; you pay only for your agents' },
    ],
    flow: {
      title: 'How T3 Code Fits Together',
      intro: 'Based on the README and docs, the setup has three layers:',
      steps: [
        { name: '1. Your agents', desc: 'Install and log in to at least one CLI, e.g. claude auth login or codex login. Antigravity needs no CLI.' },
        { name: '2. The t3 server', desc: 'Run t3 on your machine. It talks to the installed agents and serves a local web app. t3 service install keeps it running.' },
        { name: '3. Your screens', desc: 'Use the web app, the Electron desktop app, or the iOS and Android apps to start, watch and steer agent work remotely.' },
      ],
    },
    tables: [
      {
        title: 'Supported Providers & How to Connect Them',
        intro: 'From the README. T3 Code needs at least one of these installed and authenticated before first use.',
        columns: ['Provider', 'Setup'],
        rows: [
          ['Claude Code', 'Install Claude Code, then run claude auth login'],
          ['Codex', 'Install the Codex CLI, then run codex login'],
          ['Cursor', 'Install the Cursor CLI, then run agent login'],
          ['Grok Build', 'Install the Grok Build CLI, then run grok login'],
          ['OpenCode', 'Install OpenCode, then run opencode auth login'],
          ['Google Antigravity', 'Enable it in Settings, use Install Antigravity and Sign in with Google (no CLI needed)'],
          ['fx', 'Install fx and run fx login on the machine running the T3 Code server'],
        ],
      },
      {
        title: 'Install Options',
        columns: ['Platform', 'Command'],
        rows: [
          ['macOS / Linux (CLI)', 'curl -fsSL https://t3.codes/install.sh | sh'],
          ['Windows (CLI)', 'irm https://t3.codes/install.ps1 | iex'],
          ['Windows desktop', 'winget install T3Tools.T3Code  ·  scoop install extras/t3code'],
          ['macOS desktop', 'brew install --cask t3-code'],
          ['Debian / Ubuntu', 'Download the .deb from GitHub Releases, then sudo apt install ./T3-Code-*.deb'],
          ['Arch Linux', 'yay -S t3code-bin (stable) or yay -S t3code-nightly-bin'],
          ['Nix', 'nix profile add github:NixOS/nixpkgs/nixos-unstable#t3code'],
        ],
      },
    ],
    install: {
      label: 'Quick Start',
      title: 'Install & Run',
      primary: 'curl -fsSL https://t3.codes/install.sh | sh',
      note: (
        <>
          Then run {code('t3')} to start the server and open the local web app. {code('t3 update')} upgrades it and {code('t3 --help')} lists every
          command.
        </>
      ),
      extras: [
        { label: 'Try once without installing:', cmd: 'npx t3@latest' },
        { label: 'Keep it running in the background:', cmd: 't3 service install' },
        { label: 'Windows (PowerShell):', cmd: 'irm https://t3.codes/install.ps1 | iex' },
        { label: 'Contributors (Vite+ toolchain):', cmd: 'curl -fsSL https://vite.plus | bash && vp i' },
      ],
    },
    split: [
      {
        title: '"Wait, What Are You Selling Me?"',
        body: 'The README answers this directly: nothing. The team says they built T3 Code because existing tools like the Codex desktop app, Conductor, Claude Desktop and Cursor Glass did not meet their bar for performance, remote access and openness, and that the code is open so you can fork it if they go in the wrong direction.',
      },
      {
        title: 'Why Remote Access Matters for Agents',
        body: 'Agent tasks can run for many minutes. With the server on your workstation and the app on your phone, you can check progress, answer a permission prompt, or start the next task without sitting at your desk. The docs include a dedicated guide for remote access from a phone or another machine.',
      },
    ],
    honest: {
      title: 'Know This Before You Rely On It',
      intro: 'Straight from the README:',
      items: [
        ['Very early', 'The team says "We are very very early in this project. Expect bugs."'],
        ['Limited contributions', 'They are mostly not accepting contributions yet; small fixes may be considered, big features will not be.'],
        ['Your agents, your costs', 'T3 Code is free, but every task still runs on your Claude, Codex or other subscription or API account.'],
        ['Remote means exposure', 'Remote access gives a phone control over agents that can edit files on your machine. Follow the remote-access guide and keep it secured.'],
      ],
    },
    cards: [
      { icon: '🧩', title: 'Works With', body: 'Claude Code, Codex, Cursor, Grok Build, OpenCode, Google Antigravity and fx.' },
      { icon: '⚖️', title: 'License', body: <><strong>MIT License.</strong> Fork it and build the editor you want.</> },
      { icon: '📘', title: 'Docs', body: 'Docs live in the repo under docs/: install, permission modes, remote access, MCP and background service guides.' },
    ],
  },

  'claude-mem': {
    accent: ACCENTS.rose,
    badges: ['🔥 1,527 STARS IN ONE DAY (2 NOV 2026)', 'PERSISTENT AGENT MEMORY', '4 MCP SEARCH TOOLS', 'SQLITE + CHROMA', 'APACHE-2.0 LICENSE'],
    image: '/images/Claude-Mem by vnhax.net.png',
    imageAlt: 'Claude-Mem architecture: lifecycle hooks capture agent work into SQLite and Chroma, and MCP search tools bring it back into new sessions',
    kicker: 'thedotmack / claude-mem — persistent context across sessions',
    title: 'Claude-Mem: Give Claude Code (and Other Agents) Memory That Survives Sessions',
    lead: (
      <>
        <strong>Stop re-explaining your project every time you open a new session.</strong>
        <br />
        Claude-Mem captures what your agent does, compresses it into summaries, and injects the relevant parts into future sessions.
        The agent can also search that history on its own.
      </>
    ),
    metrics: [
      { value: '6 hooks', label: 'Lifecycle events captured', note: 'SessionStart through SessionEnd' },
      { value: '~10×', label: 'Token savings (project claim)', note: 'Search an index first, fetch details only for chosen IDs' },
      { value: '10+', label: 'Agent harnesses supported', note: 'Claude Code, Codex, OpenCode, T3 Code, Antigravity…' },
    ],
    flow: {
      title: 'The 3-Layer Memory Search',
      intro: 'Claude-Mem exposes four MCP tools. The README recommends this order to keep token use low:',
      steps: [
        { name: 'search', desc: 'Get a compact index of matching memories with IDs, about 50–100 tokens per result. Filter by type, date or project.' },
        { name: 'timeline', desc: 'See what was happening around an interesting result, in chronological order.' },
        { name: 'get_observations', desc: 'Fetch the full details only for the IDs you picked, about 500–1,000 tokens each. Batch several IDs per call.' },
      ],
    },
    tables: [
      {
        title: 'Core Components',
        columns: ['Component', 'What It Does'],
        rows: [
          ['Lifecycle hooks', 'SessionStart, UserPromptSubmit, PreToolUse, PostToolUse, Stop and SessionEnd, each one command run by a small launcher on PATH.'],
          ['Worker service', 'A local HTTP API with a web viewer and search endpoints, managed by Bun.'],
          ['SQLite database', 'Stores sessions, observations and summaries, with FTS5 full-text search.'],
          ['Chroma vector DB', 'Adds semantic search next to keyword search (hybrid retrieval).'],
          ['mem-search skill', 'Lets you ask questions of your project history in natural language.'],
          ['Web viewer & My Work', 'Browse memory, sessions and settings; track live requests and a review queue locally.'],
        ],
      },
      {
        title: 'Install for Your Agent',
        intro: 'Commands from the README. Restart the agent afterwards.',
        columns: ['Agent', 'Command'],
        rows: [
          ['Claude Code', 'npx claude-mem install  (or /plugin marketplace add thedotmack/claude-mem, then /plugin install claude-mem)'],
          ['OpenCode', 'npx claude-mem install --ide opencode  (OpenCode 1.3.4 or later)'],
          ['T3 Code', 'npx claude-mem install --ide t3code'],
          ['Antigravity CLI', 'npx claude-mem install --ide antigravity'],
          ['Pi / DeepSeek Harness', 'npx claude-mem install --ide pi  ·  npx claude-mem install --ide dsh --dsh-profile tui'],
          ['OpenClaw gateway', 'curl -fsSL https://install.cmem.ai/openclaw.sh | bash'],
        ],
      },
    ],
    install: {
      label: 'Setup',
      title: 'Install (Claude Code)',
      primary: 'npx claude-mem install',
      note: (
        <>
          The installer sets up hooks and the worker, then offers a browser sign-in for the hosted memory service. To skip it, pass an
          explicit {code('--provider')} flag or set {code('CLAUDE_MEM_ONLINE_OPTIN=false')}.
        </>
      ),
      extras: [
        { label: 'From inside Claude Code:', cmd: '/plugin marketplace add thedotmack/claude-mem' },
        { label: 'Then:', cmd: '/plugin install claude-mem' },
        { label: 'Not this (library only, no hooks):', cmd: 'npm install -g claude-mem' },
        { label: 'Requirements:', cmd: 'Node.js 20+, Claude Code with plugin support (Bun & uv auto-installed)' },
      ],
    },
    split: [
      {
        title: 'Why Progressive Disclosure Saves Tokens',
        body: 'Loading every past observation into context would be expensive and noisy. Claude-Mem gives the agent a cheap index first, lets it look around a promising result, and only then pulls full details for the few memories that matter. The README puts the saving at about 10x compared with fetching everything up front.',
      },
      {
        title: 'Choosing a Memory Provider',
        body: 'After install you choose who generates the summaries: the hosted claude-mem observer (30-day free trial, then it falls back to your Anthropic plan unless you subscribe), your own OpenRouter or Gemini key, or your Anthropic plan. Pick based on cost and on where you are comfortable sending session content.',
      },
    ],
    honest: {
      title: 'Privacy & Cost Checklist',
      intro: 'Memory tools see a lot of your work. Before you install:',
      items: [
        ['Hosted by default', 'The default sign-in path uses the hosted memory service. Choose a local or bring-your-own-key provider if your code must stay in-house.'],
        ['Mark secrets', 'Wrap sensitive content in <private> tags so it is not stored.'],
        ['Opt-in extras', 'Screenshots are off by default; Cloud Sync uploads to cmem.ai only when you enable it.'],
        ['Summaries cost tokens', 'Generating summaries uses a model. After the free trial, that comes out of your plan or your own API key.'],
      ],
    },
    cards: [
      { icon: '🔒', title: 'Privacy Controls', body: '<private> tags, opt-in screenshots and Cloud Sync, and a choice of memory provider.' },
      { icon: '⚖️', title: 'License', body: <><strong>Apache-2.0</strong> (per the GitHub repository metadata).</> },
      { icon: '📘', title: 'Docs', body: 'docs.claude-mem.ai: installation, search tools, configuration, architecture and troubleshooting.' },
    ],
  },

  lightpanda: {
    accent: ACCENTS.teal,
    badges: ['🔥 827 STARS IN ONE DAY (2 NOV 2026)', 'WRITTEN IN ZIG', 'NOT A CHROMIUM FORK', 'CDP · MCP · AGENT MODE', 'AGPL-3.0 LICENSE'],
    image: '/images/Lightpanda by vnhax.net.png',
    imageAlt: 'Lightpanda architecture: Puppeteer, Playwright, MCP clients and the built-in agent drive a lightweight Zig browser',
    kicker: 'lightpanda-io / browser — the headless browser built for AI and automation',
    title: 'Lightpanda: A Lightweight Headless Browser for AI Agents, Scrapers & Tests',
    lead: (
      <>
        <strong>Headless Chrome was built for people. Lightpanda was built for machines.</strong>
        <br />
        A new browser written from scratch in Zig, with V8 for JavaScript. It speaks the Chrome DevTools Protocol, so Puppeteer and
        Playwright can connect, and it adds an MCP server and an agent mode for AI workflows.
      </>
    ),
    metrics: [
      { value: '123 MB', label: 'Peak memory, 100 pages', note: 'vs 2 GB for headless Chrome (project benchmark)' },
      { value: '5 s', label: 'Execution time, 100 pages', note: 'vs 46 s for headless Chrome (project benchmark)' },
      { value: '3 protocols', label: 'CDP · WebDriver BiDi · MCP', note: 'Plus a built-in agent mode' },
    ],
    flow: {
      title: 'Ways to Use Lightpanda',
      intro: 'One binary, several modes, according to the README:',
      steps: [
        { name: 'lightpanda fetch', desc: 'Load a URL and dump it as HTML, Markdown, PNG, PDF or structured data (JSON-LD, OpenGraph, meta tags).' },
        { name: 'lightpanda serve', desc: 'Run a CDP server (default) or WebDriver BiDi server for Puppeteer, Playwright and other clients.' },
        { name: 'lightpanda mcp', desc: 'Expose the browser as an MCP server over stdio or HTTP, with isolated or shared sessions per agent.' },
        { name: 'lightpanda agent', desc: 'Drive the browser with plain-English tasks, then /save the session as a replayable PandaScript.' },
        { name: 'lightpanda run', desc: 'Replay a saved PandaScript deterministically, with no LLM and no tokens at runtime.' },
      ],
    },
    tables: [
      {
        title: 'The Benchmark, Read Carefully',
        intro: "Lightpanda's own test: 933 real web pages requested over the network on an AWS EC2 m5.large. Figures below are for 100 pages.",
        columns: ['Metric', 'Lightpanda vs Headless Chrome'],
        rows: [
          ['Peak memory', '123 MB vs 2 GB, about 16x less'],
          ['Execution time', '5 s vs 46 s, about 9x faster'],
          ['Who measured it', 'The Lightpanda team; benchmark details are in the lightpanda-io/demo repository'],
        ],
      },
      {
        title: 'Platforms & Install',
        columns: ['Platform', 'How'],
        rows: [
          ['Linux (x86_64, aarch64)', 'Nightly binary from GitHub Releases; needs glibc 2.35+ (x86_64) or 2.38+ (arm64), so not Alpine/musl'],
          ['macOS (Apple Silicon, Intel)', 'Nightly binary, or brew install lightpanda-io/browser/lightpanda'],
          ['Docker', 'docker run -d --name lightpanda -p 127.0.0.1:9222:9222 lightpanda/browser:latest'],
          ['Windows', 'No native binary: install inside WSL2 using the Linux steps'],
          ['Nix / Arch', 'nix run github:lightpanda-io/browser -- --help  ·  yay -S lightpanda-nightly-bin'],
        ],
      },
    ],
    install: {
      label: 'Quick Start',
      title: 'Run the CDP Server',
      primary: 'docker run -d --name lightpanda -p 127.0.0.1:9222:9222 lightpanda/browser:latest',
      note: (
        <>
          Then connect Puppeteer with {code('puppeteer.connect({ browserWSEndpoint: "ws://127.0.0.1:9222" })')}. The rest of your script stays
          the same. Binding to 127.0.0.1 keeps the browser off your network.
        </>
      ),
      extras: [
        { label: 'Dump a page as Markdown:', cmd: './lightpanda fetch --obey-robots --dump markdown https://example.com' },
        { label: 'MCP server for agents (stdio):', cmd: './lightpanda mcp' },
        { label: 'Agent mode with a task:', cmd: './lightpanda agent --task "top story on news.ycombinator.com?"' },
        { label: 'Turn off telemetry:', cmd: 'export LIGHTPANDA_DISABLE_TELEMETRY=true' },
      ],
    },
    split: [
      {
        title: 'Why a New Browser Instead of a Chromium Fork',
        body: 'A Chromium fork carries everything needed to paint pages for people: compositing, GPU work, fonts and much more. An agent or scraper mostly needs the DOM, JavaScript and the network. Building only that is what lets Lightpanda use far less memory and start fast, which matters when you run many pages at once.',
      },
      {
        title: 'PandaScript: Prototype With an LLM, Ship Without One',
        body: 'In agent mode you describe a task in plain English and the model drives the browser. Run /save to export the session as PandaScript, plain JavaScript with a few browser primitives, then replay it with lightpanda run. The replay is deterministic and uses no tokens, so production jobs do not need a model at all.',
      },
    ],
    honest: {
      title: 'Limits to Plan Around',
      intro: 'From the README and from what a young browser implies:',
      items: [
        ['Not every site will work', 'Lightpanda is a new engine, not Chromium. Test your target pages before swapping it into production.'],
        ['Telemetry is on by default', 'Disable it with LIGHTPANDA_DISABLE_TELEMETRY=true.'],
        ['No native Windows or Android', 'Use WSL2 on Windows; Android/Termux is not supported. Linux builds need glibc, not musl.'],
        ['AGPL-3.0', 'Offering a modified version as a network service can trigger AGPL source-sharing obligations. Check with your legal team.'],
      ],
    },
    cards: [
      { icon: '🤖', title: 'AI Providers (Agent Mode)', body: 'Anthropic, OpenAI, Gemini, Vertex AI, Mistral, Hugging Face, OpenRouter, Vercel AI Gateway, and local models via Ollama or llama.cpp.' },
      { icon: '⚖️', title: 'License', body: <><strong>AGPL-3.0.</strong> Free to use; read the terms before offering it as a hosted service.</> },
      { icon: '📘', title: 'Docs', body: 'lightpanda.io/docs: MCP server guide, agent mode and PandaScript reference.' },
    ],
  },

  ponytail: {
    accent: ACCENTS.violet,
    badges: ['PONYTAIL 5', '-53% CODE (PROJECT BENCHMARK)', 'CLAUDE CODE · CODEX · AGENTS.MD', 'NEVER CUTS SECURITY OR TESTS', 'MIT LICENSE'],
    image: '/images/ponytail By Vnhax.net.png',
    imageAlt: 'Ponytail: a coding agent replaces a long, over-built implementation with a short one that reuses existing code',
    kicker: 'DietrichGebert / ponytail — "He says nothing. He writes one line. It works."',
    title: 'Ponytail: Stop AI Coding Agents From Writing More Code Than the Task Needs',
    lead: (
      <>
        <strong>A skill that puts a strict senior developer inside your coding agent.</strong>
        <br />
        Before writing anything, Ponytail reads the code the change touches, reuses what exists and leans on what the platform already
        provides. It never cuts validation, error handling, security or accessibility.
      </>
    ),
    metrics: [
      { value: '-53%', label: 'Code written', note: 'Ponytail 5 vs same agent without it (project benchmark)' },
      { value: '-41%', label: 'Agent time', note: '39 tasks, Opus 5.5, 5 runs each (project benchmark)' },
      { value: '98%', label: 'Risky logic shipped with a test', note: 'vs 68% without Ponytail (project benchmark)' },
    ],
    flow: {
      title: 'How Ponytail Decides What to Write',
      intro: 'From the README, the order of work for every task:',
      steps: [
        { name: '1. Understand', desc: 'Read the code the change touches and trace the real data flow. Lazy about the solution, never about reading.' },
        { name: '2. Reuse', desc: 'Look for something that already exists in the repo, such as an existing Input component.' },
        { name: '3. Use the platform', desc: 'Prefer what the browser or language already provides, like a native date picker.' },
        { name: '4. Write the minimum', desc: 'Only then write new code, keeping validation, error handling, security and accessibility.' },
        { name: '5. Report', desc: 'Leave a small test for risky logic and end with what was skipped or not checked.' },
      ],
    },
    tables: [
      {
        title: 'Commands',
        columns: ['Command', 'What It Does'],
        rows: [
          ['/ponytail [lite | full | ultra | off]', 'Set the intensity or turn it off. With no argument it reports or switches on the default level.'],
          ['/ponytail-review', 'Reviews the current diff like the senior dev who gets paged: bugs, security, real load, missing tests, slow paths, and what to cut.'],
          ['/ponytail-audit', 'The same checks for the whole repository, most important first.'],
          ['/ponytail-debt', 'Collects the shortcut: comments you deferred into a ledger.'],
          ['/ponytail-gain', 'Shows the measured impact scoreboard from the benchmark.'],
          ['/ponytail band', 'Claude Code only: a band above the prompt with cost, tokens, agent time, reuse and test status.'],
        ],
      },
      {
        title: 'The Benchmark, Read Carefully',
        intro: 'All figures are from the Ponytail 5 README, measured by the project in Claude Code with and without the skill.',
        columns: ['Measure', 'Result'],
        rows: [
          ['Code written', '-53%'],
          ['Agent time', '-41%'],
          ['Cost', '-26%'],
          ['Tokens', '-45%'],
          ['Risky logic shipped with a test', '98% with Ponytail vs 68% without'],
          ['Setup', '39 tasks including a real FastAPI + React repo, Opus 5.5, 5 runs each'],
        ],
      },
    ],
    install: {
      label: 'Install',
      title: 'Install in Claude Code',
      primary: '/plugin marketplace add DietrichGebert/ponytail',
      note: (
        <>
          Then, as a separate prompt, run {code('/plugin install ponytail@ponytail')}. Ponytail is active in every session afterwards.
        </>
      ),
      extras: [
        { label: 'Codex:', cmd: 'codex plugin marketplace add DietrichGebert/ponytail && codex plugin add ponytail@ponytail' },
        { label: 'Then in Codex:', cmd: 'Open /hooks, trust the two lifecycle hooks, start a new thread' },
        { label: 'Any other agent:', cmd: 'Copy AGENTS.md into your project (see INSTALL.md)' },
        { label: 'Set a default level (optional):', cmd: 'PONYTAIL_DEFAULT_MODE=lite' },
      ],
    },
    split: [
      {
        title: 'Why Less Code Is Not the Same as Cutting Corners',
        body: 'The README is explicit that the rule was never "fewest tokens". It is to write only what the task needs, and never cut validation, error handling, security or accessibility. Lower cost and faster runs are a side effect of not building what nobody asked for.',
      },
      {
        title: 'One Prompt, Many Agents',
        body: 'Ponytail is a single prompt (skills/ponytail/SKILL.md) plus a compact AGENTS.md for agents that read a rules file. Everything else in the repository just loads that prompt into different agents, which is why it works across Claude Code, Codex, Copilot, Cursor, OpenCode, Gemini and others.',
      },
    ],
    honest: {
      title: 'Before You Install',
      intro: 'Points worth knowing, mostly from the README:',
      items: [
        ['Vendor benchmark', 'The -53% and -41% figures are the project\'s own measurements on its own task set. Check the effect on your codebase.'],
        ['Official sources only', 'Install only from DietrichGebert/ponytail on GitHub or @dietrichgebert/ponytail on npm. It never ships .exe or .dll files.'],
        ['Agent support varies', 'Commands need a skill-capable host; some features, like the band, are Claude Code only.'],
      ],
    },
    cards: [
      { icon: '🧩', title: 'Works With', body: 'Claude Code and Codex natively; Copilot, Cursor, OpenCode, Gemini and others via AGENTS.md.' },
      { icon: '⚖️', title: 'License', body: <><strong>MIT License.</strong></> },
      { icon: '📘', title: 'Docs', body: 'README and INSTALL.md in the repository, plus examples in examples/.' },
    ],
  },

  impeccable: {
    accent: ACCENTS.rose,
    badges: ['24 DESIGN COMMANDS', '62 DETERMINISTIC RULES', 'NO LLM NEEDED FOR THE DETECTOR', 'WORKS IN CI & CHROME', 'APACHE-2.0 LICENSE'],
    image: '/images/impeccable by vnhax.net.png',
    imageAlt: 'Impeccable: a design vocabulary and slop detector that reviews AI-generated interfaces',
    kicker: 'pbakaus / impeccable — the design vocabulary for your coding agent',
    title: 'Impeccable: Design Commands and a Slop Detector for AI-Generated Interfaces',
    lead: (
      <>
        <strong>Words for what you want, a reviewer, and a detector that catches AI design clichés.</strong>
        <br />
        Steer with commands like {code('bolder')} and {code('polish')}, review with {code('critique')} and {code('audit')}, and catch patterns such as
        purple gradients and cards nested in cards before they ship.
      </>
    ),
    metrics: [
      { value: '24', label: 'Design commands', note: 'Steer, review, finish, iterate live, plan' },
      { value: '62', label: 'Deterministic detector rules', note: 'No LLM, no API key (per README)' },
      { value: '3 ways', label: 'To run the detector', note: 'In your agent, in CI/terminal, in Chrome' },
    ],
    flow: {
      title: 'How a Typical Session Works',
      intro: 'Based on the README:',
      steps: [
        { name: '/impeccable init', desc: 'Reads your code, asks only what it cannot infer, and writes PRODUCT.md for later commands.' },
        { name: '/impeccable document', desc: 'Optionally captures your existing visual system in DESIGN.md.' },
        { name: 'Command + target', desc: 'For example "/impeccable critique the onboarding flow". Narrow targets give better results.' },
        { name: 'Detector hook', desc: 'Scans every UI file the agent edits and reports findings before the agent calls the work done.' },
      ],
    },
    tables: [
      {
        title: 'The 24 Commands',
        columns: ['Group', 'Commands'],
        rows: [
          ['Steer', 'bolder, quieter, distill, colorize, typeset, layout, animate'],
          ['Review', 'critique (scored UX review), audit (technical quality report, P0 to P3)'],
          ['Finish', 'polish, harden, clarify, adapt, optimize, onboard'],
          ['Iterate live', 'live (pick an element in the browser and cycle variants), generate'],
          ['Plan and set up', 'shape, init, document, extract'],
          ['Deprecated', 'craft (alias for a plain build request)'],
        ],
      },
      {
        title: 'Run the Detector Without an Agent',
        columns: ['Command', 'What It Does'],
        rows: [
          ['npx impeccable detect src/', 'Scan a directory (pattern rules for JSX, TSX and other sources)'],
          ['npx impeccable detect http://localhost:5173', 'Scan a rendered page, which enables rules like low contrast and tiny text'],
          ['npx impeccable detect --json .', 'Machine-readable output'],
          ['npx impeccable detect --github src/', 'GitHub Actions annotations'],
          ['npx impeccable detect --list-rules', 'Every rule with its id and description'],
        ],
      },
    ],
    install: {
      label: 'Install',
      title: 'Install (From Your Project Root)',
      primary: 'npx impeccable install',
      note: (
        <>
          The installer detects your coding tools, asks whether to install for the project or globally, and offers the design hook. Reload
          your tool, then run {code('/impeccable init')} ({code('$impeccable init')} on Codex).
        </>
      ),
      extras: [
        { label: 'Update an existing install:', cmd: 'npx impeccable update' },
        { label: 'Claude Code plugin:', cmd: '/plugin marketplace add pbakaus/impeccable' },
        { label: 'Grok Build:', cmd: 'grok plugin install pbakaus/impeccable#plugin --trust' },
        { label: 'Allow your brand font:', cmd: 'npx impeccable ignores add-value overused-font Inter --reason "Brand font"' },
      ],
    },
    split: [
      {
        title: 'Why Agents Need a Design Vocabulary',
        body: '"Make it pop" leaves the agent guessing. A command like "/impeccable bolder the pricing cards" loads a playbook written for that one move and points it at one target. The README says Impeccable is strongest on interfaces that already exist, iterating one component at a time.',
      },
      {
        title: 'What the Detector Looks For',
        body: 'The rules flag common tells of AI-generated interfaces, such as Inter used everywhere, purple-to-blue gradients, cards nested in cards, gray text on colored backgrounds and an icon tile above every heading, plus quality problems like cramped padding and skipped headings.',
      },
    ],
    honest: {
      title: 'Cautions From the README',
      intro: 'Worth reading before you turn everything on:',
      items: [
        ['Live mode is local only', 'Do not inject it into a deployed site or weaken a production CSP to make it work.'],
        ['Apply can run an agent with safeguards off', 'If no live session is polling, Apply runs the codex or claude CLI with approvals and sandboxing turned off. Review it before using it in an unfamiliar repository.'],
        ['Some tools need an extra step', 'Codex needs the hook approved in /hooks, Grok Build needs /hooks-trust, and Hermes needs the hook plugin enabled.'],
      ],
    },
    cards: [
      { icon: '🧩', title: 'Works With', body: 'Claude Code, Cursor, Codex CLI, GitHub Copilot, Gemini CLI, Grok Build, OpenCode, Antigravity, Kiro, Trae, Qoder and more.' },
      { icon: '⚖️', title: 'License', body: <><strong>Apache-2.0</strong> (per GitHub repository metadata).</> },
      { icon: '📘', title: 'Docs', body: 'impeccable.style/docs, with a page for every command.' },
    ],
  },

  ecc: {
    accent: ACCENTS.sky,
    badges: ['71 AGENTS · 314 SKILLS', 'AGENTSHIELD SECURITY SCANNING', 'CLAUDE CODE · CODEX · QODER', 'GUIDED SETUP (ECC 2.2)', 'MIT LICENSE'],
    image: '/images/ECC by vnhax.net.png',
    imageAlt: 'ECC: a coding agent connected to planning, testing, review, memory and security workflows',
    kicker: 'affaan-m / ECC — "Optimize the context window. Persist everything else."',
    title: 'ECC (Everything Claude Code): A Full Engineering Workflow for Your Coding Agent',
    lead: (
      <>
        <strong>Your agent can write code. ECC gives it a process.</strong>
        <br />
        It plans before it builds, verifies changes with tests, reviews its own work from a fresh context, remembers what matters and turns
        repeated wins into reusable skills: plan, test, implement, review, verify, remember, improve.
      </>
    ),
    metrics: [
      { value: '71 agents', label: 'Specialised agents', note: 'Per README, November 2026' },
      { value: '314 skills', label: 'Skills', note: 'TDD, research, security, docs, frontend, data, ML, ops' },
      { value: '98', label: 'Command shims', note: 'While ECC moves to a skills-first design' },
    ],
    flow: {
      title: "What's Included",
      intro: 'The README lists these building blocks:',
      steps: [
        { name: 'Agents', desc: 'Planning, review, build repair, security, architecture and domain work.' },
        { name: 'Skills', desc: 'TDD, research, security, docs, frontend, data, ML, operations and more, loaded when needed.' },
        { name: 'Hooks & memory', desc: 'Enforcement, session summaries, continuous learning, instincts and context controls.' },
        { name: 'Rules', desc: 'Always-loaded standards you choose by language or project.' },
        { name: 'AgentShield', desc: 'Scans prompts, hooks, MCP config, permissions, secrets and agent files.' },
      ],
    },
    tables: [
      {
        title: 'Install Options (Pick One per Agent)',
        intro: 'From the README. Installing ECC twice into the same agent duplicates skills, commands and hooks.',
        columns: ['Method', 'Command'],
        rows: [
          ['Guided setup (recommended)', 'npx ecc-universal@2.2.3 setup'],
          ['Several agents at once', 'npx ecc-universal@2.2.3 install --guided'],
          ['Claude Code native plugin', '/plugin marketplace add https://github.com/affaan-m/ECC, then /plugin install ecc@ecc'],
          ['Rule packs (optional)', 'Copy rules/common plus one language pack into ~/.claude/rules/ecc/'],
        ],
      },
      {
        title: 'Agent Support',
        columns: ['Agent', 'Support level'],
        rows: [
          ['Claude Code', 'Best support; native ecc@ecc plugin'],
          ['Codex, Qoder', 'Native plugin paths'],
          ['Kimi Code', 'Managed project files via the guided installer'],
          ['Cursor, OpenCode, Gemini, Zed, GitHub Copilot, Antigravity, Qwen and others', 'Capability-limited adapters'],
        ],
      },
    ],
    install: {
      label: 'Install',
      title: 'Guided Setup for Claude Code',
      primary: 'npx ecc-universal@2.2.3 setup',
      note: (
        <>
          Needs Node.js 18+, Git and Claude Code 2.1+ on your PATH. For a personal setup, choose <strong>Global user</strong> and{' '}
          <strong>Standard</strong> hooks, then run {code('/plugin list')} in a new session to check that ecc@ecc is enabled.
        </>
      ),
      extras: [
        { label: 'Check the published version:', cmd: 'npm view ecc-universal version' },
        { label: 'Native plugin (instead of setup):', cmd: '/plugin install ecc@ecc' },
        { label: 'Preview without writing:', cmd: 'npx ecc-universal@2.2.3 install --guided --harness codex --dry-run' },
        { label: 'Reconfigure after install:', cmd: '/ecc:configure-ecc' },
      ],
    },
    split: [
      {
        title: 'Why a Process Beats a Bigger Prompt',
        body: 'Long instructions pasted into every prompt fill the context window and still get ignored. ECC installs the workflow once, as agents, skills, hooks and rules that load when needed, so each session starts with the same habits without carrying everything in context.',
      },
      {
        title: 'Free Core, Paid Hosted Option',
        body: 'The repository is MIT-licensed. The project also sells ECC Pro, a hosted GitHub App for private repositories, which together with sponsors funds a single maintainer shipping across several agent harnesses.',
      },
    ],
    honest: {
      title: 'Things to Watch',
      intro: 'From the README and general experience with large agent toolkits:',
      items: [
        ['Official channels only', 'Install only from the affaan-m/ECC repository and its official npm packages.'],
        ['Do not stack installs', 'Use one install method per agent, or skills and hooks get duplicated.'],
        ['Counts change often', 'Agent, skill and command numbers grow with each release; check the README for current figures.'],
        ['Start small', 'Add only the rule packs you actually use, starting with rules/common plus one language.'],
      ],
    },
    cards: [
      { icon: '🛡️', title: 'Security', body: 'AgentShield scans prompts, hooks, MCP config, permissions, secrets and agent files. ECC never uploads diagnostics automatically.' },
      { icon: '⚖️', title: 'License', body: <><strong>MIT License.</strong> ECC Pro is a separate paid hosted app.</> },
      { icon: '📘', title: 'Docs', body: 'README sections cover install, reset and uninstall, and each supported harness.' },
    ],
  },

  effect: {
    accent: ACCENTS.teal,
    badges: ['EFFECT 4.x LTS', 'TYPED ERRORS', 'STRUCTURED CONCURRENCY', 'TYPESCRIPT 5.9+', 'MIT LICENSE'],
    image: '/images/Effect by vnhax.net.png',
    imageAlt: 'Effect: a TypeScript program with typed errors, services and concurrency managed by the Effect runtime',
    kicker: 'Effect-TS / effect — robust, type-safe applications in TypeScript',
    title: 'Effect: Typed Errors, Dependency Injection and Structured Concurrency for TypeScript',
    lead: (
      <>
        <strong>Make the hard parts of production TypeScript visible to the compiler.</strong>
        <br />
        Effect tracks which errors a function can fail with and which services it needs, and gives you structured concurrency, scheduling and
        tracing. Effect 4.x is a long-term support release.
      </>
    ),
    metrics: [
      { value: '3+ years', label: 'LTS support for 4.x', note: 'Bug and security fixes (per README)' },
      { value: '5.9+', label: 'Minimum TypeScript', note: 'TypeScript 7 recommended' },
      { value: '22.19+', label: 'Minimum Node.js', note: 'When running Effect on Node' },
    ],
    flow: {
      title: 'What Effect Handles for You',
      intro: 'The README describes Effect as helping with these problems at scale:',
      steps: [
        { name: 'Typed errors', desc: 'Failures are part of the type, so callers know what can go wrong and must handle it.' },
        { name: 'Dependency injection', desc: 'Required services appear in the type and are provided once at the edge of the app.' },
        { name: 'Structured concurrency', desc: 'Concurrent work is scoped, so it can be interrupted and cleaned up safely.' },
        { name: 'Scheduling & tracing', desc: 'Retries, schedules and tracing are built in, with an OpenTelemetry integration.' },
      ],
    },
    tables: [
      {
        title: 'Long-Term Support Guarantees (Effect 4.x)',
        columns: ['Guarantee', 'Detail'],
        rows: [
          ['Support period', 'At least three years, including bug and security fixes'],
          ['After the next major', 'Bug fixes for one year, security fixes for two years'],
          ['Breaking changes', 'Stable APIs break only in major releases; unstable APIs may change in minors, experimental in patches'],
          ['Effect v3', 'Lives on the v3 branch; a migration guide covers upgrading to 4.x'],
        ],
      },
      {
        title: 'Packages in the Monorepo',
        intro: 'All released together with synchronised versions.',
        columns: ['Group', 'Packages'],
        rows: [
          ['Core', 'effect'],
          ['Platforms', '@effect/platform-browser, -bun, -deno, -node, -node-shared'],
          ['SQL', 'PostgreSQL, MySQL, SQL Server, ClickHouse, libSQL, Cloudflare D1, PGlite and several SQLite drivers'],
          ['AI', '@effect/ai-anthropic, -openai, -openrouter, -openai-compat, -cloudflare, -typesafe'],
          ['UI & tooling', 'Atom bindings for React, Solid and Vue; OpenTelemetry; Vitest; docgen; OpenAPI and GraphQL generators'],
        ],
      },
    ],
    install: {
      label: 'Install',
      title: 'Add Effect to a Project',
      primary: 'npm install effect',
      note: <>Enable {code('"strict": true')} in your tsconfig.json. Effect requires TypeScript 5.9 or newer and Node.js 22.19 or newer on Node.</>,
      extras: [
        { label: 'Node platform services:', cmd: 'npm install @effect/platform-node' },
        { label: 'PostgreSQL client:', cmd: 'npm install @effect/sql-pg' },
        { label: 'Testing helpers:', cmd: 'npm install -D @effect/vitest' },
        { label: 'Upgrading from v3:', cmd: 'See MIGRATION.md in the repository' },
      ],
    },
    split: [
      {
        title: 'When Effect Is Worth the Learning Curve',
        body: 'Effect changes how you write TypeScript, so it pays off most on long-running services with many failure modes, external dependencies and concurrent work. For a small script or a simple CRUD app, plain TypeScript may be enough.',
      },
      {
        title: 'Getting Help',
        body: 'The maintainers run a Discord, publish docs and guides at effect.website, list adoption partners for consulting and training, and invite teams to share production feedback.',
      },
    ],
    honest: {
      title: 'Know Before You Adopt',
      intro: 'Practical points:',
      items: [
        ['New mental model', 'Effect code looks different from promise-based TypeScript. Plan time for the team to learn it.'],
        ['Strict requirements', 'TypeScript 5.9+, strict mode and Node.js 22.19+ may require upgrades in older projects.'],
        ['Major-version migration', 'Moving from v3 to v4 needs the migration guide; do it deliberately, not via a blind dependency bump.'],
      ],
    },
    cards: [
      { icon: '🌐', title: 'Website', body: 'effect.website: documentation, guides, API reference and news.' },
      { icon: '⚖️', title: 'License', body: <><strong>MIT License.</strong></> },
      { icon: '💬', title: 'Community', body: 'Discord, meetups and an adoption-partner programme for commercial support.' },
    ],
  },

  caveman: {
    accent: ACCENTS.amber,
    badges: ['33.2% FEWER INPUT TOKENS (PROJECT)', 'CITED BY ADOBE RESEARCH', 'CAVEMAN 4.0: SIX PARTS', '30+ AGENTS', 'APACHE-2.0 LICENSE'],
    image: '/images/Caveman AI by vnhax.net.png',
    imageAlt: 'Caveman: an AI coding agent that answers tersely and reads compressed tool output',
    kicker: 'JuliusBrussee / caveman — why many token when few do trick',
    title: 'Caveman: Make Your AI Coding Agent Say Less and Read Less',
    lead: (
      <>
        <strong>Shorter answers, smaller inputs, same code.</strong>
        <br />
        The caveman voice trims chatty answers while keeping code, commands, paths and error messages exact. Input compression shrinks logs,
        JSON, CSV and test output before the model reads them, and keeps the originals on disk.
      </>
    ),
    metrics: [
      { value: '33.2%', label: 'Fewer input tokens per session', note: '54 Claude Code runs, 18/18 answers right (project)' },
      { value: '63 → 20', label: 'Tokens for the same fix', note: 'Caveman voice example (project)' },
      { value: '1.4–2.4×', label: 'Cheaper output', note: 'Adobe Research, eight models (cited by README)' },
    ],
    flow: {
      title: 'The Six Parts of Caveman 4.0',
      intro: 'All are on after install; each has its own switch:',
      steps: [
        { name: 'Say less', desc: 'The caveman voice: answer first, one idea per sentence, payload kept verbatim.' },
        { name: 'Read less', desc: 'Compresses logs, JSON, CSV and test output before the model reads them.' },
        { name: 'Auto', desc: 'Picks the model and effort for each request. Needs a free account.' },
        { name: 'Blocks', desc: 'Reusable scripts for code mode, so agents stop retyping the same helper (pre-release).' },
        { name: 'Waste fixes', desc: 'Finds where tokens go and keeps the prompt cache warm while you pause.' },
        { name: 'Browse', desc: 'Returns web pages to the agent in compressed form.' },
      ],
    },
    tables: [
      {
        title: 'Outside Results Cited in the README',
        columns: ['Who', 'Result'],
        rows: [
          ['Adobe Research (CAVEWOMAN paper)', 'Caveman-style output cut cost 1.4× to 2.4× per model, up to 3×, across eight models and five datasets'],
          ['Elastic (Elasticsearch Labs)', '63.6% fewer response tokens in eight live MCP scenarios'],
          ['JetBrains', 'No measurable quality loss (p = 0.82) and 8.5% fewer output tokens on 86 coding tasks'],
        ],
      },
      {
        title: 'Input Compression by File Type (Project Measurements)',
        columns: ['File type', 'Whole-session saving'],
        rows: [
          ['CSV', '55.1%'],
          ['Logs', '50.2%'],
          ['YAML', '46.2%'],
          ['Test output', '27.8%'],
          ['JSON', '26.4%'],
          ['HTML', '9.9% worse (not compressed yet)'],
          ['All six together', '33.2% fewer input tokens'],
        ],
      },
    ],
    install: {
      label: 'Install',
      title: 'One-Command Install',
      primary: 'npx @caveman-ai/cli@latest',
      note: (
        <>
          Mac, Linux and Windows; needs Node.js 22.13+. It finds your agents and logins, shows what it will change, and asks you to confirm.
          Afterwards plain {code('claude')} runs with caveman on. {code('caveman status')} shows what is enabled.
        </>
      ),
      extras: [
        { label: 'Only the terse-answer skill:', cmd: 'npx skills add JuliusBrussee/caveman -g' },
        { label: 'Claude Code plugin:', cmd: 'claude plugin marketplace add JuliusBrussee/caveman && claude plugin install caveman@caveman' },
        { label: 'Turn one part off:', cmd: 'caveman off browse' },
        { label: 'Uninstall:', cmd: 'npx -y github:JuliusBrussee/caveman -- --uninstall' },
      ],
    },
    split: [
      {
        title: 'Why Your Prompts Are Left Alone',
        body: 'The README cites Adobe Research finding that compressing the user\'s own prompt makes answers worse. So caveman never rewrites what you type; it shortens what the agent says and what it reads from tools.',
      },
      {
        title: 'When It Saves Less',
        body: 'The project\'s own table shows HTML input getting slightly worse, and notes that "Be concise" is already a strong baseline on new models. Measure on your own sessions with caveman status and your provider\'s usage data.',
      },
    ],
    honest: {
      title: 'Honest Numbers',
      intro: 'Caveats the README itself states:',
      items: [
        ['Interim result', 'The Auto "54% cheaper" figure comes from a half-finished run on 85 tasks.'],
        ['Older measurements', 'The session compression run dates from August 2026 on an older engine.'],
        ['Pre-release parts', 'Blocks is a release candidate, Python only, with no sandbox yet.'],
        ['Account for Auto', 'Only Auto needs an account; without signing in, it is off and nothing is sent for it.'],
      ],
    },
    cards: [
      { icon: '🔒', title: 'Runs Locally', body: 'Uses your own keys or Claude Pro/Max login on your machine. Originals of compressed files stay on disk.' },
      { icon: '⚖️', title: 'License', body: <><strong>Apache-2.0</strong> (per GitHub repository metadata).</> },
      { icon: '📘', title: 'Docs', body: 'README and INSTALL.md cover 30+ agents, Windows, uninstall and the release notes.' },
    ],
  },

  'agent-reach': {
    accent: ACCENTS.emerald,
    badges: ['READ-ONLY BY DESIGN', '14 PLATFORM CHANNELS', 'NO PASSWORDS REQUESTED', 'WORKS WITH ANY CLI AGENT', 'MIT LICENSE'],
    image: '/images/Agent Reach by vnhax.net.png',
    imageAlt: 'Agent-Reach: an AI agent reading YouTube, Reddit, X, Bilibili and GitHub through one command',
    kicker: 'Panniantong / Agent-Reach — reach the parts of the internet your agent cannot',
    title: 'Agent-Reach: Let Your AI Agent Read YouTube, Reddit, X, Bilibili and More',
    lead: (
      <>
        <strong>One command for platforms your agent normally cannot reach.</strong>
        <br />
        Claude Code, Codex and similar agents can search the web, but struggle with content behind logins, video transcripts and Chinese
        platforms. Agent-Reach installs and tests the tools behind each platform for you.
      </>
    ),
    metrics: [
      { value: '14', label: 'Channels', note: '5 default, 6 optional, 3 experimental' },
      { value: 'Read-only', label: 'No posting or messaging', note: 'Search and read only (per README)' },
      { value: '1 folder', label: 'Everything installed', note: '~/.agent-reach/' },
    ],
    flow: {
      title: 'How It Works',
      intro: 'From the README:',
      steps: [
        { name: 'Channels', desc: 'Each platform is a channel, such as youtube, reddit or bilibili.' },
        { name: 'Ordered tools', desc: 'Every action tries a list of tools in order; if one fails, the next is used.' },
        { name: 'One command', desc: 'The agent runs agent-reach with a channel and action, or agent-reach read with a URL.' },
        { name: 'Plain-language management', desc: 'Ask your agent to add, remove, check, upgrade or uninstall channels.' },
      ],
    },
    tables: [
      {
        title: 'Supported Channels',
        intro: 'Translated from the README table (current version).',
        columns: ['Channel', 'Level and what you need'],
        rows: [
          ['Bilibili', 'Default: search, video info, trending, subtitles (subtitles need a login)'],
          ['V2EX, GitHub, web', 'Default: no login needed'],
          ['YouTube', 'Default: video info, search, subtitles; speech-to-text needs a Groq or OpenAI key'],
          ['Xiaohongshu, Reddit, Boss', 'Optional: login required'],
          ['Xueqiu, LinkedIn', 'Optional: some features need a login'],
          ['Xiaoyuzhou (podcasts)', 'Optional: speech-to-text with a Groq key'],
          ['X, Facebook, Instagram', 'Experimental: login required; may break as platforms tighten anti-bot rules'],
        ],
      },
    ],
    install: {
      label: 'Install',
      title: 'Install by Asking Your Agent',
      primary: 'Install Agent Reach: https://raw.githubusercontent.com/Panniantong/Agent-Reach/main/docs/install.md',
      note: (
        <>
          Paste this sentence into your agent; the same line also upgrades it. The agent may ask to run commands and install {code('uv')}, a
          small tool that needs no admin password.
        </>
      ),
      extras: [
        { label: 'List channels and capabilities:', cmd: 'agent-reach channels' },
        { label: 'Read a link (channel picked automatically):', cmd: 'agent-reach read https://www.v2ex.com/t/123' },
        { label: 'Add an API key in your own terminal:', cmd: 'agent-reach configure groq-key' },
        { label: 'Do not use:', cmd: 'The PyPI package named agent-reach (not this project)' },
      ],
    },
    split: [
      {
        title: 'How Logins Are Handled',
        body: 'Agent-Reach never logs in for you and never asks for passwords. For a logged-in platform it can copy that one site\'s login from your Chrome into its own dedicated background browser, leaving the original untouched. That browser only accepts connections from your own computer.',
      },
      {
        title: 'Why Fallbacks Matter',
        body: 'Platforms change their pages and anti-bot rules often. Because each action tries a list of tools in order, a broken tool is replaced by updating the list, and the agent keeps using the same command.',
      },
    ],
    honest: {
      title: 'Use It Responsibly',
      intro: 'Points from the README and common sense:',
      items: [
        ['Use a secondary account', 'Reused logins are usually your main account, and platforms may restrict accounts used for automated access.'],
        ['Respect platform terms', 'Automated reading of logged-in platforms can conflict with their terms of service. Check before using it at scale.'],
        ['Experimental channels', 'X, Facebook and Instagram may stop working at any time.'],
        ['Scam warning', 'The author says Agent-Reach has no token, coin or investment product; anything claiming otherwise is unrelated.'],
      ],
    },
    cards: [
      { icon: '🔒', title: 'Safety', body: 'Read-only, no passwords, keys entered in your own terminal, and a dedicated browser reachable only from your machine.' },
      { icon: '⚖️', title: 'License', body: <><strong>MIT License</strong> (per GitHub repository metadata).</> },
      { icon: '🗑️', title: 'Uninstall', body: 'Ask your agent to uninstall; it lists what will be removed and deletes only what Agent-Reach installed.' },
    ],
  },
};

export default function TrendingRepoDoc({ slug }: { slug: string }) {
  const doc = TRENDING_DOCS[slug];
  if (!doc) return null;
  const a = doc.accent;

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
          <CopyCommandButton text={doc.install.primary} color={a.main} />
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
