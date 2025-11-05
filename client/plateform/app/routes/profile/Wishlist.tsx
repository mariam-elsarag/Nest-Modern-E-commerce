import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router";
import Spinner from "~/components/loaders/Spinner";
import Cart_Item from "~/components/shared/cart_item/Cart_Item";
import Empty from "~/components/shared/empty/Empty";
import Pagination from "~/components/shared/pagination/Pagination";

import usePaginatedData from "~/hooks/usePaginatedData";
import { API } from "~/services/apiUrl";

const Wishlist = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { data, setData, loading, page, pages, handlePagination } =
    usePaginatedData({
      endpoint: API.favorite,
    });

  return (
    <div className=" flex flex-col gap-10 ">
      <h2 className="h5 font-semibold text-neutral-black-900">
        {t("wishlist")}
      </h2>
      {loading ? (
        <div className="flex items-center justify-center h-[30vh] flex-1">
          <Spinner />
        </div>
      ) : data?.length > 0 ? (
        <div className="max-w-[617px] flex flex-col gap-10">
          <section className="flex-1 flex flex-col gap-8 ">
            {data?.map((cart) => (
              <div
                className="pb-8 border-b border-neutral-white-200"
                key={cart?.id}
              >
                <Cart_Item
                  product={cart}
                  variant="wishlist"
                  setData={setData}
                />
              </div>
            ))}
          </section>
          {data?.length > 0 && (
            <div className="flex items-center justify-center">
              <Pagination
                currentPage={page}
                pages={pages}
                onPageChange={handlePagination}
              />
            </div>
          )}
        </div>
      ) : (
        <div className="h-full flex flex-col justify-center items-center">
          <Empty
            des="empty_wishlist"
            btnName="start_shopping"
            btnCta={() => {
              navigate("/product");
            }}
          />
        </div>
      )}
    </div>
  );
};

export default Wishlist;
