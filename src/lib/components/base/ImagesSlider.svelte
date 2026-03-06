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
			class={`images-slider__image ${image.id === currentImage ? 'images-slider__image--is-active' : 'images-slider__image--is-hidden'}`}
			sizes={image.sizes}
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