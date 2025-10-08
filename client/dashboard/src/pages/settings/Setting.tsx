import React, { useState } from "react";
import Page_Wraper from "../../components/layout/page_wraper/Page_Wraper";
import Page_Title from "../../components/layout/header/page_title/Page_Title";
import type { FormListItemType } from "../../components/shared/form_builder/Form_Builder-types";
import { useTranslation } from "react-i18next";
import { useForm } from "react-hook-form";
import Form_Builder from "../../components/shared/form_builder/Form_Builder";
import { emailRegex, taxRatePattern } from "../../common/constant/validator";
import Button from "../../components/shared/button/Button";
import View_Colors from "../../components/shared/form_builder/View_Colors";
import { handleError } from "../../common/utils/handleError";
import axiosInstance from "../../services/axiosInstance";
import { API } from "../../services/apiUrl";
import { toast } from "react-toastify";
import useGetData from "../../hooks/useGetData";

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
      taxRate: "",
    },
    mode: "onChange",
  });

  const { data: settingData } = useGetData(API.settting.setting, setValue);

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
      validator: {
        pattern: {
          value: taxRatePattern,
          message: "invalid_tax_rate",
        },
      },
      onKeyDown: (e) => {
        const allowedKeys = [
          "Backspace",
          "Tab",
          "ArrowLeft",
          "ArrowRight",
          "Delete",
          "Home",
          "End",
          ".",
        ];

        if (!/^[0-9]$/.test(e.key) && !allowedKeys.includes(e.key)) {
          e.preventDefault();
        }

        if (e.key === "." && e.currentTarget.value.includes(".")) {
          e.preventDefault();
        }
      },
    },
  ];
  //__________________ function ____________
  const onSubmit = async (data) => {
    try {
      setLoading(true);
      const response = await axiosInstance.patch(API.settting.setting, data);
      if (response.status === 200) {
        toast.success(t("successfully_update_settings"));
      }
    } catch (err) {
      handleError(err, t, setError);
    } finally {
      setLoading(false);
    }
  };
  return (
    <Page_Wraper containerClassName="layer shadow_sm min-h-[75vh] py-6">
      {" "}
      <Page_Title title="main_setting" />
      <section className="px-4 grid gap-6 h-full">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className=" max-w-[600px] grid gap-10  "
        >
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
