import React from "react";
import type { ListTypeProps } from "./List.types";
import { useTranslation } from "react-i18next";

const List = ({ list }: ListTypeProps) => {
  const { t } = useTranslation();
  return (
    <div className="flex flex-col gap-3">
      {list?.map((item) => (
        <div
          key={item.id}
          className={`px-1 py-2 flex items-center gap-1 ${
            item?.className ?? ""
          } `}
        >
          <span className="body text-neutral-black-800 min-w-[60px]">{`${t(
            item?.title
          )}:`}</span>
          <span className="text-neutral-black-500 body flex-1">
            {item?.value}
          </span>
        </div>
      ))}
    </div>
  );
};

export default List;
