export interface MouseTrackingConfig {
	/** Interpolation factor (0-1, lower = smoother) */
	lerpFactor?: number;
	/** Offset from cursor position X */
	offsetX?: number;
	/** Offset from cursor position Y */
	offsetY?: number;
	/** Offset from cursor position Z */
	offsetZ?: number;
	/** Callback executed on each animation frame */
	onUpdate?: (x: number, y: number, z?: number) => void;
}

export interface MouseTrackingState {
	targetX: number;
	targetY: number;
	targetZ: number;
	currentX: number;
	currentY: number;
	currentZ: number;
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
		offsetZ = 0,
		onUpdate
	} = config;

	const state: MouseTrackingState = {
		targetX: 0,
		targetY: 0,
		targetZ: 0,
		currentX: 0,
		currentY: 0,
		currentZ: 0,
		animationFrameId: null
	};

	const animate = () => {
		state.currentX = lerp(state.currentX, state.targetX, lerpFactor);
		state.currentY = lerp(state.currentY, state.targetY, lerpFactor);
		state.currentZ = lerp(state.currentZ, state.targetZ, lerpFactor);

		if (onUpdate) {
			onUpdate(state.currentX + offsetX, state.currentY + offsetY, state.currentZ + offsetZ);
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
		 * @param z - Target Z coordinate
		 */
		updateTarget(x: number, y: number, z: number = 0) {
			state.targetX = x;
			state.targetY = y;
			state.targetZ = z;
		},

		/**
		 * Set the current position immediately (no interpolation)
		 * Useful for initializing position on first move
		 * @param x - X coordinate
		 * @param y - Y coordinate
		 * @param z - Z coordinate
		 */
		setCurrentPosition(x: number, y: number, z: number = 0) {
			state.currentX = x;
			state.currentY = y;
			state.currentZ = z;
			state.targetX = x;
			state.targetY = y;
			state.targetZ = z;
		},

		/**
		 * Get the current interpolated position
		 * @returns Current position
		 */
		getCurrentPosition() {
			return {
				x: state.currentX + offsetX,
				y: state.currentY + offsetY,
				z: state.currentZ + offsetZ
			};
		}
	};
}
