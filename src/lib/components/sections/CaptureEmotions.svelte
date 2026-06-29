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

<BaseSection type="secondary" class="capture-emotions" onmousemove={handleMouseMove}>
	{#snippet prepend()}
		{#if !isCompact.current}
			<MouseTrackingMask bind:this={mask} initialX="20%" initialY="5%">
				<FramedImage image={IMAGES['capture-emotions']}/>
			</MouseTrackingMask>
		{/if}
	{/snippet}

	<div class="capture-emotions__text-container" use:scrollColorReveal={{ pxPerLetter: 4 }}>
		<div class="capture-emotions__text">
			<h2 class="heading heading--lg">
				From canvas to clothing
			</h2>
			<p class="text text--secondary">
				I paint furniture, objects, fabric. Not as a side project — it's the same thinking applied to the things people
				actually live with every day.
			</p>
		</div>
		<div class="capture-emotions__text">
			<h2 class="heading heading--lg">
				Raw emotions made visible
			</h2>
			<p class="text text--secondary">
				Charcoal, pastel and ink for when something is more psychological than visual. These materials don't pretend.
			</p>
		</div>
	</div>

	{#if isCompact.current}
		<div class="capture-emotions__static-image">
			<FramedImage image={IMAGES['capture-emotions']} sizesAttr="100vw"/>
		</div>
	{/if}

</BaseSection>

<style>
	.capture-emotions__text-container {
		margin-top: 45rem;
		display: grid;
		grid-template-columns: var(--lines-columns-grid);
		row-gap: 2.5rem;
		grid-template-areas: ".     text1 text1"
		                     "text2 text2 .    ";
	}

	.capture-emotions__text {
		max-inline-size: 32rem;
		text-wrap-style: balance;
		&:nth-child(1) {
			grid-area: text1;
		}
		&:nth-child(2) {
			grid-area: text2;
		}
	}

	/* Tablets and below: image becomes static at the end of the section, text stacks.
	   Mirrors this section's desktop stagger — block 1 right-aligned, block 2 left-aligned. */
	@media (width <= 65rem) {
		.capture-emotions__text-container {
			margin-top: 0;
			grid-template-areas: ".     text2"
			                     "text1 text2"
			                     "text1 .    ";
		}

		.capture-emotions__text {
			&:nth-child(1) {
				padding-inline-end: 1rem;
			}
		}

		.capture-emotions__static-image {
			margin-block-start: 2rem;
			aspect-ratio: 1.8;
			width: 100%;
		}
	}
	@media (width <= 35rem) {
		.capture-emotions__text-container {
			grid-template-areas: none;
			row-gap: 3.5rem;
		}

		.capture-emotions__text {
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