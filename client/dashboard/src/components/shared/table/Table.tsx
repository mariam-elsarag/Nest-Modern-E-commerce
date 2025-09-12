import React from "react";
import { useTranslation } from "react-i18next";
import type { TableProps } from "./Table.types";
import { Skeleton } from "primereact/skeleton";
import { DataTable } from "primereact/datatable";
import Empty from "../empty/Empty";
import { Column } from "primereact/column";
import { currentLanguageCode } from "../../../common/utils/switchLang";

const Table = <T,>({
  loading,
  columns,
  data,
  rowAction,
  emptyText,
}: TableProps<T>) => {
  const { t } = useTranslation();
  console.log(data, "s");
  return (
    <section className="overflow-x-auto pb-1">
      <div>
        {loading ? (
          <table className="w-full border-collapse">
            <thead>
              <tr>
                {columns?.map((item) => (
                  <th
                    key={item.field}
                    className="text-neutral-black-500 body font-medium text-start border-y border-neutral-black-100 h-[44px]"
                  >
                    {t(item?.header)}
                  </th>
                ))}
              </tr>
            </thead>

            <tbody>
              {Array.from({ length: 5 }).map((_, index) => (
                <tr
                  key={index}
                  className="not-last-of-type:border-b not-last-of-type:border-neutral-white-200 not-last-of-type:border-dashed"
                >
                  {columns?.map((_, columnIndex) => (
                    <td
                      key={columnIndex}
                      className={` text-nowrap p-4 text-start body font-medium h-[80px]  `}
                    >
                      <Skeleton height="16px" borderRadius={50} width="100%" />
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <DataTable
            value={data}
            onRowClick={(e) => {
              const row = e.data;
              if (rowAction) {
                rowAction(row, e);
              }
            }}
            emptyMessage={
              <div className="min-h-[55vh] flex items-center">
                <Empty size="sm" des={emptyText} />
              </div>
            }
          >
            {columns?.map(
              (item, index) =>
                item && (
                  <Column
                    key={index}
                    dir={currentLanguageCode === "en" ? "ltr" : "rtl"}
                    field={item.field}
                    body={item?.body}
                    header={t(item?.header)}
                    bodyClassName={`${rowAction ? "cursor-pointer" : ""}  `}
                  />
                )
            )}
          </DataTable>
        )}
      </div>
    </section>
  );
};
export default Table;
