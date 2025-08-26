import { ReactNode, useMemo, useState, useEffect } from "react";
import { TableKitProps, Column, TableAction, UserRow } from "../utils/types";
import {
  DEFAULT_DUMMY_DATA,
  GENERIC_DUMMY_DATA,
  GENERIC_DUMMY_COLUMNS,
} from "../defaults";
import { UserCell } from "./cells/UserCell";
import { AccessChips } from "./cells/AccessChips";
import { Actions } from "./cells/Actions";
import { TableSkeleton } from "./skeleton/RowSkeleton";
import { Pagination } from "./pagination";
import styles from "../styles/table.module.css";

// Type for motion components
type MotionComponent = React.ComponentType<
  React.HTMLAttributes<HTMLTableRowElement> & {
    initial?: Record<string, unknown>;
    animate?: Record<string, unknown>;
    transition?: Record<string, unknown>;
  }
>;

// Check if framer-motion is available
let motion: { tr?: MotionComponent } | null = null;
try {
  // Dynamic import for framer-motion (optional peer dependency)
  const windowWithRequire = window as typeof window & {
    require?: (module: string) => unknown;
  };
  const framerMotion = windowWithRequire?.require?.("framer-motion");
  if (framerMotion) {
    motion = framerMotion as { tr?: MotionComponent };
  }
} catch {
  // framer-motion not available, use CSS animations
}

