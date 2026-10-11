import type { Metadata } from 'next';
import CompanyHubLayout, { CompanyHubConfig } from '@/components/CompanyHubLayout';
import { getBlogsByCompany } from '@/lib/blog';
import { BRAND_CONFIG } from '@/lib/seo';

export const metadata: Metadata = {
  title: 'OpenAI Models & Developer Hub',
  description:
    "Plain-English guides to OpenAI's latest releases: GPT-6 Astra, Sol and Luna, ChatGPT Pro plans and Ultrafast, Dots agents and Private Intelligence, with links to official sources.",
  alternates: {
    canonical: `${BRAND_CONFIG.siteUrl}/openai`,
  },
  openGraph: {
    title: `OpenAI Models & Developer Hub | ${BRAND_CONFIG.shortName}`,
    description:
      "Plain-English guides to OpenAI's latest releases: GPT-6 Astra, Sol and Luna, ChatGPT Pro plans and Ultrafast, Dots agents and Private Intelligence, with links to official sources.",
    url: `${BRAND_CONFIG.siteUrl}/openai`,
    siteName: BRAND_CONFIG.shortName,
    type: 'website',
  },
};

const OPENAI_CONFIG: CompanyHubConfig = {
  key: 'openai',
  name: 'OpenAI',
  kicker: 'Frontier AI & Models',
  title: 'OpenAI Ecosystem, Models & Developer Guides',
  description:
    "Guides to OpenAI's models, ChatGPT plans and developer tools, written from OpenAI's own announcements and documentation.",
  icon: (
    <svg width={26} height={26} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M22.2819 9.8211a5.9847 5.9847 0 0 0-.5157-4.9108 6.0462 6.0462 0 0 0-6.5098-2.9A6.0651 6.0651 0 0 0 4.9807 4.1818a5.9847 5.9847 0 0 0-3.9977 2.9 6.0462 6.0462 0 0 0 .7427 7.0966 5.98 5.98 0 0 0 .511 4.9107 6.051 6.051 0 0 0 6.5146 2.9001A5.9847 5.9847 0 0 0 13.2599 24a6.0557 6.0557 0 0 0 5.7718-4.2058 5.9894 5.9894 0 0 0 3.9977-2.9001 6.0557 6.0557 0 0 0-.7475-7.0729zm-9.022 12.6081a4.4755 4.4755 0 0 1-2.8764-1.0408l.1419-.0804 4.7783-2.7582a.7948.7948 0 0 0 .3927-.6813v-6.7369l2.02 1.1686a.071.071 0 0 1 .038.052v5.5826a4.504 4.504 0 0 1-4.4945 4.4944zm-9.6607-4.1254a4.4708 4.4708 0 0 1-.5346-3.0137l.142.0852 4.783 2.7582a.7712.7712 0 0 0 .7806 0l5.8428-3.3685v2.3324a.0804.0804 0 0 1-.0332.0615L9.74 19.9502a4.4992 4.4992 0 0 1-6.1408-1.6464zM2.3408 7.8956a4.485 4.485 0 0 1 2.3655-1.9728V11.6a.7664.7664 0 0 0 .3879.6765l5.8144 3.3543-2.0201 1.1685a.0757.0757 0 0 1-.071 0l-4.8303-2.7865A4.504 4.504 0 0 1 2.3408 7.872zm16.5963 3.8558L13.1038 8.364 15.1192 7.2a.0757.0757 0 0 1 .071 0l4.8303 2.7913a4.4944 4.4944 0 0 1-.6765 8.1042v-5.6772a.79.79 0 0 0-.407-.667zm2.0107-3.0231l-.142-.0852-4.7735-2.7818a.7759.7759 0 0 0-.7854 0L9.409 9.2297V6.8974a.0662.0662 0 0 1 .0284-.0615l4.8303-2.7866a4.4992 4.4992 0 0 1 6.6802 4.66zM8.3065 12.863l-2.02-1.1638a.0804.0804 0 0 1-.038-.0567V6.0742a4.4992 4.4992 0 0 1 7.3757-3.4537l-.142.0805L8.704 5.459a.7948.7948 0 0 0-.3927.6813zm1.0976-2.3654l2.602-1.4998 2.6069 1.4998v2.9994l-2.5974 1.4997-2.6067-1.4997Z" />
    </svg>
  ),
  focusTopics: ["GPT-6 Astra, Sol & Luna", "ChatGPT Pro 100/200/500", "Ultrafast", "Dots agents", "Private Intelligence"],
  intro: {
    heading: "OpenAI in October 2026: what's new and where to start",
    paragraphs: [
      "OpenAI's lineup changed more in September 2026 than in most years. The GPT-6 family arrived in three tiers: Astra for the hardest work, Sol for everyday coding and research, and Luna for cheap, high-volume tasks. A few days later, DevDay on 29 September added Dots (always-on agents that work in their own cloud computer), a $500 ChatGPT Pro plan, and Ultrafast, a premium speed mode for GPT-6 Astra and GPT-6.1 Sol.",
      "If you are choosing a ChatGPT plan, start with our breakdown of Pro 100, Pro 200 and Pro 500, which also explains the reduced allowance for new Pro 200 subscribers and the 29 October grandfathering deadline. If you build on the API, the GPT-6 comparison explains which model fits which job and what each costs per million tokens.",
      "For businesses with strict privacy rules, OpenAI's Private Intelligence and its Zero Data Retention with Private Safety Processing are the most important changes: OpenAI no longer keeps your prompts, but encrypted records are stored in your own cloud so automated systems can still detect misuse.",
      "Every article below links to OpenAI's Help Center, pricing pages or developer docs, and shows the date its facts were last checked, because prices and limits change often.",
    ],
  },
};

export default async function OpenAIPage() {
  const articles = await getBlogsByCompany('openai');

  return <CompanyHubLayout config={OPENAI_CONFIG} articles={articles} />;
}
