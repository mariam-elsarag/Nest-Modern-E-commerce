import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import type { CartItemType, CartType } from "~/common/types/Type";
import Cart_Item from "~/components/shared/cart_item/Cart_Item";

type OrderInfoType = {
  data: CartType;
  setRefetch?: React.Dispatch<React.SetStateAction<any>>;
};
const Order_Info = ({ data, setRefetch }: OrderInfoType) => {
  const { t } = useTranslation();

  return (
    <section className="flex flex-col gap-10">
      <header className="pb-5 border-b border-neutral-white-200">
        <h2 className="h5 font-semibold text-neutral-black-900">
          {t("your_cart")}
        </h2>
      </header>
      <div className="flex flex-col gap-10">
        {data?.items?.map((item) => (
          <Cart_Item key={item?.id} product={item} setRefetch={setRefetch} />
        ))}
      </div>
    </section>
  );
};

export default Order_Info;
