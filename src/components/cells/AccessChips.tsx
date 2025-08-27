import { ReactNode } from "react";

export interface AccessChipsProps {
  access: string[];
  maxVisible?: number;
  className?: string;
}

function getChipVariant(accessType: string): string {
  const lowerType = accessType.toLowerCase();

  if (lowerType.includes("admin")) {
    return "table-kit-chip-primary";
  }
  if (lowerType.includes("export") || lowerType.includes("import")) {
    return "table-kit-chip-success";
  }

  return "";
}

export function AccessChips({
  access,
  maxVisible = 3,
  className = "",
}: AccessChipsProps): ReactNode {
  const containerClass = `table-kit-chip-container ${className}`.trim();

  if (!access || access.length === 0) {
    return (
      <div className={containerClass}>
        <span className="table-kit-chip">No access</span>
      </div>
    );
  }

  const visibleItems = access.slice(0, maxVisible);
  const remainingCount = access.length - maxVisible;

  return (
    <div className={containerClass}>
      {visibleItems.map((item, index) => {
        const chipClass = `table-kit-chip ${getChipVariant(
          item
        )} table-kit-chip-enter`.trim();
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
        <span className="table-kit-chip table-kit-chip-enter">
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
  const variantClassMap: Record<string, string> = {
    default: "",
    primary: "table-kit-chip-primary",
    success: "table-kit-chip-success",
    danger: "table-kit-chip-danger",
  };

  const variantClass = variantClassMap[variant] || "";
  const chipClass =
    `table-kit-chip table-kit-single-chip ${variantClass} ${className}`.trim();

  return <span className={chipClass}>{value}</span>;
}
