"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/plugin.ts
var plugin_exports = {};
__export(plugin_exports, {
  activate: () => activate
});
module.exports = __toCommonJS(plugin_exports);

// src/options.ts
var particlesCategory = {
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
        { label: "Text / Emoji", value: "text" }
      ]
    },
    {
      type: "text",
      id: "customText",
      label: "Custom Text / Emoji",
      defaultValue: "\u2726"
    },
    {
      type: "number",
      id: "particleCount",
      label: "Particle Count",
      defaultValue: 60,
      min: 1,
      max: 300,
      step: 1
    },
    {
      type: "number",
      id: "particleSeed",
      label: "Random Seed",
      defaultValue: 42,
      min: 0,
      max: 9999,
      step: 1
    }
  ]
};
var movementCategory = {
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
        { label: "Snow", value: "snow" }
      ]
    },
    {
      type: "number",
      id: "speed",
      label: "Speed",
      defaultValue: 50,
      min: 1,
      max: 200,
      step: 1
    },
    {
      type: "number",
      id: "speedVariation",
      label: "Speed Variation",
      defaultValue: 30,
      min: 0,
      max: 100,
      step: 1
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
        { label: "Right", value: "right" }
      ]
    },
    {
      type: "number",
      id: "directionAngle",
      label: "Direction Angle",
      defaultValue: 0,
      min: -180,
      max: 180,
      step: 1
    },
    {
      type: "number",
      id: "randomWalkRandomness",
      label: "Walk Randomness",
      defaultValue: 5,
      min: 0,
      max: 100,
      step: 1
    },
    {
      type: "number",
      id: "turbulence",
      label: "Turbulence",
      defaultValue: 20,
      min: 0,
      max: 100,
      step: 1
    },
    {
      type: "number",
      id: "swirlRadius",
      label: "Swirl Radius",
      defaultValue: 30,
      min: 1,
      max: 100,
      step: 1
    }
  ]
};
var appearanceCategory = {
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
        { label: "Palette", value: "palette" }
      ]
    },
    {
      type: "color",
      id: "primaryColor",
      label: "Primary Color",
      defaultValue: "#ffffff"
    },
    {
      type: "color",
      id: "secondaryColor",
      label: "Secondary Color",
      defaultValue: "#88ccff"
    },
    {
      type: "text",
      id: "paletteColors",
      label: "Palette (comma-separated hex)",
      defaultValue: "#ff6b6b,#feca57,#48dbfb,#ff9ff3,#54a0ff"
    },
    {
      type: "number",
      id: "baseSize",
      label: "Base Size (px)",
      defaultValue: 12,
      min: 1,
      max: 120,
      step: 1
    },
    {
      type: "number",
      id: "sizeVariation",
      label: "Size Variation (%)",
      defaultValue: 40,
      min: 0,
      max: 100,
      step: 1
    },
    {
      type: "number",
      id: "baseOpacity",
      label: "Opacity (%)",
      defaultValue: 80,
      min: 0,
      max: 100,
      step: 1
    },
    {
      type: "number",
      id: "opacityVariation",
      label: "Opacity Variation (%)",
      defaultValue: 30,
      min: 0,
      max: 100,
      step: 1
    },
    {
      type: "boolean",
      id: "particleRotation",
      label: "Rotate Particles",
      defaultValue: true
    },
    {
      type: "number",
      id: "rotationSpeed",
      label: "Rotation Speed",
      defaultValue: 30,
      min: 0,
      max: 200,
      step: 1
    }
  ]
};
var audioCategory = {
  type: "category",
  id: "audioReactivity",
  label: "Audio Reactivity",
  defaultExpanded: false,
  options: [
    {
      type: "boolean",
      id: "audioReactive",
      label: "Enable Audio Reactivity",
      defaultValue: false
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
        { label: "Combined", value: "combined" }
      ]
    },
    {
      type: "number",
      id: "audioSensitivity",
      label: "Sensitivity (%)",
      defaultValue: 50,
      min: 0,
      max: 100,
      step: 1
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
        { label: "Full", value: "full" }
      ]
    },
    {
      type: "number",
      id: "audioSmoothing",
      label: "Smoothing (%)",
      defaultValue: 35,
      min: 0,
      max: 95,
      step: 1
    }
  ]
};
var depthCategory = {
  type: "category",
  id: "depth",
  label: "Depth / Parallax",
  defaultExpanded: false,
  options: [
    {
      type: "boolean",
      id: "depthEnabled",
      label: "Enable Depth",
      defaultValue: false
    },
    {
      type: "number",
      id: "depthLayers",
      label: "Depth Layers",
      defaultValue: 3,
      min: 2,
      max: 5,
      step: 1
    },
    {
      type: "number",
      id: "depthSpeedFactor",
      label: "Speed Factor (%)",
      defaultValue: 50,
      min: 10,
      max: 90,
      step: 1
    },
    {
      type: "number",
      id: "depthSizeFactor",
      label: "Size Factor (%)",
      defaultValue: 50,
      min: 10,
      max: 90,
      step: 1
    },
    {
      type: "number",
      id: "depthOpacityFactor",
      label: "Opacity Factor (%)",
      defaultValue: 40,
      min: 0,
      max: 80,
      step: 1
    }
  ]
};
var effectsCategory = {
  type: "category",
  id: "effects",
  label: "Effects",
  defaultExpanded: false,
  options: [
    {
      type: "boolean",
      id: "glowEnabled",
      label: "Enable Glow",
      defaultValue: false
    },
    {
      type: "color",
      id: "glowColor",
      label: "Glow Color",
      defaultValue: "#ffffff"
    },
    {
      type: "number",
      id: "glowStrength",
      label: "Glow Strength (%)",
      defaultValue: 40,
      min: 0,
      max: 100,
      step: 1
    },
    {
      type: "boolean",
      id: "trailEnabled",
      label: "Enable Trails",
      defaultValue: false
    },
    {
      type: "number",
      id: "trailLength",
      label: "Trail Length",
      defaultValue: 3,
      min: 1,
      max: 8,
      step: 1
    },
    {
      type: "number",
      id: "trailOpacityDecay",
      label: "Trail Opacity Decay (%)",
      defaultValue: 50,
      min: 10,
      max: 90,
      step: 1
    }
  ]
};
function buildOptionsSchema() {
  return [
    particlesCategory,
    movementCategory,
    appearanceCategory,
    audioCategory,
    depthCategory,
    effectsCategory
  ];
}
function buildDefaultOptions() {
  return {
    // Particles
    shape: "circle",
    customText: "\u2726",
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
    randomWalkRandomness: 5,
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
    trailOpacityDecay: 50
  };
}

