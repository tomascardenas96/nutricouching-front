import { useQuery, useQueryClient } from "@tanstack/react-query";
import apiClient from "../../auth/api/apiClient";

function useGetAllUsers() {
  const queryClient = useQueryClient();

  const {
    data: users = [],
    isLoading: usersLoading,
    isError: usersError,
  } = useQuery({
    queryKey: ["users"],
    queryFn: () => apiClient.get("/user").then((r) => r.data),
  });

  const setUsers = (updater) => queryClient.setQueryData(["users"], updater);

  return { users, setUsers, usersLoading, usersError };
}

export default useGetAllUsers;
