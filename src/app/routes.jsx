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
const ProfessionalsPage = lazy(() => import("../features/professional/pages/ProfessionalsPage"));
const Profile = lazy(() => import("../features/profile/pages/Profile"));
const ProductsPage = lazy(() => import("../features/products/pages/ProductsPage"));
const ViandsPage = lazy(() => import("../features/viands/pages/ViandsPage"));
const ContactPage = lazy(() => import("../features/contact/pages/ContactPage"));
const NotFound = lazy(() => import("../features/not-found/NotFound"));

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
          <Route path="/professionals" element={<ProfessionalsPage />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="/products" element={<ProductsPage />} />
          <Route path="/viands" element={<ViandsPage />} />
          <Route path="/contact" element={<ContactPage />} />
        </Route>

        <Route element={<ProtectedRoute allowedRole="admin" />}>
          <Route path="/root" element={<AdminDashboard />} />
        </Route>

        <Route element={<ProtectedRoute allowedRole="professional" />}>
          <Route path="/professional" element={<ProfessionalDashboard />} />
        </Route>

        <Route element={<LayoutWrapper />}>
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </Suspense>
  );
}
