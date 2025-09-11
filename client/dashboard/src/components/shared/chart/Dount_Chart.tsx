import React, { useEffect, useMemo, useState } from "react";
import type { TypeChartProps } from "./chart.types";
import { useTranslation } from "react-i18next";
import { Chart } from "primereact/chart";

type DountChartProps = {
  chart: TypeChartProps;
};
const Dount_Chart = ({ chart }: DountChartProps) => {
  const { t } = useTranslation();
  const [chartData, setChartData] = useState({});
  const [chartOptions, setChartOptions] = useState({});
  const isAllZero = useMemo(() => {
    return (
      Array.isArray(chart) &&
      chart.datasets?.at(0)?.data.every((value) => value === 0)
    );
  }, [chart]);
  useEffect(() => {
    const documentStyle = getComputedStyle(document.documentElement);

    const data = {
      labels: chart?.labels?.map((item) => t(item)),
      datasets: chart?.datasets?.map((item) => ({
        ...item,
        data: isAllZero ? [1] : chart?.datasets?.[0]?.data,
        backgroundColor: isAllZero
          ? documentStyle.getPropertyValue("--color-neutral-white-100")
          : chart?.datasets?.[0].backgroundColors?.map((item) =>
              documentStyle.getPropertyValue(item)
            ),
      })),
    };
    const options = {
      cutout: "80%",
      plugins: {
        legend: { display: false },
        tooltip: {
          enabled: !isAllZero,
        },
      },
    };

    setChartData(data);
    setChartOptions(options);
  }, [chart, t]);
  return (
    <div className=" flex flex-col items-center justify-center text-center ">
      <Chart
        type="doughnut"
        data={chartData}
        options={chartOptions}
        className="h-[200px]"
      />
      {!isAllZero && (
        <div className="flex justify-around mt-4 body flex-wrap text-neutral-black-500 gap-2">
          {chart?.labels?.map((item, index) => (
            <div key={index} className="flex items-center gap-1">
              <div
                className="w-4 h-2 rounded-full"
                style={{
                  backgroundColor: `var(${chart?.datasets?.[0]?.backgroundColors?.[index]})`,
                }}
              ></div>
              {t(item)}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Dount_Chart;
