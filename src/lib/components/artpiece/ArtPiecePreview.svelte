<script lang="ts">
	import DepthWrapper from "$lib/components/base/DepthWrapper.svelte";
	import BaseImage from "$lib/components/base/BaseImage.svelte";
	import BaseBadge from "$lib/components/base/BaseBadge.svelte";
	import ArtPieceButton from "$lib/components/artpiece/ArtPieceButton.svelte";
	import ArtPieceDialog from "$lib/components/artpiece/ArtPieceDialog.svelte";
	import type { ArtPiece } from "$lib/types";

	let { artPiece }: { artPiece: ArtPiece } = $props();

	let button: ArtPieceButton;
	let dialogOpen = $state(false);
</script>

<div class="art-piece-preview">
	<div
		class="art-piece-preview__image"
		role="figure"
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
		{artPiece.name}{#if artPiece.year} ({artPiece.year}){/if}
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
</style>