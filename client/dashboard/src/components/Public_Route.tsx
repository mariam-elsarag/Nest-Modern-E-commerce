import { useAuth } from "../context/Auth_Context";
import { Navigate, Outlet } from "react-router-dom";

const Public_Route = () => {
  const { token } = useAuth();
  if (token) {
    return <Navigate to="/" replace />;
  }
  return <Outlet />;
};

export default Public_Route;
