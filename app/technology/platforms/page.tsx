import type { Metadata } from 'next';
import Link from 'next/link';
import SiteHeader from '@/components/SiteHeader';
import SiteFooter from '@/components/SiteFooter';
import Breadcrumbs from '@/components/Breadcrumbs';
import { BRAND_CONFIG } from '@/lib/seo';

export const metadata: Metadata = {
  title: 'Tech Platform Evaluation Framework',
  description:
    'A practical framework for evaluating technology platforms: integration fit, data portability, security boundaries, operational cost, and team velocity.',
  alternates: {
    canonical: `${BRAND_CONFIG.siteUrl}/technology/platforms`,
  },
};

export default function PlatformsPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'CollectionPage',
            name: 'Technology Platform Evaluation Framework',
            description:
              'A practical framework for evaluating technology platforms: integration, portability, security, operational cost, and team fit.',
            url: `${BRAND_CONFIG.siteUrl}/technology/platforms`,
            isPartOf: {
              '@type': 'CollectionPage',
              name: 'Tech Platforms',
              url: `${BRAND_CONFIG.siteUrl}/technology`,
            },
          }),
        }}
      />

      <SiteHeader activeNav="technology" variant="standard" />

      <main className="hub-page">
        <div className="hub-inner">
          <Breadcrumbs
            items={[
              { label: 'Tech Platforms', href: '/technology' },
              { label: 'Platform Evaluation Guide' },
            ]}
          />

          <header className="hub-header">
            <p className="section-kicker">Architecture &amp; Strategy</p>
            <h1 className="page-title">platform evaluation guide</h1>
            <p className="page-lede">
              A platform is more than a feature checklist. The crucial question is whether it can carry your operational work safely, predictably, and without creating an insurmountable maintenance or billing debt your team cannot afford.
            </p>
          </header>

          <section className="hub-note hub-note--wide">
            <h2>Five Essential Questions Before Adopting Any Platform</h2>
            <ol style={{ paddingLeft: '22px', lineHeight: 1.75, color: '#334155' }}>
              <li style={{ marginBottom: '16px' }}>
                <strong style={{ color: '#0f172a' }}>1. Does it fit your current architecture without massive refactoring?</strong>
                <p style={{ margin: '4px 0 0', fontSize: '14px', color: '#475569' }}>
                  Map required network ingress, egress protocols, data models, and identity boundaries before a proof of concept becomes an unmaintainable production dependency.
                </p>
              </li>
              <li style={{ marginBottom: '16px' }}>
                <strong style={{ color: '#0f172a' }}>2. Can your team change course if pricing or terms change?</strong>
                <p style={{ margin: '4px 0 0', fontSize: '14px', color: '#475569' }}>
                  Evaluate data export capabilities, API portability, and whether your code can run on standard OCI containers or alternative clouds with minimal friction.
                </p>
              </li>
              <li style={{ marginBottom: '16px' }}>
                <strong style={{ color: '#0f172a' }}>3. Who owns operational health and observability?</strong>
                <p style={{ margin: '4px 0 0', fontSize: '14px', color: '#475569' }}>
                  Account for telemetry, logging costs, incident escalation, regional failovers, and upgrade maintenance windows—not merely day-one provisioning.
                </p>
              </li>
              <li style={{ marginBottom: '16px' }}>
                <strong style={{ color: '#0f172a' }}>4. What enters the vendor trust and compliance boundary?</strong>
                <p style={{ margin: '4px 0 0', fontSize: '14px', color: '#475569' }}>
                  Review model data retention policies, zero-training commitments, SOC 2 Type II audit attestations, and compliance with GDPR and CCPA.
                </p>
              </li>
              <li style={{ marginBottom: '16px' }}>
                <strong style={{ color: '#0f172a' }}>5. What does success look like under peak production scale?</strong>
                <p style={{ margin: '4px 0 0', fontSize: '14px', color: '#475569' }}>
                  Define measurable latency SLAs (p95, p99), token throughput, and maximum monthly budget caps before moving mission-critical production workloads.
                </p>
              </li>
            </ol>
          </section>

          <div style={{ marginTop: '36px', textAlign: 'center' }}>
            <Link href="/technology" className="btn btn--dark">
              Return to Tech Platforms Hub
            </Link>
          </div>
        </div>
      </main>

      <SiteFooter />
    </>
  );
}
