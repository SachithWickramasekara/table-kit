/* eslint-disable @typescript-eslint/no-explicit-any */
type TableColumn = string | { label: string; key: string };

export interface TableData {
  id: number;
  name: string;
  category: string;
  active: boolean;
}

export interface TableProps {
  data: TableData[] | any[];
  columns: TableColumn[];
  customHeaders?: Record<string, string>;
  headerStyles?: React.CSSProperties;
  rowStyles?: React.CSSProperties;
}
