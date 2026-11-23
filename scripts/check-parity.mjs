import assert from 'node:assert/strict';
import { readdir, readFile, stat } from 'node:fs/promises';
import { join } from 'node:path';
import homepageContent from '../src/content/homepage.json' with { type: 'json' };
import secondaryContent from '../src/content/secondary-pages.json' with { type: 'json' };
import { youtubeEmbedUrl } from '../src/content/youtube.mjs';
import { legacyPages } from '../src/content/pages.mjs';

const pages = (await readdir('.')).filter((name) => name.endsWith('.html'));
assert.deepEqual(
  pages.sort(),
  Object.keys(legacyPages).map((slug) => `${slug}.html`).sort(),
  'Legacy HTML and route registry must agree',
);
const domain = 'https://secretgardentv.com';
const redirects = { 'landingpage.html': '/', 'blog-test.html': '/blog.html' };
for (const path of pages) {
  const built = await readFile(join('dist', path), 'utf8');
  const { canonicalPath } = legacyPages[path.slice(0, -5)];
  const redirect = redirects[path];
  assert.ok(built.includes(`<link rel="canonical" href="${domain}${redirect ?? canonicalPath}">`), path);
  if (redirect) {
    assert.ok(built.includes(`content="0;url=${redirect}"`), path);
  } else {
    assert.equal((built.match(/<h1[ >]/g) ?? []).length, 1, path);
    assert.equal((built.match(/<meta name="description"/g) ?? []).length, 1, path);
    assert.ok(built.includes('class="garden-header"'), path);
    assert.ok(built.includes('class="garden-footer"'), path);
  }

  for (const [, attribute] of built.matchAll(/(?:href|src|poster)="(\/(?!\/)[^"?#]+)"/g)) {
    const asset = decodeURIComponent(attribute);
    assert.ok((await stat(join('dist', asset))).isFile(), `${path} links to missing ${asset}`);
  }
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
console.log(`Verified ${pages.length} public route files, canonical URLs, local links and static assets.`);

const catalog = await readFile('dist/program.html', 'utf8');
for (const program of secondaryContent.programs) {
  assert.ok(catalog.includes(`href="${program.href}"`), program.title);
  const output = await readFile(join('dist', program.href), 'utf8');
  assert.ok(output.includes('id="episodes"'), program.title);
  assert.doesNotMatch(output, /<iframe[\s>]/, program.title);
  for (const { href, title } of secondaryContent.shows[program.href.slice(1, -5)].episodes) {
    const encoded = href.replaceAll('&', '&amp;');
    assert.ok(output.includes(`href="${encoded}"`), title);
    const embed = youtubeEmbedUrl(href);
    if (embed) assert.ok(output.includes(`data-episode-embed="${embed}"`), title);
  }
}
assert.equal(youtubeEmbedUrl('https://www.youtube.com/watch?v=av6NzM18r-s&t=19s'),
  'https://www.youtube-nocookie.com/embed/av6NzM18r-s?start=19');
assert.equal(youtubeEmbedUrl('https://youtu.be/bixsoWn1M4s?si=example'),
  'https://www.youtube-nocookie.com/embed/bixsoWn1M4s');
assert.equal(youtubeEmbedUrl('https://www.youtube.com/@SecretGardenTVforKids'), undefined);

const sitemap = await readFile('dist/sitemap.xml', 'utf8');
assert.deepEqual(
  [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map(([, loc]) => loc),
  Object.values(legacyPages).filter((page) => page.inSitemap)
    .map(({ canonicalPath }) => domain + canonicalPath),
);
const notFound = await readFile('dist/404.html', 'utf8');
assert.match(notFound, /<meta name="robots" content="noindex(?:, follow)?">/);
assert.ok(notFound.includes('href="/"'));

const contact = await readFile('dist/contact.html', 'utf8');
assert.ok(contact.includes('<link rel="canonical" href="https://secretgardentv.com/contact.html">'));
assert.ok(contact.includes('For parents, guardians, and other adults'));
assert.ok(homepage.includes('href="/contact.html"'));
if (contact.includes('data-provider="mock"')) {
  assert.ok(contact.includes('no email is sent'));
  assert.doesNotMatch(contact, /action="https:\/\/formspree\.io/);
}
