import React from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router";
import Cart_Item from "~/components/shared/cart_item/Cart_Item";
import Empty from "~/components/shared/empty/Empty";
import Pagination from "~/components/shared/pagination/Pagination";
import useGetData from "~/hooks/useGetData";
import { API } from "~/services/apiUrl";

const Orders = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const data = [];
  if (data?.length === 0) {
    return (
      <div className="h-full flex flex-col justify-center items-center">
        <Empty
          des="empty_order"
          btnName="start_shopping"
          btnCta={() => {
            navigate("/product");
          }}
        />
      </div>
    );
  }
  return (
    <div className={`max-w-[617px] flex flex-col gap-10`}>
      <h2 className="h5 font-semibold text-neutral-black-900">{t("orders")}</h2>
      <div className="flex flex-col gap-10">
        <section className="flex-1 flex flex-col gap-8 ">
          {data?.map((cart) => (
            <div
              className="pb-8 border-b border-neutral-white-200"
              key={cart?.id}
            >
              <Cart_Item product={cart} variant="order" />
            </div>
          ))}
        </section>
        {data?.length > 0 && (
          <div className="flex items-center justify-center">
            <Pagination
              currentPage={1}
              pages={10}
              onPageChange={(n: number) => {
                console.log(n);
              }}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default Orders;
