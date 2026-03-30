<script lang="ts">
	import FramedImage from "$lib/components/base/FramedImage.svelte";
	import type { ImageEntry, ImageId } from "$lib/types";

	let {
		images = [],
		currentImage = null,
	}: {
		images: ImageEntry[];
		currentImage: ImageId | null;
	} = $props();
</script>

<div class="images-slider">
	{#each images as image (image.id)}
		<FramedImage
			image={image}
			class={`images-slider__image ${image.id === currentImage ? 'images-slider__image--is-active' : 'images-slider__image--is-hidden'}`}
		/>
	{/each}
</div>

<style>
	.images-slider {
		display: flex;
		justify-content: center;
		align-items: center;
		position: absolute;
		inset: 0;
		z-index: 0;
		overflow: hidden;
		:global(.images-slider__image) {
			transition: opacity 0.7s ease;
			opacity: 0;
			position: absolute;
			max-height: unset;
			&::before {
				content: '';
				display: block;
				position: absolute;
				background-color: var(--black-800);
				opacity: 0.6;
				inset: 0;
				z-index: 2;
			}
		}
		:global(.images-slider__image--is-active) {
			opacity: 1;
		}
	}
</style>
