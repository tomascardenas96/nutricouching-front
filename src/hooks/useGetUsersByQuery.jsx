import { useEffect, useState } from "react";
import { HOST } from "../api/data";

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
      const response = await fetch(
        `${HOST}/user/filter?email=${userInputGetUsersByQuery}`
      );
      const data = await response.json();

      if (!response.ok) {
        console.error(data);
        throw new Error(data.message);
      }

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
    handleUnselectUser
  };
}

export default useGetUsersByQuery;
