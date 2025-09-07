import { index } from "@react-router/dev/routes";
import React from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router";
import type {
  CategoryType,
  ColorsType,
  Product,
  SizesType,
} from "~/common/types/Type";
import Card from "~/components/shared/card/Card";
import Empty from "~/components/shared/empty/Empty";
import Filter from "~/components/shared/filter/Filter";
import type { FilterListItem } from "~/components/shared/filter/Fiter.types";
import Page_Header from "~/components/shared/header/page_header/Page_Header";
import type { breadCrumbListType } from "~/components/shared/header/page_header/Page_Header.types";
import useGetData from "~/hooks/useGetData";
import usePaginatedData from "~/hooks/usePaginatedData";
import { API } from "~/services/apiUrl";

const Products = () => {
  const { t } = useTranslation();
  const { data: categories } = useGetData<CategoryType>(API.categories);
  const { data: sizes } = useGetData<SizesType>(API.sizes);
  const { data: colors } = useGetData<ColorsType>(API.colors);
  const { data, query, setQuery } = usePaginatedData<Product>({
    endpoint: API.products,
  });

  const breadcrumbsList: breadCrumbListType[] = [
    {
      label: t("home"),
      template: () => <Link to={`/`}>{t("home")}</Link>,
    },
    {
      label: t("products"),
    },
  ];
  const filterList: FilterListItem[] = [
    {
      title: "categories",
      list: categories,
      fieldName: "category",
      type: "multiselect",
      variant: "checkbox",
    },
    {
      title: "color",
      list: colors,
      fieldName: "color",
      type: "single",
      variant: "color",
    },
    {
      title: "size",
      list: sizes,
      fieldName: "size",
      type: "single",
      variant: "size",
    },
  ];
  return (
    <section className=" flex flex-col gap-8">
      <Page_Header breadcrumbsList={breadcrumbsList} variant="secondary" />
      <div className="container grid md:grid-cols-[248px_1fr] gap-7">
        <Filter data={filterList} filter={query} setFilter={setQuery} />
        <div>
          {data?.length > 0 ? (
            <div className="grid sm:grid-cols-2  lg:grid-cols-2 xl:grid-cols-3 gap-6">
              {data?.map((product, index) => (
                <Card key={index} data={product} />
              ))}
            </div>
          ) : (
            <Empty message="no_products_yet" />
          )}
        </div>
      </div>
    </section>
  );
};

export default Products;
