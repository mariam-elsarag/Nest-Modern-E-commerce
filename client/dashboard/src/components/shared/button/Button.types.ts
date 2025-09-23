export type ButtonProps = {
  to?: string;
  text?: string | null;
  icon?: React.ReactNode;
  iconDirection?: "right" | "left";
  round?: "sm" | "lg" | "full";
  size?: "xxs" | "xs" | "sm" | "lg" | "md";
  variant?:
    | "primary"
    | "outline"
    | "secondary"
    | "outline_dark"
    | "tertiery"
    | "tertiery_error";
  type?: "submit" | "button";
  loading?: boolean;
  hasFullWidth?: boolean;
  isCenterd?: boolean;
  hasHover?: boolean;
  disabled?: boolean;
  handleClick?: () => void;
  className?: string;
};
