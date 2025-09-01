import { ReactNode } from "react";

// Core types for the table component
export type Column<T> = {
  id?: string;
  header: string | ReactNode;
  accessorKey?: keyof T & string;
  cell?: (value: unknown, row: T) => ReactNode;
  width?: number | string;
  sortable?: boolean; // not implemented yet, reserve
};

// TableAction type removed - actions should now be defined as regular columns with custom cell renderers

export type TableKitProps<T> = {
  data?: T[]; // if absent, show dummy rows
  columns?: Column<T>[]; // if absent, show 3 dummy columns
  getRowId?: (row: T) => string; // default: (row as any).id

  // selection
  selectable?: boolean; // enable row selection
  selectedRows?: string[]; // array of selected row IDs
  onSelectionChange?: (selectedRowIds: string[]) => void; // callback when selection changes
  selectAll?: boolean; // show select all checkbox
  onSelectAll?: (isSelected: boolean) => void; // callback for select all

  // pagination
  pageSize?: number; // number of items per page (default: 10)
  currentPage?: number; // current page number (default: 1)
  onPageChange?: (page: number) => void; // callback when page changes
  totalItems?: number; // total number of items (if not provided, uses data.length)
  showPagination?: boolean; // whether to show pagination controls (default: true if pageSize is set)

  // Actions are now handled as regular columns with custom cell renderers
  // Example: { header: "Actions", cell: (row) => <YourActionsComponent row={row} /> }

  // header & composition
  title?: ReactNode; // e.g. "All users 44"
  renderHeaderLeft?: () => ReactNode; // e.g. Search
  renderHeaderRight?: () => ReactNode; // e.g. Filters/Add
  renderHeaderExtras?: () => ReactNode; // optional extra slot

  // states & visuals
  loading?: boolean; // skeleton shimmer
  emptyState?: ReactNode; // custom empty view
  className?: string;
  theme?: TableTheme; // custom theme colors and spacing
};

// Default row interface for docs/examples
export type UserRow = {
  id: string;
  name: string;
  email: string;
  access: string[];
  lastActive: string | Date;
  dateAdded: string | Date;
  avatarUrl?: string;
};

// DefaultAction type removed - actions are now regular columns

export type AnimationConfig = {
  enabled: boolean;
  reducedMotion: boolean;
};

// Theme configuration
export type TableTheme = {
  colors?: {
    background?: string;
    backgroundSubtle?: string;
    backgroundHover?: string;
    border?: string;
    borderStrong?: string;
    textPrimary?: string;
    textSecondary?: string;
    textMuted?: string;
    accentBlue?: string;
    accentGreen?: string;
    accentRed?: string;
  };
  spacing?: {
    xs?: string;
    sm?: string;
    md?: string;
    lg?: string;
    xl?: string;
  };
  radius?: {
    sm?: string;
    md?: string;
    lg?: string;
  };
};
