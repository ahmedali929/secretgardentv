# SecretGardenTV — Local Development & Run Instructions

This repository is a static website (plain HTML, CSS, and JavaScript). This README explains how to run the site locally and optional steps to add an npm-based workflow and deploy to GitHub Pages.

**Project layout**
- HTML entry files: `index.html`, other pages at the repository root.
- Static assets: `assets/` (CSS, JS, images, fonts).

## Prerequisites
- macOS / Linux / Windows with Python 3 installed (recommended, already included on most systems).
- Optional: Node.js + npm if you want the `npm run start` workflow.

## Quick local server (recommended)
The easiest way to serve the site locally is with Python's built-in static server.

Open a terminal and run:

```bash
cd /Users/mohammadmzaidi/Documents/webprojects/secretgardentv
python3 -m http.server 8000
```

Then open `http://localhost:8000` in your browser. This serves files from the project root (so `index.html` will load).

Notes:
- Press `Ctrl+C` in the terminal to stop the server.
- If `python3` is not available, try `python -m http.server 8000`.

## Optional: npm-based workflow
There is a `package-lock.json` in the repo but no `package.json`, which is why running `npm install` failed. If you'd like an npm workflow (so you can use `npm run start`), create a `package.json` and install a small static server package.

1. Create `package.json` (quick default):

```bash
cd /Users/mohammadmzaidi/Documents/webprojects/secretgardentv
npm init -y
```

2. Install a dev server (example: `http-server`):

```bash
npm install --save-dev http-server
```

3. Edit `package.json` to add a start script. Open `package.json` and add under `scripts`:

```json
"scripts": {
  "start": "http-server -c-1 . -p 8000"
}
```

4. Run:

```bash
npm run start
```

This will serve the project at `http://localhost:8000`.

## Deploying to GitHub Pages (simple)
Option A — GitHub repository settings (no tooling required):
- Push this repo to GitHub.
- In the repository's Settings → Pages, set the source to the `main` branch root and save.
- After a minute, the site will be published at `https://<your-username>.github.io/<repo>` (or at the custom domain configured in `CNAME`).

Option B — `gh-pages` package (npm):
- Install `gh-pages` and add a `deploy` script to `package.json`.

```bash
npm install --save-dev gh-pages
```

Add scripts to `package.json`:

```json
"scripts": {
  "predeploy": "npm run build || true",
  "deploy": "gh-pages -d ."
}
```

Run `npm run deploy` to publish. (Note: this publishes repository contents; modify as needed if you want to only publish a subdirectory.)

## Troubleshooting
- If `npm install` fails with "no package.json", generate `package.json` first (`npm init -y`).
- If assets aren’t loading, make sure paths in the HTML are relative (they are in this repo) and that you are serving from the project root.
- For CORS or API testing, use a more advanced dev server or configure a proxy.

## Committing changes
Follow these simple Git commands to commit and push changes to the repository from your local machine.

1. Check the repository status:

```bash
cd /Users/mohammadmzaidi/Documents/webprojects/secretgardentv
git status
```

2. Create a new branch for your changes (recommended):

```bash
git checkout -b fix/some-description
```

3. Stage changed files (example stages all changes):

```bash
git add .
```

Or stage specific files:

```bash
git add index.html assets/css/style.css
```

4. Commit with a clear message:

```bash
git commit -m "Short summary: more detailed explanation"
```

5. Push the branch to the remote (assumes `origin` is set):

```bash
git push -u origin HEAD
```

6. Open a Pull Request on GitHub to merge your branch into `main` (recommended review workflow).

Helpful tips:
- Keep commits small and focused. One logical change per commit helps reviews.
- Use present-tense, imperative commit messages (e.g., "Fix header spacing").
- Run `git pull --rebase origin main` before pushing if you expect upstream changes.
- If you use the GitHub CLI, you can create a PR from the terminal: `gh pr create --fill`.
- To view remote URLs: `git remote -v`.

## Next steps I can do for you
- Add a `package.json` and `npm` scripts (start and optional deploy). 
- Add a small `Makefile` or `start.sh` convenience script.
- Create a GitHub Actions workflow to deploy automatically to Pages.

If you want me to add `package.json` and scripts now, tell me which option you prefer (simple `http-server` start, or full `gh-pages` deploy).