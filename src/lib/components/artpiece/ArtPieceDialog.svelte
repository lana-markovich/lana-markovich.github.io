<script lang="ts">
	import BaseDialog from "$lib/components/base/BaseDialog.svelte";
	import BaseImage from "$lib/components/base/BaseImage.svelte";
	import type { ArtPiece } from "$lib/types";

	interface Props {
		artPiece: ArtPiece;
		open?: boolean;
	}

	let { artPiece, open = $bindable(false) }: Props = $props();
</script>

<BaseDialog bind:open>
	<div class="art-piece-dialog">
		<div class="art-piece-dialog__image">
			<BaseImage name={artPiece.image.id} alt={artPiece.image.alt} loading="eager" />
		</div>
		<div class="art-piece-dialog__content">
			<button class="art-piece-dialog__close" onclick={() => (open = false)}>×</button>
			<h2 class="heading--lg">
				{artPiece.name}{#if artPiece.year}&nbsp;({artPiece.year}){/if}
			</h2>
			{#if artPiece.shortDescription}
				<p class="text--secondary">{artPiece.shortDescription}</p>
			{/if}
			{#if artPiece.description}
				<!-- eslint-disable-next-line svelte/no-at-html-tags -->
				<div class="text">{@html artPiece.description}</div>
			{/if}
		</div>
	</div>
</BaseDialog>

<style>
	.art-piece-dialog {
		display: grid;
		grid-template-columns: 45% 55%;
		max-height: 90vh;
		width: min(90vw, 56rem);
	}

	.art-piece-dialog__image {
		overflow: hidden;
	}

	.art-piece-dialog__image :global(img) {
		width: 100%;
		height: 100%;
		object-fit: cover;
	}

	.art-piece-dialog__content {
		position: relative;
		padding: 2rem;
		overflow-y: auto;
		display: flex;
		flex-direction: column;
		gap: 1rem;
	}

	.art-piece-dialog__close {
		position: absolute;
		top: 1rem;
		right: 1rem;
		background: none;
		border: none;
		font-size: 1.5rem;
		line-height: 1;
		cursor: pointer;
		color: var(--text-primary);
	}
</style>
