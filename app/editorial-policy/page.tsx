import type { Metadata } from 'next';
import Link from 'next/link';
import SiteHeader from '@/components/SiteHeader';
import SiteFooter from '@/components/SiteFooter';
import Breadcrumbs from '@/components/Breadcrumbs';
import { AUTHOR, AUTHOR_PAGE_PATH } from '@/lib/author';
import { BRAND_CONFIG, CONTACT_EMAIL, getBreadcrumbSchema } from '@/lib/seo';

export const metadata: Metadata = {
  title: 'Editorial Policy',
  description:
    'How VNHAX articles are researched, written, fact-checked and corrected, how AI tools are used, and how we stay independent from the companies we cover.',
  alternates: {
    canonical: `${BRAND_CONFIG.siteUrl}/editorial-policy`,
  },
  openGraph: {
    title: `Editorial Policy | ${BRAND_CONFIG.shortName}`,
    description: 'How VNHAX articles are researched, written, fact-checked and corrected.',
    url: `${BRAND_CONFIG.siteUrl}/editorial-policy`,
    siteName: BRAND_CONFIG.shortName,
    type: 'website',
  },
};

const SECTIONS = [
  { id: 'who-writes', title: 'Who Writes VNHAX' },
  { id: 'sources', title: 'Sources & Fact-Checking' },
  { id: 'hands-on', title: 'Hands-On Testing vs. Explainers' },
  { id: 'ai-use', title: 'Use of AI Tools' },
  { id: 'updates', title: 'Updates & Corrections' },
  { id: 'independence', title: 'Independence, Ads & Affiliate Links' },
  { id: 'speculation', title: 'Rumours & Upcoming Releases' },
  { id: 'feedback', title: 'Feedback' },
];

export default function EditorialPolicyPage() {
  const breadcrumbSchema = getBreadcrumbSchema([
    { name: 'Home', url: '/' },
    { name: 'Editorial Policy', url: '/editorial-policy' },
  ]);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      <SiteHeader variant="home" />

      <main className="policy-page">
        <div style={{ maxWidth: '820px', margin: '0 auto', padding: '0 16px' }}>
          <Breadcrumbs items={[{ label: 'Editorial Policy' }]} />

          <header className="policy-header">
            <h1 className="policy-title">Editorial Policy</h1>
            <p className="policy-lead">
              These are the rules every article on VNHAX follows. They exist so you know how much to trust what you
              read here, and what to do if something is wrong.
            </p>
            <div className="policy-meta-bar">
              <div className="policy-meta-item">
                <span>Last Updated:</span>
                <strong><time dateTime="2026-10-12">October 12, 2026</time></strong>
              </div>
            </div>
          </header>

          <nav aria-label="On this page" style={{ margin: '0 0 28px' }}>
            <ol style={{ paddingLeft: '20px', columns: 2, fontSize: '14px' }}>
              {SECTIONS.map((s) => (
                <li key={s.id}>
                  <a href={`#${s.id}`}>{s.title}</a>
                </li>
              ))}
            </ol>
          </nav>

          <div className="policy-content">
            <section id="who-writes" className="policy-section">
              <h2 className="policy-section-title">1. Who Writes VNHAX</h2>
              <p>
                VNHAX is written and edited by <Link href={AUTHOR_PAGE_PATH}>{AUTHOR.name}</Link>, a full-stack web
                developer since 2018. Every article shows its author and its publish and update dates. There are no
                anonymous or ghost-written posts.
              </p>
            </section>

            <section id="sources" className="policy-section">
              <h2 className="policy-section-title">2. Sources &amp; Fact-Checking</h2>
              <ul>
                <li>
                  <strong>Official sources first.</strong> Model releases, prices, limits and features are taken from the
                  company&apos;s own announcement, documentation, pricing page, model card or changelog.
                </li>
                <li>
                  <strong>Link what we use.</strong> Key facts link to their source so you can check them. Where reputable
                  news outlets add detail, we link to them too.
                </li>
                <li>
                  <strong>Numbers are attributed.</strong> Benchmark results are labelled with who produced them. Vendor
                  benchmarks are presented as the vendor&apos;s claims, not as independent results.
                </li>
                <li>
                  <strong>Dates on prices.</strong> Prices and plan limits change often, so they are stated with the date
                  they were checked.
                </li>
              </ul>
            </section>

            <section id="hands-on" className="policy-section">
              <h2 className="policy-section-title">3. Hands-On Testing vs. Explainers</h2>
              <p>
                Some articles are hands-on: I installed or used the tool, and the article shows real screenshots,
                commands, outputs or measurements. Others are explainers based on the published sources. An article only
                says &ldquo;I tested&rdquo; or &ldquo;in my testing&rdquo; when that is true. We never invent test results,
                screenshots, quotes or user numbers.
              </p>
            </section>

            <section id="ai-use" className="policy-section">
              <h2 className="policy-section-title">4. Use of AI Tools</h2>
              <p>
                VNHAX covers AI, and AI tools are part of how it is made: they help with research summaries, outlines,
                first drafts, code samples and proofreading. AI output is never published unchecked. Every article is
                reviewed against its sources and edited by a human, and the author is responsible for its accuracy.
              </p>
            </section>

            <section id="updates" className="policy-section">
              <h2 className="policy-section-title">5. Updates &amp; Corrections</h2>
              <ul>
                <li>
                  When a product changes (new price, new limits, new version), the article is updated and its
                  &ldquo;Updated&rdquo; date changes.
                </li>
                <li>
                  Factual errors are corrected as soon as they are confirmed. Significant corrections are noted in the
                  article.
                </li>
                <li>
                  Articles that become misleading because a product was discontinued are updated, redirected to a newer
                  article, or removed.
                </li>
              </ul>
            </section>

            <section id="independence" className="policy-section">
              <h2 className="policy-section-title">6. Independence, Ads &amp; Affiliate Links</h2>
              <p>
                VNHAX is not paid by any company it writes about, and no company reviews articles before they are
                published. The site may carry advertising (for example Google AdSense) to cover hosting costs;
                advertisers have no say in what is written. VNHAX does not currently use affiliate links. If sponsored
                content or affiliate links are ever added, they will be clearly labelled on the page where they appear.
              </p>
            </section>

            <section id="speculation" className="policy-section">
              <h2 className="policy-section-title">7. Rumours &amp; Upcoming Releases</h2>
              <p>
                Articles about products that have not been released clearly separate what the company has confirmed
                (with a link) from reports and rumours. We do not present predicted release dates or features as fact.
              </p>
            </section>

            <section id="feedback" className="policy-section">
              <h2 className="policy-section-title">8. Feedback</h2>
              <p>
                If you think something on VNHAX is wrong, unfair or out of date, email{' '}
                <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a> with the article link, or use the{' '}
                <Link href="/contact">contact form</Link>. See also <Link href="/about">About</Link> and our{' '}
                <Link href="/disclaimer">Disclaimer</Link>.
              </p>
            </section>
          </div>
        </div>
      </main>

      <SiteFooter />
    </>
  );
}
