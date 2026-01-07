<script lang="ts">
	import BaseContainer from "$lib/components/layout/BaseContainer.svelte";

	type SectionType = 'primary' | 'secondary';

	let { type = 'primary' }: { type?: SectionType } = $props();
</script>

<section class="section" class:section--secondary={type === 'secondary'}>

	<BaseContainer>
		<slot />
	</BaseContainer>
</section>

<style>
	.section {
		position: relative;
		padding-inline: var(--section-padding-inline);
		background-color: var(--white);
	}

	.section--secondary {
		background-color: var(--black-200);
	}

</style>