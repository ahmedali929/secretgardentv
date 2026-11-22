import assert from 'node:assert/strict';
import { readdir, readFile, stat } from 'node:fs/promises';
import { join } from 'node:path';
import { legacyPages } from '../src/content/pages.mjs';

const pages = (await readdir('.')).filter((name) => name.endsWith('.html'));
assert.deepEqual(
  pages.sort(),
  Object.keys(legacyPages).map((slug) => `${slug}.html`).sort(),
  'Legacy HTML and route registry must agree',
);
const domain = 'https://secretgardentv.com';
for (const path of pages) {
  const original = await readFile(path, 'utf8');
  const built = await readFile(join('dist', path), 'utf8');
  const metadata = /<!-- page-seo:start -->[\s\S]*?<!-- page-seo:end -->/g;
  assert.equal([...built.matchAll(metadata)].length, 1, path);
  assert.equal(built.replace(metadata, '').trim(), original.trim(), path);
  assert.equal((built.match(/<meta name="description"/g) ?? []).length, 1, path);

  const { canonicalPath } = legacyPages[path.slice(0, -5)];
  assert.ok(built.includes(`<link rel="canonical" href="${domain}${canonicalPath}">`), path);
}

async function checkAssets(directory) {
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    if (entry.name === '.DS_Store') continue;
    const path = join(directory, entry.name);
    if (entry.isDirectory()) {
      await checkAssets(path);
    } else {
      assert.equal((await stat(join('dist', path))).size, (await stat(path)).size, path);
    }
  }
}

await checkAssets('assets');
for (const path of ['CNAME', 'sgtv_coloring_book.pdf']) {
  assert.deepEqual(await readFile(join('dist', path)), await readFile(path), path);
}
console.log(`Verified ${pages.length} legacy routes and their static assets.`);

const sitemap = await readFile('dist/sitemap.xml', 'utf8');
assert.deepEqual(
  [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map(([, loc]) => loc),
  Object.values(legacyPages).filter((page) => page.inSitemap)
    .map(({ canonicalPath }) => domain + canonicalPath),
);
const notFound = await readFile('dist/404.html', 'utf8');
assert.ok(notFound.includes('content="noindex"'));
assert.ok(notFound.includes('href="/"'));
