import React, { useState } from "react";
import { Link, NavLink } from "react-router";
import {
  CartIcon,
  LanguageIcon,
  MenuIcon,
  UserIcon,
} from "~/assets/icons/Icon";
import { Logo } from "~/assets/images/Image";
import { menuList } from "~/common/lists/list";
import Button from "~/components/shared/button/Button";
import type { MobileNavbarProps } from "./Navbar.types";
import useOutsideClick from "~/hooks/useOutsideClick";
import { useTranslation } from "react-i18next";
import { switchLang } from "~/common/utils/switchLang";
import { useAuth } from "~/context/Auth_Context";
const buttonsList = [
  { text: "login", variant: "outline", to: "/login" },
  { text: "create_account", variant: "primary", to: "/register" },
] as const;
const userList = [
  {
    icon: <CartIcon />,
    to: "/cart",
  },
  { icon: <UserIcon />, to: "/profile/order" },
];

const Navbar = () => {
  const { t } = useTranslation();
  const [toggleNavbar, setToggleNavbar] = useState(false);
  const { user, token } = useAuth();
  const isUser = user.role === "user" || token;
  return (
    <>
      <header className="container bg-white py-5 flex items-center gap-2 justify-between ">
        <Link to="/">
          <img src={Logo} alt="logo" className="h-[38px]" />
        </Link>

        <nav className="hidden md:flex items-center gap-8 ">
          {menuList?.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `${
                  isActive
                    ? " text-neutral-black-900"
                    : "text-neutral-black-500"
                }   flex items-center justify-center text-center body font-medium  transition-all ease-in-out duration-300 `
              }
            >
              {t(item.label)}
            </NavLink>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          {isUser ? (
            <div className="flex items-center gap-2">
              {userList?.map((btn) => (
                <Button
                  to={btn.to}
                  variant="tertiery"
                  size="sm"
                  hasHover={false}
                  icon={btn.icon}
                  className="!px-0 !w-[38px]"
                />
              ))}
            </div>
          ) : (
            <div className="hidden md:flex items-center gap-2">
              {buttonsList?.map((btn) => (
                <Button
                  to={btn.to}
                  key={btn.to}
                  variant={btn.variant}
                  text={btn.text}
                  size="sm"
                />
              ))}
            </div>
          )}
          <Button
            icon={<LanguageIcon width="20" height="20" />}
            variant="tertiery"
            size="sm"
            hasHover={false}
            handleClick={switchLang}
          />
          <Button
            icon={<MenuIcon width="22" height="22" />}
            variant="outline"
            size="xs"
            className="md:hidden"
            handleClick={() => {
              setToggleNavbar((pre) => !pre);
            }}
          />
        </div>
      </header>
      <Mobile_Navbar
        isOpen={toggleNavbar}
        onClose={() => setToggleNavbar(false)}
      />
    </>
  );
};
const Mobile_Navbar = ({ isOpen, onClose }: MobileNavbarProps) => {
  const { t } = useTranslation();
  const ref = useOutsideClick(onClose);

  return (
    <div
      className={`flex md:hidden ${
        isOpen ? "  fixed inset-0 bg-black/10 h-full z-30" : "hidden"
      } `}
    >
      <aside
        ref={ref}
        className={`fixed top-0 start-0 h-dvh transition-all ease-in-out duration-300  bg-white w-[260px] rounded-r-2xl py-10 px-4 flex flex-col justify-between gap-10 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } `}
      >
        <Link to="/" onClick={onClose}>
          <img src={Logo} alt="logo" className="h-[30px]" />
        </Link>
        <nav className="flex-1  flex flex-col gap-3  overflow-y-auto">
          {menuList?.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `${
                  isActive
                    ? " text-neutral-black-900"
                    : "text-neutral-black-500"
                }   py-2 body font-medium  transition-all ease-in-out duration-300 `
              }
            >
              {t(item.label)}
            </NavLink>
          ))}
        </nav>
        <footer className="flex flex-col items-center gap-3">
          {buttonsList?.map((btn) => (
            <Button
              to={btn.to}
              handleClick={onClose}
              key={btn.to}
              variant={btn.variant}
              text={btn.text}
              hasFullWidth
              round="lg"
            />
          ))}
        </footer>
      </aside>
    </div>
  );
};
export default Navbar;
