const fs = require('fs');
const path = require('path');
const { convertHtmlToJsx } = require('./convert');

const repoFiles = [
  'ollama',
  'llamacpp',
  'comfyui',
  'langchain',
  'cline',
  'aider'
];

for (const slug of repoFiles) {
  const htmlPath = path.join(__dirname, '..', `repo-${slug}.html`);
  let content = fs.readFileSync(htmlPath, 'utf8');

  // Extract body content between <body> and </body>
  const bodyMatch = content.match(/<body[^>]*>([\s\S]*?)<\/body>/i);
  let bodyContent = bodyMatch ? bodyMatch[1] : '';

  // Remove trailing <script> blocks from bodyContent
  bodyContent = bodyContent.replace(/<script[\s\S]*?<\/script>/gi, '');

  // Remove HTML comments
  bodyContent = bodyContent.replace(/<!--[\s\S]*?-->/g, '');

  // Remove inline onclick attributes (handled cleanly in RepoInteractiveScript)
  bodyContent = bodyContent.replace(/\s*onclick="[^"]*"/gi, '');
  bodyContent = bodyContent.replace(/\s*onclick='[^']*'/gi, '');

  // Replace header with <SiteHeader activeNav="developer" variant="home" />
  bodyContent = bodyContent.replace(/<header class="site-header">[\s\S]*?<\/header>/i, '<SiteHeader activeNav="developer" variant="home" />');

  // Replace footer with <SiteFooter />
  bodyContent = bodyContent.replace(/<footer class="site-footer">[\s\S]*?<\/footer>/i, '<SiteFooter />');

  // Convert internal links to clean URLs:
  bodyContent = bodyContent.replace(/href="index\.html"/g, 'href="/"');
  bodyContent = bodyContent.replace(/href="repo-([a-z0-9-]+)\.html"/g, 'href="/repos/$1"');
  bodyContent = bodyContent.replace(/href="\/repo-([a-z0-9-]+)\.html"/g, 'href="/repos/$1"');
  bodyContent = bodyContent.replace(/href="repo-([a-z0-9-]+)"/g, 'href="/repos/$1"');
  bodyContent = bodyContent.replace(/href="\/repo-([a-z0-9-]+)"/g, 'href="/repos/$1"');
  bodyContent = bodyContent.replace(/href="article-([a-z0-9-]+)\.html"/g, 'href="/articles/$1"');
  bodyContent = bodyContent.replace(/href="about\.html"/g, 'href="/about"');
  bodyContent = bodyContent.replace(/href="\/about\.html"/g, 'href="/about"');
  bodyContent = bodyContent.replace(/href="contact\.html"/g, 'href="/contact"');
  bodyContent = bodyContent.replace(/href="\/contact\.html"/g, 'href="/contact"');
  bodyContent = bodyContent.replace(/href="privacy\.html"/g, 'href="/privacy-policy"');
  bodyContent = bodyContent.replace(/href="\/privacy\.html"/g, 'href="/privacy-policy"');
  bodyContent = bodyContent.replace(/href="terms\.html"/g, 'href="/terms"');
  bodyContent = bodyContent.replace(/href="\/terms\.html"/g, 'href="/terms"');
  bodyContent = bodyContent.replace(/href="ai\/"/g, 'href="/ai"');
  bodyContent = bodyContent.replace(/href="developer-resources\/"/g, 'href="/developer-resources"');
  bodyContent = bodyContent.replace(/href="developer-resources\/github-repos\/"/g, 'href="/developer-resources/github-repos"');
  bodyContent = bodyContent.replace(/href="ui-components\/"/g, 'href="/ui-components"');
  bodyContent = bodyContent.replace(/href="technology\/"/g, 'href="/technology"');
  bodyContent = bodyContent.replace(/href="component-template\.html"/g, 'href="/component-template"');

  // Protect pre blocks before converting JSX
  const preBlocks = [];
  bodyContent = bodyContent.replace(/<pre([^>]*)>([\s\S]*?)<\/pre>/gi, (match, attrs, code) => {
    const idx = preBlocks.length;
    preBlocks.push({ attrs, code });
    return `___PRE_BLOCK_${idx}___`;
  });

  // Convert HTML attributes to JSX
  let jsxContent = convertHtmlToJsx(bodyContent);

  // Restore pre blocks with safe string templates
  jsxContent = jsxContent.replace(/___PRE_BLOCK_(\d+)___/g, (match, idx) => {
    const { attrs, code } = preBlocks[parseInt(idx, 10)];
    let jsxAttrs = attrs.replace(/\bclass="/g, 'className="');
    const codeMatch = code.match(/^(\s*<code[^>]*>)([\s\S]*?)(<\/code>\s*)$/i);
    if (codeMatch) {
      const openCode = codeMatch[1];
      const codeText = codeMatch[2];
      const closeCode = codeMatch[3];
      const safeCode = codeText.replace(/\\/g, '\\\\').replace(/`/g, '\\`').replace(/\$\{/g, '\\${');
      return `<pre${jsxAttrs}>${openCode}{\`${safeCode}\`}${closeCode}</pre>`;
    } else {
      const safeCode = code.replace(/\\/g, '\\\\').replace(/`/g, '\\`').replace(/\$\{/g, '\\${');
      return `<pre${jsxAttrs}>{\`${safeCode}\`}</pre>`;
    }
  });

  // Replace internal <a href="/...">...</a> with <Link href="/...">...</Link>
  jsxContent = jsxContent.replace(/<a\s+(href="\/[^"]*")((?:(?!target=)[^>])*)>([\s\S]*?)<\/a>/gi, '<Link $1$2>$3</Link>');

  // Insert KeyTakeaways after </header> inside article
  jsxContent = jsxContent.replace(/(<\/header>)/i, `$1\n\n        <KeyTakeaways items={repo.keyTakeaways} />\n`);

  // Insert FAQSection before author-bio-box
  jsxContent = jsxContent.replace(/(<div className="author-bio-box">)/i, `<FAQSection faqs={repo.faqs} />\n\n          $1`);

  // Component template (Next.js Server Component with metadata and pre-rendered schemas)
  const compCode = `import type { Metadata } from 'next';
import Link from 'next/link';
import SiteHeader from '@/components/SiteHeader';
import SiteFooter from '@/components/SiteFooter';
import KeyTakeaways from '@/components/KeyTakeaways';
import FAQSection from '@/components/FAQSection';
import RepoInteractiveScript from '@/components/RepoInteractiveScript';
import { BRAND_CONFIG, getBreadcrumbSchema, getSoftwareRepoSchema, getFAQSchema } from '@/lib/seo';
import { REPOS_DATA } from '@/lib/repos-data';

const repo = REPOS_DATA['${slug}'];

export const metadata: Metadata = {
  title: \`\${repo.name} — Technical Architecture & Verified GitHub Repo\`,
  description: repo.metaDescription,
  alternates: {
    canonical: \`\${BRAND_CONFIG.siteUrl}/repos/\${repo.slug}\`,
  },
  openGraph: {
    title: \`\${repo.name} Architecture Breakdown | \${BRAND_CONFIG.name}\`,
    description: repo.metaDescription,
    url: \`\${BRAND_CONFIG.siteUrl}/repos/\${repo.slug}\`,
    type: 'article',
    siteName: BRAND_CONFIG.shortName,
    images: [
      {
        url: \`\${BRAND_CONFIG.siteUrl}/og-image.png\`,
        width: 1200,
        height: 630,
        alt: \`\${repo.name} Architecture Diagram on VNHAX\`,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: \`\${repo.name} — Architecture & Verified Repo\`,
    description: repo.metaDescription,
  },
};

export default function ${slug.replace(/-(.)/g, (_, c) => c.toUpperCase())}RepoPage() {
  const breadcrumbSchema = getBreadcrumbSchema([
    { name: 'Home', url: '/' },
    { name: 'Developer Resources', url: '/developer-resources' },
    { name: 'GitHub Repos', url: '/developer-resources/github-repos' },
    { name: repo.name, url: \`/repos/\${repo.slug}\` },
  ]);

  const softwareSchema = getSoftwareRepoSchema({
    name: repo.name,
    description: repo.summary,
    url: \`\${BRAND_CONFIG.siteUrl}/repos/\${repo.slug}\`,
    codeRepository: repo.githubUrl,
    programmingLanguage: repo.language,
    license: repo.license,
  });

  const faqSchema = getFAQSchema(repo.faqs);

  return (
    <>
      {/* Schema.org Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

${jsxContent}

      {/* Interactive Controls & Diagram Handler */}
      <RepoInteractiveScript />
    </>
  );
}
`;

  // Output 1: app/repos/[slug]/page.tsx
  const reposDir = path.join(__dirname, '..', 'app', 'repos', slug);
  fs.mkdirSync(reposDir, { recursive: true });
  fs.writeFileSync(path.join(reposDir, 'page.tsx'), compCode, 'utf8');
  console.log(`Generated app/repos/${slug}/page.tsx`);

  // Output 2: app/repo-[slug]/page.tsx (re-export for backwards compatibility)
  const legacyDir = path.join(__dirname, '..', 'app', `repo-${slug}`);
  fs.mkdirSync(legacyDir, { recursive: true });
  const legacyCode = `import RepoPage, { metadata } from '@/app/repos/${slug}/page';

export { metadata };
export default RepoPage;
`;
  fs.writeFileSync(path.join(legacyDir, 'page.tsx'), legacyCode, 'utf8');
  console.log(`Generated app/repo-${slug}/page.tsx (legacy re-export)`);
}
