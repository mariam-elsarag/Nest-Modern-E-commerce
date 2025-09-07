export type PaginationPropsType = {
  currentPage: number;
  pages: number;
  siblingCount?: number;
  onPageChange: (n: number) => void;
};
