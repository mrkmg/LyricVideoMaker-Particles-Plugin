import type { SceneRenderProps } from "@lyric-video-maker/plugin-base";
import type { ParticleOptions, PreparedParticlesData } from "./types.js";
import { computePosition } from "./movement.js";
import type { MovementParams } from "./movement.js";
import { getShapeBaseRotation } from "./shapes.js";
import { getAudioEnergy, computeAudioModifiers } from "./audio.js";
import type { AudioModifiers } from "./audio.js";

export type { ParticleOptions };

const NO_AUDIO: AudioModifiers = {
  sizeMultiplier: 1,
  speedMultiplier: 1,
  opacityMultiplier: 1,
  spawnMultiplier: 1,
};

function lifecycleFade(t: number): number {
  if (t < 0.05) return t / 0.05;
  if (t > 0.9) return (1 - t) / 0.1;
  return 1;
}

// ── Canvas shape draw functions ─────────────────────────────────────
// These draw a particle shape centered at (0, 0) at the given size.

function drawCircle(ctx: CanvasRenderingContext2D, size: number): void {
  ctx.beginPath();
  ctx.arc(0, 0, size / 2, 0, Math.PI * 2);
  ctx.fill();
}

function drawSquare(ctx: CanvasRenderingContext2D, size: number): void {
  ctx.fillRect(-size / 2, -size / 2, size, size);
}

function drawDiamond(ctx: CanvasRenderingContext2D, size: number): void {
  const h = size / 2;
  ctx.beginPath();
  ctx.moveTo(0, -h);
  ctx.lineTo(h, 0);
  ctx.lineTo(0, h);
  ctx.lineTo(-h, 0);
  ctx.closePath();
  ctx.fill();
}

function drawTriangle(ctx: CanvasRenderingContext2D, size: number): void {
  const h = size * 0.866; // height of equilateral triangle
  ctx.beginPath();
  ctx.moveTo(0, -h / 2);
  ctx.lineTo(size / 2, h / 2);
  ctx.lineTo(-size / 2, h / 2);
  ctx.closePath();
  ctx.fill();
}

function drawRing(ctx: CanvasRenderingContext2D, size: number): void {
  ctx.beginPath();
  ctx.arc(0, 0, size / 2, 0, Math.PI * 2);
  ctx.lineWidth = Math.max(1, size * 0.15);
  ctx.stroke();
}

function drawStar(ctx: CanvasRenderingContext2D, size: number): void {
  const r = size / 2;
  const inner = r * 0.4;
  ctx.beginPath();
  for (let i = 0; i < 5; i++) {
    const outerAngle = (i * 2 * Math.PI) / 5 - Math.PI / 2;
    const innerAngle = outerAngle + Math.PI / 5;
    if (i === 0) ctx.moveTo(Math.cos(outerAngle) * r, Math.sin(outerAngle) * r);
    else ctx.lineTo(Math.cos(outerAngle) * r, Math.sin(outerAngle) * r);
    ctx.lineTo(Math.cos(innerAngle) * inner, Math.sin(innerAngle) * inner);
  }
  ctx.closePath();
  ctx.fill();
}

function drawHeart(ctx: CanvasRenderingContext2D, size: number): void {
  const s = size / 2;
  ctx.beginPath();
  ctx.moveTo(0, s * 0.4);
  ctx.bezierCurveTo(-s, -s * 0.2, -s, -s * 0.8, 0, -s * 0.4);
  ctx.bezierCurveTo(s, -s * 0.8, s, -s * 0.2, 0, s * 0.4);
  ctx.fill();
}

function drawSparkle(ctx: CanvasRenderingContext2D, size: number): void {
  const r = size / 2;
  const inner = r * 0.2;
  ctx.beginPath();
  for (let i = 0; i < 4; i++) {
    const outerAngle = (i * Math.PI) / 2 - Math.PI / 2;
    const innerAngle = outerAngle + Math.PI / 4;
    if (i === 0) ctx.moveTo(Math.cos(outerAngle) * r, Math.sin(outerAngle) * r);
    else ctx.lineTo(Math.cos(outerAngle) * r, Math.sin(outerAngle) * r);
    ctx.lineTo(Math.cos(innerAngle) * inner, Math.sin(innerAngle) * inner);
  }
  ctx.closePath();
  ctx.fill();
}

