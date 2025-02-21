import { toast } from "sonner";
import { HOST } from "../api/data";

function useSendForgotPasswordMail(handleOpenForgotPasswordModal) {
  const handleSendForgotPasswordMail = async (e, email) => {
    e.preventDefault();

    const sendMailPromise = async () => {
      const response = await fetch(`${HOST}/auth/forgot-password/${email}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error();
      }

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
