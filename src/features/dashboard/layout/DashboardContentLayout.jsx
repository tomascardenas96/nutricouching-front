import { GoPlusCircle } from "react-icons/go";
import { IoReturnUpBack, IoSearchOutline } from "react-icons/io5";
import { useAuthUser } from "../../auth/hooks/useAuthUser";
import { useSelectMenuOption } from "../hooks/useSelectMenuOption";
import "./DashboardContentLayout.css";
import { Link } from "react-router-dom";

function DashboardContentLayout({ children }) {
  const { user } = useAuthUser();
  const { selectedOption } = useSelectMenuOption();

  return (
    <div className="admin-dashboard">
      <div className="admin-dashboard_header">
        <h1>¡Hola {user?.name}! 👋</h1>
        <div>
          <span>
            {user?.name} {user?.lastname}
          </span>
          <img
            src={user?.professional?.profile?.picture}
            alt="Foto de perfil de google en el dashboard de Cohesiva"
          />
        </div>
      </div>

      <div className="admin-dashboard_content">
        <div className="content-window">
          <div className="content-window_header">
            <div className="title-section">
              <h1>{selectedOption}</h1>
              <p>Listado de {selectedOption?.toLowerCase()} disponibles</p>
            </div>

            <div className="filter-section">
              <div className="filter">
                <input type="search" placeholder="Filtrar por nombre" />
                <IoSearchOutline className="search-icon" />
              </div>
            </div>
          </div>

          <div className="content-window_body">{children}</div>
        </div>
      </div>

      <div className="admin-dashboard_home">
        <p>
          <Link to="/">
            <IoReturnUpBack />
            Volver a home
          </Link>
        </p>
      </div>
    </div>
  );
}

export default DashboardContentLayout;
