import { Link } from "react-router-dom";
import { MdOutlineDashboard } from "react-icons/md";
import ItemMenuDashboard from "../../../../common/components/dashboard/ItemMenuDashboard";
import { useSelectMenuOption } from "../../../dashboard/hooks/useSelectMenuOption";
import "./RootMenuDashboard.css";

function RootMenuDashboard() {
  const { selectedOption, selectOptionDashboardMenu } = useSelectMenuOption();

  const rootMenu = [
    "Usuarios",
    "Profesionales",
    "Productos",
    "Viandas",
    "Especialidades",
    "Categorias",
    "Planes",
    "Recursos",
  ];

  return (
    <div className="root-menu-dashboard">
      <ul>
        {rootMenu.map((option, index) => (
          <ItemMenuDashboard
            key={`menu-${option}${index}`}
            option={option}
            isSelected={selectedOption === option}
            selectOptionDashboardMenu={selectOptionDashboardMenu}
          />
        ))}
      </ul>

      {/* <Link to="/professional" className="root-menu-dashboard__professional-link">
        <MdOutlineDashboard />
        Dashboard profesional
      </Link> */}
    </div>
  );
}

export default RootMenuDashboard;
