import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router";
import type { FormListItemType } from "../form_builder/Form_Builder-types";
import { passwordPattern } from "~/common/constant/validator";
import { handleError } from "~/common/utils/handleError";
import Form_Builder from "../form_builder/Form_Builder";
import Button from "../button/Button";
import { API } from "~/services/apiUrl";
import axiosInstance from "~/services/axiosInstance";
import { toast } from "react-toastify";
import type { Route } from ".react-router/types/app/+types/root";

type PasswordFormProps = {
  isRest?: boolean;
  loaderData: Route.ComponentProps;
};

const Password_Form = ({ isRest = true, loaderData }: PasswordFormProps) => {
  const { t } = useTranslation();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { email } = loaderData;
  // ___________ useform _________
  const {
    control,
    setError,
    getValues,
    formState: { errors, isValid },
    handleSubmit,
  } = useForm({
    defaultValues: {
      email: email,
      password: null,
      confirmPassword: null,
    },
    mode: "onChange",
  });
  // _______________ list ______________
  const formList: FormListItemType[] = [
    !isRest && {
      id: "1",
      formType: "password",
      name: "old_password",
      label: "old_password",
      fieldName: "old_password",
      validator: {
        required: "old_password_is_required",
        pattern: {
          value: passwordPattern,
          message: "password_pattern_error",
        },
      },
      showForgetPassword: false,
      inlineError: false,
    },
    {
      id: "1",
      formType: "password",
      name: "password",
      label: "new_password",
      fieldName: "password",
      validator: {
        required: "password_is_required",
        pattern: {
          value: passwordPattern,
          message: "password_pattern_error",
        },
      },
      showForgetPassword: false,
      inlineError: false,
    },
    {
      id: "2",
      formType: "password",
      name: "confirmPassword",
      label: "confirmPassword",
      fieldName: "confirmPassword",
      validator: {
        required: "confirm_password_is_required",
        validate: (value: string) => {
          const password = getValues("password");
          return value === password || "password_mismatch";
        },
      },
      showForgetPassword: false,
      inlineError: false,
    },
  ].filter(Boolean) as FormListItemType[];
  const onSubmit = async (data) => {
    try {
      setLoading(true);
      const endppoint = isRest ? API.auth.resetPassword : "";
      const response = await axiosInstance.patch(endppoint, data);
      if (response.status === 200) {
        let url = "/";
        let message = "";
        if (isRest) {
          url = "/login";
          message = "successfully_reset_password";
        } else {
          url = "/";
          message = "successfully_change_password";
        }
        toast.success(t(message));
        navigate(url);
      }
    } catch (err) {
      handleError(err, t, setError);
    } finally {
      setLoading(false);
    }
  };
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="px-4 flex flex-col gap-10"
    >
      <fieldset className="flex flex-col gap-4">
        <Form_Builder formList={formList} control={control} errors={errors} />
      </fieldset>

      <Button
        loading={loading}
        disabled={loading}
        text={isRest ? "reset_password" : "change_password"}
        type="submit"
        hasFullWidth={isRest}
      />
    </form>
  );
};

export default Password_Form;
