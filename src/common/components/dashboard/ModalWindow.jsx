import { MdOutlineDone } from "react-icons/md";
import BaseModal from "../BaseModal";

function ModalWindow({
  children,
  title,
  onSubmit,
  onClose,
  icon,
  buttonText,
  isButtonEnabled,
}) {
  return (
    <BaseModal
      isOpen={true}
      onClose={onClose}
      onSubmit={onSubmit}
      title={title}
      icon={icon}
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
            type="submit"
            className="bm-btn bm-btn--primary"
            disabled={!isButtonEnabled}
          >
            <MdOutlineDone /> {buttonText}
          </button>
        </div>
      }
    >
      {children}
    </BaseModal>
  );
}

export default ModalWindow;
