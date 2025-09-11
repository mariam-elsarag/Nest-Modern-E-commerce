import type React from "react";

export type TableColumn<T> = {
  header: string;
  field: string;
  body?: (item: T) => void;
};
export type TableProps<T> = {
  loading: boolean;
  columns: TableColumn<T>[];
  data: T[];
  rowAction?: (row: T, e: React.ChangeEvent) => void;
  emptyText?: string;
};

export type TableLayoutProps = TableProps<T> & {
  title?: string;
  hasPagination?: boolean;
};
