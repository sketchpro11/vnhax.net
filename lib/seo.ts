/**
 * SEO & GEO/AEO Configuration and Structured Data Generators
 * VNHAX — Virtual Next-Gen Hub for AI & eXploration
 */

export const BRAND_CONFIG = {
  name: "VNHAX — Virtual Next-Gen Hub for AI & eXploration",
  shortName: "VNHAX",
  legalName: "VNHAX Media",
  acronymExplanation: "Virtual Next-Gen Hub for AI & eXploration",
  siteUrl: "https://vnhax.net",
  description: "VNHAX (Virtual Next-Gen Hub for AI & eXploration) provides technical architecture reviews, open-source AI tools, developer guides, and high-performance UI components.",
  ogImage: "https://vnhax.net/og-image.png",
  twitterHandle: "@vnhax",
  socialLinks: [
    "https://github.com/vnhax",
    "https://x.com/vnhax",
    "https://linkedin.com/company/vnhax"
  ]
};

/**
 * Generate Root Organization Schema (JSON-LD)
 */
export function getOrganizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${BRAND_CONFIG.siteUrl}/#organization`,
    "name": BRAND_CONFIG.shortName,
    "alternateName": BRAND_CONFIG.acronymExplanation,
    "legalName": BRAND_CONFIG.name,
    "url": BRAND_CONFIG.siteUrl,
    "logo": {
      "@type": "ImageObject",
      "url": `${BRAND_CONFIG.siteUrl}/logo.png`,
      "width": "1024",
      "height": "403"
    },
    "sameAs": BRAND_CONFIG.socialLinks,
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
    "alternateName": BRAND_CONFIG.name,
    "url": BRAND_CONFIG.siteUrl,
    "description": BRAND_CONFIG.description,
    "publisher": {
      "@id": `${BRAND_CONFIG.siteUrl}/#organization`
    },
    "potentialAction": {
      "@type": "SearchAction",
      "target": {
        "@type": "EntryPoint",
        "urlTemplate": `${BRAND_CONFIG.siteUrl}/?search={search_term_string}`
      },
      "query-input": "required name=search_term_string"
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
 * Generate SoftwareSourceCode / SoftwareApplication Schema for Repo Reviews (JSON-LD)
 */
export interface SoftwareRepoSchemaOptions {
  name: string;
  description: string;
  url: string;
  codeRepository: string;
  programmingLanguage: string;
  license?: string;
  stars?: string;
  forks?: string;
  datePublished?: string;
  dateModified?: string;
}

export function getSoftwareRepoSchema(options: SoftwareRepoSchemaOptions) {
  return {
    "@context": "https://schema.org",
    "@type": "SoftwareSourceCode",
    "@id": `${options.url}/#software`,
    "name": options.name,
    "headline": `${options.name} Technical Architecture & Implementation Deep Dive`,
    "description": options.description,
    "codeRepository": options.codeRepository,
    "programmingLanguage": options.programmingLanguage,
    "runtimePlatform": "Cross-platform (Linux, macOS, Windows)",
    "applicationCategory": "DeveloperApplication",
    "author": {
      "@type": "Organization",
      "name": BRAND_CONFIG.name,
      "url": BRAND_CONFIG.siteUrl
    },
    "publisher": {
      "@id": `${BRAND_CONFIG.siteUrl}/#organization`
    },
    "datePublished": options.datePublished || "2025-01-15T00:00:00Z",
    "dateModified": options.dateModified || "2026-09-27T00:00:00Z"
  };
}

/**
 * Generate TechArticle / BlogPosting Schema (JSON-LD)
 */
export interface TechArticleSchemaOptions {
  headline: string;
  description: string;
  url: string;
  datePublished: string;
  dateModified: string;
  authorName?: string;
  keywords?: string[];
}

export function getTechArticleSchema(options: TechArticleSchemaOptions) {
  return {
    "@context": "https://schema.org",
    "@type": "TechArticle",
    "@id": `${options.url}/#article`,
    "headline": options.headline,
    "description": options.description,
    "url": options.url,
    "mainEntityOfPage": options.url,
    "inLanguage": "en-US",
    "datePublished": options.datePublished,
    "dateModified": options.dateModified,
    "author": {
      "@type": "Organization",
      "name": options.authorName || BRAND_CONFIG.name,
      "url": BRAND_CONFIG.siteUrl
    },
    "publisher": {
      "@id": `${BRAND_CONFIG.siteUrl}/#organization`
    },
    "keywords": options.keywords?.join(", ") || "AI tools, open source, local LLM, developer tools"
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

