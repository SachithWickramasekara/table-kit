import { ReactNode } from "react";
import styles from "../../styles/skeleton.module.css";

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
  const rowClass = `${styles.skeletonRow} ${className}`.trim();

  const renderSkeletonCell = (index: number) => {
    // First column as user cell
    if (index === 0 && showUserCell) {
      return (
        <td key={index} className={styles.skeletonCell}>
          <div className={styles.skeletonUser}>
            <div className={styles.skeletonAvatar} />
            <div className={styles.skeletonUserContent}>
              <div
                className={`${styles.skeletonContent} ${styles.skeletonUserName}`}
              />
              <div
                className={`${styles.skeletonContent} ${styles.skeletonUserEmail}`}
              />
            </div>
          </div>
        </td>
      );
    }

    // Second column as chips if specified
    if (index === 1 && showChips) {
      return (
        <td key={index} className={styles.skeletonCell}>
          <div className={styles.skeletonChips}>
            <div
              className={`${styles.skeletonContent} ${styles.skeletonChip}`}
            />
            <div
              className={`${styles.skeletonContent} ${styles.skeletonChip}`}
            />
            <div
              className={`${styles.skeletonContent} ${styles.skeletonChip}`}
            />
          </div>
        </td>
      );
    }

    // Last column as actions
    if (index === columns - 1) {
      return (
        <td key={index} className={styles.skeletonCell}>
          <div className={styles.skeletonActions}>
            <div
              className={`${styles.skeletonContent} ${styles.skeletonAction}`}
            />
            <div
              className={`${styles.skeletonContent} ${styles.skeletonAction}`}
            />
          </div>
        </td>
      );
    }

    // Regular content cell
    return (
      <td key={index} className={styles.skeletonCell}>
        <div className={styles.skeletonContent} />
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
    <>
      {Array.from({ length: rows }, (_, index) => (
        <RowSkeleton
          key={index}
          columns={columns}
          showUserCell={showUserCell}
          showChips={showChips}
          className={className}
        />
      ))}
    </>
  );
}
