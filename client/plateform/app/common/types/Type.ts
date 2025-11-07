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
  images: string[] | null;
};
export interface Product {
  id: number;
  cover: string;

  title: string;
  title_ar: string;
  isAvalible: boolean;
  isFavorite?: boolean;
  isCart?: boolean;
  price: number;
  variantId?: number;
  averageRating: number;
  description?: string;
  description_ar?: string;
  cartItemId?: number | null;
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
  id: number;
  cover: string;
  title: string;
  title_ar: string;
  color: ColorsType;
  size: SizesType | null;
  quantity: number;
  maxQuantity: number;
  variantId: number;
  price: number;
  isValid: boolean;
};
export type CartItemType = {
  id: number;
  product: CartProductsType[];
  total: number;
};

export interface AddressType {
  street: string;
  city: string;
  country: string;
  state: string;
  zipCode: string | null;
  fullAddress: string;
}
export interface ProfileType {
  id: number;
  fullName: string;
  phone: string | null;
  email: string;
  role: string;
  avatar: string | null;
  address: AddressType;
  createdAt: string;
}
