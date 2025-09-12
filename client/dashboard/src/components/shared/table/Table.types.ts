import type React from "react";

export type TableColumn<T> = {
  header: string;
  field: string;
  body?: (item: T) => void;
};
export type TableProps<T> = {
  columns: TableColumn<T>[];
  rowAction?: (row: T, e: React.ChangeEvent) => void;
  emptyText?: string;
  search_placeholder?: string;
  loading: boolean;
  data: T[];
};

export type TableLayoutProps<T> = TableProps<T> & {
  title?: string;
  hasPagination?: boolean;
  endpoint: string;
};
