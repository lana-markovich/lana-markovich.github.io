import type { Action } from 'svelte/action';
import { seenSections } from '$lib/stores/seenSections.svelte';

const CURRENT_CLASS = 'section-heading';

const headings = new Map<Element, HTMLElement>();
let rafId: number | null = null;

function recompute(): void {
	rafId = null;
	const viewportMid = window.innerHeight / 2;

	for (const section of headings.keys()) {
		const rect = section.getBoundingClientRect();
		const sectionMid = rect.top + rect.height / 2;
		const seen = sectionMid < viewportMid;
		const id = (section as HTMLElement).id;
		if (!id) continue;
		if (seen) seenSections.add(id);
		else seenSections.delete(id);
	}

	for (const [section, heading] of headings) {
		heading.classList.toggle(CURRENT_CLASS, seenSections.has((section as HTMLElement).id));
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

export const sectionHeading: Action<HTMLElement> = (node) => {
	const section = node.closest('section');
	if (!section) return;

	const wasEmpty = headings.size === 0;
	headings.set(section, node);

	if (seenSections.has((section as HTMLElement).id)) {
		node.classList.add(CURRENT_CLASS);
	}

	if (wasEmpty) attach();
	else schedule();

	return {
		destroy() {
			headings.delete(section);
			node.classList.remove(CURRENT_CLASS);
			if (headings.size === 0) detach();
			else schedule();
		},
	};
};
