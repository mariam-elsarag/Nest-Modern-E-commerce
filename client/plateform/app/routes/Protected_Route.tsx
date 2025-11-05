import { Navigate, Outlet } from "react-router";
import Cookies from "js-cookie";
import { useAuth } from "~/context/Auth_Context";

const Protected_Route = () => {
  const { user, token } = useAuth();

  if (!token && user.role != "user") {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};

export default Protected_Route;
