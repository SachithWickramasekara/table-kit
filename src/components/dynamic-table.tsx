import React from "react";
import { TableProps } from "../utils/types";

const DynamicTable: React.FC<TableProps> = ({
  data,
  columns,
  customHeaders = {},
}) => {
  const headers = columns.map((col) => {
    if (typeof col === "string") {
      return customHeaders[col] || col;
    }
    return col.label;
  });

  return (
    <table className="table">
      <thead>
        <tr>
          {headers.map((header, index) => (
            <th key={index}>{header}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((row) => (
          <tr key={row.id}>
            {columns.map((col, index) => {
              const key = typeof col === "string" ? col : col.key;
              return <td key={index}>{row[key as keyof typeof row]}</td>;
            })}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default DynamicTable;
