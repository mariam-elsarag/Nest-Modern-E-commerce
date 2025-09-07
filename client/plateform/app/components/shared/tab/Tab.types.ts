import type { jsx } from "react/jsx-runtime";

export type ListItemProps = {
  title: string;
  to?: string;
  value?: string | number;
  default?: boolean;
  icon?:
    | React.ComponentType<React.SVGProps<SVGSVGElement>>
    | (() => jsx.Element);
};

export type TabPropsType = {
  list: ListItemProps[];
  type?: "navigation" | "filter" | "click";
  variant?: "primary" | "secondary";
  value?: string;
  setValue?: React.Dispatch<any>;
  currentValue?: string | number;
  fieldName?: string;
  isScrollable?: boolean;
  direction?: "row" | "column";
  containerClassName?: string;
};
