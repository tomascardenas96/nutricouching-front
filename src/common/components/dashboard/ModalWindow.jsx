import "./ModalWindow.css";
import { IoMdClose } from "react-icons/io";

function ModalWindow({ children, title, onSubmit, onClose, icon }) {
  return (
    <div className="modal-window_background" onClick={onClose}>
      <div className="modal-window" onClick={(e) => e.stopPropagation()}>
        <div className="modal-window_header">
          <h1>
            {icon} {title}
          </h1>
          <IoMdClose className="close-icon" onClick={onClose} />
        </div>

        <form onSubmit={onSubmit}>{children}</form>
      </div>
    </div>
  );
}

export default ModalWindow;
