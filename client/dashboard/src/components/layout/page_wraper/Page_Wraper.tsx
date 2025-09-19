import type { BreadCrumbProps } from "primereact/breadcrumb";
import React from "react";
import Bread_Crumb from "../../breadCrumb/Bread_Crumb";

type PageWraperProps = BreadCrumbProps & {
  children: React.ReactNode;
  containerClassName?: string;
};
const Page_Wraper = ({
  label,
  list,
  children,
  containerClassName,
}: PageWraperProps) => {
  return (
    <section className="page_wraper px-4 pb-10 flex-1 ">
      {(label || list?.length > 0) && <Bread_Crumb label={label} list={list} />}
      <div className={` flex flex-col gap-6   ${containerClassName ?? ""} `}>
        {children}
      </div>
    </section>
  );
};

export default Page_Wraper;
