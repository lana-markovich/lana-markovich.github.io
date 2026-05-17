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

<BaseSection class="home-intro" onmousemove={handleMouseMove}>
	{#snippet prepend()}
		<MouseTrackingMask bind:this={mask} initialX="50%" initialY="15%">
			<FramedImage image={IMAGES['intro']}/>
		</MouseTrackingMask>
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