import React, { useEffect, useState } from "react";
import Modal from "../../../components/shared/modal/modal/Modal";
import { useForm } from "react-hook-form";
import type { FormListItemType } from "../../../components/shared/form_builder/Form_Builder-types";
import { useTranslation } from "react-i18next";
import {
  numberPattern,
  taxRatePattern,
} from "../../../common/constant/validator";
import { currentLanguageCode } from "../../../common/utils/switchLang";
import type { ColorType, SizeType } from "../../../common/constant/types";
import type { Variant } from "../Product_Management";
import Form_Builder from "../../../components/shared/form_builder/Form_Builder";
import Button from "../../../components/shared/button/Button";

type UpdateModalPropsType = {
  open: boolean;
  onClose: () => void;
  sizeList: SizeType[];
  colorList: ColorType[];
  data: Variant | null;
  updateVariants: React.Dispatch<React.SetStateAction<Variant[] | null>>;
};

const Update_Modal = ({
  open,
  onClose,
  sizeList,
  colorList,
  data,
  updateVariants,
}: UpdateModalPropsType) => {
  const { t } = useTranslation();
  const {
    control,
    setValue,
    formState: { errors },
    handleSubmit,
  } = useForm({
    defaultValues: {
      color: data?.color,
      size: data?.size,
      quantity: data?.quantity,
      price: data?.price,
      images: data?.images,
      discountPercent: data?.discountPercent,
    },
    mode: "onChange",
  });

  const formList: FormListItemType[] = [
    {
      id: "13",
      formType: "input",
      inputMode: "decimal",
      type: "text",
      name: "price",
      label: "price",
      placeholder: "price",
      fieldName: `price`,
      validator: {
        min: {
          value: 1,
          message: t("min_price_error", { number: 1 }),
        },
        pattern: {
          value: numberPattern,
          message: "must_be_max_10_digits_and_optional_2_decimals",
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
      inlineError: true,
    },
    {
      id: "14",
      formType: "input",
      inputMode: "numeric",
      type: "number",
      name: "quantity",
      label: "quantity",
      placeholder: "quantity",
      fieldName: `quantity`,
      validator: {
        min: {
          value: 1,
          message: t("min_quantity_error", { number: 1 }),
        },
        max: {
          value: 10000,
          message: t("max_quantity_error", { number: 10000 }),
        },
      },
      inlineError: true,
    },

    {
      id: "16",
      formType: "dropdown",
      label: "size",
      fieldName: "size",
      placeholder: "size",
      optionList: sizeList?.map((item) => ({
        name: item?.label,
        value: item,
      })),
    },
    {
      id: "17",
      formType: "color",
      placeholder: "select_color",
      fieldName: `color`,
      label: "color",
      optionList: colorList?.map((item) => ({
        name: currentLanguageCode === "en" ? item?.name : item?.name_ar,
        color: item?.color,
        value: item,
      })),
      hasFilter: true,
      inlineError: true,
    },
    {
      id: "6",
      formType: "media",
      fieldName: "images",
      variant: "upload",
      label: "images",
      isMultiple: true,
      limit: 8,
      placeholder: "choose_product_images",
    },
    {
      id: "18",
      formType: "input",
      type: "text",
      name: "discountRate",
      label: "discountRate",
      placeholder: "discountRate",
      fieldName: `discountPercent`,
      validator: {
        pattern: {
          value: taxRatePattern,
          message: "discount_tax_rate",
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
  useEffect(() => {
    if (data) {
      Object.entries(data).map(([key, value]) => {
        setValue(key, value);
      });
    }
  }, [data]);
  const onSubmit = (value) => {
    updateVariants((pre) =>
      pre.map((item) => (item.id === value.id ? { ...item, ...value } : item))
    );
    onClose();
  };
  return (
    <Modal
      className=" w-[90%] sm:w-[450px]"
      open={open}
      onClose={onClose}
      title="update_modal"
    >
      <form onSubmit={handleSubmit(onSubmit)} className="grid gap-6">
        <fieldset className="grid grid-cols-1  gap-6 sm:gap-3 ">
          <Form_Builder formList={formList} control={control} errors={errors} />
        </fieldset>
        <Button text="update" type="submit" hasFullWidth />
      </form>
    </Modal>
  );
};

export default Update_Modal;
