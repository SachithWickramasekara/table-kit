// Main exports
export { TableKit } from "./components/dynamic-table";

// Component exports
export { UserCell } from "./components/cells/UserCell";
export { AccessChips, SingleChip } from "./components/cells/AccessChips";
export { Actions } from "./components/cells/Actions";
export { RowSkeleton, TableSkeleton } from "./components/skeleton/RowSkeleton";

// Type exports
export type {
  Column,
  TableAction,
  TableKitProps,
  UserRow,
  DefaultAction,
  AnimationConfig,
} from "./utils/types";

// Defaults exports
export {
  DEFAULT_DUMMY_DATA,
  DEFAULT_ACTIONS,
  GENERIC_DUMMY_DATA,
  GENERIC_DUMMY_COLUMNS,
  type GenericDummyItem,
} from "./defaults";

// CSS imports for consumers
import "./styles/tokens.css";
