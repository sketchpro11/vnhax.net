import type { Metadata } from 'next';
import Link from 'next/link';
import SiteHeader from '@/components/SiteHeader';
import SiteFooter from '@/components/SiteFooter';
import Breadcrumbs from '@/components/Breadcrumbs';
import ReadingProgressBar from '@/components/ReadingProgressBar';
import { BRAND_CONFIG, getBreadcrumbSchema } from '@/lib/seo';

export const metadata: Metadata = {
  title: 'Disclaimer & Advertising Disclosure',
  description:
    'Official engineering disclaimer, Google AdSense advertising disclosure, AI software accuracy, and intellectual property notice for VNHAX (Virtual Next-Gen Hub for AI & eXploration).',
  alternates: {
    canonical: `${BRAND_CONFIG.siteUrl}/disclaimer`,
  },
  openGraph: {
    title: `Disclaimer & Advertising Disclosure | ${BRAND_CONFIG.shortName}`,
    description:
      'Official engineering disclaimer, Google AdSense advertising disclosure, and intellectual property notice for VNHAX.',
    url: `${BRAND_CONFIG.siteUrl}/disclaimer`,
    siteName: BRAND_CONFIG.shortName,
    type: 'website',
    images: [
      {
        url: `${BRAND_CONFIG.siteUrl}/og-image.png`,
        width: 1200,
        height: 630,
        alt: `${BRAND_CONFIG.shortName} Legal Disclaimer`,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: `Disclaimer & Advertising Disclosure | ${BRAND_CONFIG.shortName}`,
    description:
      'Official engineering disclaimer, Google AdSense advertising disclosure, and intellectual property notice for VNHAX.',
    images: [`${BRAND_CONFIG.siteUrl}/og-image.png`],
  },
};

export default function DisclaimerPage() {
  const lastUpdated = 'October 11, 2026';
  const effectiveDate = 'October 4, 2026';

  const breadcrumbSchema = getBreadcrumbSchema([
    { name: 'Home', url: '/' },
    { name: 'Disclaimer', url: '/disclaimer' },
  ]);

  return (
    <>
      <ReadingProgressBar />
      <SiteHeader variant="home" />

      <main className="policy-page">
        <article className="policy-layout">
          <div className="policy-main">
            <Breadcrumbs items={[{ label: 'Legal Disclaimer' }]} />

            <header className="policy-header">
              <div className="policy-badge-row">
                <span className="policy-version">Effective: {effectiveDate}</span>
                <span className="policy-version">Updated: {lastUpdated}</span>
              </div>
              <h1 className="policy-title">Website &amp; Engineering Disclaimer</h1>
              <p className="policy-lead">
                Please read this Disclaimer carefully before utilizing technical articles, benchmark datasets,
                code repositories, or recommendations published by VNHAX (Virtual Next-Gen Hub for AI &amp; eXploration).
              </p>
            </header>

            <div className="policy-content">
              {/* Section 1 */}
              <section className="policy-section" id="general-disclaimer">
                <h2>1. General Informational &amp; Educational Purpose</h2>
                <p>
                  All content, architectural field guides, software benchmarks, prompt harnesses, and technical tutorials
                  published on <strong>VNHAX</strong> (accessible via <code>https://vnhax.net</code>) are provided solely for
                  general informational and educational engineering research purposes.
                </p>
                <p>
                  The information provided does not constitute certified enterprise architecture advice, legal consultation,
                  financial planning, or cybersecurity guarantees. We check articles against their sources, but we make no representations or warranties of any kind—express or implied—about the
                  completeness, suitability, reliability, or accuracy of the information for your specific deployment needs.
                </p>
              </section>

              {/* Section 2 */}
              <section className="policy-section" id="adsense-advertising">
                <h2>2. Google AdSense &amp; Third-Party Advertising Disclosure</h2>
                <p>
                  VNHAX may display third-party advertisements served by <strong>Google AdSense</strong> and other ad networks
                  to cover hosting and maintenance costs.
                </p>
                <ul>
                  <li>
                    <strong>Cookies &amp; Web Beacons:</strong> Third-party vendors, including Google, use cookies (such as the DoubleClick DART cookie)
                    to serve ads based on a user&apos;s prior visits to this website or other websites across the Internet.
                  </li>
                  <li>
                    <strong>Personalized Advertising:</strong> Google&apos;s use of advertising cookies allows it and its partners to serve personalized
                    advertisements based on browsing history and contextual interests.
                  </li>
                  <li>
                    <strong>User Opt-Out:</strong> Visitors may opt out of personalized advertising at any time by visiting{' '}
                    <a
                      href="https://adssettings.google.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="policy-link"
                    >
                      Google Ads Settings (adssettings.google.com)
                    </a>
                    . Alternatively, you may opt out of third-party vendor cookies for personalized ads by visiting{' '}
                    <a
                      href="https://www.aboutads.info/choices/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="policy-link"
                    >
                      aboutads.info
                    </a>
                    .
                  </li>
                </ul>
              </section>

              {/* Section 3 */}
              <section className="policy-section" id="ai-code-accuracy">
                <h2>3. AI Models, Software &amp; Code Execution Disclaimer</h2>
                <p>
                  Artificial Intelligence tools, Large Language Models (LLMs), runtime engines, and open-source packages evolve
                  rapidly. Technical specifications, model parameters, API pricing, and context token windows reflect observed behavior
                  at the exact time of empirical testing.
                </p>
                <div className="policy-callout policy-callout--warning">
                  <strong>Production Execution Notice:</strong> All sample code, Docker configurations, scripts, and commands are provided on an
                  <strong>&quot;AS IS&quot;</strong> and <strong>&quot;AS AVAILABLE&quot;</strong> basis without warranty of any kind. You are solely
                  responsible for validating, sandboxing, and stress-testing any code prior to deployment in mission-critical or commercial environments.
                </div>
              </section>

              {/* Section 4 */}
              <section className="policy-section" id="external-links">
                <h2>4. External Links &amp; Third-Party References</h2>
                <p>
                  Throughout our documentation, VNHAX may contain links to external third-party websites, GitHub repositories, documentation
                  hubs, and model provider platforms. Such external links are provided solely for user convenience and reference.
                </p>
                <p>
                  VNHAX has no control over the content, privacy policies, operational availability, or security practices of external sites.
                  The inclusion of any outbound link does not imply endorsement, authorization, or sponsorship of the linked entity by VNHAX.
                </p>
              </section>

              {/* Section 5 */}
              <section className="policy-section" id="trademark-notice">
                <h2>5. Trademarks &amp; Intellectual Property Notice</h2>
                <p>
                  All product names, brand logos, and registered trademarks referenced on VNHAX—including but not limited to{' '}
                  <strong>OpenAI, Anthropic, Google, GitHub, xAI, Meta, Microsoft, Apple, NVIDIA</strong>, and others—are the sole property
                  of their respective copyright and trademark owners.
                </p>
                <p>
                  Use of these trademarks, service marks, or logos on VNHAX is strictly for editorial identification, descriptive analysis,
                  and educational evaluation purposes under fair use doctrine. VNHAX is an independent engineering platform and is not affiliated
                  with, endorsed by, or sponsored by these trademark holders unless explicitly disclosed.
                </p>
              </section>

              {/* Section 6 */}
              <section className="policy-section" id="limitation-of-liability">
                <h2>6. Limitation of Liability</h2>
                <p>
                  In no event shall VNHAX, its contributors, editors, or developers be held liable for any direct, indirect, incidental,
                  consequential, punitive, or special damages arising out of or in connection with:
                </p>
                <ul>
                  <li>Your access to or inability to access our website or services.</li>
                  <li>Any unexpected cloud compute expenses, API credit exhaustion, or GPU inference bills incurred by running code or architectures described on this site.</li>
                  <li>Data loss, system downtime, security vulnerabilities, or infrastructure failures resulting from implementing third-party packages or scripts.</li>
                  <li>Any reliance placed on the completeness or accuracy of published benchmark statistics or technical teardowns.</li>
                </ul>
              </section>

              {/* Section 7 */}
              <section className="policy-section" id="consent-updates">
                <h2>7. User Consent &amp; Policy Updates</h2>
                <p>
                  By using VNHAX, you hereby acknowledge and agree to this Disclaimer and all terms articulated herein. We reserve the right
                  to amend, update, or revise this document at any time without prior individual notice. Revisions become effective immediately
                  upon publication on this page with an updated timestamp.
                </p>
              </section>

              {/* Section 8 */}
              <section className="policy-section" id="contact-inquiries">
                <h2>8. Legal &amp; Editorial Inquiries</h2>
                <p>
                  If you require clarification regarding this Disclaimer, notice any factual errata, or wish to submit a DMCA or trademark
                  inquiry, please contact our editorial desk:
                </p>
                <ul>
                  <li>
                    <strong>Online Contact Desk:</strong>{' '}
                    <Link href="/contact" className="policy-link">
                      VNHAX Contact &amp; Support Form
                    </Link>
                  </li>
                  <li>
                    <strong>Official Inquiries:</strong> <a href="mailto:contact@vnhax.net">contact@vnhax.net</a>
                  </li>
                </ul>
              </section>
            </div>
          </div>

          {/* Sidebar / Quick Navigation */}
          <aside className="policy-sidebar" aria-label="Legal & Policy Navigation">
            <div className="policy-toc">
              <span className="policy-toc-title">Compliance &amp; Legal Hub</span>
              <nav className="policy-toc-list">
                <Link href="/privacy-policy" className="policy-toc-link">
                  <span className="policy-toc-num">01</span>
                  <span>Privacy Policy</span>
                </Link>
                <Link href="/terms" className="policy-toc-link">
                  <span className="policy-toc-num">02</span>
                  <span>Terms and Conditions</span>
                </Link>
                <Link href="/about" className="policy-toc-link">
                  <span className="policy-toc-num">03</span>
                  <span>About Us &amp; Editorial</span>
                </Link>
                <Link href="/contact" className="policy-toc-link">
                  <span className="policy-toc-num">04</span>
                  <span>Contact Us &amp; Errata</span>
                </Link>
                <Link href="/disclaimer" className="policy-toc-link active">
                  <span className="policy-toc-num">05</span>
                  <span>Disclaimer &amp; AdSense</span>
                </Link>
              </nav>

              <div style={{ marginTop: '24px', paddingTop: '16px', borderTop: '1px solid #e2e8f0' }}>
                <span style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.06em', color: '#64748b', fontWeight: 600 }}>
                  Quick Action
                </span>
                <p style={{ fontSize: '13px', color: '#475569', margin: '8px 0 14px' }}>
                  Have questions about our editorial policies or code licensing?
                </p>
                <Link
                  href="/contact"
                  className="google-btn-secondary"
                  style={{ display: 'block', textAlign: 'center', width: '100%', boxSizing: 'border-box' }}
                >
                  Reach Out to Editorial Desk
                </Link>
              </div>
            </div>
          </aside>
        </article>
      </main>

      <SiteFooter />
    </>
  );
}
