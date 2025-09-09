import type { ComponentType, SVGProps } from "react";
import type React from "react";

export type SidebarListType = {
  icon: ComponentType<SVGProps<SVGSVGElement>>;
  path: string;
  title: string;
};

export type SidebarPropsType = {
  isOpen: boolean;
  setToggleSidebar: React.Dispatch<React.SetStateAction<boolean>>;
};

export type SidebarButtonsTypes = Pick<SidebarListType, "icon" | "title"> & {
  onClick?: () => void;
};
