import type { SceneOptionCategory, SceneOptionEntry } from "@lyric-video-maker/plugin-base";
import type { ParticleOptions } from "./types.js";

// ── Categories ──────────────────────────────────────────────────────

export const particlesCategory: SceneOptionCategory = {
  type: "category",
  id: "particles",
  label: "Particles",
  defaultExpanded: true,
  options: [
    {
      type: "select",
      id: "shape",
      label: "Shape",
      defaultValue: "circle",
      options: [
        { label: "Circle", value: "circle" },
        { label: "Square", value: "square" },
        { label: "Star", value: "star" },
        { label: "Heart", value: "heart" },
        { label: "Snowflake", value: "snowflake" },
        { label: "Sparkle", value: "sparkle" },
        { label: "Diamond", value: "diamond" },
        { label: "Ring", value: "ring" },
        { label: "Triangle", value: "triangle" },
        { label: "Text / Emoji", value: "text" },
      ],
    },
    {
      type: "text",
      id: "customText",
      label: "Custom Text / Emoji",
      defaultValue: "✦",
    },
    {
      type: "number",
      id: "particleCount",
      label: "Particle Count",
      defaultValue: 60,
      min: 1,
      max: 300,
      step: 1,
    },
    {
      type: "number",
      id: "particleSeed",
      label: "Random Seed",
      defaultValue: 42,
      min: 0,
      max: 9999,
      step: 1,
    },
  ],
};

export const movementCategory: SceneOptionCategory = {
  type: "category",
  id: "movement",
  label: "Movement",
  defaultExpanded: true,
  options: [
    {
      type: "select",
      id: "movementPattern",
      label: "Pattern",
      defaultValue: "float-up",
      options: [
        { label: "Float Up", value: "float-up" },
        { label: "Fall Down", value: "fall-down" },
        { label: "Drift Left", value: "drift-left" },
        { label: "Drift Right", value: "drift-right" },
        { label: "Swirl", value: "swirl" },
        { label: "Explode", value: "explode" },
        { label: "Converge", value: "converge" },
        { label: "Random Walk", value: "random-walk" },
        { label: "Wave / Sine", value: "wave-sine" },
        { label: "Rain", value: "rain" },
        { label: "Snow", value: "snow" },
      ],
    },
    {
      type: "number",
      id: "speed",
      label: "Speed",
      defaultValue: 50,
      min: 1,
      max: 200,
      step: 1,
    },
    {
      type: "number",
      id: "speedVariation",
      label: "Speed Variation",
      defaultValue: 30,
      min: 0,
      max: 100,
      step: 1,
    },
    {
      type: "select",
      id: "spawnArea",
      label: "Spawn Area",
      defaultValue: "full",
      options: [
        { label: "Full Area", value: "full" },
        { label: "Edges", value: "edges" },
        { label: "Center", value: "center" },
        { label: "Bottom", value: "bottom" },
        { label: "Top", value: "top" },
        { label: "Left", value: "left" },
        { label: "Right", value: "right" },
      ],
    },
    {
      type: "number",
      id: "directionAngle",
      label: "Direction Angle",
      defaultValue: 0,
      min: -180,
      max: 180,
      step: 1,
    },
    {
      type: "number",
      id: "turbulence",
      label: "Turbulence",
      defaultValue: 20,
      min: 0,
      max: 100,
      step: 1,
    },
    {
      type: "number",
      id: "swirlRadius",
      label: "Swirl Radius",
      defaultValue: 30,
      min: 1,
      max: 100,
      step: 1,
    },
  ],
};

export const appearanceCategory: SceneOptionCategory = {
  type: "category",
  id: "appearance",
  label: "Appearance",
  defaultExpanded: true,
  options: [
    {
      type: "select",
      id: "colorMode",
      label: "Color Mode",
      defaultValue: "single",
      options: [
        { label: "Single Color", value: "single" },
        { label: "Gradient Blend", value: "gradient-blend" },
        { label: "Rainbow", value: "rainbow" },
        { label: "Palette", value: "palette" },
      ],
    },
    {
      type: "color",
      id: "primaryColor",
      label: "Primary Color",
      defaultValue: "#ffffff",
    },
    {
      type: "color",
      id: "secondaryColor",
      label: "Secondary Color",
      defaultValue: "#88ccff",
    },
    {
      type: "text",
      id: "paletteColors",
      label: "Palette (comma-separated hex)",
      defaultValue: "#ff6b6b,#feca57,#48dbfb,#ff9ff3,#54a0ff",
    },
    {
      type: "number",
      id: "baseSize",
      label: "Base Size (px)",
      defaultValue: 12,
      min: 1,
      max: 120,
      step: 1,
    },
    {
      type: "number",
      id: "sizeVariation",
      label: "Size Variation (%)",
      defaultValue: 40,
      min: 0,
      max: 100,
      step: 1,
    },
    {
      type: "number",
      id: "baseOpacity",
      label: "Opacity (%)",
      defaultValue: 80,
      min: 0,
      max: 100,
      step: 1,
    },
    {
      type: "number",
      id: "opacityVariation",
      label: "Opacity Variation (%)",
      defaultValue: 30,
      min: 0,
      max: 100,
      step: 1,
    },
    {
      type: "boolean",
      id: "particleRotation",
      label: "Rotate Particles",
      defaultValue: true,
    },
    {
      type: "number",
      id: "rotationSpeed",
      label: "Rotation Speed",
      defaultValue: 30,
      min: 0,
      max: 200,
      step: 1,
    },
  ],
};

