import React from "react";
import { useTranslation } from "react-i18next";
import type { Product } from "~/common/types/Type";
type DetailsProps = {
  product: Product | undefined;
};
const Details = ({ product }: DetailsProps) => {
  const { t } = useTranslation();
  console.log(product);
  return (
    <section className="flex flex-col gap-6">
      <h5 className="text-neutral-black-900 h5 font-semibold">{t("detail")}</h5>
      <p
        className="text-neutral-black-500 body max-w-[727px]"
        dangerouslySetInnerHTML={{
          __html: product?.description?.replace(/\n/g, "<br />"),
        }}
      />
    </section>
  );
};

export default Details;
