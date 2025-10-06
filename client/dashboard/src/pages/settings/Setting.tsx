import React, { useState } from "react";
import Page_Wraper from "../../components/layout/page_wraper/Page_Wraper";
import Page_Title from "../../components/layout/header/page_title/Page_Title";
import type { FormListItemType } from "../../components/shared/form_builder/Form_Builder-types";
import { useTranslation } from "react-i18next";
import { useForm } from "react-hook-form";
import Form_Builder from "../../components/shared/form_builder/Form_Builder";
import { emailRegex } from "../../common/constant/validator";
import Button from "../../components/shared/button/Button";
import View_Colors from "../../components/shared/form_builder/View_Colors";

const Setting = () => {
  const { t } = useTranslation();

  const [loading, setLoading] = useState(false);

  // ___________ useform _________
  const {
    control,
    setError,
    watch,
    reset,
    setValue,
    clearErrors,
    formState: { errors, isValid },
    handleSubmit,
  } = useForm({
    defaultValues: {
      monthlyOrderGoal: "",
      supportEmail: "",
    },
    mode: "onChange",
  });
  const formList: FormListItemType[] = [
    {
      id: "1",
      formType: "input",
      type: "number",
      inputMode: "decimal",
      name: "monthly_order_goal",
      label: "monthly_order_goal",
      placeholder: "monthly_order_goal",
      fieldName: "monthlyOrderGoal",
      validator: {
        required: "required_field",
        maxLength: {
          value: 1000000,
          message: t("max_length_error", { number: 1000000 }),
        },
      },
    },

    {
      id: "2",
      formType: "input",
      type: "text",
      name: "tax_rate",
      label: "tax_rate",
      placeholder: "tax_rate",
      fieldName: "taxRate",
    },
  ];

  return (
    <Page_Wraper containerClassName="layer shadow_sm min-h-[75vh] py-6">
      {" "}
      <Page_Title title="main_setting" />
      <section className="px-4 grid gap-6 h-full">
        <form className=" max-w-[600px] grid gap-10  ">
          <fieldset className="grid    gap-6">
            <Form_Builder
              formList={formList}
              control={control}
              errors={errors}
            />
          </fieldset>
          <Button text="save" type="submit" />
        </form>
      </section>
    </Page_Wraper>
  );
};

export default Setting;
