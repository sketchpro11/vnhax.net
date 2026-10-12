import type { MetadataRoute } from 'next';
import { BRAND_CONFIG } from '@/lib/seo';
import { getAllRepos } from '@/lib/repos-data';
import { getAllBlogs } from '@/lib/blog';
import { getAllUIComponents } from '@/lib/components-data';

/**
 * lastmod must reflect the last *significant* change to each page — Google ignores it
 * when it is not consistently accurate (e.g. stamped with the build time on every deploy).
 * Static pages use the date their content last changed; update the date here when you
 * meaningfully edit that page. Blog posts use frontmatter `updatedAt` (or `date`).
 */
const PAGE_UPDATED: Record<string, string> = {
  '/about': '2026-10-12',
  '/author/umar-hashmi': '2026-10-12',
  '/editorial-policy': '2026-10-12',
  '/contact': '2026-10-11',
  '/privacy-policy': '2026-10-11',
  '/terms': '2026-10-11',
  '/disclaimer': '2026-10-11',
  '/repos': '2026-10-11',
  '/ai': '2026-10-11',
  '/ai/ai-tools': '2026-10-11',
  '/developer-resources': '2026-10-11',
  '/developer-resources/github-repos': '2026-10-09',
  '/technology': '2026-10-10',
  '/technology/platforms': '2026-10-09',
  '/ui-components': '2026-10-11',
  '/openai': '2026-10-12',
  '/anthropic': '2026-10-12',
  '/google': '2026-10-12',
  '/github': '2026-10-12',
  '/xai': '2026-10-12',
  '/meta': '2026-10-12',
};

/** Repository review pages were last rewritten on this date (live star counts are not a significant change). */
const REPO_PAGES_UPDATED = '2026-10-11';
/** UI component pages were last changed on this date. */
const UI_COMPONENT_PAGES_UPDATED = '2026-10-09';

const latest = (...dates: string[]) => dates.reduce((a, b) => (a > b ? a : b));

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = BRAND_CONFIG.siteUrl;

  const blogPosts = await getAllBlogs();
  const postDate = (p: (typeof blogPosts)[number]) => p.frontmatter.updatedAt || p.frontmatter.date;
  const newestPost = latest(...blogPosts.map(postDate));

  const staticRoutes: MetadataRoute.Sitemap = [
    // Homepage and blog index list the latest posts, so they change when a post changes.
    { url: baseUrl, lastModified: latest('2026-10-11', newestPost) },
    { url: `${baseUrl}/blog`, lastModified: latest('2026-10-12', newestPost) },
    ...Object.entries(PAGE_UPDATED).map(([path, date]) => ({
      url: `${baseUrl}${path}`,
      lastModified: date,
    })),
  ];

  const blogRoutes: MetadataRoute.Sitemap = blogPosts.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: postDate(post),
  }));

  const repoRoutes: MetadataRoute.Sitemap = getAllRepos().map((repo) => ({
    url: `${baseUrl}/repos/${repo.slug}`,
    lastModified: REPO_PAGES_UPDATED,
  }));

  const componentRoutes: MetadataRoute.Sitemap = getAllUIComponents().map((comp) => ({
    url: `${baseUrl}/ui-components/${comp.slug}`,
    lastModified: UI_COMPONENT_PAGES_UPDATED,
  }));

  return [...staticRoutes, ...blogRoutes, ...repoRoutes, ...componentRoutes];
}
