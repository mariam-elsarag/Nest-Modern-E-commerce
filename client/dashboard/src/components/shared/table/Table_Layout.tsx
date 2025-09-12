import React from "react";
import type { TableLayoutProps } from "./Table.types";
import { useTranslation } from "react-i18next";
import Table from "./Table";
import usePaginatedData from "../../../hooks/usePaginatedData";
import Search from "../search/Search";

const Table_Layout = <T,>({
  title,
  hasPagination = true,
  emptyText,
  columns,
  rowAction,
  endpoint,
  search_placeholder,
}: TableLayoutProps) => {
  const { t } = useTranslation();
  const { data, loading, searchLoader, setSearchLoader, query, setQuery } =
    usePaginatedData<T>({ endpoint: endpoint });
  return (
    <section className={`layer shadow_sm p-6 flex flex-col gap-6`}>
      <header className="flex items-center justify-between gap-2">
        {title && <h2 className="text-primary h4 font-medium">{t(title)}</h2>}
        {search_placeholder && (
          <Search
            placeholder={search_placeholder}
            searchLoader={searchLoader}
            setSearchLoader={setSearchLoader}
            search={query}
            setSearch={setQuery}
          />
        )}
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
