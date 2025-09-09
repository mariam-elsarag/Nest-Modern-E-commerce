import type { PageHeaderProps } from "./Page_Header.types";
import { useTranslation } from "react-i18next";
import { BreadCrumb } from "primereact/breadcrumb";
import { useOutletContext } from "react-router-dom";
import Button from "../../../shared/button/Button";
import { MenuIcon } from "../../../../assets/icons/Icon";

const Page_Header = ({ label, list }: PageHeaderProps) => {
  const { t } = useTranslation();
  const { setToggleSidebar } = useOutletContext();
  return (
    <header className="px-4 bg-white md:bg-transparent h-[60px] md:h-[72px] flex items-center gap-2 justify-between ">
      {list?.length > 0 ? (
        <BreadCrumb model={list} />
      ) : label ? (
        <span className="body font-medium text-neutral-black-900">
          {t(label)}
        </span>
      ) : null}
      <Button
        variant="tertiery"
        icon={<MenuIcon />}
        size="sm"
        className="!bg-transparent !flex md:!hidden"
        handleClick={() => setToggleSidebar(true)}
      />
    </header>
  );
};

export default Page_Header;
