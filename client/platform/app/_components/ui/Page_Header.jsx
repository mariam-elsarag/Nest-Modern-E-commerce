import React from "react";
import { BreadCrumb } from "primereact/breadcrumb";
import { useTranslations } from "next-intl";

const Page_Header = ({
  title,
  type = "breadCrumb",
  breadcrumbsList = [],
  label,
  variant = "secondary",
}) => {
  const t = useTranslations();
  const style = {
    secondary: `bg-neutral-white-100 container py-[18px] `,
    success: `bg-semantic-green-100 container py-[18px] `,
    error: `bg-semantic-red-100 container py-[18px] `,
  };
  return (
    <header className={`  ${style[variant]} flex flex-col gap-2 `}>
      {title && (
        <h1 className="h3 text-neutral-black-900 font-bold">{t(title)}</h1>
      )}
      {type === "breadCrumb" ? (
        <BreadCrumb model={breadcrumbsList} />
      ) : (
        <span className="body font-medium text-neutral-black-900">
          {t(label)}
        </span>
      )}
    </header>
  );
};

export default Page_Header;
