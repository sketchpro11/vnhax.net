import type { Metadata } from 'next';
import Link from 'next/link';
import SiteHeader from '@/components/SiteHeader';
import SiteFooter from '@/components/SiteFooter';
import Breadcrumbs from '@/components/Breadcrumbs';
import ReadingProgressBar from '@/components/ReadingProgressBar';
import AboutTableOfContents from '@/components/AboutTableOfContents';
import { BRAND_CONFIG, CONTACT_EMAIL, getBreadcrumbSchema } from '@/lib/seo';

export const metadata: Metadata = {
  title: 'About VNHAX',
  description:
    'VNHAX is an independent site by developer Umar Hashmi covering AI models, developer tools, and open-source projects in plain English. Learn who runs it and how articles are made.',
  alternates: {
    canonical: `${BRAND_CONFIG.siteUrl}/about`,
  },
  openGraph: {
    title: `About | ${BRAND_CONFIG.shortName}`,
    description:
      'Who runs VNHAX, what we publish, how articles are researched and written, and how to send corrections.',
    url: `${BRAND_CONFIG.siteUrl}/about`,
    siteName: BRAND_CONFIG.shortName,
    type: 'website',
    images: [
      {
        url: `${BRAND_CONFIG.siteUrl}/og-image.png`,
        width: 1200,
        height: 630,
        alt: `About ${BRAND_CONFIG.shortName}`,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: `About ${BRAND_CONFIG.shortName}`,
    description: 'Who runs VNHAX, what we publish, and how articles are made.',
    images: [`${BRAND_CONFIG.siteUrl}/og-image.png`],
  },
};

export default function AboutPage() {
  const lastUpdated = 'October 11, 2026';

  const breadcrumbSchema = getBreadcrumbSchema([
    { name: 'Home', url: '/' },
    { name: 'About', url: '/about' },
  ]);

  const aboutSchema = {
    '@context': 'https://schema.org',
    '@type': 'AboutPage',
    '@id': `${BRAND_CONFIG.siteUrl}/about/#about`,
    url: `${BRAND_CONFIG.siteUrl}/about`,
    name: `About ${BRAND_CONFIG.shortName}`,
    description: BRAND_CONFIG.description,
    mainEntity: {
      '@type': 'Organization',
      name: BRAND_CONFIG.shortName,
      alternateName: BRAND_CONFIG.acronymExplanation,
      url: BRAND_CONFIG.siteUrl,
      logo: `${BRAND_CONFIG.siteUrl}/logo.png`,
      foundingDate: '2026-10',
      founder: {
        '@type': 'Person',
        name: 'Umar Hashmi',
        url: 'https://www.umarhashmi.dev',
        sameAs: BRAND_CONFIG.socialLinks.map((l) => l.url),
      },
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(aboutSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <ReadingProgressBar />
      <SiteHeader variant="home" />

      <main className="policy-page">
        <article className="policy-layout">
          <div className="policy-main">
            <Breadcrumbs items={[{ label: 'About Us' }]} />

            <header className="policy-header">
              <h1 className="policy-title">About VNHAX</h1>

              <p className="policy-lead">
                VNHAX is a small, independent website about artificial intelligence and developer tools. It explains
                new AI models, coding assistants, and open-source projects in plain English, so developers and curious
                readers can decide what is worth their time.
              </p>

              <div className="policy-meta-bar">
                <div className="policy-meta-item">
                  <span>Launched:</span>
                  <strong>October 2026</strong>
                </div>
                <div className="policy-meta-item">
                  <span>Last Updated:</span>
                  <strong><time dateTime="2026-10-11">{lastUpdated}</time></strong>
                </div>
              </div>
            </header>

            <div className="policy-content">
              <section id="who-runs-vnhax" className="policy-section">
                <div className="policy-section-header">
                  <span className="policy-section-number">01</span>
                  <h2 className="policy-section-title">Who Runs VNHAX</h2>
                </div>

                <div className="about-team-card" style={{ margin: '24px 0' }}>
                  <div className="about-team-avatar" aria-hidden="true">
                    UH
                  </div>
                  <div className="about-team-info">
                    <h3 className="about-team-name">Umar Hashmi</h3>
                    <div className="about-team-role">Founder &amp; Editor</div>
                    <p className="about-team-bio">
                      I&apos;m a full-stack web developer and UI/UX designer. I have been building websites and web
                      apps as a freelancer since 2018, mostly with React, Next.js, Node.js and MongoDB, and since 2022
                      I have been building AI-powered tools and automations with the OpenAI and Gemini APIs.
                    </p>
                    <div className="about-team-tags">
                      <span className="about-team-tag">React &amp; Next.js</span>
                      <span className="about-team-tag">Node.js</span>
                      <span className="about-team-tag">UI/UX Design</span>
                      <span className="about-team-tag">AI APIs &amp; Automation</span>
                    </div>
                    <p className="about-team-bio" style={{ marginTop: '12px' }}>
                      <a href="https://www.umarhashmi.dev" target="_blank" rel="noopener noreferrer me">Portfolio</a>
                      {' · '}
                      <a href="https://github.com/umarhashmi-dev" target="_blank" rel="noopener noreferrer me">GitHub</a>
                      {' · '}
                      <a href="https://www.linkedin.com/in/umarhashmi-dev" target="_blank" rel="noopener noreferrer me">LinkedIn</a>
                      {' · '}
                      <a href="https://x.com/umarhashmi_dev" target="_blank" rel="noopener noreferrer me">X</a>
                    </p>
                  </div>
                </div>

                <p>
                  I started VNHAX because I use AI coding tools and models every day, and keeping up with them is
                  hard. New models, price changes and &ldquo;agent&rdquo; products ship almost weekly, and most coverage
                  is either hype or a copy of the press release. I wanted one place that explains what actually changed
                  and who it matters for.
                </p>
                <p>
                  VNHAX is a one-person project. There is no company or newsroom behind it.
                </p>
              </section>

              <section id="what-we-publish" className="policy-section">
                <div className="policy-section-header">
                  <span className="policy-section-number">02</span>
                  <h2 className="policy-section-title">What You&apos;ll Find Here</h2>
                </div>
                <ul>
                  <li>
                    <strong>AI model and product explainers:</strong> what new releases from OpenAI, Anthropic, Google,
                    xAI, Meta and GitHub do, what they cost, and who can use them.
                  </li>
                  <li>
                    <strong>Developer guides:</strong> setting up and using tools such as Ollama, Claude Code and GitHub
                    Copilot, and keeping AI API costs under control.
                  </li>
                  <li>
                    <strong>Open-source repository reviews:</strong> plain-English write-ups of popular GitHub projects,
                    with live star counts and links back to the original repository.
                  </li>
                  <li>
                    <strong>UI components:</strong> React/CSS component demos. Several are adapted from the open-source{' '}
                    <a href="https://magicui.design" target="_blank" rel="noopener noreferrer">Magic UI</a> library and
                    are labelled as such.
                  </li>
                </ul>
              </section>

              <section id="how-articles-are-made" className="policy-section">
                <div className="policy-section-header">
                  <span className="policy-section-number">03</span>
                  <h2 className="policy-section-title">How Articles Are Researched</h2>
                </div>
                <p>
                  News and product articles are based on official sources first: company announcements, documentation,
                  pricing pages, model cards and changelogs. Where reliable news outlets add useful detail, I link to
                  them as well. Prices, limits and release dates are written with the date they were checked, because
                  they change often.
                </p>
                <p>
                  When I have installed or tried something myself, the article says so and shows what I saw. When I
                  haven&apos;t, the article is an explainer based on the sources, and it does not pretend otherwise.
                  Benchmark numbers come from the company or project that published them unless the article clearly says
                  they are my own measurements.
                </p>
              </section>

              <section id="use-of-ai" className="policy-section">
                <div className="policy-section-header">
                  <span className="policy-section-number">04</span>
                  <h2 className="policy-section-title">How AI Tools Are Used</h2>
                </div>
                <p>
                  This is a site about AI, and I use AI tools while working on it: for research summaries, outlines, first
                  drafts and code. Every article is then checked against its sources, edited and published by me, and I am
                  responsible for what it says. If you find something that is wrong, please tell me.
                </p>
              </section>

              <section id="corrections" className="policy-section">
                <div className="policy-section-header">
                  <span className="policy-section-number">05</span>
                  <h2 className="policy-section-title">Corrections &amp; Updates</h2>
                </div>
                <p>
                  AI products change quickly, so articles are updated when prices, limits or features change, and the
                  &ldquo;Updated&rdquo; date on the article changes with them. If you spot an error, email{' '}
                  <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a> with the article link and I will fix it.
                </p>
              </section>

              <section id="independence" className="policy-section">
                <div className="policy-section-header">
                  <span className="policy-section-number">06</span>
                  <h2 className="policy-section-title">Independence &amp; Advertising</h2>
                </div>
                <p>
                  VNHAX is not affiliated with, sponsored by, or paid by OpenAI, Anthropic, Google, GitHub, Meta,
                  Microsoft, xAI or any project we write about. Product names and logos belong to their owners and are
                  used only to identify what an article is about.
                </p>
                <p>
                  All content is free to read. The site may show advertising in the future to cover hosting costs.
                  Advertisers will never decide what we write, and sponsored content, if there ever is any, will be
                  clearly labelled.
                </p>
              </section>

              <section id="the-name" className="policy-section">
                <div className="policy-section-header">
                  <span className="policy-section-number">07</span>
                  <h2 className="policy-section-title">About the Name</h2>
                </div>
                <p>
                  VNHAX stands for <strong>Virtual Next-Gen Hub for AI &amp; eXploration</strong>. The site publishes
                  only legitimate educational content about software and AI. It does not publish or link to cracked
                  software, game cheats or hacking tools.
                </p>
              </section>

              <section id="contact" className="policy-section">
                <div className="policy-section-header">
                  <span className="policy-section-number">08</span>
                  <h2 className="policy-section-title">Get in Touch</h2>
                </div>
                <ul>
                  <li>
                    <strong>Email:</strong> <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>
                  </li>
                  <li>
                    <strong>Contact form:</strong> <Link href="/contact">vnhax.net/contact</Link>
                  </li>
                  <li>
                    <strong>Policies:</strong> <Link href="/privacy-policy">Privacy Policy</Link>,{' '}
                    <Link href="/terms">Terms</Link> and <Link href="/disclaimer">Disclaimer</Link>
                  </li>
                </ul>
              </section>
            </div>
          </div>

          <AboutTableOfContents />
        </article>
      </main>

      <SiteFooter />
    </>
  );
}
