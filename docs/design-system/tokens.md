# Tokens

Every custom property defined in `src/assets/styles/variables.css`. Values are verbatim from source. When in doubt, that file is the source of truth.

## Color

Raw scale — three values, nothing more.

| Token | Value | Notes |
|---|---|---|
| `--black-800` | `#2b2b2b` | Default text and dark surfaces. Not pure black. |
| `--black-200` | `#f1f1f1` | `BaseSection type="secondary"` background, hover background for `--white` button. |
| `--white` | `#ffffff` | Default section background, `BaseSection` default, light button. |

Semantic text aliases — prefer these for `color`:

| Token | Value | When |
|---|---|---|
| `--text-primary` | `var(--black-800)` | Body copy, headings. |
| `--text-secondary` | `color-mix(in srgb, --text-primary 80%, transparent)` | `text--secondary` class, secondary meta. |
| `--text-tertiary` | `color-mix(in srgb, --text-primary 20%, transparent)` | De-emphasized labels. |

Borders:

| Token | Value | When |
|---|---|---|
| `--border--primary` | `1px solid color-mix(in srgb, --black-800 50%, transparent)` | `DecorationWrapper` L-shaped frames. |
| `--border--secondary` | `1px solid color-mix(in srgb, --black-800 10%, transparent)` | `BaseContainer` vertical grid lines, sticky-nav bottom border. |

**Adding a new shade?** Use `color-mix(in srgb, var(--black-800) N%, transparent)` rather than a new hex value. Stay monochrome.

## Typography

Only the font stack lives as a token. The scale is class-based — see [components.md § Typography classes](./components.md#typography-classes).

| Token | Value |
|---|---|
| `--font-base` | `"Jost", system-ui, -apple-system, sans-serif` |
| `--font-heading` | `var(--font-base)` (intentionally aliased — single face) |

Font face is declared in `src/assets/styles/typography.css:1` as a variable font, weight range `100 900`, `font-display: swap`.

## Layout

Section / container dimensions:

| Token | Value | What |
|---|---|---|
| `--section-padding-inline` | `2.5rem` | Horizontal padding for every `BaseSection`. Also used by `StickyNav`. |
| `--container-padding-block` | `7.5rem` | Vertical rhythm inside `BaseContainer`. Every section breathes by this. |
| `--container-max-width` | `82.5rem` | Hard cap on `BaseContainer` width. |
| `--container-width` | `min(--container-max-width, 100vw - 2 * --section-padding-inline)` | Effective container width (used to derive column widths). |
| `--container-colunm-width` | `calc(--container-width * 408 / 1200)` | Width of one of the two left grid columns. *(Note: typo `colunm` preserved from source — search-sensitive.)* |
| `--container-to-screen-side-width` | `max(--section-padding-inline, (100vw - --container-width) / 2)` | Distance from container edge to viewport edge — used to flush decorations to the screen edge. |

Three-column grid:

| Token | Value | What |
|---|---|---|
| `--lines-columns-grid-column-count` | `3` | |
| `--lines-columns-grid` | `408fr 408fr 384fr` | The canonical 3-column grid used across sections and `CopyrightInfo`. |
| `--lines-columns-grid-nav` | `408fr 408fr 192fr 192fr` | Nav variant — last column split in two. Used by `BaseNav`. |

`BaseContainer` sets `container-type: inline-size` / `container-name: base-container`, so any descendant can size with `cqw` against the container. The hero heading (`heading--xl`) uses `13.7cqw`.

## Motion

| Token | Value | When |
|---|---|---|
| `--easing-default` | `cubic-bezier(0.645, 0.045, 0.355, 1)` | **Every** transition in the project. Do not introduce a different curve without good reason. |

Observed durations (not tokenized — kept as raw values in components):

| Duration | Where |
|---|---|
| `200ms` | `BaseDialog` open/close, `StickyNav` show/hide. |
| `300ms` | `BaseButton` color/transform, default `scrollColorReveal` letter fade. |
| `0.7s` (`700ms`) | `BaseNav` link color, `ImagesSlider` cross-fade. |
| `800ms` | `.heading::after` underline reveal (section heading). |

## Breakpoints

Declared but mostly unused — kept here for completeness.

| Token | Value | Notes |
|---|---|---|
| `--breakpoint-sm` | `50rem` | Not used. |
| `--breakpoint-md` | `70rem` | Not used. |
| `--breakpoint-lg` | `90rem` | |
| `--breakpoint-xl` | `120rem` | |

The site is desktop-first with no responsive overrides driven by these tokens. Layout adapts via container queries and `cqw` units instead. A separate `mobile/` directory exists in the repo root for the mobile track (untracked at time of writing).
