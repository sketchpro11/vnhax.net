import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import SiteHeader from '@/components/SiteHeader';
import SiteFooter from '@/components/SiteFooter';
import Breadcrumbs from '@/components/Breadcrumbs';
import { getAllRepos } from '@/lib/repos-data';
import { getBlogsBySilo } from '@/lib/blog';
import { BRAND_CONFIG, getFAQSchema } from '@/lib/seo';

export const metadata: Metadata = {
  title: 'Developer Toolkits & Architecture Hub',
  description:
    'Curated engineering knowledge base: reviewed GitHub repositories, production CLI toolkits, architecture decision rubrics, and open-source implementation guides.',
  alternates: {
    canonical: `${BRAND_CONFIG.siteUrl}/developer-resources`,
  },
  openGraph: {
    title: `Developer Toolkits & Architecture Hub | ${BRAND_CONFIG.shortName}`,
    description:
      'Curated engineering knowledge base: reviewed GitHub repositories, production CLI toolkits, architecture decision rubrics, and open-source implementation guides.',
    url: `${BRAND_CONFIG.siteUrl}/developer-resources`,
    siteName: BRAND_CONFIG.shortName,
    type: 'website',
  },
};

const DEV_FAQS = [
  {
    question: 'How does vnhax evaluate and verify open-source GitHub repositories?',
    answer:
      'Each review is written from each project README and documentation, with live star and fork counts from the GitHub API. We note the licence, what the project claims, and any caveats it states. We do not run security audits or benchmarks ourselves, so test a project in your own environment before relying on it.',
  },
  {
    question: 'Can I clone and deploy these repositories in commercial enterprise workflows?',
    answer:
      'Usually, but check each licence. Most projects here use permissive licences such as MIT or Apache-2.0, while some, like VoiceStudio and Lightpanda, use AGPL-3.0, which has extra obligations if you offer a modified version as a network service. Model weights can have separate licences from the code.',
  },
  {
    question: 'How do I choose between Cline and Aider for AI-assisted coding?',
    answer:
      'Aider operates directly in your terminal using git diffs and Tree-Sitter AST repository maps, making it ideal for command-line power users and CI script integration. Cline is a graphical VS Code extension featuring an interactive chat panel, browser automation, and strict human approval dialogs for each file write.',
  },
  {
    question: 'What is the fastest way to run local LLMs inside a Docker container?',
    answer:
      'Use the official Ollama Docker image with GPU passthrough: `docker run --gpus all -d -v ollama:/root/.ollama -p 11434:11434 ollama/ollama`. This mounts your model weights on the host machine and exposes an OpenAI-compatible API on localhost.',
  },
];

const REPOS_LIQUID_METAS: Record<string, { mesh: string; category: string; mockupTitle: string; cmd: string; cmdSub: string; status: string; statusClass?: string }> = {
  ollama: {
    mesh: 'liquid-mesh--ollama',
    category: 'Local Runtime',
    mockupTitle: 'ollama-cli',
    cmd: '$ ollama run deepseek-r1:14b',
    cmdSub: 'Pulling manifest... [Done]',
    status: 'API: :11434 • Online',
  },
  llamacpp: {
    mesh: 'liquid-mesh--llamacpp',
    category: 'Inference Core',
    mockupTitle: 'llama-server',
    cmd: '$ ./llama-cli -m model.gguf',
    cmdSub: 'Backend: AVX2 / CUDA',
    status: 'Speed: 76.4 t/s',
    statusClass: 'mockup-status-tag--amber',
  },
  comfyui: {
    mesh: 'liquid-mesh--comfyui',
    category: 'Diffusion Engine',
    mockupTitle: 'comfy-api',
    cmd: '$ python main.py --listen',
    cmdSub: 'Model: Flux.1 Schnell',
    status: 'Headless Mode',
  },
  langchain: {
    mesh: 'liquid-mesh--langchain',
    category: 'Agent Orchestration',
    mockupTitle: 'langgraph-runner',
    cmd: '$ python agent_workflow.py',
    cmdSub: 'State Machine: Checkpointed',
    status: 'LangSmith: Tracing',
  },
  cline: {
    mesh: 'liquid-mesh--cline',
    category: 'Coding Agent',
    mockupTitle: 'cline-extension',
    cmd: 'Tool: execute_command [npm test]',
    cmdSub: 'Approval: User Confirmed',
    status: 'Diff Generated',
  },
  aider: {
    mesh: 'liquid-mesh--aider',
    category: 'Pair Programmer',
    mockupTitle: 'aider-terminal',
    cmd: '$ aider --model deepseek-r1',
    cmdSub: 'Repo Map: 124 files indexed',
    status: 'Git Commit: Atomic',
  },
};

