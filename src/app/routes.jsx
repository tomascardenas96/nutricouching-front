import { lazy, Suspense } from "react";
import { Navigate, Outlet, Route, Routes } from "react-router-dom";
import FullSpinner from "../common/components/FullSpinner";
import { useAuth } from "../features/auth/hooks/useAuth";
import Layout from "./layout/Layout";

const ProtectedRoute = lazy(() => import("../features/auth/components/ProtectedRoute"));
const AdminDashboard = lazy(() => import("../features/admin/pages/AdminDashboard"));
const LoginForm = lazy(() => import("../features/auth/components/LoginForm"));
const RegisterForm = lazy(() => import("../features/auth/components/RegisterForm"));
const ResetPassword = lazy(() => import("../features/auth/pages/ResetPassword"));
const Home = lazy(() => import("../features/home/pages/Home"));
const ProfessionalDashboard = lazy(() => import("../features/professional/pages/ProfessionalDashboard"));
const ProfessionalsFilterPage = lazy(() => import("../features/professional/pages/ProfessionalsFilterPage"));
const Profile = lazy(() => import("../features/profile/pages/Profile"));

function GuestRoute() {
  const { user, isLoading } = useAuth();
  if (isLoading) return <FullSpinner />;
  return user ? <Navigate to="/" replace /> : <Outlet />;
}

function LayoutWrapper() {
  return (
    <Layout>
      <Outlet />
    </Layout>
  );
}

export default function AppRoutes() {
  return (
    <Suspense fallback={<FullSpinner />}>
      <Routes>
        <Route element={<GuestRoute />}>
          <Route path="/login" element={<LoginForm />} />
          <Route path="/register" element={<RegisterForm />} />
        </Route>

        <Route element={<LayoutWrapper />}>
          <Route path="/" element={<Home />} />
          <Route path="/profile/:slug" element={<Profile />} />
          <Route
            path="/filter/professionals"
            element={<ProfessionalsFilterPage />}
          />
          <Route path="/reset-password" element={<ResetPassword />} />
        </Route>

        <Route element={<ProtectedRoute allowedRole="root" />}>
          <Route path="/root" element={<AdminDashboard />} />
        </Route>

        <Route element={<ProtectedRoute allowedRole="admin" />}>
          <Route path="/professional" element={<ProfessionalDashboard />} />
        </Route>
      </Routes>
    </Suspense>
  );
}
