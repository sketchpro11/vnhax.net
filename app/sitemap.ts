import type { MetadataRoute } from 'next';
import { BRAND_CONFIG } from '@/lib/seo';
import { getAllRepos } from '@/lib/repos-data';
import { getAllBlogs } from '@/lib/blog';
import { getAllUIComponents } from '@/lib/components-data';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = BRAND_CONFIG.siteUrl;
  const now = new Date();

  // Core pages
  const routes: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}`,
      lastModified: now,
      changeFrequency: 'daily',
      priority: 1.0,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.6,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.6,
    },
    {
      url: `${baseUrl}/privacy-policy`,
      lastModified: now,
      changeFrequency: 'yearly',
      priority: 0.5,
    },
    {
      url: `${baseUrl}/terms`,
      lastModified: now,
      changeFrequency: 'yearly',
      priority: 0.5,
    },
    {
      url: `${baseUrl}/disclaimer`,
      lastModified: now,
      changeFrequency: 'yearly',
      priority: 0.5,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: now,
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/repos`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.85,
    },
    // Category Hubs
    {
      url: `${baseUrl}/ai`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/ai/ai-tools`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/developer-resources`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/developer-resources/github-repos`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.85,
    },
    {
      url: `${baseUrl}/technology`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/technology/platforms`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/ui-components`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    // Company Ecosystem Hubs
    {
      url: `${baseUrl}/openai`,
      lastModified: now,
      changeFrequency: 'daily',
      priority: 0.85,
    },
    {
      url: `${baseUrl}/anthropic`,
      lastModified: now,
      changeFrequency: 'daily',
      priority: 0.85,
    },
    {
      url: `${baseUrl}/google`,
      lastModified: now,
      changeFrequency: 'daily',
      priority: 0.85,
    },
    {
      url: `${baseUrl}/github`,
      lastModified: now,
      changeFrequency: 'daily',
      priority: 0.85,
    },
    {
      url: `${baseUrl}/xai`,
      lastModified: now,
      changeFrequency: 'daily',
      priority: 0.85,
    },
    {
      url: `${baseUrl}/meta`,
      lastModified: now,
      changeFrequency: 'daily',
      priority: 0.85,
    },
  ];

  // Dynamic Blog Posts from local content/blogs/ directory
  const blogPosts = await getAllBlogs();
  const blogRoutes: MetadataRoute.Sitemap = blogPosts.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: post.fileModifiedDate || new Date(post.frontmatter.date),
    changeFrequency: 'weekly',
    priority: 0.85,
  }));

  // Dynamic Repository Architecture pages
  const repos = getAllRepos();
  const repoRoutes: MetadataRoute.Sitemap = repos.map((repo) => ({
    url: `${baseUrl}/repos/${repo.slug}`,
    lastModified: now,
    changeFrequency: 'weekly',
    priority: 0.9,
  }));

  // Dynamic UI Components
  const uiComponents = getAllUIComponents();
  const componentRoutes: MetadataRoute.Sitemap = uiComponents.map((comp) => ({
    url: `${baseUrl}/ui-components/${comp.slug}`,
    lastModified: now,
    changeFrequency: 'weekly',
    priority: 0.85,
  }));

  return [...routes, ...blogRoutes, ...repoRoutes, ...componentRoutes];
}
