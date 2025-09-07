import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { emailRegex } from "~/common/constant/validator";
import { handleError } from "~/common/utils/handleError";
import Button from "~/components/shared/button/Button";
import Form_Builder from "~/components/shared/form_builder/Form_Builder";
import type { FormListItemType } from "~/components/shared/form_builder/Form_Builder-types";
type ReviewFormPropsType = {
  productId: number | undefined;
  setReviews: any;
  onclose: () => void;
};
const Review_Form = ({
  productId,
  setReviews,
  onclose,
}: ReviewFormPropsType) => {
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
      fullName: null,
      review: "",
      rate: null,
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
        required: "email_is_required",
        pattern: {
          value: emailRegex,
          message: "email_pattern_error",
        },
      },
    },
    {
      id: "2",
      formType: "input",
      fieldName: "fullName",
      type: "text",
      name: "fullName",
      label: "fullName",
      validator: {
        required: "full_name_is_required",
        maxLength: {
          value: 80,
          message: `${t("max_length_error", { number: 80 })}`,
        },
      },
    },
    {
      id: "3",
      formType: "textarea",
      fieldName: "review",
      type: "text",
      name: "review",
      label: "review",
      validator: {
        required: "review_is_required",
        maxLength: {
          value: 255,
          message: `${t("max_length_error", { number: 255 })}`,
        },
      },
    },
    {
      id: "4",
      formType: "rate",
      fieldName: "rate",
      fillColor: "var(--color-neutral-black-500)",
      validator: {
        required: "rate_is_required",
      },
    },
  ];
  // _________________function __________-
  const onSubmit = async (data) => {
    try {
      setLoading(true);
      setReviews((pre) => [
        ...pre,
        { ...data, productId, avatar: null, createdAt: Date.now() },
      ]);
      onclose();
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
        disabled={loading}
        text="submit_your_review"
        type="submit"
        hasFullWidth
      />
    </form>
  );
};

export default Review_Form;
