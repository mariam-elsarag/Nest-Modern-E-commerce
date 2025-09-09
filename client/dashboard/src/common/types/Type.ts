export type DataSetType = {
  label: string;
  data: number[];
  backgroundColor?: string;
  borderColor?: string;
};

export type TypeChartProps = {
  labels: string[];
  datasets: DataSetType[];
};

export type StatCartProps = {
  title: string;
  value: number;
  isPirce: boolean;
  type: "progress" | "bar" | "line";
  chartData: TypeChartProps;
};
