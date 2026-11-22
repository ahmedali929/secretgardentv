# Redesign progress

## Completed

- Audited the live site and repository, inventoried the legacy routes, and documented the Astro recommendation and migration roadmap.
- The current `main` baseline (`36770a1`) contains the Astro compatibility build and PR preview workflow. Draft PR #8 previously passed its build and route parity checks. The latest observed Pages deployment still points to the earlier audited commit (`fb7146d`).
- Created `redesign/staging` from `main` at `36770a1`, added persistent Codex instructions, and documented the development and release process.

- Added automatic staging and staging-PR checks, a downloadable preview artifact, and a Cloudflare Pages build that sets noindex and removes production GA and CNAME from preview output.

- Added the explicit legacy route registry, reusable SEO and Astro layouts, sitemap, Tailwind-based 404, ESLint and staging lint checks. The compatibility layout preserves legacy markup and integrations.

- Implemented an isolated design-system demo with reusable components, existing artwork, and responsive/motion checks. See [DESIGN-SYSTEM.md](DESIGN-SYSTEM.md).

- Rebuilt the homepage in Astro with the approved design system and retained active editorial sections, program links, the newsletter, and existing visual assets. Lint, staging build, parity, and Chromium viewport and interaction checks passed.

## Remaining

- Hosted staging is blocked until the Cloudflare account owner connects GitHub. Follow the phone setup in [DEVELOPMENT.md](DEVELOPMENT.md), then record the verified HTTPS URL.
- Verify the exact GitHub Pages source mode and folder, configure the production branch review rules, and confirm whether Netlify reviewer access is restricted.
- Approve the homepage design and prototype URL dispositions. Verify legacy route parity as pages move into shared layouts.
- Validate MailerLite signup, Zeffy handoff, and analytics on staging. Confirm adult inquiry fields, provider and team routing.
- Verify mobile and tablet behavior, keyboard accessibility, reduced motion and performance on representative devices.
- Prepare, rehearse and obtain explicit approval for the production release and rollback plan.

## Page migration checklist

| Route | Completion |
|---|---|
| `/` and `/index.html` | Complete. Shared header and footer, illustrated Garden chapters, signup and FAQs |
| `/about.html` | Complete. Mission, philosophy, values, approach, existing video and characters |
| `/program.html` | Complete. Five published programs and existing testimonials |
| `/allah-secret-signs.html` | Complete. Show information and existing episode links |
| `/toy-box-stories.html` | Complete. Show information and existing episode links |
| `/nurheart-fables.html` | Complete. Show information and existing episode links |
| `/babagha-sadiqi.html` | Complete. Show information and bilingual episode copy |
| `/quran-safari.html` | Complete. Show information and existing episode links |
| `/blog.html` | Complete. Both published article cards |
| `/blog-teaching-adab-everyday-moments.html` | Complete. Article copy, date and illustrations |
| `/blog-raising-purposeful-children.html` | Complete. Article copy, date, illustrations and video link |
| `/blog-detail.html` | Complete. Retains the older article as a noindex page. Removed dummy author, self-links and inactive template forms |
| `/blog-test.html` | Complete. Static redirect with fallback link to the published blog |
| `/landingpage.html` | Complete. Static redirect with fallback link to the homepage |
| `/faq.html` | Complete. All 11 questions. Artwork inquiries point to the existing site email |
| `/donate.html` | Complete. Published funding and tax copy, presets, custom amount, and existing Zeffy checkout |
| `/404.html` | Complete. Shared layout and return link |
| `/design-system.html` | Retained as the noindex design reference |
| `/sitemap.xml` and `/sgtv_coloring_book.pdf` | Retained and checked in the build |

The two prototype redirects use an HTML refresh and a normal link, so they work on static hosting. The donation handoff sends only the amount and leaves personal information to Zeffy. Provider acceptance of the amount and live payment completion remain unverified. Footer links preserve the site's existing social accounts and send newsletter visitors to the existing homepage signup flow.

## Programs and episode previews

- The catalog and five show pages now use responsive WebP artwork, reuse the existing program and episode records, and link to one another. The homepage keeps its existing show links.
- Individual episodes open an on-demand YouTube privacy-enhanced player. Closing the dialog removes the player and returns focus. Native watch links remain available without JavaScript and when a player fails. Channel links remain channel links.
- Before a public launch, confirm Secret Garden TV’s child-directed site designation with YouTube. YouTube requires the designation even for privacy-enhanced embeds. See [YouTube’s embedding guidance](https://support.google.com/youtube/answer/171780?hl=en).
