import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import type { FormListItemType } from "../../components/shared/form_builder/Form_Builder-types";
import Form_Builder from "../../components/shared/form_builder/Form_Builder";
import Button from "../../components/shared/button/Button";
import { emailRegex, passwordPattern } from "../../common/constant/validator";
import { handleError } from "../../common/utils/handleError";
import axiosInstance from "../../services/axiosInstance";
import { API } from "../../services/apiUrl";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/Auth_Context";

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
        required: "required_field",
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
        required: "required_field",
        pattern: {
          value: passwordPattern,
          message: "password_pattern_error",
        },
      },
      showForgetPassword: true,
      inlineError: true,
    },
  ];

  // _________________function __________-
  const onSubmit = async (data) => {
    try {
      setLoading(true);
      const response = await axiosInstance.post(API.auth.login, data);
      if (response?.status === 200) {
        if (response.data.role !== "admin") {
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
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="px-4 flex flex-col gap-10"
    >
      <fieldset className="flex flex-col gap-6">
        <Form_Builder formList={formList} control={control} errors={errors} />
      </fieldset>
      <footer className="flex flex-col gap-6">
        <Button
          loading={loading}
          disabled={loading}
          text="login"
          type="submit"
          hasFullWidth
        />
      </footer>
    </form>
  );
};

export default Login;
