import type { Action } from 'svelte/action';
import { getScale } from './dockScale';

export interface ScrollDockEffectParams {
	/** Maximum scale factor for the item at the viewport midline (default: 1.4) */
	maxScale?: number;
	/** Scale factor for items far from the midline (default: 1) */
	minScale?: number;
	/** Number of neighboring items affected on each side (default: 2) */
	affectedNeighbors?: number;
	/** Extra vertical margin in px added per unit of scale above 1.0 (default: 15) */
	spreadFactor?: number;
	/** Media query — if provided, the effect is only active while it matches */
	breakpoint?: string;
}

export const scrollDockEffect: Action<HTMLElement, ScrollDockEffectParams> = (element, params) => {
	let currentParams: ScrollDockEffectParams = params;
	let mediaQuery: MediaQueryList | null = null;
	let resizeObserver: ResizeObserver | null = null;
	let rafId: number | null = null;
	let updatePending = false;
	let isActive = false;

	function applyScales(): void {
		const { maxScale = 1.4, minScale = 1, affectedNeighbors = 2, spreadFactor = 15 } = currentParams;
		const children = Array.from(element.children) as HTMLElement[];
		if (children.length === 0) return;

		const midlineY = window.innerHeight / 2;
		// offsetHeight ignores transforms, keeping maxDistance stable while children scale
		const avgHeight = children.reduce((sum, child) => sum + child.offsetHeight, 0) / children.length;
		const maxDistance = avgHeight * (affectedNeighbors + 0.5);

		children.forEach(child => {
			const rect = child.getBoundingClientRect();
			const distance = rect.top + rect.height / 2 - midlineY;
			const scale = getScale(distance, maxScale, maxDistance, minScale);
			child.style.transform = `scale(${scale})`;
			const extraMargin = (scale - 1) * spreadFactor;
			child.style.marginBlock = `${extraMargin}px`;
		});
	}

	function scheduleUpdate(): void {
		if (updatePending) return;
		updatePending = true;
		rafId = requestAnimationFrame(() => {
			updatePending = false;
			rafId = null;
			applyScales();
		});
	}

	function reset(): void {
		const children = Array.from(element.children) as HTMLElement[];
		children.forEach(child => {
			child.style.transform = '';
			child.style.marginBlock = '';
		});
	}

	function activate(): void {
		if (isActive) return;
		isActive = true;
		window.addEventListener('scroll', scheduleUpdate, { passive: true });
		resizeObserver = new ResizeObserver(() => scheduleUpdate());
		resizeObserver.observe(element);
		applyScales();
	}

	function deactivate(): void {
		if (!isActive) return;
		isActive = false;
		window.removeEventListener('scroll', scheduleUpdate);
		resizeObserver?.disconnect();
		resizeObserver = null;
		if (rafId !== null) {
			cancelAnimationFrame(rafId);
			rafId = null;
		}
		updatePending = false;
		reset();
	}

	function onBreakpointChange(): void {
		if (!mediaQuery || mediaQuery.matches) {
			activate();
		} else {
			deactivate();
		}
	}

	function init(p: ScrollDockEffectParams): void {
		currentParams = p;
		if (p.breakpoint) {
			mediaQuery = window.matchMedia(p.breakpoint);
			mediaQuery.addEventListener('change', onBreakpointChange);
		}
		onBreakpointChange();
	}

	function cleanup(): void {
		deactivate();
		mediaQuery?.removeEventListener('change', onBreakpointChange);
		mediaQuery = null;
	}

	init(params);

	return {
		update(newParams: ScrollDockEffectParams) {
			cleanup();
			init(newParams);
		},
		destroy() {
			cleanup();
		}
	};
};
