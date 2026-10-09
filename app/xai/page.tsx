import type { Metadata } from 'next';
import CompanyHubLayout, { CompanyHubConfig } from '@/components/CompanyHubLayout';
import { getBlogsByCompany } from '@/lib/blog';
import { BRAND_CONFIG } from '@/lib/seo';

export const metadata: Metadata = {
  title: 'xAI Grok & Frontier AI Hub',
  description:
    'Technical benchmarks, architecture breakdowns, and pricing guides for xAI Grok 4.7 & 5, Colossus supercluster, and SpaceXAI orbital integrations.',
  alternates: {
    canonical: `${BRAND_CONFIG.siteUrl}/xai`,
  },
  openGraph: {
    title: `xAI Grok & Frontier AI Hub | ${BRAND_CONFIG.shortName}`,
    description:
      'In-depth engineering analyses of xAI Grok models, Colossus 200k GPU infrastructure, real-time X telemetry, and developer APIs.',
    url: `${BRAND_CONFIG.siteUrl}/xai`,
    siteName: BRAND_CONFIG.shortName,
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
      category: 'Audio Architecture',
      title: 'Grok Voice Reflex: Sub-50ms Speech-to-Speech Direct Audio Transformers',
      description: 'Continuous duplex streaming, low-latency audio tokenization, and emotional modulation.',
    },
    {
      category: 'Agent Frameworks',
      title: 'Grok Bot Harness: Autonomous Multi-Agent Reasoning on Social Streams',
      description: 'Architecting persistent social agents, structured tool calling, and live data verification.',
    },
    {
      category: 'Autonomous Vehicles',
      title: 'Tesla FSD Neural Net Convergence: Spatial Video Reasoning in Grok',
      description: 'Fusing real-world automotive camera streams with generative multimodal reasoning transformers.',
    },
    {
      category: 'Datacenter Engineering',
      title: 'Colossus 3 Horizon: Multi-Gigawatt Substation Integration for Grok 6',
      description: 'Long-term power purchase agreements, nuclear micro-reactors, and high-density liquid infrastructure.',
    },
  ],
};

export default async function XAIPage() {
  const articles = await getBlogsByCompany('xai');

  return <CompanyHubLayout config={XAI_CONFIG} articles={articles} />;
}
