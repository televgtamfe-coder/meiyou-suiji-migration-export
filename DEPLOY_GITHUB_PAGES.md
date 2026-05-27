# Public Deployment

This project now uses GitHub Pages as the only public sharing channel.

## Public URL

- GitHub Pages: `https://televgtamfe-coder.github.io/meiyouds-weijuejingqi/#/scene1`

## How it deploys

- GitHub Actions workflow: `.github/workflows/pages.yml`
- Trigger branch: `main`
- Published artifact directory: `docs`

## Update flow

1. Push the latest code to the `main` branch.
2. GitHub Actions builds the site automatically.
3. GitHub Pages publishes the updated `docs` artifact.

## Notes

- The app uses `HashRouter`, so the `#/scene1` route works on static hosting.
- `github.io` is the only recommended public entry point for sharing this project.
