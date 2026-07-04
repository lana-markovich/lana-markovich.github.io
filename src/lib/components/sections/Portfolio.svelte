<script lang="ts">
	import BaseSection from "$lib/components/layout/BaseSection.svelte";
	import ArtPiecePreview from "$lib/components/artpiece/ArtPiecePreview.svelte";
	import { ART_PIECES } from "$lib/constants";
	import type { ArtPieceId } from "$lib/constants";
	import { observeMidline } from "$lib/utilities/viewportMidline";
	import { setPortfolioCategory } from "$lib/stores/portfolioCategory.svelte";

	type Item = {
		id: ArtPieceId;
		aspectRatio?: number;
		category: "PAINTINGS" | "DECOR" | "GRAPHIC"
	};

	let paintingsEl: HTMLUListElement;

	const CATEGORY_LABELS: Record<Item['category'], string> = {
		PAINTINGS: 'Paintings',
		DECOR: 'Decor',
		GRAPHIC: 'Graphic',
	};

	$effect(() => {
		const items = Array.from(paintingsEl.children);
		const labels = new Map<Element, string>(
			items.map((el, i) => [el, CATEGORY_LABELS[ITEMS[i].category]]),
		);
		const stop = observeMidline(
			items,
			(current) => setPortfolioCategory(current ? labels.get(current) ?? null : null),
		);
		return () => {
			stop();
			setPortfolioCategory(null);
		};
	});

	const ITEMS: Item[] = [
		{ id: 'reality-doesnt-exist', category: "PAINTINGS" },
		{ id: 'landscape-1', aspectRatio: 384 / 450, category: "PAINTINGS" },
		{ id: 'copy-la-grenouillere', category: "PAINTINGS" },
		{ id: 'iris', aspectRatio: 408 / 450, category: "PAINTINGS" },
		{ id: 'imagination', aspectRatio: 384 / 600, category: "PAINTINGS" },
		{ id: 'still-life', category: "PAINTINGS" },
		{ id: 'nothing', category: "PAINTINGS" },
		{ id: 'what-does-it-mean', aspectRatio: 384 / 450, category: "PAINTINGS" },
		{ id: 'isolation', category: "PAINTINGS" },
		{ id: 'jacket-1', category: "DECOR" },
		{ id: 'dresser-decoration-storks', aspectRatio: 384 / 450, category: "DECOR" },
		{ id: 'shopper-bag-design-noise', category: "DECOR" },
		{ id: 'body-1', category: "GRAPHIC" },
		{ id: 'pikoala', aspectRatio: 408 / 450, category: "GRAPHIC" },
	];
</script>

<BaseSection type="secondary" class="portfolio" id="portfolio" tracked>
	<ul class="portfolio__items" bind:this={paintingsEl}>
		{#each ITEMS as item}
			<li
				class="portfolio__item"
				style="grid-area: {item.id}"
			>
				<ArtPiecePreview artPiece={ART_PIECES[item.id]} aspectRatio={item.aspectRatio}/>
			</li>
		{/each}
	</ul>
</BaseSection>

<style>
	.portfolio__items {
		display: grid;
		list-style: none;
		grid-template-columns: var(--lines-columns-grid);
		grid-template-areas: "reality-doesnt-exist .                        landscape-1              "
		                     ".                    copy-la-grenouillere     .                        "
		                     "iris                 .                        imagination              "
		                     ".                    still-life               .                        "
		                     "nothing              .                        what-does-it-mean        "
		                     ".                    isolation                .                        "
		                     "jacket-1             .                        dresser-decoration-storks"
		                     ".                    shopper-bag-design-noise .                        "
		                     "body-1               .                        pikoala                  ";
	}
	.portfolio__item {
		padding-bottom: 2.5rem;
		&:nth-child(3n) :global(.badge) {
			align-self: center;
		}
	}

	/* Tablets and below: 2-column alternating staircase (one item per row, L/R zigzag). */
	@media (width <= 65rem) {
		.portfolio__items {
			grid-column-gap: 2.5rem;
			grid-template-areas: "reality-doesnt-exist      ."
			                     "reality-doesnt-exist      landscape-1"
			                     ".                         landscape-1"
			                     "copy-la-grenouillere      landscape-1"
			                     "copy-la-grenouillere      ."
			                     "copy-la-grenouillere      iris"
			                     ".                         iris"
			                     "imagination               iris"
			                     "imagination               ."
			                     "imagination               still-life"
			                     ".                         still-life"
			                     "nothing                   still-life"
			                     "nothing                   ."
			                     "nothing                   what-does-it-mean"
			                     ".                         what-does-it-mean"
			                     "isolation                 what-does-it-mean"
			                     "isolation                 ."
			                     "isolation                 jacket-1"
			                     ".                         jacket-1"
			                     "dresser-decoration-storks jacket-1"
			                     "dresser-decoration-storks ."
			                     "dresser-decoration-storks shopper-bag-design-noise"
			                     ".                         shopper-bag-design-noise"
			                     "body-1                    shopper-bag-design-noise"
			                     "body-1                    ."
			                     "body-1                    pikoala"
			                     ".                         pikoala"
			                     ".                         pikoala";
		}
		.portfolio__item:nth-child(2n + 1) :global(.badge) {
			align-self: start;
		}
		.portfolio__item:nth-child(2n) :global(.badge) {
			align-self: end;
		}
	}

	/* Phones: single full-width column, every badge centered. */
	@media (width <= 35rem) {
		.portfolio__items {
			grid-template-areas: "reality-doesnt-exist"
			                     "landscape-1"
			                     "copy-la-grenouillere"
			                     "iris"
			                     "imagination"
			                     "still-life"
			                     "nothing"
			                     "what-does-it-mean"
			                     "isolation"
			                     "jacket-1"
			                     "dresser-decoration-storks"
			                     "shopper-bag-design-noise"
			                     "body-1"
			                     "pikoala";
		}
		.portfolio__item:nth-child(n) :global(.badge) {
			align-self: center;
		}
	}
</style>
