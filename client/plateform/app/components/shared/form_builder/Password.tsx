import React from "react";
import type { FormListItemType } from "./Form_Builder-types";
import { Link } from "react-router";
import { useTranslation } from "react-i18next";
import { InfoIcon } from "~/assets/icons/Icon";

type PasswordPropsType = {
  value: string;
  disabled?: boolean;
  isInvalid?: boolean;
  handleChange: (e: React.ChangeEvent) => void;
  item: FormListItemType;
  error: Error | any;
};
const Password = ({
  value,
  disabled,
  isInvalid,
  item,
  error,
  handleChange,
}: PasswordPropsType) => {
  const { t } = useTranslation();
  return (
    <div
      className={`flex flex-col ${item?.inlineError || item?.showForgetPassword ? "gap-4" : ""} `}
    >
      <input
        id={item?.id}
        inputMode="text"
        name={item?.name}
        type="password"
        disabled={disabled}
        value={value}
        className={`flex-1 w-full input main_h ${isInvalid ? "invalid" : ""} ${item.inputClassName || ""}`}
        onChange={(e) => handleChange(e)}
      />
      <div className="felx flex-col gap-1">
        {error && item?.inlineError && (
          <p className="flex items-center gap-1">
            <span>
              <InfoIcon
                width="20"
                height="20"
                fill={item?.errorFill ?? "var(--color-semantic-red-900)"}
              />
            </span>
            <span
              className={`text-semantic-red-900 text-xs ${
                item?.errorClassName ?? ""
              }`}
            >
              {t(error)}
            </span>
          </p>
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

export default Password;
