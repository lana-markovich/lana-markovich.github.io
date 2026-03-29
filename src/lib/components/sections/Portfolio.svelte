<script lang="ts">
	import BaseSection from "$lib/components/layout/BaseSection.svelte";
	import ArtPiecePreview from "$lib/components/artpiece/ArtPiecePreview.svelte";
	import { ART_PIECES } from "$lib/constants";

	const piece = ART_PIECES['jacket-1'];
</script>

<BaseSection type="primary" class="portfolio">
	<div class="portfolio__item">
		<ArtPiecePreview artPiece={piece} />
	</div>
</BaseSection>

<style>
	.portfolio__item {
		max-width: 30rem;
	}
</style>
