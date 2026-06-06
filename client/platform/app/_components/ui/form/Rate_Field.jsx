import React from "react";
import Rate from "../Rate";

const Rate_Field = ({ field, item }) => {
  return (
    <>
      <Rate
        rate={field.value || item.value || ""}
        fillColor={item?.fillColor}
        onChange={(e) => {
          field.onChange(e);
        }}
        changeValue
        hasText={false}
        hasError={isInvalid}
      />
    </>
  );
};

export default Rate_Field;
