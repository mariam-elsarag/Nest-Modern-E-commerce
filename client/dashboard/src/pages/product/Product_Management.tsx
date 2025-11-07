import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import type { BreadCrumbListType } from "../../components/breadCrumb/Bread_Crumb.types";
import { Link, useNavigate, useParams } from "react-router-dom";
import { handleError } from "../../common/utils/handleError";
import Page_Wraper from "../../components/layout/page_wraper/Page_Wraper";
import Page_Title from "../../components/layout/header/page_title/Page_Title";
import Button from "../../components/shared/button/Button";
import Form_Builder from "../../components/shared/form_builder/Form_Builder";
import { avalibleList } from "../../common/lists/List";
import { currentLanguageCode } from "../../common/utils/switchLang";
import {
  numberPattern,
  skuPattern,
  taxRatePattern,
} from "../../common/constant/validator";

import type { FormListItemType } from "../../components/shared/form_builder/Form_Builder-types";
import { TrashIcon } from "../../assets/icons/Icon";
import { formatPrice } from "../../common/utils/formatPrice";
import Table from "../../components/shared/table/Table";
import useGetData from "../../hooks/useGetData";
import { API } from "../../services/apiUrl";
import axiosInstance from "../../services/axiosInstance";
import View_Colors from "../../components/shared/form_builder/View_Colors";
import { toast } from "react-toastify";

