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
```

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