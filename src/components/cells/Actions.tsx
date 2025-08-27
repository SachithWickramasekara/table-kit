import { ReactNode, useState, useRef, useEffect } from "react";
import { TableAction } from "../../utils/types";

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

  const containerClass = `table-kit-actions-container ${className}`.trim();

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
      <div className="table-kit-dropdown-container" ref={dropdownRef}>
        <button
          className="table-kit-dropdown-trigger"
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          aria-label="More actions"
          aria-expanded={isDropdownOpen}
        >
          <span className="table-kit-icon">{DEFAULT_ICONS.more}</span>
        </button>

        <div
          className={`table-kit-dropdown-menu ${
            isDropdownOpen ? "table-kit-dropdown-menu-open" : ""
          }`.trim()}
        >
          {visibleActions.map((action) => {
            const itemClass = `table-kit-dropdown-item ${
              action.isDanger ? "table-kit-dropdown-item-danger" : ""
            } ${
              action.disabled ? "table-kit-dropdown-item-disabled" : ""
            }`.trim();

            return (
              <button
                key={action.id}
                className={itemClass}
                onClick={() => handleActionClick(action)}
                disabled={action.disabled}
              >
                {action.icon && (
                  <span className="table-kit-icon">{action.icon}</span>
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
