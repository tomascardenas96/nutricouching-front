import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuthRequest } from "../features/auth/hooks/useAuthRequest";
import { useAuthUser } from "../features/auth/hooks/useAuthUser";
import FullSpinner from "../common/components/FullSpinner";

function ProtectedRoute({ allowedRole }) {
  const { user } = useAuthUser();
  const { userLoading } = useAuthRequest();

  if (userLoading) {
    return <FullSpinner />;
  }

  if (
    user?.professional?.role === "root" ||
    user?.professional?.role === allowedRole
  ) {
    return <Outlet />;
  }

  return <Navigate to="/" replace />;
}

export default ProtectedRoute;
