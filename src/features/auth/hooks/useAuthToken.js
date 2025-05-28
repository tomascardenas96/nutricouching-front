import { useContext } from "react";
import { UserContext } from "../context/UserContext";

export const useAuthToken = () => {
  const context = useContext(UserContext);

  if (!context) {
    throw new Error("useAuthToken must be used within a UserProvider");
  }

  return {
    authToken: context.authToken,
    setAuthToken: context.setAuthToken,
  };
};
