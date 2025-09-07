import { useState } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import type { FormListItemType } from "../../components/shared/form_builder/Form_Builder-types";
import { emailRegex } from "../../common/constant/validator";
import Form_Builder from "../../components/shared/form_builder/Form_Builder";
import Button from "../../components/shared/button/Button";
import { handleError } from "../../common/utils/handleError";

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
        required: "required_field",
        pattern: {
          value: emailRegex,
          message: "email_pattern_error",
        },
      },
    },
  ];

  // _________________function __________-
  const onSubmit = async (data) => {
    try {
      setLoading(true);
      navigate(`/${data?.email}/reset-password`);
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
        <p className="body text-neutral-black-500">
          {t("forget_password_des")}
        </p>
        <Form_Builder formList={formList} control={control} errors={errors} />
      </fieldset>

      <Button
        loading={loading}
        disabled={loading || !isValid}
        text="send_reset_link"
        type="submit"
        hasFullWidth
      />
    </form>
  );
};

export default Forget_Password;
