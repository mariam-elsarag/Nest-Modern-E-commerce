import React from "react";
import type { BadgePropsType } from "./Badge.types";
import { useTranslation } from "react-i18next";

const Badge = ({ variant = "primary", label, icon }: BadgePropsType) => {
  const { t } = useTranslation();
  const style = {
    primary: "border border-neutral-black-100 text-neutral-black-900 ",
    secondary: "border border-neutral-white-100 bg-neutral-white-100",
  };
  return (
    <span
      className={`${style[variant]} px-4 py-1.5 rounded-full text-neutral-black-500 label font-medium flex items-center justify-center text-center  gap-2`}
    >
      {icon && icon}
      {t(label)}
    </span>
  );
};

export default Badge;
