<script lang="ts">
	import type { MouseTrackingMaskProps } from '$lib/types';
	import { createMouseTracking } from '$lib/utilities/mouseTracking';
	import { onMount } from 'svelte';

	let {
		maskSize = 600,
		lerpFactor = 0.03,
		initialX = '50%',
		initialY = '50%',
		maskImage = 'linear-gradient(black, black)',
		class: className = ''
	}: MouseTrackingMaskProps = $props();

	// State for CSS custom properties
	let maskX = $state(initialX);
	let maskY = $state(initialY);
	let isAnimating = $state(false);

	// Create tracking instance
	const tracking = createMouseTracking({
		lerpFactor,
		offsetX: 0,
		offsetY: 0,
		onUpdate: (x: number, y: number) => {
			maskX = `${x}px`;
			maskY = `${y}px`;
		}
	});

	/**
	 * Convert CSS value to pixel position for mouse tracking coordinates
	 * Percentages: CSS mask-position uses (element - mask) * %, which positions the top-left of the mask
	 * Pixels: represent where the top-left of the mask should be
	 * Mouse tracking: calculates where top-left should be to center mask on cursor
	 */
	function convertToPixels(value: string, dimension: number): number {
		if (value.endsWith('%')) {
			const percentage = parseFloat(value) / 100;
			// CSS formula for mask-position percentage: (dimension - maskSize) * percentage
			return (dimension - maskSize) * percentage;
		} else {
			// Pixel values position the top-left corner directly
			return parseFloat(value);
		}
	}

	export function handleMouseMove(event: MouseEvent) {
		const target = event.currentTarget as HTMLElement;
		const rect = target.getBoundingClientRect();
		const x = event.clientX - rect.left - maskSize / 2;
		const y = event.clientY - rect.top - maskSize / 2;

		// On first mouse move, convert initial position from CSS values to pixels
		if (!isAnimating) {
			const startX = convertToPixels(initialX, rect.width);
			const startY = convertToPixels(initialY, rect.height);

			tracking.setCurrentPosition(startX, startY);
			tracking.updateTarget(x, y);
			tracking.start();
			isAnimating = true;
		} else {
			tracking.updateTarget(x, y);
		}
	}

	onMount(() => {
		return () => {
			if (isAnimating) {
				tracking.stop();
			}
		};
	});
</script>

<div
	class="mouse-tracking-mask {className}"
	style="--mask-x: {maskX}; --mask-y: {maskY}; --mask-size: {maskSize}px; --mask-image: {maskImage};"
>
	<slot />
</div>

<style>
	.mouse-tracking-mask {
		position: absolute;
		width: 100%;
		height: 100%;
		inset: 0;
		z-index: 0;

		mask-image: var(--mask-image);
		mask-position: var(--mask-x) var(--mask-y);
		mask-repeat: no-repeat;
		mask-size: var(--mask-size) var(--mask-size);
	}
</style>
