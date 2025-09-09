export type BreadCrumbListType = {
  label: string | undefined;
  template?: () => void;
};

export type PageHeaderProps = {
  label?: string;
  list?: BreadCrumbListType[];
};