// src/prng.ts
function hashString(str) {
  let h = 0;
  for (let i = 0; i < str.length; i++) {
    h = Math.imul(31, h) + str.charCodeAt(i) | 0;
  }
  return h >>> 0;
}
function mulberry32(seed) {
  let s = seed | 0;
  return () => {
    s = s + 1831565813 | 0;
    let t = Math.imul(s ^ s >>> 15, 1 | s);
    t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t;
    return ((t ^ t >>> 14) >>> 0) / 4294967296;
  };
}

// src/color.ts
function hexToRgb(hex) {
  const h = hex.replace("#", "");
  return [
    parseInt(h.substring(0, 2), 16) || 0,
    parseInt(h.substring(2, 4), 16) || 0,
    parseInt(h.substring(4, 6), 16) || 0
  ];
}
function rgbToHex(r, g, b) {
  const clamp = (v) => Math.max(0, Math.min(255, Math.round(v)));
  return "#" + clamp(r).toString(16).padStart(2, "0") + clamp(g).toString(16).padStart(2, "0") + clamp(b).toString(16).padStart(2, "0");
}
function lerpColor(a, b, t) {
  const [ar, ag, ab] = hexToRgb(a);
  const [br, bg, bb] = hexToRgb(b);
  return rgbToHex(
    ar + (br - ar) * t,
    ag + (bg - ag) * t,
    ab + (bb - ab) * t
  );
}
function hslToHex(h, s, l) {
  const c = (1 - Math.abs(2 * l - 1)) * s;
  const x = c * (1 - Math.abs(h / 60 % 2 - 1));
  const m = l - c / 2;
  let r = 0, g = 0, b = 0;
  if (h < 60) {
    r = c;
    g = x;
  } else if (h < 120) {
    r = x;
    g = c;
  } else if (h < 180) {
    g = c;
    b = x;
  } else if (h < 240) {
    g = x;
    b = c;
  } else if (h < 300) {
    r = x;
    b = c;
  } else {
    r = c;
    b = x;
  }
  return rgbToHex((r + m) * 255, (g + m) * 255, (b + m) * 255);
}
function resolveColors(colorMode, primaryColor, secondaryColor, paletteColors, count) {
  const n = Math.max(count, 1);
  switch (colorMode) {
    case "single":
      return [primaryColor];
    case "gradient-blend": {
      if (n === 1) return [primaryColor];
      const colors = [];
      for (let i = 0; i < n; i++) {
        colors.push(lerpColor(primaryColor, secondaryColor, i / (n - 1)));
      }
      return colors;
    }
    case "rainbow": {
      const colors = [];
      for (let i = 0; i < n; i++) {
        colors.push(hslToHex(i / n * 360, 0.85, 0.6));
      }
      return colors;
    }
    case "palette": {
      const parsed = paletteColors.split(",").map((c) => c.trim()).filter((c) => /^#[0-9a-fA-F]{6}$/.test(c));
      return parsed.length > 0 ? parsed : [primaryColor];
    }
    default:
      return [primaryColor];
  }
}

// src/audio.ts
function getBandIndices(band) {
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
function getAudioEnergy(bandValues, audioBand, sensitivity) {
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
  const mul = 0.2 + sensitivity / 100 * 2.8;
  return Math.min(1, avg * mul);
}
function computeAudioModifiers(energy, mode) {
  const base = {
    sizeMultiplier: 1,
    speedMultiplier: 1,
    opacityMultiplier: 1,
    spawnMultiplier: 1
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
      base.speedMultiplier = 1 + energy * 1;
      base.opacityMultiplier = 0.5 + energy * 0.5;
      break;
  }
  return base;
}

// src/prepare.ts
function spawnPosition(area, rand) {
  switch (area) {
    case "full":
      return { x: rand() * 100, y: rand() * 100 };
    case "center":
      return { x: 30 + rand() * 40, y: 30 + rand() * 40 };
    case "bottom":
      return { x: rand() * 100, y: 85 + rand() * 15 };
    case "top":
      return { x: rand() * 100, y: rand() * 15 };
    case "left":
      return { x: rand() * 15, y: rand() * 100 };
    case "right":
      return { x: 85 + rand() * 15, y: rand() * 100 };
    case "edges": {
      const edge = Math.floor(rand() * 4);
      switch (edge) {
        case 0:
          return { x: rand() * 100, y: -5 };
        case 1:
          return { x: rand() * 100, y: 105 };
        case 2:
          return { x: -5, y: rand() * 100 };
        default:
          return { x: 105, y: rand() * 100 };
      }
    }
    default:
      return { x: rand() * 100, y: rand() * 100 };
  }
}
async function prepareParticles(ctx) {
  const { options, video, audio } = ctx;
  const seedValue = hashString(ctx.instance.id + String(options.particleSeed));
  const rand = mulberry32(seedValue);
  const resolvedColors = resolveColors(
    options.colorMode,
    options.primaryColor,
    options.secondaryColor,
    options.paletteColors,
    options.particleCount
  );
  const totalFrames = video.durationInFrames;
  const cycleSeconds = Math.min(8, Math.max(1.5, 200 / options.speed));
  const cycleFrames = Math.floor(cycleSeconds * video.fps);
  const cycleCount = Math.max(1, Math.floor(totalFrames / cycleFrames));
  const lifetimeFrames = Math.max(
    Math.floor(totalFrames / cycleCount),
    Math.floor(video.fps * 1.5)
  );
  const particles = [];
  for (let i = 0; i < options.particleCount; i++) {
    const pos = spawnPosition(options.spawnArea, rand);
    const sizeVar = options.sizeVariation / 100;
    const size = options.baseSize * (1 - sizeVar + rand() * sizeVar * 2);
    const opVar = options.opacityVariation / 100;
    const baseOp = options.baseOpacity / 100;
    const opacity = Math.max(0.05, Math.min(1, baseOp * (1 - opVar + rand() * opVar * 2)));
    const depthLayer = options.depthEnabled ? Math.floor(rand() * options.depthLayers) : 0;
    const speedVar = options.speedVariation / 100;
    const speedMultiplier = 1 - speedVar + rand() * speedVar * 2;
    particles.push({
      id: i,
      spawnFrame: Math.floor(rand() * lifetimeFrames),
      lifetimeFrames,
      startX: pos.x,
      startY: pos.y,
      size: Math.max(1, Math.round(size)),
      opacity,
      depthLayer,
      colorIndex: Math.floor(rand() * resolvedColors.length),
      rotationOffset: rand() * 360,
      rotationDirection: rand() > 0.5 ? 1 : -1,
      movementSeed: rand(),
      speedMultiplier
    });
  }
  let audioFrames = null;
  if (options.audioReactive) {
    try {
      const result = await audio.getSpectrum({
        bandCount: 6,
        minFrequency: 20,
        maxFrequency: 16e3,
        analysisFps: video.fps,
        sensitivity: 1,
        smoothing: options.audioSmoothing / 100,
        attackMs: 50,
        releaseMs: 200,
        silenceFloor: 0.01,
        bandDistribution: "log"
      });
      audioFrames = result.values;
    } catch {
      audioFrames = null;
    }
  }
  let audioSpeedAccum = null;
  if (options.audioReactive && audioFrames) {
    const needsSpeedAccum = options.audioMode === "speed-boost" || options.audioMode === "combined";
    if (needsSpeedAccum) {
      audioSpeedAccum = new Array(totalFrames);
      let cumulative = 0;
      for (let f = 0; f < totalFrames; f++) {
        const bandValues = audioFrames[Math.min(f, audioFrames.length - 1)] ?? null;
        const energy = getAudioEnergy(bandValues, options.audioBand, options.audioSensitivity);
        const mods = computeAudioModifiers(energy, options.audioMode);
        cumulative += mods.speedMultiplier;
        audioSpeedAccum[f] = cumulative;
      }
    }
  }
  const data = {
    particles,
    totalFrames,
    fps: video.fps,
    audioFrames,
    resolvedColors,
    audioSpeedAccum
  };
  return data;
}
function getPrepareCacheKey(ctx) {
  const { options, video, audioPath } = ctx;
  return JSON.stringify({
    audioPath,
    fps: video.fps,
    durationMs: video.durationMs,
    durationInFrames: video.durationInFrames,
    particleCount: options.particleCount,
    particleSeed: options.particleSeed,
    shape: options.shape,
    movementPattern: options.movementPattern,
    speed: options.speed,
    speedVariation: options.speedVariation,
    spawnArea: options.spawnArea,
    colorMode: options.colorMode,
    primaryColor: options.primaryColor,
    secondaryColor: options.secondaryColor,
    paletteColors: options.paletteColors,
    baseSize: options.baseSize,
    sizeVariation: options.sizeVariation,
    baseOpacity: options.baseOpacity,
    opacityVariation: options.opacityVariation,
    audioReactive: options.audioReactive,
    audioBand: options.audioBand,
    audioSmoothing: options.audioSmoothing,
    depthEnabled: options.depthEnabled,
    depthLayers: options.depthLayers
  });
}

// src/component.ts
var import_plugin_base = require("@lyric-video-maker/plugin-base");

// src/movement.ts
var TAU = Math.PI * 2;
function noise(seed, t) {
  return Math.sin(seed * 12.9898 + t * 43.758) * 0.5 + Math.sin(seed * 7.233 + t * 21.317) * 0.3 + Math.sin(seed * 3.145 + t * 67.891) * 0.2;
}
function hash01(seed, step) {
  const x = Math.sin(seed * 127.1 + step * 311.7) * 43758.5453;
  return x - Math.floor(x);
}
var _pos = { x: 0, y: 0 };
function computePosition(t, particle, params) {
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
      return randomWalk(t, particle, speed, turb, seed, speedMul, params.randomWalkRandomness / 100);
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
function floatUp(t, p, speed, turb, seed, speedMul) {
  const travel = t * speed * speedMul * 250;
  const wobble = Math.sin(t * TAU * 2 + seed * 10) * turb * 15;
  _pos.x = p.startX + wobble;
  _pos.y = p.startY - travel;
  return _pos;
}
function fallDown(t, p, speed, turb, seed, speedMul) {
  const travel = t * speed * speedMul * 250;
  const wobble = Math.sin(t * TAU * 2 + seed * 10) * turb * 15;
  _pos.x = p.startX + wobble;
  _pos.y = p.startY + travel;
  return _pos;
}
function drift(t, p, speed, turb, seed, speedMul, dir) {
  const travel = t * speed * speedMul * 250;
  const wobble = Math.sin(t * TAU * 3 + seed * 7) * turb * 10;
  _pos.x = p.startX + travel * dir;
  _pos.y = p.startY + wobble;
  return _pos;
}
function swirl(t, p, speed, radius, seed, speedMul) {
  const angle = t * TAU * speed * speedMul * 4 + seed * TAU;
  const r = radius * 50 * (1 - t * 0.3);
  _pos.x = 50 + Math.cos(angle) * r + (p.startX - 50) * 0.3;
  _pos.y = 50 + Math.sin(angle) * r + (p.startY - 50) * 0.3;
  return _pos;
}
function explode(t, p, speed, seed, speedMul) {
  const angle = seed * TAU;
  const distance = t * speed * speedMul * 130;
  const eased = 1 - Math.pow(1 - t, 2);
  _pos.x = 50 + Math.cos(angle) * distance * eased;
  _pos.y = 50 + Math.sin(angle) * distance * eased;
  return _pos;
}
function converge(t, p, speed, seed, speedMul) {
  const eased = t * t;
  _pos.x = p.startX + (50 - p.startX) * eased * speed * speedMul * 0.5;
  _pos.y = p.startY + (50 - p.startY) * eased * speed * speedMul * 0.5;
  return _pos;
}
var WALK_STEPS = 120;
function randomWalk(t, p, speed, turb, seed, speedMul, randomness) {
  const stepSize = speed * speedMul * 250 / WALK_STEPS;
  const numSteps = Math.floor(t * WALK_STEPS);
  const frac = t * WALK_STEPS - numSteps;
  let dir = hash01(seed, 0) * TAU;
  let x = 0;
  let y = 0;
  for (let i = 1; i <= numSteps; i++) {
    if (hash01(seed, i) < randomness) {
      dir = hash01(seed + 50, i) * TAU;
    }
    x += Math.cos(dir) * stepSize;
    y += Math.sin(dir) * stepSize;
  }
  if (frac > 0) {
    if (hash01(seed, numSteps + 1) < randomness) {
      dir = hash01(seed + 50, numSteps + 1) * TAU;
    }
    x += Math.cos(dir) * stepSize * frac;
    y += Math.sin(dir) * stepSize * frac;
  }
  const wobble = turb * 5;
  x += noise(seed, t * 6) * wobble;
  y += noise(seed + 100, t * 6) * wobble;
  _pos.x = p.startX + x;
  _pos.y = p.startY + y;
  return _pos;
}
function waveSine(t, p, speed, turb, seed, speedMul) {
  const hTravel = t * speed * speedMul * 180;
  const amplitude = 20 + turb * 30;
  const wave = Math.sin(t * TAU * 3 + seed * 5) * amplitude / 100 * 30;
  _pos.x = p.startX + hTravel;
  _pos.y = p.startY + wave;
  return _pos;
}
function rain(t, p, speed, seed, speedMul) {
  const travel = t * speed * speedMul * 280;
  const jitter = Math.sin(seed * 99.7) * 2;
  _pos.x = p.startX + jitter;
  _pos.y = p.startY + travel;
  return _pos;
}
function snow(t, p, speed, turb, seed, speedMul) {
  const travel = t * speed * speedMul * 130;
  const d = Math.sin(t * TAU * 1.5 + seed * 8) * (10 + turb * 20);
  _pos.x = p.startX + d;
  _pos.y = p.startY + travel;
  return _pos;
}

// src/shapes.ts
function getShapeBaseRotation(shape) {
  return shape === "diamond" ? 45 : 0;
}

// src/component.ts
var NO_AUDIO = {
  sizeMultiplier: 1,
  speedMultiplier: 1,
  opacityMultiplier: 1,
  spawnMultiplier: 1
};
function lifecycleFade(t) {
  if (t < 0.05) return t / 0.05;
  if (t > 0.9) return (1 - t) / 0.1;
  return 1;
}
function drawCircle(ctx, size) {
  ctx.beginPath();
  ctx.arc(0, 0, size / 2, 0, Math.PI * 2);
  ctx.fill();
}
function drawSquare(ctx, size) {
  ctx.fillRect(-size / 2, -size / 2, size, size);
}
function drawDiamond(ctx, size) {
  const h = size / 2;
  ctx.beginPath();
  ctx.moveTo(0, -h);
  ctx.lineTo(h, 0);
  ctx.lineTo(0, h);
  ctx.lineTo(-h, 0);
  ctx.closePath();
  ctx.fill();
}
function drawTriangle(ctx, size) {
  const h = size * 0.866;
  ctx.beginPath();
  ctx.moveTo(0, -h / 2);
  ctx.lineTo(size / 2, h / 2);
  ctx.lineTo(-size / 2, h / 2);
  ctx.closePath();
  ctx.fill();
}
function drawRing(ctx, size) {
  ctx.beginPath();
  ctx.arc(0, 0, size / 2, 0, Math.PI * 2);
  ctx.lineWidth = Math.max(1, size * 0.15);
  ctx.stroke();
}
function drawStar(ctx, size) {
  const r = size / 2;
  const inner = r * 0.4;
  ctx.beginPath();
  for (let i = 0; i < 5; i++) {
    const outerAngle = i * 2 * Math.PI / 5 - Math.PI / 2;
    const innerAngle = outerAngle + Math.PI / 5;
    if (i === 0) ctx.moveTo(Math.cos(outerAngle) * r, Math.sin(outerAngle) * r);
    else ctx.lineTo(Math.cos(outerAngle) * r, Math.sin(outerAngle) * r);
    ctx.lineTo(Math.cos(innerAngle) * inner, Math.sin(innerAngle) * inner);
  }
  ctx.closePath();
  ctx.fill();
}
function drawHeart(ctx, size) {
  const s = size / 2;
  ctx.beginPath();
  ctx.moveTo(0, s * 0.4);
  ctx.bezierCurveTo(-s, -s * 0.2, -s, -s * 0.8, 0, -s * 0.4);
  ctx.bezierCurveTo(s, -s * 0.8, s, -s * 0.2, 0, s * 0.4);
  ctx.fill();
}
function drawSparkle(ctx, size) {
  const r = size / 2;
  const inner = r * 0.2;
  ctx.beginPath();
  for (let i = 0; i < 4; i++) {
    const outerAngle = i * Math.PI / 2 - Math.PI / 2;
    const innerAngle = outerAngle + Math.PI / 4;
    if (i === 0) ctx.moveTo(Math.cos(outerAngle) * r, Math.sin(outerAngle) * r);
    else ctx.lineTo(Math.cos(outerAngle) * r, Math.sin(outerAngle) * r);
    ctx.lineTo(Math.cos(innerAngle) * inner, Math.sin(innerAngle) * inner);
  }
  ctx.closePath();
  ctx.fill();
}
function drawSnowflake(ctx, size) {
  const r = size / 2;
  ctx.lineWidth = Math.max(1, size * 0.08);
  ctx.beginPath();
  for (let i = 0; i < 6; i++) {
    const angle = i * Math.PI / 3;
    const cos = Math.cos(angle);
    const sin = Math.sin(angle);
    ctx.moveTo(0, 0);
    ctx.lineTo(cos * r, sin * r);
    const bx = cos * r * 0.6;
    const by = sin * r * 0.6;
    const branchLen = r * 0.3;
    const a1 = angle + Math.PI / 6;
    const a2 = angle - Math.PI / 6;
    ctx.moveTo(bx, by);
    ctx.lineTo(bx + Math.cos(a1) * branchLen, by + Math.sin(a1) * branchLen);
    ctx.moveTo(bx, by);
    ctx.lineTo(bx + Math.cos(a2) * branchLen, by + Math.sin(a2) * branchLen);
  }
  ctx.stroke();
}
var SHAPE_DRAW = {
  circle: drawCircle,
  square: drawSquare,
  diamond: drawDiamond,
  triangle: drawTriangle,
  ring: drawRing,
  star: drawStar,
  heart: drawHeart,
  sparkle: drawSparkle,
  snowflake: drawSnowflake
};
function buildComponent(React) {
  return function ParticlesComponent(props) {
    const { options, frame, video, prepared, containerRef } = props;
    const { width: cw, height: ch } = (0, import_plugin_base.useContainerSize)(containerRef);
    const data = prepared;
    if (!data.particles || data.particles.length === 0) return null;
    const w = Math.max(1, Math.round(cw || video.width));
    const h = Math.max(1, Math.round(ch || video.height));
    let audioMods = NO_AUDIO;
    if (options.audioReactive && data.audioFrames) {
      const bandValues = data.audioFrames[Math.min(frame, data.audioFrames.length - 1)] ?? null;
      const energy = getAudioEnergy(bandValues, options.audioBand, options.audioSensitivity);
      audioMods = computeAudioModifiers(energy, options.audioMode);
    }
    const depthEnabled = options.depthEnabled;
    const depthLayers = options.depthLayers;
    const depthSpeedFac = options.depthSpeedFactor / 100;
    const depthSizeFac = options.depthSizeFactor / 100;
    const depthOpacityFac = options.depthOpacityFactor / 100;
    const shapeBaseRot = getShapeBaseRotation(options.shape);
    const drawShape = SHAPE_DRAW[options.shape] || drawCircle;
    const isText = options.shape === "text";
    const textContent = isText ? options.customText || "\u2726" : "";
    const glowEnabled = options.glowEnabled;
    const glowColor = options.glowColor;
    const glowBlur = Math.round(options.glowStrength * 0.6);
    const trailEnabled = options.trailEnabled;
    const trailLength = options.trailLength;
    const trailDecay = options.trailOpacityDecay / 100;
    const movParams = {
      pattern: options.movementPattern,
      speed: options.speed,
      turbulence: options.turbulence,
      swirlRadius: options.swirlRadius,
      randomWalkRandomness: options.randomWalkRandomness
    };
    const colors = data.resolvedColors;
    const speedAccum = data.audioSpeedAccum;
    const refCallback = (el) => {
      if (!el) return;
      const ctx = el.getContext("2d");
      if (!ctx) return;
      if (el.width !== w || el.height !== h) {
        el.width = w;
        el.height = h;
      }
      ctx.clearRect(0, 0, w, h);
      if (glowEnabled) {
        ctx.shadowColor = glowColor;
        ctx.shadowBlur = glowBlur;
      } else {
        ctx.shadowColor = "transparent";
        ctx.shadowBlur = 0;
      }
      for (let i = 0; i < data.particles.length; i++) {
        const p = data.particles[i];
        let age = frame - p.spawnFrame;
        if (age < 0) age += p.lifetimeFrames;
        const localAge = age % p.lifetimeFrames;
        if (audioMods.spawnMultiplier < 1 && i % 3 !== 0) {
          if (p.movementSeed % 1 < 1 - audioMods.spawnMultiplier) continue;
        }
        let t;
        const cycleIndex = Math.floor(age / p.lifetimeFrames);
        const cycleStartFrame = p.spawnFrame + cycleIndex * p.lifetimeFrames;
        if (speedAccum && cycleStartFrame >= 0 && frame < speedAccum.length) {
          const accumAtFrame = speedAccum[Math.min(frame, speedAccum.length - 1)];
          const accumAtCycleStart = cycleStartFrame > 0 ? speedAccum[Math.min(cycleStartFrame - 1, speedAccum.length - 1)] : 0;
          const accumOverLifetime = accumAtFrame - accumAtCycleStart;
          t = Math.min(1, accumOverLifetime / p.lifetimeFrames);
        } else {
          t = localAge / p.lifetimeFrames;
        }
        const fade = lifecycleFade(t);
        if (fade <= 0) continue;
        let depthSpeed = 1;
        let depthSize = 1;
        let depthOpacity = 1;
        if (depthEnabled && depthLayers > 1) {
          const layerNorm = p.depthLayer / (depthLayers - 1);
          depthSpeed = 1 - depthSpeedFac + layerNorm * depthSpeedFac;
          depthSize = 1 - depthSizeFac + layerNorm * depthSizeFac;
          depthOpacity = 1 - depthOpacityFac + layerNorm * depthOpacityFac;
        }
        const size = Math.max(1, p.size * depthSize * audioMods.sizeMultiplier);
        const opacity = Math.min(1, p.opacity * fade * depthOpacity * audioMods.opacityMultiplier);
        if (opacity < 0.01) continue;
        movParams.speed = speedAccum ? options.speed * depthSpeed : options.speed * depthSpeed * audioMods.speedMultiplier;
        const color = colors[p.colorIndex % colors.length];
        const rotation = options.particleRotation ? shapeBaseRot + p.rotationOffset + localAge * (options.rotationSpeed / 30) * p.rotationDirection : shapeBaseRot;
        const rotRad = rotation * Math.PI / 180;
        if (trailEnabled && trailLength > 0) {
          for (let tr = trailLength; tr >= 1; tr--) {
            const trailT = Math.max(0, t - tr * 0.02);
            const trailPos = computePosition(trailT, p, movParams);
            const tx = trailPos.x / 100 * w;
            const ty = trailPos.y / 100 * h;
            const trailOpacity = opacity * Math.pow(1 - trailDecay, tr);
            if (trailOpacity < 0.01) continue;
            const trailSize = size * (1 - tr * 0.05);
            const trailRotRad = (rotation - tr * 10) * Math.PI / 180;
            ctx.globalAlpha = trailOpacity;
            ctx.save();
            ctx.translate(tx, ty);
            ctx.rotate(trailRotRad);
            if (isText) {
              ctx.fillStyle = color;
              ctx.font = `${trailSize * 0.8}px sans-serif`;
              ctx.textAlign = "center";
              ctx.textBaseline = "middle";
              ctx.fillText(textContent, 0, 0);
            } else {
              ctx.fillStyle = color;
              ctx.strokeStyle = color;
              drawShape(ctx, trailSize);
            }
            ctx.restore();
          }
        }
        const pos = computePosition(t, p, movParams);
        const px = pos.x / 100 * w;
        const py = pos.y / 100 * h;
        ctx.globalAlpha = opacity;
        ctx.save();
        ctx.translate(px, py);
        ctx.rotate(rotRad);
        if (isText) {
          ctx.fillStyle = color;
          ctx.font = `${size * 0.8}px sans-serif`;
          ctx.textAlign = "center";
          ctx.textBaseline = "middle";
          ctx.fillText(textContent, 0, 0);
        } else {
          ctx.fillStyle = color;
          ctx.strokeStyle = color;
          drawShape(ctx, size);
        }
        ctx.restore();
      }
      ctx.globalAlpha = 1;
    };
    return React.createElement(
      "div",
      {
        ref: containerRef,
        style: {
          width: "100%",
          height: "100%",
          overflow: "hidden",
          pointerEvents: "none"
        }
      },
      React.createElement("canvas", {
        ref: refCallback,
        width: w,
        height: h,
        style: {
          width: "100%",
          height: "100%",
          display: "block"
        }
      })
    );
  };
}

// src/presets.ts
var import_plugin_base2 = require("@lyric-video-maker/plugin-base");
function transformModifier(id, x, y, width, height, anchor = "top-left") {
  return {
    id,
    modifierId: "transform",
    enabled: true,
    options: {
      x,
      y,
      width,
      height,
      anchor,
      rotation: 0,
      flipHorizontal: false,
      flipVertical: false
    }
  };
}
function buildPresets(defaultOptions) {
  function makeScene(id, name, description, overrides) {
    return {
      id,
      name,
      description,
      source: "plugin",
      readOnly: true,
      components: [
        {
          id: "particles-1",
          componentId: "particles.particles",
          enabled: true,
          modifiers: [],
          options: { ...defaultOptions, ...overrides }
        }
      ]
    };
  }
  return [
    makeScene("particles.snowfall", "Snowfall", "Gentle snowflakes drifting down with parallax depth.", {
      shape: "snowflake",
      movementPattern: "snow",
      particleCount: 80,
      speed: 20,
      speedVariation: 40,
      spawnArea: "top",
      turbulence: 40,
      colorMode: "single",
      primaryColor: "#ffffff",
      baseSize: 18,
      sizeVariation: 60,
      baseOpacity: 70,
      opacityVariation: 30,
      particleRotation: true,
      rotationSpeed: 15,
      depthEnabled: true,
      depthLayers: 3,
      depthSpeedFactor: 60,
      depthSizeFactor: 50,
      depthOpacityFactor: 40
    }),
    makeScene("particles.starfield", "Starfield", "Twinkling stars rising with glow and depth.", {
      shape: "circle",
      movementPattern: "float-up",
      particleCount: 120,
      speed: 12,
      speedVariation: 50,
      spawnArea: "full",
      turbulence: 10,
      colorMode: "palette",
      paletteColors: "#ffffff,#cce5ff,#99ccff,#e0e0ff",
      baseSize: 4,
      sizeVariation: 60,
      baseOpacity: 80,
      opacityVariation: 40,
      particleRotation: false,
      depthEnabled: true,
      depthLayers: 4,
      depthSpeedFactor: 70,
      depthSizeFactor: 60,
      depthOpacityFactor: 50,
      glowEnabled: true,
      glowColor: "#aaccff",
      glowStrength: 60
    }),
    makeScene("particles.confetti", "Confetti Burst", "Colorful confetti exploding outward.", {
      shape: "square",
      movementPattern: "explode",
      particleCount: 100,
      speed: 70,
      speedVariation: 40,
      spawnArea: "center",
      colorMode: "rainbow",
      baseSize: 10,
      sizeVariation: 50,
      baseOpacity: 90,
      opacityVariation: 10,
      particleRotation: true,
      rotationSpeed: 120
    }),
    makeScene("particles.fireflies", "Fireflies", "Warm glowing particles drifting lazily.", {
      shape: "circle",
      movementPattern: "random-walk",
      randomWalkRandomness: 3,
      particleCount: 25,
      speed: 20,
      speedVariation: 40,
      spawnArea: "full",
      turbulence: 60,
      colorMode: "palette",
      paletteColors: "#ffdd44,#ffaa22,#ffee88,#ffcc00",
      baseSize: 8,
      sizeVariation: 40,
      baseOpacity: 70,
      opacityVariation: 40,
      particleRotation: false,
      glowEnabled: true,
      glowColor: "#ffdd44",
      glowStrength: 80
    }),
    makeScene("particles.rising-hearts", "Rising Hearts", "Hearts floating upward in pink and red.", {
      shape: "heart",
      movementPattern: "float-up",
      particleCount: 40,
      speed: 25,
      speedVariation: 30,
      spawnArea: "bottom",
      turbulence: 30,
      colorMode: "gradient-blend",
      primaryColor: "#ff4466",
      secondaryColor: "#ff88aa",
      baseSize: 22,
      sizeVariation: 50,
      baseOpacity: 80,
      opacityVariation: 20,
      particleRotation: true,
      rotationSpeed: 20
    }),
    makeScene("particles.rain", "Rain", "Fast raindrops falling.", {
      shape: "circle",
      movementPattern: "rain",
      particleCount: 150,
      speed: 80,
      speedVariation: 30,
      spawnArea: "top",
      colorMode: "palette",
      paletteColors: "#88bbdd,#aaccee,#6699bb,#77aacc",
      baseSize: 3,
      sizeVariation: 30,
      baseOpacity: 60,
      opacityVariation: 30,
      particleRotation: false,
      trailEnabled: true,
      trailLength: 4,
      trailOpacityDecay: 40
    }),
    makeScene("particles.bubbles", "Bubbles", "Translucent rings floating upward.", {
      shape: "ring",
      movementPattern: "float-up",
      particleCount: 35,
      speed: 15,
      speedVariation: 40,
      spawnArea: "bottom",
      turbulence: 25,
      colorMode: "palette",
      paletteColors: "#88ddff,#aaeeff,#66ccee,#bbddff,#ccbbff",
      baseSize: 25,
      sizeVariation: 70,
      baseOpacity: 50,
      opacityVariation: 30,
      particleRotation: false
    }),
    makeScene("particles.galaxy-swirl", "Galaxy Swirl", "Sparkles swirling in a cosmic vortex.", {
      shape: "sparkle",
      movementPattern: "swirl",
      particleCount: 80,
      speed: 25,
      speedVariation: 30,
      spawnArea: "full",
      swirlRadius: 45,
      colorMode: "palette",
      paletteColors: "#bb88ff,#8866ff,#ffffff,#6644cc,#aabbff",
      baseSize: 10,
      sizeVariation: 50,
      baseOpacity: 75,
      opacityVariation: 30,
      particleRotation: true,
      rotationSpeed: 40,
      depthEnabled: true,
      depthLayers: 3,
      depthSpeedFactor: 50,
      depthSizeFactor: 40,
      depthOpacityFactor: 30,
      glowEnabled: true,
      glowColor: "#9966ff",
      glowStrength: 50
    }),
    // Lofi+ — extends the built-in Lofi scene with warm floating particles.
    // Position/size/timing live on each instance's modifier stack.
    {
      id: "particles.lofi-plus",
      name: "Lofi+",
      description: "The cozy lofi scene enhanced with warm glowing firefly particles drifting through the room.",
      source: "plugin",
      readOnly: true,
      components: [
        {
          id: "background-image-1",
          componentId: "image",
          enabled: true,
          modifiers: [],
          options: {
            source: (0, import_plugin_base2.createPluginAssetUri)("scene-registry", "assets/lofi-background.png"),
            fitMode: "cover"
          }
        },
        {
          id: "background-color-1",
          componentId: "background-color",
          enabled: true,
          modifiers: [],
          options: {
            mode: "gradient",
            direction: "0deg",
            topColor: "#1a0f0a",
            topOpacity: 25,
            bottomColor: "#1a0f0a",
            bottomOpacity: 65
          }
        },
        {
          id: "particles-1",
          componentId: "particles.particles",
          enabled: true,
          modifiers: [],
          options: {
            ...defaultOptions,
            shape: "circle",
            movementPattern: "random-walk",
            randomWalkRandomness: 3,
            particleCount: 20,
            speed: 15,
            speedVariation: 40,
            spawnArea: "full",
            turbulence: 50,
            colorMode: "palette",
            paletteColors: "#ffb347,#ffdd88,#e8825c,#ffcc66",
            baseSize: 6,
            sizeVariation: 40,
            baseOpacity: 50,
            opacityVariation: 30,
            particleRotation: false,
            glowEnabled: true,
            glowColor: "#ffb347",
            glowStrength: 70
          }
        },
        {
          id: "equalizer-1",
          componentId: "equalizer",
          enabled: true,
          modifiers: [
            transformModifier("equalizer-1-transform", 0, 80, 100, 20)
          ],
          options: {
            layoutMode: "mirrored",
            barCount: 24,
            cornerRadius: 999,
            minBarScale: 8,
            maxBarScale: 80,
            colorMode: "gradient",
            primaryColor: "#ffb347",
            secondaryColor: "#e8825c",
            opacity: 40,
            smoothing: 55,
            attackMs: 80,
            releaseMs: 400,
            sensitivity: 1,
            glowEnabled: true,
            glowColor: "#ffb347",
            glowStrength: 25,
            shadowEnabled: false
          }
        },
        {
          id: "divider-1",
          componentId: "shape",
          enabled: true,
          modifiers: [
            transformModifier("divider-1-transform", 5, 80, 90, 1)
          ],
          options: {
            shapeType: "line",
            fillEnabled: false,
            strokeEnabled: true,
            strokeColor: "#fff5e6",
            strokeWidth: 1,
            strokeOpacity: 15
          }
        },
        {
          id: "lyrics-by-line-1",
          componentId: "lyrics-by-line",
          enabled: true,
          modifiers: [
            transformModifier("lyrics-by-line-1-transform", 0, 0, 100, 78)
          ],
          options: {
            lyricColor: "#fff5e6",
            lyricPosition: "bottom",
            lyricSize: 64,
            shadowEnabled: true,
            shadowColor: "#1a0f0a",
            shadowIntensity: 70
          }
        },
        {
          id: "static-text-1",
          componentId: "static-text",
          enabled: true,
          modifiers: [
            transformModifier("static-text-1-transform", 2, 2, 30, 6)
          ],
          options: {
            text: "now playing",
            fontSize: 16,
            fontWeight: 300,
            color: "#aa9080",
            textAlign: "left",
            textCase: "lowercase"
          }
        }
      ]
    }
  ];
}

// src/plugin.ts
function activate(host) {
  const { React } = host;
  const defaultOptions = buildDefaultOptions();
  const Component = buildComponent(React);
  const particlesComponent = {
    id: "particles.particles",
    name: "Particles",
    description: "Highly customizable particle system with multiple shapes, movement patterns, colors, audio reactivity, depth, glow, and trails.",
    staticWhenMarkupUnchanged: false,
    options: buildOptionsSchema(),
    defaultOptions,
    getPrepareCacheKey,
    prepare: prepareParticles,
    Component
  };
  const scenes = buildPresets(defaultOptions);
  return {
    components: [particlesComponent],
    scenes
  };
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  activate
});
