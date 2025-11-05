import React from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router";
import Page_Header from "~/components/shared/header/page_header/Page_Header";
import type { breadCrumbListType } from "~/components/shared/header/page_header/Page_Header.types";
import Order_Summary from "./component/Order_Summary";
import Order_Info from "./component/Order_Info";
import type { CartItemType } from "~/common/types/Type";
import { API } from "~/services/apiUrl";
import type { Route } from "./+types/Cart";
import axiosInstance from "~/services/axiosInstance";
export async function clientLoader({ params }: Route.LoaderArgs) {
  const response = await axiosInstance.get<CartItemType[]>(API.cart);

  return { cart: response.data, id: 1 };
}

const Cart = ({ loaderData }: Route.ComponentProps) => {
  const { cart, id } = loaderData;
  const { t } = useTranslation();
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
      <section className="container grid lg:grid-cols-[1fr_300px] xl:grid-cols-[1fr_341px] gap-6 lg:gap-10 xl:gap-20">
        <Order_Info data={cart} />
        <Order_Summary data={cart} />
      </section>
    </section>
  );
};

export default Cart;
