import type { Metadata } from 'next';
import Link from 'next/link';
import SiteHeader from '@/components/SiteHeader';
import SiteFooter from '@/components/SiteFooter';
import Breadcrumbs from '@/components/Breadcrumbs';
import ReadingProgressBar from '@/components/ReadingProgressBar';
import PolicyTableOfContents from '@/components/PolicyTableOfContents';
import { BRAND_CONFIG, CONTACT_EMAIL, PRIVACY_EMAIL, getBreadcrumbSchema } from '@/lib/seo';

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description:
    'How VNHAX (vnhax.net) handles your data: cookies and consent, Google Analytics, advertising cookies, contact form messages, and your privacy rights.',
  alternates: {
    canonical: `${BRAND_CONFIG.siteUrl}/privacy-policy`,
  },
  openGraph: {
    title: `Privacy Policy | ${BRAND_CONFIG.shortName}`,
    description:
      'How VNHAX handles cookies, analytics, advertising, contact form messages, and your privacy rights.',
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
    description: 'Cookies, analytics, advertising and your privacy rights on VNHAX.',
    images: [`${BRAND_CONFIG.siteUrl}/og-image.png`],
  },
};

const ext = { target: '_blank', rel: 'noopener noreferrer' } as const;

export default function PrivacyPolicyPage() {
  const lastUpdated = 'October 11, 2026';
  const effectiveDate = 'October 4, 2026';

  const breadcrumbSchema = getBreadcrumbSchema([
    { name: 'Home', url: '/' },
    { name: 'Privacy Policy', url: '/privacy-policy' },
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <ReadingProgressBar />
      <SiteHeader variant="home" />

      <main className="policy-page">
        <article className="policy-layout">
          <div className="policy-main">
            <Breadcrumbs items={[{ label: 'Privacy Policy' }]} />

            <header className="policy-header">
              <h1 className="policy-title">Privacy Policy</h1>

              <p className="policy-lead">
                This policy explains what information VNHAX (<a href="https://vnhax.net/">vnhax.net</a>) collects when
                you visit the site, why, who it is shared with, and the choices you have. In short: you can read
                everything without an account, analytics and advertising cookies are only used if you accept them, and
                we never sell your personal information.
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
              </div>
            </header>

            <div className="policy-content">
              <section id="who-we-are" className="policy-section">
                <div className="policy-section-header">
                  <span className="policy-section-number">01</span>
                  <h2 className="policy-section-title">Who We Are</h2>
                </div>
                <p>
                  VNHAX is an independent website run by Umar Hashmi (&ldquo;we&rdquo;, &ldquo;us&rdquo;). Umar Hashmi is
                  responsible for the personal information described in this policy. For any privacy question or request,
                  email <a href={`mailto:${PRIVACY_EMAIL}`}>{PRIVACY_EMAIL}</a>.
                </p>
              </section>

              <section id="information-we-collect" className="policy-section">
                <div className="policy-section-header">
                  <span className="policy-section-number">02</span>
                  <h2 className="policy-section-title">Information We Collect</h2>
                </div>
                <ul>
                  <li>
                    <strong>Messages you send us.</strong> If you use the <Link href="/contact">contact form</Link> or
                    email us, we receive your name, email address and whatever you write. We use it only to reply to you.
                  </li>
                  <li>
                    <strong>Technical data.</strong> Like every website, our hosting provider automatically processes your
                    IP address, browser type, the page you requested and the time, so it can deliver pages and protect the
                    site from abuse.
                  </li>
                  <li>
                    <strong>Usage data (with your consent).</strong> If you accept cookies, Google Analytics records which
                    pages are visited, how long people stay, roughly which country they are in, what device they use and
                    which site referred them. We see this only as aggregated reports.
                  </li>
                </ul>
                <p>
                  We do not offer accounts, newsletters or comments, and we do not collect payment details or sensitive
                  personal information.
                </p>
              </section>

              <section id="cookies" className="policy-section">
                <div className="policy-section-header">
                  <span className="policy-section-number">03</span>
                  <h2 className="policy-section-title">Cookies &amp; Your Consent</h2>
                </div>
                <p>
                  When you first visit, a banner asks whether you accept cookies. Until you click <strong>Accept</strong>,
                  Google Analytics and advertising cookies are not set (we use Google Consent Mode, which tells Google tags
                  not to store cookies). You can change your choice at any time with the <strong>Cookie Settings</strong>{' '}
                  link in the footer of every page.
                </p>
                <div className="policy-table-wrap">
                  <table className="policy-table">
                    <thead>
                      <tr>
                        <th>Name</th>
                        <th>Set by</th>
                        <th>Purpose</th>
                        <th>When</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td><code>vnhax_cookie_consent</code> (local storage)</td>
                        <td>VNHAX</td>
                        <td>Remembers your cookie choice</td>
                        <td>Always (strictly necessary)</td>
                      </tr>
                      <tr>
                        <td><code>_ga</code>, <code>_ga_*</code></td>
                        <td>Google Analytics</td>
                        <td>Counts visits and pages viewed</td>
                        <td>Only after you accept</td>
                      </tr>
                      <tr>
                        <td>Advertising cookies (e.g. <code>__gads</code>, <code>__gpi</code>)</td>
                        <td>Google AdSense</td>
                        <td>Shows and measures ads, limits repeats, may personalise ads</td>
                        <td>Only if ads are enabled and you accept</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <p>
                  You can also block or delete cookies in your browser settings. The site works normally without them.
                </p>
              </section>

              <section id="analytics" className="policy-section">
                <div className="policy-section-header">
                  <span className="policy-section-number">04</span>
                  <h2 className="policy-section-title">Analytics</h2>
                </div>
                <ul>
                  <li>
                    <strong>Google Analytics 4</strong> (by Google) measures how the site is used, as described above.
                    Data is kept for no longer than the retention period set in our Google Analytics account (at most 14
                    months). You can also install the{' '}
                    <a href="https://tools.google.com/dlpage/gaoptout" {...ext}>Google Analytics opt-out browser add-on</a>.
                  </li>
                  <li>
                    <strong>Vercel Web Analytics and Speed Insights</strong> (by Vercel, our hosting provider) measure page
                    views and loading speed. They do not use cookies and do not identify individual visitors.
                  </li>
                </ul>
                <p>
                  Read{' '}
                  <a href="https://policies.google.com/technologies/partner-sites" {...ext}>
                    how Google uses information from sites that use its services
                  </a>
                  .
                </p>
              </section>

              <section id="advertising" className="policy-section">
                <div className="policy-section-header">
                  <span className="policy-section-number">05</span>
                  <h2 className="policy-section-title">Advertising (Google AdSense)</h2>
                </div>
                <p>
                  VNHAX may show ads from Google AdSense to help cover hosting costs. When ads are shown:
                </p>
                <ul>
                  <li>
                    Third-party vendors, including Google, use cookies to serve ads based on a user&apos;s prior visits to
                    this website or other websites.
                  </li>
                  <li>
                    Google&apos;s use of advertising cookies enables it and its partners to serve ads to you based on your
                    visit to this site and/or other sites on the Internet.
                  </li>
                  <li>
                    You may opt out of personalised advertising by visiting{' '}
                    <a href="https://adssettings.google.com/" {...ext}>Google Ads Settings</a>. You can also opt out of some
                    third-party vendors&apos; use of cookies for personalised advertising at{' '}
                    <a href="https://www.aboutads.info/choices/" {...ext}>aboutads.info</a> or, in Europe,{' '}
                    <a href="https://www.youronlinechoices.eu/" {...ext}>youronlinechoices.eu</a>.
                  </li>
                  <li>
                    Visitors in the European Economic Area, the UK and Switzerland will be asked for consent through a
                    Google-certified consent message before personalised ads are shown.
                  </li>
                </ul>
                <p>
                  Advertisers do not influence what we write. See Google&apos;s{' '}
                  <a href="https://policies.google.com/technologies/ads" {...ext}>advertising policy</a> for details.
                </p>
              </section>

              <section id="third-parties" className="policy-section">
                <div className="policy-section-header">
                  <span className="policy-section-number">06</span>
                  <h2 className="policy-section-title">Services We Use</h2>
                </div>
                <p>We share data only with the providers needed to run the site:</p>
                <div className="policy-table-wrap">
                  <table className="policy-table">
                    <thead>
                      <tr>
                        <th>Provider</th>
                        <th>What it does</th>
                        <th>Privacy policy</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>Vercel</td>
                        <td>Website hosting, Web Analytics, Speed Insights</td>
                        <td><a href="https://vercel.com/legal/privacy-policy" {...ext}>vercel.com</a></td>
                      </tr>
                      <tr>
                        <td>Google</td>
                        <td>Google Analytics; Google AdSense (if enabled)</td>
                        <td><a href="https://policies.google.com/privacy" {...ext}>policies.google.com</a></td>
                      </tr>
                      <tr>
                        <td>Web3Forms</td>
                        <td>Delivers contact form messages to our inbox</td>
                        <td><a href="https://web3forms.com/privacy" {...ext}>web3forms.com</a></td>
                      </tr>
                      <tr>
                        <td>Cloudflare</td>
                        <td>Domain name service and email forwarding</td>
                        <td><a href="https://www.cloudflare.com/privacypolicy/" {...ext}>cloudflare.com</a></td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <p>
                  These providers may process data in countries other than your own. Articles also link to other websites;
                  their own privacy policies apply once you leave VNHAX.
                </p>
              </section>

              <section id="your-rights" className="policy-section">
                <div className="policy-section-header">
                  <span className="policy-section-number">07</span>
                  <h2 className="policy-section-title">Your Rights</h2>
                </div>
                <p>
                  Depending on where you live (for example under the GDPR in the EU/UK or the CCPA/CPRA in California), you
                  can ask us to tell you what personal information we hold about you, correct it, delete it, or stop using
                  it. Email <a href={`mailto:${PRIVACY_EMAIL}`}>{PRIVACY_EMAIL}</a> and we will respond within 30 days.
                </p>
                <p>
                  <strong>Legal basis (EU/UK):</strong> we rely on your consent for analytics and advertising cookies, and
                  on our legitimate interest in running and securing the site and replying to messages you send.
                </p>
                <p>
                  <strong>California:</strong> we do not sell personal information for money. If personalised ads are
                  enabled, Google&apos;s advertising cookies may count as &ldquo;sharing&rdquo; for cross-context behavioural
                  advertising; you can opt out by clicking <strong>Decline</strong> in Cookie Settings or using Google Ads
                  Settings. We will not treat you differently for using your rights.
                </p>
              </section>

              <section id="childrens-privacy" className="policy-section">
                <div className="policy-section-header">
                  <span className="policy-section-number">08</span>
                  <h2 className="policy-section-title">Children&apos;s Privacy</h2>
                </div>
                <p>
                  VNHAX is written for adults and is not directed at children under 13. We do not knowingly collect
                  personal information from children. If you believe a child has sent us personal information, email{' '}
                  <a href={`mailto:${PRIVACY_EMAIL}`}>{PRIVACY_EMAIL}</a> and we will delete it.
                </p>
              </section>

              <section id="retention-security" className="policy-section">
                <div className="policy-section-header">
                  <span className="policy-section-number">09</span>
                  <h2 className="policy-section-title">Retention &amp; Security</h2>
                </div>
                <p>
                  Messages you send us are kept in our email inbox only as long as needed to deal with your request, and
                  are deleted on request. Analytics data is kept as described in section 4. The whole site is served over
                  HTTPS. No method of storage or transmission is completely secure, but we keep the data we hold to a
                  minimum.
                </p>
              </section>

              <section id="changes-contact" className="policy-section">
                <div className="policy-section-header">
                  <span className="policy-section-number">10</span>
                  <h2 className="policy-section-title">Changes &amp; Contact</h2>
                </div>
                <p>
                  If we change this policy, for example when ads are switched on, we will update this page and the
                  &ldquo;Last Updated&rdquo; date above.
                </p>
                <ul>
                  <li><strong>Privacy requests:</strong> <a href={`mailto:${PRIVACY_EMAIL}`}>{PRIVACY_EMAIL}</a></li>
                  <li><strong>Everything else:</strong> <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a></li>
                  <li><strong>Related:</strong> <Link href="/terms">Terms of Service</Link> and <Link href="/disclaimer">Disclaimer</Link></li>
                </ul>
              </section>
            </div>
          </div>

          <PolicyTableOfContents />
        </article>
      </main>

      <SiteFooter />
    </>
  );
}
