<script>
	import BaseSection from "$lib/components/layout/BaseSection.svelte";
	import BaseBadge from "$lib/components/base/BaseBadge.svelte";
	import BaseNav from "$lib/components/base/BaseNav.svelte";
	import img1 from "../../../assets/images/hero-section-images/hero-section.webp"
	import img2 from "../../../assets/images/hero-section-images/hero-section-1.webp"
	import img3 from "../../../assets/images/hero-section-images/hero-section-2.webp"
	import img4 from "../../../assets/images/hero-section-images/hero-section-3.webp"
	import img5 from "../../../assets/images/hero-section-images/hero-section-4.webp"
	import img6 from "../../../assets/images/hero-section-images/hero-section-5.webp"
	import img7 from "../../../assets/images/hero-section-images/hero-section-6.webp"
	import img8 from "../../../assets/images/hero-section-images/hero-section-7.webp"
	import img9 from "../../../assets/images/hero-section-images/hero-section-8.webp"
	import img10 from "../../../assets/images/hero-section-images/hero-section-9.webp"
	import img11 from "../../../assets/images/hero-section-images/hero-section-10.webp"
	import img12 from "../../../assets/images/hero-section-images/hero-section-11.webp"
	import img13 from "../../../assets/images/hero-section-images/hero-section-12.webp"
	import img14 from "../../../assets/images/hero-section-images/hero-section-13.webp"
	import img15 from "../../../assets/images/hero-section-images/hero-section-14.webp"

	let hoveredBg = null
	let hoveredIndex = null;

	const artworks = [
		{ title: "Melancholy (2020)", description: "100*70 cm, charcoal on paper", bg: img1 },
		{ title: "nostalgia (2020)", description: "100*70 cm, mixed media", bg: img2 },
		{ title: "isolation (2020)", description: "100*140 cm, mixed media", bg: img3 },
		{ title: "confusion (2020)", description: "100*70 cm, charcoal on paper", bg: img4 },
		{ title: "what does it mean (2020)", description: "100*70 cm, mixed media", bg: img5 },
		{ title: "there is no more reality (2020)", description: "100*70 cm, mixed media", bg: img6 },
		{ title: "time is fleeting (2019)", description: "70*50 cm, mixed media", bg: img7 },
		{ title: "reality doesn't exist (2020)", description: "100*70 cm, charcoal on paper", bg: img8 },
		{ title: "nothing (2018)", description: "100*140 cm, mixed media", bg: img9 },
		{ title: "forbidden fruit is the sweetest(2015)", description: "120*60 cm, mixed media", bg: img10 },
		{ title: "portrait 1 (2021)", description: "100*70 cm, mixed media", bg: img11 },
		{ title: "portrait 2 (2022)", description: "21*29,7 cm, pencil", bg: img12 },
		{ title: "anatomy 1 (2022)", description: "21*29,7 cm, mixed media", bg: img13 },
		{ title: "anatomy 2 (2023)", description: "21*29,7 cm, mixed media", bg: img14 },
		{ title: "deer (2022)", description: "140*200 cm, mixed media", bg: img15 },
	];


</script>

<BaseSection type="secondary"
			 class="home-hero {hoveredIndex !== null ? 'has-bg' : ''}"
			 style="--bg-image: url({hoveredBg})"
			>
	<ul class="home-hero__badges">
		{#each artworks as artwork, i}
			<li class="home-hero__badge">
				<BaseBadge bg={artwork.bg}
						   dim={hoveredIndex !== null && hoveredIndex !== i}
						   on:mouseenter={() => {
								hoveredBg = artwork.bg;
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

	<h1 class="heading home-hero__heading {hoveredIndex ? 'hovered' : ''}">Sviatlana Markovich</h1>
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