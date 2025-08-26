import { ReactNode } from "react";

// Core types for the table component
export type Column<T> = {
  id?: string;
  header: string | ReactNode;
  accessorKey?: keyof T & string;
  cell?: (value: unknown, row: T) => ReactNode;
  width?: number | string;
  sortable?: boolean; // not implemented yet, reserve
  sticky?: boolean; // make column sticky (fixed position)
  stickyPosition?: "left" | "right"; // position for sticky columns
};

export type TableAction<T> = {
  id: string;
  label: string;
  icon?: ReactNode;
  onClick: (row: T) => void;
  isDanger?: boolean;
  disabled?: boolean;
  show?: (row: T) => boolean; // optional predicate
  hidden?: boolean; // allows hiding default actions like view, edit, delete
};

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

  // actions
  actions?: TableAction<T>[]; // appended to defaults
  overrideActions?: TableAction<T>[]; // replace defaults entirely
  hideDefaultActions?: string[]; // hide specific default actions by id: ["view", "edit", "delete"]
  onEdit?: (row: T) => void;
  onView?: (row: T) => void;
  onDelete?: (row: T) => void;

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

  // sticky columns
  stickyActions?: boolean; // make actions column sticky (default: true)
  stickyLastColumn?: boolean; // make last data column sticky (default: false)
  stickyColumns?: number; // number of columns to make sticky from the right (default: 1 for actions)
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

// Internal types
export type DefaultAction = "view" | "edit" | "delete";

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
