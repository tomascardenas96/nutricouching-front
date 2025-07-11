import "./OptionsModal.css";

function OptionsModal({
  handleOpenUpdateProfileModal,
  handleCloseOptionsModal,
  professional,
}) {
  return (
    <div className="options-modal_profile" onClick={(e) => e.stopPropagation()}>
      <p
        onClick={() => {
          handleOpenUpdateProfileModal();
          handleCloseOptionsModal();
        }}
      >
        Actualizar perfil
      </p>
    </div>
  );
}

export default OptionsModal;
