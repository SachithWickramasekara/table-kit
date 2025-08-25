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
