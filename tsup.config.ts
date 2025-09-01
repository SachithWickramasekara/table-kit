import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["src/index.ts"],
  format: ["cjs", "esm"],
  dts: true,
  // splitting: false,
  sourcemap: true,
  clean: true,
  target: "node16",
  external: ["react", "react-dom", "framer-motion"],
  // Include CSS files in the output
  loader: {
    ".css": "copy",
  },
  esbuildOptions(options) {
    options.banner = {
      js: '"use client"',
    };
    options.jsx = "automatic";
  },
  // Add proper TypeScript configuration for JSX
  tsconfig: "tsconfig.build.json",
  // Copy CSS file to dist
  onSuccess: async () => {
    console.log("Copying CSS file...");
    const fs = await import("fs");
    const path = await import("path");

    const srcCSS = path.resolve("src/table-kit.css");
    const destCSS = path.resolve("dist/table-kit.css");

    if (fs.existsSync(srcCSS)) {
      fs.copyFileSync(srcCSS, destCSS);
      console.log("CSS file copied successfully!");
    }
  },
});
