"use client";
import { FullStarIcon, StarIcon } from "@/app/_assets/icons/Icon";
import React from "react";

const Rate = ({
  rate = 0,
  fillColor = "var(--color-neutral-black-500)",
  onChange,
  changeValue = false,
  hasText = true,
  hasError = false,
}) => {
  const handleRate = (n) => {
    if (changeValue) {
      onChange(n);
    }
  };
  return (
    <section className="flex items-center gap-1">
      {hasText && rate > 0 && (
        <span className="text-xs text-neutral-black-600">({rate})</span>
      )}
      <div className="flex items-center ">
        {Array.from({ length: 5 }).map((_, i) => (
          <span
            key={i}
            role="button"
            aria-label="rate"
            className={changeValue ? "cursor-pointer" : "cursor-default"}
            onClick={() => {
              handleRate(i + 1);
            }}
          >
            {i + 1 <= rate ? (
              <FullStarIcon
                fill={hasError ? "var(--color-semantic-red-900)" : fillColor}
              />
            ) : (
              <StarIcon
                fill={hasError ? "var(--color-semantic-red-900)" : fillColor}
              />
            )}
          </span>
        ))}
      </div>
    </section>
  );
};

export default Rate;
