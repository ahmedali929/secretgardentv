# Secret Garden TV design system

Open `/design-system.html` with `npm run dev`, or build with `npm run build:staging` and open it with `npm run preview`. The demo has a noindex directive and sits outside the public sitemap. It uses the existing Secret Garden TV logo, illustrations, and editorial copy.

## Visual foundations

| Token | Value and use |
| --- | --- |
| Forest | `#19392d` for primary text, buttons, and high-contrast accents |
| Foliage and moss | `#315746` for emphasis and `#455e4d` for supporting text |
| Gold | `#80602c` for labels and focus rings. `#d9ba78` for decorative borders |
| Paper, linen, cream | `#fbf8ef`, `#f4efe2`, and `#fffdf7` for page, feature bands, and cards |
| Type | Playfair Display for editorial headings and Inter for UI and body copy. Georgia and system sans are available as fallbacks |
| Spacing | Fluid gutters from 20 to 72 pixels, section spacing from 56 to 112 pixels, and a 1200-pixel content maximum |
| Depth | Thin warm borders, restrained shadows, and an arched treatment for feature artwork |

The hero pairs an oversized editorial headline with existing illustration. The program section uses a media grid, and the mission section uses a quieter split layout. Cards switch from three to two to one column as space narrows. Navigation becomes a native disclosure on narrow screens.

## Components

| Component | Usage |
| --- | --- |
| `Container` | Shared page width and gutters. Accepts an additional layout class |
| `Button` | Navigational CTA with primary and outline variants. Use a native button for in-page actions |
| `SectionHeading` | Reusable section heading with an optional eyebrow and heading ID |
| `GardenNav` | Existing logo, named navigation landmark, and keyboard-operable mobile menu |
| `ProgramCard` | Entire card links to the current program page. Artwork is decorative where the adjacent title already names it |
| `SiteLayout` | Astro document shell and Tailwind utility entry |

Import `src/styles/garden.css` and wrap design-system screens in `.garden-preview` to apply the scoped tokens and components. Use Tailwind utilities for simple alignment and spacing. Keep existing media references in the asset tree when adopting these components.

## Motion and accessibility

Hover lift and image scaling are short and optional. Visible focus, keyboard navigation, large touch targets, a skip link, and native mobile disclosure work independently of animation. Reveals play once as content enters view and start from visible content, so the page remains usable without JavaScript. Reduced-motion mode removes transitions and reveals.

The demo was checked in Chromium at 320, 375, 768, and 1440 CSS pixels for horizontal overflow, hero asset loading, and navigation layout. Keyboard menu opening, Escape focus restoration, and reduced-motion behavior also passed. Viewport checks used fallback fonts to avoid relying on an external font request.

## Homepage adoption

The homepage now applies the system at `/` and `/index.html`. The five Garden themes appear as a cinematic opening and four illustrated chapters. Editorial copy lives in `src/content/homepage.json`, sourced from the active legacy homepage. The original HTML remains as a migration reference.

For local preview, run `npm ci`, `npm run build:staging` and `npm run preview`, then open the URL printed by Astro at `/`. The PR workflow also provides a `sgtv-staging-preview` archive. Extract it, serve the directory containing `index.html` with `python3 -m http.server 8000`, and open `http://localhost:8000/`. Review at 375px for the mobile menu and at 1440px for the full-width hero. The other legacy routes remain available in the archive.

Astro builds responsive WebP variants from existing illustrations. The hero loads eagerly and later artwork is lazy-loaded. The original Tree Blooming video uses an optimized poster and loads only on request. Chapters use standard anchor links, the FAQ uses native details controls, and reveals honor reduced motion.

Browser checks covered 320, 375, 768, and 1440px, keyboard navigation, FAQ toggles, about and program media loading, the index alias, and the MailerLite callback using a stub. Live newsletter signup was not submitted. The staging build strips the production GA tag.

### Shared interaction motion

The shared layout uses one IntersectionObserver for one-time reveals. Content stays visible before JavaScript runs. Heading and lead transitions use 6px of travel and opacity, while menu, FAQ, and dialog entrances are shorter. Native links, details, and dialogs retain their keyboard and touch behavior. Hover movement is reserved for fine pointers. Smooth anchors and the optional 16px hero parallax run only when reduced motion is off. The hero effect also requires a wide screen and CSS scroll-timeline support.

Donation controls show focus, selection, validation, and checkout feedback. Video previews reserve the player space and expose a loading status. Reduced-motion users receive the same feedback without motion.
