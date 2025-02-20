import { useState } from "react";
import "./ForgotPasswordModal.css";
import useSendForgotPasswordMail from "../../../hooks/useSendForgotPasswordMail";

function ForgotPasswordModal() {
  const [userEmail, setUserEmail] = useState("");
  const { handleSendForgotPasswordMail } = useSendForgotPasswordMail();

  return (
    <div className="forgot-password_modal">
      <div className="forgot-password">
        <form onSubmit={(e) => handleSendForgotPasswordMail(e, userEmail)}>
          <label htmlFor="">
            {" "}
            Ingrese su e-mail
            <input
              type="email"
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
