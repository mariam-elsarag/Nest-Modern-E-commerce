import type React from "react";
import type { TapList, TapProps } from "../tab/Tab.types";

export type TableColumn<T> = {
  header: string;
  field: string;
  body?: (item: T) => void;
};
export type TableProps<T> = Partial<Omit<TapProps, "type" | "list">> & {
  columns: TableColumn<T>[];
  rowAction?: (row: T, e: React.ChangeEvent) => void;
  emptyText?: string;
  search_placeholder?: string;
  loading: boolean;
  data: T[];
  hasTap?: boolean;
  tapType?: "filter" | "click" | "navLink";
  tapList: TapList[];
};

export type TableLayoutProps<T> = Partial<TableProps<T>> & {
  hasPagination?: boolean;
  endpoint: string;
};
