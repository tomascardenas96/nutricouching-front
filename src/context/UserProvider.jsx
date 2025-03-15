import React, { createContext, useContext, useEffect, useState } from "react";
import { Toaster, toast } from "sonner";
import { HOST } from "../api/data";

// Creación del contexto
const UserContext = createContext(null);
const LoginContext = createContext(null);

// Custom hooks para usar los contextos
export const useUser = () => useContext(UserContext);
export const useLogin = () => useContext(LoginContext);

function UserProvider({ children }) {
  const [user, setUser] = useState(null);
  const [userLoading, setUserLoading] = useState(true);
  const [userError, setUserError] = useState(false);

  const [authToken, setAuthToken] = useState("");
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

  const handleLogOut = () => {
    localStorage.removeItem("authToken");
    setUser(null);
  };

  // Cuando se monta el componente, se inicializa el token de autenticación si existe en localStorage y se setea en el estado
  useEffect(() => {
    const token = localStorage.getItem("authToken");
    setAuthToken(token);
  }, []);

  // Cuando se monta el componente, se verifica si el token de autenticación es válido y se obtiene la información del usuario autenticado
  useEffect(() => {
    const checkToken = async () => {
      if (authToken) {
        try {
          const response = await fetch(`${HOST}/auth/active-user`, {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              authorization: `Bearer ${authToken}`,
            },
          });

          const data = await response.json();
          if (data.error) {
            setUser(null);
            throw new Error(data.message);
          }

          setUser(data);
        } catch (error) {
          localStorage.removeItem("authToken");
          console.error(error);
          setUserError(true);
        } finally {
          setUserLoading(false);
        }
      } else if (!user) {
        setUserLoading(false);
      }
    };

    checkToken();
  }, [authToken]); // Se ejecuta cuando authToken cambia

  return (
    <LoginContext.Provider
      value={{
        loginInput,
        handleSubmitLogin,
        handleChangeLogin,
        handleLoginModal,
        isLoginModalOpen,
        handleLogOut,
      }}
    >
      <UserContext.Provider
        value={{ user, userLoading, userError, handleLogOut }}
      >
        {children}
        <Toaster />
      </UserContext.Provider>
    </LoginContext.Provider>
  );
}

export default UserProvider;
