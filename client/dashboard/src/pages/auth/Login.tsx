import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import type { FormListItemType } from "../../components/shared/form_builder/Form_Builder-types";
import Form_Builder from "../../components/shared/form_builder/Form_Builder";
import Button from "../../components/shared/button/Button";
import { emailRegex, passwordPattern } from "../../common/constant/validator";
import { handleError } from "../../common/utils/handleError";

const Login = () => {
  const { t } = useTranslation();
  const [loading, setLoading] = useState(false);
  // ___________ useform _________
  const {
    control,
    setError,
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
    } catch (err) {
      handleError(err, t);
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
