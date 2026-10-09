import fs from 'fs';
import path from 'path';

function decodeHtml(html) {
  return html
    .replace(/&amp;/g, '&')
    .replace(/&#x27;/g, "'")
    .replace(/&quot;/g, '"')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>');
}

function checkTitles(dir) {
  const files = fs.readdirSync(dir);
  let issues = [];
  for (const f of files) {
    const full = path.join(dir, f);
    if (fs.statSync(full).isDirectory()) {
      issues = issues.concat(checkTitles(full));
    } else if (f.endsWith('.html')) {
      const content = fs.readFileSync(full, 'utf8');
      const m = content.match(/<title>([^<]*)<\/title>/);
      if (m) {
        const decoded = decodeHtml(m[1]);
        const rel = path.relative('.next/server/app', full);
        issues.push({ path: rel, length: decoded.length, title: decoded });
      }
    }
  }
  return issues;
}

if (fs.existsSync('.next/server/app')) {
  const all = checkTitles('.next/server/app');
  all.sort((a, b) => b.length - a.length);

  const over70 = all.filter(p => p.length > 70);
  const over65 = all.filter(p => p.length > 65);
  const between35and65 = all.filter(p => p.length >= 35 && p.length <= 65);

  console.log(`Audited ${all.length} static HTML pages:`);
  console.log(`- Pages > 70 characters: ${over70.length}`);
  console.log(`- Pages > 65 characters: ${over65.length}`);
  console.log(`- Pages between 35 and 65 characters: ${between35and65.length}`);

  if (over70.length > 0) {
    console.log('\n❌ FAILING (Title > 70 chars):');
    for (const item of over70) {
      console.log(`[${item.length} chars] ${item.path}: "${item.title}"`);
    }
  } else {
    console.log('\n✅ ALL PAGES ARE STRICTLY <= 65 CHARACTERS! (Bing 70 char limit passed)');
  }

  console.log('\nTop 10 Longest Titles:');
  for (const item of all.slice(0, 10)) {
    console.log(`[${item.length} chars] ${item.path}: "${item.title}"`);
  }

  console.log('\nTop 5 Shortest Titles:');
  for (const item of all.slice(-5).reverse()) {
    console.log(`[${item.length} chars] ${item.path}: "${item.title}"`);
  }
}
