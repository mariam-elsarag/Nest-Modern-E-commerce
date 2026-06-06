"use client";
import React from "react";
import { FormProvider, useForm } from "react-hook-form";
import Form_Builder from "../../ui/form/Form_Builder";
import Button from "../../ui/Button";
import { useTranslations } from "next-intl";
import { subscribeNewsletter } from "@/app/_lib/actions/newsletter";
import { emailRegex, validaition } from "@/app/_lib/Validator";

const Newsletter_Form = () => {
  const t = useTranslations();
  const formList = [
    {
      id: "1",
      formType: "input",
      type: "text",
      name: "email",
      fieldName: "email",
      inputMode: "email",
      placeholder: "email_placeholder",
      validator: {
        required: validaition.required,
        pattern: validaition.email,
        maxLength: validaition.max(t, "email"),
      },
    },
  ];
  const methods = useForm({
    defaultValues: {
      email: null,
    },
    mode: "onChange",
  });
  const { handleSubmit, errors } = methods;
  const onSubmit = async (data) => {
    const formData = new FormData();

    Object.entries(data).forEach(([key, value]) => {
      formData.append(key, value);
    });

    await subscribeNewsletter(formData);
  };
  return (
    <FormProvider {...methods}>
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
          <Form_Builder formList={formList} />
          <Button type="submit" text="newsletter.subscribe" />
        </form>
      </section>
    </FormProvider>
  );
};

export default Newsletter_Form;
