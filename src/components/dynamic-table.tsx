import React, { useState, useEffect, useRef } from "react";
import { TableProps, TableColumn, TableData } from "../utils/types";

const DynamicTable: React.FC<TableProps> = ({
  data,
  columns,
  customHeaders = {},
  headerStyles = {},
  rowStyles = {},
  tableStyles = {},
  containerStyles = {},
  actions = { show: false, buttons: [], position: "right" },
  responsive = { breakpoint: 768 },
  pagination,
}) => {
  const [isResponsive, setIsResponsive] = useState(false);
  const [showActionMenu, setShowActionMenu] = useState<number | null>(null);
  const tableRef = useRef<HTMLDivElement>(null);

  // Detect screen size for responsive mode
  useEffect(() => {
    const handleResize = () => {
      setIsResponsive(window.innerWidth < responsive.breakpoint);
    };

    handleResize(); // Initial check
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [responsive.breakpoint]);

  // Function to determine if a column should be fixed based on its position
  const getFixedStatus = (
    index: number,
    columnsLength: number
  ): "right" | undefined => {
    // Only last two columns are fixed right
    if (index >= columnsLength - 2) {
      return "right";
    }

    return undefined;
  };

  // Process columns
  const processedColumns: TableColumn[] = columns.map((col, index) => {
    const fixedStatus = getFixedStatus(index, columns.length);

    if (typeof col === "string") {
      return {
        key: col,
        label: customHeaders[col] || col,
        fixed: fixedStatus,
        width: "200px", // Default width
      };
    } else {
      // For object columns, respect existing fixed property only if it's "right"
      // We're overriding any "left" fixed columns
      const columnFixed = col.fixed === "right" ? col.fixed : fixedStatus;
      return {
        ...col,
        fixed: columnFixed,
        width: col.width || (col.key === "tableActions" ? "80px" : "200px"),
      };
    }
  });

  // Separate columns into fixed and scrollable
  const rightFixedColumns: TableColumn[] = [];
  const scrollableColumns: TableColumn[] = [];

  processedColumns.forEach((col) => {
    if (col.fixed === "right") {
      rightFixedColumns.push(col);
    } else {
      scrollableColumns.push(col);
    }
  });

  // Add actions column if enabled
  if (actions.show) {
    const actionsColumn: TableColumn = {
      key: "tableActions",
      label: "Actions",
      fixed: "right", // Always fixed to right
      width: "80px",
    };

    rightFixedColumns.push(actionsColumn);
  }

  const allColumns = [...scrollableColumns, ...rightFixedColumns];

  const getColumnKey = (col: TableColumn): string => {
    return typeof col === "string" ? col : col.key;
  };

  const getColumnLabel = (col: TableColumn): string => {
    if (typeof col === "string") {
      return customHeaders[col] || col;
    }
    return col.label || col.key;
  };

  // Calculate positions for fixed right columns
  const getFixedColumnPosition = (colIndex: number): { right?: string } => {
    let rightPosition = 0;
    for (let i = allColumns.length - 1; i > colIndex; i--) {
      const col = allColumns[i];
      const width =
        typeof col !== "string" && col.width
          ? parseInt(col.width, 10)
          : getColumnKey(col) === "tableActions"
          ? 80
          : 200;
      rightPosition += width;
    }
    return { right: `${rightPosition}px` };
  };

  const getCellContent = (row: TableData, col: TableColumn) => {
    const key = getColumnKey(col);

    if (key === "tableActions") {
      return (
        <div className="table-actions">
          <button
            className="action-button"
            onClick={(e) => {
              e.stopPropagation();
              setShowActionMenu(
                showActionMenu === row.id ? null : (row.id as number)
              );
            }}
          >
            ⋮
          </button>
          {showActionMenu === row.id && (
            <div className="action-menu">
              {actions.buttons.map((button, idx) => (
                <button
                  key={idx}
                  onClick={(e) => {
                    e.stopPropagation();
                    button.onClick(row);
                    setShowActionMenu(null);
                  }}
                >
                  {button.icon} {button.label}
                </button>
              ))}
            </div>
          )}
        </div>
      );
    }

    if (typeof col !== "string" && col.render) {
      return col.render(row[key], row);
    }

    return row[key] !== undefined ? row[key] : "";
  };

  // Outside click handler for action menu
  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (
        showActionMenu !== null &&
        tableRef.current &&
        !tableRef.current.contains(event.target as Node)
      ) {
        setShowActionMenu(null);
      }
    };

    document.addEventListener("click", handleOutsideClick);
    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, [showActionMenu]);

  // Get column width with defaults
  const getColumnWidth = (col: TableColumn): string => {
    if (typeof col !== "string" && col.width) {
      return col.width;
    }
    // Default width for action column is smaller
    if (typeof col !== "string" && col.key === "tableActions") {
      return "80px";
    }
    // Default minimum width for regular columns
    return "200px";
  };

  // Render table view
  const renderTableView = () => (
    <div
      className="table-container"
      style={{
        ...containerStyles,
        overflow: "auto",
        position: "relative",
      }}
      ref={tableRef}
    >
      <table
        className="dynamic-table"
        style={{
          ...tableStyles,
          tableLayout: "fixed",
          borderCollapse: "separate",
          borderSpacing: 0,
        }}
      >
        <thead>
          <tr>
            {allColumns.map((col, index) => {
              const isFixed = typeof col !== "string" && col.fixed === "right";
              const width = getColumnWidth(col);

              // Calculate position for fixed columns
              const fixedPosition = isFixed
                ? getFixedColumnPosition(index)
                : {};

              return (
                <th
                  key={index}
                  style={{
                    ...headerStyles,
                    position: isFixed ? "sticky" : "relative",
                    ...fixedPosition,
                    width,
                    minWidth: width,
                    zIndex: isFixed ? 2 : 1, // Higher z-index for fixed headers
                    backgroundColor: isFixed
                      ? headerStyles.backgroundColor || "#f8f9fa"
                      : undefined,
                  }}
                  className={isFixed ? "fixed-column fixed-right" : ""}
                >
                  {getColumnLabel(col)}
                </th>
              );
            })}
          </tr>
        </thead>
        <tbody>
          {data.map((row) => (
            <tr key={row.id || Math.random().toString(36)} style={rowStyles}>
              {allColumns.map((col, colIndex) => {
                const isFixed =
                  typeof col !== "string" && col.fixed === "right";
                const width = getColumnWidth(col);
                const fixedPosition = isFixed
                  ? getFixedColumnPosition(colIndex)
                  : {};

                return (
                  <td
                    key={colIndex}
                    style={{
                      ...rowStyles,
                      position: isFixed ? "sticky" : "relative",
                      ...fixedPosition,
                      width,
                      minWidth: width,
                      zIndex: isFixed ? 1 : 0,
                      backgroundColor: isFixed
                        ? rowStyles.backgroundColor || "white"
                        : undefined,
                      boxShadow: isFixed
                        ? "-2px 0 5px rgba(0, 0, 0, 0.1)"
                        : undefined,
                    }}
                    className={isFixed ? "fixed-column fixed-right" : ""}
                  >
                    {getCellContent(row, col)}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  // Render card view (for responsive design)
  const renderCardView = () => (
    <div className="responsive-cards" ref={tableRef}>
      {data.map((row) => (
        <div
          key={row.id || Math.random().toString(36)}
          className="responsive-card"
          style={responsive.cardStyles}
        >
          {allColumns.map((col, index) => {
            const key = getColumnKey(col);

            if (key === "tableActions") {
              return (
                <div key={index} className="card-actions">
                  <span className="card-label">Actions</span>
                  <div className="card-value">
                    <div className="table-actions">
                      <button
                        className="action-button"
                        onClick={() =>
                          setShowActionMenu(
                            showActionMenu === row.id
                              ? null
                              : (row.id as number)
                          )
                        }
                      >
                        ⋮
                      </button>
                      {showActionMenu === row.id && (
                        <div className="action-menu">
                          {actions.buttons.map((button, idx) => (
                            <button
                              key={idx}
                              onClick={() => {
                                button.onClick(row);
                                setShowActionMenu(null);
                              }}
                            >
                              {button.icon} {button.label}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            }

            return (
              <div key={index} className="card-field">
                <span className="card-label">{getColumnLabel(col)}</span>
                <div className="card-value">{getCellContent(row, col)}</div>
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );

  const renderPagination = () => {
    if (!pagination) return null;

    const { currentPage, totalRecords, pageSize, onPageChange } = pagination;
    const totalPages = Math.ceil(totalRecords / pageSize);

    return (
      <div className="table-pagination">
        <button
          disabled={currentPage === 1}
          onClick={() => onPageChange(currentPage - 1)}
        >
          Previous
        </button>
        <span>
          Page {currentPage} of {totalPages}
        </span>
        <button
          disabled={currentPage === totalPages || totalPages === 0}
          onClick={() => onPageChange(currentPage + 1)}
        >
          Next
        </button>
      </div>
    );
  };

  return (
    <div className="dynamic-table-wrapper">
      {isResponsive ? renderCardView() : renderTableView()}
      {pagination && renderPagination()}
    </div>
  );
};

export default DynamicTable;
