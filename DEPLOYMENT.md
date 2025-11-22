# GitHub Pages Deployment Guide

This project is configured for automatic deployment to GitHub Pages.

## Setup Instructions

### 1. Enable GitHub Pages

1. Go to your repository on GitHub
2. Navigate to **Settings** → **Pages**
3. Under **Source**, select **GitHub Actions**
4. Save the settings

### 2. Automatic Deployment

The project uses GitHub Actions to automatically build and deploy when you push to the `main` branch.

**Workflow:** `.github/workflows/deploy.yml`

The workflow will:
- Build the project using `npm run build`
- Deploy the `dist` folder to GitHub Pages
- Run automatically on every push to `main`

### 3. Manual Deployment

If you need to deploy manually:

```bash
npm run build
```

Then commit and push the `dist` folder (if needed), or let GitHub Actions handle it automatically.

## URL Structure

The app will be available at:
- **Production:** `https://gabrielbarbera.github.io/Voucherify-Portal/`

## Important Notes

- The app uses **HashRouter** which is perfect for GitHub Pages (no server-side routing needed)
- The base path is set to `/Voucherify-Portal/` in `vite.config.ts`
- All assets (logos, favicons) are in the `public/` folder and will be served correctly

## Troubleshooting

### Build Fails
- Check that all dependencies are in `package.json`
- Ensure Node.js version is compatible (workflow uses Node 20)

### Pages Not Updating
- Check GitHub Actions tab for workflow status
- Verify GitHub Pages is enabled in repository settings
- Ensure the workflow file is in `.github/workflows/`

### Assets Not Loading
- Verify the `base` path in `vite.config.ts` matches your repository name
- Check that files in `public/` folder are being copied correctly

