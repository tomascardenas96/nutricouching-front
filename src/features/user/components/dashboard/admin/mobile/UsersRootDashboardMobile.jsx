import DashboardListSkeleton from "../../../../../../common/components/dashboard/loader/DashboardListSkeleton";
import { useSelectMenuOption } from "../../../../../dashboard/hooks/useSelectMenuOption";
import useGetAllUsers from "../../../../hooks/useGetAllUsers";
import UsersCardDashboardMobile from "./UsersCardDashboardMobile";
import "./UsersRootDashboardMobile.css";

function UsersRootDashboardMobile() {
  const { users, setUsers, usersError, usersLoading } = useGetAllUsers();
  const { searchTerm } = useSelectMenuOption();

  const filtered = searchTerm
    ? users.filter((u) => {
        const q = searchTerm.toLowerCase();
        return (
          u.name?.toLowerCase().includes(q) ||
          u.lastname?.toLowerCase().includes(q) ||
          u.email?.toLowerCase().includes(q)
        );
      })
    : users;

  return (
    <div className="user-root-dashboard_mobile-container">
      <div className="user-root-dashboard-mobile">
        {usersError ? (
          <p className="error">Ha ocurrido un error</p>
        ) : usersLoading ? (
          <DashboardListSkeleton />
        ) : filtered.length > 0 ? (
          <div className="split-user-card">
            {filtered.map((user) => (
              <UsersCardDashboardMobile
                key={`user-${user.userId}`}
                user={user}
                setUsers={setUsers}
              />
            ))}
          </div>
        ) : (
          <p className="no-users">
            {searchTerm ? "Sin resultados para la búsqueda" : "No hay usuarios aún"}
          </p>
        )}
      </div>
    </div>
  );
}

export default UsersRootDashboardMobile;
