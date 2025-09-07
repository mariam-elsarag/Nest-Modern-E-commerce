import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";

import { Autoplay, Pagination } from "swiper/modules";

import type { Product } from "~/common/types/Type";
import { currentLanguageCode } from "~/common/utils/switchLang";
import Button from "~/components/shared/button/Button";
import {
  FavoriteIcon,
  FullStarIcon,
  MinusIcon,
  PlusIcon,
  ShareIcon,
} from "~/assets/icons/Icon";
import Badge from "~/components/shared/badge/Badge";
import { useTranslation } from "react-i18next";
import { formatPrice } from "~/common/utils/formatPrice";
import Counter from "~/components/shared/counter/Counter";

type ProductInfoPropsType = {
  product: Product | undefined;
};
const Product_Info = ({ product }: ProductInfoPropsType) => {
  const { t } = useTranslation();

  return (
    <section className="overflow-x-hidden grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[543px_1fr] gap-6 md:gap-10 2xl:gap-[120px] ">
      <figure className="bg-neutral-white-100 rounded-[5px] min-h-[375px]  lg:h-[500px]  pt-10 pb-6 ">
        <Swiper
          key={currentLanguageCode}
          loop={true}
          pagination={true}
          speed={800}
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
          }}
          slidesPerView={1}
          modules={[Autoplay, Pagination]}
          className="h-full flex flex-col justify-center items-center"
        >
          {product?.images?.map((pro, index) => (
            <SwiperSlide key={index} className="">
              <img
                src={pro}
                alt={product.title}
                className=" mx-auto  h-[280px]  md:h-[300px]  lg:h-[404px]"
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </figure>
      {/* info */}
      <div className="flex flex-col gap-6">
        <header className="flex flex-col gap-3">
          <div className="flex items-center gap-1 justify-between">
            <h1 className="h3 text-neutral-black-900 font-bold line-clamp-1">
              {product?.title}
            </h1>
            <Button
              variant="tertiery"
              icon={<ShareIcon />}
              size="sm"
              className="!px-0 !w-[38px]"
            />
          </div>
          <div className="flex items-center gap-2 ">
            <Badge
              label={`${t("_review", { rate: product.rate })}`}
              icon={<FullStarIcon />}
              variant="secondary"
            />
            <Badge label="in_stock" />
          </div>
        </header>
        {/* price */}
        {product.price && (
          <h4 className="text-neutral-black-900 h4 font-semibold line-clamp-1">
            {formatPrice(product.price)}
          </h4>
        )}
        {/* colors */}
        {product?.colors?.length > 0 && (
          <div className="flex flex-col gap-3">
            <h4 className="label text-neutral-black-500 font-medium uppercase">
              {t("avalible_colors")}
            </h4>
            <div className="flex items-center gap-2.5">
              {product?.colors?.map((item) => (
                <span
                  key={item}
                  className={`color_container border-neutral-black-100`}
                >
                  <span
                    style={{ background: item }}
                    className="w-6 h-6 flex rounded-full"
                  />
                </span>
              ))}
            </div>
          </div>
        )}
        {/* sizes */}
        {product?.sizes?.length > 0 && (
          <div className="flex flex-col gap-3">
            <h4 className="label text-neutral-black-500 font-medium uppercase">
              {t("select_size")}
            </h4>
            <div className="flex items-center gap-2.5">
              {product?.sizes?.map((item) => (
                <div
                  key={item}
                  className={`size_container  border-neutral-black-100 label`}
                >
                  {item}
                </div>
              ))}
            </div>
          </div>
        )}
        {/* quantity */}
        {product?.quantity && (
          <div className="flex flex-col gap-3">
            <h4 className="label text-neutral-black-500 font-medium uppercase">
              {t("quantity")}
            </h4>
            <Counter quantity={product?.quantity} />
          </div>
        )}
        <footer className="flex items-center gap-4">
          <Button className="min-w-[284px]" text="add_to_cart" />
          <Button
            icon={<FavoriteIcon />}
            variant="outline"
            className="!w-[40px] md:!w-[45px] !px-0"
          />
        </footer>
      </div>
    </section>
  );
};

export default Product_Info;
