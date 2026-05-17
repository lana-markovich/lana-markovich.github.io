<script lang="ts">
	import BaseSection from "$lib/components/layout/BaseSection.svelte";
	import DecorationWrapper from "$lib/components/base/DecorationWrapper.svelte";
	import BaseImage from "$lib/components/base/BaseImage.svelte";
	import { IMAGES } from "$lib/images";
</script>

<BaseSection type="secondary" class="about-me" id="about">
	<div class="about-me__container-inner">
		<h2 class="heading heading--md about-me__subheading">About me</h2>
		<h3 class="heading heading--lg about-me__heading">
			Master of Fine Arts —<br>
			Academy in Venice
		</h3>

		<p class="text about-me__text">
			Began my journey at belarusian art college, later continuing my studies at the Academy of Fine Arts in Wrocław
			(Poland) before specializing in painting and graphics in Venice.
		</p>

		<div class="about-me__image-wrapper">
			<DecorationWrapper decorationPosition="bottom-left">
				<BaseImage name={IMAGES['about-me'].id} alt={IMAGES['about-me'].alt}/>
			</DecorationWrapper>
		</div>
	</div>
</BaseSection>

<style>
	.about-me__subheading {
		margin-block-end: 2em;
		grid-area: subheading;
	}

	.about-me__heading {
		max-width: 28ch;
		grid-area: heading;
	}

	.about-me__text {
		grid-area: text;
		max-width: 45ch;
	}

	.about-me__container-inner {
		position: relative;
		display: grid;
		grid-template-columns: var(--lines-columns-grid);
		grid-template-areas: "subheading subheading image"
		                     "heading    heading    ."
		                     "text       text       .";
	}

	.about-me__image-wrapper {
		--min-height: calc(31rem + var(--container-padding-block));
		--max-height: calc(37.25rem + var(--container-padding-block));
		--fluid-height: clamp(
			var(--min-height),
			calc(var(--min-height) + (var(--max-height) - var(--max-height)) * ((100vw - var(--breakpoint-lg)) / (var(--breakpoint-xl) - var(--breakpoint-lg)))),
			var(--max-height)
		);

		grid-area: image;
		margin-top: calc(-1 * var(--container-padding-block));
		margin-right: calc(-1 * var(--container-to-screen-side-width));
		height: var(--fluid-height);
		max-height: var(--max-height);
		width: min(46.5rem, calc(var(--container-colunm-width) + var(--container-to-screen-side-width)));

		:global(.image--about-me) {
			object-fit: cover;
			object-position: 50% 76%;
		}
	}

</style>
