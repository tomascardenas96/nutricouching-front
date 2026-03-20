import { useState } from "react";
import BaseModal from "../../../../common/components/BaseModal";
import useSendForgotPasswordMail from "../../hooks/useSendForgotPasswordMail";
import "./ForgotPasswordModal.css";

function ForgotPasswordModal({ handleOpenForgotPasswordModal }) {
  const [userEmail, setUserEmail] = useState("");
  const { handleSendForgotPasswordMail } = useSendForgotPasswordMail(
    handleOpenForgotPasswordModal
  );

  return (
    <BaseModal
      isOpen={true}
      onClose={handleOpenForgotPasswordModal}
      onSubmit={(e) => handleSendForgotPasswordMail(e, userEmail)}
      title="Recuperar Contraseña"
      footer={
        <div className="bm-footer__actions">
          <button
            type="button"
            className="bm-btn bm-btn--secondary"
            onClick={handleOpenForgotPasswordModal}
          >
            Volver al login
          </button>
          <button type="submit" className="bm-btn bm-btn--primary">
            Enviar
          </button>
        </div>
      }
    >
      <div className="forgot-password_body">
        <p>
          Te enviaremos un mensaje a tu correo electronico con un link para
          reestablecer la contraseña
        </p>
        <label htmlFor="email">
          Ingrese su e-mail
          <input
            type="email"
            name="email"
            onChange={(e) => setUserEmail(e.target.value)}
            value={userEmail}
          />
        </label>
      </div>
    </BaseModal>
  );
}

export default ForgotPasswordModal;
