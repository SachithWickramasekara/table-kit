// CSS imports for consumers - imported first to ensure styles are available
import "./table-kit.css";

// Export components
export { TableKit } from "./components/dynamic-table";
export { UserCell } from "./components/cells/UserCell";
export { AccessChips } from "./components/cells/AccessChips";
export { Actions } from "./components/cells/Actions";
export { RowSkeleton } from "./components/skeleton/RowSkeleton";
export { Pagination } from "./components/pagination";

// Export types
export type { TableKitProps, Column, UserRow } from "./utils/types";
export type { TableKitProps as TableKitPropsExport } from "./components/dynamic-table";
export type { UserCellProps } from "./components/cells/UserCell";
export type {
  AccessChipsProps,
  SingleChipProps,
} from "./components/cells/AccessChips";
export type { ActionsProps } from "./components/cells/Actions";
export type { PaginationProps } from "./components/pagination";

// Defaults exports
export {
  DEFAULT_DUMMY_DATA,
  GENERIC_DUMMY_DATA,
  GENERIC_DUMMY_COLUMNS,
  type GenericDummyItem,
} from "./defaults";
