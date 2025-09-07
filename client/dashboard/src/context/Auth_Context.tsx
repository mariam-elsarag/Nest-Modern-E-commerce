import React, {
  createContext,
  useContext,
  useState,
  type ReactNode,
} from "react";
import { useNavigate } from "react-router-dom";
import type {
  AuthContextType,
  AuthProviderType,
  LoginType,
  UserType,
} from "./Auth_Context.types";
import Cookies from "js-cookie";

const AuthContext = createContext<AuthContextType | null>(null);

const AuthProvider = ({ children }: AuthProviderType) => {
  const navigate = useNavigate();
  const [token, setToken] = useState<string | null>(Cookies.get("token"));

  const [user, setUser] = useState<UserType>({
    id: localStorage.getItem("id"),
    fullName: localStorage.getItem("fullName"),
    role: localStorage.getItem("role"),
    avatar: localStorage.getItem("avatar"),
  });
  const login = (data: LoginType, rememberUser: boolean) => {
    if (rememberUser) {
      Cookies.set("token", data?.token, { expires: 20 });
    } else {
      Cookies.set("token", data?.token);
    }

    localStorage.setItem("id", data.id || "");
    localStorage.setItem("avatar", data.avatar || "");
    localStorage.setItem("fullName", data.fullName || "");
    localStorage.setItem("role", data.role || "");

    setToken(data.token);
    setUser({
      id: data.id,
      fullName: data.fullName,
      avatar: data.avatar,
      role: data.role,
    });
  };

  const logout = (nav = "/") => {
    Cookies.remove("token");
    localStorage.clear();
    setToken(null);
    setUser({ id: null, fullName: null, avatar: null, role: null });
    navigate(nav);
  };

  return (
    <AuthContext.Provider
      value={{ token, setToken, user, setUser, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within an AuthProvider");
  return context;
}

export { useAuth, AuthProvider };
