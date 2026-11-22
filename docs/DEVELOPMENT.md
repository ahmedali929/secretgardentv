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
npm run build
npm test
npm run preview
```

Check the affected legacy URLs, assets, and integrations. For visual changes, test phone, tablet, and desktop, keyboard navigation, and reduced motion. Use staging-only form and analytics settings. Never submit production test data without explicit authorization.

The inherited **PR Preview** GitHub Actions workflow builds and tests PRs and uploads `sgtv-preview`. Draft PRs skip the hosted Netlify job. Use the artifact or local preview for routine review. The existing workflow attempts a Netlify deploy when a same-repository PR is marked ready. Confirm the Netlify site is a separate staging target with verified reviewer access before marking a PR ready. A noindex header does not restrict access. This repository is public, so use a separate approved private environment for confidential work.

## Production release

1. Record the current Pages source in **GitHub → Settings → Pages**, the last successful deployed commit, and a tested rollback path. Public deployment history identifies `main` as the publishing branch. Verify the exact source mode and folder in Settings before a release.
2. Before cutover, have a repository administrator configure a branch rule for `main` and any other publishing branch under **Settings → Rules → Rulesets** or **Settings → Branches**. Require a reviewed pull request and the build check. Select the check from a successful run and review bypass permissions. Treat this as a separate administrative change.
3. Validate the staged release commit, legacy URLs and SEO, media, production-safe integration settings, and automated checks. Open a release PR from staging to the confirmed publishing branch only when requested. The owner explicitly approves the release commit and its merge and deployment. If Pages publishes from the branch, the merge itself can trigger publication.
4. If the approved release needs Astro's built output, confirm the Pages source and agree on an artifact-based release workflow before changing the publishing mechanism. Keep production deploy permissions out of preview jobs. Publishing from a source branch alone does not run `astro build`.
5. After an approved release, check the apex site, key routes, media, and integration handoffs. Use the agreed rollback procedure with the owner if a critical check fails. Leave the custom domain and production DNS untouched.

See [audit](AUDIT.md), [architecture](ARCHITECTURE.md), and [roadmap](ROADMAP.md).
