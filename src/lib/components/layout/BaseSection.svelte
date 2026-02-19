<script lang="ts">
	import BaseContainer from "$lib/components/layout/BaseContainer.svelte";

	type SectionType = 'primary' | 'secondary';

	let {
		type = 'primary',
		class: className = '',
		...restProps
	}: {
		type?: SectionType;
		class?: string;
		[key: string]: any;
	} = $props();
</script>

<section class="section {className}" class:section--secondary={type === 'secondary'} {...restProps}>
	<slot name="prepend" />
	<BaseContainer>
		<slot />
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