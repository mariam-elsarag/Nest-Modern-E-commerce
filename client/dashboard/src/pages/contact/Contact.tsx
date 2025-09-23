import React from "react";
import Page_Wraper from "../../components/layout/page_wraper/Page_Wraper";

import Table_Layout from "../../components/shared/table/Table_Layout";
import { API } from "../../services/apiUrl";
import Read_More from "../../components/shared/read_more/Read_More";
import type { ContactType } from "../../common/types/Type";
const columns = [
  {
    header: "name",
    field: "fullName",
    body: (item) => item?.fullName ?? "-",
  },
  {
    header: "email",
    field: "email",
    body: (item) => item?.email ?? "-",
  },
  {
    header: "message",
    field: "message",
    body: (item) => <Read_More text={item?.message} />,
  },
  {
    header: "action",
    field: "action",
    body: (item) => <div>kk</div>,
  },
];
const Contact = () => {
  return (
    <Page_Wraper label="contact">
      <Table_Layout<ContactType>
        hasPagination={true}
        columns={columns}
        emptyText="no_contact_messages_yet"
        endpoint={API.contact.main}
        search_placeholder="search_by_fullName_email"
      />
    </Page_Wraper>
  );
};

export default Contact;
