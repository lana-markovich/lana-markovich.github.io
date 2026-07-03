/**
 * Cosine falloff scale curve shared by the dock effects.
 * Returns minScale at/beyond maxDistance, maxScale at distance 0.
 */
export function getScale(distance: number, maxScale: number, maxDistance: number, minScale = 1): number {
	if (maxDistance <= 0) return minScale;
	if (Math.abs(distance) >= maxDistance) return minScale;
	const ratio = distance / maxDistance;
	return minScale + (maxScale - minScale) * (1 + Math.cos(ratio * Math.PI)) / 2;
}
