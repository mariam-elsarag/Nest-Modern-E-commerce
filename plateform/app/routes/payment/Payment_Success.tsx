import React from "react";
import { useTranslation } from "react-i18next";
import { Link, useNavigate } from "react-router";
import Page_Header from "~/components/shared/header/page_header/Page_Header";
import type { breadCrumbListType } from "~/components/shared/header/page_header/Page_Header.types";
import Payment_View from "./components/Payment_View";
import { SuccessPaymentImg } from "~/assets/images/Image";

const Payment_Success = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const breadcrumbsList: breadCrumbListType[] = [
    {
      label: t("home"),
      template: () => <Link to={`/`}>{t("home")}</Link>,
    },
    {
      label: t("successful_order"),
    },
  ];

  return (
    <section className="flex flex-col gap-10">
      {" "}
      <Page_Header
        title="successful_order"
        breadcrumbsList={breadcrumbsList}
        variant="success"
      />
      <div className="container ">
        <section className="max-w-[397px]  mx-auto w-full ">
          <Payment_View
            image={SuccessPaymentImg}
            title="thanks_for_sharing"
            des="success_payment_des"
            btnName="go_to_my_account"
            btnCta={() => {
              navigate("/profile");
            }}
          />
        </section>
      </div>
    </section>
  );
};

export default Payment_Success;
