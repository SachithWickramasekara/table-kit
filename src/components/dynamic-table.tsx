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

  const containerClass = `${styles.tableContainer} ${className} ${
    loading ? styles.loading : ""
  }`.trim();

  const renderTableContent = () => {
    // Loading state
    if (loading) {
      return (
        <TableSkeleton
          rows={5}
          columns={effectiveColumns.length + 1} // +1 for actions
          showUserCell={!columns && isUsingDummyData}
          showChips={!columns && isUsingDummyData}
        />
      );
    }

    // Empty state
    if (effectiveData.length === 0) {
      return (
        <tr>
          <td colSpan={effectiveColumns.length + 1}>
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
    return effectiveData.map((row, index) => {
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
          <td className={`${styles.td} ${styles.actionsCell}`}>
            <Actions actions={effectiveActions} row={row} />
          </td>
        </RowComponent>
      );
    });
  };

  return (
    <div className={containerClass}>
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
      <table className={styles.table}>
        <thead className={styles.thead}>
          <tr>
            {effectiveColumns.map((column) => (
              <th key={column.id || column.accessorKey} className={styles.th}>
                {column.header}
              </th>
            ))}
            <th className={styles.th}>Actions</th>
          </tr>
        </thead>
        <tbody className={styles.tbody}>{renderTableContent()}</tbody>
      </table>
    </div>
  );
}
