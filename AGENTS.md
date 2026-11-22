# Secret Garden TV development instructions

- Base redesign tasks on `redesign/staging`. Use a small feature branch and target staging in pull requests. Keep changes scoped, reviewable, and testable.
- Never merge into or push changes directly to `main` or any production publishing branch without explicit approval for that action. Never deploy to production without explicit approval.
- Never change the custom domain or production DNS, including the production domain configuration in `CNAME`. Keep staging separate from production hosting, credentials, analytics, and notification endpoints.
- Preserve existing content, public URLs, SEO signals, MailerLite, analytics, and user-facing functionality. Check the route inventory before changing a URL. Preserve the Zeffy checkout handoff and the coloring book download.
- Support phones, tablets, and desktops. Maintain semantic HTML, keyboard access, visible focus, zoom, touch usability, and reduced-motion support.
- Prefer free or low-cost services. Avoid unnecessary dependencies, client-side JavaScript, and paid services. Get approval before incurring costs.
- Never commit API secrets or credentials. Use managed secrets for integrations. Keep identifying data out of logs, analytics, and test fixtures.
- Run the build and relevant tests before completing a task. For the Astro baseline, run `npm ci`, `npm run build`, and `npm test` with Node.js 24. Report commands, outcomes, and any verification you could not perform.
- Update [docs/PROGRESS.md](docs/PROGRESS.md) with completed work, test status, and remaining issues. Read [docs/DEVELOPMENT.md](docs/DEVELOPMENT.md) before using CI, previews, or release tooling.
