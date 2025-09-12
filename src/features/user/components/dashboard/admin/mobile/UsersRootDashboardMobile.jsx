import DashboardListSkeleton from "../../../../../../common/components/dashboard/loader/DashboardListSkeleton";
import useGetAllUsers from "../../../../hooks/useGetAllUsers";
import UsersCardDashboardMobile from "./UsersCardDashboardMobile";
import "./UsersRootDashboardMobile.css";

function UsersRootDashboardMobile() {
  const { users, setUsers, usersError, usersLoading } = useGetAllUsers();

  return (
    <>
      <div className="user-root-dashboard_mobile-container">
        <div className="user-root-dashboard-mobile">
          {usersError ? (
            <p className="error">Ha ocurrido un error</p>
          ) : usersLoading ? (
            <DashboardListSkeleton />
          ) : users?.length > 0 ? (
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
            <p className="no-users">No hay usuarios aún</p>
          )}
        </div>
      </div>
    </>
  );
}

export default UsersRootDashboardMobile;
