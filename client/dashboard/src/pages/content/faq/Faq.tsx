import React from "react";
import Page_Wraper from "../../../components/layout/page_wraper/Page_Wraper";
import Page_Title from "../../../components/layout/header/page_title/Page_Title";
import { currentLanguageCode } from "../../../common/utils/switchLang";
import Read_More from "../../../components/shared/read_more/Read_More";
import { API } from "../../../services/apiUrl";
import Table_Layout from "../../../components/shared/table/Table_Layout";
import type { FaqType } from "../../../common/types/Type";
import Button from "../../../components/shared/button/Button";

const columns = [
  {
    header: "answer",
    field: "answer",
    body: (item) =>
      currentLanguageCode === "en"
        ? item?.answer ?? "-"
        : item?.answer_ar ?? "-",
  },
  {
    header: "question",
    field: "question",
    body: (item) => (
      <Read_More
        text={currentLanguageCode === "en" ? item?.question : item?.question_ar}
      />
    ),
  },
  {
    header: "action",
    field: "action",
    body: (item) => <div>kk</div>,
  },
];
const Faq = () => {
  return (
    <>
      <Table_Layout<FaqType>
        hasPagination={true}
        columns={columns}
        emptyText="no_faq_yet"
        endpoint={API.website.faq}
        title="faq"
      >
        <Button text="add_faq" to="/website/faq/create" />
      </Table_Layout>
    </>
  );
};

export default Faq;
