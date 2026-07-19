<script lang="ts">
	import type { ImageEntry, FocalPoint } from '$lib/types';

	let {
		image,
		focalPoint: focalPointOverride,
		zoom: zoomOverride,
		rotate: rotateOverride,
		class: className = '',
		loading = 'lazy',
		sizesAttr = '100vw',
	}: {
		image: ImageEntry;
		focalPoint?: FocalPoint;
		zoom?: number;
		rotate?: 0 | 90 | 180 | 270;
		class?: string;
		loading?: 'lazy' | 'eager';
		sizesAttr?: string;
	} = $props();

	const focalX = $derived(focalPointOverride?.x ?? image.focalPoint.x);
	const focalY = $derived(focalPointOverride?.y ?? image.focalPoint.y);
	const zoom = $derived(zoomOverride ?? image.zoom);
	const rotate = $derived(rotateOverride ?? image.rotate ?? 0);
	/* Quarter turns swap the image's width and height on screen. */
	const isQuarterTurn = $derived(rotate % 180 !== 0);

	let contW = $state(0);
	let contH = $state(0);

	/* Layout is computed in on-screen space: w/h describe the box the image
	   occupies after rotation, so cover-fitting stays correct for quarter turns. */
	const layout = $derived.by(() => {
		if (!contW || !contH) return { w: 0, h: 0, x: 0, y: 0 };
		const imgAspect = isQuarterTurn ? 1 / image.aspectRatio : image.aspectRatio;
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

	/* The element itself is sized in its own unrotated space, so a quarter turn
	   takes the layout box's dimensions swapped back. Rotating about the centre
	   keeps that box in place, so the translation only has to move the centres
	   together — which reduces to plain translate(x, y) when rotate is 0. */
	const imgW = $derived(isQuarterTurn ? layout.h : layout.w);
	const imgH = $derived(isQuarterTurn ? layout.w : layout.h);
	const offsetX = $derived(layout.x + (layout.w - imgW) / 2);
	const offsetY = $derived(layout.y + (layout.h - imgH) / 2);

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
			style="width: {imgW}px; height: {imgH}px; transform: translate({offsetX}px, {offsetY}px) rotate({rotate}deg);"
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
		transform-origin: center;
		will-change: transform;
		max-width: none;
		max-height: none;
	}
</style>
