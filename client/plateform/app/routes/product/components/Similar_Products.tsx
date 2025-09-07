import React from "react";
import { useTranslation } from "react-i18next";
import type { Product } from "~/common/types/Type";
import Card from "~/components/shared/card/Card";
import Section_Header from "~/components/shared/header/section_header/Section_Header";

type SimilarProductType = {
  products: Product[];
};
const Similar_Products = ({ products }: SimilarProductType) => {
  const { t } = useTranslation();
  return (
    <article className="flex flex-col gap-20">
      <Section_Header
        title="you_might_also"
        subTitle="similar_products"
        position="bottom"
      />
      <section className="grid xs:grid-cols-2 lg:grid-cols-4 gap-6">
        {products.slice(0, 4).map((product) => (
          <Card key={product.id} data={product} />
        ))}
      </section>
    </article>
  );
};

export default Similar_Products;
