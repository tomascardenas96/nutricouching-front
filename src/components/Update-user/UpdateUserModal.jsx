import useUpdateUserInformation from "../../hooks/useUpdateUserInformation";
import "./UpdateUserModal.css";

function UpdateUserModal() {
  const {
    handleChangeUserInput,
    onSubmitUpdateUserInformation,
    updateUserInput,
    confirmNewPassword,
    setConfirmNewPassword,
    incorrectConfirmPassword,
  } = useUpdateUserInformation();

  return (
    <div className="update-user_modal">
      <form onSubmit={onSubmitUpdateUserInformation}>
        <label htmlFor="name">
          {" "}
          Nombre
          <input
            type="text"
            name="name"
            onChange={handleChangeUserInput}
            value={updateUserInput.name}
          />
        </label>

        <label htmlFor="lastname">
          Apellido
          <input
            type="text"
            name="lastname"
            onChange={handleChangeUserInput}
            value={updateUserInput.lastname}
          />
        </label>

        <label htmlFor="oldPassword">
          Contraseña actual
          <input
            type="password"
            name="oldPassword"
            onChange={handleChangeUserInput}
            value={updateUserInput.oldPassword}
          />
        </label>

        <label htmlFor="password">
          Nueva contraseña
          <input
            type="password"
            name="password"
            onChange={handleChangeUserInput}
            value={updateUserInput.password}
          />
        </label>

        <label htmlFor="confirm-password">
          Confirmar nueva contraseña
          <input
            type="password"
            name="confirm-password"
            onChange={(e) => setConfirmNewPassword(e.target.value)}
            value={confirmNewPassword}
          />
          {incorrectConfirmPassword && <p>La contraseña no coincide</p>}
        </label>

        <input type="submit" value="Guardar" />
      </form>
    </div>
  );
}

export default UpdateUserModal;
