import { Chart } from "primereact/chart";
import React, { useEffect, useState } from "react";
import type { TypeChartProps } from "../../../common/types/Type";
import { useTranslation } from "react-i18next";

type LineChartProps = {
  chart: TypeChartProps;
};
const Line_Chart = ({ chart }: LineChartProps) => {
  const { t } = useTranslation();
  const [chartData, setChartData] = useState({});
  const [chartOptions, setChartOptions] = useState({});

  useEffect(() => {
    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue("--text-color");
    const textColorSecondary = documentStyle.getPropertyValue(
      "--text-color-secondary"
    );
    const surfaceBorder = documentStyle.getPropertyValue("--surface-border");
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
          display: false,
        },
        y: {
          display: false,
        },
      },
    };

    setChartData(data);
    setChartOptions(options);
  }, [chart, t]);
  return (
    <div className="h-[50px] w-full ">
      <Chart
        type="line"
        data={chartData}
        options={chartOptions}
        className="h-[50px] w-full"
      />
    </div>
  );
};

export default Line_Chart;
