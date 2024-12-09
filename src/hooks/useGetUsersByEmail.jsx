import { useEffect, useState } from "react";
import { HOST } from "../api/data";

function useGetUsersByEmail() {
  const [emailInput, setEmailInput] = useState("");
  const [foundUsers, setFoundUsers] = useState([]);
  const [foundUsersLoading, setFoundUsersLoading] = useState(true);
  const [foundUsersError, setFoundUsersError] = useState(null);

  const handleGetUsersByEmail = async () => {
    try {
      const response = await fetch(`${HOST}/user/filter?email=${emailInput}`);
      const data = await response.json();

      if (!response.ok) {
        console.error(data);
        throw new Error("Error getting users by email");
      }

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
