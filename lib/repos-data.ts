import repoStats from './repo-stats.json';

/**
 * Repositories Data & GEO/AEO Knowledge Base
 * VNHAX — Virtual Next-Gen Hub for AI & eXploration
 * 
 * Independent reviews of open-source repositories. Live stats: lib/repo-stats.json
 */

export interface RepoDetails {
  slug: string;
  name: string;
  repoFullName: string;
  githubUrl: string;
  image: string;
  language: string;
  license: string;
  stars: string;
  forks: string;
  statsUpdatedAt?: string;
  category: string;
  summary: string;
  metaDescription: string;
  whyUse: string;
  architecture: string;
  benchmarks: string;
  quickstart: string;
  topics: string[];
  keyTakeaways: string[];
  faqs: {
    question: string;
    answer: string;
  }[];
}

export const REPOS_DATA: Record<string, RepoDetails> = {
  ponytail: {
    slug: 'ponytail',
    name: 'Ponytail',
    repoFullName: 'DietrichGebert/ponytail',
    githubUrl: 'https://github.com/DietrichGebert/ponytail',
    image: '/images/ponytail By Vnhax.net.png',
    language: 'JavaScript',
    license: 'MIT',
    stars: '186k',
    forks: '9k',
    category: 'AI Coding Agents',
    topics: ['ai-agents', 'claude-code', 'codex', 'yagni', 'code-review', 'prompt-engineering'],
    summary:
      'A skill for Claude Code, Codex and other coding agents that makes them write only the code a task needs: reuse what already exists, lean on the platform, and never cut validation, error handling, security or accessibility.',
    metaDescription:
      'Ponytail (DietrichGebert/ponytail) review: the skill that stops AI coding agents over-building. Ponytail 5 benchmark results, install for Claude Code and Codex, commands, and honest caveats.',
    whyUse:
      'Ask an AI agent for a date picker and it may install a library or hand-build a calendar when the browser already has one. That extra code costs tokens, review time and future bugs. Ponytail puts a strict senior developer inside the agent: it reads the code the change touches, traces the real flow, then picks the smallest solution that does the job. The README is explicit that the goal is not "fewest tokens" but writing only what the task needs, so validation, data-loss handling, security and accessibility are never cut.',
    architecture:
      'Ponytail is one prompt, skills/ponytail/SKILL.md, plus a compact AGENTS.md for agents that read a rules file. Everything else in the repository loads that prompt into different agents. Logic with a branch, a loop, a parser, money or security leaves one small test behind, and every reply ends with what was skipped or not checked. Commands include /ponytail (lite, full, ultra or off), /ponytail-review, /ponytail-audit, /ponytail-debt and /ponytail-gain. Since version 5.3, Claude Code users also get a band above the prompt showing cost, tokens, agent time, code reuse and test status, with a local Board page stored in ~/.config/ponytail/band/.',
    benchmarks:
      'The Ponytail 5 README reports -53% code, -41% time, -26% cost and -45% tokens versus the same agent without the skill, in Claude Code on 39 tasks including a real FastAPI + React repository, with Opus 5.5 and 5 runs each. It also reports that 98% of risky logic ships with a test, versus 68% without Ponytail. These are the project\'s own measurements.',
    quickstart:
      '# Claude Code (two separate prompts)\n/plugin marketplace add DietrichGebert/ponytail\n/plugin install ponytail@ponytail\n\n# Codex\ncodex plugin marketplace add DietrichGebert/ponytail\ncodex plugin add ponytail@ponytail',
    keyTakeaways: [
      'Makes coding agents reuse existing code and platform features before writing new code.',
      'Never cuts validation, error handling, security or accessibility.',
      'Project benchmark: -53% code and -41% time versus the same agent without it.',
      'Leaves a small test behind for risky logic and reports what it skipped.',
      'Works in Claude Code and Codex natively, and in other agents through AGENTS.md.',
    ],
    faqs: [
      {
        question: 'How do I install Ponytail in Claude Code?',
        answer:
          'Run /plugin marketplace add DietrichGebert/ponytail and then /plugin install ponytail@ponytail as two separate prompts. For Codex, use the codex plugin marketplace add and codex plugin add commands, then trust its two hooks in /hooks.',
      },
      {
        question: 'Does Ponytail need a config file?',
        answer:
          'No. An optional ~/.config/ponytail/config.json or the PONYTAIL_DEFAULT_MODE environment variable can set the default level, but nothing is required.',
      },
      {
        question: 'Will Ponytail make my agent skip important checks?',
        answer:
          'It is designed not to. The README says trust-boundary validation, data-loss handling, security and accessibility are never on the chopping block, and logic with branches, loops, parsing, money or security gets a small test.',
      },
      {
        question: 'Where should I download Ponytail from?',
        answer:
          'Only from DietrichGebert/ponytail on GitHub or @dietrichgebert/ponytail on npm. The author says it never ships .exe or .dll files, so a copy that does is not genuine.',
      },
    ],
  },

  impeccable: {
    slug: 'impeccable',
    name: 'Impeccable',
    repoFullName: 'pbakaus/impeccable',
    githubUrl: 'https://github.com/pbakaus/impeccable',
    image: '/images/impeccable by vnhax.net.png',
    language: 'Rust',
    license: 'Apache-2.0',
    stars: '105k',
    forks: '5k',
    category: 'Frontend & Design Systems',
    topics: ['design', 'frontend', 'ai-agents', 'claude-code', 'accessibility', 'ui-review'],
    summary:
      'A design vocabulary for coding agents: 24 commands to steer, review and polish UI, plus a detector with 62 deterministic rules that catches common "AI slop" design patterns without an LLM.',
    metaDescription:
      'Impeccable (pbakaus/impeccable) review: 24 design commands and a 62-rule slop detector for Claude Code, Cursor, Codex and other agents. Install, live mode, CI usage and caveats.',
    whyUse:
      'Ask an agent for a web page with no other guidance and the same look appears again and again: Inter everywhere, purple-to-blue gradients, cards inside cards, gray text on colored backgrounds. Impeccable gives you words for what you actually want, such as "bolder the pricing cards", plus a reviewer that scores a design and a deterministic detector that flags these patterns before they ship.',
    architecture:
      'Run /impeccable init once per project: it reads your code, asks only what it cannot infer, and writes PRODUCT.md, which later commands read. Commands are grouped into steer (bolder, quieter, distill, colorize, typeset, layout, animate), review (critique and audit), finish (polish, harden, clarify, adapt, optimize, onboard), iterate live (live and generate) and plan (shape, init, document, extract). The detector runs in three places: as a design hook inside your agent, as a CLI (npx impeccable detect) for CI and terminals, and as a Chrome extension. The skill uses a self-contained engine binary; Node is only needed for npx.',
    benchmarks:
      'The project publishes before-and-after examples rather than numeric benchmarks. It states the detector uses 62 deterministic rules with no LLM and no API key.',
    quickstart:
      '# From your project root\nnpx impeccable install\n\n# Then, inside your agent\n/impeccable init\n/impeccable critique the pricing cards\n\n# Scan files or a running page from the terminal or CI\nnpx impeccable detect src/\nnpx impeccable detect http://localhost:5173',
    keyTakeaways: [
      '24 design commands give agents precise instructions instead of "make it pop".',
      'critique scores UX; audit checks accessibility, performance, theming and responsiveness.',
      'A 62-rule deterministic detector runs in your agent, in CI or in Chrome, with no LLM.',
      'Live mode lets you pick an element in the browser and cycle through variants.',
      'Works with Claude Code, Cursor, Codex, Copilot, Gemini CLI and many more.',
    ],
    faqs: [
      {
        question: 'How do I install Impeccable?',
        answer:
          'Run npx impeccable install from your project root. It detects your coding tools, asks whether to install for the project or globally, and offers the design hook where supported. Then run /impeccable init in your agent.',
      },
      {
        question: 'Does the Impeccable detector use an AI model?',
        answer:
          'No. The README says its 62 rules are deterministic, with no LLM and no API key. Source files get the pattern rules; rules that need a rendered page, like contrast and tiny text, run when you scan a URL.',
      },
      {
        question: 'Can I use Impeccable in CI?',
        answer:
          'Yes. npx impeccable detect works without an agent, can output JSON or GitHub Actions annotations, and exits with code 2 when it finds issues.',
      },
      {
        question: 'Is live mode safe to run on a production site?',
        answer:
          'No. The README says live mode edits a local checkout only and should not be injected into a deployed site. Its apply step can run an agent CLI with approvals and sandboxing turned off, so review it before use in an unfamiliar repository.',
      },
    ],
  },

  ecc: {
    slug: 'ecc',
    name: 'ECC (Everything Claude Code)',
    repoFullName: 'affaan-m/ECC',
    githubUrl: 'https://github.com/affaan-m/ECC',
    image: '/images/ECC by vnhax.net.png',
    language: 'JavaScript',
    license: 'MIT',
    stars: '299k',
    forks: '30k',
    category: 'Agent Harness & Workflows',
    topics: ['claude-code', 'agents', 'skills', 'hooks', 'tdd', 'security'],
    summary:
      'An open-source engineering system for coding agents: 71 agents, 314 skills and 98 command shims (per its README, November 2026), plus hooks, rules, memory and AgentShield security scanning.',
    metaDescription:
      'ECC (affaan-m/ECC) review: the agent harness that adds planning, testing, review, memory and security scanning to Claude Code, Codex and other agents. What is included, install options and caveats.',
    whyUse:
      'A coding agent can write code, but it does not automatically plan, test, review its own work or remember what worked last time. ECC packages that process, summarised in its README as plan, test, implement, review, verify, remember and improve, so you install it once instead of rebuilding it in every prompt. It works best with Claude Code, has native Codex and Qoder plugin paths, and offers capability-limited adapters for Cursor, OpenCode, Gemini, Zed, GitHub Copilot, Antigravity, Qwen and others.',
    architecture:
      'ECC ships agents specialised for planning, review, build repair, security, architecture and domain work; skills covering TDD, research, security, docs, frontend, data, ML and operations; command shims while it moves to a skills-first design; hooks and memory for session summaries and continuous learning; selectable rule packs; and AgentShield, which scans prompts, hooks, MCP config, permissions, secrets and agent files. The Claude Code plugin is ecc@ecc; the npm package is ecc-universal, which provides a guided setup for Claude Code, Codex and Kimi Code.',
    benchmarks:
      'The README does not publish performance benchmarks; it documents what is included and how to install it.',
    quickstart:
      '# Guided setup (Node.js 18+, Git, Claude Code 2.1+)\nnpx ecc-universal@2.2.3 setup\n\n# Or inside Claude Code\n/plugin marketplace add https://github.com/affaan-m/ECC\n/plugin install ecc@ecc',
    keyTakeaways: [
      '71 agents, 314 skills and 98 command shims, according to the README in November 2026.',
      'Adds planning, testing, self-review and memory to coding agents.',
      'AgentShield scans prompts, hooks, MCP config, permissions and secrets.',
      'Best support for Claude Code; native Codex and Qoder paths; adapters for other agents.',
      'Install one way per agent: stacking install methods duplicates skills and hooks.',
    ],
    faqs: [
      {
        question: 'How do I install ECC for Claude Code?',
        answer:
          'Run npx ecc-universal@2.2.3 setup for the guided installer, or inside Claude Code run /plugin marketplace add https://github.com/affaan-m/ECC and /plugin install ecc@ecc. Choose one method, not both.',
      },
      {
        question: 'Which agents does ECC support?',
        answer:
          'It works best with Claude Code, has native plugin paths for Codex and Qoder, and provides capability-limited adapters for Cursor, OpenCode, Gemini, Zed, GitHub Copilot, Antigravity, Qwen and others.',
      },
      {
        question: 'Is ECC free?',
        answer:
          'The repository is MIT-licensed. The project also offers ECC Pro, a hosted GitHub App for private repositories, as a paid option.',
      },
      {
        question: 'Where should I install ECC from?',
        answer:
          'The README warns to use only official channels: the affaan-m/ECC GitHub repository and its official npm packages such as ecc-universal.',
      },
    ],
  },

  effect: {
    slug: 'effect',
    name: 'Effect',
    repoFullName: 'Effect-TS/effect',
    githubUrl: 'https://github.com/Effect-TS/effect',
    image: '/images/Effect by vnhax.net.png',
    language: 'TypeScript',
    license: 'MIT',
    stars: '17.5k',
    forks: '600',
    category: 'TypeScript Library',
    topics: ['typescript', 'functional-programming', 'concurrency', 'typed-errors', 'dependency-injection', 'lts'],
    summary:
      'A TypeScript library for building robust, type-safe applications, with typed errors, dependency injection, structured concurrency, scheduling and tracing. Effect 4.x is a long-term support release.',
    metaDescription:
      'Effect (Effect-TS/effect) review: the TypeScript library for typed errors, dependency injection and structured concurrency. Effect 4.x LTS guarantees, requirements, packages and how to start.',
    whyUse:
      'Plain TypeScript promises do not tell you which errors a function can throw, how it gets its dependencies, or how to cancel and retry work safely. Effect makes those things part of the type system: errors, required services and concurrency are tracked by the compiler. For teams building long-running services, Effect 4.x adds a written long-term support policy.',
    architecture:
      'The monorepo contains the core effect package and integration packages released together with synchronised versions: platform services for the browser, Bun, Deno and Node.js; SQL clients for PostgreSQL, MySQL, SQL Server, SQLite variants, libSQL, ClickHouse and Cloudflare D1; AI providers for Anthropic, OpenAI, OpenRouter and OpenAI-compatible APIs; Atom bindings for React, Solid and Vue; OpenTelemetry and Vitest integrations; and code generators for OpenAPI and GraphQL. Effect v3 lives on the v3 branch, with a migration guide to 4.x.',
    benchmarks:
      'No benchmarks are published in the README.',
    quickstart:
      '# Install\nnpm install effect\n\n# Requirements: TypeScript 5.9+ (TypeScript 7 recommended),\n# Node.js 22.19+, and "strict": true in tsconfig.json',
    keyTakeaways: [
      'Typed errors, dependency injection, structured concurrency, scheduling and tracing for TypeScript.',
      'Effect 4.x is LTS: at least three years of support, including bug and security fixes.',
      'Requires TypeScript 5.9+, Node.js 22.19+ and strict mode.',
      'Integration packages for platforms, SQL databases, AI providers, UI frameworks and testing.',
      'MIT licensed; Effect v3 remains on its own branch.',
    ],
    faqs: [
      {
        question: 'What does Effect 4.x LTS mean?',
        answer:
          'The README promises at least three years of support including bug and security fixes, bug fixes for one year after the next major version, and security fixes for two years after it. Stable APIs only break in major releases.',
      },
      {
        question: 'What do I need to use Effect?',
        answer:
          'TypeScript 5.9 or newer (7 recommended), Node.js 22.19 or newer when running on Node, and the strict flag enabled in tsconfig.json.',
      },
      {
        question: 'Can I upgrade from Effect 3?',
        answer:
          'Yes. The repository includes a migration guide for moving from 3.x to 4.x; Effect v3 code lives on the v3 branch.',
      },
      {
        question: 'Does Effect have database and AI integrations?',
        answer:
          'Yes. The monorepo includes SQL clients for PostgreSQL, MySQL, SQL Server, SQLite and others, and AI provider packages for Anthropic, OpenAI, OpenRouter and OpenAI-compatible APIs.',
      },
    ],
  },

  caveman: {
    slug: 'caveman',
    name: 'Caveman',
    repoFullName: 'JuliusBrussee/caveman',
    githubUrl: 'https://github.com/JuliusBrussee/caveman',
    image: '/images/Caveman AI by vnhax.net.png',
    language: 'Go',
    license: 'Apache-2.0',
    stars: '118k',
    forks: '8k',
    category: 'Token Optimization',
    topics: ['token-optimization', 'claude-code', 'codex', 'ai-agents', 'cli', 'developer-tools'],
    summary:
      'A toolkit that makes AI coding agents say less and read less: a terse answer style, compression of logs, JSON and test output before the model reads them, and an optional model router, with code and commands kept exact.',
    metaDescription:
      'Caveman (JuliusBrussee/caveman) review: cut AI coding agent tokens with a terse voice and input compression. The project reports 33.2% fewer input tokens per session. Install, the six parts, and honest caveats.',
    whyUse:
      'Coding agents waste tokens two ways: long, chatty answers and huge tool outputs such as logs, test runs and JSON dumps that the model reads in full. Caveman tackles both. Its voice keeps answers short while leaving code, commands, paths and error messages untouched, and its input compression shrinks noisy files before the model sees them, keeping originals on disk so the agent can fetch them if needed.',
    architecture:
      'Version 4.0 splits Caveman into six parts, all on after install and each with its own switch: Say less (the caveman voice), Read less (input compression), Auto (picks a model and effort per request; needs a free account), Blocks (reusable scripts for code mode, pre-release), Waste fixes (finds where tokens go and keeps the prompt cache warm while you pause), and Browse (compressed web pages). It runs on your machine with your own keys or Claude Pro/Max login and wraps agents such as Claude Code, Codex, Gemini CLI and OpenCode.',
    benchmarks:
      'The README reports 33.2% fewer input tokens across whole Claude Code sessions (54 runs, 18 of 18 answers right), Auto at 54% lower cost than Opus 5.5 at xhigh effort on 85 coding tasks (an interim, half-finished run), and 1.4x to 2.4x cheaper output with caveman-style answers according to Adobe Research. These are the project\'s and cited researchers\' figures.',
    quickstart:
      '# One-command install (Mac, Linux, Windows; Node.js 22.13+)\nnpx @caveman-ai/cli@latest\n\n# Only the terse-answer skill, no proxy\nnpx skills add JuliusBrussee/caveman -g\n\n# Check what is on\ncaveman status',
    keyTakeaways: [
      'Two levers: shorter answers and compressed tool output.',
      'Code, commands, paths and error messages are kept character for character.',
      'Project-reported: 33.2% fewer input tokens per Claude Code session.',
      'Runs locally with your own keys; only the Auto router needs a (free) account.',
      'Works with Claude Code, Codex, Gemini CLI, OpenCode and 30+ other agents.',
    ],
    faqs: [
      {
        question: 'Does Caveman change the code my agent writes?',
        answer:
          'No. The README says code, commands, paths and error messages stay untouched, character for character. Only the conversational text gets shorter.',
      },
      {
        question: 'How do I install Caveman?',
        answer:
          'Run npx @caveman-ai/cli@latest (Node.js 22.13 or newer). It finds your agents, shows what it will change, and asks you to confirm. If you only want shorter answers, run npx skills add JuliusBrussee/caveman -g instead.',
      },
      {
        question: 'Does Caveman rewrite my prompts?',
        answer:
          'No. The project says your prompts are never rewritten, because research it cites found that compressing the user\'s prompt makes answers worse.',
      },
      {
        question: 'Does Caveman send my data anywhere?',
        answer:
          'It runs on your machine with your own keys or login. The optional Auto model router needs a free account; if you are not signed in, Auto is off and nothing is sent for it. Read the privacy section of the README for details.',
      },
    ],
  },

  'agent-reach': {
    slug: 'agent-reach',
    name: 'Agent-Reach',
    repoFullName: 'Panniantong/Agent-Reach',
    githubUrl: 'https://github.com/Panniantong/Agent-Reach',
    image: '/images/Agent Reach by vnhax.net.png',
    language: 'Python',
    license: 'MIT',
    stars: '108k',
    forks: '10k',
    category: 'Agent Web & Platform Access',
    topics: ['ai-agents', 'web-search', 'youtube', 'reddit', 'bilibili', 'cli'],
    summary:
      'A read-only tool that lets AI agents search and read platforms they normally cannot reach, such as YouTube transcripts, Reddit, X, Bilibili, Xiaohongshu, V2EX and GitHub, through one agent-reach command.',
    metaDescription:
      'Agent-Reach (Panniantong/Agent-Reach) review: give Claude Code, Codex and other agents read-only access to YouTube, Reddit, X, Bilibili and more. Supported channels, install, safety model and caveats.',
    whyUse:
      'CLI agents such as Claude Code, Codex and OpenClaw can search the web and read pages, but they struggle with content behind logins, video transcripts and Chinese platforms. Agent-Reach installs and tests the tools behind each platform so an agent can use them with one command, for example agent-reach read followed by a URL.',
    architecture:
      'Each platform is a channel with an ordered list of tools: if the first fails, the next is tried, so a platform change only means updating the list. Default channels (Bilibili, V2EX, GitHub, YouTube and general web) work after install; optional channels (Xiaohongshu, Xueqiu, Boss, Xiaoyuzhou, LinkedIn, Reddit) are added on request; experimental channels (X, Facebook, Instagram) work but may break as platforms tighten anti-bot measures. Everything it installs lives in ~/.agent-reach/.',
    benchmarks:
      'No benchmarks are published.',
    quickstart:
      '# Give your agent this one line; it installs or upgrades Agent-Reach:\n# "Install Agent Reach: https://raw.githubusercontent.com/Panniantong/Agent-Reach/main/docs/install.md"\n\n# Then the agent can run, for example:\nagent-reach channels\nagent-reach read https://www.v2ex.com/t/123',
    keyTakeaways: [
      'Read-only access for agents to YouTube transcripts, Reddit, X, Bilibili, GitHub and more.',
      'Default, optional and experimental channels, with automatic fallback between tools.',
      'Never logs in for you or asks for your password; it can reuse a copy of an existing browser login.',
      'The README recommends using a secondary account for logged-in platforms.',
      'Do not install the PyPI package with the same name; it is not this project.',
    ],
    faqs: [
      {
        question: 'Which platforms does Agent-Reach support?',
        answer:
          'By default: Bilibili, V2EX, GitHub, YouTube and general web. Optional: Xiaohongshu, Xueqiu, Boss, Xiaoyuzhou, LinkedIn and Reddit. Experimental: X, Facebook and Instagram.',
      },
      {
        question: 'Can Agent-Reach post or message on my accounts?',
        answer:
          'No. The README says it only searches and reads; it does not post, comment, like or send messages.',
      },
      {
        question: 'Is it safe to let Agent-Reach use my logins?',
        answer:
          'It never logs in for you or asks for passwords. For logged-in platforms it can reuse a copy of an existing browser login in its own dedicated browser. The author recommends using a secondary account, since platforms may restrict accounts used for automated access.',
      },
      {
        question: 'How do I install Agent-Reach?',
        answer:
          'Send your agent the install instruction with the official install.md link from the GitHub repository. The README warns that the PyPI package named agent-reach is not this project.',
      },
    ],
  },

  voicestudio: {
    slug: 'voicestudio',
    name: 'VoiceStudio',
    repoFullName: 'debpalash/VoiceStudio',
    githubUrl: 'https://github.com/debpalash/VoiceStudio',
    image: '/images/VoiceStudio by vnhax.net.png',
    language: 'Python',
    license: 'AGPL-3.0',
    stars: '73.1k',
    forks: '8k',
    category: 'Local Voice AI & Dubbing',
    topics: ['voice-cloning', 'text-to-speech', 'dubbing', 'transcription', 'local-first', 'elevenlabs-alternative', 'mcp', 'electron'],
    summary:
      'An open-source, local-first desktop app for voice cloning, voice design, video dubbing, dictation, transcription and audiobook creation, with a local API and MCP server so AI agents can use it too.',
    metaDescription:
      'VoiceStudio (debpalash/VoiceStudio) review: the open-source, local-first ElevenLabs alternative for voice cloning, dubbing, dictation and audiobooks. Install steps, hardware support, AGPL-3.0 licensing and responsible-use notes.',
    whyUse:
      'Cloud voice services are convenient, but every script, recording and cloned voice leaves your machine, and per-character pricing adds up quickly on long projects like audiobooks or dubbed videos. VoiceStudio puts those workflows into one desktop app that runs on your own hardware. You can clone a voice from a clean reference recording or design a new one, dub a video with timed speech, dictate with a floating widget, transcribe audio, and batch-produce stories or audiobooks. The README says local workflows run on your hardware, remote services are optional, and usage analytics require consent. For developers, the local API and MCP support matter most: an AI agent can call VoiceStudio as a tool instead of a paid cloud API.',
    architecture:
      'VoiceStudio is an Electron desktop app (the README says Electron is now the only desktop app and web UI; version 0.5.3 was the final Tauri release) with a Python backend that runs the speech models. The default engine is VoiceStudio, powered by k2-fsa/OmniVoice, and other engines can be picked from its engine catalog. A built-in Model Manager downloads models when a workspace needs them and shows versioned model-source and licence notices. Acceleration depends on hardware: CUDA on NVIDIA GPUs (Windows and Linux), Metal (MPS) on Apple Silicon, and a CPU-only PyTorch build on machines without a dedicated GPU. Windows on ARM is experimental (CPU only), and Intel Macs run the UI only and connect to a remote backend. Integrations include a local speech API, an MCP server for agents, reusable recipes, watch folders, and preview iOS and Android companion apps.',
    benchmarks:
      'The README does not publish headline speed or quality numbers; it links to a benchmarks page and a performance guide in the repository docs, and notes that hardware needs vary by engine. We have not run our own tests, so check the docs for the engine you plan to use and measure on your own machine.',
    quickstart:
      '# macOS / Linux: one-command install of the latest Electron release\ncurl -fsSL https://voicestudio.sh/install | sh\n\n# Windows (PowerShell)\nirm https://voicestudio.sh/install | iex\n\n# Or run the Electron preview from source\ngit clone https://github.com/debpalash/VoiceStudio.git\ncd VoiceStudio\nbun install\nbun run setup:api\nbun run dev',
    keyTakeaways: [
      'One desktop app for voice cloning, voice design, dubbing, dictation, transcription and audiobooks.',
      'Runs locally: CUDA on NVIDIA, Metal on Apple Silicon, and a slower CPU mode on machines without a GPU.',
      'Default engine is built on k2-fsa/OmniVoice; other engines are available from its catalog.',
      'Local API and MCP server let AI agents use it as a tool.',
      'The app is AGPL-3.0, but model weights and voices have their own licences; clone voices only with permission.',
    ],
    faqs: [
      {
        question: 'Is VoiceStudio free?',
        answer:
          'The application is open source under AGPL-3.0, which allows commercial use under its conditions. The README stresses that model weights, tokenizers, voices and generated-output conditions are licensed separately, so check the licence of each model you download before commercial use.',
      },
      {
        question: 'Does VoiceStudio need a GPU?',
        answer:
          'No. NVIDIA GPUs (CUDA) and Apple Silicon (Metal) are accelerated, but the README says machines without a dedicated GPU are fully usable on the CPU, just slower. That setup installs a small CPU build of PyTorch and needs about 5 GB of free disk space.',
      },
      {
        question: 'Can AI agents like Claude Code use VoiceStudio?',
        answer:
          'Yes. VoiceStudio provides a local API and an MCP server, and the project offers agent skills via npx skills add debpalash/VoiceStudio. The README also includes a prompt you can paste into a coding agent to install and verify the app.',
      },
      {
        question: 'Is it legal to clone voices with VoiceStudio?',
        answer:
          'The project says to clone voices only with permission. Cloning someone else\'s voice without consent can break the law in many countries, so use your own voice, a contracted voice actor, or a voice you have the rights to.',
      },
    ],
  },

  'ai-job-search': {
    slug: 'ai-job-search',
    name: 'AI Job Search',
    repoFullName: 'ai-job-search-dev/ai-job-search',
    githubUrl: 'https://github.com/ai-job-search-dev/ai-job-search',
    image: '/images/AI Job Search by vnhax.net.png',
    language: 'Python',
    license: 'MIT',
    stars: '50.2k',
    forks: '16.9k',
    category: 'Claude Code Workflows & Career Tools',
    topics: ['claude-code', 'ai-agents', 'job-search', 'resume', 'cover-letter', 'latex', 'interview-preparation'],
    summary:
      'A Claude Code framework that evaluates job postings against your profile, drafts a tailored LaTeX CV and cover letter, has a second agent review them, and prepares you for interviews, all from your own machine.',
    metaDescription:
      'AI Job Search (ai-job-search-dev/ai-job-search) review: a Claude Code job application framework with /setup, /scrape and /apply commands, a drafter-reviewer workflow, LaTeX CV and cover letters, ATS checks and interview prep.',
    whyUse:
      'Tailoring a CV and cover letter for every job is slow, and generic AI-written applications are easy to spot. This framework turns Claude Code into a structured job application assistant that works from your real profile. You fill in your experience once, then each posting is scored for fit before anything is written. Its rules say every claim in the CV and cover letter is checked against your actual profile and that it never fabricates skills or experience, which is the right line to hold when an AI writes on your behalf. The author, a geophysicist whose position was cut in late 2025, says he built it for his own search and reports 69 tailored applications, 20 first interviews and one signed contract, starting as an AI engineer in June 2026. That is one person\'s result, not a guarantee, but it shows the workflow in real use.',
    architecture:
      'The repository is a set of Claude Code slash commands and skills plus small tools. /setup builds your profile from a documents folder (CV, LinkedIn export, diplomas), a pasted CV, or an interview. /scrape searches job portals through Bun-based CLI skills (the shipped ones target Danish boards plus LinkedIn and freehire.me), and /add-portal generates a new portal skill for your market. /apply runs a drafter-reviewer pipeline: parse the posting, score fit, draft a LaTeX CV and cover letter, spawn a separate reviewer agent that researches the company and critiques the drafts, revise, then compile the PDFs (lualatex for the CV, xelatex for the letter) and iterate until the CV is exactly two pages and the letter one page. A final ATS check extracts the PDF text layer to confirm contact details, reading order and keyword coverage. Extra commands cover ranking (/rank), interview prep (/interview), outcome tracking (/outcome), Gmail and Notion sync, skill-gap analysis (/upskill) and an offline HTML dashboard.',
    benchmarks:
      'There are no formal benchmarks. The only result reported in the README is the author\'s own job search: 69 tailored applications, 20 first interviews and one signed contract. Treat it as a single personal outcome.',
    quickstart:
      '# Use a PRIVATE repo for your personal data (forks of public repos are public)\ngh repo fork ai-job-search-dev/ai-job-search --clone\ncd ai-job-search\n\n# Install the job portal CLI tools (needs Bun)\npython3 tools/install_portal_clis.py\n\n# Start Claude Code, then run the workflow\nclaude\n/setup\n/scrape\n/apply https://example-job-board.com/job/123',
    keyTakeaways: [
      'Core workflow: /setup builds your profile, /scrape finds postings, /apply writes a tailored application.',
      'A second reviewer agent critiques every draft before revision.',
      'Compiles real LaTeX PDFs and checks them for layout problems and ATS readability.',
      'Built-in honesty rule: claims are checked against your profile and skills are never invented.',
      'Portal skills ship for Denmark plus LinkedIn and freehire.me; /add-portal adapts it to your country.',
    ],
    faqs: [
      {
        question: 'Do I need a paid Claude plan to use AI Job Search?',
        answer:
          'Yes. The README notes Claude Code has no free tier, so you need a Claude Pro, Max or Team subscription or Anthropic API credits. It also points users of other agent tools to AGENTS.md and community forks.',
      },
      {
        question: 'Is my personal data safe in this repository?',
        answer:
          'Your profile is written into tracked files in your copy of the repo. The README warns that a fork of a public repository is always public, so for your own job search it recommends a private repository with this project as upstream instead of a public fork.',
      },
      {
        question: 'Does it work outside Denmark?',
        answer:
          'The profile, fit evaluation and application pipeline are language- and country-agnostic. The shipped job-portal skills target Danish boards, plus LinkedIn and freehire.me; /add-portal generates a search skill for a job board in your own market.',
      },
      {
        question: 'Will employers mind an AI-assisted application?',
        answer:
          'The author says he was open about using the tool with every employer and that it usually started a technical conversation rather than counting against him. Whatever tool you use, review every application yourself before you send it.',
      },
    ],
  },

  'claude-plugins-official': {
    slug: 'claude-plugins-official',
    name: 'Claude Plugins Official',
    repoFullName: 'anthropics/claude-plugins-official',
    githubUrl: 'https://github.com/anthropics/claude-plugins-official',
    image: '/images/Claude Plugins Official by vnhax.net.png',
    language: 'Python',
    license: 'Apache-2.0',
    stars: '41.6k',
    forks: '4.5k',
    category: 'Claude Code Plugins & Marketplace',
    topics: ['claude-code', 'plugins', 'mcp', 'skills', 'marketplace', 'anthropic'],
    summary:
      'Anthropic\'s official, curated directory of Claude Code plugins: internal plugins built by Anthropic plus reviewed third-party plugins, installable straight from Claude Code\'s plugin system.',
    metaDescription:
      'Claude Plugins Official (anthropics/claude-plugins-official) review: Anthropic\'s curated Claude Code plugin marketplace. How to install plugins, what is inside (LSP, code review, skills, MCP integrations), plugin structure and safety advice.',
    whyUse:
      'Claude Code can be extended with slash commands, subagents, skills, hooks and MCP servers, but finding good ones and keeping them updated is work. This repository is the default marketplace that Claude Code\'s plugin system reads from, so you can browse and install plugins without hunting through random repositories. It is split into plugins developed and maintained by Anthropic and external plugins from partners and the community, which have to meet quality and security standards for approval. Even so, the README is clear that you should trust a plugin before installing it: Anthropic does not control what MCP servers, files or other software a plugin includes and cannot verify that they will work as intended or won\'t change.',
    architecture:
      'The repository has two main folders: /plugins for Anthropic\'s internal plugins and /external_plugins for third-party ones. Each plugin follows a standard layout: a required .claude-plugin/plugin.json with metadata, an optional .mcp.json for MCP server configuration, and optional commands/, agents/ and skills/ folders, plus a README. At the time of writing, /plugins held 40 entries, including language-server plugins (typescript-lsp, pyright-lsp, rust-analyzer-lsp, gopls-lsp and more), code-review, pr-review-toolkit, security-guidance, commit-commands, feature-dev, frontend-design, hookify, plugin-dev, mcp-server-dev and skill-creator. /external_plugins held 14, including github, gitlab, linear, asana, playwright, context7, firebase and terraform. Plugin names are immutable slugs; a renames map in .claude-plugin/marketplace.json migrates installs when a rename is unavoidable, and skill-bundle plugins can declare SKILL.md folders directly with strict set to false.',
    benchmarks:
      'Not applicable. This is a plugin directory, not a tool with performance claims.',
    quickstart:
      '# Inside Claude Code: install a plugin from the official marketplace\n/plugin install code-review@claude-plugins-official\n\n# Or browse everything interactively\n/plugin\n# then open the Discover tab',
    keyTakeaways: [
      'The official, curated plugin marketplace for Claude Code, maintained by Anthropic.',
      'Install with /plugin install <name>@claude-plugins-official or browse in /plugin > Discover.',
      'Includes Anthropic plugins (LSP servers, code review, security guidance, skill tools) and partner plugins (GitHub, Linear, Playwright and more).',
      'Every plugin uses the same structure: plugin.json plus optional MCP config, commands, agents and skills.',
      'Anthropic warns it cannot verify third-party plugin contents, so review a plugin before installing it.',
    ],
    faqs: [
      {
        question: 'How do I install a plugin from claude-plugins-official?',
        answer:
          'In Claude Code, run /plugin install followed by the plugin name and @claude-plugins-official, for example /plugin install code-review@claude-plugins-official. You can also browse plugins under /plugin, in the Discover tab.',
      },
      {
        question: 'Are the plugins in this directory safe?',
        answer:
          'Internal plugins are built by Anthropic, and external plugins must meet quality and security standards to be accepted. The README still advises trusting a plugin before installing, updating or using it, because Anthropic does not control what MCP servers or other software third-party plugins include.',
      },
      {
        question: 'Can I submit my own plugin?',
        answer:
          'Third-party partners can submit plugins through Anthropic\'s plugin directory submission form linked in the README. External plugins are reviewed for quality and security before inclusion.',
      },
      {
        question: 'What is inside a Claude Code plugin?',
        answer:
          'A plugin needs a .claude-plugin/plugin.json metadata file and can add a .mcp.json MCP server configuration, slash commands, agent definitions and skills, plus a README. See /plugins/example-plugin in the repository for a reference implementation.',
      },
    ],
  },

  t3code: {
    slug: 't3code',
    name: 'T3 Code',
    repoFullName: 'pingdotgg/t3code',
    githubUrl: 'https://github.com/pingdotgg/t3code',
    image: '/images/T3 Code by vnhax.net.png',
    language: 'TypeScript',
    license: 'MIT',
    stars: '37.6k',
    forks: '8.9k',
    category: 'Coding Agent Control Surface',
    topics: ['coding-agents', 'claude-code', 'codex', 'remote-development', 'electron', 'mobile', 'mcp'],
    summary:
      'An open-source control surface for the coding agents already on your machine (Claude Code, Codex, Cursor, Grok Build, OpenCode, Antigravity and fx), with a desktop app, a web app and iOS and Android apps for remote access.',
    metaDescription:
      'T3 Code (pingdotgg/t3code) review: an open-source app to run and monitor Claude Code, Codex, Cursor and other coding agents from desktop, web or phone. Install steps, supported providers, remote access and honest caveats.',
    whyUse:
      'Most developers who use coding agents end up juggling terminals: Claude Code in one tab, Codex in another, and no easy way to check on a long task from a phone. T3 Code puts those agents behind one interface. It does not resell a model or add its own subscription; it drives the agents you already have installed and logged in, using your existing plans. The team says they built it because the desktop agent apps they tried were not fast enough, not remote-ready, or not truly open, and that the MIT licence means you can fork it if they ever head in the wrong direction.',
    architecture:
      'T3 Code runs a local server, started with the t3 command, that talks to the agent CLIs installed on your computer. You use it through a local web app, an Electron desktop app, or the iOS and Android apps, which connect remotely to that server. Supported providers are Codex, Claude Code, Cursor, Grok Build, OpenCode, Google Antigravity and fx; each one has to be installed and authenticated first. The docs cover permission modes, project settings, keyboard shortcuts, source-control integrations, multiple Codex and Claude accounts, running as a background service, and connecting outside agents over MCP. The project is built with Vite+ and is still very early.',
    benchmarks:
      'The project publishes no benchmarks. It is an interface for other agents, so speed and quality depend on the agent and model you connect.',
    quickstart:
      '# macOS / Linux: install the t3 command\ncurl -fsSL https://t3.codes/install.sh | sh\n\n# Windows (PowerShell)\nirm https://t3.codes/install.ps1 | iex\n\n# Start the server and open the local web app\nt3\n\n# Try once without installing\nnpx t3@latest',
    keyTakeaways: [
      'One interface for Claude Code, Codex, Cursor, Grok Build, OpenCode, Antigravity and fx.',
      'Uses your existing subscriptions; T3 Code itself sells nothing.',
      'Desktop (Electron), web, iOS and Android apps, with remote access from a phone.',
      'Install with one command, or try it with npx t3@latest.',
      'Very early project: the README says to expect bugs, and big outside contributions are not accepted yet.',
    ],
    faqs: [
      {
        question: 'Does T3 Code include its own AI model?',
        answer:
          'No. It controls coding agents that are already installed and logged in on your machine, such as Claude Code or Codex, and works with the subscriptions you already have for them.',
      },
      {
        question: 'Which agents does T3 Code support?',
        answer:
          'Codex, Claude Code, Cursor, Grok Build, OpenCode, Google Antigravity and fx. Install and authenticate at least one of them before you start T3 Code.',
      },
      {
        question: 'Can I check on my agents from my phone?',
        answer:
          'Yes. T3 Code has iOS and Android apps, and its docs include a guide to remote access from a phone or another machine.',
      },
      {
        question: 'Is T3 Code free?',
        answer:
          'Yes. It is open source under the MIT licence. You still pay for whichever agent subscriptions or API usage you connect to it.',
      },
    ],
  },

  'claude-mem': {
    slug: 'claude-mem',
    name: 'Claude-Mem',
    repoFullName: 'thedotmack/claude-mem',
    githubUrl: 'https://github.com/thedotmack/claude-mem',
    image: '/images/Claude-Mem by vnhax.net.png',
    language: 'TypeScript',
    license: 'Apache-2.0',
    stars: '109k',
    forks: '9.6k',
    category: 'Agent Memory & Context',
    topics: ['claude-code', 'ai-memory', 'long-term-memory', 'mcp', 'sqlite', 'chromadb', 'claude-code-plugin'],
    summary:
      'A persistent memory plugin for Claude Code and other coding agents: it records what the agent does, compresses it into summaries, and brings the relevant parts back into future sessions.',
    metaDescription:
      'Claude-Mem (thedotmack/claude-mem) review: persistent memory for Claude Code and other agents. How the hooks, SQLite store and MCP search tools work, install commands, privacy controls and the hosted vs local memory choice.',
    whyUse:
      'Every new Claude Code session starts with an empty context. You re-explain the project, the bug you fixed yesterday, and the decision you made last week. Claude-Mem fixes that by capturing tool usage and observations during a session, generating summaries, and injecting the relevant ones into the next session automatically. It also gives the agent search tools over that history, so it can look up an old bugfix instead of rediscovering it. The README says it works with Claude Code, Codex, Gemini, OpenCode, Copilot, T3 Code, Antigravity and several other harnesses.',
    architecture:
      'Claude-Mem hooks into the agent lifecycle (SessionStart, UserPromptSubmit, PreToolUse, PostToolUse, Stop and SessionEnd), each as a single command run by a small launcher. A local worker service, managed by Bun, exposes an HTTP API and a web viewer. Sessions, observations and summaries are stored in SQLite with full-text search, and a Chroma vector database adds semantic search. The agent queries memory through four MCP tools in a three-step pattern: search returns a compact index (about 50 to 100 tokens per result), timeline shows what happened around a result, and get_observations fetches full details only for chosen IDs. The README says filtering before fetching saves about 10x tokens.',
    benchmarks:
      'The README claims about 10x token savings from its search-then-fetch pattern compared with loading full details up front. That is the project\'s own figure; we have not measured it.',
    quickstart:
      '# Install for Claude Code (sets up hooks and the worker)\nnpx claude-mem install\n\n# Or from inside Claude Code\n/plugin marketplace add thedotmack/claude-mem\n/plugin install claude-mem\n\n# Install for another harness, e.g. OpenCode or T3 Code\nnpx claude-mem install --ide opencode\nnpx claude-mem install --ide t3code',
    keyTakeaways: [
      'Gives coding agents memory across sessions by capturing, summarizing and re-injecting context.',
      'Local worker with SQLite full-text search plus Chroma vector search.',
      'Four MCP tools with a search, timeline, fetch pattern to keep token use low.',
      'Default setup offers a hosted memory service with a free trial; local and bring-your-own-key providers are available.',
      'Use <private> tags to keep sensitive content out of memory.',
    ],
    faqs: [
      {
        question: 'How do I install Claude-Mem for Claude Code?',
        answer:
          'Run npx claude-mem install, or inside Claude Code run /plugin marketplace add thedotmack/claude-mem and then /plugin install claude-mem. The README warns that npm install -g claude-mem installs only the library and does not set up the hooks.',
      },
      {
        question: 'Does Claude-Mem send my code to a server?',
        answer:
          'It depends on the provider you choose. The installer offers a hosted claude-mem observer with a 30-day free trial, your own OpenRouter or Gemini key, or your Anthropic plan, and you can skip the sign-in with an explicit --provider flag. Cloud Sync and screenshot capture are optional. Read the configuration docs before you use it on private code.',
      },
      {
        question: 'How do I keep secrets out of Claude-Mem?',
        answer:
          'Wrap sensitive content in <private> tags and it is excluded from storage. Screenshot capture is off by default.',
      },
      {
        question: 'What does Claude-Mem need to run?',
        answer:
          'Node.js 20 or later and a current Claude Code with plugin support. Bun and uv are installed automatically if missing, and SQLite is bundled.',
      },
    ],
  },

  lightpanda: {
    slug: 'lightpanda',
    name: 'Lightpanda',
    repoFullName: 'lightpanda-io/browser',
    githubUrl: 'https://github.com/lightpanda-io/browser',
    image: '/images/Lightpanda by vnhax.net.png',
    language: 'Zig',
    license: 'AGPL-3.0',
    stars: '40k',
    forks: '2k',
    category: 'Headless Browser for AI Agents',
    topics: ['headless-browser', 'zig', 'cdp', 'playwright', 'puppeteer', 'mcp', 'web-scraping', 'ai-agents'],
    summary:
      'A headless browser written from scratch in Zig for AI agents and automation. It is not a Chromium fork, speaks the Chrome DevTools Protocol for Puppeteer and Playwright, and includes an MCP server and a built-in agent mode.',
    metaDescription:
      'Lightpanda (lightpanda-io/browser) review: the Zig headless browser built for AI agents. Benchmarks vs headless Chrome, install via Docker or binary, CDP with Puppeteer, MCP server, agent mode and honest limits.',
    whyUse:
      'Headless Chrome is heavy. Running dozens of pages for scraping, testing or AI agents eats gigabytes of RAM and seconds per page. Lightpanda is a new browser built only for machines: no rendering of pixels for humans, a much smaller memory footprint, and fast startup. In the project\'s own benchmark of 100 real pages on an AWS m5.large, it used 123 MB of peak memory versus 2 GB for headless Chrome, and finished in 5 seconds versus 46. Because it speaks the Chrome DevTools Protocol, many existing Puppeteer or Playwright scripts can point at it with a one-line change.',
    architecture:
      'Lightpanda is written in Zig and uses the V8 engine for JavaScript. It can fetch and dump a page as HTML, Markdown, PNG, PDF or structured data (JSON-LD, OpenGraph, meta tags), or run as a server: a CDP server on port 9222 for Puppeteer and Playwright, or a WebDriver BiDi server. It also ships an MCP server (stdio or HTTP, with isolated or shared browsing sessions per client) and an agent mode that drives the browser from plain-English tasks with Anthropic, OpenAI, Gemini, Mistral, OpenRouter or local models via Ollama and llama.cpp. Agent sessions can be saved as PandaScript, plain JavaScript that replays without an LLM.',
    benchmarks:
      'Lightpanda\'s README reports, for 100 real pages requested over the network on an AWS EC2 m5.large: 123 MB peak memory versus 2 GB for headless Chrome (about 16x less), and 5 seconds versus 46 seconds (about 9x faster). These are the project\'s own measurements; results depend on the sites you load.',
    quickstart:
      '# Run the CDP server in Docker (local only)\ndocker run -d --name lightpanda -p 127.0.0.1:9222:9222 lightpanda/browser:latest\n\n# Or download the Linux binary\ncurl -L -o lightpanda https://github.com/lightpanda-io/browser/releases/download/nightly/lightpanda-x86_64-linux && chmod a+x ./lightpanda\n\n# Dump a page as Markdown\n./lightpanda fetch --obey-robots --dump markdown https://example.com\n\n# Point Puppeteer at it\n# puppeteer.connect({ browserWSEndpoint: "ws://127.0.0.1:9222" })',
    keyTakeaways: [
      'A new headless browser in Zig, not a Chromium or WebKit fork.',
      'Project benchmark: about 16x less memory and 9x faster than headless Chrome on 100 pages.',
      'Works with Puppeteer and Playwright through the Chrome DevTools Protocol.',
      'Built-in MCP server and an agent mode that saves replayable, LLM-free scripts.',
      'Linux and macOS binaries plus Docker; Windows only through WSL. Telemetry is on by default.',
    ],
    faqs: [
      {
        question: 'Can Lightpanda replace headless Chrome in my Puppeteer scripts?',
        answer:
          'Often, yes. Lightpanda runs a Chrome DevTools Protocol server, so you connect with puppeteer.connect and its browserWSEndpoint. Test your pages first, since Lightpanda is a new browser and may not support every web feature that Chrome does.',
      },
      {
        question: 'Does Lightpanda work on Windows?',
        answer:
          'Not natively. The README says to install it inside WSL2 using the Linux steps; your automation client can run on Windows and reach it on localhost:9222.',
      },
      {
        question: 'How do I turn off Lightpanda telemetry?',
        answer:
          'Set the environment variable LIGHTPANDA_DISABLE_TELEMETRY=true. Telemetry is enabled by default.',
      },
      {
        question: 'Can AI agents use Lightpanda directly?',
        answer:
          'Yes. Run lightpanda mcp to expose it as an MCP server, or use lightpanda agent to drive it with plain-English tasks using models from Anthropic, OpenAI, Gemini, Mistral, OpenRouter or local models.',
      },
    ],
  },
};

