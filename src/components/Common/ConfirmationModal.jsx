import { ImCheckmark, ImCross } from "react-icons/im";
import "./ConfirmationModal.css";

function ConfirmationModal({ isOpen, onClose, onConfirm, message }) {
  return (
    <div className="confirmation-modal_background" onClick={onClose}>
      <div className="confirmation-modal" onClick={(e) => e.stopPropagation()}>
        <p>{message || "¿Estás seguro de realizar esta acción?"}</p>
        <div className="confirmation-modal_options-icons">
          <ImCross
            onClick={onClose}
            className="confirm-reject_icon confirm-reject_icon-red"
          />
          <ImCheckmark
            onClick={onConfirm}
            className="confirm-reject_icon confirm-reject_icon-green"
          />
        </div>
      </div>
    </div>
  );
}

export default ConfirmationModal;
