import type { Action } from 'svelte/action';

const CURRENT_CLASS = 'section-heading';

const registry = new Map<Element, HTMLElement>();
let observer: IntersectionObserver | null = null;
let currentSection: Element | null = null;

function applyCurrent(next: Element | null): void {
	if (next === currentSection) return;
	currentSection = next;
	for (const [section, heading] of registry) {
		heading.classList.toggle(CURRENT_CLASS, section === currentSection);
	}
}

function handleEntries(entries: IntersectionObserverEntry[]): void {
	for (const entry of entries) {
		if (entry.isIntersecting) {
			applyCurrent(entry.target);
			return;
		}
		if (entry.target === currentSection) {
			applyCurrent(null);
		}
	}
}

function ensureObserver(): IntersectionObserver {
	if (!observer) {
		observer = new IntersectionObserver(handleEntries, {
			rootMargin: '-50% 0px -50% 0px',
			threshold: 0,
		});
	}
	return observer;
}

export const sectionHeading: Action<HTMLElement> = (node) => {
	const section = node.closest('section');
	if (!section) return;

	registry.set(section, node);
	ensureObserver().observe(section);

	return {
		destroy() {
			observer?.unobserve(section);
			registry.delete(section);
			node.classList.remove(CURRENT_CLASS);
			if (currentSection === section) currentSection = null;
			if (registry.size === 0) {
				observer?.disconnect();
				observer = null;
				currentSection = null;
			}
		},
	};
};
