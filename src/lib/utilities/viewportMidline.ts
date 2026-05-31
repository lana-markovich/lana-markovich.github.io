type Callback = (current: Element | null) => void;

type Entry = { elements: Set<Element>; callback: Callback; current: Element | null };

const entries = new Map<symbol, Entry>();
const elementToEntry = new Map<Element, Entry>();
let observer: IntersectionObserver | null = null;

function ensureObserver(): IntersectionObserver {
	if (!observer) {
		observer = new IntersectionObserver(handleEntries, {
			rootMargin: '-50% 0px -50% 0px',
			threshold: 0,
		});
	}
	return observer;
}

function handleEntries(observerEntries: IntersectionObserverEntry[]): void {
	const touched = new Set<Entry>();
	for (const obsEntry of observerEntries) {
		const entry = elementToEntry.get(obsEntry.target);
		if (!entry) continue;
		touched.add(entry);
		if (obsEntry.isIntersecting) {
			if (entry.current !== obsEntry.target) {
				entry.current = obsEntry.target;
				entry.callback(obsEntry.target);
			}
		} else if (entry.current === obsEntry.target) {
			entry.current = null;
			entry.callback(null);
		}
	}
}

export function observeMidline(elements: Element[], callback: Callback): () => void {
	const key = Symbol();
	const entry: Entry = { elements: new Set(elements), callback, current: null };
	entries.set(key, entry);

	const obs = ensureObserver();
	for (const el of entry.elements) {
		elementToEntry.set(el, entry);
		obs.observe(el);
	}

	return () => {
		for (const el of entry.elements) {
			elementToEntry.delete(el);
			observer?.unobserve(el);
		}
		entries.delete(key);
		if (entries.size === 0) {
			observer?.disconnect();
			observer = null;
		}
	};
}
