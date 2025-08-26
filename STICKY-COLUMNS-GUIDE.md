# TableKit Sticky Columns Guide

This guide explains how to implement and use sticky columns in the TableKit component for better UX with wide tables.

## Overview

The TableKit component now supports sticky columns, allowing you to keep important columns visible while users scroll horizontally through wide tables. This is especially useful for tables with many columns where you want to maintain access to key actions and critical data.

## Key Features

- **Fixed Actions Column**: Keep the actions column always visible on the right
- **Configurable Sticky Columns**: Make any number of columns sticky from the right
- **Smart Positioning**: Automatic calculation of sticky column positions
- **Visual Feedback**: Shadow effects to indicate sticky boundaries
- **Responsive Design**: Works on all screen sizes
- **Performance Optimized**: Efficient CSS-based implementation

## Basic Usage

### Default Sticky Actions

```tsx
import { TableKit } from "table-kit";

function MyComponent() {
  return (
    <TableKit
      data={myData}
      columns={myColumns}
      stickyActions={true} // Default: true
    />
  );
}
```

### Sticky Actions + Last Data Column

```tsx
import { TableKit } from "table-kit";

function MyComponent() {
  return (
    <TableKit
      data={myData}
      columns={myColumns}
      stickyActions={true}
      stickyLastColumn={true} // Make last data column sticky too
    />
  );
}
```

### Multiple Sticky Columns

```tsx
import { TableKit } from "table-kit";

function MyComponent() {
  return (
    <TableKit
      data={myData}
      columns={myColumns}
      stickyActions={true}
      stickyColumns={3} // Make last 3 data columns sticky
    />
  );
}
```

## API Reference

### Sticky Column Props

| Prop               | Type      | Default | Description                                     |
| ------------------ | --------- | ------- | ----------------------------------------------- |
| `stickyActions`    | `boolean` | `true`  | Make actions column sticky                      |
| `stickyLastColumn` | `boolean` | `false` | Make last data column sticky                    |
| `stickyColumns`    | `number`  | `1`     | Number of columns to make sticky from the right |

### Column-Level Sticky Control

You can also control sticky behavior at the column level:

```tsx
const columns = [
  {
    id: "name",
    header: "Name",
    accessorKey: "name",
    sticky: true, // Make this column sticky
    stickyPosition: "left", // or "right"
  },
  // ... other columns
];
```

## Advanced Examples

### Employee Directory with Many Columns

```tsx
import { TableKit } from "table-kit";

function EmployeeDirectory() {
  const columns = [
    {
      id: "name",
      header: "Name",
      accessorKey: "name",
      cell: (_, row) => (
        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
          <img
            src={row.avatarUrl}
            alt={row.name}
            style={{ width: "2rem", height: "2rem", borderRadius: "50%" }}
          />
          <div>
            <div style={{ fontWeight: "500" }}>{row.name}</div>
            <div style={{ fontSize: "0.75rem", color: "#6b7280" }}>
              {row.email}
            </div>
          </div>
        </div>
      ),
    },
    { id: "department", header: "Department", accessorKey: "department" },
    { id: "role", header: "Role", accessorKey: "role" },
    { id: "location", header: "Location", accessorKey: "location" },
    { id: "salary", header: "Salary", accessorKey: "salary" },
    { id: "startDate", header: "Start Date", accessorKey: "startDate" },
    { id: "manager", header: "Manager", accessorKey: "manager" },
    { id: "projects", header: "Projects", accessorKey: "projects" },
    { id: "skills", header: "Skills", accessorKey: "skills" },
    { id: "performance", header: "Performance", accessorKey: "performance" },
    { id: "lastReview", header: "Last Review", accessorKey: "lastReview" },
    { id: "nextReview", header: "Next Review", accessorKey: "nextReview" },
    {
      id: "vacationDays",
      header: "Vacation Days",
      accessorKey: "vacationDays",
    },
    { id: "sickDays", header: "Sick Days", accessorKey: "sickDays" },
    { id: "remoteDays", header: "Remote Days", accessorKey: "remoteDays" },
    { id: "officeDays", header: "Office Days", accessorKey: "officeDays" },
    {
      id: "access",
      header: "Access",
      accessorKey: "access",
      cell: (value) => <AccessChips access={value as string[]} />,
    },
  ];

  return (
    <TableKit
      data={employees}
      columns={columns}
      stickyActions={true}
      stickyLastColumn={true}
      title="Employee Directory"
      onEdit={(employee) => handleEdit(employee)}
      onDelete={(employee) => handleDelete(employee)}
    />
  );
}
```

### E-commerce Product Table

