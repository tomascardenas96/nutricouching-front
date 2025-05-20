import { useState } from "react";
import { LoginContext } from "./LoginContext";

function LoginProvider({ children }) {
  const [loginInput, setLoginInput] = useState({
    email: "",
    password: "",
  });
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
        setAuthToken(data.token); // Actualizamos el token en el estado
        return "Login exitoso!";
      },
      error: "Email o contraseña incorrectos",
    });
  };

  const handleChangeLogin = (e) => {
    const { name, value } = e.target;
    setLoginInput({ ...loginInput, [name]: value });
  };

  const handleLoginModal = () => {
    setLoginInput({
      email: "",
      password: "",
    });
    setIsLoginModalOpen(!isLoginModalOpen);
  };

  return (
    <LoginContext.Provider
      value={{
        loginInput,
        handleChangeLogin,
        handleSubmitLogin,
        handleLoginModal,
        isLoginModalOpen,
      }}
    >
      {children}
    </LoginContext.Provider>
  );
}

export default LoginProvider;
