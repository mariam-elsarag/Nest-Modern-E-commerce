import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useLocation, useNavigate } from "react-router";
import { emailRegex } from "~/common/constant/validator";
import { handleError } from "~/common/utils/handleError";
import Button from "~/components/shared/button/Button";
import Form_Builder from "~/components/shared/form_builder/Form_Builder";
import type { FormListItemType } from "~/components/shared/form_builder/Form_Builder-types";
import Page_Header from "~/components/shared/header/page_header/Page_Header";
import type { Route } from "../+types/Public_Route";
import axiosInstance from "~/services/axiosInstance";
import { API } from "~/services/apiUrl";
import { toast } from "react-toastify";
import Cookies from "js-cookie";

export function meta({}: Route.MetaArgs) {
  const location = useLocation();
  const isActivate = location.pathname.includes("activate-account");
  const title = isActivate ? "Activate account" : "Verify account";
  return [
    { title: title },
    { name: "description", content: "Welcome to Ecommerce!" },
  ];
}
export async function clientLoader({ params }: Route.LoaderArgs) {
  const { email } = params;

  return { email };
}
const Activate_Account = ({ loaderData }: Route.ComponentProps) => {
  const { email } = loaderData;
  const { t } = useTranslation();
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();
  const isActivate = location.pathname.includes("activate-account");
  const title = isActivate ? "acctivate_account" : "verify_account";

  //for resend
  const initialTime = parseInt(Cookies.get("otp_timer"));
  const [remainingTime, setRemainingTime] = useState(initialTime || 60);
  // ___________ useform _________
  const {
    control,
    setError,
    formState: { errors, isValid },
    handleSubmit,
  } = useForm({
    defaultValues: {
      email: email,
      otp: null,
    },
    mode: "onChange",
  });
  // _______________ list ______________
  const formList: FormListItemType[] = [
    {
      id: "1",
      formType: "otp",
      name: "opt",
      label: "otp",
      fieldName: "otp",
      validator: {
        required: "required_field",
        validate: (value) => {
          const str = String(value).trim();

          return str.length === 6 || "required_field";
        },
      },
    },
  ];
  // _________________function __________-
  const reSendOTP = async () => {
    setRemainingTime(60);
    Cookies.set("otp_timer", 60, { expires: 1 / 1440 });
    try {
      const response = await axiosInstance.post(
        `${API.auth.sendOtp}?type=${isActivate ? "activate" : "forget"}`,
        { email }
      );
      if (response.status === 200) {
        toast.success(t("successfully_send_otp"));
      }
    } catch (err) {
      handleError(err, t, setError);
    }
  };
  const onSubmit = async (data) => {
    try {
      setLoading(true);
      const response = await axiosInstance.post(
        `${API.auth.verifyOtp}?type=${isActivate ? "activate" : "forget"}`,
        { ...data, otp: String(data?.otp)?.trim() }
      );
      if (response.status === 200) {
        const message = isActivate
          ? "success_activate_account"
          : "success_verify_account";
        toast.success(t(message));
        navigate(isActivate ? `/login` : `/${email}/reset-password`);
      }
    } catch (err) {
      handleError(err, t, setError);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (remainingTime > 0) {
      const timer = setTimeout(() => {
        setRemainingTime((prevTime) => {
          const newTime = prevTime - 1;
          Cookies.set("otp_timer", newTime, { expires: 1 / 1440 });
          return newTime;
        });
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [remainingTime]);
  const renderTime = () => {
    const minutes = Math.floor(remainingTime / 60);
    const seconds = remainingTime % 60;
    return (
      <p role="button" className="flex items-center gap-2">
        <span className="text-neutral-black-900 body">{t("resend_after")}</span>

        <span className="text-neutral-black-500 body font-medium">
          {`${minutes.toString().padStart(2, "0")}:${seconds
            .toString()
            .padStart(2, "0")}`}
        </span>
      </p>
    );
  };
  return (
    <main className="flex flex-col gap-20">
      <Page_Header title={title} variant="secondary" />
      <section className="container">
        <div className=" max-w-[400px] sm:max-w-[320px] flex flex-col mx-auto w-full gap-8">
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
              <p className="text-neutral-black-500 body font-normal flex items-center  gap-2 ">
                {remainingTime === 0 || !remainingTime ? (
                  <p className="flex items-center gap-2">
                    <span>{t("dont_recive_code")}</span>
                    <span
                      onClick={reSendOTP}
                      className="body font-medium text-neutral-black-900 cursor-pointer "
                    >
                      {t("resend")}
                    </span>
                  </p>
                ) : (
                  <p>{renderTime()}</p>
                )}
              </p>
            </fieldset>

            <Button
              loading={loading}
              disabled={loading}
              text="activate"
              type="submit"
              hasFullWidth
            />
          </form>
        </div>
      </section>
    </main>
  );
};

export default Activate_Account;
