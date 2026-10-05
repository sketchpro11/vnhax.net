import fs from 'fs';
import path from 'path';

function walk(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach(file => {
    file = path.join(dir, file);
    const stat = fs.statSync(file);
    if (stat && stat.isDirectory()) {
      if (!file.includes('node_modules') && !file.includes('.next')) {
        results = results.concat(walk(file));
      }
    } else if (file.endsWith('.tsx') || file.endsWith('.ts')) {
      results.push(file);
    }
  });
  return results;
}

const files = walk('./app').concat(walk('./components')).concat(walk('./lib'));
const validRepos = ['ponytail', 'impeccable', 'ecc', 'effect', 'caveman', 'agent-reach'];

console.log('--- SCANNING FOR ALL INVALID REPO REFERENCES ---');
files.forEach(f => {
  const content = fs.readFileSync(f, 'utf8');
  const matches = [...content.matchAll(/(?:href[:=]\s*["'])(\/repos\/[^"'\s]+)["']/g)];
  matches.forEach(m => {
    const slug = m[1].replace('/repos/', '');
    if (slug !== '' && !validRepos.includes(slug)) {
      console.log(`${f} -> ${m[1]}`);
    }
  });
});
