import { useEffect, useState } from "react";
import apiClient from "../../auth/api/apiClient";

function useGetUsersByQuery() {
  const [usersByQuery, setUsersByQuery] = useState([]);
  const [usersByQueryLoading, setUsersByQueryLoading] = useState(true);
  const [usersByQueryError, setUsersByQueryError] = useState(null);
  const [userInputGetUsersByQuery, setUserInputGetUsersByQuery] = useState("");
  const [selectedUser, setSelectedUser] = useState(null);

  const handleSelectUserAndCloseModal = (user) => {
    setSelectedUser(user);
    setUserInputGetUsersByQuery("");
  };

  const handleUnselectUser = () => {
    setSelectedUser(null);
  };

  useEffect(() => {
    handleSubmitGetUsersByQuery();
  }, [userInputGetUsersByQuery]);

  const handleSubmitGetUsersByQuery = async () => {
    try {
      const { data } = await apiClient.get(`/user/filter?email=${userInputGetUsersByQuery}`);
      setUsersByQuery(data);
    } catch (error) {
      setUsersByQueryError(true);
    } finally {
      setUsersByQueryLoading(false);
    }
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
