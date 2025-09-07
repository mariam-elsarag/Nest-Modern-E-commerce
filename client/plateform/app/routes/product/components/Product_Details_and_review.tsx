import React, { useState } from "react";
import { MoreIcon, StarIcon } from "~/assets/icons/Icon";
import Tab from "~/components/shared/tab/Tab";
import type { ListItemProps } from "~/components/shared/tab/Tab.types";
import Reviews from "./Reviews";
import Details from "./Details";
import type { Product } from "~/common/types/Type";

const tabList: ListItemProps[] = [
  {
    title: "details",
    value: "details",
    default: true,
    icon: MoreIcon,
  },
  { title: "reviews", value: "review", icon: StarIcon },
];
type ProductDetailsAndReviewProps = {
  product: Product | undefined;
};
const Product_Details_and_review = ({
  product,
}: ProductDetailsAndReviewProps) => {
  const [filter, setFilter] = useState("details");
  return (
    <section className={`grid grid-cols-[241px_1fr] gap-8`}>
      <Tab
        list={tabList}
        direction="column"
        isScrollable={false}
        variant="secondary"
        type="click"
        currentValue={filter}
        setValue={setFilter}
      />
      {filter === "review" ? (
        <Reviews product={product} />
      ) : (
        <Details product={product} />
      )}
    </section>
  );
};

export default Product_Details_and_review;
