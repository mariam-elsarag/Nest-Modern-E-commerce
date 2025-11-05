import React, { type JSX } from "react";
import { useTranslation } from "react-i18next";
import { NavLink } from "react-router";
import {
  CartIcon,
  DeliveryIcon,
  FavoriteIcon,
  KeyIcon,
  LogoutIcon,
  UserIcon,
} from "~/assets/icons/Icon";
import Button from "~/components/shared/button/Button";
import { useAuth } from "~/context/Auth_Context";
type AsideListItem = {
  id: number;
  icon: React.ElementType;
  label: string;
  link?: string;
  action?: () => void;
};

const Profile_Aside = ({ toggleSm, setToggleSm }) => {
  const { t } = useTranslation();
  const { logout } = useAuth();
  const asideList: AsideListItem[] = [
    {
      id: 1,
      icon: CartIcon,
      label: "orders",
      link: "/profile/order",
    },
    {
      id: 2,
      icon: FavoriteIcon,
      label: "wishlist",
      link: "/profile/wishlist",
    },
    {
      id: 3,
      icon: DeliveryIcon,
      label: "address",
      link: "/profile/address",
    },
    {
      id: 4,
      icon: KeyIcon,
      label: "password",
      link: "/profile/password",
    },
    {
      id: 5,
      icon: UserIcon,
      label: "account_details",
      link: "/profile/account",
    },
    {
      id: 6,
      icon: LogoutIcon,
      label: "logout",
      action() {
        console.log("log");
        logout();
      },
    },
  ];
  return (
    <aside
      className={` ${toggleSm ? "hidden sm:flex" : "flex"} sm:border-r border-neutral-black-200 sm:pe-6 lg:pe-10  flex-col gap-6 `}
    >
      {asideList?.map((nav) => {
        const IconComponent = nav?.icon;
        return nav?.link ? (
          <NavLink key={nav.id} to={nav.link} onClick={() => setToggleSm(true)}>
            {({ isActive }) => (
              <span
                className={`${
                  isActive
                    ? " sm:text-neutral-black-900 sm:bg-neutral-white-100 "
                    : "sm:text-neutral-black-500"
                } hover:bg-neutral-white-100   flex items-center gap-3 px-6 py-2 body font-medium transition-all ease-in-out duration-300 rounded-lg`}
              >
                <span className="flex items-center justify-center w-6 h-6">
                  <IconComponent
                    stroke={
                      isActive
                        ? "var(--color-neutral-black-900)"
                        : "var(--color-neutral-black-500)"
                    }
                    fill={
                      nav?.label != "wishlist"
                        ? isActive
                          ? "var(--color-neutral-black-900)"
                          : "var(--color-neutral-black-500)"
                        : isActive
                          ? "var(--color-neutral-white-100)"
                          : "white"
                    }
                  />
                </span>
                <span>{t(nav.label)}</span>
              </span>
            )}
          </NavLink>
        ) : (
          <Button
            variant="tertiery"
            key={nav?.id}
            icon={<IconComponent />}
            text={nav?.label}
            iconDirection="left"
            className={` !gap-3 !text-neutral-black-500 !rounded-lg `}
            hasFullWidth={true}
            isCenterd={false}
            handleClick={nav.action}
          />
        );
      })}
    </aside>
  );
};

export default Profile_Aside;
