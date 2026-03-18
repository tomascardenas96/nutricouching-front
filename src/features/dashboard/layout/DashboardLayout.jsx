import { Toaster } from "sonner";
import RootMenuDashboard from "../../admin/components/dashboard/RootMenuDashboard";
import ProfessionalMenuDashboard from "../../professional/components/dashboard/admin/ProfessionalMenuDashboard";
import DashboardProvider from "../context/DashboardProvider";
import "./DashboardLayout.css";
import DashboardMobileMenu from "../components/mobile/DashboardMobileMenu";
import Logo from "../../../common/logo/Logo";

function DashboardLayout({ children }) {
  const pathname = window.location.pathname;

  return (
    <section className="dashboard-layout_container">
      {/* Contexto de los dashboards, para seleccionar una opcion del menu */}
      <DashboardProvider>
        <DashboardMobileMenu />

        <div className="dashboard">
          <div className="left-menu">
            <div className="dashboard-logo">
              <Logo />
            </div>

            <div className="menu">
              {pathname === "/root" && <RootMenuDashboard />}
              {pathname === "/professional" && <ProfessionalMenuDashboard />}
            </div>
          </div>

          <div className="content">{children}</div>
          <Toaster
            toastOptions={{
              style: {
                height: "2.9rem",
                paddingLeft: ".9rem",
                gap: ".7rem",
              },
            }}
          />
        </div>
      </DashboardProvider>
    </section>
  );
}

export default DashboardLayout;
