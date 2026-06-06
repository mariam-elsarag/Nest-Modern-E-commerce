"use client";
import Button from "@/app/_components/ui/Button";
import Form_Builder from "@/app/_components/ui/form/Form_Builder";
import Google_Btn from "@/app/_components/ui/Google_Btn";
import Page_Header from "@/app/_components/ui/Page_Header";
import { useAuth } from "@/app/_context/AuthContext";
import { login as loginAction } from "@/app/_lib/actions/auth";
import { handleError } from "@/app/_lib/error/handleError";
import { validaition } from "@/app/_lib/Validator";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";
import { useFormStatus } from "react-dom";
import { FormProvider, useForm } from "react-hook-form";
import { toast } from "react-toastify";

const Login_Form = () => {
  const t = useTranslations();
  const router = useRouter();
  const { login } = useAuth();
  const { pending } = useFormStatus();
  const methods = useForm({
    defaultValues: {
      email: null,
      password: null,
    },
    mode: "onChange",
  });
  const { handleSubmit, reset, setError } = methods;

  const breadcrumbsList = [
    {
      label: t("home"),
      template: () => <Link href={`/`}>{t("home")}</Link>,
    },
    {
      label: t("login"),
    },
  ];
  const formList = [
    {
      id: "1",
      formType: "input",
      type: "text",
      name: "email",
      label: "email",
      fieldName: "email",
      inputMode: "email",
      validator: {
        required: validaition.required,
        pattern: validaition.email,
        maxLength: validaition.max(t, "email"),
      },
    },
    {
      id: "2",
      formType: "password",
      name: "password",
      label: "password",
      fieldName: "password",
      validator: {
        required: validaition.required,
        pattern: validaition.password,
        maxLength: validaition.max(t, "password"),
      },
      showForgetPassword: true,
      inlineError: true,
    },
  ];
  const onSubmit = async (data) => {
    const res = await loginAction(data);

    if (!res?.success) {
      if (
        typeof res?.message?.error === "string" &&
        res.message.error.includes("activate_account")
      ) {
        toast.info(t("account_not_active"));

        router.push(`/${res?.message?.details?.email}/activate-account`);

        return;
      }

      handleError(res.message, t, setError, ["email", "password"]);
      return;
    }

    if (res.data.role === "admin") {
      toast.error(t("not_authorized"));
      return;
    }

    toast.success(t("successfully_login"));

    login(res.data);

    router.push("/");
    reset();
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
          <FormProvider {...methods}>
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="px-4 flex flex-col gap-10"
            >
              <fieldset className="flex flex-col gap-6">
                <Form_Builder formList={formList} />
              </fieldset>
              <footer className="flex flex-col gap-6">
                <Button
                  loading={pending}
                  disabled={pending}
                  text="login"
                  type="submit"
                  hasFullWidth
                />
                <p className="text-neutral-black-500 body text-center">
                  <span>{t("don't_have_an_account")}</span>
                  <Link href="/register">{t("sign_up")}</Link>
                </p>
              </footer>
            </form>
          </FormProvider>
        </div>
      </section>
    </main>
  );
};

export default Login_Form;
