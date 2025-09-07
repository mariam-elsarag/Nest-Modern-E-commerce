export type breadCrumbListType = {
  label: string | undefined;
  template?: () => void;
};

export type PageHeaderTypes = {
  type?: "label" | "breadCrumb";
  label?: string;
  title?: string;
  breadcrumbsList?: breadCrumbListType[];
  variant?: "primary" | "secondary" | "success" | "error";
};
