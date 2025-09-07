import React from "react";
import type { FooterProps } from "./footer.types";
import { useTranslation } from "react-i18next";
import { Link } from "react-router";
import { Logo2 } from "~/assets/images/Image";
import { menuList } from "~/common/lists/list";
import Footer_List from "./Footer_List";

const footerLinkList = [
  {
    title: "support",
    links: [
      { to: "terms", label: "terms_of_use" },
      { to: "privacy", label: "privacy_policy" },
    ],
  },
  {
    title: "pages",
    links: menuList,
  },
  {
    title: "customer_service",
    links: [
      { to: "profile", label: "my_account" },
      { to: "cart", label: "cart" },
      { to: "favorite", label: "favorite" },
    ],
  },
];

const Footer = ({ variant = "primary" }: FooterProps) => {
  const { t } = useTranslation();
  const styles = {
    primary: "bg-white",
    secondary: "bg-neutral-white-100",
  };
  return (
    <footer
      className={`${styles[variant]} pt-10  lg:pt-20 flex flex-col gap-6 lg:gap-10  `}
    >
      {/* top footer */}
      <section className="container grid sm:grid-cols-2 md:grid-cols-[200px_1fr_1fr_1fr] lg:grid-cols-[300px_1fr_1fr_1fr] gap-6 sm:gap-10 md:gap-6 lg:gap-10">
        <div className="flex flex-col gap-6 lg:gap-10 lg:max-w-[260px]">
          <Link to="/">
            <img src={Logo2} alt="logo" className="h-[38px]" />
          </Link>
          <p className="text-neutral-black-500 body">{t("footer_about")}</p>
        </div>
        {footerLinkList?.map((section) => (
          <Footer_List
            key={section.title}
            title={section.title}
            links={section.links}
          />
        ))}
      </section>
      {/* bottom footer */}
      <p className="body text-neutral-black-500 text-center border-t border-neutral-white-100 py-6">
        <span>&copy;</span>
        {t("copy_right", { year: new Date().getFullYear() })}
      </p>
    </footer>
  );
};

export default Footer;
