<script lang="ts">
	import BaseSection from "$lib/components/layout/BaseSection.svelte";
	import BaseImage from "$lib/components/base/BaseImage.svelte";
	import { onMount } from 'svelte';

	let maskX = '50%';
	let maskY = '50%';
	let maskSize = 600;

	let targetX = 0;
	let targetY = 0;
	let currentX = 0;
	let currentY = 0;
	let animationFrameId: number;

	const lerp = (start: number, end: number, factor: number) => {
		return start + (end - start) * factor;
	};

	const animate = () => {
		const lerpFactor = 0.03;

		currentX = lerp(currentX, targetX, lerpFactor);
		currentY = lerp(currentY, targetY, lerpFactor);

		maskX = `${currentX}px`;
		maskY = `${currentY}px`;

		animationFrameId = requestAnimationFrame(animate);
	};

	function handleMouseMove(event: MouseEvent) {
		const target = event.currentTarget as HTMLElement;
		const rect = target.getBoundingClientRect();
		targetX = event.clientX - rect.left - maskSize / 2;
		targetY = event.clientY - rect.top - maskSize / 2;
	}

	onMount(() => {
		animationFrameId = requestAnimationFrame(animate);

		return () => {
			if (animationFrameId) {
				cancelAnimationFrame(animationFrameId);
			}
		};
	});
</script>

<BaseSection class="home-intro" onmousemove={handleMouseMove}>
	<svelte:fragment slot="prepend">
		<div
			class="home-intro__image-wrapper"
			style="--mask-x: {maskX}; --mask-y: {maskY}; --mask-size: {maskSize}px;"
		>
			<BaseImage
				name="intro"
			></BaseImage>
		</div>
	</svelte:fragment>

	<div class="home-intro__text-container">
		<p class="heading heading--lg home-intro__text">
			I create art across painting, graphics, and sculpture
		</p>
		<p class="heading heading--lg home-intro__text">
			exploring complex themes while preserving beauty in every piece.
		</p>
	</div>

</BaseSection>

<style>
	.home-intro__image-wrapper {
		position: absolute;
		width: 100%;
		height: 100%;
		inset: 0;
		z-index: 0;

		mask-image: linear-gradient(black, black);
		mask-position: var(--mask-x) var(--mask-y);
		mask-repeat: no-repeat;
		mask-size: var(--mask-size) var(--mask-size);
	}


	.home-intro__text-container {
		margin-top: 45rem;
		display: grid;
		grid-template-columns: var(--lines-columns-grid);
		row-gap: 2.5rem;
		grid-template-areas: "text1 text1 .    "
		                     ".     text2 text2";
	}

	.home-intro__text {
		max-inline-size: 26ch;
		text-wrap-style: balance;
		&:nth-child(1) {
			grid-area: text1;
		}
		&:nth-child(2) {
			grid-area: text2;
		}
	}
</style>