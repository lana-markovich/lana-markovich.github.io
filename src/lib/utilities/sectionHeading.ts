import type { Action } from 'svelte/action';
import { observeMidline } from './viewportMidline';

const CURRENT_CLASS = 'section-heading';

const headings = new Map<Element, HTMLElement>();
let stop: (() => void) | null = null;

function refresh(): void {
	if (stop) {
		stop();
		stop = null;
	}
	if (headings.size === 0) return;

	stop = observeMidline(Array.from(headings.keys()), (current) => {
		for (const [section, heading] of headings) {
			heading.classList.toggle(CURRENT_CLASS, section === current);
		}
	});
}

export const sectionHeading: Action<HTMLElement> = (node) => {
	const section = node.closest('section');
	if (!section) return;

	headings.set(section, node);
	refresh();

	return {
		destroy() {
			headings.delete(section);
			node.classList.remove(CURRENT_CLASS);
			refresh();
		},
	};
};
