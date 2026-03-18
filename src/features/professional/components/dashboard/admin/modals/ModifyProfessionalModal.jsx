import ModalWindow from "../../../../../../common/components/dashboard/ModalWindow";
import useModifyProfessional from "../../../../hooks/useModifyProfessional";
import "./ModifyProfessionalModal.css";

const ROLE_LABELS = {
  admin: "Admin",
  professional: "Profesional",
  user: "Usuario",
  root: "Root",
};

function ModifyProfessionalModal({
  selectedProfessional,
  setProfessionals,
  handleCloseModifyModal,
}) {
  const {
    handleChangeModifyProfessional,
    handleSubmitModifyProfessional,
    modifyProfessionalInputs,
  } = useModifyProfessional(
    selectedProfessional,
    setProfessionals,
    handleCloseModifyModal,
  );

  return (
    <ModalWindow
      onClose={handleCloseModifyModal}
      onSubmit={handleSubmitModifyProfessional}
      title="Modificar Profesional"
      buttonText="Guardar cambios"
      isButtonEnabled={true}
    >
      {/* Professional identity */}
      <div className="modify-pro__identity">
        <div className="modify-pro__avatar">
          <img
            src={
              selectedProfessional?.profile?.picture ||
              "/assets/no-picture-profile.webp"
            }
            alt={selectedProfessional?.fullname}
            onError={(e) => {
              e.currentTarget.src = "/assets/no-picture-profile.webp";
            }}
          />
        </div>
        <div className="modify-pro__identity-info">
          <p className="modify-pro__name">{selectedProfessional?.fullname}</p>
          <span className="modify-pro__email">
            {selectedProfessional?.email}
          </span>
        </div>
        <span
          className={`modify-pro__role-badge modify-pro__role-badge--${selectedProfessional?.role}`}
        >
          {ROLE_LABELS[selectedProfessional?.role] ??
            selectedProfessional?.role}
        </span>
      </div>

      {/* Fields */}
      <div className="modify-pro__fields">
        <div className="modify-pro__field">
          <label className="modify-pro__label" htmlFor="phone">
            Teléfono
          </label>
          <input
            id="phone"
            type="number"
            name="phone"
            className="modify-pro__input"
            placeholder="Ej: 2284123456"
            onChange={handleChangeModifyProfessional}
            value={modifyProfessionalInputs.phone}
          />
        </div>

        <div className="modify-pro__field">
          <label className="modify-pro__label" htmlFor="role">
            Rol
          </label>
          <select
            id="role"
            name="role"
            className="modify-pro__select"
            onChange={handleChangeModifyProfessional}
            value={modifyProfessionalInputs.role}
          >
            <option value="">Seleccione un rol</option>
            <option value="user">Usuario</option>
            <option value="professional">Profesional</option>
            <option value="admin">Admin</option>
          </select>
        </div>
      </div>
    </ModalWindow>
  );
}

export default ModifyProfessionalModal;
