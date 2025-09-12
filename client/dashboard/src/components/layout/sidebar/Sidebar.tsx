import {
  CartIcon,
  DashboardIcon,
  GearIcon,
  LanguageIcon,
  LogoutIcon,
  ProductIcon,
  StarIcon,
  UsersIcon,
} from "../../../assets/icons/Icon";
import type {
  SidebarButtonsTypes,
  SidebarListType,
  SidebarPropsType,
} from "./Sidebar.types";
import { Link, NavLink } from "react-router-dom";
import { Logo } from "../../../assets/images/Images";
import { useTranslation } from "react-i18next";
import { useAuth } from "../../../context/Auth_Context";
import {
  currentLanguageCode,
  switchLang,
} from "../../../common/utils/switchLang";
import Button from "../../shared/button/Button";
import useOutsideClick from "../../../hooks/useOutsideClick";

const sidebarList: SidebarListType[] = [
  {
    icon: DashboardIcon,
    path: "/",
    title: "dashboard",
  },
  {
    icon: ProductIcon,
    path: "products",
    title: "products",
  },
  {
    icon: CartIcon,
    path: "orders",
    title: "orders",
  },
  {
    icon: UsersIcon,
    path: "users",
    title: "users",
  },
  {
    icon: StarIcon,
    path: "reviews",
    title: "reviews",
  },
  {
    icon: GearIcon,
    path: "settings",
    title: "settings",
  },
] as const;

const Sidebar = ({ isOpen, setToggleSidebar }: SidebarPropsType) => {
  const { t } = useTranslation();
  const { logout } = useAuth();
  const closeSidebar = () => setToggleSidebar(false);
  const sideRef = useOutsideClick(closeSidebar);

  const buttonsList: SidebarButtonsTypes[] = [
    { icon: <LanguageIcon />, title: "lng", onClick: () => switchLang() },
    {
      icon: (
        <span className={currentLanguageCode === "en" ? "rotate-180" : ""}>
          <LogoutIcon />
        </span>
      ),
      title: "logout",
      onClick: () => {
        logout();
      },
    },
  ] as const;
  return (
    <aside
      className={`${
        isOpen ? "fixed md:relative inset-0  backdrop-blur-[6px] z-50 " : ""
      }`}
    >
      <div
        ref={sideRef}
        className={`bg-white shadow_sm w-[260px] ${
          isOpen
            ? `flex translate-x-0 `
            : `${
                currentLanguageCode === "en"
                  ? "-translate-x-full"
                  : "translate-x-full"
              } md:translate-x-0`
        } flex flex-col transition-all ease-in-out duration-300 justify-between gap-5 px-5 pb-6 border border-neutral-white-900 h-dvh overflow-auto fixed min-h-[600px] start-0 `}
      >
        <header className="min-h-[72px] flex items-center justify-center">
          <Link to="/" className="flex items-center justify-center text-center">
            <img src={Logo} alt="logo" className="h-10 " />
          </Link>
        </header>
        <nav className="flex-1 flex flex-col gap-4 ">
          {sidebarList?.map((item) => {
            const IconComponent = item?.icon;

            return (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  `rounded-lg h-[40px] flex items-center gap-2.5 ${
                    isActive
                      ? "text-neutral-black-900 bg-neutral-white-100"
                      : "text-neutral-black-500"
                  } py-2 px-6 body font-medium transition-all ease-in-out duration-300`
                }
              >
                {({ isActive }) => (
                  <>
                    <span>
                      <IconComponent
                        fill={
                          isActive
                            ? "var(--color-neutral-black-900)"
                            : "var(--color-neutral-black-500)"
                        }
                      />
                    </span>
                    {t(item.title)}
                  </>
                )}
              </NavLink>
            );
          })}
        </nav>
        <footer className="flex flex-col gap-4">
          {buttonsList?.map((btn) => (
            <Button
              key={btn?.title}
              icon={btn?.icon}
              variant="tertiery"
              text={btn?.title}
              iconDirection="left"
              hasFullWidth
              isCenterd={false}
              round="lg"
              handleClick={btn?.onClick}
            />
          ))}
        </footer>
      </div>
    </aside>
  );
};

export default Sidebar;
