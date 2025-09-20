import React from "react";
import type { FormBuiderProps, FormListItemType } from "./Form_Builder-types";

import { useTranslation } from "react-i18next";
import {
  Controller,
  type ControllerRenderProps,
  type FieldError,
} from "react-hook-form";

import Password from "./Password";
import Phone_Number from "./Phone_Number";
import Upload_Media from "./Upload_Media";
import { InfoIcon } from "../../../assets/icons/Icon";
import { InputOtp } from "primereact/inputotp";
import { Dropdown } from "primereact/dropdown";
import { MultiSelect } from "primereact/multiselect";
import { InputSwitch } from "primereact/inputswitch";

const Form_Builder = ({
  formList,
  control,
  errors,
  loading,
  setError,
}: FormBuiderProps) => {
  const { t } = useTranslation();
  const renderField = (
    item: FormListItemType,
    field: ControllerRenderProps<any, any>,
    error: FieldError | undefined
  ) => {
    const isInvalid = !!(error?.message || errors?.[item?.fieldName]?.message);
    switch (item.formType) {
      case "input":
        return (
          <input
            id={item?.id}
            inputMode={item?.inputMode ?? "text"}
            name={item?.name}
            type={item?.type}
            value={field.value || item.value || ""}
            disabled={item.disabled || loading}
            placeholder={item.placeholder ? t(item.placeholder) : ""}
            className={`flex-1 w-full input main_h ${
              isInvalid ? "invalid" : ""
            } ${item.inputClassName || ""}`}
            onInput={(e) => item.onInput?.(e, field)}
            autoFocus={item.autFocus}
            onChange={(e) => {
              field.onChange(e);
              if (item?.action) {
                item?.action?.(e);
              }
            }}
            min={0}
            onKeyDown={item?.onKeyDown}
            onWheel={(e) => e.currentTarget.blur()}
          />
        );
      case "password":
        return (
          <Password
            value={field.value || item.value || ""}
            disabled={item.disabled || loading}
            isInvalid={isInvalid}
            item={item}
            error={error?.message || errors?.[item?.fieldName]?.message}
            handleChange={(e) => {
              field.onChange(e);
              if (item?.action) {
                item?.action?.(e);
              }
            }}
          />
        );
      case "otp":
        return (
          <div dir="ltr">
            <InputOtp
              value={field?.value}
              onChange={(e) => {
                field.onChange(e.value);
              }}
              disabled={item?.disabled || loading}
              integerOnly
              className="otp"
              length={6}
              inputProps={{ autoComplete: "off" }}
              invalid={error?.message || errors?.[item.fieldName]?.message}
            />
          </div>
        );

      case "phone":
        return (
          <Phone_Number
            value={field.value || item.value || ""}
            disabled={item.disabled || loading}
            isInvalid={isInvalid}
            item={item}
            error={error?.message || errors?.[item?.fieldName]?.message}
            handleChange={(e) => {
              field.onChange(e);
              if (item?.action) {
                item?.action?.(e);
              }
            }}
          />
        );
      case "textarea":
        return (
          <textarea
            id={item?.id}
            name={item?.name}
            value={field.value || item.value || ""}
            disabled={item.disabled || loading}
            placeholder={item.placeholder ? t(item.placeholder) : ""}
            className={`flex-1 w-full input resize-none h-[128px] ${
              isInvalid ? "invalid" : ""
            } ${item.inputClassName || ""}`}
            autoFocus={item.autFocus}
            onChange={(e) => {
              field.onChange(e);
              if (item?.action) {
                item?.action?.(e);
              }
            }}
          />
        );
      case "dropdown":
        return (
          <div>
            <Dropdown
              options={item?.optionList}
              value={field?.value}
              onChange={(e) => {
                if (item?.action && item?.fieldName) {
                  item?.action(e?.value);
                }
                field?.onChange(e);
              }}
              disabled={item?.disabled || loading || item?.loading}
              placeholder={t(item?.placeholder || "")}
              className={`flex-1 w-full !p-0  ${error ? "invalid" : ""} `}
              optionLabel="name"
              inputId={item?.id}
              filter={item?.hasFilter || false}
              loading={item?.loading ? true : false}
            />
          </div>
        );
      case "multiselect":
        return (
          <MultiSelect
            options={item?.optionList}
            value={field?.value}
            onChange={(e) => {
              field?.onChange(e);
            }}
            disabled={item?.disabled || loading}
            placeholder={t(item?.placeholder || "")}
            className={`flex-1 w-full !p-0 ${
              item?.disabled || loading ? "disabled_input" : ""
            } ${error ? "invalid" : ""}  `}
            optionLabel="name"
            inputId={item?.id}
            filter={item?.hasFilter || false}
            maxSelectedLabels={2}
          />
        );
      case "media":
        return (
          <Upload_Media
            variant={item?.variant}
            validTypes={item?.validTypes}
            setError={setError}
            error={error?.message || errors?.[item?.fieldName]?.message}
            handleChange={(e) => {
              field.onChange(e);
            }}
            value={field.value || item.value || ""}
            disabled={item.disabled || loading}
            item={item}
          />
        );
      case "switch":
        return (
          <div className="flex flex-row-reverse items-center gap-2 max-w-[350px]">
            <label
              className=" flex-1 body font-medium text-neutral-black-400"
              htmlFor={item?.id}
            >
              {t(item?.text)}
            </label>
            <InputSwitch
              inputId={item?.id}
              invalid={error?.message || errors?.[item?.fieldName]?.message}
              checked={field?.value}
              onChange={(e) => field?.onChange(e.value)}
              disabled={item?.disabled || loading}
            />
          </div>
        );
      default:
        return <></>;
    }
  };
  return (
    <>
      {formList?.length > 0 &&
        formList?.map(
          (formItem) =>
            formItem && (
              <fieldset
                key={formItem.id}
                className={`flex-1 grid gap-2 content-baseline ${
                  formItem.containerClassName || ""
                }`}
              >
                {formItem.label && (
                  <label
                    className={`body text-neutral-black-600 capitalize font-medium ${
                      formItem.labelClassName || ""
                    }`}
                    htmlFor={formItem.fieldName}
                    dangerouslySetInnerHTML={{
                      __html: t(String(formItem.label)),
                    }}
                  />
                )}
                {formItem.fieldName && (
                  <Controller
                    name={formItem.fieldName}
                    control={control}
                    rules={formItem.validator}
                    render={({ field, fieldState: { error } }) =>
                      renderField(formItem, field, error)
                    }
                  />
                )}
                {/* info */}
                {formItem.info && !errors?.[formItem.fieldName]?.message && (
                  <p className="text-neutral-white-100 body">{formItem.info}</p>
                )}
                {errors?.[formItem.fieldName]?.message &&
                  !formItem?.inlineError && (
                    <p className="flex items-center gap-1">
                      <span>
                        <InfoIcon
                          width="20"
                          height="20"
                          fill={
                            formItem?.errorFill ??
                            "var(--color-semantic-red-900)"
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
              </fieldset>
            )
        )}
    </>
  );
};

export default Form_Builder;
