# FramedImage: Focal Point + Zoom System

## Problem

Images in the portfolio have focal points in different positions, but framing is currently handled through ad-hoc CSS overrides (e.g., `.image--about-me { object-position: 50% 76% }`). There's no data-driven way to control which part of an image is visible or how much to zoom in. Adding a new image requires writing custom CSS per context.

## Solution

A central image registry with `focalPoint` and `zoom` metadata for every image, plus a `FramedImage` component that uses these values to frame images with CSS transforms.

## Data Model

### Rename auto-generated export

`scripts/process-images.ts` generates `IMAGES` → rename to `IMAGE_SOURCES`.

```typescript
// src/lib/generated/constants.ts (auto-generated)
export const IMAGE_SOURCES = {
  'melancholy': { id: 'melancholy', sizes: [720, 1280] },
  // ...
} as const;
```

`generated/types.ts` updates to reference `IMAGE_SOURCES`:

```typescript
import type { IMAGE_SOURCES } from './constants.js';
export type ImageId = keyof typeof IMAGE_SOURCES;
```

### New types

```typescript
// src/lib/types.ts
export interface FocalPoint {
  x: number;  // 0..1, default 0.5
  y: number;  // 0..1, default 0.5
}

export interface ImageEntry {
  id: ImageId;
  alt: string;
  sizes: readonly number[];
  focalPoint: FocalPoint;
  zoom: number;  // 1..5, default 1.0
}
```

`ImageItem` interface is deleted from `types.ts` and replaced by `ImageEntry`. `ArtPiece.image` and `ArtPiece.additionalImages` use `ImageEntry`. All imports of `ImageItem` across the codebase change to `ImageEntry`.

### Manual IMAGES registry

New file `src/lib/images.ts` — the single source of truth for all image metadata:

```typescript
import { IMAGE_SOURCES } from './generated/constants.js';
import type { ImageEntry } from './types.js';

export const IMAGES = {
  'about-me': {
    ...IMAGE_SOURCES['about-me'],
    alt: 'Sviatlana Markovich portrait',
    focalPoint: { x: 0.5, y: 0.76 },
    zoom: 1.2,
  },
  'melancholy': {
    ...IMAGE_SOURCES['melancholy'],
    alt: 'Melancholy',
    focalPoint: { x: 0.5, y: 0.5 },
    zoom: 1.0,
  },
  // ... all 24 images
} as const satisfies Record<string, ImageEntry>;
```

### ART_PIECES references registry directly

```typescript
// src/lib/constants.ts
import { IMAGES } from './images.js';

export const ART_PIECES = {
  'melancholy': {
    name: "Melancholy",
    year: 2020,
    shortDescription: "100*70 cm, charcoal on paper",
    image: IMAGES['melancholy'],
  },
  'jacket-1': {
    name: "The hand-painted jacket",
    year: 2024,
    image: IMAGES['jacket-1-1'],
    additionalImages: [IMAGES['jacket-1-2'], IMAGES['jacket-1-3']],
  },
  // ...
} satisfies Record<string, ArtPiece>;
```

## FramedImage Component

**File:** `src/lib/components/base/FramedImage.svelte`

### Props

```typescript
interface Props {
  image: ImageEntry;
  focalPoint?: FocalPoint;  // override registry default
  zoom?: number;            // override registry default
  class?: string;
  loading?: "lazy" | "eager";
  sizesAttr?: string;
}
```

### Behavior

- **zoom <= 1:** Renders bare `BaseImage` — no wrapper, no transform, zero overhead.
- **zoom > 1:** Wraps `BaseImage` in `div.framed-image` with `overflow: hidden`. Applies CSS `translate + scale` to center the focal point in the frame.

### CSS mechanism (center mode with edge clamping)

Transform origin is `0 0`. Translation is computed in JS as reactive `$derived` values:

```
tx = clamp(-(zoom - 1) * 100%, (0.5 - focalX * zoom) * 100%, 0%)
ty = clamp(-(zoom - 1) * 100%, (0.5 - focalY * zoom) * 100%, 0%)
```

Applied via CSS custom properties:

```css
.framed-image {
  overflow: hidden;
  width: 100%;
  height: 100%;
}

.framed-image :global(.image) {
  transform-origin: 0 0;
  transform: translate(var(--fi-tx), var(--fi-ty)) scale(var(--fi-zoom));
  width: 100%;
  height: 100%;
}

.framed-image :global(img) {
  object-fit: cover;
  width: 100%;
  height: 100%;
}
```

