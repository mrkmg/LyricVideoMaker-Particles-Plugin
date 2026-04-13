import type {
  LyricVideoPluginActivation,
  LyricVideoPluginHost,
  SceneComponentDefinition,
} from "@lyric-video-maker/plugin-base";
import type { ParticleOptions } from "./types.js";
import { buildOptionsSchema, buildDefaultOptions } from "./options.js";
import { prepareParticles, getPrepareCacheKey } from "./prepare.js";
import { buildComponent } from "./component.js";
import { buildPresets } from "./presets.js";

export function activate(host: LyricVideoPluginHost): LyricVideoPluginActivation {
  const { React } = host;
  const {
    transformCategory,
    timingCategory,
    DEFAULT_TRANSFORM_OPTIONS,
    DEFAULT_TIMING_OPTIONS,
    computeTransformStyle,
    computeTimingOpacity,
  } = host.transform;

  const defaultOptions = buildDefaultOptions(
    DEFAULT_TRANSFORM_OPTIONS as unknown as Record<string, unknown>,
    DEFAULT_TIMING_OPTIONS as unknown as Record<string, unknown>,
  );

  const Component = buildComponent(React, computeTransformStyle, computeTimingOpacity);

  const particlesComponent: SceneComponentDefinition<ParticleOptions> = {
    id: "particles.particles",
    name: "Particles",
    description:
      "Highly customizable particle system with multiple shapes, movement patterns, colors, audio reactivity, depth, glow, and trails.",
    staticWhenMarkupUnchanged: false,
    options: buildOptionsSchema(transformCategory, timingCategory),
    defaultOptions,
    getPrepareCacheKey,
    prepare: prepareParticles,
    Component,
  };

  const scenes = buildPresets(defaultOptions);

  return {
    components: [particlesComponent],
    scenes,
  };
}
