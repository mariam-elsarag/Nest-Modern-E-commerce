import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { Link, useNavigate } from "react-router";
import Page_Header from "~/components/shared/header/page_header/Page_Header";
import type { breadCrumbListType } from "~/components/shared/header/page_header/Page_Header.types";
import Google_Btn from "./components/Google_Btn";
import { useForm } from "react-hook-form";
import type { FormListItemType } from "~/components/shared/form_builder/Form_Builder-types";
import { emailRegex, passwordPattern } from "~/common/constant/validator";
import { handleError } from "~/common/utils/handleError";
import Form_Builder from "~/components/shared/form_builder/Form_Builder";
import Button from "~/components/shared/button/Button";
import axiosInstance from "~/services/axiosInstance";
import { API } from "~/services/apiUrl";
import { toast } from "react-toastify";
import { useAuth } from "~/context/Auth_Context";

const Login = () => {
  const { t } = useTranslation();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();
  // ___________ useform _________
  const {
    control,
    setError,
    reset,
    formState: { errors, isValid },
    handleSubmit,
  } = useForm({
    defaultValues: {
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
    {
      id: "2",
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
      },
      showForgetPassword: true,
      inlineError: true,
    },
  ];
  const breadcrumbsList: breadCrumbListType[] = [
    {
      label: t("home"),
      template: () => <Link to={`/`}>{t("home")}</Link>,
    },
    {
      label: t("login"),
    },
  ];
  // _________________function __________-
  const onSubmit = async (data) => {
    try {
      setLoading(true);
      const response = await axiosInstance.post(API.auth.login, data);
      if (response?.status === 200) {
        if (response.data.role === "admin") {
          toast.error(t("not_authorized"));
        } else {
          toast.success(t("successfully_login"));
          login(response?.data);
          navigate("/");
          reset();
        }
      }
    } catch (err) {
      if (err?.response?.data?.error?.includes("activate_account")) {
        toast.info(t("account_not_active"));
        navigate(`/${err?.response?.data?.details?.email}/activate-account`);
      } else {
        handleError(err, t, setError);
      }
    } finally {
      setLoading(false);
    }
  };
  return (
    <main className="flex flex-col gap-20">
      <Page_Header
        title="login"
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
            <fieldset className="flex flex-col gap-6">
              <Form_Builder
                formList={formList}
                control={control}
                errors={errors}
              />
            </fieldset>
            <footer className="flex flex-col gap-6">
              <Button
                loading={loading}
                disabled={loading}
                text="login"
                type="submit"
                hasFullWidth
              />
              <p className="text-neutral-black-500 body text-center">
                <span>{t("don't_have_an_account")}</span>
                <Link to="/register">{t("sign_up")}</Link>
              </p>
            </footer>
          </form>
        </div>
      </section>
    </main>
  );
};

export default Login;
