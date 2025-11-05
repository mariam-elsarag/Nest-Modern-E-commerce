import React, { useState } from "react";

import { useTranslation } from "react-i18next";
import { emailRegex } from "~/common/constant/validator";
import Form_Builder from "~/components/shared/form_builder/Form_Builder";
import type {
  FormBuiderProps,
  FormListItemType,
} from "~/components/shared/form_builder/Form_Builder-types";

type CheckoutFormProps = Pick<FormBuiderProps, "errors" | "control"> & {
  isProfile?: boolean;
  loading: boolean;
};
const Checkout_Form = ({
  control,
  errors,
  isProfile = false,
  loading,
}: CheckoutFormProps) => {
  const { t } = useTranslation();

  const formList: FormListItemType[] = [
    {
      id: "1",
      formType: "input",
      type: "text",
      name: "street",
      label: "street_address",
      fieldName: "street",
      validator: {
        required: "street_is_required",
        maxLength: {
          value: 100,
          message: t("max_length_error", { number: 100 }),
        },
      },
      containerClassName: " col-span-2 sm:col-span-1 md:col-span-2",
    },
    {
      id: "2",
      formType: "input",
      type: "text",
      name: "city",
      label: "city",
      fieldName: "city",
      validator: {
        required: "city_is_required",
        maxLength: {
          value: 30,
          message: t("max_length_error", { number: 30 }),
        },
      },
    },
    {
      id: "3",
      formType: "input",
      type: "text",
      name: "state",
      label: "state",
      fieldName: "state",
      validator: {
        required: "state_is_required",
        maxLength: {
          value: 30,
          message: t("max_length_error", { number: 30 }),
        },
      },
    },
    {
      id: "4",
      formType: "input",
      type: "text",
      name: "zip_code",
      label: "zip_code",
      fieldName: "zipCode",
      validator: {
        maxLength: {
          value: 10,
          message: t("max_length_error", { number: 10 }),
        },
      },
    },
    {
      id: "5",
      formType: "input",
      type: "text",
      name: "country",
      label: "country",
      fieldName: "country",
      validator: {
        required: "country_is_required",
        maxLength: {
          value: 50,
          message: t("max_length_error", { number: 50 }),
        },
      },
    },
    !isProfile && {
      id: "6",
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
    !isProfile && {
      id: "7",
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
  ].filter(Boolean) as FormListItemType[];
  return (
    <div
      className={`${isProfile ? "" : "sm:border-r border-b pb-10 sm:pb-0 border-neutral-black-100"} flex flex-col gap-10 `}
    >
      <h1 className="h5 font-semibold text-neutral-black-900">
        {" "}
        {t("shipping_address")}
      </h1>
      <div className="grid sm:grid-cols-1 md:grid-cols-2 sm:pe-6 md:pe-10 lg:pe-6 gap-4 max-w-[536px] ">
        <Form_Builder
          formList={formList}
          control={control}
          errors={errors}
          loading={loading}
        />
      </div>
    </div>
  );
};

export default Checkout_Form;
