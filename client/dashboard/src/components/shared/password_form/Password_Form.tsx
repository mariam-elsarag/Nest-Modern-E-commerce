import { useState } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useNavigate, useParams } from "react-router-dom";
import type { FormListItemType } from "../form_builder/Form_Builder-types";
import { passwordPattern } from "../../../common/constant/validator";
import { handleError } from "../../../common/utils/handleError";
import Form_Builder from "../form_builder/Form_Builder";
import Button from "../button/Button";
import axiosInstance from "../../../services/axiosInstance";
import { API } from "../../../services/apiUrl";
import { useAuth } from "../../../context/Auth_Context";
import { toast } from "react-toastify";

const Password_Form = () => {
  const { t } = useTranslation();
  const { email } = useParams();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

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
    {
      id: "1",
      formType: "password",
      name: "password",
      label: "new_password",
      fieldName: "password",
      validator: {
        required: "required_field",
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
        required: "required_field",
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

      const response = await axiosInstance.patch(API.auth.resetPassword, data);
      if (response.status === 200) {
        toast.success(t("successfully_reset_password"));
        navigate(`/login`);
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
        text="reset_password"
        type="submit"
        hasFullWidth
      />
    </form>
  );
};

export default Password_Form;
