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

  const defaultOptions = buildDefaultOptions();
  const Component = buildComponent(React);

  const particlesComponent: SceneComponentDefinition<ParticleOptions> = {
    id: "particles.particles",
    name: "Particles",
    description:
      "Highly customizable particle system with multiple shapes, movement patterns, colors, audio reactivity, depth, glow, and trails.",
    staticWhenMarkupUnchanged: false,
    options: buildOptionsSchema(),
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
