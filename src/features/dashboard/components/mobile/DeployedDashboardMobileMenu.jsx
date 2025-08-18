import RootMenuDashboard from "../../../admin/components/dashboard/RootMenuDashboard";
import ProfessionalMenuDashboard from "../../../professional/components/dashboard/admin/ProfessionalMenuDashboard";
import "./DeployedDashboardMobileMenu.css";

function DeployedDashboardMobileMenu({ onClose }) {
  const pathname = window.location.pathname;

  return (
    <div className="deployed-dashboard-mobile-menu" onClick={onClose}>
      <div className="menu" onClick={(e) => e.stopPropagation()}>
        <div className="options-modal">
          {pathname === "/root" ? (
            <RootMenuDashboard />
          ) : (
            <ProfessionalMenuDashboard />
          )}
        </div>

        <div className="close-modal" onClick={onClose}>
          <p>Cerrar X</p>
        </div>
      </div>
    </div>
  );
}

export default DeployedDashboardMobileMenu;
