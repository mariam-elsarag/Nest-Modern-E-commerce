import { useTranslation } from "react-i18next";
import { Link, useNavigate } from "react-router";

import Page_Header from "~/components/shared/header/page_header/Page_Header";
import type { breadCrumbListType } from "~/components/shared/header/page_header/Page_Header.types";
import Password_Form from "~/components/shared/password_form/Password_Form";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Reset password " },
    { name: "description", content: "Welcome to Ecommerce!" },
  ];
}
const Reset_Password = () => {
  const { t } = useTranslation();

  const breadcrumbsList: breadCrumbListType[] = [
    {
      label: t("login"),
      template: () => (
        <Link to={`/forget-password`}>{t("forget_password")}</Link>
      ),
    },
    {
      label: t("reset_password"),
    },
  ];

  return (
    <main className="flex flex-col gap-20">
      <Page_Header
        title="reset_password"
        breadcrumbsList={breadcrumbsList}
        variant="secondary"
      />
      <section className="container">
        <div className=" max-w-[400px] sm:max-w-[320px] flex flex-col mx-auto w-full gap-8">
          <Password_Form />
        </div>
      </section>
    </main>
  );
};

export default Reset_Password;
