# Secret Garden TV technical and content audit

**Baseline:** 2026-11-22, production repository `main` at `fb7146d3fbe55a68876278c2e92f16c7498adc25`, and [secretgardentv.com](https://secretgardentv.com/). The Astro foundation in draft PR #8 is a separate work in progress.

I inventoried tracked files, parsed each root HTML page, inspected local references and CSS URLs, traced the shared and page-specific JavaScript, and compared deployed HTML with the checkout. I also inspected the live desktop homepage accessibility tree and tried the newsletter trigger without submitting data. Source findings about responsive behavior need device confirmation. Local Chromium could not start in the execution sandbox, so I have no mobile runtime measurements or Lighthouse scores. Provider dashboards and authenticated settings were outside the available evidence.

## Routes and content

Every root HTML file below returned HTTP 200 and matched `main` byte for byte. The apex homepage matched `index.html` as well. Paths in the table use the HTTPS apex domain.

| URL | Content and existing behavior | Migration decision |
|---|---|---|
| `/`, `/index.html` | Five Garden themes in a hero carousel, blooming-tree video, mission and values, show carousel, signup, testimonials, FAQ preview | Keep both paths. Use `/` as canonical and preserve the content |
| `/about.html` | Mission, educational philosophy, organization and team, linked YouTube video | Preserve copy, images, and video handoff |
| `/program.html` | Five show cards, descriptions and links to detail pages | Keep as the crawlable program index |
| `/allah-secret-signs.html` | Science series overview and linked episodes | Preserve episode titles, artwork, and YouTube URLs |
| `/toy-box-stories.html` | Sunnah-themed series overview and episode content | Preserve content and replace dormant newsletter markup with shared entry point |
| `/nurheart-fables.html` | Story series overview and episodes | Remove obsolete donation demo handler after verifying the form is commented out |
| `/babagha-sadiqi.html` | Arabic-learning series overview and episodes, animated artwork | Preserve editorial content and offer a still for reduced motion |
| `/quran-safari.html` | Qur’anic prayers series overview and linked content | Keep transliteration, imagery, and playable links |
| `/blog.html` | Blog index, article cards, and newsletter CTA | Keep article discovery and reuse the signup component |
| `/blog-teaching-adab-everyday-moments.html` | Teaching Adab article | Preserve article, imagery, related links, and URL |
| `/blog-raising-purposeful-children.html` | Raising Purposeful Children article | Preserve article, imagery, related links, and URL |
| `/faq.html` | Expandable answers and common links | Keep answers in HTML and make each disclosure keyboard accessible |
| `/donate.html` | Donation explanation, amount selection, optional message, and Zeffy handoff | Preserve giving flow and provide direct checkout link |
| `/blog-detail.html` | Generic article template with form remnants | Confirm traffic and backlinks before deciding its fate |
| `/blog-test.html` | Coming-soon prototype with simulated signup and stale links | Confirm traffic, then exclude from sitemap and retire or map explicitly |
| `/landingpage.html` | Alternate home prototype with missing collection assets/routes and placeholder YouTube IDs | Keep out of redesign navigation. Confirm retirement or replacement with owner |
| `/assets/fonts/flaticon_kidscamp-icons.html` | Vendor glyph specimen, HTTP 200 and byte-identical | Verify consumers before removing from public output |
| `/sgtv_coloring_book.pdf` | Public coloring book, HTTP 200 and byte-identical, 16,019,737 bytes | Keep URL and compare the file checksum at cutover |

The live stylesheet, shared theme script and newsletter script also returned byte-identical bodies.

HTTP apex, HTTPS www, and the GitHub Pages project URL all resolved to the HTTPS apex in the live probes. `/robots.txt` and `/sitemap.xml` returned 404. The source also references missing `contact.html`, `donate-handler.php`, `/sgtv/blog.html`, five `collection-*.html` targets, five collection images and `assets/videos/hero1.mp4` on prototype or form paths. Check Search Console and available traffic before approving redirects or removal. Keep legitimate article, show, resource, and anchor paths.

## Reusable components and interactions

| Area | Current implementation | Reusable boundary |
|---|---|---|
| Header and footer | Repeated logo, top email/social strip, primary nav, newsletter buttons, copyright, footer links, template search overlay. Shared JS clones navigation for mobile and toggles sticky/mobile states | Site layout, header, mobile disclosure, footer, social links, newsletter CTA |
| Home | Five hero panels with Swiper arrows and autoplay, values and program carousels, testimonials, in-page calls to action, looping video | Hero, media facade, program and value cards, testimonial list, FAQ preview |
| Program and episode pages | Repeated banner, shared show-card and episode-card structures, localized artwork, outbound video links | Program index, ShowLayout, EpisodeCard, content collections |
| Blog | Index cards, article shell, breadcrumbs and signup. Older templates contain contact/comment controls without a working endpoint | ArticleLayout, BlogCard, related articles, intentionally supported forms |
| FAQ and Donate | jQuery accordion. Donation amounts/custom amount and JavaScript checkout handoff | Native disclosure, DonationCTA, accessible adult inquiry form |
| Theme behavior | `assets/js/script.js` initializes carousels, accordions, sidebar/search, tabs, popup media, pointer effects, smooth scrolling, scroll reveals and title animation when markup is present | Keep verified behaviors. Replace template-only handlers after checking selectors and cross-page use |

The code includes WOW, GSAP/SplitText/ScrollTrigger/ScrollSmoother/ScrollTo, Swiper, Owl, jQuery, Bootstrap/Popper, parallax/tilt, Magnific Popup, nav/back-to-top, counters, countdowns, validation, MixItUp and other theme utilities. File presence alone does not establish active use. `style.css` imports 12 additional stylesheets, alongside direct Bootstrap, responsive, and menu styles. The responsive stylesheet has rules from 1300px down through 479px. Many pages reference roughly two dozen external script files even where features are absent. Audit vendor versions, licensing and runtime coverage before carrying dependencies into the new templates.

## SEO, analytics, and integrations

- **SEO.** Titles exist, but only the blog-test prototype has a description among the 16 root HTML files. I found no canonical or social metadata in those files. The alternate landing page duplicates the home title. Only home, landing page and blog-test use an H1 in source. Live Swiper clones raised the homepage count from five to seven in the observed DOM. Use meaningful primary headings, intentional canonical tags and descriptions, social cards, and a sitemap of approved indexable routes. Add structured data only where the facts and page content support it.
- **Analytics.** Fourteen root pages contain the same GA4 tag configuration, with Google signals and ad personalization signals disabled as configured. The generic blog detail and blog-test omit it. Preserve the existing measurement property after reviewing consent and data collection for a child-oriented site. Separate staging traffic and keep form contents, emails and names out of tracking. Runtime event delivery and reporting were not verified.
- **MailerLite.** Twelve root pages include the Universal loader and triggers for popup `Pcso7D`. The two published article pages instead use a legacy custom popup. In `assets/js/newsletter.js`, the delayed callback assumes `#newsletter-popup` exists, and its local submit handler only switches copy and displays success. The production homepage logged a null `classList` error from that callback. The tested header CTA did not expose an email field in the audit browser. This does not establish whether MailerLite works in other browsers or whether the provider accepted any request. Confirm the account, popup availability, double opt-in, and delivery with an authorized test address. Unify all entry points around the working provider flow.
- **Zeffy.** `donate.html` intercepts form submit and builds the provider checkout URL. It includes name and email in query parameters and attempts to prefill amount. The static PHP fallback is absent. Keep a plain provider link, test supported handoff fields, and avoid putting donor contact details into URLs. No test donation was made.
- **Other external links.** YouTube channel, episode links and lightbox/media embeds, Instagram, TikTok, Facebook, X, organizational email, Google Fonts, cdnjs Font Awesome, Google tag, MailerLite and Zeffy are the principal destinations in markup and scripts. Template variants include generic social destinations and placeholder video IDs. Keep the official profiles and links. Verify playable videos and every outbound handoff from its actual UI before release.

## Assets and performance

The tracked asset families include **184 PNG, 95 JPG, 7 AVIF, 5 GIF, 5 SVG, 3 MP4**, one ICO and one web manifest. The `assets/` working tree is about **444 MB** on disk by apparent size. The repository includes 17 CSS and 30 JS files totaling about **2.23 MB** uncompressed. These are source inventory figures. Per-page transferred bytes and field metrics remain to be measured.

- Media is grouped under backgrounds, gallery, icons, episodes, shows, slider, resource/blog and favicons. Largest examples include a 22.1 MB blog PNG, 20.0 MB blog MP4, 17.3 MB blog PNG, 12.8 MB show GIF, and 9.0 MB preloader GIF. The home blooming-tree MP4 alone is 12.4 MB. The two tracked Venus flytrap PNG copies have the same size. Verify byte identity and references before consolidating.
- Fonts include Inter, Playfair Display and Lato from Google Fonts, plus local Reey, Font Awesome and Flaticon formats. Confirm which weights and glyphs are used, remove redundant CDN/local weight and icon loads, and maintain Arabic and transliteration rendering. The glyph catalog and SCSS are tooling assets.
- CSS contains references to missing jQuery UI sprites, Owl video art, a slider shape, and Font Awesome compatibility fonts under `webfonts/`. These are source-level findings. A missing definition only becomes a browser request when its selector applies.
- Set dimensions and responsive image variants, compress oversized artwork, use poster frames and click-to-load video, defer below-fold content and remove unused effects. Validate visual quality on real mobile devices. Keep an explicit list of output files so logs, Finder files, vendor demo pages, and unused artwork are not accidentally included in the release artifact.

## Accessibility and mobile

- Fifteen of 16 root pages omit document language and restrict zoom in the viewport tag. Add a language attribute and permit browser zoom. The observed desktop homepage used a 1353px layout without horizontal overflow at that width. Tablet and phone layout checks remain open.
- Images generally carry an alt attribute, but many meaningful images and linked logos have empty alt. The live accessibility tree exposed social/icon links as glyphs, duplicate CTA text and repeated offscreen slides. Add accessible names, hide decorative glyphs, and keep cloned/offscreen slides out of keyboard and screen-reader navigation.
- FAQ headers and mobile-navigation controls use clickable nonbutton markup. Replace with semantic controls and verify focus, keyboard access, expanded state, and escape/dismiss behavior in overlays. Verify touch target size, reflow, contrast, alternative text, captions and transcripts.
- The shared theme uses autoplay, parallax, split-text and hover/cursor effects. Provide pause where applicable, honor reduced motion, and ensure hover enhancements have touch and keyboard equivalents. Check nav, cards, donation flow, and forms at 320–1440px and at 200% zoom.

## Publishing and release risks

Public GitHub deployment records list `github-pages` deployments from `main` and the latest record points to the audited commit. The apex `CNAME` and exact live HTML corroborate the deployed source. The README describes `main` root publishing and the root contains the deployed files, so `main:/` is the supported inference. Exact Pages source dropdown, HTTPS enforcement toggle, environment rules, and administrator exceptions require owner access to repository settings. Public branch metadata previously reported `main` as unprotected. `main` contains one checked-in workflow, `pr-preview.yml`, for Netlify non-production deploys with repository credentials. That workflow targets the checkout root. Preview access, secret availability, and host retention were outside the audit.

Highest priorities are newsletter reliability, a verified fallback for donations, an explicit legacy route plan, a mobile/accessibility baseline, and production safeguards. See [architecture](ARCHITECTURE.md) and [roadmap](ROADMAP.md).

Evidence: [production source](https://github.com/ahmedali929/secretgardentv/tree/fb7146d3fbe55a68876278c2e92f16c7498adc25), [deployment records](https://api.github.com/repos/ahmedali929/secretgardentv/deployments?environment=github-pages), [GitHub Pages source options](https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site).

## External destination inventory

Distinct absolute navigation and embed URLs found in active root HTML markup. Source pages are listed for episode-level and prototype destinations. Provider scripts and the JavaScript-only Zeffy target are described above.

| Destination | Use |
|---|---|
| [`https://facebook.com/`](https://facebook.com/) | `blog-detail.html`, `blog-raising-purposeful-children.html`, `blog-teaching-adab-everyday-moments.html` |
| [`https://instagram.com/`](https://instagram.com/) | `blog-detail.html`, `blog-raising-purposeful-children.html`, `blog-teaching-adab-everyday-moments.html` |
| [`https://tiktok.com/`](https://tiktok.com/) | `blog-detail.html`, `blog-raising-purposeful-children.html`, `blog-teaching-adab-everyday-moments.html` |
| [`https://twitter.com/`](https://twitter.com/) | `blog-detail.html`, `blog-raising-purposeful-children.html`, `blog-teaching-adab-everyday-moments.html` |
| [`https://www.facebook.com/profile.php?id=61568807675251`](https://www.facebook.com/profile.php?id=61568807675251) | Shared layout |
| [`https://www.instagram.com/secretgardentvforkids`](https://www.instagram.com/secretgardentvforkids) | Shared layout |
| [`https://www.tiktok.com/@secretgardentv`](https://www.tiktok.com/@secretgardentv) | Shared layout |
| [`https://www.tiktok.com/@secretgardentvforkids`](https://www.tiktok.com/@secretgardentvforkids) | `blog.html` |
| [`https://www.youtube.com/@SecretGardenTVforKids`](https://www.youtube.com/@SecretGardenTVforKids) | Shared layout |
| [`https://www.youtube.com/embed/DXGrvqgQIi4?autoplay=0&mute=1&controls=0&loop=1&playlist=DXGrvqgQIi4`](https://www.youtube.com/embed/DXGrvqgQIi4?autoplay=0&mute=1&controls=0&loop=1&playlist=DXGrvqgQIi4) | `landingpage.html` |
| [`https://www.youtube.com/embed/DXGrvqgQIi4?autoplay=1&mute=1&loop=1&playlist=DXGrvqgQIi4&controls=0&showinfo=0&modestbranding=1&rel=0&start=30`](https://www.youtube.com/embed/DXGrvqgQIi4?autoplay=1&mute=1&loop=1&playlist=DXGrvqgQIi4&controls=0&showinfo=0&modestbranding=1&rel=0&start=30) | `landingpage.html` |
| `https://www.youtube.com/embed/YOUR_VIDEO_ID_2?autoplay=0&mute=1&controls=0&loop=1&playlist=YOUR_VIDEO_ID_2` | Placeholder in `landingpage.html` |
| `https://www.youtube.com/embed/YOUR_VIDEO_ID_3?autoplay=0&mute=1&controls=0&loop=1&playlist=YOUR_VIDEO_ID_3` | Placeholder in `landingpage.html` |
| `https://www.youtube.com/embed/YOUR_VIDEO_ID_4?autoplay=0&mute=1&controls=0&loop=1&playlist=YOUR_VIDEO_ID_4` | Placeholder in `landingpage.html` |
| [`https://www.youtube.com/watch?v=3PRn29lg28A`](https://www.youtube.com/watch?v=3PRn29lg28A) | `quran-safari.html` |
| [`https://www.youtube.com/watch?v=4ysocbN8WwY`](https://www.youtube.com/watch?v=4ysocbN8WwY) | `quran-safari.html` |
| [`https://www.youtube.com/watch?v=9k8X4gnZU0c`](https://www.youtube.com/watch?v=9k8X4gnZU0c) | `nurheart-fables.html` |
| [`https://www.youtube.com/watch?v=DMg6yPg5GcI`](https://www.youtube.com/watch?v=DMg6yPg5GcI) | `allah-secret-signs.html` |
| [`https://www.youtube.com/watch?v=EZ9tZMOsY58`](https://www.youtube.com/watch?v=EZ9tZMOsY58) | `allah-secret-signs.html` |
| [`https://www.youtube.com/watch?v=K2c0ZNE73qU`](https://www.youtube.com/watch?v=K2c0ZNE73qU) | `babagha-sadiqi.html` |
| [`https://www.youtube.com/watch?v=L-jDs8xqpyw`](https://www.youtube.com/watch?v=L-jDs8xqpyw) | `nurheart-fables.html` |
| [`https://www.youtube.com/watch?v=OXiceougwfY`](https://www.youtube.com/watch?v=OXiceougwfY) | `allah-secret-signs.html` |
| [`https://www.youtube.com/watch?v=P8hdpVdM-4w`](https://www.youtube.com/watch?v=P8hdpVdM-4w) | `nurheart-fables.html` |
| [`https://www.youtube.com/watch?v=SqS6TsiyEgo`](https://www.youtube.com/watch?v=SqS6TsiyEgo) | `nurheart-fables.html` |
| [`https://www.youtube.com/watch?v=YHoO-AN0IyA`](https://www.youtube.com/watch?v=YHoO-AN0IyA) | `quran-safari.html` |
| [`https://www.youtube.com/watch?v=Zv6umVZS3NY`](https://www.youtube.com/watch?v=Zv6umVZS3NY) | `allah-secret-signs.html` |
| [`https://www.youtube.com/watch?v=av6NzM18r-s&t=19s&pp=0gcJCbIJAYcqIYzv`](https://www.youtube.com/watch?v=av6NzM18r-s&t=19s&pp=0gcJCbIJAYcqIYzv) | `allah-secret-signs.html` |
| [`https://www.youtube.com/watch?v=mvb1mMeJ8lA`](https://www.youtube.com/watch?v=mvb1mMeJ8lA) | `allah-secret-signs.html` |
| [`https://www.youtube.com/watch?v=psytn2Ei1D0`](https://www.youtube.com/watch?v=psytn2Ei1D0) | `allah-secret-signs.html` |
| [`https://www.youtube.com/watch?v=qUPdLdTxncw`](https://www.youtube.com/watch?v=qUPdLdTxncw) | `toy-box-stories.html` |
| [`https://www.youtube.com/watch?v=sSzRKSKA8X8`](https://www.youtube.com/watch?v=sSzRKSKA8X8) | `about.html` |
| [`https://www.youtube.com/watch?v=v10R3XlBuJI`](https://www.youtube.com/watch?v=v10R3XlBuJI) | `quran-safari.html` |
| [`https://x.com/secretgarden_tv`](https://x.com/secretgarden_tv) | Shared layout |
| [`https://youtu.be/Ysxxf_Lzcws?si=JPIA-C3-77NPRoKS`](https://youtu.be/Ysxxf_Lzcws?si=JPIA-C3-77NPRoKS) | `toy-box-stories.html` |
| [`https://youtu.be/bixsoWn1M4s?si=efaFlZuuQmuVZuHD`](https://youtu.be/bixsoWn1M4s?si=efaFlZuuQmuVZuHD) | `allah-secret-signs.html` |
| [`https://youtube.com/`](https://youtube.com/) | `blog-detail.html`, `blog-raising-purposeful-children.html`, `blog-teaching-adab-everyday-moments.html` |
