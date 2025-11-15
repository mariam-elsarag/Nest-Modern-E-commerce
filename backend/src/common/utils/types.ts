import { UserRole } from './enum';

export interface JwtPayload {
  id: number;
  role: UserRole;
  email: string;
}
export interface JwtReturnTypePayload extends JwtPayload {
  iat: number;
}

export type ContextType = {
  fullName?: string;
  type?: string;
  title?: string;
  email?: string;
  otp?: string;
  userMessage?: string;
  adminReply?: string;
  subject?: string;
  url?: string;
  expire?: number;
};

export type InvalidCartItemType = {
  type: 'product_unavailable' | 'variant_deleted' | 'quantity_not_available';
  variantId: number;
  available?: number;
  productTitle?: string;
  productTitleAr?: string;
};
