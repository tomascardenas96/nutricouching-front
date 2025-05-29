import { useSelectMenuOption } from "../../dashboard/hooks/useSelectMenuOption";
import PlansRootDashboard from "./dashboard/sections/plans/PlansRootDashboard";
import ProductsRootDashboard from "./dashboard/sections/products/ProductsRootDashboard";
import ProfessionalsRootDashboard from "./dashboard/sections/professionals/ProfessionalsRootDashboard";
import SpecialtiesRootDashboard from "./dashboard/sections/specialties/SpecialtiesRootDashboard";
import UsersRootDashboard from "./dashboard/sections/users/UsersRootDashboard";
import ViandsRootDashboard from "./dashboard/sections/viands/ViandsRootDashboard";
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
