import type { ParticleState, MovementPattern } from "./types.js";

export interface Position {
  x: number; // 0-100 percent
  y: number; // 0-100 percent
}

/** Pre-extracted movement parameters to avoid passing full options per particle. */
export interface MovementParams {
  pattern: MovementPattern;
  speed: number;      // raw speed value (will be divided by 100)
  turbulence: number; // raw turbulence value (will be divided by 100)
  swirlRadius: number; // raw swirlRadius value (will be divided by 100)
}

const TAU = Math.PI * 2;

/**
 * Deterministic pseudo-noise for a particle at a given time.
 */
function noise(seed: number, t: number): number {
  return (
    Math.sin(seed * 12.9898 + t * 43.758) * 0.5 +
    Math.sin(seed * 7.233 + t * 21.317) * 0.3 +
    Math.sin(seed * 3.145 + t * 67.891) * 0.2
  );
}

// Reusable position object to avoid allocations in the hot loop.
// Only safe because we read x/y immediately before the next call.
const _pos: Position = { x: 0, y: 0 };

/**
 * Compute particle position at normalized time t (0-1 over lifetime).
 * Returns a shared object — caller must read x/y before calling again.
 */
export function computePosition(
  t: number,
  particle: ParticleState,
  params: MovementParams,
): Position {
  const speed = params.speed / 100;
  const turb = params.turbulence / 100;
  const seed = particle.movementSeed;
  const speedMul = particle.speedMultiplier;

  switch (params.pattern) {
    case "float-up":
      return floatUp(t, particle, speed, turb, seed, speedMul);
    case "fall-down":
      return fallDown(t, particle, speed, turb, seed, speedMul);
    case "drift-left":
      return drift(t, particle, speed, turb, seed, speedMul, -1);
    case "drift-right":
      return drift(t, particle, speed, turb, seed, speedMul, 1);
    case "swirl":
      return swirl(t, particle, speed, params.swirlRadius / 100, seed, speedMul);
    case "explode":
      return explode(t, particle, speed, seed, speedMul);
    case "converge":
      return converge(t, particle, speed, seed, speedMul);
    case "random-walk":
      return randomWalk(t, particle, speed, turb, seed, speedMul);
    case "wave-sine":
      return waveSine(t, particle, speed, turb, seed, speedMul);
    case "rain":
      return rain(t, particle, speed, seed, speedMul);
    case "snow":
      return snow(t, particle, speed, turb, seed, speedMul);
    default:
      _pos.x = particle.startX;
      _pos.y = particle.startY;
      return _pos;
  }
}

// ── Pattern implementations ─────────────────────────────────────────

function floatUp(
  t: number, p: ParticleState, speed: number, turb: number, seed: number, speedMul: number,
): Position {
  const travel = t * speed * speedMul * 120;
  const wobble = Math.sin(t * TAU * 2 + seed * 10) * turb * 15;
  _pos.x = p.startX + wobble;
  _pos.y = p.startY - travel;
  return _pos;
}

function fallDown(
  t: number, p: ParticleState, speed: number, turb: number, seed: number, speedMul: number,
): Position {
  const travel = t * speed * speedMul * 120;
  const wobble = Math.sin(t * TAU * 2 + seed * 10) * turb * 15;
  _pos.x = p.startX + wobble;
  _pos.y = p.startY + travel;
  return _pos;
}

function drift(
  t: number, p: ParticleState, speed: number, turb: number, seed: number, speedMul: number,
  dir: number,
): Position {
  const travel = t * speed * speedMul * 120;
  const wobble = Math.sin(t * TAU * 3 + seed * 7) * turb * 10;
  _pos.x = p.startX + travel * dir;
  _pos.y = p.startY + wobble;
  return _pos;
}

function swirl(
  t: number, p: ParticleState, speed: number, radius: number, seed: number, speedMul: number,
): Position {
  const angle = t * TAU * speed * speedMul * 2 + seed * TAU;
  const r = radius * 50 * (1 - t * 0.3);
  _pos.x = 50 + Math.cos(angle) * r + (p.startX - 50) * 0.3;
  _pos.y = 50 + Math.sin(angle) * r + (p.startY - 50) * 0.3;
  return _pos;
}

function explode(
  t: number, p: ParticleState, speed: number, seed: number, speedMul: number,
): Position {
  const angle = seed * TAU;
  const distance = t * speed * speedMul * 60;
  const eased = 1 - Math.pow(1 - t, 2);
  _pos.x = 50 + Math.cos(angle) * distance * eased;
  _pos.y = 50 + Math.sin(angle) * distance * eased;
  return _pos;
}

function converge(
  t: number, p: ParticleState, speed: number, seed: number, speedMul: number,
): Position {
  const eased = t * t;
  _pos.x = p.startX + (50 - p.startX) * eased * speed * speedMul * 0.02;
  _pos.y = p.startY + (50 - p.startY) * eased * speed * speedMul * 0.02;
  return _pos;
}

function randomWalk(
  t: number, p: ParticleState, speed: number, turb: number, seed: number, speedMul: number,
): Position {
  const scale = speed * speedMul * turb * 0.5;
  _pos.x = p.startX + noise(seed, t * 4) * scale;
  _pos.y = p.startY + noise(seed + 100, t * 4) * scale;
  return _pos;
}

function waveSine(
  t: number, p: ParticleState, speed: number, turb: number, seed: number, speedMul: number,
): Position {
  const hTravel = t * speed * speedMul * 80;
  const amplitude = 20 + turb * 30;
  const wave = Math.sin(t * TAU * 3 + seed * 5) * amplitude / 100 * 30;
  _pos.x = p.startX + hTravel;
  _pos.y = p.startY + wave;
  return _pos;
}

function rain(
  t: number, p: ParticleState, speed: number, seed: number, speedMul: number,
): Position {
  const travel = t * speed * speedMul * 150;
  const jitter = Math.sin(seed * 99.7) * 2;
  _pos.x = p.startX + jitter;
  _pos.y = p.startY + travel;
  return _pos;
}

function snow(
  t: number, p: ParticleState, speed: number, turb: number, seed: number, speedMul: number,
): Position {
  const travel = t * speed * speedMul * 60;
  const d = Math.sin(t * TAU * 1.5 + seed * 8) * (10 + turb * 20);
  _pos.x = p.startX + d;
  _pos.y = p.startY + travel;
  return _pos;
}
