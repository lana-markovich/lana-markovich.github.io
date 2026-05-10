<script lang="ts">
	import type { Snippet } from "svelte";

	interface Props {
		open?: boolean;
		children: Snippet;
	}

	let { open = $bindable(false), children }: Props = $props();

	let dialog: HTMLDialogElement | undefined;

	$effect(() => {
		if (!dialog) return;
		if (open) {
			dialog.showModal();
		} else if (dialog.open) {
			dialog.close();
		}
	});

	function handleClick(e: MouseEvent) {
		if (e.target === dialog) {
			dialog.close();
		}
	}
</script>

<dialog bind:this={dialog} onclose={() => (open = false)} onclick={handleClick}>
	{@render children()}
</dialog>

<style>
	dialog {
		border: none;
		padding: 0;
		background: transparent;

		opacity: 0;
		transform: translateY(8px) scale(0.98);
		transition:
			opacity 200ms ease-out,
			transform 200ms ease-out,
			overlay 200ms ease-out allow-discrete,
			display 200ms ease-out allow-discrete;
	}

	dialog[open] {
		opacity: 1;
		transform: translateY(0) scale(1);
	}

	@starting-style {
		dialog[open] {
			opacity: 0;
			transform: translateY(8px) scale(0.98);
		}
	}

	dialog::backdrop {
		background: rgba(0, 0, 0, 0);
		transition:
			background 200ms ease-out,
			display 200ms ease-out allow-discrete,
			overlay 200ms ease-out allow-discrete;
	}

	dialog[open]::backdrop {
		background: rgba(0, 0, 0, 0.6);
	}

	@starting-style {
		dialog[open]::backdrop {
			background: rgba(0, 0, 0, 0);
		}
	}
</style>
