import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["src/index.ts", "src/styles/tokens.css"],
  format: ["cjs", "esm"],
  dts: {
    entry: "src/index.ts",
    compilerOptions: {
      jsx: "react-jsx",
    },
  },
  splitting: false,
  sourcemap: true,
  clean: true,
  external: ["react", "react-dom", "framer-motion"],
  esbuildOptions(options) {
    options.banner = {
      js: '"use client"',
    };
    options.jsx = "automatic";
  },
});
