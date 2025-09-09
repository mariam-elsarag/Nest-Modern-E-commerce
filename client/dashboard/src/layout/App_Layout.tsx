import React from "react";
import { Outlet } from "react-router-dom";

const App_Layout = () => {
  return (
    <div>
      <Outlet />
    </div>
  );
};

export default App_Layout;
