import type { Metadata } from 'next';
import CompanyHubLayout, { CompanyHubConfig } from '@/components/CompanyHubLayout';
import { getBlogsByCompany } from '@/lib/blog';
import { BRAND_CONFIG } from '@/lib/seo';

export const metadata: Metadata = {
  title: 'Anthropic Claude & Safety Hub',
  description:
    "Guides to Anthropic's Claude models: Opus 5.5, Fable 5.1 and Mythos 5.1, Sonnet 5.5, the Sonnet 4.5 retirement, and Enterprise Frontier Safeguards, with official sources.",
  alternates: {
    canonical: `${BRAND_CONFIG.siteUrl}/anthropic`,
  },
  openGraph: {
    title: `Anthropic Claude & Safety Hub | ${BRAND_CONFIG.shortName}`,
    description:
      "Guides to Anthropic's Claude models: Opus 5.5, Fable 5.1 and Mythos 5.1, Sonnet 5.5, the Sonnet 4.5 retirement, and Enterprise Frontier Safeguards, with official sources.",
    url: `${BRAND_CONFIG.siteUrl}/anthropic`,
    siteName: BRAND_CONFIG.shortName,
    type: 'website',
  },
};

const ANTHROPIC_CONFIG: CompanyHubConfig = {
  key: 'anthropic',
  name: 'Anthropic',
  kicker: 'Frontier AI & Safety',
  title: 'Anthropic Claude Models, MCP & Safety Hub',
  description:
    "Guides to Claude models, pricing, migrations and Anthropic's enterprise safeguards, based on Anthropic's announcements and developer docs.",
  icon: (
    <svg width={26} height={26} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M17.3041 3.541h-3.6718l6.696 16.918H24Zm-10.6082 0L0 20.459h3.7442l1.3693-3.5527h7.0052l1.3693 3.5528h3.7442L10.5363 3.5409Zm-.3712 10.2232 2.2914-5.9456 2.2914 5.9456Z" />
    </svg>
  ),
  focusTopics: ["Claude Opus 5.5", "Fable 5.1 & Mythos 5.1", "Sonnet 5.5", "Sonnet 4.5 retirement", "Enterprise Frontier Safeguards"],
  intro: {
    heading: "Claude in October 2026: which model to use",
    paragraphs: [
      "Anthropic's current lineup has four main models. Anthropic's own advice is to start with Claude Opus 5.5 for most workloads ($4 / $20 per million input/output tokens), move to Claude Fable 5.1 ($10 / $50) for the hardest long-horizon tasks, use Sonnet 5.5 for a balance of speed and cost, and Haiku 5.5 for high-volume classification and extraction.",
      "Claude Fable 5.1 and Claude Mythos 5.1, released on 1 September 2026, are the same model with different safeguards. Mythos is only available to verified security and life-sciences organizations. Our explainer covers who qualifies and what changed in Fable 5.1, including 60% fewer cyber false positives.",
      "If you still run Claude Sonnet 4.5, note that it retires on the Claude API on 30 November 2026. Our migration guide lists the five request settings that now return errors on Sonnet 5.5 and how to fix them.",
      "For regulated companies, Enterprise Frontier Safeguards is the key announcement: monitoring data stays in your own cloud and alerts go to your own reviewers. All articles link to Anthropic's docs and show when they were last checked.",
    ],
  },
};

export default async function AnthropicPage() {
  const articles = await getBlogsByCompany('anthropic');

  return <CompanyHubLayout config={ANTHROPIC_CONFIG} articles={articles} />;
}
