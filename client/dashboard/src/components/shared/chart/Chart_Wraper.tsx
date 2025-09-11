import React from "react";
import { useTranslation } from "react-i18next";
type ChartWraperProps = {
  children?: React.ReactNode;
  containerClassName?: string;
  title?: string;
};
const Chart_Wraper = ({
  title,
  children,
  containerClassName,
}: ChartWraperProps) => {
  const { t } = useTranslation();
  return (
    <div
      className={` shadow_sm layer flex flex-col gap-6 w-full p-4 min-h-[300px] ${
        containerClassName ?? ""
      }`}
    >
      {title && <h2 className="h4 capitalize text-primary">{t(title)}</h2>}
      <div className="overflow-x-hidden h-full">{children}</div>
    </div>
  );
};

export default Chart_Wraper;
