import React, { useEffect, useState } from "react";
import Card from "~/components/shared/card/Card";
import Tab from "~/components/shared/tab/Tab";
import type { ListItemProps } from "~/components/shared/tab/Tab.types";

const filterList: ListItemProps[] = [
  {
    title: "featured",
    value: "featured",
    default: true,
  },
  { title: "latest", value: "latest" },
];
const Product_List = ({ data }) => {
  const [filter, setFilter] = useState();
  const [products, setProducts] = useState(data);

  const handleFilter = (val: string) => {
    console.log(val);
    if (val === "featured") {
      setProducts(data.filter((item) => item.isFeatured));
    } else if (val === "latest") {
      setProducts(
        [...data].sort(
          (a, b) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        )
      );
    }
    setFilter(val);
  };
  useEffect(() => {
    setProducts(data.filter((item) => item.isFeatured));
  }, []);
  return (
    <section className="container flex flex-col gap-20 section_p">
      <header className="w-fit mx-auto">
        <Tab
          list={filterList}
          type="click"
          currentValue={filter}
          setValue={handleFilter}
        />
      </header>
      <div className="grid xs:grid-cols-2 lg:grid-cols-4 gap-6">
        {products.slice(0, 4).map((product) => (
          <Card key={product.id} data={product} />
        ))}
      </div>
    </section>
  );
};

export default Product_List;
