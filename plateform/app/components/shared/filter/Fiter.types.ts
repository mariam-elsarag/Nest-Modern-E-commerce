import type { CategoryType, ColorsType, SizesType } from "~/common/types/Type";

export type FilterListItem = {
  title: string;
  list: CategoryType[] | ColorsType[] | SizesType[];
  fieldName: string;
  type: "multiselect" | "single";
  variant: "checkbox" | "color" | "size" | "slide";
};

export type FilterPropsType = {
  data: FilterListItem[];
  filter: any;
  setFilter: (val: any) => void;
};
