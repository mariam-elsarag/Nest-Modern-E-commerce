"use client";
import {
  CartIcon,
  LanguageIcon,
  MenuIcon,
  UserIcon,
} from "../../../../app/_assets/icons/Icon";
import { useTranslations } from "next-intl";
import Image from "next/image";
import Link from "next/link";
import Button from "../../ui/Button";
import LanguageSwitcher from "../../ui/LanguageSwitcher";
import Mobile_Navbar from "./Mobile_Navbar";
import { Logo } from "../../../../app/_assets/images/Image";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { useAuth } from "@/app/_context/AuthContext";
import { menuList } from "@/app/_lib/list/menu";

const buttonsList = [
  { text: "login", variant: "outline", to: "/login" },
  { text: "create_account", variant: "primary", to: "/register" },
];
const userList = [
  {
    icon: <CartIcon />,
    to: "/cart",
  },
  { icon: <UserIcon />, to: "/profile/order" },
];

const Navbar = () => {
  const t = useTranslations();
  const pathname = usePathname();

  const [toggleNavbar, setToggleNavbar] = useState(false);
  const { user, token } = useAuth();
  const isUser = user.role === "user" || token;

  const normalizedPath = pathname.replace(/^\/(en|ar)/, "") || "/";
  return (
    <>
      <header className="container bg-white py-5 flex items-center gap-2 justify-between ">
        <Link href="/">
          <Image src={Logo} alt="logo" height="38px" />
        </Link>

        <nav className="hidden md:flex items-center gap-8 ">
          {menuList?.map((item) => {
            const isActive =
              normalizedPath === item.to ||
              normalizedPath.startsWith(`${item.to}/`);
            return (
              <Link
                key={item.to}
                href={item.to}
                className={`${
                  isActive
                    ? " text-neutral-black-900"
                    : "text-neutral-black-500"
                }   flex items-center justify-center text-center body font-medium  transition-all ease-in-out duration-300 `}
              >
                {t(item.label)}
              </Link>
            );
          })}
        </nav>
        <div className="flex items-center gap-2">
          {isUser ? (
            <div className="flex items-center gap-2">
              {userList?.map((btn) => (
                <Button
                  key={btn?.to}
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
          <LanguageSwitcher />
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
        buttonsList={buttonsList}
      />
    </>
  );
};
export default Navbar;
