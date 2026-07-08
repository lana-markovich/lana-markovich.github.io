<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { Corner } from "$lib/types";

	let {
		decorationPosition,
		class: className,
		children,
		size: size = "medium",
	}: {
		decorationPosition: Corner;
		class?: string;
		children: Snippet;
		size?: "medium" | "small";
	} = $props();
</script>

<div class="decoration-wrapper decoration-wrapper--{decorationPosition} {className || ''} decoration-wrapper--size-{size}">
	{@render children()}
</div>

<style>
	.decoration-wrapper {
		--padding-size: 1rem;
		--decoration-width: 2.5em;
		--decoration-height: 8.125em;

		@media (max-width: 50rem) {
			--padding-size: 0.5rem;
		}

		display: flex;
		position: relative;
		width: 100%;
		max-height: 100%;

		&::before {
			content: "";
			z-index: 1;
			position: absolute;
			block-size: var(--decoration-height);
			inline-size: var(--decoration-width);
			border: var(--border--primary);
		}

		&.decoration-wrapper--size-small {
			--decoration-height: 2.5em;
		}
		@media (width <= 35rem) {
			--decoration-height: 2.5em;
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