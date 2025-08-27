import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["src/index.ts", "src/styles/tokens.css"],
  format: ["cjs", "esm"],
  dts: true,
  // splitting: false,
  sourcemap: true,
  clean: true,
  target: "node16",
  external: ["react", "react-dom", "framer-motion"],
  esbuildOptions(options) {
    options.banner = {
      js: '"use client"',
    };
    options.jsx = "automatic";
  },
  // Add proper TypeScript configuration for JSX
  tsconfig: "tsconfig.build.json",
  onSuccess:
    "mkdir -p dist/styles && cp src/index.css dist/index.css && cp -R src/styles/. dist/styles/ || true",
});
