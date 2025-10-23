import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/layout/sidebar/Sidebar";
import Page_Header from "../components/layout/header/page_header/Page_Header";

const App_Layout = () => {
  const [toggleSidebar, setToggleSidebar] = useState(false);
  return (
    <div className="bg-white min-h-dvh  ">
      <section className="  w-full  relative flex items-start">
        <Sidebar isOpen={toggleSidebar} setToggleSidebar={setToggleSidebar} />
        <div
          className={`flex flex-col gap-6 min-h-dvh w-full md:w-[calc(100%_-_260px)] ms-auto`}
        >
          <Page_Header setToggleSidebar={setToggleSidebar} />
          <div className="px-4 flex-1 h-full  ">
            <Outlet context={{ setToggleSidebar }} />
          </div>
        </div>
      </section>
    </div>
  );
};

export default App_Layout;
