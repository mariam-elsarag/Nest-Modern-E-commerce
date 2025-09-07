import React, { useState } from "react";
import type { CardComponentProps } from "./Card.types";
import { useTranslation } from "react-i18next";
import { formatPrice } from "~/common/utils/formatPrice";
import Rate from "../rate/Rate";
import Button from "../button/Button";
import { FavoriteIcon } from "~/assets/icons/Icon";
import { Link } from "react-router";

const Card = ({ data }: CardComponentProps) => {
  const { t } = useTranslation();
  const [toggleFavorite, setToggleFavorite] = useState(
    data?.isFavorite || false
  );
  return (
    <article className="bg-white rounded-[4px] flex flex-col gap-6 z-[1]">
      <figure className="relative bg-neutral-white-100 h-[312px] flex items-center justify-center rounded-[4px]">
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
          className="absolute top-2 end-2 z-10"
          size="xs"
          variant="tertiery"
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
      </figure>

      <div className="flex flex-col gap-2">
        <Link to={`/product/${data.id}`}>
          <h3 className="line-clamp-1 body font-medium text-neutral-black-900">
            {t(data.title)}
          </h3>
        </Link>
        <Rate rate={data?.rate} />
        <div>
          <span className="truncate text-neutral-black-600 body">
            {formatPrice(data.price)}
          </span>
        </div>
      </div>
    </article>
  );
};

export default Card;
