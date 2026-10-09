import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import SiteHeader from '@/components/SiteHeader';
import SiteFooter from '@/components/SiteFooter';
import GitHubRepoViewer from '@/components/GitHubRepoViewer';
import { getAllRepos, getRepoBySlug } from '@/lib/repos-data';
import { BRAND_CONFIG, getBreadcrumbSchema } from '@/lib/seo';

interface RepoPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const repos = getAllRepos();
  return repos.map((r) => ({ slug: r.slug }));
}

export async function generateMetadata({ params }: RepoPageProps): Promise<Metadata> {
  const { slug } = await params;
  const repo = getRepoBySlug(slug);

  if (!repo) {
    return {
      title: {
        absolute: `Repository Not Found | ${BRAND_CONFIG.shortName}`,
      },
      robots: { index: false, follow: false },
    };
  }

  const title = {
    absolute: `${repo.repoFullName} — Architecture Guide | ${BRAND_CONFIG.shortName}`,
  };
  const description = repo.metaDescription;
  const url = `${BRAND_CONFIG.siteUrl}/repos/${slug}`;

  const ogImageUrl = repo.image
    ? `${BRAND_CONFIG.siteUrl}${encodeURI(repo.image)}`
    : `${BRAND_CONFIG.siteUrl}/apple-icon.png`;

  return {
    title,
    description,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title: `${repo.repoFullName} — Architecture Guide | ${BRAND_CONFIG.shortName}`,
      description,
      url,
      siteName: BRAND_CONFIG.name,
      type: 'article',
      images: [
        {
          url: ogImageUrl,
          width: 1200,
          height: 675,
          alt: `${repo.name} architecture overview`,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${repo.repoFullName} on GitHub`,
      description,
      images: [ogImageUrl],
    },
  };
}

export default async function RepoDetailPage({ params }: RepoPageProps) {
  const { slug } = await params;
  const repo = getRepoBySlug(slug);

  if (!repo) {
    notFound();
  }

  const [owner] = repo.repoFullName.split('/');

  const softwareSchema = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareSourceCode',
    name: repo.name,
    description: repo.metaDescription,
    image: repo.image ? `${BRAND_CONFIG.siteUrl}${encodeURI(repo.image)}` : undefined,
    codeRepository: repo.githubUrl,
    programmingLanguage: repo.language,
    license: repo.license,
    url: `${BRAND_CONFIG.siteUrl}/repos/${slug}`,
    publisher: {
      '@type': 'Organization',
      name: BRAND_CONFIG.name,
      url: BRAND_CONFIG.siteUrl,
    },
    author: {
      '@type': 'Organization',
      name: owner,
      url: `https://github.com/${owner}`,
    },
  };

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: repo.faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };

  const breadcrumbSchema = getBreadcrumbSchema([
    { name: 'Home', url: '/' },
    { name: 'Developer Resources', url: '/developer-resources' },
    { name: 'Repositories', url: '/repos' },
    { name: repo.name, url: `/repos/${slug}` },
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareSchema) }}
      />
      {repo.faqs && repo.faqs.length > 0 && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      )}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <SiteHeader variant="standard" />

      {/* Interactive Official GitHub Repository Viewer with functional sub-tabs */}
      <GitHubRepoViewer repo={repo} />

      <SiteFooter />
    </>
  );
}
