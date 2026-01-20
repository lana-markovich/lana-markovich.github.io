export interface MouseTrackingConfig {
	/** Interpolation factor (0-1, lower = smoother) */
	lerpFactor?: number;
	/** Offset from cursor position X */
	offsetX?: number;
	/** Offset from cursor position Y */
	offsetY?: number;
	/** Callback executed on each animation frame */
	onUpdate?: (x: number, y: number) => void;
}

export interface MouseTrackingState {
	targetX: number;
	targetY: number;
	currentX: number;
	currentY: number;
	animationFrameId: number | null;
}

/**
 * Linear interpolation function
 * @param start - Starting value
 * @param end - Target value
 * @param factor - Interpolation factor (0-1)
 * @returns Interpolated value between start and end
 */
export function lerp(start: number, end: number, factor: number): number {
	return start + (end - start) * factor;
}

/**
 * Creates a mouse tracking instance with smooth interpolation
 * @param config - Configuration options
 * @returns Object with control methods
 */
export function createMouseTracking(config: MouseTrackingConfig = {}) {
	const {
		lerpFactor = 0.03,
		offsetX = 0,
		offsetY = 0,
		onUpdate
	} = config;

	const state: MouseTrackingState = {
		targetX: 0,
		targetY: 0,
		currentX: 0,
		currentY: 0,
		animationFrameId: null
	};

	const animate = () => {
		state.currentX = lerp(state.currentX, state.targetX, lerpFactor);
		state.currentY = lerp(state.currentY, state.targetY, lerpFactor);

		if (onUpdate) {
			onUpdate(state.currentX + offsetX, state.currentY + offsetY);
		}

		state.animationFrameId = requestAnimationFrame(animate);
	};

	return {
		/**
		 * Start the animation loop
		 */
		start() {
			if (state.animationFrameId === null) {
				state.animationFrameId = requestAnimationFrame(animate);
			}
		},

		/**
		 * Stop the animation loop and cleanup
		 */
		stop() {
			if (state.animationFrameId !== null) {
				cancelAnimationFrame(state.animationFrameId);
				state.animationFrameId = null;
			}
		},

		/**
		 * Update the target position
		 * @param x - Target X coordinate
		 * @param y - Target Y coordinate
		 */
		updateTarget(x: number, y: number) {
			state.targetX = x;
			state.targetY = y;
		},

		/**
		 * Set the current position immediately (no interpolation)
		 * Useful for initializing position on first move
		 * @param x - X coordinate
		 * @param y - Y coordinate
		 */
		setCurrentPosition(x: number, y: number) {
			state.currentX = x;
			state.currentY = y;
			state.targetX = x;
			state.targetY = y;
		},

		/**
		 * Get the current interpolated position
		 * @returns Current position
		 */
		getCurrentPosition() {
			return {
				x: state.currentX + offsetX,
				y: state.currentY + offsetY
			};
		}
	};
}
