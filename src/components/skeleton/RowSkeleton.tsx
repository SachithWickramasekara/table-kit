import { ReactNode } from "react";

export interface RowSkeletonProps {
  columns: number;
  showUserCell?: boolean;
  showChips?: boolean;
  className?: string;
}

export function RowSkeleton({
  columns,
  showUserCell = false,
  showChips = false,
  className = "",
}: RowSkeletonProps): ReactNode {
  const rowClass = `table-kit-skeleton-row ${className}`.trim();

  const renderSkeletonCell = (index: number) => {
    // First column as user cell
    if (index === 0 && showUserCell) {
      return (
        <td key={index} className="table-kit-skeleton-cell">
          <div className="table-kit-skeleton-user">
            <div className="table-kit-skeleton-avatar" />
            <div className="table-kit-skeleton-user-content">
              <div className="table-kit-skeleton-content table-kit-skeleton-user-name" />
              <div className="table-kit-skeleton-content table-kit-skeleton-user-email" />
            </div>
          </div>
        </td>
      );
    }

    // Second column as chips if specified
    if (index === 1 && showChips) {
      return (
        <td key={index} className="table-kit-skeleton-cell">
          <div className="table-kit-skeleton-chips">
            <div className="table-kit-skeleton-content table-kit-skeleton-chip" />
            <div className="table-kit-skeleton-content table-kit-skeleton-chip" />
            <div className="table-kit-skeleton-content table-kit-skeleton-chip" />
          </div>
        </td>
      );
    }

    // Last column as actions
    if (index === columns - 1) {
      return (
        <td key={index} className="table-kit-skeleton-cell">
          <div className="table-kit-skeleton-actions">
            <div className="table-kit-skeleton-content table-kit-skeleton-action" />
            <div className="table-kit-skeleton-content table-kit-skeleton-action" />
          </div>
        </td>
      );
    }

    // Regular content cell
    return (
      <td key={index} className="table-kit-skeleton-cell">
        <div className="table-kit-skeleton-content" />
      </td>
    );
  };

  return (
    <tr className={rowClass}>
      {Array.from({ length: columns }, (_, index) => renderSkeletonCell(index))}
    </tr>
  );
}

export interface TableSkeletonProps {
  rows?: number;
  columns?: number;
  showUserCell?: boolean;
  showChips?: boolean;
  className?: string;
}

export function TableSkeleton({
  rows = 5,
  columns = 4,
  showUserCell = true,
  showChips = true,
  className = "",
}: TableSkeletonProps): ReactNode {
  return (
    <div className={`table-kit-skeleton ${className}`}>
      <table className="table-kit-skeleton-table">
        <thead className="table-kit-skeleton-thead">
          <tr className="table-kit-skeleton-header-row">
            {Array.from({ length: columns }, (_, index) => (
              <th key={index} className="table-kit-skeleton-th">
                <div className="table-kit-skeleton-content" />
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="table-kit-skeleton-tbody">
          {Array.from({ length: rows }, (_, rowIndex) => (
            <RowSkeleton
              key={rowIndex}
              columns={columns}
              showUserCell={showUserCell}
              showChips={showChips}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
}
