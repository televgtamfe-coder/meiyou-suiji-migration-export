# Public Deployment

This project now uses GitHub Pages as the only public sharing channel.

## Public URL

- GitHub Pages: `https://televgtamfe-coder.github.io/meiyouds-weijuejingqi/#/scene1`

## How it deploys

- GitHub Actions workflow: `.github/workflows/pages.yml`
- Trigger branch: `main`
- Published artifact directory: `docs`

## Important Rule

- Do not create a new GitHub repo or a new Vercel project for routine updates.
- Keep using the existing repo: `televgtamfe-coder/meiyouds-weijuejingqi`
- Keep using the existing public URL:
  `https://televgtamfe-coder.github.io/meiyouds-weijuejingqi/#/scene1`
- If Vercel is connected to this repo, let it update from the same Git push. Do not rebuild the integration from scratch.

## Update flow

1. Finish code changes locally.
2. Run verification locally:
   - `npm test -- tests/scene1/scene1-home.test.tsx tests/scene1/scene1-message.test.tsx tests/scene1/scene1-tabbar.test.tsx tests/scene1/scene1-my.test.tsx`
   - `npm run build`
3. Refresh the static Pages bundle locally:
   - `node scripts/build-standalone.js`
4. Confirm `docs/index.html` points to the latest built asset hashes from `dist/index.html`.
5. Commit both source changes and refreshed `docs/` output.
6. Push to `main`.
7. Wait for GitHub Pages to update, then hard refresh the public URL on mobile.

## Problem We Hit

We previously pushed the latest source code to GitHub, but the public `github.io` page still showed the old version.

Root cause:

- GitHub Pages was serving the committed `docs/` static bundle.
- The repo `main` branch had new source code, but `docs/index.html` was still referencing old hashed assets.
- Result: GitHub repo looked updated, but the public site still loaded the old JS/CSS bundle.

## Required Check Before Every Public Update

- `dist/index.html` must reference the newest asset hashes.
- `docs/index.html` must match `dist/index.html`.
- `docs/assets/` must contain the matching latest hashed files.
- After pushing, if the public page still looks old, check `docs/index.html` first before blaming cache.

## Fast Recovery If Public Site Looks Old

1. Run `npm run build`
2. Run `node scripts/build-standalone.js`
3. Re-check `docs/index.html`
4. Commit refreshed `docs/index.html` and `docs/assets`
5. Push to `main` again
6. Hard refresh the public page on mobile

## Notes

- The app uses `HashRouter`, so the `#/scene1` route works on static hosting.
- `github.io` is the only recommended public entry point for sharing this project.
