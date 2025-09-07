import React from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { emailRegex } from "~/common/constant/validator";
import Button from "~/components/shared/button/Button";
import Form_Builder from "~/components/shared/form_builder/Form_Builder";
import type { FormListItemType } from "~/components/shared/form_builder/Form_Builder-types";

const formList: FormListItemType[] = [
  {
    id: "1",
    formType: "input",
    type: "text",
    name: "email",
    fieldName: "email",
    inputMode: "email",
    placeholder: "email_placeholder",
    validator: {
      required: "Email is required",
      pattern: {
        value: emailRegex,
        message: "email_pattern_error",
      },
    },
  },
];
const Newsletter = () => {
  const { t } = useTranslation();
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
    },
    mode: "onChange",
  });
  const onSubmit = async () => {};
  return (
    <section className="bg-neutral-white-100 min-h-[200px] container py-10 grid md:grid-cols-2 gap-6  text-center md:justify-baseline md:text-start content-center">
      <div className="flex flex-col gap-2">
        <h2 className=" text-neutral-black-900 font-bold h3">
          {t("newsletter.title")}
        </h2>
        <p className="text-neutral-black-500 body">
          {t("newsletter.description")}
        </p>
      </div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className={`max-w-[450px]  flex  gap-4 ${errors ? "items-start" : "items-center"} mx-auto md:ms-auto `}
      >
        <Form_Builder formList={formList} control={control} errors={errors} />
        <Button type="submit" text="newsletter.subscribe" />
      </form>
    </section>
  );
};

export default Newsletter;
