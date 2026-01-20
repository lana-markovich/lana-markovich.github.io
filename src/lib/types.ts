type ArtPieceName = string;

export interface ArtPiece {
	name: ArtPieceName;
	description: string;
	image: string;
	year: number;
}

export interface BaseImageProps {
	/** Base image name (without size suffix or extension) */
	name: ArtPieceName;
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

export interface DecoratedImageProps extends BaseImageProps {
	/** Position of the decoration element */
	decorationPosition: `${"top" | "bottom"}-${"left" | "right"}`;
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
