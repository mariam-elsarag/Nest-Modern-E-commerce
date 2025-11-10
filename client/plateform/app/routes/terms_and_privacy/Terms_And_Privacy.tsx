import React from "react";
import { useTranslation } from "react-i18next";
import { Link, useLocation } from "react-router";
import type { TermsAndPrivacyType } from "~/common/types/Type";
import { currentLanguageCode } from "~/common/utils/switchLang";
import Page_Header from "~/components/shared/header/page_header/Page_Header";
import type { breadCrumbListType } from "~/components/shared/header/page_header/Page_Header.types";

const Terms_And_Privacy = ({ data }: { data: TermsAndPrivacyType }) => {
  const { t } = useTranslation();

  const location = useLocation();
  const pageTitle = location.pathname.includes("terms")
    ? "terms_&_condition"
    : "privacy_policy";
  const breadcrumbsList: breadCrumbListType[] = [
    {
      label: t("home"),
      template: () => <Link to={`/`}>{t("home")}</Link>,
    },
    {
      label: t(pageTitle),
    },
  ];
  return (
    <section className="flex flex-col gap-8">
      <Page_Header breadcrumbsList={breadcrumbsList} />
      <section className="mx-auto w-full max-w-[900px] px-4 flex flex-col gap-3 sm:gap-6">
        <h1 className="text-neutral-black-900 h3 font-semibold">
          {t(pageTitle)}
        </h1>
        <p
          dangerouslySetInnerHTML={{
            __html:
              currentLanguageCode === "en" ? data.content : data.content_ar,
          }}
        />
      </section>
    </section>
  );
};

export default Terms_And_Privacy;
