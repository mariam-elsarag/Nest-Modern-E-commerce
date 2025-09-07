import { useAuth } from "../context/Auth_Context";
import { Navigate, Outlet } from "react-router-dom";

const Protect_Route = () => {
  const { token } = useAuth();
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};

export default Protect_Route;
