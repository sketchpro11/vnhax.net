import type { Metadata } from 'next';
import CompanyHubLayout, { CompanyHubConfig } from '@/components/CompanyHubLayout';
import { getBlogsByCompany } from '@/lib/blog';
import { BRAND_CONFIG } from '@/lib/seo';

export const metadata: Metadata = {
  title: `GitHub Copilot, Developer Tools & Repos Hub — ${BRAND_CONFIG.name}`,
  description:
    'Guides, benchmarks, and tutorials for GitHub Copilot, Project HydraFusion, automated PR code reviews, and open-source developer workflows.',
  alternates: {
    canonical: `${BRAND_CONFIG.siteUrl}/github`,
  },
  openGraph: {
    title: `GitHub Developer Hub — ${BRAND_CONFIG.name}`,
    description:
      'Explore GitHub Copilot optimizations, automated PR review workflows, sandboxing security, and top open-source tooling.',
    url: `${BRAND_CONFIG.siteUrl}/github`,
    siteName: BRAND_CONFIG.name,
    type: 'website',
  },
};

const GITHUB_CONFIG: CompanyHubConfig = {
  key: 'github',
  name: 'GitHub',
  kicker: 'Developer Tools & Repos',
  title: 'GitHub Developer Tools, Copilot & Open Source Hub',
  description:
    'Deep engineering breakdowns, pull-request automation guides, and multi-model benchmarking for GitHub Copilot, Project HydraFusion, and modern developer infrastructure.',
  icon: (
    <svg width={26} height={26} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
    </svg>
  ),
  focusTopics: [
    'GitHub Copilot',
    'Project HydraFusion',
    'Automated Code Reviews',
    'Local Sandboxing',
    'Open Source Repos',
    'Prepaid Seat Billing',
  ],
  upcomingTopics: [
    {
      category: 'PR Automation',
      title: 'How to Automate PR Code Reviews & Merge Approvals with Copilot',
      description: 'Configuring automated pull-request inspections, inline vulnerability scans, and branch rules.',
    },
    {
      category: 'Multi-Model Engine',
      title: 'Inside Project HydraFusion: Speculative Multi-Model Code Synthesis',
      description: 'How GitHub Copilot dynamically routes between Grok, Claude, and GPT for zero latency.',
    },
    {
      category: 'Security & Sandboxing',
      title: 'GitHub Copilot Local Sandboxing: Micro-Containers & Host Protection',
      description: 'Running autonomous agent loops safely without host credential leaks or machine damage.',
    },
    {
      category: 'Enterprise Billing',
      title: 'GitHub Copilot Upfront Prepaid Seats: Official Billing Policy',
      description: 'Understanding the no-prorated-refund policy, pooled AI credits, and license audits.',
    },
  ],
};

export default async function GitHubPage() {
  const articles = await getBlogsByCompany('github');

  return <CompanyHubLayout config={GITHUB_CONFIG} articles={articles} />;
}
