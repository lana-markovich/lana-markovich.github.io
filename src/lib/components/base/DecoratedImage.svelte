<script lang="ts">
	import type { DecoratedImageProps } from '$lib/types';
	import BaseImage from './BaseImage.svelte';

	let {
		decorationPosition,
		...baseImageProps
	}: DecoratedImageProps = $props();
</script>

<div class="decorated-image decorated-image--{decorationPosition} decorated-image--{baseImageProps.name}">
	<BaseImage {...baseImageProps}/>
</div>

<style>
	.decorated-image {
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
		}

		&.decorated-image--top-left {
			padding-top: var(--padding-size);
			padding-left: var(--padding-size);
			&::before {
				top: 0;
				left: 0;
				border-bottom: none;
				border-right: none;
			}
		}
		&.decorated-image--top-right {
			padding-top: var(--padding-size);
			padding-right: var(--padding-size);
			&::before {
				top: 0;
				right: 0;
				border-bottom: none;
				border-left: none;
			}
		}
		&.decorated-image--bottom-left {
			padding-bottom: var(--padding-size);
			padding-left: var(--padding-size);
			&::before {
				bottom: 0;
				left: 0;
				border-top: none;
				border-right: none;
			}
		}
		&.decorated-image--bottom-right {
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