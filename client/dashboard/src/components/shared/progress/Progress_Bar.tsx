import React from "react";
import { useTranslation } from "react-i18next";

type ProgressBarProps = {
  goal: number;
  currentValue: number;
};

const Progress_Bar = ({ goal, currentValue }: ProgressBarProps) => {
  const { t } = useTranslation();
  const left = goal - currentValue;
  const percentage = Math.min((currentValue / goal) * 100, 100);

  return (
    <div className="flex flex-col gap-1 justify-end h-full">
      {left > 0 && (
        <span className="text-neutral-black-500 label font-medium">
          {" "}
          {t("_left", { number: left })}
        </span>
      )}
      <div className="w-full relative bg-primary-100 h-2 rounded-full">
        <div
          style={{ width: `${percentage}%` }}
          className="bg-primary-900 h-2 rounded-full"
        />
      </div>
    </div>
  );
};

export default Progress_Bar;
