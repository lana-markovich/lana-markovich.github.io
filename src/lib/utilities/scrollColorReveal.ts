import type { Action } from 'svelte/action';

export interface ScrollColorRevealParams {
	/** Pixels of scroll required to reveal one letter once the reveal has started. Default 8. */
	pxPerLetter?: number;
	/** Fraction of the viewport height (from the top) at which the element top must arrive for reveal to start. 1 = element top at viewport bottom (reveal starts the moment the element first appears); 0 = element top at viewport top (very late). Default 0.95. */
	startThreshold?: number;
	/** Per-letter color transition duration in ms. Default 300. */
	transitionMs?: number;
}

export const scrollColorReveal: Action<HTMLElement, ScrollColorRevealParams | undefined> = (
	element,
	params
) => {
	let currentParams: ScrollColorRevealParams = params ?? {};
	let letters: HTMLSpanElement[] = [];
	let revealedCount = 0;
	let startScrollY = 0;
	let resizeObserver: ResizeObserver | null = null;
	let rafId: number | null = null;
	let scrollPending = false;

	function splitText(): void {
		const walker = document.createTreeWalker(element, NodeFilter.SHOW_TEXT);
		const textNodes: Text[] = [];
		let node = walker.nextNode();
		while (node) {
			textNodes.push(node as Text);
			node = walker.nextNode();
		}

		const spans: HTMLSpanElement[] = [];
		for (const textNode of textNodes) {
			const text = textNode.nodeValue ?? '';
			if (text.length === 0) continue;

			const fragment = document.createDocumentFragment();
			let buffer = '';

			const flushWhitespace = () => {
				if (buffer.length > 0) {
					fragment.appendChild(document.createTextNode(buffer));
					buffer = '';
				}
			};

			for (const char of text) {
				if (/\s/.test(char)) {
					buffer += char;
				} else {
					flushWhitespace();
					const span = document.createElement('span');
					span.className = 'reveal-letter';
					span.textContent = char;
					fragment.appendChild(span);
					spans.push(span);
				}
			}
			flushWhitespace();

			textNode.parentNode?.replaceChild(fragment, textNode);
		}

		letters = spans;
	}

	function measure(): void {
		const startThreshold = currentParams.startThreshold ?? 0.85;
		const elementTopAbsolute = element.getBoundingClientRect().top + window.scrollY;
		startScrollY = elementTopAbsolute - window.innerHeight * startThreshold;
	}

	function reveal(): void {
		const pxPerLetter = currentParams.pxPerLetter ?? 10;
		const scrolledPast = window.scrollY - startScrollY;
		const targetCount = Math.max(0, Math.min(letters.length, Math.floor(scrolledPast / pxPerLetter)));
		while (revealedCount < targetCount) {
			letters[revealedCount].dataset.revealed = 'true';
			revealedCount++;
		}
	}

	function onScroll(): void {
		if (scrollPending) return;
		scrollPending = true;
		rafId = requestAnimationFrame(() => {
			scrollPending = false;
			rafId = null;
			reveal();
		});
	}

	function applyDuration(): void {
		const ms = currentParams.transitionMs ?? 300;
		element.style.setProperty('--reveal-letter-duration', `${ms}ms`);
	}

	function init(p: ScrollColorRevealParams | undefined): void {
		currentParams = p ?? {};
		applyDuration();
		splitText();
		measure();
		reveal();
		window.addEventListener('scroll', onScroll, { passive: true });
		resizeObserver = new ResizeObserver(() => {
			measure();
			reveal();
		});
		resizeObserver.observe(element);
	}

	function cleanup(): void {
		window.removeEventListener('scroll', onScroll);
		resizeObserver?.disconnect();
		resizeObserver = null;
		if (rafId !== null) {
			cancelAnimationFrame(rafId);
			rafId = null;
		}
		scrollPending = false;
	}

	init(params);

	return {
		update(newParams: ScrollColorRevealParams | undefined) {
			currentParams = newParams ?? {};
			applyDuration();
			measure();
			reveal();
		},
		destroy() {
			cleanup();
		}
	};
};
