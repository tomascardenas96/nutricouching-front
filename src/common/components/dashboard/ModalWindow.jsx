import { FaCalendar } from "react-icons/fa";
import "./ModalWindow.css";
import { IoMdClose } from "react-icons/io";
import { MdOutlineDone } from "react-icons/md";

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
    <div className="modal-window_background" onClick={onClose}>
      <div className="modal-window" onClick={(e) => e.stopPropagation()}>
        <div className="modal-window_header">
          <h1>
            {icon} {title}
          </h1>
          <IoMdClose className="close-icon" onClick={onClose} />
        </div>

        <form onSubmit={onSubmit}>
          {children}

          <div className="submit-button">
            <hr />
            <div className="booking-buttons">
              <button
                onClick={(e) => {
                  e.preventDefault();
                  onClose();
                }}
              >
                Cancelar
              </button>
              <button
                type="submit"
                className={
                  isButtonEnabled ? "enabled-button" : "disabled-button"
                }
                disabled={!isButtonEnabled}
              >
                <MdOutlineDone /> {buttonText}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ModalWindow;
