import type { AccountStatus, UserRole } from "./enum";

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
