# Architecture recommendation

Use **Astro static output with selective React islands**, GitHub as the source of truth, and GitHub Pages at `secretgardentv.com`. Use the existing Netlify project for preview only if reviewer access is verified. Use a managed form endpoint for adult inquiries, MailerLite for newsletter opt-in, and Zeffy for payments.

## Frontend options

| Criterion | Astro with React where needed | React with Vite |
|---|---|---|
| HTML and SEO | Static HTML per route by default. Layouts can emit canonical tags, descriptions and social cards at build time | A typical SPA starts with one HTML shell. Reliable per-route HTML needs an explicit prerender or multi-page build and route metadata implementation |
| Existing URLs | Emit physical files at the current `.html` paths, plus an index and 404. Browser refresh and direct links work on the static host | Same result with a deliberate multi-page or prerender setup. A history-mode SPA alone needs hosting fallbacks and special handling of old paths |
| Interactions | HTML/CSS and native controls for common behavior. Hydrate a small React component when it needs local state or a richer UI | Shared client state and complex app navigation are straightforward. A full client runtime is unnecessary for most current pages |
| Delivery and maintenance | Static build suited to GitHub Pages. Shared layouts and content templates suit editorial pages | Vite can deploy to Pages. Extra build and router work to maintain equivalent crawlability unless adopting a static-capable React framework |
| When to reconsider | If a future logged-in workflow needs shared client state, put it under its own route and evaluate its needs separately | Prefer for a primarily interactive authenticated application where most routes share complex state |

The present site is a public media catalog with editorial pages, outbound video and payment links, and two distinct form workflows. These requirements do not need a database, a persistent server, accounts, or full-page hydration. Astro is open source and adds React only at the boundaries that benefit from it.

## Application design

- **Routes and content.** Keep physical `.html` outputs for the known public routes and preserve `/index.html` alongside the canonical `/`. Define explicit route ownership as legacy pages are migrated so templates and pass-through routes cannot collide. Use validated show, episode and article records keyed by existing slug. Keep article content in versioned Markdown or data files. Preserve the official wording and published links during conversion.
- **Layouts and design.** Share a page layout, head metadata, accessible header and footer, social links, media/card components and a design token stylesheet. Add typography, illustrated garden accents, reusable responsive grids and restrained motion. Favor semantic HTML, CSS transitions and disclosure controls. Use a React island only where state or controls justify it, such as a filterable episode explorer or a player facade. Links and core content should work with JavaScript disabled.
- **SEO and media.** Set the production site URL to the HTTPS apex. Use an explicit canonical map, unique descriptions, social cards, a sitemap made from approved public routes, and a descriptive 404. Test old deep links, case, trailing slash behavior and PDF delivery. Keep only necessary formats and output paths. Generate image widths and optimized encodings, preserve artist-approved originals in source or managed storage, and load video on user intent where practical.
- **Newsletter and analytics.** Use one accessible MailerLite integration, with confirmed provider configuration and a provider-hosted signup fallback if available. Preserve GA measurement after reviewing configuration and consent, exclude staging, and use data-minimized events for approved goals.
- **Adult inquiry.** Add a public form with adult contact name, reply email, topic, and message, subject to owner approval of fields. Use a managed HTTPS endpoint, provider-side validation and spam controls, accessible status/error handling, and a team distribution address. Keep credentials and routing settings outside the public client. Test only against a staging destination before approval. Keep children's details, attachments, and payment data out of this workflow by default.
- **Donations.** Keep Zeffy checkout on Zeffy and provide a direct ordinary link. Preserve amount selection only after testing supported provider parameters. Use privacy-safe click analytics only where approved.

## Hosting, reviews and operating costs

| Service | Role and cost consideration |
|---|---|
| GitHub repository, Actions and Pages | Retain the current public repo and custom domain. Use the static build and parity checks on PRs. Existing public Pages hosting avoids adding a web server. Keep an eye on size, build times and bandwidth |
| Existing Netlify preview or separate restricted staging | Reuse existing investment only when access controls and plan are suitable. For draft review with existing public assets, an Actions artifact is sufficient. A noindex header is an indexing hint, so verify real access restrictions before hosting private previews |
| Formspree or equivalent | Start with a managed service if expected volume, retention and delivery fit. Formspree Free starts at 50 submissions per month and supports up to two linked notification addresses. A team alias can reduce routing complexity. Confirm plan limits and data retention before launch |
| MailerLite, Zeffy, YouTube | Retain configured services and verify existing account limits, deliverability, and approved media usage with their owners |
| Custom domain and Codex Cloud | Keep the existing domain renewal. Codex Cloud is optional development tooling, with use subject to the ChatGPT plan |

Set up a reproducible Node build and lockfile. Require PR review and passing checks before merging to a production branch. Use a separate, explicitly approved Pages deployment of the reviewed artifact. Verify DNS, HTTPS, Pages source, and the rollback commit before changing release configuration. Never give preview jobs production credentials. Keep integration test values separate from production.

Draft PR #8 already demonstrates an Astro compatibility build and parity checks. Use it as a foundation after review. Its raw HTML pass-through is a migration bridge. The authored layouts, URL checks and integration tests remain separate work.

References: [Astro islands](https://docs.astro.build/en/concepts/islands/), [Astro on GitHub Pages](https://docs.astro.build/en/guides/deploy/github/), [Vite static deployment](https://vite.dev/guide/static-deploy), [GitHub Pages limits](https://docs.github.com/en/pages/getting-started-with-github-pages/github-pages-limits), [Formspree account limits](https://help.formspree.io/articles/account-management/account-limits/).
