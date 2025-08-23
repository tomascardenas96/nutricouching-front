import useGetAllUsers from "../../../../hooks/useGetAllUsers";
import UsersCardDashboardMobile from "./UsersCardDashboardMobile";
import "./UsersRootDashboardMobile.css";

function UsersRootDashboardMobile() {
  const { users, setUsers, usersError, usersLoading } = useGetAllUsers();

  return (
    <>
      <div className="user-root-dashboard_mobile-container">
        <div className="user-root-dashboard-mobile">
          {users?.length > 0 ? (
            <div className="split-user-card">
              {users.map((user) => (
                <UsersCardDashboardMobile
                  key={`user-${user.userId}`}
                  user={user}
                  setUsers={setUsers}
                />
              ))}
            </div>
          ) : (
            <tr>
              <th
                colSpan={5}
                style={{ textAlign: "center" }}
                className="no-user"
              >
                No hay usuarios aún.
              </th>
            </tr>
          )}
        </div>
      </div>
    </>
  );
}

export default UsersRootDashboardMobile;
