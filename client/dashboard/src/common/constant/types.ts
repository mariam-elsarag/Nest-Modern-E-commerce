import type { AccountStatus, TicketStatus, UserRole } from "./enum";

export interface UserType {
  id: number;
  fullName: string;
  phone: number;
  email: string;
  role: UserRole;
  status: AccountStatus;
  avatar: null | string;
  address: null | string;
  createdAt: Date;
}

export interface CategoryType {
  id: number;
  title: string;
  title_ar: string;
  createdAt?: Date;
}

export interface ProductType {
  id: number;
  title: string;
  title_ar: string;
  isAvalible?: boolean;
  sku: string;
  price: number;
  updatedAt: Date;
  categories: CategoryType[];
}

export interface SupportType {
  id: number;
  fullName: string;
  email: string;
  subject: string;
  message: string;
  status: TicketStatus;
  isDeleted?: boolean;
  isRead?: boolean;
  createdAt?: Date;
  solvedAt?: Date;
  repliedAt?: Date;
}

export interface FaqType {
  id: number;
  answer: string;
  answer_ar: string;
  question: string;
  question_ar: string;
}

export interface SizeType {
  id: number;
  label: string;
}

export interface ColorType {
  id: number;
  name: string;
  name_ar: string;
  createdAt: string;
}
