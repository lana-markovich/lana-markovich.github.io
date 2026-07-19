<script lang="ts">
	import { MediaQuery } from "svelte/reactivity";
	import BaseSection from "$lib/components/layout/BaseSection.svelte";
	import BaseBadge from "$lib/components/base/BaseBadge.svelte";
	import BaseNav from "$lib/components/base/BaseNav.svelte";
	import ImagesSlider from "$lib/components/base/ImagesSlider.svelte";
	import type { ImageEntry, ArtPiece } from "$lib/types";
	import { ART_PIECES } from "$lib/constants";
	import type { ArtPieceId } from "$lib/constants";
	import BaseButton from "$lib/components/base/BaseButton.svelte";

	/* Must stay in sync with the 60rem container query below: container ≤ 60rem ⟺ viewport ≤ 65rem */
	const isCompact = new MediaQuery("(max-width: 65rem)");

	const desktopHeroIds: ArtPieceId[] = [
		'particles-of-memory',
		'nostalgia',
		'isolation',
		'confusion',
		'do-not-look',
		'there-is-no-more-reality',
		'time-is-fleeting',
		'melancholy',
		'nothing',
		'portrait-1',
		'iris',
		'abstract-3',
		'deer',
	];

	const compactHeroIds: ArtPieceId[] = [
		'abstract-3',
		'iris',
		'nothing',
		'isolation',
		'deer',
		'particles-of-memory',
		'nostalgia',
		'confusion',
		'do-not-look',
		'there-is-no-more-reality',
		'time-is-fleeting',
		'melancholy',
		'portrait-1',
	];

	const heroIds = $derived(isCompact.current ? compactHeroIds : desktopHeroIds);

	const artworks: ArtPiece[] = heroIds.map(id => ART_PIECES[id]);
	const images = artworks.map(artwork => artwork.image);

	/* Default to the first badge of the current layout — it is always rendered,
	   so one badge is always active (a fixed id could fall outside the visible
	   slice, leaving nothing highlighted and every badge looking active). */
	let selectedImageId = $state<ImageEntry["id"] | null>(artworks[0].image.id);

	const isInverted = $derived(Boolean(selectedImageId));

	/* The section is bounded by min 31.25rem / max 100lvh (see styles). The probe
	   carries that same fill ceiling; fit as many badge rows as it allows.
	   Measured once in an effect on mount — effects run before first paint, so the
	   initial render never flashes the wrong count. Deliberately not re-measured on
	   resize: on mobile the viewport height shifts as the browser chrome
	   collapses/expands, and recomputing would make badges appear/disappear mid-scroll. */
	let probeEl = $state<HTMLDivElement>();
	let badgesEl = $state<HTMLUListElement>();
	let headingEl = $state<HTMLHeadingElement>();
	let navWrapperEl = $state<HTMLDivElement>();

	let badgeCount = $state(artworks.length);
	let gridCols = $state(3);

	const visibleArtworks = $derived(artworks.slice(0, badgeCount));
	const gridRows = $derived(Math.ceil((badgeCount + 1) / gridCols));

	function outerBlockSize(el: HTMLElement): number {
		const style = getComputedStyle(el);
		return el.offsetHeight + parseFloat(style.marginBlockStart) + parseFloat(style.marginBlockEnd);
	}

	function recomputeBadgeCount() {
		if (!probeEl || !badgesEl || !headingEl || !navWrapperEl) return;
		const container = badgesEl.closest(".container") as HTMLElement | null;
		const firstBadge = badgesEl.querySelector("li");
		if (!container || !firstBadge) return;

		const containerStyle = getComputedStyle(container);
		const contentAvailable = probeEl.offsetHeight
			- parseFloat(containerStyle.paddingBlockStart)
			- parseFloat(containerStyle.paddingBlockEnd);
		const badgesAvailable = contentAvailable - outerBlockSize(headingEl) - outerBlockSize(navWrapperEl);

		const badgesStyle = getComputedStyle(badgesEl);
		const gap = parseFloat(badgesStyle.rowGap) || 0;
		const rowHeight = firstBadge.offsetHeight;

		const rows = Math.max(1, Math.floor((badgesAvailable + gap) / (rowHeight + gap)));
		gridCols = badgesStyle.gridTemplateColumns.split(" ").length;
		/* −1 cell for the "View more" button */
		badgeCount = Math.min(artworks.length, Math.max(1, rows * gridCols - 1));
	}

	$effect(() => {
		recomputeBadgeCount();
		/* Fonts may still be loading on mount; re-measure once they're ready since
		   font metrics change the badge row height. Still part of page load. */
		document.fonts?.ready.then(() => recomputeBadgeCount());
	});
</script>

