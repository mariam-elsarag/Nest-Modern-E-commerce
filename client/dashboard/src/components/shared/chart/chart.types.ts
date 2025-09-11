export type DataSetType = {
  label?: string;
  data: number[];
  backgroundColor?: string;
  borderColor?: string;
  tension?: number;
  backgroundColors?: string[];
};

export type TypeChartProps = {
  labels: string[];
  datasets: DataSetType[];
};

export type StatCartProps = {
  title: string;
  subTitle: string;
  value: number;
  isPirce: boolean;
  type: "progress" | "bar" | "line";
  chartData?: TypeChartProps;
  monthlyGoal?: number;
};
