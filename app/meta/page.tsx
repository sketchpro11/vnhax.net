import type { Metadata } from 'next';
import CompanyHubLayout, { CompanyHubConfig } from '@/components/CompanyHubLayout';
import { getBlogsByCompany } from '@/lib/blog';
import { BRAND_CONFIG } from '@/lib/seo';

export const metadata: Metadata = {
  title: `Meta Llama Models, Meta Muse & Open Source AI Hub — ${BRAND_CONFIG.name}`,
  description:
    'Comprehensive guides, agent tutorials, and architecture teardowns for Meta Llama models, Meta Muse social agents, and Meta Enterprise Platform.',
  alternates: {
    canonical: `${BRAND_CONFIG.siteUrl}/meta`,
  },
  openGraph: {
    title: `Meta AI Hub — ${BRAND_CONFIG.name}`,
    description:
      'Explore open-source Llama model fine-tuning, Meta Muse agent workflows, WhatsApp commerce automation, and enterprise B2B platforms.',
    url: `${BRAND_CONFIG.siteUrl}/meta`,
    siteName: BRAND_CONFIG.name,
    type: 'website',
  },
};

const META_CONFIG: CompanyHubConfig = {
  key: 'meta',
  name: 'Meta',
  kicker: 'Open Source AI & Agents',
  title: 'Meta Llama Models, Meta Muse & Open Source AI Hub',
  description:
    'Hands-on tutorials, architecture comparisons, and enterprise deployment blueprints for Meta’s open-source AI ecosystem: Llama 4, Meta Muse social commerce agents, and WhatsApp Cloud APIs.',
  icon: (
    <svg width={26} height={26} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M6.915 4.03c-1.968 0-3.683 1.28-4.871 3.113C.704 9.208 0 11.883 0 14.449c0 .706.07 1.369.21 1.973a6.624 6.624 0 0 0 .265.86 5.297 5.297 0 0 0 .371.761c.696 1.159 1.818 1.927 3.593 1.927 1.497 0 2.633-.671 3.965-2.444.76-1.012 1.144-1.626 2.663-4.32l.756-1.339.186-.325c.061.1.121.196.183.3l2.152 3.595c.724 1.21 1.665 2.556 2.47 3.314 1.046.987 1.992 1.22 3.06 1.22 1.075 0 1.876-.355 2.455-.843a3.743 3.743 0 0 0 .81-.973c.542-.939.861-2.127.861-3.745 0-2.72-.681-5.357-2.084-7.45-1.282-1.912-2.957-2.93-4.716-2.93-1.047 0-2.088.467-3.053 1.308-.652.57-1.257 1.29-1.82 2.05-.69-.875-1.335-1.547-1.958-2.056-1.182-.966-2.315-1.303-3.454-1.303zm10.16 2.053c1.147 0 2.188.758 2.992 1.999 1.132 1.748 1.647 4.195 1.647 6.4 0 1.548-.368 2.9-1.839 2.9-.58 0-1.027-.23-1.664-1.004-.496-.601-1.343-1.878-2.832-4.358l-.617-1.028a44.908 44.908 0 0 0-1.255-1.98c.07-.109.141-.224.211-.327 1.12-1.667 2.118-2.602 3.358-2.602zm-10.201.553c1.265 0 2.058.791 2.675 1.446.307.327.737.871 1.234 1.579l-1.02 1.566c-.757 1.163-1.882 3.017-2.837 4.338-1.191 1.649-1.81 1.817-2.486 1.817-.524 0-1.038-.237-1.383-.794-.263-.426-.464-1.13-.464-2.046 0-2.221.63-4.535 1.66-6.088.454-.687.964-1.226 1.533-1.533a2.264 2.264 0 0 1 1.088-.285z" />
    </svg>
  ),
  focusTopics: [
    'Llama 4',
    'Meta Muse Agent',
    'Meta Enterprise Platform',
    'Meta One Subscription',
    'WhatsApp Commerce',
    'PyTorch Ecosystem',
  ],
  upcomingTopics: [
    {
      category: 'Agent Deployment',
      title: 'Meta Muse AI Agent: How to Deploy Across WhatsApp & Instagram',
      description: 'Step-by-step tutorial on building autonomous sales reps and social ad generators with Muse.',
    },
    {
      category: 'Creative Canvases',
      title: 'Meta Muse vs. OpenAI Dots vs. Gemini Spark: Full Comparison',
      description: 'Comparing social commerce canvases with developer logic graphs and Google Docs workflows.',
    },
    {
      category: 'Small Business AI',
      title: 'Meta Muse for Small Business: Turn DMs into 24/7 Automated Checkouts',
      description: 'Automating customer support queries and product catalogs without expensive agency retainers.',
    },
    {
      category: 'Enterprise Cloud',
      title: 'Meta Enterprise Platform: Private Llama Clusters & WhatsApp APIs',
      description: 'Sovereign VPC deployments, high-throughput cloud messaging, and SOC2 compliance.',
    },
  ],
};

export default async function MetaPage() {
  const articles = await getBlogsByCompany('meta');

  return <CompanyHubLayout config={META_CONFIG} articles={articles} />;
}
