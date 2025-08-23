import { useSelectMenuOption } from "../../../dashboard/hooks/useSelectMenuOption";
import PlansRootDashboard from "../../../plans/components/dashboard/admin/PlansRootDashboard";
import ProductsRootDashboardMobile from "../../../products/components/dashboard/admin/mobile/ProductsRootDashboardMobile";
import ProductsRootDashboard from "../../../products/components/dashboard/admin/ProductsRootDashboard";
import ProfessionalsRootDashboardMobile from "../../../professional/components/dashboard/admin/mobile/ProfessionalsRootDashboardMobile";
import ProfessionalsRootDashboard from "../../../professional/components/dashboard/admin/ProfessionalsRootDashboard";
import SpecialtiesRootDashboardMobile from "../../../specialties/components/dashboard/admin/mobile/SpecialtiesRootDashboardMobile";
import SpecialtiesRootDashboard from "../../../specialties/components/dashboard/admin/SpecialtiesRootDashboard";
import UsersRootDashboardMobile from "../../../user/components/dashboard/admin/mobile/UsersRootDashboardMobile";
import UsersRootDashboard from "../../../user/components/dashboard/admin/UsersRootDashboard";
import ViandsRootDashboardMobile from "../../../viands/components/dashboard/admin/mobile/ViandsRootDashboardMobile";
import ViandsRootDashboard from "../../../viands/components/dashboard/admin/ViandsRootDashboard";
import "./RootDashboardContent.css";

function RootDashboardContent() {
  const { selectedOption } = useSelectMenuOption();

  if (selectedOption === "Usuarios") {
    return (
      <>
        <UsersRootDashboard />
        <UsersRootDashboardMobile />
      </>
    );
  }

  if (selectedOption === "Profesionales") {
    return (
      <>
        <ProfessionalsRootDashboard />
        <ProfessionalsRootDashboardMobile />
      </>
    );
  }

  if (selectedOption === "Productos") {
    return (
      <>
        <ProductsRootDashboard />
        <ProductsRootDashboardMobile />
      </>
    );
  }
  if (selectedOption === "Viandas") {
    return (
      <>
        <ViandsRootDashboard />
        <ViandsRootDashboardMobile />
      </>
    );
  }

  if (selectedOption === "Especialidades") {
    return (
      <>
        <SpecialtiesRootDashboard />
        <SpecialtiesRootDashboardMobile />
      </>
    );
  }

  if (selectedOption === "Planes") {
    return (
      <>
        <PlansRootDashboard />
      </>
    );
  }
}

export default RootDashboardContent;
