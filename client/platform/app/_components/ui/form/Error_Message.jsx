import { InfoIcon } from "@/app/_assets/icons/Icon";
import { useTranslations } from "next-intl";
import React from "react";

const Error_Message = ({ item, error }) => {
  const t = useTranslations();
  return (
    <div className="flex items-center gap-1">
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
    </div>
  );
};

export default Error_Message;
