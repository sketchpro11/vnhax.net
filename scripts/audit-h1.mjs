import fs from 'fs';
import path from 'path';

function findHtmlFiles(dir) {
  let files = [];
  for (const f of fs.readdirSync(dir)) {
    const full = path.join(dir, f);
    if (fs.statSync(full).isDirectory()) {
      files = files.concat(findHtmlFiles(full));
    } else if (f.endsWith('.html')) {
      files.push(full);
    }
  }
  return files;
}

if (fs.existsSync('.next/server/app')) {
  const htmlFiles = findHtmlFiles('.next/server/app');
  const multipleH1 = [];
  const zeroH1 = [];

  for (const file of htmlFiles) {
    const content = fs.readFileSync(file, 'utf8');
    const matches = content.match(/<h1[\s>]/gi) || [];
    const rel = path.relative('.next/server/app', file);
    if (matches.length > 1) {
      multipleH1.push({ path: rel, count: matches.length });
    } else if (matches.length === 0) {
      zeroH1.push(rel);
    }
  }

  console.log(`Audited ${htmlFiles.length} HTML files.`);
  console.log(`Pages with > 1 <h1>: ${multipleH1.length}`);
  for (const m of multipleH1) {
    console.log(`[${m.count} <h1> tags] ${m.path}`);
  }

  console.log(`\nPages with 0 <h1>: ${zeroH1.length}`);
  for (const z of zeroH1) {
    console.log(`[0 <h1>] ${z}`);
  }
}
