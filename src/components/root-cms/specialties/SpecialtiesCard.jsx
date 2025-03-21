import { FaRegEdit, FaRegTrashAlt } from "react-icons/fa";
import "./SpecialtiesCard.css";
import ConfirmationModal from "../../Common/ConfirmationModal";
import { useState } from "react";
import { createPortal } from "react-dom";

function SpecialtyCard({ specialty, handleDeleteSpecialty }) {
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);

  const handleConfirm = () => {
    setIsConfirmModalOpen(true);
  };

  const handleCancel = () => {
    setIsConfirmModalOpen(false);
  };

  return (
    <>
      <td className="specialty-cms_name">{specialty.name}</td>

      <td className="specialty-cms_title">{specialty.service.title}</td>

      <td className="specialty-cms_options">
        <p>
          <FaRegTrashAlt onClick={handleConfirm} />
        </p>
      </td>

      {isConfirmModalOpen &&
        createPortal(
          <ConfirmationModal
            onConfirm={() => handleDeleteSpecialty(specialty.specialtyId)}
            onClose={handleCancel}
          />,
          document.body
        )}
    </>
  );
}

export default SpecialtyCard;
