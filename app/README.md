# Secret Garden TV — landing page

A slick, highly animated landing page for the Secret Garden TV kids' studio.
Built with Vite + React + TypeScript, GSAP (+ScrollTrigger) and Lenis for motion.
Design direction: a sunlit storybook garden (Bluey-bright), botanical greens with a
honey accent, the Ali / Baba / Tata family and Babagha the parrot as the cast.

## Develop

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # type-check + production build to dist/
npm run preview  # serve the built dist/
```

## Structure

- `src/styles/tokens.css` — OKLCH design tokens (the "garden" palette, type scale, motion easings).
- `src/styles/global.css` — reset, button system, reveal infrastructure, reduced-motion rules.
- `src/lib/motion.ts` — `useSmoothScroll` (Lenis↔GSAP), `useReveal` (IntersectionObserver), reduced-motion guard.
- `src/sections/*` — Hero, Mission, Shows, Family, Parents, Newsletter (one component + CSS module each).
- `src/components/*` — Nav, Footer.
- `src/data/shows.ts`, `src/data/links.ts` — content + real social/YouTube links.

## Assets

- Character art (`public/characters/*`) is sourced from the project's Google Drive
  ("Ali and Baba" and "Babagha" folders) and resized for web.
- Show title cards (`public/shows/*`) are reused from the legacy site's `assets/images/shows`
  and recompressed to web-friendly JPEGs.

## Wiring the newsletter

The form in `src/sections/Newsletter.tsx` currently shows a client-side success state.
The legacy site uses MailerLite (account `1739117`). To go live, post the email to your
ESP inside `onSubmit` (MailerLite embedded form / API or a serverless endpoint).

## Motion & accessibility

- All motion is gated behind `prefers-reduced-motion`; reveals fall back to fully-visible content.
- Reveal states only hide content when `html.has-motion` is set (motion allowed), so the page
  never ships blank in headless/reduced-motion contexts.
- Smooth scroll, hero parallax, and the parrot flight all no-op under reduced motion.

## Deploy

`npm run build` emits a static `dist/`. `base` is relative (`./`) so it can be hosted at the
domain root (the repo's GitHub Pages `CNAME`) or in a subfolder. Publish the contents of `dist/`.
