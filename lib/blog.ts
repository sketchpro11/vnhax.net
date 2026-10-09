import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { marked } from 'marked';

export interface BlogPostFrontmatter {
  title: string;
  description: string;
  date: string;
  author?: string;
  category?: string;
  tags?: string[];
  readTime?: string;
  image?: string;
  updatedAt?: string;
}

export interface BlogPost {
  slug: string;
  frontmatter: BlogPostFrontmatter;
  content: string;
  html: string;
  fileModifiedDate?: Date;
}

const blogsDirectory = path.join(process.cwd(), 'content', 'blogs');

// Configure marked with GitHub Flavored Markdown (GFM) and custom renderers
marked.use({
  gfm: true,
  breaks: false,
  renderer: {
    code(token: any) {
      const lang = token.lang ? token.lang.trim().split(/\s+/)[0] : 'code';
      const text = token.text || '';
      return `<div class="code-card">
  <div class="code-card-header">
    <span class="code-lang-badge">${lang}</span>
    <button type="button" class="copy-code-btn" data-code="${encodeURIComponent(text)}" aria-label="Copy code">
      <svg class="copy-icon" viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
        <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
        <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
      </svg>
      <span class="copy-label">Copy Code</span>
    </button>
  </div>
  <pre><code class="language-${lang}">${text}</code></pre>
</div>`;
    },
    image(token: any) {
      const href = token.href || '';
      const text = token.text || '';
      return `<figure class="article-image-figure">
  <img src="${href}" alt="${text || ''}" class="article-responsive-img rounded-lg" loading="lazy" />
  ${text ? `<figcaption class="article-image-caption">${text}</figcaption>` : ''}
</figure>`;
    },
  },
});

/**
 * Ensures the content/blogs directory exists
 */
function ensureDirectory() {
  if (!fs.existsSync(blogsDirectory)) {
    fs.mkdirSync(blogsDirectory, { recursive: true });
  }
}

/**
 * Returns all blog slugs available in content/blogs/ (.md and .mdx)
 */
export function getAllBlogSlugs(): string[] {
  try {
    ensureDirectory();
    const fileNames = fs.readdirSync(blogsDirectory);
    return fileNames
      .filter((fileName) => fileName.endsWith('.md') || fileName.endsWith('.mdx'))
      .map((fileName) => fileName.replace(/\.mdx?$/, ''));
  } catch {
    return [];
  }
}

/**
 * Retrieves a single blog post by slug, parsing its frontmatter and markdown body
 */
export async function getBlogPost(slug: string): Promise<BlogPost | null> {
  ensureDirectory();

  // Try .md first, then .mdx
  let fullPath = path.join(blogsDirectory, `${slug}.md`);
  if (!fs.existsSync(fullPath)) {
    fullPath = path.join(blogsDirectory, `${slug}.mdx`);
  }

  if (!fs.existsSync(fullPath)) {
    return null;
  }

  const fileStats = fs.statSync(fullPath);
  const fileContents = fs.readFileSync(fullPath, 'utf8');

  // Flexible frontmatter parsing (handles if notes exist before the opening ---)
  const frontmatterIndex = fileContents.indexOf('---');
  let data: Record<string, any> = {};
  let content = fileContents;

  if (frontmatterIndex !== -1) {
    try {
      const parsed = matter(fileContents.slice(frontmatterIndex));
      data = parsed.data || {};
      content = parsed.content || fileContents;
    } catch {
      const parsed = matter(fileContents);
      data = parsed.data || {};
      content = parsed.content || fileContents;
    }
  } else {
    const parsed = matter(fileContents);
    data = parsed.data || {};
    content = parsed.content || fileContents;
  }

  // Convert markdown to HTML with custom code and image renderers
  let html = await marked.parse(content);
  html = html.replace(/<table>/g, '<div class="table-scroll-wrapper"><table>').replace(/<\/table>/g, '</table></div>');

  const rawTitle = data.title || slug.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase());
  const cleanTitle = typeof rawTitle === 'string' ? rawTitle.replace(/\\_/g, '_') : rawTitle;

  let description = data.description || '';
  if (!description || description === '[150-character SEO description]') {
    description = 'Complete guide to increasing num_ctx in an Ollama Modelfile to extend context window length, prevent silent amnesia, and manage KV cache VRAM.';
  }

  const frontmatter: BlogPostFrontmatter = {
    title: cleanTitle,
    description,
    date: data.date ? new Date(data.date).toISOString().split('T')[0] : '2026-09-27',
    author: data.author || 'VNHAX Editorial',
    category: data.category || 'AI & Models',
    tags: Array.isArray(data.tags) ? data.tags : (data.tags ? [data.tags] : ['AI', 'Open Source', 'Guides']),
    readTime: data.readTime || `${Math.max(1, Math.round(content.split(/\s+/).length / 200))} min read`,
    image: data.image || '/og-image.png',
    updatedAt: data.updatedAt || undefined,
  };

  return {
    slug,
    frontmatter,
    content,
    html,
    fileModifiedDate: fileStats.mtime,
  };
}

