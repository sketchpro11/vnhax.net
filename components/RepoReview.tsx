import type React from 'react';
import Breadcrumbs from '@/components/Breadcrumbs';
import PonytailExtendedDoc from '@/components/PonytailExtendedDoc';
import ImpeccableExtendedDoc from '@/components/ImpeccableExtendedDoc';
import ECCExtendedDoc from '@/components/ECCExtendedDoc';
import EffectExtendedDoc from '@/components/EffectExtendedDoc';
import CavemanExtendedDoc from '@/components/CavemanExtendedDoc';
import AgentReachExtendedDoc from '@/components/AgentReachExtendedDoc';
import type { RepoDetails } from '@/lib/repos-data';

interface RepoReviewProps {
  repo: RepoDetails;
}

const EXTENDED_DOCS: Record<string, React.ComponentType> = {
  ponytail: PonytailExtendedDoc,
  impeccable: ImpeccableExtendedDoc,
  ecc: ECCExtendedDoc,
  effect: EffectExtendedDoc,
  caveman: CavemanExtendedDoc,
  'agent-reach': AgentReachExtendedDoc,
};

const h2Style = {
  fontSize: '20px',
  fontWeight: 700,
  borderBottom: '1px solid #d0d7de',
  paddingBottom: '8px',
  margin: '28px 0 12px',
} as const;

/**
 * Independent review page for an open-source repository.
 * Shows only real data: live GitHub stats (lib/repo-stats.json) and our write-up.
 */
