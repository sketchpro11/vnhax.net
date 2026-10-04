import type { Metadata } from 'next';
import Link from 'next/link';
import SiteHeader from '@/components/SiteHeader';
import SiteFooter from '@/components/SiteFooter';
import Breadcrumbs from '@/components/Breadcrumbs';
import { getAllBlogs } from '@/lib/blog';
import { getAllRepos } from '@/lib/repos-data';
import { BRAND_CONFIG, getBreadcrumbSchema, getFAQSchema } from '@/lib/seo';

export const metadata: Metadata = {
  title: `AI Tools & Frameworks Directory — ${BRAND_CONFIG.name}`,
  description:
    'Curated directory and architectural breakdowns of top AI tools: local LLM runtimes, autonomous coding agents, diffusion interfaces, and orchestration frameworks.',
  alternates: {
    canonical: `${BRAND_CONFIG.siteUrl}/ai/ai-tools`,
  },
};

const AI_TOOLS_LIST = [
  {
    name: 'Ollama',
    slug: 'ollama',
    category: 'Local LLM Inference',
    badge: 'Go / C++',
    stars: '105k+ ★',
    desc: 'Run Llama 3.3, DeepSeek-R1, and Mistral locally with a simple CLI, OpenAI-compatible REST endpoint, and custom Modelfiles.',
    href: '/repos/ollama',
  },
  {
    name: 'llama.cpp',
    slug: 'llamacpp',
    category: 'Inference Engine & Quantization',
    badge: 'C / C++',
    stars: '75k+ ★',
    desc: 'Pure C/C++ inference engine with zero dependencies, GGUF format stewardship, and state-of-the-art SIMD acceleration for CPU/GPU.',
    href: '/repos/llamacpp',
  },
  {
    name: 'ComfyUI',
    slug: 'comfyui',
    category: 'Generative Vision & Diffusion',
    badge: 'Python / JS',
    stars: '62k+ ★',
    desc: 'Modular node-based computational graph for Flux.1, SDXL, and ControlNet with headless API execution for automated production pipelines.',
    href: '/repos/comfyui',
  },
  {
    name: 'Aider',
    slug: 'aider',
    category: 'CLI AI Pair Programmer',
    badge: 'Python',
    stars: '31k+ ★',
    desc: 'Terminal-based pair programmer that creates atomic git commits, leverages Tree-Sitter AST repository maps, and supports local reasoning LLMs.',
    href: '/repos/aider',
  },
  {
    name: 'Cline',
    slug: 'cline',
    category: 'Autonomous Coding Agent',
    badge: 'TypeScript',
    stars: '42k+ ★',
    desc: 'Autonomous coding agent extension for VS Code with human-in-the-loop approvals, terminal execution, and browser inspection tools.',
    href: '/repos/cline',
  },
  {
    name: 'LangChain & LangGraph',
    slug: 'langchain',
    category: 'Agent Orchestration & RAG',
    badge: 'Python / TS',
    stars: '98k+ ★',
    desc: 'Declarative LCEL pipeline composition and stateful multi-agent execution graphs for enterprise RAG and autonomous workflow loops.',
    href: '/repos/langchain',
  },
];

export default async function AIToolsPage() {
  const posts = await getAllBlogs();
  const repos = getAllRepos();

  const breadcrumbs = [
    { name: 'Home', url: '/' },
    { name: 'Innovation & AI', url: '/ai' },
    { name: 'AI Tools & Frameworks', url: '/ai/ai-tools' },
  ];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'CollectionPage',
            name: 'AI Tools & Frameworks Directory',
            description:
              'Curated directory and architectural breakdowns of top AI tools: local LLM runtimes, autonomous coding agents, diffusion interfaces, and orchestration frameworks.',
            url: `${BRAND_CONFIG.siteUrl}/ai/ai-tools`,
            isPartOf: {
              '@type': 'CollectionPage',
              name: 'Innovation & AI',
              url: `${BRAND_CONFIG.siteUrl}/ai`,
            },
          }),
        }}
      />

      <SiteHeader activeNav="ai" variant="standard" />

      <main className="hub-page">
        <div className="hub-inner">
          <Breadcrumbs
            items={[
              { label: 'Innovation & AI', href: '/ai' },
              { label: 'AI Tools & Frameworks' },
            ]}
          />

          <header className="hub-header">
            <p className="section-kicker">Curated Directory &amp; Architecture</p>
            <h1 className="page-title">ai tools &amp; frameworks</h1>
            <p className="page-lede">
              A vetted index of open-source runtimes, agent frameworks, and image pipelines. Inspect architecture breakdowns, hardware constraints, and production benchmarks.
            </p>
          </header>

          {/* Tools Grid */}
          <section className="topic-section" aria-labelledby="tools-directory-heading">
            <h2 id="tools-directory-heading" className="topic-section-title">
              Verified Open-Source AI Tools
            </h2>
            <div className="card-grid hub-card-grid">
              {AI_TOOLS_LIST.map((tool) => (
                <Link key={tool.slug} className="card card--content" href={tool.href}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
                    <span className="card-eyebrow" style={{ margin: 0 }}>
                      {tool.category}
                    </span>
                    <span style={{ fontSize: '11px', fontWeight: 650, color: '#16a34a', background: '#dcfce7', padding: '2px 8px', borderRadius: '4px' }}>
                      {tool.stars}
                    </span>
                  </div>
                  <h3>{tool.name}</h3>
                  <p>{tool.desc}</p>
                  <span className="card-link">
                    Architecture &amp; Breakdown <span aria-hidden="true">→</span>
                  </span>
                </Link>
              ))}
            </div>
          </section>

          {/* Guides Section */}
          {posts.length > 0 && (
            <section className="topic-section" aria-labelledby="ai-guides-heading" style={{ marginTop: '36px' }}>
              <h2 id="ai-guides-heading" className="topic-section-title">
                Implementation Guides &amp; Tutorials
              </h2>
              <div className="card-grid hub-card-grid">
                {posts.map((post) => (
                  <Link key={post.slug} className="card card--content" href={`/blog/${post.slug}`}>
                    <span className="card-eyebrow">
                      {post.frontmatter.category || 'Guide'} · {post.frontmatter.readTime || '6 min read'}
                    </span>
                    <h3>{post.frontmatter.title}</h3>
                    <p>{post.frontmatter.description}</p>
                    <span className="card-link">
                      Read Guide <span aria-hidden="true">→</span>
                    </span>
                  </Link>
                ))}
              </div>
            </section>
          )}

          {/* Evaluation Guidelines */}
          <section className="hub-note" style={{ marginTop: '40px' }}>
            <h2>Five Criteria for Evaluating an AI Tool</h2>
            <p>
              1. <strong>Hardware Efficiency:</strong> Check minimum VRAM requirements and quantization degradation thresholds.<br />
              2. <strong>Zero-Telemetry Privacy:</strong> Ensure prompts and source code remain within your local execution boundary.<br />
              3. <strong>OpenAI-API Compatibility:</strong> Favor runtimes that allow drop-in swapping without changing client SDK code.<br />
              4. <strong>Active Maintenance:</strong> Review recent commit velocity, issue response times, and model family support.<br />
              5. <strong>Commercial Licensing:</strong> Confirm permissive Apache-2.0 or MIT licensing for production deployment.
            </p>
          </section>
        </div>
      </main>

      <SiteFooter />
    </>
  );
}
