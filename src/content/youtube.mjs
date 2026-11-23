export function youtubeEmbedUrl(href) {
  const url = new URL(href);
  if (url.protocol !== 'https:') return undefined;

  let id;
  if (url.hostname === 'youtu.be') id = url.pathname.slice(1);
  if (url.hostname === 'www.youtube.com' && url.pathname === '/watch') {
    id = url.searchParams.get('v');
  }
  if (!id || !/^[A-Za-z0-9_-]{11}$/.test(id)) return undefined;

  const embed = new URL(`https://www.youtube-nocookie.com/embed/${id}`);
  const start = url.searchParams.get('start') ?? url.searchParams.get('t');
  if (start && /^\d+s?$/.test(start)) embed.searchParams.set('start', start.replace(/s$/, ''));
  return embed.href;
}
