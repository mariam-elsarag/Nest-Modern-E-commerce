import { useTranslation } from "react-i18next";
import type { Route } from "../+types/home";
import { switchLang } from "~/common/utils/switchLang";
import Button from "~/components/shared/button/Button";
import Hero from "./components/hero";
import Features from "./components/features/Features";
import Category from "./components/category_cta/Category";
import Best_Selling from "./components/best_Selling/Best_Selling";
import axiosInstance from "~/services/axiosInstance";
import type { Product } from "~/common/types/Type";
import { API } from "~/services/apiUrl";
import Product_List from "./components/product_list/Product_List";
import { useState } from "react";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Ecommerce" },
    { name: "description", content: "Welcome to Ecommerce!" },
  ];
}
export async function clientLoader() {
  // const response = await axiosInstance.get<Product[]>(API.products);
  // return { data: response.data };
}
export default function Home({ loaderData }: Route.ComponentProps) {
  const { t } = useTranslation();

  // const { data } = loaderData;
  // const bestSelling = data.filter(
  //   (product) => product.isBestSelling && product
  // );
  return (
    <section className="section_gap">
      <Hero />
      {/* <Features />
      <Best_Selling products={bestSelling} />
      <Category />
      <Product_List data={data} /> */}
    </section>
  );
}
