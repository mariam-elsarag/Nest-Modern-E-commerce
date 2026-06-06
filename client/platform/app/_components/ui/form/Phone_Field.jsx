import React from "react";

const Phone_Field = ({ item, field, isInvalid }) => {
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
        value={field.value || item.value || ""}
        className={`!ps-11 flex-1 w-full input main_h ${isInvalid ? "invalid" : ""} ${item.inputClassName || ""}`}
        onChange={(e) => {
          field.onChange(e);
          if (item?.action) {
            item?.action?.(e);
          }
        }}
      />
    </div>
  );
};

export default Phone_Field;
