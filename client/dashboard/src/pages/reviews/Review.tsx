import React from "react";
import Page_Wraper from "../../components/layout/page_wraper/Page_Wraper";
import Avatar from "../../components/shared/avatar/Avatar";
import Read_More from "../../components/shared/read_more/Read_More";
import Table_Layout from "../../components/shared/table/Table_Layout";
import type { ReviewType } from "../../common/types/Type";
import { API } from "../../services/apiUrl";

const columns = [
  {
    header: "name",
    field: "user",
    body: (item) => (
      <div className="truncate flex items-center gap-6">
        <Avatar avatar={item?.user?.avatar} fullName={item?.user?.fullName} />
        <span>{item?.user?.fullName}</span>
      </div>
    ),
  },
  {
    header: "review",
    field: "review",
    body: (item) => <Read_More text={item?.review} />,
  },
  {
    header: "action",
    field: "action",
    body: (item) => <div>kk</div>,
  },
];
const Review = () => {
  return (
    <Page_Wraper label="reviews">
      <Table_Layout<ReviewType>
        hasPagination={true}
        columns={columns}
        emptyText="no_reviews_yet"
        endpoint={API.review.list}
        search_placeholder="search_review"
      />
    </Page_Wraper>
  );
};

export default Review;
