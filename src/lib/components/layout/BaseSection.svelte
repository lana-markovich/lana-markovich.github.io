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

	.section::before {
		content: "";
		position: absolute;
		inset: 0;
		background-image: var(--bg-image);
		background-size: 100%;
		background-repeat: no-repeat;
		background-position: center;
		opacity: 0;
		transition: opacity 1s ease;
		pointer-events: none;
		z-index: 0;
	}

	.section.has-bg::before {
		opacity: 1;

	}

	.section > * {
		position: relative;
		z-index: 1;
	}

</style>