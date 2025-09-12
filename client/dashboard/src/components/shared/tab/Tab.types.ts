import type React from "react";
export type TapList = {
  link_name?: string;
  name?: string;
  image?: string | null;
  badge_count?: number;
  value: string;
  link?: string;
  default?: boolean;
  fieldName?: string;
};

export type TapProps = {
  type?: "filter" | "click" | "navLink";
  list: TapList[];
  currentValue: any;
  setValue: React.Dispatch<React.SetStateAction<any>>;
  containerClassName?: string;
  loading?: boolean;
  isScroll?: boolean;
  onClick?: () => void;
};
