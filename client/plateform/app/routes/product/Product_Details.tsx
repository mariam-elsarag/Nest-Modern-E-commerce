import React from "react";
import type { Product } from "~/common/types/Type";
import { API } from "~/services/apiUrl";
import axiosInstance from "~/services/axiosInstance";
import type { Route } from "./+types/Product_Details";
import Similar_Products from "./components/Similar_Products";
import Page_Header from "~/components/shared/header/page_header/Page_Header";
import { useTranslation } from "react-i18next";
import { Link } from "react-router";
import type { breadCrumbListType } from "~/components/shared/header/page_header/Page_Header.types";
import Product_Info from "./components/Product_Info";
import Product_Details_and_review from "./components/Product_Details_and_review";

export async function clientLoader({ params }: Route.LoaderArgs) {
  const { id } = params;

  const response = await axiosInstance.get<Product[]>(`${API.products}/${id}`);

  const similarProducts = await axiosInstance.get<Product[]>(
    `${API.products}/${id}/similar`
  );

  return { product: response.data, id, similarProducts: similarProducts.data };
}

const Product_Details = ({ loaderData }: Route.ComponentProps) => {
  const { id, product, similarProducts } = loaderData;
  const { t } = useTranslation();
  const breadcrumbsList: breadCrumbListType[] = [
    {
      label: t("home"),
      template: () => <Link to={`/`}>{t("home")}</Link>,
    },
    {
      label: product?.title,
    },
  ];
  return (
    <section className="container section_gap">
      <section className="flex flex-col gap-4">
        <Page_Header breadcrumbsList={breadcrumbsList} />
        <Product_Info product={product} />
      </section>
      <Product_Details_and_review product={product} />
      <Similar_Products products={similarProducts} />
    </section>
  );
};

export default Product_Details;
