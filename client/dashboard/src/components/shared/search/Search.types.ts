import type React from "react";

export type SearchProps = {
  placeholder: string;
  searchLoader: boolean;
  setSearchLoader: React.Dispatch<React.SetStateAction<boolean>>;
  search: object | null;
  setSearch: React.Dispatch<React.SetStateAction<any>>;
};
