import React from "react";
import type { ReviewType } from "~/common/types/Type";
import { formatDateToMonth } from "~/common/utils/formatDateToMonth";

import Avatar from "~/components/shared/avatar/Avatar";
import Rate from "~/components/shared/rate/Rate";

type ReviewItemType = {
  review: ReviewType;
};
const Review_Item = ({ review }: ReviewItemType) => {
  return (
    <div className="flex items-baseline gap-6">
      <Avatar avatar={review.avatar} fullName={review.fullName} />
      <div className="flex-1 flex flex-col gap-4">
        <header className="flex flex-col gap-2">
          <div className="flex items-center gap-2 justify-between">
            <p className="text-neutral-black-900 body font-medium line-clamp-1">
              {review?.fullName}
            </p>
            <Rate
              rate={review.rate}
              hasText={false}
              fillColor="var(--color-neutral-black-500)"
            />
          </div>
          <p className="text-neutral-black-500 label font-medium">
            {review?.createdAt ? formatDateToMonth(review?.createdAt) : "-"}
          </p>
        </header>
        <p className="text-neutral-black-500 body ">{review.review}</p>
      </div>
    </div>
  );
};

export default Review_Item;
