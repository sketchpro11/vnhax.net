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
