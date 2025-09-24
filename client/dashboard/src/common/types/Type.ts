export interface OrderType {
  id: number;
  image: string | null;
  title: string;
  title_ar: string;
  createdAt: string;
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
export interface CategoryType {
  id: number;
  title: string;
  title_ar: string;
}
export interface ContactType {
  id: number;
  fullName: string;
  message: string;
}
export interface FaqType {
  id: number;
  answer: string;
  answer_ar: string;
  question: string;
  question_ar: string;
}
export interface NotificationType {
  notificationId: number;
  type:
    | "order"
    | "review"
    | "contact"
    | "outOfStock"
    | "achieveGoal"
    | "missedGoal";
  markAsRead: boolean;
  id: number;
  message: string;
  message_ar: string;
}
export interface ProductType {
  id: number;
  image: string | null;
  title: string;
  title_ar: string;
  sku: number | string;
  price: number;
  quantity: number;
  status: "inStock" | "outOfStock" | "lowStock";
  categores: CategoryType[];
  description?: string;
  description_ar?: string;
  discountPrice?: number;
  isFeatured?: boolean;
  createdAt?: string;
}
