import { Chart } from "primereact/chart";
import React, { useEffect, useState } from "react";
import type { TypeChartProps } from "../../../common/types/Type";
import { data } from "react-router-dom";
import { useTranslation } from "react-i18next";

type BarChartProps = {
  chart: TypeChartProps;
};
const Bar_Chart = ({ chart }: BarChartProps) => {
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
        backgroundColor: documentStyle.getPropertyValue(item?.backgroundColor),
      })),
    };
    const options = {
      responsive: true,
      maintainAspectRatio: false,
      // aspectRatio: 2.9,
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
          beginAtZero: true,
          display: false,
        },
      },
    };

    setChartData(data);
    setChartOptions(options);
  }, [data]);
  return (
    <div className="h-[50px] w-full ">
      <Chart
        className="h-[50px] w-full"
        type="bar"
        data={chartData}
        options={chartOptions}
      />
    </div>
  );
};

export default Bar_Chart;
