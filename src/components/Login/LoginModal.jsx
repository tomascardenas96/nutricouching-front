import { useState } from "react";
import { createPortal } from "react-dom";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";
import ForgotPasswordModal from "./Forgot-password/ForgotPasswordModal";
import "./LoginModal.css";

function LoginModal({
  handleLoginModal,
  loginInput,
  loginLoading,
  loginError,
  handleSubmitLogin,
  handleChangeLogin,
  isLoginModalOpen,
  handleRegisterModal,
}) {
  const [isForgotPasswordModalOpen, setIsForgotPasswordModalOpen] =
    useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const login = (e) => {
    handleLoginModal();
    handleSubmitLogin(e);
  };

  const handleOpenForgotPasswordModal = () => {
    setIsForgotPasswordModalOpen(!isForgotPasswordModalOpen);
  };

  const handleOpenRegisterModal = () => {
    handleLoginModal();
    handleRegisterModal();
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
              type="email"
              placeholder="E-mail"
              name="email"
              onChange={handleChangeLogin}
              value={loginInput.email}
              required
            />
          </label>
          <label htmlFor="password">
            <input
              type={isPasswordVisible ? "text" : "password"}
              placeholder="Contraseña"
              name="password"
              onChange={handleChangeLogin}
              value={loginInput.password}
              required
            />
            {isPasswordVisible ? (
              <FaEyeSlash
                className="login-password_show-hide"
                onClick={() => setIsPasswordVisible(!isPasswordVisible)}
              />
            ) : (
              <FaEye
                className="login-password_show-hide"
                onClick={() => setIsPasswordVisible(!isPasswordVisible)}
              />
            )}
          </label>
          <div>
            <p
              className="forgot-password"
              onClick={handleOpenForgotPasswordModal}
            >
              ¿Olvidaste tu contraseña?
            </p>
          </div>
          <input type="submit" value="Ingresar" />
          <p className="create-account">
            ¿No tenes una cuenta? ingresa{" "}
            <span>
              <a onClick={handleOpenRegisterModal}>aqui</a>
            </span>
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
