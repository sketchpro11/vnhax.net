import type { Metadata } from 'next';
import SiteHeader from '@/components/SiteHeader';
import SiteFooter from '@/components/SiteFooter';
import Breadcrumbs from '@/components/Breadcrumbs';
import ReadingProgressBar from '@/components/ReadingProgressBar';
import ContactForm from '@/components/ContactForm';
import { BRAND_CONFIG, CONTACT_EMAIL, PRIVACY_EMAIL, getBreadcrumbSchema } from '@/lib/seo';

export const metadata: Metadata = {
  title: 'Contact Us',
  description:
    'Contact VNHAX for corrections, feedback, repository suggestions, privacy requests, or copyright notices. Email contact@vnhax.net or use the contact form.',
  alternates: {
    canonical: `${BRAND_CONFIG.siteUrl}/contact`,
  },
  openGraph: {
    title: `Contact Us | ${BRAND_CONFIG.shortName}`,
    description:
      'Contact VNHAX for corrections, feedback, repository suggestions, privacy requests, or copyright notices.',
    url: `${BRAND_CONFIG.siteUrl}/contact`,
    siteName: BRAND_CONFIG.shortName,
    type: 'website',
    images: [
      {
        url: `${BRAND_CONFIG.siteUrl}/og-image.png`,
        width: 1200,
        height: 630,
        alt: `Contact ${BRAND_CONFIG.shortName}`,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: `Contact ${BRAND_CONFIG.shortName}`,
    description: 'Corrections, feedback, privacy requests, and copyright notices for VNHAX.',
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
    name: `Contact ${BRAND_CONFIG.shortName}`,
    mainEntity: {
      '@type': 'Organization',
      name: BRAND_CONFIG.shortName,
      url: BRAND_CONFIG.siteUrl,
      contactPoint: [
        {
          '@type': 'ContactPoint',
          contactType: 'customer support',
          email: CONTACT_EMAIL,
          availableLanguage: ['English', 'Urdu'],
        },
        {
          '@type': 'ContactPoint',
          contactType: 'privacy',
          email: PRIVACY_EMAIL,
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
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <ReadingProgressBar />
      <SiteHeader variant="home" />

      <main className="contact-page">
        <div className="contact-container">
          <Breadcrumbs items={[{ label: 'Contact Us' }]} />

          <header className="contact-header">
            <h1 className="contact-title">Contact VNHAX</h1>
            <p className="contact-lead">
              VNHAX is run by Umar Hashmi. If you spotted a mistake in an article, have a question about a guide,
              want to suggest an open-source project, or need to make a privacy or copyright request, get in touch
              below. I read every message and usually reply within a few working days.
            </p>
          </header>

          <div className="contact-two-col">
            <div className="contact-left-col">
              <div className="contact-channels-card">
                <h2 className="contact-card-title">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                    <rect x="2" y="4" width="20" height="16" rx="2" />
                    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                  </svg>
                  <span>Email</span>
                </h2>

                <ul className="contact-channels-list">
                  <li className="contact-channel-item">
                    <span className="contact-channel-label">General, corrections &amp; feedback</span>
                    <a href={`mailto:${CONTACT_EMAIL}`} className="contact-channel-link">
                      {CONTACT_EMAIL}
                    </a>
                    <span className="contact-channel-desc">
                      Questions, article corrections, broken code samples, repository suggestions, partnerships and copyright notices.
                    </span>
                  </li>

                  <li className="contact-channel-item">
                    <span className="contact-channel-label">Privacy requests</span>
                    <a href={`mailto:${PRIVACY_EMAIL}`} className="contact-channel-link">
                      {PRIVACY_EMAIL}
                    </a>
                    <span className="contact-channel-desc">
                      Requests to access or delete personal data, or questions about our{' '}
                      <a href="/privacy-policy">Privacy Policy</a>.
                    </span>
                  </li>
                </ul>
              </div>

              <div className="contact-dmca-card">
                <h2 className="contact-dmca-title">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10" />
                  </svg>
                  <span>Copyright Notices</span>
                </h2>
                <p className="contact-dmca-text">
                  If you believe something on VNHAX uses your copyrighted work without permission, email{' '}
                  <a href={`mailto:${CONTACT_EMAIL}`} style={{ color: '#0284c7', fontWeight: 600 }}>{CONTACT_EMAIL}</a>{' '}
                  with the subject &ldquo;Copyright&rdquo; and include:
                </p>
                <ul className="contact-dmca-checklist">
                  <li>The work you believe is being used.</li>
                  <li>The exact URL on vnhax.net where it appears.</li>
                  <li>Your name and contact details.</li>
                  <li>A short statement that you own the work (or act for the owner).</li>
                </ul>
                <p className="contact-dmca-text" style={{ fontSize: '12px', color: '#64748b', marginBottom: 0 }}>
                  Valid requests are reviewed and the material is corrected or removed.
                </p>
              </div>

              <div className="contact-channels-card">
                <h2 className="contact-card-title">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                    <circle cx="12" cy="12" r="10" />
                    <line x1="2" y1="12" x2="22" y2="12" />
                    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
                  </svg>
                  <span>Find Me Online</span>
                </h2>
                <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                  {BRAND_CONFIG.socialLinks.map((link) => (
                    <a
                      key={link.url}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer me"
                      className="btn btn--outline"
                      style={{ fontSize: '12.5px', height: '38px', padding: '0 14px' }}
                    >
                      {link.label}
                    </a>
                  ))}
                </div>
              </div>
            </div>

            <div className="contact-right-col">
              <ContactForm />

              <div style={{ marginTop: '24px', padding: '18px 20px', background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '12px' }}>
                <span style={{ fontSize: '12px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em', color: '#0f172a', display: 'block', marginBottom: '8px' }}>
                  Tips for a faster reply
                </span>
                <ul style={{ fontSize: '13px', lineHeight: 1.6, color: '#475569', margin: 0, paddingLeft: '18px' }}>
                  <li>
                    <strong>Corrections:</strong> include the article URL and the sentence or code block that is wrong.
                  </li>
                  <li>
                    <strong>Repository suggestions:</strong> send the GitHub link and why you find it useful.
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
