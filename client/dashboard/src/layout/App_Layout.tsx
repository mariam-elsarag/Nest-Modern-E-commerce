import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/layout/sidebar/Sidebar";

const App_Layout = () => {
  const [toggleSidebar, setToggleSidebar] = useState(false);
  return (
    <div className="bg-neutral-white-100 min-h-dvh">
      <section className="  w-full container relative flex items-start">
        <Sidebar isOpen={toggleSidebar} setToggleSidebar={setToggleSidebar} />
        <div className={`w-full md:w-[calc(100%_-_260px_-_10px)] ms-auto`}>
          <Outlet context={{ setToggleSidebar }} />
        </div>
      </section>
    </div>
  );
};

export default App_Layout;
