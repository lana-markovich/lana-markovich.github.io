# Patterns

Behavioral utilities (Svelte actions, animation helpers) and effect wrappers that add behavior to content rather than render UI.

## Svelte actions

### `sectionHeading` — `src/lib/utilities/sectionHeading.ts`

Adds the `.section-heading` class to the bound element **while its nearest ancestor `<section>`'s vertical midpoint is above the viewport midpoint**, and removes it when scrolled back below. Internally syncs the section's `id` in/out of the `seenSections` store (`src/lib/stores/seenSections.svelte.ts`) via a shared rAF-throttled `scroll`/`resize` listener.

A single shared `IntersectionObserver` is reused across all bound elements; the registry auto-disposes when empty.

```svelte
<h2 class="heading heading--lg" use:sectionHeading>About</h2>
```

Other elements (e.g., nav links) can also react to `seenSections` directly to apply the same `.section-heading` class without using the action:

```svelte
<a class:section-heading={seenSections.has('about')} href="/#about">-about me</a>
```

Pair with the [section heading underline reveal](#section-heading-underline-reveal) pattern below.

### `scrollProgress` — `src/lib/utilities/scrollProgress.ts`

Reports element scroll progress (0–1) as the page scrolls past it. Optionally gated by a media query.

```svelte
<div use:scrollProgress={{ onProgress: (p) => console.log(p) }}>…</div>
```

| Param | Default | Notes |
|---|---|---|
| `onProgress` | required | Called with `0..1`. |
| `breakpoint` | — | CSS media query string. When provided and not matched, progress is forced to `0` and the scroll listener is detached. Use to disable on mobile. |
| `screenCoverage` | `1` | Fraction of viewport height used in the scroll-range calculation. Lower values delay start / extend end. |

Use this instead of writing a new `window.addEventListener('scroll', …)` — it handles `passive`, `ResizeObserver`, and breakpoint teardown for you.

### `scrollColorReveal` — `src/lib/utilities/scrollColorReveal.ts`

Splits the element's text into per-letter `<span class="reveal-letter">`s, then reveals them one at a time as the user scrolls past. Whitespace is preserved as text nodes (so word-break still works).

```svelte
<p class="text" use:scrollColorReveal={{ pxPerLetter: 12 }}>…</p>
```

| Param | Default | Notes |
|---|---|---|
| `pxPerLetter` | `10` (runtime `??` default; JSDoc on the interface says `8` — the JSDoc is stale) | Pixels of scroll required to reveal one letter. |
| `startThreshold` | `0.85` | Fraction of viewport height (from top) where the element's top must arrive for reveal to start. `1` = starts as soon as element appears; `0` = very late. |
| `transitionMs` | `300` | Per-letter fade duration. Written to `--reveal-letter-duration` on the host element. |

The `.reveal-letter` opacity transition is defined in `typography.css` and uses `--easing-default`.

### `dockEffect` — `src/lib/utilities/dockEffect.ts`

macOS-dock-style magnify-on-hover for the **children** of the bound element. Computes per-child scale based on horizontal distance from the cursor using a half-cosine falloff, and adds matching `margin-inline` so neighbors push apart smoothly. Caches child positions and re-caches on resize (not while hovering).

```svelte
<div class="art-thumbs" use:dockEffect={{ maxScale: 1.6 }}>
  {#each items as item}<Thumb {item} />{/each}
</div>
```

| Param | Default | Notes |
|---|---|---|
| `maxScale` | `1.4` | Scale factor at cursor center. |
| `affectedNeighbors` | `2` | Neighbors on each side affected. |
| `spreadFactor` | `15` | Extra `margin-inline` (px) per unit of scale above 1. |

Children must be transformable elements (no `display: contents`).

## Animation helpers

### `createLerpAnimation()` — `src/lib/utilities/lerpAnimation.ts`

Factory for a `requestAnimationFrame` loop that lerps a current position toward a target every frame. Used by `DepthWrapper` and `MouseTrackingMask` for cursor-following smoothing.

```ts
const t = createLerpAnimation({
  lerpFactor: 0.05,
  onUpdate: (x, y, z) => { /* assign to $state */ }
});
t.start();
t.updateTarget(targetX, targetY);
// later:
t.setCurrentPosition(0, 0);  // skip interpolation (useful on first frame)
t.stop();
```

| Method | Purpose |
|---|---|
| `start()` / `stop()` | Loop control. Safe to call repeatedly. |
| `updateTarget(x, y, z?)` | Update where the lerp is heading. |
| `setCurrentPosition(x, y, z?)` | Snap current to position (no interpolation). |
| `getCurrentPosition()` | Read current interpolated position. |

Lower `lerpFactor` = smoother / laggier. Defaults: `lerpFactor: 0.03`, all offsets `0`.

Standalone `lerp(start, end, factor)` is also exported for one-off interpolation.

## Effect wrappers

These live under `src/lib/components/base/` but their job is to add behavior to whatever they wrap, not to render visible UI. Documented here for that reason.

### `DepthWrapper` — `src/lib/components/base/DepthWrapper.svelte`

Wraps content with a 3D parallax/depth effect. Mouse moves over the wrapper translate the content opposite to the cursor (parallax), apply a slight rotateX/rotateY tilt toward the cursor, and translateZ "into the cave" based on radial distance. All driven by two `createLerpAnimation` instances. A hard-coded inset shadow renders above the content via `::before`.

| Prop | Type | Default |
|---|---|---|
| `parallax` | `boolean` | `true` — disables movement & scale when `false` (still renders perspective context). |
| `scale` | `number` | `1.11` — base scale of the content (provides headroom for parallax shifts without revealing edges). |
| `intensity` | `number` | `0.05` — multiplier on all axes. |
| `lerpFactor` | `number` | `0.03` |
| `perspective` | `number` (px) | `2000` |
| `class` | `string` | `''` |
| `children` | `Snippet` | required |

Note: `lerpFactor` is `untrack`-ed on construction — changing it reactively after mount has no effect.

### `MouseTrackingMask` — `src/lib/components/base/MouseTrackingMask.svelte`

Wraps content with a CSS `mask-image` window that follows the cursor. The mask is fixed-size (`maskSize` px square) and lerp-tracked. The wrapper itself is absolutely positioned (`inset: 0`) — place it inside a `position: relative` parent. You drive it by forwarding `mousemove` events to its exported `handleMouseMove`.

```svelte
<script>
  let mask;
</script>
<div class="parent" onmousemove={(e) => mask?.handleMouseMove(e)}>
  <MouseTrackingMask bind:this={mask} maskSize={500}>
    <!-- content visible through the mask -->
  </MouseTrackingMask>
</div>
```

| Prop | Default |
|---|---|
| `maskSize` | `600` (px) |
| `initialX` / `initialY` | `'50%'` |
| `maskImage` | `'linear-gradient(black, black)'` — replace with a radial gradient for a softer edge. |
| `class` | `''` |

`initialX`/`initialY` accept either `%` (positions the **top-left** of the mask via CSS `mask-position` math) or `px`.

### `FramedImage`

Covered in [components.md § FramedImage](./components.md#framedimage--srclibcomponentsbaseframedimagesvelte) — it's primarily a UI component, just with non-trivial focal-point / zoom layout math.

### `DecorationWrapper`

Covered in [components.md § DecorationWrapper](./components.md#decorationwrapper--srclibcomponentsbasedecorationwrappersvelte).

## Composition patterns

### Section heading underline reveal

The `.heading::after` pseudo-element is a `scaleX(0)` underline that grows to `scaleX(1)` over `800ms` with `--easing-default`, **only** when the `.section-heading` class is present. The `sectionHeading` action adds that class while the containing section's midpoint is above the viewport midpoint, and removes it when scrolled back below. Nav links use the same class via `seenSections.has(id)` (see the action docs above).

```svelte
<section id="about">
  <h2 class="heading heading--lg" use:sectionHeading>About</h2>
</section>
```

Required pieces:

1. The heading must have the base `.heading` class (provides the `::after`).
2. The `use:sectionHeading` action must be on the heading.
3. The heading must be a descendant of a `<section>` element. `BaseSection` qualifies.

### Scroll-revealed copy

Combine `scrollColorReveal` with `.text`. Letters fade from 0.33 → 1 as the user scrolls past.

```svelte
<p class="text" use:scrollColorReveal>
  Long paragraph that fades in letter by letter.
</p>
```

The action mutates the DOM (splits text into spans). Re-renders that replace the text content will reset the state — keep the source text static across reactive updates, or remount the element.
