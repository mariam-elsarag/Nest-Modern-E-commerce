"use client";
import { EyeOffIcon, EyeOnIcon, InfoIcon } from "@/app/_assets/icons/Icon";
import Link from "next/link";
import React, { useState } from "react";
import Error_Message from "./Error_Message";

const Password_Field = ({ item, disabled, isInvalid, field, error }) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div
      className={`flex flex-col  ${item?.inlineError || item?.showForgetPassword ? "gap-4" : ""} `}
    >
      <div
        className={` input main_h ${isInvalid ? "invalid" : ""} ${item.inputClassName || ""}`}
      >
        <input
          id={item?.id}
          inputMode="text"
          name={item?.name}
          type="password"
          disabled={disabled}
          value={field.value || item.value || ""}
          className={`flex-1 w-full disabled_outline_shadow`}
          onChange={(e) => {
            field.onChange(e);
            if (item?.action) {
              item?.action?.(e);
            }
          }}
        />

        <button
          role="button"
          type="button"
          className={` disabled_outline_shadow cursor-pointer icon ${
            showPassword ? "stroke" : "fill"
          }`}
          onClick={() => setShowPassword((pre) => !pre)}
        >
          {showPassword ? <EyeOnIcon /> : <EyeOffIcon />}
        </button>
      </div>
      <div className="felx flex-col gap-1">
        {isInvalid && item?.inlineError && (
          <Error_Message item={item} error={isInvalid} />
        )}
        {item?.showForgetPassword && (
          <Link
            className="text-neutral-black-500 label font-medium  flex  justify-end "
            to="/forget-password"
          >
            {t("_forget_password")}
          </Link>
        )}
      </div>
    </div>
  );
};

export default Password_Field;
