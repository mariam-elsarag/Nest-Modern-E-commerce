import type { BreadCrumbProps } from "primereact/breadcrumb";
import React from "react";
import Bread_Crumb from "../../breadCrumb/Bread_Crumb";
import Button from "../../shared/button/Button";

type PageWraperProps = BreadCrumbProps & {
  children: React.ReactNode;
  containerClassName?: string;
  hasBtn?: boolean;
  btnName?: string;
  btnCta?: () => void;
};
const Page_Wraper = ({
  label,
  list,
  children,
  containerClassName,
  hasBtn,
  btnName,
  btnCta,
}: PageWraperProps) => {
  return (
    <section className="page_wraper  pb-10 flex-1 ">
      <header className="flex items-center justify-between gap-2">
        {(label || list?.length > 0) && (
          <Bread_Crumb label={label} list={list} />
        )}

        {hasBtn && <Button text={btnName} handleClick={btnCta} />}
      </header>
      <div className={` flex flex-col gap-6   ${containerClassName ?? ""} `}>
        {children}
      </div>
    </section>
  );
};

export default Page_Wraper;
