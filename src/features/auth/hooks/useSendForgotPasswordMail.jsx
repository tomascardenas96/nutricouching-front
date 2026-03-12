import { toast } from "sonner";
import apiClient from "../api/apiClient";

function useSendForgotPasswordMail(handleOpenForgotPasswordModal) {
  const handleSendForgotPasswordMail = async (e, email) => {
    e.preventDefault();

    const sendMailPromise = async () => {
      const { data } = await apiClient.post(`/auth/forgot-password/${email}`);
      handleOpenForgotPasswordModal();
      return data;
    };

    toast.promise(sendMailPromise(), {
      success: "Email enviado a su direccion de correo electronico!",
      loading: "Enviando mail...",
      error: "Error enviando mail, intente nuevamente",
    });
  };

  return { handleSendForgotPasswordMail };
}

export default useSendForgotPasswordMail;
