# FramedImage Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add data-driven focal point + zoom framing for all images, replacing ad-hoc CSS overrides with a central IMAGES registry and a FramedImage component.

**Architecture:** Auto-generated `IMAGE_SOURCES` provides `id` + `sizes`. A manual `IMAGES` registry in `src/lib/images.ts` enriches each entry with `alt`, `focalPoint`, `zoom`. A new `FramedImage` component wraps `BaseImage`, applying CSS `translate + scale` to center the focal point in the frame. At `zoom=1` it passes through to bare `BaseImage` with zero overhead.

**Tech Stack:** Svelte 5, TypeScript, CSS transforms

**Spec:** `docs/superpowers/specs/2026-03-30-framed-image-design.md`

---

### Task 1: Rename auto-generated IMAGES to IMAGE_SOURCES

**Files:**
- Modify: `scripts/process-images.ts:121-133`
- Regenerated: `src/lib/generated/constants.ts`
- Regenerated: `src/lib/generated/types.ts`

- [ ] **Step 1: Update the generation script**

In `scripts/process-images.ts`, change the `generateTypeFiles` function to output `IMAGE_SOURCES` instead of `IMAGES`:

```typescript
// scripts/process-images.ts — inside generateTypeFiles(), lines 121-133

// Change line 123 from:
export const IMAGES = {
// to:
export const IMAGE_SOURCES = {

// Change line 130 from:
import type { IMAGES } from './constants.js';
// to:
import type { IMAGE_SOURCES } from './constants.js';

// Change line 132 from:
export type ImageId = keyof typeof IMAGES;
// to:
export type ImageId = keyof typeof IMAGE_SOURCES;
```

- [ ] **Step 2: Regenerate the files**

Run: `npx tsx scripts/process-images.ts`

Expected: The script processes images and regenerates `src/lib/generated/constants.ts` (with `IMAGE_SOURCES`) and `src/lib/generated/types.ts` (referencing `IMAGE_SOURCES`).

- [ ] **Step 3: Update BaseImage import**

In `src/lib/components/base/BaseImage.svelte`, change line 3:

```svelte
<!-- Before -->
import { IMAGES } from '$lib/generated/constants.js';

<!-- After -->
import { IMAGE_SOURCES } from '$lib/generated/constants.js';
```

And update the usage on line 16:

```svelte
<!-- Before -->
const sizes = $derived(sizesProp ?? [...IMAGES[name].sizes]);

<!-- After -->
const sizes = $derived(sizesProp ?? [...IMAGE_SOURCES[name].sizes]);
```

- [ ] **Step 4: Update constants.ts re-export**

In `src/lib/constants.ts`, line 3 currently does `export * from "./generated/constants"`. This now re-exports `IMAGE_SOURCES` instead of `IMAGES`. No code change needed — the wildcard re-export picks up the renamed constant automatically.

- [ ] **Step 5: Verify build**

Run: `npm run check`

Expected: All type checks pass. The only consumers of the generated `IMAGES` were `BaseImage.svelte` (updated in step 3) and the wildcard re-export in `constants.ts` (automatic).

- [ ] **Step 6: Commit**

```bash
git add scripts/process-images.ts src/lib/generated/ src/lib/components/base/BaseImage.svelte
git commit -m "refactor: rename generated IMAGES to IMAGE_SOURCES"
```

---

### Task 2: Add new types (FocalPoint, ImageEntry)

**Files:**
- Modify: `src/lib/types.ts`

- [ ] **Step 1: Add FocalPoint and ImageEntry, update ArtPiece**

Replace the `ImageItem` interface and update `ArtPiece` in `src/lib/types.ts`:

```typescript
// src/lib/types.ts — full file content after changes

import type { Snippet } from 'svelte';
import type { ImageId } from './generated/types.js';

export * from './generated/types'

export interface FocalPoint {
	x: number;  // 0..1
	y: number;  // 0..1
}

export interface ImageEntry {
	id: ImageId;
	alt: string;
	sizes: readonly number[];
	focalPoint: FocalPoint;
	zoom: number;  // 1..5
}

export interface ArtPiece {
	name: string;
	year?: number;
	shortDescription?: string;
	description?: string;
	image: ImageEntry;
	additionalImages?: ImageEntry[];
}

export type Corner = `${"top" | "bottom"}-${"left" | "right"}`;

export interface BaseImageProps {
	/** Base image name (without size suffix or extension) */
	name: ImageId;
	/** Alt text for accessibility */
	alt: string;
	/** Optional CSS class */
	class?: string;
	/** Available sizes (default: [2560, 1280, 720]) */
	sizes?: number[];
	/** Loading strategy */
	loading?: "lazy" | "eager";
	/** Sizes attribute for responsive images (e.g., "(min-width: 1280px) 50vw, 100vw") */
	sizesAttr?: string;
}

export interface MouseTrackingMaskProps {
	/** Size of the circular mask in pixels */
	maskSize?: number;
	/** Interpolation smoothness (0-1, lower = smoother) */
	lerpFactor?: number;
	/** Initial X position before mouse moves */
	initialX?: string;
	/** Initial Y position before mouse moves */
	initialY?: string;
	/** CSS mask-image gradient */
	maskImage?: string;
	/** Additional CSS class */
	class?: string;
}

export interface MouseTrackingMaskInstance {
	/** Handle mouse move events and update mask position */
	handleMouseMove: (event: MouseEvent) => void;
}

export interface DepthWrapperProps {
	/** Enable parallax effect (default: true) */
	parallax?: boolean;
	/** Content scale factor for zoom effect (default: 1.1) */
	scale?: number;
	/** Movement intensity - 0.1 = 10% of distance from center (default: 0.1) */
	intensity?: number;
	/** Interpolation smoothness - lower = smoother (default: 0.05) */
	lerpFactor?: number;
	/** Perspective distance in pixels for 3D depth (default: 1200) */
	perspective?: number;
	/** Additional CSS class */
	class?: string;
	/** Child content */
	children: Snippet;
}
```

