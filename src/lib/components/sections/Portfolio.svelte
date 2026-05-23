<script lang="ts">
	import BaseSection from "$lib/components/layout/BaseSection.svelte";
	import ArtPiecePreview from "$lib/components/artpiece/ArtPiecePreview.svelte";
	import { ART_PIECES } from "$lib/constants";
	import type { ArtPieceId } from "$lib/constants";
	import { sectionHeading } from "$lib/utilities/sectionHeading";

	type Item = { id: ArtPieceId; aspectRatio?: number; centerBadge?: boolean };

	const PAINTINGS: Item[] = [
		{ id: 'reality-doesnt-exist' },
		{ id: 'landscape-1', aspectRatio: 384 / 450 },
		{ id: 'copy-la-grenouillere', centerBadge: true },
		{ id: 'iris', aspectRatio: 408 / 450 },
		{ id: 'imagination', aspectRatio: 384 / 600 },
		{ id: 'still-life', centerBadge: true },
		{ id: 'nothing' },
		{ id: 'what-does-it-mean', aspectRatio: 384 / 450 },
		{ id: 'isolation', centerBadge: true },
	];

	const DECOR: Item[] = [
		{ id: 'jacket-1' },
		{ id: 'dresser-decoration-storks', aspectRatio: 384 / 450 },
		{ id: 'shopper-bag-design-noise', centerBadge: true },
	];

	const GRAPHIC: Item[] = [
		{ id: 'body-1' },
		{ id: 'pikoala', aspectRatio: 408 / 450 },
	];
</script>

<BaseSection type="primary" class="portfolio" id="portfolio">
	<h2 class="heading heading--md" use:sectionHeading>Portfolio</h2>

	<ul class="portfolio__items portfolio__items--painting">
		{#each PAINTINGS as item}
			<li
				class="portfolio__item"
				class:portfolio__item--center-badge={item.centerBadge}
				style="grid-area: {item.id}"
			>
				<ArtPiecePreview artPiece={ART_PIECES[item.id]} aspectRatio={item.aspectRatio}/>
			</li>
		{/each}
	</ul>

	<ul class="portfolio__items portfolio__items--decor">
		{#each DECOR as item}
			<li
				class="portfolio__item"
				class:portfolio__item--center-badge={item.centerBadge}
				style="grid-area: {item.id}"
			>
				<ArtPiecePreview artPiece={ART_PIECES[item.id]} aspectRatio={item.aspectRatio}/>
			</li>
		{/each}
	</ul>

	<ul class="portfolio__items portfolio__items--graphic">
		{#each GRAPHIC as item}
			<li
				class="portfolio__item"
				class:portfolio__item--center-badge={item.centerBadge}
				style="grid-area: {item.id}"
			>
				<ArtPiecePreview artPiece={ART_PIECES[item.id]} aspectRatio={item.aspectRatio}/>
			</li>
		{/each}
	</ul>
</BaseSection>

<style>
	.portfolio__item--center-badge :global(.badge) {
		align-self: center;
	}

	.portfolio__items {
		display: grid;
		list-style: none;
		grid-template-columns: var(--lines-columns-grid);
		row-gap: 2.5rem;
	}

	.portfolio__items + .portfolio__items {
		margin-top: 2.5rem;
	}

	.portfolio__items--painting {
		grid-template-areas: "reality-doesnt-exist .                        landscape-1      "
		                     ".                    copy-la-grenouillere     .                "
		                     "iris                 .                        imagination      "
		                     ".                    still-life               .                "
		                     "nothing              .                        what-does-it-mean"
		                     ".                    isolation                .                ";
	}

	.portfolio__items--decor {
		grid-template-areas: "jacket-1             .                        dresser-decoration-storks"
		                     ".                    shopper-bag-design-noise .                        ";
	}

	.portfolio__items--graphic {
		width: 100%;
		grid-template-areas: "body-1               .                        pikoala";
	}
</style>
