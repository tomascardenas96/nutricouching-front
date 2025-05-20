import { useContext } from "react";
import { UserContext } from "../context/UserContext";

export const useAuthUser = () => {
  const context = useContext(UserContext);

  if (!context)
    throw new Error("Component must be within AuthProvider context");

  return { user: context.user, handleLogOut: context.handleLogOut };
};
