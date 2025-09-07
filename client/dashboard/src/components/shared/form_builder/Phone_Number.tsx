import React from "react";
import type { FormListItemType } from "./Form_Builder-types";

type PhonedPropsType = {
  value: string;
  disabled?: boolean;
  isInvalid?: boolean;
  handleChange: (e: React.ChangeEvent) => void;
  item: FormListItemType;
  error: Error | any;
};
const Phone_Number = ({
  value,
  disabled,
  isInvalid,
  item,
  error,
  handleChange,
}: PhonedPropsType) => {
  return (
    <div className="relative">
      <span className="flex absolute start-[1px] bg-neutral-white-100 text-neutral-black-500 h-[98%] top-1/2 -translate-y-1/2 items-center justify-center text-xs w-10 rounded-tl-[6px] rounded-bl-[6px] ">
        +20
      </span>
      <input
        id={item?.id}
        inputMode={item?.inputMode ?? "tel"}
        name={item?.name}
        type={item?.type ?? "tel"}
        disabled={disabled}
        value={value}
        className={`!ps-11 flex-1 w-full input main_h ${isInvalid ? "invalid" : ""} ${item.inputClassName || ""}`}
        onChange={(e) => handleChange(e)}
      />
    </div>
  );
};

export default Phone_Number;
