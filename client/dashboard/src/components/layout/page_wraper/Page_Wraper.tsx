import React from "react";
import type { PageHeaderProps } from "../header/page_header/Page_Header.types";
import Page_Header from "../header/page_header/Page_Header";

type PageWraperProps = PageHeaderProps & {
  children: React.ReactNode;
};
const Page_Wraper = ({ label, list, children }: PageWraperProps) => {
  return (
    <section className="page_wraper">
      <Page_Header label={label} list={list} />
      <div className="px-4 flex flex-col gap-8 pb-10 ">{children}</div>
    </section>
  );
};

export default Page_Wraper;
