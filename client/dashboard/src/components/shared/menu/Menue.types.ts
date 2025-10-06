import type React from "react";

export type MenuListTypes<T> = {
  icon?: ChildNode;
  name: string;
  textClassName?: string;
  action?: (item?: T) => void;
};
export type MenuPropsTypes<T> = {
  list: MenuListTypes<T>[];
  data?: T;
};
