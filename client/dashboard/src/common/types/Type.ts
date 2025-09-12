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

export interface UserType {
  id: number;
  fullName: string;
  avatar: string | null;
  email: string;
  address: string | null;
  status: "active" | "blocked" | "deleted";
  phone: string;
}

export interface ReviewType {
  id: number;
  user: Pick<UserType, "avatar" | "fullName">;
  review: string;
}
