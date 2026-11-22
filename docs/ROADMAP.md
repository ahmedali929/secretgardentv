# Migration roadmap

The audit is documentation only. Production cutover is a separate decision. Keep implementation changes on feature branches with reviewed PRs.

| Phase | Work | Exit criteria |
|---|---|---|
| 0. Baseline and approvals | Approve Astro and confirm the live Pages source, custom domain, production SHA and rollback path. Confirm who reviews releases. Inventory prototype traffic, shortlinks and inbound URLs. Establish phone, tablet and desktop browser and accessibility baselines | Recorded launch and rollback settings. Agreed route mapping and provider owners. Production branch protection plan confirmed |
| 1. Foundation and parity | Review draft PR #8. Pin runtime and install dependencies reproducibly. Keep the legacy HTML paths, media and current behavior while adopting Astro. Test every known route locally and compare output against live source. Use build artifacts or verified restricted staging | Every approved legacy route serves expected HTML. Assets, PDF, internal anchors and canonical behavior pass checks. Preview uses the reviewed commit. No production deployment |
| 2. Homepage design | Build a single reviewable homepage using existing artwork, clearer navigation and visible program discovery. Replace or retain carousel interactions based on usability, with pause and reduced-motion behavior. Test touch, keyboard and 200% zoom | Stakeholder approves visual direction. Main content remains reachable without JS. No mobile horizontal overflow. Performance improves from measured baseline |
| 3. Shared layouts and editorial migration | Extract header/footer, metadata, program, episode and article templates. Apply design to remaining public pages. Fix empty or generic accessible names, heading hierarchy and FAQ semantics. Optimize media. Add approved SEO metadata, sitemap and 404 | All production URLs and content accounted for. Deep links, article and episode content, artwork and download URL verified. Prototype disposition approved |
| 4. Integrations and adult inquiry | Replace duplicate and simulated newsletter flows with the verified MailerLite entry point. Add managed form routing and accessible success/error states. Verify Zeffy handoff and direct checkout. Check analytics on the staging setup using test data | MailerLite signup and opt-in demonstrated with an authorized test address. Approved recipients receive test inquiry notifications. Spam and failure states tested. Zeffy handoff verified without making a payment |
| 5. Release candidate | Freeze candidate commit, run link and browser checks, test mobile Safari and Chrome, audit keyboard access and reduced motion, run accessibility and performance tooling, and rehearse rollback | Reviewed candidate with passing checks, recorded prior deployment, verified preview access, and explicit approval for a production deployment |
| 6. Approved release and verification | Publish the approved static artifact through the confirmed Pages setup. Verify domain, representative routes, redirects, sitemap, media, provider handoffs and monitoring. Roll back to the recorded known-good deployment if a critical path fails | Production smoke checks pass and the team knows how to revert. Archive the release SHA and results |

## Decisions to resolve

| Decision | Recommended starting point |
|---|---|
| Prototype URLs | Keep addressing stable until owner confirms which prototypes have traffic, backlinks or shared links. Exclude approved retirements from the sitemap and map only to equivalent content |
| Deployment ownership | Keep GitHub Pages production. Verify whether source is `main:/` in Settings, identify reviewers, and require the build check before cutover |
| Preview access | Use downloadable drafts or verified restricted URLs. Confirm the existing Netlify settings before any hosted preview |
| Form scope and routing | Start with an adult general-inquiry form and team alias. Confirm fields, recipient ownership, retention and success criteria |
| Existing services | Identify owners of MailerLite, GA and Zeffy. Confirm expected consent and signup behavior, distribution, and test access before migrating |
| Content editing | Begin with Git-backed content. Evaluate a free Git-backed CMS only if nontechnical editing becomes a confirmed requirement |

## Test and rollback checklist

- Compare every route in [AUDIT.md](AUDIT.md) with the current live origin and proposed output. Flag known broken links separately from new regressions. Verify the release artifact contains only intended files.
- Check navigation, FAQ, video launch, newsletter, checkout and inquiry at 320, 375, 768, 1024 and 1440 CSS pixels. Include real touch, keyboard/accessibility tree, browser zoom, reduced motion, blocked third-party scripts and slow-network cases.
- Compare page-weight and Lighthouse trends on representative pages. Measure Core Web Vitals separately from lab data when sufficient field data exists.
- Keep commit SHA and artifact for the previous production version. Before switching Pages source, capture the current source setting, domain and HTTPS settings. Rehearse publishing a previous artifact or restoring the previous source on staging. Use that documented path to recover from release regressions.
- Use the same Codex Cloud task from phone and laptop if configured. Commit and push work to a feature branch so PR review and verification can resume across tasks.

See [architecture](ARCHITECTURE.md) for implementation choices and [audit](AUDIT.md) for the baseline.