The clamp prevents showing blank space at edges when the focal point is near the image boundary.

## Composition with Existing Wrappers

### DepthWrapper

```
DepthWrapper → FramedImage → BaseImage
```

DepthWrapper applies `scale(1.11)` on its `__content` div for parallax headroom. FramedImage applies `translate + scale(zoom)` on the `<picture>` element inside it. Separate DOM levels — transforms multiply correctly. No changes to DepthWrapper needed.

### DecorationWrapper

FramedImage (or DepthWrapper containing FramedImage) sits inside as a child. No interaction. No changes needed.

### MouseTrackingMask

```
MouseTrackingMask → FramedImage → BaseImage
```

The mask clips the visible area, FramedImage crops/zooms within it. Purely additive.

### ImagesSlider

ImagesSlider renders `FramedImage` instead of `BaseImage`. Its prop type changes from `ImageItem[]` to `ImageEntry[]`. Also migrates from Svelte 4 `export let` to Svelte 5 `$props()`.

## ArtPieceDialog: zoom=1 Override

The dialog shows the full artwork — cropping would be wrong. Use FramedImage with an explicit override:

```svelte
<FramedImage image={artPiece.image} zoom={1} loading="eager" />
```

## Migration

### Phase 1: Foundation (no visual changes)

1. `scripts/process-images.ts` — rename output from `IMAGES` to `IMAGE_SOURCES`
2. Regenerate `generated/constants.ts` and `generated/types.ts`
3. `src/lib/types.ts` — add `FocalPoint`, `ImageEntry`; update `ArtPiece`
4. `src/lib/images.ts` — create registry, all images at `focalPoint: {x:0.5, y:0.5}, zoom: 1.0`
5. `src/lib/constants.ts` — re-export `IMAGE_SOURCES`, add `IMAGES` re-export, update `ART_PIECES`
6. `BaseImage.svelte` — import `IMAGE_SOURCES` instead of `IMAGES`
7. Build and verify — everything works identically

### Phase 2: FramedImage component

1. Create `FramedImage.svelte`
2. Verify zoom=1 passthrough matches bare BaseImage output
3. Verify zoom>1 transform values with known inputs

### Phase 3: Component migrations (one at a time)

1. `Services.svelte` — simplest standalone usage
2. `AboutMe.svelte` — remove hardcoded `:global(.image--about-me)` CSS
3. `HomeIntro.svelte` — inside MouseTrackingMask
4. `CaptureEmotions.svelte` — same pattern
5. `ArtPiecePreview.svelte` — inside DepthWrapper
6. `ArtPieceDialog.svelte` — zoom=1 override
7. `ImageGallery.svelte` — inside DecorationWrapper + DepthWrapper
8. `ImagesSlider.svelte` + `HomeHero.svelte` — Svelte 5 migration included

### Phase 4: Focal point tuning

Set meaningful `focalPoint` and `zoom` values for all 24 images. Visual verification in browser.

## Files Summary

**New (2):**
- `src/lib/images.ts`
- `src/lib/components/base/FramedImage.svelte`

**Modified (14):**
- `scripts/process-images.ts`
- `src/lib/generated/constants.ts` (regenerated)
- `src/lib/generated/types.ts` (regenerated)
- `src/lib/types.ts`
- `src/lib/constants.ts`
- `src/lib/components/base/BaseImage.svelte`
- `src/lib/components/base/ImagesSlider.svelte`
- `src/lib/components/sections/AboutMe.svelte`
- `src/lib/components/sections/HomeIntro.svelte`
- `src/lib/components/sections/CaptureEmotions.svelte`
- `src/lib/components/sections/ImageGallery.svelte`
- `src/lib/components/sections/Services.svelte`
- `src/lib/components/sections/HomeHero.svelte`
- `src/lib/components/artpiece/ArtPiecePreview.svelte`
- `src/lib/components/artpiece/ArtPieceDialog.svelte`

## Verification

1. `npm run check` — type checking passes
2. `npm run dev` — visual verification of each section:
   - AboutMe: focal point matches previous `object-position: 50% 76%` crop
   - HomeHero: slider images frame correctly on hover
   - ArtPieceDialog: full artwork visible (zoom=1 override)
   - ImageGallery: abstract images framed in square containers
   - ArtPiecePreview: zoom works inside DepthWrapper parallax
3. Override test: pass `zoom={1}` and `zoom={3}` to FramedImage in dialog, verify behavior
4. Edge test: set focal point near corner (e.g., `{x: 0.1, y: 0.9}`) with high zoom, verify no blank space
