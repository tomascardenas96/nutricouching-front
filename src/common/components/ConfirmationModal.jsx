import BaseModal from "./BaseModal";

function ConfirmationModal({ onClose, onConfirm, message }) {
  return (
    <BaseModal
      isOpen={true}
      onClose={onClose}
      title="Confirmar acción"
      size="sm"
      zIndex={4000}
      footer={
        <div className="bm-footer__actions">
          <button
            type="button"
            className="bm-btn bm-btn--secondary"
            onClick={onClose}
          >
            Cancelar
          </button>
          <button
            type="button"
            className="bm-btn bm-btn--primary"
            onClick={onConfirm}
          >
            Confirmar
          </button>
        </div>
      }
    >
      <p className="bm-confirm-msg">
        {message || "¿Estás seguro de realizar esta acción?"}
      </p>
    </BaseModal>
  );
}

export default ConfirmationModal;
