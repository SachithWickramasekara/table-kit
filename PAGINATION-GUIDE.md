# TableKit Pagination Guide

This guide explains how to implement and use pagination in the TableKit component.

## Overview

The TableKit component now supports pagination, allowing you to display large datasets in manageable chunks. The pagination feature includes:

- **Page size control**: Set how many items to show per page
- **Page navigation**: Navigate between pages with previous/next buttons and page numbers
- **Smart ellipsis**: Shows "..." when there are many pages
- **Responsive design**: Works well on mobile and desktop
- **Accessibility**: Proper ARIA labels and keyboard navigation

## Basic Usage

### Simple Pagination

```tsx
import { TableKit } from "table-kit";
import { useState } from "react";

function MyComponent() {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  return (
    <TableKit
      pageSize={pageSize}
      currentPage={currentPage}
      onPageChange={setCurrentPage}
    />
  );
}
```

### With Custom Data

```tsx
import { TableKit } from "table-kit";
import { useState } from "react";

function MyComponent() {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);

  const myData = [
    { id: "1", name: "John Doe", email: "john@example.com" },
    { id: "2", name: "Jane Smith", email: "jane@example.com" },
    // ... more data
  ];

  return (
    <TableKit
      data={myData}
      pageSize={pageSize}
      currentPage={currentPage}
      onPageChange={setCurrentPage}
      title="My Users"
    />
  );
}
```

## API Reference

### Pagination Props

| Prop             | Type                     | Default                     | Description                                               |
| ---------------- | ------------------------ | --------------------------- | --------------------------------------------------------- |
| `pageSize`       | `number`                 | `10`                        | Number of items to show per page                          |
| `currentPage`    | `number`                 | `1`                         | Current page number (1-based)                             |
| `onPageChange`   | `(page: number) => void` | -                           | Callback when page changes                                |
| `totalItems`     | `number`                 | `data.length`               | Total number of items (useful for server-side pagination) |
| `showPagination` | `boolean`                | `true` if `pageSize` is set | Whether to show pagination controls                       |

### Advanced Usage

#### Server-Side Pagination

```tsx
import { TableKit } from "table-kit";
import { useState, useEffect } from "react";

function MyComponent() {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [data, setData] = useState([]);
  const [totalItems, setTotalItems] = useState(0);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          `/api/users?page=${currentPage}&pageSize=${pageSize}`
        );
        const result = await response.json();
        setData(result.data);
        setTotalItems(result.total);
      } catch (error) {
        console.error("Failed to fetch data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [currentPage, pageSize]);

  return (
    <TableKit
      data={data}
      pageSize={pageSize}
      currentPage={currentPage}
      onPageChange={setCurrentPage}
      totalItems={totalItems}
      loading={loading}
      title="Users"
    />
  );
}
```

#### Page Size Selector

```tsx
import { TableKit } from "table-kit";
import { useState } from "react";

function MyComponent() {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const handlePageSizeChange = (newPageSize: number) => {
    setPageSize(newPageSize);
    setCurrentPage(1); // Reset to first page
  };

  return (
    <div>
      <div style={{ marginBottom: "1rem" }}>
        <label>
          Items per page:
          <select
            value={pageSize}
            onChange={(e) => handlePageSizeChange(Number(e.target.value))}
          >
            <option value={5}>5</option>
            <option value={10}>10</option>
            <option value={20}>20</option>
            <option value={50}>50</option>
          </select>
        </label>
      </div>

      <TableKit
        pageSize={pageSize}
        currentPage={currentPage}
        onPageChange={setCurrentPage}
      />
    </div>
  );
}
```

#### Combined with Selection

```tsx
import { TableKit } from "table-kit";
import { useState } from "react";

function MyComponent() {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [selectedRows, setSelectedRows] = useState([]);

  return (
    <TableKit
      pageSize={pageSize}
      currentPage={currentPage}
      onPageChange={setCurrentPage}
      selectable
      selectedRows={selectedRows}
      onSelectionChange={setSelectedRows}
      title="Selectable Users"
    />
  );
}
```

## Pagination Component

The pagination component is also available as a standalone component:

```tsx
import { Pagination } from "table-kit";

function MyComponent() {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = 10;

  return (
    <Pagination
      currentPage={currentPage}
      totalPages={totalPages}
      onPageChange={setCurrentPage}
    />
  );
}
```

### Pagination Component Props

| Prop           | Type                     | Required | Description                |
| -------------- | ------------------------ | -------- | -------------------------- |
| `currentPage`  | `number`                 | Yes      | Current page number        |
| `totalPages`   | `number`                 | Yes      | Total number of pages      |
| `onPageChange` | `(page: number) => void` | Yes      | Callback when page changes |
| `className`    | `string`                 | No       | Additional CSS class       |

## Styling

The pagination component uses CSS custom properties that can be customized:

```css
:root {
  --tk-spacing-xs: 0.25rem;
  --tk-spacing-md: 1rem;
  --tk-border: #e5e7eb;
  --tk-border-strong: #d1d5db;
  --tk-text-primary: #111827;
  --tk-text-muted: #6b7280;
  --tk-accent-blue: #3b82f6;
  --tk-bg-hover: #f9fafb;
  --tk-radius-md: 0.375rem;
}
```

## Behavior Notes

1. **Page numbering**: Pages are 1-based (first page is 1, not 0)
2. **Automatic hiding**: Pagination is hidden when there's only one page
3. **Selection**: Row selection works per-page (only selects visible rows)
4. **Loading state**: Pagination is disabled during loading
5. **Responsive**: Pagination adapts to smaller screens

## Examples

See the demo page for interactive examples:

- Basic pagination with dummy data
- Pagination with custom data
- Page size selection
- Server-side pagination simulation

## File Structure

The pagination feature is implemented in these files:

```
src/
├── components/
│   ├── Pagination.tsx          # Pagination component
│   └── dynamic-table.tsx       # Updated TableKit with pagination
├── styles/
│   ├── pagination.module.css   # Pagination styles
│   └── pagination.module.css.d.ts # TypeScript declarations
├── utils/
│   └── types.ts               # Updated types with pagination props
└── App.tsx                    # Demo with pagination examples
```

## Migration Guide

If you're upgrading from a previous version:

1. **No breaking changes**: Existing code will continue to work
2. **Optional feature**: Pagination only activates when `pageSize` is provided
3. **Backward compatible**: All existing props and functionality remain the same

## Troubleshooting

### Common Issues

1. **Pagination not showing**: Make sure `pageSize` is set and `onPageChange` is provided
2. **Wrong page count**: Check that `totalItems` is set correctly for server-side pagination
3. **Selection issues**: Remember that selection only affects visible rows on the current page

### Performance Tips

1. **Large datasets**: Use server-side pagination for datasets with thousands of items
2. **Page size**: Choose appropriate page sizes (10-50 items is usually optimal)
3. **Memoization**: Consider memoizing your data and callbacks for better performance
