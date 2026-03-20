import { useEffect } from "react";
import { IoMdClose } from "react-icons/io";
import "./BaseModal.css";

function BaseModal({
  isOpen,
  onClose,
  title,
  icon,
  children,
  footer,
  onSubmit,
  size = "md",
  zIndex = 3000,
}) {
  useEffect(() => {
    if (!isOpen) return;

    document.body.style.overflow = "hidden";
    const handleKeyDown = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const Tag = onSubmit ? "form" : "div";

  return (
    <div className="bm-overlay" style={{ zIndex }} onClick={onClose}>
      <Tag
        className={`bm-card bm-card--${size}`}
        onClick={(e) => e.stopPropagation()}
        onSubmit={onSubmit}
      >
        <div className="bm-header">
          {icon && <span className="bm-header__icon">{icon}</span>}
          <h2 className="bm-header__title">{title}</h2>
          <button type="button" className="bm-header__close" onClick={onClose}>
            <IoMdClose />
          </button>
        </div>

        <div className="bm-body">{children}</div>

        {footer && <div className="bm-footer">{footer}</div>}
      </Tag>
    </div>
  );
}

export default BaseModal;
