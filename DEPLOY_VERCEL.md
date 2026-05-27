# Public Deployment

This project is configured for direct public deployment with Vercel.

## What was configured

- Vite `base` is set to `/` for root-path hosting.
- `vercel.json` is added for Vite deployment.
- The app uses `HashRouter`, so route refresh issues are minimized on static hosting.

## Fastest way to share

1. Push this project to a GitHub repository.
2. Sign in to Vercel and import that GitHub repository.
3. Keep the default framework as `Vite`.
4. Build command: `npm run build`
5. Output directory: `dist`
6. Click deploy.

After deployment, Vercel will give you a public URL that others can open directly in a browser.
