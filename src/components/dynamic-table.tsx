import { ReactNode, useMemo, useState, useEffect } from "react";
import { TableKitProps, Column, UserRow } from "../utils/types";
import {
  DEFAULT_DUMMY_DATA,
  GENERIC_DUMMY_DATA,
  GENERIC_DUMMY_COLUMNS,
} from "../defaults";
import { UserCell } from "./cells/UserCell";
import { AccessChips } from "./cells/AccessChips";
import { TableSkeleton } from "./skeleton/RowSkeleton";
import { Pagination } from "./pagination";
import styles from "../styles/table.module.css";

type MotionComponent = React.ComponentType<
  React.HTMLAttributes<HTMLTableRowElement> & {
    initial?: Record<string, unknown>;
    animate?: Record<string, unknown>;
    transition?: Record<string, unknown>;
  }
>;

let motion: { tr?: MotionComponent } | null = null;
try {
  const windowWithRequire = window as typeof window & {
    require?: (module: string) => unknown;
  };
  const framerMotion = windowWithRequire?.require?.("framer-motion");
  if (framerMotion) {
    motion = framerMotion as { tr?: MotionComponent };
  }
} catch {
  console.error("Framer Motion not available");
}

export function TableKit<T = UserRow>({
  data,
  columns,
  getRowId = (row: T) => (row as Record<string, unknown>).id as string,
  selectable = false,
  selectedRows = [],
  onSelectionChange,
  onSelectAll,
  pageSize,
  currentPage = 1,
  onPageChange,
  totalItems,
  showPagination,
  title,
  renderHeaderLeft,
  renderHeaderRight,
  renderHeaderExtras,
  loading = false,
  emptyState,
  className = "",
  theme,
}: TableKitProps<T>): ReactNode {
  const [animationEnabled, setAnimationEnabled] = useState(true);

  // Check for reduced motion preference
  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setAnimationEnabled(!mediaQuery.matches);

    const handleChange = (e: MediaQueryListEvent) => {
      setAnimationEnabled(!e.matches);
    };

    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  // Determine if we're using dummy data
  const isUsingDummyData = !data;

  // Get effective data and columns
  const effectiveData = useMemo(() => {
    if (data) return data;

    // If no data provided, check if we have columns to determine dummy type
    if (columns) {
      // Custom columns provided, use generic dummy data
      return GENERIC_DUMMY_DATA as T[];
    }

    // No data or columns, use UserRow dummy data
    return DEFAULT_DUMMY_DATA as T[];
  }, [data, columns]);

  // Pagination logic
  const effectiveTotalItems = totalItems ?? effectiveData.length;
  const effectivePageSize = pageSize ?? 10;
  const totalPages = Math.ceil(effectiveTotalItems / effectivePageSize);
  const shouldShowPagination = showPagination ?? pageSize !== undefined;

  // Get paginated data
  const paginatedData = useMemo(() => {
    if (!shouldShowPagination || !pageSize) {
      return effectiveData;
    }

    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    return effectiveData.slice(startIndex, endIndex);
  }, [effectiveData, shouldShowPagination, pageSize, currentPage]);

  const effectiveColumns = useMemo(() => {
    if (columns) return columns;

    // No columns provided, create default columns based on data type
    if (isUsingDummyData) {
      // Create UserRow-specific columns with custom cells
      return [
        {
          id: "user",
          header: "User name",
          accessorKey: "name" as keyof T,
          cell: (_, row: T) => <UserCell user={row as UserRow} />,
        },
        {
          id: "access",
          header: "Access",
          accessorKey: "access" as keyof T,
          cell: (value: unknown) => <AccessChips access={value as string[]} />,
        },
        {
          id: "lastActive",
          header: "Last active",
          accessorKey: "lastActive" as keyof T,
        },
        {
          id: "dateAdded",
          header: "Date added",
          accessorKey: "dateAdded" as keyof T,
        },
      ] as Column<T>[];
    }

    return GENERIC_DUMMY_COLUMNS as Column<T>[];
  }, [columns, isUsingDummyData]);

  // Get effective title
  const effectiveTitle = useMemo(() => {
    if (title) return title;

    if (isUsingDummyData && !columns) {
      return `All users ${effectiveData.length}`;
    }

    return `All items ${effectiveData.length}`;
  }, [title, isUsingDummyData, columns, effectiveData.length]);

  // Determine table layout based on column count
  const totalColumns = effectiveColumns.length + (selectable ? 1 : 0);
  const shouldUseHorizontalScroll = totalColumns >= 15;

  const tableStyle = shouldUseHorizontalScroll
    ? {
        minWidth: `${totalColumns * 150}px`, // Minimum 150px per column for wide tables
      }
    : {};

  // Render cell content
  const renderCellContent = (column: Column<T>, row: T, value: unknown) => {
    if (column.cell) {
      return column.cell(value, row);
    }

    // Default rendering
    if (value === null || value === undefined) {
      return "—";
    }

    if (Array.isArray(value)) {
      return value.join(", ");
    }

    return String(value);
  };

  // Get row component (with or without animation)
  const RowComponent = motion?.tr || "tr";

  // Apply theme styles
  const getThemeStyles = () => {
    if (!theme) return {};

    const styles: Record<string, string> = {};

    if (theme.colors) {
      if (theme.colors.background) styles["--tk-bg"] = theme.colors.background;
      if (theme.colors.backgroundSubtle)
        styles["--tk-bg-subtle"] = theme.colors.backgroundSubtle;
      if (theme.colors.backgroundHover)
        styles["--tk-bg-hover"] = theme.colors.backgroundHover;
      if (theme.colors.border) styles["--tk-border"] = theme.colors.border;
      if (theme.colors.borderStrong)
        styles["--tk-border-strong"] = theme.colors.borderStrong;
      if (theme.colors.textPrimary)
        styles["--tk-text-primary"] = theme.colors.textPrimary;
      if (theme.colors.textSecondary)
        styles["--tk-text-secondary"] = theme.colors.textSecondary;
      if (theme.colors.textMuted)
        styles["--tk-text-muted"] = theme.colors.textMuted;
      if (theme.colors.accentBlue)
        styles["--tk-accent-blue"] = theme.colors.accentBlue;
      if (theme.colors.accentGreen)
        styles["--tk-accent-green"] = theme.colors.accentGreen;
      if (theme.colors.accentRed)
        styles["--tk-accent-red"] = theme.colors.accentRed;
    }

    if (theme.spacing) {
      if (theme.spacing.xs) styles["--tk-spacing-xs"] = theme.spacing.xs;
      if (theme.spacing.sm) styles["--tk-spacing-sm"] = theme.spacing.sm;
      if (theme.spacing.md) styles["--tk-spacing-md"] = theme.spacing.md;
      if (theme.spacing.lg) styles["--tk-spacing-lg"] = theme.spacing.lg;
      if (theme.spacing.xl) styles["--tk-spacing-xl"] = theme.spacing.xl;
    }

    if (theme.radius) {
      if (theme.radius.sm) styles["--tk-radius-sm"] = theme.radius.sm;
      if (theme.radius.md) styles["--tk-radius-md"] = theme.radius.md;
      if (theme.radius.lg) styles["--tk-radius-lg"] = theme.radius.lg;
    }

    return styles;
  };

  // Selection helper functions
  const handleRowSelection = (rowId: string, isSelected: boolean) => {
    if (!onSelectionChange) return;

    let newSelection = [...selectedRows];
    if (isSelected) {
      if (!newSelection.includes(rowId)) {
        newSelection.push(rowId);
      }
    } else {
      newSelection = newSelection.filter((id) => id !== rowId);
    }
    onSelectionChange(newSelection);
  };

  const handleSelectAll = (isSelected: boolean) => {
    if (!onSelectionChange) return;

    if (isSelected) {
      const allRowIds = paginatedData.map((row) => getRowId(row));
      onSelectionChange(allRowIds);
    } else {
      onSelectionChange([]);
    }

    if (onSelectAll) {
      onSelectAll(isSelected);
    }
  };

  const isRowSelected = (rowId: string) => selectedRows.includes(rowId);
  const isAllSelected =
    paginatedData.length > 0 && selectedRows.length === paginatedData.length;
  const isIndeterminate =
    selectedRows.length > 0 && selectedRows.length < paginatedData.length;

  const containerClass = `${styles.tableContainer} ${className} ${
    loading ? styles.loading : ""
  }`.trim();

  const renderTableContent = () => {
    // Loading state
    if (loading) {
      return (
        <TableSkeleton
          rows={5}
          columns={effectiveColumns.length + (selectable ? 1 : 0)}
          showUserCell={!columns && isUsingDummyData}
          showChips={!columns && isUsingDummyData}
        />
      );
    }

    // Empty state
    if (effectiveData.length === 0) {
      return (
        <tr>
          <td colSpan={effectiveColumns.length + (selectable ? 1 : 0)}>
            <div className={styles.emptyState}>
              {emptyState || (
                <>
                  <div className={styles.emptyStateIcon}>📄</div>
                  <p className={styles.emptyStateText}>No data found</p>
                </>
              )}
            </div>
          </td>
        </tr>
      );
    }

    // Data rows
    return paginatedData.map((row, index) => {
      const rowId = getRowId(row);
      const animationProps =
        motion && animationEnabled
          ? {
              initial: { opacity: 0, y: 8 },
              animate: { opacity: 1, y: 0 },
              transition: { duration: 0.2, delay: index * 0.05 },
            }
          : {};

      return (
        <RowComponent key={rowId} className={styles.tr} {...animationProps}>
          {selectable && (
            <td className={`${styles.td} ${styles.checkboxCell}`}>
              <input
                type="checkbox"
                checked={isRowSelected(rowId)}
                onChange={(e) => handleRowSelection(rowId, e.target.checked)}
                aria-label={`Select row ${index + 1}`}
              />
            </td>
          )}
          {effectiveColumns.map((column) => {
            const value = column.accessorKey
              ? row[column.accessorKey]
              : undefined;
            return (
              <td key={column.id || column.accessorKey} className={styles.td}>
                {renderCellContent(column, row, value)}
              </td>
            );
          })}
        </RowComponent>
      );
    });
  };

  return (
    <div className={containerClass} style={getThemeStyles()}>
      {/* Header */}
      <div className={styles.header}>
        <div className={styles.headerLeft}>
          <h2 className={styles.title}>{effectiveTitle}</h2>
          {renderHeaderLeft && renderHeaderLeft()}
        </div>
        <div className={styles.headerRight}>
          {renderHeaderRight && renderHeaderRight()}
        </div>
        {renderHeaderExtras && (
          <div className={styles.headerExtras}>{renderHeaderExtras()}</div>
        )}
      </div>

      {/* Table */}
      <div className={styles.tableWrapper}>
        <table className={styles.table} style={tableStyle}>
          <thead className={styles.thead}>
            <tr className={styles.headerRow}>
              {selectable && (
                <th className={`${styles.th} ${styles.checkboxColumn}`}>
                  <input
                    type="checkbox"
                    checked={isAllSelected}
                    ref={(el) => {
                      if (el) el.indeterminate = isIndeterminate;
                    }}
                    onChange={(e) => handleSelectAll(e.target.checked)}
                    aria-label="Select all rows"
                  />
                </th>
              )}
              {effectiveColumns.map((column) => {
                return (
                  <th
                    key={column.id || column.accessorKey}
                    className={styles.th}
                  >
                    {column.header}
                  </th>
                );
              })}
            </tr>
          </thead>
          <tbody className={styles.tbody}>{renderTableContent()}</tbody>
        </table>
      </div>

      {/* Pagination */}
      {shouldShowPagination && onPageChange && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={onPageChange}
        />
      )}
    </div>
  );
}

// Re-export types for consumers
export type { TableKitProps } from "../utils/types";
