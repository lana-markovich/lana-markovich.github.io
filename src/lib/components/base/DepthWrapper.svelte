<script lang="ts">
	import type { DepthWrapperProps } from '$lib/types';
	import { createLerpAnimation } from '$lib/utilities/lerpAnimation';
	import { onMount, untrack } from 'svelte';

	let {
		parallax = true,
		scale = 1.11,
		intensity = 0.05,
		lerpFactor = 0.03,
		perspective = 2000,
		class: className = '',
		children
	}: DepthWrapperProps = $props();

	// State for CSS custom properties
	let translateX = $state(0);
	let translateY = $state(0);
	let translateZ = $state(0);
	let rotateX = $state(0);
	let rotateY = $state(0);
	let isTracking = $state(false);

	// Create tracking instance for translation
	const tracking = createLerpAnimation({
		lerpFactor: untrack(() => lerpFactor),
		offsetX: 0,
		offsetY: 0,
		offsetZ: 0,
		onUpdate: (x: number, y: number, z: number = 0) => {
			translateX = x;
			translateY = y;
			translateZ = z;
		}
	});

	// Create tracking instance for rotation
	const rotationTracking = createLerpAnimation({
		lerpFactor: untrack(() => lerpFactor),
		onUpdate: (x: number, y: number) => {
			rotateY = x;
			rotateX = y;
		}
	});

	/**
	 * Handle mouse move events and calculate parallax effect
	 * Content moves in opposite direction from cursor (parallax effect)
	 */
	function handleMouseMove(event: MouseEvent) {
		if (!parallax) return;

		const rect = (event.currentTarget as HTMLElement).getBoundingClientRect();

		// Calculate offset from center as percentage of dimensions
		const centerX = rect.width / 2;
		const centerY = rect.height / 2;
		const mouseX = event.clientX - rect.left;
		const mouseY = event.clientY - rect.top;
		const offsetX = mouseX - centerX;
		const offsetY = mouseY - centerY;

		// Convert to percentage of element dimensions
		const offsetXPercent = (offsetX / rect.width) * 100;
		const offsetYPercent = (offsetY / rect.height) * 100;

		// Invert direction and apply intensity
		const targetX = -(offsetXPercent * intensity);
		const targetY = -(offsetYPercent * intensity);

		// Calculate Z-axis based on radial distance from center
		const normalizedX = offsetXPercent / 100;  // -0.5 to +0.5
		const normalizedY = offsetYPercent / 100;  // -0.5 to +0.5
		const distanceFromCenter = Math.sqrt(
			normalizedX * normalizedX +
			normalizedY * normalizedY
		);
		// Negative for backward movement (cave effect)
		// 500px multiplier scales Z to match X/Y movement range
		const targetZ = -(distanceFromCenter * intensity * 500);

		// Calculate rotation to face cursor
		// Y rotation controlled by X offset (left/right tilt)
		// X rotation controlled by Y offset (up/down tilt), inverted for natural feel
		const targetRotateY = normalizedX * intensity * 200;
		const targetRotateX = -(normalizedY * intensity * 200);

		// Lazy initialization
		if (!isTracking) {
			tracking.setCurrentPosition(0, 0, 0);
			rotationTracking.setCurrentPosition(0, 0);
			tracking.start();
			rotationTracking.start();
			isTracking = true;
		}

		tracking.updateTarget(targetX, targetY, targetZ);
		rotationTracking.updateTarget(targetRotateY, targetRotateX);
	}

	onMount(() => {
		return () => {
			if (isTracking) {
				tracking.stop();
				rotationTracking.stop();
			}
		};
	});
</script>

<div
	class="depth-wrapper {className}"
	onmousemove={handleMouseMove}
	role="group"
	style="--perspective: {perspective}px;"
>
	<div
		class="depth-wrapper__content"
		style="--translate-x: {translateX}%; --translate-y: {translateY}%; --translate-z: {translateZ}px; --rotate-x: {rotateX}deg; --rotate-y: {rotateY}deg; --scale: {parallax ? scale : 1};"
	>
		{@render children()}
	</div>
</div>

<style>
	.depth-wrapper {
		position: relative;
		overflow: hidden; /* Crop scaled content */
		/* 3D context */
		perspective: var(--perspective, 2000px);
		transform-style: preserve-3d;
	}

	/* Pseudo-element for inset shadow - renders above transformed content */
	.depth-wrapper::before {
		content: '';
		position: absolute;
		inset: 0; /* Fill parent completely */
		box-shadow: inset 2px 2px 20px 0px rgba(0, 0, 0, 0.45);
		pointer-events: none; /* Allow mouse events to pass through to content */
		z-index: 1; /* Above content */
	}

	.depth-wrapper__content {
		width: 100%;
		height: 100%;
		position: relative;
		z-index: 0; /* Below pseudo-element shadow */
		/* Use translate3d for combined XYZ transform */
		transform: translate3d(var(--translate-x, 0), var(--translate-y, 0), var(--translate-z, 0))
			rotateX(var(--rotate-x, 0))
			rotateY(var(--rotate-y, 0))
			scale(var(--scale, 1));
		will-change: transform; /* GPU acceleration */
	}
</style>
