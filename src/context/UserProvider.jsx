import React, { createContext, useContext, useEffect, useState } from "react";
import { Toaster, toast } from "sonner";
import { HOST } from "../api/data";
import useGetElementsByCartId from "../hooks/useGetElementsByCartId";
import { io } from "socket.io-client";

// Creación del contexto
const UserContext = createContext(null);
const LoginContext = createContext(null);
const CartContext = createContext(null);

// Custom hooks para usar los contextos
export const useUser = () => useContext(UserContext);
export const useLogin = () => useContext(LoginContext);
export const useActiveCart = () => useContext(CartContext);

function UserProvider({ children }) {
  const [user, setUser] = useState(null);
  const [userLoading, setUserLoading] = useState(true);
  const [userError, setUserError] = useState(false);

  const [activeCart, setActiveCart] = useState(null);
  const [activeCartError, setActiveCartError] = useState(null);

  const [authToken, setAuthToken] = useState("");
  const [loginInput, setLoginInput] = useState({
    email: "",
    password: "",
  });
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const { setElementsInCart } = useGetElementsByCartId();

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

  const handleGetActiveCart = async (userId) => {
    try {
      const response = await fetch(`${HOST}/cart/active/${userId}`);
      const data = await response.json();

      if (!response.ok) {
        throw new Error();
      }

      setActiveCart(data);
    } catch (error) {
      setActiveCartError(error);
    }
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
    setElementsInCart([]);
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
          // Obtener el carrito activo
          handleGetActiveCart(data.userId);
        } catch (error) {
          localStorage.removeItem("authToken");
          console.error(error);
          setUserError(true);
        } finally {
          setUserLoading(false);
        }
      } else {
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
      <UserContext.Provider value={{ user, userLoading, userError }}>
        <CartContext.Provider
          value={{ activeCart, activeCartError, setActiveCart }}
        >
          {children}
          <Toaster />
        </CartContext.Provider>
      </UserContext.Provider>
    </LoginContext.Provider>
  );
}

export default UserProvider;
