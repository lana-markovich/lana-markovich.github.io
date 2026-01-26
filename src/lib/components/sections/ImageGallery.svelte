<script lang="ts">
	import BaseSection from "$lib/components/layout/BaseSection.svelte";
	import DecorationWrapper from "$lib/components/base/DecorationWrapper.svelte";
	import DepthWrapper from "$lib/components/base/DepthWrapper.svelte";
	import BaseImage from "$lib/components/base/BaseImage.svelte";
</script>

<BaseSection type="primary" class="image-gallery">
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
</BaseSection>

<style>
	.image-gallery__image-wrapper {
		display: flex;
		justify-content: center;
		align-items: center;
		max-width: 50rem;
		margin-inline: auto;
	}

	:global(.image--abstract-1) {
		object-fit: cover;
		object-position: center;
	}
</style>
