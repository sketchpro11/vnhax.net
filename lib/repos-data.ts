/**
 * Repositories Data & GEO/AEO Knowledge Base
 * VNHAX — Virtual Next-Gen Hub for AI & eXploration
 * 
 * Empty starting slate: Add your verified GitHub repositories to REPOS_DATA below.
 */

export interface RepoDetails {
  slug: string;
  name: string;
  repoFullName: string;
  githubUrl: string;
  language: string;
  license: string;
  stars: string;
  category: string;
  summary: string;
  metaDescription: string;
  keyTakeaways: string[];
  faqs: {
    question: string;
    answer: string;
  }[];
}

/**
 * Clean data store for verified GitHub repositories.
 * Add new repository objects here:
 * 
 * Example:
 * 'my-repo': {
 *   slug: 'my-repo',
 *   name: 'My Repo',
 *   repoFullName: 'org/my-repo',
 *   githubUrl: 'https://github.com/org/my-repo',
 *   language: 'TypeScript',
 *   license: 'MIT',
 *   stars: '10k+',
 *   category: 'AI Tools',
 *   summary: 'Description of the repository...',
 *   metaDescription: 'SEO meta description...',
 *   keyTakeaways: ['Point 1', 'Point 2'],
 *   faqs: [{ question: 'Q1?', answer: 'A1.' }]
 * }
 */
export const REPOS_DATA: Record<string, RepoDetails> = {};

/**
 * Returns all repositories as an array
 */
export function getAllRepos(): RepoDetails[] {
  return Object.values(REPOS_DATA);
}

/**
 * Retrieves a single repository by its slug
 */
export function getRepoBySlug(slug: string): RepoDetails | undefined {
  return REPOS_DATA[slug];
}
