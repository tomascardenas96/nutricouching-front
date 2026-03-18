import { memo, useState } from "react";
import { createPortal } from "react-dom";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import ConfirmationModal from "../../../../../../common/components/ConfirmationModal";
import useDeleteSpecialty from "../../../../hooks/useDeleteSpecialty";
import "./SpecialtiesCardDashboardMobile.css";

const SpecialtiesCardDashboardMobile = memo(function SpecialtiesCardDashboardMobile({
  specialty,
  setSpecialties,
  handleOpenModifyModal,
}) {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const { handleDeleteSpecialty } = useDeleteSpecialty(setSpecialties, () =>
    setIsDeleteModalOpen(false)
  );

  return (
    <>
      <div className="specialty-card-dashboard-container">
        <div className="info-container">
          <div className="specialty-card__header">
            <p className="name">{specialty?.name}</p>
            <span className="category-badge">{specialty?.category?.name}</span>
          </div>

          <div className="buttons-container">
            <button className="edit-btn" onClick={() => handleOpenModifyModal(specialty)}>
              <FaEdit /> Editar
            </button>
            <button className="delete-btn" onClick={() => setIsDeleteModalOpen(true)}>
              <MdDelete /> Eliminar
            </button>
          </div>
        </div>
      </div>

      {isDeleteModalOpen &&
        createPortal(
          <ConfirmationModal
            onConfirm={() => handleDeleteSpecialty(specialty.specialtyId)}
            onClose={() => setIsDeleteModalOpen(false)}
            message="¿Desea eliminar esta especialidad?"
          />,
          document.getElementById("root-portal")
        )}
    </>
  );
});

export default SpecialtiesCardDashboardMobile;
