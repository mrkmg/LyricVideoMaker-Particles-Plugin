import type {
  ScenePrepareContext,
  ScenePrepareCacheKeyContext,
  PreparedSceneComponentData,
} from "@lyric-video-maker/plugin-base";
import type { ParticleOptions, ParticleState, PreparedParticlesData, SpawnArea } from "./types.js";
import { hashString, mulberry32 } from "./prng.js";
import { resolveColors } from "./color.js";
import { getAudioEnergy, computeAudioModifiers } from "./audio.js";

function spawnPosition(
  area: SpawnArea,
  rand: () => number,
): { x: number; y: number } {
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
        case 0: return { x: rand() * 100, y: -5 };
        case 1: return { x: rand() * 100, y: 105 };
        case 2: return { x: -5, y: rand() * 100 };
        default: return { x: 105, y: rand() * 100 };
      }
    }
    default:
      return { x: rand() * 100, y: rand() * 100 };
  }
}

export async function prepareParticles(
  ctx: ScenePrepareContext<ParticleOptions>,
): Promise<PreparedSceneComponentData> {
  const { options, video, audio } = ctx;

  const seedValue = hashString(ctx.instance.id + String(options.particleSeed));
  const rand = mulberry32(seedValue);

  const resolvedColors = resolveColors(
    options.colorMode,
    options.primaryColor,
    options.secondaryColor,
    options.paletteColors,
    options.particleCount,
  );

  const totalFrames = video.durationInFrames;
  // Cycle duration inversely proportional to speed:
  // speed=20 → 8s, speed=50 → 4s, speed=140 → 1.5s
  const cycleSeconds = Math.min(8, Math.max(1.5, 200 / options.speed));
  const cycleFrames = Math.floor(cycleSeconds * video.fps);
  const cycleCount = Math.max(1, Math.floor(totalFrames / cycleFrames));
  const lifetimeFrames = Math.max(
    Math.floor(totalFrames / cycleCount),
    Math.floor(video.fps * 1.5),
  );

  const particles: ParticleState[] = [];
  for (let i = 0; i < options.particleCount; i++) {
    const pos = spawnPosition(options.spawnArea, rand);
    const sizeVar = options.sizeVariation / 100;
    const size = options.baseSize * (1 - sizeVar + rand() * sizeVar * 2);
    const opVar = options.opacityVariation / 100;
    const baseOp = options.baseOpacity / 100;
    const opacity = Math.max(0.05, Math.min(1, baseOp * (1 - opVar + rand() * opVar * 2)));
    const depthLayer = options.depthEnabled
      ? Math.floor(rand() * options.depthLayers)
      : 0;
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
      speedMultiplier,
    });
  }

  let audioFrames: number[][] | null = null;
  if (options.audioReactive) {
    try {
      const result = await audio.getSpectrum({
        bandCount: 6,
        minFrequency: 20,
        maxFrequency: 16000,
        analysisFps: video.fps,
        sensitivity: 1.0,
        smoothing: options.audioSmoothing / 100,
        attackMs: 50,
        releaseMs: 200,
        silenceFloor: 0.01,
        bandDistribution: "log",
      });
      audioFrames = result.values;
    } catch {
      audioFrames = null;
    }
  }

  // Pre-compute cumulative audio speed accumulator.
  // This integrates speed-boost over time so particles accelerate smoothly
  // instead of teleporting when audio energy spikes.
  let audioSpeedAccum: number[] | null = null;
  if (options.audioReactive && audioFrames) {
    const needsSpeedAccum =
      options.audioMode === "speed-boost" || options.audioMode === "combined";
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

  const data: PreparedParticlesData = {
    particles,
    totalFrames,
    fps: video.fps,
    audioFrames,
    resolvedColors,
    audioSpeedAccum,
  };

  return data as unknown as PreparedSceneComponentData;
}

export function getPrepareCacheKey(
  ctx: ScenePrepareCacheKeyContext<ParticleOptions>,
): string | null {
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
    depthLayers: options.depthLayers,
  });
}