export const audioCategory: SceneOptionCategory = {
  type: "category",
  id: "audioReactivity",
  label: "Audio Reactivity",
  defaultExpanded: false,
  options: [
    {
      type: "boolean",
      id: "audioReactive",
      label: "Enable Audio Reactivity",
      defaultValue: false,
    },
    {
      type: "select",
      id: "audioMode",
      label: "Audio Mode",
      defaultValue: "size-pulse",
      options: [
        { label: "Size Pulse", value: "size-pulse" },
        { label: "Speed Boost", value: "speed-boost" },
        { label: "Opacity Pulse", value: "opacity-pulse" },
        { label: "Spawn Burst", value: "spawn-burst" },
        { label: "Combined", value: "combined" },
      ],
    },
    {
      type: "number",
      id: "audioSensitivity",
      label: "Sensitivity (%)",
      defaultValue: 50,
      min: 0,
      max: 100,
      step: 1,
    },
    {
      type: "select",
      id: "audioBand",
      label: "Frequency Band",
      defaultValue: "bass",
      options: [
        { label: "Sub-Bass", value: "sub-bass" },
        { label: "Bass", value: "bass" },
        { label: "Mid", value: "mid" },
        { label: "High", value: "high" },
        { label: "Full", value: "full" },
      ],
    },
    {
      type: "number",
      id: "audioSmoothing",
      label: "Smoothing (%)",
      defaultValue: 35,
      min: 0,
      max: 95,
      step: 1,
    },
  ],
};

export const depthCategory: SceneOptionCategory = {
  type: "category",
  id: "depth",
  label: "Depth / Parallax",
  defaultExpanded: false,
  options: [
    {
      type: "boolean",
      id: "depthEnabled",
      label: "Enable Depth",
      defaultValue: false,
    },
    {
      type: "number",
      id: "depthLayers",
      label: "Depth Layers",
      defaultValue: 3,
      min: 2,
      max: 5,
      step: 1,
    },
    {
      type: "number",
      id: "depthSpeedFactor",
      label: "Speed Factor (%)",
      defaultValue: 50,
      min: 10,
      max: 90,
      step: 1,
    },
    {
      type: "number",
      id: "depthSizeFactor",
      label: "Size Factor (%)",
      defaultValue: 50,
      min: 10,
      max: 90,
      step: 1,
    },
    {
      type: "number",
      id: "depthOpacityFactor",
      label: "Opacity Factor (%)",
      defaultValue: 40,
      min: 0,
      max: 80,
      step: 1,
    },
  ],
};

export const effectsCategory: SceneOptionCategory = {
  type: "category",
  id: "effects",
  label: "Effects",
  defaultExpanded: false,
  options: [
    {
      type: "boolean",
      id: "glowEnabled",
      label: "Enable Glow",
      defaultValue: false,
    },
    {
      type: "color",
      id: "glowColor",
      label: "Glow Color",
      defaultValue: "#ffffff",
    },
    {
      type: "number",
      id: "glowStrength",
      label: "Glow Strength (%)",
      defaultValue: 40,
      min: 0,
      max: 100,
      step: 1,
    },
    {
      type: "boolean",
      id: "trailEnabled",
      label: "Enable Trails",
      defaultValue: false,
    },
    {
      type: "number",
      id: "trailLength",
      label: "Trail Length",
      defaultValue: 3,
      min: 1,
      max: 8,
      step: 1,
    },
    {
      type: "number",
      id: "trailOpacityDecay",
      label: "Trail Opacity Decay (%)",
      defaultValue: 50,
      min: 10,
      max: 90,
      step: 1,
    },
  ],
};

// ── Build options array (called in plugin.ts with host categories) ──

export function buildOptionsSchema(
  transformCategory: SceneOptionCategory,
  timingCategory: SceneOptionCategory,
): SceneOptionEntry[] {
  return [
    transformCategory,
    timingCategory,
    particlesCategory,
    movementCategory,
    appearanceCategory,
    audioCategory,
    depthCategory,
    effectsCategory,
  ];
}

// ── Default options ─────────────────────────────────────────────────

export function buildDefaultOptions(
  defaultTransform: Record<string, unknown>,
  defaultTiming: Record<string, unknown>,
): ParticleOptions {
  return {
    ...(defaultTransform as any),
    ...(defaultTiming as any),

    // Particles
    shape: "circle",
    customText: "✦",
    particleCount: 60,
    particleSeed: 42,

    // Movement
    movementPattern: "float-up",
    speed: 50,
    speedVariation: 30,
    spawnArea: "full",
    directionAngle: 0,
    turbulence: 20,
    swirlRadius: 30,

    // Appearance
    colorMode: "single",
    primaryColor: "#ffffff",
    secondaryColor: "#88ccff",
    paletteColors: "#ff6b6b,#feca57,#48dbfb,#ff9ff3,#54a0ff",
    baseSize: 12,
    sizeVariation: 40,
    baseOpacity: 80,
    opacityVariation: 30,
    particleRotation: true,
    rotationSpeed: 30,

    // Audio Reactivity
    audioReactive: false,
    audioMode: "size-pulse",
    audioSensitivity: 50,
    audioBand: "bass",
    audioSmoothing: 35,

    // Depth
    depthEnabled: false,
    depthLayers: 3,
    depthSpeedFactor: 50,
    depthSizeFactor: 50,
    depthOpacityFactor: 40,

    // Effects
    glowEnabled: false,
    glowColor: "#ffffff",
    glowStrength: 40,
    trailEnabled: false,
    trailLength: 3,
    trailOpacityDecay: 50,
  } as ParticleOptions;
}
