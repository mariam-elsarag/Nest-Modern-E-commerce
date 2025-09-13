export type BreadCrumbListType = {
  label: string | undefined;
  template?: () => void;
};

export type BreadCrumbProps = {
  label?: string;
  list?: BreadCrumbListType[];
};
