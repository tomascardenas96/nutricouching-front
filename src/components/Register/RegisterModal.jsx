import "./RegisterModal.css";
import { FaEye } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";
import useRegister from "../../hooks/useRegister";

function RegisterModal({ handleRegisterModal }) {
  const {
    registerInput,
    registerLoading,
    registerError,
    handleSubmitRegister,
    handleChangeRegister,
  } = useRegister();

  return (
    <div className="register-modal_background" onClick={handleRegisterModal}>
      <div className="register_container" onClick={(e) => e.stopPropagation()}>
        <IoMdClose
          className="close-register-modal"
          onClick={handleRegisterModal}
        />
        <h1 className="register-title">Registrar un nuevo usuario</h1>
        <form onSubmit={handleSubmitRegister}>
          <div className="register-form_layout">
            <label htmlFor="name" className="name">
              <input
                type="text"
                placeholder="Nombre"
                name="name"
                onChange={handleChangeRegister}
                value={registerInput.name}
                required
              />
            </label>

            <label htmlFor="lastname" className="lastname">
              <input
                type="text"
                placeholder="Apellido"
                name="lastname"
                onChange={handleChangeRegister}
                value={registerInput.lastname}
                required
              />
            </label>

            <label htmlFor="email" className="email">
              <input
                type="email"
                placeholder="E-mail"
                name="email"
                onChange={handleChangeRegister}
                value={registerInput.email}
                required
              />
            </label>

            <label htmlFor="password" className="password">
              <input
                type="text"
                placeholder="Contraseña"
                name="password"
                onChange={handleChangeRegister}
                value={registerInput.password}
                required
              />
            </label>

            <label htmlFor="repeatPassword" className="password">
              <input
                type="text"
                placeholder="Repita la contraseña"
                name="repeatPassword"
                onChange={handleChangeRegister}
                value={registerInput.repeatPassword}
                required
              />
              <FaEye className="show-hide" />
            </label>
          </div>
          <input
            type="submit"
            value="Crear cuenta"
            className="create-account_btn"
          />
        </form>
      </div>
    </div>
  );
}

export default RegisterModal;
