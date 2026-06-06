"use client";

import { InfoIcon } from "@/app/_assets/icons/Icon";
import { FORM_FIELDS_MAP } from "@/app/_lib/config/form.map";
import { useTranslations } from "next-intl";
import React from "react";
import { Controller, useFormContext } from "react-hook-form";

const Form_Builder = ({ formList, loading }) => {
  const t = useTranslations();
  const {
    control,
    setError,
    formState: { errors },
  } = useFormContext();
  const renderField = (item, field, error) => {
    const isInvalid = error?.message || errors?.[item?.fieldName]?.message;
    const FieldComponent = FORM_FIELDS_MAP[item.formType];
    const disabled = item.disabled || loading;
    if (!FieldComponent) return null;

    return (
      <FieldComponent
        item={item}
        field={field}
        loading={loading}
        disabled={disabled}
        isInvalid={isInvalid}
        setError={setError}
      />
    );
  };
  return (
    <>
      {formList?.map((formItem) => (
        <fieldset
          key={formItem?.id}
          className={`grid gap-2 content-baseline ${formItem?.containerClassName || ""}`}
        >
          {formItem.label && (
            <label
              className={`body text-neutral-black-600 capitalize font-medium ${formItem.labelClassName || ""}`}
              htmlFor={formItem.fieldName}
              dangerouslySetInnerHTML={{
                __html: t(String(formItem.label)),
              }}
            />
          )}
          <div className="grid gap-2">
            <Controller
              name={formItem?.fieldName}
              control={control}
              rules={formItem?.validator}
              shouldUnregister={false}
              render={({ field, fieldState: { error } }) =>
                renderField(formItem, field, error)
              }
            />
            {/* Info Text */}
            {/* info */}
            {formItem.info && !errors?.[formItem.fieldName]?.message && (
              <p className="text-neutral-white-100 body">{formItem.info}</p>
            )}
            {/* Error Text */}

            {errors?.[formItem.fieldName]?.message &&
              !formItem?.inlineError && (
                <p className="flex items-center gap-1">
                  <span>
                    <InfoIcon
                      width="20"
                      height="20"
                      fill={
                        formItem?.errorFill ?? "var(--color-semantic-red-900)"
                      }
                    />
                  </span>
                  <span
                    className={`text-semantic-red-900 text-xs ${
                      formItem?.errorClassName ?? ""
                    }`}
                  >
                    {t(String(errors[formItem.fieldName]?.message))}
                  </span>
                </p>
              )}
          </div>
        </fieldset>
      ))}
    </>
  );
};

export default Form_Builder;
