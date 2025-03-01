import { ImCheckmark, ImCross } from "react-icons/im";
import useUpdateUserInformation from "../../hooks/useUpdateUserInformation";
import "./UpdateUserModal.css";
import { createPortal } from "react-dom";
import ConfirmationModal from "../Common/ConfirmationModal";
import { useState } from "react";
import InputError from "../Common/InputError";

function UpdateUserModal({
  handleOpenUpdateUserModal,
  setIsUpdateUserModalOpen,
}) {
  const [confirmChangesModal, setConfirmChangesModal] = useState(false);
  const {
    handleChangeUserInput,
    onSubmitUpdateUserInformation,
    updateUserInput,
    confirmNewPassword,
    setConfirmNewPassword,
    incorrectConfirmPassword,
    currentPasswordError,
    passwordCharError,
  } = useUpdateUserInformation(
    setConfirmChangesModal,
    setIsUpdateUserModalOpen
  );

  return (
    <div className="update-user_modal">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          setConfirmChangesModal(true);
        }}
      >
        <h2>Actualizar Datos de Usuario</h2>

        <div className="user-form">
          <div className="main-info">
            <label htmlFor="name">
              {" "}
              <input
                type="text"
                name="name"
                onChange={handleChangeUserInput}
                value={updateUserInput.name}
                placeholder="Nombre"
                required
              />
            </label>

            <label htmlFor="lastname">
              <input
                type="text"
                name="lastname"
                onChange={handleChangeUserInput}
                value={updateUserInput.lastname}
                placeholder="Apellido"
                required
              />
            </label>
          </div>

          <h2>Cambiar Contraseña</h2>

          <div className="password-info">
            <label htmlFor="oldPassword">
              <input
                type="password"
                name="oldPassword"
                onChange={handleChangeUserInput}
                value={updateUserInput.oldPassword}
                placeholder="Contraseña actual"
                style={{
                  backgroundColor: currentPasswordError
                    ? "rgba(255, 0, 0, 0.1)"
                    : "",
                  borderColor: currentPasswordError
                    ? "rgba(255, 0, 0, 0.2)"
                    : "",
                }}
              />

              {currentPasswordError && (
                <div className="input-error_container">
                  <InputError message={currentPasswordError} />
                </div>
              )}
            </label>

            <label htmlFor="password">
              <input
                type="password"
                name="password"
                onChange={handleChangeUserInput}
                value={updateUserInput.password}
                placeholder="Contraseña nueva"
                style={{
                  backgroundColor:
                    passwordCharError || incorrectConfirmPassword
                      ? "rgba(255, 0, 0, 0.1)"
                      : "",
                  borderColor:
                    passwordCharError || incorrectConfirmPassword
                      ? "rgba(255, 0, 0, 0.2)"
                      : "",
                }}
              />

              {passwordCharError && (
                <div className="input-error_container">
                  <InputError message={passwordCharError} />
                </div>
              )}
            </label>

            <label htmlFor="confirm-password">
              <input
                type="password"
                name="confirm-password"
                onChange={(e) => setConfirmNewPassword(e.target.value)}
                value={confirmNewPassword}
                placeholder="Confirmar contraseña"
                style={{
                  backgroundColor: incorrectConfirmPassword
                    ? "rgba(255, 0, 0, 0.1)"
                    : "",
                  borderColor: incorrectConfirmPassword
                    ? "rgba(255, 0, 0, 0.2)"
                    : "",
                }}
              />

              {incorrectConfirmPassword && (
                <div className="input-error_container">
                  <InputError message={incorrectConfirmPassword} />
                </div>
              )}
            </label>
          </div>
        </div>

        <div className="option-btns_update-user">
          <label
            htmlFor="cancel-update-user"
            onClick={handleOpenUpdateUserModal}
          >
            <input type="button" id="cancel-update-user" />
            <ImCross className="confirm-reject_icon confirm-reject_icon-red" />
          </label>

          <label htmlFor="update-user">
            <input type="submit" id="update-user" />
            <ImCheckmark className="confirm-reject_icon confirm-reject_icon-green" />
          </label>
        </div>
      </form>

      {confirmChangesModal &&
        createPortal(
          <ConfirmationModal
            message="¿Estas seguro que deseas conservar los cambios?"
            onClose={() => setConfirmChangesModal(false)}
            onConfirm={onSubmitUpdateUserInformation}
          />,
          document.body
        )}
    </div>
  );
}

export default UpdateUserModal;
