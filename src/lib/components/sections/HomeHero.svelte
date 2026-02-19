<script>
	import BaseSection from "$lib/components/layout/BaseSection.svelte";
	import BaseBadge from "$lib/components/base/BaseBadge.svelte";
	import BaseNav from "$lib/components/base/BaseNav.svelte";
	import ImagesSlider from "$lib/components/base/ImagesSlider.svelte";

	let hoveredIndex = null;

	const artworks = [
		{ title: "Melancholy (2020)", description: "100*70 cm, charcoal on paper" },
		{ title: "there is no more reality (2020)", description: "100*70 cm, mixed media" },
		{ title: "portrait 1 (2021)", description: "100*70 cm, mixed media" },
		{ title: "nostalgia (2020)", description: "100*70 cm, mixed media" },
		{ title: "time is fleeting (2019)", description: "70*50 cm, mixed media" },
		{ title: "portrait 2 (2022)", description: "21*29,7 cm, pencil" },
		{ title: "isolation (2020)", description: "100*140 cm, mixed media" },
		{ title: "reality doesn't exist (2020)", description: "100*70 cm, charcoal on paper" },
		{ title: "anatomy 1 (2022)", description: "21*29,7 cm, mixed media" },
		{ title: "confusion (2020)", description: "100*70 cm, charcoal on paper" },
		{ title: "nothing (2018)", description: "100*140 cm, mixed media" },
		{ title: "anatomy 2 (2023)", description: "21*29,7 cm, mixed media" },
		{ title: "what does it mean (2020)", description: "100*70 cm, mixed media" },
		{ title: "forbidden fruit is the sweetest(2015)", description: "120*60 cm, mixed media" },
		{ title: "deer (2022)", description: "140*200 cm, mixed media" },
	];

	const images = [
		"hero-section-img-1",
		"hero-section-img-6",
		"hero-section-img-11",
		"hero-section-img-2",
		"hero-section-img-7",
		"hero-section-img-12",
		"hero-section-img-3",
		"hero-section-img-8",
		"hero-section-img-13",
		"hero-section-img-4",
		"hero-section-img-9",
		"hero-section-img-14",
		"hero-section-img-5",
		"hero-section-img-10",
		"hero-section-img-15"
	]

</script>

<BaseSection type="secondary"
			>
	<svelte:fragment slot="prepend">
	<ImagesSlider images={images} currentImage={hoveredIndex}/>
	</svelte:fragment>
	<ul class="home-hero__badges">
		{#each artworks as artwork, i}
			<li class="home-hero__badge">
				<BaseBadge dim={hoveredIndex !== null && hoveredIndex !== i}
						   on:mouseenter={() => {
								hoveredIndex = i;
							}}
						   on:mouseleave={() => {
								hoveredIndex = null;
							}}>
						{artwork.title}
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