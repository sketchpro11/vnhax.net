import type { Metadata } from 'next';
import CompanyHubLayout, { CompanyHubConfig } from '@/components/CompanyHubLayout';
import { getBlogsByCompany } from '@/lib/blog';
import { BRAND_CONFIG } from '@/lib/seo';

export const metadata: Metadata = {
  title: `Google Gemini Models, DeepMind & Research Hub — ${BRAND_CONFIG.name}`,
  description:
    'Technical guides, architecture teardowns, and benchmarks on Google DeepMind’s Gemini models, TPU v6 infrastructure, and developer tools.',
  alternates: {
    canonical: `${BRAND_CONFIG.siteUrl}/google`,
  },
  openGraph: {
    title: `Google AI Hub — ${BRAND_CONFIG.name}`,
    description:
      'In-depth technical coverage of Gemini 4 Argon, 3.8 Flash, TPU silicon, and DeepMind autonomous research.',
    url: `${BRAND_CONFIG.siteUrl}/google`,
    siteName: BRAND_CONFIG.name,
    type: 'website',
  },
};

const GOOGLE_CONFIG: CompanyHubConfig = {
  key: 'google',
  name: 'Google',
  kicker: 'DeepMind & Cloud AI',
  title: 'Google Gemini Models, DeepMind & Cloud AI Hub',
  description:
    'Comprehensive analysis of Google DeepMind’s multimodal frontier: Gemini 4 Argon, Gemini 3.8 Flash high-throughput systems, custom TPU v6 Trillium silicon, and native desktop workflows.',
  icon: (
    <svg width={26} height={26} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z" />
    </svg>
  ),
  focusTopics: [
    'Gemini 4 Argon',
    'Gemini 3.8 Flash',
    'Gemini Cyber',
    'DeepMind Research',
    'Googlebook AI',
    'TPU v6 Trillium',
  ],
  upcomingTopics: [
    {
      category: 'Hardware Accelerators',
      title: 'TPU v6 Trillium Clusters: Mega-Scale Distributed Training on Cloud Pods',
      description: 'Analyzing high-bandwidth optical circuit switches, matrix multiplication units, and energy efficiency.',
    },
    {
      category: 'Mathematical AI',
      title: 'AlphaProof & AlphaGeometry 2: Olympiad-Tier Formal Reasoning',
      description: 'Formal logic synthesis in Lean 4, automated geometric theorem proving, and verification loops.',
    },
    {
      category: 'Frontier Reasoning',
      title: 'Gemini 4 Pro: Million-Token Needle Retrieval & Deep Mathematical Synthesis',
      description: 'Extending long-context associative recall, hierarchical KV caching, and continuous code comprehension.',
    },
    {
      category: 'Open Source Models',
      title: 'Gemma 3 Open Weights: On-Device Vision-Language Distillation',
      description: 'Fine-tuning lightweight Gemma models for local edge inference on smartphones and single-board computers.',
    },
  ],
};

export default async function GooglePage() {
  const articles = await getBlogsByCompany('google');

  return <CompanyHubLayout config={GOOGLE_CONFIG} articles={articles} />;
}
