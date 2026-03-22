import type { Action } from 'svelte/action';

export interface ScrollProgressParams {
	/** Called with progress value 0–1 on each scroll update */
	onProgress: (progress: number) => void;
	/** Media query — if provided, resets progress to 0 when not matched */
	breakpoint?: string;
	/** Fraction of the viewport height used to calculate scroll range (default: 1) */
	screenCoverage?: number;
}

export const scrollProgress: Action<HTMLElement, ScrollProgressParams> = (element, params) => {
	let mediaQuery: MediaQueryList | null = null;
	let resizeObserver: ResizeObserver | null = null;

	function getProgress(): number {
		const coverage = params.screenCoverage ?? 1;
		const scrolled = Math.max(
			window.scrollY - element.offsetTop + (1 - coverage) * window.innerHeight,
			0
		);
		const total = element.scrollHeight + window.innerHeight * (1 - 2 * coverage);
		if (total <= 0) return 0;
		return Math.min(scrolled / total, 1);
	}

	function notify(): void {
		params.onProgress(getProgress());
	}

	function addScrollListener(): void {
		window.addEventListener('scroll', notify, { passive: true });
	}

	function removeScrollListener(): void {
		window.removeEventListener('scroll', notify);
	}

	function onBreakpointChange(): void {
		if (!mediaQuery || mediaQuery.matches) {
			notify();
			addScrollListener();
		} else {
			removeScrollListener();
			params.onProgress(0);
		}
	}

	function init(p: ScrollProgressParams): void {
		params = p;
		if (p.breakpoint) {
			mediaQuery = window.matchMedia(p.breakpoint);
			mediaQuery.addEventListener('change', onBreakpointChange);
		}
		resizeObserver = new ResizeObserver(() => {
			if (!mediaQuery || mediaQuery.matches) notify();
		});
		resizeObserver.observe(element);
		onBreakpointChange();
	}

	function cleanup(): void {
		removeScrollListener();
		resizeObserver?.disconnect();
		mediaQuery?.removeEventListener('change', onBreakpointChange);
		mediaQuery = null;
		resizeObserver = null;
	}

	init(params);

	return {
		update(newParams: ScrollProgressParams) {
			cleanup();
			init(newParams);
		},
		destroy() {
			cleanup();
		},
	};
};
