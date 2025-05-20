import { useContext } from "react";
import { LoginContext } from "../context/LoginContext";

export const useLoginForm = () => {
  const context = useContext(LoginContext);

  if (!context)
    throw new Error("Component must be within LoginProvider context");

  return {
    loginInput: context.loginInput,
    handleChangeLogin: context.handleChangeLogin,
    handleSubmitLogin: context.handleSubmitLogin,
  };
};
