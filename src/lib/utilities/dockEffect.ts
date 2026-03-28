import type { Action } from 'svelte/action';

export interface DockEffectParams {
	/** Maximum scale factor for the hovered item (default: 1.4) */
	maxScale?: number;
	/** Number of neighboring items affected on each side (default: 2) */
	affectedNeighbors?: number;
	/** Extra horizontal margin in px added per unit of scale above 1.0 (default: 15) */
	spreadFactor?: number;
}

function getScale(distance: number, maxScale: number, maxDistance: number): number {
	if (maxDistance <= 0) return 1;
	if (Math.abs(distance) >= maxDistance) return 1;
	const ratio = distance / maxDistance;
	return 1 + (maxScale - 1) * (1 + Math.cos(ratio * Math.PI)) / 2;
}

export const dockEffect: Action<HTMLElement, DockEffectParams> = (element, params) => {
	let currentParams: DockEffectParams = params;
	let childPositions: { centerX: number; width: number }[] = [];
	let resizeObserver: ResizeObserver | null = null;
	let isHovering = false;

	function cachePositions(): void {
		if (isHovering) return;
		const children = Array.from(element.children) as HTMLElement[];
		const containerRect = element.getBoundingClientRect();
		childPositions = children.map(child => {
			const childRect = child.getBoundingClientRect();
			return {
				centerX: childRect.left - containerRect.left + childRect.width / 2,
				width: childRect.width
			};
		});
	}

	function handleMouseMove(event: MouseEvent): void {
		isHovering = true;
		const { maxScale = 1.4, affectedNeighbors = 2, spreadFactor = 15 } = currentParams;
		const children = Array.from(element.children) as HTMLElement[];
		if (children.length === 0 || childPositions.length === 0) return;

		const containerRect = element.getBoundingClientRect();
		const mouseX = event.clientX - containerRect.left;
		const avgWidth = childPositions.reduce((sum, p) => sum + p.width, 0) / childPositions.length;
		const maxDistance = avgWidth * (affectedNeighbors + 0.5);

		children.forEach((child, i) => {
			const distance = mouseX - childPositions[i].centerX;
			const scale = getScale(distance, maxScale, maxDistance);
			child.style.transform = `scale(${scale})`;
			const extraMargin = (scale - 1) * spreadFactor;
			child.style.marginInline = `${extraMargin}px`;
		});
	}

	function handleMouseLeave(): void {
		isHovering = false;
		const children = Array.from(element.children) as HTMLElement[];
		children.forEach(child => {
			child.style.transform = '';
			child.style.marginInline = '';
		});
	}

	function init(p: DockEffectParams): void {
		currentParams = p;
		cachePositions();
		resizeObserver = new ResizeObserver(() => cachePositions());
		resizeObserver.observe(element);
		element.addEventListener('mousemove', handleMouseMove);
		element.addEventListener('mouseleave', handleMouseLeave);
	}

	function cleanup(): void {
		element.removeEventListener('mousemove', handleMouseMove);
		element.removeEventListener('mouseleave', handleMouseLeave);
		resizeObserver?.disconnect();
		resizeObserver = null;
		handleMouseLeave();
	}

	init(params);

	return {
		update(newParams: DockEffectParams) {
			cleanup();
			init(newParams);
		},
		destroy() {
			cleanup();
		}
	};
};
