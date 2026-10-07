import type { MetadataRoute } from 'next';
import { BRAND_CONFIG } from '@/lib/seo';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: [
          'Googlebot',
          'Bingbot',
          'GPTBot',
          'PerplexityBot',
          'ClaudeBot',
          'Google-Extended',
          'Mediapartners-Google',
          '*',
        ],
        allow: '/',
        disallow: ['/api/', '/private/'],
      },
    ],
    sitemap: `${BRAND_CONFIG.siteUrl}/sitemap.xml`,
    host: BRAND_CONFIG.siteUrl,
  };
}
