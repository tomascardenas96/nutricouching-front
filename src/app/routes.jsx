import { BrowserRouter, Route, Routes } from "react-router-dom";
import ResetPassword from "../features/auth/pages/ResetPassword";
import Layout from "./layout/Layout";
import Home from "../features/home/pages/Home";

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/reset-password" element={<ResetPassword />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}
