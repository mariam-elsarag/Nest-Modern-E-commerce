import { Navigate, Outlet } from "react-router";
import Cookies from "js-cookie";

const PublicRoute = () => {
  const token = Cookies.get("token");

  if (token) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};

export default PublicRoute;
