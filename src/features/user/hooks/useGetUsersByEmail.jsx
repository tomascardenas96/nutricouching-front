import { useEffect, useState } from "react";
import apiClient from "../../auth/api/apiClient";

function useGetUsersByEmail() {
  const [emailInput, setEmailInput] = useState("");
  const [foundUsers, setFoundUsers] = useState([]);
  const [foundUsersLoading, setFoundUsersLoading] = useState(true);
  const [foundUsersError, setFoundUsersError] = useState(null);

  const handleGetUsersByEmail = async () => {
    try {
      const { data } = await apiClient.get(`/user/filter?email=${emailInput}`);
      setFoundUsers(data);
    } catch (error) {
      setFoundUsersError(true);
    } finally {
      setFoundUsersLoading(false);
    }
  };

  useEffect(() => {
    handleGetUsersByEmail();
  }, [emailInput]);

  const handleChangeGetUsersByEmail = (e) => {
    const { name, value } = e.target;
    setEmailInput({ ...emailInput, [name]: value });
  };

  return {
    handleGetUsersByEmail,
    handleChangeGetUsersByEmail,
    emailInput,
    foundUsers,
    foundUsersLoading,
    foundUsersError,
  };
}

export default useGetUsersByEmail;
