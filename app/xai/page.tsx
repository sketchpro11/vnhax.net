import type { Metadata } from 'next';
import CompanyHubLayout, { CompanyHubConfig } from '@/components/CompanyHubLayout';
import { getBlogsByCompany } from '@/lib/blog';
import { BRAND_CONFIG } from '@/lib/seo';

export const metadata: Metadata = {
  title: `xAI Grok Models, Colossus & Frontier AI Hub — ${BRAND_CONFIG.name}`,
  description:
    'Technical benchmarks, architecture breakdowns, and pricing guides for xAI Grok 4.7 & 5, Colossus supercluster, and SpaceXAI orbital integrations.',
  alternates: {
    canonical: `${BRAND_CONFIG.siteUrl}/xai`,
  },
  openGraph: {
    title: `xAI Hub — ${BRAND_CONFIG.name}`,
    description:
      'In-depth engineering analyses of xAI Grok models, Colossus 200k GPU infrastructure, real-time X telemetry, and developer APIs.',
    url: `${BRAND_CONFIG.siteUrl}/xai`,
    siteName: BRAND_CONFIG.name,
    type: 'website',
  },
};

const XAI_CONFIG: CompanyHubConfig = {
  key: 'xai',
  name: 'xAI',
  kicker: 'Frontier AI & Real-Time Intelligence',
  title: 'xAI Grok Models, Colossus & Frontier AI Hub',
  description:
    'Comprehensive evaluations, API pricing analyses, and hardware scaling deep-dives for Elon Musk’s xAI: Grok 4.7, Colossus supercluster milestones, and upcoming Grok 5 models.',
  icon: (
    <svg width={26} height={26} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M2.6 2h5.1l4.3 5.9L16.3 2h5.1l-7 9.2 7.3 10.8h-5.1l-4.6-6.7-4.6 6.7H2.3l7.4-10.7L2.6 2z" />
    </svg>
  ),
  focusTopics: [
    'Grok 4.7',
    'Grok 5 Roadmap',
    'Colossus Supercluster',
    'Grok API Pricing',
    'SpaceXAI Convergence',
    'Real-Time Telemetry',
  ],
  upcomingTopics: [
    {
      category: 'Model Benchmarks',
      title: 'Grok 4.7 vs. Grok 4.6: Colossus Scaling & Coding Accuracy',
      description: 'How training on 200,000+ GPUs reduced hallucinations and accelerated code synthesis.',
    },
    {
      category: 'Developer Pricing',
      title: 'Grok 4.7 API Pricing: Input, Output & Prompt Caching Discounts',
      description: 'Detailed cost breakdown per 1M tokens, 75% cached context savings, and tier limits.',
    },
    {
      category: 'Next-Gen Roadmaps',
      title: 'Grok 5 Release Date & Specs: The Multi-Modal Physics Giant',
      description: 'Anticipated launch dates, Nvidia Blackwell B200 clusters, and Tesla FSD neural fusion.',
    },
    {
      category: 'Aerospace Convergence',
      title: 'What Is SpaceXAI? Merging Grok with Starlink Orbital Compute',
      description: 'Running neural nets in orbit, autonomous rocket telemetry, and off-grid Mars copilots.',
    },
  ],
};

export default async function XAIPage() {
  const articles = await getBlogsByCompany('xai');

  return <CompanyHubLayout config={XAI_CONFIG} articles={articles} />;
}
