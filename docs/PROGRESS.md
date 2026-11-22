# Redesign progress

## Completed

- Audited the live site and repository, inventoried the legacy routes, and documented the Astro recommendation and migration roadmap.
- The current `main` baseline (`36770a1`) contains the Astro compatibility build and PR preview workflow. Draft PR #8 previously passed its build and route parity checks. The latest observed Pages deployment still points to the earlier audited commit (`fb7146d`).
- Created `redesign/staging` from `main` at `36770a1`, added persistent Codex instructions, and documented the development and release process.

## Remaining

- Verify the exact GitHub Pages source mode and folder, configure the production branch review rules, and confirm whether Netlify reviewer access is restricted.
- Approve the homepage design and prototype URL dispositions. Verify legacy route parity as pages move into shared layouts.
- Validate MailerLite signup, Zeffy handoff, and analytics on staging. Confirm adult inquiry fields, provider and team routing.
- Verify mobile and tablet behavior, keyboard accessibility, reduced motion and performance on representative devices.
- Prepare, rehearse and obtain explicit approval for the production release and rollback plan.
