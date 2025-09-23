import Page_Wraper from "../../components/layout/page_wraper/Page_Wraper";
import Tab from "../../components/shared/tab/Tab";
import type { TabList } from "../../components/shared/tab/Tab.types";
import { Outlet } from "react-router-dom";

const TabList: TabList = [
  { link_name: "faq", link: "/website/faq" },
  { link_name: "terms_and_conditions", link: "/website/terms-and-conditions" },
  { link_name: "privacy_policy", link: "/website/privacy-policy" },
];
const Content_Layout = () => {
  return (
    <Page_Wraper label="website">
      <Tab type="navLink" list={TabList} isScroll={true} />
      <div>
        <Outlet />
      </div>
    </Page_Wraper>
  );
};

export default Content_Layout;
