# @lyric-video-maker/plugin-particles

Particles plugin for [LyricVideoMaker](https://mrkmg.github.io/LyricVideoMaker/). Adds customizable particle effects as scene components.

## Features

- 10 particle shapes: circle, square, star, heart, snowflake, sparkle, diamond, ring, triangle, text
- 11 movement patterns
- Audio reactivity with spectrum analysis
- Depth/parallax effects
- Glow and trail effects
- 8 built-in scene presets: snowfall, starfield, confetti, fireflies, rising hearts, rain, bubbles, galaxy swirl

## Installation

Import into LyricVideoMaker via GitHub URL:

```
https://github.com/mrkmg/LyricVideoMaker-Particles-Plugin.git
```

## Development

```bash
npm install
npm run build
npm run typecheck
```

The built `dist/plugin.cjs` must be committed to the repository. CI will fail if it is out of date.

## Releasing

```bash
npm version patch  # or minor, major
git push --follow-tags
```

This bumps `package.json`, syncs `lyric-video-plugin.json`, creates a git tag, and pushes.

## License

MIT
