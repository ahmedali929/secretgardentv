# Live Events page

Serve the repository root with `python3 -m http.server 8000` and open [Live Events](http://localhost:8000/live-events.html). The page runs as plain HTML, CSS, and JavaScript. The repository’s existing preview build also copies this page through its generic HTML route and static asset handling.

- `live-events.html` contains the Stitch sections, site navigation, footer, native FAQ disclosures, and booking form.
- `assets/css/live-events.css` contains scoped page rules and the static utility CSS compiled from the Stitch export. The page needs no Tailwind CDN or separate build step.
- `assets/js/live-events.js` handles mobile navigation, demo booking feedback, and the existing MailerLite signup popup. The booking form only simulates submission. All named fields are available as FormData for future integration. The demo sends and stores no booking data.

## Outstanding assets and content

The Stitch CDN returned the Google sign-in page for all eight event images. The current gray placeholders preserve the positions and overlays in the supplied screenshot. The HTML marks each slot with a `data-artwork` description. Replace the placeholders with the original artwork or an authorized export when available.

| Section | Original artwork needed |
|---|---|
| Hero | Secret Garden TV Live Stage Presentation |
| Programs | Interactive Storytelling, Hands-on Science and Allah’s Signs, Arabic Games and Song Safari, Garden Maker Crafts and Sensory Play |
| Gallery | Singing Duas Together, Planting Seeds of Taqwa, Meet and Greet with Characters |

Confirm the testimonial attributions, metrics, and tour availability copied from the mockup before a public release. The footer opens MailerLite’s existing popup for email entry and signup. A real signup requires MailerLite and was outside the demo booking flow. The export’s placeholder X, Privacy Policy, and Terms of Service links have no verified site destination.

## Verification

The repository build and parity test passed for 17 HTML routes. Chromium checks covered local links and assets, layout at 320, 375, 768, 1024, and 1440 px, keyboard navigation and FAQ controls, booking validation and simulated loading/error/success, and the MailerLite popup handoff with a mocked SDK. Axe reported no violations in the checked WCAG rules. Live MailerLite signup and manual screen-reader testing remain unverified.

The original typefaces and Material Symbols subset are served from assets/fonts/live-events with their licenses.
