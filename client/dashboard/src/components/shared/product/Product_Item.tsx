import React from "react";
import { useTranslation } from "react-i18next";
type ProductItemProps = {
  avatar?: string | null;
  title: string;
  isDeleted?: boolean;
};
const Product_Item = ({ avatar, title, isDeleted }: ProductItemProps) => {
  return (
    <div className="flex items-center gap-6">
      <figure className="w-12 h-12 flex items-center justify-center bg-neutral-white-100 rounded-[4px]">
        {avatar && (
          <img src={avatar} alt={title} className="h-[46px] rounded-[4px]" />
        )}
      </figure>
      <h3
        className={`truncate body font-medium ${
          isDeleted ? "deleted_row" : "text-neutral-black-500"
        }`}
      >
        {title}
      </h3>
    </div>
  );
};

export default Product_Item;
