import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useNavigate, useParams } from "react-router-dom";
import type { FormListItemType } from "../../components/shared/form_builder/Form_Builder-types";
import { handleError } from "../../common/utils/handleError";
import Form_Builder from "../../components/shared/form_builder/Form_Builder";
import Button from "../../components/shared/button/Button";
import Cookies from "js-cookie";
import { toast } from "react-toastify";
import { API } from "../../services/apiUrl";
import axiosInstance from "../../services/axiosInstance";

const Otp = () => {
  const { t } = useTranslation();
  const [loading, setLoading] = useState(false);
  const { email } = useParams();
  const navigate = useNavigate();
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
        pattern: {
          value: /^[0-9]+$/,
          message: "must_be_number",
        },
        validate: (value) => {
          return value?.length === 6 || "required_field";
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
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="px-4 flex flex-col gap-10"
    >
      <h1 className="h3 text-neutral-black-900 font-semibold">{t(title)}</h1>
      <fieldset className="flex flex-col gap-6">
        <Form_Builder formList={formList} control={control} errors={errors} />
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
        disabled={loading || !isValid}
        text="activate"
        type="submit"
        hasFullWidth
      />
    </form>
  );
};

export default Otp;
