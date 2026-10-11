/**
 * Fetches real star/fork counts, license and primary language for every
 * reviewed repository from the GitHub API and writes lib/repo-stats.json.
 *
 * Runs automatically before `next build` (see package.json "prebuild").
 * If the API is unreachable or rate-limited, the existing JSON is kept so
 * the build never fails and never shows invented numbers.
 */
import fs from 'fs';
import path from 'path';

const ROOT = process.cwd();
const DATA_FILE = path.join(ROOT, 'lib', 'repos-data.ts');
const OUT_FILE = path.join(ROOT, 'lib', 'repo-stats.json');

const source = fs.readFileSync(DATA_FILE, 'utf8');
const repos = [...source.matchAll(/slug:\s*'([^']+)',\s*\n\s*name:[^\n]*\n\s*repoFullName:\s*'([^']+)'/g)].map(
  ([, slug, fullName]) => ({ slug, fullName })
);

let existing = {};
try {
  existing = JSON.parse(fs.readFileSync(OUT_FILE, 'utf8'));
} catch {
  // first run
}

const headers = { Accept: 'application/vnd.github+json', 'User-Agent': 'vnhax-build' };
if (process.env.GITHUB_TOKEN) headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`;

const result = { ...existing };
let updated = 0;

for (const { slug, fullName } of repos) {
  try {
    const res = await fetch(`https://api.github.com/repos/${fullName}`, { headers });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const json = await res.json();
    result[slug] = {
      stars: json.stargazers_count,
      forks: json.forks_count,
      license: json.license?.spdx_id && json.license.spdx_id !== 'NOASSERTION' ? json.license.spdx_id : null,
      language: json.language,
      pushedAt: json.pushed_at,
      fetchedAt: new Date().toISOString(),
    };
    updated++;
  } catch (err) {
    console.warn(`[sync-repo-stats] ${fullName}: ${err.message} (keeping previous value)`);
  }
}

fs.writeFileSync(OUT_FILE, JSON.stringify(result, null, 2) + '\n');
console.log(`[sync-repo-stats] updated ${updated}/${repos.length} repositories`);