/**
 * Returns all blog posts with parsed frontmatter, sorted by date descending
 */
export async function getAllBlogs(): Promise<BlogPost[]> {
  const slugs = getAllBlogSlugs();
  const postsWithNull = await Promise.all(slugs.map((slug) => getBlogPost(slug)));
  const posts = postsWithNull.filter((p): p is BlogPost => p !== null);

  // Sort by date descending
  return posts.sort((a, b) => new Date(b.frontmatter.date).getTime() - new Date(a.frontmatter.date).getTime());
}

/**
 * Returns all blog posts matching a specific company/ecosystem (e.g. 'openai', 'anthropic', 'google', etc.)
 */
export async function getBlogsByCompany(companyKey: string): Promise<BlogPost[]> {
  const allBlogs = await getAllBlogs();
  const key = companyKey.toLowerCase().trim();
  return allBlogs.filter((post) => {
    const cat = (post.frontmatter.category || '').toLowerCase();
    const tags = (post.frontmatter.tags || []).map((t) => t.toLowerCase());
    const slug = post.slug.toLowerCase();
    const title = post.frontmatter.title.toLowerCase();

    return (
      cat.includes(key) ||
      tags.some((t) => t.includes(key)) ||
      slug.includes(key) ||
      title.includes(key)
    );
  });
}

export interface BlogSummary {
  slug: string;
  title: string;
  description: string;
  date: string;
  formattedDate: string;
  author: string;
  category: string;
  tags: string[];
  readTime: string;
  image?: string;
  silos: string[];
  badgeClass: string;
  href: string;
}

/**
 * Returns lightweight summaries of all blog posts for homepage and silo grids
 */
