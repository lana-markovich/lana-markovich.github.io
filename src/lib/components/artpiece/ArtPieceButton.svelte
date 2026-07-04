<script lang="ts">
	import { createLerpAnimation } from '$lib/utilities/lerpAnimation';
	import { onMount } from 'svelte';

	let x = $state(0);
	let y = $state(0);
	let visible = $state(false);

	const tracking = createLerpAnimation({
		lerpFactor: 0.1,
		onUpdate: (newX: number, newY: number) => {
			x = newX;
			y = newY;
		}
	});

	export function handleMouseEnter(event: MouseEvent) {
		const target = event.currentTarget as HTMLElement;
		const rect = target.getBoundingClientRect();
		const startX = event.clientX - rect.left - 50;
		const startY = event.clientY - rect.top - 50;

		tracking.setCurrentPosition(startX, startY);
		tracking.start();
		visible = true;
	}

	export function handleMouseMove(event: MouseEvent) {
		const target = event.currentTarget as HTMLElement;
		const rect = target.getBoundingClientRect();
		const targetX = event.clientX - rect.left - 50;
		const targetY = event.clientY - rect.top - 50;

		tracking.updateTarget(targetX, targetY);
	}

	export function handleMouseLeave() {
		visible = false;
		tracking.stop();
	}

	onMount(() => {
		return () => tracking.stop();
	});
</script>

<button
	class="art-piece-button"
	class:visible
	style="left: {x}px; top: {y}px;"
>
	Open
</button>

<style>
	.art-piece-button {
		font-family: var(--font-base);
		color: var(--white);
		font-weight: 600;
		letter-spacing: -0.02em;
		line-height: 1.25em;
		font-size: 1rem;
		position: absolute;
		width: 6.25rem;
		height: 6.25rem;
		padding: 0.75em;
		border-radius: 50%;
		background-color: color-mix(in srgb, var(--white) 1%, transparent);
		pointer-events: none;
		opacity: 0;
		transition: opacity 0.3s ease;
		z-index: 10;
		backdrop-filter: blur(40px);
		border: 1px color-mix(in srgb, var(--white) 20%, transparent) solid;
	}

	.art-piece-button.visible {
		opacity: 1;
	}
</style>
