import { useState } from "react";
import { HOST } from "../api/data";
import { toast } from "sonner";

function useLogin() {
  const [loginInput, setLoginInput] = useState({
    email: "",
    password: "",
  });
  const [loginLoading, setLoginLoading] = useState(false);
  const [loginError, setLoginError] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

  const handleSubmitLogin = async (e) => {
    e.preventDefault();

    const loginUser = async () => {
      const response = await fetch(`${HOST}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(loginInput),
      });

      const data = await response.json();

      if (data.error) {
        throw new Error(data.message);
      }

      return data;
    };

    toast.promise(loginUser(), {
      loading: "Loading...",
      success: (data) => {
        localStorage.setItem("authToken", data.token);
        location.reload();
        return "Registro exitoso!";
      },
      error: "Email o contraseña incorrectos",
    });
  };

  const handleChangeLogin = (e) => {
    const { name, value } = e.target;
    setLoginInput({ ...loginInput, [name]: value });
  };

  const handleLoginModal = () => {
    setIsLoginModalOpen(!isLoginModalOpen);
  };

  return {
    loginInput,
    loginLoading,
    loginError,
    handleSubmitLogin,
    handleChangeLogin,
    handleLoginModal,
    isLoginModalOpen,
  };
}

export default useLogin;
