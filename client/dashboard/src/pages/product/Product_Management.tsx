import React, { useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import type { BreadCrumbListType } from "../../components/breadCrumb/Bread_Crumb.types";
import { Link } from "react-router-dom";
import { handleError } from "../../common/utils/handleError";
import Page_Wraper from "../../components/layout/page_wraper/Page_Wraper";
import Page_Title from "../../components/layout/header/page_title/Page_Title";
import Button from "../../components/shared/button/Button";
import Form_Builder from "../../components/shared/form_builder/Form_Builder";
import { avalibleList, sizeList } from "../../common/lists/List";
import type { CategoryType } from "../../common/types/Type";
import { currentLanguageCode } from "../../common/utils/switchLang";
import {
  numberPattern,
  skuPattern,
  taxRatePattern,
} from "../../common/constant/validator";
import ProductVariants from "./ProductVariants";
import type { FormListItemType } from "../../components/shared/form_builder/Form_Builder-types";
import { CloseIcon, TrashIcon } from "../../assets/icons/Icon";
import { formatPrice } from "../../common/utils/formatPrice";
import Table from "../../components/shared/table/Table";

export const fakeCategories: CategoryType[] = [
  { id: 1, title: "Clothing", title_ar: "ملابس" },
  { id: 2, title: "Electronics", title_ar: "إلكترونيات" },
  { id: 3, title: "Accessories", title_ar: "إكسسوارات" },
  { id: 4, title: "Shoes", title_ar: "أحذية" },
  { id: 5, title: "Sports", title_ar: "رياضة" },
  { id: 6, title: "Gaming", title_ar: "ألعاب" },
  { id: 7, title: "Keyboards", title_ar: "لوحات مفاتيح" },
  { id: 8, title: "T-Shirts", title_ar: "تيشيرتات" },
  { id: 9, title: "Leather", title_ar: "جلد" },
  { id: 10, title: "Men", title_ar: "رجالي" },
  { id: 11, title: "Women", title_ar: "نسائي" },
];

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

type Variant = {
  index?: number;
  id?: number;
  colors: string[];
  sizes: [];
  price: number;
  quantity: number;
  sku: string;
};
const Product_Management = () => {
  const { t } = useTranslation();
  const isEdit = location.pathname.includes("/edit");
  const pageTitle = isEdit ? "update_product" : "add_product";

  const [loading, setLoading] = useState(false);
  const [variantList, setVariantList] = useState<Variant>([]);
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
      title: "",
      title_ar: "",
      description: "",
      description_ar: "",
      category: [],
      hasTax: false,
      status: null,
      variants: {
        colors: [],
        sizes: [],
        quantity: null,
        price: null,
        sku: "",
      },
    },
    mode: "onChange",
  });
  const hasRate = watch("hasTax");
  // for append
  const variants = watch("variants");

  const handleAddAnother = () => {
    let hasEmptyField = false;

    ["price", "quantity", "sku"].forEach((field) => {
      if (!variants?.[field]) {
        hasEmptyField = true;
        setError(`variants.${field}`, {
          type: "manual",
          message: t("required_field"),
        });
      }
    });

    if (!hasEmptyField) {
      // add to variantList
      setVariantList((prev) => [
        ...prev,
        {
          id: variantList?.length + 1,
          colors: variants?.colors || [],
          sizes: variants?.sizes || [],
          price: variants?.price || "",
          quantity: variants?.quantity || "",
          sku: variants?.sku || "",
        },
      ]);

      setValue("variants", {
        colors: [],
        sizes: [],
        price: "",
        quantity: "",
        sku: "",
      });
      clearErrors("variants");
    }
  };

  const handleRemoveField = (index) => {
    setVariantList((pre) => pre.filter((item) => item?.id !== index));
  };
  const breadcrumbsList: BreadCrumbListType[] = [
    {
      label: t("users"),
      template: () => <Link to={`/products`}>{t("products")}</Link>,
    },
    {
      label: t(pageTitle),
    },
  ];
  const formList: FormListItemType[] = [
    {
      id: "1",
      formType: "input",
      type: "text",
      name: "title",
      label: "title",
      placeholder: "title",
      fieldName: "title",
      validator: {
        required: "required_field",
        maxLength: {
          value: 80,
          message: t("max_length_error", { number: 80 }),
        },
      },
    },
    {
      id: "2",
      formType: "input",
      type: "text",
      name: "title_ar",
      label: "title_ar",
      placeholder: "title_ar",
      fieldName: "title_ar",
      validator: {
        required: "required_field",
        maxLength: {
          value: 80,
          message: t("max_length_error", { number: 80 }),
        },
      },
    },
    {
      id: "3",
      formType: "dropdown",
      label: "status",
      fieldName: "status",
      placeholder: "status",
      optionList: avalibleList,
    },
    {
      id: "4",
      formType: "multiselect",
      label: "category",
      fieldName: "category",
      placeholder: "category",
      optionList: fakeCategories?.map((item) => ({
        name: currentLanguageCode === "en" ? item?.title : item?.title_ar,
        value: item?.id,
      })),
      validator: {
        required: "required_field",
      },
      hasFilter: true,
    },
    {
      id: "5",
      formType: "media",
      fieldName: "cover",
      variant: "upload",
      label: "cover_image",
      isMultiple: false,
      placeholder: "choose_cover_image",
      validator: {
        required: "required_field",
      },
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
      id: "7",
      formType: "editor",
      label: "description",
      fieldName: "description",
      placeholder: "description",
      validator: {
        required: "required_field",
      },
    },
    {
      id: "8",
      formType: "editor",
      label: "description_ar",
      fieldName: "description_ar",
      placeholder: "description_ar",
      validator: {
        required: "required_field",
      },
    },

    {
      id: "9",
      formType: "switch",
      text: "show_as_featured",
      containerClassName: "!flex flex-col justify-end ",
      fieldName: "isFeatured",
    },
  ];
  const taxList: FormListItemType[] = [
    {
      id: "10",
      formType: "switch",
      text: "tax_message",
      containerClassName: "!flex flex-col justify-end ",
      fieldName: "hasTax",
    },
    {
      id: "11",
      formType: "input",
      type: "text",
      name: "tax_rate",
      label: "tax_rate",
      placeholder: "tax_rate",
      fieldName: "taxRate",
      disabled: !hasRate,
      validator: {
        validate: (value) => {
          if (hasRate) {
            if (!value) return "required_field";
            return taxRatePattern.test(value) ? true : "invalid_tax_rate";
          }
          return true;
        },
      },
    },
  ];
  const optionList: FormListItemType[] = [
    {
      id: "12",
      formType: "input",
      inputMode: "decimal",
      type: "text",
      name: "price",
      label: "price",
      placeholder: "price",
      fieldName: `variants.price`,
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
      id: "13",
      formType: "input",
      inputMode: "numeric",
      type: "number",
      name: "quantity",
      label: "quantity",
      placeholder: "quantity",
      fieldName: `variants.quantity`,
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
      id: "14",
      formType: "input",
      inputMode: "text",
      type: "text",
      name: "sku",
      label: "sku",
      placeholder: "sku",
      fieldName: `variants.sku`,
      validator: {
        pattern: {
          value: skuPattern,
          message: "sku_pattern",
        },
      },
      inlineError: true,
    },
    {
      id: "15",
      formType: "multiselect",
      label: "sizes",
      fieldName: "variants.sizes",
      placeholder: "size",
      optionList: sizeList,
    },
    {
      id: "16",
      formType: "color",
      placeholder: "select_color",
      fieldName: `variants.colors`,
      label: "colors",
      optionList: fakeColors?.map((item) => ({
        name: item?.name,
        value: item?.hex,
      })),
    },
  ];

  const columns = [
    { header: "sku", field: "sku", body: (item) => item?.sku ?? "-" },
    {
      header: "quantity",
      field: "quantity",
      body: (item) => (item?.quantity > 0 ? `x ${item?.quantity}` : "-"),
    },
    {
      header: "unit_price",
      field: "price",
      body: (item) => (item?.price ? formatPrice(item?.price) : 0),
    },
    {
      header: "colors",
      field: "colors",
      body: (item) => (
        <>
          {item?.colors?.length > 0 ? (
            <div className="flex items-center gap-2 flex-wrap">
              {item?.colors?.map((color) => (
                <div
                  key={color}
                  className="w-4 h-4 border border-neutral-white-200 p-[1px] rounded-full"
                >
                  <div
                    style={{ background: color }}
                    className="w-full h-full rounded-full"
                  />
                </div>
              ))}
            </div>
          ) : (
            "-"
          )}
        </>
      ),
    },
    {
      header: "sizes",
      field: "sizes",
      body: (item) => (
        <> {item.sizes?.length > 0 ? item.sizes.join(", ") : "-"}</>
      ),
    },

    {
      header: "action",
      field: "action",
      body: (item) => (
        <Button
          round="full"
          icon={<TrashIcon width="20" height="20" />}
          variant="tertiery_error"
          size="xs"
          handleClick={() => {
            handleRemoveField(item?.id);
          }}
        />
      ),
    },
  ];
  // _________________function __________-

  const onSubmit = async (data) => {
    if (variantList?.length === 0) {
      ["price", "quantity", "sku"].forEach((field) => {
        setError(`variants.${field}`, {
          type: "manual",
          message: t("required_field"),
        });
      });
      return;
    }
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
      {/* <ProductVariants /> */}
      <form
        className="flex flex-col gap-10 px-4"
        onSubmit={handleSubmit(onSubmit)}
      >
        {" "}
        <section className="grid gap-6">
          {" "}
          <h3 className="text-neutral-black-900 h5">{t("prodcut_details")}</h3>
          <fieldset className="grid sm:grid-cols-2 md:grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-3 md:gap-6">
            <Form_Builder
              formList={formList}
              control={control}
              errors={errors}
            />
          </fieldset>
        </section>
        {/* tax rate */}
        <section className="grid gap-2 border-t border-dashed border-neutral-black-100 pt-6 ">
          <h3 className="text-neutral-black-900 h5">{t("tax")}</h3>
          <div className="grid sm:grid-cols-2 md:grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-3 md:gap-6">
            <Form_Builder
              formList={taxList}
              control={control}
              errors={errors}
            />
          </div>
        </section>
        {/* variants */}
        <section className="grid gap-6">
          <fieldset className="border-t border-dashed border-neutral-black-100 pt-6">
            <section className="grid gap-6">
              <h3 className="text-neutral-black-900 h5">{t("options")}</h3>
              <div className="grid sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-3 md:gap-6">
                <Form_Builder
                  formList={optionList}
                  control={control}
                  errors={errors}
                />
              </div>
              <Button
                text="add_option"
                className="ms-auto"
                handleClick={handleAddAnother}
              />
            </section>
          </fieldset>
          <section className="overflow-x-auto">
            <Table<Variant>
              loading={loading}
              emptyText="no_options_yet"
              columns={columns}
              data={variantList}
            />
          </section>
        </section>
        <Button
          loading={loading}
          disabled={loading}
          text={isEdit ? "save" : "add_product"}
          type="submit"
          hasFullWidth
        />
      </form>
    </Page_Wraper>
  );
};

export default Product_Management;
