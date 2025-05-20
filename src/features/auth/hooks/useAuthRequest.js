import { useContext } from "react";
import { UserContext } from "../context/UserContext";

export const useAuthRequest = () => {
  const context = useContext(UserContext);

  if (!context)
    throw new Error("Component must be within AuthProvider context");

  return {
    userLoading: context.userLoading,
    userError: context.userError,
  };
};
