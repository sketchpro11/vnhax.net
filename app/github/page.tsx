import type { Metadata } from 'next';
import CompanyHubLayout, { CompanyHubConfig } from '@/components/CompanyHubLayout';
import { getBlogsByCompany } from '@/lib/blog';
import { BRAND_CONFIG } from '@/lib/seo';

export const metadata: Metadata = {
  title: 'GitHub Copilot & Developer Tools Hub',
  description:
    "Guides to GitHub Copilot: HydraFusion and Auto model routing, code review effort levels and costs, upfront seat billing, local sandboxing, and agent workflows.",
  alternates: {
    canonical: `${BRAND_CONFIG.siteUrl}/github`,
  },
  openGraph: {
    title: `GitHub Copilot & Developer Tools Hub | ${BRAND_CONFIG.shortName}`,
    description:
      "Guides to GitHub Copilot: HydraFusion and Auto model routing, code review effort levels and costs, upfront seat billing, local sandboxing, and agent workflows.",
    url: `${BRAND_CONFIG.siteUrl}/github`,
    siteName: BRAND_CONFIG.shortName,
    type: 'website',
  },
};

const GITHUB_CONFIG: CompanyHubConfig = {
  key: 'github',
  name: 'GitHub',
  kicker: 'Developer Tools & Repos',
  title: 'GitHub Developer Tools, Copilot & Open Source Hub',
  description:
    "Practical guides to GitHub Copilot features, billing and security, based on GitHub's changelog and documentation.",
  icon: (
    <svg width={26} height={26} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
    </svg>
  ),
  focusTopics: ["HydraFusion", "Copilot code review", "Upfront seat billing", "Local sandboxing", "Agent workflows"],
  intro: {
    heading: "GitHub Copilot in October 2026: what changed for teams",
    paragraphs: [
      "GitHub Copilot changed in several ways that matter to teams this autumn. HydraFusion, a research preview, orchestrates several models per task using Single, Cascade or Critique patterns, while Auto still picks one model per request. Our guide explains when each makes sense and how HydraFusion is billed.",
      "Copilot code review now defaults to the Balanced effort level (since 28 September 2026), which gives deeper reviews but uses more AI credits than Lite. Reviews can be requested automatically through branch rulesets or through the new REST and GraphQL APIs.",
      "Billing changed too: since 1 October 2026, Copilot Business and Enterprise customers paying by card or PayPal are charged for seats upfront, and removing a seat mid-cycle doesn't give a prorated refund. Seat audits before renewal are now worth doing.",
      "Every article links to the relevant GitHub changelog entries and docs, so you can check details against GitHub's own wording.",
    ],
  },
};

export default async function GitHubPage() {
  const articles = await getBlogsByCompany('github');

  return <CompanyHubLayout config={GITHUB_CONFIG} articles={articles} />;
}
