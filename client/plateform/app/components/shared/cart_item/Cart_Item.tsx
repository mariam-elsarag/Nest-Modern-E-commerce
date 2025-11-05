import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import type { CartProductsType } from "~/common/types/Type";
import { formatPrice } from "~/common/utils/formatPrice";
import Counter from "../counter/Counter";
import Button from "../button/Button";
import { CloseIcon } from "~/assets/icons/Icon";
import { data, Link } from "react-router";
import { formatDateToMonth } from "~/common/utils/formatDateToMonth";
import axiosInstance from "~/services/axiosInstance";
import { handleError } from "~/common/utils/handleError";
import { currentLanguageCode } from "~/common/utils/switchLang";
import { API } from "~/services/apiUrl";

type CartItemProps = {
  product: CartProductsType;
  setData: React.Dispatch<React.SetStateAction<CartProductsType[]>>;
  variant?: "cart" | "wishlist" | "order";
};
const Cart_Item = ({ product, variant = "cart", setData }: CartItemProps) => {
  const { t } = useTranslation();

  const toggleFavorite = async () => {
    try {
      const response = await axiosInstance.patch(
        `${API.favorite}/${product.product.id}`
      );
      if (response.status === 200) {
        setData((pre) =>
          pre.filter((item) => item.product.id !== product.product.id)
        );
      }
    } catch (err) {
      handleError(err, t);
    }
  };

  const renderRightContent = () => {
    switch (variant) {
      case "wishlist":
        return (
          <>
            <Button
              text="view_details"
              variant="outline_dark"
              to={`/product/${product.product.id}`}
            />
          </>
        );
      case "order":
        return (
          <>
            <Link
              className="text-neutral-black-900 body font-medium border-b border-neutral-black-900"
              to={`/${product?.orderId}/checkout`}
            >
              {t("proceessing")}
            </Link>
            <Button
              text="view_item"
              variant="outline_dark"
              to={`/product/${product?.id}`}
            />
          </>
        );
      default:
        return (
          <>
            <Counter quantity={product?.quantity} />
            <Button
              size="md"
              variant="secondary"
              icon={<CloseIcon fill="var(--color-neutral-black-500)" />}
            />
          </>
        );
    }
  };
  const containerBase = `flex-1 flex  `;
  const containerStyle = {
    cart: "items-center justify-between",
    order: "flex-col gap-2",
    wishlist: "flex-col gap-2",
  };
  return (
    <section className="flex gap-8 sm:items-center flex-col sm:flex-row">
      <figure className="w-full h-[250px] sm:w-20 sm:h-20 rounded-[4px] bg-neutral-white-100 flex items-center justify-center">
        {product?.product.cover && (
          <img
            src={product.product?.cover}
            className="h-[200px] sm:h-[62px]"
            alt={product?.product.title}
          />
        )}
      </figure>
      <div className={`${containerBase} ${containerStyle[variant]} `}>
        <div className="flex flex-col gap-2">
          <h3 className="body font-medium text-neutral-black-900 line-clamp-1">
            {currentLanguageCode === "en"
              ? product.product.title
              : product.product.title_ar}
          </h3>
          {variant === "cart" ? (
            <div className="flex items-center gap-2">
              {product?.color && (
                <div className="flex items-center gap-2">
                  <span className="text-xs text-neutral-black-500 font-medium">
                    {t("color")}
                  </span>

                  <span
                    className="flex items-center justify-center w-3 h-3 border border-neutral-white-200 rounded-full"
                    style={{ background: product?.color }}
                  />
                </div>
              )}
              {product?.size && (
                <div className="flex items-center gap-2">
                  <span className="text-neutral-black-500">—</span>
                  <p className="flex items-center gap-1 text-neutral-black-500 text-xs font-medium">
                    <span>{t("size")}:</span>
                    <span>{product?.size}</span>
                  </p>
                </div>
              )}
            </div>
          ) : (
            <p className="flex items-center gap-1 label font-medium text-neutral-black-500">
              <span>{t(variant === "order" ? "ordered_on" : "added_on")}</span>
              <span>
                {product?.createdAt
                  ? formatDateToMonth(product?.createdAt)
                  : "-"}
              </span>
            </p>
          )}
        </div>
        {variant === "wishlist" ? (
          <span
            className="label text-neutral-black-900 font-medium cursor-pointer"
            onClick={toggleFavorite}
          >
            {t("remove_item")}
          </span>
        ) : (
          <span className="text-neutral-black-900 body font-medium">
            {product?.price ? formatPrice(product?.price) : "0"}
          </span>
        )}
      </div>
      {/* remove and quantity */}
      <div className="flex items-center gap-4 ">{renderRightContent()}</div>
    </section>
  );
};

export default Cart_Item;
