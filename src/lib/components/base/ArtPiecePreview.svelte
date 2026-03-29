<script lang="ts">
	import DepthWrapper from "$lib/components/base/DepthWrapper.svelte";
	import BaseImage from "$lib/components/base/BaseImage.svelte";
	import BaseBadge from "$lib/components/base/BaseBadge.svelte";
	import type { ArtPiece } from "$lib/types";

	let { artPiece }: { artPiece: ArtPiece } = $props();
</script>

<div class="art-piece-preview">
	<DepthWrapper>
		<BaseImage name={artPiece.image.id} alt={artPiece.image.alt} />
	</DepthWrapper>
	<BaseBadge>
		{artPiece.name}{#if artPiece.year} ({artPiece.year}){/if}
		<svelte:fragment slot="text">{artPiece.shortDescription}</svelte:fragment>
	</BaseBadge>
</div>

<style>
	.art-piece-preview {
		display: flex;
		flex-direction: column;
		gap: 1rem;
	}
</style>
