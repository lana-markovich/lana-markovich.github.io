<script lang="ts">
	import BaseSection from "$lib/components/layout/BaseSection.svelte";
	import ArtPiecePreview from "$lib/components/artpiece/ArtPiecePreview.svelte";
	import { ART_PIECES } from "$lib/constants";
	import type { ArtPieceId } from "$lib/constants";

	const CATEGORIES: { label: string; items: ArtPieceId[] }[] = [
		{
			label: 'Paintings',
			items: [
				'melancholy', 'copy-la-grenouillere',
				'forbidden-fruit-is-the-sweetest', 'isolation',
				'portrait-1', 'confusion', 'nostalgia',
				'anatomy-1', 'anatomy-2', 'nothing', 'reality-doesnt-exist',
			],
		},
		{
			label: 'Decor',
			items: ['dresser-decoration-storks', 'jacket-1'],
		},
		{
			label: 'Graphic Works',
			items: ['body-1', 'pikoala', 'shopper-bag-design-noise'],
		},
	];
</script>

<BaseSection type="primary" class="portfolio">
	<h2 class="heading heading--md">Portfolio</h2>
	{#each CATEGORIES as category}
		<div class="portfolio__category">
			<h3 class="portfolio__category-label heading heading--xs">{category.label}</h3>
			<div class="portfolio__grid">
				{#each category.items as id}
					<ArtPiecePreview artPiece={ART_PIECES[id]} />
				{/each}
			</div>
		</div>
	{/each}
</BaseSection>

<style>
	.portfolio__category {
		display: flex;
		flex-direction: column;
		gap: 2rem;
	}

	.portfolio__category + .portfolio__category {
		margin-block-start: 5rem;
	}

	.portfolio__category-label {
		color: var(--text-secondary);
	}

	.portfolio__grid {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 2.5rem;
		align-items: start;
	}
</style>
