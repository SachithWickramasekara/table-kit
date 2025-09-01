import { ReactNode, useState, useRef, useEffect } from "react";
import { TableAction } from "../../utils/types";
import styles from "../../styles/actions.module.css";

export interface ActionsProps<T> {
  actions: TableAction<T>[];
  row: T;
  className?: string;
}

// Default icons (using Unicode symbols for zero dependencies)
const DEFAULT_ICONS = {
  view: "",
  edit: "",
  delete: "",
  more: "⋮", // Vertical three dots
};

export function Actions<T>({
  actions,
  row,
  className = "",
}: ActionsProps<T>): ReactNode {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Filter actions based on show predicate
  const visibleActions = actions.filter(
    (action) => !action.show || action.show(row)
  );

  const containerClass = `${styles.actionsContainer} ${className}`.trim();

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    }

    if (isDropdownOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      return () =>
        document.removeEventListener("mousedown", handleClickOutside);
    }
  }, [isDropdownOpen]);

  const handleActionClick = (action: TableAction<T>) => {
    if (!action.disabled) {
      action.onClick(row);
      setIsDropdownOpen(false);
    }
  };

  return (
    <div className={containerClass}>
      {/* Always show dropdown with vertical three dots */}
      <div className={styles.dropdownContainer} ref={dropdownRef}>
        <button
          className={styles.dropdownTrigger}
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          aria-label="More actions"
          aria-expanded={isDropdownOpen}
        >
          <span className={styles.icon}>{DEFAULT_ICONS.more}</span>
        </button>

        <div
          className={`${styles.dropdownMenu} ${
            isDropdownOpen ? styles.dropdownMenuOpen : ""
          }`.trim()}
        >
          {visibleActions.map((action) => {
            const itemClass = `${styles.dropdownItem} ${
              action.isDanger ? styles.dropdownItemDanger : ""
            } ${action.disabled ? styles.dropdownItemDisabled : ""}`.trim();

            return (
              <button
                key={action.id}
                className={itemClass}
                onClick={() => handleActionClick(action)}
                disabled={action.disabled}
              >
                {action.icon && (
                  <span className={styles.icon}>{action.icon}</span>
                )}
                <span>{action.label}</span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
