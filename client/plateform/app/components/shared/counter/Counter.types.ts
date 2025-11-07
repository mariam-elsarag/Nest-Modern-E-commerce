import type React from "react";

export type CounterPropsType = {
  quantity: number;
  size?: "lg" | "md";
  value: number;
  setValue: React.Dispatch<React.SetStateAction<any>>;
};
