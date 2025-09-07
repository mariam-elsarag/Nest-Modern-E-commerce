import React from "react";
import { MinusIcon, PlusIcon } from "~/assets/icons/Icon";
import type { CounterPropsType } from "./Counter.types";

const Counter = ({ quantity, size = "lg" }: CounterPropsType) => {
  const sizes = {
    lg: "min-w-[164px] min-h-[44px] ",
    md: "min-w-[107px] min-h-[40px] ",
  };
  return (
    <div
      className={` flex items-center justify-between ${sizes[size]} gap-3 border border-neutral-black-100 w-fit px-4 rounded-[4px]`}
    >
      <span className="flex w-6 h-6 items-center justify-center cursor-pointer">
        <MinusIcon />
      </span>
      <input
        className="outline-none shadow-none w-6 h-6 items-center justify-center text-center text-neutral-black-900 body font-medium"
        max={quantity}
        value={0}
      />
      <span className="flex w-6 h-6 items-center justify-center cursor-pointer">
        <PlusIcon />
      </span>
    </div>
  );
};

export default Counter;
