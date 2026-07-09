<script lang="ts">
	import type { Snippet } from "svelte";
	import type { HTMLButtonAttributes, HTMLAnchorAttributes } from "svelte/elements";

	type Props = {
		variant?: "black" | "white";
		appearance?: "filled" | "link";
		href?: string;
		children: Snippet;
	} & Omit<HTMLButtonAttributes & HTMLAnchorAttributes, "children">;

	let { variant = "black", appearance = "filled", href, children, ...rest }: Props = $props();

	const classes = $derived(`button button--${appearance} button--${appearance}-${variant}`);
</script>

{#if href}
	<a class={classes} {href} {...rest}>
		<span class="button__label">{@render children()}</span>
	</a>
{:else}
	<button class={classes} {...rest}>
		<span class="button__label">{@render children()}</span>
	</button>
{/if}

<style>
	.button {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		border: none;
		cursor: pointer;
		text-decoration: none;
		font-family: inherit;
		transition:
			background-color 500ms ease,
			color 500ms ease,
			transform 500ms var(--easing-default),
			box-shadow 500ms ease;
	}

	.button--filled {
		min-inline-size: 11.375rem;
		min-block-size: 2.875rem;
		padding-inline: 1.25rem;
		padding-block: 0.5rem;
		box-shadow: 2px 2px 6px 0px rgba(0, 0, 0, 0.45);
		@media (width <= 35rem) {
			min-block-size: 2.5rem;
		}
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

	.button--filled:active {
		box-shadow: 1px 1px 2px 0px rgba(0, 0, 0, 0.45);
	}

	.button--filled:focus-visible {
		outline: none;
	}

	.button--filled-black {
		background-color: var(--black-800);
		color: var(--white);
	}

	.button--filled-black:hover {
		background-color: #1a1a1a;
		box-shadow: 4px 4px 12px 0px rgba(0, 0, 0, 0.55);
	}

	.button--filled-black:focus-visible {
		box-shadow:
			0 0 0 2px var(--black-800),
			0 0 0 4px var(--white),
			0 0 0 5px var(--black-800),
			2px 2px 6px 0px rgba(0, 0, 0, 0.45);
	}

	.button--filled-white {
		background-color: var(--white);
		color: var(--text-primary);
	}

	.button--filled-white:hover {
		background-color: var(--black-200);
		box-shadow: 4px 4px 12px 0px rgba(0, 0, 0, 0.55);
	}

	.button--filled-white:focus-visible {
		box-shadow:
			0 0 0 2px var(--white),
			0 0 0 4px var(--black-800),
			0 0 0 5px var(--white),
			2px 2px 6px 0px rgba(0, 0, 0, 0.45);
	}

	.button--link {
		background-color: transparent;
		padding: 0.375rem;
		min-height: unset;
	}

	.button--link:focus-visible {
		outline: 1px solid currentColor;
		outline-offset: 0.375em;
	}

	.button--link-black {
		color: var(--text-primary);
	}

	.button--link-black:hover {
		color: var(--text-secondary);
	}

	.button--link-white {
		color: var(--white);
	}

	.button--link-white:hover {
		color: color-mix(in srgb, var(--white) 80%, transparent);
	}
</style>
