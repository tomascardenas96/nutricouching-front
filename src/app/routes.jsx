import { BrowserRouter, Outlet, Route, Routes } from "react-router-dom";
import AdminDashboard from "../features/admin/pages/AdminDashboard";
import ResetPassword from "../features/auth/pages/ResetPassword";
import Home from "../features/home/pages/Home";
import ProfessionalDashboard from "../features/professional/pages/ProfessionalDashboard";
import Layout from "./layout/Layout";
import ProtectedRoute from "../components/ProtectedRoute";
import Profile from "../features/profile/pages/Profile";
import ProfessionalsFilterPage from "../features/professional/pages/ProfessionalsFilterPage";

function LayoutWrapper() {
  return (
    <Layout>
      <Outlet />
    </Layout>
  );
}

export default function AppRoutes() {
  return (
    <Routes>
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
  );
}
