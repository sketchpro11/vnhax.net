import type { Metadata } from 'next';
import Link from 'next/link';
import SiteHeader from '@/components/SiteHeader';
import SiteFooter from '@/components/SiteFooter';
import Breadcrumbs from '@/components/Breadcrumbs';
import ReadingProgressBar from '@/components/ReadingProgressBar';
import TermsTableOfContents from '@/components/TermsTableOfContents';
import { BRAND_CONFIG, getBreadcrumbSchema } from '@/lib/seo';

export const metadata: Metadata = {
  title: 'Terms of Service',
  description:
    'Terms of Service, educational software licenses, "As-Is" hardware execution disclaimers, and liability limitations for VNHAX (Virtual Next-Gen Hub for AI & eXploration).',
  alternates: {
    canonical: `${BRAND_CONFIG.siteUrl}/terms`,
  },
  openGraph: {
    title: `Terms of Service | ${BRAND_CONFIG.shortName}`,
    description:
      'Legal terms, open-source code usage policies, hardware execution disclaimers, and DMCA safe harbor guidelines on VNHAX.',
    url: `${BRAND_CONFIG.siteUrl}/terms`,
    siteName: BRAND_CONFIG.shortName,
    type: 'website',
    images: [
      {
        url: `${BRAND_CONFIG.siteUrl}/og-image.png`,
        width: 1200,
        height: 630,
        alt: `${BRAND_CONFIG.shortName} Terms of Service`,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: `Terms of Service | ${BRAND_CONFIG.shortName}`,
    description:
      'Educational software licenses, "As-Is" hardware execution disclaimers, and liability limitations for VNHAX.',
    images: [`${BRAND_CONFIG.siteUrl}/og-image.png`],
  },
};

export default function TermsPage() {
  const lastUpdated = 'October 2, 2026';
  const effectiveDate = 'January 15, 2025';

  const breadcrumbSchema = getBreadcrumbSchema([
    { name: 'Home', url: '/' },
    { name: 'Terms of Service', url: '/terms' },
  ]);

  return (
    <>
      <ReadingProgressBar />
      <SiteHeader variant="home" />

      <main className="policy-page">
        <article className="policy-layout">
          <div className="policy-main">
            <Breadcrumbs items={[{ label: 'Terms of Service' }]} />

            {/* Document Header */}
            <header className="policy-header">
              <div className="policy-badge-row">
                <span className="policy-badge policy-badge--verified">
                  ✓ Legal Compliance Verified
                </span>
                <span className="policy-badge">
                  Open-Source Safe Harbor
                </span>
                <span className="policy-badge">
                  AdSense Publisher Standard
                </span>
              </div>

              <h1 className="policy-title">Terms of Service &amp; Disclaimer</h1>

              <p className="policy-lead">
                Welcome to <strong>VNHAX (Virtual Next-Gen Hub for AI &amp; eXploration)</strong>, accessible online at{' '}
                <a href="https://vnhax.net/" target="_blank" rel="noopener noreferrer">https://vnhax.net/</a>. These Terms of Service and Engineering Disclaimers govern your access to and use of our technical publications, architectural diagrams, open-source code snippets, and developer resources. Please review these terms carefully prior to utilizing code, terminal commands, or hardware configurations discussed on this website.
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
                  <span>Governed Entity:</span>
                  <strong>VNHAX Media (vnhax.net)</strong>
                </div>
              </div>
            </header>

            {/* Visual Highlight Cards */}
            <div className="policy-highlight-grid">
              <div className="policy-highlight-card">
                <div className="policy-highlight-icon">💻</div>
                <h2 className="policy-highlight-title">&quot;As-Is&quot; Code License</h2>
                <p className="policy-highlight-desc">
                  All scripts, shell commands, and configs are provided strictly for educational study without warranty or commercial guarantees.
                </p>
              </div>

              <div className="policy-highlight-card">
                <div className="policy-highlight-icon">🔓</div>
                <h2 className="policy-highlight-title">Open-Source Respect</h2>
                <p className="policy-highlight-desc">
                  Third-party repositories (Ollama, ComfyUI, llama.cpp) remain strictly under their upstream licenses (MIT, Apache 2.0, GPL).
                </p>
              </div>

              <div className="policy-highlight-card">
                <div className="policy-highlight-icon">🛡️</div>
                <h2 className="policy-highlight-title">Limited Liability</h2>
                <p className="policy-highlight-desc">
                  Zero liability for hardware thermal throttling, GPU driver panics, cloud token costs, or system downtime.
                </p>
              </div>
            </div>

            {/* Document Content */}
            <div className="policy-content">
              {/* SECTION 1 */}
              <section id="agreement-to-terms" className="policy-section">
                <div className="policy-section-header">
                  <span className="policy-section-number">01</span>
                  <h2 className="policy-section-title">Agreement &amp; Acceptance of Terms</h2>
                </div>
                <p>
                  By accessing, browsing, reading, or programmatically querying <strong>VNHAX (Virtual Next-Gen Hub for AI &amp; eXploration)</strong> at <code>https://vnhax.net/</code> (&quot;VNHAX&quot;, &quot;we&quot;, &quot;our&quot;, &quot;us&quot;, or &quot;the Platform&quot;), you acknowledge that you have read, understood, and agree to be legally bound by these Terms of Service, along with our <Link href="/privacy-policy">Privacy Policy</Link>.
                </p>
                <p>
                  These Terms constitute a binding legal agreement between you (&quot;User&quot;, &quot;Visitor&quot;, or &quot;Developer&quot;) and VNHAX Media. If you do not agree to all terms and conditions set forth herein, you must immediately cease accessing and using the site and its associated technical materials.
                </p>
              </section>

              {/* SECTION 2 */}
              <section id="intellectual-property" className="policy-section">
                <div className="policy-section-header">
                  <span className="policy-section-number">02</span>
                  <h2 className="policy-section-title">Intellectual Property &amp; Educational Licensing</h2>
                </div>
                <p>
                  <strong>Original Publications &amp; Editorial Content:</strong> All original articles, technical architectural analyses, custom Mermaid/SVG system flowcharts, editorial benchmarks, and site design published on VNHAX are the exclusive intellectual property of VNHAX and its contributors, protected under international copyright, trademark, and intellectual property conventions.
                </p>
                <p>
                  <strong>Code Snippets &amp; UI Starter Usage:</strong> Source code snippets, shell scripts, and UI component starter files authored directly by VNHAX are provided under an open educational license. You are granted a non-exclusive, worldwide, royalty-free license to inspect, copy, modify, and incorporate these snippets into your personal, research, or commercial software projects. Attribution is appreciated but not legally mandatory for small code fragments.
                </p>
                <p>
                  <strong>Third-Party Open-Source Repositories:</strong> VNHAX frequently reviews and analyzes upstream open-source software (such as Ollama, llama.cpp, ComfyUI, LangChain, Cline, and Aider). All third-party software retains the original copyright and licensing granted by its respective upstream authors (e.g., MIT, Apache-2.0, GNU GPL, or BSD licenses). VNHAX claims no ownership over upstream projects.
                </p>
                <p>
                  <strong>Trademarks &amp; Nominative Fair Use:</strong> All product names, logos, corporate trademarks, and repository identities (including GitHub, Google, Anthropic, OpenAI, Meta, Microsoft, and NVIDIA) referenced across VNHAX are used exclusively for editorial descriptive identification under the nominative fair use doctrine. VNHAX is an independent publication and has no formal endorsement or corporate affiliation with these trademark holders.
                </p>
              </section>

              {/* SECTION 3 */}
              <section id="as-is-disclaimer" className="policy-section">
                <div className="policy-section-header">
                  <span className="policy-section-number">03</span>
                  <h2 className="policy-section-title">&quot;As-Is&quot; Engineering &amp; Execution Disclaimer</h2>
                </div>
                <div className="callout-box callout-box--warning">
                  <div className="callout-icon">⚠️</div>
                  <div className="callout-content">
                    <strong>Critical Engineering Notice:</strong>
                    <span>
                      All technical analyses, benchmarks, terminal commands, Dockerfiles, and Python scripts on VNHAX are provided on an <strong>&quot;AS IS&quot; AND &quot;AS AVAILABLE&quot; BASIS, WITHOUT WARRANTIES OF ANY KIND</strong>, either express or implied, including but not limited to the implied warranties of merchantability, fitness for a particular purpose, non-infringement, or architectural stability.
                    </span>
                  </div>
                </div>
                <p>
                  Modern artificial intelligence tooling, CUDA driver dependencies, Python runtime environments, and open-source models update with extreme velocity. Commands or parameters that functioned at the time of publication may change, deprecate, or produce unexpected behaviors across differing operating systems or hardware revisions.
                </p>
                <p>
                  <strong>Sandbox Testing Requirement:</strong> You acknowledge that you are solely responsible for verifying and testing all commands, dependencies, and model weights in an isolated sandbox or containerized environment prior to any production execution or deployment. VNHAX does not warrant that code snippets will be uninterrupted, error-free, or devoid of upstream vulnerabilities.
                </p>
              </section>

              {/* SECTION 4 */}
              <section id="hardware-model-risks" className="policy-section">
                <div className="policy-section-header">
                  <span className="policy-section-number">04</span>
                  <h2 className="policy-section-title">Hardware, GPU &amp; Model Execution Risks</h2>
                </div>
                <p>
                  Executing local deep learning models, GGUF/AWQ quantizations, image diffusion pipelines, or context window expansions (`num_ctx`) places substantial demands on client physical hardware:
                </p>
                <ul>
                  <li><strong>Thermal &amp; VRAM Demands:</strong> Sustained GPU compute workloads produce significant thermal output and memory pressure. You are responsible for ensuring adequate system cooling, power supply headroom, and thermal dissipation.</li>
                  <li><strong>Driver &amp; Kernel Panics:</strong> Low-level memory mapping (such as Unified Memory offloading or mmap operations) may trigger system instability or kernel crashes on unsupported hardware.</li>
                  <li><strong>Cloud &amp; Token Incurred Costs:</strong> If configuring automated agents (such as Aider or Cline) with commercial API keys (OpenAI, Anthropic, Google Cloud), you are entirely responsible for monitoring token consumption, setting spending limits, and auditing recursive tool invocation loops.</li>
                </ul>
                <p>
                  Under no circumstances shall VNHAX be held responsible for hardware degradation, hardware thermal failure, electricity consumption spikes, or commercial API billing charges incurred through your execution of models or scripts.
                </p>
              </section>

              {/* SECTION 5 */}
              <section id="outbound-links" className="policy-section">
                <div className="policy-section-header">
                  <span className="policy-section-number">05</span>
                  <h2 className="policy-section-title">Third-Party Repositories &amp; External Links</h2>
                </div>
                <p>
                  Our articles contain hyperlinks to third-party websites, external documentation, Hugging Face model repositories, arXiv research papers, and GitHub source code repositories.
                </p>
                <p>
                  <strong>No Control or Endorsement:</strong> VNHAX has no control over, and assumes no responsibility for, the content, code integrity, license changes, security vulnerabilities, or privacy practices of any third-party websites or services. The inclusion of an outbound hyperlink does not imply endorsement, affiliation, or verification of the external destination.
                </p>
                <p>
                  We encourage you to review the terms of service, software licenses, and privacy statements of any external repository or website before cloning code or transmitting personal data.
                </p>
              </section>

              {/* SECTION 6 */}
              <section id="prohibited-conduct" className="policy-section">
                <div className="policy-section-header">
                  <span className="policy-section-number">06</span>
                  <h2 className="policy-section-title">Prohibited Activities &amp; Infrastructure Protection</h2>
                </div>
                <p>
                  To preserve the availability, performance, and security of VNHAX for the global engineering community, you agree not to engage in any of the following prohibited behaviors:
                </p>
                <ul>
                  <li><strong>Aggressive Scraping &amp; Infrastructure Denial:</strong> Deploying automated scrapers, crawlers, or headless scripts that bypass rate limits, generate excessive server load, or execute Distributed Denial of Service (DDoS) attacks against our servers.</li>
                  <li><strong>Malicious Code Injection:</strong> Transmitting, submitting, or injecting malicious payloads, viruses, Trojan horses, SQL injections, or cross-site scripting (XSS) attacks through contact forms or feedback interfaces.</li>
                  <li><strong>Reverse-Engineering the Platform:</strong> Probing, scanning, or testing the vulnerability of VNHAX infrastructure without explicit written authorization from our security team.</li>
                  <li><strong>Misrepresentation &amp; Impersonation:</strong> Falsely claiming affiliation with, sponsorship by, or official authorization from VNHAX Media.</li>
                  <li><strong>Unlawful Content Exploitation:</strong> Using our technical documentation to facilitate cybercrime, unauthorized network intrusions, game cracking, or software copyright infringement.</li>
                </ul>
                <p>
                  Violation of these security provisions may result in immediate IP banning, termination of service access, and formal notification to upstream network providers and law enforcement authorities.
                </p>
              </section>

              {/* SECTION 7 */}
              <section id="limitation-liability" className="policy-section">
                <div className="policy-section-header">
                  <span className="policy-section-number">07</span>
                  <h2 className="policy-section-title">Comprehensive Limitation of Liability</h2>
                </div>
                <p>
                  To the maximum extent permitted by applicable law, in no event shall <strong>VNHAX, its owner, authors, contributors, affiliates, or licensors</strong> be liable for any direct, indirect, incidental, consequential, special, exemplary, or punitive damages, including without limitation:
                </p>
                <ul>
                  <li>Damages for loss of profits, goodwill, use, data, or business opportunities.</li>
                  <li>Hardware damage, GPU malfunction, motherboard failure, or system downtime.</li>
                  <li>Loss or corruption of software codebases, git histories, or enterprise databases.</li>
                  <li>Costs associated with procuring substitute compute or cloud API services.</li>
                </ul>
                <p>
                  This limitation applies regardless of whether the alleged liability is based on contract, tort, negligence, strict liability, or any other legal theory, even if VNHAX has been advised of the possibility of such damage.
                </p>
              </section>

              {/* SECTION 8 */}
              <section id="indemnification" className="policy-section">
                <div className="policy-section-header">
                  <span className="policy-section-number">08</span>
                  <h2 className="policy-section-title">User Indemnification</h2>
                </div>
                <p>
                  You agree to defend, indemnify, and hold harmless VNHAX, its parent entity, editors, contributors, and agents from and against any and all claims, damages, obligations, losses, liabilities, costs, and expenses (including reasonable legal fees) arising from:
                </p>
                <ul>
                  <li>Your access to or use of the website and technical resources.</li>
                  <li>Your execution of code snippets, terminal commands, or hardware configurations.</li>
                  <li>Your violation of any provision of these Terms of Service.</li>
                  <li>Your infringement of any third-party intellectual property or privacy rights.</li>
                </ul>
              </section>

              {/* SECTION 9 */}
              <section id="governing-law" className="policy-section">
                <div className="policy-section-header">
                  <span className="policy-section-number">09</span>
                  <h2 className="policy-section-title">Governing Law, Severability &amp; Amendments</h2>
                </div>
                <p>
                  <strong>Governing Principles:</strong> These Terms shall be interpreted, construed, and enforced in accordance with standard international commercial and digital copyright principles, without giving effect to any principles of conflicts of law.
                </p>
                <p>
                  <strong>Severability:</strong> If any provision of these Terms is deemed unlawful, void, or for any reason unenforceable by a court of competent jurisdiction, then that provision shall be deemed severable from these Terms and shall not affect the validity and enforceability of any remaining provisions.
                </p>
                <p>
                  <strong>Amendments &amp; Updates:</strong> VNHAX reserves the right to modify or replace these Terms at our sole discretion at any time. When revisions occur, we will update the &quot;Last Updated&quot; timestamp at the top of this document. Your continued use of the website following the posting of changes constitutes your binding acceptance of the updated Terms.
                </p>
              </section>

              {/* SECTION 10 */}
              <section id="contact-legal" className="policy-section">
                <div className="policy-section-header">
                  <span className="policy-section-number">10</span>
                  <h2 className="policy-section-title">Legal Contact &amp; Safe Harbor Channels</h2>
                </div>
                <p>
                  For inquiries regarding licensing, terms interpretation, commercial permissions, or DMCA safe harbor notifications, please contact our legal desk:
                </p>
                <ul>
                  <li><strong>Legal Counsel &amp; Terms Inquiries:</strong> <a href="mailto:legal@vnhax.net">legal@vnhax.net</a></li>
                  <li><strong>DMCA &amp; Copyright Agent:</strong> <a href="mailto:dmca@vnhax.net">dmca@vnhax.net</a></li>
                  <li><strong>General Editorial Desk:</strong> <a href="mailto:hello@vnhax.net">hello@vnhax.net</a></li>
                  <li><strong>Web Contact Channel:</strong> Visit our <Link href="/contact">Official Contact Desk</Link></li>
                  <li><strong>Related Policy:</strong> Read our <Link href="/privacy-policy">Privacy Policy &amp; Cookie Disclosure</Link></li>
                </ul>
              </section>
            </div>
          </div>

          {/* Sticky Interactive Sidebar Component */}
          <TermsTableOfContents />
        </article>
      </main>

      <SiteFooter />
    </>
  );
}
