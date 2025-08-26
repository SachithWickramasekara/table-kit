import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["src/index.ts", "src/styles/tokens.css"],
  format: ["cjs", "esm"],
  dts: {
    entry: "src/index.ts",
    compilerOptions: {
      jsx: "react-jsx",
      target: "ES2020",
      lib: ["ES2020", "DOM", "DOM.Iterable"],
      module: "ESNext",
      moduleResolution: "bundler",
      skipLibCheck: true,
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
