import { ChevronIcon } from "../../../assets/icons/Icon";
import { currentLanguageCode } from "../../../common/utils/switchLang";
import { DOTS, usePagination } from "../../../hooks/usePagination";
import type { PaginationPropsType } from "./Pagination.types";

const Pagination = ({
  currentPage,
  pages,
  onPageChange,
  siblingCount = 1,
}: PaginationPropsType) => {
  const paginationRange = usePagination({
    currentPage,
    pages,
    siblingCount,
  });
  if (currentPage === 0) {
    return null;
  }
  const onNext = () => {
    if (pages > currentPage) {
      onPageChange(currentPage + 1 < pages ? currentPage + 1 : pages);
    }
  };

  const onPrevious = () => {
    if (currentPage !== 1) {
      onPageChange(currentPage - 1 > 1 ? currentPage - 1 : 1);
    }
  };
  let lastPage = paginationRange
    ? paginationRange[paginationRange.length - 1]
    : 1;

  return (
    <div className="flex items-center justify-center gap-2">
      {" "}
      <button
        className={` outline-0 shadow-none ${
          currentPage === 1 ? "cursor-default" : "cursor-pointer"
        } flex items-center justify-center w-10 h-10 `}
        onClick={onPrevious}
      >
        <span className={currentLanguageCode === "en" ? "" : "rotate-180"}>
          <ChevronIcon
            width="24"
            height="24"
            fill={
              currentPage === 1
                ? "var(--color-neutral-black-200)"
                : "var(--color-neutral-black-500)"
            }
          />
        </span>
      </button>
      {paginationRange?.map((pageNumber, index) => {
        if (pageNumber === DOTS) {
          return (
            <div
              key={index}
              className="flex items-center justify-center w-8 h-8 rounded-lg dots"
            >
              <svg
                width="13"
                height="4"
                viewBox="0 0 13 4"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M2.178 3.126C1.806 3.126 1.494 3 1.242 2.748C0.99 2.496 0.864 2.184 0.864 1.812C0.864 1.44 0.99 1.128 1.242 0.876C1.494 0.624 1.806 0.498 2.178 0.498C2.538 0.498 2.844 0.624 3.096 0.876C3.348 1.128 3.474 1.44 3.474 1.812C3.474 2.184 3.348 2.496 3.096 2.748C2.844 3 2.538 3.126 2.178 3.126ZM6.5198 3.126C6.1478 3.126 5.8358 3 5.5838 2.748C5.3318 2.496 5.2058 2.184 5.2058 1.812C5.2058 1.44 5.3318 1.128 5.5838 0.876C5.8358 0.624 6.1478 0.498 6.5198 0.498C6.8798 0.498 7.1858 0.624 7.4378 0.876C7.6898 1.128 7.8158 1.44 7.8158 1.812C7.8158 2.184 7.6898 2.496 7.4378 2.748C7.1858 3 6.8798 3.126 6.5198 3.126ZM10.8616 3.126C10.4896 3.126 10.1776 3 9.92559 2.748C9.67359 2.496 9.54759 2.184 9.54759 1.812C9.54759 1.44 9.67359 1.128 9.92559 0.876C10.1776 0.624 10.4896 0.498 10.8616 0.498C11.2216 0.498 11.5276 0.624 11.7796 0.876C12.0316 1.128 12.1576 1.44 12.1576 1.812C12.1576 2.184 12.0316 2.496 11.7796 2.748C11.5276 3 11.2216 3.126 10.8616 3.126Z"
                  fill="var(--color-neutral-black-900)"
                />
              </svg>
            </div>
          );
        }

        return (
          <div
            key={index}
            className={`body font-normal    transition-all ease-in-out duration-300 flex items-center justify-center w-8 h-8 rounded-lg ${
              pageNumber === currentPage
                ? "bg-neutral-white-100 text-neutral-black-900"
                : "cursor-pointer text-neutral-black-900"
            }`}
            onClick={() => onPageChange(pageNumber)}
          >
            {pageNumber}
          </div>
        );
      })}
      <button
        className={`outline-none shadow-none ${
          currentPage === lastPage ? "cursor-default" : "cursor-pointer"
        } flex items-center justify-center w-8 h-8 rounded-lg `}
        onClick={onNext}
      >
        <span className={currentLanguageCode === "en" ? "rotate-180" : ""}>
          <ChevronIcon
            width="24"
            height="24"
            fill={
              currentPage === lastPage
                ? "var(--color-neutral-black-200)"
                : "var(--color-neutral-black-500)"
            }
          />
        </span>
      </button>
    </div>
  );
};

export default Pagination;
