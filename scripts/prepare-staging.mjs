import assert from 'node:assert/strict';
import { readdir, readFile, rm, stat, writeFile } from 'node:fs/promises';
import { join } from 'node:path';

const previewHeaders = '/*\n  X-Robots-Tag: noindex, nofollow\n';
const maxAssetSize = 25 * 1024 * 1024;

async function prepareDirectory(directory) {
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    const path = join(directory, entry.name);
    if (entry.isDirectory()) {
      await prepareDirectory(path);
      continue;
    }

    assert.ok((await stat(path)).size <= maxAssetSize, `Cloudflare Pages file exceeds 25 MiB: ${path}`);
    if (!path.endsWith('.html')) continue;

    const html = await readFile(path, 'utf8');
    const preview = html
      .replace(/<script\b[^>]*\bsrc=["']https:\/\/www\.googletagmanager\.com\/gtag\/js[^"']*["'][^>]*>\s*<\/script>/gi, '')
      .replace(/<script\b[^>]*>(?:(?!<\/script>)[\s\S])*?\bgtag\(\s*['"]config['"](?:(?!<\/script>)[\s\S])*?<\/script>/gi, '');
    assert.doesNotMatch(preview, /googletagmanager\.com|\bgtag\(\s*['"]config['"]/i, path);
    if (preview !== html) await writeFile(path, preview);
  }
}

await prepareDirectory('dist');
await rm('dist/CNAME', { force: true });
// Let crawlers fetch the response and see noindex.
await writeFile('dist/robots.txt', 'User-agent: *\nDisallow:\n');
await writeFile('dist/_headers', previewHeaders);
console.log('Prepared staging output with noindex, no production domain file, and no GA tag.');
