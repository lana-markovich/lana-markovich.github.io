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

<BaseSection class="home-intro" onmousemove={handleMouseMove}>
	<svelte:fragment slot="prepend">
		<MouseTrackingMask bind:this={mask} initialX="50%" initialY="15%">
			<BaseImage name="intro" alt="Artist introduction background" />
		</MouseTrackingMask>
	</svelte:fragment>

	<div class="home-intro__text-container">
		<p class="heading heading--lg home-intro__text">
			I create art across painting, graphics, and sculpture
		</p>
		<p class="heading heading--lg home-intro__text">
			exploring complex themes while preserving beauty in every piece.
		</p>
	</div>

</BaseSection>

<style>
	.home-intro__text-container {
		margin-top: 45rem;
		display: grid;
		grid-template-columns: var(--lines-columns-grid);
		row-gap: 2.5rem;
		grid-template-areas: "text1 text1 .    "
		                     ".     text2 text2";
	}

	.home-intro__text {
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