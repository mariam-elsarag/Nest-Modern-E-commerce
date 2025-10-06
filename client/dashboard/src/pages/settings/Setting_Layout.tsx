import React from "react";
import type { TabList } from "../../components/shared/tab/Tab.types";
import Page_Wraper from "../../components/layout/page_wraper/Page_Wraper";
import Tab from "../../components/shared/tab/Tab";
import { Outlet } from "react-router-dom";

const TabList: TabList = [
  { link_name: "settings", link: "/settings/main" },
  { link_name: "colors", link: "/settings/colors" },
  { link_name: "categories", link: "/settings/categories" },
];
const Setting_Layout = () => {
  return (
    <Page_Wraper label="settings">
      <Tab type="navLink" list={TabList} isScroll={true} />
      <div>
        <Outlet />
      </div>
    </Page_Wraper>
  );
};

export default Setting_Layout;
