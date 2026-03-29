# ArtPiecePreview + Portfolio Section

**Date:** 2026-03-29

## Context

A new `ArtPiecePreview` base component is needed to display a single artwork with a depth-effect image and an info badge. A `Portfolio` section will wrap it for testing with `jacket-1`.

## Components

### `ArtPiecePreview` — `src/lib/components/base/ArtPiecePreview.svelte`

**Props:** `artPiece: ArtPiece`

**Structure:**
- `DepthWrapper` containing `BaseImage` (no `DecorationWrapper`)
- `BaseBadge` below the image:
  - Default slot: `{artPiece.name} ({artPiece.year})`
  - `text` slot: `{artPiece.shortDescription}`

Follows the same depth-image pattern as `ImageGallery` and the same badge pattern as `HomeHero`.

### `Portfolio` — `src/lib/components/sections/Portfolio.svelte`

- Uses `BaseSection type="primary"`
- Hardcoded to `ART_PIECES['jacket-1']`
- Renders a single `<ArtPiecePreview>` inside the section
- Added to `HomePage.svelte` after existing sections

## Out of Scope

- Configurable item list (hardcoded for now)
- Decoration wrapper
- Additional images / image carousel

## Verification

1. `npm run dev` — Portfolio section appears on the page with jacket-1
2. Depth parallax effect works on image hover/mouse move
3. Badge shows name, year, and short description
4. `npm run check` passes with no type errors
