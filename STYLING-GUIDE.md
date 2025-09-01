# TableKit Styling Guide

## Important: CSS Styles Are Automatically Included

TableKit now **automatically includes its CSS styles** when you import the component. You don't need to manually import any CSS files.

```tsx
import { TableKit } from "@sachithw/table-kit";

// That's it! Styles are automatically included
function App() {
  return <TableKit />;
}
```

## How It Works

When you import TableKit, the component automatically includes all necessary CSS styles:

- ✅ Table structure and layout
- ✅ Typography and spacing
- ✅ User avatars and chips
- ✅ Hover effects and interactions
- ✅ Pagination controls
- ✅ Loading skeletons
- ✅ Dark mode support (automatic)

## Troubleshooting Styles

If you're seeing unstyled tables (plain HTML table without colors/borders), try these solutions:

### 1. Clear Cache and Reinstall

```bash
# Clear npm cache
npm cache clean --force

# Remove node_modules and package-lock.json
rm -rf node_modules package-lock.json

# Reinstall
npm install
```

### 2. Restart Development Server

```bash
# Stop your dev server (Ctrl+C)
# Then restart it
npm run dev
# or
yarn dev
```

### 3. Check Bundle Configuration

If you're using a custom bundler configuration, ensure CSS imports are enabled:

**Vite** (recommended): CSS imports work out of the box
**Webpack**: Ensure `css-loader` is configured
**Next.js**: CSS imports work out of the box with App Router

### 4. Manual CSS Import (Fallback)

If automatic styles don't work, you can manually import:

```tsx
import { TableKit } from "@sachithw/table-kit";
// Manual import as fallback
import "@sachithw/table-kit/dist/table-kit.css";

function App() {
  return <TableKit />;
}
```

## CSS Architecture

TableKit uses a unique CSS class naming system to avoid conflicts:

- All classes are prefixed with `table-kit-`
- Example: `.table-kit-tableContainer`, `.table-kit-userCell`
- Styles use CSS custom properties for theming
- Dark mode is supported via `prefers-color-scheme`

## Customization

You can override TableKit styles using CSS custom properties:

```css
:root {
  --tk-accent-blue: #your-brand-color;
  --tk-bg: #your-background;
  --tk-border: #your-border-color;
}
```

## Framework Compatibility

TableKit styles work with all major React frameworks:

- ✅ Vite + React
- ✅ Next.js (App Router)
- ✅ Next.js (Pages Router)
- ✅ Create React App
- ✅ Remix
- ✅ Custom Webpack setups

## Version Notes

**v0.1.13+**: Automatic CSS inclusion (recommended)
**v0.1.12 and below**: Manual CSS import required
