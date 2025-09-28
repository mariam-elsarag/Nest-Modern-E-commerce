import { UserRole } from './enum';

export interface JwtPayload {
  id: number;
  role: UserRole;
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
  url?: string;
  expire?: number;
};
