import type { AudioBand, AudioMode } from "./types.js";

/**
 * Band index mapping for a 6-band spectrum analysis.
 * Bands: [sub-bass, bass, low-mid, mid, high-mid, high]
 */
function getBandIndices(band: AudioBand): number[] {
  switch (band) {
    case "sub-bass":
      return [0];
    case "bass":
      return [0, 1];
    case "mid":
      return [2, 3];
    case "high":
      return [4, 5];
    case "full":
      return [0, 1, 2, 3, 4, 5];
    default:
      return [0, 1];
  }
}

/**
 * Extract a single 0-1 audio energy value from a frame's band data.
 */
export function getAudioEnergy(
  bandValues: number[] | null,
  audioBand: AudioBand,
  sensitivity: number,
): number {
  if (!bandValues || bandValues.length === 0) return 0;

  const indices = getBandIndices(audioBand);
  let sum = 0;
  let count = 0;
  for (const i of indices) {
    if (i < bandValues.length) {
      sum += bandValues[i];
      count++;
    }
  }
  if (count === 0) return 0;

  const avg = sum / count;
  // sensitivity: 0-100 maps to 0.2-3.0 multiplier
  const mul = 0.2 + (sensitivity / 100) * 2.8;
  return Math.min(1, avg * mul);
}

/**
 * Audio modifier results applied to particle rendering.
 */
export interface AudioModifiers {
  sizeMultiplier: number; // 1.0 = no change
  speedMultiplier: number; // 1.0 = no change
  opacityMultiplier: number; // 1.0 = no change
  spawnMultiplier: number; // 1.0 = no change
}

/**
 * Compute audio-reactive modifiers from energy level.
 */
export function computeAudioModifiers(
  energy: number,
  mode: AudioMode,
): AudioModifiers {
  const base: AudioModifiers = {
    sizeMultiplier: 1,
    speedMultiplier: 1,
    opacityMultiplier: 1,
    spawnMultiplier: 1,
  };

  switch (mode) {
    case "size-pulse":
      base.sizeMultiplier = 1 + energy * 1.5;
      break;
    case "speed-boost":
      base.speedMultiplier = 1 + energy * 2;
      break;
    case "opacity-pulse":
      base.opacityMultiplier = 0.3 + energy * 0.7;
      break;
    case "spawn-burst":
      base.spawnMultiplier = 1 + energy * 2;
      break;
    case "combined":
      base.sizeMultiplier = 1 + energy * 0.8;
      base.speedMultiplier = 1 + energy * 1.0;
      base.opacityMultiplier = 0.5 + energy * 0.5;
      break;
  }

  return base;
}
