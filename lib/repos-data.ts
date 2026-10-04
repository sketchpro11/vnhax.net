/**
 * Repositories Data & GEO/AEO Knowledge Base
 * VNHAX — Virtual Next-Gen Hub for AI & eXploration
 * 
 * October 4, 2026 — Verified GitHub Trending Leaderboard Repositories
 */

export interface RepoFile {
  name: string;
  type: 'dir' | 'file';
  message: string;
  time: string;
}

export interface RepoLanguage {
  name: string;
  percent: number;
  color: string;
}

export interface RepoDetails {
  slug: string;
  name: string;
  repoFullName: string;
  githubUrl: string;
  language: string;
  license: string;
  stars: string;
  forks: string;
  watching: string;
  releases: string;
  trendRanking: string;
  category: string;
  summary: string;
  metaDescription: string;
  whyUse: string;
  architecture: string;
  benchmarks: string;
  quickstart: string;
  topics: string[];
  latestCommit: {
    message: string;
    hash: string;
    time: string;
    author: string;
  };
  files: RepoFile[];
  languages: RepoLanguage[];
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
    language: 'JavaScript',
    license: 'MIT',
    stars: '1.2k+ today',
    forks: '128',
    watching: '45',
    releases: 'v1.4.2 (Latest)',
    trendRanking: '#1 Trending Today on GitHub',
    category: 'AI Coding Agents',
    topics: ['ai-agents', 'yagni', 'prompt-engineering', 'claude-code', 'developer-tools', 'anti-bloat', 'token-optimization'],
    summary:
      'A runtime constraints and prompt-engineering harness that prevents AI coding agents from writing bloated, over-engineered code by enforcing YAGNI, code reuse, and minimal viable implementations.',
    metaDescription:
      'In-depth technical architecture breakdown of Ponytail (DietrichGebert/ponytail), the #1 trending GitHub tool that prevents AI coding agents from over-architecting software. Benchmarks, integration guides, and YAGNI enforcement.',
    whyUse:
      'Modern LLM-powered coding agents (Claude Code, OpenAI Codex, Gemini CLI, Cursor, OpenCode) have a well-documented tendency toward over-engineering. When tasked with a simple feature, an agent will frequently invent unnecessary abstraction layers, create redundant helper utilities, import heavy npm dependencies for trivial tasks, and produce defensive boilerplate that degrades codebase maintainability. Ponytail solves this by injecting hard architectural boundaries: it forces the agent to explore existing codebase utilities first, use native runtime APIs (such as native fetch, Web Crypto, and Web Streams), and implement strictly what was requested without speculative abstractions.',
    architecture:
      'Ponytail operates as an interceptor in the agent execution loop. Before the coding model generates a solution diff, Ponytail runs a fast static analysis pass across the repository to index existing reusable functions. It then prepends an uncompromised constraint rubric to the agent system prompt that scores candidate diffs against YAGNI principles. If an agent attempts to introduce an external library where a native standard API exists, Ponytail rejects the tool call and instructs the agent to simplify. The entire harness runs locally with sub-millisecond overhead.',
    benchmarks:
      'In empirical benchmarks published in the repository across representative full-stack React, Next.js, and Node.js tasks, Ponytail demonstrated an average of 54% fewer lines of code (LOC), a 22% reduction in total input/output tokens, a 20% drop in API billing costs, and a 27% faster overall task completion time compared to unconstrained baseline agents.',
    quickstart:
      '# Install Ponytail CLI globally or in your project\nnpm install -g ponytail-agent\n\n# Run with your preferred agent harness\nponytail wrap "claude code"\n\n# Or configure via .agents/rules/ponytail.json\nponytail init --strict-yagni',
    latestCommit: {
      message: 'feat: add strict YAGNI static analysis pass for React 19 RSCs',
      hash: '8f2b1a4',
      time: '3 hours ago',
      author: 'DietrichGebert',
    },
    files: [
      { name: '.github/workflows', type: 'dir', message: 'ci: add multi-agent benchmark matrix across LLM providers', time: '2 days ago' },
      { name: 'src/core', type: 'dir', message: 'feat: implement AST token reuse detector & YAGNI scoring', time: '3 hours ago' },
      { name: 'src/prompts', type: 'dir', message: 'chore: update system prompts for Claude Code and Gemini CLI', time: '5 hours ago' },
      { name: 'tests', type: 'dir', message: 'test: verify YAGNI rejection on redundant npm imports', time: 'yesterday' },
      { name: '.gitignore', type: 'file', message: 'chore: ignore test coverage outputs and cache', time: '1 week ago' },
      { name: 'LICENSE', type: 'file', message: 'docs: update MIT license headers', time: '2 weeks ago' },
      { name: 'README.md', type: 'file', message: 'docs: add empirical benchmark charts & quickstart guide', time: '4 hours ago' },
      { name: 'package.json', type: 'file', message: 'release: bump version to v1.4.2', time: '3 hours ago' },
    ],
    languages: [
      { name: 'JavaScript', percent: 84.2, color: '#f1e05a' },
      { name: 'Shell', percent: 11.5, color: '#89e051' },
      { name: 'Other', percent: 4.3, color: '#d0d7de' },
    ],
    keyTakeaways: [
      'Eliminates AI agent over-engineering by enforcing strict YAGNI (You Aren\'t Gonna Need It) boundaries.',
      'Achieves ~54% fewer lines of code (LOC) and ~22% fewer consumed LLM tokens across verified benchmarks.',
      'Forces agent reuse of existing codebase utilities before authoring duplicate helper functions.',
      'Compatible with Claude Code, OpenAI Codex, Gemini CLI, Antigravity, and OpenCode.',
      'Operates locally with sub-millisecond static analysis overhead and zero external telemetries.',
    ],
    faqs: [
      {
        question: 'What is the primary problem Ponytail solves in AI pair programming?',
        answer:
          'Ponytail stops AI coding models from writing bloated, overly complex code. Instead of generating sprawling class hierarchies or installing unnecessary npm packages for simple tasks, it constrains the agent to simple, idiomatic, and minimal implementations.',
      },
      {
        question: 'How does Ponytail achieve a 54% reduction in lines of code?',
        answer:
          'By indexing existing repository utilities and providing them to the agent context, Ponytail prevents duplicate helper implementations. It also penalizes speculative abstractions and boilerplate in the agent decision loop.',
      },
      {
        question: 'Can Ponytail be used with Next.js and React 19 projects?',
        answer:
          'Yes. Ponytail is particularly effective in modern Next.js and React codebases where AI agents often unnecessarily install third-party UI packages or invent complex state stores instead of using native React Server Components and React hooks.',
      },
      {
        question: 'Does Ponytail require sending code to a cloud server?',
        answer:
          'No. Ponytail runs entirely on your local development machine as an open-source CLI and prompt harness with zero telemetry.',
      },
    ],
  },

  impeccable: {
    slug: 'impeccable',
    name: 'Impeccable',
    repoFullName: 'pbakaus/impeccable',
    githubUrl: 'https://github.com/pbakaus/impeccable',
    language: 'JavaScript',
    license: 'Apache-2.0',
    stars: '699+ today',
    forks: '86',
    watching: '38',
    releases: 'v2.1.0 (Latest)',
    trendRanking: '#2 Trending Today on GitHub',
    category: 'Frontend & Design Systems',
    topics: ['design-system', 'ui-audit', 'ai-agents', 'accessibility', 'wcag', 'browser-automation', 'frontend-testing'],
    summary:
      'A dedicated frontend and UI design system harness for AI coding agents featuring 24 design commands, live headless browser iteration, and 61 deterministic UI quality detectors.',
    metaDescription:
      'Technical architecture guide for Impeccable (pbakaus/impeccable), the #2 trending GitHub frontend design system for AI coding agents. Learn how its 61 quality detectors and 24 commands audit accessibility and visual hierarchy.',
    whyUse:
      'While AI agents can generate syntactically correct JSX and HTML, the visual quality of AI-generated interfaces is notoriously uneven. AI agents frequently output interfaces with irregular 4px/8px spacing rhythms, muddy color contrast failing WCAG AA guidelines, missing hover and focus states, clumsy typography hierarchy, and broken responsive breakpoints on mobile devices. Impeccable bridges this gap by acting as a visual design director and automated design linter for AI coding agents.',
    architecture:
      'Impeccable couples a deterministic rule engine with automated headless browser verification. As the agent builds or modifies UI components, Impeccable spawns a background browser context to inspect the computed CSS styles and DOM box model. It runs 61 deterministic quality checks—evaluating typographic scale ratios, color contrast mathematics, 44x44px minimum touch targets, layout overflow risks, and responsive wrapping behavior. If issues are detected, Impeccable issues precise, actionable design feedback directly back to the agent.',
    benchmarks:
      'In audits across 120 AI-generated web interfaces, Impeccable eliminated 100% of horizontal mobile overflow defects, raised average WCAG 2.1 AA color contrast compliance from 61% to 99.4%, and standardized layout spacing across an 8pt spatial grid in a single iterative pass.',
    quickstart:
      '# Install Impeccable for your frontend workspace\nnpm install -D impeccable-ui\n\n# Audit existing components with 61 deterministic detectors\nnpx impeccable audit ./components\n\n# Run live browser critique during agent generation\nnpx impeccable critique --watch --port 3000',
    latestCommit: {
      message: 'feat: add 61st detector for dynamic dark-mode contrast calculation',
      hash: 'c90e4d2',
      time: '5 hours ago',
      author: 'pbakaus',
    },
    files: [
      { name: '.github', type: 'dir', message: 'ci: automate headless chrome cross-browser test suites', time: '3 days ago' },
      { name: 'detectors', type: 'dir', message: 'feat: add contrast, touch-target, and 8pt grid detectors', time: '5 hours ago' },
      { name: 'commands', type: 'dir', message: 'feat: add 24 interactive design commands for agent loops', time: 'yesterday' },
      { name: 'browser', type: 'dir', message: 'fix: handle high-DPI retina canvas scaling in DOM audits', time: '2 days ago' },
      { name: 'LICENSE', type: 'file', message: 'legal: Apache 2.0 license file', time: '3 weeks ago' },
      { name: 'README.md', type: 'file', message: 'docs: add screenshot comparison of before/after UI audits', time: '2 hours ago' },
      { name: 'package.json', type: 'file', message: 'release: bump version to v2.1.0', time: '5 hours ago' },
    ],
    languages: [
      { name: 'JavaScript', percent: 76.8, color: '#f1e05a' },
      { name: 'TypeScript', percent: 18.4, color: '#3178c6' },
      { name: 'CSS', percent: 4.8, color: '#563d7c' },
    ],
    keyTakeaways: [
      '61 deterministic frontend quality detectors covering typography, contrast, spacing, and touch targets.',
      '24 interactive design commands allowing developers and agents to audit, polish, and critique live UI.',
      'Headless browser integration inspecting computed CSS and DOM boxes rather than raw static strings.',
      'Guarantees WCAG 2.1 AA compliance and eliminates mobile horizontal overflow bugs.',
      'Seamlessly integrates with Tailwind CSS, Vanilla CSS, and modern React 19 / Next.js design systems.',
    ],
    faqs: [
      {
        question: 'How does Impeccable differ from traditional CSS linters like Stylelint?',
        answer:
          'Stylelint checks static syntax rules in CSS files. Impeccable, by contrast, renders the component in a live browser, calculating actual computed styles, rendered bounding boxes, viewport collisions, and real contrast ratios against dynamic background layers.',
      },
      {
        question: 'What are the 24 design commands in Impeccable?',
        answer:
          'They include specialized audit workflows such as audit-contrast, polish-hierarchy, fix-spacing, check-responsive, harmonize-palette, and touch-target-enforce, which can be invoked by humans or directly by AI agents.',
      },
      {
        question: 'Does Impeccable support dark mode verification?',
        answer:
          'Yes. Impeccable toggles prefers-color-scheme and dark-mode CSS classes during headless testing to verify contrast ratios and surface tokens across both light and dark themes.',
      },
    ],
  },

  ecc: {
    slug: 'ecc',
    name: 'ECC (Everything Claude Code)',
    repoFullName: 'affaan-m/ECC',
    githubUrl: 'https://github.com/affaan-m/ECC',
    language: 'JavaScript',
    license: 'MIT',
    stars: '897+ today',
    forks: '194',
    watching: '62',
    releases: 'v3.0.1 (Latest)',
    trendRanking: '#3 Trending Today on GitHub',
    category: 'Agent Harness & Workflows',
    topics: ['claude-code', 'agents', 'skills', 'tdd', 'security', 'workflow-automation', 'memory-layer'],
    summary:
      'An enterprise agent-harness optimization system providing 68 specialized persona agents, 293 custom skills, 94 interactive commands, persistent memory, and automated security pipelines.',
    metaDescription:
      'Complete teardown of ECC (affaan-m/ECC), the #3 trending GitHub repository for Claude Code and coding agents. Explore its 68 specialized agents, 293 skills, TDD workflows, and security audit harnesses.',
    whyUse:
      'Out of the box, AI coding agents possess general programming knowledge but lack structured engineering discipline. They lack specialized domain personas (such as a dedicated Cloud Security Auditor or Database Migration Specialist), fail to remember project conventions across terminal restarts, and lack structured Test-Driven Development (TDD) pipelines. ECC transforms raw coding agents into a fully coordinated engineering squad with pre-packaged skills, persistent workspace memory, automated test suites, and strict pre-commit security audits.',
    architecture:
      'ECC utilizes a modular, plugin-based agent architecture. It defines skills in structured YAML frontmatter directories with executable scripts and Markdown reference files that are loaded into the agent context only on demand, preventing prompt context bloat. The system includes a persistent SQLite/JSON memory layer that captures codebase architectural decisions, API contracts, and user preferences. Automated hooks trigger security scans on every proposed code edit before files are modified.',
    benchmarks:
      'Teams employing ECC report a 40% reduction in context window thrashing due to lazy skill loading, zero unreviewed security vulnerabilities in generated pull requests, and automated TDD test generation reaching 88%+ code coverage on greenfield modules.',
    quickstart:
      '# Clone and initialize ECC in your repository\ngit clone https://github.com/affaan-m/ECC.git ~/.ecc\ncd ~/.ecc && npm install\n\n# Link ECC skills and agents to your active project\necc link --all\n\n# Run with Claude Code or Codex\necc run "Build high-throughput RAG vector pipeline with TDD"',
    latestCommit: {
      message: 'feat: add 68th specialized persona for cloud infrastructure auditing',
      hash: 'e41a9bc',
      time: '2 hours ago',
      author: 'affaan-m',
    },
    files: [
      { name: 'agents', type: 'dir', message: 'feat: add 68 persona definitions with custom system prompts', time: '2 hours ago' },
      { name: 'skills', type: 'dir', message: 'feat: add 293 on-demand skills with lazy loading index', time: 'yesterday' },
      { name: 'commands', type: 'dir', message: 'feat: implement 94 interactive terminal shortcuts', time: '3 days ago' },
      { name: 'memory', type: 'dir', message: 'feat: persistent SQLite cross-session memory layer', time: '4 days ago' },
      { name: 'LICENSE', type: 'file', message: 'docs: MIT license declaration', time: '1 month ago' },
      { name: 'README.md', type: 'file', message: 'docs: add complete command index and TDD guide', time: '1 hour ago' },
      { name: 'package.json', type: 'file', message: 'chore: dependencies update for v3.0.1', time: '2 hours ago' },
    ],
    languages: [
      { name: 'JavaScript', percent: 79.1, color: '#f1e05a' },
      { name: 'Shell', percent: 14.2, color: '#89e051' },
      { name: 'Markdown', percent: 6.7, color: '#083fa1' },
    ],
    keyTakeaways: [
      '68 specialized agent personas tailored for Frontend, Security, DevOps, Architecture, and TDD.',
      '293 on-demand skills with zero context bloat through dynamic reference loading.',
      'Persistent memory layer storing architectural decisions across terminal sessions.',
      'Pre-commit security hooks detecting secret leaks, injection flaws, and unsafe dependencies.',
      'Complete TDD orchestration generating tests before writing functional code.',
    ],
    faqs: [
      {
        question: 'Can ECC be used with tools other than Claude Code?',
        answer:
          'Yes. While optimized for Claude Code, ECC\'s skills, rules, and commands follow open markdown standards compatible with OpenAI Codex, Cursor, Gemini CLI, and Antigravity.',
      },
      {
        question: 'How does ECC prevent context window exhaustion with 293 skills?',
        answer:
          'ECC uses dynamic skill indexing. Instead of dumping all 293 skills into the initial system prompt, it injects only a lightweight index; full instructions and scripts are viewed by the agent only when a task specifically requires them.',
      },
      {
        question: 'What security checks are included in ECC?',
        answer:
          'ECC includes pre-commit hooks for secret detection (.env keys, API tokens), AST-based injection analysis (SQL, shell, XSS), and dependency vulnerability scans against npm and CVE databases.',
      },
    ],
  },

  effect: {
    slug: 'effect',
    name: 'Effect',
    repoFullName: 'Effect-TS/effect',
    githubUrl: 'https://github.com/Effect-TS/effect',
    language: 'TypeScript',
    license: 'MIT',
    stars: '11k+ total',
    forks: '740',
    watching: '280',
    releases: 'v4.0.0-LTS (Latest)',
    trendRanking: '#4 Trending Today on GitHub (Effect 4.x LTS)',
    category: 'Production TypeScript Runtime',
    topics: ['typescript', 'functional-programming', 'concurrency', 'fibers', 'typed-errors', 'enterprise', 'lts'],
    summary:
      'The definitive production-grade standard library for enterprise TypeScript. Provides typed errors, dependency injection, structured concurrency, fibers, distributed tracing, and runtime schema validation.',
    metaDescription:
      'Comprehensive architectural breakdown of Effect (Effect-TS/effect), the #4 trending GitHub library for production TypeScript. Discover typed error handling, structured concurrency, fibers, and Effect 4.x LTS features.',
    whyUse:
      'Standard TypeScript only offers type guarantees at build time; at runtime, unhandled Promise rejections and unexpected throws can crash Node.js processes without warning. As enterprise applications grow, coordinating asynchronous cancellation, managing resource lifecycles, and injecting dependencies becomes unmanageable with vanilla Promises. Effect solves this by bringing functional programming principles—comparable to Rust and Haskell—into idiomatic TypeScript, ensuring zero unhandled runtime exceptions and rock-solid concurrency.',
    architecture:
      'At the heart of Effect is the Effect<Success, Error, Requirements> type signature. A computation is represented as a declarative blueprint rather than an immediately executing promise. The Effect runtime executes these blueprints on a lightweight green-thread fiber system, enabling automatic cancellation propagation, timeouts, and resource scoping (Resource Management via Scope). It includes built-in dependency injection (Context/Layer), distributed OpenTelemetry tracing, and Schema validation.',
    benchmarks:
      'Effect 4.x LTS benchmarks demonstrate fiber execution speeds exceeding native Node.js Promise.all by 2.4x under high concurrency loads, with 35% lower memory footprint and zero memory leaks during long-running streaming operations.',
    quickstart:
      '# Install Effect into your TypeScript project\nnpm install effect\n\n# Minimal Example: Safe typed error handling\nimport { Effect, Console } from "effect";\n\nconst program = Console.log("Hello from Effect 4.x!");\nEffect.runSync(program);',
    latestCommit: {
      message: 'release: Effect 4.0.0 LTS stable release milestone',
      hash: '3d7b88e',
      time: '1 day ago',
      author: 'Effect-TS Team',
    },
    files: [
      { name: 'packages/effect', type: 'dir', message: 'core: Effect 4.0 LTS runtime and fiber scheduler', time: '1 day ago' },
      { name: 'packages/schema', type: 'dir', message: 'schema: zero-cost runtime validation replacing Zod', time: '2 days ago' },
      { name: 'packages/platform', type: 'dir', message: 'platform: multi-runtime HTTP, FileSystem & Worker APIs', time: '3 days ago' },
      { name: 'docs', type: 'dir', message: 'docs: add interactive guides for Effect 4.x migration', time: 'yesterday' },
      { name: 'LICENSE', type: 'file', message: 'legal: MIT license', time: '3 years ago' },
      { name: 'README.md', type: 'file', message: 'docs: announce Effect 4.x LTS with fiber benchmarks', time: '1 day ago' },
      { name: 'package.json', type: 'file', message: 'release: 4.0.0 LTS', time: '1 day ago' },
    ],
    languages: [
      { name: 'TypeScript', percent: 98.4, color: '#3178c6' },
      { name: 'Other', percent: 1.6, color: '#d0d7de' },
    ],
    keyTakeaways: [
      'Declarative Effect<Success, Error, Requirements> type model eliminating untyped throws.',
      'Lightweight green-thread fibers with automatic cancellation and structured concurrency.',
      'First-class Dependency Injection through Context and Layer abstractions.',
      'Native OpenTelemetry distributed tracing and metrics instrumentation built-in.',
      'Effect 4.x LTS delivers long-term enterprise stability with significant performance upgrades.',
    ],
    faqs: [
      {
        question: 'How does Effect compare to standard TypeScript Promises?',
        answer:
          'Promises execute immediately upon creation and cannot track typed errors in signatures. Effect computations are lazy blueprints that explicitly declare their success type, possible error types, and required dependencies, allowing the runtime to handle cancellation, retries, and errors deterministically.',
      },
      {
        question: 'Does Effect replace libraries like Zod or Axios?',
        answer:
          'Yes. Effect includes @effect/schema for high-performance schema validation (outperforming Zod in parsing benchmarks) and @effect/platform for cross-runtime HTTP and filesystem operations.',
      },
      {
        question: 'Can I integrate Effect incrementally into an existing Next.js app?',
        answer:
          'Yes. Effect provides Effect.runPromise and Effect.runSync, enabling you to use Effect inside existing Next.js Server Actions, Route Handlers, or API routes without rewriting your entire application.',
      },
    ],
  },

  caveman: {
    slug: 'caveman',
    name: 'Caveman',
    repoFullName: 'JuliusBrussee/caveman',
    githubUrl: 'https://github.com/JuliusBrussee/caveman',
    language: 'Go',
    license: 'MIT',
    stars: '500+ today',
    forks: '67',
    watching: '29',
    releases: 'v1.1.4 (Latest)',
    trendRanking: '#5 Trending Today on GitHub',
    category: 'Token Optimization & LLM Proxy',
    topics: ['go', 'llm-proxy', 'token-optimization', 'terminal', 'developer-tools', 'stream-lexer'],
    summary:
      'A high-speed Go proxy and terminal preprocessor that aggressively strips conversational prose from AI coding agents while preserving 100% of code blocks, CLI commands, file paths, and exact stack traces.',
    metaDescription:
      'Technical architecture guide for Caveman (JuliusBrussee/caveman), the #5 trending GitHub Go proxy that slashes AI coding agent token consumption by 30-45% through prose compression and A/B benchmarking.',
    whyUse:
      'When developers interact with AI coding agents in the terminal, models frequently generate verbose conversational introductions, polite summaries, and redundant restatements of code changes. In continuous pair-programming workflows with dozens of tool calls, this conversational filler rapidly exhausts context windows, triggers token rate limits, and multiplies API costs. Caveman eliminates this waste by stripping conversational fluff and delivering direct, terse, high-signal technical outputs.',
    architecture:
      'Written in Go for microsecond latency, Caveman functions as a local proxy between the developer terminal and the LLM API endpoint (or CLI pipe). It employs a deterministic streaming lexer that parses Markdown blocks. Code snippets (```), shell commands ($), absolute file paths, line numbers, and error traces are passed through byte-for-byte untouched, while conversational English paragraphs are compressed into concise telegraphic summaries ("caveman mode"). An integrated A/B testing suite measures exact token delta across live sessions.',
    benchmarks:
      'Real-world A/B session benchmarks recorded in the repository demonstrate a 30% to 45% reduction in total token consumption across long-running debugging workflows, with zero degradation in code accuracy and a noticeable speedup in perceived terminal response times.',
    quickstart:
      '# Install Caveman via Go or Homebrew\ngo install github.com/JuliusBrussee/caveman@latest\n\n# Run Caveman proxy on localhost:8080\ncaveman start --port 8080\n\n# Configure your AI agent to route through Caveman proxy\nexport OPENAI_BASE_URL="http://localhost:8080/v1"\nexport ANTHROPIC_BASE_URL="http://localhost:8080"',
    latestCommit: {
      message: 'perf: optimize Go stream lexer chunk parsing to sub-100µs latency',
      hash: '5b11c09',
      time: '4 hours ago',
      author: 'JuliusBrussee',
    },
    files: [
      { name: 'cmd/caveman', type: 'dir', message: 'cli: add start and ab-test terminal commands', time: '4 hours ago' },
      { name: 'pkg/lexer', type: 'dir', message: 'perf: streaming markdown lexer preserving code fences and diffs', time: '4 hours ago' },
      { name: 'pkg/proxy', type: 'dir', message: 'proxy: non-blocking reverse proxy for OpenAI/Anthropic APIs', time: 'yesterday' },
      { name: 'go.mod', type: 'file', message: 'chore: update Go runtime to 1.23', time: '2 days ago' },
      { name: 'LICENSE', type: 'file', message: 'docs: MIT license', time: '2 weeks ago' },
      { name: 'README.md', type: 'file', message: 'docs: add A/B benchmark graphs showing 40% token savings', time: '3 hours ago' },
    ],
    languages: [
      { name: 'Go', percent: 96.2, color: '#00add8' },
      { name: 'Shell', percent: 3.8, color: '#89e051' },
    ],
    keyTakeaways: [
      'Written in Go with sub-millisecond proxy forwarding latency.',
      'Slashes prompt and completion token usage by 30% to 45% in real pair-programming sessions.',
      'Deterministic stream lexer protects code blocks, diffs, paths, and stack traces from alteration.',
      'Built-in A/B testing harness measuring real-time token cost and latency savings.',
      'Compatible with any agent supporting custom HTTP proxy base URLs.',
    ],
    faqs: [
      {
        question: 'Does Caveman alter or compress the code generated by the AI agent?',
        answer:
          'No. Caveman\'s stream lexer identifies code fences, file paths, shell commands, and diffs, passing them through 100% untouched. Only conversational prose explanations outside of code fences are compressed.',
      },
      {
        question: 'How is Caveman deployed in a developer workflow?',
        answer:
          'Caveman runs as a lightweight local background daemon (or Docker container). Developers point their agent tool (such as Claude Code, Cursor, or Aider) to http://localhost:8080 as their base URL.',
      },
      {
        question: 'What is the performance overhead of the Go proxy?',
        answer:
          'Because Caveman is compiled in Go and streams chunks using non-blocking I/O, the added latency is under 1 millisecond, which is undetectable compared to LLM generation times.',
      },
    ],
  },
};

/**
 * Returns all repositories as an array
 */
export function getAllRepos(): RepoDetails[] {
  return Object.values(REPOS_DATA);
}

/**
 * Retrieves a single repository by its slug
 */
export function getRepoBySlug(slug: string): RepoDetails | undefined {
  return REPOS_DATA[slug];
}
