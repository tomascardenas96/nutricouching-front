import "./LoginModal.css";
import { IoMdClose } from "react-icons/io";
import { FaEye } from "react-icons/fa";
import useLogin from "../../hooks/useLogin";

function LoginModal({ handleLoginModal }) {
  const {
    loginInput,
    loginLoading,
    loginError,
    handleSubmitLogin,
    handleChangeLogin,
  } = useLogin();

  return (
    <div className="login-modal_background" onClick={handleLoginModal}>
      <div className="login_container" onClick={(e) => e.stopPropagation()}>
        <div className="login-title">
          <h1>Iniciar sesion</h1>
          <IoMdClose className="login-modal-close" onClick={handleLoginModal} />
        </div>
        <form className="login-form" onSubmit={handleSubmitLogin}>
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
          <p className="forgot-password">¿Olvidaste tu contraseña?</p>
          <input type="submit" value="Ingresar" />
          <p className="create-account">
            ¿No tenes una cuenta? ingresa <span>aqui</span>
          </p>
        </form>
      </div>
    </div>
  );
}

export default LoginModal;
