/**
 * SEO & GEO/AEO Configuration and Structured Data Generators
 * VNHAX — Virtual Next-Gen Hub for AI & eXploration
 */

export const BRAND_CONFIG = {
  name: "VNHAX — Virtual Next-Gen Hub for AI & eXploration",
  shortName: "VNHAX",
  legalName: "VNHAX",
  acronymExplanation: "Virtual Next-Gen Hub for AI & eXploration",
  siteUrl: "https://vnhax.net",
  description: "VNHAX (Virtual Next-Gen Hub for AI & eXploration) provides technical architecture reviews, open-source AI tools, developer guides, and high-performance UI components.",
  ogImage: "https://vnhax.net/og-image.png",
  twitterHandle: "@umarhashmi_dev",
  // Real, owned profiles of the site's founder (VNHAX has no separate brand accounts yet)
  socialLinks: [
    { label: "GitHub", url: "https://github.com/umarhashmi-dev" },
    { label: "LinkedIn", url: "https://www.linkedin.com/in/umarhashmi-dev" },
    { label: "X / Twitter", url: "https://x.com/umarhashmi_dev" },
    { label: "Portfolio", url: "https://www.umarhashmi.dev" },
  ],
};

export const CONTACT_EMAIL = "contact@vnhax.net";
export const PRIVACY_EMAIL = "privacy@vnhax.net";

/**
 * Generate Root Organization Schema (JSON-LD)
 */
export function getOrganizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${BRAND_CONFIG.siteUrl}/#organization`,
    "name": BRAND_CONFIG.shortName,
    "alternateName": ["vnhax.net", BRAND_CONFIG.acronymExplanation],
    "legalName": BRAND_CONFIG.shortName,
    "url": BRAND_CONFIG.siteUrl,
    "logo": {
      "@type": "ImageObject",
      "url": `${BRAND_CONFIG.siteUrl}/logo.png`,
      "width": "1024",
      "height": "403"
    },
    "sameAs": BRAND_CONFIG.socialLinks.map((l) => l.url),
    "description": BRAND_CONFIG.description
  };
}

/**
 * Generate Root WebSite Schema with SearchAction (JSON-LD)
 */
export function getWebSiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${BRAND_CONFIG.siteUrl}/#website`,
    "name": BRAND_CONFIG.shortName,
    "alternateName": ["vnhax.net", BRAND_CONFIG.name],
    "url": BRAND_CONFIG.siteUrl,
    "description": BRAND_CONFIG.description,
    "publisher": {
      "@id": `${BRAND_CONFIG.siteUrl}/#organization`
    }
  };
}

/**
 * Generate BreadcrumbList Schema (JSON-LD)
 */
export interface BreadcrumbItem {
  name: string;
  url: string;
}

export function getBreadcrumbSchema(items: BreadcrumbItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": items.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": item.name,
      "item": item.url.startsWith("http") ? item.url : `${BRAND_CONFIG.siteUrl}${item.url}`
    }))
  };
}

/**
 * Generate FAQPage Schema (JSON-LD)
 */
export interface FAQItem {
  question: string;
  answer: string;
}

export function getFAQSchema(items: FAQItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": items.map(item => ({
      "@type": "Question",
      "name": item.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": item.answer
      }
    }))
  };
}

/**
 * Format and constrain SEO titles to be strictly under 60-65 chars for Google & Bing
 */
export function shortenSeoTitle(title: string, maxLen = 56): string {
  if (!title) return '';
  const trimmed = title.trim();
  if (trimmed.length <= maxLen) return trimmed;

  if (trimmed.includes(':')) {
    const parts = trimmed.split(':');
    const main = parts[0].trim();
    const sub = parts.slice(1).join(':').trim();

    if (main.length >= 20 && main.length <= maxLen) {
      const remaining = maxLen - main.length - 2;
      if (remaining >= 12 && sub) {
        const words = sub.split(' ');
        let briefSub = '';
        for (const w of words) {
          if ((briefSub + ' ' + w).trim().length <= remaining) {
            briefSub = (briefSub + ' ' + w).trim();
          } else break;
        }
        briefSub = briefSub.replace(/[,&:\-\s]+$/, '');
        if (briefSub) {
          return `${main}: ${briefSub}`;
        }
      }
      return main.replace(/[,&:\-\s]+$/, '');
    }
  }

  if (trimmed.includes(' — ')) {
    const main = trimmed.split(' — ')[0].trim();
    if (main.length <= maxLen) return main.replace(/[,&:\-\s]+$/, '');
  }
  if (trimmed.includes(' - ')) {
    const main = trimmed.split(' - ')[0].trim();
    if (main.length <= maxLen) return main.replace(/[,&:\-\s]+$/, '');
  }

  if (trimmed.includes('?')) {
    const main = trimmed.split('?')[0].trim() + '?';
    if (main.length <= maxLen) return main;
  }

  const words = trimmed.split(' ');
  let result = '';
  for (const w of words) {
    if ((result + ' ' + w).trim().length <= maxLen - 3) {
      result = (result + ' ' + w).trim();
    } else break;
  }
  return `${result.replace(/[,&:\-\s]+$/, '')}...`;
}

