import fs from 'node:fs';
import path from 'node:path';

const dist = 'D:/Project/bebrand-spb/dist';
const forbidden = [
  'ТРЕБУЕТ ПОДТВЕРЖДЕНИЯ',
  '[DOMAIN]',
  'Lorem',
  'TODO',
  '94 400',
  '188 800',
  'до 5 млн',
  '№1 в Роспатенте',
];

const htmlFiles = [];
function walk(dir) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(p);
    else if (entry.name.endsWith('.html')) htmlFiles.push(p);
  }
}
walk(dist);

let issues = 0;
for (const file of htmlFiles) {
  const content = fs.readFileSync(file, 'utf8');
  const h1Count = (content.match(/<h1[\s>]/g) || []).length;
  if (h1Count !== 1) {
    console.error('H1 count != 1:', file, h1Count);
    issues++;
  }
  for (const term of forbidden) {
    if (content.includes(term)) {
      console.error('Forbidden term:', term, 'in', file);
      issues++;
    }
  }
  if (file.includes('privacy') && !content.includes('noindex, follow')) {
    console.error('Privacy missing noindex, follow');
    issues++;
  }
}

console.log('HTML pages checked:', htmlFiles.length);
console.log('robots.txt exists:', fs.existsSync(path.join(dist, 'robots.txt')));
console.log('sitemap.xml exists:', fs.existsSync(path.join(dist, 'sitemap.xml')));
console.log('Issues found:', issues);
if (issues > 0) process.exit(1);
