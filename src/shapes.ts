import type { ParticleShape } from "./types.js";

/**
 * Returns the base rotation offset for shapes that have inherent rotation.
 */
export function getShapeBaseRotation(shape: ParticleShape): number {
  return shape === "diamond" ? 45 : 0;
}
