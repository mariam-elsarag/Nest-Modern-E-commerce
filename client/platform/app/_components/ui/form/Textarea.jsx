import React from "react";

const Textarea = ({ item, field, isInvalid, disabled }) => {
  return (
    <>
      <textarea
        id={item?.id}
        name={item?.name}
        value={field.value || item.value || ""}
        disabled={disabled}
        placeholder={item.placeholder ? t(item.placeholder) : ""}
        className={`flex-1 w-full input resize-none h-[128px] ${isInvalid ? "invalid" : ""} ${item.inputClassName || ""}`}
        autoFocus={item.autFocus}
        onChange={(e) => {
          field.onChange(e);
          if (item?.action) {
            item?.action?.(e);
          }
        }}
      />
    </>
  );
};

export default Textarea;
