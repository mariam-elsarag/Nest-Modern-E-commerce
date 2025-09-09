import { data } from "react-router-dom";
import type { StatCartProps } from "../../common/types/Type";
import Page_Wraper from "../../components/layout/page_wraper/Page_Wraper";
import Stat_Card from "./components/Stat_Card";

const Statistics = () => {
  const statCartData: StatCartProps = [
    {
      title: "total_sales",
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
  ];
  return (
    <Page_Wraper label="dashboard">
      <section className="grid grid-cols-3 gap-9">
        {statCartData?.map((data) => (
          <Stat_Card key={data?.title} data={data} />
        ))}
      </section>
    </Page_Wraper>
  );
};

export default Statistics;
