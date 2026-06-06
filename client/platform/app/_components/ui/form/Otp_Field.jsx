"use client";
import React from "react";
import { InputOtp } from "primereact/inputotp";

const Otp_Field = ({ field, item, isInvalid, disabled }) => {
  return (
    <div dir="ltr">
      <InputOtp
        value={field?.value}
        onChange={(e) => {
          field.onChange(e.value);
        }}
        disabled={disabled}
        integerOnly
        className="otp"
        length={6}
        inputProps={{ autoComplete: "off" }}
        invalid={isInvalid}
      />
    </div>
  );
};

export default Otp_Field;
