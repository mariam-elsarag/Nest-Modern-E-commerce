import { data } from "react-router-dom";
import type {
  StatCartProps,
  TypeChartProps,
} from "../../components/shared/chart/chart.types";
import Page_Wraper from "../../components/layout/page_wraper/Page_Wraper";
import Stat_Card from "./components/Stat_Card";
import { useTranslation } from "react-i18next";
import Line_Chart from "../../components/shared/chart/Line_Chart";
import Chart_Wraper from "../../components/shared/chart/Chart_Wraper";
import Dount_Chart from "../../components/shared/chart/Dount_Chart";
import Latest_Orders from "./components/Latest_Orders";

const Statistics = () => {
  const { t } = useTranslation();
  const statCartData: StatCartProps[] = [
    {
      title: "total_sales",
      subTitle: "this_month",
      value: 4.235,
      isPirce: true,
      type: "bar",
      chartData: {
        labels: [
          "January",
          "February",
          "March",
          "April",
          "May",
          "June",
          "July",
        ],
        datasets: [
          {
            label: "total_sales",
            data: [100, 200, 700, 500, 200, 100],
            backgroundColor: "--color-primary-900",
          },
        ],
      },
    },
    {
      title: "customers",
      subTitle: "this_month",
      value: 2.571,
      isPirce: false,
      type: "line",
      chartData: {
        labels: [
          "January",
          "February",
          "March",
          "April",
          "May",
          "June",
          "July",
        ],
        datasets: [
          {
            label: "customers",
            data: [100, 200, 700, 500, 200, 100],
            borderColor: "--color-primary-900",
            tension: 0.4,
          },
        ],
      },
    },
    {
      title: "orders",
      subTitle: `${t("monthly_goal", { goal: 1000 })}`,
      value: 100,
      isPirce: false,
      type: "progress",
      monthlyGoal: 1000,
    },
  ];
  const revenueData: TypeChartProps = {
    labels: ["January", "February", "March", "April", "May", "June", "July"],
    datasets: [
      {
        label: "revenue",
        data: [28, 48, 40, 19, 86, 27, 90],
        borderColor: "--color-primary-900",
        tension: 0.4,
      },
    ],
  };
  const orderData: TypeChartProps = {
    labels: ["completed_orders", "pending_orderd", "cancelled_orders"],
    datasets: [
      {
        data: [300, 50, 100],
        backgroundColors: [
          "--color-primary-900",
          "--color-primary-700",
          "--color-primary-300",
        ],
      },
    ],
  };
  return (
    <Page_Wraper label="dashboard">
      <section className="grid sm:grid-cols-2 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {statCartData?.map((data) => (
          <Stat_Card key={data?.title} data={data} />
        ))}
      </section>
      <section className="grid lg:grid-cols-2  xl:grid-cols-[1fr_400px] gap-6">
        <Chart_Wraper title="revnue">
          <Line_Chart chart={revenueData} hideScales={true} />
        </Chart_Wraper>
        <Chart_Wraper title="orders">
          <Dount_Chart chart={orderData} />
        </Chart_Wraper>
      </section>
      <Latest_Orders />
    </Page_Wraper>
  );
};

export default Statistics;
