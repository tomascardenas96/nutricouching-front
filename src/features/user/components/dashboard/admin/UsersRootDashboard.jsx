import DashboardListSkeleton from "../../../../../common/components/dashboard/loader/DashboardListSkeleton";
import useGetAllUsers from "../../../hooks/useGetAllUsers";
import "./UsersRootDashboard.css";

function UsersRootDashboard() {
  const { users, usersLoading, usersError } = useGetAllUsers();

  return (
    <>
      <div className="users-dashboard-container">
        {usersError ? (
          <p className="error">Ha ocurrido un error</p>
        ) : usersLoading ? (
          <DashboardListSkeleton />
        ) : users?.length > 0 ? (
          <table className="users-root-dashboard_table">
            <thead>
              <tr>
                <th>Nombre</th>
                <th className="lastname-column">Apellido</th>
                <th className="email-column">E-mail</th>
                <th className="options-column">Opciones</th>
              </tr>
            </thead>

            <tbody>
              {users.map((user) => (
                <tr
                  className="dashboard_users-item"
                  key={`user-${user.userId}`}
                >
                  <td>{user.name}</td>
                  <td className="lastname-row">{user.lastname}</td>
                  <td className="email-row">{user.email}</td>
                  <td className="options-row">
                    <p className="delete">Eliminar</p>
                  </td>
                  <div className="divider-line_container">
                    <hr className="divider-line" />
                  </div>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p className="no-users">No hay usuarios aún</p>
        )}
      </div>
    </>
  );
}

export default UsersRootDashboard;
