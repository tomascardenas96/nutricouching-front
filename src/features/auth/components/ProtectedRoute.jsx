import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import FullSpinner from "../../../common/components/FullSpinner";

function ProtectedRoute({ allowedRole }) {
  const { user, isLoading } = useAuth();

  if (isLoading) return <FullSpinner />;

  if (user?.role === "admin" || user?.role === allowedRole) {
    return <Outlet />;
  }

  return <Navigate to="/" replace />;
}

export default ProtectedRoute;
