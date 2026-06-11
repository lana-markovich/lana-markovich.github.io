# Design System

Reference for the tokens, components, and behavioral patterns that make up this portfolio. Written for future-me and AI assistants — terse, code-first, no aspirational entries.

## Philosophy

The system is intentionally narrow:

- **Monochrome palette** — `--black-800`, `--black-200`, `--white`. All "color" is opacity-mixed from `--black-800`.
- **One typeface** — `Jost` as a variable font, weights 100–900, loaded from `/src/assets/fonts/jost/Jost-VF.woff2`. No secondary face.
- **Container-query layout** — the hero heading sizes off `13.7cqw` against `BaseContainer` (which sets `container-type: inline-size`). Page-level typography is fixed `rem`.
- **One easing curve** — `cubic-bezier(0.645, 0.045, 0.355, 1)` (`--easing-default`) for every transition. Durations cluster at `200ms`, `300ms`, `700ms`, and `800ms`.
- **Three-column grid** — `408 / 408 / 384` fr, expressed as `--lines-columns-grid`. Section vertical rhythm is `--container-padding-block` (7.5rem).

## Files

- [tokens.md](./tokens.md) — every CSS custom property in `src/assets/styles/variables.css`.
- [components.md](./components.md) — base + layout components and typography classes.
- [patterns.md](./patterns.md) — Svelte actions, animation helpers, effect wrappers.

## Cheat-sheet: when adding…

| Adding | Check first |
|---|---|
| A new color | [tokens.md § Color](./tokens.md#color) — usually `color-mix` from `--black-800` instead of a new raw value. |
| A new font size | [components.md § Typography classes](./components.md#typography-classes) — `.heading--*` / `.text` likely covers it. |
| A new section | `BaseSection` + `BaseContainer` ([components.md](./components.md)). The 3-column grid is `var(--lines-columns-grid)`. |
| A new animation | Reuse `--easing-default` and the existing utilities in [patterns.md](./patterns.md). |
| A scroll-driven effect | `scrollProgress` action — don't write a new scroll listener. |
| A mouse-driven effect | `createLerpAnimation()` for smoothing, then mirror the pattern in `DepthWrapper` / `MouseTrackingMask`. |
| A new dialog | `BaseDialog` — wraps `<dialog>` with the project's open/close transition. |

## Out of scope

- Section components (`src/lib/components/sections/`) are page-specific compositions and not cataloged here.
- Page components (`src/pages/`) are not part of the design system surface.
- Generated artifacts (`src/lib/generated/*`) are produced from images.
- Project-wide conventions (Svelte 5 specifics, build setup) live in [`CLAUDE.md`](../../CLAUDE.md). This doc does not duplicate them.
