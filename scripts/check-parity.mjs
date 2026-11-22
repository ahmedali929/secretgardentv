import assert from 'node:assert/strict';
import { readdir, readFile, stat } from 'node:fs/promises';
import { join } from 'node:path';

const pages = (await readdir('.')).filter((name) => name.endsWith('.html'));
for (const path of pages) {
  const original = await readFile(path, 'utf8');
  const built = await readFile(join('dist', path), 'utf8');
  assert.equal(built.trim(), original.trim(), path);
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
