import { ReactNode, useState, useRef, useEffect } from "react";
import styles from "../../styles/actions.module.css";

export interface TableAction<T> {
  id: string;
  label: string;
  icon?: ReactNode;
  onClick: (row: T) => void;
  isDanger?: boolean;
  disabled?: boolean;
  show?: (row: T) => boolean; // optional predicate
}

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
  more: "⋯", // Horizontal three dots - more common and visible
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

    function handleEscape(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setIsDropdownOpen(false);
      }
    }

    if (isDropdownOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("keydown", handleEscape);
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
        document.removeEventListener("keydown", handleEscape);
      };
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
      {/* Always show dropdown with horizontal three dots */}
      <div className={styles.dropdownContainer} ref={dropdownRef}>
        <button
          className={styles.dropdownTrigger}
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          onKeyDown={(e) => {
            if (e.key === "Escape") {
              setIsDropdownOpen(false);
            }
          }}
          aria-label="More actions"
          aria-expanded={isDropdownOpen}
          aria-haspopup="menu"
          type="button"
        >
          <span className={styles.icon}>{DEFAULT_ICONS.more}</span>
        </button>

        <div
          className={`${styles.dropdownMenu} ${
            isDropdownOpen ? styles.dropdownMenuOpen : ""
          }`.trim()}
          role="menu"
          aria-orientation="vertical"
        >
          {visibleActions.map((action, index) => {
            const itemClass = `${styles.dropdownItem} ${
              action.isDanger ? styles.dropdownItemDanger : ""
            } ${action.disabled ? styles.dropdownItemDisabled : ""}`.trim();

            return (
              <button
                key={action.id}
                className={itemClass}
                onClick={() => handleActionClick(action)}
                onKeyDown={(e) => {
                  if (e.key === "Escape") {
                    setIsDropdownOpen(false);
                  } else if (e.key === "ArrowDown") {
                    e.preventDefault();
                    const nextIndex = (index + 1) % visibleActions.length;
                    const nextButton = e.currentTarget.parentElement?.children[
                      nextIndex
                    ] as HTMLButtonElement;
                    nextButton?.focus();
                  } else if (e.key === "ArrowUp") {
                    e.preventDefault();
                    const prevIndex =
                      index === 0 ? visibleActions.length - 1 : index - 1;
                    const prevButton = e.currentTarget.parentElement?.children[
                      prevIndex
                    ] as HTMLButtonElement;
                    prevButton?.focus();
                  }
                }}
                disabled={action.disabled}
                role="menuitem"
                type="button"
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
