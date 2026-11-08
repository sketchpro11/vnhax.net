import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import SiteHeader from '@/components/SiteHeader';
import SiteFooter from '@/components/SiteFooter';
import Breadcrumbs from '@/components/Breadcrumbs';
import { getBlogsBySilo } from '@/lib/blog';
import { getAllRepos } from '@/lib/repos-data';
import { BRAND_CONFIG } from '@/lib/seo';

export const metadata: Metadata = {
  title: 'AI & Machine Learning',
  description:
    'Practical analysis, architecture patterns, and selection guides for developers working with language models, generative AI, and machine learning infrastructure.',
  alternates: {
    canonical: `${BRAND_CONFIG.siteUrl}/ai`,
  },
  openGraph: {
    title: `AI & Machine Learning | ${BRAND_CONFIG.shortName}`,
    description:
      'Practical analysis, architecture patterns, and selection guides for developers working with language models, generative AI, and machine learning infrastructure.',
    url: `${BRAND_CONFIG.siteUrl}/ai`,
    siteName: BRAND_CONFIG.shortName,
    type: 'website',
  },
};

export default async function AIPage() {
  const posts = await getBlogsBySilo('ai');
  const allRepos = getAllRepos();
  const aiRepos = allRepos.filter((r) =>
    ['agent-reach', 'caveman', 'ecc'].includes(r.slug)
  );

  const breadcrumbs = [
    { name: 'Home', url: '/' },
    { name: 'Innovation & AI', url: '/ai' },
  ];

  const collectionSchema = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'AI & Machine Learning',
    description:
      'Practical analysis, architecture patterns, and selection guides for developers working with language models, generative AI, and machine learning infrastructure.',
    url: `${BRAND_CONFIG.siteUrl}/ai`,
    publisher: {
      '@type': 'Organization',
      name: BRAND_CONFIG.name,
      url: BRAND_CONFIG.siteUrl,
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionSchema) }}
      />

      <SiteHeader activeNav="ai" variant="standard" />

      <main className="hub-page">
        <div className="hub-inner">
          <Breadcrumbs items={[{ label: 'Innovation & AI' }]} />

          <header className="hub-header">
            <p className="section-kicker">Topic hub</p>
            <h1 className="page-title">ai &amp; machine learning</h1>
            <p className="page-lede">
              Practical coverage of generative models, local inference, agent architectures, and the developer tooling surrounding modern AI. Read before you build; evaluate before you deploy.
            </p>
          </header>

          {/* Explore Topics Grid */}
          <section className="topic-section" aria-labelledby="ai-topics">
            <h2 id="ai-topics" className="topic-section-title">
              Explore AI topics
            </h2>
            <div className="topic-grid">
              <Link className="topic-card" href="/ai">
                <span className="card-eyebrow">AI tools</span>
                <h3>Local models, apps, and workflows</h3>
                <p>
                  Choose practical tools for experimenting with language models, image generation, retrieval, and assisted coding.
                </p>
                <span className="card-link">
                  Explore AI tools <span aria-hidden="true">→</span>
                </span>
              </Link>

              <Link className="topic-card" href="/repos">
                <span className="card-eyebrow">Repositories</span>
                <h3>Open-source model runtimes</h3>
                <p>
                  Curated repositories, architecture breakdowns, hardware acceleration, and inference benchmarking.
                </p>
                <span className="card-link">
                  Explore Repositories <span aria-hidden="true">→</span>
                </span>
              </Link>

              <Link className="topic-card" href="/blog/how-to-increase-num-ctx-in-modelfile">
                <span className="card-eyebrow">Context Engineering</span>
                <h3>Local context window tuning</h3>
                <p>
                  Scale local model context buffers from 2k to 32k+ tokens with custom Modelfiles and KV cache optimization.
                </p>
                <span className="card-link">
                  Read guide <span aria-hidden="true">→</span>
                </span>
              </Link>
            </div>
          </section>

          {/* Featured Repositories (Liquid Cards) */}
          <section className="topic-section" aria-labelledby="featured-repos">
            <h2 id="featured-repos" className="topic-section-title">
              Open-source AI &amp; agent frameworks
            </h2>
            <p style={{ fontSize: '14.5px', color: '#64748b', margin: '4px 0 20px' }}>
              Curated local LLM agents, token optimization proxies, and retrieval backends with plain-English architecture write-ups.
            </p>

            <div className="repo-liquid-grid" style={{ margin: 0 }}>
              {aiRepos.map((repo) => (
                <Link key={repo.slug} className="liquid-card" href={`/repos/${repo.slug}`}>
                  <div className="liquid-card-inner">
                    {repo.image ? (
                      <div className="liquid-card-media">
                        <Image
                          src={repo.image}
                          alt={`${repo.name} architecture overview`}
                          fill
                          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                          className="liquid-card-img"
                        />
                        <div className="liquid-card-overlay" />
                      </div>
                    ) : (
                      <div className="liquid-mesh" />
                    )}
                    <div className="liquid-card-badges">
                      <span className="liquid-badge">{repo.category}</span>
                      {repo.stars && <span className="liquid-badge liquid-badge--star">⭐ {repo.stars}</span>}
                    </div>
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
              ))}
            </div>
          </section>

          {/* In-Depth Editorial Analysis */}
          <section className="topic-section" aria-labelledby="ai-architecture-guide">
            <div className="editorial-feature-card">
              <span className="card-eyebrow">Architectural Blueprint</span>
              <h3 id="ai-architecture-guide">Local Model Serving vs. Hosted Cloud APIs in 2026</h3>
              <p>
                Running open-weight models yourself or paying for a hosted API is mostly a trade-off between control, cost and maintenance. These are the three questions worth answering first.
              </p>
              <div className="editorial-feature-columns">
                <div className="editorial-column-item">
                  <h4>⚡ Will it fit and be fast enough?</h4>
                  <p>
                    Memory decides what you can run: the model file plus the KV cache for your context length. Speed depends on your GPU, the quantization and the model, so measure with a tool like llama-bench on your own hardware. Our <a href="/blog/running-llama-4-locally-vram-requirements-quantization">Llama 4 VRAM guide</a> shows the maths.
                  </p>
                </div>
                <div className="editorial-column-item">
                  <h4>🔒 Where does your data go?</h4>
                  <p>
                    Local runtimes such as Ollama and llama.cpp process prompts on your own machine, which helps when code or documents must not leave it. Check each tool's settings for update checks or telemetry, and keep the server bound to localhost.
                  </p>
                </div>
                <div className="editorial-column-item">
                  <h4>📦 How much context do you need?</h4>
                  <p>
                    Longer context costs memory. In Ollama you raise it with <code>num_ctx</code>, and a quantized KV cache can roughly halve its size. See <a href="/blog/how-to-increase-num-ctx-in-modelfile">how to increase num_ctx</a>.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Featured Guides Section */}
          {posts.length > 0 && (
            <section className="topic-section" aria-labelledby="featured-ai">
              <h2 id="featured-ai" className="topic-section-title">
                Featured guides &amp; articles
              </h2>
              <div className="card-grid hub-card-grid">
                {posts.slice(0, 9).map((post) => (
                  <Link
                    key={post.slug}
                    className="card card--content"
                    href={`/blog/${post.slug}`}
                  >
                    <span className="card-eyebrow">
                      {post.frontmatter.category || 'AI Tools'} · {post.frontmatter.readTime || '8 min read'}
                    </span>
                    <h3>{post.frontmatter.title}</h3>
                    <p>{post.frontmatter.description}</p>
                    <span className="card-link">
                      Read guide <span aria-hidden="true">→</span>
                    </span>
                  </Link>
                ))}
              </div>
            </section>
          )}

          {/* Frequently Asked Questions */}
          <section className="topic-section" aria-labelledby="ai-faqs">
            <h2 id="ai-faqs" className="topic-section-title">
              Frequently asked questions
            </h2>
            <p className="topic-section-desc">
              Key considerations for local model deployment, hardware planning, and runtime integration.
            </p>
            <div className="hub-faq-list">
              <details className="hub-faq-item">
                <summary className="hub-faq-trigger">
                  <span>How much VRAM is required to run DeepSeek-R1 or Llama 3 locally?</span>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><polyline points="6 9 12 15 18 9"/></svg>
                </summary>
                <div className="hub-faq-content">
                  As a rough guide, a 4-bit (Q4_K_M) model needs a little over half a gigabyte per billion parameters for its weights, plus memory for the context: about 9 GB for a 14B model and about 40 GB for a 70B model. Check the exact file size on the model's download page and leave headroom for the KV cache.
                </div>
              </details>
              <details className="hub-faq-item">
                <summary className="hub-faq-trigger">
                  <span>What is the difference between Ollama and llama.cpp?</span>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><polyline points="6 9 12 15 18 9"/></svg>
                </summary>
                <div className="hub-faq-content">
                  llama.cpp is the core low-level C/C++ inference engine that implements hardware acceleration kernels (AVX2, CUDA, Metal) and the GGUF file format. Ollama packages llama.cpp into a developer-friendly service with automatic model downloading, background daemon management, Modelfile customization, and an OpenAI-compatible REST API.
                </div>
              </details>
              <details className="hub-faq-item">
                <summary className="hub-faq-trigger">
                  <span>Are local models permitted for commercial software development?</span>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><polyline points="6 9 12 15 18 9"/></svg>
                </summary>
                <div className="hub-faq-content">
                  Yes, provided you review the individual model weight licenses. DeepSeek-R1 is released under the MIT license, and most Qwen 2.5 models use Apache 2.0, though a few sizes have their own license, so check each model card. Meta&apos;s Llama 3.3 is licensed under the Llama 3.3 Community License, which allows free commercial usage up to 700 million monthly active users.
                </div>
              </details>
            </div>
          </section>

          {/* Editorial Note (Evaluate Before You Adopt) */}
          <section className="hub-note" aria-label="How to evaluate an AI tool">
            <h2>Evaluate before you adopt</h2>
            <p>
              Stars and demo videos are starting points, not evidence of fit. Test a small, reversible workflow with real inputs. Review permissions, model and software licenses, operating costs, support for your platform, and how the tool behaves when it gets an answer wrong.
            </p>
          </section>
        </div>
      </main>

      <SiteFooter />
    </>
  );
}
