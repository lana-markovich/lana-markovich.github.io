<script lang="ts">
	import { MediaQuery } from "svelte/reactivity";
	import BaseSection from "$lib/components/layout/BaseSection.svelte";
	import FramedImage from "$lib/components/base/FramedImage.svelte";
	import { IMAGES } from "$lib/images";
	import MouseTrackingMask from "$lib/components/base/MouseTrackingMask.svelte";
	import type { MouseTrackingMaskInstance } from "$lib/types";
	import { scrollColorReveal } from "$lib/utilities/scrollColorReveal";

	/* Must stay in sync with the 60rem container query below: container ≤ 60rem ⟺ viewport ≤ 65rem.
	   On compact the mask reveal (mouse-driven) is dropped and the photo is shown statically. */
	const isCompact = new MediaQuery("(max-width: 65rem)");

	let mask: MouseTrackingMaskInstance;

	function handleMouseMove(event: MouseEvent) {
		mask?.handleMouseMove(event);
	}
</script>

<BaseSection type="secondary" class="home-intro" onmousemove={handleMouseMove}>
	{#snippet prepend()}
		{#if !isCompact.current}
			<MouseTrackingMask bind:this={mask} initialX="50%" initialY="15%">
				<FramedImage image={IMAGES['intro']}/>
			</MouseTrackingMask>
		{/if}
	{/snippet}

	<div class="home-intro__text-container" use:scrollColorReveal={{ pxPerLetter: 4 }}>
		<div class="home-intro__text">
			<h2 class="heading heading--lg">
				Artist across painting, graphics, sculpture
			</h2>
			<p class="text text--secondary">
				I work across mediums because no single one captures everything. Beauty and meaning show up differently in
				paint, in line, in form.
			</p>
		</div>
		<div class="home-intro__text">
			<h2 class="heading heading--lg">
				Beauty is a language, not decoration
			</h2>
			<p class="text text--secondary">
				Even when the subject is difficult or uncomfortable, I stay with the aesthetics. That's not avoidance — that's
				how I work.
			</p>
		</div>

	</div>

	{#if isCompact.current}
		<div class="home-intro__static-image">
			<FramedImage image={IMAGES['intro']} sizesAttr="100vw"/>
		</div>
	{/if}

</BaseSection>

<style>
	/* Kept at the original 7.5rem rather than following --container-padding-block,
	   so the gap up to the hero stays as it was; only the gaps below this
	   section grew. */
	:global(.home-intro .container) {
		padding-block-start: 7.5rem;
	}

	.home-intro__text-container {
		margin-top: 45rem;
		display: grid;
		grid-template-columns: var(--lines-columns-grid);
		row-gap: 2.5rem;
		grid-template-areas: "text1 text1 .    "
		                     ".     text2 text2";
		grid-auto-rows: min-content min-content;
	}

	.home-intro__text {
		max-inline-size: 32rem;
		text-wrap-style: balance;
		.text {
			margin-block-end: 0;
		}
		&:nth-child(1) {
			grid-area: text1;
		}
		&:nth-child(2) {
			grid-area: text2;
		}
	}

	/* Tablets and below: image becomes static at the end of the section, text stacks. */
	@media (width <= 65rem) {
		.home-intro__text-container {
			margin-top: 0;
			grid-template-areas: "text1 .    "
			                     "text1 text2"
			                     ".     text2";
		}

		.home-intro__text {
			&:nth-child(1) {
				padding-inline-end: 1rem;
			}
		}

		.home-intro__static-image {
			margin-block-start: 6.25rem;
			aspect-ratio: 1.25;
			width: 100%;
		}
	}
	@media (width <= 35rem) {
		.home-intro__text-container {
			grid-template-areas: none;
			row-gap: 3.75rem;
		}

		.home-intro__text {
			max-inline-size: 22rem;

			&:nth-child(1) {
				grid-area: auto;
				justify-self: start;
				text-align: start;
				padding-inline-end: 0;
			}
			&:nth-child(2) {
				grid-area: auto;
				justify-self: end;
				text-align: end;
			}
		}
	}
</style>