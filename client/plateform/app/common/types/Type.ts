export interface Size {
  id: number;
  label: string;
}

export type variants = {
  id: number;
  price: number;
  quantity: number;
  reserved: number;
  color: ColorsType;
  size: null | SizesType;
};
export interface Product {
  id: number;
  cover: string;
  images?: string[];
  title: string;
  title_ar: string;
  isAvalible: boolean;
  isFavorite?: boolean;
  isCart?: boolean;
  minPrice?: number;
  price: number;
  averageRating: number;
  description?: string;
  description_ar?: string;

  variants: variants[];
  categories?: string[];

  createdAt: Date;
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
  name: string;
  name_ar: string;
  color: string;
  createdAt: string;
};

export type SizesType = {
  id: number;
  label: string;
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
