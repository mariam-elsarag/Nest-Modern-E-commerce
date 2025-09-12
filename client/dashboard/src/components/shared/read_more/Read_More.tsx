import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import type { ReadMorePorps } from "./Read_More.types";

const Read_More = ({
  text = "",
  maxLength = 100,
  className = "",
}: ReadMorePorps) => {
  const { t } = useTranslation();
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleReadMore = () => setIsExpanded((prev) => !prev);

  return (
    <p
      className={`body2 font-normal text-dark-blue-alt text-wrap  overflow-hidden ${className}`}
    >
      {isExpanded ? text : text.slice(0, maxLength)}
      {text.length > maxLength && (
        <span
          onClick={toggleReadMore}
          className="cursor-pointer !text-blue font-ibm body2 "
        >
          {isExpanded ? `.${t("read_less")}` : `.${t("read_more")}`}
        </span>
      )}
    </p>
  );
};

export default Read_More;
