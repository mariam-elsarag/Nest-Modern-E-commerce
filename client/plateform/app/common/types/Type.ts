export interface Product {
  id: number;
  cover: string;
  images?: string[];
  sizes?: "xs" | "s" | "m" | "l" | "xl" | "xxl"[];
  title: string;
  description?: string;
  price: number;
  rate: number;
  isFavorite: null | boolean;
  colors?: string[];
  brand?: string;
  categories?: string[];
  stock?: number;
  isFeatured?: boolean;
  isBestSelling?: boolean;
  createdAt: Date;
  quantity?: number;
}

export type ReviewType = {
  productId: number;
  fullName: string | null;
  avatar: string | null;
  rate: number;
  review: string;
  createdAt?: Date;
};

export type CategoryType = {
  id: number;
  title: string;
  title_ar: string;
};

export type ColorsType = {
  id: number;
  color: string;
};

export type SizesType = {
  id: number;
  size: string;
};

export type CartProductsType = {
  orderId?: number;
  title: string;
  color: string;
  price: number;
  quantity: number;
  discount: number | null;
  stock: number;
  size: SizesType | null;
  cover: string;
  createdAt?: string;
};
export type CartItemType = {
  id: number;
  products: CartProductsType[];
  subtotal: number;
  shipping: "free" | number;
  tax: "no_tax" | number;
  total: number;
};
