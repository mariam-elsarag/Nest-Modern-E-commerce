import React from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router";
import type { CartItemType } from "~/common/types/Type";
import { formatPrice } from "~/common/utils/formatPrice";
import Button from "~/components/shared/button/Button";

type OrderSummaryType = {
  data: CartItemType;
  handleClick: () => void;
  loadingBtn: boolean;
};
const Order_Summary = ({ data, handleClick, loadingBtn }: OrderSummaryType) => {
  const { t } = useTranslation();
  const list = [
    {
      title: `${t("subtotal")} (${t("include_vat")}) `,
      value: data?.subTotal ? formatPrice(data?.subTotal) : 0,
    },
    {
      title: "shipping",
      value: Number(data?.shipping)
        ? formatPrice(data?.shipping)
        : `${t(data?.shipping)}`,
    },
  ];
  return (
    <aside className="border border-neutral-black-100 rounded-[4px] py-8 px-6 flex flex-col gap-10">
      <h3 className="h5 font-semibold text-neutral-black-900">
        {t("order_summary")}
      </h3>
      <div className="flex flex-col gap-6">
        <ul className="flex flex-col gap-4 pb-6 border-b border-neutral-black-100">
          {list?.map((item) => (
            <li
              key={item?.title}
              className="flex items-center justify-between gap-2 body font-medium"
            >
              <span className="text-neutral-black-500">{t(item?.title)}</span>
              <span className="text-neutral-black-900">{item?.value}</span>
            </li>
          ))}
        </ul>
        <div className="flex items-center justify-between gap-2 body font-medium">
          <span className="text-neutral-black-900">{t("total")}</span>
          <span className="text-neutral-black-900">
            {data?.total ? formatPrice(data?.total) : 0}
          </span>
        </div>
        <footer className="flex flex-col gap-8">
          <Button
            text="checkout"
            hasFullWidth
            handleClick={handleClick}
            loading={loadingBtn}
          />
          <Link
            className="text-neutral-black-900 text-xs text-center underline decoration-neutral-900 font-medium"
            to="/product"
          >
            {t("continue_shopping")}
          </Link>
        </footer>
      </div>
    </aside>
  );
};

export default Order_Summary;
