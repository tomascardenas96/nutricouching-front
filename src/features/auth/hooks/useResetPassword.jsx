import { toast } from "sonner";
import apiClient from "../api/apiClient";

function useResetPassword() {
  const handleResetPassword = async (e, token, newPassword) => {
    const handleResetPasswordPromise = async () => {
      e.preventDefault();
      const { data } = await apiClient.post("/auth/reset-password", { token, newPassword });
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
