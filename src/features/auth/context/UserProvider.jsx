import React, { useEffect, useState } from "react";
import { HOST } from "../../../api/data";
import { UserContext } from "./UserContext";

function UserProvider({ children }) {
  const [user, setUser] = useState(null);
  const [userLoading, setUserLoading] = useState(true);
  const [userError, setUserError] = useState(false);
  const [authToken, setAuthToken] = useState(() =>
    localStorage.getItem("authToken")
  );

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

  const handleLogOut = () => {
    localStorage.removeItem("authToken");
    setUser(null);
  };

  return (
    <UserContext.Provider
      value={{
        user,
        userLoading,
        userError,
        handleLogOut,
        authToken,
        setAuthToken,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

export default UserProvider;
