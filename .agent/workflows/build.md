---
description: Build the project for production
---

# Production Build Workflow

This workflow creates an optimized production build of the application.

## Steps

// turbo
1. Install dependencies (if not already installed):
```bash
npm install
```

// turbo
2. Build the project:
```bash
npm run build
```

3. The production build will be created in the `dist/` directory
   - All assets are minified and optimized
   - Source maps are disabled for smaller bundle size
   - Ready for deployment to any static hosting service

## Optional: Preview the Build

// turbo
4. Preview the production build locally:
```bash
npm run preview
```

This will start a local server to preview the production build.

## Deployment

The `dist/` folder can be deployed to:
- Netlify
- Vercel
- GitHub Pages
- AWS S3
- Cloudflare Pages
- Any static hosting service

Simply upload the contents of the `dist/` directory to your hosting provider.
