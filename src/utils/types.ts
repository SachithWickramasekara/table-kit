/* eslint-disable @typescript-eslint/no-explicit-any */
export type TableColumn =
  | string
  | {
      key: string;
      label: string;
      fixed?: any;
      width?: string;
      render?: (value: any, record: any) => React.ReactNode;
    };

export interface TableData {
  [key: string]: any;
  id?: number | string;
}

export interface ActionButton {
  label: string;
  onClick: (record: any) => void;
  icon?: React.ReactNode;
}

export interface TableProps {
  data: TableData[];
  columns: TableColumn[];
  customHeaders?: Record<string, string>;
  headerStyles?: React.CSSProperties;
  rowStyles?: React.CSSProperties;
  tableStyles?: React.CSSProperties;
  containerStyles?: React.CSSProperties;
  actions?: {
    show: boolean;
    buttons: ActionButton[];
    position?: "left" | "right";
  };
  responsive?: {
    breakpoint: number;
    cardStyles?: React.CSSProperties;
  };
  pagination?: {
    pageSize: number;
    currentPage: number;
    totalRecords: number;
    onPageChange: (page: number) => void;
  };
}
