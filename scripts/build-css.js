import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// CSS variable values from tokens.css
const CSS_VARS = {
  "--tk-spacing-xs": "0.25rem",
  "--tk-spacing-sm": "0.5rem",
  "--tk-spacing-md": "0.75rem",
  "--tk-spacing-lg": "1rem",
  "--tk-spacing-xl": "1.5rem",
  "--tk-spacing-2xl": "2rem",
  "--tk-radius-sm": "0.375rem",
  "--tk-radius-md": "0.5rem",
  "--tk-radius-lg": "0.75rem",
  "--tk-shadow-sm": "0 1px 2px 0 rgb(0 0 0 / 0.05)",
  "--tk-shadow-md":
    "0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)",
  "--tk-shadow-lg":
    "0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)",
  "--tk-bg": "#ffffff",
  "--tk-bg-subtle": "#f9fafb",
  "--tk-bg-hover": "#f3f4f6",
  "--tk-border": "#e5e7eb",
  "--tk-border-strong": "#d1d5db",
  "--tk-text-primary": "#111827",
  "--tk-text-secondary": "#6b7280",
  "--tk-text-muted": "#9ca3af",
  "--tk-chip-bg": "#f3f4f6",
  "--tk-chip-text": "#374151",
  "--tk-chip-border": "#e5e7eb",
  "--tk-accent-blue": "#3b82f6",
  "--tk-accent-blue-bg": "#eff6ff",
  "--tk-accent-green": "#10b981",
  "--tk-accent-green-bg": "#ecfdf5",
  "--tk-accent-red": "#ef4444",
  "--tk-accent-red-bg": "#fef2f2",
  "--tk-transition-fast": "150ms cubic-bezier(0.4, 0, 0.2, 1)",
  "--tk-transition-normal": "250ms cubic-bezier(0.4, 0, 0.2, 1)",
  "--tk-transition-slow": "350ms cubic-bezier(0.4, 0, 0.2, 1)",
};

// Dark mode values
const DARK_MODE_VARS = {
  "--tk-bg": "#1f2937",
  "--tk-bg-subtle": "#111827",
  "--tk-bg-hover": "#374151",
  "--tk-border": "#374151",
  "--tk-border-strong": "#4b5563",
  "--tk-text-primary": "#f9fafb",
  "tk-text-secondary": "#d1d5db",
  "--tk-text-muted": "#9ca3af",
  "--tk-chip-bg": "#374151",
  "--tk-chip-text": "#f3f4f6",
  "--tk-chip-border": "#4b5563",
};

function replaceCSSVars(css, isDarkMode = false) {
  let result = css;
  const vars = isDarkMode ? { ...CSS_VARS, ...DARK_MODE_VARS } : CSS_VARS;

  for (const [varName, value] of Object.entries(vars)) {
    result = result.replace(new RegExp(varName, "g"), value);
  }

  return result;
}

function processCSSModule(cssContent, className) {
  // Convert CSS module class names to regular CSS
  let processedCSS = cssContent;

  // Replace .className with .table-kit-className
  processedCSS = processedCSS.replace(
    /\.([a-zA-Z][a-zA-Z0-9_-]*)/g,
    `.table-kit-$1`
  );

  // Replace CSS variables with actual values
  processedCSS = replaceCSSVars(processedCSS);

  return processedCSS;
}

function buildCSS() {
  const srcDir = path.join(__dirname, "../src/styles");
  const distDir = path.join(__dirname, "../dist/styles");

  // Ensure dist directory exists
  if (!fs.existsSync(distDir)) {
    fs.mkdirSync(distDir, { recursive: true });
  }

  // Process each CSS module
  const cssFiles = [
    "table.module.css",
    "chips.module.css",
    "actions.module.css",
    "pagination.module.css",
    "skeleton.module.css",
    "user-cell.module.css",
  ];

  cssFiles.forEach((filename) => {
    const srcPath = path.join(srcDir, filename);
    const distPath = path.join(
      distDir,
      filename.replace(".module.css", ".css")
    );

    if (fs.existsSync(srcPath)) {
      const cssContent = fs.readFileSync(srcPath, "utf8");
      const processedCSS = processCSSModule(
        cssContent,
        path.basename(filename, ".module.css")
      );

      // Write regular CSS file
      fs.writeFileSync(distPath, processedCSS);
      console.log(`✅ Generated: ${distPath}`);

      // Also generate dark mode version
      const darkCSS = processCSSModule(
        cssContent,
        path.basename(filename, ".module.css")
      );
      const darkPath = distPath.replace(".css", ".dark.css");
      fs.writeFileSync(darkPath, darkCSS);
      console.log(`✅ Generated: ${darkPath}`);
    }
  });

  // Copy tokens.css
  const tokensSrc = path.join(srcDir, "tokens.css");
  const tokensDist = path.join(distDir, "tokens.css");
  if (fs.existsSync(tokensSrc)) {
    fs.copyFileSync(tokensSrc, tokensDist);
    console.log(`✅ Copied: ${tokensDist}`);
  }

  // Create main CSS file that imports all components
  const mainCSS = `
/* table-kit - Main CSS Bundle */
@import "./table.css";
@import "./chips.css";
@import "./actions.css";
@import "./pagination.css";
@import "./skeleton.css";
@import "./user-cell.css";
@import "./tokens.css";
  `.trim();

  fs.writeFileSync(path.join(distDir, "index.css"), mainCSS);
  console.log(`✅ Generated: dist/styles/index.css`);
}

buildCSS();
