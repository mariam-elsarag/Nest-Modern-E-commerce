import React from "react";
import type { BadgeProps } from "./Badge.types";
import { useTranslation } from "react-i18next";

const Badge = ({ type = "default", text }: BadgeProps) => {
  const { t } = useTranslation();
  const base = `rounded-full flex items-center justify-center w-fit px-4 py-[3px] body font-normal`;
  const variant = {
    primary: "bg-semantic-blue-100 text-primary-900",
    pending: "bg-semantic-yellow-100 text-semantic-yellow-800",
    warning: "bg-semantic-yellow-100 text-semantic-yellow-800",
    error: "bg-semantic-red-100 text-semantic-red-900",
    success: "bg-semantic-green-100 text-semantic-green-900",
    default: "bg-neutral-white-100 text-neutral-black-500",
  };
  return <span className={`${base} ${variant[type]}`}>{t(text)}</span>;
};

export default Badge;
