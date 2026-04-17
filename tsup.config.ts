import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["src/plugin.ts"],
  format: ["cjs"],
  outDir: "dist",
  clean: true,
  dts: false,
  external: ["react","react-dom","@lyric-video-maker/plugin-base"],
  outExtension() {
    return { js: ".cjs" };
  },
});
