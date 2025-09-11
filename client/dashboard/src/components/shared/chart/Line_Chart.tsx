import { Chart } from "primereact/chart";
import React, { useEffect, useState } from "react";
import type { TypeChartProps } from "./chart.types";
import { useTranslation } from "react-i18next";

type LineChartProps = {
  chart: TypeChartProps;
  hideScales: boolean;
};
const Line_Chart = ({ chart, hideScales }: LineChartProps) => {
  const { t } = useTranslation();
  const [chartData, setChartData] = useState({});
  const [chartOptions, setChartOptions] = useState({});

  useEffect(() => {
    const documentStyle = getComputedStyle(document.documentElement);

    const data = {
      labels: chart?.labels?.map((item) => t(item)),
      datasets: chart?.datasets?.map((item) => ({
        ...item,
        label: t(item?.label),
        borderColor: documentStyle.getPropertyValue(item?.borderColor),
      })),
    };
    const options = {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          display: false,
        },
      },
      scales: {
        x: {
          display: hideScales,
          ticks: {
            color: documentStyle.getPropertyValue("--color-neutral-black-200"),
          },
          grid: {
            color: documentStyle.getPropertyValue("--color-neutral-white-100"),
          },
        },
        y: {
          display: hideScales,
          ticks: {
            color: documentStyle.getPropertyValue("--color-neutral-black-200"),
          },
          grid: {
            color: documentStyle.getPropertyValue("--color-neutral-white-100"),
          },
        },
      },
    };

    setChartData(data);
    setChartOptions(options);
  }, [chart, t]);
  return (
    <div className=" w-full h-full ">
      <Chart
        type="line"
        data={chartData}
        options={chartOptions}
        className="h-full w-full"
      />
    </div>
  );
};

export default Line_Chart;
