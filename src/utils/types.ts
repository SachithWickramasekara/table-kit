type TableColumn = string | { label: string; key: string };

export interface TableData {
  id: number;
  name: string;
  category: string;
  active: boolean;
}

export interface TableProps {
  data: TableData[];
  columns: TableColumn[];
  customHeaders?: Record<string, string>; 
}
