<script lang="ts">
	import BaseImage from "$lib/components/base/BaseImage.svelte";

	export let images: string[] = [];
	export let currentImage: number | null = null;
</script>

<div class="images-slider">
	{#each images as image, i (image)}
		<BaseImage
			name={image}
			alt={image}
			class={i === currentImage ? 'is-active' : 'is-hidden'}
			sizes={[1280, 720]}
		/>
	{/each}
</div>

<style>
	.images-slider :global(.is-hidden) {
		opacity: 0;
		transition: opacity 1s ease;
	}

	.images-slider :global(.is-active) {
		opacity: 1;
		transition: opacity 1s ease;
	}

	.images-slider :global(.is-hidden),
	.images-slider :global(.is-active) {
		position: absolute;
		top: 0;
		left: 0;
	}

</style>