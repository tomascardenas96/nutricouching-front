import { FaEye } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";
import "./LoginModal.css";
import { useState } from "react";
import { createPortal } from "react-dom";
import ForgotPasswordModal from "./Forgot-password/ForgotPasswordModal";

function LoginModal({
  handleLoginModal,
  loginInput,
  loginLoading,
  loginError,
  handleSubmitLogin,
  handleChangeLogin,
  isLoginModalOpen,
}) {
  const [isForgotPasswordModalOpen, setIsForgotPasswordModalOpen] =
    useState(false);
  const login = (e) => {
    handleLoginModal();
    handleSubmitLogin(e);
  };

  const handleOpenForgotPasswordModal = () => {
    setIsForgotPasswordModalOpen(!isForgotPasswordModalOpen);
  };

  return (
    <div className="login-modal_background">
      <div className="login_container">
        <div className="login-title">
          <h1>Iniciar sesion</h1>
          <IoMdClose className="login-modal-close" onClick={handleLoginModal} />
        </div>
        <form className="login-form" onSubmit={login}>
          <label htmlFor="email">
            <input
              type="text"
              placeholder="E-mail"
              name="email"
              onChange={handleChangeLogin}
              value={loginInput.email}
              required
            />
          </label>
          <label htmlFor="password">
            <input
              type="password"
              placeholder="Contraseña"
              name="password"
              onChange={handleChangeLogin}
              value={loginInput.password}
              required
            />
            <FaEye className="login-password_show-hide" />
          </label>
          <p
            className="forgot-password"
            onClick={handleOpenForgotPasswordModal}
          >
            ¿Olvidaste tu contraseña?
          </p>
          <input type="submit" value="Ingresar" />
          <p className="create-account">
            ¿No tenes una cuenta? ingresa <span>aqui</span>
          </p>
        </form>
      </div>

      {isForgotPasswordModalOpen &&
        createPortal(
          <ForgotPasswordModal
            handleOpenForgotPasswordModal={handleOpenForgotPasswordModal}
          />,
          document.body
        )}
    </div>
  );
}

export default LoginModal;
