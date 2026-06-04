import { useTranslations } from "next-intl";
import React from "react";

const Badge = ({ variant = "primary", label, icon, localizaition = true }) => {
  const t = useTranslations();
  const style = {
    primary: "border border-neutral-black-100 text-neutral-black-900 ",
    secondary: "border border-neutral-white-100 bg-neutral-white-100",
    error: "bg-semantic-red-100 text-semantic-red-900",
  };
  return (
    <span
      className={`${style[variant]} px-4 py-1.5 rounded-full text-neutral-black-500 label font-medium flex items-center justify-center text-center  gap-2`}
    >
      {icon && icon}
      {localizaition ? t(label) : label}
    </span>
  );
};

export default Badge;
