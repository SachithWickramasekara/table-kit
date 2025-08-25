import { ReactNode, useState, useRef, useEffect } from "react";
import { TableAction } from "../../utils/types";
import styles from "../../styles/actions.module.css";

export interface ActionsProps<T> {
  actions: TableAction<T>[];
  row: T;
  maxVisible?: number;
  className?: string;
}

// Default icons (using Unicode symbols for zero dependencies)
const DEFAULT_ICONS = {
  view: "👁",
  edit: "✏️",
  delete: "🗑",
  more: "⋯",
};

export function Actions<T>({
  actions,
  row,
  maxVisible = 2,
  className = "",
}: ActionsProps<T>): ReactNode {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Filter actions based on show predicate
  const visibleActions = actions.filter(
    (action) => !action.show || action.show(row)
  );

  const inlineActions = visibleActions.slice(0, maxVisible);
  const dropdownActions = visibleActions.slice(maxVisible);

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
      {/* Inline actions */}
      {inlineActions.map((action) => {
        const buttonClass = `${styles.actionButton} ${
          action.isDanger ? styles.actionButtonDanger : ""
        }`.trim();

        return (
          <button
            key={action.id}
            className={buttonClass}
            onClick={() => handleActionClick(action)}
            disabled={action.disabled}
            aria-label={action.label}
          >
            {action.icon && <span className={styles.icon}>{action.icon}</span>}
            <span>{action.label}</span>
          </button>
        );
      })}

      {/* Dropdown for overflow actions */}
      {dropdownActions.length > 0 && (
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
            {dropdownActions.map((action) => {
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
      )}
    </div>
  );
}
