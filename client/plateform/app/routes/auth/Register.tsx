import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { Link, useNavigate } from "react-router";
import {
  emailRegex,
  passwordPattern,
  phonePattern,
} from "~/common/constant/validator";
import { handleError } from "~/common/utils/handleError";
import type { FormListItemType } from "~/components/shared/form_builder/Form_Builder-types";
import Page_Header from "~/components/shared/header/page_header/Page_Header";
import type { breadCrumbListType } from "~/components/shared/header/page_header/Page_Header.types";
import Google_Btn from "./components/Google_Btn";
import Form_Builder from "~/components/shared/form_builder/Form_Builder";
import Button from "~/components/shared/button/Button";
import axiosInstance from "~/services/axiosInstance";
import { API } from "~/services/apiUrl";
import { toast } from "react-toastify/unstyled";

const Register = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  // ___________ useform _________
  const {
    control,
    setError,
    formState: { errors, isValid },
    handleSubmit,
  } = useForm({
    defaultValues: {
      fullName: "",
      email: null,
      password: null,
    },
    mode: "onChange",
  });
  // _______________ list ______________
  const formList: FormListItemType[] = [
    {
      id: "1",
      formType: "input",
      type: "text",
      name: "fullName",
      label: "name",
      fieldName: "fullName",
      validator: {
        required: "name_is_required",
        maxLength: {
          value: 30,
          message: t("max_length_error", { number: 30 }),
        },
      },
    },
    {
      id: "2",
      formType: "input",
      type: "email",
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
        maxLength: {
          value: 255,
          message: t("max_length_error", { number: 255 }),
        },
      },
    },
    {
      id: "3",
      formType: "phone",
      type: "number",
      name: "phone",
      label: "phone",
      fieldName: "phone",
      inputMode: "tel",
      validator: {
        required: "phone_is_required",
        pattern: {
          value: phonePattern,
          message: "phone_pattern_error",
        },
        maxLength: {
          value: 14,
          message: t("max_length_error", { number: 14 }),
        },
      },
    },
    {
      id: "4",
      formType: "password",
      name: "password",
      label: "password",
      fieldName: "password",
      validator: {
        required: "password_is_required",
        pattern: {
          value: passwordPattern,
          message: "password_pattern_error",
        },
        maxLength: {
          value: 30,
          message: t("max_length_error", { number: 30 }),
        },
      },
      showForgetPassword: false,
      inlineError: false,
    },
  ];
  const breadcrumbsList: breadCrumbListType[] = [
    {
      label: t("home"),
      template: () => <Link to={`/`}>{t("home")}</Link>,
    },
    {
      label: t("sign_up"),
    },
  ];
  // _________________function __________-
  const onSubmit = async (data) => {
    try {
      setLoading(true);
      const response = await axiosInstance.post(API.auth.register, data);
      if (response.status === 201) {
        navigate(`/${response.data.email}/activate-account`);
        toast.success(t("registration_success"));
      }
    } catch (err) {
      handleError(err, t, setError);
    } finally {
      setLoading(false);
    }
  };
  return (
    <main className="flex flex-col gap-20">
      <Page_Header
        title="sign_up"
        breadcrumbsList={breadcrumbsList}
        variant="secondary"
      />
      <section className="container">
        <div className=" max-w-[400px] sm:max-w-[320px] flex flex-col mx-auto w-full gap-8">
          <Google_Btn />
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="px-4 flex flex-col gap-10"
          >
            <div className="flex flex-col gap-4">
              <fieldset className="flex flex-col gap-6">
                <Form_Builder
                  formList={formList}
                  control={control}
                  errors={errors}
                />
              </fieldset>
              <p className="text-neutral-black-500 label font-medium">
                {t("register_des")}
              </p>
            </div>
            <footer className="flex flex-col gap-6">
              <Button
                loading={loading}
                disabled={loading}
                text="create_account"
                type="submit"
                hasFullWidth
              />
              <p className="text-neutral-black-500 body text-center">
                <span>{t("already_have_an_account")}</span>
                <Link to="/register">{t("login")}</Link>
              </p>
            </footer>
          </form>
        </div>
      </section>
    </main>
  );
};

export default Register;
