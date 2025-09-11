export interface OrderType {
  id: number;
  image: string | null;
  title: string;
  title_ar: string;
  createdAt: date;
  status: "pending" | "completed" | "cancelled" | "shipped";
  price: number;
  quantity: number;
}