export default function RepoReview({ repo }: RepoReviewProps) {
  const [owner, repoShortName] = repo.repoFullName.split('/');
  const ExtendedDoc = EXTENDED_DOCS[repo.slug];
  const statsDate = repo.statsUpdatedAt
    ? new Date(repo.statsUpdatedAt).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })
    : null;

  return (
    <div style={{ background: '#ffffff', minHeight: '100vh' }}>
      <header style={{ background: '#f6f8fa', borderBottom: '1px solid #d0d7de', paddingTop: '16px', paddingBottom: '16px' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 24px' }}>
          <Breadcrumbs
            items={[
              { label: 'Developer Resources', href: '/developer-resources' },
              { label: 'Repositories', href: '/repos' },
              { label: repo.name },
            ]}
          />

          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gap: '12px',
              marginTop: '12px',
            }}
          >
            <div style={{ fontSize: '18px', fontWeight: 600, color: '#1f2328' }}>
              <a href={`https://github.com/${owner}`} target="_blank" rel="noopener noreferrer" style={{ color: '#0969da', textDecoration: 'none' }}>
                {owner}
              </a>
              <span style={{ color: '#57606a' }}> / </span>
              <span style={{ fontWeight: 700 }}>{repoShortName || repo.name}</span>
            </div>

            <a
              href={repo.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn--dark"
              style={{ height: '36px', padding: '0 16px', fontSize: '13px', textDecoration: 'none', display: 'inline-flex', alignItems: 'center' }}
            >
              View on GitHub ↗
            </a>
          </div>

          <p style={{ fontSize: '12.5px', color: '#57606a', margin: '10px 0 0' }}>
            Independent review by VNHAX. Not affiliated with or endorsed by the project&apos;s authors.
          </p>
        </div>
      </header>

      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '24px' }}>
        <div className="repo-review-grid" style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) 296px', gap: '28px' }}>
          <article
            style={{
              border: '1px solid #d0d7de',
              borderRadius: '6px',
              padding: '32px',
              color: '#1f2328',
              lineHeight: 1.65,
              minWidth: 0,
            }}
          >
            {ExtendedDoc ? (
              <ExtendedDoc />
            ) : (
              <>
                <h1 style={{ fontSize: '28px', fontWeight: 700, borderBottom: '1px solid #d0d7de', paddingBottom: '10px', marginBottom: '16px' }}>
                  {repo.name}
                </h1>
                <p style={{ fontSize: '16px', color: '#334155', marginBottom: '24px' }}>{repo.summary}</p>

                <h2 style={h2Style}>Key Takeaways</h2>
                <ul style={{ paddingLeft: '20px', fontSize: '14.5px', color: '#334155' }}>
                  {repo.keyTakeaways.map((takeaway, i) => (
                    <li key={i}>{takeaway}</li>
                  ))}
                </ul>

                <h2 style={h2Style}>Why Use {repo.name}?</h2>
                <p style={{ fontSize: '14.5px', color: '#334155' }}>{repo.whyUse}</p>

                <h2 style={h2Style}>Architecture</h2>
                <p style={{ fontSize: '14.5px', color: '#334155' }}>{repo.architecture}</p>

                {repo.benchmarks && (
                  <>
                    <h2 style={h2Style}>Benchmarks (as reported by the project)</h2>
                    <p style={{ fontSize: '14.5px', color: '#334155' }}>{repo.benchmarks}</p>
                  </>
                )}

                <h2 style={h2Style}>Quickstart</h2>
                <pre style={{ background: '#1f2328', color: '#f0f6fc', padding: '16px', borderRadius: '8px', fontSize: '13px', overflowX: 'auto' }}>
                  <code>{repo.quickstart}</code>
                </pre>
              </>
            )}

            {repo.faqs && repo.faqs.length > 0 && (
              <section>
                <h2 style={h2Style}>Frequently Asked Questions</h2>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  {repo.faqs.map((faq, i) => (
                    <details key={i} style={{ border: '1px solid #d0d7de', borderRadius: '6px', padding: '12px 16px' }}>
                      <summary style={{ fontWeight: 600, fontSize: '14px', cursor: 'pointer' }}>{faq.question}</summary>
                      <p style={{ fontSize: '13.5px', color: '#475569', margin: '10px 0 0', lineHeight: 1.6 }}>{faq.answer}</p>
                    </details>
                  ))}
                </div>
              </section>
            )}
          </article>

          <aside>
            <div style={{ border: '1px solid #d0d7de', borderRadius: '6px', padding: '20px' }}>
              <h2 style={{ fontSize: '14px', fontWeight: 700, margin: '0 0 10px' }}>About this repository</h2>
              <p style={{ fontSize: '14px', lineHeight: 1.5, margin: '0 0 16px' }}>{repo.summary}</p>

              <dl style={{ display: 'grid', gridTemplateColumns: 'auto 1fr', gap: '8px 12px', fontSize: '13px', margin: '0 0 16px' }}>
                <dt style={{ color: '#656d76' }}>Stars</dt>
                <dd style={{ margin: 0, fontWeight: 600 }}>{repo.stars}</dd>
                <dt style={{ color: '#656d76' }}>Forks</dt>
                <dd style={{ margin: 0, fontWeight: 600 }}>{repo.forks}</dd>
                <dt style={{ color: '#656d76' }}>Language</dt>
                <dd style={{ margin: 0, fontWeight: 600 }}>{repo.language}</dd>
                <dt style={{ color: '#656d76' }}>License</dt>
                <dd style={{ margin: 0, fontWeight: 600 }}>{repo.license}</dd>
              </dl>

              {statsDate && (
                <p style={{ fontSize: '12px', color: '#656d76', margin: '0 0 16px' }}>
                  Stats from the GitHub API, updated {statsDate}.
                </p>
              )}

              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '16px' }}>
                {repo.topics.map((t) => (
                  <span key={t} style={{ background: '#ddf4ff', color: '#0969da', fontSize: '11.5px', fontWeight: 600, padding: '3px 10px', borderRadius: '24px' }}>
                    {t}
                  </span>
                ))}
              </div>

              <a href={repo.githubUrl} target="_blank" rel="noopener noreferrer" style={{ color: '#0969da', fontSize: '13px', fontWeight: 600, textDecoration: 'none' }}>
                github.com/{repo.repoFullName}
              </a>
            </div>
          </aside>
        </div>
      </div>

      <style
        dangerouslySetInnerHTML={{
          __html: `@media (max-width: 900px) { .repo-review-grid { grid-template-columns: 1fr !important; } }`,
        }}
      />
    </div>
  );
}
