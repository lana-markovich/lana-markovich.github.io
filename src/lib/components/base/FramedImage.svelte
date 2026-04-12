<script lang="ts">
	import type { ImageEntry, FocalPoint } from '$lib/types';

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
		loading?: 'lazy' | 'eager';
		sizesAttr?: string;
	} = $props();

	const focalX = $derived(focalPointOverride?.x ?? image.focalPoint.x);
	const focalY = $derived(focalPointOverride?.y ?? image.focalPoint.y);
	const zoom = $derived(zoomOverride ?? image.zoom);

	let contW = $state(0);
	let contH = $state(0);

	const layout = $derived.by(() => {
		if (!contW || !contH) return { w: 0, h: 0, x: 0, y: 0 };
		const imgAspect = image.aspectRatio;
		const contAspect = contW / contH;
		// cover: fit to whichever dimension constrains the image, then apply zoom
		let w: number;
		let h: number;
		if (contAspect > imgAspect) {
			w = contW * zoom;
			h = w / imgAspect;
		} else {
			h = contH * zoom;
			w = h * imgAspect;
		}
		// center focal point, then clamp so we never reveal blank edges
		let x = contW / 2 - focalX * w;
		let y = contH / 2 - focalY * h;
		x = Math.min(0, Math.max(contW - w, x));
		y = Math.min(0, Math.max(contH - h, y));
		return { w, h, x, y };
	});

	const sortedSizes = $derived([...image.sizes].sort((a, b) => b - a));
	const srcset = $derived(
		sortedSizes.map((s) => `/images/${image.id}-${s}.webp ${s}w`).join(', ')
	);
	const fallbackSrc = $derived(`/images/${image.id}-${sortedSizes.at(-1)}.webp`);
</script>

<div
	class="framed-image {className}"
	bind:clientWidth={contW}
	bind:clientHeight={contH}
>
	<picture class="framed-image__picture">
		<source type="image/webp" {srcset} sizes={sizesAttr} />
		<img
			src={fallbackSrc}
			alt={image.alt}
			{loading}
			decoding="async"
			style="width: {layout.w}px; height: {layout.h}px; transform: translate({layout.x}px, {layout.y}px);"
		/>
	</picture>
</div>

<style>
	.framed-image {
		position: relative;
		overflow: hidden;
		width: 100%;
		height: 100%;
	}
	.framed-image__picture {
		display: block;
		position: absolute;
		inset: 0;
	}
	.framed-image__picture img {
		display: block;
		transform-origin: 0 0;
		will-change: transform;
		max-width: none;
		max-height: none;
	}
</style>
