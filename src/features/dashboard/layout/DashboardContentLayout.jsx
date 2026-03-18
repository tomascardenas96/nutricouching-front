import { useQuery } from "@tanstack/react-query";
import { IoReturnUpBack, IoSearchOutline } from "react-icons/io5";
import { Link } from "react-router-dom";
import apiClient from "../../auth/api/apiClient";
import { useAuth } from "../../auth/hooks/useAuth";
import { useSelectMenuOption } from "../hooks/useSelectMenuOption";
import "./DashboardContentLayout.css";

function DashboardContentLayout({ children }) {
  const { user } = useAuth();
  const { selectedOption, searchTerm, setSearchTerm } = useSelectMenuOption();

  const { data: activeUser } = useQuery({
    queryKey: ["active-user"],
    queryFn: async () => {
      const { data } = await apiClient.get("/auth/active-user");
      return data;
    },
    staleTime: 1000 * 60 * 5,
  });

  const profilePicture = activeUser?.professional?.profile?.picture;

  return (
    <div className="admin-dashboard">
      <div className="admin-dashboard_header">
        <h1>¡Hola {user?.name}! 👋</h1>
        <div>
          <span>
            {user?.name} {user?.lastname}
          </span>
          <img
            src={profilePicture}
            alt="Foto de perfil en el dashboard"
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
                <input
                  type="search"
                  placeholder="Filtrar por nombre"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
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
