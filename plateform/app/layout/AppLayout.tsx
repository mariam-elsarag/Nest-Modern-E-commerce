import React from "react";
import { Outlet } from "react-router";
import Footer from "~/components/layout/footer/Footer";
import Navbar from "~/components/layout/navbar/Navbar";
import Newsletter from "~/components/layout/newsLetter/Newsletter";

const AppLayout = () => {
  return (
    <div className="min-h-dvh flex flex-col">
      <Navbar />
      <div className="flex flex-col gap-20">
        <div className="flex-1">
          <Outlet />
        </div>
        <div>
          <Newsletter />
          <Footer />
        </div>
      </div>
    </div>
  );
};

export default AppLayout;
