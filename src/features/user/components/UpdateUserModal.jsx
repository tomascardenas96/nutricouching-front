import { useState } from "react";
import { createPortal } from "react-dom";
import ConfirmationModal from "../../../common/components/ConfirmationModal";
import InputError from "../../../common/components/InputError";
import BaseModal from "../../../common/components/BaseModal";
import useUpdateUserInformation from "../hooks/useUpdateUserInformation";
import "./UpdateUserModal.css";

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
    <>
      <BaseModal
        isOpen={true}
        onClose={handleOpenUpdateUserModal}
        onSubmit={(e) => {
          e.preventDefault();
          setConfirmChangesModal(true);
        }}
        title="Actualizar Datos de Usuario"
        footer={
          <div className="bm-footer__actions">
            <button
              type="button"
              className="bm-btn bm-btn--secondary"
              onClick={handleOpenUpdateUserModal}
            >
              Cancelar
            </button>
            <button type="submit" className="bm-btn bm-btn--primary">
              Guardar
            </button>
          </div>
        }
      >
        <div className="user-form">
          <div className="main-info">
            <label htmlFor="name">
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

          <h3 className="update-user_section-title">Cambiar Contraseña</h3>

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
      </BaseModal>

      {confirmChangesModal &&
        createPortal(
          <ConfirmationModal
            message="¿Estas seguro que deseas conservar los cambios?"
            onClose={() => setConfirmChangesModal(false)}
            onConfirm={onSubmitUpdateUserInformation}
          />,
          document.body
        )}
    </>
  );
}

export default UpdateUserModal;
