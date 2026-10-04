/**
 * Repositories Data & GEO/AEO Knowledge Base
 * VNHAX — Virtual Next-Gen Hub for AI & eXploration
 */

export interface RepoDetails {
  slug: string;
  name: string;
  repoFullName: string;
  githubUrl: string;
  language: string;
  license: string;
  stars: string;
  category: string;
  summary: string;
  metaDescription: string;
  keyTakeaways: string[];
  faqs: {
    question: string;
    answer: string;
  }[];
}

/**
 * Clean data store for verified GitHub repositories.
 * Automatically populates /repos, dynamic detail pages, /developer-resources/github-repos, and sitemaps.
 */
export const REPOS_DATA: Record<string, RepoDetails> = {
  ollama: {
    slug: 'ollama',
    name: 'Ollama',
    repoFullName: 'ollama/ollama',
    githubUrl: 'https://github.com/ollama/ollama',
    language: 'Go / C++',
    license: 'MIT',
    stars: '105k+',
    category: 'Local LLM Inference',
    summary: 'Get up and running with large language models locally — Llama 3.3, DeepSeek-R1, Mistral, and more on macOS, Windows, and Linux.',
    metaDescription: 'In-depth developer analysis and interactive architecture breakdown for Ollama: local inference service, model management, Modelfile customization, and OpenAI-compatible API.',
    keyTakeaways: [
      'Self-contained runtime packaging llama.cpp with automated GPU backend detection (Metal, CUDA, ROCm).',
      'Provides an OpenAI-compatible REST API (/v1/chat/completions) for instant integration with existing AI SDKs.',
      'Modelfile abstraction allows customizing temperature, system prompts, stop sequences, and context window size (num_ctx).',
      'Unified CLI for managing model downloads, quantization tags, and background daemon lifecycles.'
    ],
    faqs: [
      {
        question: 'How do I run Ollama with custom context window lengths?',
        answer: 'You can create a custom Modelfile with PARAMETER num_ctx 32768, then run `ollama create my-model -f Modelfile`. This overrides the default 2048/4096 context buffer according to your hardware VRAM budget.'
      },
      {
        question: 'Can I integrate Ollama with LangChain, LlamaIndex, or OpenAI SDKs?',
        answer: 'Yes. Ollama exposes a standard OpenAI-compatible API endpoint at http://localhost:11434/v1, allowing you to simply set the base URL and use standard API clients without code refactoring.'
      },
      {
        question: 'What hardware is required to run models on Ollama smoothly?',
        answer: 'For 7B-8B quantized models (Q4_K_M), 8GB of unified RAM or VRAM is sufficient. For 14B-32B models, 16GB-32GB is recommended. 70B models typically require 40GB+ of VRAM or Apple Silicon unified memory.'
      }
    ]
  },
  llamacpp: {
    slug: 'llamacpp',
    name: 'llama.cpp',
    repoFullName: 'ggml-org/llama.cpp',
    githubUrl: 'https://github.com/ggml-org/llama.cpp',
    language: 'C / C++',
    license: 'MIT',
    stars: '75k+',
    category: 'Inference Engine & Quantization',
    summary: 'Plain C/C++ implementation of LLM inference with minimal dependencies, maximum hardware acceleration, and the industry-standard GGUF format.',
    metaDescription: 'Architectural breakdown and performance benchmarking for llama.cpp: GGML tensor compute graph, GGUF binary format, AVX-512/NEON vectorization, and multi-GPU tensor splitting.',
    keyTakeaways: [
      'Zero-dependency pure C/C++ core with first-class SIMD optimizations for x86 AVX-512 and ARM NEON.',
      'Originator and maintainer of the GGUF binary format, standardizing tensor quantization (k-quants, IQ quants).',
      'Supports unified offloading across hybrid CPU+GPU architectures, splitting model layers across multiple cards.',
      'Powers the inference backends of Ollama, LM Studio, Jan, and thousands of production edge deployments.'
    ],
    faqs: [
      {
        question: 'What is the advantage of llama.cpp over Python-based frameworks?',
        answer: 'llama.cpp eliminates Python interpreter overhead, has zero heavy dependencies like PyTorch, boots in milliseconds, and delivers optimal memory utilization through raw C/C++ memory mapping.'
      },
      {
        question: 'What is GGUF and why is it preferred for local inference?',
        answer: 'GGUF is a single-file binary container storing metadata, tokenizer vocabularies, and quantized tensors together. It allows fast mmap loading directly into system or GPU memory without duplicate allocations.'
      }
    ]
  },
  comfyui: {
    slug: 'comfyui',
    name: 'ComfyUI',
    repoFullName: 'comfyanonymous/ComfyUI',
    githubUrl: 'https://github.com/comfyanonymous/ComfyUI',
    language: 'Python / JavaScript',
    license: 'GPL-3.0',
    stars: '62k+',
    category: 'Generative Vision & Node Graphs',
    summary: 'The most powerful and modular visual diffusion model GUI and backend, supporting SDXL, Flux.1, SD3, and complex custom computational pipelines.',
    metaDescription: 'Deep dive into ComfyUI architecture: acyclic execution graph, lazy tensor evaluation, custom node extensions, and production headless API automation.',
    keyTakeaways: [
      'Node-based computational graph architecture allows full control over conditioning, latent transformations, and sampling steps.',
      'Headless API execution mode enables programmatic image generation pipelines without loading the web UI.',
      'Memory optimization engine dynamically unloads unused weights between sampling and VAE decode phases.',
      'De-facto industry standard for advanced diffusion workflows, ControlNet stacking, and LoRA experimentation.'
    ],
    faqs: [
      {
        question: 'Can ComfyUI be executed as a backend API in production?',
        answer: 'Yes. Every ComfyUI workflow can be exported in API format (JSON) and submitted via WebSocket or HTTP POST to execute headless workflows in cloud and edge environments.'
      }
    ]
  },
  langchain: {
    slug: 'langchain',
    name: 'LangChain',
    repoFullName: 'langchain-ai/langchain',
    githubUrl: 'https://github.com/langchain-ai/langchain',
    language: 'Python / TypeScript',
    license: 'MIT',
    stars: '98k+',
    category: 'Agent Orchestration & RAG',
    summary: 'Comprehensive framework for developing context-aware applications powered by language models, agents, retrieval chains, and LangGraph state machines.',
    metaDescription: 'Technical guide to LangChain and LangGraph: LangChain Expression Language (LCEL), multi-agent state machines, memory persistence, and production RAG architecture.',
    keyTakeaways: [
      'LangChain Expression Language (LCEL) provides declarative composition, automatic streaming, and async batching.',
      'LangGraph extension adds stateful cyclical execution graphs essential for multi-agent autonomous loops.',
      'Extensive integration library supporting 100+ vector stores, embeddings providers, and external tools.',
      'Native observability and tracing via LangSmith for debugging latency, token usage, and hallucination rates.'
    ],
    faqs: [
      {
        question: 'When should I use LangGraph instead of standard LangChain chains?',
        answer: 'Use LangGraph when your application requires cyclical agent loops, human-in-the-loop intervention, branch conditioning, or persistent checkpointed state across turns.'
      }
    ]
  },
  cline: {
    slug: 'cline',
    name: 'Cline',
    repoFullName: 'cline/cline',
    githubUrl: 'https://github.com/cline/cline',
    language: 'TypeScript',
    license: 'Apache-2.0',
    stars: '42k+',
    category: 'Autonomous Coding Agent',
    summary: 'Autonomous coding agent inside VS Code capable of creating/editing files, running terminal commands, testing code, and using browser automation with human approval.',
    metaDescription: 'Complete breakdown of Cline architecture: VS Code extension host integration, iterative chain-of-thought tool execution, diff generation, and model-agnostic API support.',
    keyTakeaways: [
      'Human-in-the-loop permission model: every file write and terminal execution requires explicit user authorization.',
      'Supports Anthropic Claude 3.7 Sonnet, OpenAI, DeepSeek, and local Ollama endpoints with sliding context window tracking.',
      'Integrated browser action tool enables inspecting web applications, reading console logs, and debugging frontend UI.',
      'Direct workspace indexing and AST awareness for accurate surgical code edits across multiple files.'
    ],
    faqs: [
      {
        question: 'Is Cline secure to use on private enterprise codebases?',
        answer: 'Cline runs entirely within your local editor and communicates directly with your chosen API endpoint or local Ollama instance with no middleman proxy servers storing your codebase.'
      }
    ]
  },
  aider: {
    slug: 'aider',
    name: 'Aider',
    repoFullName: 'paul-gauthier/aider',
    githubUrl: 'https://github.com/paul-gauthier/aider',
    language: 'Python',
    license: 'Apache-2.0',
    stars: '31k+',
    category: 'CLI AI Pair Programmer',
    summary: 'AI pair programming in your terminal. Edits code in your local git repo, generates atomic git commits with sensible messages, and works with all major LLMs.',
    metaDescription: 'Engineering review of Aider: repository map generation using tree-sitter AST, git integration, surgical diff formatting, and benchmark-leading code editing accuracy.',
    keyTakeaways: [
      'Generates a compressed repository map using Tree-Sitter to give the LLM semantic awareness of the whole project without blowing context limits.',
      'Automatically verifies edits, formats git commits with explanatory messages, and offers 1-command rollback.',
      'Supports unified diff, search-and-replace, and whole-file edit formats matched to the specific model capability.',
      'Works seamlessly with local models (DeepSeek-R1, Qwen 2.5 Coder) as well as frontier cloud reasoning models.'
    ],
    faqs: [
      {
        question: 'How does Aider manage large codebases within context limits?',
        answer: 'Aider uses a specialized Tree-Sitter repository map that compresses symbols, function signatures, and references, sending only relevant AST nodes to the model instead of full file dumps.'
      }
    ]
  }
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
