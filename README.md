# Secret Garden TV for Kids

The Astro build keeps the 16 legacy HTML routes and their content intact. The
root HTML files remain the source for these routes while they are migrated to
shared Astro components. The build copies the existing media, coloring book,
and custom-domain file into `dist/`.

With Node.js 24, use `npm run dev` for local development. To verify a fresh checkout, run `npm ci`, `npm run build`, and `npm test`. Run
`npm run preview` after building to serve the complete static output.

For Codex Cloud, publish an environment using this GitHub repo and Node.js 24.
Use `npm ci` as the setup command on the Astro branch. Resume the same cloud
task across devices, or start from its GitHub branch after committing the work.

Draft PRs produce the `sgtv-preview` Actions artifact. Download and unzip it
to review locally with `python3 -m http.server --directory dist 8000` (adjust
the directory to match the extracted artifact). Mark a PR ready for review only
after confirming access restrictions on the existing Netlify preview site.
The workflow sets a noindex header on hosted previews.

Before a production cutover, confirm the Pages source in repository settings,
protect the production branch with the build check and a reviewer, and verify
the final staging URL and checkout, newsletter, and mobile behavior. Record the
currently deployed commit and keep the previous Pages source available for
rollback.
