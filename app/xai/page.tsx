import type { Metadata } from 'next';
import CompanyHubLayout, { CompanyHubConfig } from '@/components/CompanyHubLayout';
import { getBlogsByCompany } from '@/lib/blog';
import { BRAND_CONFIG } from '@/lib/seo';

export const metadata: Metadata = {
  title: 'xAI Grok & Frontier AI Hub',
  description:
    "Guides to xAI (now SpaceXAI) and Grok: Grok 4.7 vs 4.6 and API pricing, what's confirmed about Grok 4.8, 4.9 and Grok 5, and the SpaceXAI and SpaceXSI name changes.",
  alternates: {
    canonical: `${BRAND_CONFIG.siteUrl}/xai`,
  },
  openGraph: {
    title: `xAI Grok & Frontier AI Hub | ${BRAND_CONFIG.shortName}`,
    description:
      "Guides to xAI (now SpaceXAI) and Grok: Grok 4.7 vs 4.6 and API pricing, what's confirmed about Grok 4.8, 4.9 and Grok 5, and the SpaceXAI and SpaceXSI name changes.",
    url: `${BRAND_CONFIG.siteUrl}/xai`,
    siteName: BRAND_CONFIG.shortName,
    type: 'website',
  },
};

const XAI_CONFIG: CompanyHubConfig = {
  key: 'xai',
  name: 'xAI',
  kicker: 'Frontier AI & Real-Time Intelligence',
  title: 'xAI Grok Models & SpaceXAI Hub',
  description:
    "Guides to Grok models, pricing and xAI's company changes, with confirmed facts kept separate from rumours.",
  icon: (
    <svg width={26} height={26} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M2.6 2h5.1l4.3 5.9L16.3 2h5.1l-7 9.2 7.3 10.8h-5.1l-4.6-6.7-4.6 6.7H2.3l7.4-10.7L2.6 2z" />
    </svg>
  ),
  focusTopics: ["Grok 4.7", "Grok API pricing", "Grok 4.8 & Grok 5 status", "SpaceXAI / SpaceXSI"],
  intro: {
    heading: "xAI and Grok in October 2026: confirmed facts only",
    paragraphs: [
      "xAI's current model is Grok 4.7, released on 21 September 2026. It costs $2 per million input tokens and $6 per million output tokens, with a 500,000-token context window and cheaper cached input. Our comparison covers what changed from Grok 4.6 and what it really costs per request.",
      "The company itself has changed names twice in a few months. SpaceX acquired xAI in February 2026 and rebranded it SpaceXAI in July; on 4 October, Elon Musk said it will become SpaceXSI. For developers, the API and model IDs haven't changed.",
      "There is a lot of speculation about upcoming models. Grok 4.8 has been named by Musk as a 2.5-trillion-parameter model and is expected in October, but xAI hasn't announced a date or price. Grok 5 has no confirmed release date. Our roadmap tracker keeps confirmed facts and rumours clearly separate.",
      "Articles below link to xAI's developer docs and to reporting on official statements.",
    ],
  },
};

export default async function XAIPage() {
  const articles = await getBlogsByCompany('xai');

  return <CompanyHubLayout config={XAI_CONFIG} articles={articles} />;
}
