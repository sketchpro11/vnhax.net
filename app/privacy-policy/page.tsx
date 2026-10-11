import type { Metadata } from 'next';
import Link from 'next/link';
import SiteHeader from '@/components/SiteHeader';
import SiteFooter from '@/components/SiteFooter';
import Breadcrumbs from '@/components/Breadcrumbs';
import ReadingProgressBar from '@/components/ReadingProgressBar';
import PolicyTableOfContents from '@/components/PolicyTableOfContents';
import { BRAND_CONFIG, getBreadcrumbSchema } from '@/lib/seo';

export const metadata: Metadata = {
  title: 'Privacy Policy & Data Protection',
  description:
    'Comprehensive Privacy Policy for VNHAX (Virtual Next-Gen Hub for AI & eXploration) at vnhax.net. Compliant with Google AdSense, GDPR, CCPA, and COPPA regulations.',
  alternates: {
    canonical: `${BRAND_CONFIG.siteUrl}/privacy-policy`,
  },
  openGraph: {
    title: `Privacy Policy & Data Protection | ${BRAND_CONFIG.shortName}`,
    description:
      'Comprehensive Privacy Policy for VNHAX (Virtual Next-Gen Hub for AI & eXploration). Disclosing Google AdSense cookies, DART cookie opt-outs, GDPR, and CCPA user rights.',
    url: `${BRAND_CONFIG.siteUrl}/privacy-policy`,
    siteName: BRAND_CONFIG.shortName,
    type: 'website',
    images: [
      {
        url: `${BRAND_CONFIG.siteUrl}/og-image.png`,
        width: 1200,
        height: 630,
        alt: `${BRAND_CONFIG.shortName} Privacy Policy`,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: `Privacy Policy | ${BRAND_CONFIG.shortName}`,
    description:
      'Disclosing Google AdSense cookies, DART cookie opt-outs, log files, GDPR, and CCPA privacy protections on VNHAX.',
    images: [`${BRAND_CONFIG.siteUrl}/og-image.png`],
  },
};

export default function PrivacyPolicyPage() {
  const lastUpdated = 'October 11, 2026';
  const effectiveDate = 'October 4, 2026';

  const breadcrumbSchema = getBreadcrumbSchema([
    { name: 'Home', url: '/' },
    { name: 'Privacy Policy', url: '/privacy-policy' },
  ]);

  return (
    <>
      <ReadingProgressBar />
      <SiteHeader variant="home" />

      <main className="policy-page">
        <article className="policy-layout">
          <div className="policy-main">
            <Breadcrumbs items={[{ label: 'Privacy Policy' }]} />

            {/* Page Header */}
            <header className="policy-header">

              <h1 className="policy-title">Privacy Policy &amp; Cookie Disclosure</h1>

              <p className="policy-lead">
                At <strong>VNHAX (Virtual Next-Gen Hub for AI &amp; eXploration)</strong>, accessible from{' '}
                <a href="https://vnhax.net/" target="_blank" rel="noopener noreferrer">https://vnhax.net/</a>, the privacy of our visitors is of paramount importance to us. This Privacy Policy document outlines the categories of personal and technical data received and collected by VNHAX, how it is recorded and safeguarded, third-party advertising disclosures (including Google AdSense and DoubleClick DART cookies), and your legal rights under international data protection laws.
              </p>

              <div className="policy-meta-bar">
                <div className="policy-meta-item">
                  <span>Last Updated:</span>
                  <strong><time dateTime="2026-10-11">{lastUpdated}</time></strong>
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
                <div className="policy-highlight-icon">🛡️</div>
                <h2 className="policy-highlight-title">Zero Data Selling</h2>
                <p className="policy-highlight-desc">
                  VNHAX does not sell, rent, monetize, or broker personal reader records to any data broker or commercial vendor.
                </p>
              </div>

              <div className="policy-highlight-card">
                <div className="policy-highlight-icon">🍪</div>
                <h2 className="policy-highlight-title">Clear Ad Disclosures</h2>
                <p className="policy-highlight-desc">
                  How advertising cookies work and direct links to opt out of personalised ads.
                </p>
              </div>

              <div className="policy-highlight-card">
                <div className="policy-highlight-icon">⚖️</div>
                <h2 className="policy-highlight-title">Global Rights Respected</h2>
                <p className="policy-highlight-desc">
                  Comprehensive mechanisms for EEA/UK (GDPR) and California (CCPA/CPRA) access, deletion, and privacy requests.
                </p>
              </div>
            </div>

            {/* Policy Prose Content */}
            <div className="policy-content">
              {/* SECTION 1 */}
              <section id="brand-identification" className="policy-section">
                <div className="policy-section-header">
                  <span className="policy-section-number">01</span>
                  <h2 className="policy-section-title">Brand Identification &amp; Entity Scope</h2>
                </div>
                <p>
                  This Privacy Policy applies solely to online activities conducted on <strong>VNHAX (Virtual Next-Gen Hub for AI &amp; eXploration)</strong>, operating globally at the authoritative domain{' '}
                  <code>https://vnhax.net/</code> (&quot;VNHAX&quot;, &quot;we&quot;, &quot;us&quot;, &quot;our&quot;, or &quot;the Platform&quot;). VNHAX is an independent technical engineering publication and research portal specializing in artificial intelligence architectures, open-source repository reviews, local large language model (LLM) tooling, and developer interface components.
                </p>
                <p>
                  This policy is valid for all visitors to our website with regards to the information that they share and/or collect in VNHAX. This policy does not apply to information collected offline or via communication channels other than this website. By accessing or using our platform, you acknowledge that you have read, understood, and consented to the data practices described herein.
                </p>
              </section>

              {/* SECTION 2 */}
              <section id="log-files" className="policy-section">
                <div className="policy-section-header">
                  <span className="policy-section-number">02</span>
                  <h2 className="policy-section-title">Web Hosting Log Files &amp; Diagnostic Data</h2>
                </div>
                <p>
                  VNHAX follows a standard operational procedure of using hosting log files. These files log visitors when they visit websites. All reputable web hosting companies perform this as part of infrastructure hosting services, network operations, and systems analytics.
                </p>
                <p>
                  The data recorded by our web server log files includes:
                </p>
                <ul>
                  <li><strong>Internet Protocol (IP) Addresses:</strong> Used for geographic region routing, automated abuse prevention, and Distributed Denial of Service (DDoS) mitigation.</li>
                  <li><strong>Browser Type and Version:</strong> Used to deliver properly formatted CSS, JavaScript bundles, and compatible HTML elements.</li>
                  <li><strong>Internet Service Provider (ISP):</strong> Network connectivity diagnostics and routing optimization.</li>
                  <li><strong>Date and Timestamp:</strong> Exact chronological timestamps of incoming server requests for latency and audit logging.</li>
                  <li><strong>Referring and Exit Pages:</strong> Uniform Resource Locators (URLs) that directed users to VNHAX and subsequent navigation destinations.</li>
                  <li><strong>Platform &amp; Operating System:</strong> Device category (Desktop, Tablet, Mobile) and operating system kernel (Linux, Windows, macOS, Android, iOS).</li>
                  <li><strong>Click Sequences &amp; Resource Requests:</strong> Total HTTP requests and asset download responses.</li>
                </ul>
                <p>
                  <strong>Non-Personally Identifiable Nature:</strong> The information logged in these automated server records is <em>not linked to any information that is personally identifiable</em>. The primary purpose of this telemetry is analyzing aggregate traffic trends, administering the site, detecting security anomalies, tracking user movement across our technical guides, and gathering broad demographic information for internal architectural scaling.
                </p>
              </section>

              {/* SECTION 3 */}
              <section id="cookies-web-beacons" className="policy-section">
                <div className="policy-section-header">
                  <span className="policy-section-number">03</span>
                  <h2 className="policy-section-title">Cookies, Web Beacons &amp; Local Storage</h2>
                </div>
                <p>
                  Like virtually all modern interactive web platforms, VNHAX uses &quot;cookies&quot; and browser LocalStorage technologies. Cookies are small text files placed on your computer or mobile device by a web page server. They cannot execute malicious programs or deliver computer viruses.
                </p>
                <p>
                  VNHAX utilizes cookies for the following operational categories:
                </p>
                <ul>
                  <li>
                    <strong>Essential &amp; Functional Cookies:</strong> Required for the website to function correctly, such as preserving reader theme preferences, code snippet copy state, and responsive viewport settings.
                  </li>
                  <li>
                    <strong>Session State:</strong> Storing temporary parameters during your active reading session to maintain continuity as you browse between technical articles and repository analyses.
                  </li>
                  <li>
                    <strong>Analytical Cookies:</strong> Aggregating anonymous metrics regarding which pages are visited most frequently and identifying navigation bottlenecks.
                  </li>
                </ul>
                <p>
                  <strong>How to Manage &amp; Disable Cookies:</strong> You can choose to disable cookies through your individual browser options. Most web browsers automatically accept cookies, but you can modify your browser settings to decline cookies if you prefer. Detailed instructions for managing cookies in major browsers can be accessed at:
                </p>
                <ul>
                  <li><a href="https://support.google.com/chrome/answer/95647" target="_blank" rel="noopener noreferrer">Google Chrome Cookie Management</a></li>
                  <li><a href="https://support.mozilla.org/en-US/kb/enhanced-tracking-protection-firefox-desktop" target="_blank" rel="noopener noreferrer">Mozilla Firefox Cookie Settings</a></li>
                  <li><a href="https://support.apple.com/guide/safari/manage-cookies-sfri11471/mac" target="_blank" rel="noopener noreferrer">Apple Safari Cookie Controls</a></li>
                  <li><a href="https://support.microsoft.com/en-us/windows/microsoft-edge-browsing-data-and-privacy-bb8174ba-9d73-dcf2-9b4a-9c0ff8262e25" target="_blank" rel="noopener noreferrer">Microsoft Edge Privacy &amp; Cookies</a></li>
                </ul>
                <p>
                  <em>Note:</em> If you choose to disable cookies completely, some interactive features (such as syntax-highlighted code preferences or interactive diagram toggles) may experience reduced functionality.
                </p>
              </section>

              {/* SECTION 4 - CRITICAL GOOGLE ADSENSE DISCLOSURE */}
              <section id="google-dart-cookies" className="policy-section">
                <div className="policy-section-header">
                  <span className="policy-section-number">04</span>
                  <h2 className="policy-section-title">Google DoubleClick DART Cookies &amp; AdSense Disclosure</h2>
                </div>
                
                <div className="policy-adsense-box">
                  <div className="policy-adsense-box-title">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <circle cx="12" cy="12" r="10" />
                      <line x1="12" y1="8" x2="12" y2="12" />
                      <line x1="12" y1="16" x2="12.01" y2="16" />
                    </svg>
                    <span>Critical Google AdSense Compliance Disclosure</span>
                  </div>
                  <p>
                    Google is one of the third-party vendors on our site. It also uses cookies, known as <strong>DoubleClick DART cookies</strong>, to serve advertisements to our site visitors based upon their visit to <code>https://vnhax.net/</code> and other sites across the World Wide Web.
                  </p>
                  <p>
                    Visitors may choose to decline or opt out of the use of DART cookies by visiting the official <strong>Google Ad and Content Network Privacy Policy</strong> at the following authoritative URL:{' '}
                    <a href="https://policies.google.com/technologies/ads" target="_blank" rel="noopener noreferrer">
                      https://policies.google.com/technologies/ads
                    </a>.
                  </p>
                </div>

                <p>
                  In compliance with Google Publisher Policies and Ads Standards, we provide explicit notice of the following advertising mechanisms:
                </p>
                <ul>
                  <li>
                    Third-party vendors, including <strong>Google</strong>, use cookies to serve ads based on a user&apos;s prior visits to VNHAX or other websites on the Internet.
                  </li>
                  <li>
                    Google&apos;s use of advertising cookies enables it and its partners to serve ads to our users based on their visits to our sites and/or other sites on the Internet.
                  </li>
                  <li>
                    Users can opt out of personalized advertising by navigating directly to{' '}
                    <a href="https://adssettings.google.com/" target="_blank" rel="noopener noreferrer">
                      Google Ads Settings (https://adssettings.google.com/)
                    </a>.
                  </li>
                  <li>
                    Alternatively, users can opt out of third-party vendors&apos; use of cookies for personalized advertising by visiting the consumer opt-out portal at{' '}
                    <a href="https://optout.aboutads.info/" target="_blank" rel="noopener noreferrer">
                      AboutAds.info Choices (https://optout.aboutads.info/)
                    </a>{' '}
                    or the Network Advertising Initiative (NAI) at{' '}
                    <a href="https://optout.networkadvertising.org/" target="_blank" rel="noopener noreferrer">
                      https://optout.networkadvertising.org/
                    </a>.
                  </li>
                </ul>
              </section>

              {/* SECTION 5 */}
              <section id="third-party-ad-networks" className="policy-section">
                <div className="policy-section-header">
                  <span className="policy-section-number">05</span>
                  <h2 className="policy-section-title">Third-Party Advertising Partners &amp; Ad Networks</h2>
                </div>
                <p>
                  Some advertisers on our site may use cookies and web beacons. Our primary advertising partner is <strong>Google AdSense</strong>. Each of our advertising partners maintains their own Privacy Policy regarding user data, cookie lifetimes, and advertising tracking.
                </p>
                <p>
                  Third-party ad servers or ad networks employ technologies such as cookies, JavaScript, or Web Beacons in their respective advertisements and links that appear on VNHAX, which are sent directly to users&apos; web browsers. When this occurs, these third-party systems automatically receive your IP address. These technologies are utilized by third-party advertisers to measure the effectiveness of their promotional campaigns and/or to personalize the advertising content that you see on websites that you visit.
                </p>
                <div className="callout-box callout-box--warning">
                  <div className="callout-icon">⚠️</div>
                  <div className="callout-content">
                    <strong>Third-Party Cookie Control Notice:</strong>
                    <span>
                      Please be advised that <strong>VNHAX has no access to or control over these cookies that are used by third-party advertisers</strong>. Consequently, VNHAX cannot be held responsible for the data collection and tracking methods employed by third-party ad networks.
                    </span>
                  </div>
                </div>
                <p>
                  We strongly advise you to consult the respective Privacy Policies of these third-party ad servers for more detailed information. It may include their operating practices and instructions about how to opt-out of certain options. You can find a comprehensive list of these privacy policies and their direct links below:
                </p>
                <div className="policy-table-wrap">
                  <table className="policy-table">
                    <thead>
                      <tr>
                        <th>Advertising / Tech Partner</th>
                        <th>Purpose</th>
                        <th>Privacy Policy &amp; Opt-Out Resource</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td><strong>Google AdSense / DoubleClick</strong></td>
                        <td>Contextual &amp; Personalized Advertising</td>
                        <td>
                          <a href="https://policies.google.com/technologies/ads" target="_blank" rel="noopener noreferrer">
                            Google Ads &amp; Privacy Policies
                          </a>
                        </td>
                      </tr>
                      <tr>
                        <td><strong>Digital Advertising Alliance (DAA)</strong></td>
                        <td>Cross-Industry Ad Choices Opt-Out</td>
                        <td>
                          <a href="https://optout.aboutads.info/" target="_blank" rel="noopener noreferrer">
                            DAA WebChoices Tool
                          </a>
                        </td>
                      </tr>
                      <tr>
                        <td><strong>Network Advertising Initiative (NAI)</strong></td>
                        <td>Multi-Vendor Behavioral Opt-Out</td>
                        <td>
                          <a href="https://optout.networkadvertising.org/" target="_blank" rel="noopener noreferrer">
                            NAI Consumer Opt-Out Portal
                          </a>
                        </td>
                      </tr>
                      <tr>
                        <td><strong>European EDAA (Your Online Choices)</strong></td>
                        <td>EEA Consumer Behavioral Advertising Choices</td>
                        <td>
                          <a href="https://www.youronlinechoices.eu/" target="_blank" rel="noopener noreferrer">
                            YourOnlineChoices.eu
                          </a>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </section>

              {/* SECTION 6 */}
              <section id="analytics-telemetry" className="policy-section">
                <div className="policy-section-header">
                  <span className="policy-section-number">06</span>
                  <h2 className="policy-section-title">Web Analytics &amp; Traffic Measurement</h2>
                </div>
                <p>
                  To understand how our technical documentation, AI tool comparisons, and UI components are discovered and utilized, VNHAX may employ privacy-conscious web analytics tools, such as Google Analytics.
                </p>
                <p>
                  These analytics suites gather non-identifying telemetry including page dwell time, scroll depth, technical referral channels (such as GitHub, Hacker News, or search engines), and bounce rates. IP addresses are masked or truncated in compliance with privacy regulations before storage.
                </p>
                <p>
                  If you wish to prevent your web browsing telemetry from being transmitted to Google Analytics across any website, Google provides an official browser extension:
                </p>
                <p>
                  👉 Download the{' '}
                  <a href="https://tools.google.com/dlpage/gaoptout" target="_blank" rel="noopener noreferrer">
                    Google Analytics Opt-out Browser Add-on (https://tools.google.com/dlpage/gaoptout)
                  </a>.
                </p>
              </section>

              {/* SECTION 7 - GDPR & CCPA USER RIGHTS */}
              <section id="user-rights-gdpr-ccpa" className="policy-section">
                <div className="policy-section-header">
                  <span className="policy-section-number">07</span>
                  <h2 className="policy-section-title">International User Rights (GDPR &amp; CCPA/CPRA Disclosures)</h2>
                </div>
                <p>
                  We want to ensure you are fully aware of all of your data protection rights. Every user is entitled to the following under leading international privacy regulations:
                </p>

                <h3>European Union &amp; UK General Data Protection Regulation (GDPR)</h3>
                <p>
                  If you reside within the European Economic Area (EEA) or the United Kingdom, you possess guaranteed statutory rights under Articles 15 through 22 of the GDPR:
                </p>
                <ul>
                  <li><strong>The Right to Access (Article 15):</strong> You have the right to request copies of your personal data held by VNHAX.</li>
                  <li><strong>The Right to Rectification (Article 16):</strong> You have the right to request that we correct any information you believe is inaccurate or complete incomplete data.</li>
                  <li><strong>The Right to Erasure / &quot;Right to be Forgotten&quot; (Article 17):</strong> You have the right to request that we erase your personal data under certain conditions.</li>
                  <li><strong>The Right to Restrict Processing (Article 18):</strong> You have the right to request that we restrict the processing of your personal data under statutory circumstances.</li>
                  <li><strong>The Right to Object to Processing (Article 21):</strong> You have the right to object to our processing of your personal data, particularly regarding direct marketing.</li>
                  <li><strong>The Right to Data Portability (Article 20):</strong> You have the right to request that we transfer the data that we have collected to another organization, or directly to you, in a structured, machine-readable format.</li>
                </ul>
                <p>
                  <strong>Legal Bases for Processing:</strong> We process personal data solely on legitimate grounds recognized under GDPR Article 6, including our legitimate interests in operating a secure and performant developer portal, compliance with legal obligations, or explicit user consent (such as voluntary newsletter or contact form submissions).
                </p>

                <h3>California Consumer Privacy Act (CCPA &amp; CPRA)</h3>
                <p>
                  Under the California Consumer Privacy Act (CCPA) as amended by the California Privacy Rights Act (CPRA), California residents are afforded specific statutory rights regarding their personal information:
                </p>
                <ul>
                  <li><strong>Right to Know &amp; Access:</strong> You have the right to request disclosure of the categories and specific pieces of personal information collected about you over the preceding 12 months.</li>
                  <li><strong>Right to Delete:</strong> You have the right to request the deletion of your personal information collected and retained by VNHAX.</li>
                  <li><strong>Right to Correct:</strong> You have the right to request correction of inaccurate personal information.</li>
                  <li>
                    <strong>Right to Opt-Out of Sale or Sharing:</strong>{' '}
                    <strong>VNHAX DOES NOT SELL OR SHARE YOUR PERSONAL INFORMATION</strong> for monetary or other valuable commercial consideration. We have never sold consumer data and will never do so.
                  </li>
                  <li><strong>Right to Non-Discrimination:</strong> VNHAX will never discriminate, deny services, charge differing prices, or provide a substandard level of service because you exercised your CCPA/CPRA rights.</li>
                  <li><strong>Global Privacy Control (GPC):</strong> We recognize and respect browser-based opt-out signals, including the Global Privacy Control (GPC), where supported.</li>
                </ul>

                <div className="callout-box callout-box--tip">
                  <div className="callout-icon">📋</div>
                  <div className="callout-content">
                    <strong>Statutory Response Timeline:</strong>
                    <span>
                      If you make a formal GDPR or CCPA request, we have <strong>one month (30 calendar days)</strong> to respond to you. If you would like to exercise any of these statutory rights, please contact our dedicated Privacy Officer at{' '}
                      <a href="mailto:privacy@vnhax.net">privacy@vnhax.net</a>.
                    </span>
                  </div>
                </div>
              </section>

              {/* SECTION 8 - COPPA */}
              <section id="childrens-privacy" className="policy-section">
                <div className="policy-section-header">
                  <span className="policy-section-number">08</span>
                  <h2 className="policy-section-title">Children&apos;s Online Privacy Protection Act (COPPA)</h2>
                </div>
                <p>
                  Another priority of ours is adding protection for children while using the internet. We encourage parents and guardians to observe, participate in, and/or monitor and guide their online activity.
                </p>
                <p>
                  <strong>Zero Collection Statement:</strong> <strong>VNHAX does not knowingly collect any Personal Identifiable Information from children under the age of 13</strong> (or under 16 within applicable European jurisdictions). Our content, software guides, and technical analyses are intended exclusively for professional software engineers, machine learning researchers, and general audiences aged 13 and older.
                </p>
                <p>
                  If you believe that your child provided personal information on our website, we strongly encourage you to contact us immediately at{' '}
                  <a href="mailto:privacy@vnhax.net">privacy@vnhax.net</a>, and we will use our best, diligent efforts to promptly verify and purge such information from our records.
                </p>
              </section>

              {/* SECTION 9 */}
              <section id="data-security-retention" className="policy-section">
                <div className="policy-section-header">
                  <span className="policy-section-number">09</span>
                  <h2 className="policy-section-title">Data Security, Integrity &amp; Retention Schedules</h2>
                </div>
                <p>
                  VNHAX adopts rigorous technical, administrative, and physical safeguards to maintain the safety of your information and preserve operational integrity:
                </p>
                <ul>
                  <li><strong>Encryption in Transit:</strong> 100% of website communication and data exchanges are enforced through modern TLS 1.3 cryptographic protocols with HTTPS enforcement and HTTP Strict Transport Security (HSTS).</li>
                  <li><strong>Infrastructure Security:</strong> Hardened cloud server configurations, DDoS shield filtering, rate limiting, and zero arbitrary code execution vectors.</li>
                  <li><strong>Data Minimization:</strong> We adhere to strict data minimization principles. We do not maintain open user accounts, passwords, payment card numbers, or sensitive financial databases.</li>
                  <li><strong>Retention Schedules:</strong> Server log entries are automatically rotated and purged after 90 days. Correspondence sent through our contact forms is retained only as long as required to resolve your inquiry or comply with legal auditing obligations.</li>
                </ul>
              </section>

              {/* SECTION 10 */}
              <section id="consent-policy-updates" className="policy-section">
                <div className="policy-section-header">
                  <span className="policy-section-number">10</span>
                  <h2 className="policy-section-title">User Consent, Policy Updates &amp; Contact Desk</h2>
                </div>
                <p>
                  <strong>User Consent:</strong> By accessing, reading, or interacting with <strong>VNHAX (Virtual Next-Gen Hub for AI &amp; eXploration)</strong> at <code>https://vnhax.net/</code>, you hereby consent to our Privacy Policy and unconditionally agree to its terms and conditions.
                </p>
                <p>
                  <strong>Updates &amp; Revisions:</strong> We may revise and update our Privacy Policy periodically to reflect emerging technical features, changes in regulatory guidelines (such as updates to Google AdSense Publisher Policies or global data protection acts), or infrastructural enhancements. Any modifications will be posted directly to this URL with a revised &quot;Last Updated&quot; date at the top of this document. Continued usage of VNHAX following the posting of changes constitutes acceptance of the amended policy.
                </p>
                <p>
                  <strong>Official Contact Channel:</strong> If you have any additional questions, require more information about our Privacy Policy, or wish to exercise your data subject rights under GDPR/CCPA, please do not hesitate to contact our dedicated privacy desk:
                </p>
                <ul>
                  <li><strong>Privacy requests:</strong> <a href="mailto:privacy@vnhax.net">privacy@vnhax.net</a></li>
                                    <li><strong>Everything else:</strong> <a href="mailto:contact@vnhax.net">contact@vnhax.net</a></li>
                  <li><strong>Interactive Web Form:</strong> Visit our <Link href="/contact">Official Contact Page</Link></li>
                  <li><strong>Related Legal Terms:</strong> Review our <Link href="/terms">Terms of Service &amp; Disclaimer</Link></li>
                </ul>
              </section>
            </div>
          </div>

          {/* Sticky Interactive Sidebar Component */}
          <PolicyTableOfContents />
        </article>
      </main>

      <SiteFooter />
    </>
  );
}
