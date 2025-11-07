import React from "react";
import { MinusIcon, PlusIcon } from "~/assets/icons/Icon";
import type { CounterPropsType } from "./Counter.types";

const Counter = ({
  quantity,
  size = "lg",
  value,
  setValue,
}: CounterPropsType) => {
  const sizes = {
    lg: "min-w-[164px] min-h-[44px]",
    md: "min-w-[107px] min-h-[40px]",
  };

  const counter = (action: "inc" | "dec") => {
    setValue((prev) => {
      let newVal = action === "inc" ? prev + 1 : prev - 1;
      if (newVal < 0) newVal = 0;
      if (newVal > quantity) newVal = quantity;

      return newVal;
    });
  };

  return (
    <div
      className={`flex items-center justify-between ${sizes[size]} gap-3 border border-neutral-black-100 w-fit px-4 rounded-[4px]`}
    >
      <span
        role="button"
        onClick={() => counter("dec")}
        className="flex w-6 h-6 items-center justify-center cursor-pointer"
      >
        <MinusIcon />
      </span>

      <input
        type="number"
        className="outline-none shadow-none w-6 h-6 text-center text-neutral-black-900 body font-medium"
        value={value}
        max={quantity}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          const val = +e.target.value;
          if (val >= 0 && val <= quantity) {
            setValue(val);
            if (onChange) onChange(val);
          }
        }}
      />

      <span
        role="button"
        onClick={() => counter("inc")}
        className="flex w-6 h-6 items-center justify-center cursor-pointer"
      >
        <PlusIcon />
      </span>
    </div>
  );
};

export default Counter;
