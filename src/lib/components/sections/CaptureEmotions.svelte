<script lang="ts">
	import BaseSection from "$lib/components/layout/BaseSection.svelte";
	import FramedImage from "$lib/components/base/FramedImage.svelte";
	import { IMAGES } from "$lib/images";
	import MouseTrackingMask from "$lib/components/base/MouseTrackingMask.svelte";
	import type { MouseTrackingMaskInstance } from "$lib/types";
	import { scrollColorReveal } from "$lib/utilities/scrollColorReveal";

	let mask: MouseTrackingMaskInstance;

	function handleMouseMove(event: MouseEvent) {
		mask?.handleMouseMove(event);
	}
</script>

<BaseSection type="secondary" class="capture-emotions" onmousemove={handleMouseMove}>
	{#snippet prepend()}
		<MouseTrackingMask bind:this={mask} initialX="20%" initialY="5%">
			<FramedImage image={IMAGES['capture-emotions']}/>
		</MouseTrackingMask>
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
</style>