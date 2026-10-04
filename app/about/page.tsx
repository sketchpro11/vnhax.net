import type { Metadata } from 'next';
import Link from 'next/link';
import SiteHeader from '@/components/SiteHeader';
import SiteFooter from '@/components/SiteFooter';
import Breadcrumbs from '@/components/Breadcrumbs';
import ReadingProgressBar from '@/components/ReadingProgressBar';
import AboutTableOfContents from '@/components/AboutTableOfContents';
import { BRAND_CONFIG, getBreadcrumbSchema } from '@/lib/seo';

export const metadata: Metadata = {
  title: 'About VNHAX — Virtual Next-Gen Hub for AI & eXploration',
  description:
    'About VNHAX (Virtual Next-Gen Hub for AI & eXploration). Discover our editorial mission, physical hardware testing lab, open-source AI benchmarks, and ethical engineering standards.',
  alternates: {
    canonical: `${BRAND_CONFIG.siteUrl}/about`,
  },
  openGraph: {
    title: `About VNHAX — Virtual Next-Gen Hub for AI & eXploration`,
    description:
      'Discover our editorial mission, physical hardware testing methodology, local LLM benchmarks, and ethical open-source standards on VNHAX.',
    url: `${BRAND_CONFIG.siteUrl}/about`,
    siteName: BRAND_CONFIG.shortName,
    type: 'website',
    images: [
      {
        url: `${BRAND_CONFIG.siteUrl}/og-image.png`,
        width: 1200,
        height: 630,
        alt: `${BRAND_CONFIG.shortName} Editorial Desk`,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: `About VNHAX — Virtual Next-Gen Hub for AI & eXploration`,
    description:
      'Developer-grade AI model benchmarks, open-source repository deep dives, and physical hardware lab verification.',
    images: [`${BRAND_CONFIG.siteUrl}/og-image.png`],
  },
};

export default function AboutPage() {
  const lastUpdated = 'October 2, 2026';
  const effectiveDate = 'January 15, 2025';

  const breadcrumbSchema = getBreadcrumbSchema([
    { name: 'Home', url: '/' },
    { name: 'About VNHAX', url: '/about' },
  ]);

  const aboutSchema = {
    '@context': 'https://schema.org',
    '@type': 'AboutPage',
    '@id': `${BRAND_CONFIG.siteUrl}/about/#about`,
    url: `${BRAND_CONFIG.siteUrl}/about`,
    name: 'About VNHAX (Virtual Next-Gen Hub for AI & eXploration)',
    description: BRAND_CONFIG.description,
    mainEntity: {
      '@type': 'Organization',
      name: BRAND_CONFIG.shortName,
      alternateName: BRAND_CONFIG.acronymExplanation,
      url: BRAND_CONFIG.siteUrl,
      logo: `${BRAND_CONFIG.siteUrl}/favicon.ico`,
      sameAs: BRAND_CONFIG.socialLinks,
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(aboutSchema) }}
      />

      <ReadingProgressBar />
      <SiteHeader variant="home" />

      <main className="policy-page">
        <article className="policy-layout">
          <div className="policy-main">
            <Breadcrumbs items={[{ label: 'About Us' }]} />

            {/* Document Header */}
            <header className="policy-header">
              <div className="policy-badge-row">
                <span className="policy-badge policy-badge--verified">
                  ✓ E-E-A-T Verified Standards
                </span>
                <span className="policy-badge">
                  AI &amp; Systems Engineering
                </span>
                <span className="policy-badge">
                  100% Ethical &amp; Open Source
                </span>
              </div>

              <h1 className="policy-title">About VNHAX</h1>

              <p className="policy-lead">
                <strong>VNHAX (Virtual Next-Gen Hub for AI &amp; eXploration)</strong>, operating online at{' '}
                <a href="https://vnhax.net/" target="_blank" rel="noopener noreferrer">https://vnhax.net/</a>, is an independent technical engineering publication and research portal. Our mission is to deliver developer-grade documentation, open-source AI deployment tutorials, real-hardware inference benchmarks, and zero-bloat UI component architectures.
              </p>

              <div className="policy-meta-bar">
                <div className="policy-meta-item">
                  <span>Last Updated:</span>
                  <strong><time dateTime="2026-10-02">{lastUpdated}</time></strong>
                </div>
                <div className="policy-meta-item">
                  <span>Effective Date:</span>
                  <strong>{effectiveDate}</strong>
                </div>
                <div className="policy-meta-item">
                  <span>Governed Domain:</span>
                  <strong>vnhax.net</strong>
                </div>
              </div>
            </header>

            {/* Visual Highlight Cards */}
            <div className="policy-highlight-grid">
              <div className="policy-highlight-card">
                <div className="policy-highlight-icon">🔬</div>
                <h2 className="policy-highlight-title">100% Hardware Tested</h2>
                <p className="policy-highlight-desc">
                  Every tutorial, command, and benchmark is physically validated in our laboratory on NVIDIA RTX &amp; Apple Silicon hardware.
                </p>
              </div>

              <div className="policy-highlight-card">
                <div className="policy-highlight-icon">🔓</div>
                <h2 className="policy-highlight-title">Zero Paywalls or Popups</h2>
                <p className="policy-highlight-desc">
                  All technical guides, architecture diagrams, and UI components are free to read and freely usable under permissive licenses.
                </p>
              </div>

              <div className="policy-highlight-card">
                <div className="policy-highlight-icon">🛡️</div>
                <h2 className="policy-highlight-title">Ethical &amp; Compliant</h2>
                <p className="policy-highlight-desc">
                  Strict anti-piracy policies, zero game cheats/cracks, and full compliance with Google AdSense, GDPR, and CCPA standards.
                </p>
              </div>
            </div>

            {/* Prose Content */}
            <div className="policy-content">
              {/* SECTION 1 */}
              <section id="brand-mission" className="policy-section">
                <div className="policy-section-header">
                  <span className="policy-section-number">01</span>
                  <h2 className="policy-section-title">Brand Definition &amp; Core Mission</h2>
                </div>
                <p>
                  Technology and machine learning systems evolve at breakneck speeds. Our mission at <strong>VNHAX (Virtual Next-Gen Hub for AI &amp; eXploration)</strong> is to cut through superficial marketing hype, analyze the underlying systems architecture, and provide developers, engineers, and machine learning researchers with free, high-signal technical resources.
                </p>
                <p>
                  <strong>The Name Behind VNHAX:</strong> We explicitly define that <strong>&quot;VNHAX&quot; stands for Virtual Next-Gen Hub for AI &amp; eXploration</strong>. The moniker reflects our role as a virtual crossroads where next-generation artificial intelligence research meets production software engineering realities. We bridge the critical gap between academic ML whitepapers and practical terminal deployments.
                </p>
                <p>
                  Everything published on VNHAX is completely free to read, and our interface components, scripts, and code snippets are freely usable in personal, academic, and commercial workflows without gatekeeping or subscription fees.
                </p>
              </section>

              {/* SECTION 2 */}
              <section id="editorial-pillars" className="policy-section">
                <div className="policy-section-header">
                  <span className="policy-section-number">02</span>
                  <h2 className="policy-section-title">The Three Engineering Pillars</h2>
                </div>
                <p>
                  We reject clickbait headlines and speculative AI hype. Every article, architectural diagram, and code sample published on VNHAX is strictly organized around one of our three core engineering pillars:
                </p>

                <div className="about-pillars-grid" style={{ marginBottom: '24px' }}>
                  <div className="about-pillar-card">
                    <div className="about-pillar-icon" aria-hidden="true">🧠</div>
                    <h3 className="about-pillar-title">AI &amp; Model Architectures</h3>
                    <p className="about-pillar-desc">
                      Rigorous deep dives into local inference runtimes, quantization mathematics, memory caching, and multi-modal generation.
                    </p>
                    <ul className="about-pillar-list">
                      <li>Local runtimes (Ollama, llama.cpp, vLLM)</li>
                      <li>GGUF, AWQ, and EXL2 weight quantization</li>
                      <li>ComfyUI diffusion nodes &amp; Flux workflows</li>
                      <li>KV cache offloading &amp; RoPE scaling</li>
                    </ul>
                  </div>

                  <div className="about-pillar-card">
                    <div className="about-pillar-icon" aria-hidden="true">⚡</div>
                    <h3 className="about-pillar-title">Curated Open-Source Tooling</h3>
                    <p className="about-pillar-desc">
                      Thorough architectural audits of active GitHub repositories that solve genuine engineering bottlenecks for developers.
                    </p>
                    <ul className="about-pillar-list">
                      <li>Autonomous coding agents (Aider, Cline, OpenHands)</li>
                      <li>Model Context Protocol (MCP) clients &amp; servers</li>
                      <li>Tree-sitter AST codebase indexing &amp; git loops</li>
                      <li>Permissive licensing (MIT, Apache-2.0, BSD)</li>
                    </ul>
                  </div>

                  <div className="about-pillar-card">
                    <div className="about-pillar-icon" aria-hidden="true">🎨</div>
                    <h3 className="about-pillar-title">Frontend &amp; Modern UI</h3>
                    <p className="about-pillar-desc">
                      Clean, production-grade interface components engineered for blistering performance, zero dependency bloat, and standard CSS.
                    </p>
                    <ul className="about-pillar-list">
                      <li>Next.js 16 App Router &amp; React 19 architecture</li>
                      <li>Zero-runtime CSS variables &amp; fluid typography</li>
                      <li>Semantic HTML5, WCAG accessibility, and SEO</li>
                      <li>Copy-paste ready, modular UI starters</li>
                    </ul>
                  </div>
                </div>
              </section>

              {/* SECTION 3 */}
              <section id="hardware-lab" className="policy-section">
                <div className="policy-section-header">
                  <span className="policy-section-number">03</span>
                  <h2 className="policy-section-title">Physical Hardware Testing Lab (E-E-A-T)</h2>
                </div>
                <p>
                  In compliance with Google Search and Google AdSense <strong>E-E-A-T (Experience, Expertise, Authoritativeness, and Trustworthiness)</strong> quality standards, VNHAX holds a strict requirement of first-hand experience and empirical reproducibility.
                </p>
                <p>
                  We do not publish speculative guides or theoretical synthetic text. Every command, model parameter, configuration flag, and shell script is physically executed and measured across our laboratory testbeds before reaching our readers.
                </p>

                <div className="about-lab-box" style={{ margin: '24px 0' }}>
                  <div className="about-lab-header">
                    <span className="about-lab-icon" aria-hidden="true">🔬</span>
                    <h3 className="about-lab-title">Laboratory Testbeds &amp; Telemetry Matrix</h3>
                  </div>
                  <p className="about-lab-desc">
                    Our physical lab maintains dedicated hardware environments to capture accurate VRAM telemetry, tokens-per-second throughput, and thermal performance:
                  </p>

                  <div className="about-lab-grid">
                    <div className="about-lab-card">
                      <h4 className="about-lab-card-title">Dedicated GPU Testbeds</h4>
                      <p className="about-lab-card-text">
                        NVIDIA RTX Ada Lovelace and Ampere architectures running full CUDA 12.x toolchains for accurate VRAM profiling and batching benchmarks.
                      </p>
                    </div>

                    <div className="about-lab-card">
                      <h4 className="about-lab-card-title">Apple Silicon Unified RAM</h4>
                      <p className="about-lab-card-text">
                        M-series Max/Pro chips with unified memory to evaluate Metal acceleration, MLX runtimes, and local developer mobility.
                      </p>
                    </div>

                    <div className="about-lab-card">
                      <h4 className="about-lab-card-title">Hermetic Isolation</h4>
                      <p className="about-lab-card-text">
                        Isolated in clean Docker containers and fresh Python virtual environments (`uv`, `venv`) to guarantee dependency isolation and zero pollution.
                      </p>
                    </div>

                    <div className="about-lab-card">
                      <h4 className="about-lab-card-title">Upstream Commit Pinning</h4>
                      <p className="about-lab-card-text">
                        Every tutorial records exact upstream Git commit hashes and runtime versions so you can reproduce benchmarks with 100% precision.
                      </p>
                    </div>
                  </div>
                </div>
              </section>

              {/* SECTION 4 */}
              <section id="anti-piracy-standards" className="policy-section">
                <div className="policy-section-header">
                  <span className="policy-section-number">04</span>
                  <h2 className="policy-section-title">Strict Ethical Standards &amp; Anti-Piracy Policy</h2>
                </div>
                <div className="policy-adsense-box" style={{ background: '#f0fdf4', borderColor: '#bbf7d0', borderLeftColor: '#16a34a' }}>
                  <div className="policy-adsense-box-title" style={{ color: '#14532d' }}>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10" />
                    </svg>
                    <span>Publisher Compliance: Ethical Software &amp; Zero Piracy Declaration</span>
                  </div>
                  <p style={{ color: '#166534' }}>
                    <strong>Zero Tolerance for Piracy, Warez, or Game Exploits:</strong> VNHAX exclusively publishes legitimate, educational software engineering tutorials, open-source architectures, and official developer API implementations. We strictly prohibit, reject, and maintain zero tolerance for pirated software, cracked license keys, video game exploits, game hacks, or malicious network intrusion tools.
                  </p>
                  <p style={{ color: '#166534' }}>
                    <strong>Clarification of Brand Name (&quot;VNHAX&quot;):</strong> We explicitly clarify to our readers, partners, and Google AdSense compliance reviewers that <strong>VNHAX is an acronym for &quot;Virtual Next-Gen Hub for AI &amp; eXploration&quot;</strong>. The acronym represents a forward-looking virtual hub for engineering innovation and technical exploration. It has <strong>no association, affiliation, or alignment</strong> with software cracking, illegal hacking, or illicit digital bypasses.
                  </p>
                </div>
                <p>
                  All open-source repositories reviewed on our platform are verified for legitimate open-source licensing (MIT, Apache 2.0, GPL, BSD). We do not promote or host closed-source proprietary binaries, unauthorized modifications, or copyright-infringing downloads.
                </p>
              </section>

              {/* SECTION 5 */}
              <section id="engineering-leadership" className="policy-section">
                <div className="policy-section-header">
                  <span className="policy-section-number">05</span>
                  <h2 className="policy-section-title">The Engineering Perspective Behind VNHAX</h2>
                </div>
                <p>
                  VNHAX was founded by software engineers who spend their days building distributed web applications, optimizing inference pipelines, and contributing to open-source software. Meet our technical leadership:
                </p>

                <div className="about-team-card" style={{ margin: '24px 0' }}>
                  <div className="about-team-avatar" aria-hidden="true">
                    UH
                  </div>
                  <div className="about-team-info">
                    <h3 className="about-team-name">Umar Hashmi</h3>
                    <div className="about-team-role">Founder, Systems Architect &amp; Lead Technical Editor</div>
                    <p className="about-team-bio">
                      Umar is a seasoned software engineer and technical architect focused on local machine learning infrastructure, high-concurrency web systems, and modern developer interfaces. With extensive hands-on experience deploying open-source LLMs, building resilient Next.js architectures, and automating development workflows, Umar founded VNHAX to provide the global developer community with transparent, physically verified engineering knowledge free of corporate fluff.
                    </p>
                    <div className="about-team-tags">
                      <span className="about-team-tag">Distributed Systems</span>
                      <span className="about-team-tag">Local LLM Inference</span>
                      <span className="about-team-tag">Next.js &amp; React 19</span>
                      <span className="about-team-tag">Open-Source Tooling</span>
                      <span className="about-team-tag">CUDA &amp; Hardware Benchmarks</span>
                    </div>
                  </div>
                </div>
              </section>

              {/* SECTION 6 */}
              <section id="core-values" className="policy-section">
                <div className="policy-section-header">
                  <span className="policy-section-number">06</span>
                  <h2 className="policy-section-title">Values That Guide Every Publication</h2>
                </div>
                <p>
                  Four core engineering principles govern every technical article, benchmark, and flowchart published on VNHAX:
                </p>

                <div className="about-values-grid" style={{ margin: '24px 0' }}>
                  <div className="about-value-card">
                    <div className="about-value-icon" aria-hidden="true">🎯</div>
                    <h3 className="about-value-title">Signal Over Hype</h3>
                    <p className="about-value-desc">
                      We don&apos;t chase speculative press releases. We focus strictly on shipped code, verifiable benchmarks, and real architectural impact.
                    </p>
                  </div>

                  <div className="about-value-card">
                    <div className="about-value-icon" aria-hidden="true">🛠️</div>
                    <h3 className="about-value-title">100% Reproducible</h3>
                    <p className="about-value-desc">
                      Every snippet, config file, and tutorial is verified step-by-step so that developers can replicate results without frustration.
                    </p>
                  </div>

                  <div className="about-value-card">
                    <div className="about-value-icon" aria-hidden="true">🌐</div>
                    <h3 className="about-value-title">Open &amp; Accessible</h3>
                    <p className="about-value-desc">
                      No paywalls, mandatory account registrations, or gatekept knowledge. All research is freely accessible to the global community.
                    </p>
                  </div>

                  <div className="about-value-card">
                    <div className="about-value-icon" aria-hidden="true">🔒</div>
                    <h3 className="about-value-title">Privacy-First Standards</h3>
                    <p className="about-value-desc">
                      Zero reader data selling. Fully compliant with Google AdSense disclosures, GDPR user rights, CCPA opt-outs, and COPPA protections.
                    </p>
                  </div>
                </div>
              </section>

              {/* SECTION 7 */}
              <section id="trademarks-fairuse" className="policy-section">
                <div className="policy-section-header">
                  <span className="policy-section-number">07</span>
                  <h2 className="policy-section-title">Trademarks, Fair Use &amp; Open Licensing</h2>
                </div>
                <p>
                  <strong>VNHAX (Virtual Next-Gen Hub for AI &amp; eXploration)</strong> is an independent digital publication. We are not officially affiliated with, endorsed by, or sponsored by OpenAI, Anthropic, Google, GitHub, Meta, Microsoft, or any open-source software foundation mentioned.
                </p>
                <p>
                  All product names, corporate logos, repository trademarks, and registered brand identities referenced across our reviews are used strictly for editorial identification and descriptive purposes under the nominative fair use doctrine. All analyzed codebases remain the property of their respective upstream authors under open-source licenses.
                </p>
              </section>

              {/* SECTION 8 */}
              <section id="editorial-contact" className="policy-section">
                <div className="policy-section-header">
                  <span className="policy-section-number">08</span>
                  <h2 className="policy-section-title">Connect with Our Editorial Desk</h2>
                </div>
                <p>
                  We actively collaborate with open-source maintainers, AI researchers, and developers. Reach out to our team through our verified channels:
                </p>
                <ul>
                  <li><strong>General Editorial Inquiries:</strong> <a href="mailto:hello@vnhax.net">hello@vnhax.net</a></li>
                  <li><strong>Technical Errata &amp; Code Corrections:</strong> <a href="mailto:feedback@vnhax.net">feedback@vnhax.net</a></li>
                  <li><strong>Partnerships &amp; Media:</strong> <a href="mailto:partners@vnhax.net">partners@vnhax.net</a></li>
                  <li><strong>Interactive Contact Form:</strong> Visit our <Link href="/contact">Official Contact Page</Link></li>
                  <li><strong>Legal &amp; Terms:</strong> Review our <Link href="/terms">Terms of Service</Link> and <Link href="/privacy-policy">Privacy Policy</Link></li>
                </ul>
              </section>
            </div>
          </div>

          {/* Sticky Interactive Sidebar Component */}
          <AboutTableOfContents />
        </article>
      </main>

      <SiteFooter />
    </>
  );
}
