import type { TransformOptions, TimingOptions } from "@lyric-video-maker/plugin-base";

// ── Shape & Movement enums ──────────────────────────────────────────

export type ParticleShape =
  | "circle"
  | "square"
  | "star"
  | "heart"
  | "snowflake"
  | "sparkle"
  | "diamond"
  | "ring"
  | "triangle"
  | "text";

export type MovementPattern =
  | "float-up"
  | "fall-down"
  | "drift-left"
  | "drift-right"
  | "swirl"
  | "explode"
  | "converge"
  | "random-walk"
  | "wave-sine"
  | "rain"
  | "snow";

export type SpawnArea =
  | "full"
  | "edges"
  | "center"
  | "bottom"
  | "top"
  | "left"
  | "right";

export type ColorMode = "single" | "gradient-blend" | "rainbow" | "palette";

export type AudioMode =
  | "size-pulse"
  | "speed-boost"
  | "opacity-pulse"
  | "spawn-burst"
  | "combined";

export type AudioBand = "sub-bass" | "bass" | "mid" | "high" | "full";

// ── Options ─────────────────────────────────────────────────────────

export interface ParticleOptions
  extends TransformOptions,
    TimingOptions,
    Record<string, unknown> {
  // Particles
  shape: ParticleShape;
  customText: string;
  particleCount: number;
  particleSeed: number;

  // Movement
  movementPattern: MovementPattern;
  speed: number;
  speedVariation: number;
  spawnArea: SpawnArea;
  directionAngle: number;
  turbulence: number;
  swirlRadius: number;

  // Appearance
  colorMode: ColorMode;
  primaryColor: string;
  secondaryColor: string;
  paletteColors: string;
  baseSize: number;
  sizeVariation: number;
  baseOpacity: number;
  opacityVariation: number;
  particleRotation: boolean;
  rotationSpeed: number;

  // Audio Reactivity
  audioReactive: boolean;
  audioMode: AudioMode;
  audioSensitivity: number;
  audioBand: AudioBand;
  audioSmoothing: number;

  // Depth
  depthEnabled: boolean;
  depthLayers: number;
  depthSpeedFactor: number;
  depthSizeFactor: number;
  depthOpacityFactor: number;

  // Effects
  glowEnabled: boolean;
  glowColor: string;
  glowStrength: number;
  trailEnabled: boolean;
  trailLength: number;
  trailOpacityDecay: number;
}

// ── Particle state (generated in prepare) ───────────────────────────

export interface ParticleState {
  id: number;
  spawnFrame: number;
  lifetimeFrames: number;
  startX: number; // 0-100 percent
  startY: number; // 0-100 percent
  size: number; // px
  opacity: number; // 0-1
  depthLayer: number; // 0 = far, max = near
  colorIndex: number;
  rotationOffset: number; // degrees
  rotationDirection: number; // +1 or -1
  movementSeed: number; // sub-seed for movement randomness
  speedMultiplier: number; // per-particle speed variation
}

// ── Prepared data ───────────────────────────────────────────────────

export interface PreparedParticlesData {
  particles: ParticleState[];
  totalFrames: number;
  fps: number;
  audioFrames: number[][] | null;
  resolvedColors: string[];
  /**
   * Cumulative audio speed accumulator. Length = totalFrames.
   * audioSpeedAccum[f] = sum of audioSpeedMultiplier for frames 0..f.
   * Used to integrate speed-boost over time instead of treating it as
   * an instantaneous position scale.
   * null when audio reactivity is off or mode doesn't affect speed.
   */
  audioSpeedAccum: number[] | null;
}
