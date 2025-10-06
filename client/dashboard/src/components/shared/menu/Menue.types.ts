import type React from "react";

export type MenuListTypes = {
  icon?: ChildNode;
  name: string;
  textClassName?: string;
  action?: () => void;
};
export type MenuPropsTypes = {
  list: MenuListTypes[];
};
