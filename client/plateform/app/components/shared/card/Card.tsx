import React, { useState } from "react";
import type { CardComponentProps } from "./Card.types";
import { useTranslation } from "react-i18next";
import { formatPrice } from "~/common/utils/formatPrice";
import Rate from "../rate/Rate";
import Button from "../button/Button";
import { CartIcon, FavoriteIcon } from "~/assets/icons/Icon";
import { Link } from "react-router";
import { currentLanguageCode } from "~/common/utils/switchLang";
import Badge from "../badge/Badge";
import axiosInstance from "~/services/axiosInstance";
import { API } from "~/services/apiUrl";
import { handleError } from "~/common/utils/handleError";
import { useAuth } from "~/context/Auth_Context";
import Cookies from "js-cookie";
import { toast } from "react-toastify";

const Card = ({ data, setData }: CardComponentProps) => {
  const { t } = useTranslation();
  const { token } = useAuth();
  const cartToken = Cookies.get("cartToken");
  const [loadingBtn, setLoadingBtn] = useState(false);
  const toggleFavorite = async () => {
    try {
      const response = await axiosInstance.patch(
        `${API.favorite}/${data.variantId}`
      );
      if (response.status === 200) {
        setData((pre) =>
          pre.map((item) =>
            item.id === data.id
              ? { ...item, isFavorite: !data.isFavorite }
              : item
          )
        );
      }
    } catch (err) {
      handleError(err, t);
    }
  };

  const handleRemoveFromCart = async () => {
    try {
      setLoadingBtn(true);
      const response = await axiosInstance.delete(
        `${API.cart}/${data.cartItemId}`,
        {
          params: { cartToken: token ? null : cartToken },
        }
      );
      if (response.status === 204) {
        setData((pre) =>
          pre.map(
            (item) =>
              (item.id = data.id
                ? { ...item, isCart: false, cartItemId: null }
                : item)
          )
        );
        toast.success(t(t("successfully_remove_product_from_cart")));
      }
    } catch (err) {
      handleError(err, t);
    } finally {
      setLoadingBtn(false);
    }
  };
  const handleAddToCart = async () => {
    try {
      setLoadingBtn(true);
      let sendData = {
        variant: data.variantId,
        quantity: 1,
      };
      if (!token) {
        sendData.cartToken = cartToken;
      }
      const response = await axiosInstance.put(API.cart, sendData);
      if (response.status === 200) {
        toast.success(t("successfully_add_item_to_cart"));

        setData((pre) =>
          pre.map(
            (item) =>
              (item.id = data.id
                ? { ...item, isCart: true, cartItemId: response.data.items.id }
                : item)
          )
        );
      }
    } catch (err) {
      handleError(err, t);
    } finally {
      setLoadingBtn(false);
    }
  };

  return (
    <article className="bg-white rounded-[4px] flex flex-col gap-6 z-[1]">
      <figure className="relative group   bg-neutral-white-100 h-[300px] flex items-center justify-center rounded-[4px]">
        <Button
          icon={
            <FavoriteIcon
              width="20"
              height="20"
              fill={
                data?.isFavorite ? "var(--color-semantic-red-900)" : "white"
              }
              stroke={
                data?.isFavorite
                  ? "var(--color-semantic-red-900)"
                  : "var(--color-neutral-black-500)"
              }
            />
          }
          handleClick={() => {
            toggleFavorite();
          }}
          className="absolute top-2 end-2 z-10 opacity-0 transition-all ease-in-out duration-300 group-hover:opacity-100"
          size="xs"
          variant="secondary"
          round="full"
          hasHover={false}
        />
        <Link to={`/product/${data.id}?variant=${data.variantId}`}>
          <img
            src={data.cover}
            alt={data.title}
            className="h-[250px] rounded-[4px] object-cover"
          />
        </Link>
        <Button
          icon={<CartIcon fill="white" />}
          className="absolute bottom-0 opacity-0 transition-all ease-in-out duration-300 group-hover:opacity-100  "
          text={data?.isCart ? "remove_from_cart" : "add_to_cart"}
          hasFullWidth
          handleClick={data.isCart ? handleRemoveFromCart : handleAddToCart}
        />
      </figure>

      <div className="flex flex-col gap-2">
        <Link to={`/product/${data.id}?variant=${data.variantId}`}>
          <h3 className="line-clamp-1 body font-medium text-neutral-black-900">
            {t(currentLanguageCode === "en" ? data.title : data.title_ar)}
          </h3>
        </Link>

        <div className="flex items-center gap-4">
          <Badge
            variant="primary"
            label={data?.isAvalible ? "available" : "unavailable"}
          />
          {data?.price && (
            <span className="truncate text-neutral-black-600 body">
              {formatPrice(data.price)}
            </span>
          )}
        </div>
      </div>
    </article>
  );
};

export default Card;
