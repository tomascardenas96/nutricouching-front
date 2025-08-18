import { useState } from "react";
import "./DashboardMobileMenu.css";
import { RxHamburgerMenu } from "react-icons/rx";
import { createPortal } from "react-dom";
import DeployedDashboardMobileMenu from "./DeployedDashboardMobileMenu";

function DashboardMobileMenu() {
  const [isDashboardMobileMenuOpen, setIsDashboardMobileMenuOpen] =
    useState(false);

  return (
    <>
      <header className="dashboard-mobile-menu">
        <div onClick={() => setIsDashboardMobileMenuOpen(true)}>
          <RxHamburgerMenu />
        </div>
      </header>

      {isDashboardMobileMenuOpen &&
        createPortal(
          <DeployedDashboardMobileMenu
            onClose={() => setIsDashboardMobileMenuOpen(false)}
          />,
          document.getElementById("root-portal")
        )}
    </>
  );
}

export default DashboardMobileMenu;
