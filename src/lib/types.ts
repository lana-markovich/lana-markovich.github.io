import type { Snippet } from 'svelte';
import type { ImageId } from './generated/types.js';

export * from './generated/types'

export interface FocalPoint {
	x: number;  // 0..1
	y: number;  // 0..1
}

export interface ImageEntry {
	id: ImageId;
	alt: string;
	sizes: readonly number[];
	aspectRatio: number;  // width / height
	focalPoint: FocalPoint;
	zoom: number;  // 1..5
}

export interface ArtPiece {
	name: string;
	year?: number;
	shortDescription?: string;
	description?: string;
	image: ImageEntry;
	additionalImages?: ImageEntry[];
}

export type Corner = `${"top" | "bottom"}-${"left" | "right"}`;

export interface BaseImageProps {
	/** Base image name (without size suffix or extension) */
	name: ImageId;
	/** Alt text for accessibility */
	alt: string;
	/** Optional CSS class */
	class?: string;
	/** Available sizes (default: [2560, 1280, 720]) */
	sizes?: number[];
	/** Loading strategy */
	loading?: "lazy" | "eager";
	/** Sizes attribute for responsive images (e.g., "(min-width: 1280px) 50vw, 100vw") */
	sizesAttr?: string;
}

export interface MouseTrackingMaskProps {
	/** Size of the circular mask in pixels */
	maskSize?: number;
	/** Interpolation smoothness (0-1, lower = smoother) */
	lerpFactor?: number;
	/** Initial X position before mouse moves */
	initialX?: string;
	/** Initial Y position before mouse moves */
	initialY?: string;
	/** CSS mask-image gradient */
	maskImage?: string;
	/** Additional CSS class */
	class?: string;
}

export interface MouseTrackingMaskInstance {
	/** Handle mouse move events and update mask position */
	handleMouseMove: (event: MouseEvent) => void;
}

export interface DepthWrapperProps {
	/** Enable parallax effect (default: true) */
	parallax?: boolean;
	/** Content scale factor for zoom effect (default: 1.1) */
	scale?: number;
	/** Movement intensity - 0.1 = 10% of distance from center (default: 0.1) */
	intensity?: number;
	/** Interpolation smoothness - lower = smoother (default: 0.05) */
	lerpFactor?: number;
	/** Perspective distance in pixels for 3D depth (default: 1200) */
	perspective?: number;
	/** Additional CSS class */
	class?: string;
	/** Child content */
	children: Snippet;
}
