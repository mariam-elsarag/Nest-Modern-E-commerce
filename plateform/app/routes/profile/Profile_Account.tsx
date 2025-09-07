import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { emailRegex, phonePattern } from "~/common/constant/validator";
import Button from "~/components/shared/button/Button";
import Form_Builder from "~/components/shared/form_builder/Form_Builder";
import type { FormListItemType } from "~/components/shared/form_builder/Form_Builder-types";

const Profile_Account = () => {
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
      fullName: "",
      email: null,
      phone: null,
    },
    mode: "onChange",
  });
  // _______________ list ______________
  const formList: FormListItemType[] = [
    {
      id: "1",
      formType: "input",
      type: "text",
      name: "fullName",
      label: "name",
      fieldName: "fullName",
      validator: {
        required: "name_is_required",
        maxLength: {
          value: 30,
          message: t("max_length_error", { number: 30 }),
        },
      },
    },
    {
      id: "2",
      formType: "input",
      type: "email",
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
        maxLength: {
          value: 80,
          message: t("max_length_error", { number: 80 }),
        },
      },
    },
    {
      id: "3",
      formType: "phone",
      type: "number",
      name: "phone",
      label: "phone",
      fieldName: "phone",
      inputMode: "tel",
      validator: {
        required: "phone_is_required",
        pattern: {
          value: phonePattern,
          message: "phone_pattern_error",
        },
        maxLength: {
          value: 30,
          message: t("max_length_error", { number: 30 }),
        },
      },
    },
  ];
  return (
    <div className="max-w-[320px] flex flex-col gap-10 ">
      <h2 className="h5 font-semibold text-neutral-black-900">
        {t("account_details")}
      </h2>
      <form className="flex flex-col gap-10">
        <fieldset className="flex flex-col gap-4">
          <Form_Builder formList={formList} control={control} errors={errors} />
        </fieldset>
        <Button
          loading={loading}
          disabled={loading}
          text="save_changes"
          type="submit"
        />
      </form>
    </div>
  );
};

export default Profile_Account;
