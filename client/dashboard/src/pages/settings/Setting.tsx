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
const fakeColors = [
  { name: "Red", hex: "#FF0000" },
  { name: "Blue", hex: "#0000FF" },
  { name: "Green", hex: "#008000" },
  { name: "Black", hex: "#000000" },
  { name: "White", hex: "#FFFFFF" },
  { name: "Gray", hex: "#808080" },
  { name: "Yellow", hex: "#FFFF00" },
  { name: "Orange", hex: "#FFA500" },
  { name: "Purple", hex: "#800080" },
  { name: "Pink", hex: "#FFC0CB" },
  { name: "Brown", hex: "#A52A2A" },
  { name: "Cyan", hex: "#00FFFF" },
  { name: "Magenta", hex: "#FF00FF" },
  { name: "Navy", hex: "#000080" },
  { name: "Teal", hex: "#008080" },
];
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
  const colorList: FormListItemType[] = [
    {
      id: "1",
      formType: "input",
      type: "number",
      inputMode: "decimal",
      name: "color_name",
      label: "color_name",
      placeholder: "color_name",
      fieldName: "color_name",
      validator: {
        required: "required_field",
        maxLength: {
          value: 100,
          message: t("max_length_error", { number: 100 }),
        },
      },
    },

    {
      id: "2",
      formType: "input",
      type: "color",
      name: "color",
      label: "color",
      placeholder: "color",
      fieldName: "color",
      inputClassName: "!w-7 !h-7 !rounded-[4px] !p-0",
      validator: {
        required: "required_field",
      },
    },
  ];
  return (
    <Page_Wraper containerClassName="layer shadow_sm min-h-[75vh] py-6">
      {" "}
      <Page_Title title="settings" />
      <section className="px-4 flex flex-col lg:flex-row items-start gap-6 h-full">
        <form className=" w-full lg:w-fit flex-1 grid gap-10 h-full ">
          <section className="grid gap-6 ">
            <h3 className="text-neutral-black-900 h5">{t("main_setting")}</h3>
            <fieldset className="grid   gap-6">
              <Form_Builder
                formList={formList}
                control={control}
                errors={errors}
              />
            </fieldset>
          </section>
          <Button text="save" hasFullWidth type="submit" />
        </form>
        <section className="grid gap-6 w-full lg:w-fit flex-1 border-t lg:border-t-0 lg:pt-0 lg:border-s  border-neutral-black-100 pt-6 lg:ps-6 ">
          <h3 className="text-neutral-black-900 h5">{t("colors")}</h3>
          <form className="grid gap-10">
            <fieldset className="grid   gap-6">
              <Form_Builder
                formList={colorList}
                control={control}
                errors={errors}
              />
            </fieldset>
            <Button text="add_color" hasFullWidth type="submit" />
          </form>
          <div className="layer p-4 flex flex-wrap items-center gap-3">
            {fakeColors?.map((item) => (
              <View_Colors
                color={item?.hex}
                key={item?.hex}
                text={item?.name}
              />
            ))}
          </div>
        </section>
      </section>
    </Page_Wraper>
  );
};

export default Setting;
