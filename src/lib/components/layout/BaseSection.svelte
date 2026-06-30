<script lang="ts">
	import type { Snippet } from 'svelte';
	import BaseContainer from "$lib/components/layout/BaseContainer.svelte";
	import { sectionHeading } from "$lib/utilities/sectionHeading";

	type SectionType = 'primary' | 'secondary';

	let {
		type = 'primary',
		class: className = '',
		tracked = false,
		children,
		prepend,
		...restProps
	}: {
		type?: SectionType;
		class?: string;
		tracked?: boolean;
		children?: Snippet;
		prepend?: Snippet;
		[key: string]: any;
	} = $props();
</script>

<section
	class="section {className}"
	class:section--secondary={type === 'secondary'}
	use:sectionHeading={tracked}
	{...restProps}
>
	{#if prepend}{@render prepend()}{/if}
	<BaseContainer>
		{@render children?.()}
	</BaseContainer>
</section>

<style>

	.section {
		position: relative;
		padding-inline: var(--section-padding-inline);
		background-color: var(--white);
		overflow: hidden;
	}

	.section--secondary {
		background-color: var(--black-200);
	}

</style>