```tsx
import { TableKit } from "table-kit";

function ProductTable() {
  const columns = [
    { id: "image", header: "Image", accessorKey: "imageUrl", width: "80px" },
    { id: "name", header: "Product Name", accessorKey: "name" },
    { id: "sku", header: "SKU", accessorKey: "sku" },
    { id: "category", header: "Category", accessorKey: "category" },
    { id: "brand", header: "Brand", accessorKey: "brand" },
    { id: "price", header: "Price", accessorKey: "price" },
    { id: "cost", header: "Cost", accessorKey: "cost" },
    { id: "margin", header: "Margin", accessorKey: "margin" },
    { id: "inventory", header: "Inventory", accessorKey: "inventory" },
    { id: "supplier", header: "Supplier", accessorKey: "supplier" },
    { id: "created", header: "Created", accessorKey: "createdAt" },
    { id: "updated", header: "Updated", accessorKey: "updatedAt" },
    { id: "status", header: "Status", accessorKey: "status" },
  ];

  return (
    <TableKit
      data={products}
      columns={columns}
      stickyActions={true}
      stickyColumns={2} // Keep status and updated columns visible
      title="Product Inventory"
    />
  );
}
```

## Styling and Customization

### CSS Custom Properties

The sticky columns use CSS custom properties that can be customized:

```css
:root {
  --tk-bg: #ffffff;
  --tk-bg-hover: #f9fafb;
  --tk-bg-subtle: #f3f4f6;
  --tk-border: #e5e7eb;
  --tk-shadow-sm: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
}
```

### Custom Sticky Styles

You can override sticky column styles:

```css
/* Custom sticky column styling */
.th.stickyRight,
.td.stickyRight {
  background: #f8fafc !important;
  border-left: 2px solid #3b82f6;
}

/* Custom shadow for sticky columns */
.th.stickyRight,
.td.stickyRight {
  box-shadow: -4px 0 8px rgba(0, 0, 0, 0.15) !important;
}
```

## Behavior and Interactions

### Sticky Column Positioning

1. **Actions Column**: Always positioned at `right: 0` when sticky
2. **Last Data Column**: Positioned at `right: 8rem` (actions column width)
3. **Additional Sticky Columns**: Positioned incrementally to the left
4. **Z-index Layering**: Higher z-index for columns closer to the right edge

### Scroll Behavior

- **Horizontal Scroll**: Only the non-sticky columns scroll
- **Sticky Columns**: Remain fixed in position during scroll
- **Shadow Effects**: Provide visual feedback for sticky boundaries
- **Hover States**: Maintained on sticky columns during scroll

### Responsive Behavior

- **Mobile**: Sticky columns work on mobile devices
- **Tablet**: Optimized for tablet viewing
- **Desktop**: Full functionality with smooth scrolling

## Performance Considerations

### Best Practices

1. **Limit Sticky Columns**: Don't make too many columns sticky (max 3-4 recommended)
2. **Column Widths**: Set appropriate widths for sticky columns
3. **Data Volume**: Sticky columns work well with large datasets
4. **Browser Support**: Uses modern CSS `position: sticky`

### Performance Tips

- **Efficient Rendering**: Sticky columns don't impact performance significantly
- **Memory Usage**: Minimal additional memory overhead
- **Scroll Performance**: Smooth scrolling maintained with sticky columns
- **CSS Optimization**: Uses hardware-accelerated CSS properties

## Troubleshooting

### Common Issues

1. **Sticky Columns Not Working**

   - Ensure the table has a scrollable container
   - Check that `stickyActions` or `stickyColumns` is set
   - Verify CSS is properly loaded

2. **Overlapping Columns**

   - Check column widths are appropriate
   - Ensure sticky column count doesn't exceed available space
   - Verify z-index values are correct

3. **Scroll Issues**
   - Ensure table wrapper has `overflow-x: auto`
   - Check for conflicting CSS that might disable scrolling
   - Verify table has sufficient width to trigger horizontal scroll

### Debug Tips

```tsx
// Debug sticky column behavior
<TableKit
  data={data}
  columns={columns}
  stickyActions={true}
  stickyColumns={2}
  onPageChange={(page) => console.log("Page:", page)}
  // Add console logs to debug sticky behavior
/>
```

## Examples

See the demo page for interactive examples:

- **Basic sticky columns** with actions
- **Multiple sticky columns** with custom configuration
- **Wide table demo** with 15+ columns
- **Responsive behavior** on different screen sizes

## File Structure

The sticky columns feature is implemented in these files:

```
src/
├── components/
│   └── dynamic-table.tsx       # Updated with sticky logic
├── styles/
│   ├── table.module.css        # Sticky column styles
│   └── table.module.css.d.ts   # Updated TypeScript declarations
├── utils/
│   └── types.ts               # Updated types with sticky props
└── App.tsx                    # Demo with sticky column examples
```

## Migration Guide

If you're upgrading from a previous version:

1. **No breaking changes**: Existing code will continue to work
2. **Optional feature**: Sticky columns only activate when configured
3. **Backward compatible**: All existing props and functionality remain the same
4. **Progressive enhancement**: Can be added to existing tables without changes

## Browser Support

- **Modern Browsers**: Full support for `position: sticky`
- **Fallback**: Graceful degradation for older browsers
- **Mobile**: Works on iOS Safari, Chrome Mobile, etc.
- **Accessibility**: Maintains keyboard navigation and screen reader support
