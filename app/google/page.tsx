import type { Metadata } from 'next';
import CompanyHubLayout, { CompanyHubConfig } from '@/components/CompanyHubLayout';
import { getBlogsByCompany } from '@/lib/blog';
import { BRAND_CONFIG } from '@/lib/seo';

export const metadata: Metadata = {
  title: 'Google Gemini & DeepMind AI Hub',
  description:
    "Guides to Google's latest AI: Gemini 4 Argon, Gemini 3.8 Flash and Flash Cyber, Googlebook laptops and Gemini on Windows, with links to Google's announcements.",
  alternates: {
    canonical: `${BRAND_CONFIG.siteUrl}/google`,
  },
  openGraph: {
    title: `Google Gemini & DeepMind AI Hub | ${BRAND_CONFIG.shortName}`,
    description:
      "Guides to Google's latest AI: Gemini 4 Argon, Gemini 3.8 Flash and Flash Cyber, Googlebook laptops and Gemini on Windows, with links to Google's announcements.",
    url: `${BRAND_CONFIG.siteUrl}/google`,
    siteName: BRAND_CONFIG.shortName,
    type: 'website',
  },
};

const GOOGLE_CONFIG: CompanyHubConfig = {
  key: 'google',
  name: 'Google',
  kicker: 'DeepMind & Cloud AI',
  title: 'Google Gemini Models, DeepMind & Cloud AI Hub',
  description:
    "Guides to Gemini models, Google's AI hardware and tools, written from Google's own announcements and documentation.",
  icon: (
    <svg width={26} height={26} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z" />
    </svg>
  ),
  focusTopics: ["Gemini 4 Argon", "Gemini 3.8 Flash", "Gemini 3.8 Flash Cyber", "Googlebook", "Gemini on Windows"],
  intro: {
    heading: "Google AI in October 2026: models, access and hardware",
    paragraphs: [
      "Google's newest flagship, Gemini 4 Argon, is built for long-running coding, enterprise and security work, with a 1-million-token output limit. Access is limited for now: cyber defenders in Google's Fairwind Program come first, followed by paid API and AI Ultra customers. Launch pricing is $2 / $10 per million input/output tokens, rising to $4 / $20 later.",
      "For most developers, the model you can actually use today is Gemini 3.8 Flash, released on 2 September 2026 at an introductory $0.75 / $3.75 per million tokens. Its sibling, Gemini 3.8 Flash Cyber, is a vulnerability-finding and patching model available only to trusted defenders.",
      "On the hardware side, the first Googlebook laptops from Acer, ASUS, Dell, HP and Lenovo started shipping on 4 October 2026 from $899, with Gemini built into the operating system.",
      "Articles below link to Google's blog posts and documentation, and I update them when prices or availability change.",
    ],
  },
};

export default async function GooglePage() {
  const articles = await getBlogsByCompany('google');

  return <CompanyHubLayout config={GOOGLE_CONFIG} articles={articles} />;
}
