import React, { useEffect, useState } from "react";
import Card from "~/components/shared/card/Card";
import Tab from "~/components/shared/tab/Tab";
import type { ListItemProps } from "~/components/shared/tab/Tab.types";
import useGetData from "~/hooks/useGetData";
import { API } from "~/services/apiUrl";

const filterList: ListItemProps[] = [
  { title: "latest", value: "latest", default: true },
  {
    title: "featured",
    value: "featured",
  },
];
const Product_List = () => {
  const { data, query, setQuery, setData } = useGetData({
    endpoint: API.home.highlights,
    queryDefault: { type: "latest" },
  });

  return (
    <section className="container flex flex-col gap-20 section_p">
      <header className="w-fit mx-auto">
        <Tab
          list={filterList}
          type="filter"
          fieldName="type"
          currentValue={query}
          setValue={setQuery}
        />
      </header>
      <div className="grid xs:grid-cols-2 lg:grid-cols-4 gap-6">
        {data?.map((product) => (
          <Card key={product.id} data={product} setData={setData} />
        ))}
      </div>
    </section>
  );
};

export default Product_List;
