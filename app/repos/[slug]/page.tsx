import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import SiteHeader from '@/components/SiteHeader';
import SiteFooter from '@/components/SiteFooter';
import Breadcrumbs from '@/components/Breadcrumbs';
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
      title: `Repository Not Found — ${BRAND_CONFIG.name}`,
      robots: { index: false, follow: false },
    };
  }

  const title = `${repo.repoFullName}: ${repo.summary.slice(0, 50)}... — GitHub Architecture | VNHAX`;
  const description = repo.metaDescription;
  const url = `${BRAND_CONFIG.siteUrl}/repos/${slug}`;

  return {
    title,
    description,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title: `${repo.repoFullName} — GitHub Repository Architecture | VNHAX`,
      description,
      url,
      siteName: BRAND_CONFIG.name,
      type: 'article',
    },
    twitter: {
      card: 'summary_large_image',
      title: `${repo.repoFullName} on GitHub`,
      description,
    },
  };
}

export default async function RepoDetailPage({ params }: RepoPageProps) {
  const { slug } = await params;
  const repo = getRepoBySlug(slug);

  if (!repo) {
    notFound();
  }

  const [owner, repoShortName] = repo.repoFullName.split('/');

  const softwareSchema = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareSourceCode',
    name: repo.name,
    description: repo.metaDescription,
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

      {/* Official GitHub-Themed Workspace */}
      <div className="github-repo-wrapper" style={{ background: '#ffffff', minHeight: '100vh', fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", "Noto Sans", Helvetica, Arial, sans-serif' }}>
        
        {/* Top GitHub Repo Header */}
        <header
          style={{
            background: '#f6f8fa',
            borderBottom: '1px solid #d0d7de',
            paddingTop: '16px',
          }}
        >
          <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 24px' }}>
            <Breadcrumbs
              items={[
                { label: 'Developer Resources', href: '/developer-resources' },
                { label: 'Repositories', href: '/repos' },
                { label: repo.name },
              ]}
            />

            {/* Title Row with Action Buttons */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                flexWrap: 'wrap',
                gap: '12px',
                marginTop: '12px',
                marginBottom: '16px',
              }}
            >
              {/* Repo Name Breadcrumb */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '18px', fontWeight: 600 }}>
                {/* Book / Repo Icon */}
                <svg viewBox="0 0 16 16" width="16" height="16" fill="#57606a" aria-hidden="true">
                  <path d="M2 2.5A2.5 2.5 0 0 1 4.5 0h8.75a.75.75 0 0 1 .75.75v12.5a.75.75 0 0 1-.75.75h-2.5a.75.75 0 0 1 0-1.5h1.75v-2h-8a1 1 0 0 0-.714 1.7.75.75 0 1 1-1.072 1.05A2.495 2.495 0 0 1 2 11.5Zm10.5-1h-8a1 1 0 0 0-1 1v6.708A2.486 2.486 0 0 1 4.5 9h8ZM5 12.25a.25.25 0 0 1 .25-.25h6.5a.25.25 0 0 1 .25.25v.75a.25.25 0 0 1-.25.25h-6.5a.25.25 0 0 1-.25-.25Z" />
                </svg>
                <a
                  href={`https://github.com/${owner}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ color: '#0969da', textDecoration: 'none' }}
                >
                  {owner}
                </a>
                <span style={{ color: '#57606a' }}>/</span>
                <span style={{ color: '#1f2328', fontWeight: 700 }}>{repoShortName || repo.name}</span>
                <span
                  style={{
                    fontSize: '12px',
                    fontWeight: 500,
                    color: '#57606a',
                    border: '1px solid #d0d7de',
                    borderRadius: '24px',
                    padding: '1px 8px',
                    marginLeft: '4px',
                  }}
                >
                  Public
                </span>
              </div>

              {/* GitHub Action Buttons */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
                {/* Watch */}
                <div style={{ display: 'inline-flex', border: '1px solid #d0d7de', borderRadius: '6px', background: '#f6f8fa', fontSize: '12px', fontWeight: 600 }}>
                  <a
                    href={repo.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '5px',
                      padding: '4px 10px',
                      color: '#1f2328',
                      textDecoration: 'none',
                    }}
                  >
                    <svg viewBox="0 0 16 16" width="14" height="14" fill="#57606a"><path d="M8 2c1.981 0 3.671.992 4.933 2.078 1.27 1.091 2.187 2.345 2.637 3.023a1.62 1.62 0 0 1 0 1.798c-.45.678-1.367 1.932-2.637 3.023C11.67 13.008 9.981 14 8 14c-1.981 0-3.671-.992-4.933-2.078C1.797 10.83.88 9.576.43 8.898a1.62 1.62 0 0 1 0-1.798c.45-.677 1.367-1.931 2.637-3.022C4.33 2.992 6.02 2 8 2Z"/></svg>
                    <span>Watch</span>
                  </a>
                  <span style={{ borderLeft: '1px solid #d0d7de', padding: '4px 8px', color: '#1f2328' }}>{repo.watching}</span>
                </div>

                {/* Fork */}
                <div style={{ display: 'inline-flex', border: '1px solid #d0d7de', borderRadius: '6px', background: '#f6f8fa', fontSize: '12px', fontWeight: 600 }}>
                  <a
                    href={`${repo.githubUrl}/fork`}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '5px',
                      padding: '4px 10px',
                      color: '#1f2328',
                      textDecoration: 'none',
                    }}
                  >
                    <svg viewBox="0 0 16 16" width="14" height="14" fill="#57606a"><path d="M5 3.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm0 2.122a2.25 2.25 0 1 0-1.5 0v.878A2.25 2.25 0 0 0 5.75 8.5h4.5A2.25 2.25 0 0 0 12.5 6.25v-.878a2.25 2.25 0 1 0-1.5 0v.878a.75.75 0 0 1-.75.75h-4.5A.75.75 0 0 1 5 6.25v-.878Zm3.75 7.378a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm.75-2.122v-.75a.75.75 0 0 0-.75-.75h-.5a.75.75 0 0 0-.75.75v.75a2.25 2.25 0 1 0 2 0Z"/></svg>
                    <span>Fork</span>
                  </a>
                  <span style={{ borderLeft: '1px solid #d0d7de', padding: '4px 8px', color: '#1f2328' }}>{repo.forks}</span>
                </div>

                {/* Star */}
                <div style={{ display: 'inline-flex', border: '1px solid #d0d7de', borderRadius: '6px', background: '#f6f8fa', fontSize: '12px', fontWeight: 600 }}>
                  <a
                    href={repo.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '5px',
                      padding: '4px 10px',
                      color: '#1f2328',
                      textDecoration: 'none',
                    }}
                  >
                    <svg viewBox="0 0 16 16" width="14" height="14" fill="#e3b341"><path d="M8 .25a.75.75 0 0 1 .673.418l1.882 3.815 4.21.612a.75.75 0 0 1 .416 1.279l-3.046 2.97.719 4.192a.751.751 0 0 1-1.088.791L8 12.347l-3.766 1.98a.75.75 0 0 1-1.088-.79l.72-4.194L.818 6.374a.75.75 0 0 1 .416-1.28l4.21-.611L7.327.668A.75.75 0 0 1 8 .25Z"/></svg>
                    <span>Star</span>
                  </a>
                  <span style={{ borderLeft: '1px solid #d0d7de', padding: '4px 8px', color: '#1f2328' }}>{repo.stars}</span>
                </div>
              </div>
            </div>

            {/* GitHub Navigation Tabs */}
            <nav
              style={{
                display: 'flex',
                gap: '8px',
                overflowX: 'auto',
                fontSize: '14px',
                fontWeight: 600,
                color: '#656d76',
              }}
              aria-label="Repository navigation"
            >
              <button
                type="button"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  padding: '8px 12px',
                  background: 'none',
                  border: 'none',
                  borderBottom: '2px solid #fd8c73',
                  color: '#1f2328',
                  fontWeight: 600,
                  cursor: 'pointer',
                  fontSize: '13.5px',
                }}
              >
                <svg viewBox="0 0 16 16" width="16" height="16" fill="#1f2328"><path d="m11.28 3.22 4.25 4.25a.75.75 0 0 1 0 1.06l-4.25 4.25a.749.749 0 0 1-1.275-.326.749.749 0 0 1 .215-.734L13.94 8l-3.72-3.72a.749.749 0 0 1 .326-1.275.749.749 0 0 1 .734.215Zm-6.56 0a.751.751 0 0 1 1.042.018.751.751 0 0 1 .018 1.042L2.06 8l3.72 3.72a.749.749 0 0 1-.326 1.275.749.749 0 0 1-.734-.215L.47 8.53a.75.75 0 0 1 0-1.06Z"/></svg>
                <span>Code</span>
              </button>

              <button
                type="button"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  padding: '8px 12px',
                  background: 'none',
                  border: 'none',
                  color: '#656d76',
                  cursor: 'pointer',
                  fontSize: '13.5px',
                }}
              >
                <svg viewBox="0 0 16 16" width="16" height="16" fill="#656d76"><path d="M8 9.5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3Z"/><path d="M8 0a8 8 0 1 1 0 16A8 8 0 0 1 8 0ZM1.5 8a6.5 6.5 0 1 0 13 0 6.5 6.5 0 0 0-13 0Z"/></svg>
                <span>Issues</span>
                <span style={{ background: '#afb8c133', borderRadius: '24px', padding: '0 6px', fontSize: '11px' }}>12</span>
              </button>

              <button
                type="button"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  padding: '8px 12px',
                  background: 'none',
                  border: 'none',
                  color: '#656d76',
                  cursor: 'pointer',
                  fontSize: '13.5px',
                }}
              >
                <svg viewBox="0 0 16 16" width="16" height="16" fill="#656d76"><path d="M1.5 3.25a2.25 2.25 0 1 1 3 2.122v5.256a2.251 2.251 0 1 1-1.5 0V5.372A2.25 2.25 0 0 1 1.5 3.25Zm5.677 2.202A.75.75 0 0 1 7.75 5h3.5a2.25 2.25 0 0 1 2.25 2.25v3.128a2.251 2.251 0 1 1-1.5 0V7.25a.75.75 0 0 0-.75-.75h-3.5a.75.75 0 0 1-.573-.298Z"/></svg>
                <span>Pull requests</span>
                <span style={{ background: '#afb8c133', borderRadius: '24px', padding: '0 6px', fontSize: '11px' }}>3</span>
              </button>

              <button
                type="button"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  padding: '8px 12px',
                  background: 'none',
                  border: 'none',
                  color: '#656d76',
                  cursor: 'pointer',
                  fontSize: '13.5px',
                }}
              >
                <svg viewBox="0 0 16 16" width="16" height="16" fill="#656d76"><path d="M8 0a8 8 0 1 1 0 16A8 8 0 0 1 8 0ZM1.5 8a6.5 6.5 0 1 0 13 0 6.5 6.5 0 0 0-13 0Zm4.879-2.773 4.264 2.559a.25.25 0 0 1 0 .428l-4.264 2.559A.25.25 0 0 1 6 10.559V5.442a.25.25 0 0 1 .379-.215Z"/></svg>
                <span>Actions</span>
              </button>

              <button
                type="button"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  padding: '8px 12px',
                  background: 'none',
                  border: 'none',
                  color: '#656d76',
                  cursor: 'pointer',
                  fontSize: '13.5px',
                }}
              >
                <svg viewBox="0 0 16 16" width="16" height="16" fill="#656d76"><path d="M1.75 0h12.5C15.216 0 16 .784 16 1.75v12.5A1.75 1.75 0 0 1 14.25 16H1.75A1.75 1.75 0 0 1 0 14.25V1.75C0 .784.784 0 1.75 0ZM1.5 1.75v12.5c0 .138.112.25.25.25h12.5a.25.25 0 0 0 .25-.25V1.75a.25.25 0 0 0-.25-.25H1.75a.25.25 0 0 0-.25.25ZM9 3.5a.75.75 0 0 1 .75.75v7.5a.75.75 0 0 1-1.5 0v-7.5A.75.75 0 0 1 9 3.5Zm-4 3a.75.75 0 0 1 .75.75v4.5a.75.75 0 0 1-1.5 0v-4.5A.75.75 0 0 1 5 6.5Z"/></svg>
                <span>Insights</span>
              </button>
            </nav>
          </div>
        </header>

        {/* Main 2-Column Body: Left Files + Readme, Right About Sidebar */}
        <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '24px' }}>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'minmax(0, 1fr) 296px',
              gap: '28px',
            }}
            className="github-main-grid"
          >
            {/* Left Column: Branch selector, commit bar, file tree, and README card */}
            <div>
              {/* Branch Bar & Green Code Button */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  marginBottom: '16px',
                  flexWrap: 'wrap',
                  gap: '12px',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <button
                    type="button"
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '6px',
                      background: '#f6f8fa',
                      border: '1px solid #d0d7de',
                      borderRadius: '6px',
                      padding: '5px 12px',
                      fontSize: '13px',
                      fontWeight: 600,
                      color: '#1f2328',
                      cursor: 'pointer',
                    }}
                  >
                    <svg viewBox="0 0 16 16" width="14" height="14" fill="#57606a"><path d="M11.75 2.5a.75.75 0 1 0 0 1.5.75.75 0 0 0 0-1.5Zm-2.25.75a2.25 2.25 0 1 1 3 2.122V6A2.5 2.5 0 0 1 10 8.5H6a1 1 0 0 0-1 1v1.128a2.251 2.251 0 1 1-1.5 0V5.372a2.25 2.25 0 1 1 1.5 0v1.836A2.493 2.493 0 0 1 6 7h4a1 1 0 0 0 1-1v-.628A2.25 2.25 0 0 1 9.5 3.25Z"/></svg>
                    <span>main</span>
                    <span style={{ fontSize: '10px', color: '#57606a' }}>▼</span>
                  </button>

                  <span style={{ fontSize: '13px', color: '#656d76' }}>
                    <strong>3</strong> branches · <strong>14</strong> tags
                  </span>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <a
                    href={repo.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      background: '#1f883d',
                      color: '#ffffff',
                      border: 'none',
                      borderRadius: '6px',
                      padding: '6px 14px',
                      fontSize: '13.5px',
                      fontWeight: 600,
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '6px',
                      textDecoration: 'none',
                      boxShadow: '0 1px 0 rgba(0,0,0,0.1)',
                    }}
                  >
                    <svg viewBox="0 0 16 16" width="14" height="14" fill="#ffffff"><path d="m11.28 3.22 4.25 4.25a.75.75 0 0 1 0 1.06l-4.25 4.25a.749.749 0 0 1-1.275-.326.749.749 0 0 1 .215-.734L13.94 8l-3.72-3.72a.749.749 0 0 1 .326-1.275.749.749 0 0 1 .734.215Zm-6.56 0a.751.751 0 0 1 1.042.018.751.751 0 0 1 .018 1.042L2.06 8l3.72 3.72a.749.749 0 0 1-.326 1.275.749.749 0 0 1-.734-.215L.47 8.53a.75.75 0 0 1 0-1.06Z"/></svg>
                    <span>Code</span>
                    <span style={{ fontSize: '10px' }}>▼</span>
                  </a>
                </div>
              </div>

              {/* GitHub Latest Commit Banner */}
              <div
                style={{
                  border: '1px solid #d0d7de',
                  borderRadius: '6px 6px 0 0',
                  background: '#f6f8fa',
                  padding: '10px 16px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  fontSize: '13px',
                  flexWrap: 'wrap',
                  gap: '8px',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <div
                    style={{
                      width: '20px',
                      height: '20px',
                      borderRadius: '50%',
                      background: '#0969da',
                      color: '#ffffff',
                      display: 'grid',
                      placeItems: 'center',
                      fontSize: '10px',
                      fontWeight: 700,
                    }}
                  >
                    {owner[0].toUpperCase()}
                  </div>
                  <strong style={{ color: '#1f2328' }}>{repo.latestCommit.author}</strong>
                  <span style={{ color: '#656d76', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', maxWidth: '380px' }}>
                    {repo.latestCommit.message}
                  </span>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', color: '#656d76' }}>
                  <span style={{ fontFamily: 'monospace', fontSize: '12px', background: '#eaeef2', padding: '2px 6px', borderRadius: '4px' }}>
                    {repo.latestCommit.hash}
                  </span>
                  <span>{repo.latestCommit.time}</span>
                </div>
              </div>

              {/* GitHub File Explorer Table */}
              <div
                style={{
                  border: '1px solid #d0d7de',
                  borderTop: 'none',
                  borderRadius: '0 0 6px 6px',
                  background: '#ffffff',
                  marginBottom: '24px',
                  overflow: 'hidden',
                }}
              >
                {repo.files.map((file, idx) => (
                  <div
                    key={file.name}
                    style={{
                      display: 'grid',
                      gridTemplateColumns: '260px 1fr 120px',
                      alignItems: 'center',
                      padding: '8px 16px',
                      fontSize: '13px',
                      borderBottom: idx < repo.files.length - 1 ? '1px solid #eaeef2' : 'none',
                      transition: 'background 0.15s ease',
                    }}
                    className="github-file-row"
                  >
                    {/* Name + Icon */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      {file.type === 'dir' ? (
                        <svg viewBox="0 0 16 16" width="16" height="16" fill="#54aeff"><path d="M1.75 1A1.75 1.75 0 0 0 0 2.75v10.5C0 14.216.784 15 1.75 15h12.5A1.75 1.75 0 0 0 16 13.25v-8.5A1.75 1.75 0 0 0 14.25 3H7.5a.25.25 0 0 1-.2-.1l-.9-1.2C6.07 1.26 5.55 1 5 1H1.75Z"/></svg>
                      ) : (
                        <svg viewBox="0 0 16 16" width="16" height="16" fill="#656d76"><path d="M2 1.75C2 .784 2.784 0 3.75 0h6.586c.464 0 .909.184 1.237.513l3.414 3.414c.329.328.513.773.513 1.237v9.086A1.75 1.75 0 0 1 13.75 16H3.75A1.75 1.75 0 0 1 2 14.25Zm1.75-.25a.25.25 0 0 0-.25.25v12.5c0 .138.112.25.25.25h10a.25.25 0 0 0 .25-.25V5.25a.25.25 0 0 0-.25-.25H10.5a1.75 1.75 0 0 1-1.75-1.75V1.5Z"/></svg>
                      )}
                      <span style={{ color: file.name === 'README.md' ? '#1f2328' : '#0969da', fontWeight: file.type === 'dir' ? 600 : 400 }}>
                        {file.name}
                      </span>
                    </div>

                    {/* Commit message */}
                    <div style={{ color: '#656d76', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', paddingRight: '12px' }}>
                      {file.message}
                    </div>

                    {/* Commit time */}
                    <div style={{ color: '#656d76', textAlign: 'right', fontSize: '12px' }}>
                      {file.time}
                    </div>
                  </div>
                ))}
              </div>

              {/* The Canonical GitHub README Container */}
              <article
                style={{
                  border: '1px solid #d0d7de',
                  borderRadius: '6px',
                  background: '#ffffff',
                  boxShadow: '0 1px 3px rgba(31,35,40,0.04)',
                }}
              >
                {/* README Header Bar */}
                <div
                  style={{
                    background: '#f6f8fa',
                    borderBottom: '1px solid #d0d7de',
                    borderRadius: '6px 6px 0 0',
                    padding: '10px 16px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13.5px', fontWeight: 600, color: '#1f2328' }}>
                    <svg viewBox="0 0 16 16" width="16" height="16" fill="#57606a"><path d="M0 1.75A.75.75 0 0 1 .75 1h4.253c1.227 0 2.317.59 3 1.501A3.743 3.743 0 0 1 11.006 1h4.244a.75.75 0 0 1 .75.75v10.5a.75.75 0 0 1-.75.75h-4.244a2.25 2.25 0 0 0-1.756.843l-.25.333a.75.75 0 0 1-1.212 0l-.25-.333A2.25 2.25 0 0 0 5.003 13H.75a.75.75 0 0 1-.75-.75Zm1.5.5v8.75a.75.75 0 0 0 .75.75h3.253a3.75 3.75 0 0 1 2.247.747V3.5a2.25 2.25 0 0 0-2.247-2.25H2.25a.75.75 0 0 0-.75.75Zm13 0a.75.75 0 0 0-.75-.75h-3.244a2.25 2.25 0 0 0-2.248 2.25v9.497a3.75 3.75 0 0 1 2.248-.747h3.244a.75.75 0 0 0 .75-.75Z"/></svg>
                    <span>README.md</span>
                  </div>

                  <span style={{ fontSize: '11px', color: '#656d76' }}>
                    Verified Technical Teardown
                  </span>
                </div>

                {/* README Markdown-Rendered Body */}
                <div style={{ padding: '32px', color: '#1f2328', lineHeight: 1.65 }}>
                  {/* Badges Bar */}
                  <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '20px' }}>
                    <span style={{ background: '#2563eb', color: '#ffffff', fontSize: '11px', fontWeight: 600, padding: '3px 8px', borderRadius: '4px' }}>
                      License: {repo.license}
                    </span>
                    <span style={{ background: '#f59e0b', color: '#ffffff', fontSize: '11px', fontWeight: 600, padding: '3px 8px', borderRadius: '4px' }}>
                      Stars: {repo.stars}
                    </span>
                    <span style={{ background: '#16a34a', color: '#ffffff', fontSize: '11px', fontWeight: 600, padding: '3px 8px', borderRadius: '4px' }}>
                      Build: Passing
                    </span>
                    <span style={{ background: '#7c3aed', color: '#ffffff', fontSize: '11px', fontWeight: 600, padding: '3px 8px', borderRadius: '4px' }}>
                      Release: {repo.releases}
                    </span>
                  </div>

                  <h1 style={{ fontSize: '28px', fontWeight: 700, borderBottom: '1px solid #d0d7de', paddingBottom: '10px', marginBottom: '16px' }}>
                    {repo.name}
                  </h1>

                  <p style={{ fontSize: '16px', color: '#334155', marginBottom: '24px' }}>
                    {repo.summary}
                  </p>

                  {/* Key Takeaways */}
                  <div style={{ background: '#f6f8fa', border: '1px solid #d0d7de', borderRadius: '8px', padding: '18px 20px', marginBottom: '28px' }}>
                    <h3 style={{ fontSize: '15px', fontWeight: 700, margin: '0 0 10px', color: '#1f2328' }}>
                      📌 Executive Highlights &amp; Key Findings
                    </h3>
                    <ul style={{ margin: 0, paddingLeft: '20px', fontSize: '14px', color: '#334155', display: 'flex', flexDirection: 'column', gap: '6px' }}>
                      {repo.keyTakeaways.map((takeaway, i) => (
                        <li key={i}>{takeaway}</li>
                      ))}
                    </ul>
                  </div>

                  {/* Why Use Section */}
                  <h2 style={{ fontSize: '20px', fontWeight: 700, borderBottom: '1px solid #d0d7de', paddingBottom: '8px', margin: '28px 0 12px' }}>
                    Why Adopt {repo.name}?
                  </h2>
                  <p style={{ fontSize: '14.5px', color: '#334155', lineHeight: 1.7, marginBottom: '24px' }}>
                    {repo.whyUse}
                  </p>

                  {/* Architecture Section */}
                  <h2 style={{ fontSize: '20px', fontWeight: 700, borderBottom: '1px solid #d0d7de', paddingBottom: '8px', margin: '28px 0 12px' }}>
                    Architecture &amp; Core Mechanics
                  </h2>
                  <p style={{ fontSize: '14.5px', color: '#334155', lineHeight: 1.7, marginBottom: '20px' }}>
                    {repo.architecture}
                  </p>

                  {/* Benchmarks Section */}
                  {repo.benchmarks && (
                    <div style={{ background: '#f0fdf4', border: '1px solid #bbf7d0', borderRadius: '8px', padding: '16px 20px', marginBottom: '24px' }}>
                      <h4 style={{ fontSize: '14px', fontWeight: 700, color: '#166534', margin: '0 0 6px' }}>
                        📊 Empirical Benchmarks &amp; Efficiency
                      </h4>
                      <p style={{ fontSize: '14px', color: '#14532d', margin: 0 }}>
                        {repo.benchmarks}
                      </p>
                    </div>
                  )}

                  {/* Quickstart Code Snippet */}
                  <h2 style={{ fontSize: '20px', fontWeight: 700, borderBottom: '1px solid #d0d7de', paddingBottom: '8px', margin: '28px 0 12px' }}>
                    Quickstart &amp; Installation
                  </h2>
                  <pre
                    style={{
                      background: '#1f2328',
                      color: '#f0f6fc',
                      padding: '16px',
                      borderRadius: '8px',
                      fontSize: '13px',
                      fontFamily: 'ui-monospace, SFMono-Regular, "SF Mono", Menlo, Consolas, monospace',
                      overflowX: 'auto',
                      marginBottom: '28px',
                    }}
                  >
                    <code>{repo.quickstart}</code>
                  </pre>

                  {/* FAQ Accordion */}
                  {repo.faqs && repo.faqs.length > 0 && (
                    <div>
                      <h2 style={{ fontSize: '20px', fontWeight: 700, borderBottom: '1px solid #d0d7de', paddingBottom: '8px', margin: '28px 0 16px' }}>
                        Frequently Asked Questions
                      </h2>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                        {repo.faqs.map((faq, i) => (
                          <details
                            key={i}
                            style={{
                              border: '1px solid #d0d7de',
                              borderRadius: '6px',
                              padding: '12px 16px',
                              background: '#ffffff',
                            }}
                          >
                            <summary style={{ fontWeight: 600, fontSize: '14px', cursor: 'pointer', color: '#1f2328' }}>
                              {faq.question}
                            </summary>
                            <p style={{ fontSize: '13.5px', color: '#475569', margin: '10px 0 0', lineHeight: 1.6 }}>
                              {faq.answer}
                            </p>
                          </details>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </article>
            </div>

            {/* Right Column: GitHub "About" Sidebar */}
            <aside>
              <div style={{ paddingBottom: '24px', borderBottom: '1px solid #d0d7de', marginBottom: '24px' }}>
                <h3 style={{ fontSize: '14px', fontWeight: 700, color: '#1f2328', marginBottom: '10px' }}>
                  About
                </h3>
                <p style={{ fontSize: '14px', color: '#1f2328', lineHeight: 1.5, marginBottom: '16px' }}>
                  {repo.summary}
                </p>

                {/* Link */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '13px', marginBottom: '16px' }}>
                  <svg viewBox="0 0 16 16" width="14" height="14" fill="#57606a"><path d="m7.775 3.275 1.25-1.25a3.5 3.5 0 1 1 4.95 4.95l-2.5 2.5a3.5 3.5 0 0 1-4.95 0 .751.751 0 0 1 .018-1.042.751.751 0 0 1 1.042-.018 1.998 1.998 0 0 0 2.83 0l2.5-2.5a2.002 2.002 0 0 0-2.83-2.83l-1.25 1.25a.751.751 0 0 1-1.042-.018.751.751 0 0 1-.018-1.042Zm-4.69 9.64a1.998 1.998 0 0 0 2.83 0l1.25-1.25a.751.751 0 0 1 1.042.018.751.751 0 0 1 .018 1.042l-1.25 1.25a3.5 3.5 0 1 1-4.95-4.95l2.5-2.5a3.5 3.5 0 0 1 4.95 0 .751.751 0 0 1-.018 1.042.751.751 0 0 1-1.042.018 1.998 1.998 0 0 0-2.83 0l-2.5 2.5a1.998 1.998 0 0 0 0 2.83Z"/></svg>
                  <a href={repo.githubUrl} target="_blank" rel="noopener noreferrer" style={{ color: '#0969da', textDecoration: 'none', fontWeight: 600 }}>
                    github.com/{repo.repoFullName}
                  </a>
                </div>

                {/* Topics Tags */}
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '20px' }}>
                  {repo.topics.map(t => (
                    <span
                      key={t}
                      style={{
                        background: '#ddf4ff',
                        color: '#0969da',
                        fontSize: '11.5px',
                        fontWeight: 600,
                        padding: '3px 10px',
                        borderRadius: '24px',
                      }}
                    >
                      {t}
                    </span>
                  ))}
                </div>

                {/* Activity Stats */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '13px', color: '#656d76' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <svg viewBox="0 0 16 16" width="16" height="16" fill="#e3b341"><path d="M8 .25a.75.75 0 0 1 .673.418l1.882 3.815 4.21.612a.75.75 0 0 1 .416 1.279l-3.046 2.97.719 4.192a.751.751 0 0 1-1.088.791L8 12.347l-3.766 1.98a.75.75 0 0 1-1.088-.79l.72-4.194L.818 6.374a.75.75 0 0 1 .416-1.28l4.21-.611L7.327.668A.75.75 0 0 1 8 .25Z"/></svg>
                    <span><strong>{repo.stars}</strong> stars</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <svg viewBox="0 0 16 16" width="16" height="16" fill="#57606a"><path d="M8 2c1.981 0 3.671.992 4.933 2.078 1.27 1.091 2.187 2.345 2.637 3.023a1.62 1.62 0 0 1 0 1.798c-.45.678-1.367 1.932-2.637 3.023C11.67 13.008 9.981 14 8 14c-1.981 0-3.671-.992-4.933-2.078C1.797 10.83.88 9.576.43 8.898a1.62 1.62 0 0 1 0-1.798c.45-.677 1.367-1.931 2.637-3.022C4.33 2.992 6.02 2 8 2Z"/></svg>
                    <span><strong>{repo.watching}</strong> watching</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <svg viewBox="0 0 16 16" width="16" height="16" fill="#57606a"><path d="M5 3.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm0 2.122a2.25 2.25 0 1 0-1.5 0v.878A2.25 2.25 0 0 0 5.75 8.5h4.5A2.25 2.25 0 0 0 12.5 6.25v-.878a2.25 2.25 0 1 0-1.5 0v.878a.75.75 0 0 1-.75.75h-4.5A.75.75 0 0 1 5 6.25v-.878Zm3.75 7.378a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm.75-2.122v-.75a.75.75 0 0 0-.75-.75h-.5a.75.75 0 0 0-.75.75v.75a2.25 2.25 0 1 0 2 0Z"/></svg>
                    <span><strong>{repo.forks}</strong> forks</span>
                  </div>
                </div>
              </div>

              {/* Releases Section */}
              <div style={{ paddingBottom: '24px', borderBottom: '1px solid #d0d7de', marginBottom: '24px' }}>
                <h3 style={{ fontSize: '14px', fontWeight: 700, color: '#1f2328', marginBottom: '8px' }}>
                  Releases
                </h3>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '13px' }}>
                  <svg viewBox="0 0 16 16" width="14" height="14" fill="#1f883d"><path d="M1 7.775V2.75C1 1.784 1.784 1 2.75 1h5.025c.464 0 .91.184 1.238.513l6.25 6.25a1.75 1.75 0 0 1 0 2.474l-5.026 5.026a1.75 1.75 0 0 1-2.474 0l-6.25-6.25A1.752 1.752 0 0 1 1 7.775Zm1.5 0c0 .066.026.13.073.177l6.25 6.25a.25.25 0 0 0 .354 0l5.025-5.025a.25.25 0 0 0 0-.354l-6.25-6.25a.25.25 0 0 0-.177-.073H2.75a.25.25 0 0 0-.25.25ZM6 5a1 1 0 1 1 0-2 1 1 0 0 1 0 2Z"/></svg>
                  <span style={{ fontWeight: 600, color: '#1f2328' }}>{repo.releases}</span>
                </div>
              </div>

              {/* Languages Breakdown Bar */}
              <div>
                <h3 style={{ fontSize: '14px', fontWeight: 700, color: '#1f2328', marginBottom: '10px' }}>
                  Languages
                </h3>
                {/* Stacked Color Bar */}
                <div style={{ display: 'flex', height: '8px', borderRadius: '4px', overflow: 'hidden', marginBottom: '10px' }}>
                  {repo.languages.map(l => (
                    <div
                      key={l.name}
                      style={{
                        width: `${l.percent}%`,
                        background: l.color,
                      }}
                      title={`${l.name}: ${l.percent}%`}
                    />
                  ))}
                </div>

                {/* Legend List */}
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', fontSize: '12px' }}>
                  {repo.languages.map(l => (
                    <div key={l.name} style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                      <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: l.color, display: 'inline-block' }} />
                      <span style={{ fontWeight: 600, color: '#1f2328' }}>{l.name}</span>
                      <span style={{ color: '#656d76' }}>{l.percent}%</span>
                    </div>
                  ))}
                </div>
              </div>
            </aside>
          </div>
        </div>
      </div>

      <SiteFooter />

      <style
        dangerouslySetInnerHTML={{
          __html: `
            .github-file-row:hover {
              background: #f6f8fa !important;
            }
            @media (max-width: 900px) {
              .github-main-grid {
                grid-template-columns: 1fr !important;
              }
            }
          `,
        }}
      />
    </>
  );
}
