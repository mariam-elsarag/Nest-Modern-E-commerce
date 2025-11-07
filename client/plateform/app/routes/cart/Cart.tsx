import React from "react";
import { useTranslation } from "react-i18next";
import { Link, useNavigate } from "react-router";
import Page_Header from "~/components/shared/header/page_header/Page_Header";
import type { breadCrumbListType } from "~/components/shared/header/page_header/Page_Header.types";
import Order_Summary from "./component/Order_Summary";
import Order_Info from "./component/Order_Info";
import type { CartItemType } from "~/common/types/Type";
import { API } from "~/services/apiUrl";
import type { Route } from "./+types/Cart";
import axiosInstance from "~/services/axiosInstance";
import Empty from "~/components/shared/empty/Empty";
import useGetData from "~/hooks/useGetData";

const Cart = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { data: cart, setRefetch } = useGetData({ endpoint: API.cart });
  const breadcrumbsList: breadCrumbListType[] = [
    {
      label: t("home"),
      template: () => <Link to={`/`}>{t("home")}</Link>,
    },
    {
      label: t("cart"),
    },
  ];
  return (
    <section className="flex flex-col gap-10">
      <Page_Header
        title="cart"
        breadcrumbsList={breadcrumbsList}
        variant="secondary"
      />
      {cart?.items?.length > 0 ? (
        <section className="container grid lg:grid-cols-[1fr_300px] xl:grid-cols-[1fr_341px] gap-6 lg:gap-10 xl:gap-20">
          <Order_Info data={cart} setRefetch={setRefetch} />
          <Order_Summary data={cart} />
        </section>
      ) : (
        <section>
          <Empty
            des="empty_cart_description"
            title="empty_cart_title"
            btnName="empty_cart_button"
            btnCta={() => {
              navigate("/product");
            }}
          />
        </section>
      )}
    </section>
  );
};

export default Cart;
