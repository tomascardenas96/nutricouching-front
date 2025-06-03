import ModalWindow from "../../../../../../common/components/dashboard/ModalWindow";
import "./ModifyProfessionalModal.css";

function ModifyProfessionalModal({
  handleChangeModifyProfessional,
  handleSubmitModifyProfessional,
  handleCloseModifyModal,
  modifyProfessionalInputs,
  handleChangeSelectedPicture,
  imageSrc,
}) {
  return (
    <ModalWindow
      onClose={handleCloseModifyModal}
      onSubmit={handleSubmitModifyProfessional}
      title="Modificar Profesional"
    >
      <label htmlFor="file">
        <div className="modify-professional-dashboard_selected-image">
          <img src={imageSrc} alt="Imagen seleccionada por el usuario" />
        </div>
        <input type="file" name="file" onChange={handleChangeSelectedPicture} />
      </label>

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