The key changes are: `ImageItem` deleted, `FocalPoint` and `ImageEntry` added, `ArtPiece` uses `ImageEntry`.

- [ ] **Step 2: Verify build**

Run: `npm run check`

Expected: Type errors in `ImagesSlider.svelte` (imports `ImageItem`), `HomeHero.svelte` (imports `ImageItem`), and `constants.ts` (ART_PIECES inline objects don't match `ImageEntry`). These are expected and will be fixed in subsequent tasks.

- [ ] **Step 3: Commit**

```bash
git add src/lib/types.ts
git commit -m "refactor: replace ImageItem with ImageEntry, add FocalPoint type"
```

---

### Task 3: Create IMAGES registry

**Files:**
- Create: `src/lib/images.ts`
- Modify: `src/lib/constants.ts`

- [ ] **Step 1: Create the IMAGES registry**

Create `src/lib/images.ts` with all 24 images. All start at `focalPoint: {x: 0.5, y: 0.5}, zoom: 1.0` except `about-me` which gets `focalPoint: {x: 0.5, y: 0.76}` to match its current CSS `object-position: 50% 76%`:

```typescript
// src/lib/images.ts
import { IMAGE_SOURCES } from './generated/constants.js';
import type { ImageEntry } from './types.js';

export const IMAGES = {
	'about-me': {
		...IMAGE_SOURCES['about-me'],
		alt: 'Sviatlana Markovich portrait',
		focalPoint: { x: 0.5, y: 0.76 },
		zoom: 1.0,
	},
	'abstract-1': {
		...IMAGE_SOURCES['abstract-1'],
		alt: 'Abstract artwork 1',
		focalPoint: { x: 0.5, y: 0.5 },
		zoom: 1.0,
	},
	'abstract-2': {
		...IMAGE_SOURCES['abstract-2'],
		alt: 'Abstract artwork 2',
		focalPoint: { x: 0.5, y: 0.5 },
		zoom: 1.0,
	},
	'abstract-3': {
		...IMAGE_SOURCES['abstract-3'],
		alt: 'Abstract artwork 3',
		focalPoint: { x: 0.5, y: 0.5 },
		zoom: 1.0,
	},
	'anatomy-1': {
		...IMAGE_SOURCES['anatomy-1'],
		alt: 'Anatomy study 1',
		focalPoint: { x: 0.5, y: 0.5 },
		zoom: 1.0,
	},
	'anatomy-2': {
		...IMAGE_SOURCES['anatomy-2'],
		alt: 'Anatomy study 2',
		focalPoint: { x: 0.5, y: 0.5 },
		zoom: 1.0,
	},
	'capture-emotions': {
		...IMAGE_SOURCES['capture-emotions'],
		alt: 'Abstract digital art',
		focalPoint: { x: 0.5, y: 0.5 },
		zoom: 1.0,
	},
	'confusion': {
		...IMAGE_SOURCES['confusion'],
		alt: 'Confusion',
		focalPoint: { x: 0.5, y: 0.5 },
		zoom: 1.0,
	},
	'deer': {
		...IMAGE_SOURCES['deer'],
		alt: 'Deer painting',
		focalPoint: { x: 0.5, y: 0.5 },
		zoom: 1.0,
	},
	'forbidden-fruit-is-the-sweetest': {
		...IMAGE_SOURCES['forbidden-fruit-is-the-sweetest'],
		alt: 'Forbidden fruit is the sweetest',
		focalPoint: { x: 0.5, y: 0.5 },
		zoom: 1.0,
	},
	'intro': {
		...IMAGE_SOURCES['intro'],
		alt: 'Artist introduction background',
		focalPoint: { x: 0.5, y: 0.5 },
		zoom: 1.0,
	},
	'isolation': {
		...IMAGE_SOURCES['isolation'],
		alt: 'Isolation',
		focalPoint: { x: 0.5, y: 0.5 },
		zoom: 1.0,
	},
	'jacket-1-1': {
		...IMAGE_SOURCES['jacket-1-1'],
		alt: 'Hand-painted jacket front',
		focalPoint: { x: 0.5, y: 0.5 },
		zoom: 1.0,
	},
	'jacket-1-2': {
		...IMAGE_SOURCES['jacket-1-2'],
		alt: 'Hand-painted jacket back',
		focalPoint: { x: 0.5, y: 0.5 },
		zoom: 1.0,
	},
	'jacket-1-3': {
		...IMAGE_SOURCES['jacket-1-3'],
		alt: 'Hand-painted jacket detail',
		focalPoint: { x: 0.5, y: 0.5 },
		zoom: 1.0,
	},
	'melancholy': {
		...IMAGE_SOURCES['melancholy'],
		alt: 'Melancholy',
		focalPoint: { x: 0.5, y: 0.5 },
		zoom: 1.0,
	},
	'nostalgia': {
		...IMAGE_SOURCES['nostalgia'],
		alt: 'Nostalgia',
		focalPoint: { x: 0.5, y: 0.5 },
		zoom: 1.0,
	},
	'nothing': {
		...IMAGE_SOURCES['nothing'],
		alt: 'Nothing',
		focalPoint: { x: 0.5, y: 0.5 },
		zoom: 1.0,
	},
	'portrait-1': {
		...IMAGE_SOURCES['portrait-1'],
		alt: 'Portrait 1',
		focalPoint: { x: 0.5, y: 0.5 },
		zoom: 1.0,
	},
	'portrait-2': {
		...IMAGE_SOURCES['portrait-2'],
		alt: 'Portrait 2',
		focalPoint: { x: 0.5, y: 0.5 },
		zoom: 1.0,
	},
	'reality-doesnt-exist': {
		...IMAGE_SOURCES['reality-doesnt-exist'],
		alt: "Reality doesn't exist",
		focalPoint: { x: 0.5, y: 0.5 },
		zoom: 1.0,
	},
	'there-is-no-more-reality': {
		...IMAGE_SOURCES['there-is-no-more-reality'],
		alt: 'There is no more reality',
		focalPoint: { x: 0.5, y: 0.5 },
		zoom: 1.0,
	},
	'time-is-fleeting': {
		...IMAGE_SOURCES['time-is-fleeting'],
		alt: 'Time is fleeting',
		focalPoint: { x: 0.5, y: 0.5 },
		zoom: 1.0,
	},
	'what-does-it-mean': {
		...IMAGE_SOURCES['what-does-it-mean'],
		alt: 'What does it mean',
		focalPoint: { x: 0.5, y: 0.5 },
		zoom: 1.0,
	},
} as const satisfies Record<string, ImageEntry>;
```

- [ ] **Step 2: Update constants.ts — re-export IMAGES and update ART_PIECES**

Replace the full content of `src/lib/constants.ts`:

```typescript
// src/lib/constants.ts
import type { ArtPiece } from './types.js';
import { IMAGES } from './images.js';

export * from "./generated/constants";
export { IMAGES } from './images.js';

export const ART_PIECES = {
	'melancholy': {
		name: "Melancholy",
		year: 2020,
		shortDescription: "100*70 cm, charcoal on paper",
		image: IMAGES['melancholy'],
	},
	'nostalgia': {
		name: "nostalgia",
		year: 2020,
		shortDescription: "100*70 cm, mixed media",
		image: IMAGES['nostalgia'],
	},
	'isolation': {
		name: "isolation",
		year: 2020,
		shortDescription: "100*140 cm, mixed media",
		image: IMAGES['isolation'],
	},
	'confusion': {
		name: "confusion",
		year: 2020,
		shortDescription: "100*70 cm, charcoal on paper",
		image: IMAGES['confusion'],
	},
	'what-does-it-mean': {
		name: "what does it mean",
		year: 2020,
		shortDescription: "100*70 cm, mixed media",
		image: IMAGES['what-does-it-mean'],
	},
	'there-is-no-more-reality': {
		name: "there is no more reality",
		year: 2020,
		shortDescription: "100*70 cm, mixed media",
		image: IMAGES['there-is-no-more-reality'],
	},
	'time-is-fleeting': {
		name: "time is fleeting",
		year: 2019,
		shortDescription: "70*50 cm, mixed media",
		image: IMAGES['time-is-fleeting'],
	},
	'reality-doesnt-exist': {
		name: "reality doesn't exist",
		year: 2020,
		shortDescription: "100*70 cm, charcoal on paper",
		image: IMAGES['reality-doesnt-exist'],
	},
	'nothing': {
		name: "nothing",
		year: 2018,
		shortDescription: "100*140 cm, mixed media",
		image: IMAGES['nothing'],
	},
	'forbidden-fruit-is-the-sweetest': {
		name: "forbidden fruit is the sweetest",
		year: 2015,
		shortDescription: "120*60 cm, mixed media",
		image: IMAGES['forbidden-fruit-is-the-sweetest'],
	},
	'portrait-1': {
		name: "portrait 1",
		year: 2021,
		shortDescription: "100*70 cm, mixed media",
		image: IMAGES['portrait-1'],
	},
	'portrait-2': {
		name: "portrait 2",
		year: 2022,
		shortDescription: "21*29,7 cm, pencil",
		image: IMAGES['portrait-2'],
	},
	'anatomy-1': {
		name: "anatomy 1",
		year: 2022,
		shortDescription: "21*29,7 cm, mixed media",
		image: IMAGES['anatomy-1'],
	},
	'anatomy-2': {
		name: "anatomy 2",
		year: 2023,
		shortDescription: "21*29,7 cm, mixed media",
		image: IMAGES['anatomy-2'],
	},
	'deer': {
		name: "deer",
		year: 2022,
		shortDescription: "140*200 cm, mixed media",
		image: IMAGES['deer'],
	},
	'abstract-1': {
		name: "abstract-1",
		image: IMAGES['abstract-1'],
	},
	'abstract-2': {
		name: "abstract-2",
		image: IMAGES['abstract-2'],
	},
	'abstract-3': {
		name: "abstract-3",
		image: IMAGES['abstract-3'],
	},
	'jacket-1': {
		name: "The hand-painted jacket",
		year: 2024,
		shortDescription: "acrylic for custom",
		description: `
			<p>A hand-painted jacket, inspired by the work "The Great Wave" by the artist Utagawa Hiroshige. In the original print, Mount Fuji appears in the background, a sacred symbol of Japan.</p>
			<p>Despite the threatening wave, the sky remains calm and bright, reflecting the Zen idea of maintaining serenity even amid storms. The design of the jacket conveys this same message: staying calm and centered even in the face of life's difficulties.</p>
		`,
		image: IMAGES['jacket-1-1'],
		additionalImages: [IMAGES['jacket-1-2'], IMAGES['jacket-1-3']],
	}
} satisfies Record<string, ArtPiece>;

export type ArtPieceId = keyof typeof ART_PIECES;
```

- [ ] **Step 3: Verify build**

Run: `npm run check`

Expected: Type errors remain in `ImagesSlider.svelte` and `HomeHero.svelte` (they still import `ImageItem`). Everything else should pass.

- [ ] **Step 4: Commit**

```bash
git add src/lib/images.ts src/lib/constants.ts
git commit -m "feat: create IMAGES registry, update ART_PIECES to reference it"
```

---

### Task 4: Create FramedImage component

**Files:**
- Create: `src/lib/components/base/FramedImage.svelte`

- [ ] **Step 1: Create the component**

Create `src/lib/components/base/FramedImage.svelte`:

```svelte
<script lang="ts">
	import type { ImageEntry, FocalPoint } from '$lib/types';
	import BaseImage from './BaseImage.svelte';

	let {
		image,
		focalPoint: focalPointOverride,
		zoom: zoomOverride,
		class: className = '',
		loading = 'lazy',
		sizesAttr = '100vw',
	}: {
		image: ImageEntry;
		focalPoint?: FocalPoint;
		zoom?: number;
		class?: string;
		loading?: "lazy" | "eager";
		sizesAttr?: string;
	} = $props();

	const focalX = $derived(focalPointOverride?.x ?? image.focalPoint.x);
	const focalY = $derived(focalPointOverride?.y ?? image.focalPoint.y);
	const zoom = $derived(zoomOverride ?? image.zoom);

	const tx = $derived(
		zoom <= 1
			? 0
			: Math.max(-(zoom - 1) * 100, Math.min((0.5 - focalX * zoom) * 100, 0))
	);
	const ty = $derived(
		zoom <= 1
			? 0
			: Math.max(-(zoom - 1) * 100, Math.min((0.5 - focalY * zoom) * 100, 0))
	);
</script>

{#if zoom <= 1}
	<BaseImage
		name={image.id}
		alt={image.alt}
		class={className}
		sizes={[...image.sizes]}
		{loading}
		{sizesAttr}
	/>
{:else}
	<div
		class="framed-image {className}"
		style="--fi-tx: {tx}%; --fi-ty: {ty}%; --fi-zoom: {zoom};"
	>
		<BaseImage
			name={image.id}
			alt={image.alt}
			sizes={[...image.sizes]}
			{loading}
			{sizesAttr}
		/>
	</div>
{/if}

<style>
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
</style>
```

- [ ] **Step 2: Verify build**

Run: `npm run check`

Expected: No new errors from FramedImage (it's not imported anywhere yet). Existing errors in ImagesSlider/HomeHero from `ImageItem` removal remain.

- [ ] **Step 3: Commit**

```bash
git add src/lib/components/base/FramedImage.svelte
git commit -m "feat: add FramedImage component with focal point + zoom"
```

---

### Task 5: Migrate Services.svelte

**Files:**
- Modify: `src/lib/components/sections/Services.svelte`

- [ ] **Step 1: Replace BaseImage with FramedImage**

Update `src/lib/components/sections/Services.svelte`:

```svelte
<script lang="ts">
	import BaseSection from "$lib/components/layout/BaseSection.svelte";
	import FramedImage from "$lib/components/base/FramedImage.svelte";
	import { IMAGES } from "$lib/images";
</script>

<BaseSection class="services">
	<h2 class="heading heading--lg">Services</h2>
	<ol class="services__list">
		<li class="service">
			<header>
				<h3>Custom Paintings</h3>
			</header>
			<div class="service__main">
				<FramedImage
					class="service__image"
					image={IMAGES['deer']}
				/>
				<div class="service__text">
					<p class="text text--secondary">
						I bring interiors to life through custom hand-painted designs on furniture, walls, clothing,
						and various surfaces. From bold murals to delicate details.
					</p>
					<p class="text text--secondary">
						I transform everyday objects into unique art pieces
						that add personality and character to your space. Each project is tailored to complement your style
						and vision.
					</p>
				</div>
				<div class="service__tags">
					<p class="service__tag heading heading--lg">/wallart</p>
					<p class="service__tag heading heading--lg">/decor</p>
					<p class="service__tag heading heading--lg">/interior</p>
				</div>
			</div>
		</li>
	</ol>
</BaseSection>
```

The `<style>` block stays unchanged.

- [ ] **Step 2: Visual verification**

Run: `npm run dev`

Open the site in browser, scroll to Services section. The deer image should look identical to before (zoom=1.0 passthrough).

- [ ] **Step 3: Commit**

```bash
git add src/lib/components/sections/Services.svelte
git commit -m "refactor: migrate Services to FramedImage"
```

---

### Task 6: Migrate AboutMe.svelte

**Files:**
- Modify: `src/lib/components/sections/AboutMe.svelte`

- [ ] **Step 1: Replace BaseImage with FramedImage and remove hardcoded CSS**

Update `src/lib/components/sections/AboutMe.svelte`:

```svelte
<script lang="ts">
	import BaseSection from "$lib/components/layout/BaseSection.svelte";
	import DecorationWrapper from "$lib/components/base/DecorationWrapper.svelte";
	import FramedImage from "$lib/components/base/FramedImage.svelte";
	import { IMAGES } from "$lib/images";
</script>

<BaseSection type="secondary" class="about-me">
	<div class="about-me__container-inner">
		<h2 class="heading heading--md about-me__subheading">About me</h2>
		<h3 class="heading heading--lg about-me__heading">
			Master of Fine Arts —<br>
			Academy of Fine Arts in Venice
		</h3>

		<p class="text about-me__text">
			Began my journey at belarusian art college, later continuing my studies at the Academy of Fine Arts in Wrocław
			(Poland) before specializing in painting and graphics in Venice.
		</p>

		<div class="about-me__image-wrapper">
			<DecorationWrapper decorationPosition="bottom-left">
				<FramedImage image={IMAGES['about-me']} />
			</DecorationWrapper>
		</div>
	</div>
</BaseSection>
```

The `<style>` block: remove the `:global(.image--about-me)` block (lines 73-76). Everything else stays:

```css
<style>
	.about-me__subheading {
		margin-block-end: 2em;
		grid-area: subheading;
	}

	.about-me__heading {
		max-width: 28ch;
		grid-area: heading;
	}

	.about-me__text {
		grid-area: text;
		max-width: 45ch;
	}

	.about-me__container-inner {
		position: relative;
		display: grid;
		grid-template-columns: var(--lines-columns-grid);
		grid-template-areas: "subheading subheading image"
		                     "heading    heading    ."
		                     "text       text       .";
	}

	.about-me__image-wrapper {
		--min-height: calc(31rem + var(--container-padding-block));
		--max-height: calc(37.25rem + var(--container-padding-block));
		--fluid-height: clamp(
			var(--min-height),
			calc(var(--min-height) + (var(--max-height) - var(--max-height)) * ((100vw - var(--breakpoint-lg)) / (var(--breakpoint-xl) - var(--breakpoint-lg)))),
			var(--max-height)
		);

		grid-area: image;
		margin-top: calc(-1 * var(--container-padding-block));
		margin-right: calc(-1 * var(--container-to-screen-side-width));
		height: var(--fluid-height);
		max-height: var(--max-height);
		width: min(46.5rem, calc(var(--container-colunm-width) + var(--container-to-screen-side-width)));
	}
</style>
```

- [ ] **Step 2: Visual verification**

Run: `npm run dev`

Open the site, check the About Me section. The portrait image framing should match the previous `object-position: 50% 76%` crop. Since the about-me image currently has `zoom: 1.0` in the registry, it will passthrough — meaning the image won't have `object-fit: cover` applied. The `.about-me__image-wrapper` has explicit height constraints, so the image may display differently.

If the image doesn't fill the container properly, update `src/lib/images.ts` to set a zoom > 1 for `about-me` (start with `zoom: 1.2` and tune visually). This triggers FramedImage's framing mode with `object-fit: cover`.

- [ ] **Step 3: Commit**

```bash
git add src/lib/components/sections/AboutMe.svelte src/lib/images.ts
git commit -m "refactor: migrate AboutMe to FramedImage, remove hardcoded object-position CSS"
```

---

### Task 7: Migrate HomeIntro.svelte and CaptureEmotions.svelte

**Files:**
- Modify: `src/lib/components/sections/HomeIntro.svelte`
- Modify: `src/lib/components/sections/CaptureEmotions.svelte`

- [ ] **Step 1: Update HomeIntro.svelte**

Replace the script and template in `src/lib/components/sections/HomeIntro.svelte`:

```svelte
<script lang="ts">
	import BaseSection from "$lib/components/layout/BaseSection.svelte";
	import FramedImage from "$lib/components/base/FramedImage.svelte";
	import MouseTrackingMask from "$lib/components/base/MouseTrackingMask.svelte";
	import type { MouseTrackingMaskInstance } from "$lib/types";
	import { IMAGES } from "$lib/images";

	let mask: MouseTrackingMaskInstance;

	function handleMouseMove(event: MouseEvent) {
		mask?.handleMouseMove(event);
	}
</script>

<BaseSection class="home-intro" onmousemove={handleMouseMove}>
	{#snippet prepend()}
		<MouseTrackingMask bind:this={mask} initialX="50%" initialY="15%">
			<FramedImage image={IMAGES['intro']} />
		</MouseTrackingMask>
	{/snippet}

	<div class="home-intro__text-container">
		<p class="heading heading--lg home-intro__text">
			I create art across painting, graphics, and sculpture
		</p>
		<p class="heading heading--lg home-intro__text">
			exploring complex themes while preserving beauty in every piece.
		</p>
	</div>

</BaseSection>
```

The `<style>` block stays unchanged.

- [ ] **Step 2: Update CaptureEmotions.svelte**

Replace the script and template in `src/lib/components/sections/CaptureEmotions.svelte`:

```svelte
<script lang="ts">
	import BaseSection from "$lib/components/layout/BaseSection.svelte";
	import FramedImage from "$lib/components/base/FramedImage.svelte";
	import MouseTrackingMask from "$lib/components/base/MouseTrackingMask.svelte";
	import type { MouseTrackingMaskInstance } from "$lib/types";
	import { IMAGES } from "$lib/images";

	let mask: MouseTrackingMaskInstance;

	function handleMouseMove(event: MouseEvent) {
		mask?.handleMouseMove(event);
	}
</script>

<BaseSection type="secondary" class="capture-emotions" onmousemove={handleMouseMove}>
	{#snippet prepend()}
		<MouseTrackingMask bind:this={mask} initialX="20%" initialY="5%">
			<FramedImage image={IMAGES['capture-emotions']} />
		</MouseTrackingMask>
	{/snippet}

	<div class="capture-emotions__text-container">
		<p class="heading heading--lg capture-emotions__text">
			Through charcoal, pastel, and ink, I capture raw human emotions and inner states
		</p>
		<p class="heading heading--lg capture-emotions__text">
			translating psychological depth into visual narratives
		</p>
	</div>

</BaseSection>
```

The `<style>` block stays unchanged.

- [ ] **Step 3: Visual verification**

Run: `npm run dev`

Check both sections — the mouse tracking mask effect should work identically. Both images have zoom=1.0 (passthrough).

- [ ] **Step 4: Commit**

```bash
git add src/lib/components/sections/HomeIntro.svelte src/lib/components/sections/CaptureEmotions.svelte
git commit -m "refactor: migrate HomeIntro and CaptureEmotions to FramedImage"
```

---

### Task 8: Migrate ArtPiecePreview.svelte and ArtPieceDialog.svelte

**Files:**
- Modify: `src/lib/components/artpiece/ArtPiecePreview.svelte`
- Modify: `src/lib/components/artpiece/ArtPieceDialog.svelte`

- [ ] **Step 1: Update ArtPiecePreview.svelte**

Replace `BaseImage` with `FramedImage` in `src/lib/components/artpiece/ArtPiecePreview.svelte`:

```svelte
<script lang="ts">
	import DepthWrapper from "$lib/components/base/DepthWrapper.svelte";
	import FramedImage from "$lib/components/base/FramedImage.svelte";
	import BaseBadge from "$lib/components/base/BaseBadge.svelte";
	import ArtPieceButton from "$lib/components/artpiece/ArtPieceButton.svelte";
	import ArtPieceDialog from "$lib/components/artpiece/ArtPieceDialog.svelte";
	import type { ArtPiece } from "$lib/types";

	let { artPiece }: { artPiece: ArtPiece } = $props();

	let button: ArtPieceButton;
	let dialogOpen = $state(false);
</script>

<div class="art-piece-preview">
	<div
		class="art-piece-preview__image"
		role="figure"
		onclick={() => (dialogOpen = true)}
		onmouseenter={(e) => button.handleMouseEnter(e)}
		onmousemove={(e) => button.handleMouseMove(e)}
		onmouseleave={() => button.handleMouseLeave()}
	>
		<ArtPieceButton bind:this={button} />
		<DepthWrapper>
			<FramedImage image={artPiece.image} />
		</DepthWrapper>
	</div>
	<BaseBadge>
		{artPiece.name}{#if artPiece.year} ({artPiece.year}){/if}
		<svelte:fragment slot="text">
			{#if artPiece.shortDescription}
				{artPiece.shortDescription}
			{/if}
		</svelte:fragment>
	</BaseBadge>
</div>
<ArtPieceDialog {artPiece} bind:open={dialogOpen} />
```

The `<style>` block stays unchanged.

- [ ] **Step 2: Update ArtPieceDialog.svelte with zoom=1 override**

Replace `BaseImage` with `FramedImage` in `src/lib/components/artpiece/ArtPieceDialog.svelte`. Use `zoom={1}` to show the full artwork:

```svelte
<script lang="ts">
	import BaseDialog from "$lib/components/base/BaseDialog.svelte";
	import FramedImage from "$lib/components/base/FramedImage.svelte";
	import type { ArtPiece } from "$lib/types";

	interface Props {
		artPiece: ArtPiece;
		open?: boolean;
	}

	let { artPiece, open = $bindable(false) }: Props = $props();
</script>

<BaseDialog bind:open>
	<div class="art-piece-dialog">
		<button class="art-piece-dialog__close" onclick={() => (open = false)}>×</button>
		<div class="art-piece-dialog__images">
			<FramedImage image={artPiece.image} zoom={1} loading="eager" />
		</div>
		<div class="art-piece-dialog__content">
			<header class="art-piece-dialog__header">
				<h2 class="art-piece-dialog__heading heading heading--lg">
					{artPiece.name}{#if artPiece.year}&nbsp;({artPiece.year}){/if}
				</h2>
				{#if artPiece.shortDescription}
					<p class="art-piece-dialog__short-description text--secondary">{artPiece.shortDescription}</p>
				{/if}
			</header>
			{#if artPiece.description}
				<!-- eslint-disable-next-line svelte/no-at-html-tags -->
				<div class="text art-piece-dialog__description">{@html artPiece.description}</div>
			{/if}
		</div>
	</div>
</BaseDialog>
```

The `<style>` block stays unchanged.

- [ ] **Step 3: Visual verification**

Run: `npm run dev`

Check: Portfolio section preview card should look identical. Click on it — the dialog should show the full artwork (zoom=1 override).

- [ ] **Step 4: Commit**

```bash
git add src/lib/components/artpiece/ArtPiecePreview.svelte src/lib/components/artpiece/ArtPieceDialog.svelte
git commit -m "refactor: migrate ArtPiecePreview and ArtPieceDialog to FramedImage"
```

---

### Task 9: Migrate ImageGallery.svelte

**Files:**
- Modify: `src/lib/components/sections/ImageGallery.svelte`

- [ ] **Step 1: Replace BaseImage with FramedImage**

Update imports and template in `src/lib/components/sections/ImageGallery.svelte`. Change line 5 and the template:

```svelte
<script lang="ts">
	import BaseSection from "$lib/components/layout/BaseSection.svelte";
	import DecorationWrapper from "$lib/components/base/DecorationWrapper.svelte";
	import DepthWrapper from "$lib/components/base/DepthWrapper.svelte";
	import FramedImage from "$lib/components/base/FramedImage.svelte";
	import { scrollProgress } from "$lib/utilities/scrollProgress";
	import { createLerpAnimation } from "$lib/utilities/lerpAnimation";
	import { onMount } from "svelte";
	import type { Corner, ArtPiece } from "$lib/types";
	import { ART_PIECES } from "$lib/constants";
	import type { ArtPieceId } from "$lib/constants";

	interface GalleryItem extends ArtPiece {
		decorationPosition: Corner;
	}

	const galleryConfig: { id: ArtPieceId; decorationPosition: Corner }[] = [
		{ id: 'abstract-1', decorationPosition: 'top-right' },
		{ id: 'abstract-2', decorationPosition: 'bottom-left' },
		{ id: 'abstract-3', decorationPosition: 'top-left' },
	];

	const items: GalleryItem[] = galleryConfig.map(({ id, decorationPosition }) => ({
		...ART_PIECES[id],
		decorationPosition,
	}));

	let wrapperEl: HTMLDivElement;
	let imagesEl: HTMLDivElement;
	let wrapperWidth = $state(0);
	let contentWidth = $state(0);
	let progress = $state(0);

	const scrollTracking = createLerpAnimation({
		lerpFactor: 0.03,
		onUpdate: (x) => (progress = x)
	});

	onMount(() => {
		scrollTracking.start();
		return () => scrollTracking.stop();
	});

	$effect(() => {
		const observer = new ResizeObserver((entries) => {
			for (const entry of entries) {
				const width = entry.contentRect.width;
				if (entry.target === wrapperEl) wrapperWidth = width;
				else if (entry.target === imagesEl) contentWidth = width;
			}
		});
		if (wrapperEl) observer.observe(wrapperEl);
		if (imagesEl) observer.observe(imagesEl);
		return () => observer.disconnect();
	});
</script>

<div use:scrollProgress={{
	screenCoverage: 0.8,
	onProgress: (p) => scrollTracking.updateTarget(p, 0) }
}>
	<BaseSection
		type="primary"
		class="image-gallery"
		style="--wrapper-width: {wrapperWidth}px; --content-width: {contentWidth}px; --scroll-progress: {progress}"
	>
		<div class="image-gallery__images-wrapper" bind:this={wrapperEl}>
			<div class="image-gallery__images" bind:this={imagesEl}>
				{#each items as item}
					<div class="image-gallery__image-wrapper">
						<DecorationWrapper decorationPosition={item.decorationPosition}>
							<DepthWrapper>
								<FramedImage image={item.image} />
							</DepthWrapper>
						</DecorationWrapper>
					</div>
				{/each}
			</div>
		</div>
	</BaseSection>
</div>
```

The `<style>` block stays unchanged.

- [ ] **Step 2: Visual verification**

Run: `npm run dev`

Scroll to the gallery section. The three abstract images should display in their square containers with the parallax scroll effect. All have zoom=1.0 so FramedImage passes through.

- [ ] **Step 3: Commit**

```bash
git add src/lib/components/sections/ImageGallery.svelte
git commit -m "refactor: migrate ImageGallery to FramedImage"
```

---

### Task 10: Migrate ImagesSlider.svelte and HomeHero.svelte

**Files:**
- Modify: `src/lib/components/base/ImagesSlider.svelte`
- Modify: `src/lib/components/sections/HomeHero.svelte`

- [ ] **Step 1: Update ImagesSlider to use FramedImage and Svelte 5 $props()**

Replace the full content of `src/lib/components/base/ImagesSlider.svelte`:

```svelte
<script lang="ts">
	import FramedImage from "$lib/components/base/FramedImage.svelte";
	import type { ImageEntry, ImageId } from "$lib/types";

	let {
		images = [],
		currentImage = null,
	}: {
		images: ImageEntry[];
		currentImage: ImageId | null;
	} = $props();
</script>

<div class="images-slider">
	{#each images as image (image.id)}
		<FramedImage
			image={image}
			class={`images-slider__image ${image.id === currentImage ? 'images-slider__image--is-active' : 'images-slider__image--is-hidden'}`}
		/>
	{/each}
</div>

<style>
	.images-slider {
		display: flex;
		justify-content: center;
		align-items: center;
		position: absolute;
		inset: 0;
		z-index: 0;
		overflow: hidden;
		:global(.images-slider__image) {
			transition: opacity 0.7s ease;
			opacity: 0;
			position: absolute;
			max-height: unset;
			&::before {
				content: '';
				display: block;
				position: absolute;
				background-color: var(--black-800);
				opacity: 0.6;
				inset: 0;
				z-index: 2;
			}
		}
		:global(.images-slider__image--is-active) {
			opacity: 1;
		}
	}
</style>
```

- [ ] **Step 2: Update HomeHero.svelte imports**

Update `src/lib/components/sections/HomeHero.svelte` — change `ImageItem` to `ImageEntry`:

```svelte
<script lang="ts">
	import BaseSection from "$lib/components/layout/BaseSection.svelte";
	import BaseBadge from "$lib/components/base/BaseBadge.svelte";
	import BaseNav from "$lib/components/base/BaseNav.svelte";
	import ImagesSlider from "$lib/components/base/ImagesSlider.svelte";
	import type { ImageEntry, ArtPiece } from "$lib/types";
	import { ART_PIECES } from "$lib/constants";
	import type { ArtPieceId } from "$lib/constants";

	let hoveredImageId: ImageEntry["id"] | null = null;

	const heroIds: ArtPieceId[] = [
		'melancholy',
		'nostalgia',
		'isolation',
		'confusion',
		'what-does-it-mean',
		'there-is-no-more-reality',
		'time-is-fleeting',
		'reality-doesnt-exist',
		'nothing',
		'forbidden-fruit-is-the-sweetest',
		'portrait-1',
		'portrait-2',
		'anatomy-1',
		'anatomy-2',
		'deer',
	];

	const artworks: ArtPiece[] = heroIds.map(id => ART_PIECES[id]);
	const images = artworks.map(artwork => artwork.image);

</script>
```

The rest of the template and `<style>` block stay unchanged.

- [ ] **Step 3: Verify build**

Run: `npm run check`

Expected: All type errors resolved. Clean build.

- [ ] **Step 4: Visual verification**

Run: `npm run dev`

Check the hero section — hover over art piece badges, images should slide in/out with the opacity transition.

- [ ] **Step 5: Commit**

```bash
git add src/lib/components/base/ImagesSlider.svelte src/lib/components/sections/HomeHero.svelte
git commit -m "refactor: migrate ImagesSlider to FramedImage, upgrade to Svelte 5 props"
```

---

### Task 11: Full build verification

- [ ] **Step 1: Type check**

Run: `npm run check`

Expected: All checks pass with zero errors.

- [ ] **Step 2: Production build**

Run: `npm run build`

Expected: Build completes successfully.

- [ ] **Step 3: Full visual walkthrough**

Run: `npm run dev`

Walk through every section in order:
1. **HomeHero** — hover badges, images appear/disappear
2. **HomeIntro** — mouse tracking mask works on intro image
3. **AboutMe** — portrait is cropped to match previous framing
4. **ImageGallery** — three abstract images in square containers with parallax scroll
5. **CaptureEmotions** — mouse tracking mask works
6. **Services** — deer painting displays correctly
7. **Portfolio/ArtPiecePreview** — jacket preview card with depth effect
8. **ArtPieceDialog** — click preview, full artwork visible (zoom=1 override)

- [ ] **Step 4: Commit (if any fixes were needed)**

```bash
git add -A
git commit -m "fix: visual adjustments after FramedImage migration"
```

---

### Task 12: Focal point tuning (Phase 4)

This task requires visual judgment — open each image and set appropriate `focalPoint` and `zoom` values in `src/lib/images.ts`.

**File:**
- Modify: `src/lib/images.ts`

- [ ] **Step 1: Tune about-me image**

The about-me image is the most critical — it had explicit CSS framing before. Open `npm run dev`, navigate to About Me section.

The image wrapper has a constrained height. With `zoom: 1.0` (passthrough), the image may not fill the container with `object-fit: cover`. If it doesn't fill properly, set `zoom` to a value > 1 (start with 1.2) in `src/lib/images.ts`:

```typescript
'about-me': {
    ...IMAGE_SOURCES['about-me'],
    alt: 'Sviatlana Markovich portrait',
    focalPoint: { x: 0.5, y: 0.76 },
    zoom: 1.2,  // tune this value visually
},
```

Refresh and compare with the previous framing. Adjust `zoom` until the crop matches.

- [ ] **Step 2: Tune remaining images**

Go through each image in the IMAGES registry and set meaningful focal point and zoom values based on the image content. Prioritize:
- Art pieces displayed in the hero slider (they fill the full viewport)
- Art pieces with clear subjects (portraits, anatomy studies)
- The jacket images

For images where the subject is centered and no zoom is needed, leave at `focalPoint: {x: 0.5, y: 0.5}, zoom: 1.0`.

- [ ] **Step 3: Test edge clamping**

Temporarily set one image to an extreme focal point (e.g., `{x: 0.1, y: 0.9}`) with `zoom: 3`. Verify no blank space appears at the edges. Reset after testing.

- [ ] **Step 4: Commit**

```bash
git add src/lib/images.ts
git commit -m "feat: set focal point and zoom values for all images"
```