export function getLatestBlogSummaries(): BlogSummary[] {
  try {
    ensureDirectory();
    const fileNames = fs.readdirSync(blogsDirectory);
    const validFiles = fileNames.filter((fileName) => fileName.endsWith('.md') || fileName.endsWith('.mdx'));

    const summaries: BlogSummary[] = [];

    for (const fileName of validFiles) {
      const slug = fileName.replace(/\.mdx?$/, '');
      const fullPath = path.join(blogsDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, 'utf8');

      const frontmatterIndex = fileContents.indexOf('---');
      let data: Record<string, any> = {};
      let content = fileContents;

      if (frontmatterIndex !== -1) {
        try {
          const parsed = matter(fileContents.slice(frontmatterIndex));
          data = parsed.data || {};
          content = parsed.content || fileContents;
        } catch {
          const parsed = matter(fileContents);
          data = parsed.data || {};
          content = parsed.content || fileContents;
        }
      } else {
        const parsed = matter(fileContents);
        data = parsed.data || {};
        content = parsed.content || fileContents;
      }

      const rawTitle = data.title || slug.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase());
      const cleanTitle = typeof rawTitle === 'string' ? rawTitle.replace(/\\_/g, '_') : rawTitle;

      let description = data.description || '';
      if (!description || description === '[150-character SEO description]') {
        description = 'Deep technical analysis, architecture breakdown, and implementation guide.';
      }

      const dateStr = data.date ? new Date(data.date).toISOString().split('T')[0] : '2026-10-05';
      const category = data.category || 'AI & Models';
      const tags: string[] = Array.isArray(data.tags) ? data.tags : data.tags ? [data.tags] : ['AI', 'Guides'];
      const readTime = data.readTime || `${Math.max(1, Math.round(content.split(/\s+/).length / 200))} min read`;

      // Determine Silos & Badge
      const combined = `${category} ${tags.join(' ')} ${slug}`.toLowerCase();
      const silos = new Set<string>();

      if (/\b(ai|rag|llama|modelfile|model|models|slm|slms|agent|agents|ollama|quantization|inference|tokens?|embedding|gemini|gpt|deepseek)\b/i.test(combined)) {
        silos.add('ai');
      }
      if (/\b(dev|developer|tool|tools|repo|repos|coding|code|claude|antigravity|grok|mcp|token|tokens|prompt|prompts|workflow|workflows|proxy|proxies|git|github|distillation|api)\b/i.test(combined)) {
        silos.add('developer');
      }
      if (/\b(ui|component|components|css|design|frontend|interface|template|templates|canvas)\b/i.test(combined)) {
        silos.add('ui');
      }
      if (/\b(tech|platform|platforms|cloud|database|databases|vector|pinecone|qdrant|chroma|security|governance|audit|auditing|hardware|edge|infrastructure|network|gpu|compute|acceleration)\b/i.test(combined)) {
        silos.add('technology');
      }

      if (silos.size === 0) {
        silos.add('ai');
      }

      // Badge styling
      let badgeClass = 'silo-badge--ai';
      const catLower = category.toLowerCase();
      if (catLower.includes('ui') || catLower.includes('design') || catLower.includes('component')) {
        badgeClass = 'silo-badge--ui';
      } else if (
        catLower.includes('cloud') ||
        catLower.includes('security') ||
        catLower.includes('governance') ||
        catLower.includes('hardware') ||
        catLower.includes('platform') ||
        catLower.includes('infrastructure') ||
        (catLower.includes('architecture') && !catLower.includes('agent') && !catLower.includes('rag'))
      ) {
        badgeClass = 'silo-badge--tech';
      } else if (catLower.includes('developer') || catLower.includes('token') || catLower.includes('tool') || catLower.includes('workflow') || catLower.includes('repo')) {
        badgeClass = 'silo-badge--dev';
      }

      let formattedDate = dateStr;
      try {
        formattedDate = new Date(dateStr).toLocaleDateString('en-US', {
          month: 'short',
          day: 'numeric',
          year: 'numeric',
        });
      } catch {}

      summaries.push({
        slug,
        title: cleanTitle,
        description,
        date: dateStr,
        formattedDate,
        author: data.author || 'VNHAX Editorial',
        category,
        tags,
        readTime,
        image: data.image || '/og-image.png',
        silos: Array.from(silos),
        badgeClass,
        href: `/blog/${slug}`,
      });
    }

    // Sort by date descending
    return summaries.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  } catch (error) {
    console.error('Error fetching blog summaries:', error);
    return [];
  }
}

/**
 * Returns blog posts belonging to a specific silo ('ai' | 'developer' | 'ui' | 'technology')
 */
export async function getBlogsBySilo(silo: 'ai' | 'developer' | 'ui' | 'technology'): Promise<BlogPost[]> {
  const allBlogs = await getAllBlogs();
  const summaries = getLatestBlogSummaries();
  const matchingSlugs = new Set(
    summaries.filter((s) => s.silos.includes(silo)).map((s) => s.slug)
  );
  return allBlogs.filter((post) => matchingSlugs.has(post.slug));
}
