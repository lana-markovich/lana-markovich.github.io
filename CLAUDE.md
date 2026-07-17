# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is an artist portfolio website built with Svelte 5, TypeScript, and Vite (using Rolldown bundler). The site displays artwork and information about the artist. It's a standard Svelte SPA project structure, not using SvelteKit.

**Project Purpose**: Display portfolio works and artist information - minimal business logic, focus on visual presentation.

## Development Commands

```bash
# Start development server with HMR
npm run dev

# Build for production
npm run build

# Preview production build locally
npm run preview

# Run type checking (Svelte + TypeScript)
npm run check

# Regenerate optimized WebP images + generated types (run after adding source images)
npm run process-images
```

## Common Workflows

These are the everyday flows a non-technical owner will ask for through Claude. Follow the exact steps — several involve generated files and a deploy pipeline that are easy to get wrong.

### Run / preview the site

- **Live editing:** `npm run dev` — starts Vite with HMR at a local URL (`--host` also exposes it on the local network for phone testing). This is what "run the site" / "show me the site" means.
- **Production preview:** `npm run build` then `npm run preview` — serves the real built output. Use only when verifying the production bundle specifically.
- **Sanity check before publishing:** `npm run check` (Svelte + TypeScript type check). Run this after any code/type change.

### Publish changes (deploy)

Deployment is automatic — there is **no manual deploy command**.

1. Commit the changes.
2. Push to `master`.
3. `.github/workflows/deploy.yml` runs on every push to `master`: `npm ci` → `npm run build` → deploy the `dist/` output to GitHub Pages.
4. Live site: **https://lana-markovich.github.io** (updates ~1–2 min after the Actions run goes green).

Notes:
- Only `master` deploys. Pushing a feature branch does **not** publish.
- The deploy build runs **only `npm run build`** — it does *not* run `process-images`. Therefore the generated WebP files in `public/images/` and the generated TypeScript in `src/lib/generated/` **must be committed**, or images/types will be missing in production. Always include them in the same commit as an image change.
- A deploy can also be triggered manually from the GitHub **Actions** tab (`workflow_dispatch`).

### Add an image

Images go through a processing pipeline — do **not** hand-place files in `public/images/` or hand-edit generated files.

1. **Drop the original** `.png` / `.jpg` / `.jpeg` into `src/assets/images/`. The filename (without extension) becomes the image **id**, e.g. `sunset-over-water.png` → id `sunset-over-water`. Use kebab-case; this id is referenced everywhere.
2. **Process:** run `npm run process-images`. This resizes to widths `2560 / 1280 / 720` as WebP into `public/images/` (skips sizes larger than the original and files that already exist) and **regenerates** `src/lib/generated/constants.ts` (`IMAGE_SOURCES`) and `src/lib/generated/types.ts` (the `ImageId` union). Never edit those two files by hand.
3. **Register metadata** in `src/lib/images.ts` — add an entry to `IMAGES` keyed by the id, spreading the generated source and adding display metadata:
   ```ts
   'sunset-over-water': {
       ...IMAGE_SOURCES['sunset-over-water'],
       alt: 'Sunset over water',           // required, describes the image
       focalPoint: { x: 0.5, y: 0.5 },      // 0..1; shift to keep the subject visible when cropped
       zoom: 1.0,                            // 1..5
   },
   ```
4. **If it's an artwork** (appears in the portfolio/gallery), add an entry to `ART_PIECES` in `src/lib/constants.ts` (`id`, `name`, optional `year`, `shortDescription`, `description` as HTML string, and `image: IMAGES['sunset-over-water']`).
5. **Place it on a page** by adding its id to the relevant section's config array:
   - Scrolling gallery → `galleryConfig` in `src/lib/components/sections/ImageGallery.svelte`
   - Portfolio grid → `ITEMS` in `src/lib/components/sections/Portfolio.svelte` (also set its `category`)
   - Elsewhere → render `<BaseImage name="sunset-over-water" alt="…" />`.
6. **Verify** with `npm run check`, then `npm run dev` to see it.
7. **Commit everything together**: the source image, the generated `public/images/*.webp`, the generated `src/lib/generated/*`, and the `images.ts` / `constants.ts` edits (see deploy notes above).

### Update styles

- **Design tokens** (colors, spacing, type scale, breakpoints, easing) live in `src/assets/styles/variables.css`. Change a token here to update it site-wide.
- **Global stylesheets** are wired through `src/assets/styles/main.css` (`reset.css`, `variables.css`, `typography.css`).
- **Component-specific styles** live in the scoped `<style>` block of each `.svelte` file.
- **Reference first:** `docs/design-system/` (`tokens.md`, `components.md`, `patterns.md`) catalogs what already exists. Before adding a new value: reuse an existing token, derive colors via `color-mix(... --black-800 ...)` rather than new raw hex, and reuse `--easing-default` for transitions.
- **Responsive:** breakpoints are `35 / 65 / 90 / 120rem`; many tokens are overridden inside media queries at the bottom of `variables.css`.

## Architecture

### Build Setup

- **Bundler**: Uses Rolldown (via `rolldown-vite@7.2.5`) instead of standard Vite
- **Preprocessor**: `vitePreprocess()` for Svelte component preprocessing
- **Entry Point**: `index.html` → `/src/main.ts` → mounts `App.svelte` to `#app`

### Project Structure

```
src/
├── lib/
│   ├── components/
│   │   ├── base/          # Reusable UI components (Button, Card, etc.)
│   │   ├── sections/      # Page sections (Hero, Gallery, Contact, etc.)
│   │   └── layout/        # Layout components (Header, Footer, Nav, etc.)
│   ├── utilities/         # Helper functions, constants
│   └── types.ts           # TypeScript type definitions
├── pages/                 # Page-level components (or routes/)
├── assets/                # Images, fonts, etc.
├── app.css                # Global styles
└── main.ts                # Entry point
```

**Key Conventions:**

- `src/lib/` contains all reusable code (Svelte convention)
- `src/lib/components/base/` - Reusable UI building blocks
- `src/lib/components/sections/` - Composed sections used in pages
- `src/lib/components/layout/` - Site-wide layout components (Header, Footer, Nav)
- `src/pages/` - Top-level page components
- `src/lib/types.ts` - Single file for TypeScript types (sufficient for this project)
- `public/` - Public static files (copied as-is to build output)

### Svelte 5 Specifics

This project uses **Svelte 5**, which has breaking changes from Svelte 4:

- Uses `mount()` instead of `new Component()` for initialization
- Component API and lifecycle methods may differ from older Svelte versions
- Refer to Svelte 5 documentation when making component changes

### TypeScript Configuration

- `tsconfig.app.json` - App source code configuration
- `tsconfig.node.json` - Build tooling configuration (Vite config files)
- `tsconfig.json` - Base configuration

## Development Notes

### Type Checking

The `check` script runs both:

1. `svelte-check` for Svelte component type checking
2. `tsc` for TypeScript files (build config)

### HMR State

HMR state preservation is disabled by default in this template. For persistent state, use external Svelte stores (see README.md for pattern).
