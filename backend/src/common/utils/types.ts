import { UserRole } from './enum';

export interface JwtPayload {
  id: number;
  role: UserRole;
}
export interface JwtReturnTypePayload extends JwtPayload {
  iat: number;
}
