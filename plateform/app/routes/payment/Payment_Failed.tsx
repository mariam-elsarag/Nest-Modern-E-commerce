import React from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router";
import Page_Header from "~/components/shared/header/page_header/Page_Header";
import type { breadCrumbListType } from "~/components/shared/header/page_header/Page_Header.types";
import Payment_View from "./components/Payment_View";
import { FailedPaymentImg } from "~/assets/images/Image";
import type { Route } from "../+types/Public_Route";

export async function clientLoader({ params }: Route.LoaderArgs) {
  const { id } = params;

  return { id };
}
const Payment_Failed = ({ loaderData }: Route.ComponentProps) => {
  const { id } = loaderData;
  const { t } = useTranslation();
  const breadcrumbsList: breadCrumbListType[] = [
    {
      label: t("home"),
      template: () => <Link to={`/`}>{t("home")}</Link>,
    },
    {
      label: t("failed_error"),
    },
  ];
  return (
    <section className="flex flex-col gap-10">
      {" "}
      <Page_Header
        title="failed_error"
        breadcrumbsList={breadcrumbsList}
        variant="error"
      />
      <div className="container ">
        <section className="max-w-[397px]  mx-auto w-full ">
          <Payment_View
            image={FailedPaymentImg}
            title="failed_payment_title"
            des="failed_payment_desc"
            btnName="reorder"
            btnCta={() => {
              console.log("");
            }}
          />
        </section>
      </div>
    </section>
  );
};

export default Payment_Failed;
