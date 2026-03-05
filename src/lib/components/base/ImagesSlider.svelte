<script lang="ts">
	import BaseImage from "$lib/components/base/BaseImage.svelte";
	import type { ImageItem } from "$lib/types";

	export let images: ImageItem[] = [];
	export let currentImage: string | null = null;
</script>

<div class="images-slider">
	{#each images as image (image.id)}
		<BaseImage
			name={image.id}
			alt={image.alt}
			class={image.id === currentImage ? 'is-active' : 'is-hidden'}
			sizes={image.sizes}
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