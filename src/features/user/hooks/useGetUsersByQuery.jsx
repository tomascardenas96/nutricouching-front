import { useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import apiClient from "../../auth/api/apiClient";

function useGetUsersByQuery() {
  const [userInputGetUsersByQuery, setUserInputGetUsersByQuery] = useState("");
  const [selectedUser, setSelectedUser] = useState(null);

  const {
    data: allUsers = [],
    isLoading: usersByQueryLoading,
    isError: usersByQueryError,
  } = useQuery({
    queryKey: ["users"],
    queryFn: () => apiClient.get("/user").then((r) => r.data),
  });

  const usersByQuery = useMemo(() => {
    if (!userInputGetUsersByQuery.trim()) return [];
    const q = userInputGetUsersByQuery.toLowerCase();
    return allUsers.filter((u) => u.email?.toLowerCase().includes(q));
  }, [allUsers, userInputGetUsersByQuery]);

  const handleSelectUserAndCloseModal = (user) => {
    setSelectedUser(user);
    setUserInputGetUsersByQuery("");
  };

  const handleUnselectUser = () => {
    setSelectedUser(null);
  };

  const handleChangeUserInputUsersByQuery = (e) => {
    setUserInputGetUsersByQuery(e.target.value);
  };

  return {
    handleChangeUserInputUsersByQuery,
    usersByQuery,
    usersByQueryLoading,
    usersByQueryError,
    userInputGetUsersByQuery,
    handleSelectUserAndCloseModal,
    selectedUser,
    handleUnselectUser,
  };
}

export default useGetUsersByQuery;