export default async function DeveloperResourcesPage() {
  const repos = getAllRepos();
  const devArticles = await getBlogsBySilo('developer');

  const breadcrumbs = [
    { name: 'Home', url: '/' },
    { name: 'Developer Resources', url: '/developer-resources' },
  ];

  const collectionSchema = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'Developer Resources Hub',
    description:
      'Curated engineering knowledge base: reviewed GitHub repositories, production CLI toolkits, architecture decision rubrics, and open-source implementation guides.',
    url: `${BRAND_CONFIG.siteUrl}/developer-resources`,
    publisher: {
      '@type': 'Organization',
      name: BRAND_CONFIG.name,
      url: BRAND_CONFIG.siteUrl,
    },
  };

  const faqSchema = getFAQSchema(DEV_FAQS);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <SiteHeader activeNav="developer" variant="standard" />

      <main className="hub-page">
        <div className="hub-inner">
          <Breadcrumbs items={[{ label: 'Developer Resources' }]} />

          {/* Editorial Header */}
          <header className="hub-header">
            <p className="section-kicker">Engineering knowledge base</p>
            <h1 className="page-title">developer resources &amp; tooling</h1>
            <p className="page-lede">
              Plain-English reviews of popular open-source repositories, local AI runtimes and developer tools, written from each project's own documentation.
            </p>
          </header>

          {/* Core Engineering Topics Grid */}
          <section className="topic-section" aria-labelledby="dev-topics">
            <h2 id="dev-topics" className="topic-section-title">
              Engineering Pillars
            </h2>
            <div className="topic-grid">
              <Link className="topic-card" href="/repos">
                <span className="card-eyebrow">Repositories</span>
                <h3>Open-Source Repository Reviews</h3>
                <p>
                  What each project does, how to install it, its licence and its stated limits, with live GitHub stats.
                </p>
                <span className="card-link">
                  Browse repos <span aria-hidden="true">→</span>
                </span>
              </Link>

              <Link className="topic-card" href="/repos/ecc">
                <span className="card-eyebrow">Pair Programming</span>
                <h3>Enterprise Agent Harness</h3>
                <p>
                  Multi-agent coding harness with 70+ specialized agents, 300+ skills and verification loops.
                </p>
                <span className="card-link">
                  Inspect Everything Claude Code <span aria-hidden="true">→</span>
                </span>
              </Link>

              <Link className="topic-card" href="/repos/agent-reach">
                <span className="card-eyebrow">Agentic Tools</span>
                <h3>Autonomous Web &amp; Social Retrieval</h3>
                <p>
                  Zero-API-fee internet access across 13+ platforms for AI coding assistants and automation workflows.
                </p>
                <span className="card-link">
                  Inspect Agent Reach <span aria-hidden="true">→</span>
                </span>
              </Link>
            </div>
          </section>

          {/* Reviewed Repositories Showcase (Liquid Cards Grid) */}
          <section className="topic-section" aria-labelledby="audited-repos">
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px', marginBottom: '24px' }}>
              <div>
                <h2 id="audited-repos" className="topic-section-title" style={{ margin: 0 }}>
                  Featured Open-Source Repositories
                </h2>
                <p style={{ fontSize: '14.5px', color: '#64748b', margin: '4px 0 0' }}>
                  Reviews based on each project's README, with live star counts from GitHub.
                </p>
              </div>
              <Link
                href="/repos"
                style={{ fontSize: '13.5px', fontWeight: 600, color: '#2563eb' }}
              >
                View Repository Index →
              </Link>
            </div>

            <div className="repo-liquid-grid" style={{ margin: 0 }}>
              {repos.slice(0, 6).map((repo) => {
                const meta = REPOS_LIQUID_METAS[repo.slug] || {
                  mesh: 'liquid-mesh--ollama',
                  category: repo.category || 'Developer Tool',
                  mockupTitle: `${repo.slug}-cli`,
                  cmd: `$ git clone ${repo.githubUrl}`,
                  cmdSub: 'Reviewed Repository',
                  status: 'Active',
                };

                return (
                  <Link key={repo.slug} className="liquid-card" href={`/repos/${repo.slug}`}>
                    <div className="liquid-card-inner">
                      <div className={`liquid-mesh ${meta.mesh}`} />
                      <div className="liquid-card-badges">
                        <span className="liquid-badge">{meta.category}</span>
                        <span className="liquid-badge liquid-badge--star">⭐ {repo.stars}</span>
                      </div>
                      {repo.image ? (
                        <div className="liquid-card-media">
                          <Image
                            src={repo.image}
                            alt={`${repo.name} architecture`}
                            fill
                            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                            className="liquid-card-img"
                          />
                          <div className="liquid-card-overlay" />
                        </div>
                      ) : (
                        <div className="liquid-card-preview">
                          <div className="preview-mockup-header">
                            <span className="mockup-dot mockup-dot--red" />
                            <span className="mockup-dot mockup-dot--yellow" />
                            <span className="mockup-dot mockup-dot--green" />
                            <span className="mockup-title">{meta.mockupTitle}</span>
                          </div>
                          <div className="preview-mockup-body">
                            <span className="mockup-code-line">{meta.cmd}</span>
                            <span className="mockup-code-line text-muted">{meta.cmdSub}</span>
                            <span className={`mockup-status-tag ${meta.statusClass || ''}`}>{meta.status}</span>
                          </div>
                        </div>
                      )}
                      <div className="liquid-card-content">
                        <h3 className="liquid-card-title">{repo.name}</h3>
                        <p className="liquid-card-desc">{repo.summary}</p>
                        <div className="liquid-card-btn">
                          <span>Explore Architecture</span>
                          <span aria-hidden="true">→</span>
                        </div>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          </section>

          {/* Featured Developer Guides & Toolkits */}
          {devArticles.length > 0 && (
            <section className="topic-section" aria-labelledby="dev-articles-heading">
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px', flexWrap: 'wrap', gap: '12px' }}>
                <div>
                  <h2 id="dev-articles-heading" className="topic-section-title" style={{ margin: 0 }}>
                    Developer Guides &amp; Architecture Toolkits
                  </h2>
                  <p style={{ fontSize: '14.5px', color: '#64748b', margin: '4px 0 0' }}>
                    Hands-on engineering teardowns, API integrations, diffusion distillation, and terminal toolchains.
                  </p>
                </div>
                <Link href="/blog" style={{ fontSize: '13.5px', fontWeight: 600, color: '#2563eb' }}>
                  View All Guides →
                </Link>
              </div>

              <div className="card-grid hub-card-grid">
                {devArticles.slice(0, 6).map((article) => (
                  <Link
                    key={article.slug}
                    className="card card--content"
                    href={`/blog/${article.slug}`}
                    style={{ textDecoration: 'none' }}
                  >
                    <span className="card-eyebrow">
                      {article.frontmatter.category || 'Developer Tools'} · {article.frontmatter.readTime || '8 min read'}
                    </span>
                    <h3>{article.frontmatter.title}</h3>
                    <p>{article.frontmatter.description}</p>
                    <span className="card-link">
                      Read Guide <span aria-hidden="true">→</span>
                    </span>
                  </Link>
                ))}
              </div>
            </section>
          )}

          {/* In-Depth Editorial Dependency Quality Gates */}
          <section className="topic-section" aria-labelledby="audit-framework">
            <div className="editorial-feature-card">
              <span className="card-eyebrow">Engineering Decision Rubric</span>
              <h3 id="audit-framework">Auditing Open-Source Dependencies Before Production Adoption</h3>
              <p>
                GitHub stars and social media buzz are weak proxies for engineering safety. Before pulling an external package into a production codebase, check it against four basic quality gates:
              </p>
              <div className="editorial-feature-columns">
                <div className="editorial-column-item">
                  <h4>📜 Permissive Licensing</h4>
                  <p>
                    Verify MIT or Apache-2.0 terms. Reject viral copyleft licenses (AGPL-3.0) or hybrid source-available terms that trigger commercial patent retaliations or revenue-share penalties.
                  </p>
                </div>
                <div className="editorial-column-item">
                  <h4>⚡ Maintainer Velocity</h4>
                  <p>
                    Audit turnaround time on security disclosures and open pull requests. A repository with 50k stars and zero commits in six months represents high technical debt.
                  </p>
                </div>
                <div className="editorial-column-item">
                  <h4>🔍 Supply Chain Hygiene</h4>
                  <p>
                    Inspect transitive dependencies and pinned lockfiles. Prefer zero-dependency libraries and packages with verifiable cryptographic signatures and two-factor maintainer accounts.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Frequently Asked Questions */}
          <section className="topic-section" aria-labelledby="dev-faq-heading">
            <h2 id="dev-faq-heading" className="topic-section-title">
              Frequently asked questions
            </h2>
            <p className="topic-section-desc">
              Practical guidance on repository audits, enterprise licensing, and development workflows.
            </p>
            <div className="hub-faq-list">
              {DEV_FAQS.map((faq, i) => (
                <details key={i} className="hub-faq-item">
                  <summary className="hub-faq-trigger">
                    <span>{faq.question}</span>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><polyline points="6 9 12 15 18 9"/></svg>
                  </summary>
                  <div className="hub-faq-content">
                    {faq.answer}
                  </div>
                </details>
              ))}
            </div>
          </section>

          {/* Bottom Authority Box */}
          <section className="hub-note">
            <h2>Use a repository as evidence, not an answer</h2>
            <p>
              Repository discovery is only the first step. Read the license, releases, issue tracker, contributor guidance, and security documentation before adding a dependency or deploying it in a production enterprise workflow.
            </p>
          </section>
        </div>
      </main>

      <SiteFooter />
    </>
  );
}
