# table-kit

A reusable React + TypeScript table component with zero-config dummy data and full customization. Perfect for building admin dashboards, data tables, and user interfaces that match modern design patterns.

[![npm version](https://badge.fury.io/js/table-kit.svg)](https://badge.fury.io/js/table-kit)
[![TypeScript](https://img.shields.io/badge/TypeScript-Ready-blue)](https://www.typescriptlang.org/)
[![MIT License](https://img.shields.io/badge/License-MIT-green.svg)](https://choosealicense.com/licenses/mit/)

## ✨ Features

- **Zero-config**: Works out of the box with dummy data
- **TypeScript-first**: Full type safety and IntelliSense support
- **Customizable**: Fully configurable columns, actions, and styling
- **Responsive**: Mobile-friendly design with CSS modules
- **Accessible**: ARIA labels, keyboard navigation, and focus management
- **Animated**: Smooth transitions with optional framer-motion support
- **Lightweight**: No external UI dependencies

## 🚀 Quick Start

### Installation

```bash
npm install table-kit
# or
pnpm add table-kit
# or
yarn add table-kit
```

### Zero-config Usage

The simplest way to get started:

```tsx
import { TableKit } from "table-kit";

export default function App() {
  return <TableKit />;
}
```

This renders a beautiful table with dummy user data, complete with avatars, access chips, and action buttons.

## 📖 API Reference

### Core Types

```typescript
type Column<T> = {
  id?: string;
  header: string | React.ReactNode;
  accessorKey?: keyof T & string;
  cell?: (value: unknown, row: T) => React.ReactNode;
  width?: number | string;
  sortable?: boolean; // reserved for future use
};

type TableAction<T> = {
  id: string;
  label: string;
  icon?: React.ReactNode;
  onClick: (row: T) => void;
  isDanger?: boolean;
  disabled?: boolean;
  show?: (row: T) => boolean;
};

type TableKitProps<T> = {
  // Data
  data?: T[];
  columns?: Column<T>[];
  getRowId?: (row: T) => string;

  // Actions
  actions?: TableAction<T>[];
  overrideActions?: TableAction<T>[];
  onEdit?: (row: T) => void;
  onView?: (row: T) => void;
  onDelete?: (row: T) => void;

  // Header & composition
  title?: React.ReactNode;
  renderHeaderLeft?: () => React.ReactNode;
  renderHeaderRight?: () => React.ReactNode;
  renderHeaderExtras?: () => React.ReactNode;

  // States & visuals
  loading?: boolean;
  emptyState?: React.ReactNode;
  className?: string;
};
```

### Default UserRow Interface

```typescript
type UserRow = {
  id: string;
  name: string;
  email: string;
  access: string[];
  lastActive: string | Date;
  dateAdded: string | Date;
  avatarUrl?: string;
};
```

## 🎯 Usage Examples

### 1. With API Data

```tsx
import { TableKit, Column, UserRow } from "table-kit";

const users: UserRow[] = [
  {
    id: "1",
    name: "John Doe",
    email: "john@example.com",
    access: ["Admin", "Editor"],
    lastActive: "2024-03-15",
    dateAdded: "2024-01-10",
    avatarUrl: "https://example.com/avatar.jpg",
  },
  // ... more users
];

export default function UsersTable() {
  return (
    <TableKit
      data={users}
      title="Team Members"
      onEdit={(user) => console.log("Edit", user)}
      onDelete={(user) => console.log("Delete", user)}
    />
  );
}
```

### 2. Custom Columns

```tsx
import { TableKit, Column } from "table-kit";

type Product = {
  id: string;
  name: string;
  price: number;
  category: string;
  inStock: boolean;
};

const columns: Column<Product>[] = [
  {
    id: "name",
    header: "Product Name",
    accessorKey: "name",
  },
  {
    id: "price",
    header: "Price",
    accessorKey: "price",
    cell: (value) => `$${(value as number).toFixed(2)}`,
  },
  {
    id: "category",
    header: "Category",
    accessorKey: "category",
  },
  {
    id: "status",
    header: "Status",
    accessorKey: "inStock",
    cell: (value) => (
      <span className={value ? "text-green-600" : "text-red-600"}>
        {value ? "In Stock" : "Out of Stock"}
      </span>
    ),
  },
];

export default function ProductsTable() {
  return (
    <TableKit<Product> data={products} columns={columns} title="Products" />
  );
}
```

### 3. Custom Actions

```tsx
import { TableKit, TableAction } from "table-kit";

const customActions: TableAction<UserRow>[] = [
  {
    id: "impersonate",
    label: "Impersonate",
    icon: "👤",
    onClick: (user) => {
      // Impersonate user logic
      window.location.href = `/admin/impersonate/${user.id}`;
    },
    show: (user) => user.access.includes("Admin"), // Only show for admins
  },
  {
    id: "sendEmail",
    label: "Send Email",
    icon: "✉️",
    onClick: (user) => {
      window.location.href = `mailto:${user.email}`;
    },
  },
];

export default function AdminUsersTable() {
  return (
    <TableKit
      title="All Users"
      actions={customActions} // Appends to default actions
      onEdit={(user) => openEditModal(user)}
      onDelete={(user) => confirmDelete(user)}
    />
  );
}
```

### 4. Header Slots & Composition

```tsx
import { TableKit } from "table-kit";

function SearchInput() {
  return (
    <input
      type="text"
      placeholder="Search users..."
      className="px-3 py-2 border rounded-md"
    />
  );
}

function FilterButton() {
  return <button className="px-4 py-2 border rounded-md">🔍 Filters</button>;
}

function AddUserButton() {
  return (
    <button className="px-4 py-2 bg-blue-600 text-white rounded-md">
      + Add User
    </button>
  );
}

export default function UsersWithHeader() {
  return (
    <TableKit
      title="All users 44"
      renderHeaderLeft={() => <SearchInput />}
      renderHeaderRight={() => (
        <>
          <FilterButton />
          <AddUserButton />
        </>
      )}
    />
  );
}
```

### 5. Loading & Empty States

```tsx
import { TableKit } from "table-kit";

export default function LoadingTable() {
  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetchUsers().then((data) => {
      setUsers(data);
      setLoading(false);
    });
  }, []);

  return (
    <TableKit
      data={users}
      loading={loading}
      emptyState={
        <div className="text-center py-8">
          <p>No users found</p>
          <button className="mt-2 px-4 py-2 bg-blue-600 text-white rounded">
            Invite Users
          </button>
        </div>
      }
    />
  );
}
```

### 6. Override Default Actions

```tsx
import { TableKit, TableAction } from "table-kit";

const customActionsOnly: TableAction<UserRow>[] = [
  {
    id: "invite",
    label: "Invite",
    onClick: (user) => sendInvite(user),
  },
  {
    id: "archive",
    label: "Archive",
    isDanger: true,
    onClick: (user) => archiveUser(user),
  },
];

export default function CustomActionsTable() {
  return (
    <TableKit
      overrideActions={customActionsOnly} // Replaces all default actions
    />
  );
}
```

## 🎨 Theming & Customization

### CSS Variables

table-kit uses CSS custom properties for easy theming:

```css
:root {
  /* Spacing */
  --tk-spacing-xs: 0.25rem;
  --tk-spacing-sm: 0.5rem;
  --tk-spacing-md: 0.75rem;
  --tk-spacing-lg: 1rem;
  --tk-spacing-xl: 1.5rem;

  /* Colors */
  --tk-bg: #ffffff;
  --tk-bg-hover: #f3f4f6;
  --tk-border: #e5e7eb;
  --tk-text-primary: #111827;
  --tk-text-secondary: #6b7280;

  /* Chip colors */
  --tk-chip-bg: #f3f4f6;
  --tk-chip-text: #374151;

  /* Accent colors */
  --tk-accent-blue: #3b82f6;
  --tk-accent-green: #10b981;
  --tk-accent-red: #ef4444;
}
```

### Custom Theme Example

```css
/* Custom dark theme */
.dark-theme {
  --tk-bg: #1f2937;
  --tk-bg-hover: #374151;
  --tk-border: #4b5563;
  --tk-text-primary: #f9fafb;
  --tk-text-secondary: #d1d5db;
  --tk-chip-bg: #374151;
  --tk-chip-text: #f3f4f6;
}
```

```tsx
<TableKit className="dark-theme" />
```

## 🎬 Animations

table-kit supports smooth animations with optional framer-motion integration:

### With framer-motion (recommended)

```bash
npm install framer-motion
```

```tsx
import { TableKit } from "table-kit";
// framer-motion will be automatically detected and used
```

### CSS-only animations

If framer-motion is not installed, table-kit falls back to CSS animations:

```css
@media (prefers-reduced-motion: reduce) {
  /* Animations automatically disabled for users who prefer reduced motion */
}
```

## 🧪 Testing

Basic unit tests for key functionality:

```tsx
import { render, screen } from "@testing-library/react";
import { TableKit } from "table-kit";

test("renders dummy data by default", () => {
  render(<TableKit />);
  expect(screen.getByText(/All users/)).toBeInTheDocument();
});

test("renders custom data", () => {
  const data = [{ id: "1", name: "Test User", email: "test@example.com" }];
  render(<TableKit data={data} />);
  expect(screen.getByText("Test User")).toBeInTheDocument();
});
```

## 📦 Bundle Analysis

- **ESM**: ~15KB gzipped
- **CJS**: ~16KB gzipped
- **Dependencies**: React 18+ (peer)
- **Optional**: framer-motion (peer)

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

MIT © [Sachith Wickramasekara](https://github.com/SachithWickramasekara)

## 🔗 Links

- [GitHub Repository](https://github.com/SachithWickramasekara/table-kit)
- [npm Package](https://www.npmjs.com/package/table-kit)
- [Issues & Bug Reports](https://github.com/SachithWickramasekara/table-kit/issues)
