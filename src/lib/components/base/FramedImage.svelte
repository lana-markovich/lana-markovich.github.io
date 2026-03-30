<script lang="ts">
	import type { ImageEntry, FocalPoint } from '$lib/types';
	import BaseImage from './BaseImage.svelte';

	let {
		image,
		focalPoint: focalPointOverride,
		zoom: zoomOverride,
		class: className = '',
		loading = 'lazy',
		sizesAttr = '100vw',
	}: {
		image: ImageEntry;
		focalPoint?: FocalPoint;
		zoom?: number;
		class?: string;
		loading?: "lazy" | "eager";
		sizesAttr?: string;
	} = $props();

	const focalX = $derived(focalPointOverride?.x ?? image.focalPoint.x);
	const focalY = $derived(focalPointOverride?.y ?? image.focalPoint.y);
	const zoom = $derived(zoomOverride ?? image.zoom);

	const tx = $derived(
		zoom <= 1
			? 0
			: Math.max(-(zoom - 1) * 100, Math.min((0.5 - focalX * zoom) * 100, 0))
	);
	const ty = $derived(
		zoom <= 1
			? 0
			: Math.max(-(zoom - 1) * 100, Math.min((0.5 - focalY * zoom) * 100, 0))
	);
</script>

{#if zoom <= 1}
	<BaseImage
		name={image.id}
		alt={image.alt}
		class={className}
		sizes={[...image.sizes]}
		{loading}
		{sizesAttr}
	/>
{:else}
	<div
		class="framed-image {className}"
		style="--fi-tx: {tx}%; --fi-ty: {ty}%; --fi-zoom: {zoom};"
	>
		<BaseImage
			name={image.id}
			alt={image.alt}
			sizes={[...image.sizes]}
			{loading}
			{sizesAttr}
		/>
	</div>
{/if}

<style>
	.framed-image {
		overflow: hidden;
		width: 100%;
		height: 100%;
	}

	.framed-image :global(.image) {
		transform-origin: 0 0;
		transform: translate(var(--fi-tx), var(--fi-ty)) scale(var(--fi-zoom));
		width: 100%;
		height: 100%;
	}

	.framed-image :global(img) {
		object-fit: cover;
		width: 100%;
		height: 100%;
	}
</style>
