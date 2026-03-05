<script lang="ts">
	import BaseSection from "$lib/components/layout/BaseSection.svelte";
	import BaseBadge from "$lib/components/base/BaseBadge.svelte";
	import BaseNav from "$lib/components/base/BaseNav.svelte";
	import ImagesSlider from "$lib/components/base/ImagesSlider.svelte";
	import type { ArtPiece } from "$lib/types";

	let hoveredIndex: string | null = null;

	const artworks: ArtPiece[] = [
		{
			name: "Melancholy",
			year: 2020,
			description: "100*70 cm, charcoal on paper",
			image: { id: "melancholy", alt: "Melancholy", sizes: [1280, 720] }
		},
		{
			name: "there is no more reality",
			year: 2020,
			description: "100*70 cm, mixed media",
			image: { id: "there-is-no-more-reality", alt: "there is no more reality", sizes: [1280, 720] }
		},
		{
			name: "portrait 1",
			year: 2021,
			description: "100*70 cm, mixed media",
			image: { id: "portrait-1", alt: "portrait 1", sizes: [1280, 720] }
		},
		{
			name: "nostalgia",
			year: 2020,
			description: "100*70 cm, mixed media",
			image: { id: "nostalgia", alt: "nostalgia", sizes: [1280, 720] }
		},
		{
			name: "time is fleeting",
			year: 2019,
			description: "70*50 cm, mixed media",
			image: { id: "time-is-fleeting", alt: "time is fleeting", sizes: [1280, 720] }
		},
		{
			name: "portrait 2",
			year: 2022,
			description: "21*29,7 cm, pencil",
			image: { id: "portrait-2", alt: "portrait 2", sizes: [1280, 720] }
		},
		{
			name: "isolation",
			year: 2020,
			description: "100*140 cm, mixed media",
			image: { id: "isolation", alt: "isolation", sizes: [1280, 720] }
		},
		{
			name: "reality doesn't exist",
			year: 2020,
			description: "100*70 cm, charcoal on paper",
			image: { id: "reality-doesnt-exist", alt: "reality doesn't exist", sizes: [1280, 720] }
		},
		{
			name: "anatomy 1",
			year: 2022,
			description: "21*29,7 cm, mixed media",
			image: { id: "anatomy-1", alt: "anatomy 1", sizes: [1280, 720] }
		},
		{
			name: "confusion",
			year: 2020,
			description: "100*70 cm, charcoal on paper",
			image: { id: "confusion", alt: "confusion", sizes: [1280, 720] }
		},
		{
			name: "nothing",
			year: 2018,
			description: "100*140 cm, mixed media",
			image: { id: "nothing", alt: "nothing", sizes: [1280, 720] }
		},
		{
			name: "anatomy 2",
			year: 2023,
			description: "21*29,7 cm, mixed media",
			image: { id: "anatomy-2", alt: "anatomy 2", sizes: [1280, 720] }
		},
		{
			name: "what does it mean",
			year: 2020,
			description: "100*70 cm, mixed media",
			image: { id: "what-does-it-mean", alt: "what does it mean", sizes: [1280, 720] }
		},
		{
			name: "forbidden fruit is the sweetest",
			year: 2015,
			description: "120*60 cm, mixed media",
			image: { id: "forbidden-fruit-is-the-sweetest", alt: "forbidden fruit is the sweetest", sizes: [1280, 720] }
		},
		{
			name: "deer",
			year: 2022,
			description: "140*200 cm, mixed media",
			image: { id: "deer", alt: "deer", sizes: [1280, 720] }
		},
	];

	const images = artworks.map((artwork) => artwork.image);

</script>

<BaseSection type="secondary"
>
	<svelte:fragment slot="prepend">
		<ImagesSlider images={images} currentImage={hoveredIndex}/>
	</svelte:fragment>
	<ul class="home-hero__badges">
		{#each artworks as artwork}
			<li class="home-hero__badge">
				<BaseBadge
					on:mouseenter={() => {
								hoveredIndex = artwork.image.id;
							}}
					on:mouseleave={() => {
								hoveredIndex = null;
							}}>
					{artwork.name} ({artwork.year})
					<svelte:fragment slot="text">
						{artwork.description}
					</svelte:fragment>
				</BaseBadge>
			</li>
		{/each}
	</ul>

	<div class="home-hero__nav-wrapper">
		<BaseNav isHoveredBg={hoveredIndex}/>
	</div>

	<h1 class="heading home-hero__heading {hoveredIndex!==null ? 'hovered' : ''}">Sviatlana Markovich</h1>
</BaseSection>

<style>
	.home-hero__badges {
		display: grid;
		grid-template-columns: var(--lines-columns-grid);
		row-gap: 5rem;
		width: 100%;
	}

	.home-hero__badges:has(:global(.badge):hover) :global(.badge):not(:hover) {
		opacity: 0.2;
	}

	.home-hero__nav-wrapper {
		margin-block: 7.5rem 1.5rem;
	}

	.home-hero__heading {
		font-size: 12.5cqw;
		font-weight: 400;
		line-height: 1;
		margin: 0;
		transition: color 0.7s ease;
	}

	.home-hero__heading.hovered {
		color: var(--black-200);
	}
</style>