import React from "react";
import { useTranslation } from "react-i18next";
import { formatPrice } from "~/common/utils/formatPrice";
import Button from "~/components/shared/button/Button";

const Checkout_Order_Info = ({ data }) => {
  const { t } = useTranslation();
  const list = [
    {
      title: "subtotal",
      value: data?.subtotal ? formatPrice(data?.subtotal) : 0,
    },
    {
      title: "shipping",
      value: Number(data?.shipping)
        ? formatPrice(data?.shipping)
        : `${t(data?.shipping)}`,
    },
    {
      title: "tax",
      value: Number(data?.tax) ? formatPrice(data?.tax) : data?.tax,
    },
  ];
  return (
    <div className=" flex flex-col gap-10 lg:max-w-[372px] lg:ms-auto w-full ">
      <h1 className="h5 font-semibold text-neutral-black-900">
        {t("your_order")}
      </h1>
      <div className="flex items-center flex-wrap gap-4 md:gap-1">
        <div className="flex-1 flex items-center gap-3 ">
          {[1, 2, 3, 4]?.slice(0, 3)?.map((product) => (
            <figure
              key={product?.id}
              className="w-10 h-10 flex items-center justify-center rounded-full bg-neutral-white-100"
            >
              <img
                src={product?.image}
                alt="product image"
                className="h-[35px]"
              />
            </figure>
          ))}
          <figure className="w-10 h-10 flex items-center justify-center rounded-full bg-neutral-white-100 text-neutral-black-400 body">
            +3
          </figure>
        </div>
        <Button to={`/${data?.id}/cart`} variant="outline" text="edit_cart" />
      </div>
      <div className="flex flex-col gap-6 ">
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
          <Button type="submit" text="place_order" hasFullWidth />
        </footer>
      </div>
    </div>
  );
};

export default Checkout_Order_Info;
