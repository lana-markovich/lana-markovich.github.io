<script lang="ts">
	import type { Snippet } from 'svelte';

	let {
		decorationPosition,
		class: className,
		children
	}: {
		decorationPosition: `${"top" | "bottom"}-${"left" | "right"}`;
		class?: string;
		children: Snippet;
	} = $props();
</script>

<div class="decoration-wrapper decoration-wrapper--{decorationPosition} {className || ''}">
	{@render children()}
</div>

<style>
	.decoration-wrapper {
		--padding-size: 1rem;
		display: flex;
		position: relative;
		width: 100%;
		max-height: 100%;

		&::before {
			content: "";
			z-index: 1;
			position: absolute;
			block-size: 8.125em;
			inline-size: 2.5em;
			border: 1px solid var(--text-primary);
			opacity: 0.5;
		}

		&.decoration-wrapper--top-left {
			padding-top: var(--padding-size);
			padding-left: var(--padding-size);
			&::before {
				top: 0;
				left: 0;
				border-bottom: none;
				border-right: none;
			}
		}
		&.decoration-wrapper--top-right {
			padding-top: var(--padding-size);
			padding-right: var(--padding-size);
			&::before {
				top: 0;
				right: 0;
				border-bottom: none;
				border-left: none;
			}
		}
		&.decoration-wrapper--bottom-left {
			padding-bottom: var(--padding-size);
			padding-left: var(--padding-size);
			&::before {
				bottom: 0;
				left: 0;
				border-top: none;
				border-right: none;
			}
		}
		&.decoration-wrapper--bottom-right {
			padding-bottom: var(--padding-size);
			padding-right: var(--padding-size);
			&::before {
				bottom: 0;
				right: 0;
				border-top: none;
				border-left: none;
			}
		}
	}
</style>