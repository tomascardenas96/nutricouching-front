import { useState } from "react";
import "./ForgotPasswordModal.css";
import useSendForgotPasswordMail from "../../../hooks/useSendForgotPasswordMail";

function ForgotPasswordModal({ handleOpenForgotPasswordModal }) {
  const [userEmail, setUserEmail] = useState("");
  const { handleSendForgotPasswordMail } = useSendForgotPasswordMail(
    handleOpenForgotPasswordModal
  );

  return (
    <div
      className="forgot-password_modal"
      onClick={handleOpenForgotPasswordModal}
    >
      <div className="forgot-password" onClick={(e) => e.stopPropagation()}>
        <form onSubmit={(e) => handleSendForgotPasswordMail(e, userEmail)}>
          <label htmlFor="email">
            {" "}
            Ingrese su e-mail
            <input
              type="email"
              name="email"
              onChange={(e) => setUserEmail(e.target.value)}
              value={userEmail}
            />
          </label>
          <p>
            Te enviaremos un mensaje a tu correo electronico con un link para
            reestablecer la contraseña
          </p>
          <input type="submit" value="Enviar" />
        </form>
      </div>
    </div>
  );
}

export default ForgotPasswordModal;
