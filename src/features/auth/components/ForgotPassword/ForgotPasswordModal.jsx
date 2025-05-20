import { useState } from "react";
import "./ForgotPasswordModal.css";
import useSendForgotPasswordMail from "../../hooks/useSendForgotPasswordMail";

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
        <h2 className="title">Recuperar Contraseña</h2>

        <form onSubmit={(e) => handleSendForgotPasswordMail(e, userEmail)}>
          <p>
            Te enviaremos un mensaje a tu correo electronico con un link para
            reestablecer la contraseña
          </p>

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

          <div className="send-button">
            <input type="submit" value="Enviar" />
            <p onClick={handleOpenForgotPasswordModal}>Volver al login</p>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ForgotPasswordModal;
