import type { Action } from 'svelte/action';
import { seenSections } from '$lib/stores/seenSections.svelte';

const sections = new Set<HTMLElement>();
let rafId: number | null = null;

function recompute(): void {
	rafId = null;
	const viewportMid = window.innerHeight / 2;

	for (const section of sections) {
		const id = section.id;
		if (!id) continue;
		const rect = section.getBoundingClientRect();
		if (rect.top < viewportMid) seenSections.add(id);
		else seenSections.delete(id);
	}
}

function schedule(): void {
	if (rafId === null) {
		rafId = requestAnimationFrame(recompute);
	}
}

function attach(): void {
	window.addEventListener('scroll', schedule, { passive: true });
	window.addEventListener('resize', schedule, { passive: true });
	schedule();
}

function detach(): void {
	window.removeEventListener('scroll', schedule);
	window.removeEventListener('resize', schedule);
	if (rafId !== null) {
		cancelAnimationFrame(rafId);
		rafId = null;
	}
}

/**
 * Tracks a `<section>` against the viewport midline and reflects its "seen"
 * state into the {@link seenSections} store (keyed by the section's `id`).
 * `BaseNav` reads that store reactively to highlight the matching nav link.
 *
 * Apply directly to the section element. Pass `false` to opt a section out.
 */
export const sectionHeading: Action<HTMLElement, boolean | undefined> = (node, enabled = true) => {
	if (!enabled) return;

	const wasEmpty = sections.size === 0;
	sections.add(node);

	if (wasEmpty) attach();
	else schedule();

	return {
		destroy() {
			sections.delete(node);
			if (node.id) seenSections.delete(node.id);
			if (sections.size === 0) detach();
			else schedule();
		},
	};
};
