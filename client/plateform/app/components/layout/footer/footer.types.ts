export type FooterProps = {
  variant?: "primary" | "secondary";
};

type Link = {
  label: string;
  to: string;
};
export type FooterListProps = {
  title: string;
  links: Link[];
};
