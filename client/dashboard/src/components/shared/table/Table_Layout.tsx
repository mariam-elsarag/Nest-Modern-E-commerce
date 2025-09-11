import React from "react";
import type { TableLayoutProps } from "./Table.types";
import { useTranslation } from "react-i18next";
import Table from "./Table";

const Table_Layout = <T,>({
  title,
  hasPagination = true,
  loading,
  emptyText,
  columns,
  data,
  rowAction,
}: TableLayoutProps) => {
  const { t } = useTranslation();
  return (
    <section className={`layer shadow_sm p-6 flex flex-col gap-6`}>
      <header>
        {title && <h2 className="text-primary h4 font-medium">{t(title)}</h2>}
      </header>
      <Table<T>
        loading={loading}
        emptyText={emptyText}
        columns={columns}
        data={data}
        rowAction={rowAction}
      />
    </section>
  );
};

export default Table_Layout;
