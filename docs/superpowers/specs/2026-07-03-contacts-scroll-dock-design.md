# Contacts Section: Vertical Scroll-Driven Dock on Mobile/Tablet

## Problem

The contacts section (`Footer.svelte`) renders five contact icons in a horizontal flex row with a macOS-style dock effect (`dockEffect.ts`) that scales icons near the mouse cursor. Two problems on mobile/tablet:

1. The dock effect is mouse-driven — it does nothing on touch devices, so the section has no animation at all.
2. There are no compact styles: five 8rem icons in a row overflow/squish on narrow screens.

## Solution

Below the site's compact breakpoint (`65rem`), lay the icons out in a vertical column and drive the dock effect by scroll position instead of the cursor: the icon closest to the viewport's vertical midline scales up, neighbors scale by the same cosine falloff used on desktop. Above the breakpoint, nothing changes.

Both behaviors are gated by a media query so exactly one is active at any width, and each resets its transforms when its query stops matching.

## Components

### 1. Shared scale helper — `src/lib/utilities/dockScale.ts` (new)

Move `getScale` out of `dockEffect.ts` into a small shared module:

```typescript
export function getScale(distance: number, maxScale: number, maxDistance: number): number {
	if (maxDistance <= 0) return 1;
	if (Math.abs(distance) >= maxDistance) return 1;
	const ratio = distance / maxDistance;
	return 1 + (maxScale - 1) * (1 + Math.cos(ratio * Math.PI)) / 2;
}
```

`dockEffect.ts` and the new `scrollDockEffect.ts` both import it.

### 2. `dockEffect.ts` — add `breakpoint` param

New optional param `breakpoint?: string` (media query string), following the `scrollProgress` pattern:

- If provided, a `matchMedia` listener toggles the effect: mouse listeners are only attached while the query matches.
- When the query stops matching, listeners are removed and child transforms/margins are reset (existing `handleMouseLeave` already does this).
- If omitted, behavior is unchanged (always active).

### 3. `scrollDockEffect.ts` — new Svelte action

`src/lib/utilities/scrollDockEffect.ts`, params:

```typescript
export interface ScrollDockEffectParams {
	/** Maximum scale factor for the icon at the viewport midline (default: 1.4) */
	maxScale?: number;
	/** Number of neighboring items affected on each side (default: 2) */
	affectedNeighbors?: number;
	/** Extra vertical margin in px added per unit of scale above 1.0 (default: 15) */
	spreadFactor?: number;
	/** Media query — effect is only active while it matches (e.g. "(max-width: 65rem)") */
	breakpoint?: string;
}
```

Behavior:

- On scroll (rAF-throttled, `passive: true`, same pattern as `scrollColorReveal.onScroll`) and on resize (`ResizeObserver` on the element), for each child:
  - `distance = childCenterY - window.innerHeight / 2` using live `getBoundingClientRect()` (children move as siblings scale, so positions are read fresh each frame; five children per frame is cheap).
  - `scale = getScale(distance, maxScale, maxDistance)` where `maxDistance = avgChildHeight * (affectedNeighbors + 0.5)` — the vertical analogue of the hover version.
  - Apply `child.style.transform = scale(...)` and `child.style.marginBlock` for spread.
- `breakpoint` gating identical to `dockEffect`: listeners attached/detached on media-query change; transforms and margins reset when deactivated.
- Runs one pass on activation so the state is correct before the first scroll.
- Standard action `update`/`destroy` cleanup, matching the existing utilities.

Feedback loop note: scaling a child changes sibling positions, which changes next frame's measurement. The cosine curve is continuous and scroll input is monotonic during a gesture, so this settles rather than oscillates — same approach as the hover version's `margin-inline` spread. Verify visually.

### 4. `Footer.svelte`

- Add `use:scrollDockEffect={{ maxScale: 1.5, affectedNeighbors: 2, spreadFactor: 20, breakpoint: "(max-width: 65rem)" }}` on `.contacts-section` alongside the existing `dockEffect`, which gets `breakpoint: "(min-width: 65.0625rem)"` so hover is desktop-only.
- CSS in `@media (width <= 65rem)`:
  - `.contacts-section`: `flex-direction: column; align-items: center;` with a gap between icons (`gap: 2.5rem` starting point, tune visually).
  - Icons stay `8rem`; `margin-block-end` of the section reduced to fit compact spacing (tune visually).
  - Existing `transition: transform 0.5s ease-out` stays and smooths the scroll-driven scaling; the `:hover` fast-transition rule is irrelevant on touch and needs no change.

## Files Summary

**New (2):** `src/lib/utilities/dockScale.ts`, `src/lib/utilities/scrollDockEffect.ts`

**Modified (2):** `src/lib/utilities/dockEffect.ts`, `src/lib/components/sections/Footer.svelte`

## Out of Scope

- Desktop appearance/behavior (unchanged above 65rem).
- The commented-out `CopyrightInfo` and the `footer__name` heading.

## Verification

1. `npm run check` passes.
2. `npm run dev`, browser at mobile width (≤65rem): icons stack vertically and centered; scrolling through the section scales the icon nearest the viewport midline; effect reverses when scrolling back up.
3. Desktop width: hover dock behaves exactly as before; no scroll-driven scaling.
4. Resize across the 65rem boundary in both directions: layouts switch cleanly, no stuck transforms or margins.
