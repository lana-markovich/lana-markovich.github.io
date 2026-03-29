<script lang="ts">
	import type { Snippet } from "svelte";

	interface Props {
		open?: boolean;
		children: Snippet;
	}

	let { open = $bindable(false), children }: Props = $props();

	let dialog: HTMLDialogElement;

	$effect(() => {
		if (open) {
			dialog.showModal();
		} else {
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
	dialog::backdrop {
		background: rgba(0, 0, 0, 0.6);
	}
</style>
