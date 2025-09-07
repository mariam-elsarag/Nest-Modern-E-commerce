import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import type { Product, ReviewType } from "~/common/types/Type";
import Button from "~/components/shared/button/Button";
import usePaginatedData from "~/hooks/usePaginatedData";
import { API } from "~/services/apiUrl";
import Review_Item from "./Review_Item";
import Modal from "~/components/shared/modal/Modal";
import Review_Form from "./Review_Form";

type ReviewProps = {
  product: Product | undefined;
};

const Reviews = ({ product }: ReviewProps) => {
  const { t } = useTranslation();
  const [toggleReviewModal, setToggleReviewModal] = useState(false);
  const { data, loading, error, setQuery } = usePaginatedData<ReviewType>({
    endpoint: `${API.reviews}`,
  });
  const [reviews, setReviews] = useState<ReviewType[]>([]);
  useEffect(() => {
    if (product?.id) {
      setQuery({ productId: product.id });
    }
  }, [product?.id]);

  useEffect(() => {
    if (data) {
      setReviews(data.filter((review) => review.productId == product?.id));
    }
  }, [data, product?.id]);

  return (
    <>
      <section className="flex flex-col gap-6">
        <header className="flex flex-col gap-10 pb-4 border-b border-neutral-white-200">
          <div className="flex flex-col gap-4">
            <h5 className="text-neutral-black-900 h5 font-semibold">
              {t("reviews")}
            </h5>
            <p className="flex items-center gap-4 text-neutral-black-400 body">
              <strong className="h2 font-bold text-neutral-black-900">
                {product?.rate}
              </strong>
              {t("reviews")}
            </p>
          </div>
          <Button
            text="write_review"
            variant="outline_dark"
            handleClick={() => setToggleReviewModal(true)}
          />
        </header>
        {reviews?.map((review, index) => (
          <Review_Item review={review} key={index} />
        ))}
      </section>
      <Modal
        open={toggleReviewModal}
        onClose={() => setToggleReviewModal(false)}
        title="write_review"
      >
        <Review_Form
          productId={product?.id}
          setReviews={setReviews}
          onclose={() => setToggleReviewModal(false)}
        />
      </Modal>
    </>
  );
};

export default Reviews;
