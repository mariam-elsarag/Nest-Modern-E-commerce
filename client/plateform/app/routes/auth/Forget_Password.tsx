import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { Link, useNavigate } from "react-router";
import { emailRegex } from "~/common/constant/validator";
import { handleError } from "~/common/utils/handleError";
import Button from "~/components/shared/button/Button";
import Form_Builder from "~/components/shared/form_builder/Form_Builder";
import type { FormListItemType } from "~/components/shared/form_builder/Form_Builder-types";
import Page_Header from "~/components/shared/header/page_header/Page_Header";
import type { breadCrumbListType } from "~/components/shared/header/page_header/Page_Header.types";

const Forget_Password = () => {
  const { t } = useTranslation();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  // ___________ useform _________
  const {
    control,
    setError,
    formState: { errors, isValid },
    handleSubmit,
  } = useForm({
    defaultValues: {
      email: null,
    },
    mode: "onChange",
  });
  // _______________ list ______________
  const formList: FormListItemType[] = [
    {
      id: "1",
      formType: "input",
      type: "text",
      name: "email",
      label: "email",
      fieldName: "email",
      inputMode: "email",
      validator: {
        required: "email_is_required",
        pattern: {
          value: emailRegex,
          message: "email_pattern_error",
        },
      },
    },
  ];
  const breadcrumbsList: breadCrumbListType[] = [
    {
      label: t("login"),
      template: () => <Link to={`/login`}>{t("login")}</Link>,
    },
    {
      label: t("forget_password"),
    },
  ];
  // _________________function __________-
  const onSubmit = async (data) => {
    try {
      setLoading(true);
      navigate(`/${data?.email}/5/reset-password`);
    } catch (err) {
      handleError(err, t);
    } finally {
      setLoading(false);
    }
  };
  return (
    <main className="flex flex-col gap-20">
      <Page_Header
        title="forget_password"
        breadcrumbsList={breadcrumbsList}
        variant="secondary"
      />
      <section className="container">
        <div className=" max-w-[400px] sm:max-w-[320px] flex flex-col mx-auto w-full gap-8">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="px-4 flex flex-col gap-10"
          >
            <fieldset className="flex flex-col gap-6">
              <p className="body text-neutral-black-500">
                {t("forget_password_des")}
              </p>
              <Form_Builder
                formList={formList}
                control={control}
                errors={errors}
              />
            </fieldset>

            <Button
              loading={loading}
              disabled={loading || !isValid}
              text="send_reset_link"
              type="submit"
              hasFullWidth
            />
          </form>
        </div>
      </section>
    </main>
  );
};

export default Forget_Password;
