import { useTranslation } from "react-i18next";
import type { Product } from "~/common/types/Type";
import Card from "~/components/shared/card/Card";
import Section_Header from "~/components/shared/header/section_header/Section_Header";

type BestSellingProps = {
  products: Product[];
};

const Best_Selling = ({ products }: BestSellingProps) => {
  const { t } = useTranslation();
  return (
    <section className="container flex flex-col gap-20 section_p">
      <Section_Header
        title="best_selling"
        subTitle="shop_now"
        isCenter={true}
      />
      <div className="grid xs:grid-cols-2 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <Card key={product.id} data={product} />
        ))}
      </div>
    </section>
  );
};
export default Best_Selling;
