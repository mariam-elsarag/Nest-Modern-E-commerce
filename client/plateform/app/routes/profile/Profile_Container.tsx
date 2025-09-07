import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { Link, Outlet } from "react-router";
import Page_Header from "~/components/shared/header/page_header/Page_Header";
import type { breadCrumbListType } from "~/components/shared/header/page_header/Page_Header.types";
import Profile_Aside from "./components/Profile_Aside";
import Button from "~/components/shared/button/Button";
import { ChevronIcon } from "~/assets/icons/Icon";
import type { Route } from "../+types/Public_Route";
export function meta({}: Route.MetaArgs) {
  return [
    { title: "Profile" },
    { name: "description", content: "User profile" },
  ];
}
const Profile_Container = () => {
  const { t } = useTranslation();
  const [loading, setLoading] = useState(false);
  const [toggle, setToggle] = useState(false);
  const breadcrumbsList: breadCrumbListType[] = [
    {
      label: t("home"),
      template: () => <Link to={`/`}>{t("home")}</Link>,
    },
    {
      label: t("my_account"),
    },
  ];
  return (
    <section className="flex flex-col gap-10">
      <Page_Header
        title="my_account"
        breadcrumbsList={breadcrumbsList}
        variant="secondary"
      />
      <section
        className={` container  sm:grid sm:grid-cols-[220px_1fr] md:grid-cols-[271px_1fr] gap-10`}
      >
        <Profile_Aside toggleSm={toggle} setToggleSm={setToggle} />
        <div
          className={`${toggle ? "flex" : "hidden sm:flex "} flex-col gap-6 `}
        >
          <Button
            icon={<ChevronIcon />}
            variant="outline"
            size="xs"
            className="!flex sm:!hidden"
            handleClick={() => {
              setToggle(false);
            }}
          />
          <Outlet />
        </div>
      </section>
    </section>
  );
};

export default Profile_Container;
