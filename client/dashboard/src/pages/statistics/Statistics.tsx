import { data } from "react-router-dom";
import type { StatCartProps } from "../../common/types/Type";
import Page_Wraper from "../../components/layout/page_wraper/Page_Wraper";
import Stat_Card from "./components/Stat_Card";
import { useTranslation } from "react-i18next";

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
  return (
    <Page_Wraper label="dashboard">
      <section className="grid sm:grid-cols-2 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {statCartData?.map((data) => (
          <Stat_Card key={data?.title} data={data} />
        ))}
      </section>
    </Page_Wraper>
  );
};

export default Statistics;