type LiveRepoStats = {
  stars: number;
  forks: number;
  license: string | null;
  language: string | null;
  pushedAt: string;
  fetchedAt: string;
};

const LIVE_STATS = repoStats as Record<string, LiveRepoStats>;

function formatCount(n: number): string {
  if (n >= 1000) return `${(n / 1000).toFixed(n >= 100000 ? 0 : 1).replace(/\.0$/, '')}k`;
  return n.toLocaleString('en-US');
}

/**
 * Overlays real GitHub numbers (from lib/repo-stats.json, refreshed on every
 * build by scripts/sync-repo-stats.mjs) on top of the static review data.
 */
function withLiveStats(repo: RepoDetails): RepoDetails {
  const live = LIVE_STATS[repo.slug];
  if (!live) return repo;
  return {
    ...repo,
    stars: formatCount(live.stars),
    forks: formatCount(live.forks),
    license: live.license ?? repo.license,
    language: live.language ?? repo.language,
    statsUpdatedAt: live.fetchedAt,
  };
}

/**
 * Returns all repositories as an array
 */
export function getAllRepos(): RepoDetails[] {
  return Object.values(REPOS_DATA).map(withLiveStats);
}

/**
 * Retrieves a single repository by its slug
 */
export function getRepoBySlug(slug: string): RepoDetails | undefined {
  const repo = REPOS_DATA[slug];
  return repo ? withLiveStats(repo) : undefined;
}
