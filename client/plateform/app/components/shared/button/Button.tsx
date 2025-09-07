import { useNavigate } from "react-router";
import type { ButtonProps } from "./Button.types";
import Spinner from "~/components/loaders/Spinner";
import { useTranslation } from "react-i18next";

const Button = ({
  to,
  text,
  icon,
  iconDirection = "right",
  variant = "primary",
  type = "button",
  loading,
  hasFullWidth = false,
  handleClick,
  isCenterd = true,
  disabled = false,
  hasHover = true,
  round = "sm",
  size = "lg",
  className,
}: ButtonProps) => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const base = `
    ${hasFullWidth ? "w-full" : "w-fit"}
    flex items-center gap-2 body font-medium  transition-all ease-in-out duration-300
    ${isCenterd && "justify-center text-center"}
   ${loading || disabled ? "cursor-default" : "cursor-pointer"}
  ${disabled ? "!bg-neutral-black-100 !text-neutral-black-200" : ""} `;
  const radious = {
    sm: "rounded-[4px]",
    lg: "rounded-lg",
    full: "rounded-full",
  };
  const sizes = {
    xs: "!h-[30px] !w-[30px]",
    sm: "h-[38px] px-4 py-3 px-4",
    md: "!w-10 !h-10",
    lg: "main_h py-3 px-5 md:px-6",
  };
  const styles = {
    primary: `bg-neutral-black-900 text-white ${hasHover ? "hover:bg-neutral-black-800" : ""}`,
    secondary: "bg-neutral-white-100 text-neutral-black-500",
    outline: `bg-white border border-neutral-black-200 text-neutral-black-500  ${hasHover ? "hover:text-neutral-black-900" : ""}`,
    tertiery: `bg-white text-neutral-black-800 ${hasHover ? "hover:bg-neutral-white-100" : ""}`,
    outline_dark:
      "bg-white border border-neutral-black-900 text-neutral-black-900 ",
  };

  return (
    <button
      type={type}
      className={`${base} ${className ?? ""} ${styles[variant]} ${radious[round]} ${sizes[size]} `}
      disabled={loading || disabled}
      onClick={() => {
        if (to) navigate(to);
        if (handleClick) handleClick();
      }}
    >
      {iconDirection === "left" && (loading ? <Spinner /> : icon)}
      {text && <span>{t(text)}</span>}
      {iconDirection === "right" && (loading ? <Spinner /> : icon)}
    </button>
  );
};

export default Button;
