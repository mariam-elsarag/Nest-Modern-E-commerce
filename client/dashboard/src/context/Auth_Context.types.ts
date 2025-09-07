import type React from "react";

export type UserType = {
  id: string | null;
  fullName: string | null;
  role: string | null;
  avatar: string | null;
};

export type LoginType = UserType & {
  token: string | null;
};
export type AuthContextType = {
  token: string | null;
  setToken: React.Dispatch<React.SetStateAction<string | null>>;
  user: UserType;
  setUser: React.Dispatch<React.SetStateAction<UserType>>;
  login: (data: LoginType, rememberUser: boolean) => void;
  logout: () => void;
};

export type AuthProviderType = {
  children: React.ReactNode;
};
