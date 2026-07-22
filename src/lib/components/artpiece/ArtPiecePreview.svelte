<script lang="ts">
	import DepthWrapper from "$lib/components/base/DepthWrapper.svelte";
	import BaseImage from "$lib/components/base/BaseImage.svelte";
	import BaseBadge from "$lib/components/base/BaseBadge.svelte";
	import ArtPieceButton from "$lib/components/artpiece/ArtPieceButton.svelte";
	import ArtPieceDialog from "$lib/components/artpiece/ArtPieceDialog.svelte";
	import type { ArtPiece } from "$lib/types";

	let { artPiece, aspectRatio = 408 / 600 }: { artPiece: ArtPiece; aspectRatio?: number } = $props();

	let button: ArtPieceButton;
	let dialogOpen = $state(false);
</script>

<div class="art-piece-preview art-piece-preview--{artPiece.id}">
	<div
		class="art-piece-preview__image"
		role="figure"
		style="aspect-ratio: {aspectRatio}; --focal-x: {artPiece.image.focalPoint.x * 100}%; --focal-y: {artPiece.image.focalPoint.y * 100}%;"
		onclick={() => (dialogOpen = true)}
		onmouseenter={(e) => button.handleMouseEnter(e)}
		onmousemove={(e) => button.handleMouseMove(e)}
		onmouseleave={() => button.handleMouseLeave()}
	>
		<ArtPieceButton bind:this={button} />
		<DepthWrapper>
			<BaseImage name={artPiece.image.id} alt={artPiece.image.alt} />
		</DepthWrapper>
	</div>
	<BaseBadge>
		{artPiece.name}{#if artPiece.year} <span class="art-piece-preview__year">({artPiece.year})</span>{/if}
		<svelte:fragment slot="text">
			{#if artPiece.shortDescription}
				{artPiece.shortDescription}
			{/if}
		</svelte:fragment>
	</BaseBadge>
</div>
<ArtPieceDialog {artPiece} bind:open={dialogOpen} />

<style>
	.art-piece-preview {
		display: flex;
		flex-direction: column;
		gap: 1rem;
	}

	.art-piece-preview__image {
		position: relative;
		overflow: hidden;
	}

	.art-piece-preview__image:hover {
		cursor: none;
	}

	/* BaseBadge forces nowrap; here a long caption would widen the grid track
	   and push the column past the viewport, so let it wrap instead. */
	.art-piece-preview :global(.badge .heading--xs),
	.art-piece-preview :global(.badge .text--secondary) {
		white-space: normal;
	}

	/* Keep "(year)" from breaking apart, but let it wrap onto its own line as a
	   whole when the badge is too narrow (e.g. on mobile). */
	.art-piece-preview__year {
		white-space: nowrap;
	}

	.art-piece-preview__image :global(.depth-wrapper),
	.art-piece-preview__image :global(.depth-wrapper__content) {
		width: 100%;
		height: 100%;
	}

	.art-piece-preview__image :global(picture),
	.art-piece-preview__image :global(img) {
		width: 100%;
		height: 100%;
		object-fit: cover;
		object-position: var(--focal-x, 50%) var(--focal-y, 50%);
	}
</style>