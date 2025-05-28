import { useSelectMenuOption } from "../../dashboard/hooks/useSelectMenuOption";
import PlansRootDashboard from "./dashboard/plans/PlansRootDashboard";
import ProductsRootDashboard from "./dashboard/products/ProductsRootDashboard";
import ProfessionalsRootDashboard from "./dashboard/professionals/ProfessionalsRootDashboard";
import SpecialtiesRootDashboard from "./dashboard/specialties/SpecialtiesRootDashboard";
import UsersRootDashboard from "./dashboard/users/UsersRootDashboard";
import ViandsRootDashboard from "./dashboard/viands/ViandsRootDashboard";
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