<BaseSection id="hero" class="home-hero"
>
	{#snippet prepend()}
		<ImagesSlider images={images} currentImage={selectedImageId}/>
	{/snippet}
	<div class="home-hero__height-probe" bind:this={probeEl}></div>
	<div class="home-hero__layout">
		<ul class="home-hero__badges" style="--rows-count: {gridRows};" bind:this={badgesEl}>
			{#each visibleArtworks as artwork (artwork.image.id)}
				<li
					class="home-hero__badge"
					class:home-hero__badge--is-active={artwork.image.id === selectedImageId}
				>
					<button
						type="button"
						class="home-hero__badge-btn"
						onmouseenter={() => { selectedImageId = artwork.image.id; }}
						onfocus={() => { selectedImageId = artwork.image.id; }}
						onclick={() => { selectedImageId = artwork.image.id; }}
					>
						<BaseBadge>
							{artwork.name} ({artwork.year})
							<svelte:fragment slot="text">
								{artwork.shortDescription}
							</svelte:fragment>
						</BaseBadge>
					</button>
				</li>
			{/each}
			<li class="home-hero__view-more-btn">
				<BaseButton
					href="#portfolio"
					appearance="link"
					variant={isInverted ? "white" : "black"}
				>
					View more
				</BaseButton>
			</li>
		</ul>

		<div class="home-hero__nav-wrapper" bind:this={navWrapperEl}>
			<BaseNav isInverted={isInverted}/>
		</div>

		<h1 class="heading heading--xl home-hero__heading {isInverted ? 'home-hero__heading--is-inverted' : ''}" bind:this={headingEl}>sviatlana markovich</h1>
	</div>
</BaseSection>

<style>
	:global(.home-hero) {
		min-block-size: 31.25rem;
		max-block-size: 100lvh;
		background-color: var(--black-200) !important;
	}

	:global(.home-hero .container) {
		padding-block-end: 2.5rem;
	}

	/* Explicit viewport-based height (the section's fill ceiling: min 31.25rem / max 100lvh)
	   rather than 100% — the probe measures how tall the section is allowed to be, while
	   the section itself is content-sized and may be shorter. 100lvh (large viewport) so
	   the one-time measurement isn't skewed by mobile browser chrome being expanded on load. */
	.home-hero__height-probe {
		position: absolute;
		inset-block-start: 0;
		inline-size: 0;
		block-size: max(100lvh, 31.25rem);
		visibility: hidden;
		pointer-events: none;
	}

	.home-hero__badges {
		display: grid;
		grid-auto-flow: column;
		grid-template-columns: var(--lines-columns-grid);
		grid-template-rows: repeat(var(--rows-count), 1fr);;
		row-gap: 5rem;
		width: 100%;
		justify-items: start;
	}

	.home-hero__view-more-btn {
		display: flex;
	}

	.home-hero__badge :global(.badge) {
		transition: opacity 0.7s ease;
	}


	.home-hero__badge-btn {
		all: unset;
		cursor: pointer;
		display: inline-flex;
	}

	.home-hero__nav-wrapper {
		position: relative;
		z-index: 2;
		margin-block: 7.5rem 1.5rem;
	}

	.home-hero__heading {
		transition: color 0.7s var(--easing-default);

		&.home-hero__heading--is-inverted {
			color: var(--black-200);
		}
	}
	/* One badge is always selected (default image shown), so its badge stays lit
	   while the rest dim — same behaviour on desktop and mobile, driven by the
	   persistent selection rather than transient :focus. */
	.home-hero__badges:has(.home-hero__badge--is-active) .home-hero__badge:not(.home-hero__badge--is-active) :global(.badge) {
		opacity: 0.2;
	}

	.home-hero__badge--is-active :global(.badge) {
		opacity: 1;
	}

	/* Tablets and below: container ≤ 60rem ⟺ viewport ≤ 65rem (see MediaQuery in script).
	   Keeps the desktop element order (badges → nav → heading), badges in 2 columns. */
	@media (width <= 65rem) {
		:global(.home-hero .container) {
			padding-block-start: 4rem;
		}

		.home-hero__badges {
			grid-auto-flow: row;
		}

		.home-hero__badges:has(.home-hero__badge--is-active) .home-hero__badge:not(.home-hero__badge--is-active) :global(.badge) {
			opacity: 0.35;
		}
	}

	@media (width <= 35rem) {
		:global(.home-hero .container) {
			padding-block-start: 2rem;
		}
		:global(.home-hero .badge) {
			min-inline-size: 11rem;
		}
		.home-hero__layout {
			display: flex;
			flex-direction: column;
		}

		.home-hero__heading {
			order: 1;
			align-self: center;
			margin-inline-end: 0;
		}

		.home-hero__nav-wrapper {
			order: 2;
			margin-block: 1.5rem 3rem;
		}

		.home-hero__badges {
			order: 3;
			grid-template-columns: 1fr;
			row-gap: 1.75rem;
		}

		.home-hero__badges > :nth-child(even) {
			justify-self: end;
		}
		.home-hero__badges > .home-hero__view-more-btn {
			justify-self: center;
		}
	}

</style>