import type { Metadata } from 'next';
import Link from 'next/link';
import SiteHeader from '@/components/SiteHeader';
import SiteFooter from '@/components/SiteFooter';
import Breadcrumbs from '@/components/Breadcrumbs';
import ReadingProgressBar from '@/components/ReadingProgressBar';
import ContactForm from '@/components/ContactForm';
import { BRAND_CONFIG, getBreadcrumbSchema } from '@/lib/seo';

export const metadata: Metadata = {
  title: 'Contact VNHAX — Editorial Desk, Technical Errata & DMCA',
  description:
    'Contact the editorial engineering desk at VNHAX (Virtual Next-Gen Hub for AI & eXploration). Guaranteed 24–48 business hour SLA for technical corrections, repository reviews, and DMCA inquiries.',
  alternates: {
    canonical: `${BRAND_CONFIG.siteUrl}/contact`,
  },
  openGraph: {
    title: `Contact VNHAX — Editorial Desk & Publisher Inquiries`,
    description:
      'Direct communication channels and verified contact form for VNHAX (Virtual Next-Gen Hub for AI & eXploration). 24–48 hour response SLA.',
    url: `${BRAND_CONFIG.siteUrl}/contact`,
    siteName: BRAND_CONFIG.shortName,
    type: 'website',
    images: [
      {
        url: `${BRAND_CONFIG.siteUrl}/og-image.png`,
        width: 1200,
        height: 630,
        alt: `${BRAND_CONFIG.shortName} Contact Desk`,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: `Contact VNHAX — Editorial Desk & Publisher Inquiries`,
    description:
      'Direct communication channels, technical errata feedback, and DMCA inquiries for VNHAX.',
    images: [`${BRAND_CONFIG.siteUrl}/og-image.png`],
  },
};

export default function ContactPage() {
  const breadcrumbSchema = getBreadcrumbSchema([
    { name: 'Home', url: '/' },
    { name: 'Contact Us', url: '/contact' },
  ]);

  const contactPageSchema = {
    '@context': 'https://schema.org',
    '@type': 'ContactPage',
    '@id': `${BRAND_CONFIG.siteUrl}/contact/#contact`,
    url: `${BRAND_CONFIG.siteUrl}/contact`,
    name: `Contact ${BRAND_CONFIG.name}`,
    description: 'Direct communication channels, technical errata desk, and publisher inquiry portal for VNHAX.',
    mainEntity: {
      '@type': 'Organization',
      name: BRAND_CONFIG.shortName,
      url: BRAND_CONFIG.siteUrl,
      contactPoint: [
        {
          '@type': 'ContactPoint',
          telephone: '+1-555-0199',
          contactType: 'editorial support',
          email: 'contact@vnhax.net',
          availableLanguage: ['English'],
        },
        {
          '@type': 'ContactPoint',
          contactType: 'copyright agent',
          email: 'dmca@vnhax.net',
          availableLanguage: ['English'],
        },
      ],
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(contactPageSchema) }}
      />

      <ReadingProgressBar />
      <SiteHeader variant="home" />

      <main className="contact-page">
        <div className="contact-container">
          <Breadcrumbs items={[{ label: 'Contact Us' }]} />

          {/* Header Introduction */}
          <header className="contact-header">
            <div className="policy-badge-row" style={{ justifyContent: 'center' }}>
              <span className="policy-badge policy-badge--verified">
                ✓ Verified Communication Channels
              </span>
              <span className="policy-badge">
                AdSense Transparency Standard
              </span>
              <span className="policy-badge">
                24–48h SLA Response
              </span>
            </div>

            <h1 className="contact-title">Contact VNHAX Editorial Desk</h1>

            <p className="contact-lead">
              We welcome developers, machine learning researchers, software engineers, and industry partners to connect directly with our editorial and systems engineering team. Whether reporting a technical benchmark errata, suggesting an open-source repository, or submitting a formal DMCA notice, our communication channels are monitored daily.
            </p>
          </header>

          {/* Two-Column Responsive Layout */}
          <div className="contact-two-col">
            {/* Left Column: Direct Channels, SLA & DMCA */}
            <div className="contact-left-col">
              {/* Response SLA Guarantee Card */}
              <div className="contact-sla-card">
                <div className="contact-sla-header">
                  <span className="contact-sla-badge">Publisher SLA Guarantee</span>
                  <h2 className="contact-sla-title">24–48 Business Hour Turnaround</h2>
                </div>
                <p className="contact-sla-text">
                  In accordance with Google AdSense Transparency standards and our editorial commitment, all inquiries, code errata submissions, and legal requests are logged in our ticketing pipeline with a guaranteed response window of <strong>24 to 48 business hours</strong> (Monday–Friday).
                </p>
              </div>

              {/* Direct Communication Channels */}
              <div className="contact-channels-card">
                <h2 className="contact-card-title">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                    <rect x="2" y="4" width="20" height="16" rx="2" />
                    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                  </svg>
                  <span>Direct Communication Directory</span>
                </h2>

                <ul className="contact-channels-list">
                  <li className="contact-channel-item">
                    <span className="contact-channel-label">Primary General &amp; Editorial Desk</span>
                    <a href="mailto:contact@vnhax.net" className="contact-channel-link">
                      contact@vnhax.net
                    </a>
                    <span className="contact-channel-desc">
                      General inquiries, publication feedback, and editorial correspondence.
                    </span>
                  </li>

                  <li className="contact-channel-item">
                    <span className="contact-channel-label">Technical Errata &amp; Code Corrections</span>
                    <a href="mailto:feedback@vnhax.net" className="contact-channel-link">
                      feedback@vnhax.net
                    </a>
                    <span className="contact-channel-desc">
                      Benchmark discrepancies, syntax bugs, or broken CLI flag updates.
                    </span>
                  </li>

                  <li className="contact-channel-item">
                    <span className="contact-channel-label">Partnerships &amp; Media Inquiries</span>
                    <a href="mailto:partners@vnhax.net" className="contact-channel-link">
                      partners@vnhax.net
                    </a>
                    <span className="contact-channel-desc">
                      Independent open-source collaborations and architectural features.
                    </span>
                  </li>

                  <li className="contact-channel-item">
                    <span className="contact-channel-label">Privacy Officer (GDPR / CCPA)</span>
                    <a href="mailto:privacy@vnhax.net" className="contact-channel-link">
                      privacy@vnhax.net
                    </a>
                    <span className="contact-channel-desc">
                      Data subject access, export requests, and compliance disclosures.
                    </span>
                  </li>
                </ul>
              </div>

              {/* Dedicated DMCA & Intellectual Property Card */}
              <div className="contact-dmca-card">
                <h2 className="contact-dmca-title">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10" />
                  </svg>
                  <span>DMCA &amp; Intellectual Property Safe Harbor</span>
                </h2>
                <p className="contact-dmca-text">
                  VNHAX respects the intellectual property rights of all software creators and content authors. All open-source repositories reviewed on our platform are attributed to their upstream authors under OSI-approved licenses. If you believe your copyrighted material has been reproduced inappropriately, our designated agent is reachable at{' '}
                  <a href="mailto:dmca@vnhax.net" style={{ color: '#0284c7', fontWeight: 600 }}>dmca@vnhax.net</a> (with copy to <a href="mailto:legal@vnhax.net" style={{ color: '#0284c7', fontWeight: 600 }}>legal@vnhax.net</a>).
                </p>
                <span style={{ fontSize: '12px', fontWeight: 600, color: '#0369a1', display: 'block', marginBottom: '6px' }}>
                  Please include the following in your formal notice:
                </span>
                <ul className="contact-dmca-checklist">
                  <li>Identification of the copyrighted work claimed to be infringed.</li>
                  <li>Exact URL link on `https://vnhax.net/` containing the material.</li>
                  <li>Your legal name, mailing address, telephone number, and email.</li>
                  <li>A statement of good faith belief that the use is unauthorized.</li>
                  <li>A statement made under penalty of perjury that the notice is accurate.</li>
                </ul>
                <p className="contact-dmca-text" style={{ fontSize: '12px', color: '#64748b', marginBottom: 0 }}>
                  Valid notices are processed expeditiously in compliance with 17 U.S.C. § 512(c).
                </p>
              </div>

              {/* Verified Platform Social Channels */}
              <div className="contact-channels-card">
                <h2 className="contact-card-title">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                    <circle cx="12" cy="12" r="10" />
                    <line x1="2" y1="12" x2="22" y2="12" />
                    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
                  </svg>
                  <span>Verified Platform Handles</span>
                </h2>
                <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                  <a
                    href="https://github.com/vnhax"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn--outline"
                    style={{ fontSize: '12.5px', height: '38px', padding: '0 14px' }}
                  >
                    GitHub (github.com/vnhax)
                  </a>
                  <a
                    href="https://x.com/vnhax"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn--outline"
                    style={{ fontSize: '12.5px', height: '38px', padding: '0 14px' }}
                  >
                    X / Twitter (@vnhax)
                  </a>
                  <a
                    href="https://www.linkedin.com/company/vnhax"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn--outline"
                    style={{ fontSize: '12.5px', height: '38px', padding: '0 14px' }}
                  >
                    LinkedIn
                  </a>
                </div>
              </div>
            </div>

            {/* Right Column: Functional Interactive Contact Form */}
            <div className="contact-right-col">
              <ContactForm />

              {/* Submission Guidelines Note */}
              <div style={{ marginTop: '24px', padding: '18px 20px', background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '12px' }}>
                <span style={{ fontSize: '12px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em', color: '#0f172a', display: 'block', marginBottom: '8px' }}>
                  Editorial Submission Guidelines
                </span>
                <ul style={{ fontSize: '13px', lineHeight: 1.6, color: '#475569', margin: 0, paddingLeft: '18px' }}>
                  <li>
                    <strong>Technical Errata:</strong> Please include the target article URL and specific code block line number.
                  </li>
                  <li>
                    <strong>Repo Submissions:</strong> We only evaluate public repositories on GitHub with permissive open-source licenses (MIT, Apache-2.0, BSD).
                  </li>
                  <li>
                    <strong>Privacy Requests:</strong> Data subject requests are handled confidentially pursuant to GDPR &amp; CCPA protocols.
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </main>

      <SiteFooter />
    </>
  );
}
