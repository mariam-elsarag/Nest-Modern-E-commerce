import React, { type JSX } from "react";
import type { TableLayoutProps } from "./Table.types";
import { useTranslation } from "react-i18next";
import Table from "./Table";
import usePaginatedData from "../../../hooks/usePaginatedData";
import Search from "../search/Search";
import Pagination from "../pagination/Pagination";
import Tab from "../tab/Tab";
import Button from "../button/Button";

const Table_Layout = <T,>({
  hasPagination = true,
  emptyText,
  columns,
  rowAction,
  endpoint,
  search_placeholder,
  hasTap,
  tapType,
  tapList,
  onClick,
  title,
  queryDefault,
}: TableLayoutProps<T>): JSX.Element => {
  const { t } = useTranslation();
  const {
    data,
    loading,
    searchLoader,
    setSearchLoader,
    query,
    setQuery,
    page,
    pages,
    handlePagination,
  } = usePaginatedData<T>({ endpoint: endpoint, queryDefault: queryDefault });
  return (
    <main className={` ${hasTap ? "flex flex-col gap-6" : ""}`}>
      {hasTap && (
        <Tab
          type={tapType}
          list={tapList}
          onClick={onClick}
          currentValue={query}
          setValue={setQuery}
        />
      )}
      <section className={`layer shadow_sm p-6 flex flex-col gap-6`}>
        <header
          className={`flex items-center ${
            title ? "justify-between" : "justify-end"
          } gap-2`}
        >
          {title && (
            <h3 className="h5 text-neutral-black-900 font-semibold">
              {t(title)}
            </h3>
          )}
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
        {hasPagination && data?.length > 0 && (
          <Pagination
            currentPage={page}
            pages={pages}
            onPageChange={handlePagination}
          />
        )}
      </section>
    </main>
  );
};

export default Table_Layout;
