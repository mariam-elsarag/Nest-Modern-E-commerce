import React, { useState } from "react";
import type { FormListItemType } from "../../components/shared/form_builder/Form_Builder-types";
import { useTranslation } from "react-i18next";
import { useForm } from "react-hook-form";
import Form_Builder from "../../components/shared/form_builder/Form_Builder";
import Button from "../../components/shared/button/Button";
import View_Colors from "../../components/shared/form_builder/View_Colors";
import Page_Wraper from "../../components/layout/page_wraper/Page_Wraper";
import Page_Title from "../../components/layout/header/page_title/Page_Title";
const fakeColors = [
  { id: 1, name: "Red", hex: "#FF0000" },
  { id: 2, name: "Blue", hex: "#0000FF" },
  { id: 3, name: "Green", hex: "#008000" },
  { id: 4, name: "Black", hex: "#000000" },
  { id: 5, name: "White", hex: "#FFFFFF" },
  { id: 6, name: "Gray", hex: "#808080" },
  { id: 7, name: "Yellow", hex: "#FFFF00" },
  { id: 8, name: "Orange", hex: "#FFA500" },
  { id: 9, name: "Purple", hex: "#800080" },
  { id: 10, name: "Pink", hex: "#FFC0CB" },
  { id: 11, name: "Brown", hex: "#A52A2A" },
  { id: 12, name: "Cyan", hex: "#00FFFF" },
  { id: 13, name: "Magenta", hex: "#FF00FF" },
  { id: 14, name: "Navy", hex: "#000080" },
  { id: 15, name: "Teal", hex: "#008080" },
];
const Setting_Colors = () => {
  const { t } = useTranslation();

  const [loading, setLoading] = useState(false);
  const [selected, setSelected] = useState([]);

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
      name: "",
      color: "",
    },
    mode: "onChange",
  });
  const colorList: FormListItemType[] = [
    {
      id: "1",
      formType: "input",
      type: "text",
      inputMode: "text",
      name: "color_name",
      label: "color_name",
      placeholder: "color_name",
      fieldName: "name",
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
    <Page_Wraper containerClassName="layer shadow_sm min-h-[75vh] py-6 ">
      <Page_Title title="colors" />
      <form className="grid gap-6 max-w-[600px] px-4">
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
        <div className="layer p-4 grid gap-6 ">
          <div className="flex flex-wrap items-center gap-3">
            {fakeColors?.map((item) => (
              <View_Colors
                hasClose={true}
                color={item?.hex}
                key={item?.hex}
                text={item?.name}
                id={item?.id}
                selected={selected}
                setSelected={setSelected}
              />
            ))}
          </div>
          {selected?.length > 0 && (
            <Button text="delete_colors" variant="error" />
          )}
        </div>
      </form>
    </Page_Wraper>
  );
};

export default Setting_Colors;
