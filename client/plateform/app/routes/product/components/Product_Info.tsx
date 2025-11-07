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
import { use, useState } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router";
import { handleError } from "~/common/utils/handleError";
import axiosInstance from "~/services/axiosInstance";
import { API } from "~/services/apiUrl";
import { useAuth } from "~/context/Auth_Context";
import Cookies from "js-cookie";
import { toast } from "react-toastify";

type ProductInfoPropsType = {
  product: Product | undefined;
};
const Product_Info = ({ product }: ProductInfoPropsType) => {
  const { t } = useTranslation();
  const { id } = useParams();
  const navigate = useNavigate();
  const { token } = useAuth();
  const [loading, setLoading] = useState(false);
  const [searchParam, setSearchParsm] = useSearchParams();
  const variant = searchParam.get("variant");
  const variants = product?.variants;
  const [quantity, setQuantity] = useState(1);
  const [selectVariant, setSelectVariant] = useState(
    variant
      ? product?.variants.find((item) => item.id == variant)
      : product?.variants[0]
  );

  const colors = variants?.map(({ color }) => color) ?? [];

  const addToCart = async () => {
    try {
      setLoading(true);
      let sendData = {
        product: id,
        variant: selectVariant?.id,
        quantity,
      };
      if (!token) {
        sendData.cartToken = Cookies.get("cartToken");
      }
      const response = await axiosInstance.put(API.cart, sendData);
      if (response.status === 200) {
        toast.success(t("successfully_add_to_cart"));
        navigate(`/cart`);
      }
    } catch (err) {
      handleError(err, t);
    } finally {
      setLoading(false);
    }
  };
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
          {selectVariant?.images?.length > 0 ? (
            selectVariant?.images?.map((pro, index) => (
              <SwiperSlide key={index} className="">
                <img
                  src={pro}
                  alt={product.title}
                  className=" mx-auto  h-[280px]  md:h-[300px]  lg:h-[404px]"
                />
              </SwiperSlide>
            ))
          ) : (
            <SwiperSlide className="">
              <img
                src={product?.cover}
                alt={product.title}
                className=" mx-auto  h-[280px]  md:h-[300px]  lg:h-[404px]"
              />
            </SwiperSlide>
          )}
        </Swiper>
      </figure>
      {/* info */}
      <div className="flex flex-col gap-6">
        <header className="flex flex-col gap-3">
          <div className="flex items-center gap-1 justify-between">
            <h1 className="h3 text-neutral-black-900 font-bold line-clamp-1">
              {currentLanguageCode === "en"
                ? product?.title
                : product?.title_ar}
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
              label={`${t("_review", { rate: product.averageRating })}`}
              icon={<FullStarIcon />}
              variant="secondary"
            />
            <Badge label={product?.isAvalible ? "available" : "unavailable"} />
          </div>
        </header>
        {/* price */}
        {selectVariant?.price && (
          <h4 className="text-neutral-black-900 h4 font-semibold line-clamp-1">
            {formatPrice(selectVariant.price)}
          </h4>
        )}
        {/* colors */}
        {colors?.length > 0 && (
          <div className="flex flex-col gap-3">
            <h4 className="label text-neutral-black-500 font-medium uppercase">
              {t("avalible_colors")}
            </h4>
            <div className="flex items-center gap-2.5">
              {colors?.map((item) => (
                <span
                  key={item.id}
                  onClick={() => {
                    setSelectVariant(
                      variants.filter((v) => v.color.id === item.id)?.[0]
                    );
                  }}
                  className={`color_container  ${selectVariant?.color.id === item.id ? "border-neutral-black-900" : "border-neutral-black-100"} `}
                >
                  <span
                    style={{ background: item.color }}
                    className="w-6 h-6 flex rounded-full"
                  />
                </span>
              ))}
            </div>
          </div>
        )}
        {/* sizes */}
        {selectVariant?.size && (
          <div className="flex flex-col gap-3">
            <h4 className="label text-neutral-black-500 font-medium uppercase">
              {t("select_size")}
            </h4>
            <div className="flex items-center gap-2.5">
              <div
                // onClick={() => {
                //   setSelectVariant(
                //     variants.filter((v) => v.size.id === item.id)?.[0]
                //   );
                // }}
                className={`size_container !cursor-default border-neutral-black-100  label`}
              >
                {selectVariant.size?.label}
              </div>
            </div>
          </div>
        )}
        {/* quantity */}
        {selectVariant?.quantity && (
          <div className="flex flex-col gap-3">
            <h4 className="label text-neutral-black-500 font-medium uppercase">
              {t("quantity")}
            </h4>
            <Counter
              quantity={selectVariant?.quantity}
              value={quantity}
              setValue={setQuantity}
            />
          </div>
        )}
        <footer className="flex items-center gap-4">
          <Button
            className="min-w-[284px]"
            text="add_to_cart"
            loading={loading}
            handleClick={addToCart}
          />
          <Button
            icon={
              <FavoriteIcon
                fill={
                  product?.isFavorite
                    ? "white"
                    : "var(--color-semantic-red-900)"
                }
                stroke={
                  product?.isFavorite
                    ? "var(--color-neutral-black-500)"
                    : "var(--color-semantic-red-900)"
                }
              />
            }
            variant="outline"
            className="!w-[40px] md:!w-[45px] !px-0"
          />
        </footer>
      </div>
    </section>
  );
};

export default Product_Info;
