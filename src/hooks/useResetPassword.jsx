import React from "react";
import { HOST } from "../api/data";
import { toast } from "sonner";

function useResetPassword() {
  const authToken = localStorage.getItem("authToken");

  const handleResetPassword = async (e, token, newPassword) => {
    const handleResetPasswordPromise = async () => {
      e.preventDefault();

      const response = await fetch(`${HOST}/auth/reset-password`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authToken}`,
        },
        body: JSON.stringify({ token, newPassword }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error();
      }

      return data;
    };

    toast.promise(handleResetPasswordPromise(), {
      success: "Contraseña actualizada!",
      loading: "Actualizando contraseña",
      error: "Error al actualizar la contraseña",
    });
  };

  return { handleResetPassword };
}

export default useResetPassword;
