import useGetAllUsers from "../../../../user/hooks/useGetAllUsers";
import "./UsersRootDashboard.css";

function UsersRootDashboard() {
  const { users } = useGetAllUsers();

  return (
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
          <tr className="dashboard_users-item" key={`user-${user.userId}`}>
            <td>{user.name}</td>
            <td className="lastname-row">{user.lastname}</td>
            <td className="email-row">{user.email}</td>
            <td className="options-row">
              <p className="edit">Editar</p>
              <p className="delete">Eliminar</p>
            </td>
            <div className="divider-line_container">
              <hr className="divider-line" />
            </div>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default UsersRootDashboard;
