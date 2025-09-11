import React from "react";
import type { StatCartProps } from "../../../components/shared/chart/chart.types";
import { useTranslation } from "react-i18next";
import { formatPrice } from "../../../common/utils/formatPrice";
import Bar_Chart from "../../../components/shared/chart/Bar_Chart";
import Line_Chart from "../../../components/shared/chart/Line_Chart";
import Progress_Bar from "../../../components/shared/progress/Progress_Bar";

const Stat_Card = ({ data }: StatCartProps) => {
  const { t } = useTranslation();
  return (
    <div className=" layer shadow_sm overflow-x-hidden rounded-lg p-6 flex flex-col gap-10 ">
      <header className="flex items-center gap-1 justify-between">
        {/* title */}
        <div className="flex flex-col gap-1.5">
          <strong className="h5 font-semibold text-primary capitalize ">
            {t(data?.title)}
          </strong>
          <p className="uppercase text-neutral-black-500 label font-medium">
            {t(data?.subTitle)}
          </p>
        </div>
        <p className="h3 text-primary font-bold truncate">
          {data?.isPirce
            ? data?.value
              ? formatPrice(data?.value)
              : "0"
            : data?.value}
        </p>
      </header>
      {data?.type === "bar" ? (
        <div className="h-[50px]">
          <Bar_Chart chart={data?.chartData} />
        </div>
      ) : data?.type === "line" ? (
        <div className="h-[50px]">
          <Line_Chart chart={data?.chartData} hideScales={false} />
        </div>
      ) : (
        <Progress_Bar goal={data?.monthlyGoal} currentValue={data?.value} />
      )}
    </div>
  );
};

export default Stat_Card;
