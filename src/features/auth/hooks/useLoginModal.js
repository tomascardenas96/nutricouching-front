import { useContext } from "react";
import { LoginContext } from "../context/LoginContext";

export const useLoginModal = () => {
  const context = useContext(LoginContext);

  if (!context)
    throw new Error("Component must be within LoginProvider context");

  return {
    handleLoginModal: context.handleLoginModal,
    isLoginModalOpen: context.isLoginModalOpen,
  };
};
