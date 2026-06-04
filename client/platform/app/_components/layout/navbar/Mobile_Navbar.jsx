"use client";
import Link from "next/link";
import React from "react";
import Button from "../../ui/Button";
import Image from "next/image";
import { Logo } from "../../../../app/_assets/images/Image";
import { usePathname } from "next/navigation";
import { useTranslations } from "next-intl";
import { useOutsideClick } from "@/app/_hooks/useOutsideClick";
import { menuList } from "@/app/_lib/list/menu";

const Mobile_Navbar = ({ isOpen, onClose, buttonsList }) => {
  const t = useTranslations();
  const ref = useOutsideClick(onClose);
  const pathname = usePathname();

  const normalizedPath = pathname.replace(/^\/(en|ar)/, "") || "/";
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
        <Link href="/">
          <Image src={Logo} alt="logo" height="30px" />
        </Link>
        <nav className="flex-1  flex flex-col gap-3  overflow-y-auto">
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
                }   py-2 body font-medium  transition-all ease-in-out duration-300 `}
              >
                {t(item.label)}
              </Link>
            );
          })}
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

export default Mobile_Navbar;
