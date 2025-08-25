import { Column, TableAction, UserRow } from "./utils/types";

// Default dummy data
export const DEFAULT_DUMMY_DATA: UserRow[] = [
  {
    id: "1",
    name: "Florence Shaw",
    email: "florence@untitledui.com",
    access: ["Admin", "Data Export", "Data Import"],
    lastActive: "Mar 4, 2024",
    dateAdded: "July 4, 2022",
    avatarUrl:
      "https://images.unsplash.com/photo-1494790108755-2616b612b647?w=40&h=40&fit=crop&crop=face",
  },
  {
    id: "2",
    name: "Amelie Laurent",
    email: "amelie@untitledui.com",
    access: ["Admin", "Data Export", "Data Import"],
    lastActive: "Mar 4, 2024",
    dateAdded: "July 4, 2022",
    avatarUrl:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=40&h=40&fit=crop&crop=face",
  },
  {
    id: "3",
    name: "Ammar Foley",
    email: "ammar@untitledui.com",
    access: ["Data Export", "Data Import"],
    lastActive: "Mar 2, 2024",
    dateAdded: "July 4, 2022",
    avatarUrl:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face",
  },
  {
    id: "4",
    name: "Caitlyn King",
    email: "caitlyn@untitledui.com",
    access: ["Data Export", "Data Import"],
    lastActive: "Mar 6, 2024",
    dateAdded: "July 4, 2022",
    avatarUrl:
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=40&h=40&fit=crop&crop=face",
  },
  {
    id: "5",
    name: "Sienna Hewitt",
    email: "sienna@untitledui.com",
    access: ["Data Export", "Data Import"],
    lastActive: "Mar 8, 2024",
    dateAdded: "July 4, 2022",
    avatarUrl:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=40&h=40&fit=crop&crop=face",
  },
  {
    id: "6",
    name: "Olly Shoredter",
    email: "olly@untitledui.com",
    access: ["Data Export", "Data Import"],
    lastActive: "Mar 6, 2024",
    dateAdded: "July 4, 2022",
    avatarUrl:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face",
  },
  {
    id: "7",
    name: "Mathilde Lewis",
    email: "mathilde@untitledui.com",
    access: ["Data Export", "Data Import"],
    lastActive: "Mar 4, 2024",
    dateAdded: "July 4, 2022",
    avatarUrl:
      "https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?w=40&h=40&fit=crop&crop=face",
  },
];

// Default actions
export const DEFAULT_ACTIONS: TableAction<UserRow>[] = [
  {
    id: "view",
    label: "View",
    onClick: (row) => {
      console.log("View action triggered for:", row);
    },
  },
  {
    id: "edit",
    label: "Edit",
    onClick: (row) => {
      console.log("Edit action triggered for:", row);
    },
  },
  {
    id: "delete",
    label: "Delete",
    isDanger: true,
    onClick: (row) => {
      console.log("Delete action triggered for:", row);
    },
  },
];

// Simple dummy data for completely generic tables
export const GENERIC_DUMMY_DATA = [
  { id: "1", name: "Item 1", tag: "Important", created: "2024-01-01" },
  { id: "2", name: "Item 2", tag: "Draft", created: "2024-01-02" },
  { id: "3", name: "Item 3", tag: "Published", created: "2024-01-03" },
];

export type GenericDummyItem = {
  id: string;
  name: string;
  tag: string;
  created: string;
};

export const GENERIC_DUMMY_COLUMNS: Column<GenericDummyItem>[] = [
  {
    id: "name",
    header: "Name",
    accessorKey: "name",
  },
  {
    id: "tag",
    header: "Tag",
    accessorKey: "tag",
  },
  {
    id: "created",
    header: "Created",
    accessorKey: "created",
  },
];
