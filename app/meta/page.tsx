import type { Metadata } from 'next';
import CompanyHubLayout, { CompanyHubConfig } from '@/components/CompanyHubLayout';
import { getBlogsByCompany } from '@/lib/blog';
import { BRAND_CONFIG } from '@/lib/seo';

export const metadata: Metadata = {
  title: 'Meta Llama & Open Source AI Hub',
  description:
    "Guides to Meta's AI products: the Muse personal agent, Meta One subscriptions, and running Llama models locally, with links to launch coverage and sources.",
  alternates: {
    canonical: `${BRAND_CONFIG.siteUrl}/meta`,
  },
  openGraph: {
    title: `Meta Llama & Open Source AI Hub | ${BRAND_CONFIG.shortName}`,
    description:
      "Guides to Meta's AI products: the Muse personal agent, Meta One subscriptions, and running Llama models locally, with links to launch coverage and sources.",
    url: `${BRAND_CONFIG.siteUrl}/meta`,
    siteName: BRAND_CONFIG.shortName,
    type: 'website',
  },
};

const META_CONFIG: CompanyHubConfig = {
  key: 'meta',
  name: 'Meta',
  kicker: 'Open Source AI & Agents',
  title: 'Meta Llama Models, Meta Muse & Open Source AI Hub',
  description:
    "Guides to Meta's AI agents, subscriptions and open models, with sources for every claim.",
  icon: (
    <svg width={26} height={26} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M6.915 4.03c-1.968 0-3.683 1.28-4.871 3.113C.704 9.208 0 11.883 0 14.449c0 .706.07 1.369.21 1.973a6.624 6.624 0 0 0 .265.86 5.297 5.297 0 0 0 .371.761c.696 1.159 1.818 1.927 3.593 1.927 1.497 0 2.633-.671 3.965-2.444.76-1.012 1.144-1.626 2.663-4.32l.756-1.339.186-.325c.061.1.121.196.183.3l2.152 3.595c.724 1.21 1.665 2.556 2.47 3.314 1.046.987 1.992 1.22 3.06 1.22 1.075 0 1.876-.355 2.455-.843a3.743 3.743 0 0 0 .81-.973c.542-.939.861-2.127.861-3.745 0-2.72-.681-5.357-2.084-7.45-1.282-1.912-2.957-2.93-4.716-2.93-1.047 0-2.088.467-3.053 1.308-.652.57-1.257 1.29-1.82 2.05-.69-.875-1.335-1.547-1.958-2.056-1.182-.966-2.315-1.303-3.454-1.303zm10.16 2.053c1.147 0 2.188.758 2.992 1.999 1.132 1.748 1.647 4.195 1.647 6.4 0 1.548-.368 2.9-1.839 2.9-.58 0-1.027-.23-1.664-1.004-.496-.601-1.343-1.878-2.832-4.358l-.617-1.028a44.908 44.908 0 0 0-1.255-1.98c.07-.109.141-.224.211-.327 1.12-1.667 2.118-2.602 3.358-2.602zm-10.201.553c1.265 0 2.058.791 2.675 1.446.307.327.737.871 1.234 1.579l-1.02 1.566c-.757 1.163-1.882 3.017-2.837 4.338-1.191 1.649-1.81 1.817-2.486 1.817-.524 0-1.038-.237-1.383-.794-.263-.426-.464-1.13-.464-2.046 0-2.221.63-4.535 1.66-6.088.454-.687.964-1.226 1.533-1.533a2.264 2.264 0 0 1 1.088-.285z" />
    </svg>
  ),
  focusTopics: ["Meta Muse agent", "Meta One subscriptions", "Llama on local hardware"],
  intro: {
    heading: "Meta AI in October 2026: agents, subscriptions and open models",
    paragraphs: [
      "Meta made two big consumer moves in September 2026. Muse, launched on 8 September, is a personal AI agent that can send emails, book travel and complete purchases from its own isolated cloud computer, with a separate system called Sentinel reviewing its actions. It is US-only at launch, with a free tier and paid plans.",
      "A week later, Meta One bundled subscriptions across Instagram, Facebook, WhatsApp and Meta AI: single-app Plus plans from $2.99, Core at $7.99 and Premium at $19.99 a month for heavier AI use, and creator and business plans from $14.99 that include the verified badge.",
      "Meta's newest flagship models, the Muse Spark family, are proprietary, but earlier Llama models remain available as open weights. If you want to run Llama on your own machine, our local setup guide covers VRAM requirements and quantization.",
      "I add sources to every article and update them as Meta's plans and availability change.",
    ],
  },
};

export default async function MetaPage() {
  const articles = await getBlogsByCompany('meta');

  return <CompanyHubLayout config={META_CONFIG} articles={articles} />;
}
