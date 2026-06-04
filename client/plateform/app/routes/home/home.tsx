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
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router";
import Cookies from "js-cookie";
import { useAuth } from "~/context/Auth_Context";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Ecommerce" },
    { name: "description", content: "Welcome to Ecommerce!" },
  ];
}
export async function clientLoader() {
  const highlights = await axiosInstance.get<Product[]>(API.home.highlights);
  return { highlights: highlights.data };
}
export default function Home({ loaderData }: Route.ComponentProps) {
  const { t } = useTranslation();
  const { setToken } = useAuth();
  const [searchParams, setSearchParams] = useSearchParams();
  const googleToken = searchParams.get("token");

  useEffect(() => {
    if (!googleToken) return;

    setToken(googleToken);

    Cookies.set("token", googleToken, {
      expires: 30,
    });

    const newParams = new URLSearchParams(searchParams);

    newParams.delete("token");

    setSearchParams(newParams);
  }, [googleToken, searchParams]);
  return (
    <section className="section_gap">
      <Hero />
      <Features />
      {/* <Best_Selling products={bestSelling} /> */}
      <Category />
      <Product_List />
    </section>
  );
}
