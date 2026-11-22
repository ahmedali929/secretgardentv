import { legacyPages } from '../content/pages.mjs';

export function GET({ site }) {
  const entries = Object.values(legacyPages)
    .filter((page) => page.inSitemap)
    .map(({ canonicalPath }) => `  <url><loc>${new URL(canonicalPath, site)}</loc></url>`);

  return new Response([
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
    ...entries,
    '</urlset>',
  ].join('\n'), { headers: { 'Content-Type': 'application/xml; charset=utf-8' } });
}
