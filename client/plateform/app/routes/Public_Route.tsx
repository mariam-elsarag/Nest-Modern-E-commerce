import { Navigate, Outlet } from "react-router";
import Cookies from "js-cookie";

const PublicRoute = () => {
  const token = Cookies.get("token");
  const role = Cookies.get("role");
  console.log(token, "skk");
  if (token) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};

export default PublicRoute;
