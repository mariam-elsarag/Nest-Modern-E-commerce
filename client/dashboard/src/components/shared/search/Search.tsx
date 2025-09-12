import React, { useState } from "react";
import type { SearchProps } from "./Search.types";
import { SearchIcon } from "../../../assets/icons/Icon";
import { useTranslation } from "react-i18next";
import Spinner from "../loaders/Spinner";

const Search = ({
  placeholder,
  setSearchLoader,
  searchLoader,
  search,
  setSearch,
}: SearchProps) => {
  const { t } = useTranslation();
  const [searchText, setSearchText] = useState("");

  const handleSearch = () => {
    if ((search && Object.keys(search).length > 0) || searchText !== "") {
      if (search?.search !== "" || searchText !== "") {
        if (search?.search !== searchText) {
          setSearchLoader(true);
          setSearch((prev) => ({ ...prev, search: searchText }));
        }
      }
    }
  };
  return (
    <div
      className={`w-[242px] border border-neutral-black-100 py-2 px-4 h-[40px] rounded-[6px] flex items-center gap-2`}
    >
      {searchLoader ? (
        <Spinner />
      ) : (
        <span
          role="button"
          className={
            ((search && Object.keys(search).length > 0) || searchText !== "") &&
            search?.search !== searchText
              ? "cursor-pointer"
              : ""
          }
          onClick={handleSearch}
        >
          <SearchIcon fill="var(--color-neutral-black-500)" />
        </span>
      )}
      <input
        className="flex-1 w-full outline-0 shadow-none placeholder:text-neutral-black-300 text-neutral-black-500 body font-medium"
        placeholder={t(placeholder)}
        value={searchText}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            handleSearch();
          }
        }}
        onChange={(e) => {
          setSearchText(e.target.value);
        }}
      />
    </div>
  );
};

export default Search;
