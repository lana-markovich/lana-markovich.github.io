# Components

Reusable building blocks under `src/lib/components/base/` and `src/lib/components/layout/`. Section components (`src/lib/components/sections/`) are page-specific compositions and are **not** cataloged here — read them directly when in doubt.

## Typography classes

Defined in `src/assets/styles/typography.css`. These are the de-facto text components — apply by class, not via a Svelte wrapper.

### Headings

| Class | Size | Weight | Line-height | Notes |
|---|---|---|---|---|
| `.heading--xl` | `13.7cqw` | 400 | 1em | Hero display. Container-query-sized against `BaseContainer`. Negative `margin-inline-end: -0.75cqw` to nudge optically. |
| `.heading--lg` | `2.75rem` | 400 | 1.16em | Section titles. `text-transform: uppercase`, `margin-block: 0 0.25em`. |
| `.heading--md` | `1.5rem` | 500 | 1.25em | Sub-section / mid-tier. `margin-block-end: 2em`. |
| `.heading--sm` | `1.25rem` | 400 | normal | |
| `.heading--xs` | `0.875rem` | 500 | normal | `text-transform: uppercase`. Used in `BaseBadge`. |

All `.heading--*` must be composed with the base `.heading` class. The base class sets `letter-spacing: -0.04em`, `color: var(--text-primary)`, and ships the `::after` pseudo-element used by the [section heading underline pattern](./patterns.md#section-heading-underline-reveal).

```html
<h2 class="heading heading--lg">Section title</h2>
```

### Body text

| Class | Size | Weight | Notes |
|---|---|---|---|
| `.text` | `1rem` | 300 | `line-height: 1.4em`, `letter-spacing: -0.03em`. |
| `.text--secondary` | inherit | 300 | Color shifts to `--text-secondary`. Compose with `.text`. |

### Utilities

| Class | Effect |
|---|---|
| `.line-height-normal` | `line-height: normal` |
| `.color-primary` / `.color-secondary` / `.color-tertiary` | Apply the corresponding `--text-*` token. |
| `.reveal-letter` | Letter starts at `opacity: 0.33`, transitions to `1` when `data-revealed="true"`. Driven by the `scrollColorReveal` action — [see patterns.md](./patterns.md#scrollcolorreveal). |

---

## Layout components

### `BasePage` — `src/lib/components/layout/BasePage.svelte`

Page shell. Renders `<main class="main">` with a default slot. Use once per page.

### `BaseSection` — `src/lib/components/layout/BaseSection.svelte`

Full-width section wrapper. Applies horizontal padding (`--section-padding-inline`) and wraps content in `BaseContainer`. Accepts a `prepend` snippet that renders **outside** the container — useful for full-bleed decorations.

```svelte
<BaseSection id="about" type="secondary">
  {#snippet prepend()}<FullBleedDecoration />{/snippet}
  <h2 class="heading heading--lg">About</h2>
</BaseSection>
```

| Prop | Type | Default | Notes |
|---|---|---|---|
| `type` | `'primary' \| 'secondary'` | `'primary'` | `secondary` swaps background to `--black-200`. |
| `class` | `string` | `''` | Merged into `class="section …"`. |
| `prepend` | `Snippet` | — | Rendered before `BaseContainer`, inside the section. |
| `children` | `Snippet` | — | Rendered inside `BaseContainer`. |

Spreads `...restProps` onto the `<section>` element (so `id`, `aria-*` etc. just work).

### `BaseContainer` — `src/lib/components/layout/BaseContainer.svelte`

Centered, max-width-capped wrapper. Sets `container-type: inline-size` (container name: `base-container`) so descendants can use `cqw`. Also renders the two faint vertical grid lines via `.section__lines::before/::after` at 408/1200 and 384/1200 of width.

No props — slot-only.

### `StickyNav` — `src/lib/components/layout/StickyNav.svelte`

Fixed top nav that appears once a target element scrolls out of view.

| Prop | Type | Default | Notes |
|---|---|---|---|
| `target` | `string` (CSS selector) | `'#hero'` | Observed via `IntersectionObserver`. Nav becomes visible when target is **not** intersecting. |

Has `aria-hidden` bound to its visibility. Backdrop is `rgba(255,255,255,0.85)` with `backdrop-filter: blur(8px)`.

---

## Base components

### `BaseButton` — `src/lib/components/base/BaseButton.svelte`

Renders `<button>` or `<a>` (when `href` is set). Two variants, tactile hover/focus states with multi-ring focus outline.

| Prop | Type | Default |
|---|---|---|
| `variant` | `'black' \| 'white'` | `'black'` |
| `href` | `string` | — (renders `<button>` if omitted) |
| `children` | `Snippet` | required |
| `...rest` | `HTMLButtonAttributes & HTMLAnchorAttributes` | spread onto the element |

Fixed dimensions: `min-inline-size: 11.375rem`, `min-block-size: 2.875rem`. Label is uppercase, underlined, with hover-extending underline offset.

### `BaseBadge` — `src/lib/components/base/BaseBadge.svelte`

Small white chip with inset shadow. Uses two slots: default (heading) and named `text`. Internally uses `.heading--xs` and `.text--secondary`.

```svelte
<BaseBadge>
  Charcoal
  <span slot="text">on paper</span>
</BaseBadge>
```

*Note: uses Svelte 4-style `<slot>` syntax, not snippets.*

### `BaseNav` — `src/lib/components/base/BaseNav.svelte`

Site nav. Hard-coded link list (`about me`, `services`, `portfolio`, `contacts`). Grid columns use `--lines-columns-grid-nav` (408/408/192/192).

| Prop | Type | Default |
|---|---|---|
| `isInverted` | `boolean` | `false` — inverted flips link color to `--black-200`. |

*Note: Svelte 4-style `export let`. Currently the canonical site nav — edit the `links` array in source to change menu.*

### `BaseDialog` — `src/lib/components/base/BaseDialog.svelte`

Native `<dialog>` with the project's open/close transition (200ms fade + slight translate/scale, dimmed backdrop). Bindable `open`. Click on the backdrop closes.

| Prop | Type | Default |
|---|---|---|
| `open` | `boolean` (bindable) | `false` |
| `children` | `Snippet` | required |

Uses `@starting-style` and `allow-discrete` for entry/exit animation against `display` and `overlay`.

### `BaseImage` — `src/lib/components/base/BaseImage.svelte`

Responsive `<picture>` with auto-generated srcset for WebP images in `/images/{name}-{size}.webp`. Pulls available sizes from `IMAGE_SOURCES` (generated). Lazy-loaded by default.

| Prop | Type | Default |
|---|---|---|
| `name` | `ImageId` | required |
| `alt` | `string` | required |
| `sizes` | `number[]` | from `IMAGE_SOURCES[name].sizes` |
| `loading` | `'lazy' \| 'eager'` | `'lazy'` |
| `sizesAttr` | `string` | `'100vw'` |
| `class` | `string` | `''` |

### `FramedImage` — `src/lib/components/base/FramedImage.svelte`

Like `BaseImage`, but takes a full `ImageEntry` and **cover-fits** the image inside its container, honoring `focalPoint` (0..1 normalized) and `zoom` (1..5). Clamps the offset so blank edges never show. Use when a container has a specific aspect ratio and you need framing control beyond `object-fit: cover`.

| Prop | Type | Default |
|---|---|---|
| `image` | `ImageEntry` | required |
| `focalPoint` | `FocalPoint` | `image.focalPoint` |
| `zoom` | `number` | `image.zoom` |
| `loading`, `sizesAttr`, `class` | as `BaseImage` | |

### `ImagesSlider` — `src/lib/components/base/ImagesSlider.svelte`

Absolute-positioned cross-fade slider for an array of `ImageEntry`. Active image is the one whose `id` matches `currentImage`. Each slide is overlaid with a 60% `--black-800` scrim. Transition: `opacity 0.7s ease`.

| Prop | Type | Default |
|---|---|---|
| `images` | `ImageEntry[]` | `[]` |
| `currentImage` | `ImageId \| null` | `null` |

### `CopyrightInfo` — `src/lib/components/base/CopyrightInfo.svelte`

Footer link row. Hard-coded entries (`Sviatlana Markovich © 2025`, `Privacy policy`, `Loyalty program regulation`). Grid uses `--lines-columns-grid`. Edit the `links` array in source to update.

### `DepthWrapper` — `src/lib/components/base/DepthWrapper.svelte`

Documented in [patterns.md § DepthWrapper](./patterns.md#depthwrapper) — it's a behavioral wrapper, not a UI component.

### `MouseTrackingMask` — `src/lib/components/base/MouseTrackingMask.svelte`

Documented in [patterns.md § MouseTrackingMask](./patterns.md#mousetrackingmask).

### `DecorationWrapper` — `src/lib/components/base/DecorationWrapper.svelte`

Renders children with an L-shaped corner border decoration anchored to one of the four corners. Uses `--border--primary` for the L.

| Prop | Type | Default |
|---|---|---|
| `decorationPosition` | `Corner` (`'top-left' \| 'top-right' \| 'bottom-left' \| 'bottom-right'`) | required |
| `width` | `string` (CSS length) | `'2.5em'` |
| `height` | `string` (CSS length) | `'8.125em'` |
| `class` | `string` | — |
| `children` | `Snippet` | required |
