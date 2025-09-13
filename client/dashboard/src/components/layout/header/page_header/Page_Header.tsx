import Button from "../../../shared/button/Button";
import { MenuIcon, NotificationIcon } from "../../../../assets/icons/Icon";
import { Link } from "react-router-dom";
import { Logo } from "../../../../assets/images/Images";
import type { PageHeaderProps } from "./Page_Header.types";

const Page_Header = ({ setToggleSidebar }: PageHeaderProps) => {
  return (
    <header className="px-6 bg-white  border-b border-neutral-white-200 md:border-transparent h-[60px]  flex items-center gap-2 justify-between md:justify-end ">
      <div className=" flex md:hidden items-center ">
        <Button
          variant="tertiery"
          icon={<MenuIcon />}
          size="sm"
          className="!h-8 !w-8 !p-0"
          handleClick={() => setToggleSidebar(true)}
        />
        <Link to="/">
          <img src={Logo} alt="logo" className="h-8 " />
        </Link>
      </div>

      <div className="flex items-center gap-2">
        <Button
          variant="tertiery"
          icon={<NotificationIcon />}
          className="!h-8 !w-8 !p-0"
          handleClick={() => setToggleSidebar(true)}
          hasHover={false}
        />
      </div>
    </header>
  );
};

export default Page_Header;
