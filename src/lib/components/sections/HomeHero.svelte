<script>
	import BaseSection from "$lib/components/layout/BaseSection.svelte";
	import BaseBadge from "$lib/components/base/BaseBadge.svelte";
	import BaseNav from "$lib/components/base/BaseNav.svelte";

	const artworks = [
		{ title: "Melancholy (2020)", description: "100*70 cm, charcoal on paper" },
		{ title: "nostalgia (2020)", description: "100*70 cm, mixed media" },
		{ title: "isolation (2020)", description: "100*140 cm, mixed media" },
		{ title: "confusion (2020)", description: "100*70 cm, charcoal on paper" },
		{ title: "what does it mean (2020)", description: "100*70 cm, mixed media" },
		{ title: "there is no more reality (2020)", description: "100*70 cm, mixed media" },
		{ title: "time is fleeting (2019)", description: "70*50 cm, mixed media" },
		{ title: "reality doesn't exist (2020)", description: "100*70 cm, charcoal on paper" },
		{ title: "nothing (2018)", description: "100*140 cm, mixed media" },
		{ title: "forbidden fruit is the sweetest(2015)", description: "120*60 cm, mixed media" },
		{ title: "portrait 1 (2021)", description: "100*70 cm, mixed media" },
		{ title: "portrait 2 (2022)", description: "21*29,7 cm, pencil" },
		{ title: "anatomy 1 (2022)", description: "21*29,7 cm, mixed media" },
		{ title: "anatomy 2 (2023)", description: "21*29,7 cm, mixed media" },
		{ title: "deer (2022)", description: "140*200 cm, mixed media" }
	];


</script>

<BaseSection type="secondary" class="home-hero">
	<ul class="home-hero__badges">
		{#each artworks as artwork}
			<li class="home-hero__badge">
				<BaseBadge>
					{artwork.title}
					<svelte:fragment slot="text">
						{artwork.description}
					</svelte:fragment>
				</BaseBadge>
			</li>
		{/each}
	</ul>

	<div class="home-hero__nav-wrapper">
		<BaseNav class="home-hero__nav"/>
	</div>

	<h1 class="heading home-hero__heading">Sviatlana Markovich</h1>
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
	}
</style>