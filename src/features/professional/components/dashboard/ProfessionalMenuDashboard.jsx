import ItemMenuDashboard from "../../../../common/components/dashboard/ItemMenuDashboard";
import { useSelectMenuOption } from "../../../dashboard/hooks/useSelectMenuOption";
import "./ProfessionalMenuDashboard.css";

function ProfessionalMenuDashboard() {
  const { selectOptionDashboardMenu, selectedOption } = useSelectMenuOption();

  const professionalMenu = ["Turnos", "Horarios de Atencion", "Especialidades"];

  return (
    <ul className="professional-menu-dashboard">
      {professionalMenu.map((option, index) => (
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

export default ProfessionalMenuDashboard;
