## Deployment Rules

When the user asks to update, deploy, sync, publish, push online, update GitHub Pages, or update Vercel for this project, follow these rules automatically.

### Project deployment identity
- Local repo path: `C:\Users\MeetYou\Desktop\meiyou-suiji-migration-export`
- Existing GitHub repo: `televgtamfe-coder/meiyouds-weijuejingqi`
- Existing GitHub Pages URL: `https://televgtamfe-coder.github.io/meiyouds-weijuejingqi/`
- Public route checks must use hash routes such as:
  - `https://televgtamfe-coder.github.io/meiyouds-weijuejingqi/#/scene1`
  - `#/scene1-home`
  - `#/scene1-message`
  - `#/scene1-my`
  - `#/scene1-perimenopause`

### Mandatory constraints
- Never create a new GitHub repo
- Never rename the repo back to `meiyou-suiji`
- Never create a new Vercel project
- Never change the existing public project name
- Reuse the existing GitHub Pages and existing Vercel project only
- If the user does not explicitly require Vercel, GitHub Pages is the primary deployment target
- If the user asks to update both GitHub and Vercel, update the existing GitHub repo and the existing Vercel project, not new ones

### Historical deployment fixes that must be preserved
- Preserve the currently validated GitHub Pages base setting in `vite.config.ts`
- Do not blindly rewrite the Pages `base` during routine updates
- Do not revert prior fixes in `.gitignore` or `vite.config.ts`
- Do not reintroduce hardcoded page heights like `812px` that can push the bottom tab out of view
- Be careful with large images because public pages previously loaded slowly on mobile

### Required pre-deploy checks
Before any deploy:
1. Verify the current git remote points to the existing repo
2. Verify `vite.config.ts` still matches the repo's currently validated Pages configuration
3. Run:
   - `npm run build`
4. Run targeted tests when scene1 or deployment-sensitive UI changed
5. Check that bottom tab visibility is still correct on affected pages

### GitHub update flow
When updating GitHub Pages:
1. Stage changes
2. Commit with a clear message
3. Push to the existing default branch
4. Wait for GitHub Pages propagation
5. Re-check the existing github.io URLs
6. Assume temporary stale mobile content may be caused by publish delay or cache before assuming deploy failure

### Vercel update flow
When the user explicitly asks to update Vercel too:
1. Reuse the existing Vercel project
2. Do not import or create a new project
3. Use the existing linked configuration
4. Trigger a production redeploy for the existing project only

### Reporting requirements
After deployment, always report:
- Whether GitHub was updated
- Whether GitHub Pages was updated
- Whether Vercel was updated
- The repo/project reused
- The public URL checked
- The key changes in this update
- Any remaining cache or propagation caveat
