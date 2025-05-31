import { useSelectMenuOption } from "../../../dashboard/hooks/useSelectMenuOption";
import PlansRootDashboard from "../../../plans/components/dashboard/admin/PlansRootDashboard";
import ProductsRootDashboard from "../../../products/components/dashboard/admin/ProductsRootDashboard";
import ProfessionalsRootDashboard from "../../../products/components/dashboard/admin/ProductsRootDashboard";
import SpecialtiesRootDashboard from "../../../specialties/components/dashboard/admin/SpecialtiesRootDashboard";
import UsersRootDashboard from "../../../user/components/dashboard/admin/UsersRootDashboard";
import ViandsRootDashboard from "../../../viands/components/dashboard/admin/ViandsRootDashboard";
import "./RootDashboardContent.css";

function RootDashboardContent() {
  const { selectedOption } = useSelectMenuOption();

  if (selectedOption === "Usuarios") return <UsersRootDashboard />;
  if (selectedOption === "Profesionales") return <ProfessionalsRootDashboard />;
  if (selectedOption === "Productos") return <ProductsRootDashboard />;
  if (selectedOption === "Viandas") return <ViandsRootDashboard />;
  if (selectedOption === "Especialidades") return <SpecialtiesRootDashboard />;
  if (selectedOption === "Planes") return <PlansRootDashboard />;
}

export default RootDashboardContent;
