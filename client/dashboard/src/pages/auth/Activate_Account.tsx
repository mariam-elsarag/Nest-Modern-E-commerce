import { useState } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import type { FormListItemType } from "../../components/shared/form_builder/Form_Builder-types";
import { handleError } from "../../common/utils/handleError";
import Form_Builder from "../../components/shared/form_builder/Form_Builder";
import Button from "../../components/shared/button/Button";

const Activate_Account = () => {
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
  const onSubmit = async (data) => {
    try {
      setLoading(true);
      navigate(`/login`);
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

export default Activate_Account;
