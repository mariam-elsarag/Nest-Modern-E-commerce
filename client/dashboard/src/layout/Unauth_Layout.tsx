import { Link, Outlet } from "react-router-dom";
import { Logo } from "../assets/images/Images";
import Button from "../components/shared/button/Button";
import { LanguageIcon } from "../assets/icons/Icon";
import { switchLang } from "../common/utils/switchLang";

const Unauth_Layout = () => {
  return (
    <div className=" flex flex-col justify-between w-full  min-h-screen  ">
      <nav className="container flex items-center justify-between gap-2 sm:!px-6 md:!px-10 lg:!px-16 xl:!px-20 2xl:!px-24 py-3 border-b border-neutral-white-200">
        <Link to="/">
          <img src={Logo} alt="logo" />
        </Link>
        <Button
          icon={<LanguageIcon width="20" height="20" />}
          variant="tertiery"
          size="sm"
          className="hover:bg-transparent"
          handleClick={switchLang}
          text="lng"
        />
      </nav>
      <div className="flex-1 flex-col flex justify-center items-center  ">
        <div className=" w-full max-w-[400px] sm:max-w-[350px]">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Unauth_Layout;
