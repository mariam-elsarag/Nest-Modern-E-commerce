import React from "react";
import type { SectionHeaderPropsType } from "./Section_Header.types";
import { useTranslation } from "react-i18next";

const Section_Header = ({
  title,
  subTitle,
  position = "top",
  isCenter = false,
}: SectionHeaderPropsType) => {
  const { t } = useTranslation();
  return (
    <header className={`${isCenter ? "w-fit mx-auto" : "flex flex-col gap-6"}`}>
      {position === "top" && (
        <sup className="text-neutral-black-300 label font-medium tracking-[2px] uppercase">
          {t(subTitle)}
        </sup>
      )}
      <h2 className="h3 font-bold text-neutral-black-900">{t(title)}</h2>
      {position === "bottom" && (
        <sup className="text-neutral-black-300 label font-medium tracking-[2px] uppercase">
          {t(subTitle)}
        </sup>
      )}
    </header>
  );
};

export default Section_Header;
