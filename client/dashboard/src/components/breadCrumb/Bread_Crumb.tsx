import React from "react";
import type { BreadCrumbProps } from "./Bread_Crumb.types";
import { BreadCrumb } from "primereact/breadcrumb";
import { useTranslation } from "react-i18next";

const Bread_Crumb = ({ label, list }: BreadCrumbProps) => {
  const { t } = useTranslation();
  return (
    <div>
      {" "}
      {list?.length > 0 ? (
        <BreadCrumb model={list} />
      ) : label ? (
        <span className="body font-medium text-neutral-black-900">
          {t(label)}
        </span>
      ) : null}
    </div>
  );
};

export default Bread_Crumb;
