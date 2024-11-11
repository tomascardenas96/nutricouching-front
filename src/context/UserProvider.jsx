import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useContext } from "react";
import { createContext } from "react";
import { Toaster } from "sonner";
import { HOST } from "../api/data";

//Creacion del contexto
const UserContext = createContext(null);

//Creamos un custom hook para utilizar el contexto
export const useUser = () => useContext(UserContext);

//Creamos el proveedor
function UserProvider({ children }) {
  const [user, setUser] = useState(null);
  const [userLoading, setUserLoading] = useState(true);
  const [userError, setUserError] = useState(false);

  useEffect(() => {
    const checkToken = async () => {
      const token = localStorage.getItem("authToken");
      if (token) {
        try {
          const response = await fetch(`${HOST}/auth/active-user`, {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              authorization: `Bearer ${token}`,
            },
          });

          const data = await response.json();
          console.log(data);
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
      } else {
        setUserLoading(false);
      }
    };

    checkToken();
  }, []);

  return (
    <UserContext.Provider value={{ user, userLoading, userError, setUser }}>
      {children}
      <Toaster />
    </UserContext.Provider>
  );
}

export default UserProvider;
