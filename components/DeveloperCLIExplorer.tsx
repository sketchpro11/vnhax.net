'use client';

import { useState } from 'react';

interface CommandItem {
  cmd: string;
  desc: string;
  notes?: string;
}

const CLI_CATEGORIES: Record<string, { label: string; commands: CommandItem[] }> = {
  ollama: {
    label: 'Ollama CLI',
    commands: [
      {
        cmd: 'ollama run deepseek-r1:14b',
        desc: 'Pull and execute local reasoning model with streaming terminal responses.',
      },
      {
        cmd: 'ollama create custom-rag -f Modelfile',
        desc: 'Build custom model variant specifying PARAMETER num_ctx 32768 and system instructions.',
      },
      {
        cmd: 'ollama serve',
        desc: 'Launch background inference daemon on http://localhost:11434.',
      },
      {
        cmd: 'ollama list',
        desc: 'Inspect all locally cached GGUF model weights, sizes, and modification dates.',
      },
      {
        cmd: 'ollama ps',
        desc: 'View active models loaded in VRAM, context allocations, and idle expiration times.',
      },
    ],
  },
  llamacpp: {
    label: 'llama.cpp Toolchain',
    commands: [
      {
        cmd: './llama-cli -m model.gguf -p "Write an async Rust handler" -ngl 99 -c 8192',
        desc: 'Run inference with 100% GPU offload (-ngl 99) and 8k context window.',
      },
      {
        cmd: './llama-quantize input-f16.gguf output-q4_k_m.gguf Q4_K_M',
        desc: 'Quantize full-precision FP16 weights into optimal 4-bit k-quants.',
      },
      {
        cmd: './llama-server -m model.gguf --port 8080 --host 0.0.0.0 -c 16384',
        desc: 'Deploy an ultra-fast OpenAI-compatible REST server with custom context ceiling.',
      },
      {
        cmd: './llama-bench -m model.gguf -p 512 -n 128 -ngl 99',
        desc: 'Benchmark prompt processing (pp) and token generation (tg) speeds on local hardware.',
      },
    ],
  },
  git: {
    label: 'Git Workflows',
    commands: [
      {
        cmd: 'git worktree add ../feature-branch feature',
        desc: 'Check out separate branches in distinct folders without disturbing current work.',
      },
      {
        cmd: 'git log --oneline --graph --decorate -n 10',
        desc: 'Display clean compact visual commit graph with branches and tags.',
      },
      {
        cmd: 'git rebase -i HEAD~4',
        desc: 'Squash, edit, or reword recent commits to ensure an atomic, clean PR history.',
      },
      {
        cmd: 'git stash push -m "WIP auth migration" -u',
        desc: 'Stash both tracked and untracked changes with descriptive identifier.',
      },
    ],
  },
  docker: {
    label: 'Docker & GPU Containers',
    commands: [
      {
        cmd: 'docker run --gpus all -d -v ollama:/root/.ollama -p 11434:11434 --name ollama-srv ollama/ollama',
        desc: 'Run GPU-accelerated container with persistent host volume mounting.',
      },
      {
        cmd: 'docker stats --no-stream',
        desc: 'Quick real-time snapshot of CPU, RAM, and network I/O per container.',
      },
      {
        cmd: 'docker exec -it ollama-srv ollama run llama3.3:70b',
        desc: 'Execute interactive prompt session inside active container environment.',
      },
    ],
  },
};

export default function DeveloperCLIExplorer() {
  const [activeTab, setActiveTab] = useState<string>('ollama');
  const [copiedCmd, setCopiedCmd] = useState<string | null>(null);

  const handleCopy = (cmd: string) => {
    navigator.clipboard.writeText(cmd);
    setCopiedCmd(cmd);
    setTimeout(() => {
      setCopiedCmd(null);
    }, 2000);
  };

  const currentCategory = CLI_CATEGORIES[activeTab] || CLI_CATEGORIES.ollama;

  return (
    <section className="cli-box" aria-labelledby="cli-cheatsheet-heading">
      <div className="cli-tabs-nav">
        {Object.entries(CLI_CATEGORIES).map(([key, data]) => (
          <button
            key={key}
            type="button"
            className={`cli-tab-trigger ${activeTab === key ? 'active' : ''}`}
            onClick={() => setActiveTab(key)}
          >
            {data.label}
          </button>
        ))}
      </div>

      <div className="cli-content-panel">
        {currentCategory.commands.map((item, idx) => {
          const isCopied = copiedCmd === item.cmd;
          return (
            <div key={idx} className="cli-cmd-row">
              <div style={{ minWidth: 0, flexGrow: 1 }}>
                <div className="cli-cmd-code">{item.cmd}</div>
                <div className="cli-cmd-desc">{item.desc}</div>
              </div>
              <button
                type="button"
                className={`cli-copy-btn ${isCopied ? 'copied' : ''}`}
                onClick={() => handleCopy(item.cmd)}
                aria-label="Copy command line snippet"
              >
                {isCopied ? (
                  <>
                    <span>✓</span> Copied
                  </>
                ) : (
                  <>
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                      <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
                    </svg>
                    Copy
                  </>
                )}
              </button>
            </div>
          );
        })}
      </div>
    </section>
  );
}
