<script lang="ts">
	import BaseSection from "$lib/components/layout/BaseSection.svelte";
	import FramedImage from "$lib/components/base/FramedImage.svelte";
	import { IMAGES } from "$lib/images";
	import type { ImageEntry } from "$lib/types";
	import { sectionHeading } from "$lib/utilities/sectionHeading";

	type Service = {
		title: string;
		image: ImageEntry;
		paragraphs: string[];
		tags: string[];
	};

	const services: Service[] = [
		{
			title: 'Custom Paintings',
			image: IMAGES['portrait-1'],
			paragraphs: [
				'I create original paintings on commission, working closely with you to capture the subject, mood, and palette you have in mind.',
				'Each piece is crafted with care and attention to detail, resulting in a one-of-a-kind artwork made just for you.',
			],
			tags: ['portrait', 'abstract', 'canvas'],
		},
		{
			title: 'Print Design',
			image: IMAGES['capture-emotions'],
			paragraphs: [
				'I design prints for posters, apparel, and editorial use, blending illustration and typography into bold, distinctive visuals.',
				'From concept to final file, I deliver print-ready artwork tailored to your brand and intended medium.',
			],
			tags: ['poster', 'apparel', 'editorial'],
		},
		{
			title: 'Interior Design',
			image: IMAGES['deer'],
			paragraphs: [
				'I bring interiors to life through custom hand-painted designs on furniture, walls, clothing, and various surfaces. From bold murals to delicate details.',
				'I transform everyday objects into unique art pieces that add personality and character to your space. Each project is tailored to complement your style and vision.',
			],
			tags: ['wallart', 'decor', 'interior'],
		},
	];

	let activeIndex = $state(0);
</script>

<BaseSection class="services" id="services">
	<h2 class="heading heading--md" use:sectionHeading>Services</h2>
	<ol class="services__list">
		{#each services as service, i}
			<li class="service" class:service--active={i === activeIndex}>
				<div
					class="service__inner"
					role="button"
					tabindex="0"
					onmouseenter={() => (activeIndex = i)}
					onfocus={() => (activeIndex = i)}
					onclick={() => (activeIndex = i)}
					onkeydown={(e) => {
						if (e.key === "Enter" || e.key === " ") {
							e.preventDefault();
							activeIndex = i;
						}
					}}
				>
					<header class="service__header">
						<span class="service__index text text--secondary">-{i + 1}</span>
						<h3 class="service__heading heading heading--sm">{service.title}</h3>
					</header>
					<div class="service__main">
						<FramedImage class="service__image" image={service.image} />
						<div class="service__text">
							{#each service.paragraphs as paragraph}
								<p class="text text--secondary">{paragraph}</p>
							{/each}
						</div>
						<div class="service__tags">
							{#each service.tags as tag}
								<p class="service__tag heading heading--lg">{tag}</p>
							{/each}
						</div>
					</div>
				</div>
			</li>
		{/each}
	</ol>
</BaseSection>

<style>
	.services__list {
		display: flex;
		container-type: inline-size;
		position: relative;
		&::before {
			content: "";
			position: absolute;
			inset-inline-start: 50%;
			transform: translateX(-50%);
			width: 100vw;
			border-block-start: var(--border--primary);
		}
	}

	.service {
		position: relative;
		flex: 1683 1 0;
		overflow: hidden;
		transition: flex-grow 0.7s var(--easing-default);
		cursor: pointer;
		border-inline-start: var(--border--primary);
		&::before {
			content: "";
			position: absolute;
			inset-block-end: 0;
			inset-inline-start: 0;
			width: 2.5rem;
			border-block-end: var(--border--primary);
		}
	}
	.service:nth-child(1):not(.service--active),
	.service:nth-child(2):not(.service--active) {
		flex: 408 1 0;
	}
	.service:nth-child(3):not(.service--active) {
		flex: 384 1 0;
	}
	.service:nth-child(3).service--active {
		flex: 1584 1 0;
	}
	.service__header {
		padding: 0.5rem;
		padding-block-end: 2.5rem;
		display: flex;
		flex-direction: column;
		gap: 0.25rem;
	}
	.service__index {
		font-weight: 700;
	}
	.service__heading {
		margin-block: 0;
	}
	:global(.service__image),
	.service__text,
	.service__tags {
		transition: opacity 0.7s var(--easing-default);
	}
	.service__inner {
		width: calc(100cqw * 816 / 1200);
	}
	.service:nth-child(3) .service__inner {
		width: calc(100cqw * 792 / 1200);
	}
	.service__main {
		display: grid;
		grid-template-areas: "image text"
		                     "image tags";
		grid-template-columns: 17.625rem 1fr;
		grid-template-rows: 1fr auto;
		gap: 1.5rem;
	}
	:global(.service__image) {
		grid-area: image;
		min-height: 31rem;
	}
	.service__text {
		grid-area: text;
		max-width: 25rem;
		text-wrap: pretty;
		padding-inline-end: 0.5em;
	}
	.service__tags {
		grid-area: tags;
	}
	.service__tag {
		margin-block: 0;
		color: var(--text-tertiary);
	}

	.service:not(.service--active) {
		:global(.service__image),
		.service__text,
		.service__tags {
			opacity: 0;
		}
	}

	/* Tablets and below: vertical tap-to-expand accordion instead of the horizontal one. */
	@container base-container (width <= 60rem) {
		.services__list {
			flex-direction: column;
		}

		/* Neutralize the desktop horizontal flex sizing — a flex-basis:0 item in a column
		   container with overflow:hidden collapses to height 0. Match the nth-child specificity. */
		.service,
		.service:nth-child(1):not(.service--active),
		.service:nth-child(2):not(.service--active),
		.service:nth-child(3):not(.service--active),
		.service:nth-child(3).service--active {
			flex: 0 0 auto;
		}

		.service {
			border-inline-start: none;
			border-block-start: var(--border--primary);
			cursor: pointer;
			&::before {
				content: none;
			}
		}
		.service:first-child {
			border-block-start: none;
		}

		.service__header {
			padding-block-end: 1.25rem;
		}

		/* Smooth collapse/expand: header stays (auto), content row animates 0fr -> 1fr.
		   .service__main needs overflow:hidden + min-height:0 to clip while the track shrinks. */
		.service__inner,
		.service:nth-child(3) .service__inner {
			width: 100%;
			display: grid;
			grid-template-rows: auto 0fr;
			transition: grid-template-rows 0.7s var(--easing-default);
		}
		.service--active .service__inner {
			grid-template-rows: auto 1fr;
		}
		.service__main {
			overflow: hidden;
			min-height: 0;
		}

		/* Keep image beside text, but shrink the image column to fit narrow screens. */
		.service__main {
			grid-template-columns: minmax(8rem, 32%) 1fr;
			gap: 1rem;
		}
		:global(.service__image) {
			min-height: 14rem;
		}
	}

	/* Phones: tighten the side-by-side layout further. */
	@container base-container (width <= 33rem) {
		.service__main {
			grid-template-columns: 7rem 1fr;
			gap: 0.75rem;
		}
		:global(.service__image) {
			min-height: 11rem;
		}
	}
</style>
