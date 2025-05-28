import ItemMenuDashboard from "../../../common/components/dashboard/ItemMenuDashboard";
import { useSelectMenuOption } from "../../dashboard/hooks/useSelectMenuOption";
import "./RootMenuDashboard.css";

function RootMenuDashboard() {
  const { selectedOption, selectOptionDashboardMenu } = useSelectMenuOption();

  const rootMenu = [
    "Usuarios",
    "Profesionales",
    "Productos",
    "Viandas",
    "Especialidades",
    "Planes",
  ];

  return (
    <ul className="root-menu-dashboard">
      {rootMenu.map((option, index) => (
        <ItemMenuDashboard
          key={`menu-${option}${index}`}
          option={option}
          isSelected={selectedOption === option}
          selectOptionDashboardMenu={selectOptionDashboardMenu}
        />
      ))}
    </ul>
  );
}

export default RootMenuDashboard;