type Variant = {
  index?: number;
  id?: number;
  colors: string;
  sizes: string;
  price: number;
  quantity: number;
  sku: string;
  images: [];
};
const Product_Management = () => {
  const { t } = useTranslation();
  const { id } = useParams();
  const navigate = useNavigate();
  const isEdit = location.pathname.includes("/edit") || id;
  const pageTitle = isEdit ? "update_product" : "add_product";

  const [loading, setLoading] = useState(false);
  const [loadingData, setLoadingData] = useState(false);
  const [variantList, setVariantList] = useState<Variant[] | null>(null);
  // ___________ hooks _________
  const { data: categoryList } = useGetData(API.list.category);
  const { data: colorList } = useGetData(API.settting.color);
  const { data: sizeList } = useGetData(API.list.size);

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
      categories: [],
      hasTax: false,
      status: null,
      taxRate: 0,
      sku: "",
      cover: null,
      isFeatured: false,
      isAvalible: true,
      variants: {
        color: null,
        size: null,
        quantity: null,
        price: null,
        images: [],
      },
    },
    mode: "onChange",
  });
  const defaultTax = watch("defaultTax");
  const hasTax = watch("hasTax");
  // for append
  const variants = watch("variants");

  const handleAddAnother = () => {
    let hasEmptyField = false;

    ["price", "quantity", "color"].forEach((field) => {
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
          color: variants?.color || null,
          size: variants?.size || null,
          price: variants?.price || "",
          quantity: variants?.quantity || "",
          images: variants.images,
        },
      ]);

      setValue("variants", {
        color: null,
        size: null,
        price: null,
        quantity: null,
        images: [],
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
      fieldName: "isAvalible",
      placeholder: "status",
      optionList: avalibleList,
    },
    {
      id: "4",
      formType: "multiselect",
      label: "category",
      fieldName: "categories",
      placeholder: "category",
      optionList: categoryList?.map((item) => ({
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
      isEdit: isEdit,
      placeholder: "choose_cover_image",
      validator: {
        required: "required_field",
      },
    },
    {
      id: "15",
      formType: "input",
      inputMode: "text",
      type: "text",
      name: "sku",
      label: "sku",
      placeholder: "sku",
      fieldName: `sku`,
      validator: {
        required: "required_field",

        pattern: {
          value: skuPattern,
          message: "sku_pattern",
        },
      },
      inlineError: true,
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
    {
      id: "10",
      formType: "switch",
      text: "no_tax_description",
      containerClassName: "!flex flex-col justify-end ",
      fieldName: "hasTax",
    },
  ];

  const taxList: FormListItemType[] = [
    {
      id: "11",
      formType: "switch",
      text: "tax_message",
      containerClassName: "!flex flex-col justify-end ",
      fieldName: "defaultTax",
    },
    !defaultTax && {
      id: "12",
      formType: "input",
      type: "text",
      name: "tax_rate",
      label: "tax_rate",
      placeholder: "tax_rate",
      fieldName: "taxRate",

      validator: {
        validate: (value) => {
          if (!defaultTax) {
            if (!value) return "required_field";
            return taxRatePattern.test(value) ? true : "invalid_tax_rate";
          }
          return true;
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
  ]?.filter(Boolean);
  const optionList: FormListItemType[] = [
    {
      id: "13",
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
      id: "14",
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
      id: "16",
      formType: "dropdown",
      label: "size",
      fieldName: "variants.size",
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
      fieldName: `variants.color`,
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
      fieldName: "variants.images",
      variant: "upload",
      label: "images",
      isMultiple: true,
      limit: 8,
      placeholder: "choose_product_images",
    },
  ];

  const columns = [
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
      header: "color",
      field: "color",
      body: (item) => (
        <>
          {item?.color ? (
            <View_Colors
              color={item?.color?.color}
              text={
                currentLanguageCode === "en"
                  ? item?.color?.name
                  : item?.color.name_ar
              }
              id={item?.id}
            />
          ) : (
            "-"
          )}
        </>
      ),
    },
    {
      header: "size",
      field: "size",
      body: (item) => <> {item.size?.label ?? "-"}</>,
    },
    {
      header: "images",
      field: "images",
      body: (item) => (
        <div className="flex items-center gap-3 flex-wrap">
          {item?.images?.length > 0
            ? item?.images?.map((img, i) => (
                <figure
                  key={i}
                  className="w-12 h-12 flex items-center justify-center bg-neutral-white-100 rounded-[4px]"
                >
                  {img && (
                    <img
                      src={img.preview ?? img}
                      alt={`product img ${i + 1}`}
                      className="h-[46px] rounded-[4px]"
                    />
                  )}
                </figure>
              ))
            : "-"}
        </div>
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
      ["price", "quantity", "color"].forEach((field) => {
        setError(`variants.${field}`, {
          type: "manual",
          message: t("required_field"),
        });
      });
      return;
    }
    try {
      setLoading(true);
      console.log(data?.isFeatured);
      const endpoint = isEdit ? `${API.product.main}/${id}` : API.product.main;
      const method = isEdit ? "patch" : "post";
      const formData = new FormData();
      Object.entries(data).map(([key, value]) => {
        if (key === "variants") {
          return;
        }
        if (key === "taxRate" && data.defaultTax) {
          return;
        }

        if (key === "categories") {
          value?.map((cat, i) => {
            formData.append(`categories[${i}]`, cat);
          });
        }
        formData.append(key, value);
      });
      variantList.map((item, index) => {
        if (item?.id) {
          formData.append(`variants[${index}][id]`, item?.id);
        }
        formData.append(`variants[${index}][price]`, item?.price);
        formData.append(`variants[${index}][quantity]`, item?.quantity);
        formData.append(`variants[${index}][color]`, item?.color?.id);
        if (item?.size) {
          formData.append(`variants[${index}][size]`, item?.size?.id);
        }

        item.images?.forEach((img, i) => {
          const file = img.image || img.file || img;
          formData.append(`variants[${index}][images][${i}]`, file);
        });
      });

      // for (const [key, value] of formData.entries()) {
      //   console.log(key, value);
      // }

      const response = await axiosInstance?.[method](endpoint, formData);
      const message = isEdit
        ? "success_update_product"
        : "success_create_product";
      if (response.status === 200 || response.status === 201) {
        toast.success(t(message));

        navigate("/products");
      }
    } catch (err) {
      handleError(err, t, setError);
    } finally {
      setLoading(false);
    }
  };

  const getDetails = async () => {
    try {
      setLoadingData(true);
      const response = await axiosInstance.get(`${API.product.main}/${id}`);
      Object.entries(response.data).map(([key, value]) => {
        if (key === "categories") {
          setValue(
            key,
            value?.map(({ id }) => id)
          );
        } else if (key === "variants") {
          setVariantList(value);
        } else {
          setValue(key, value);
        }
      });
    } catch (err) {
      console.log(err.response);
      handleError(err, t, setError);
    } finally {
      setLoadingData(false);
    }
  };

  useEffect(() => {
    if (isEdit) {
      getDetails();
    }
  }, [isEdit]);
  return (
    <Page_Wraper
      list={breadcrumbsList}
      containerClassName="layer shadow_sm min-h-[85dvh] py-6"
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
              loading={loading || loadingData}
            />
          </fieldset>
        </section>
        {/* tax rate */}
        {hasTax && (
          <section className="grid gap-2 border-t border-dashed border-neutral-black-100 pt-6 ">
            <h3 className="text-neutral-black-900 h5">{t("tax")}</h3>
            <div className="grid sm:grid-cols-2 md:grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-3 md:gap-6">
              <Form_Builder
                formList={taxList}
                control={control}
                loading={loading || loadingData}
                errors={errors}
              />
            </div>
          </section>
        )}
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