function drawSnowflake(ctx: CanvasRenderingContext2D, size: number): void {
  const r = size / 2;
  ctx.lineWidth = Math.max(1, size * 0.08);
  ctx.beginPath();
  for (let i = 0; i < 6; i++) {
    const angle = (i * Math.PI) / 3;
    const cos = Math.cos(angle);
    const sin = Math.sin(angle);
    // Main arm
    ctx.moveTo(0, 0);
    ctx.lineTo(cos * r, sin * r);
    // Branches at 60% out
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

type ShapeDrawFn = (ctx: CanvasRenderingContext2D, size: number) => void;

const SHAPE_DRAW: Record<string, ShapeDrawFn> = {
  circle: drawCircle,
  square: drawSquare,
  diamond: drawDiamond,
  triangle: drawTriangle,
  ring: drawRing,
  star: drawStar,
  heart: drawHeart,
  sparkle: drawSparkle,
  snowflake: drawSnowflake,
};

/**
 * Build the Component render function.
 *
 * Uses a single <canvas> element instead of hundreds of divs.
 * All particle math runs in Chromium (parallel across render pages).
 * prepare() only sends lightweight particle states + audio data.
 */
export function buildComponent(
  React: any,
  computeTransformStyle: (options: any, canvas: any) => any,
  computeTimingOpacity: (timeMs: number, timing: any) => number,
) {
  // Persistent canvas ref — survives across frames in the same Chromium page.
  // React will reuse the element; we draw on it via the ref callback.
  let canvasRef: HTMLCanvasElement | null = null;
  let canvasCtx: CanvasRenderingContext2D | null = null;

  return function ParticlesComponent(
    props: SceneRenderProps<ParticleOptions>,
  ): any {
    const { options, frame, timeMs, video, prepared } = props;
    const data = prepared as unknown as PreparedParticlesData;

    if (!data.particles || data.particles.length === 0) return null;

    const containerStyle = computeTransformStyle(options, video);
    const timingOpacity = computeTimingOpacity(timeMs, options);
    if (timingOpacity <= 0) return null;

    // Audio
    let audioMods = NO_AUDIO;
    if (options.audioReactive && data.audioFrames) {
      const bandValues = data.audioFrames[Math.min(frame, data.audioFrames.length - 1)] ?? null;
      const energy = getAudioEnergy(bandValues, options.audioBand, options.audioSensitivity);
      audioMods = computeAudioModifiers(energy, options.audioMode);
    }

    // Depth config
    const depthEnabled = options.depthEnabled;
    const depthLayers = options.depthLayers;
    const depthSpeedFac = options.depthSpeedFactor / 100;
    const depthSizeFac = options.depthSizeFactor / 100;
    const depthOpacityFac = options.depthOpacityFactor / 100;

    // Shape info
    const shapeBaseRot = getShapeBaseRotation(options.shape);
    const drawShape = SHAPE_DRAW[options.shape] || drawCircle;
    const isText = options.shape === "text";
    const textContent = isText ? (options.customText || "✦") : "";

    // Glow
    const glowEnabled = options.glowEnabled;
    const glowColor = options.glowColor;
    const glowBlur = Math.round(options.glowStrength * 0.6);

    // Trail config
    const trailEnabled = options.trailEnabled;
    const trailLength = options.trailLength;
    const trailDecay = options.trailOpacityDecay / 100;

    // Movement params — one object, mutated per-particle
    const movParams: MovementParams = {
      pattern: options.movementPattern,
      speed: options.speed,
      turbulence: options.turbulence,
      swirlRadius: options.swirlRadius,
    };

    const colors = data.resolvedColors;
    const w = video.width;
    const h = video.height;
    const speedAccum = data.audioSpeedAccum;

    // Draw all particles onto the canvas via ref callback
    const refCallback = (el: HTMLCanvasElement | null) => {
      if (!el) return;
      if (el !== canvasRef) {
        canvasRef = el;
        canvasCtx = el.getContext("2d");
        el.width = w;
        el.height = h;
      }
      const ctx = canvasCtx;
      if (!ctx) return;

      // Resize if needed
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

        // Age with recycling
        let age = frame - p.spawnFrame;
        if (age < 0) age += p.lifetimeFrames;
        const localAge = age % p.lifetimeFrames;

        // Spawn burst: skip particles when audio is quiet
        if (audioMods.spawnMultiplier < 1 && (i % 3 !== 0)) {
          if ((p.movementSeed % 1) < (1 - audioMods.spawnMultiplier)) continue;
        }

        // Compute normalized progress t (0-1 over lifetime).
        // When audioSpeedAccum exists, t is derived from cumulative
        // speed integration so speed-boost accumulates over time
        // instead of teleporting the particle.
        let t: number;
        const cycleIndex = Math.floor(age / p.lifetimeFrames);
        const cycleStartFrame = p.spawnFrame + cycleIndex * p.lifetimeFrames;
        if (speedAccum && cycleStartFrame >= 0 && frame < speedAccum.length) {
          // Cumulative speed at current frame vs cycle start
          const accumAtFrame = speedAccum[Math.min(frame, speedAccum.length - 1)];
          const accumAtCycleStart = cycleStartFrame > 0
            ? speedAccum[Math.min(cycleStartFrame - 1, speedAccum.length - 1)]
            : 0;
          const accumOverLifetime = accumAtFrame - accumAtCycleStart;
          // Normalize: if every frame had speedMul=1, accumOverLifetime would equal localAge.
          // Divide by lifetimeFrames to get 0-1 range.
          t = Math.min(1, accumOverLifetime / p.lifetimeFrames);
        } else {
          t = localAge / p.lifetimeFrames;
        }

        const fade = lifecycleFade(t);
        if (fade <= 0) continue;

        // Depth multipliers
        let depthSpeed = 1;
        let depthSize = 1;
        let depthOpacity = 1;
        if (depthEnabled && depthLayers > 1) {
          const layerNorm = p.depthLayer / (depthLayers - 1);
          depthSpeed = (1 - depthSpeedFac) + layerNorm * depthSpeedFac;
          depthSize = (1 - depthSizeFac) + layerNorm * depthSizeFac;
          depthOpacity = (1 - depthOpacityFac) + layerNorm * depthOpacityFac;
        }

        const size = Math.max(1, p.size * depthSize * audioMods.sizeMultiplier);
        const opacity = Math.min(1, p.opacity * fade * depthOpacity * audioMods.opacityMultiplier);
        if (opacity < 0.01) continue;

        // Speed: depth only (audio speed is baked into t via accumulator)
        movParams.speed = speedAccum
          ? options.speed * depthSpeed
          : options.speed * depthSpeed * audioMods.speedMultiplier;

        const color = colors[p.colorIndex % colors.length];
        const rotation = options.particleRotation
          ? shapeBaseRot + p.rotationOffset + localAge * (options.rotationSpeed / 30) * p.rotationDirection
          : shapeBaseRot;
        const rotRad = (rotation * Math.PI) / 180;

        // Trail
        if (trailEnabled && trailLength > 0) {
          for (let tr = trailLength; tr >= 1; tr--) {
            const trailT = Math.max(0, t - (tr * 0.02));
            const trailPos = computePosition(trailT, p, movParams);
            const tx = (trailPos.x / 100) * w;
            const ty = (trailPos.y / 100) * h;
            const trailOpacity = opacity * Math.pow(1 - trailDecay, tr);
            if (trailOpacity < 0.01) continue;

            const trailSize = size * (1 - tr * 0.05);
            const trailRotRad = ((rotation - tr * 10) * Math.PI) / 180;

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

        // Main particle
        const pos = computePosition(t, p, movParams);
        const px = (pos.x / 100) * w;
        const py = (pos.y / 100) * h;

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

    // Single canvas element — 1 DOM node regardless of particle count
    return React.createElement(
      "div",
      {
        style: {
          ...containerStyle,
          opacity: timingOpacity,
          overflow: "hidden",
          pointerEvents: "none",
        },
      },
      React.createElement("canvas", {
        ref: refCallback,
        width: w,
        height: h,
        style: {
          width: "100%",
          height: "100%",
          display: "block",
        },
      }),
    );
  };
}
