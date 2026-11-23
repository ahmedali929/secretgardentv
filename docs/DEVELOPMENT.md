# Development and release workflow

## Branches

| Branch | Purpose |
|---|---|
| `main` | Current production branch. Release merges and production deployment require explicit owner approval |
| `redesign/staging` | Long-lived integration branch created from the current `main` head. GitHub remains the source of truth |
| `redesign/<task>` | Short-lived task branches based on the latest staging head. Open draft PRs against staging |

For each task, start from the latest `origin/redesign/staging`, review the audit and progress log, and make one testable change. Include verification results in the PR and update the progress log. Review and integrate into staging once the checks pass. If production receives a fix during the redesign, incorporate it into staging via a reviewed sync. Do not rewrite shared history.

From [Codex on the web](https://chatgpt.com/codex), use a published environment connected to this repository with Node.js 24. Select the staging branch or an existing feature branch when starting a task. Reopen the same task on your phone or laptop, or resume from the pushed branch and draft PR.

## Build and preview

Run these commands from the repository root with Node.js 24.

```sh
npm ci
npm run dev
```

Run these separately to verify and serve the static output.

```sh
npm run lint
npm run build
npm test
npm run preview
```

Check the affected legacy URLs, assets, and integrations. For visual changes, test phone, tablet, and desktop, keyboard navigation, and reduced motion. Use staging-only form and analytics settings. Never submit production test data without explicit authorization.

### Frontend layout

- `src/content/pages.mjs` owns the legacy URL registry, descriptions, social types and sitemap inclusion. Add a registry entry when introducing a new legacy HTML document. Astro emits the existing `.html` URLs from this registry.
- `LegacyPage.astro` is a migration bridge. It inserts the shared `PageSeo.astro` component into the existing head and preserves original markup, scripts, external integrations and media references. `SiteLayout.astro` and the scoped Tailwind utility entry are for new Astro templates, starting with the 404 page.
- Keep public media in the existing asset tree. The build copies it into `dist/` once. Keep `CNAME` in the ordinary output and GitHub Pages production settings outside staging.
- Legacy pages are static and use their existing interactions. Add React only when a new interaction needs it. Run the parity checks after each template migration and adjust them only for intentional changes.

### Staging build and hosted preview

Use `npm run build:staging` with Node.js 24 for a preview artifact. It builds the static site, checks legacy parity, removes the production domain file and GA tag from the output, and adds Cloudflare Pages headers to keep every public preview route out of search indexes. The checked-in production domain file and the ordinary build are unaffected. Preview builds retain outward links and newsletter UI. Use authorized test destinations only.

GitHub Actions builds pushes to `redesign/staging` and PRs targeting it. Download the `sgtv-staging-preview` artifact from the run for local review. The staging workflow uses read-only permissions and has no publishing step. The older Netlify PR workflow skips PRs targeting staging.

#### Blocked until a Cloudflare account owner connects GitHub

On your phone, open the [Cloudflare dashboard](https://dash.cloudflare.com/) in your browser. Use the browser's desktop-site mode if menus are collapsed.

1. Open **Workers & Pages → Create application → Pages → Connect to Git**. Sign in to GitHub if prompted. Install or configure the Cloudflare GitHub app for **only** `ahmedali929/secretgardentv` and select that repository.
2. Create a separate Pages project, such as `sgtv-redesign-preview` if available. Set the **production branch for this preview-only project** to `redesign/staging`. Leave the project on its Cloudflare-assigned `pages.dev` HTTPS hostname and leave Custom Domains empty.
3. Choose **None** for the framework preset. Leave the root directory at the repository root, set the build command to `npm run build:staging`, and the output directory to `dist`. Set the build environment variable `NODE_VERSION` to `24` before saving.
4. Select **Save and Deploy**. Under the project's **Settings → Builds → Branch control**, keep automatic deployments enabled for its selected staging branch and set preview branch deployments to **None**. Every new staging push will update the same public HTTPS site. PR builds remain available as GitHub artifacts.
5. In **Deployments**, open the successful staging deployment and verify its commit and public HTTPS URL. Check response headers on both the home page and a legacy route, for example `curl -fsSI https://<assigned-host>/program.html`. Expect `X-Robots-Tag: noindex, nofollow`. A noindex header is an indexing directive, and the site is still public. Keep confidential content off this preview.

See [Cloudflare Pages Git setup](https://developers.cloudflare.com/pages/get-started/git-integration/), [branch controls](https://developers.cloudflare.com/pages/configuration/branch-build-controls/), and [custom headers](https://developers.cloudflare.com/pages/configuration/headers/).

## Production release

1. Record the current Pages source in **GitHub → Settings → Pages**, the last successful deployed commit, and a tested rollback path. Public deployment history identifies `main` as the publishing branch. Verify the exact source mode and folder in Settings before a release.
2. Before cutover, have a repository administrator configure a branch rule for `main` and any other publishing branch under **Settings → Rules → Rulesets** or **Settings → Branches**. Require a reviewed pull request and the build check. Select the check from a successful run and review bypass permissions. Treat this as a separate administrative change.
3. Validate the staged release commit, legacy URLs and SEO, media, production-safe integration settings, and automated checks. Open a release PR from staging to the confirmed publishing branch only when requested. The owner explicitly approves the release commit and its merge and deployment. If Pages publishes from the branch, the merge itself can trigger publication.
4. If the approved release needs Astro's built output, confirm the Pages source and agree on an artifact-based release workflow before changing the publishing mechanism. Keep production deploy permissions out of preview jobs. Publishing from a source branch alone does not run `astro build`.
5. After an approved release, check the apex site, key routes, media, and integration handoffs. Use the agreed rollback procedure with the owner if a critical check fails. Leave the custom domain and production DNS untouched.

See [audit](AUDIT.md), [architecture](ARCHITECTURE.md), and [roadmap](ROADMAP.md).
