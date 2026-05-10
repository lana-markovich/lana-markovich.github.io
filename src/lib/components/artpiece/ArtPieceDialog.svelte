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
		<button class="art-piece-dialog__close" onclick={() => (open = false)}>×</button>
		<div class="art-piece-dialog__images">
			<BaseImage
				name={artPiece.image.id}
				alt={artPiece.image.alt}
				sizes={[...artPiece.image.sizes]}
				loading="eager"
			/>
		</div>
		<div class="art-piece-dialog__content">
			<header class="art-piece-dialog__header">
				<h2 class="art-piece-dialog__heading heading heading--lg">
					{artPiece.name}{#if artPiece.year}&nbsp;({artPiece.year}){/if}
				</h2>
				{#if artPiece.shortDescription}
					<p class="art-piece-dialog__short-description text--secondary">{artPiece.shortDescription}</p>
				{/if}
			</header>
			{#if artPiece.description}
				<!-- eslint-disable-next-line svelte/no-at-html-tags -->
				<div class="text art-piece-dialog__description">{@html artPiece.description}</div>
			{/if}
		</div>
	</div>
</BaseDialog>

<style>
	.art-piece-dialog {
		padding: 1.5rem;
		background-color: var(--white);
		display: grid;
		gap: 1.5rem;
		grid-template-columns: auto 1fr;
		max-height: 90vh;
		width: min(90vw, 56rem);
	}
	.art-piece-dialog__close {
		position: absolute;
		top: 0.85rem;
		right: 1.25rem;
		background: none;
		border: none;
		font-size: 1.5rem;
		line-height: 1;
		padding: 0.5em;
		cursor: pointer;
		color: var(--text-primary);
	}

	.art-piece-dialog__images {
		width: fit-content;
		max-width: 28rem;
		overflow: hidden;
	}

	.art-piece-dialog__header {
		margin-block-end: 2.5rem;
	}

	.art-piece-dialog__heading {
		margin-block: 0 1rem;
		padding-inline-end: 1.5rem;
	}
	.art-piece-dialog__short-description {
		margin-block: 0;
	}

	.art-piece-dialog__description {
		display: flex;
		flex-direction: column;
		gap: 1.5em;
		text-wrap-style: balance;
		:global(p) {
			margin: 0;
		}
	}
</style>
