import React, { useState } from "react";
import { useForm } from "react-hook-form";
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
import { numberPattern, skuPattern } from "../../common/constant/validator";

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
const Product_Management = () => {
  const { t } = useTranslation();
  const isEdit = location.pathname.includes("/edit");
  const pageTitle = isEdit ? "update_product" : "add_product";

  const [loading, setLoading] = useState(false);
  // ___________ useform _________
  const {
    control,
    setError,
    formState: { errors, isValid },
    handleSubmit,
  } = useForm({
    defaultValues: {
      title: "",
      title_ar: "",
      description: "",
      description_ar: "",
      sku: "",
      category: [],
      price: null,
      quantity: null,
      status: null,
      sizes: [],
      colors: [],
    },
    mode: "onChange",
  });

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
      hasFilter: true,
    },
    {
      id: "5",
      formType: "input",
      inputMode: "decimal",
      type: "text",
      name: "price",
      label: "price",
      placeholder: "price",
      fieldName: "price",
      validator: {
        required: "required_field",
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
    },
    {
      id: "6",
      formType: "input",
      inputMode: "number",
      type: "number",
      name: "quantity",
      label: "quantity",
      placeholder: "quantity",
      fieldName: "quantity",
      validator: {
        required: "required_field",
        min: {
          value: 1,
          message: t("min_quantity_error", { number: 1 }),
        },
        max: {
          value: 10000,
          message: t("max_quantity_error", { number: 10000 }),
        },
      },
    },
    {
      id: "7",
      formType: "input",
      inputMode: "text",
      type: "text",
      name: "sku",
      label: "sku",
      placeholder: "sku",
      fieldName: "sku",
      validator: {
        required: "required_field",
        pattern: {
          value: skuPattern,
          message: "sku_pattern",
        },
      },
    },
    {
      id: "8",
      formType: "switch",
      text: "show_as_featured",
      containerClassName: "!flex flex-col justify-end ",
      fieldName: "isFeatured",
    },
    {
      id: "9",
      formType: "multiselect",
      label: "sizes",
      fieldName: "size",
      placeholder: "size",
      optionList: sizeList,
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
          text={isEdit ? "save" : "add_product"}
          type="submit"
          hasFullWidth
        />
      </form>
    </Page_Wraper>
  );
};

export default Product_Management;
