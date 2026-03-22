<script lang="ts">
	import BaseSection from "$lib/components/layout/BaseSection.svelte";
	import BaseBadge from "$lib/components/base/BaseBadge.svelte";
	import BaseNav from "$lib/components/base/BaseNav.svelte";
	import ImagesSlider from "$lib/components/base/ImagesSlider.svelte";
	import type { ArtPiece, ImageItem } from "$lib/types";

	let hoveredImageId: ImageItem["id"] | null = null;

	const artworks: ArtPiece[] = [
		{
			name: "Melancholy",
			year: 2020,
			description: "100*70 cm, charcoal on paper",
			image: { id: "melancholy", alt: "Melancholy" }
		},
		{
			name: "nostalgia",
			year: 2020,
			description: "100*70 cm, mixed media",
			image: { id: "nostalgia", alt: "nostalgia" }
		},
		{
			name: "isolation",
			year: 2020,
			description: "100*140 cm, mixed media",
			image: { id: "isolation", alt: "isolation" }
		},
		{
			name: "confusion",
			year: 2020,
			description: "100*70 cm, charcoal on paper",
			image: { id: "confusion", alt: "confusion" }
		},
		{
			name: "what does it mean",
			year: 2020,
			description: "100*70 cm, mixed media",
			image: { id: "what-does-it-mean", alt: "what does it mean" }
		},
		{
			name: "there is no more reality",
			year: 2020,
			description: "100*70 cm, mixed media",
			image: { id: "there-is-no-more-reality", alt: "there is no more reality" }
		},
		{
			name: "time is fleeting",
			year: 2019,
			description: "70*50 cm, mixed media",
			image: { id: "time-is-fleeting", alt: "time is fleeting" }
		},
		{
			name: "reality doesn't exist",
			year: 2020,
			description: "100*70 cm, charcoal on paper",
			image: { id: "reality-doesnt-exist", alt: "reality doesn't exist" }
		},
		{
			name: "nothing",
			year: 2018,
			description: "100*140 cm, mixed media",
			image: { id: "nothing", alt: "nothing" }
		},
		{
			name: "forbidden fruit is the sweetest",
			year: 2015,
			description: "120*60 cm, mixed media",
			image: { id: "forbidden-fruit-is-the-sweetest", alt: "forbidden fruit is the sweetest" }
		},
		{
			name: "portrait 1",
			year: 2021,
			description: "100*70 cm, mixed media",
			image: { id: "portrait-1", alt: "portrait 1" }
		},
		{
			name: "portrait 2",
			year: 2022,
			description: "21*29,7 cm, pencil",
			image: { id: "portrait-2", alt: "portrait 2" }
		},
		{
			name: "anatomy 1",
			year: 2022,
			description: "21*29,7 cm, mixed media",
			image: { id: "anatomy-1", alt: "anatomy 1" }
		},
		{
			name: "anatomy 2",
			year: 2023,
			description: "21*29,7 cm, mixed media",
			image: { id: "anatomy-2", alt: "anatomy 2" }
		},
		{
			name: "deer",
			year: 2022,
			description: "140*200 cm, mixed media",
			image: { id: "deer", alt: "deer" }
		},
	];

	const images = artworks.map((artwork) => artwork.image);

</script>

<BaseSection type="secondary"
>
	<svelte:fragment slot="prepend">
		<ImagesSlider images={images} currentImage={hoveredImageId}/>
	</svelte:fragment>
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