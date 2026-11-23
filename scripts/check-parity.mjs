import assert from 'node:assert/strict';
import { readdir, readFile, stat } from 'node:fs/promises';
import { join } from 'node:path';
import homepageContent from '../src/content/homepage.json' with { type: 'json' };
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
  if (path === 'index.html') continue;
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
const homepage = await readFile('dist/index.html', 'utf8');
assert.ok(homepage.includes(`<link rel="canonical" href="${domain}/">`));
assert.equal((homepage.match(/<h1[ >]/g) ?? []).length, 1);
for (const item of [...homepageContent.hero, ...homepageContent.philosophy, ...homepageContent.shows]) {
  // The hero title is split for styling. All substantive copy remains in the rendered HTML.
  assert.ok(homepage.includes(item.description), item.title);
}
for (const { quote } of homepageContent.quotes) assert.ok(homepage.includes(quote), quote);
for (const { question, answer } of homepageContent.faq) {
  assert.ok(homepage.includes(question), question);
  assert.ok(homepage.includes(answer), question);
}
for (const paragraph of homepageContent.about) assert.ok(homepage.includes(paragraph));
for (const { href } of homepageContent.shows) assert.ok(homepage.includes(`href="${href}"`), href);
assert.ok(homepage.includes('assets.mailerlite.com/js/universal.js'));
assert.ok(homepage.includes('googletagmanager.com/gtag/js'));
assert.match(homepage, /<video[^>]*preload="none"/);
assert.ok(homepage.includes('/assets/images/resource/Tree_Blooming.mp4'));
for (const [asset] of homepage.matchAll(/\/_astro\/[\w.-]+\.webp/g)) {
  assert.ok((await stat(join('dist', asset))).size > 0, asset);
}
console.log(`Verified ${pages.length - 1} legacy routes, the redesigned homepage, and static assets.`);

const sitemap = await readFile('dist/sitemap.xml', 'utf8');
assert.deepEqual(
  [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map(([, loc]) => loc),
  Object.values(legacyPages).filter((page) => page.inSitemap)
    .map(({ canonicalPath }) => domain + canonicalPath),
);
const notFound = await readFile('dist/404.html', 'utf8');
assert.ok(notFound.includes('content="noindex"'));
assert.ok(notFound.includes('href="/"'));
