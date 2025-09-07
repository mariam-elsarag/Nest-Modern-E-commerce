// routes/ProtectedRoute.tsx
import { Navigate, Outlet } from "react-router";

const Protected_Route = () => {
  const token = localStorage.getItem("token");

  if (!token) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};

export default Protected_Route;
