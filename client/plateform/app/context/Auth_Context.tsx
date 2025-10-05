import type {
  AuthContextType,
  AuthProviderType,
  LoginType,
} from "./Auth_Context.types";
import { createContext, useContext, useState } from "react";
import Cookies from "js-cookie";

const AuthContext = createContext<AuthContextType | null>(null);
const AuthProvider = ({ children }: AuthProviderType) => {
  const [token, setToken] = useState<string | null>(Cookies.get("token"));

  const [user, setUser] = useState<UserType>({
    id: Cookies.get("id"),
    fullName: Cookies.get("fullName"),
    role: Cookies.get("role"),
    avatar: Cookies.get("avatar"),
  });
  const login = (data: LoginType) => {
    Cookies.set("token", data?.token, { expires: 20 });
    Cookies.set("id", data.id || "", { expires: 20 });
    Cookies.set("avatar", data.avatar || "", { expires: 20 });
    Cookies.set("fullName", data.fullName || "", { expires: 20 });
    Cookies.set("role", data.role || "", { expires: 20 });

    setToken(data.token);
    setUser({
      id: data.id,
      fullName: data.fullName,
      avatar: data.avatar,
      role: data.role,
    });
  };

  const logout = () => {
    Cookies.remove("role");
    Cookies.remove("token");
    Cookies.remove("fullName");
    Cookies.remove("avatar");
    Cookies.remove("id");

    setToken(null);
    setUser({ id: null, fullName: null, avatar: null, role: null });
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
