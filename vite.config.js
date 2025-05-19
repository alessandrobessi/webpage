import { defineConfig } from "vite";
import { sveltekit } from "@sveltejs/kit/vite";
import wasm from "vite-plugin-wasm";

export default defineConfig({
  plugins: [sveltekit(), wasm()],
  assetsInclude: ["**/*.wasm"],
  build: {
    target: "esnext", // Enables top-level await and modern features
  },
  optimizeDeps: {
    exclude: ["@bessimaestro/wasm-game-of-life"], // evita pre-bundling
  },
});
