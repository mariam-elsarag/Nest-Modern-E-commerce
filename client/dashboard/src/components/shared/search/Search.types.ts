import type React from "react";

export type SearchProps = {
  placeholder: string;
  searchLoader: boolean;
  setSearchLoader: React.Dispatch<React.SetStateAction<boolean>>;
  search: object;
  setSearch: React.Dispatch<React.SetStateAction<any>>;
};
