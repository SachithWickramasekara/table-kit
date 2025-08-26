import { ReactNode } from "react";
import styles from "../../styles/chips.module.css";

export interface AccessChipsProps {
  access: string[];
  maxVisible?: number;
  className?: string;
}

function getChipVariant(accessType: string): string {
  const lowerType = accessType.toLowerCase();

  if (lowerType.includes("admin")) {
    return styles.chipPrimary;
  }
  if (lowerType.includes("export") || lowerType.includes("import")) {
    return styles.chipSuccess;
  }

  return "";
}

export function AccessChips({
  access,
  maxVisible = 3,
  className = "",
}: AccessChipsProps): ReactNode {
  const containerClass = `${styles.chipContainer} ${className}`.trim();

  if (!access || access.length === 0) {
    return (
      <div className={containerClass}>
        <span className={styles.chip}>No access</span>
      </div>
    );
  }

  const visibleItems = access.slice(0, maxVisible);
  const remainingCount = access.length - maxVisible;

  return (
    <div className={containerClass}>
      {visibleItems.map((item, index) => {
        const chipClass = `${styles.chip} ${getChipVariant(item)} ${
          styles.chipEnter
        }`.trim();
        return (
          <span
            key={item}
            className={chipClass}
            style={{ animationDelay: `${index * 50}ms` }}
          >
            {item}
          </span>
        );
      })}
      {remainingCount > 0 && (
        <span className={`${styles.chip} ${styles.chipEnter}`}>
          +{remainingCount} more
        </span>
      )}
    </div>
  );
}

export interface SingleChipProps {
  value: string;
  variant?: "default" | "primary" | "success" | "danger";
  className?: string;
}

export function SingleChip({
  value,
  variant = "default",
  className = "",
}: SingleChipProps): ReactNode {
  const variantClass =
    variant !== "default"
      ? styles[`chip${variant.charAt(0).toUpperCase()}${variant.slice(1)}`]
      : "";
  const chipClass =
    `${styles.chip} ${styles.singleChip} ${variantClass} ${className}`.trim();

  return <span className={chipClass}>{value}</span>;
}
