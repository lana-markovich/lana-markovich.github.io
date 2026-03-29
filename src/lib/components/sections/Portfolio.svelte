<script lang="ts">
	import BaseSection from "$lib/components/layout/BaseSection.svelte";
	import ArtPiecePreview from "$lib/components/base/ArtPiecePreview.svelte";
	import { ART_PIECES } from "$lib/constants";

	const piece = ART_PIECES['jacket-1'];
</script>

<BaseSection type="primary">
	<ArtPiecePreview artPiece={piece} />
</BaseSection>
