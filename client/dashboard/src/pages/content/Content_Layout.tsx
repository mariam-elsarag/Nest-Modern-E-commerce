import Page_Wraper from "../../components/layout/page_wraper/Page_Wraper";
import Tab from "../../components/shared/tab/Tab";
import type { TabList } from "../../components/shared/tab/Tab.types";
import { Outlet } from "react-router-dom";

const TabList: TabList = [
  { link_name: "faq", link: "/website" },
  { link_name: "terms_and_conditions", link: "terms-and-conditions" },
  { link_name: "privacy_policy", link: "privacy-policy" },
];
const Content_Layout = () => {
  return (
    <Page_Wraper label="website">
      <Tab type="navLink" list={TabList} isScroll={true} />
      <div className="layer shadow_sm  min-h-[60vh]">
        <Outlet />
      </div>
    </Page_Wraper>
  );
};

export default Content_Layout;
