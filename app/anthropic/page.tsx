import type { Metadata } from 'next';
import CompanyHubLayout, { CompanyHubConfig } from '@/components/CompanyHubLayout';
import { getBlogsByCompany } from '@/lib/blog';
import { BRAND_CONFIG } from '@/lib/seo';

export const metadata: Metadata = {
  title: 'Anthropic Claude & Safety Hub',
  description:
    'Deep-dive articles, architectural comparisons, and hands-on guides for Anthropic Claude models: Opus, Sonnet, Haiku, MCP protocols, and Constitutional AI.',
  alternates: {
    canonical: `${BRAND_CONFIG.siteUrl}/anthropic`,
  },
  openGraph: {
    title: `Anthropic Claude & Safety Hub | ${BRAND_CONFIG.shortName}`,
    description:
      'In-depth architectural analysis and developer guides for Claude Opus, Sonnet 5.5, MCP integrations, and enterprise safety.',
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
    'Hands-on technical teardowns, coding benchmarks, and system guides for Anthropic’s Claude frontier models, Model Context Protocol (MCP 2.0) infrastructure, and Constitutional AI guardrails.',
  icon: (
    <svg width={26} height={26} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M17.3041 3.541h-3.6718l6.696 16.918H24Zm-10.6082 0L0 20.459h3.7442l1.3693-3.5527h7.0052l1.3693 3.5528h3.7442L10.5363 3.5409Zm-.3712 10.2232 2.2914-5.9456 2.2914 5.9456Z" />
    </svg>
  ),
  focusTopics: [
    'Claude Opus 5.5',
    'Claude Sonnet 5.5',
    'Claude Fable 5.1',
    'Claude Mythos',
    'Model Context Protocol (MCP)',
    'Enterprise Safeguards',
  ],
  upcomingTopics: [
    {
      category: 'Formal Verification',
      title: 'Claude Mythos 5.2: Formal Software Synthesis & Zero-Defect Code Generation',
      description: 'Formal logic synthesis in Lean 4 and mathematical proof validation for mission-critical software systems.',
    },
    {
      category: 'Protocol Standards',
      title: 'Model Context Protocol (MCP 2.0): Dynamic Tool Discovery & Auth',
      description: 'Implementing distributed MCP server meshes, enterprise OAuth2 scopes, and protocol bridges.',
    },
    {
      category: 'Safety Systems',
      title: 'Constitutional Classifiers++: Zero-Latency Jailbreak Interception',
      description: 'Real-time adversarial prompt evaluation with under 0.05% false refusal rates in production.',
    },
    {
      category: 'Edge & Micro-Agents',
      title: 'Claude Haiku 5: Sub-100ms Inference & High-Concurrency Swarms',
      description: 'Routing high-volume semantic triage through low-cost, ultra-low latency micro-models.',
    },
  ],
};

export default async function AnthropicPage() {
  const articles = await getBlogsByCompany('anthropic');

  return <CompanyHubLayout config={ANTHROPIC_CONFIG} articles={articles} />;
}
