import { useEffect, useState } from "react";
import apiClient from "../../auth/api/apiClient";

function useGetAllUsers() {
  const [users, setUsers] = useState([]);
  const [usersLoading, setUsersLoading] = useState(true);
  const [usersError, setUsersError] = useState(null);

  useEffect(() => {
    const getUsers = async () => {
      try {
        const { data } = await apiClient.get("/user");
        setUsers(data);
      } catch (error) {
        setUsersError(error);
      } finally {
        setUsersLoading(false);
      }
    };

    getUsers();
  }, []);

  return { users, setUsers, usersLoading, usersError };
}

export default useGetAllUsers;