export function TableKit<T = UserRow>({
  data,
  columns,
  getRowId = (row: T) => (row as Record<string, unknown>).id as string,
  selectable = false,
  selectedRows = [],
  onSelectionChange,
  selectAll = false,
  onSelectAll,
  pageSize,
  currentPage = 1,
  onPageChange,
  totalItems,
  showPagination,
  actions,
  overrideActions,
  hideDefaultActions,
  onEdit,
  onView,
  onDelete,
  title,
  renderHeaderLeft,
  renderHeaderRight,
  renderHeaderExtras,
  loading = false,
  emptyState,
  className = "",
  theme,
  stickyActions = true,
  stickyLastColumn = false,
  stickyColumns = 1,
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

  // Get effective actions
  const effectiveActions = useMemo(() => {
    if (overrideActions) return overrideActions;

    const defaultActions: TableAction<T>[] = [
      {
        id: "view",
        label: "View",
        icon: "",
        onClick:
          onView || ((row) => console.log("View action triggered for:", row)),
      },
      {
        id: "edit",
        label: "Edit",
        icon: "",
        onClick:
          onEdit || ((row) => console.log("Edit action triggered for:", row)),
      },
      {
        id: "delete",
        label: "Delete",
        icon: "",
        isDanger: true,
        onClick:
          onDelete ||
          ((row) => console.log("Delete action triggered for:", row)),
      },
    ];

    // Filter out hidden default actions
    const filteredDefaultActions = defaultActions.filter(
      (action) => !hideDefaultActions?.includes(action.id)
    );

    return actions
      ? [...filteredDefaultActions, ...actions]
      : filteredDefaultActions;
  }, [actions, overrideActions, hideDefaultActions, onEdit, onView, onDelete]);

  // Sticky column logic
  const getStickyClass = (columnIndex: number, isHeader: boolean = false) => {
    const totalColumns = effectiveColumns.length;
    const hasActions = effectiveActions.length > 0;

    // If no sticky columns are enabled, return empty
    if (!stickyActions && !stickyLastColumn && stickyColumns <= 1) {
      return "";
    }

    // Actions column (always last)
    if (hasActions && columnIndex === totalColumns) {
      return stickyActions ? "stickyRight" : "";
    }

    // Last data column
    if (columnIndex === totalColumns - 1) {
      if (stickyLastColumn) return "stickyRight2";
      if (stickyColumns >= 1) return "stickyRight2";
    }

    // Second to last data column
    if (columnIndex === totalColumns - 2) {
      if (stickyColumns >= 2) return "stickyRight3";
    }

    return "";
  };

  // Get sticky styles for inline styling
  const getStickyStyles = (columnIndex: number) => {
    const stickyClass = getStickyClass(columnIndex);

    if (stickyClass === "stickyRight") {
      return {
        position: "sticky" as const,
        right: 0,
        backgroundColor: "var(--tk-bg, white)",
        zIndex: 10,
        boxShadow: "-2px 0 4px rgba(0, 0, 0, 0.1)",
      };
    }

    if (stickyClass === "stickyRight2") {
      return {
        position: "sticky" as const,
        right: "8rem",
        backgroundColor: "var(--tk-bg, white)",
        zIndex: 9,
        boxShadow: "-2px 0 4px rgba(0, 0, 0, 0.1)",
      };
    }

    if (stickyClass === "stickyRight3") {
      return {
        position: "sticky" as const,
        right: "calc(8rem + 8rem)",
        backgroundColor: "var(--tk-bg, white)",
        zIndex: 8,
        boxShadow: "-2px 0 4px rgba(0, 0, 0, 0.1)",
      };
    }

    return {};
  };

  // Debug sticky columns
  console.log("Sticky columns debug:", {
    totalColumns: effectiveColumns.length,
    stickyActions,
    stickyLastColumn,
    stickyColumns,
    effectiveActions: effectiveActions.length,
  });

  // Get effective title
  const effectiveTitle = useMemo(() => {
    if (title) return title;

    if (isUsingDummyData && !columns) {
      return `All users ${effectiveData.length}`;
    }

    return `All items ${effectiveData.length}`;
  }, [title, isUsingDummyData, columns, effectiveData.length]);

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
          columns={
            effectiveColumns.length +
            (selectable ? 1 : 0) +
            (effectiveActions.length > 0 ? 1 : 0)
          }
          showUserCell={!columns && isUsingDummyData}
          showChips={!columns && isUsingDummyData}
        />
      );
    }

    // Empty state
    if (effectiveData.length === 0) {
      return (
        <tr>
          <td
            colSpan={
              effectiveColumns.length +
              (selectable ? 1 : 0) +
              (effectiveActions.length > 0 ? 1 : 0)
            }
          >
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
          {effectiveColumns.map((column, columnIndex) => {
            const value = column.accessorKey
              ? row[column.accessorKey]
              : undefined;
            const stickyClass = getStickyClass(columnIndex);
            const stickyStyles = getStickyStyles(columnIndex);
            console.log(
              `Row cell ${columnIndex} (${column.header}): stickyClass = "${stickyClass}"`
            );
            return (
              <td
                key={column.id || column.accessorKey}
                className={`${styles.td} ${stickyClass}`}
                style={stickyStyles}
              >
                {renderCellContent(column, row, value)}
              </td>
            );
          })}
          {effectiveActions.length > 0 &&
            (() => {
              const stickyClass = getStickyClass(effectiveColumns.length);
              const stickyStyles = getStickyStyles(effectiveColumns.length);
              console.log(`Row actions cell: stickyClass = "${stickyClass}"`);
              return (
                <td
                  className={`${styles.td} ${styles.actionsCell} ${stickyClass}`}
                  style={stickyStyles}
                >
                  <Actions actions={effectiveActions} row={row} />
                </td>
              );
            })()}
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
        <table className={styles.table}>
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
              {effectiveColumns.map((column, index) => {
                const stickyClass = getStickyClass(index);
                const stickyStyles = getStickyStyles(index);
                console.log(
                  `Column ${index} (${column.header}): stickyClass = "${stickyClass}"`
                );
                return (
                  <th
                    key={column.id || column.accessorKey}
                    className={`${styles.th} ${stickyClass}`}
                    style={stickyStyles}
                  >
                    {column.header}
                  </th>
                );
              })}
              {effectiveActions.length > 0 &&
                (() => {
                  const stickyClass = getStickyClass(effectiveColumns.length);
                  const stickyStyles = getStickyStyles(effectiveColumns.length);
                  console.log(`Actions column: stickyClass = "${stickyClass}"`);
                  return (
                    <th
                      className={`${styles.th} ${styles.actionsHeader} ${stickyClass}`}
                      style={stickyStyles}
                    >
                      Actions
                    </th>
                  );
                })()}
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
