import React from "react";
import type { FormListItemType } from "./Form_Builder-types";
import { useTranslation } from "react-i18next";

import { MultiSelect } from "primereact/multiselect";
import View_Colors from "./View_Colors";
import { Dropdown } from "primereact/dropdown";
import { InfoIcon } from "../../../assets/icons/Icon";

type ColorSelectorPops = {
  error?: any;
  handleChange?: (e: any) => void;
  value?: any;
  item: FormListItemType;
  disabled?: boolean;
};
const Color_Selector = ({
  error,
  handleChange,
  value,
  item,
  disabled,
}: ColorSelectorPops) => {
  const { t } = useTranslation();
  const valueTemplate = (option) => {
    if (!option || !option.value) {
      return (
        <span className="text-gray-400">
          {t(item?.placeholder || "Select an icon")}
        </span>
      );
    }

    return <h4 className="text-neutral-black-900 body">{option?.name}</h4>;
  };
  const itemTemplate = (option) => {
    return <View_Colors color={option?.color} text={option?.name} />;
  };
  return (
    <>
      <Dropdown
        options={item?.optionList}
        optionLabel="name"
        optionValue="value"
        valueTemplate={valueTemplate}
        itemTemplate={itemTemplate}
        value={value}
        onChange={handleChange}
        disabled={disabled}
        placeholder={t(item?.placeholder || "")}
        className={`flex-1 w-full !p-0  ${error ? "invalid" : ""} `}
        inputId={item?.id}
        filter={item?.hasFilter || false}
        invalid={error}
        panelClassName="horizontal-icon-dropdown"
      />
      {item?.inlineError && error && (
        <p className="flex items-center gap-1">
          <span>
            <InfoIcon
              width="20"
              height="20"
              fill={item?.errorFill ?? "var(--color-semantic-red-900)"}
            />
          </span>
          <span
            className={`text-semantic-red-900 text-xs ${
              item?.errorClassName ?? ""
            }`}
          >
            {t(error)}
          </span>
        </p>
      )}
    </>
  );
};

export default Color_Selector;
