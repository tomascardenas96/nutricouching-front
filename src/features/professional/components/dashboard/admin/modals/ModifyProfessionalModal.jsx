import ModalWindow from "../../../../../../common/components/dashboard/ModalWindow";
import "./ModifyProfessionalModal.css";

function ModifyProfessionalModal({
  handleChangeModifyProfessional,
  handleSubmitModifyProfessional,
  handleCloseModifyModal,
  modifyProfessionalInputs,
}) {
  return (
    <ModalWindow
      onClose={handleCloseModifyModal}
      onSubmit={handleSubmitModifyProfessional}
      title="Modificar Profesional"
    >
      <label htmlFor="phone">
        Telefono
        <input
          type="number"
          name="phone"
          onChange={handleChangeModifyProfessional}
          value={modifyProfessionalInputs.phone}
        />
      </label>

      <label htmlFor="role">
        Rol
        <select
          name="role"
          onChange={handleChangeModifyProfessional}
          value={modifyProfessionalInputs.role}
        >
          <option value="">Seleccione un rol</option>
          <option value="admin">admin</option>
          <option value="root">root</option>
        </select>
      </label>

      <button>Enviar</button>
    </ModalWindow>
  );
}

export default ModifyProfessionalModal;
