<script lang="ts">
	import BaseSection from "$lib/components/layout/BaseSection.svelte";
	import BaseImage from "$lib/components/base/BaseImage.svelte";
	import MouseTrackingMask from "$lib/components/base/MouseTrackingMask.svelte";
	import type { MouseTrackingMaskInstance } from "$lib/types";

	let mask: MouseTrackingMaskInstance;

	function handleMouseMove(event: MouseEvent) {
		mask?.handleMouseMove(event);
	}
</script>

<BaseSection type="secondary" class="capture-emotions" onmousemove={handleMouseMove}>
	{#snippet prepend()}
		<MouseTrackingMask bind:this={mask} initialX="20%" initialY="5%">
			<BaseImage name="capture-emotions" alt="Abstract digital art" />
		</MouseTrackingMask>
	{/snippet}

	<div class="capture-emotions__text-container">
		<p class="heading heading--lg capture-emotions__text">
			Through charcoal, pastel, and ink, I capture raw human emotions and inner states
		</p>
		<p class="heading heading--lg capture-emotions__text">
			translating psychological depth into visual narratives
		</p>
	</div>

</BaseSection>

<style>
	.capture-emotions__text-container {
		margin-top: 45rem;
		display: grid;
		grid-template-columns: var(--lines-columns-grid);
		row-gap: 2.5rem;
		grid-template-areas: "text1 text1 .    "
		                     ".     text2 text2";
	}

	.capture-emotions__text {
		max-inline-size: 26ch;
		text-wrap-style: balance;
		&:nth-child(1) {
			grid-area: text1;
		}
		&:nth-child(2) {
			grid-area: text2;
		}
	}
</style>