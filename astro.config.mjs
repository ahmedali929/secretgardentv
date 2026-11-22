import { cp } from 'node:fs/promises';
import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://secretgardentv.com',
  build: { format: 'file' },
  integrations: [{
    name: 'legacy-assets',
    hooks: {
      'astro:build:done': async ({ dir }) => {
        for (const path of ['assets', 'sgtv_coloring_book.pdf', 'CNAME']) {
          await cp(new URL(path, import.meta.url), new URL(path, dir), {
            recursive: true,
            filter: (source) => !source.endsWith('/.DS_Store'),
          });
        }
      },
    },
  }],
});
