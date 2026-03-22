<script lang="ts">
	import BaseSection from "$lib/components/layout/BaseSection.svelte";
	import DecorationWrapper from "$lib/components/base/DecorationWrapper.svelte";
	import DepthWrapper from "$lib/components/base/DepthWrapper.svelte";
	import BaseImage from "$lib/components/base/BaseImage.svelte";
	import { scrollProgress } from "$lib/utilities/scrollProgress";
	import { createLerpAnimation } from "$lib/utilities/lerpAnimation";
	import { onMount } from "svelte";

	let wrapperEl: HTMLDivElement;
	let imagesEl: HTMLDivElement;
	let wrapperWidth = $state(0);
	let contentWidth = $state(0);
	let progress = $state(0);

	const scrollTracking = createLerpAnimation({
		lerpFactor: 0.03,
		onUpdate: (x) => (progress = x)
});

	onMount(() => {
		scrollTracking.start();
		return () => scrollTracking.stop();
	});

	$effect(() => {
		const observer = new ResizeObserver((entries) => {
			for (const entry of entries) {
				const width = entry.contentRect.width;
				if (entry.target === wrapperEl) wrapperWidth = width;
				else if (entry.target === imagesEl) contentWidth = width;
			}
		});
		if (wrapperEl) observer.observe(wrapperEl);
		if (imagesEl) observer.observe(imagesEl);
		return () => observer.disconnect();
	});
</script>

<div use:scrollProgress={{
	screenCoverage: 0.7,
	onProgress: (p) => scrollTracking.updateTarget(p, 0) }
}>
	<BaseSection
		type="primary"
		class="image-gallery"
		style="--wrapper-width: {wrapperWidth}px; --content-width: {contentWidth}px; --scroll-progress: {progress}"
	>
		<div class="image-gallery__images-wrapper" bind:this={wrapperEl}>
			<div class="image-gallery__images" bind:this={imagesEl}>
				<div class="image-gallery__image-wrapper">
					<DecorationWrapper decorationPosition="top-right">
						<DepthWrapper>
							<BaseImage
								name="abstract-1"
								alt="Abstract artwork"
								sizes={[1280, 720]}
							/>
						</DepthWrapper>
					</DecorationWrapper>
				</div>
				<div class="image-gallery__image-wrapper">
					<DecorationWrapper decorationPosition="top-right">
						<DepthWrapper>
							<BaseImage
								name="abstract-1"
								alt="Abstract artwork"
								sizes={[1280, 720]}
							/>
						</DepthWrapper>
					</DecorationWrapper>
				</div>
				<div class="image-gallery__image-wrapper">
					<DecorationWrapper decorationPosition="top-right">
						<DepthWrapper>
							<BaseImage
								name="abstract-1"
								alt="Abstract artwork"
								sizes={[1280, 720]}
							/>
						</DepthWrapper>
					</DecorationWrapper>
				</div>
			</div>
		</div>
	</BaseSection>
</div>


<style>
	.image-gallery__images-wrapper {
		--max-shift: calc(var(--wrapper-width) - var(--content-width));
		max-width: 100%;
		transform: translateX(calc(var(--max-shift) * var(--scroll-progress)));
	}

	.image-gallery__images {
		--image-size: min(50rem, 80vw);
		--shift-step: var(--image-size) / 2;

		display: flex;
		gap: 2.5rem;
		inline-size: fit-content;
	}

	.image-gallery__image-wrapper {
		display: flex;
		justify-content: center;
		inline-size: var(--image-size);
		margin-inline: auto;
		flex-shrink: 0;
		align-items: start;
		&:nth-child(2) {
			margin-block-start: calc(var(--shift-step) * 1);
		}
		&:nth-child(3) {
			margin-block-start: calc(var(--shift-step) * 2);
		}
	}

	.image-gallery__images :global(.image) {
		object-fit: cover;
		object-position: center;
	}
</style>
