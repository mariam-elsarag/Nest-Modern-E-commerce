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

const Card = ({ data }: CardComponentProps) => {
  const { t } = useTranslation();
  const [toggleFavorite, setToggleFavorite] = useState(
    data?.isFavorite || false
  );
  return (
    <article className="bg-white rounded-[4px] flex flex-col gap-6 z-[1]">
      <figure className="relative group   bg-neutral-white-100 h-[300px] flex items-center justify-center rounded-[4px]">
        <Button
          icon={
            <FavoriteIcon
              width="20"
              height="20"
              fill={toggleFavorite ? "var(--color-semantic-red-900)" : "white"}
              stroke={
                toggleFavorite
                  ? "var(--color-semantic-red-900)"
                  : "var(--color-neutral-black-500)"
              }
            />
          }
          handleClick={() => {
            setToggleFavorite((pre) => !pre);
          }}
          className="absolute top-2 end-2 z-10 opacity-0 transition-all ease-in-out duration-300 group-hover:opacity-100"
          size="xs"
          variant="secondary"
          round="full"
          hasHover={false}
        />
        <Link to={`/product/${data.id}`}>
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
        />
      </figure>

      <div className="flex flex-col gap-2">
        <Link to={`/product/${data.id}`}>
          <h3 className="line-clamp-1 body font-medium text-neutral-black-900">
            {t(currentLanguageCode === "en" ? data.title : data.title_ar)}
          </h3>
        </Link>

        <div className="flex items-center gap-4">
          <Badge
            variant="primary"
            label={data?.isAvalible ? "available" : "unavailable"}
          />
          {data?.minPrice && (
            <span className="truncate text-neutral-black-600 body">
              {formatPrice(data.minPrice)}
            </span>
          )}
        </div>
      </div>
    </article>
  );
};

export default Card;
