<script lang="ts">
	import type { Snippet } from "svelte";
	import type { HTMLButtonAttributes, HTMLAnchorAttributes } from "svelte/elements";

	type Props = {
		variant?: "black" | "white";
		href?: string;
		children: Snippet;
	} & Omit<HTMLButtonAttributes & HTMLAnchorAttributes, "children">;

	let { variant = "black", href, children, ...rest }: Props = $props();
</script>

{#if href}
	<a class="button button--{variant}" {href} {...rest}>
		<span class="button__label">{@render children()}</span>
	</a>
{:else}
	<button class="button button--{variant}" {...rest}>
		<span class="button__label">{@render children()}</span>
	</button>
{/if}

<style>
	.button {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		min-inline-size: 11.375rem;
		min-block-size: 2.875rem;
		padding-inline: 1.25rem;
		padding-block: 0.5rem;
		border: none;
		cursor: pointer;
		text-decoration: none;
		font-family: inherit;
		box-shadow: 2px 2px 6px 0px rgba(0, 0, 0, 0.45);
		transition:
			background-color 300ms var(--easing-default),
			color 300ms var(--easing-default),
			transform 300ms var(--easing-default),
			box-shadow 300ms var(--easing-default);
	}

	.button__label {
		font-size: 0.875rem;
		font-weight: 500;
		line-height: 1em;
		text-transform: uppercase;
		text-decoration: underline;
		text-decoration-thickness: 1px;
		text-underline-offset: 0.25em;
		transition: text-underline-offset 300ms var(--easing-default);
	}

	.button:hover .button__label,
	.button:focus-visible .button__label {
		text-underline-offset: 0.4em;
	}

	.button:active {
		box-shadow: 1px 1px 2px 0px rgba(0, 0, 0, 0.45);
	}

	.button:focus-visible {
		outline: none;
	}

	.button--black {
		background-color: var(--black-800);
		color: var(--white);
	}

	.button--black:hover {
		background-color: #1a1a1a;
		box-shadow: 4px 4px 12px 0px rgba(0, 0, 0, 0.55);
	}

	.button--black:focus-visible {
		box-shadow:
			0 0 0 2px var(--black-800),
			0 0 0 4px var(--white),
			0 0 0 5px var(--black-800),
			2px 2px 6px 0px rgba(0, 0, 0, 0.45);
	}

	.button--white {
		background-color: var(--white);
		color: var(--text-primary);
	}

	.button--white:hover {
		background-color: var(--black-200);
		box-shadow: 4px 4px 12px 0px rgba(0, 0, 0, 0.55);
	}

	.button--white:focus-visible {
		box-shadow:
			0 0 0 2px var(--white),
			0 0 0 4px var(--black-800),
			0 0 0 5px var(--white),
			2px 2px 6px 0px rgba(0, 0, 0, 0.45);
	}
</style>
