import { useEffect, useState } from "react";
import { HOST } from "../api/data";

function useGetAllUsers() {
  const [users, setUsers] = useState([]);
  const [usersLoading, setUsersLoading] = useState(true);
  const [usersError, setUsersError] = useState(null);

  useEffect(() => {
    const getUsers = async () => {
      try {
        const response = await fetch(`${HOST}/user`);
        const data = await response.json();

        if (!response.ok) {
          console.error(data);
          throw new Error("Error al cargar los usuarios");
        }

        setUsers(data);
      } catch (error) {
        setUsersError(error);
      } finally {
        setUsersLoading(false);
      }
    };

    getUsers();
  }, []);

  return { users, usersLoading, usersError };
}

export default useGetAllUsers;
