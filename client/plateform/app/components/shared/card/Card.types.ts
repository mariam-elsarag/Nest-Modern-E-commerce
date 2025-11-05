import type React from "react";
import type { Product } from "~/common/types/Type";

export interface CardComponentProps {
  data: Product;
  setData: React.Dispatch<React.SetStateAction<Product[]>>;
}
