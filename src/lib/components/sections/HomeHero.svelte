<script lang="ts">
	import BaseSection from "$lib/components/layout/BaseSection.svelte";
	import BaseBadge from "$lib/components/base/BaseBadge.svelte";
	import BaseNav from "$lib/components/base/BaseNav.svelte";
	import ImagesSlider from "$lib/components/base/ImagesSlider.svelte";
	import type { ImageItem } from "$lib/types";
	import type { ImageId } from "$lib/types";
	import { ART_PIECES } from "$lib/constants";

	let hoveredImageId: ImageItem["id"] | null = null;

	const heroIds: ImageId[] = [
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

	const artworks = heroIds.map(id => ART_PIECES[id]!);
	const images = artworks.map(artwork => artwork.image);

</script>

<BaseSection type="secondary"
>
	{#snippet prepend()}
		<ImagesSlider images={images} currentImage={hoveredImageId}/>
	{/snippet}
	<ul class="home-hero__badges" style="--items-count: {artworks.length};">
		{#each artworks as artwork}
			<li class="home-hero__badge">
				<button
					type="button"
					class="home-hero__badge-btn"
					on:mouseenter={(e) => { (e.currentTarget as HTMLButtonElement).focus({ preventScroll: true }); }}
					on:mouseleave={(e) => { (e.currentTarget as HTMLButtonElement).blur(); }}
					on:focus={() => { hoveredImageId = artwork.image.id; }}
					on:blur={() => { hoveredImageId = null; }}
				>
					<BaseBadge>
						{artwork.name} ({artwork.year})
						<svelte:fragment slot="text">
							{artwork.description}
						</svelte:fragment>
					</BaseBadge>
				</button>
			</li>
		{/each}
	</ul>

	<div class="home-hero__nav-wrapper">
		<BaseNav isInverted={Boolean(hoveredImageId)}/>
	</div>

	<h1 class="heading home-hero__heading {Boolean(hoveredImageId) ? 'home-hero__heading--is-inverted' : ''}">Sviatlana Markovich</h1>
</BaseSection>

<style>
	.home-hero__badges {
		--rows-count: calc(var(--items-count) / var(--lines-columns-grid-column-count));

		display: grid;
		grid-auto-flow: column;
		grid-template-columns: var(--lines-columns-grid);
		grid-template-rows: repeat(var(--rows-count), 1fr);;
		row-gap: 5rem;
		width: 100%;
	}

	.home-hero__badge :global(.badge) {
		transition: opacity 0.7s ease;
	}

	.home-hero__badges:has(.home-hero__badge-btn:focus) .home-hero__badge-btn:not(:focus) :global(.badge) {
		opacity: 0.2;
	}

	.home-hero__badge-btn {
		all: unset;
		cursor: pointer;
		display: inline-flex;
	}

	.home-hero__nav-wrapper {
		margin-block: 7.5rem 1.5rem;
	}

	.home-hero__heading {
		font-size: 12.75cqw;
		font-weight: 400;
		line-height: 1;
		margin: 0;
		transition: color 0.7s ease;
		margin-inline-end: -0.75cqw;
		&.home-hero__heading--is-inverted {
			color: var(--black-200);
		}
	}
</style>