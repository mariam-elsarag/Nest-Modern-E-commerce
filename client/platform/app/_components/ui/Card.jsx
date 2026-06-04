"use client";
import { CartIcon, FavoriteIcon } from "@/app/_assets/icons/Icon";
import Button from "./Button";
import Link from "next/link";
import Image from "next/image";
import Badge from "./Badge";
import { useTransition } from "react";
import { addToCart, removeFromCart } from "@/app/_lib/actions/cart";
import { toggleFavorite } from "@/app/_lib/actions/favorite";

const Card = ({ data, setData }) => {
  const { t } = useTranslation();
  const [isPending, startTransition] = useTransition();
  const handleAddToCart = () => {
    startTransition(async () => {
      try {
        const response = await addToCart({
          variantId: data.variantId,
          token,
        });

        setData((prev) =>
          prev.map((item) =>
            item.id === data.id
              ? {
                  ...item,
                  isCart: true,
                  cartItemId: response.items.id,
                }
              : item,
          ),
        );
      } catch (error) {
        console.error(error);
      }
    });
  };

  const handleRemoveFromCart = () => {
    startTransition(async () => {
      try {
        await removeFromCart({
          cartItemId: data.cartItemId,
          token,
        });

        setData((prev) =>
          prev.map((item) =>
            item.id === data.id
              ? {
                  ...item,
                  isCart: false,
                  cartItemId: null,
                }
              : item,
          ),
        );
      } catch (error) {
        console.error(error);
      }
    });
  };

  const handleToggleFavorite = () => {
    startTransition(async () => {
      try {
        await toggleFavorite(data.variantId);

        setData((prev) =>
          prev.map((item) =>
            item.id === data.id
              ? {
                  ...item,
                  isFavorite: !item.isFavorite,
                }
              : item,
          ),
        );
      } catch (error) {
        console.error(error);
      }
    });
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
        <Link href={`/product/${data.id}?variant=${data.variantId}`}>
          <Image
            src={data.cover}
            alt={data.title}
            className="h-[250px]! w-full! rounded-[4px] object-cover"
          />
        </Link>
        <Button
          icon={<CartIcon fill="white" />}
          className="absolute bottom-0 opacity-0 transition-all ease-in-out duration-300 group-hover:opacity-100  "
          text={data?.isCart ? "remove_from_cart" : "add_to_cart"}
          hasFullWidth
          loading={isPending}
          handleClick={data.isCart ? handleRemoveFromCart : handleAddToCart}
        />
      </figure>

      <div className="flex flex-col gap-2">
        <Link href={`/product/${data.id}?variant=${data.variantId}`}>
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
