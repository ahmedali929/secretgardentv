import { readFileSync } from 'node:fs';
import { legacyPages } from './pages.mjs';

export function readLegacyPage(slug) {
  const page = legacyPages[slug];
  const html = readFileSync(`${slug}.html`, 'utf8');
  const headEnd = html.indexOf('</head>');
  const title = html.match(/<title>([^<]+)<\/title>/i)?.[1].trim();
  if (headEnd === -1 || !title) throw new Error(`Missing head or title for ${slug}`);

  return {
    page: { ...page, title },
    head: html.slice(0, headEnd),
    body: html.slice(headEnd),
    hasDescription: /<meta\s+name=["']description["']/i.test(html.slice(0, headEnd)),
  };
}
