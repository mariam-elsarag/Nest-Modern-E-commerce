import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { Link } from "react-router";
import { toast } from "react-toastify";
import { emailRegex } from "~/common/constant/validator";
import { handleError } from "~/common/utils/handleError";
import Button from "~/components/shared/button/Button";
import Form_Builder from "~/components/shared/form_builder/Form_Builder";
import type { FormListItemType } from "~/components/shared/form_builder/Form_Builder-types";
import Page_Header from "~/components/shared/header/page_header/Page_Header";
import type { breadCrumbListType } from "~/components/shared/header/page_header/Page_Header.types";
import { API } from "~/services/apiUrl";
import axiosInstance from "~/services/axiosInstance";

const Contact = () => {
  const { t } = useTranslation();
  const [loading, setLoading] = useState(false);
  // ___________ useform _________
  const {
    control,
    setError,
    reset,
    formState: { errors, isValid },
    handleSubmit,
  } = useForm({
    defaultValues: {
      fullName: null,
      email: null,
      subject: null,
      message: null,
      attachment: null,
    },
    mode: "onChange",
  });
  //_______________ list _______________
  const formList: FormListItemType[] = [
    {
      id: "1",
      formType: "input",
      type: "text",
      name: "fullName",
      label: "fullName",
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
      formType: "input",
      type: "text",
      name: "subject",
      label: "subject",
      fieldName: "subject",
      containerClassName: "lg:col-span-2",
      validator: {
        maxLength: {
          value: 30,
          message: t("max_length_error", { number: 100 }),
        },
      },
    },
    {
      id: "4",
      formType: "textarea",
      fieldName: "message",
      type: "text",
      name: "message",
      label: "message",
      containerClassName: "lg:col-span-2",
      validator: {
        required: "message_is_required",
        maxLength: {
          value: 255,
          message: `${t("max_length_error", { number: 255 })}`,
        },
      },
    },
    {
      id: "attachment",
      formType: "media",
      title: "attachment",
      fieldName: "attachment",
      variant: "file",
      validTypes: ["application/pdf"],
      isMultiple: false,
      containerClassName: "lg:col-span-2",
    },
  ];
  const breadcrumbsList: breadCrumbListType[] = [
    {
      label: t("home"),
      template: () => <Link to={`/`}>{t("home")}</Link>,
    },
    {
      label: t("contact"),
    },
  ];

  const onSubmit = async (data) => {
    try {
      setLoading(true);
      const formDate = new FormData();
      Object.entries(data).forEach(([key, value]) => {
        formDate.append(key, value);
      });
      const response = await axiosInstance.post(API.support, formDate);
      if (response.status === 201) {
        toast.success(t("successfully_send_support_ticket"));
        reset();
      }
    } catch (err) {
      handleError(err, t, setError);
    } finally {
      setLoading(false);
    }
  };
  return (
    <section className="flex flex-col gap-10">
      {" "}
      <Page_Header
        title="contact"
        breadcrumbsList={breadcrumbsList}
        variant="secondary"
      />
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="mx-auto max-w-[450px] w-full flex flex-col gap-6"
      >
        <fieldset className="grid lg:grid-cols-2 gap-3">
          <Form_Builder formList={formList} control={control} errors={errors} />
        </fieldset>
        <Button
          loading={loading}
          disabled={loading}
          text="send"
          type="submit"
          hasFullWidth
        />
      </form>
    </section>
  );
};

export default Contact;
