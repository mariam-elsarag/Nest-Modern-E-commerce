import { useTranslations } from "next-intl";
import React from "react";

const Input_Field = ({ item, field, disabled, isInvalid }) => {
  const t = useTranslations();
  return (
    <>
      <input
        id={item?.id}
        inputMode={item?.inputMode ?? "text"}
        name={item?.name}
        type={item?.type}
        value={field.value || item.value || ""}
        disabled={disabled}
        placeholder={item?.placeholder ? t(item.placeholder) : ""}
        className={`flex-1 w-full input main_h ${isInvalid ? "invalid" : ""} ${item.inputClassName || ""}`}
        onInput={(e) => item.onInput?.(e, field)}
        autoFocus={item.autFocus}
        onChange={(e) => {
          if (item.type === "email") {
            const element = e.target.value.toLowerCase();
            field.onChange(element);
          } else {
            field.onChange(e);
          }
          if (item?.action) {
            item?.action(e?.target?.value);
          }
        }}
        min={0}
        aria-label={item?.name}
        onKeyDown={item?.onKeyDown}
        onWheel={(e) => e.currentTarget.blur()}
      />
    </>
  );
};

export default Input_Field;
