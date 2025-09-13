import React, { useState } from "react";
import Page_Wraper from "../../components/layout/page_wraper/Page_Wraper";
import type { BreadCrumbListType } from "../../components/layout/header/page_header/Page_Header.types";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import Page_Title from "../../components/layout/header/page_title/Page_Title";
import { useForm } from "react-hook-form";
import type { FormListItemType } from "../../components/shared/form_builder/Form_Builder-types";
import { emailRegex, phonePattern } from "../../common/constant/validator";
import { handleError } from "../../common/utils/handleError";
import Form_Builder from "../../components/shared/form_builder/Form_Builder";
import Button from "../../components/shared/button/Button";

const Manage_User = () => {
  const { t } = useTranslation();

  const isEdit = location.pathname.includes("/edit");
  const pageTitle = isEdit ? "update_admin" : "add_admin";

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
      email: "",
      phone: null,
    },
    mode: "onChange",
  });
  const breadcrumbsList: BreadCrumbListType[] = [
    {
      label: t("users"),
      template: () => <Link to={`/users`}>{t("users")}</Link>,
    },
    {
      label: t(pageTitle),
    },
  ];
  // _______________ list ______________
  const formList: FormListItemType[] = [
    {
      id: "1",
      formType: "input",
      type: "text",
      name: "fullName",
      label: "fullName",
      placeholder: "fullName",
      fieldName: "fullName",
      validator: {
        required: "required_field",
        maxLength: {
          value: 30,
          message: t("max_length_error", { number: 30 }),
        },
      },
    },
    {
      id: "2",
      formType: "input",
      type: "text",
      name: "email",
      label: "email",
      placeholder: "example@gmail.com",
      fieldName: "email",
      inputMode: "email",
      validator: {
        required: "required_field",
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
        required: "required_field",
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

  // _________________function __________-
  const onSubmit = async (data) => {
    try {
      setLoading(true);
    } catch (err) {
      handleError(err, t, setError);
    } finally {
      setLoading(false);
    }
  };
  return (
    <Page_Wraper
      list={breadcrumbsList}
      containerClassName="layer shadow_sm min-dh-[85dvh] py-6"
    >
      <Page_Title title={pageTitle} />
      <form
        className="flex flex-col gap-10 px-4"
        onSubmit={handleSubmit(onSubmit)}
      >
        <fieldset className="grid grid-cols-2 gap-6">
          <Form_Builder formList={formList} control={control} errors={errors} />
        </fieldset>
        <Button
          loading={loading}
          disabled={loading}
          text={isEdit ? "save" : "invite"}
          type="submit"
          hasFullWidth
        />
      </form>
    </Page_Wraper>
  );
};

export default Manage_User;
