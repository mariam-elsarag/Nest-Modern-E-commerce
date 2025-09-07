import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { Link, useNavigate } from "react-router";
import { passwordPattern } from "~/common/constant/validator";
import { handleError } from "~/common/utils/handleError";
import Button from "~/components/shared/button/Button";
import Form_Builder from "~/components/shared/form_builder/Form_Builder";
import type { FormListItemType } from "~/components/shared/form_builder/Form_Builder-types";
import Page_Header from "~/components/shared/header/page_header/Page_Header";
import type { breadCrumbListType } from "~/components/shared/header/page_header/Page_Header.types";
import Password_Form from "~/components/shared/password_form/Password_Form";

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
